/**
 * wb-9v02 [MWI-cancel-repro]: EAT-R015 and EAT-R016 of the mechanical-workflows-interop-2026-11-04 program, measured.
 *
 * Requirement text: docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/
 * ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e (the triage tree stays master-only).
 *  - EAT-R015 "The cancellation experiment MUST measure skip at parked beforeDispatch." Acceptance: "Park the actual
 *    host beforeDispatch; issue runtime skip; release; retain sdk call count and settlement. Desired safety oracle is
 *    zero SDK starts and skipped result. Record observed violation or failed reproduction. Keep existing run-signal F10
 *    and no-abort one-call controls." Adversarial mutant: "Remove the parked barrier or replace skip with whole-run
 *    abort; experiment validation rejects the wrong seam."
 *  - EAT-R016 "The cancellation experiment MUST measure retry at parked beforeDispatch." Acceptance: "Park original
 *    startup, issue per-agent retry, release; record original and replacement attempt dispatch counts. Safety oracle:
 *    original zero starts and at most one separately authorized replacement. Repeat on resume startup." Adversarial
 *    mutant: "Count only final successes and hide the original query."
 * The bead is evidence-first (BEAD-PLAN B-cancel-repro): it lands a bounded experiment and a pending status, never a
 * production fix. A witnessed red authorizes a separate repair proposal and does not close slice PI-4.
 *
 * The experiment is test/helpers/parked-dispatch-experiment.ts: the real runWorkflow over the real
 * createClaudeWorkflowHost, with the host's own beforeDispatch option as the barrier and the fixture query seam as the
 * SDK. The requirement's "skipped result" is read as the target row's final progress entry marked skipped and a null
 * script value. EAT-R015's "Keep existing run-signal F10 and no-abort one-call controls" is pinned outside this file, by
 * test/workbench-mwi-cancel-repro.census.ts over the gate's own test report.
 *
 * PINNED READER SET (cut #3, the enumerate form). This file claims what its cases pin, each by its own rows, and nothing
 * wider. A reading that no case below holds is NOT CLAIMED.
 * - Live cells. Each runs one plan, pins the whole reading as measured at this tree, then pins its verdict: R015-SPAWN,
 *   R015-RESUME, R015-NO-BARRIER, R015-RUN-ABORT, R015-NO-CONTROL, R016-SPAWN, R016-RESUME and R016-HIDDEN-ORIGINAL (which
 *   also pins that the live retry reading with its original start count set to 0 is refused as uncounted-sdk-start).
 *   PLAN-DOMAIN does the same for each of the 24 ParkedPlan values (3 controls x 2 startups x 2 routes x 2 barriers), run
 *   with every field given and, for the 18 plans holding a default (route "per-agent", barrier "parked"), again with
 *   those fields omitted (42 runs, counted); PLAN-DOMAIN-SHAPE pins that its table holds exactly those 24 plans, each
 *   once, in the order of the product of the four plan unions as the helper declares them (read with the TypeScript
 *   parser).
 *   PLAN-DOMAIN then makes each of those runs again with callThrough, the call-through recorder, as the experiment's
 *   runner (wb-7ak9). callThrough hands the experiment's options on to runWorkflow with one change, the surface their
 *   onControl receives is recordedSurface over the runtime's own, and counts the abort events their signal dispatches.
 *   That run must read the same whole reading, and its record must be the one namedConduct gives its plan: a skip or
 *   retry plan on the per-agent route makes one call, that WorkflowControl method on the target's row (0 at spawn, 1 at
 *   resume), returning the reading's controlAccepted, and the run's own signal dispatches no abort event; on the
 *   run-abort route it makes no WorkflowControl call and the signal dispatches one; a "none" plan, whatever its route
 *   and barrier, makes no WorkflowControl call and the signal dispatches none. CALL-THROUGH pins recordedSurface over a
 *   planted WorkflowControl: each call of each of its five methods is recorded, in call order, as `method(argument) =
 *   value` with the value the planted method returned (`pause()`, `resume()` and `isPaused() = value` for those that
 *   take no argument); the planted method is called once and its value returned. The record is read when the
 *   experiment's promise settles: a call or an abort made after that is NOT CLAIMED.
 *   INSTRUMENT-NO-TIMER pins, by the same parser, what the helper's source text holds: no timer global's name
 *   (setTimeout, setInterval, setImmediate) as an identifier, no literal text (string, template or regular expression)
 *   containing one of those names or the text timers, no import() call and no static import of a timers module; and
 *   that neither the helper nor this suite holds vi's mock or doMock as an identifier, nor as a literal text equal to
 *   the name beyond this suite's own MOCK_NAMES list. The same reads flag each of those forms in a planted text.
 *   Comments are not read. Whether a run of the experiment arms a timer, and a name or module specifier that a source
 *   builds while it runs, are NOT CLAIMED.
 * - Named judge rows. Each row is a reading written out beside the verdict it must get: R015-SEAM, R015-SEAM-ROWS,
 *   R015-ORACLE, R015-ORACLE-ROWS, R016-ORACLE and R016-ORACLE-ROWS.
 * - Judge grids: R015-SEAM-GRID, R015-ORACLE-GRID and R016-ORACLE-GRID. Each grid is the product of the axis lists that
 *   its builder's comment names (seamGrid, skipOracleGrid, retryOracleGrid), and each of the 17 NOISE profiles is also
 *   applied to every reading of that product. GRID-NOISE pins that application on each grid (wb-7ak9): each reading's
 *   17 visits after its first are, in NOISE's order, that first visit under each profile, the places of the NOISE
 *   fields NOISE_FIELDS lists for the grid holding the profile's values and every other place the first visit's
 *   (Object.is, an object by identity), with the same keys in the reading and in its plan, authorizations and
 *   sdkStarts objects. A place is a key of the reading, or of one of those three objects: READING_PLACES is read
 *   against Object.keys of DISTINCT_READING, whose places all hold distinct values. The same reader flags eight
 *   planted grids (one profile throughout, the profiles reversed, a listed field kept, a field outside the list
 *   replaced, and a key added to the reading, its plan, its authorizations or its sdkStarts). NOISE_FIELDS is this
 *   suite's own list: which fields a noise function's comment names is NOT CLAIMED. Every reading
 *   built either way must get the verdict ruledVerdict gives, and the number of readings is pinned. ruledVerdict
 *   restates the rules of the helper's header, one rule per line, in the order the verdict lists them. GRID-AXES pins
 *   each of the 16 lists of the axis-list block by value (COUNTS, CONTROLS, STARTUPS, ROUTES, BARRIERS, SETUP_AGENTS,
 *   ENTRY_STATES, FINAL_ROWS, SCRIPT_VALUES, SETTLEMENT_LISTS, RUN_STATUSES, CONTROL_VALUES,
 *   CALL_LOG_OFFSETS, ONE_START_SPLITS, RUN_SIGNALS and PARKED_AT_CONTROL), NOISE by each profile's position in every
 *   list it draws from, that each NOISE field takes every value of its list, and that the four plan facet lists,
 *   ENTRY_STATES and RUN_STATUSES equal the unions their source files declare. GRID-PRODUCTS pins that each grid's
 *   builder iterates the lists of its axes table (SEAM_AXES, SKIP_ORACLE_AXES and RETRY_ORACLE_AXES): every reading the
 *   grid visits, read on those axes (each value as its position in that axis's list, an object by identity), is the
 *   next tuple of the product of those lists, outermost axis first, each tuple due 1 + 17 times in a row and none past
 *   the last. seamGrid's builder spells its run signal and parkedAtControl lists inline; GRID-PRODUCTS reads them
 *   against RUN_SIGNALS and PARKED_AT_CONTROL. Its reader, productTally, is pinned on each whole table by a planted
 *   walk of the table's product (plantedWalk, which builds its readings with AXIS_SETTERS, not with the grid's
 *   builder): at every tuple the walk visits the tuple's reading once, the reading with each axis alone moved off the
 *   product once, and, on each of the tuple's other visits, the reading with a set of axes moved at once, the sets
 *   covering every nonempty set of the table's axes; over the walk each moved axis, alone and inside a set, takes at
 *   each of its values every other value of its list and a value the list does not hold (an object's copy for an
 *   object); after the last tuple the walk visits once more. On each table the reader's count of visits off the product
 *   is the walk's moved visits plus the one past the last tuple, and it names the first three. Read back against the
 *   walk's record of each move, the walk's read-back counts one move per walk as reading otherwise, the move the walk
 *   records at other positions than it planted. The same reader flags four planted grids on SEAM_AXES's first three
 *   axes: a run signal list spelled [false, false], two loops in each other's place, each reading visited once, and the
 *   product run through twice. Which values the axes of a set moved at once take together is NOT CLAIMED by the walk.
 *   WALK-READBACK pins the walk's read-back and walkReading on each whole table, each reading against an anchor outside
 *   plantedWalk and walkReading. A misplant run (plantedWalk with misplant set) first reads back one move at each cell
 *   of each axis (its cell pass); its walk then records the move the walk records at other positions as planted, and
 *   every move otherwise than it reads. The read-back counts every move of each run (476 + 110592 x 17, 6264 + 19584 x
 *   17 and 492 + 8192 x 17 moves). The cell pass is pinned move by move, each pass read through its last move
 *   (cellPass), against cellMoves, which builds from the table's lists alone the moves the cell pass is due to make: for
 *   each axis of L values, L times over (once for each position of its list), the axis reading each position of its
 *   list and a value the list does not hold with every other axis at position 0 (the table's first tuple), each such
 *   reading read back L times, recorded at every other position of that axis (-1 for a value the list does not hold)
 *   and at position 0 on every other axis: L x (L + 1) x L moves for an axis of L values (476 on SEAM_AXES, 6264 on
 *   SKIP_ORACLE_AXES and 492 on RETRY_ORACLE_AXES). Read on the table's axes, the cell pass's readings are cellMoves's,
 *   in order; the read-back counts every cell move as reading otherwise, none under recordProbe (each axis read at the
 *   position cellMoves records the move at) and every one under offProbe (every axis read at another position).
 *   walkReading's names are pinned against keyName, which decodes a change's name (`<axis name> <from>-><to>`) from the
 *   change's key and the table's axis names, and which NAMED_CHANGES holds to literal keys and names on each table: an
 *   empty inventory lacks, in both lists and in key order, the name of every change the run's walk made (107, 422 and
 *   100 changes), and for each of those changes an inventory holding every other one, alone and in sets, lacks that
 *   change's name alone in each list it is left out of: both lists, the one-axis changes only, or the set changes only.
 *   Three cases hold WALK-READBACK's anchors from outside each of its two anchor pairs (keyName with walkReading,
 *   cellMoves with the cell pass), each against a spelling built from the table alone with plain loops, never with
 *   keyName, walkReading, cellMoves or plantedWalk (wb-tnsg). WALK-NAMES-SPELLED spells every change of each whole table
 *   (spelledChanges: for each axis in table order, each tuple position of its list and each planted position other than
 *   it, -1 first, the change's key beside `<axis name> <from>-><to>`; 107, 422 and 100 changes): keyName decodes each
 *   spelled key to its spelled name, and walkReading's two lists on an empty inventory are the spelled names, in the order
 *   spelled. WALK-CELLS-SPELLED spells the moves a misplant run's cell pass is due to make on each whole table from the
 *   table's list lengths alone (spelledCellMoves: for each axis of L values in table order, L times over, the axis read at
 *   each position r, -1 first, and recorded at each position other than r, every other axis at position 0 in both, the
 *   table's first tuple; 476, 6264 and 492 moves): cellMoves builds those moves, reads and records, in order; the cell
 *   pass's readings (cellPass) are the spelled reads, in order; and with each axis read at the position the spelled moves
 *   record the move at (spelledRecordProbe), the read-back counts no cell move as reading otherwise. NAMED-CHANGES-SHAPE
 *   freezes NAMED_CHANGES's shape: 9, 6 and 5 rows, each one of its table's spelled changes (its key beside the same
 *   name); on each table how many rows change its first axis, its last axis, an axis past the third, an axis of a list of
 *   more than two values, from a tuple position past 1 and to -1 (namedCoverage, read from the keys, not with keyName),
 *   frozen; and each of those counts at least 1. NOT CLAIMED: a spelling edited together with both members of the pair
 *   it holds (spelledChanges with keyName and walkReading, spelledCellMoves with cellMoves and the cell pass); and a
 *   NAMED_CHANGES row deleted together with its table's row count and coverage counts, or namedCoverage edited together
 *   with the coverage counts, while every count stays at least 1.
 *   Which axis and position a misplant run's walk records a move at is NOT CLAIMED. A read-back or a missing list that
 *   reads the walk or its inventory otherwise than the misplant runs, their cell passes under recordProbe, offProbe and
 *   spelledRecordProbe, the empty inventories and the planted inventories (by the misplant argument, the inventory or
 *   anything else in its scope) is NOT CLAIMED, and neither is a fault of a setter or of the walk's planting that only
 *   such a reading would miss. GRID-PRODUCTS and WALK-READBACK read no comment: that a builder's comment names the lists
 *   of its axes table, or names them in that order, is NOT CLAIMED by them.
 * NOT CLAIMED: a value that no list or offset holds (for example a start, entry, abort or query count above 3, a call
 * log count more than 1 off its grid's sum, a negative or fractional count, or an entry state, attempt, reason, script
 * value, settlement list or run status that no list holds) and a reading outside those products. Production
 * reachability is NOT CLAIMED either. Both beforeDispatch producers registered at this tree are
 * synchronous (src/index.ts, the workflow tool's identity re-check, and src/workbench/hosts/local-detached.ts, the
 * detached basis check), so in those wirings the parked window exists only as the one microtask turn of
 * `await config.beforeDispatch?.()`. This suite measures the host contract, whose option type admits an asynchronous
 * beforeDispatch. Native SDK teardown, a control issued at any other seam, and workflow-wide cancel beyond the F10
 * shape are NOT CLAIMED.
 * RESIDUAL: none claimed.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { WorkflowEntryState } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowControl } from "../src/workflow/runtime.js";
import {
  type Breach,
  type FinalRow,
  type HostSettlement,
  type InvalidReason,
  judgeParkedObservation,
  type ParkedBarrier,
  type ParkedControl,
  type ParkedObservation,
  type ParkedPlan,
  type ParkedRoute,
  type ParkedRunner,
  type ParkedStartup,
  type ParkedVerdict,
  runParkedDispatchExperiment,
} from "./helpers/parked-dispatch-experiment.js";

/** claude-host.ts: the post-await refusal a run abort produces. */
const WORKFLOW_ABORTED = "Workflow aborted.";
/** claude-host.ts: every path that reports an SDK query the host stopped. */
const CANCELLED = "Claude SDK query was cancelled.";

const PARKED_SKIP_SPAWN: ParkedObservation = {
  plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "parked" },
  parkedAtControl: true,
  queriesBeforeControl: 0,
  controlAccepted: true,
  hostAbortsWhileParked: 1,
  runAborted: false,
  authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
  sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 },
  sdkCallsRecorded: 1,
  hostSettlements: [{ ok: true, skipped: false }],
  finalRow: { state: "done", skipped: false, attempt: 1, reason: null },
  runStatus: "completed",
  scriptValue: "answer 0",
};

const PARKED_SKIP_RESUME: ParkedObservation = {
  plan: { control: "skip", startup: "resume", route: "per-agent", barrier: "parked" },
  parkedAtControl: true,
  queriesBeforeControl: 1,
  controlAccepted: true,
  hostAbortsWhileParked: 1,
  runAborted: false,
  authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 },
  sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 },
  sdkCallsRecorded: 2,
  hostSettlements: [{ ok: true, skipped: false }],
  finalRow: { state: "done", skipped: false, attempt: 1, reason: null },
  runStatus: "completed",
  scriptValue: "answer 1",
};

const PARKED_RETRY_SPAWN: ParkedObservation = {
  plan: { control: "retry", startup: "spawn", route: "per-agent", barrier: "parked" },
  parkedAtControl: true,
  queriesBeforeControl: 0,
  controlAccepted: true,
  hostAbortsWhileParked: 1,
  runAborted: false,
  authorizations: { setup: 0, original: 1, replacement: 1, extra: 0 },
  sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 },
  sdkCallsRecorded: 2,
  hostSettlements: [
    { ok: true, skipped: false },
    { ok: true, skipped: false },
  ],
  finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" },
  runStatus: "completed",
  scriptValue: "answer 1",
};

/** The validation's reasons for a reading, or the verdict's kind when the validation accepts the reading. */
function reasonsOf(observation: ParkedObservation): readonly string[] {
  const verdict = judgeParkedObservation(observation);
  return verdict.kind === "invalid-experiment" ? verdict.reasons : [verdict.kind];
}

/** The oracle's breaches for a reading, or the verdict's kind when the reading breaks none or is refused. */
function breachesOf(observation: ParkedObservation): readonly string[] {
  const verdict = judgeParkedObservation(observation);
  return verdict.kind === "observed-violation" ? verdict.breaches : [verdict.kind];
}

/** R015-ORACLE's oracle reading, shared: a valid skip reading that meets the skip oracle. */
const SKIP_ORACLE: ParkedObservation = {
  ...PARKED_SKIP_SPAWN,
  sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
  sdkCallsRecorded: 0,
  hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }],
  finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
  scriptValue: null,
};

