/**
 * wb-tnz5.3 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R4), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * reads rf federation admission results, its adapter shall branch on the producer's RF_FEDERATION_* refusal codes verbatim
 * (equivocation, denial and binding/contract refusals included), treat every one as non-success, keep an unknown RF_FEDERATION_*
 * code unknown, and never synthesize or re-label one (gated RFCLI admission service FW-CFRR-02b, rfc-bak67.8: not shipped, 0
 * RF_FEDERATION hits in src/tests at the pin)." (certified-federated-reactive-refinement-2026-10-18/BEADS-2026-10-21.md:22
 * @6a251bf73af5). Acceptance, quoted: "(a) a fixture envelope carrying an RF_FEDERATION_* refusal surfaces the code verbatim with a
 * non-success tone; an unknown RF_FEDERATION_* code stays unknown, never mapped to success or another code; (b) a grep guard shows
 * no RF_FEDERATION_* literal emitted by Pi without a producer envelope behind it (0 in Pi src); (c) until rfc-bak67.8 closes and
 * the codes enter rf's diagnostics registry, Pi surfaces no federation admission result." The merged duplicate
 * RF-FEDERATED-WORKSPACES-R6 adds: "the kept row must pin whichever family the rf registry registers rather than hard-code either
 * spelling, and must carry FW-R6's CCCA outcome-word clause (NO_ADMISSIBLE_VERSION is never relabelled a mathematical
 * inconsistency, 10-ccca:17)".
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): BEADS-2026-10-21.md:22 titles
 * rfc-bak67.8 (FW-CFRR-02b) "... refusals are RF_FEDERATION_* codes" and :46 spells the family's one named member,
 * RF_FEDERATION_PIN_CHANGED ("exit 4 class", rfc-bak67.14); README.md:32 "Equivocation at equal sequence is refusal.";
 * 02-concrete-contract-and-verification-gates.md:26 "differing record at same source cursor is an equivocation refusal";
 * 04-typed-acceptance-slice-and-protected-storage-plan.md:13 names the refusal classes (exact duplicate/equivocation, epoch/reset
 * denial, B/A admission denial, binding/contract failure). federated-workspaces-2026-10-18 (same pin): 04-cli-api.md:104 proposes
 * the other spelling, eleven RF_FED_* codes ("Register codes with the existing diagnostic registry"), registered by rfc-0txnl.1
 * (FW-04a, BEADS-2026-10-21.md:13); 04-cli-api.md:8-18 plan the rf workspace verbs (link, links, inspect, exports, read,
 * subscribe, unlink, invoke) an admission result would arrive through; 10-ccca-optimal-snapshot-acquisition-contract.md:15-19 name
 * the acquisition outcomes, and :17 says of NO_ADMISSIBLE_VERSION "do not relabel this as a mathematical inconsistency" (the
 * INFEASIBLE_CAUSAL_BOUNDS outcome of :16).
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version`, 2026-10-22; read-only import of
 * reactive_fiber_cli.domain.diagnostics): REGISTRY holds 304 codes, each ^RF_[A-Z0-9_]+$, none in either family (no code starts
 * RF_FED); the one registered code containing FED, RF_COMPONENT_INSTANCE_UNFED, is outside both. domain/federation_boundary.py
 * refuses with FederationBoundaryRefusal ("A pure contract refusal, not an automatic CLI diagnostic or trust verdict"), so no
 * federation refusal reaches an rf envelope today: whichever family the registry adopts, the census below holds for both.
 * MEASURED AT BASE (e8850da): no src, qa, docs or test file spells either family; of the ten CCCA outcome words only
 * SOURCE_UNAVAILABLE appears in src or qa, once, as Pi's own designer diagnostic (src/workbench/designer.ts); no src file spells an
 * inconsistency word, and one qa file does, qa/workbench/timeline-grouped-core.mjs, whose receipt check lists its own
 * pass-flag-contradicts-measurement "inconsistencies" (neither is an rf outcome Pi relabels). Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts): a
 * context.render failure envelope whose primary diagnostic is an RF_ error is refused as CapabilityError unavailable "RF render
 * refused: <code>", the code read from that envelope; its adapter (reactivefiber-observer.ts failureSnapshot) projects the reading
 * with statusTone failure and statusText "refused · <code>", message, hint and metadata withheld.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). The fixture is CONSTRUCTED (no rf emits a federation code today): every proposed code of both families, plus
 *    one unproposed code per family standing for an unknown member, each the primary error diagnostic of a context.render failure
 *    envelope (exit 4, the one stated class) whose message does not spell the code. A1 the fixture itself; A2 the native typed
 *    refusal of every proposed code names that code verbatim, category unavailable, one spawn each and no reading; A3 the
 *    registered reading (registerReactiveFiberRender, the injected-reader seam) carries every envelope byte for byte, ok false
 *    kept; A4 the adapter projects every proposed code with tone failure and "refused · <code>", naming no other fixture code;
 *    A5 each unproposed code stays itself on all three surfaces (the only RF_ token each surface names), never success and never
 *    another code; A6 a family code riding an ok true render at error severity demotes it (tone unknown, coverage partial), the
 *    native reading carrying the code verbatim, beside a clean control (success) and the R-SEVERITY quiet row.
 *  B, acceptance (b). B1 no src or qa file spells either family (familyIn: FAMILY over each text read raw and with its literal
 *    \x, \u and \u{} escapes decoded, plus a decoded positive control through the walk's own matcher; a floor on the files walked
 *    and an anchor token per root, so an emptied or misdirected walk reds); B2 no registered descriptor's JSON spells it (the native
 *    registration and the injected preview, through familyIn); B3 every RF_ token a native refusal names is its envelope's primary
 *    code: seven failure shapes, five of
 *    which name no code at all (no diagnostics, a warning primary, exit 0, malformed stdout spelling a family code, a result on a
 *    failure) and one whose family code rides behind a non-family primary; B4 the adapter likewise over the five reading shapes.
 *  C, acceptance (c). C1 an AST scan of every src module and every native descriptor for an rf workspace verb (an argv "workspace"
 *    followed anywhere later by a planned verb - flags between them included - once spreads of array literals and array-literal
 *    .concat calls are flattened and push/unshift argument lists read as argv, or a string or template literal spelling one), with
 *    a floor, a non-vacuity reading of the real render argv, the pinned composed-site list and eleven controls; C2 the rf roster
 *    stays the preview alone (native and injected registrations,
 *    RECONCILE_EVIDENCE_READS.reactivefiber); C3 the native reader refuses a refused workspace.read admission envelope (its
 *    RF_FEDERATION_* code never echoed) and, as the command-gate control, a full-shape success re-pointed to the non-family
 *    command "version", each as unrecognized in one spawn; C4 the adapter refuses a reading carrying either. No accepted admission
 *    envelope is built: wb-o4h0.3 (RF-FEDERATED-WORKSPACES-R4, acceptance (b) "no fixture fabricates a federation success
 *    envelope") pins that no file under test/ or qa/ does, so the accepted side rests on the command gate, C1 and C2.
 *  D, the merged CCCA clause. D1 no src or qa file spells a CCCA outcome word or an inconsistency word beyond the two Pi-owned
 *    sites measured at base, each held to its anchor and to its occurrence count per word (KNOWN_SITES), beside the R-PROSE-OUTCOME
 *    quiet control; D2 a refusal whose primary metadata states NO_ADMISSIBLE_VERSION rides the registered reading verbatim, while
 *    the native refusal and the adapter name its code and neither another outcome word (exact, or folded: any case, its parts joined
 *    by any run of whitespace, ".", "_" or "-", or by none) nor an inconsistency word nor a word of the infeasibility synonym set
 *    (INFEASIBILITY), beside the folded matcher's and the synonym set's own controls.
 *  M, the matcher rows B1 and B2 read: M1-M8 the spellings familyIn must catch (M8 an escape-sequence spelling, caught decoded);
 *    Q1 the registered non-family code that must stay quiet; Q2-Q5 the pinned quiet rows of its residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness and the five vocabularies (FAMILIES, UNPROPOSED, GATING_ARTIFACTS, WORKSPACE_VERBS, OUTCOME_WORDS)
 * - is held to the out-of-file roster test/fixtures/rf-federation-refusal-codes-roster.json, which also holds every registered
 * test title in order (tests) and every case's reached record (reached). A pin deleted, relabelled, swapped for another passing
 * case, or removed from every literal here at once still reds against the roster, and every pin's witness is measured by its own
 * case; A2-A6, B3, B4, C3, C4 and D2 are also anchored in src itself (the readers' own outputs).
 * OUTSIDE ANCHORS (wb-iqqy F2): two owner filings in the tracked bead export (.beads/issues.jsonl), each read only where a later
 * lane append cannot reach it. wb-tnz5.3's filing (its first "Acceptance: " line and its first "Cross-program duplicates merged
 * here" line): every acceptance clause marker the Acceptance line carries starts exactly one row label, the merged CCCA clause's
 * parenthesized phrase sits verbatim in exactly one row label, and FAMILIES' stems are the two proposed stems the merged line
 * spells - each derived from the filing's text, never from a list kept here. wb-iqqy's filing (its head: the notes before the
 * first blank line and before the collect step's first DELIVERED line, read the same with a delivery note appended): every gate
 * mutant id it names has a CURES entry whose cases are registered here, and every census pin id it names is a registered pin. So X-COORD-ROW (row D and its cases out of this file and the roster together) reds on the CCCA clause.
 * RECORDS (wb-iqqy F3): the judged-set case, which runs first, reads the collected task tree - every roster title once, in order,
 * every case in run mode and not inverted, the record case included; each pin re-reads the collected modes, records its witness
 * (MEASURED) and, after its roster compare, its reached record with the assertion count it had run by then (REACHED); the
 * judged-set and anchors cases record theirs; the record case, registered last, re-walks the tree (every other case ran),
 * compares MEASURED against the roster a second time and REACHED against the roster's reached list. So X-EACH (one pin per row
 * registered), X-THIRD (a case returning its roster witness before measuring) and X-SKIP (a pin skipped at run time) red.
 * NOT CLAIMED: the matcher row M and any pin neither filing names (A1-A6, B2-B4, C2-C4 and the M and Q pins), removed from ROWS,
 * the frozen literal, IMPL or SPELLINGS, CURES and the roster's rows, tests and reached lists together - the filings anchor rows
 * A-D, the stems, the filing-named pins and the mutant ids, not those pins (X-COORD-PIN as filed, M7 out of ROWS, SPELLINGS, the
 * frozen literal and the roster's rows, reds the record through the roster's tests and reached lists; M7 out of those lists as
 * well stays green); every case of this file skipped or marked todo at once (nothing runs to read it; the gate's delivered-file
 * marker scan, standing rule 10, is the backstop).
 * RESIDUALS (named, each with a pinned quiet row): R-COMPOSED a family code assembled at runtime from parts is invisible to B1's
 *    text scan (Q2); its backstop is A2-A5 and B3-B4, which hold every code a reader surfaces to the envelope's primary code, on the
 *    reader paths only; R-INTERRUPTED the stem split by a zero-width code point (Q3); R-HOMOGLYPH one letter swapped for a look-alike
 *    from another script (Q4); R-ENCODED a family code spelled through an encoding familyIn does not decode - a legacy octal escape,
 *    an HTML character reference, percent-encoding (Q5); R-SEVERITY a family code at warning severity on an ok true render does not
 *    demote it, since Pi branches on the producer's ok and severity and never on family membership (A6's warning row); R-WITHHELD
 *    the native refusal and the adapter withhold diagnostic message, hint and metadata, so a CCCA outcome rides the registered
 *    reading only (D2); R-PROSE-OUTCOME D1's whole-tree scan reads an outcome word only as its exact upper-snake token, so a
 *    folded or prose spelling in a src or qa file is not a D1 hit (Pi's own text spells PERMISSION_DENIED folded in five src files
 *    and SOURCE_UNAVAILABLE folded in one, measured at base); the reader surfaces are held by D2's folded matcher instead (D1's
 *    prose control: D1 quiet, D2 hit); R-ADMISSION-UNREAD no Pi reader reads an admission result, so the code an admission refuses with is not echoed today
 *    (C3, C4); R-ACCEPTED-UNBUILT no accepted admission envelope is fixtured (wb-o4h0.3's no-fabrication pin), so the accepted side
 *    is witnessed only through the command gate (C3, C4's non-render-success rows), C1 and C2;
 *    R-COMPOSED-ARGV a group word not spelled as the string literal "workspace" inside the argv itself - assembled by "+", held in
 *    a constant or variable, returned by a call - is never a C1 hit (C1's concatenated and constant-group controls, both quiet);
 *    an argv whose "workspace" element is followed by no planned verb but by a non-literal element, or ends its array literal (the
 *    group with its verb supplied elsewhere: a spread of an identifier, a later push), is a composed site, and C1 pins the list
 *    (one at base, observation.ts assertRef's ["workspace", scope.workspace] validation pair, not an rf argv), so a new one reds.
 * SCOPE: the codes, verbs and outcome words are producer facts at 6a251bf73af5 and the installed rf; Pi vendors no rf schema, so a
 * producer-side change is seen only when a re-measure re-reads them. The armed half (an admission reader branching on registered
 * codes) waits for rfc-bak67.8 (and rfc-0txnl.1 for the RF_FED_* spelling): no reader is added or faked in src.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and qa are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, type RunnerTask } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federation-refusal-codes-roster.json");
/** The tracked bead export: the two owner filings this census is anchored to outside its own literals and its roster. */
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
/** The bead this census pins, and the R694 follow-up bead whose filing names the gate mutants this cut cures. */
const BEAD = "wb-tnz5.3";
const FOLLOW_UP = "wb-iqqy";
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RF_SCHEMA = "reactive-fiber.cli/v1";

