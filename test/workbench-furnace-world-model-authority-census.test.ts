/**
 * wb-b04.1 (FURNACE-WORLD-MODEL-TRACE-ADAPTER-R4, program-triage-2026-10-18, child of epic wb-b04), the world-model
 * authority census: model-predicted records never override the standing authorities.
 * Statement (the bead's tracker-export title, verbatim; the export spells its dash as the six characters backslash, u, 2,
 * 0, 1, 4, read here as DASH): "World-model records never override the standing authorities: a Pi reader shall not mark or
 * alter Beads work state, nor alter or represent Furnace run/attempt supervision state, from a FurnaceObservedTransition or
 * CounterfactualCandidate (or any model-predicted) record DASH Beads stays work-state authority, Furnace stays
 * execution/attempt supervision authority."
 * Owner filing (the export notes' first two blocks, quoted where this file binds them): the citation README.md:4@0f791db71b9d
 * ("leaves Beads as work-state authority and Furnace as execution/attempt supervision authority"); "Gating artifact: released
 * world-model record surface alongside live Beads/Furnace state."; and the acceptance this census delivers, verbatim:
 * "Acceptance shape: negative tests DASH world-model record ingestion issues zero bd mutations (spawn-spy on frozen argv) and
 * zero Furnace control verbs; a projection fed only predicted records leaves Beads work nodes and run/attempt supervision
 * state byte-identical to the record-free baseline."
 *
 * MEASURED (read-only, by the cutting seat ws-04, run g10-work-s129, 2026-10-28, on trunk 7a0ab7f). The program is design
 * only: Furnace docs/programs/world-model-trace-adapter-2026-10-18/README.md:2 at 0f791db71b9d reads "DESIGN ONLY, not a new
 * executor, scheduler or live trace exporter", and 01-architecture.md:11 at the same pin proposes the records
 * (FurnaceObservedTransition {source_revision, run_id, attempt_id, before_ref, event_ref, after_ref, exit_status, reason,
 * native_receipt, capture_completeness, redaction_hash}; CounterfactualCandidate {base_snapshot, intervention,
 * predicted_distribution, scenario_id, authority=none}; SyntheticAttemptState for an exact micro-gym only). No released
 * surface carries them: the installed @furnace/sdk release (128 files, the copy npm ci extracts from
 * vendor/furnace-sdk-0.1.0.tgz) and the 116 src modules spell none of their names or stems. Pi's Beads and Furnace readers
 * take their native clients as parameters, the seams this census drives: the Beads work reader (src/workbench/beads-observer.ts,
 * seam BeadsReadClient: show) and the program readiness reader (src/workbench/beads-program-readiness.ts, seam
 * BeadsProgramClient: show and dependents), whose own texts name the argv a host runs for each call (`bd show <id> --json`;
 * dep list <id> --direction=up --json); the Furnace run reader (src/workbench/furnace-observer.ts, FurnaceObserverClient: run
 * status, attempt list, log read); the attempt log evidence reader (src/workbench/furnace-evidence.ts, a logs-only slice of
 * FurnaceObserverClient carried by FurnaceEvidenceRequest); the run inspect provider (src/workbench/providers/furnace.ts,
 * FurnaceReadClient: run inspect); and the control adapter (src/workbench/furnace-control.ts, FurnaceControlClient: the
 * FURNACE_CONTROL_VERBS table), which executes only a decision the control core minted (decideControl,
 * src/workbench/control.ts, which permits a Furnace stop only on a native-confirmed ownership relation). src binds the vendored
 * Furnace client to them itself (src/index.ts for the run reader and the control adapter, src/workbench/evidence-wiring.ts for
 * the log evidence, and the native inspect in providers/furnace.ts, which constructs it) and binds no Beads reader; no src
 * module launches the bd binary; the show-only bd client wiring (wb-752.12) is open.
 *
 * THE PLANTS. Each record (the title's two names, plus one generic model-predicted record) states an outcome the native state
 * does not hold: the work closed, the outside blocker cleared, the attempt succeeded, the run completed. Every record is
 * planted into every native answer the readers parse, in each placement of BEADS_PLACEMENTS and FURNACE_PLACEMENTS: under
 * every key of PLANT_KEYS, beside the native fields (the record's own fields where the native object has no such key; a
 * native key keeps its native value), as the text of fields the readers never copy, as an extra element after the issue of a
 * bd show envelope, and as an extra log line. A record spliced in as an element of a native array the readers read element by
 * element is a malformed answer, held separately (C4).
 *
 * ROWS (the labels of rows A, B and C tile the acceptance; each judged row's pin quotes tile its label):
 *  A, "world-model record ingestion issues zero bd mutations (spawn-spy on frozen argv)". A1 both Beads readers, driven over
 *    seam spies (a Proxy recording every member read), with every record in every Beads placement, read only the seams' read
 *    members, exactly the record-free baseline's members in the same order, and issue no argv whose verb is not a read verb
 *    (READ_VERBS); A2 every seam call is recorded as the argv its module names, frozen at record time, and each planted
 *    case's argv log (verb, id, cwd, timeout, order) equals the baseline's.
 *  B, "zero Furnace control verbs". B1 the run reader (snapshot, a bounded observe loop and close), the attempt log evidence
 *    reader, the inspect provider and the control adapter, over one spy that also offers every FURNACE_CONTROL_VERBS verb, read
 *    only their read paths under every record in every Furnace placement and call no control verb; every record, and a frozen
 *    permit look-alike carrying one, handed to the adapter as a decision is refused unvetted with no native verb; the control
 *    core over a projection
 *    holding the observed run whose only ownership statements are predicted (hypothesis relations sourced as furnace) denies
 *    no-confirmed-ownership and the adapter refuses that denial with no native verb; the same run with the reader's native
 *    ownership relations is permitted and its one stop reaches the spy (the spy's own non-vacuity).
 *  C, "a projection fed only predicted records leaves Beads work nodes and run/attempt supervision state byte-identical to the
 *    record-free baseline". C1 a projection fed only predicted records (every record stated as hypothesis relations onto the
 *    work, run and attempt refs, the projection's only channel for a model statement) holds no node, as the record-free empty
 *    projection holds none, and the same statements added to the natively populated projection leave every node
 *    byte-identical; C2 the Beads work reading, its projection, the projected work node and the program readiness answer are
 *    byte-identical (JSON text) to the baseline's under every record in every Beads placement; C3 the run reading, its
 *    topology and the projected run and attempt nodes are byte-identical under every record in every Furnace placement (the
 *    reader's clock fixed); C4 the comparison is live: the baseline is a real native reading, each native change (the blocker
 *    closed, the work closed, the attempt succeeded, the run completed) is a byte difference the same comparison reports,
 *    and each splice is refused as a malformed answer (unavailable, or the program read as STORE_UNREACHABLE), never read as
 *    state.
 *  Z, "released world-model record surface alongside live Beads/Furnace state" (the gating artifact). Z1 until it is released
 *    no Pi reader of the records exists: no src module and no file of the installed @furnace/sdk release names one, read as
 *    the NFKC fold of each file (lower-cased, every character outside a-z and 0-9 removed) holding a STEMS member, with
 *    floors, and a planted spelling of each stem found. ARMED: when a release or a src module names one, Z1 reds: the reader
 *    that arrives joins the spies of A, B and C before the census is re-measured.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote and subjects, the constants and every pin's witness - is held to the out-of-file roster
 * (test/fixtures/furnace-world-model-authority-roster.json), every pin has its case in IMPL, and the closing case holds that
 * every pin's case ran and touched exactly the subjects it names (a case returning a constant witness touches nothing).
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - rows A, B and C's labels tile the acceptance after
 * its mark with nothing but separators (whitespace, comma, semicolon, colon, period, parentheses) and the connector "and"
 * between them, row Z's label tiles the gating artifact sentence, and each judged row's pin quotes tile its label the same
 * way, so a row or a pin removed from ROWS, the literal, IMPL and the roster together still reds; the records' names are the
 * title's tokens between "from a " and " (or any model-predicted) record", each planted and each a STEMS member's fold; the
 * seam roster - every exported interface or type alias of src/workbench whose name holds Beads or Furnace and ends in Client
 * - equals the subjects the pins name plus SCOPED_SEAMS exactly, so a new seam reds; each Beads seam's argv is the
 * phrase its own module states; and the control verbs B1 watches are FURNACE_CONTROL_VERBS's own entries, read at run time.
 * RESIDUALS (named, each with its pinned quiet row): R-NATIVE-FIELD a prediction written into a field a reader reads as
 * native (a bd status, a gate bead's ruling text) is the authority's own statement and is read as such (Q1); R-NATIVE-RELAY
 * the inspect provider relays Furnace's native run record verbatim under source, and the log evidence reader shows the
 * attempt's own log lines (redacted, bounded), so a record inside that record, or printed by the executor, rides as Furnace's
 * payload or the attempt's output, from which Pi derives no state (Q2); R-VOCABULARY a record family named in other words is
 * not read by Z1's fold (Q3); R-UNPLANTED-KEY the plants use PLANT_KEYS and the records' own fields, so a reader keyed to any
 * other member name is not exercised: a leaking reader keyed to "forecast" stays quiet under every plant and is caught once a
 * plant spells the key (Q4); R-UNNAMED-SEAM the seam roster reads exported names that end in Client, so a reader whose client
 * is a slice or an alias of a named seam is not listed: the log evidence reader's FurnaceEvidenceRequest.client, a Pick of
 * FurnaceObserverClient, is found by reading src and driven by name, while the roster holds no entry for its module (Q5).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together; a
 * plant placement, plant key or record field removed from its table and the roster together (no outside anchor names the
 * placements; the record names are anchored to the title); a floor lowered with the roster; a residual row removed from ROWS,
 * the literal, IMPL, RESIDUALS and the roster (no outside anchor names the residual families).
 * SCOPE: the census judges the readers Pi has, through their seams; a host that binds a seam (the open wb-752.12 bd client)
 * is not judged until it lands, when its launch argv is the frozen argv A2 maps each call to (and wb-kku9.3's census already
 * holds the work reader's seam to show alone). The furnace-hosted execution host (FurnaceHostedClient, runs.start on an
 * operator's request) is no reader and is not driven (SCOPED_SEAMS). The log evidence reader's content is the attempt's log
 * text, never supervision state, so C3 does not compare it (B1 holds its reads, Q2 its relay). The projection core cannot tell a
 * reader that states a prediction as a snapshot or an ownership relation: Z1 holds that no such reader exists, C1 holds the
 * hypothesis channel.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, the installed release and .beads are only read.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { type BeadsReadClient, type BeadsShowResult, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import { type BeadsProgramClient, readBeadsProgramReadiness, STORE_UNREACHABLE } from "../src/workbench/beads-program-readiness.js";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type ControlDecision, decideControl, type NativeControlRequest } from "../src/workbench/control.js";
import { executeFurnaceControl, FURNACE_CONTROL_VERBS, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { FurnaceObserver, type FurnaceObserverClient } from "../src/workbench/furnace-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
type JsonObject = { readonly [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "furnace-world-model-authority-roster.json");
const BEAD = "wb-b04.1";
const DASH = String.fromCodePoint(0x2014);
/** The export's spelling of the title's dash: a backslash, then u2014. */
const TITLE_DASH = `${String.fromCodePoint(0x5c)}u2014`;
const ACCEPTANCE_MARK = `Acceptance shape: negative tests ${DASH} `;
const GATING_MARK = "Gating artifact: ";
const GATING_END = ". Acceptance shape:";
const RECORD_SPAN = { from: "from a ", to: " (or any model-predicted) record" } as const;
const CONNECTORS = /\band\b/g;
const SEPARATORS = /[\s,;:.()]/g;