/** R016-ORACLE's oracle reading, shared: a valid retry reading that meets the retry oracle. */
const RETRY_ORACLE: ParkedObservation = { ...PARKED_RETRY_SPAWN, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 };

// The axis-list block: the 16 lists below. GRID-AXES holds each one by value, and GRID-PRODUCTS holds that each grid's
// readings run through the product of the lists of its axes table (SEAM_AXES, SKIP_ORACLE_AXES, RETRY_ORACLE_AXES;
// seamGrid's builder spells RUN_SIGNALS and PARKED_AT_CONTROL inline). A value that no list holds is NOT CLAIMED.
/** Every count axis of the grids. */
const COUNTS: readonly number[] = [0, 1, 2, 3];
const CONTROLS = ["skip", "retry", "none"] as const satisfies readonly ParkedControl[];
const STARTUPS = ["spawn", "resume"] as const satisfies readonly ParkedStartup[];
const ROUTES = ["per-agent", "run-abort"] as const satisfies readonly ParkedRoute[];
const BARRIERS = ["parked", "absent"] as const satisfies readonly ParkedBarrier[];
/** The setup agents each startup's script runs before the target: none at spawn, the origin agent at resume. */
const SETUP_AGENTS: Readonly<Record<ParkedStartup, number>> = { spawn: 0, resume: 1 };
/** Every entry state a progress row can carry. */
const ENTRY_STATES = ["start", "progress", "done", "error"] as const satisfies readonly WorkflowEntryState[];
/** 17 final rows: none, then each entry state marked skipped and not, at attempt 1 with no reason and at attempt 2 with "user-retry". */
const FINAL_ROWS: readonly (FinalRow | undefined)[] = [
  undefined,
  ...ENTRY_STATES.flatMap(state =>
    [true, false].flatMap(skipped => [
      { state, skipped, attempt: 1, reason: null },
      { state, skipped, attempt: 2, reason: "user-retry" },
    ]),
  ),
];
/** 9 script values: null, undefined, false, 0, the empty string, an answer, the string "null", an empty object and an empty array. */
const SCRIPT_VALUES: readonly unknown[] = [null, undefined, false, 0, "", "answer 0", "null", {}, []];
/** 6 host settlement lists: none; one settled skipped with each host error; one ok; two ok; a cancelled one, then an ok one. */
const SETTLEMENT_LISTS: readonly (readonly HostSettlement[])[] = [
  [],
  [{ ok: false, skipped: true, error: CANCELLED }],
  [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }],
  [{ ok: true, skipped: false }],
  [
    { ok: true, skipped: false },
    { ok: true, skipped: false },
  ],
  [
    { ok: false, skipped: true, error: CANCELLED },
    { ok: true, skipped: false },
  ],
];
/** Every run status a workflow run can end with. */
const RUN_STATUSES = ["completed", "failed", "killed"] as const satisfies readonly ParkedObservation["runStatus"][];
/** The control's value: accepted, refused, and none (no per-agent control was called). */
const CONTROL_VALUES: readonly (boolean | undefined)[] = [true, false, undefined];
/** The call log's count minus the summed per-attempt start counts: one fewer, equal, one more. */
const CALL_LOG_OFFSETS: readonly number[] = [-1, 0, 1];
/** The three ways one target SDK start can fall: in the original, the replacement or a later attempt. */
const ONE_START_SPLITS: readonly { readonly original: number; readonly replacement: number; readonly extra: number }[] = [
  { original: 1, replacement: 0, extra: 0 },
  { original: 0, replacement: 1, extra: 0 },
  { original: 0, replacement: 0, extra: 1 },
];
/** seamGrid's run signal axis: the run's own abort signal not set, then set (its builder spells this list inline). */
const RUN_SIGNALS: readonly boolean[] = [false, true];
/** seamGrid's parkedAtControl axis: the target parked when the control is issued, then not (its builder spells this list inline). */
const PARKED_AT_CONTROL: readonly boolean[] = [true, false];

/** Compile-time: true only when the list holds every member of its union (typecheck:test fails otherwise). */
type Covers<Union, Listed> = [Exclude<Union, Listed>] extends [never] ? true : false;
const LISTS_COVER_THEIR_UNIONS: readonly [
  Covers<ParkedControl, (typeof CONTROLS)[number]>,
  Covers<ParkedStartup, (typeof STARTUPS)[number]>,
  Covers<ParkedRoute, (typeof ROUTES)[number]>,
  Covers<ParkedBarrier, (typeof BARRIERS)[number]>,
  Covers<WorkflowEntryState, (typeof ENTRY_STATES)[number]>,
  Covers<ParkedObservation["runStatus"], (typeof RUN_STATUSES)[number]>,
] = [true, true, true, true, true, true];

/** One NOISE profile: values for the fields a grid names as its noise. */
interface Noise {
  readonly hostSettlements: readonly HostSettlement[];
  readonly runStatus: ParkedObservation["runStatus"];
  readonly barrier: ParkedBarrier;
  readonly finalRow: FinalRow | undefined;
  readonly scriptValue: unknown;
  /** beforeDispatch entries of the original, replacement and later attempts (the setup agents' entries are never noise). */
  readonly entries: { readonly original: number; readonly replacement: number; readonly extra: number };
  /** Where R015-SEAM-GRID's one target start falls (its sum, and so the call log check, unchanged). */
  readonly oneStart: { readonly original: number; readonly replacement: number; readonly extra: number };
}

/** The entry at position i of a list, wrapping around. */
function cycle<T>(list: readonly T[], i: number): T {
  return list[i % list.length];
}

/** NOISE, 17 profiles: profile i takes FINAL_ROWS[i] and cycles through each other list, so every listed value is used. */
const NOISE: readonly Noise[] = FINAL_ROWS.map((finalRow, i) => ({
  hostSettlements: cycle(SETTLEMENT_LISTS, i),
  runStatus: cycle(RUN_STATUSES, i),
  barrier: cycle(BARRIERS, i),
  finalRow,
  scriptValue: cycle(SCRIPT_VALUES, i),
  entries: { original: cycle(COUNTS, i), replacement: cycle(COUNTS, i + 1), extra: cycle(COUNTS, i + 2) },
  oneStart: cycle(ONE_START_SPLITS, i),
}));

/**
 * The rules of the helper's header, one per line and in the order the verdict lists them: the verdict every grid
 * reading must get.
 */
function ruledVerdict(reading: ParkedObservation): ParkedVerdict {
  const setupAgents = SETUP_AGENTS[reading.plan.startup];
  const targetStarts = reading.sdkStarts.original + reading.sdkStarts.replacement + reading.sdkStarts.extra;
  const reasons: InvalidReason[] = [];
  if (reading.plan.route === "run-abort" || reading.runAborted) reasons.push("whole-run-abort");
  if (!reading.parkedAtControl) reasons.push("control-not-parked");
  if (reading.queriesBeforeControl !== reading.sdkStarts.setup) reasons.push("dispatch-before-control");
  if (reading.plan.control === "none" || reading.controlAccepted === undefined) reasons.push("control-not-issued");
  else if (reading.controlAccepted === false) reasons.push("control-refused");
  if (reading.hostAbortsWhileParked === 0) reasons.push("control-not-routed-to-host");
  if (reading.authorizations.setup !== setupAgents || reading.sdkStarts.setup !== setupAgents) reasons.push("setup-drift");
  if (reading.sdkStarts.setup + targetStarts !== reading.sdkCallsRecorded) reasons.push("uncounted-sdk-start");
  if (reasons.length > 0) return { kind: "invalid-experiment", reasons };
  const breaches: Breach[] = [];
  if (reading.plan.control === "skip") {
    if (targetStarts >= 1) breaches.push("sdk-started-after-skip");
    if (reading.finalRow === undefined || !reading.finalRow.skipped) breaches.push("not-settled-skipped");
    if (reading.scriptValue !== null) breaches.push("script-received-a-value");
  } else {
    if (reading.sdkStarts.original >= 1) breaches.push("original-started-after-retry");
    if (reading.sdkStarts.replacement >= 2 || reading.sdkStarts.extra >= 1) breaches.push("more-than-one-replacement");
    if (reading.sdkStarts.replacement > reading.authorizations.replacement) breaches.push("replacement-not-authorized");
  }
  return breaches.length > 0 ? { kind: "observed-violation", breaches } : { kind: "failed-reproduction" };
}

/** A grid's count of readings, how many the judge reads otherwise than ruledVerdict, and the first three of those. */
interface GridTally {
  readonly readings: number;
  readonly differing: number;
  readonly first: readonly string[];
}

/** The verdict's kind, then its reasons or breaches in order. */
function verdictParts(verdict: ParkedVerdict): readonly string[] {
  if (verdict.kind === "invalid-experiment") return [verdict.kind, ...verdict.reasons];
  if (verdict.kind === "observed-violation") return [verdict.kind, ...verdict.breaches];
  return [verdict.kind];
}

/** Equal kinds, equal lists in the same order, and the same keys. */
function sameVerdict(left: ParkedVerdict, right: ParkedVerdict): boolean {
  const a = verdictParts(left);
  const b = verdictParts(right);
  return Object.keys(left).join() === Object.keys(right).join() && a.length === b.length && a.every((part, i) => part === b[i]);
}

/** Judges every reading a grid hands to its visitor against ruledVerdict. */
function tally(grid: (visit: (reading: ParkedObservation) => void) => void): GridTally {
  let count = 0;
  let differing = 0;
  const first: string[] = [];
  grid(reading => {
    count += 1;
    const judged = judgeParkedObservation(reading);
    const ruled = ruledVerdict(reading);
    if (sameVerdict(judged, ruled)) return;
    differing += 1;
    if (first.length < 3) first.push(`${JSON.stringify({ ...reading, scriptValue: String(reading.scriptValue) })} judged ${JSON.stringify(judged)}, ruled ${JSON.stringify(ruled)}`);
  });
  return { readings: count, differing, first };
}

/** R015-SEAM-GRID's noise, every NOISE field: settlements, run status, barrier, final row, script value, the target's entries and where its one start falls. */
function seamNoise(reading: ParkedObservation, noise: Noise): ParkedObservation {
  return {
    ...reading,
    plan: { ...reading.plan, barrier: noise.barrier },
    authorizations: { setup: reading.authorizations.setup, ...noise.entries },
    sdkStarts: { setup: reading.sdkStarts.setup, ...noise.oneStart },
    hostSettlements: noise.hostSettlements,
    finalRow: noise.finalRow,
    runStatus: noise.runStatus,
    scriptValue: noise.scriptValue,
  };
}

/** R015-ORACLE-GRID's noise: the host settlements, the run status, the barrier and the target's beforeDispatch entries. */
function skipNoise(reading: ParkedObservation, noise: Noise): ParkedObservation {
  return {
    ...reading,
    plan: { ...reading.plan, barrier: noise.barrier },
    authorizations: { setup: reading.authorizations.setup, ...noise.entries },
    hostSettlements: noise.hostSettlements,
    runStatus: noise.runStatus,
  };
}

/** R016-ORACLE-GRID's noise: the host settlements, the run status, the barrier, the final row and the script value. */
function retryNoise(reading: ParkedObservation, noise: Noise): ParkedObservation {
  return {
    ...reading,
    plan: { ...reading.plan, barrier: noise.barrier },
    hostSettlements: noise.hostSettlements,
    finalRow: noise.finalRow,
    runStatus: noise.runStatus,
    scriptValue: noise.scriptValue,
  };
}

/**
 * R015-SEAM-GRID: ROUTES x run signal (false, true) x parkedAtControl (true, false) x CONTROLS x CONTROL_VALUES x COUNTS
 * of parked aborts x STARTUPS x COUNTS of starts at the control x COUNTS of setup SDK starts x COUNTS of setup
 * beforeDispatch entries x CALL_LOG_OFFSETS = 110592 readings, each built on PARKED_SKIP_SPAWN with one original start
 * and one original entry, then each of them under every NOISE profile (seamNoise, which also moves that one start to
 * the replacement or a later attempt, its sum unchanged).
 */