interface Family {
  readonly stem: string;
  readonly source: string;
  readonly gate: string;
  readonly codes: readonly string[];
}
/** The two proposed spellings of the federation family, each with every code its program spells (neither is registered). */
const FAMILIES: readonly Family[] = [
  {
    stem: "RF_FED_",
    source: "federated-workspaces-2026-10-18/04-cli-api.md:104",
    gate: "rfc-0txnl.1 (FW-04a)",
    codes: [
      "RF_FED_LINK_NOT_FOUND",
      "RF_FED_INSTANCE_MISMATCH",
      "RF_FED_EXPORT_NOT_FOUND",
      "RF_FED_OPERATION_DENIED",
      "RF_FED_RESOURCE_UNAVAILABLE",
      "RF_FED_STALE",
      "RF_FED_SCHEMA_INCOMPATIBLE",
      "RF_FED_REVISION_CONFLICT",
      "RF_FED_CURSOR_GAP",
      "RF_FED_CYCLE_UNSUPPORTED",
      "RF_FED_SNAPSHOT_INVALID",
    ],
  },
  {
    stem: "RF_FEDERATION_",
    source: "certified-federated-reactive-refinement-2026-10-18/BEADS-2026-10-21.md:22,46",
    gate: "rfc-bak67.8 (FW-CFRR-02b)",
    codes: ["RF_FEDERATION_PIN_CHANGED"],
  },
];
/** One code per family that no program proposes: the statement's "unknown RF_FEDERATION_* code". */
const UNPROPOSED = ["RF_FED_CODE_NOT_PROPOSED", "RF_FEDERATION_CODE_NOT_PROPOSED"];
const PROPOSED = FAMILIES.flatMap(family => family.codes);
const FIXTURE_CODES = [...PROPOSED, ...UNPROPOSED];
/** The gating artifacts of the armed half: the admission service and the RF_FED_* registration. */
const GATING_ARTIFACTS = ["rfc-bak67.8", "FW-CFRR-02b", "rfc-0txnl.1", "FW-04a"];
/** The rf workspace verbs 04-cli-api.md:8-18 plans; an admission result would arrive through one of them. */
const WORKSPACE_VERBS = ["link", "links", "inspect", "exports", "read", "subscribe", "unlink", "invoke"];
/** The CCCA acquisition outcomes, 10-ccca:15-19, in the document's order. */
const OUTCOME_WORDS = [
  "ADMITTED",
  "INFEASIBLE_CAUSAL_BOUNDS",
  "NO_ADMISSIBLE_VERSION",
  "INCOMPLETE_CAUSAL_EVIDENCE",
  "EPOCH_OR_IDENTITY_CHANGE",
  "PERMISSION_DENIED",
  "VERSION_PRUNED",
  "SOURCE_UNAVAILABLE",
  "GRAPH_FENCE_CONFLICT",
  "RETRYABLE_RACE",
];
/** The Pi-owned sites D1 finds at base, each with the anchor that shows it is Pi's own word, never an rf outcome it relabels:
 * the designer diagnostic code SOURCE_UNAVAILABLE and a qa receipt check's own "inconsistencies" list. */