const ROOT = "/workspace/wm-authority";
const SCOPE: ObservationScope = { workspace: ROOT, principal: "operator" };
const STAMP = "2026-10-28T00:00:00.000Z";
const WORK_ID = "wb-wm1";
const EPIC = "wb-wmE";
const PREMISE = "wb-wmP";
const BLOCKER = "wb-wmX";
const GATE = "wb-wmG";
const RUN_ID = "frn-run-wm1";
const BEADS_RUN_ID = "bd-run-wm1";
const ATTEMPT_ID = "frn-atm-wm1";
const LIMITS = { maxDependencies: 16, maxTitleChars: 120, timeoutMs: 5000 };
const OBSERVER_LIMITS = { maxPolls: 2, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 };
const PROGRAM = { epics: [EPIC], gates: { [WORK_ID]: GATE } };
/** The argv verbs a Beads seam call may carry: the two read verbs its modules name. */
const READ_VERBS = ["show", "dep list"] as const;
/** Z1's stems: the folds of the record names and of the record family's own words. */
const STEMS = ["observedtransition", "counterfactual", "syntheticattempt", "worldmodel", "predicteddistribution"] as const;
/** The src modules Z1 walks (116 at the cut) and the release files (128): floors, not exact sets. */
const SRC_FLOOR = 100;
const SDK_FLOOR = 100;
/** A Beads or Furnace client seam's name: it holds Beads or Furnace and ends in Client. */
const SEAM_NAME = /^[A-Za-z]*(?:Beads|Furnace)[A-Za-z]*Client$/;
/** Exported seams of src/workbench this census does not drive, each with its reason. */
const SCOPED_SEAMS: Readonly<Record<string, string>> = {
  "src/workbench/furnace-control.ts:VendoredFurnaceControlClient": "the compile-time pin that the vendored client is FurnaceControlClient, driven as such",
  "src/workbench/hosts/furnace-hosted.ts:FurnaceHostedClient": "an execution host that starts a Run on an operator request: no reader",
};

/** The keys a record is planted under. */
const PLANT_KEYS = [
  "world_model",
  "worldModel",
  "prediction",
  "predictions",
  "predicted",
  "counterfactual",
  "counterfactual_candidate",
  "CounterfactualCandidate",
  "observed_transition",
  "FurnaceObservedTransition",
  "model_predicted",
  "simulation",
] as const;
/** The planted records: the program's proposed fields (01-architecture.md:11 at 0f791db71b9d), each stating a false outcome. */
const RECORDS: readonly { readonly name: string; readonly record: JsonObject }[] = [
  {
    name: "FurnaceObservedTransition",
    record: {
      source_revision: "0f791db71b9d",
      run_id: RUN_ID,
      attempt_id: ATTEMPT_ID,
      before_ref: { work: WORK_ID, status: "open", attempt_state: "running", run_state: "active" },
      event_ref: "model:event:1",
      after_ref: { work: WORK_ID, status: "closed", blocker: "closed", attempt_state: "succeeded", run_state: "completed" },
      exit_status: 0,
      reason: "learned transition",
      native_receipt: "model:receipt:1",
      capture_completeness: "complete",
      redaction_hash: `sha256:${"0".repeat(64)}`,
    },
  },
  {
    name: "CounterfactualCandidate",
    record: {
      base_snapshot: { work: WORK_ID, status: "open", run: RUN_ID, run_state: "active" },
      intervention: { close_work: WORK_ID, clear_blocker: BLOCKER, stop_run: RUN_ID, stop_attempt: ATTEMPT_ID },
      predicted_distribution: { closed: 0.97, succeeded: 0.95, completed: 0.93 },
      scenario_id: "scenario-wm-1",
      authority: "none",
    },
  },
  {
    name: "model-predicted",
    record: { model: "transition-model-0", predicted_status: "closed", predicted_blockers: [], predicted_attempt_state: "succeeded", predicted_run_state: "completed" },
  },
];