function seamGrid(visit: (reading: ParkedObservation) => void): void {
  for (const route of ROUTES) {
    for (const runAborted of [false, true]) {
      for (const parkedAtControl of [true, false]) {
        for (const control of CONTROLS) {
          for (const controlAccepted of CONTROL_VALUES) {
            for (const hostAbortsWhileParked of COUNTS) {
              for (const startup of STARTUPS) {
                for (const queriesBeforeControl of COUNTS) {
                  for (const setupStarts of COUNTS) {
                    for (const setupEntries of COUNTS) {
                      for (const offset of CALL_LOG_OFFSETS) {
                        const reading: ParkedObservation = {
                          ...PARKED_SKIP_SPAWN,
                          plan: { control, startup, route, barrier: "parked" },
                          parkedAtControl,
                          queriesBeforeControl,
                          controlAccepted,
                          hostAbortsWhileParked,
                          runAborted,
                          authorizations: { setup: setupEntries, original: 1, replacement: 0, extra: 0 },
                          sdkStarts: { setup: setupStarts, original: 1, replacement: 0, extra: 0 },
                          sdkCallsRecorded: setupStarts + 1 + offset,
                        };
                        visit(reading);
                        for (const noise of NOISE) visit(seamNoise(reading, noise));
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

/**
 * R015-ORACLE-GRID: STARTUPS x COUNTS of original, replacement and later target starts x FINAL_ROWS x SCRIPT_VALUES =
 * 19584 skip readings that pass the validation, each built on SKIP_ORACLE at its startup's setup counts, then each of
 * them under every NOISE profile (skipNoise).
 */
function skipOracleGrid(visit: (reading: ParkedObservation) => void): void {
  for (const startup of STARTUPS) {
    const setup = SETUP_AGENTS[startup];
    for (const original of COUNTS) {
      for (const replacement of COUNTS) {
        for (const extra of COUNTS) {
          for (const finalRow of FINAL_ROWS) {
            for (const scriptValue of SCRIPT_VALUES) {
              const reading: ParkedObservation = {
                ...SKIP_ORACLE,
                plan: { ...SKIP_ORACLE.plan, startup },
                queriesBeforeControl: setup,
                authorizations: { ...SKIP_ORACLE.authorizations, setup },
                sdkStarts: { setup, original, replacement, extra },
                sdkCallsRecorded: setup + original + replacement + extra,
                finalRow,
                scriptValue,
              };
              visit(reading);
              for (const noise of NOISE) visit(skipNoise(reading, noise));
            }
          }
        }
      }
    }
  }
}

/**
 * R016-ORACLE-GRID: STARTUPS x COUNTS of original, replacement and later starts x COUNTS of original, replacement and
 * later beforeDispatch entries = 8192 retry readings that pass the validation, each built on RETRY_ORACLE at its
 * startup's setup counts, then each of them under every NOISE profile (retryNoise).
 */
function retryOracleGrid(visit: (reading: ParkedObservation) => void): void {
  for (const startup of STARTUPS) {
    const setup = SETUP_AGENTS[startup];
    for (const original of COUNTS) {
      for (const replacement of COUNTS) {
        for (const extra of COUNTS) {
          for (const entriesOriginal of COUNTS) {
            for (const entriesReplacement of COUNTS) {
              for (const entriesExtra of COUNTS) {
                const reading: ParkedObservation = {
                  ...RETRY_ORACLE,
                  plan: { ...RETRY_ORACLE.plan, startup },
                  queriesBeforeControl: setup,
                  authorizations: { setup, original: entriesOriginal, replacement: entriesReplacement, extra: entriesExtra },
                  sdkStarts: { setup, original, replacement, extra },
                  sdkCallsRecorded: setup + original + replacement + extra,
                };
                visit(reading);
                for (const noise of NOISE) visit(retryNoise(reading, noise));
              }
            }
          }
        }
      }
    }
  }
}

/** One axis of a grid: the list its builder iterates for it, and where a reading of that grid holds its value. */
interface GridAxis {
  readonly name: string;
  readonly list: readonly unknown[];
  readonly read: (reading: ParkedObservation) => unknown;
}

/** A reading's per-attempt start counts summed, the setup agents' included. */
function summedStarts(reading: ParkedObservation): number {
  return reading.sdkStarts.setup + reading.sdkStarts.original + reading.sdkStarts.replacement + reading.sdkStarts.extra;
}

/** seamGrid's axes, outermost loop first. */
const SEAM_AXES: readonly GridAxis[] = [
  { name: "route", list: ROUTES, read: reading => reading.plan.route },
  { name: "run signal", list: RUN_SIGNALS, read: reading => reading.runAborted },
  { name: "parkedAtControl", list: PARKED_AT_CONTROL, read: reading => reading.parkedAtControl },
  { name: "control", list: CONTROLS, read: reading => reading.plan.control },
  { name: "control value", list: CONTROL_VALUES, read: reading => reading.controlAccepted },
  { name: "parked aborts", list: COUNTS, read: reading => reading.hostAbortsWhileParked },
  { name: "startup", list: STARTUPS, read: reading => reading.plan.startup },
  { name: "starts at the control", list: COUNTS, read: reading => reading.queriesBeforeControl },
  { name: "setup SDK starts", list: COUNTS, read: reading => reading.sdkStarts.setup },
  { name: "setup beforeDispatch entries", list: COUNTS, read: reading => reading.authorizations.setup },
  { name: "call log offset", list: CALL_LOG_OFFSETS, read: reading => reading.sdkCallsRecorded - summedStarts(reading) },
];

/** skipOracleGrid's axes, outermost loop first. */
const SKIP_ORACLE_AXES: readonly GridAxis[] = [
  { name: "startup", list: STARTUPS, read: reading => reading.plan.startup },
  { name: "original starts", list: COUNTS, read: reading => reading.sdkStarts.original },
  { name: "replacement starts", list: COUNTS, read: reading => reading.sdkStarts.replacement },
  { name: "later starts", list: COUNTS, read: reading => reading.sdkStarts.extra },
  { name: "final row", list: FINAL_ROWS, read: reading => reading.finalRow },
  { name: "script value", list: SCRIPT_VALUES, read: reading => reading.scriptValue },
];

/** retryOracleGrid's axes, outermost loop first. */
const RETRY_ORACLE_AXES: readonly GridAxis[] = [
  { name: "startup", list: STARTUPS, read: reading => reading.plan.startup },
  { name: "original starts", list: COUNTS, read: reading => reading.sdkStarts.original },
  { name: "replacement starts", list: COUNTS, read: reading => reading.sdkStarts.replacement },
  { name: "later starts", list: COUNTS, read: reading => reading.sdkStarts.extra },
  { name: "original entries", list: COUNTS, read: reading => reading.authorizations.original },
  { name: "replacement entries", list: COUNTS, read: reading => reading.authorizations.replacement },
  { name: "later entries", list: COUNTS, read: reading => reading.authorizations.extra },
];

/** How a grid's visits read on its axes: the visits, how many are not the product's next tuple, and the first three of those. */
interface ProductTally {
  readonly visits: number;
  readonly offProduct: number;
  readonly first: readonly string[];
}

/**
 * Reads every reading a grid visits on its axes, each value as its position in that axis's list (an object by identity;
 * -1 for a value the list does not hold), and compares the positions with the product of the lists in the order given,
 * the last axis varying fastest and each tuple due 1 + NOISE.length times in a row. A visit past the product's last
 * tuple is off the product too. It reads the axes only: which NOISE profile, if any, a visit of a tuple carries is NOT
 * CLAIMED by it. GRID-PRODUCTS pins this reading on each whole axes table with plantedWalk; which values the axes of a
 * set moved at once take together is NOT CLAIMED by that walk.
 */
function productTally(grid: (visit: (reading: ParkedObservation) => void) => void, axes: readonly GridAxis[]): ProductTally {
  const lengths = axes.map(axis => axis.list.length);
  const due = 1 + NOISE.length;
  let visits = 0;
  let offProduct = 0;
  const first: string[] = [];
  grid(reading => {
    const product = lengths.map(() => 0);
    let rest = Math.floor(visits / due);
    for (let axis = lengths.length - 1; axis >= 0; axis -= 1) {
      product[axis] = rest % lengths[axis];
      rest = Math.floor(rest / lengths[axis]);
    }
    const read = axes.map(axis => axis.list.indexOf(axis.read(reading)));
    const visit = visits;
    visits += 1;
    if (rest === 0 && read.every((position, axis) => position === product[axis])) return;
    offProduct += 1;
    if (first.length < 3) first.push(`visit ${visit}: read ${read.join("/")}, product ${rest === 0 ? product.join("/") : "past its last tuple"}`);
  });
  return { visits, offProduct, first };
}

/** The first three axes of seamGrid (route, run signal, parkedAtControl), which GRID-PRODUCTS's planted grids iterate. */
const PLANTED_AXES: readonly GridAxis[] = SEAM_AXES.slice(0, 3);

/** A planted grid, never run as a grid case: PLANTED_AXES with the run signal list spelled [false, false], each reading visited 1 + NOISE.length times. */
function plantedOneSignalGrid(visit: (reading: ParkedObservation) => void): void {
  for (const route of ROUTES) {
    for (const runAborted of [false, false]) {
      for (const parkedAtControl of PARKED_AT_CONTROL) {
        const reading: ParkedObservation = { ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route }, runAborted, parkedAtControl };
        for (let repeat = 0; repeat <= NOISE.length; repeat += 1) visit(reading);
      }
    }
  }
}

/** A planted grid, never run as a grid case: PLANTED_AXES with the route and run signal loops in each other's place. */
function plantedSwappedGrid(visit: (reading: ParkedObservation) => void): void {
  for (const runAborted of RUN_SIGNALS) {
    for (const route of ROUTES) {
      for (const parkedAtControl of PARKED_AT_CONTROL) {
        const reading: ParkedObservation = { ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route }, runAborted, parkedAtControl };
        for (let repeat = 0; repeat <= NOISE.length; repeat += 1) visit(reading);
      }
    }
  }
}

/** A planted grid, never run as a grid case: PLANTED_AXES with each reading visited once, under no NOISE profile. */
function plantedBareGrid(visit: (reading: ParkedObservation) => void): void {
  for (const route of ROUTES) {
    for (const runAborted of RUN_SIGNALS) {
      for (const parkedAtControl of PARKED_AT_CONTROL) visit({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route }, runAborted, parkedAtControl });
    }
  }
}

/** A planted grid, never run as a grid case: PLANTED_AXES's product, each reading visited 1 + NOISE.length times, run through twice. */
function plantedTwiceGrid(visit: (reading: ParkedObservation) => void): void {
  for (let pass = 0; pass < 2; pass += 1) {
    for (const route of ROUTES) {
      for (const runAborted of RUN_SIGNALS) {
        for (const parkedAtControl of PARKED_AT_CONTROL) {
          const reading: ParkedObservation = { ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route }, runAborted, parkedAtControl };
          for (let repeat = 0; repeat <= NOISE.length; repeat += 1) visit(reading);
        }
      }
    }
  }
}

/**
 * How a planted walk sets one axis of a reading: set returns the reading with that axis reading value and every other
 * axis of its table reading as before (setup SDK starts moves the call log with it, so the call log offset holds), and
 * outside is the value the walk plants when the axis's current value is not an object and the move needs a value no
 * list of that axis holds. What holds a setter to this is the walk's read-back (plantedWalk); a setter fault that only
 * a read-back reading the walk otherwise than WALK-READBACK's misplant runs would miss is NOT CLAIMED to be caught.
 */
interface AxisSetter {
  readonly set: (reading: ParkedObservation, value: unknown) => ParkedObservation;
  readonly outside: unknown;
}

/**
 * A value no list of the axis holds, standing in for current: a copy of current when it is an object (equal by value,
 * another object), outside otherwise. As for AxisSetter, the walk's read-back is what holds it to that.
 */
function unlistedValue(current: unknown, outside: unknown): unknown {
  if (Array.isArray(current)) return [...current];
  if (typeof current === "object" && current !== null) return { ...current };
  return outside;
}

/** The setters of every axis the three axes tables name, by axis name. */
const AXIS_SETTERS: Readonly<Record<string, AxisSetter>> = {
  route: { set: (reading, value) => ({ ...reading, plan: { ...reading.plan, route: value as ParkedRoute } }), outside: "unlisted route" },
  "run signal": { set: (reading, value) => ({ ...reading, runAborted: value as boolean }), outside: "unlisted run signal" },
  parkedAtControl: { set: (reading, value) => ({ ...reading, parkedAtControl: value as boolean }), outside: "unlisted parkedAtControl" },
  control: { set: (reading, value) => ({ ...reading, plan: { ...reading.plan, control: value as ParkedControl } }), outside: "unlisted control" },
  "control value": { set: (reading, value) => ({ ...reading, controlAccepted: value as boolean | undefined }), outside: null },
  "parked aborts": { set: (reading, value) => ({ ...reading, hostAbortsWhileParked: value as number }), outside: 4 },
  startup: { set: (reading, value) => ({ ...reading, plan: { ...reading.plan, startup: value as ParkedStartup } }), outside: "unlisted startup" },
  "starts at the control": { set: (reading, value) => ({ ...reading, queriesBeforeControl: value as number }), outside: 4 },
  "setup SDK starts": {
    set: (reading, value) => ({ ...reading, sdkStarts: { ...reading.sdkStarts, setup: value as number }, sdkCallsRecorded: reading.sdkCallsRecorded - reading.sdkStarts.setup + (value as number) }),
    outside: 4,
  },
  "setup beforeDispatch entries": { set: (reading, value) => ({ ...reading, authorizations: { ...reading.authorizations, setup: value as number } }), outside: 4 },
  "call log offset": { set: (reading, value) => ({ ...reading, sdkCallsRecorded: summedStarts(reading) + (value as number) }), outside: 2 },
  "original starts": { set: (reading, value) => ({ ...reading, sdkStarts: { ...reading.sdkStarts, original: value as number } }), outside: 4 },
  "replacement starts": { set: (reading, value) => ({ ...reading, sdkStarts: { ...reading.sdkStarts, replacement: value as number } }), outside: 4 },
  "later starts": { set: (reading, value) => ({ ...reading, sdkStarts: { ...reading.sdkStarts, extra: value as number } }), outside: 4 },
  "final row": { set: (reading, value) => ({ ...reading, finalRow: value as FinalRow | undefined }), outside: { state: "start", skipped: true, attempt: 1, reason: null } },
  "script value": { set: (reading, value) => ({ ...reading, scriptValue: value }), outside: "unlisted script value" },
  "original entries": { set: (reading, value) => ({ ...reading, authorizations: { ...reading.authorizations, original: value as number } }), outside: 4 },
  "replacement entries": { set: (reading, value) => ({ ...reading, authorizations: { ...reading.authorizations, replacement: value as number } }), outside: 4 },
  "later entries": { set: (reading, value) => ({ ...reading, authorizations: { ...reading.authorizations, extra: value as number } }), outside: 4 },
};

/**
 * What a planted walk recorded: the moves it read back; misread, the moves the read-back counted as reading otherwise
 * than the walk's record of them (on the walk itself, the one move per walk it records at other positions than it
 * planted); the changes its one-axis moves recorded and the changes recorded for each axis of its set moves, one key per
 * (axis, value of the tuple, value planted, -1 for a value no list holds); the axis sets it recorded, one key per set;
 * and the (axis, value) pairs whose unlisted value it planted as a copy of an object (equal by value, another object).
 * WALK-READBACK pins the read-back on each table's misplant run; a read-back that reads the walk otherwise than that run
 * is NOT CLAIMED.
 */
interface WalkInventory {
  moves: number;
  misread: number;
  readonly changes: Set<number>;
  readonly setChanges: Set<number>;
  readonly sets: Set<number>;
  readonly copied: Set<number>;
}

function emptyInventory(): WalkInventory {
  return { moves: 0, misread: 0, changes: new Set(), setChanges: new Set(), sets: new Set(), copied: new Set() };
}

/**
 * A planted walk of a whole axes table, never run as a grid case. It walks the product of the table's lists, outermost
 * axis first and the last varying fastest, building each tuple's reading with the axes' setters (not with the grid's
 * builder), and visits each tuple 1 + NOISE.length times: the tuple's reading once, the reading with each axis alone
 * moved off the product once, and, on each of the tuple's other visits, the reading with a set of axes moved at once.
 * Over the walk the sets cover every nonempty set of the table's axes, and each axis, moved alone and moved inside a
 * set, takes at each value of the tuple every other value of its list and a value its list does not hold
 * (unlistedValue). After the last tuple it visits once more, past the product's last tuple. Each move goes through
 * readBack, which counts into inventory the moves whose reading it reads otherwise than the positions the walk records
 * for it: the positions it planted, except one move per walk, recorded at other positions. With misplant set (a
 * misplant run, WALK-READBACK) it first reads back one move at each cell of each axis (its cell pass): with every other
 * axis at the table's first tuple (position 0) and that axis set at each position of its list in turn, the axis reading
 * each position of its list and a value it does not hold, each such reading read back once at every other position of
 * that axis (-1 for a value the list does not hold) and position 0 on every other axis; its walk then records the one
 * move as planted and every move otherwise than it reads (at which axis and position is NOT CLAIMED). WALK-READBACK pins
 * each cell move's reading and record against cellMoves (cellPass, under the table itself, recordProbe and offProbe), and
 * WALK-CELLS-SPELLED against spelledCellMoves (cellPass under spelledRecordProbe). A
 * read-back that reads the walk otherwise than a misplant run or its cell pass under those probes, and a fault of a
 * setter or of this planting that only such a read-back would miss, are NOT CLAIMED.
 */
function plantedWalk(axes: readonly GridAxis[], base: ParkedObservation, inventory: WalkInventory, misplant = false): (visit: (reading: ParkedObservation) => void) => void {
  const setters = axes.map(axis => AXIS_SETTERS[axis.name]);
  const setCount = 2 ** axes.length - 1;
  const setVisits = NOISE.length - axes.length;
  return visit => {
    const tuple: number[] = axes.map(() => 0);
    const oneAxisTurns = axes.map(axis => axis.list.map(() => 0));
    const setTurns = axes.map(axis => axis.list.map(() => 0));
    const misTurns = axes.map(() => 0);
    let tuples = 0;
    let firstReading: ParkedObservation | undefined;
    const change = (a: number, turns: number[][], changes: Set<number>): readonly [number, unknown] => {
      const list = axes[a].list;
      const from = tuple[a];
      const turn = turns[a][from] % list.length;
      turns[a][from] += 1;
      const to = turn < list.length - 1 ? (from + 1 + turn) % list.length : -1;
      changes.add((a * 64 + from) * 64 + to + 1);
      if (to !== -1) return [to, list[to]];
      const value = unlistedValue(list[from], setters[a].outside);
      if (typeof value === "object" && value !== list[from] && JSON.stringify(value) === JSON.stringify(list[from])) inventory.copied.add(a * 64 + from);
      return [to, value];
    };
    const readBack = (reading: ParkedObservation, planted: readonly number[]): void => {
      inventory.moves += 1;
      if (axes.some((axis, a) => axis.list.indexOf(axis.read(reading)) !== planted[a])) inventory.misread += 1;
      visit(reading);
    };
    // A misplant run's record of a move, set otherwise than the move reads (which axes and positions it changes is NOT CLAIMED).
    const misrecord = (record: readonly number[]): readonly number[] => {
      const m = inventory.moves % axes.length;
      const others = [-1, ...axes[m].list.keys()].filter(position => position !== record[m]);
      misTurns[m] += 1;
      return record.map((position, i) => (i === m ? others[misTurns[m] % others.length] : position));
    };
    const moved = (reading: ParkedObservation, record: readonly number[]): void => readBack(reading, misplant ? misrecord(record) : record);
    const walk = (depth: number, reading: ParkedObservation): void => {
      if (depth < axes.length) {
        axes[depth].list.forEach((value, position) => {
          tuple[depth] = position;
          walk(depth + 1, setters[depth].set(reading, value));
        });
        return;
      }
      firstReading ??= reading;
      visit(reading);
      for (let a = 0; a < axes.length; a += 1) {
        const [to, value] = change(a, oneAxisTurns, inventory.changes);
        moved(setters[a].set(reading, value), !misplant && tuples === 0 && a === 0 ? [...tuple] : tuple.map((position, i) => (i === a ? to : position)));
      }
      for (let k = 0; k < setVisits; k += 1) {
        const mask = 1 + ((tuples * setVisits + k) % setCount);
        inventory.sets.add(mask);
        let shifted = reading;
        const planted = [...tuple];
        for (let a = 0; a < axes.length; a += 1) {
          if ((mask & (1 << a)) === 0) continue;
          const [to, value] = change(a, setTurns, inventory.setChanges);
          planted[a] = to;
          shifted = setters[a].set(shifted, value);
        }
        moved(shifted, planted);
      }
      tuples += 1;
    };
    if (misplant) {
      // One move at each cell of each axis, at the table's first tuple with that axis at position t: the axis reading position r (-1, a value its list does not hold) and recorded at each position q other than r.
      const first = axes.reduce((reading, axis, a) => setters[a].set(reading, axis.list[0]), base);
      axes.forEach((axis, m) => {
        axis.list.forEach((value, t) => {
          tuple[m] = t;
          const held = setters[m].set(first, value);
          for (let r = -1; r < axis.list.length; r += 1) {
            const reading = r === t ? held : setters[m].set(held, r === -1 ? unlistedValue(value, setters[m].outside) : axis.list[r]);
            for (let q = -1; q < axis.list.length; q += 1) {
              if (q !== r) readBack(reading, tuple.map((position, i) => (i === m ? q : position)));
            }
          }
        });
        tuple[m] = 0;
      });
    }
    walk(0, base);
    if (firstReading !== undefined) visit(firstReading);
  };
}

/**
 * A walk's inventory read against its table: its counts, and the changes its one-axis changes and its set changes each
 * lack, by axis name and positions (`<axis name> <from>-><to>`, -1 for a value no list holds), in key order.
 * WALK-READBACK pins these names on each whole table against keyName, on the empty inventory and on planted inventories
 * each lacking one change of the run's walk in one list or in both (lackingIn); a missing list that reads a walk's
 * inventory otherwise than those is NOT CLAIMED. WALK-NAMES-SPELLED pins the empty inventory's names on each whole table
 * against spelledChanges.
 */
function walkReading(inventory: WalkInventory, axes: readonly GridAxis[]) {
  const missing = (changes: ReadonlySet<number>): readonly string[] =>
    axes.flatMap((axis, a) =>
      axis.list.flatMap((_, from) => [-1, ...axis.list.keys()].filter(to => to !== from && !changes.has((a * 64 + from) * 64 + to + 1)).map(to => `${axis.name} ${from}->${to}`)),
    );
  return {
    moves: inventory.moves,
    misread: inventory.misread,
    changes: inventory.changes.size,
    missing: missing(inventory.changes),
    setChanges: inventory.setChanges.size,
    setMissing: missing(inventory.setChanges),
    sets: inventory.sets.size,
    copied: inventory.copied.size,
  };
}

/** walkReading's two missing lists on planted inventories of a table, one per change of a run's walk: every change of the walk but that one, alone and in sets. */
function lackingOne(inventory: WalkInventory, axes: readonly GridAxis[]): readonly string[] {
  return [...inventory.changes].map(left => {
    const planted = emptyInventory();
    for (const key of inventory.changes) {
      if (key === left) continue;
      planted.changes.add(key);
      planted.setChanges.add(key);
    }
    const { missing, setMissing } = walkReading(planted, axes);
    return JSON.stringify({ missing, setMissing });
  });
}

/** What lackingOne must read for a table: for each change the empty inventory lacks, that change alone, alone and in sets (the empty inventory's names, which WALK-READBACK pins against keyName). */
function aloneEach(missing: readonly string[]): readonly string[] {
  return missing.map(name => JSON.stringify({ missing: [name], setMissing: [name] }));
}

/**
 * A change's name decoded from its key ((axis * 64 + from) * 64 + to + 1) and the table's axis names, in walkReading's
 * form (`<axis name> <from>-><to>`, -1 for a value no list holds), without calling walkReading. NAMED_CHANGES holds it to
 * literal keys and names; WALK-READBACK pins walkReading's names against it; WALK-NAMES-SPELLED holds it to
 * spelledChanges on every change of each whole table.
 */
function keyName(axes: readonly GridAxis[], key: number): string {
  return `${axes[Math.floor(key / 4096)].name} ${Math.floor(key / 64) % 64}->${(key % 64) - 1}`;
}

/**
 * keyName's literal anchor: change keys of each whole table spelled out beside their names, on each table changes of its
 * first and last axes and of an axis past the third, of a list of more than two values, from a tuple position past 1 and
 * to -1. WALK-READBACK pins that keyName reads each key as its name. NAMED-CHANGES-SHAPE freezes its shape: its row
 * counts, each row one of its table's spelled changes (spelledChanges), and those six coverage counts (namedCoverage).
 */
const NAMED_CHANGES: Readonly<Record<"seam" | "skipOracle" | "retryOracle", readonly (readonly [number, string])[]>> = {
  seam: [
    [0, "route 0->-1"],
    [4160, "run signal 1->-1"],
    [12290, "control 0->1"],
    [16386, "control value 0->1"],
    [20482, "parked aborts 0->1"],
    [36996, "setup beforeDispatch entries 2->3"],
    [37056, "setup beforeDispatch entries 3->-1"],
    [41089, "call log offset 2->0"],
    [41090, "call log offset 2->1"],
  ],
  skipOracle: [
    [65, "startup 1->0"],
    [4288, "original starts 3->-1"],
    [12290, "later starts 0->1"],
    [16528, "final row 2->15"],
    [17408, "final row 16->-1"],
    [21000, "script value 8->7"],
  ],
  retryOracle: [
    [2, "startup 0->1"],
    [12416, "later starts 2->-1"],
    [16452, "original entries 1->3"],
    [20673, "replacement entries 3->0"],
    [24771, "later entries 3->2"],
  ],
};

/** The lists a planted inventory leaves its one change out of: both, the one-axis changes only, or the set changes only. */
type LackingList = "both" | "changes" | "setChanges";

/** A planted inventory: every change of a run's walk, alone and in sets, except left, which it leaves out of the lists named. */
function lackingIn(run: WalkInventory, left: number, lists: LackingList): WalkInventory {
  const planted = emptyInventory();
  for (const key of run.changes) {
    if (key !== left || lists === "setChanges") planted.changes.add(key);
    if (key !== left || lists === "changes") planted.setChanges.add(key);
  }
  return planted;
}

/** One move a misplant run's cell pass is due to make: the positions its reading reads on the table's axes, and the positions it is recorded at. */
interface CellMove {
  readonly read: readonly number[];
  readonly record: readonly number[];
}

/**
 * The moves a misplant run's cell pass is due to make on a table, in order, built from the table's lists alone (not with
 * plantedWalk): for each axis of L values, L times over (once for each position of its list), the axis reading each
 * position of its list and -1 (a value the list does not hold) with every other axis at position 0, each such reading
 * recorded at every other position of that axis and at position 0 on every other axis. WALK-CELLS-SPELLED holds it to
 * spelledCellMoves on each whole table.
 */
function cellMoves(axes: readonly GridAxis[]): readonly CellMove[] {
  const at = (m: number, position: number): readonly number[] => axes.map((_, a) => (a === m ? position : 0));
  return axes.flatMap((axis, m) => {
    const positions = [-1, ...axis.list.keys()];
    return axis.list.flatMap(() => positions.flatMap(r => positions.filter(q => q !== r).map(q => ({ read: at(m, r), record: at(m, q) }))));
  });
}

/** Thrown by cellPass's visitor at the visit of the cell pass's last move, so that the walk after the cell pass never runs. */
const CELL_PASS_END = new Error("the cell pass's last move was read back");

/**
 * A misplant run of a table through its cell pass only (plantedWalk with misplant set over axes, the table itself or a
 * probe of it, ended at the visit of its moves-th move): each visit's reading read on the table's own axes (each value
 * as its position in that axis's list, -1 for a value the list does not hold, the positions joined by "/"), in visit
 * order.
 */
function cellPass(table: readonly GridAxis[], axes: readonly GridAxis[], base: ParkedObservation, inventory: WalkInventory, moves: number): readonly string[] {
  const read: string[] = [];
  try {
    plantedWalk(axes, base, inventory, true)(reading => {
      read.push(table.map(axis => axis.list.indexOf(axis.read(reading))).join("/"));
      if (read.length === moves) throw CELL_PASS_END;
    });
  } catch (error) {
    if (error !== CELL_PASS_END) throw error;
  }
  return read;
}

/** What a probe reads for an axis at position -1: a value no list holds. */
const UNLISTED = Symbol("a value no axis list holds");

/**
 * A probe of a table for its cell pass: the table's names and lists, each axis reading the cell pass's current move
 * (inventory.moves - 1, since the read-back counts a move before it reads it) at the position at(recorded) gives for the
 * position cellMoves records that move at on that axis (-1 read as UNLISTED).
 */
function cellProbe(table: readonly GridAxis[], inventory: WalkInventory, at: (recorded: number) => number): readonly GridAxis[] {
  const due = cellMoves(table);
  return table.map((axis, a) => ({
    name: axis.name,
    list: axis.list,
    read: () => {
      const position = at(due[inventory.moves - 1].record[a]);
      return position === -1 ? UNLISTED : axis.list[position];
    },
  }));
}

/** recordProbe: each axis read at the position cellMoves records the move at, so the read-back counts a cell move as reading otherwise only when its record is not cellMoves's. */
function recordProbe(table: readonly GridAxis[], inventory: WalkInventory): readonly GridAxis[] {
  return cellProbe(table, inventory, recorded => recorded);
}

/** offProbe: every axis read at another position than cellMoves records the move at (0 for -1, -1 otherwise), so the read-back must count every cell move as reading otherwise. */
function offProbe(table: readonly GridAxis[], inventory: WalkInventory): readonly GridAxis[] {
  return cellProbe(table, inventory, recorded => (recorded === -1 ? 0 : -1));
}

/**
 * Every change of a table spelled from the table alone, with plain loops (not with keyName, walkReading or plantedWalk):
 * for each axis in table order, each tuple position of its list and each planted position other than it (-1, a value no
 * list holds, first, then the list's positions), the change's key ((axis * 64 + from) * 64 + to + 1) beside its name
 * (`<axis name> <from>-><to>`). WALK-NAMES-SPELLED holds keyName and walkReading's empty-inventory names to it, and
 * NAMED-CHANGES-SHAPE each NAMED_CHANGES row.
 */
function spelledChanges(axes: readonly GridAxis[]): readonly (readonly [number, string])[] {
  const spelled: (readonly [number, string])[] = [];
  for (let axis = 0; axis < axes.length; axis += 1) {
    for (let from = 0; from < axes[axis].list.length; from += 1) {
      for (let to = -1; to < axes[axis].list.length; to += 1) {
        if (to !== from) spelled.push([(axis * 64 + from) * 64 + to + 1, `${axes[axis].name} ${from}->${to}`]);
      }
    }
  }
  return spelled;
}

/**
 * The moves a misplant run's cell pass is due to make on a table, spelled from the table's list lengths alone, with plain
 * loops (not with cellMoves or plantedWalk): for each axis m of L values in table order, L times over, for each read
 * position r (-1 first, then the list's positions) and each record position q other than r, the move whose reading holds
 * axis m at r and whose record holds it at q, every other axis at position 0 in both (the table's first tuple).
 * WALK-CELLS-SPELLED holds cellMoves and the cell pass to it.
 */
function spelledCellMoves(axes: readonly GridAxis[]): readonly CellMove[] {
  const spelled: CellMove[] = [];
  for (let m = 0; m < axes.length; m += 1) {
    const length = axes[m].list.length;
    for (let turn = 0; turn < length; turn += 1) {
      for (let r = -1; r < length; r += 1) {
        for (let q = -1; q < length; q += 1) {
          if (q !== r) spelled.push({ read: axes.map((_, a) => (a === m ? r : 0)), record: axes.map((_, a) => (a === m ? q : 0)) });
        }
      }
    }
  }
  return spelled;
}

/** spelledRecordProbe: as recordProbe, but each axis read at the position spelledCellMoves (not cellMoves) records the cell pass's current move at. */
function spelledRecordProbe(table: readonly GridAxis[], inventory: WalkInventory): readonly GridAxis[] {
  const due = spelledCellMoves(table);
  return table.map((axis, a) => ({
    name: axis.name,
    list: axis.list,
    read: () => {
      const position = due[inventory.moves - 1].record[a];
      return position === -1 ? UNLISTED : axis.list[position];
    },
  }));
}

/**
 * NAMED_CHANGES's coverage of a table, in the order its doc names it: how many of the rows change the table's first axis,
 * its last axis, an axis past the third, an axis whose list holds more than two values, from a tuple position past 1, and
 * to -1, each read from the row's key ((axis * 64 + from) * 64 + to + 1) and the table's lists (not with keyName).
 * NAMED-CHANGES-SHAPE freezes these counts.
 */
function namedCoverage(axes: readonly GridAxis[], rows: readonly (readonly [number, string])[]): readonly number[] {
  const changes = rows.map(([key]) => ({ axis: Math.floor(key / 4096), from: Math.floor(key / 64) % 64, to: (key % 64) - 1 }));
  return [
    changes.filter(change => change.axis === 0).length,
    changes.filter(change => change.axis === axes.length - 1).length,
    changes.filter(change => change.axis > 2).length,
    changes.filter(change => axes[change.axis].list.length > 2).length,
    changes.filter(change => change.from > 1).length,
    changes.filter(change => change.to === -1).length,
  ];
}

/** A grid case's timeout: each grid judges hundreds of thousands of readings, and a loaded gate host is slow. */
const GRID_TIMEOUT = 300_000;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER = "test/helpers/parked-dispatch-experiment.ts";
const SUITE = "test/workbench-mwi-cancel-repro.test.ts";

function parse(file: string): ts.SourceFile {
  return ts.createSourceFile(file, readFileSync(join(ROOT, file), "utf8"), ts.ScriptTarget.ES2022, true);
}

/**
 * The string literals of a union type as its source file declares it, in declaration order (read with the TypeScript
 * parser): a type alias named owner, or, given a property, that property of the interface named owner. Empty when the
 * declaration is not found, so a failed read cannot match a list.
 */
function declaredUnion(file: string, owner: string, property?: string): readonly string[] {
  let found: ts.TypeNode | undefined;
  const visit = (node: ts.Node): void => {
    if (property === undefined && ts.isTypeAliasDeclaration(node) && node.name.text === owner) found = node.type;
    if (property !== undefined && ts.isInterfaceDeclaration(node) && node.name.text === owner) {
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && ts.isIdentifier(member.name) && member.name.text === property) found = member.type;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(file));
  const union = found;
  if (union === undefined || !ts.isUnionTypeNode(union)) return [];
  return union.types.flatMap(member => (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal) ? [member.literal.text] : []));
}

/** Every identifier a parsed source holds (comments and string literals hold none). */
function identifierNames(source: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) names.add(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}

/** Every identifier a source file holds (read with the TypeScript parser; comments and string literals hold none). */
function identifiersOf(file: string): ReadonlySet<string> {
  return identifierNames(parse(file));
}

/** Every module a parsed source imports by a top-level import declaration, by its specifier. */
function importSpecifiers(source: ts.SourceFile): readonly string[] {
  return source.statements.flatMap(statement =>
    ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) ? [statement.moduleSpecifier.text] : [],
  );
}

/** Every module a source file imports, by its specifier. */
function importedModules(file: string): readonly string[] {
  return importSpecifiers(parse(file));
}

/**
 * The text of every literal a parsed source holds, in source order: each string literal, each template literal part
 * (a template with no substitution, and the head, middle and tail of one with substitutions) and each regular
 * expression literal (its text, slashes and flags included). Comments hold none.
 */
function literalTexts(source: ts.SourceFile): readonly string[] {
  const texts: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isRegularExpressionLiteral(node)
    ) {
      texts.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return texts;
}

/** How many import() calls a parsed source holds, at any depth. */
function dynamicImportCount(source: ts.SourceFile): number {
  let count = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) count += 1;
    ts.forEachChild(node, visit);
  };
  visit(source);
  return count;
}

/** The timer globals INSTRUMENT-NO-TIMER looks for in the helper's source text. */
const TIMER_GLOBALS: readonly string[] = ["setTimeout", "setInterval", "setImmediate"];
/** The timers modules, by the specifiers a static import can name. */
const TIMER_MODULES: readonly string[] = ["timers", "node:timers", "timers/promises", "node:timers/promises"];
/** What no literal text of the helper may contain: a timer global's name, or the text every timers module's specifier holds. */
const TIMER_WORDS: readonly string[] = [...TIMER_GLOBALS, "timers"];
/** vi's two module-mocking methods. These are this suite's only literal texts equal to either name; INSTRUMENT-NO-TIMER counts them. */
const MOCK_NAMES: readonly string[] = ["mock", "doMock"];

/**
 * A planted source text, parsed and never run, holding each form INSTRUMENT-NO-TIMER's reads look for: a static import
 * of a timers module (its specifier, and the imported name as an identifier), a timer global called by its name, by a
 * string key and by a template key, a template with substitutions whose head, middle and tail each hold one form, a
 * regular expression literal naming a timer global, an import() call of a timers module, vi's mock as a destructured
 * name and vi's doMock by a string key.
 */
const PLANTED_FORMS = [
  'import { setImmediate } from "node:timers";',
  "setInterval(() => {}, 0);",
  'globalThis["setTimeout"](() => {}, 0);',
  "globalThis[`setInterval`](() => {}, 0);",
  `const parts = \`setImmediate\${0}setTimeout\${0}timers/promises\`;`,
  "const pattern = /setInterval/;",
  'await import("node:timers/promises");',
  "const { mock } = vi;",
  'vi["doMock"]("planted");',
].join("\n");

describe("EAT-R015 a runtime skip issued while the host's beforeDispatch is parked (wb-9v02)", () => {
  it("R015-SPAWN fresh spawn: the seam validates, and the skip is lost: one SDK start, settled done, the script got the answer", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn" });

    expect(observation).toEqual(PARKED_SKIP_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"],
    });
  });

  it("R015-RESUME resume startup: the seam validates, and the skip is lost the same way on the resumed row", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "resume" });

    expect(observation).toEqual(PARKED_SKIP_RESUME);
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "observed-violation",
      breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"],
    });
  });

  it("R015-NO-BARRIER mutant: a beforeDispatch that returns at once leaves nothing parked, and the experiment refuses the reading", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn", barrier: "absent" });

    // The target's query had already started when the skip was issued, and no abort reached the host while parked. The
    // rest of the reading is pinned as measured: the host settled the target skipped with the cancelled-query error,
    // the row ended as an error marked skipped, and the script received null.
    expect(observation).toEqual({
      plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "absent" },
      parkedAtControl: false,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 0,
      runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }],
      finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
      runStatus: "completed",
      scriptValue: null,
    });
    expect(judgeParkedObservation(observation)).toEqual({
      kind: "invalid-experiment",
      reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"],
    });
  });

  it("R015-RUN-ABORT mutant: a whole-run abort in place of the skip is refused, while the instrument still reads the F10 shape (zero SDK starts, the host settling the target skipped as Workflow aborted.)", async () => {
    const observation = await runParkedDispatchExperiment({ control: "skip", startup: "spawn", route: "run-abort" });

    // The run's own abort fans out to its in-flight agents, so the host does see one abortAgent while parked; the
    // killed run writes no terminal row for the parked agent, whose host settlement is the F10 one.
    expect(observation).toEqual({
      plan: { control: "skip", startup: "spawn", route: "run-abort", barrier: "parked" },
      parkedAtControl: true,
      queriesBeforeControl: 0,
      controlAccepted: undefined,
      hostAbortsWhileParked: 1,
      runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 },
      sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
      sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }],
      finalRow: { state: "start", skipped: false, attempt: 1, reason: null },
      runStatus: "killed",
      scriptValue: undefined,
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] });
  });

  it("R015-NO-CONTROL control: the same parked sequence with no control starts exactly one query, and is never read as a reproduction", async () => {
    const observation = await runParkedDispatchExperiment({ control: "none", startup: "spawn" });

    expect(observation).toEqual({
      ...PARKED_SKIP_SPAWN,
      plan: { control: "none", startup: "spawn", route: "per-agent", barrier: "parked" },
      controlAccepted: undefined,
      hostAbortsWhileParked: 0,
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "invalid-experiment", reasons: ["control-not-issued", "control-not-routed-to-host"] });
  });

  it("R015-ORACLE named rows: the oracle reading, at both startups and with its host settlements replaced, meets the skip oracle, and each row that varies one part of it names that part's breach", () => {
    const oracle: ParkedObservation = {
      ...PARKED_SKIP_SPAWN,
      sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 },
      sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }],
      finalRow: { state: "error", skipped: true, attempt: 1, reason: null },
      scriptValue: null,
    };

    expect(breachesOf(oracle)).toEqual(["failed-reproduction"]);
    // At resume startup the origin agent's own SDK start is a setup start, not a target start.
    expect(
      breachesOf({
        ...oracle,
        plan: { ...oracle.plan, startup: "resume" },
        queriesBeforeControl: 1,
        authorizations: PARKED_SKIP_RESUME.authorizations,
        sdkStarts: { setup: 1, original: 0, replacement: 0, extra: 0 },
        sdkCallsRecorded: 1,
      }),
    ).toEqual(["failed-reproduction"]);
    // The oracle reading with its host settlements replaced keeps its verdict (the -ROWS case and the grid replace them on more readings).
    expect(breachesOf({ ...oracle, hostSettlements: [] })).toEqual(["failed-reproduction"]);
    expect(breachesOf({ ...oracle, hostSettlements: PARKED_SKIP_SPAWN.hostSettlements })).toEqual(["failed-reproduction"]);
    // One breach per row. An SDK start in each target attempt: the original, the replacement and a later one.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 1 }, sdkCallsRecorded: 1 })).toEqual(["sdk-started-after-skip"]);
    // A final row that is not marked skipped, and no final row at all.
    expect(breachesOf({ ...oracle, finalRow: PARKED_SKIP_SPAWN.finalRow })).toEqual(["not-settled-skipped"]);
    expect(breachesOf({ ...oracle, finalRow: undefined })).toEqual(["not-settled-skipped"]);
    // A script value other than null: an answer, undefined, and the other falsy values.
    expect(breachesOf({ ...oracle, scriptValue: "answer 0" })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: undefined })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: false })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: 0 })).toEqual(["script-received-a-value"]);
    expect(breachesOf({ ...oracle, scriptValue: "" })).toEqual(["script-received-a-value"]);
  });

  it("R015-SEAM named rows: both base readings pass the validation, and each row that varies one wrong-seam facet of a base reading is refused by that facet's one reason, with no oracle breach reported", () => {
    // Controls: both base readings pass the validation (each is an observed violation), so each row below is refused
    // for the one facet it varies, and its oracle breaches are never reported.
    expect(reasonsOf(PARKED_SKIP_SPAWN)).toEqual(["observed-violation"]);
    expect(reasonsOf(PARKED_SKIP_RESUME)).toEqual(["observed-violation"]);

    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, parkedAtControl: false })).toEqual(["control-not-parked"]);
    // A target SDK start before the control, at each startup (at resume the origin agent's own start comes first).
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 1 })).toEqual(["dispatch-before-control"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 2 })).toEqual(["dispatch-before-control"]);
    // A whole-run abort, each facet alone: the run's own signal aborted, and the plan routing the control as a run abort.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, runAborted: true })).toEqual(["whole-run-abort"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, route: "run-abort" } })).toEqual(["whole-run-abort"]);
    // No per-agent control, each facet alone: a "none" plan whatever the control's value reads, and a reading that holds
    // no value from a per-agent control.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, control: "none" } })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, plan: { ...PARKED_SKIP_SPAWN.plan, control: "none" }, controlAccepted: false })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, controlAccepted: undefined })).toEqual(["control-not-issued"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, controlAccepted: false })).toEqual(["control-refused"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, hostAbortsWhileParked: 0 })).toEqual(["control-not-routed-to-host"]);
    // Setup agents that drifted, each facet alone: their beforeDispatch entries, and their SDK starts. One more than
    // the none expected at spawn; one more and one fewer than the one expected at resume.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, authorizations: { ...PARKED_SKIP_SPAWN.authorizations, setup: 1 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 1, sdkStarts: { ...PARKED_SKIP_SPAWN.sdkStarts, setup: 1 }, sdkCallsRecorded: 2 })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, authorizations: { ...PARKED_SKIP_RESUME.authorizations, setup: 2 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, authorizations: { ...PARKED_SKIP_RESUME.authorizations, setup: 0 } })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 2, sdkStarts: { ...PARKED_SKIP_RESUME.sdkStarts, setup: 2 }, sdkCallsRecorded: 3 })).toEqual(["setup-drift"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 0, sdkStarts: { ...PARKED_SKIP_RESUME.sdkStarts, setup: 0 }, sdkCallsRecorded: 1 })).toEqual(["setup-drift"]);
    // An SDK start the per-attempt counts leave out.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, sdkCallsRecorded: 2 })).toEqual(["uncounted-sdk-start"]);
  });

  it("R015-SEAM-ROWS named rows at the counts and directions R015-SEAM leaves open: 2 or 3 parked aborts pass the validation, fewer starts at the control than the setup agents' own are dispatch-before-control as more are, and start counts summing to more than the call log are uncounted-sdk-start", () => {
    // Refusal #2 U4 (W-M4): 2 and 3 abortAgent calls naming the target while it was parked, at both startups and for a retry.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, hostAbortsWhileParked: 2 })).toEqual(["observed-violation"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, hostAbortsWhileParked: 3 })).toEqual(["observed-violation"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, hostAbortsWhileParked: 2 })).toEqual(["observed-violation"]);
    expect(reasonsOf({ ...PARKED_RETRY_SPAWN, hostAbortsWhileParked: 2 })).toEqual(["observed-violation"]);
    // Refusal #2 F5 (W-E1): at resume, 0 starts at the control against the origin agent's 1; then 2 and 3 at spawn.
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, queriesBeforeControl: 0 })).toEqual(["dispatch-before-control"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 2 })).toEqual(["dispatch-before-control"]);
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, queriesBeforeControl: 3 })).toEqual(["dispatch-before-control"]);
    // Per-attempt start counts that sum to more starts than the fixture SDK's own call log holds, at both startups.
    expect(reasonsOf({ ...PARKED_SKIP_SPAWN, sdkCallsRecorded: 0 })).toEqual(["uncounted-sdk-start"]);
    expect(reasonsOf({ ...PARKED_SKIP_RESUME, sdkCallsRecorded: 1 })).toEqual(["uncounted-sdk-start"]);
  });

  it("R015-ORACLE-ROWS named rows of the skip oracle: the skipped mark alone decides the final-row part at each entry state, 2 or 3 target starts break it, and each breaking row keeps its verdict under each of the six settlement lists", () => {
    // Refusal #2 U1 (W-M1A, W-M1B): the skipped mark varied alone at each of the four entry states, then at attempt 2.
    for (const state of ENTRY_STATES) {
      expect(breachesOf({ ...SKIP_ORACLE, finalRow: { state, skipped: true, attempt: 1, reason: null } })).toEqual(["failed-reproduction"]);
      expect(breachesOf({ ...SKIP_ORACLE, finalRow: { state, skipped: false, attempt: 1, reason: null } })).toEqual(["not-settled-skipped"]);
    }
    expect(breachesOf({ ...SKIP_ORACLE, finalRow: { state: "done", skipped: true, attempt: 2, reason: "user-retry" } })).toEqual(["failed-reproduction"]);
    expect(breachesOf({ ...SKIP_ORACLE, finalRow: { state: "error", skipped: false, attempt: 2, reason: "user-retry" } })).toEqual(["not-settled-skipped"]);
    // Refusal #2 U4 (W-M5): two target SDK starts in each pairing, two in one attempt, and three.
    expect(breachesOf({ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 1 }, sdkCallsRecorded: 2 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 2, replacement: 0, extra: 0 }, sdkCallsRecorded: 2 })).toEqual(["sdk-started-after-skip"]);
    expect(breachesOf({ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 1 }, sdkCallsRecorded: 3 })).toEqual(["sdk-started-after-skip"]);
    // Refusal #2 U3 (W-M6): each single-breach row and the live three-breach reading, under each settlement list.
    const breaking: ReadonlyArray<readonly [ParkedObservation, readonly string[]]> = [
      [{ ...SKIP_ORACLE, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1 }, ["sdk-started-after-skip"]],
      [{ ...SKIP_ORACLE, finalRow: PARKED_SKIP_SPAWN.finalRow }, ["not-settled-skipped"]],
      [{ ...SKIP_ORACLE, finalRow: undefined }, ["not-settled-skipped"]],
      [{ ...SKIP_ORACLE, scriptValue: "answer 0" }, ["script-received-a-value"]],
      [PARKED_SKIP_SPAWN, ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"]],
    ];
    for (const [reading, breaches] of breaking) {
      for (const hostSettlements of SETTLEMENT_LISTS) expect(breachesOf({ ...reading, hostSettlements })).toEqual(breaches);
    }
    for (const hostSettlements of SETTLEMENT_LISTS) expect(breachesOf({ ...SKIP_ORACLE, hostSettlements })).toEqual(["failed-reproduction"]);
  });

  it("R015-SEAM-GRID each of the 110592 readings of the seam grid, and each of them under every NOISE profile, gets the verdict ruledVerdict gives", { timeout: GRID_TIMEOUT }, () => {
    expect(tally(seamGrid)).toEqual({ readings: 110_592 * (1 + NOISE.length), differing: 0, first: [] });
  });

  it("R015-ORACLE-GRID each of the 19584 readings of the skip oracle grid, and each of them under every NOISE profile, gets the verdict ruledVerdict gives", { timeout: GRID_TIMEOUT }, () => {
    expect(tally(skipOracleGrid)).toEqual({ readings: 19_584 * (1 + NOISE.length), differing: 0, first: [] });
  });
});