const KNOWN_SITES: Readonly<Record<string, { readonly words: Readonly<Record<string, number>>; readonly anchor: string }>> = {
  "qa/workbench/timeline-grouped-core.mjs": { words: { "<inconsistency>": 4 }, anchor: "pass-flag-contradicts-measurement" },
  "src/workbench/designer.ts": { words: { SOURCE_UNAVAILABLE: 1 }, anchor: 'code: "SOURCE_UNAVAILABLE"' },
};

/** Rows B1 and B2's matcher: an RF_FED stem in any affix or case, closed by an underscore (RF_FED_, RF_FEDERATION_, ...). */
const FAMILY = /RF_FED[A-Z]*_/i;
/** The literal escapes a source or JSON text can spell a character with: \xHH, \uHHHH and \u{H...} (wb-iqqy G3). */
const ESCAPE = /\\x([0-9A-Fa-f]{2})|\\u([0-9A-Fa-f]{4})|\\u\{([0-9A-Fa-f]{1,6})\}/g;
/** The RF_ code tokens a surfaced string names. */
const RF_TOKEN = /RF_[A-Z0-9_]+/g;
/** An inconsistency word in any case. */
const INCONSISTENCY = /inconsisten/i;
/** D2's infeasibility synonym set (wb-iqqy G11): a word that relabels an outcome a mathematical inconsistency, in any case. */
const INFEASIBILITY = /inconsisten|infeasib|contradict|unsatisfiab/i;
/** Row C1's matcher: an rf workspace verb, joined by any run of whitespace, ".", "_" or "-". */
const WORKSPACE_VERB = new RegExp(`\\bworkspace[\\s._-]+(?:${WORKSPACE_VERBS.join("|")})\\b`, "i");
/** The registered render-plane code B3 and B4 put in front of a family code (installed rf REGISTRY row). */
const NON_FAMILY_CODE = "RF_RENDER_FAILED";
/** The one exit class the program states for a family refusal (BEADS-2026-10-21.md:46). */
const REFUSAL_EXIT = 4;
/** Each root's floor sits below the count measured at base e8850da (src 115 files, qa 67), so an emptied walk reds. */
const SRC_FLOOR = 100;
const QA_FLOOR = 50;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a fixture envelope carrying a federation-family refusal surfaces the code verbatim with a non-success tone on every Pi reader surface; an unknown family code stays unknown, never mapped to success or another code",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) no federation-family literal is emitted by Pi without a producer envelope behind it: no src or qa file and no registered descriptor spells the family, and every code a Pi refusal names is its envelope's primary code",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) until rfc-bak67.8 closes and the codes enter rf's diagnostics registry, Pi surfaces no federation admission result: no rf workspace verb in src, the rf roster stays the preview, and both readers refuse an admission envelope",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(FW-R6 CCCA clause) NO_ADMISSIBLE_VERSION is never relabelled a mathematical inconsistency: no Pi file spells an outcome word or an inconsistency word, and the readers echo the outcome only verbatim",
    pins: ["D1", "D2"],
  },
  {
    id: "M",
    label: "the FAMILY matcher rows B1 and B2 read catches every spelling of both stems, stays quiet on the registered non-family FED code, and its named residuals stay pinned quiet",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "Q1", "Q2", "Q3", "Q4", "Q5"],
  },
];

/** The registered cases beside the pins: the judged set (first), the outside anchors (second) and the record (last). */
const JUDGED = "judged";
const ANCHORS = "anchors";
const RECORD = "record";
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster and the cases agree";
const ANCHORS_TITLE =
  "the outside anchors: every duty of the wb-tnz5.3 owner filing sits in exactly one row and its two family stems are FAMILIES', and every gate mutant and pin the wb-iqqy filing names is a registered case";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, every pin's witness matches the roster again, and every case reached its end with its pinned assertion count";
/** The case each registered title belongs to, for CURES: a pin id, or one of the three cases above. */
const CASE_TITLES: Readonly<Record<string, string>> = { [JUDGED]: JUDGED_TITLE, [ANCHORS]: ANCHORS_TITLE, [RECORD]: RECORD_TITLE };
/**
 * The cure of every gate mutant the wb-iqqy filing names (gate cmd_7e522e1cbb46 LEG 2 at landing 274): the registered cases that
 * red on it. F1: G11 / G11d (a prose and a mixed-case relabel of NO_ADMISSIBLE_VERSION in an adapter note) red D2's folded matcher,
 * G17 (a second SOURCE_UNAVAILABLE in designer.ts) reds D1's per-site counts, G9 (a spread-built workspace read argv) and G9c (a
 * flag between group and verb) red C1, G3 (a \u005f-escaped family code in a src literal) reds B1 through familyIn, with M8 its
 * spelling. F2: X-COORD-ROW (row D and its cases out of this file and the roster) reds the anchors case on the filing's CCCA
 * clause; X-COORD-PIN as filed reds the record (the roster's tests and reached lists still name M7; see NOT CLAIMED). F3: X-EACH,
 * X-THIRD and X-SKIP red the record.
 */
const CURES: Readonly<Record<string, readonly string[]>> = {
  G11: ["D2"],
  G11d: ["D2"],
  G17: ["D1"],
  G9: ["C1"],
  G9c: ["C1"],
  G3: ["B1", "M8"],
  "X-COORD-PIN": [RECORD],
  "X-COORD-ROW": [ANCHORS],
  "X-EACH": [RECORD],
  "X-THIRD": [RECORD],
  "X-SKIP": [RECORD],
};

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
  readonly tests: readonly string[];
  readonly reached: readonly string[];
  readonly families: readonly Family[];
  readonly unproposed: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly workspaceVerbs: readonly string[];
  readonly outcomeWords: readonly string[];
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

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.families)) throw new Error("roster must be an object with families and rows");
  const families = raw.families.map((family: unknown, index: number): Family => {
    if (!isObject(family) || typeof family.stem !== "string" || typeof family.source !== "string" || typeof family.gate !== "string") {
      throw new Error(`roster families[${index}] needs a stem, a source and a gate`);
    }
    return { stem: family.stem, source: family.source, gate: family.gate, codes: strings(family.codes, `families[${index}].codes`) };
  });
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
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
    families,
    unproposed: strings(raw.unproposed, "unproposed"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    workspaceVerbs: strings(raw.workspaceVerbs, "workspaceVerbs"),
    outcomeWords: strings(raw.outcomeWords, "outcomeWords"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** A bead's row in the tracked bead export: its title and notes. */
function exportRow(bead: string): { title: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === bead && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`the tracked bead export holds no ${bead} row`);
}
/** An owner filing's head: its notes before the first blank line and before the collect step's first "DELIVERED" line, which every
 * lane append comes after. */
function filingHead(notes: string): string {
  const ends = [notes.indexOf("\n\n"), notes.indexOf("\nDELIVERED ")].filter(at => at >= 0);
  return notes.slice(0, Math.min(notes.length, ...ends));
}
/** The first line of a filing that starts with `head`: the owner filing comes first, so a later lane append cannot displace it. */
function filingLine(notes: string, head: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(head));
  if (line === undefined) throw new Error(`the filing states no line starting ${JSON.stringify(head)}`);
  return line;
}