// ---- native fixtures ----
const WORK_ISSUE: JsonObject = {
  id: WORK_ID,
  title: "World-model authority plant work",
  status: "open",
  issue_type: "task",
  priority: 2,
  parent: EPIC,
  description: "",
  notes: "",
  acceptance_criteria: "",
  dependencies: [
    { id: EPIC, title: "Program epic", status: "open", issue_type: "epic", priority: 1, dependency_type: "parent-child" },
    { id: PREMISE, title: "Closed premise", status: "closed", issue_type: "task", priority: 2, dependency_type: "related" },
    { id: BLOCKER, title: "Outside blocker", status: "open", issue_type: "task", priority: 2, dependency_type: "blocks" },
  ],
};
const GATE_ISSUE: JsonObject = { id: GATE, title: "Program gate", status: "open", issue_type: "task", priority: 2, description: "", notes: "ruled ADOPT", dependencies: [] };
const LISTING: readonly JsonObject[] = [
  { id: WORK_ID, dependency_type: "parent-child", issue_type: "task", labels: ["wp:WM-1"] },
  { id: PREMISE, dependency_type: "related", issue_type: "task", labels: [] },
  { id: GATE, dependency_type: "parent-child", issue_type: "task", labels: [] },
];
const RUN_STATUS: JsonObject = {
  run_id: RUN_ID,
  beads_run_id: BEADS_RUN_ID,
  workspace: ROOT,
  state: "active",
  mode: "ephemeral_wisp",
  furnace_version: "0.1.0",
  created_at: "2026-10-28T00:00:00Z",
  updated_at: "2026-10-28T00:00:01Z",
  state_since: "2026-10-28T00:00:01Z",
  executor: "runner",
  max_parallel: 1,
  active: [],
  failed: [],
  failed_total: 0,
  attention: [],
  unreadable: [],
  corrupt_events: [],
  corrupt_events_total: 0,
  conflicts: [],
  completed: 0,
  total: 1,
};
const ATTEMPT: JsonObject = {
  attempt_id: ATTEMPT_ID,
  run_id: RUN_ID,
  work_id: WORK_ID,
  title: "Attempt one",
  ordinal: 1,
  executor: "runner",
  state: "running",
  created_at: "2026-10-28T00:00:01Z",
  started_at: "2026-10-28T00:00:02Z",
};
const PAGE: JsonObject = { run_id: RUN_ID, beads_run_id: BEADS_RUN_ID, complete: true, limit: 5, returned: 1, next_cursor: null, attempts: [ATTEMPT], unreadable: [] };
const LOGS: JsonObject = { run_id: RUN_ID, attempt_id: ATTEMPT_ID, stream: "stdout", complete: true, limit: 512, returned: 1, next_cursor: null, lossy: false, lines: ["attempt output"] };
const INSPECT: JsonObject = { run_id: RUN_ID, workspace: ROOT, state: "active", beads_run_id: BEADS_RUN_ID };

interface BeadsStore {
  readonly work: readonly Json[];
  readonly gate: readonly Json[];
  readonly listing: readonly Json[];
}
interface FurnaceAnswers {
  readonly status: JsonObject;
  readonly page: JsonObject;
  readonly logs: JsonObject;
  readonly inspect: JsonObject;
}
const BASE_STORE: BeadsStore = { work: [WORK_ISSUE], gate: [GATE_ISSUE], listing: LISTING };
const BASE_ANSWERS: FurnaceAnswers = { status: RUN_STATUS, page: PAGE, logs: LOGS, inspect: INSPECT };

const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const keyed = (record: JsonObject): JsonObject => Object.fromEntries(PLANT_KEYS.map(key => [key, record]));
/** The record's own fields beside the native ones: a native key keeps its native value. */
const beside = (native: JsonObject, record: JsonObject): JsonObject => ({ ...record, ...native });
const entries = (value: Json | undefined): readonly JsonObject[] => (Array.isArray(value) ? value.filter((item): item is JsonObject => isObject(item)) : []);
const text = (record: JsonObject): string => JSON.stringify(record);
const store = (parts: Partial<BeadsStore>): BeadsStore => ({ ...BASE_STORE, ...parts });
const answers = (parts: Partial<FurnaceAnswers>): FurnaceAnswers => ({ ...BASE_ANSWERS, ...parts });

interface Placement<T> {
  readonly id: string;
  readonly place: (record: JsonObject) => T;
}
const BEADS_PLACEMENTS: readonly Placement<BeadsStore>[] = [
  { id: "issue-keys", place: r => store({ work: [{ ...WORK_ISSUE, ...keyed(r) }], gate: [{ ...GATE_ISSUE, ...keyed(r) }] }) },
  { id: "issue-fields", place: r => store({ work: [beside(WORK_ISSUE, r)], gate: [beside(GATE_ISSUE, r)] }) },
  { id: "dependency-keys", place: r => store({ work: [{ ...WORK_ISSUE, dependencies: entries(WORK_ISSUE.dependencies).map(d => ({ ...d, ...keyed(r) })) }] }) },
  { id: "dependency-fields", place: r => store({ work: [{ ...WORK_ISSUE, dependencies: entries(WORK_ISSUE.dependencies).map(d => beside(d, r)) }] }) },
  { id: "text", place: r => store({ work: [{ ...WORK_ISSUE, description: text(r), notes: text(r), acceptance_criteria: text(r) }], gate: [{ ...GATE_ISSUE, description: text(r) }] }) },
  { id: "envelope-tail", place: r => store({ work: [WORK_ISSUE, r], gate: [GATE_ISSUE, r] }) },
  { id: "listing-keys", place: r => store({ listing: LISTING.map(m => ({ ...m, ...keyed(r) })) }) },
  { id: "listing-fields", place: r => store({ listing: LISTING.map(m => beside(m, r)) }) },
];
const FURNACE_PLACEMENTS: readonly Placement<FurnaceAnswers>[] = [
  { id: "status-keys", place: r => answers({ status: { ...RUN_STATUS, ...keyed(r) }, inspect: { ...INSPECT, ...keyed(r) } }) },
  { id: "status-fields", place: r => answers({ status: beside(RUN_STATUS, r), inspect: beside(INSPECT, r) }) },
  { id: "page-keys", place: r => answers({ page: { ...PAGE, ...keyed(r) } }) },
  { id: "attempt-keys", place: r => answers({ page: { ...PAGE, attempts: [{ ...ATTEMPT, ...keyed(r) }] } }) },
  { id: "attempt-fields", place: r => answers({ page: { ...PAGE, attempts: [beside(ATTEMPT, r)] } }) },
  { id: "log-keys", place: r => answers({ logs: { ...LOGS, ...keyed(r) } }) },
  { id: "log-line", place: r => answers({ logs: { ...LOGS, lines: ["attempt output", text(r)] } }) },
];
const beadsCases = (): readonly { readonly id: string; readonly store: BeadsStore }[] =>
  RECORDS.flatMap(({ name, record }) => BEADS_PLACEMENTS.map(placement => ({ id: `${name}/${placement.id}`, store: placement.place(record) })));
const furnaceCases = (): readonly { readonly id: string; readonly answers: FurnaceAnswers }[] =>
  RECORDS.flatMap(({ name, record }) => FURNACE_PLACEMENTS.map(placement => ({ id: `${name}/${placement.id}`, answers: placement.place(record) })));