describe("EAT-R016 a per-agent retry issued while the host's beforeDispatch is parked (wb-9v02)", () => {
  it("R016-SPAWN fresh spawn: the original attempt still starts its SDK query, then one replacement runs as attempt 2", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "spawn" });

    expect(observation).toEqual(PARKED_RETRY_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
  });

  it("R016-RESUME resume startup: the resumed row's original attempt still starts its SDK query, then one replacement runs as attempt 2 and the script receives its answer", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "resume" });

    expect(observation).toEqual({
      plan: { control: "retry", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true,
      queriesBeforeControl: 1,
      controlAccepted: true,
      hostAbortsWhileParked: 1,
      runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 },
      sdkStarts: { setup: 1, original: 1, replacement: 1, extra: 0 },
      sdkCallsRecorded: 3,
      hostSettlements: [
        { ok: true, skipped: false },
        { ok: true, skipped: false },
      ],
      finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" },
      runStatus: "completed",
      scriptValue: "answer 2",
    });
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
  });

  it("R016-HIDDEN-ORIGINAL mutant: counting only the final success hides the original query, and the experiment refuses the reading", async () => {
    const observation = await runParkedDispatchExperiment({ control: "retry", startup: "spawn" });
    expect(observation).toEqual(PARKED_RETRY_SPAWN);
    expect(judgeParkedObservation(observation)).toEqual({ kind: "observed-violation", breaches: ["original-started-after-retry"] });
    // The fixture SDK's own call log saw both queries; the per-attempt count must account for each of them.
    expect(observation.sdkCallsRecorded).toBe(2);
    expect(observation.sdkStarts.original).toBe(1);

    const finalSuccessOnly: ParkedObservation = { ...observation, sdkStarts: { ...observation.sdkStarts, original: 0 } };
    expect(judgeParkedObservation(finalSuccessOnly)).toEqual({ kind: "invalid-experiment", reasons: ["uncounted-sdk-start"] });
  });

  it("R016-ORACLE named rows: the oracle reading, with no replacement start, at resume and with no host settlements, meets the retry oracle, and each row that varies it names its breaches", () => {
    const oracle: ParkedObservation = { ...PARKED_RETRY_SPAWN, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 0 }, sdkCallsRecorded: 1 };

    expect(breachesOf(oracle)).toEqual(["failed-reproduction"]);
    // A retry that never re-runs is inside "at most one" as well.
    expect(
      breachesOf({ ...oracle, authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 0 }),
    ).toEqual(["failed-reproduction"]);
    // At resume startup the origin agent's own SDK start is a setup start, not an original or a replacement one.
    expect(
      breachesOf({
        ...oracle,
        plan: { ...oracle.plan, startup: "resume" },
        queriesBeforeControl: 1,
        authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 },
        sdkStarts: { setup: 1, original: 0, replacement: 1, extra: 0 },
        sdkCallsRecorded: 2,
      }),
    ).toEqual(["failed-reproduction"]);
    // The oracle reading with its host settlements replaced keeps its verdict (the -ROWS case and the grid replace them on more readings).
    expect(breachesOf({ ...oracle, hostSettlements: [] })).toEqual(["failed-reproduction"]);
    // One breach per row.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2 })).toEqual(["original-started-after-retry"]);
    expect(
      breachesOf({ ...oracle, authorizations: { ...oracle.authorizations, replacement: 2 }, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 }),
    ).toEqual(["more-than-one-replacement"]);
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 })).toEqual(["more-than-one-replacement"]);
    expect(breachesOf({ ...oracle, authorizations: { ...oracle.authorizations, replacement: 0 } })).toEqual(["replacement-not-authorized"]);
    // Two replacement starts under one replacement entry break both.
    expect(breachesOf({ ...oracle, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 })).toEqual([
      "more-than-one-replacement",
      "replacement-not-authorized",
    ]);
  });

  it("R016-ORACLE-ROWS named rows of the retry oracle: beside later beforeDispatch entries a later start still breaks it and a replacement start without a replacement entry is still unauthorized, 2 or 3 starts break the parts that count them, and each breaking row keeps its verdict under each of the six settlement lists", () => {
    // Refusal #2 U2 (W-M2): a start in a later attempt beside a later beforeDispatch entry, with and without the replacement start.
    expect(
      breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 1, extra: 1 }, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 }),
    ).toEqual(["more-than-one-replacement"]);
    expect(
      breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 1, extra: 1 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 1 }, sdkCallsRecorded: 1 }),
    ).toEqual(["more-than-one-replacement"]);
    expect(breachesOf({ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 1 }, sdkCallsRecorded: 1 })).toEqual(["more-than-one-replacement"]);
    // Refusal #2 U2 (W-M3): one replacement start and no replacement entry, beside a later entry, two original entries, and both.
    expect(breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 0, extra: 1 } })).toEqual(["replacement-not-authorized"]);
    expect(breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 2, replacement: 0, extra: 0 } })).toEqual(["replacement-not-authorized"]);
    expect(breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 2, replacement: 0, extra: 2 } })).toEqual(["replacement-not-authorized"]);
    // Two replacement starts under one replacement entry and one later entry break both parts; later entries alone break nothing.
    expect(
      breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 1, extra: 1 }, sdkStarts: { setup: 0, original: 0, replacement: 2, extra: 0 }, sdkCallsRecorded: 2 }),
    ).toEqual(["more-than-one-replacement", "replacement-not-authorized"]);
    expect(breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 1, extra: 2 } })).toEqual(["failed-reproduction"]);
    // Refusal #2 U4: 2 and 3 original starts, 2 later starts, and 3 replacement starts under 3 replacement entries.
    expect(breachesOf({ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 2, replacement: 1, extra: 0 }, sdkCallsRecorded: 3 })).toEqual(["original-started-after-retry"]);
    expect(breachesOf({ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 3, replacement: 0, extra: 0 }, sdkCallsRecorded: 3 })).toEqual(["original-started-after-retry"]);
    expect(breachesOf({ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 2 }, sdkCallsRecorded: 3 })).toEqual(["more-than-one-replacement"]);
    expect(
      breachesOf({ ...RETRY_ORACLE, authorizations: { setup: 0, original: 1, replacement: 3, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 3, extra: 0 }, sdkCallsRecorded: 3 }),
    ).toEqual(["more-than-one-replacement"]);
    // Refusal #2 U3 (W-M6B): each single-breach row and the live reading, under each settlement list.
    const breaking: ReadonlyArray<readonly [ParkedObservation, readonly string[]]> = [
      [{ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2 }, ["original-started-after-retry"]],
      [{ ...RETRY_ORACLE, sdkStarts: { setup: 0, original: 0, replacement: 1, extra: 1 }, sdkCallsRecorded: 2 }, ["more-than-one-replacement"]],
      [{ ...RETRY_ORACLE, authorizations: { ...RETRY_ORACLE.authorizations, replacement: 0 } }, ["replacement-not-authorized"]],
      [PARKED_RETRY_SPAWN, ["original-started-after-retry"]],
    ];
    for (const [reading, breaches] of breaking) {
      for (const hostSettlements of SETTLEMENT_LISTS) expect(breachesOf({ ...reading, hostSettlements })).toEqual(breaches);
    }
    for (const hostSettlements of SETTLEMENT_LISTS) expect(breachesOf({ ...RETRY_ORACLE, hostSettlements })).toEqual(["failed-reproduction"]);
  });

  it("R016-ORACLE-GRID each of the 8192 readings of the retry oracle grid, and each of them under every NOISE profile, gets the verdict ruledVerdict gives", { timeout: GRID_TIMEOUT }, () => {
    expect(tally(retryOracleGrid)).toEqual({ readings: 8_192 * (1 + NOISE.length), differing: 0, first: [] });
  });
});