function diagnosticOf(code: string, severity: "info" | "warning" | "error", metadata: JsonObject = {}): JsonObject {
  return { code, severity, message: "constructed federation diagnostic (no rf emits one today)", hint: null, source: null, metadata };
}
/** The constructed render refusal: `diagnostics` on a context.render failure envelope with a null result. */
function failureEnvelope(diagnostics: JsonValue[], command = "context.render"): Envelope {
  return {
    schema: RF_SCHEMA, ok: false, command, operation_id: RF_FIXTURE_OPERATION_ID, workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: ROOT },
    transaction_id: null, result: null, diagnostics,
  };
}
function refusalOf(code: string, metadata: JsonObject = {}): Envelope {
  return failureEnvelope([diagnosticOf(code, "error", metadata)]);
}
/** A full-shape ok true render (the house fixture) carrying `diagnostics`, its summary counting them. */
function renderWith(diagnostics: JsonObject[]): JsonObject {
  const envelope = fullShapeRf(ROOT) as JsonObject;
  const result = objectOf(envelope.result, "fixture result");
  const errors = diagnostics.filter(item => item.severity === "error").length;
  const warnings = diagnostics.filter(item => item.severity === "warning").length;
  return {
    ...envelope,
    result: { ...result, diagnostics_summary: { errors, warnings, has_errors: errors > 0, has_warnings: warnings > 0 } },
    diagnostics,
  };
}
/** The refusal a workspace read would answer with (CONSTRUCTED; a failure, so no federation success envelope is fabricated). */
function admissionRefusal(): Envelope {
  return failureEnvelope([diagnosticOf("RF_FEDERATION_PIN_CHANGED", "error")], "workspace.read");
}
/** The command-gate control: the full-shape success render re-pointed to rf's served non-family command "version". */
function nonRenderSuccess(): JsonObject {
  return { ...renderWith([]), command: "version" };
}
function tokensOf(texts: readonly string[]): string[] {
  return [...new Set(texts.flatMap(text => text.match(RF_TOKEN) ?? []))].sort();
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
function repoPath(path: string): string {
  return relative(REPO, path);
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: SRC_FLOOR, anchorFile: "workbench/providers/reactivefiber.ts", anchorToken: "RF render refused" },
  { root: "qa", floor: QA_FLOOR, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
/** One root's walk: the floor and the anchor are asserted, and `hits` maps each file to what `match` finds in it. */
function walkRoot(scan: ScanRoot, match: (text: string) => string[]): { summary: JsonObject; hits: Record<string, string[]> } {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  const hits: Record<string, string[]> = {};
  for (const file of files) {
    const found = match(textOf(file));
    if (found.length > 0) hits[repoPath(file)] = found;
  }
  return { summary: { root: scan.root, floor: scan.floor, floorMet, anchorFile: scan.anchorFile, anchorRead }, hits };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface Answer {
  readonly stdout: string;
  readonly exit: number;
}
/**
 * A stand-in `rf` first on PATH. Each spawn appends its argv as one JSON line to the returned log and answers with the entry of
 * `answers` named by its --task value (stdout written as given, then that exit); an unnamed task answers exit 97.
 */
function standInRf(answers: Readonly<Record<string, Answer>>): string {
  const folder = makeScratch("rf-federation-refusal-codes-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const answers = ${JSON.stringify(answers)};`,
      "const argv = process.argv.slice(2);",
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(argv) + "\\n");`,
      'const answer = answers[argv[argv.indexOf("--task") + 1]];',
      'if (answer === undefined) { process.stdout.write("{}"); process.exit(97); }',
      "process.stdout.write(answer.stdout);",
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
/** The distinct verbs the spawns ran: the two argv words after `--workspace <root>`. */
function verbsOf(spawns: readonly string[][]): string[] {
  return [...new Set(spawns.map(argv => argv.slice(2, 4).join(" ")))].sort();
}

function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function capabilityRefusal(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
}
/** One NATIVE registry invocation per task (registerNativeReactiveFiberRender) against one stand-in rf, all in flight at once. */
async function nativeOutcomes(answers: Readonly<Record<string, Answer>>): Promise<{ outcomes: Record<string, NativeOutcome>; spawns: string[][] }> {
  const log = standInRf(answers);
  const registry = new CapabilityRegistry({ deadlineMs: 55_000 });
  registerNativeReactiveFiberRender(registry, ROOT);
  const entries = await Promise.all(
    Object.keys(answers).map(async (task): Promise<[string, NativeOutcome]> => {
      try {
        return [task, { refusal: null, reading: await registry.invoke(PREVIEW_ID, { model: "m", task }, invocationContext()) }];
      } catch (error) {
        return [task, { refusal: capabilityRefusal(error), reading: null }];
      }
    }),
  );
  return { outcomes: Object.fromEntries(entries), spawns: spawnsOf(log) };
}
function refusalAnswer(envelope: unknown, exit = REFUSAL_EXIT): Answer {
  return { stdout: JSON.stringify(envelope), exit };
}

/** One INJECTED registry invocation (registerReactiveFiberRender) whose reader answers `envelope`, asserted byte for byte. */
async function verbatimReading(envelope: Envelope): Promise<JsonObject> {
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  // Byte for byte: the reading's source serializes to exactly the fixture envelope's bytes, key order included.
  expect(JSON.stringify(source)).toBe(JSON.stringify(envelope));
  expect(calls).toBe(1);
  return source;
}
function primaryOf(source: JsonObject): JsonObject {
  return objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "diagnostics[0]");
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function readingOf(source: unknown): JsonValue {
  return json({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source });
}
interface Projection {
  readonly tone: string | null;
  readonly coverage: string | null;
  readonly statusText: string;
  readonly notes: string[];
  /** Every string the projection would surface: the node's title and status text and the diagnostics. */
  readonly shown: string[];
}
/** The adapter's projection of `source` at the rf-cli seam, or its refusal. */
function projectionOf(source: unknown): { projection: Projection | null; refusal: { category: string; message: string } | null } {
  try {
    const topology = reactivefiberTopology(readingOf(source), OBSERVER_CONTEXT);
    const snapshot = topology.snapshots[0];
    const statusText = snapshot?.node.statusText ?? "";
    const notes = [...topology.diagnostics];
    return {
      projection: {
        tone: snapshot?.node.statusTone ?? null, coverage: snapshot?.coverage ?? null, statusText, notes,
        shown: [snapshot?.node.title ?? "", statusText, ...notes],
      },
      refusal: null,
    };
  } catch (error) {
    return { projection: null, refusal: capabilityRefusal(error) };
  }
}
function projected(source: unknown): Projection {
  const { projection, refusal } = projectionOf(source);
  expect(refusal, `the adapter refused: ${refusal?.message ?? ""}`).toBeNull();
  if (projection === null) throw new Error("no projection");
  return projection;
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
function injectedPreviewTexts(): { ids: string[]; texts: string[] } {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
  const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
  return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
}

interface VerbScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  /** One entry (the file) per argv whose "workspace" word is followed by no planned verb but by a non-literal element, or ends it. */
  readonly composedArgv: string[];
}
/** The array methods whose calls C1 reads as one argv (wb-iqqy G9): concat flattens its receiver and arguments, push and unshift
 * append their arguments. */
const ARGV_METHODS = ["concat", "push", "unshift"];
/** An argv's words: a string literal is its text, a spread of an array literal is that literal's words (flattened), anything
 * else null. */
function argvWords(elements: readonly ts.Expression[]): (string | null)[] {
  return elements.flatMap(element => {
    if (ts.isSpreadElement(element) && ts.isArrayLiteralExpression(element.expression)) return argvWords(element.expression.elements);
    return [ts.isStringLiteralLike(element) ? element.text : null];
  });
}
/** True when an array literal is read inside a larger argv: spread into another array literal, or the receiver or an argument of
 * an ARGV_METHODS call. */
function readInside(node: ts.ArrayLiteralExpression): boolean {
  const parent = node.parent;
  if (ts.isSpreadElement(parent) && ts.isArrayLiteralExpression(parent.parent)) return true;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node && ARGV_METHODS.includes(parent.name.text)) return ts.isCallExpression(parent.parent);
  return ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node) && ts.isPropertyAccessExpression(parent.expression) && ARGV_METHODS.includes(parent.expression.name.text);
}
/** One module's rf workspace verbs: an argv (an array literal, spreads of array literals flattened, or an ARGV_METHODS call) with
 * "workspace" followed anywhere later by a planned verb, or a string or template literal spelling one. */
function scanWorkspaceVerbs(fileName: string, text: string): VerbScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const argv: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  const composedArgv: string[] = [];
  const judge = (words: readonly (string | null)[]): void => {
    words.forEach((word, index) => {
      if (word === "context" && words[index + 1] === "render") renderArgv += 1;
      if (word !== "workspace") return;
      const rest = words.slice(index + 1);
      if (rest.some(item => item !== null && WORKSPACE_VERBS.includes(item))) argv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
      else if (rest.length === 0 || rest.includes(null)) composedArgv.push(fileName);
    });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node) && !readInside(node)) judge(argvWords(node.elements));
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && ARGV_METHODS.includes(node.expression.name.text)) {
      const receiver = node.expression.expression;
      const head = ts.isArrayLiteralExpression(receiver) ? argvWords(receiver.elements) : [];
      judge([...head, ...node.arguments.flatMap(argument => (ts.isArrayLiteralExpression(argument) ? argvWords(argument.elements) : argvWords([argument])))]);
    }
    if (ts.isStringLiteralLike(node) && WORKSPACE_VERB.test(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (WORKSPACE_VERB.test(parts.join(" "))) literals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, renderArgv, composedArgv };
}

/** The tokens of `words` a text spells as whole code tokens (no letter, digit or underscore on either side). */
function wordsIn(text: string, words: readonly string[]): string[] {
  return words.filter(word => new RegExp(`(?<![A-Za-z0-9_])${word}(?![A-Za-z0-9_])`).test(text));
}
/** How many times a text spells `word` as a whole code token. */
function occurrencesOf(text: string, word: string): number {
  return (text.match(new RegExp(`(?<![A-Za-z0-9_])${word}(?![A-Za-z0-9_])`, "g")) ?? []).length;
}
/** The outcome words a text spells folded (wb-iqqy G11, G11d): any case, the word's parts joined by any run of whitespace, ".",
 * "_" or "-", or by none, with no letter or digit on either side. */
function foldedIn(text: string): string[] {
  return OUTCOME_WORDS.filter(word => new RegExp(`(?<![A-Za-z0-9])${word.split("_").join("[\\s._-]*")}(?![A-Za-z0-9])`, "i").test(text));
}
/** A text with its literal \x, \u and \u{} escapes decoded to the characters they spell (an out-of-range escape is kept). */
function decodeEscapes(text: string): string {
  return text.replace(ESCAPE, (whole: string, hex?: string, unit?: string, point?: string) => {
    const code = Number.parseInt(hex ?? unit ?? point ?? "", 16);
    return Number.isInteger(code) && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
  });
}
/** FAMILY with the global flag added to its own flags (so FAMILY's case-insensitivity stays the one that decides). */
function familyAll(): RegExp {
  return new RegExp(FAMILY.source, `${FAMILY.flags.replace("g", "")}g`);
}
/** Rows B1, B2 and M's matcher: every family spelling a text carries, read raw and with its literal escapes decoded (wb-iqqy G3). */
function familyIn(text: string): string[] {
  return [...new Set([...(text.match(familyAll()) ?? []), ...(decodeEscapes(text).match(familyAll()) ?? [])])];
}

interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** G3's spelling (wb-iqqy): a src literal whose family code spells its underscore as the escape \u005f (literal backslash). */
const ESCAPED_SPELLING = 'const code = "RF\\u005fFED_STALE";';
/** M1-M8 must hit (M8, wb-iqqy G3: a family code whose underscore is a literal \u005f escape, caught decoded); Q1 is the
 * registered non-family code; Q2 is R-COMPOSED (the source text of a composition), Q3 R-INTERRUPTED, Q4 R-HOMOGLYPH, Q5
 * R-ENCODED (a legacy octal escape, which familyIn does not decode). */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: "RF_FEDERATION_PIN_CHANGED", hit: true },
  { pin: "M2", text: "RF_FED_OPERATION_DENIED", hit: true },
  { pin: "M3", text: "refusals are RF_FEDERATION_* codes", hit: true },
  { pin: "M4", text: ["const code = `RF_FEDERATION_$", "{reason}`;"].join(""), hit: true },
  { pin: "M5", text: "rf_federation_equivocation", hit: true },
  { pin: "M6", text: "RF_FEDERATED_STALE", hit: true },
  { pin: "M7", text: 'if (code === "RF_FED_STALE") return;', hit: true },
  { pin: "M8", text: ESCAPED_SPELLING, hit: true },
  { pin: "Q1", text: "RF_COMPONENT_INSTANCE_UNFED", hit: false },
  { pin: "Q2", text: '"RF_" + "FED" + "_STALE"', hit: false },
  { pin: "Q3", text: `RF_FED${String.fromCodePoint(0x200b)}_STALE`, hit: false },
  { pin: "Q4", text: `RF_F${String.fromCodePoint(0x0415)}D_STALE`, hit: false },
  { pin: "Q5", text: 'const code = "RF\\137FED_STALE";', hit: false },
];

/** The seven native failure shapes of B3, each answered by the stand-in under its own task name. */
function nativeShapes(): Record<string, Answer> {
  return {
    "family-refusal": refusalAnswer(refusalOf("RF_FEDERATION_PIN_CHANGED")),
    "family-behind-primary": refusalAnswer(failureEnvelope([diagnosticOf(NON_FAMILY_CODE, "error"), diagnosticOf("RF_FED_STALE", "warning")])),
    "no-diagnostics": refusalAnswer(failureEnvelope([])),
    "warning-primary": refusalAnswer(failureEnvelope([diagnosticOf("RF_FED_OPERATION_DENIED", "warning")])),
    "exit-zero": refusalAnswer(refusalOf("RF_FED_STALE"), 0),
    "malformed-stdout": { stdout: "RF_FEDERATION_PIN_CHANGED: not a JSON envelope", exit: REFUSAL_EXIT },
    "result-on-failure": refusalAnswer({ ...refusalOf("RF_FED_SNAPSHOT_INVALID"), result: {} }),
  };
}
/** The five reading shapes of B4 (exit and stdout are native-only). */
function readingShapes(): Record<string, unknown> {
  return {
    "family-refusal": refusalOf("RF_FEDERATION_PIN_CHANGED"),
    "family-behind-primary": failureEnvelope([diagnosticOf(NON_FAMILY_CODE, "error"), diagnosticOf("RF_FED_STALE", "warning")]),
    "no-diagnostics": failureEnvelope([]),
    "warning-primary": failureEnvelope([diagnosticOf("RF_FED_OPERATION_DENIED", "warning")]),
    "result-on-failure": { ...refusalOf("RF_FED_SNAPSHOT_INVALID"), result: {} },
  };
}
/** The CCCA refusal of D2: a family code whose primary metadata states the outcome (CONSTRUCTED; no rf states one today). */
function outcomeRefusal(outcome: string): Envelope {
  return refusalOf("RF_FED_RESOURCE_UNAVAILABLE", { outcome, origin: "knowledge" });
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const envelopes = FIXTURE_CODES.map(code => refusalOf(code));
    const everyFailure = envelopes.every(envelope => {
      const primary = objectOf(envelope.diagnostics[0], "fixture diagnostics[0]");
      return envelope.ok === false && envelope.result === null && envelope.command === "context.render" && primary.severity === "error";
    });
    const messageSpellsCode = envelopes.some(envelope => FAMILY.test(String(objectOf(envelope.diagnostics[0], "fixture diagnostics[0]").message)));
    const memberships = FIXTURE_CODES.map(code => FAMILIES.filter(family => code.startsWith(family.stem)).map(family => family.stem));
    const unproposedOutside = UNPROPOSED.every(code => !PROPOSED.includes(code));
    expect(everyFailure).toBe(true);
    expect(messageSpellsCode).toBe(false);
    expect(memberships.every(stems => stems.length === 1)).toBe(true);
    expect(unproposedOutside).toBe(true);
    expect(new Set(FIXTURE_CODES).size).toBe(FIXTURE_CODES.length);
    return {
      families: FAMILIES.map(family => ({ stem: family.stem, codes: family.codes.length })),
      unproposed: [...UNPROPOSED], envelopes: envelopes.length, everyFailure, messageSpellsCode, unproposedOutside,
      exit: REFUSAL_EXIT,
    };
  },
  A2: async () => {
    const { outcomes, spawns } = await nativeOutcomes(Object.fromEntries(PROPOSED.map(code => [code, refusalAnswer(refusalOf(code))])));
    for (const code of PROPOSED) {
      expect(outcomes[code]?.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${code}` });
      expect(outcomes[code]?.reading).toBeNull();
    }
    expect(spawns).toHaveLength(PROPOSED.length);
    return {
      messages: PROPOSED.map(code => outcomes[code]?.refusal?.message ?? null),
      categories: [...new Set(PROPOSED.map(code => outcomes[code]?.refusal?.category ?? null))],
      readings: PROPOSED.filter(code => outcomes[code]?.reading !== null).length, spawns: spawns.length, verbs: verbsOf(spawns),
    };
  },
  A3: async () => {
    const carried: JsonValue[] = [];
    for (const code of PROPOSED) {
      const source = await verbatimReading(refusalOf(code));
      expect(primaryOf(source).code).toBe(code);
      expect(source.ok).toBe(false);
      carried.push({ code: String(primaryOf(source).code), ok: source.ok ?? null });
    }
    return carried;
  },
  A4: async () => {
    const texts: string[] = [];
    for (const code of PROPOSED) {
      const projection = projected(refusalOf(code));
      expect(projection.tone).toBe("failure");
      expect(projection.coverage).toBe("unknown");
      expect(projection.statusText).toBe(`refused · ${code}`);
      expect(projection.notes).toContain(`render refused with ${code}`);
      expect(tokensOf(projection.shown)).toStrictEqual([code]);
      texts.push(projection.statusText);
    }
    const first = projected(refusalOf(PROPOSED[0] ?? ""));
    return { statusTexts: texts, tone: "failure", coverage: "unknown", notes: first.notes.map(note => note.replace(PROPOSED[0] ?? "", "<code>")) };
  },
  A5: async () => {
    const { outcomes, spawns } = await nativeOutcomes(Object.fromEntries(UNPROPOSED.map(code => [code, refusalAnswer(refusalOf(code))])));
    const surfaced: JsonObject = {};
    for (const code of UNPROPOSED) {
      const native = outcomes[code];
      const source = await verbatimReading(refusalOf(code));
      const projection = projected(refusalOf(code));
      const tokens = {
        native: tokensOf([native?.refusal?.message ?? ""]),
        reading: tokensOf([String(primaryOf(source).code)]),
        adapter: tokensOf(projection.shown),
      };
      expect(native?.reading).toBeNull();
      expect(native?.refusal?.category).toBe("unavailable");
      expect(projection.tone).toBe("failure");
      expect(tokens).toStrictEqual({ native: [code], reading: [code], adapter: [code] });
      surfaced[code] = { native: native?.refusal?.message ?? null, adapter: projection.statusText, tone: projection.tone, tokens };
    }
    expect(spawns).toHaveLength(UNPROPOSED.length);
    return { surfaced, spawns: spawns.length };
  },
  A6: async () => {
    const code = "RF_FEDERATION_PIN_CHANGED";
    const flaggedEnvelope = renderWith([diagnosticOf(code, "error")]);
    const { outcomes } = await nativeOutcomes({
      flagged: refusalAnswer(flaggedEnvelope, 0),
      clean: refusalAnswer(renderWith([]), 0),
      warning: refusalAnswer(renderWith([diagnosticOf(code, "warning")]), 0),
    });
    const tones: JsonObject = {};
    for (const name of ["flagged", "clean", "warning"]) {
      const reading = outcomes[name]?.reading;
      expect(outcomes[name]?.refusal, `${name} was refused`).toBeNull();
      const source = objectOf(objectOf(reading ?? null, `${name} reading`).source, `${name} source`);
      const projection = projected(source);
      tones[name] = { tone: projection.tone, coverage: projection.coverage, codes: Array.isArray(source.diagnostics) ? source.diagnostics.map(item => String(objectOf(item, "diagnostic").code)) : [] };
    }
    const flagged = projected(flaggedEnvelope);
    expect(tones.flagged).toStrictEqual({ tone: "unknown", coverage: "partial", codes: [code] });
    expect(flagged.notes).toContain("render reported errors: partial, not a clean render");
    expect(tones.clean).toStrictEqual({ tone: "success", coverage: "complete", codes: [] });
    // R-SEVERITY: the producer's ok true and warning severity decide; Pi never branches on family membership.
    expect(tones.warning).toStrictEqual({ tone: "success", coverage: "complete", codes: [code] });
    return { ...tones, flaggedNote: flagged.notes.includes("render reported errors: partial, not a clean render") };
  },
  B1: async () => {
    const match = familyIn;
    // The walk's own matcher reads literal escapes decoded: G3's \u005f spelling is a hit through it (wb-iqqy G3).
    const control = { escaped: match(ESCAPED_SPELLING), raw: ESCAPED_SPELLING.match(familyAll()) ?? [] };
    expect(control).toStrictEqual({ escaped: ["RF_FED_"], raw: [] });
    const roots = SCAN_ROOTS.map(scan => {
      const { summary, hits } = walkRoot(scan, match);
      expect(hits, `files spelling a federation-family code under ${scan.root}, raw or escaped`).toStrictEqual({});
      return { ...summary, hits: Object.keys(hits) };
    });
    return { roots, control };
  },
  B2: async () => {
    const native = await nativeDescriptors();
    const injected = injectedPreviewTexts();
    const texts = [...native.texts, ...injected.texts];
    const ids = [...native.ids, ...injected.ids];
    const hits = ids.filter((_id, index) => familyIn(texts[index] ?? "").length > 0);
    expect(native.ids.length).toBeGreaterThanOrEqual(4);
    expect(native.ids).toContain(PREVIEW_ID);
    expect(hits).toEqual([]);
    return { descriptorsRead: ids.length, hits };
  },
  B3: async () => {
    const shapes = nativeShapes();
    const { outcomes, spawns } = await nativeOutcomes(shapes);
    const named: JsonObject = {};
    for (const name of Object.keys(shapes)) {
      const outcome = outcomes[name];
      expect(outcome?.reading, `${name} produced a reading`).toBeNull();
      named[name] = { category: outcome?.refusal?.category ?? null, tokens: tokensOf([outcome?.refusal?.message ?? ""]) };
    }
    expect(named["family-refusal"]).toStrictEqual({ category: "unavailable", tokens: ["RF_FEDERATION_PIN_CHANGED"] });
    expect(named["family-behind-primary"]).toStrictEqual({ category: "unavailable", tokens: [NON_FAMILY_CODE] });
    for (const name of ["no-diagnostics", "warning-primary", "exit-zero", "malformed-stdout", "result-on-failure"]) {
      expect(named[name], name).toStrictEqual({ category: "transport", tokens: [] });
    }
    expect(spawns).toHaveLength(Object.keys(shapes).length);
    return { shapes: named, spawns: spawns.length };
  },
  B4: async () => {
    const shapes = readingShapes();
    const named: JsonObject = {};
    for (const [name, source] of Object.entries(shapes)) {
      const { projection, refusal } = projectionOf(source);
      named[name] = projection === null
        ? { refused: refusal?.category ?? null, tokens: tokensOf([refusal?.message ?? ""]) }
        : { tone: projection.tone, tokens: tokensOf(projection.shown) };
    }
    expect(named["family-refusal"]).toStrictEqual({ tone: "failure", tokens: ["RF_FEDERATION_PIN_CHANGED"] });
    expect(named["family-behind-primary"]).toStrictEqual({ tone: "failure", tokens: [NON_FAMILY_CODE] });
    for (const name of ["no-diagnostics", "warning-primary", "result-on-failure"]) {
      expect(named[name], name).toStrictEqual({ refused: "validation", tokens: [] });
    }
    return named;
  },
  C1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanWorkspaceVerbs(repoPath(file), textOf(file)));
    const argv = found.flatMap(result => result.argv);
    const literals = found.flatMap(result => result.literals);
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const composedArgv = found.flatMap(result => result.composedArgv).sort();
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((id, index) => WORKSPACE_VERB.test(texts[index] ?? "") || WORKSPACE_VERB.test(id));
    const srcFloorMet = files.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, descriptorHits }, "an rf workspace verb needs rfc-bak67.8").toStrictEqual({ argv: [], literals: [], descriptorHits: [] });
    // R-COMPOSED-ARGV's pinned quiet row: the one composed site at base is observation.ts assertRef's ["workspace", scope.workspace]
    // validation pair, not an rf argv; a new composed "workspace" argv anywhere in src changes this list.
    expect(composedArgv).toStrictEqual(["src/workbench/observation.ts"]);
    const control = (text: string): JsonValue => {
      const scan = scanWorkspaceVerbs("control.ts", text);
      return { hits: scan.argv.length + scan.literals.length, composedArgv: scan.composedArgv.length };
    };
    const controls = {
      argv: control('spawn("rf", ["workspace", "read", resource, "--json"]);'),
      spaced: control('const command = "rf workspace subscribe knowledge:component_output:test-health --json";'),
      dotted: control('const id = "workspace.read";'),
      template: control(["const command = `rf workspace  link $", "{alias} --pin-instance`;"].join("")),
      composedArgv: control('const verb = "read"; spawn("rf", ["workspace", verb]);'),
      // wb-iqqy G9 / G9c: a spread-built argv, a flag between group and verb, an array-literal concat and a push argument list are
      // hits; a group literal that ends its array (its verb supplied elsewhere) is a composed site.
      spread: control('spawn("rf", [...["workspace"], "read", resource]);'),
      flagged: control('spawn("rf", ["workspace", "--quiet", "read", resource]);'),
      concat: control('spawn("rf", ["workspace"].concat(["read", resource]));'),
      pushed: control('argv.push("workspace", "subscribe");'),
      terminated: control('const group = ["workspace"]; spawn("rf", [...group, "read"]);'),
      // R-COMPOSED-ARGV's pinned quiet rows: a group word assembled by "+" or held in a constant is neither a hit nor composed.
      concatenated: control('spawn("rf", ["work" + "space", "read"]);'),
      constant: control('const group = "workspace"; spawn("rf", [group, "read"]);'),
    };
    return { srcFloorMet, renderArgvSeen, argv, literals, descriptorHits, composedArgv, controls };
  },
  C2: async () => {
    const native = (await nativeDescriptors()).ids.filter(id => id.startsWith("reactivefiber."));
    const injected = injectedPreviewTexts().ids.filter(id => id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injected).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    return { native, injected, reconcile };
  },
  C3: async () => {
    const { outcomes, spawns } = await nativeOutcomes({
      "admission-refused": refusalAnswer(admissionRefusal()),
      "non-render-success": refusalAnswer(nonRenderSuccess(), 0),
    });
    const named: JsonObject = {};
    for (const name of ["admission-refused", "non-render-success"]) {
      const outcome = outcomes[name];
      expect(outcome?.reading, `${name} produced a reading`).toBeNull();
      expect(outcome?.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
      named[name] = { ...(outcome?.refusal ?? {}), tokens: tokensOf([outcome?.refusal?.message ?? ""]) };
    }
    expect(spawns).toHaveLength(2);
    return { ...named, spawns: spawns.length, verbs: verbsOf(spawns) };
  },
  C4: async () => {
    const named: JsonObject = {};
    for (const [name, envelope] of [["admission-refused", admissionRefusal()], ["non-render-success", nonRenderSuccess()]] as const) {
      const { projection, refusal } = projectionOf(envelope);
      expect(projection).toBeNull();
      expect(refusal?.category).toBe("validation");
      named[name] = { ...(refusal ?? {}), tokens: tokensOf([refusal?.message ?? ""]) };
    }
    return named;
  },
  D1: async () => {
    // Every occurrence, not only the word set (wb-iqqy G17: a second same-word spelling inside a known site).
    const occurrences = (text: string): string[] => [
      ...OUTCOME_WORDS.flatMap(word => Array.from({ length: occurrencesOf(text, word) }, () => word)),
      ...Array.from({ length: (text.match(new RegExp(INCONSISTENCY.source, "gi")) ?? []).length }, () => "<inconsistency>"),
    ];
    const tally = (words: readonly string[]): Record<string, number> => {
      const counts: Record<string, number> = {};
      for (const word of words) counts[word] = (counts[word] ?? 0) + 1;
      return counts;
    };
    const roots = SCAN_ROOTS.map(scan => {
      const { summary, hits } = walkRoot(scan, occurrences);
      return { ...summary, hits };
    });
    const counts = Object.fromEntries(roots.flatMap(root => Object.entries(root.hits)).map(([file, words]): [string, Record<string, number>] => [file, tally(words)]));
    const known = Object.fromEntries(Object.entries(KNOWN_SITES).map(([file, site]) => [file, { ...site.words }]));
    expect(counts, "Pi files spelling a CCCA outcome or an inconsistency word, each word with its occurrence count").toStrictEqual(known);
    // Each known site is Pi's own word (its anchor), never an rf outcome it relabels.
    const anchored = Object.entries(KNOWN_SITES).filter(([file, site]) => textOf(join(REPO, file)).includes(site.anchor)).map(([file]) => file);
    expect(anchored).toStrictEqual(Object.keys(KNOWN_SITES));
    // R-PROSE-OUTCOME's pinned quiet row: D1's exact-token walk stays quiet on a folded spelling that D2's matcher catches.
    const prose = "infeasible causal bounds";
    const controls = { prose: { d1: occurrences(prose), d2: foldedIn(prose) } };
    expect(controls).toStrictEqual({ prose: { d1: [], d2: ["INFEASIBLE_CAUSAL_BOUNDS"] } });
    return { roots: roots.map(root => ({ ...root, hits: Object.keys(root.hits) })), anchored, counts, controls };
  },
  D2: async () => {
    const outcomes = ["NO_ADMISSIBLE_VERSION", "INFEASIBLE_CAUSAL_BOUNDS"];
    const { outcomes: native, spawns } = await nativeOutcomes(Object.fromEntries(outcomes.map(outcome => [outcome, refusalAnswer(outcomeRefusal(outcome))])));
    const surfaced: JsonObject = {};
    for (const outcome of outcomes) {
      const source = await verbatimReading(outcomeRefusal(outcome));
      const carried = objectOf(primaryOf(source).metadata, "reading metadata").outcome;
      const projection = projected(outcomeRefusal(outcome));
      const message = native[outcome]?.refusal?.message ?? "";
      const shown = [message, ...projection.shown];
      const named = shown.flatMap(text => wordsIn(text, OUTCOME_WORDS));
      const inconsistency = shown.some(text => INCONSISTENCY.test(text));
      // wb-iqqy G11 / G11d: a prose or mixed-case relabel is caught folded, and a synonym of inconsistency is caught by the set.
      const folded = shown.flatMap(text => foldedIn(text));
      const infeasibility = shown.some(text => INFEASIBILITY.test(text));
      expect(carried).toBe(outcome);
      expect(message).toBe("RF render refused: RF_FED_RESOURCE_UNAVAILABLE");
      expect(projection.tone).toBe("failure");
      expect({ named, inconsistency, folded, infeasibility }).toStrictEqual({ named: [], inconsistency: false, folded: [], infeasibility: false });
      surfaced[outcome] = { carried: String(carried), native: message, adapter: projection.statusText, named, inconsistency, folded, infeasibility };
    }
    expect(spawns).toHaveLength(outcomes.length);
    // The folded matcher and the synonym set: each relabel spelling is caught, the refusal the readers surface stays quiet.
    const controls = {
      folded: ["infeasible causal bounds", "Infeasible_Causal_Bounds", "no-admissible.version", "NoAdmissibleVersion", "RF render refused: RF_FED_RESOURCE_UNAVAILABLE"].map(text => foldedIn(text)),
      infeasibility: ["inconsistent", "an infeasibility", "Contradiction", "unsatisfiable", "refused · RF_FED_RESOURCE_UNAVAILABLE"].map(text => INFEASIBILITY.test(text)),
    };
    expect(controls).toStrictEqual({
      folded: [["INFEASIBLE_CAUSAL_BOUNDS"], ["INFEASIBLE_CAUSAL_BOUNDS"], ["NO_ADMISSIBLE_VERSION"], ["NO_ADMISSIBLE_VERSION"], []],
      infeasibility: [true, true, true, true, false],
    });
    return { surfaced, controls };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = familyIn(spelling.text).length > 0;
        expect(hit).toBe(spelling.hit);
        return { digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
};

/** Every case's witness as its case measured it: the record compares them against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** Every case that reached its end with the assertion count it had run by then: the judged set, the anchors, then each pin after
 * its roster compare, in registration order (the roster's reached list pins them). */
const REACHED: string[] = [];

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test this file registered (vitest's collected task tree), in registration order; `self` marks the reading case. */
function registered(task: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  const walk = (tasks: readonly RunnerTask[]): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  return walked;
}
function describeEntry(entry: Registered): string {
  return `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`;
}
/** The registered tests not collected in run mode, or inverted: a skipped, todo or fails-marked case, the record's included. */
function unrunnable(walked: readonly Registered[]): string[] {
  return walked.filter(entry => entry.mode !== "run" || entry.fails).map(describeEntry);
}

describe("wb-tnz5.3 rf federation refusal codes census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R4, absent-today leg)", () => {
  it(JUDGED_TITLE, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:4", "C:4", "D:2", "M:13"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ families: FAMILIES, unproposed: UNPROPOSED, gatingArtifacts: GATING_ARTIFACTS, workspaceVerbs: WORKSPACE_VERBS, outcomeWords: OUTCOME_WORDS }).toStrictEqual({
      families: ROSTER.families.map(family => ({ ...family, codes: [...family.codes] })), unproposed: [...ROSTER.unproposed],
      gatingArtifacts: [...ROSTER.gatingArtifacts], workspaceVerbs: [...ROSTER.workspaceVerbs], outcomeWords: [...ROSTER.outcomeWords],
    });
    // wb-iqqy F3: the collected registration, read before any other case runs, so a skipped, todo, inverted or missing record or
    // pin reds here as well as in the record.
    const walked = registered(task);
    expect(walked.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(walked.map(entry => entry.name), "the judged set, the anchors, one test per pin in row order, then the record").toEqual([JUDGED_TITLE, ANCHORS_TITLE, ...ROWS.flatMap(row => row.pins), RECORD_TITLE]);
    expect(unrunnable(walked), "every registered test, the record included, is collected in run mode and not inverted").toEqual([]);
    REACHED.push(`${JUDGED}:${expect.getState().assertionCalls}`);
  });

  it(ANCHORS_TITLE, ({ task }) => {
    expect(unrunnable(registered(task)), "every registered test is in run mode").toEqual([]);
    // wb-tnz5.3's owner filing: its Acceptance line and its merged-duplicates line, the first lines starting so.
    const filing = exportRow(BEAD).notes;
    const acceptance = filingLine(filing, "Acceptance: ");
    const merged = filingLine(filing, "Cross-program duplicates merged here");
    const markers = [...acceptance.matchAll(/\(([a-z])\) /g)].map(match => `(${match[1] ?? ""}) `);
    const ccca = /CCCA outcome-word clause \(([^)]+), 10-ccca:17\)/.exec(merged)?.[1] ?? "";
    const stems = [...new Set([...merged.matchAll(/RF_FED[A-Z]*_(?=\*)/g)].map(match => match[0]))];
    const duties = [
      ...markers.map(marker => ({ duty: marker.trim(), rows: ROWS.filter(row => row.label.startsWith(marker)).map(row => row.id) })),
      { duty: "CCCA", rows: ccca === "" ? [] : ROWS.filter(row => row.label.includes(ccca)).map(row => row.id) },
    ];
    expect(markers.length, "the filing's Acceptance line carries its clause markers").toBeGreaterThan(0);
    expect(ccca, "the filing's merged line states the CCCA clause's phrase").not.toBe("");
    expect(duties.filter(entry => entry.rows.length !== 1), "every duty of the owner filing sits in exactly one row label").toEqual([]);
    expect(stems, "FAMILIES' stems are the two proposed stems the filing's merged line spells").toEqual(FAMILIES.map(family => family.stem));
    // wb-iqqy's owner filing: its head (every lane append comes after a blank line and the collect step's DELIVERED line).
    const reading = (notes: string): { mutants: string[]; namedPins: string[] } => {
      const head = filingHead(notes);
      return {
        mutants: [...new Set([...head.matchAll(/\b(?:G\d+[a-z]?|X-[A-Z]+(?:-[A-Z]+)*)\b/g)].map(match => match[0]))],
        namedPins: [...new Set([...head.matchAll(/\b[A-DM]\d\b/g)].map(match => match[0]))],
      };
    };
    const followUpNotes = exportRow(FOLLOW_UP).notes;
    const { mutants, namedPins } = reading(followUpNotes);
    // A lane append (the collect step's delivery note, a gate verdict) naming more mutants and pins leaves the reading unchanged.
    const appendix = "DELIVERED by the orchestrator collect step: G1 G2 G17b X-MATCH2 X-COORD-PIN-FULL D3 M9 Q6.";
    expect([`${followUpNotes}\n\n${appendix}`, `${followUpNotes.trimEnd()}\n${appendix}`].map(reading), "the follow-up filing reads the same after an appended note").toStrictEqual([{ mutants, namedPins }, { mutants, namedPins }]);
    const cases = new Set([...ROWS.flatMap(row => row.pins), ...Object.keys(CASE_TITLES)]);
    const titles = registered(task).map(entry => entry.name);
    const cured = new Set(Object.values(CURES).flat());
    expect(mutants.length, "the follow-up filing names its gate mutants").toBeGreaterThan(0);
    expect(mutants.filter(id => !Object.hasOwn(CURES, id)), "every gate mutant the follow-up filing names has a cure entry").toEqual([]);
    expect(Object.keys(CURES).filter(id => !mutants.includes(id)), "every cure entry is a gate mutant the follow-up filing names").toEqual([]);
    expect(Object.entries(CURES).filter(([, kills]) => kills.length === 0 || kills.some(kill => !cases.has(kill))).map(([id]) => id), "every cure names registered cases").toEqual([]);
    expect([...cured].filter(kill => !titles.includes(CASE_TITLES[kill] ?? kill)), "every cure's case is registered in this file").toEqual([]);
    expect(namedPins.length, "the follow-up filing names census pins").toBeGreaterThan(0);
    expect(namedPins.filter(pin => !cases.has(pin)), "every census pin the follow-up filing names is a registered pin").toEqual([]);
    // A row no filing duty sits in holds a cure's pin (the matcher row M holds M8, G3's spelling).
    expect(ROWS.filter(row => !duties.some(entry => entry.rows.includes(row.id)) && !row.pins.some(pin => cured.has(pin))).map(row => row.id), "every row carries a filing duty or a cure's pin").toEqual([]);
    REACHED.push(`${ANCHORS}:${expect.getState().assertionCalls}`);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async ({ task }) => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          expect(unrunnable(registered(task)), "every registered test, the judged set and the record included, is in run mode").toEqual([]);
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    const walked = registered(task);
    expect(walked.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(describeEntry), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(REACHED, "the judged set, the anchors and every pin reached their ends, in order, with their pinned assertion counts").toEqual([...ROSTER.reached]);
  });
});