// ---- spies ----
/** A recording view of an object: every member read is reported by path; a function's object result is recorded under `path()`. */
function recording<T extends object>(target: T, path: string, touch: (path: string) => void): T {
  return new Proxy(target, {
    get(object, key, receiver) {
      const name = typeof key === "symbol" ? `${path}[symbol]` : path ? `${path}.${key}` : key;
      touch(name);
      const value: unknown = Reflect.get(object, key, receiver);
      if (typeof value === "function") {
        return (...args: unknown[]): unknown => {
          const result: unknown = Reflect.apply(value, object, args);
          return isObject(result) && !(result instanceof Promise) ? recording(result, `${name}()`, touch) : result;
        };
      }
      return isObject(value) ? recording(value, name, touch) : value;
    },
  });
}

/** The subjects each pin's case touched, by pin id (the closing case reads it). */
const LIVE = new Map<string, Set<string>>();
interface Live {
  readonly touch: (subject: string) => void;
}
const liveFor = (pin: string): Live => {
  const seen = LIVE.get(pin) ?? new Set<string>();
  LIVE.set(pin, seen);
  return { touch: subject => seen.add(subject) };
};

interface SeamCall {
  readonly argv: readonly string[];
  readonly cwd: string;
  readonly timeoutMs: number;
}
interface SeamLog {
  readonly members: string[];
  readonly calls: SeamCall[];
}
const newLog = (): SeamLog => ({ members: [], calls: [] });
const answer = (value: unknown): BeadsShowResult => ({ exit: 0, stdout: JSON.stringify(value), stderr: "" });
const missing: BeadsShowResult = { exit: 1, stdout: "", stderr: "no such issue" };
function record(log: SeamLog, argv: readonly string[], call: { cwd: string; timeoutMs: number }): void {
  log.calls.push(Object.freeze({ argv: Object.freeze([...argv]), cwd: call.cwd, timeoutMs: call.timeoutMs }));
}
function showOf(beads: BeadsStore, id: string): BeadsShowResult {
  return id === WORK_ID ? answer(beads.work) : id === GATE ? answer(beads.gate) : missing;
}
/** The work reader's seam (show alone), recording every member read and every call as the argv its module names. */
function workSeam(beads: BeadsStore, log: SeamLog, live: Live): BeadsReadClient {
  const target: BeadsReadClient = {
    async show(id, call) {
      record(log, ["bd", "show", id, "--json"], call);
      return showOf(beads, id);
    },
  };
  return recording(target, "", name => {
    log.members.push(name);
    live.touch("BeadsReadClient");
  });
}
/** The program reader's seam (show and dependents). */
function programSeam(beads: BeadsStore, log: SeamLog, live: Live): BeadsProgramClient {
  const target: BeadsProgramClient = {
    async show(id, call) {
      record(log, ["bd", "show", id, "--json"], call);
      return showOf(beads, id);
    },
    async dependents(id, call) {
      record(log, ["bd", "dep", "list", id, "--direction=up", "--json"], call);
      return answer(id === EPIC ? beads.listing : []);
    },
  };
  return recording(target, "", name => {
    log.members.push(name);
    live.touch("BeadsProgramClient");
  });
}
const verbOf = (argv: readonly string[]): string => (argv[1] === "dep" ? `dep ${argv[2] ?? ""}` : (argv[1] ?? ""));
const readVerb = (argv: readonly string[]): boolean => (READ_VERBS as readonly string[]).includes(verbOf(argv));

/** One Furnace client offering the readers' reads and every control verb; reads and calls are recorded. */
interface FurnaceLog {
  readonly touched: string[];
  readonly calls: string[];
}
const newFurnaceLog = (): FurnaceLog => ({ touched: [], calls: [] });
function furnaceTarget(native: FurnaceAnswers, log: FurnaceLog): object {
  const response = (kind: string, requestId: string, data: Json) => ({ kind, requestId, exit: { code: 0, signal: null }, data });
  const control =
    (name: string, kind: string) =>
    async (...args: unknown[]) => {
      log.calls.push(name);
      const options = args.find(arg => isObject(arg) && typeof arg.requestId === "string");
      const requestId = isObject(options) && typeof options.requestId === "string" ? options.requestId : "req-control";
      return response(kind, requestId, { ...RUN_STATUS, state: "stopped" });
    };
  return {
    runs: {
      get: () => ({
        status: async () => response("run_status", "req-status", native.status),
        inspect: async () => response("run_inspect", "req-inspect", native.inspect),
        pause: control("runs.get().pause", "run_pause"),
        stop: control("runs.get().stop", "run_stop"),
        resume: control("runs.get().resume", "run_resume"),
      }),
      pause: control("runs.pause", "run_pause"),
      stop: control("runs.stop", "run_stop"),
      resume: control("runs.resume", "run_resume"),
    },
    attempts: { list: async () => response("attempt_list", "req-attempts", native.page), stop: control("attempts.stop", "attempt_stop") },
    logs: { read: async () => response("logs_read", "req-logs", native.logs) },
  };
}
function furnaceClient(native: FurnaceAnswers, log: FurnaceLog, live: Live, subject: string): object {
  return recording(furnaceTarget(native, log), "", name => {
    log.touched.push(name);
    live.touch(subject);
  });
}
/** The control-verb paths: FURNACE_CONTROL_VERBS's own entries, run verbs on runs (and a run handle), attempt verbs on attempts. */
function controlPaths(): readonly string[] {
  const owners: Readonly<Record<string, readonly string[]>> = { run: ["runs", "runs.get()"], attempt: ["attempts"] };
  return Object.entries(FURNACE_CONTROL_VERBS)
    .flatMap(([type, verbs]) => Object.keys(verbs).flatMap(action => (owners[type] ?? [`${type}s`]).map(owner => `${owner}.${action}`)))
    .sort();
}
const distinct = (values: readonly string[]): readonly string[] => [...new Set(values)].sort();

// ---- readers ----
async function readWork(beads: BeadsStore, live: Live, log: SeamLog = newLog()) {
  return readBeadsWork(workSeam(beads, log, live), { workId: WORK_ID, workspaceRoot: ROOT, scope: SCOPE, limits: LIMITS, now: () => STAMP });
}
async function readProgram(beads: BeadsStore, live: Live, log: SeamLog = newLog()) {
  return readBeadsProgramReadiness(programSeam(beads, log, live), { program: PROGRAM, workspaceRoot: ROOT, scope: SCOPE, limits: LIMITS, now: () => STAMP, readWork: readBeadsWork });
}
const workRef: NativeRef = { provider: "beads", type: "work", id: WORK_ID, scope: ROOT };
const runRef: NativeRef = { provider: "furnace", type: "run", id: RUN_ID, scope: ROOT };
const attemptRef: NativeRef = { provider: "furnace", type: "attempt", id: ATTEMPT_ID, scope: ROOT };
const nodeOf = (projection: ObservationProjection, ref: NativeRef) => projection.query({ scope: SCOPE, ref, limit: 1 }).nodes;
/** The Beads work reading, its projection and the projected work node, as JSON text, with the program readiness answer. */
async function beadsBytes(beads: BeadsStore, live: Live) {
  const reading = await readWork(beads, live);
  const projected = projectBeadsWork(reading, SCOPE);
  const projection = new ObservationProjection();
  projection.refresh(projected.snapshot);
  for (const relation of projected.relations) projection.relate(relation);
  const readiness = await readProgram(beads, live);
  const node = nodeOf(projection, workRef);
  return { bytes: JSON.stringify({ reading, projected, node }), readiness: JSON.stringify(readiness), node: node[0], readinessValue: readiness };
}
function observerFor(native: FurnaceAnswers, log: FurnaceLog, live: Live): FurnaceObserver {
  const client = furnaceClient(native, log, live, "FurnaceObserverClient") as unknown as FurnaceObserverClient;
  return new FurnaceObserver(client, { workspaceRoot: ROOT, runId: RUN_ID, scope: SCOPE, limits: OBSERVER_LIMITS });
}
/** The attempt log evidence read of the attempt the run node lists, over the logs-only slice of the same spy. */
function evidenceOf(native: FurnaceAnswers, log: FurnaceLog, live: Live) {
  const client = furnaceClient(native, log, live, "FurnaceEvidenceRequest") as unknown as Pick<FurnaceObserverClient, "logs">;
  return readFurnaceAttemptLogEvidence({
    client,
    runId: RUN_ID,
    workspaceRoot: ROOT,
    owningRunNode: { nativeRef: runRef, evidenceRefs: [ATTEMPT_ID] },
    attemptId: ATTEMPT_ID,
    stream: "stdout",
    maxBytes: 512,
    maxLines: 20,
    timeoutMs: 2000,
    signal: new AbortController().signal,
    capturedAt: () => STAMP,
  });
}
/** The run reading, its topology and the projected run and attempt nodes, as JSON text, the reader's clock fixed. */
async function furnaceBytes(native: FurnaceAnswers, live: Live) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(STAMP));
  try {
    const observer = observerFor(native, newFurnaceLog(), live);
    const reading = await observer.snapshot();
    const topology = observer.projectionTopology(reading);
    const projection = new ObservationProjection();
    for (const snapshot of topology.snapshots) projection.refresh(snapshot);
    for (const relation of topology.relations) projection.relate(relation);
    const nodes = [...nodeOf(projection, runRef), ...nodeOf(projection, attemptRef)];
    return { bytes: JSON.stringify({ reading, topology, nodes }), nodes, topology };
  } finally {
    vi.useRealTimers();
  }
}
const tone = (node: { presentation: { statusText: string; statusTone: string } } | undefined) =>
  node ? { statusText: node.presentation.statusText, statusTone: node.presentation.statusTone } : null;