/**
 * The call-through recorder's record of one run (wb-7ak9): each call the experiment made on the WorkflowControl surface
 * its onControl received, in call order, as `method(argument) = value` (`pause()`, `resume()` and `isPaused() = value`
 * for the methods that take none), and how many abort events the run's own signal dispatched.
 */
interface ControlRecord {
  readonly calls: string[];
  aborts: number;
}

/** A WorkflowControl whose five methods each call the surface's own method, record the call in calls and return its value. */
function recordedSurface(surface: WorkflowControl, calls: string[]): WorkflowControl {
  return {
    pause: () => {
      surface.pause();
      calls.push("pause()");
    },
    resume: () => {
      surface.resume();
      calls.push("resume()");
    },
    isPaused: () => {
      const value = surface.isPaused();
      calls.push(`isPaused() = ${value}`);
      return value;
    },
    skip: index => {
      const value = surface.skip(index);
      calls.push(`skip(${index}) = ${value}`);
      return value;
    },
    retry: index => {
      const value = surface.retry(index);
      calls.push(`retry(${index}) = ${value}`);
      return value;
    },
  };
}

/**
 * The call-through recorder, the runner PLAN-DOMAIN's second run of each plan passes to the experiment: it hands the
 * experiment's own options on to runWorkflow with one change, the surface their onControl receives is recordedSurface
 * over the runtime's own, and it counts the abort events their signal dispatches.
 */
