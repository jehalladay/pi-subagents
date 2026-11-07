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
 *   those fields omitted; PLAN-DOMAIN-SHAPE pins that its table holds exactly those 24 plans, each once, in the order
 *   of the product of the four plan unions as the helper declares them (read with the TypeScript parser).
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
 *   applied to every reading of that product (a profile replaces, together, the fields that builder names as its
 *   noise). Every reading built either way must get the verdict ruledVerdict gives, and the number of readings is
 *   pinned. ruledVerdict restates the rules of the helper's header, one rule per line, in the order the verdict lists
 *   them. GRID-AXES pins each axis list by value (COUNTS, CONTROLS, STARTUPS, ROUTES, BARRIERS, SETUP_AGENTS,
 *   ENTRY_STATES, FINAL_ROWS, SCRIPT_VALUES, SETTLEMENT_LISTS, RUN_STATUSES, CONTROL_VALUES, CALL_LOG_OFFSETS and
 *   ONE_START_SPLITS), NOISE by each profile's position in every list it draws from, that each NOISE field takes every
 *   value of its list, and that the four plan facet lists, ENTRY_STATES and RUN_STATUSES equal the unions their source
 *   files declare.
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

// The axis lists of the grids and of PLAN-DOMAIN. GRID-AXES pins each one; a value that no list holds is NOT CLAIMED.
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
  it("GRID-AXES each axis list by value and the 17 NOISE profiles by each one's position in every list it draws from, frozen; the four plan facet lists, ENTRY_STATES and RUN_STATUSES each equal the union their source file declares (read with the TypeScript parser); each NOISE field takes every value of its list", () => {
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

  it("PLAN-DOMAIN each of the 24 ParkedPlan values, run with every field given and again with its default fields omitted: its whole reading as measured at this tree, then its verdict", { timeout: GRID_TIMEOUT }, async () => {
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
        expect.soft(observation, label).toEqual(row.reading);
        expect.soft(judgeParkedObservation(observation), label).toEqual(row.verdict);
      }
    }
  });
});