async function refusalOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
    return "resolved";
  } catch (error) {
    if (error instanceof FurnaceControlRefusal) return error.refusal;
    if (error instanceof CapabilityError) return error.category;
    return "error";
  }
}
/** Each record stated as a hypothesis relation from its own predicted ref onto the work, run and attempt refs. */
function predictedStatements() {
  return RECORDS.flatMap(({ name }) =>
    [workRef, runRef, attemptRef].map(to => ({
      scope: SCOPE,
      from: { provider: "world-model", type: name, id: "scenario-wm-1", scope: ROOT },
      to,
      kind: "hypothesis" as const,
      provenance: { source: "furnace", observedAt: STAMP, nativeConfirmationRef: `model:${name}` },
    })),
  );
}

// ---- Z1's fold ----
const fold = (value: string): string => value.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
const stemsIn = (value: string): readonly string[] => STEMS.filter(stem => fold(value).includes(stem));
function filesUnder(dir: string, keep: (name: string) => boolean): readonly string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && keep(entry.name))
    .map(entry => join(entry.parentPath, entry.name))
    .sort();
}

// ---- the cases ----
const IMPL: Readonly<Record<string, (live: Live) => Promise<Json>>> = {
  async A1(live) {
    const readers = [
      { seam: "BeadsReadClient", run: (beads: BeadsStore, log: SeamLog) => readWork(beads, live, log) },
      { seam: "BeadsProgramClient", run: (beads: BeadsStore, log: SeamLog) => readProgram(beads, live, log) },
    ];
    const seams: Record<string, Json> = {};
    let writes = 0;
    for (const { seam, run } of readers) {
      const baseline = newLog();
      await run(BASE_STORE, baseline);
      for (const planted of beadsCases()) {
        const log = newLog();
        await run(planted.store, log);
        expect(log.members, `${seam} ${planted.id}`).toEqual(baseline.members);
        writes += log.calls.filter(call => !readVerb(call.argv)).length;
      }
      writes += baseline.calls.filter(call => !readVerb(call.argv)).length;
      seams[seam] = { members: distinct(baseline.members), verbs: distinct(baseline.calls.map(call => verbOf(call.argv))) };
    }
    expect(writes).toBe(0);
    return { cases: beadsCases().length, seams, writes, readVerbs: [...READ_VERBS] };
  },
  async A2(live) {
    const readers = [
      { seam: "BeadsReadClient", run: (beads: BeadsStore, log: SeamLog) => readWork(beads, live, log) },
      { seam: "BeadsProgramClient", run: (beads: BeadsStore, log: SeamLog) => readProgram(beads, live, log) },
    ];
    const argv: Record<string, Json> = {};
    let frozen = true;
    for (const { seam, run } of readers) {
      const baseline = newLog();
      await run(BASE_STORE, baseline);
      for (const planted of beadsCases()) {
        const log = newLog();
        await run(planted.store, log);
        expect(log.calls, `${seam} ${planted.id}`).toEqual(baseline.calls);
        frozen &&= log.calls.every(call => Object.isFrozen(call) && Object.isFrozen(call.argv));
      }
      frozen &&= baseline.calls.every(call => Object.isFrozen(call) && Object.isFrozen(call.argv));
      argv[seam] = baseline.calls.map(call => ({ argv: [...call.argv], cwd: call.cwd === ROOT ? "<root>" : call.cwd, timeoutMs: call.timeoutMs }));
    }
    expect(frozen).toBe(true);
    return { cases: beadsCases().length, argv, frozen };
  },
  async B1(live) {
    const watched = controlPaths();
    const controlTouched = (log: FurnaceLog): readonly string[] => log.touched.filter(path => watched.includes(path));
    // The run reader: snapshot, a bounded observe loop and close.
    const observerRun = async (native: FurnaceAnswers): Promise<FurnaceLog> => {
      const log = newFurnaceLog();
      const observer = observerFor(native, log, live);
      await observer.snapshot();
      for await (const reading of observer.observe()) expect(reading.source.runId).toBe(RUN_ID);
      observer.close();
      return log;
    };
    // The attempt log evidence reader, over the logs-only slice.
    const evidenceRun = async (native: FurnaceAnswers): Promise<FurnaceLog> => {
      const log = newFurnaceLog();
      await evidenceOf(native, log, live);
      return log;
    };
    // The inspect provider, through the registry.
    const inspectRun = async (native: FurnaceAnswers): Promise<FurnaceLog> => {
      const log = newFurnaceLog();
      const registry = new CapabilityRegistry();
      registerFurnaceRunInspect(registry, furnaceClient(native, log, live, "FurnaceReadClient") as unknown as FurnaceReadClient, ROOT);
      await registry.invoke("furnace.run.inspect", { runId: RUN_ID }, { grants: ["furnace:inspect"], signal: new AbortController().signal });
      return log;
    };
    const surfaces: Record<string, Json> = {};
    for (const [surface, run] of [
      ["observer", observerRun],
      ["evidence", evidenceRun],
      ["inspect", inspectRun],
    ] as const) {
      const baseline = await run(BASE_ANSWERS);
      let control = controlTouched(baseline).length + baseline.calls.length;
      for (const planted of furnaceCases()) {
        const log = await run(planted.answers);
        expect(distinct(log.touched), `${surface} ${planted.id}`).toEqual(distinct(baseline.touched));
        control += controlTouched(log).length + log.calls.length;
      }
      surfaces[surface] = { reads: distinct(baseline.touched), control };
    }
    // The control adapter: every record, and a frozen permit look-alike carrying one, handed to it as a decision.
    const adapterLog = newFurnaceLog();
    const adapterClient = furnaceClient(BASE_ANSWERS, adapterLog, live, "FurnaceControlClient") as unknown as FurnaceControlClient;
    const deps = { client: adapterClient, workspaceRoot: ROOT, now: () => STAMP, timeoutMs: 1000 };
    const refusals: string[] = [];
    for (const { record } of RECORDS) {
      for (const decision of [record, Object.freeze({ decision: "permitted", receipt: Object.freeze({ phase: "requested", record }), prediction: record })]) {
        const refusal = await refusalOf(executeFurnaceControl(decision as unknown as ControlDecision, deps));
        if (refusal === "unvetted-decision") live.touch("FurnaceControlClient");
        refusals.push(refusal);
      }
    }
    const adapter = { refusals: distinct(refusals), decisions: refusals.length, touched: adapterLog.touched.length, calls: adapterLog.calls.length };
    // The control core: the observed run whose only ownership statements are predicted, then the reader's native relations.
    const { topology: native } = await furnaceBytes(BASE_ANSWERS, live);
    const request: NativeControlRequest = {
      scope: SCOPE,
      principal: { id: SCOPE.principal },
      grants: ["control:furnace.stop"],
      target: runRef,
      action: "stop",
      params: { confirmed: true },
      invocationId: "inv-wm-1",
      requestedAt: STAMP,
    };
    const predictedOnly = new ObservationProjection();
    for (const snapshot of native.snapshots) predictedOnly.refresh(snapshot);
    for (const statement of predictedStatements()) predictedOnly.relate({ ...statement, from: runRef, to: attemptRef });
    const denied = decideControl(request, { projection: predictedOnly, now: () => STAMP });
    const coreLog = newFurnaceLog();
    const coreDeps = { ...deps, client: furnaceClient(BASE_ANSWERS, coreLog, live, "FurnaceControlClient") as unknown as FurnaceControlClient };
    const deniedRefusal = await refusalOf(executeFurnaceControl(denied, coreDeps));
    const owned = new ObservationProjection();
    for (const snapshot of native.snapshots) owned.refresh(snapshot);
    for (const relation of native.relations) owned.relate(relation);
    const permitted = decideControl(request, { projection: owned, now: () => STAMP });
    const deniedCalls = coreLog.calls.length;
    await executeFurnaceControl(permitted, coreDeps);
    const core = {
      predictedOnly: denied.decision === "denied" ? denied.policy : "permitted",
      deniedRefusal,
      deniedCalls,
      nativeOwnership: permitted.decision,
      nativeCalls: [...coreLog.calls],
    };
    expect(core.nativeCalls).toEqual(["runs.stop"]);
    return { watched: [...watched], ...surfaces, adapter, core };
  },
  async C1(live) {
    const statements = predictedStatements();
    const empty = new ObservationProjection();
    const fed = new ObservationProjection();
    for (const statement of statements) fed.relate(statement);
    const emptyNodes = JSON.stringify(empty.query({ scope: SCOPE, limit: 100 }).nodes);
    const fedNodes = JSON.stringify(fed.query({ scope: SCOPE, limit: 100 }).nodes);
    // The natively populated projection: the baseline Beads and Furnace readings, then the same statements.
    const populated = new ObservationProjection();
    const reading = await readWork(BASE_STORE, live);
    const projected = projectBeadsWork(reading, SCOPE);
    populated.refresh(projected.snapshot);
    for (const relation of projected.relations) populated.relate(relation);
    const furnace = await furnaceBytes(BASE_ANSWERS, live);
    for (const snapshot of furnace.topology.snapshots) populated.refresh(snapshot);
    for (const relation of furnace.topology.relations) populated.relate(relation);
    const refs = [workRef, runRef, attemptRef];
    const before = JSON.stringify(refs.map(ref => nodeOf(populated, ref)));
    const edgesBefore = populated.stats().edges;
    for (const statement of statements) populated.relate(statement);
    const after = JSON.stringify(refs.map(ref => nodeOf(populated, ref)));
    return {
      statements: statements.length,
      predictedOnlyNodes: fed.stats().nodes,
      predictedOnlyIdentical: fedNodes === emptyNodes,
      populatedNodes: refs.map(ref => nodeOf(populated, ref).length),
      populatedIdentical: after === before,
      edgesAdded: populated.stats().edges - edgesBefore,
    };
  },
  async C2(live) {
    const baseline = await beadsBytes(BASE_STORE, live);
    let identical = 0;
    for (const planted of beadsCases()) {
      const measured = await beadsBytes(planted.store, live);
      expect(measured.bytes, planted.id).toBe(baseline.bytes);
      expect(measured.readiness, planted.id).toBe(baseline.readiness);
      identical += 1;
    }
    const child = baseline.readinessValue.children[0];
    return {
      cases: beadsCases().length,
      identical,
      work: tone(baseline.node),
      readiness: { ready: baseline.readinessValue.ready, waitingOn: child?.waitingOn ?? null, gate: child?.gate?.verdict ?? null },
    };
  },
  async C3(live) {
    const baseline = await furnaceBytes(BASE_ANSWERS, live);
    let identical = 0;
    for (const planted of furnaceCases()) {
      const measured = await furnaceBytes(planted.answers, live);
      expect(measured.bytes, planted.id).toBe(baseline.bytes);
      identical += 1;
    }
    return { cases: furnaceCases().length, identical, nodes: baseline.nodes.map(tone) };
  },
  async C4(live) {
    const beads = await beadsBytes(BASE_STORE, live);
    const furnace = await furnaceBytes(BASE_ANSWERS, live);
    const changedDependencies = entries(WORK_ISSUE.dependencies).map(d => (d.id === BLOCKER ? { ...d, status: "closed" } : d));
    const blockerClosed = await beadsBytes(store({ work: [{ ...WORK_ISSUE, dependencies: changedDependencies }] }), live);
    const workClosed = await beadsBytes(store({ work: [{ ...WORK_ISSUE, status: "closed" }] }), live);
    const attemptSucceeded = await furnaceBytes(answers({ page: { ...PAGE, attempts: [{ ...ATTEMPT, state: "succeeded", finished_at: "2026-10-28T00:00:03Z" }] } }), live);
    const runCompleted = await furnaceBytes(answers({ status: { ...RUN_STATUS, state: "completed" } }), live);
    const [first] = RECORDS;
    const spliced = first?.record ?? {};
    const splices = {
      "dependency-element": await refusalOf(readWork(store({ work: [{ ...WORK_ISSUE, dependencies: [...entries(WORK_ISSUE.dependencies), spliced] }] }), live)),
      "listing-element": (await readProgram(store({ listing: [...LISTING, spliced] }), live)).store,
      "attempt-element": await refusalOf(furnaceBytes(answers({ page: { ...PAGE, returned: 2, attempts: [ATTEMPT, spliced] } }), live)),
    };
    expect(splices["listing-element"]).toBe(STORE_UNREACHABLE);
    return {
      baseline: { work: tone(beads.node), ready: beads.readinessValue.ready, nodes: furnace.nodes.map(tone) },
      changes: {
        "blocker-closed": { differs: blockerClosed.readiness !== beads.readiness && blockerClosed.bytes !== beads.bytes, ready: blockerClosed.readinessValue.ready },
        "work-closed": { differs: workClosed.bytes !== beads.bytes, work: tone(workClosed.node) },
        "attempt-succeeded": { differs: attemptSucceeded.bytes !== furnace.bytes, nodes: attemptSucceeded.nodes.map(tone) },
        "run-completed": { differs: runCompleted.bytes !== furnace.bytes, nodes: runCompleted.nodes.map(tone) },
      },
      splices,
    };
  },
  async Z1(live) {
    const src = filesUnder(join(REPO, "src"), name => name.endsWith(".ts"));
    const sdkRoot = join(REPO, "node_modules", "@furnace", "sdk");
    const sdk = filesUnder(sdkRoot, () => true);
    const mentions: string[] = [];
    for (const [subject, files] of [
      ["src", src],
      ["@furnace/sdk", sdk],
    ] as const) {
      for (const file of files) {
        const found = stemsIn(readFileSync(file, "utf8"));
        live.touch(subject);
        if (found.length > 0) mentions.push(`${relative(REPO, file)}: ${found.join(",")}`);
      }
    }
    const version: unknown = JSON.parse(readFileSync(join(sdkRoot, "package.json"), "utf8"));
    const plants = ["FurnaceObservedTransition", "counterfactual_candidate", "Synthetic Attempt State", "world-model", "predicted_distribution"];
    expect(mentions, "ARMED: a release or src module names a world-model record; drive its reader through A, B and C, then re-measure").toEqual([]);
    return {
      floors: { src: src.length >= SRC_FLOOR, sdk: sdk.length >= SDK_FLOOR },
      release: isObject(version) && typeof version.name === "string" ? version.name : null,
      mentions,
      plants: plants.map(plant => stemsIn(plant)),
    };
  },
  async Q1(live) {
    const counterfactual = RECORDS.find(entry => entry.name === "CounterfactualCandidate")?.record ?? {};
    const status = await beadsBytes(store({ work: [{ ...WORK_ISSUE, status: "closed" }] }), live);
    const gateText = await readProgram(store({ gate: [{ ...GATE_ISSUE, notes: `ruled ADOPT\n${text({ ...counterfactual, predicted_ruling: "ruled REJECT" })}` }] }), live);
    return { nativeStatus: tone(status.node), gateVerdict: gateText.children[0]?.gate?.verdict ?? null };
  },
  async Q2(live) {
    // The inspect provider relays the native run record verbatim under source.
    const log = newFurnaceLog();
    const registry = new CapabilityRegistry();
    const native = answers({ inspect: { ...INSPECT, ...keyed(RECORDS[1]?.record ?? {}) } });
    registerFurnaceRunInspect(registry, furnaceClient(native, log, live, "FurnaceReadClient") as unknown as FurnaceReadClient, ROOT);
    const reply: unknown = await registry.invoke("furnace.run.inspect", { runId: RUN_ID }, { grants: ["furnace:inspect"], signal: new AbortController().signal });
    const source = isObject(reply) && isObject(reply.source) ? reply.source : {};
    const data = isObject(source.data) ? source.data : {};
    // The log evidence reader shows a record the executor printed as one more log row, its own fields unchanged.
    const baseline = await evidenceOf(BASE_ANSWERS, log, live);
    const printed = await evidenceOf(answers({ logs: { ...LOGS, lines: ["attempt output", text(RECORDS[2]?.record ?? {})] } }), log, live);
    return {
      inspect: { contract: isObject(reply) && typeof reply.contract === "string" ? reply.contract : null, relayed: PLANT_KEYS.filter(key => Object.hasOwn(data, key)).length },
      evidence: {
        rows: printed.preview.length,
        recordShown: printed.preview.some(row => row.includes("predicted_status")),
        truncated: printed.truncated,
        lineCount: printed.lineCount,
        sameRef: JSON.stringify(printed.nativeRef) === JSON.stringify(baseline.nativeRef),
        sameReceipt: JSON.stringify(printed.producerReceipt) === JSON.stringify(baseline.producerReceipt),
      },
      calls: log.calls.length,
    };
  },
  async Q3(live) {
    const words = ["WhatIfCandidate", "ScenarioBranch", "forecast record", "simulated outcome", "PredictedTransition", "learned dynamics"];
    live.touch("fold");
    return { quiet: words.filter(word => stemsIn(word).length === 0) };
  },
  async Q4(live) {
    // A reader keyed to a member no plant spells: it copies a top-level `forecast` into the work status.
    const leaky = async (beads: BeadsStore): Promise<string> => {
      const reading = await readWork(beads, live);
      const [issue] = beads.work;
      const forecast = isObject(issue) ? issue.forecast : undefined;
      return JSON.stringify(typeof forecast === "string" ? { ...reading, work: { ...reading.work, status: forecast } } : reading);
    };
    const baseline = await leaky(BASE_STORE);
    let quiet = 0;
    for (const planted of beadsCases()) if ((await leaky(planted.store)) === baseline) quiet += 1;
    const caught = (await leaky(store({ work: [{ ...WORK_ISSUE, forecast: "closed" }] }))) !== baseline;
    return { cases: beadsCases().length, quiet, caught };
  },
  async Q5(live) {
    // The log evidence reader's client is a slice of a named seam, so the seam roster holds no entry for its module.
    const file = "src/workbench/furnace-evidence.ts";
    const source = ts.createSourceFile(file, readFileSync(join(REPO, file), "utf8"), ts.ScriptTarget.Latest, true);
    live.touch("src");
    const request = source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === "FurnaceEvidenceRequest");
    const member = request?.members.find(entry => ts.isPropertySignature(entry) && ts.isIdentifier(entry.name) && entry.name.text === "client");
    const clientType = member && ts.isPropertySignature(member) ? (member.type?.getText(source) ?? null) : null;
    return { module: file, clientType, rosterEntries: seamRoster().filter(entry => entry.startsWith(`${file}:`)).length };
  },
};