function callThrough(record: ControlRecord): ParkedRunner {
  return options => {
    options.signal?.addEventListener("abort", () => {
      record.aborts += 1;
    });
    return runWorkflow({ ...options, onControl: surface => options.onControl?.(recordedSurface(surface, record.calls)) });
  };
}

/**
 * The record a plan's words name (the helper's ParkedControl and ParkedRoute docs): a skip or retry plan on the
 * per-agent route makes one call, that WorkflowControl method on the target's row, returning the reading's
 * controlAccepted, and the run's own signal dispatches no abort event; on the run-abort route it makes no call and the
 * signal dispatches one; a "none" plan makes no call and the signal dispatches none. The target's row is the one after
 * the setup agents' rows (rows count agent() calls from 0): 0 at spawn, 1 at resume.
 */
function namedConduct(reading: ParkedObservation): { readonly calls: readonly string[]; readonly aborts: number } {
  const { control, startup, route } = reading.plan;
  if (control === "none") return { calls: [], aborts: 0 };
  if (route === "run-abort") return { calls: [], aborts: 1 };
  return { calls: [`${control}(${SETUP_AGENTS[startup]}) = ${reading.controlAccepted}`], aborts: 0 };
}

/** Every place a reading holds a value, and how to read it there: the plan's four facets, the top-level fields, and the four counts of authorizations and of sdkStarts. */
const READING_PLACES: readonly (readonly [string, (reading: ParkedObservation) => unknown])[] = [
  ["plan.control", reading => reading.plan.control],
  ["plan.startup", reading => reading.plan.startup],
  ["plan.route", reading => reading.plan.route],
  ["plan.barrier", reading => reading.plan.barrier],
  ["parkedAtControl", reading => reading.parkedAtControl],
  ["queriesBeforeControl", reading => reading.queriesBeforeControl],
  ["controlAccepted", reading => reading.controlAccepted],
  ["hostAbortsWhileParked", reading => reading.hostAbortsWhileParked],
  ["runAborted", reading => reading.runAborted],
  ["authorizations.setup", reading => reading.authorizations.setup],
  ["authorizations.original", reading => reading.authorizations.original],
  ["authorizations.replacement", reading => reading.authorizations.replacement],
  ["authorizations.extra", reading => reading.authorizations.extra],
  ["sdkStarts.setup", reading => reading.sdkStarts.setup],
  ["sdkStarts.original", reading => reading.sdkStarts.original],
  ["sdkStarts.replacement", reading => reading.sdkStarts.replacement],
  ["sdkStarts.extra", reading => reading.sdkStarts.extra],
  ["sdkCallsRecorded", reading => reading.sdkCallsRecorded],
  ["hostSettlements", reading => reading.hostSettlements],
  ["finalRow", reading => reading.finalRow],
  ["runStatus", reading => reading.runStatus],
  ["scriptValue", reading => reading.scriptValue],
];

/** The reading's objects GRID-NOISE reads key by key; every other field of a reading is one place, read whole (an object by identity). */
const READ_BY_KEY: readonly string[] = ["plan", "authorizations", "sdkStarts"];

/** A reading's places by Object.keys, in key order: each field's value, and for READ_BY_KEY's objects each of their keys' values (`object.key`). */
function placesByKeys(reading: ParkedObservation): readonly (readonly [string, unknown])[] {
  return Object.entries(reading).flatMap(([key, value]) =>
    READ_BY_KEY.includes(key) && typeof value === "object" && value !== null
      ? Object.entries(value).map(([inner, innerValue]) => [`${key}.${inner}`, innerValue] as const)
      : [[key, value] as const],
  );
}

/** A reading whose places all hold distinct values (by Object.is), never judged: GRID-NOISE reads READING_PLACES against it. */
const DISTINCT_READING: ParkedObservation = {
  plan: { control: "skip", startup: "resume", route: "run-abort", barrier: "absent" },
  parkedAtControl: true,
  queriesBeforeControl: 11,
  controlAccepted: undefined,
  hostAbortsWhileParked: 12,
  runAborted: false,
  authorizations: { setup: 21, original: 22, replacement: 23, extra: 24 },
  sdkStarts: { setup: 31, original: 32, replacement: 33, extra: 34 },
  sdkCallsRecorded: 41,
  hostSettlements: [],
  finalRow: { state: "progress", skipped: true, attempt: 3, reason: "a reason" },
  runStatus: "failed",
  scriptValue: "a script value",
};

/** Where a reading holds each field of a NOISE profile: the places that field replaces, each with the profile's value for it. */
const NOISE_PLACES: Readonly<Record<keyof Noise, readonly (readonly [string, (noise: Noise) => unknown])[]>> = {
  hostSettlements: [["hostSettlements", noise => noise.hostSettlements]],
  runStatus: [["runStatus", noise => noise.runStatus]],
  barrier: [["plan.barrier", noise => noise.barrier]],
  finalRow: [["finalRow", noise => noise.finalRow]],
  scriptValue: [["scriptValue", noise => noise.scriptValue]],
  entries: [
    ["authorizations.original", noise => noise.entries.original],
    ["authorizations.replacement", noise => noise.entries.replacement],
    ["authorizations.extra", noise => noise.entries.extra],
  ],
  oneStart: [
    ["sdkStarts.original", noise => noise.oneStart.original],
    ["sdkStarts.replacement", noise => noise.oneStart.replacement],
    ["sdkStarts.extra", noise => noise.oneStart.extra],
  ],
};

/** GRID-NOISE's lists, this suite's own (no comment is read): the NOISE fields each grid's visits under a profile replace, and no other. */
const NOISE_FIELDS: Readonly<Record<"seam" | "skipOracle" | "retryOracle", readonly (keyof Noise)[]>> = {
  seam: ["hostSettlements", "runStatus", "barrier", "finalRow", "scriptValue", "entries", "oneStart"],
  skipOracle: ["hostSettlements", "runStatus", "barrier", "entries"],
  retryOracle: ["hostSettlements", "runStatus", "barrier", "finalRow", "scriptValue"],
};

/** The keys of a reading and of its plan, authorizations and sdkStarts objects, in order. */
function readingKeys(reading: ParkedObservation): string {
  return [reading, reading.plan, reading.authorizations, reading.sdkStarts].map(part => Object.keys(part).join()).join("|");
}

/** A reading under a NOISE profile with a key added to one of its parts: the reading itself, or its plan, authorizations or sdkStarts object. */
function strayKey(reading: ParkedObservation, part: "reading" | "plan" | "authorizations" | "sdkStarts"): ParkedObservation {
  if (part === "reading") {
    const planted = { ...reading, stray: 0 };
    return planted;
  }
  if (part === "plan") {
    const plan = { ...reading.plan, stray: 0 };
    return { ...reading, plan };
  }
  if (part === "authorizations") {
    const authorizations = { ...reading.authorizations, stray: 0 };
    return { ...reading, authorizations };
  }
  const sdkStarts = { ...reading.sdkStarts, stray: 0 };
  return { ...reading, sdkStarts };
}

/** How a grid's visits read against the NOISE profiles: the visits, how many are not their reading under the profile due, and the first three of those. */
interface NoiseTally {
  readonly visits: number;
  readonly wrong: number;
  readonly first: readonly string[];
}

/**
 * Reads a grid's visits in runs of 1 + NOISE.length: the first visit of a run is its reading, and visit k after it (k
 * from 1) must be that reading under NOISE[k - 1]: at each place of the fields listed, that profile's value, at every
 * other place the first visit's, each compared with Object.is (an object by identity), and the same keys as the first
 * visit. It names the places a wrong visit differs at.
 */
function noiseTally(grid: (visit: (reading: ParkedObservation) => void) => void, fields: readonly (keyof Noise)[]): NoiseTally {
  const due = 1 + NOISE.length;
  const replaced = new Map(fields.flatMap(field => NOISE_PLACES[field]));
  let visits = 0;
  let wrong = 0;
  const first: string[] = [];
  let bare: readonly unknown[] = [];
  let bareKeys = "";
  grid(reading => {
    const k = visits % due;
    const visit = visits;
    visits += 1;
    const values = READING_PLACES.map(([, read]) => read(reading));
    if (k === 0) {
      bare = values;
      bareKeys = readingKeys(reading);
      return;
    }
    const noise = NOISE[k - 1];
    const off = READING_PLACES.filter(([place], i) => {
      const profileValue = replaced.get(place);
      return !Object.is(values[i], profileValue === undefined ? bare[i] : profileValue(noise));
    }).map(([place]) => place);
    if (readingKeys(reading) !== bareKeys) off.push("keys");
    if (off.length === 0) return;
    wrong += 1;
    if (first.length < 3) first.push(`visit ${visit}: ${off.join(", ")}`);
  });
  return { visits, wrong, first };
}

/** A planted grid, never run as a grid case: PARKED_SKIP_SPAWN and PARKED_RETRY_SPAWN each visited bare, then under each NOISE profile as plant applies it (k its position in NOISE). */
function plantedNoiseGrid(plant: (reading: ParkedObservation, noise: Noise, k: number) => ParkedObservation): (visit: (reading: ParkedObservation) => void) => void {
  return visit => {
    for (const reading of [PARKED_SKIP_SPAWN, PARKED_RETRY_SPAWN]) {
      visit(reading);
      NOISE.forEach((noise, k) => {
        visit(plant(reading, noise, k));
      });
    }
  };
}

/** One ParkedPlan value's reading and verdict, as measured at this tree. */
interface PlanRow {
  readonly reading: ParkedObservation;
  readonly verdict: ParkedVerdict;
}

/** control/startup/route/barrier, the plan's id in PLAN-DOMAIN. */
function planId(plan: ParkedObservation["plan"]): string {
  return `${plan.control}/${plan.startup}/${plan.route}/${plan.barrier}`;
}

/** PLAN-DOMAIN's table: every ParkedPlan value in CONTROLS x STARTUPS x ROUTES x BARRIERS order, its whole reading as measured, then its verdict. */
const PLAN_ROWS: readonly PlanRow[] = [
  {
    reading: {
      plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: true, hostAbortsWhileParked: 1, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 0",
    },
    verdict: { kind: "observed-violation", breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "spawn", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: true, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "error", skipped: true, attempt: 1, reason: null }, runStatus: "completed", scriptValue: null,
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "spawn", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: undefined, hostAbortsWhileParked: 1, runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "spawn", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: true, hostAbortsWhileParked: 1, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "observed-violation", breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "resume", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: true, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "error", skipped: true, attempt: 1, reason: null }, runStatus: "completed", scriptValue: null,
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "resume", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 1, runAborted: true,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] },
  },
  {
    reading: {
      plan: { control: "skip", startup: "resume", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: true,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "spawn", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: true, hostAbortsWhileParked: 1, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }, { ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "observed-violation", breaches: ["original-started-after-retry"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "spawn", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: true, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }, { ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "spawn", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: undefined, hostAbortsWhileParked: 1, runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 0,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "spawn", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: true,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: true, hostAbortsWhileParked: 1, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 3,
      hostSettlements: [{ ok: true, skipped: false }, { ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" }, runStatus: "completed", scriptValue: "answer 2",
    },
    verdict: { kind: "observed-violation", breaches: ["original-started-after-retry"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "resume", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: true, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 1, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 1, extra: 0 }, sdkCallsRecorded: 3,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }, { ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 2, reason: "user-retry" }, runStatus: "completed", scriptValue: "answer 2",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "resume", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 1, runAborted: true,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 0, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: false, skipped: true, error: WORKFLOW_ABORTED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued"] },
  },
  {
    reading: {
      plan: { control: "retry", startup: "resume", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: true,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: false, skipped: true, error: CANCELLED }], finalRow: { state: "start", skipped: false, attempt: 1, reason: null }, runStatus: "killed", scriptValue: undefined,
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "spawn", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 0",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "spawn", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 0",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "spawn", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 0, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 0",
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "spawn", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 0, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 1,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 0",
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "resume", route: "per-agent", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "resume", route: "per-agent", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "invalid-experiment", reasons: ["control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "resume", route: "run-abort", barrier: "parked" },
      parkedAtControl: true, queriesBeforeControl: 1, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-issued", "control-not-routed-to-host"] },
  },
  {
    reading: {
      plan: { control: "none", startup: "resume", route: "run-abort", barrier: "absent" },
      parkedAtControl: false, queriesBeforeControl: 2, controlAccepted: undefined, hostAbortsWhileParked: 0, runAborted: false,
      authorizations: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkStarts: { setup: 1, original: 1, replacement: 0, extra: 0 }, sdkCallsRecorded: 2,
      hostSettlements: [{ ok: true, skipped: false }], finalRow: { state: "done", skipped: false, attempt: 1, reason: null }, runStatus: "completed", scriptValue: "answer 1",
    },
    verdict: { kind: "invalid-experiment", reasons: ["whole-run-abort", "control-not-parked", "dispatch-before-control", "control-not-issued", "control-not-routed-to-host"] },
  },
];

describe("the experiment's input lists and every ParkedPlan value (wb-9v02)", () => {
  it("GRID-AXES each of the 16 lists of the axis-list block by value (RUN_SIGNALS and PARKED_AT_CONTROL among them) and the 17 NOISE profiles by each one's position in every list it draws from, frozen; the four plan facet lists, ENTRY_STATES and RUN_STATUSES each equal the union their source file declares (read with the TypeScript parser); each NOISE field takes every value of its list", () => {
    expect({
      counts: COUNTS,
      controls: CONTROLS,
      startups: STARTUPS,
      routes: ROUTES,
      barriers: BARRIERS,
      setupAgents: SETUP_AGENTS,
      entryStates: ENTRY_STATES,
      finalRows: FINAL_ROWS.length,
      scriptValues: SCRIPT_VALUES.length,
      settlementLists: SETTLEMENT_LISTS.length,
      runStatuses: RUN_STATUSES,
      controlValues: CONTROL_VALUES,
      callLogOffsets: CALL_LOG_OFFSETS,
      runSignals: RUN_SIGNALS,
      parkedAtControl: PARKED_AT_CONTROL,
      noise: NOISE.length,
      listsCoverTheirUnions: LISTS_COVER_THEIR_UNIONS,
    }).toEqual({
      counts: [0, 1, 2, 3],
      controls: ["skip", "retry", "none"],
      startups: ["spawn", "resume"],
      routes: ["per-agent", "run-abort"],
      barriers: ["parked", "absent"],
      setupAgents: { spawn: 0, resume: 1 },
      entryStates: ["start", "progress", "done", "error"],
      finalRows: 17,
      scriptValues: 9,
      settlementLists: 6,
      runStatuses: ["completed", "failed", "killed"],
      controlValues: [true, false, undefined],
      callLogOffsets: [-1, 0, 1],
      runSignals: [false, true],
      parkedAtControl: [true, false],
      noise: 17,
      listsCoverTheirUnions: [true, true, true, true, true, true],
    });
    // The outside anchor: the unions as the helper, src/workflow/progress.ts and src/workflow/runtime.ts declare them.
    expect({
      controls: declaredUnion(HELPER, "ParkedControl"),
      startups: declaredUnion(HELPER, "ParkedStartup"),
      routes: declaredUnion(HELPER, "ParkedRoute"),
      barriers: declaredUnion(HELPER, "ParkedBarrier"),
      entryStates: declaredUnion("src/workflow/progress.ts", "WorkflowEntryState"),
      runStatuses: declaredUnion("src/workflow/runtime.ts", "WorkflowRunResult", "status"),
    }).toEqual({ controls: CONTROLS, startups: STARTUPS, routes: ROUTES, barriers: BARRIERS, entryStates: ENTRY_STATES, runStatuses: RUN_STATUSES });
    const distinct = (values: readonly unknown[]): number => new Set(values.map(value => JSON.stringify(value) ?? "undefined")).size;
    expect({
      finalRows: distinct(FINAL_ROWS),
      scriptValues: distinct(SCRIPT_VALUES),
      settlementLists: distinct(SETTLEMENT_LISTS),
      noiseFinalRows: distinct(NOISE.map(noise => noise.finalRow)),
      noiseScriptValues: distinct(NOISE.map(noise => noise.scriptValue)),
      noiseSettlementLists: distinct(NOISE.map(noise => noise.hostSettlements)),
      noiseRunStatuses: distinct(NOISE.map(noise => noise.runStatus)),
      noiseBarriers: distinct(NOISE.map(noise => noise.barrier)),
      noiseOriginalEntries: distinct(NOISE.map(noise => noise.entries.original)),
      noiseReplacementEntries: distinct(NOISE.map(noise => noise.entries.replacement)),
      noiseLaterEntries: distinct(NOISE.map(noise => noise.entries.extra)),
      noiseOneStartSplits: distinct(NOISE.map(noise => noise.oneStart)),
    }).toEqual({
      finalRows: 17,
      scriptValues: 9,
      settlementLists: 6,
      noiseFinalRows: 17,
      noiseScriptValues: 9,
      noiseSettlementLists: 6,
      noiseRunStatuses: 3,
      noiseBarriers: 2,
      noiseOriginalEntries: 4,
      noiseReplacementEntries: 4,
      noiseLaterEntries: 4,
      noiseOneStartSplits: 3,
    });
    // The chosen-sample lists, which no source file declares, frozen by value (undefined entries, key sets and the {}
    // and [] values each compared strictly).
    expect({ finalRows: FINAL_ROWS, scriptValues: SCRIPT_VALUES, settlementLists: SETTLEMENT_LISTS, oneStartSplits: ONE_START_SPLITS }).toStrictEqual({
      finalRows: [
        undefined,
        { state: "start", skipped: true, attempt: 1, reason: null },
        { state: "start", skipped: true, attempt: 2, reason: "user-retry" },
        { state: "start", skipped: false, attempt: 1, reason: null },
        { state: "start", skipped: false, attempt: 2, reason: "user-retry" },
        { state: "progress", skipped: true, attempt: 1, reason: null },
        { state: "progress", skipped: true, attempt: 2, reason: "user-retry" },
        { state: "progress", skipped: false, attempt: 1, reason: null },
        { state: "progress", skipped: false, attempt: 2, reason: "user-retry" },
        { state: "done", skipped: true, attempt: 1, reason: null },
        { state: "done", skipped: true, attempt: 2, reason: "user-retry" },
        { state: "done", skipped: false, attempt: 1, reason: null },
        { state: "done", skipped: false, attempt: 2, reason: "user-retry" },
        { state: "error", skipped: true, attempt: 1, reason: null },
        { state: "error", skipped: true, attempt: 2, reason: "user-retry" },
        { state: "error", skipped: false, attempt: 1, reason: null },
        { state: "error", skipped: false, attempt: 2, reason: "user-retry" },
      ],
      scriptValues: [null, undefined, false, 0, "", "answer 0", "null", {}, []],
      settlementLists: [
        [],
        [{ ok: false, skipped: true, error: "Claude SDK query was cancelled." }],
        [{ ok: false, skipped: true, error: "Workflow aborted." }],
        [{ ok: true, skipped: false }],
        [
          { ok: true, skipped: false },
          { ok: true, skipped: false },
        ],
        [
          { ok: false, skipped: true, error: "Claude SDK query was cancelled." },
          { ok: true, skipped: false },
        ],
      ],
      oneStartSplits: [
        { original: 1, replacement: 0, extra: 0 },
        { original: 0, replacement: 1, extra: 0 },
        { original: 0, replacement: 0, extra: 1 },
      ],
    });
    // NOISE frozen: each profile, by its position in each list it draws from (the same element, by identity), in the
    // order settlements, run status, barrier, final row, script value, original, replacement and later entries, one start.
    const NOISE_SOURCES: readonly (readonly unknown[])[] = [SETTLEMENT_LISTS, RUN_STATUSES, BARRIERS, FINAL_ROWS, SCRIPT_VALUES, COUNTS, COUNTS, COUNTS, ONE_START_SPLITS];
    const positions = NOISE.map(noise =>
      [noise.hostSettlements, noise.runStatus, noise.barrier, noise.finalRow, noise.scriptValue, noise.entries.original, noise.entries.replacement, noise.entries.extra, noise.oneStart].map(
        (value, field) => NOISE_SOURCES[field].indexOf(value),
      ),
    );
    expect(positions).toEqual([
      [0, 0, 0, 0, 0, 0, 1, 2, 0],
      [1, 1, 1, 1, 1, 1, 2, 3, 1],
      [2, 2, 0, 2, 2, 2, 3, 0, 2],
      [3, 0, 1, 3, 3, 3, 0, 1, 0],
      [4, 1, 0, 4, 4, 0, 1, 2, 1],
      [5, 2, 1, 5, 5, 1, 2, 3, 2],
      [0, 0, 0, 6, 6, 2, 3, 0, 0],
      [1, 1, 1, 7, 7, 3, 0, 1, 1],
      [2, 2, 0, 8, 8, 0, 1, 2, 2],
      [3, 0, 1, 9, 0, 1, 2, 3, 0],
      [4, 1, 0, 10, 1, 2, 3, 0, 1],
      [5, 2, 1, 11, 2, 3, 0, 1, 2],
      [0, 0, 0, 12, 3, 0, 1, 2, 0],
      [1, 1, 1, 13, 4, 1, 2, 3, 1],
      [2, 2, 0, 14, 5, 2, 3, 0, 2],
      [3, 0, 1, 15, 6, 3, 0, 1, 0],
      [4, 1, 0, 16, 7, 0, 1, 2, 1],
    ]);
    // Each NOISE field takes every value of its list: every position of each source list appears in that field's column.
    expect(NOISE_SOURCES.map((list, field) => list.every((_, position) => positions.some(row => row[field] === position)))).toEqual([true, true, true, true, true, true, true, true, true]);
  });

  it("GRID-PRODUCTS every reading each grid visits, read on its axes table (each value as its position in that axis's list, an object by identity; seamGrid's inline lists read against RUN_SIGNALS and PARKED_AT_CONTROL), is the next tuple of the product of those lists, outermost axis first, 1 + 17 times in a row and none past the last; on a planted walk of each whole table the same reader counts the walk's moved visits plus the one past its last tuple; it flags four planted grids", { timeout: GRID_TIMEOUT }, () => {
    expect({
      seam: productTally(seamGrid, SEAM_AXES),
      skipOracle: productTally(skipOracleGrid, SKIP_ORACLE_AXES),
      retryOracle: productTally(retryOracleGrid, RETRY_ORACLE_AXES),
    }).toEqual({
      seam: { visits: 110_592 * (1 + NOISE.length), offProduct: 0, first: [] },
      skipOracle: { visits: 19_584 * (1 + NOISE.length), offProduct: 0, first: [] },
      retryOracle: { visits: 8_192 * (1 + NOISE.length), offProduct: 0, first: [] },
    });
    // Liveness: the same reader, over four planted grids on seamGrid's first three axes, names each one's first visits off the product.
    expect({
      oneSignal: productTally(plantedOneSignalGrid, PLANTED_AXES),
      swapped: productTally(plantedSwappedGrid, PLANTED_AXES),
      bare: productTally(plantedBareGrid, PLANTED_AXES),
      twice: productTally(plantedTwiceGrid, PLANTED_AXES),
    }).toEqual({
      oneSignal: { visits: 144, offProduct: 72, first: ["visit 36: read 0/0/0, product 0/1/0", "visit 37: read 0/0/0, product 0/1/0", "visit 38: read 0/0/0, product 0/1/0"] },
      swapped: { visits: 144, offProduct: 72, first: ["visit 36: read 1/0/0, product 0/1/0", "visit 37: read 1/0/0, product 0/1/0", "visit 38: read 1/0/0, product 0/1/0"] },
      bare: { visits: 8, offProduct: 7, first: ["visit 1: read 0/0/1, product 0/0/0", "visit 2: read 0/1/0, product 0/0/0", "visit 3: read 0/1/1, product 0/0/0"] },
      twice: {
        visits: 288,
        offProduct: 144,
        first: ["visit 144: read 0/0/0, product past its last tuple", "visit 145: read 0/0/0, product past its last tuple", "visit 146: read 0/0/0, product past its last tuple"],
      },
    });
    // The reader on each whole table: a planted walk of the table's product moves 17 of each tuple's 18 visits off the product, and visits once past its last tuple.
    const walks = { seam: emptyInventory(), skipOracle: emptyInventory(), retryOracle: emptyInventory() };
    expect({
      seam: productTally(plantedWalk(SEAM_AXES, PARKED_SKIP_SPAWN, walks.seam), SEAM_AXES),
      skipOracle: productTally(plantedWalk(SKIP_ORACLE_AXES, SKIP_ORACLE, walks.skipOracle), SKIP_ORACLE_AXES),
      retryOracle: productTally(plantedWalk(RETRY_ORACLE_AXES, RETRY_ORACLE, walks.retryOracle), RETRY_ORACLE_AXES),
    }).toEqual({
      seam: {
        visits: 110_592 * (1 + NOISE.length) + 1,
        offProduct: 110_592 * NOISE.length + 1,
        first: [
          "visit 1: read 1/0/0/0/0/0/0/0/0/0/0, product 0/0/0/0/0/0/0/0/0/0/0",
          "visit 2: read 0/1/0/0/0/0/0/0/0/0/0, product 0/0/0/0/0/0/0/0/0/0/0",
          "visit 3: read 0/0/1/0/0/0/0/0/0/0/0, product 0/0/0/0/0/0/0/0/0/0/0",
        ],
      },
      skipOracle: {
        visits: 19_584 * (1 + NOISE.length) + 1,
        offProduct: 19_584 * NOISE.length + 1,
        first: ["visit 1: read 1/0/0/0/0/0, product 0/0/0/0/0/0", "visit 2: read 0/1/0/0/0/0, product 0/0/0/0/0/0", "visit 3: read 0/0/1/0/0/0, product 0/0/0/0/0/0"],
      },
      retryOracle: {
        visits: 8_192 * (1 + NOISE.length) + 1,
        offProduct: 8_192 * NOISE.length + 1,
        first: ["visit 1: read 1/0/0/0/0/0/0, product 0/0/0/0/0/0/0", "visit 2: read 0/1/0/0/0/0/0, product 0/0/0/0/0/0/0", "visit 3: read 0/0/1/0/0/0/0, product 0/0/0/0/0/0/0"],
      },
    });
    // The walks' inventories: the read-back counts one move per walk as reading otherwise than its record (the move the walk records at other positions than it planted); every change at every value of every axis was recorded alone and inside a set; every nonempty axis set was recorded; and an object's unlisted value was planted as its copy (the final rows and the two object script values). WALK-READBACK pins the read-back and the missing list on each whole table.
    expect({
      seam: walkReading(walks.seam, SEAM_AXES),
      skipOracle: walkReading(walks.skipOracle, SKIP_ORACLE_AXES),
      retryOracle: walkReading(walks.retryOracle, RETRY_ORACLE_AXES),
    }).toEqual({
      seam: { moves: 110_592 * NOISE.length, misread: 1, changes: 107, missing: [], setChanges: 107, setMissing: [], sets: 2047, copied: 0 },
      skipOracle: { moves: 19_584 * NOISE.length, misread: 1, changes: 422, missing: [], setChanges: 422, setMissing: [], sets: 63, copied: 18 },
      retryOracle: { moves: 8_192 * NOISE.length, misread: 1, changes: 100, missing: [], setChanges: 100, setMissing: [], sets: 127, copied: 0 },
    });
    // Liveness of that reading: an empty inventory, read on PLANTED_AXES, names every change of its three two-value axes as never made.
    const unmade = ["route 0->-1", "route 0->1", "route 1->-1", "route 1->0", "run signal 0->-1", "run signal 0->1", "run signal 1->-1", "run signal 1->0", "parkedAtControl 0->-1", "parkedAtControl 0->1", "parkedAtControl 1->-1", "parkedAtControl 1->0"];
    expect(walkReading(emptyInventory(), PLANTED_AXES)).toEqual({ moves: 0, misread: 0, changes: 0, missing: unmade, setChanges: 0, setMissing: unmade, sets: 0, copied: 0 });
  });

  it("WALK-READBACK on each whole axes table the read-back counts every move of a misplant run; its cell pass makes the moves cellMoves builds from the table's lists (each axis reading each position of its list and a value it does not hold, every other axis at position 0, each reading recorded at every other position): its readings in order, every move read otherwise, none under recordProbe and every one under offProbe; and walkReading names, as keyName decodes them from the change keys (held to NAMED_CHANGES's literals), every change an empty inventory lacks (107, 422 and 100) and the one change each planted inventory lacks, in both lists, the one-axis list only or the set list only", { timeout: GRID_TIMEOUT }, () => {
    // A misplant run of each whole table: one move at each cell of each axis (L x (L + 1) x L moves for an axis of L values: 476, 6264 and 492), then the walk, 17 moves per tuple, each recorded otherwise than it reads. The read-back counts every move.
    const runs = { seam: emptyInventory(), skipOracle: emptyInventory(), retryOracle: emptyInventory() };
    plantedWalk(SEAM_AXES, PARKED_SKIP_SPAWN, runs.seam, true)(() => undefined);
    plantedWalk(SKIP_ORACLE_AXES, SKIP_ORACLE, runs.skipOracle, true)(() => undefined);
    plantedWalk(RETRY_ORACLE_AXES, RETRY_ORACLE, runs.retryOracle, true)(() => undefined);
    expect({
      seam: [runs.seam.moves, runs.seam.misread],
      skipOracle: [runs.skipOracle.moves, runs.skipOracle.misread],
      retryOracle: [runs.retryOracle.moves, runs.retryOracle.misread],
    }).toEqual({
      seam: [476 + 110_592 * NOISE.length, 476 + 110_592 * NOISE.length],
      skipOracle: [6264 + 19_584 * NOISE.length, 6264 + 19_584 * NOISE.length],
      retryOracle: [492 + 8_192 * NOISE.length, 492 + 8_192 * NOISE.length],
    });
    // walkReading on each whole table: an empty inventory lacks every change, alone and in sets (107, 422 and 100), and each inventory holding every change of the run's walk but one lacks that one alone, alone and in sets.
    const empty = { seam: walkReading(emptyInventory(), SEAM_AXES), skipOracle: walkReading(emptyInventory(), SKIP_ORACLE_AXES), retryOracle: walkReading(emptyInventory(), RETRY_ORACLE_AXES) };
    expect({
      seam: [empty.seam.missing.length, empty.seam.setMissing.length],
      skipOracle: [empty.skipOracle.missing.length, empty.skipOracle.setMissing.length],
      retryOracle: [empty.retryOracle.missing.length, empty.retryOracle.setMissing.length],
    }).toEqual({ seam: [107, 107], skipOracle: [422, 422], retryOracle: [100, 100] });
    expect({
      seam: [...lackingOne(runs.seam, SEAM_AXES)].sort(),
      skipOracle: [...lackingOne(runs.skipOracle, SKIP_ORACLE_AXES)].sort(),
      retryOracle: [...lackingOne(runs.retryOracle, RETRY_ORACLE_AXES)].sort(),
    }).toEqual({
      seam: [...aloneEach(empty.seam.missing)].sort(),
      skipOracle: [...aloneEach(empty.skipOracle.missing)].sort(),
      retryOracle: [...aloneEach(empty.retryOracle.missing)].sort(),
    });
    // walkReading's names against keyName, which NAMED_CHANGES holds to literal keys and names: the empty inventory lacks, in both lists and in key order, the name of every change the run's walk made, and each planted inventory (lackingIn) lacks its one change's name alone, in each list it is left out of (321, 1266 and 300 planted inventories).
    const tables = [
      { id: "seam", axes: SEAM_AXES, base: PARKED_SKIP_SPAWN, run: runs.seam, lacking: empty.seam },
      { id: "skipOracle", axes: SKIP_ORACLE_AXES, base: SKIP_ORACLE, run: runs.skipOracle, lacking: empty.skipOracle },
      { id: "retryOracle", axes: RETRY_ORACLE_AXES, base: RETRY_ORACLE, run: runs.retryOracle, lacking: empty.retryOracle },
    ] as const;
    const each = <T>(read: (table: (typeof tables)[number]) => T): Record<string, T> => Object.fromEntries(tables.map(table => [table.id, read(table)]));
    const keyOrder = (run: WalkInventory): readonly number[] => [...run.changes].sort((left, right) => left - right);
    expect(each(({ id, axes }) => NAMED_CHANGES[id].map(([key]) => keyName(axes, key)))).toEqual(each(({ id }) => NAMED_CHANGES[id].map(([, name]) => name)));
    expect(each(({ lacking }) => [lacking.missing, lacking.setMissing])).toEqual(
      each(({ axes, run }) => {
        const names = keyOrder(run).map(key => keyName(axes, key));
        return [names, names];
      }),
    );
    const planted = each(({ axes, run }) =>
      keyOrder(run).flatMap(left =>
        (["both", "changes", "setChanges"] as const).map(lists => {
          const { missing, setMissing } = walkReading(lackingIn(run, left, lists), axes);
          return { left, lists, missing, setMissing };
        }),
      ),
    );
    expect(each(({ id }) => planted[id].length)).toEqual({ seam: 321, skipOracle: 1266, retryOracle: 300 });
    expect(planted).toEqual(
      each(({ axes, run }) =>
        keyOrder(run).flatMap(left => {
          const name = keyName(axes, left);
          return [
            { left, lists: "both", missing: [name], setMissing: [name] },
            { left, lists: "changes", missing: [name], setMissing: [] },
            { left, lists: "setChanges", missing: [], setMissing: [name] },
          ];
        }),
      ),
    );
    // The cell pass against cellMoves on each whole table: L x (L + 1) x L moves for an axis of L values (476, 6264 and 492); the read-back counts every cell move as reading otherwise on the table itself, none under recordProbe and every one under offProbe; read on the table's axes, each pass's readings are cellMoves's, in order.
    expect(each(({ axes }) => cellMoves(axes).length)).toEqual({ seam: 476, skipOracle: 6264, retryOracle: 492 });
    const passes = each(({ axes, base }) =>
      [undefined, recordProbe, offProbe].map(probe => {
        const inventory = emptyInventory();
        const readings = cellPass(axes, probe === undefined ? axes : probe(axes, inventory), base, inventory, cellMoves(axes).length);
        return { counts: [inventory.moves, inventory.misread], readings };
      }),
    );
    expect(each(({ id }) => passes[id].map(pass => pass.counts))).toEqual({
      seam: [[476, 476], [476, 0], [476, 476]],
      skipOracle: [[6264, 6264], [6264, 0], [6264, 6264]],
      retryOracle: [[492, 492], [492, 0], [492, 492]],
    });
    expect(each(({ id }) => passes[id].map(pass => pass.readings))).toEqual(
      each(({ axes }) => {
        const readings = cellMoves(axes).map(move => move.read.join("/"));
        return [readings, readings, readings];
      }),
    );
  });

  it("WALK-NAMES-SPELLED on each whole axes table every change spelled from the table alone (spelledChanges: each axis's own name, each tuple position of its list and each planted position other than it, -1 first; 107, 422 and 100 changes): keyName decodes each spelled key to its spelled name, and walkReading's two missing lists on an empty inventory are the spelled names, in the order spelled", () => {
    const tables = { seam: SEAM_AXES, skipOracle: SKIP_ORACLE_AXES, retryOracle: RETRY_ORACLE_AXES };
    const each = <T>(read: (axes: readonly GridAxis[]) => T): Record<string, T> => Object.fromEntries(Object.entries(tables).map(([id, axes]) => [id, read(axes)]));
    expect(each(axes => spelledChanges(axes).length)).toEqual({ seam: 107, skipOracle: 422, retryOracle: 100 });
    expect(each(axes => spelledChanges(axes).map(([key]) => keyName(axes, key)))).toEqual(each(axes => spelledChanges(axes).map(([, name]) => name)));
    expect(
      each(axes => {
        const { missing, setMissing } = walkReading(emptyInventory(), axes);
        return [missing, setMissing];
      }),
    ).toEqual(
      each(axes => {
        const names = spelledChanges(axes).map(([, name]) => name);
        return [names, names];
      }),
    );
  });

  it("WALK-CELLS-SPELLED on each whole axes table the moves a cell pass is due to make spelled from the table's list lengths alone (spelledCellMoves: each axis in table order, L times over, read at each position r, -1 first, and recorded at each other position, every other axis at 0; 476, 6264 and 492 moves): cellMoves builds them, reads and records, in order; the cell pass reads the spelled reads, in order; under spelledRecordProbe its read-back reads no move otherwise", () => {
    const tables = [
      { id: "seam", axes: SEAM_AXES, base: PARKED_SKIP_SPAWN },
      { id: "skipOracle", axes: SKIP_ORACLE_AXES, base: SKIP_ORACLE },
      { id: "retryOracle", axes: RETRY_ORACLE_AXES, base: RETRY_ORACLE },
    ] as const;
    const each = <T>(read: (table: (typeof tables)[number]) => T): Record<string, T> => Object.fromEntries(tables.map(table => [table.id, read(table)]));
    const spelled = each(({ axes }) => spelledCellMoves(axes));
    const shown = (move: CellMove): string => `read ${move.read.join("/")} recorded ${move.record.join("/")}`;
    expect(each(({ id }) => spelled[id].length)).toEqual({ seam: 476, skipOracle: 6264, retryOracle: 492 });
    expect(each(({ axes }) => cellMoves(axes).map(shown))).toEqual(each(({ id }) => spelled[id].map(shown)));
    const passes = each(({ id, axes, base }) => {
      const inventory = emptyInventory();
      const readings = cellPass(axes, spelledRecordProbe(axes, inventory), base, inventory, spelled[id].length);
      return { counts: [inventory.moves, inventory.misread], readings };
    });
    expect(each(({ id }) => passes[id].counts)).toEqual({ seam: [476, 0], skipOracle: [6264, 0], retryOracle: [492, 0] });
    expect(each(({ id }) => passes[id].readings)).toEqual(each(({ id }) => spelled[id].map(move => move.read.join("/"))));
  });

  it("NAMED-CHANGES-SHAPE NAMED_CHANGES holds 9, 6 and 5 rows, each one of its table's spelled changes (its key beside the same name); on each table, how many rows change its first axis, its last axis, an axis past the third, an axis of a list of more than two values, from a tuple position past 1 and to -1 (namedCoverage, read from the keys), frozen; and each of those counts is at least 1", () => {
    const tables = { seam: SEAM_AXES, skipOracle: SKIP_ORACLE_AXES, retryOracle: RETRY_ORACLE_AXES } as const;
    const ids = ["seam", "skipOracle", "retryOracle"] as const;
    const each = <T>(read: (id: (typeof ids)[number]) => T): Record<string, T> => Object.fromEntries(ids.map(id => [id, read(id)]));
    expect(each(id => NAMED_CHANGES[id].length)).toEqual({ seam: 9, skipOracle: 6, retryOracle: 5 });
    expect(
      each(id => {
        const spelled = new Map(spelledChanges(tables[id]));
        return NAMED_CHANGES[id].filter(([key, name]) => spelled.get(key) !== name);
      }),
    ).toEqual({ seam: [], skipOracle: [], retryOracle: [] });
    const coverage = each(id => namedCoverage(tables[id], NAMED_CHANGES[id]));
    expect(coverage).toEqual({ seam: [1, 2, 7, 7, 4, 3], skipOracle: [1, 1, 4, 5, 4, 2], retryOracle: [1, 1, 4, 4, 3, 1] });
    expect(each(id => coverage[id].every(count => count > 0))).toEqual({ seam: true, skipOracle: true, retryOracle: true });
  });

  it("PLAN-DOMAIN-SHAPE the plan table holds the 24 ParkedPlan values (the product of the four plan unions the helper declares, read with the TypeScript parser), each once, in that product's order", () => {
    const [controls, startups, routes, barriers] = ["ParkedControl", "ParkedStartup", "ParkedRoute", "ParkedBarrier"].map(name => declaredUnion(HELPER, name));
    const product = controls.flatMap(control => startups.flatMap(startup => routes.flatMap(route => barriers.map(barrier => `${control}/${startup}/${route}/${barrier}`))));
    expect(product).toHaveLength(24);
    expect(PLAN_ROWS.map(row => planId(row.reading.plan))).toEqual(product);
  });

  it("INSTRUMENT-NO-TIMER the helper's source, read with the TypeScript parser, holds no timer global's name as an identifier, no literal text (string, template or regular expression) containing one or the text timers, no import() call and no static import of a timers module, and neither it nor this suite holds vi's mock or doMock as an identifier or, beyond this suite's MOCK_NAMES, as an equal literal text; the same reads flag each of those forms in a planted text, and the helper read finds runWorkflow and the runtime module's specifier, so it is not empty", () => {
    const helper = identifiersOf(HELPER);
    const suite = identifiersOf(SUITE);
    expect({
      timers: TIMER_GLOBALS.filter(name => helper.has(name)),
      timerModules: importedModules(HELPER).filter(specifier => TIMER_MODULES.includes(specifier)),
      mocks: MOCK_NAMES.filter(name => helper.has(name) || suite.has(name)),
      readsRunWorkflow: helper.has("runWorkflow"),
    }).toEqual({ timers: [], timerModules: [], mocks: [], readsRunWorkflow: true });
    const helperSource = parse(HELPER);
    const helperTexts = literalTexts(helperSource);
    expect({
      timerTexts: helperTexts.filter(text => TIMER_WORDS.some(word => text.includes(word))),
      dynamicImports: dynamicImportCount(helperSource),
      mockTexts: helperTexts.filter(text => MOCK_NAMES.includes(text)),
      suiteMockTexts: literalTexts(parse(SUITE)).filter(text => MOCK_NAMES.includes(text)).length,
      readsRuntimeSpecifier: helperTexts.includes("../../src/workflow/runtime.js"),
    }).toEqual({ timerTexts: [], dynamicImports: 0, mockTexts: [], suiteMockTexts: 2, readsRuntimeSpecifier: true });
    // Liveness: the same reads, over the planted text, flag each form.
    const planted = ts.createSourceFile("planted-forms.ts", PLANTED_FORMS, ts.ScriptTarget.ES2022, true);
    const plantedNames = identifierNames(planted);
    const plantedTexts = literalTexts(planted);
    expect({
      timers: TIMER_GLOBALS.filter(name => plantedNames.has(name)),
      timerModules: importSpecifiers(planted).filter(specifier => TIMER_MODULES.includes(specifier)),
      timerTexts: plantedTexts.filter(text => TIMER_WORDS.some(word => text.includes(word))),
      dynamicImports: dynamicImportCount(planted),
      mocks: MOCK_NAMES.filter(name => plantedNames.has(name)).length,
      mockTexts: plantedTexts.filter(text => MOCK_NAMES.includes(text)).length,
    }).toEqual({
      timers: ["setInterval", "setImmediate"],
      timerModules: ["node:timers"],
      timerTexts: ["node:timers", "setTimeout", "setInterval", "setImmediate", "setTimeout", "timers/promises", "/setInterval/", "node:timers/promises"],
      dynamicImports: 1,
      mocks: 1,
      mockTexts: 1,
    });
  });

  it("PLAN-DOMAIN each of the 24 ParkedPlan values, run with every field given and again with its default fields omitted: its whole reading as measured at this tree, then its verdict; each run made again through the call-through recorder reads the same whole reading and makes the WorkflowControl calls and run-signal aborts its plan names; 42 runs of each kind", { timeout: GRID_TIMEOUT }, async () => {
    const runs = { plain: 0, recorded: 0 };
    for (const row of PLAN_ROWS) {
      const { control, startup, route, barrier } = row.reading.plan;
      const given: ParkedPlan = row.reading.plan;
      // The defaults are route "per-agent" and barrier "parked": 18 of the 24 plans hold at least one of them.
      const defaulted: ParkedPlan | undefined =
        route === "per-agent" || barrier === "parked" ? { control, startup, ...(route === "per-agent" ? {} : { route }), ...(barrier === "parked" ? {} : { barrier }) } : undefined;
      for (const [input, label] of [
        [given, planId(row.reading.plan)],
        [defaulted, `${planId(row.reading.plan)} (defaults omitted)`],
      ] as const) {
        if (input === undefined) continue;
        const observation = await runParkedDispatchExperiment(input);
        runs.plain += 1;
        expect.soft(observation, label).toEqual(row.reading);
        expect.soft(judgeParkedObservation(observation), label).toEqual(row.verdict);
        // The same run through the call-through recorder: the reading it gives, then what the recorder saw.
        const record: ControlRecord = { calls: [], aborts: 0 };
        const recorded = await runParkedDispatchExperiment(input, callThrough(record));
        runs.recorded += 1;
        expect.soft(recorded, `${label} (call-through)`).toEqual(row.reading);
        expect.soft({ calls: record.calls, aborts: record.aborts }, `${label} (call-through)`).toEqual(namedConduct(row.reading));
      }
    }
    // 24 plans with every field given and the 18 that hold a default again with it omitted, each run both ways.
    expect(runs).toEqual({ plain: 42, recorded: 42 });
  });

  it("CALL-THROUGH recordedSurface over a planted WorkflowControl records each call of each of its five methods, in call order and with the value the planted method returned, calls that method once and returns its value", () => {
    const planted: string[] = [];
    const surface: WorkflowControl = {
      pause: () => {
        planted.push("pause");
      },
      resume: () => {
        planted.push("resume");
      },
      isPaused: () => {
        planted.push("isPaused");
        return true;
      },
      skip: index => {
        planted.push(`skip ${index}`);
        return index === 7;
      },
      retry: index => {
        planted.push(`retry ${index}`);
        return index !== 8;
      },
    };
    const calls: string[] = [];
    const recorded = recordedSurface(surface, calls);
    const values = [recorded.pause(), recorded.resume(), recorded.isPaused(), recorded.skip(7), recorded.skip(-1), recorded.retry(8), recorded.retry(2)];
    expect({ values, calls, planted }).toEqual({
      values: [undefined, undefined, true, true, false, false, true],
      calls: ["pause()", "resume()", "isPaused() = true", "skip(7) = true", "skip(-1) = false", "retry(8) = false", "retry(2) = true"],
      planted: ["pause", "resume", "isPaused", "skip 7", "skip -1", "retry 8", "retry 2"],
    });
  });

  it("GRID-NOISE on each of the three grids every reading's 17 visits after its first are, in NOISE's order, that first visit under each profile: the places of the NOISE_FIELDS that grid lists hold the profile's values, every other place the first visit's (Object.is), with the same keys; READING_PLACES reads each place Object.keys finds; the same reader flags eight planted grids", { timeout: GRID_TIMEOUT }, () => {
    // The places the reader reads are the keys a reading holds (its own, and its plan's, authorizations' and sdkStarts'), each read where it is.
    expect(READING_PLACES.map(([place, read]) => [place, read(DISTINCT_READING)])).toEqual(placesByKeys(DISTINCT_READING));
    expect(new Set(placesByKeys(DISTINCT_READING).map(([, value]) => value)).size).toBe(READING_PLACES.length);
    expect([noiseTally(seamGrid, NOISE_FIELDS.seam), noiseTally(skipOracleGrid, NOISE_FIELDS.skipOracle), noiseTally(retryOracleGrid, NOISE_FIELDS.retryOracle)]).toEqual([
      { visits: 110_592 * (1 + NOISE.length), wrong: 0, first: [] },
      { visits: 19_584 * (1 + NOISE.length), wrong: 0, first: [] },
      { visits: 8_192 * (1 + NOISE.length), wrong: 0, first: [] },
    ]);
    // Liveness: the reader, over planted grids that apply the profiles otherwise, counts every visit they apply wrongly.
    const all = NOISE_FIELDS.seam;
    const read = (plant: (reading: ParkedObservation, noise: Noise, k: number) => ParkedObservation) => {
      const { visits, wrong } = noiseTally(plantedNoiseGrid(plant), all);
      return `${visits}:${wrong}`;
    };
    expect({
      applied: read((reading, noise) => seamNoise(reading, noise)),
      oneProfile: read(reading => seamNoise(reading, NOISE[0])),
      reversed: read((reading, _noise, k) => seamNoise(reading, NOISE[NOISE.length - 1 - k])),
      fieldKept: read((reading, noise) => ({ ...seamNoise(reading, noise), finalRow: reading.finalRow })),
      fieldMore: read((reading, noise) => ({ ...seamNoise(reading, noise), controlAccepted: !reading.controlAccepted })),
      keyMore: read((reading, noise) => strayKey(seamNoise(reading, noise), "reading")),
      planKeyMore: read((reading, noise) => strayKey(seamNoise(reading, noise), "plan")),
      authorizationsKeyMore: read((reading, noise) => strayKey(seamNoise(reading, noise), "authorizations")),
      sdkStartsKeyMore: read((reading, noise) => strayKey(seamNoise(reading, noise), "sdkStarts")),
    }).toEqual({
      applied: "36:0",
      oneProfile: "36:32",
      reversed: "36:32",
      fieldKept: "36:34",
      fieldMore: "36:34",
      keyMore: "36:34",
      planKeyMore: "36:34",
      authorizationsKeyMore: "36:34",
      sdkStartsKeyMore: "36:34",
    });
  });
});