// ---- the judged set ----
interface Pin {
  readonly id: string;
  readonly quote: string;
  readonly subjects: readonly string[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "world-model record ingestion issues zero bd mutations (spawn-spy on frozen argv)",
    pins: [
      { id: "A1", quote: "world-model record ingestion issues zero bd mutations", subjects: ["BeadsProgramClient", "BeadsReadClient"] },
      { id: "A2", quote: "spawn-spy on frozen argv", subjects: ["BeadsProgramClient", "BeadsReadClient"] },
    ],
  },
  {
    id: "B",
    label: "zero Furnace control verbs",
    pins: [{ id: "B1", quote: "zero Furnace control verbs", subjects: ["FurnaceControlClient", "FurnaceEvidenceRequest", "FurnaceObserverClient", "FurnaceReadClient"] }],
  },
  {
    id: "C",
    label: "a projection fed only predicted records leaves Beads work nodes and run/attempt supervision state byte-identical to the record-free baseline",
    pins: [
      { id: "C1", quote: "a projection fed only predicted records", subjects: ["BeadsReadClient", "FurnaceObserverClient"] },
      { id: "C2", quote: "leaves Beads work nodes", subjects: ["BeadsProgramClient", "BeadsReadClient"] },
      { id: "C3", quote: "run/attempt supervision state", subjects: ["FurnaceObserverClient"] },
      { id: "C4", quote: "byte-identical to the record-free baseline", subjects: ["BeadsProgramClient", "BeadsReadClient", "FurnaceObserverClient"] },
    ],
  },
  {
    id: "Z",
    label: "released world-model record surface alongside live Beads/Furnace state",
    pins: [{ id: "Z1", quote: "released world-model record surface alongside live Beads/Furnace state", subjects: ["@furnace/sdk", "src"] }],
  },
  {
    id: "Q",
    label: "the residuals' pinned quiet rows",
    pins: [
      { id: "Q1", quote: "R-NATIVE-FIELD", subjects: ["BeadsProgramClient", "BeadsReadClient"] },
      { id: "Q2", quote: "R-NATIVE-RELAY", subjects: ["FurnaceEvidenceRequest", "FurnaceReadClient"] },
      { id: "Q3", quote: "R-VOCABULARY", subjects: ["fold"] },
      { id: "Q4", quote: "R-UNPLANTED-KEY", subjects: ["BeadsReadClient"] },
      { id: "Q5", quote: "R-UNNAMED-SEAM", subjects: ["src"] },
    ],
  },
];
/** The residual families, each with its quiet row's pin. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-NATIVE-FIELD": "Q1",
  "R-NATIVE-RELAY": "Q2",
  "R-VOCABULARY": "Q3",
  "R-UNPLANTED-KEY": "Q4",
  "R-UNNAMED-SEAM": "Q5",
};
const JUDGED = ["A", "B", "C", "Z"];

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly constants: Json;
  readonly witnesses: Readonly<Record<string, Json>>;
}
const ROSTER: Roster = JSON.parse(readFileSync(ROSTER_PATH, "utf8")) as Roster;
const CONSTANTS: Json = {
  readVerbs: [...READ_VERBS],
  stems: [...STEMS],
  plantKeys: [...PLANT_KEYS],
  records: RECORDS.map(entry => ({ name: entry.name, fields: Object.keys(entry.record) })),
  beadsPlacements: BEADS_PLACEMENTS.map(placement => placement.id),
  furnacePlacements: FURNACE_PLACEMENTS.map(placement => placement.id),
  scopedSeams: Object.keys(SCOPED_SEAMS),
  residuals: Object.entries(RESIDUALS).map(([family, pin]) => `${family}:${pin}`),
  floors: { src: SRC_FLOOR, sdk: SDK_FLOOR },
};

// ---- the outside anchors ----
interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
function exportRow(id: string): ExportRow {
  const rows = readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8")
    .split("\n")
    .filter(line => line.trim().length > 0)
    .map((line): unknown => JSON.parse(line))
    .filter((row): row is { id: string; title: string; notes: string } => isObject(row) && row.id === id && typeof row.title === "string" && typeof row.notes === "string");
  if (rows.length !== 1) throw new Error(`expected exactly one export row for ${id}, read ${rows.length}`);
  const [row] = rows;
  return { title: row?.title ?? "", notes: row?.notes ?? "" };
}
/** The owner filing: the notes' first two blocks, so an appended note quoting them never masks a replaced original. */
const ownerFiling = (notes: string): string => notes.split("\n\n").slice(0, 2).join("\n\n");
const between = (value: string, from: string, to: string): string => {
  const start = value.indexOf(from);
  const end = start < 0 ? -1 : value.indexOf(to, start + from.length);
  return start < 0 || end < 0 ? "" : value.slice(start + from.length, end);
};
const isGap = (value: string): boolean => value.replace(CONNECTORS, "").replace(SEPARATORS, "") === "";
/** Whether the parts, in order, tile the text with nothing but separators and connector words around them. */
function tiles(value: string, parts: readonly string[]): boolean {
  if (parts.length === 0 || parts.some(part => part.length === 0)) return false;
  let at = 0;
  for (const part of parts) {
    const found = value.indexOf(part, at);
    if (found < 0 || !isGap(value.slice(at, found))) return false;
    at = found + part.length;
  }
  return isGap(value.slice(at));
}
/** Every exported interface or type alias of src/workbench whose name holds Beads or Furnace and ends in Client. */
function seamRoster(): readonly string[] {
  const found: string[] = [];
  for (const file of filesUnder(join(REPO, "src", "workbench"), name => name.endsWith(".ts"))) {
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    for (const statement of source.statements) {
      if (!ts.isInterfaceDeclaration(statement) && !ts.isTypeAliasDeclaration(statement)) continue;
      const exported = statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
      if (exported && SEAM_NAME.test(statement.name.text)) found.push(`${relative(REPO, file)}:${statement.name.text}`);
    }
  }
  return found.sort();
}
const SEAM_FILES: Readonly<Record<string, string>> = {
  BeadsReadClient: "src/workbench/beads-observer.ts",
  BeadsProgramClient: "src/workbench/beads-program-readiness.ts",
  FurnaceObserverClient: "src/workbench/furnace-observer.ts",
  FurnaceReadClient: "src/workbench/providers/furnace.ts",
  FurnaceControlClient: "src/workbench/furnace-control.ts",
};
/** Each Beads seam's argv phrase, as its own module states it. */
const ARGV_PHRASES: Readonly<Record<string, string>> = {
  "src/workbench/beads-observer.ts": "`bd show <id> --json`",
  "src/workbench/beads-program-readiness.ts": "dep list <id> --direction=up --json",
};

describe("wb-b04.1 world-model authority census (FURNACE-WORLD-MODEL-TRACE-ADAPTER-R4)", () => {
  it("S: the census tables keep their frozen shape and are the roster's judged set (rule 16)", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:1", "C:4", "Z:1", "Q:5"]);
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.rows).toEqual(ROWS);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(Object.keys(IMPL)).toEqual(pins);
    expect(Object.keys(ROSTER.witnesses)).toEqual(pins);
    expect(Object.values(RESIDUALS)).toEqual(ROWS.find(row => row.id === "Q")?.pins.map(pin => pin.id));
    expect(ROWS.find(row => row.id === "Q")?.pins.map(pin => pin.quote)).toEqual(Object.keys(RESIDUALS));
  });

  it("O: the outside anchors - the bead's own export row, the src seam roster, the seams' argv phrases and the control verb table", () => {
    const { title, notes } = exportRow(BEAD);
    const filing = ownerFiling(notes);
    const acceptance = filing.slice(filing.indexOf(ACCEPTANCE_MARK) + ACCEPTANCE_MARK.length).trim();
    expect(filing.indexOf(ACCEPTANCE_MARK)).toBeGreaterThan(0);
    const label = (id: string): string => ROWS.find(row => row.id === id)?.label ?? "";
    expect(tiles(acceptance, ["A", "B", "C"].map(label))).toBe(true);
    expect(tiles(between(filing, GATING_MARK, GATING_END), [label("Z")])).toBe(true);
    for (const row of ROWS.filter(entry => JUDGED.includes(entry.id))) {
      expect(tiles(row.label, row.pins.map(pin => pin.quote)), row.id).toBe(true);
    }
    // The title: the statement this file quotes, its dash in the export's spelling, and the record names it plants.
    expect(title).toContain(`supervision state, from a FurnaceObservedTransition or CounterfactualCandidate (or any model-predicted) record ${TITLE_DASH} Beads stays`);
    const names = between(title, RECORD_SPAN.from, RECORD_SPAN.to).split(" or ");
    expect(names.length).toBeGreaterThan(1);
    for (const name of names) {
      expect(RECORDS.map(entry => entry.name)).toContain(name);
      expect(PLANT_KEYS as readonly string[]).toContain(name);
      expect(stemsIn(name).length, name).toBeGreaterThan(0);
    }
    // The seam roster: every Beads or Furnace client seam of src/workbench is driven by a pin or scoped with a reason.
    const driven = [...new Set(ROWS.flatMap(row => row.pins.flatMap(pin => pin.subjects)))].filter(subject => Object.hasOwn(SEAM_FILES, subject));
    expect(seamRoster()).toEqual([...driven.map(seam => `${SEAM_FILES[seam]}:${seam}`), ...Object.keys(SCOPED_SEAMS)].sort());
    for (const [file, phrase] of Object.entries(ARGV_PHRASES)) expect(readFileSync(join(REPO, file), "utf8"), file).toContain(phrase);
    // The control verbs B1 watches are the adapter table's own, one path per owner.
    expect(controlPaths().length).toBe(Object.entries(FURNACE_CONTROL_VERBS).reduce((sum, [type, verbs]) => sum + Object.keys(verbs).length * (type === "run" ? 2 : 1), 0));
  });

  for (const row of ROWS) {
    describe(`${row.id}: ${row.label}`, () => {
      for (const pin of row.pins) {
        it(`${pin.id}: ${pin.quote}`, async () => {
          const impl = IMPL[pin.id];
          expect(impl, pin.id).toBeTypeOf("function");
          const witness = impl ? await impl(liveFor(pin.id)) : null;
          expect(witness).toEqual(ROSTER.witnesses[pin.id]);
        });
      }
    });
  }

  it("L: every pin's case ran and touched exactly the subjects it names", () => {
    const pins = ROWS.flatMap(row => row.pins);
    expect(pins.map(pin => [pin.id, [...(LIVE.get(pin.id) ?? [])].sort()])).toEqual(pins.map(pin => [pin.id, [...pin.subjects]]));
  });
});
