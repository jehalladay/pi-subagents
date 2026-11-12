/**
 * scope-admission.ts: the Pi-side HX scope admission guards of the hx-admit packet (wb-pxvv, MWI B-hx-admit, slice PI-5; MNI
 * packet P12), for requirements EAT-R058, EAT-R059 and EAT-R062 of mechanical-workflows-interop-2026-11-04
 * (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e), vendored with their SHA-256 in
 * test/fixtures/mwi-hx-admit-requirements-roster.json.
 *
 * What these guards are held to return is the PINNED READER SET of test/workbench-hx-admit-census.test.ts: one line per
 * claim, each over the inputs its cases build. The comments of this module name the census lines that hold each export and
 * restate no reading of their own.
 *
 * - judgeScopeEvidence (EAT-R058, EAT-R059): R058-MEASURED-PARTIAL, R058-MEASURED-UNKNOWN, R058-FALSE-KNOWN-EMPTY,
 *   R058-POSITIVE-CONTROL, M-EMPTY-AS-COMPLETE, R058-EACH-CONDITION, R058-GAP-ORDER, R059-TASK-MISMATCH,
 *   R059-QUERY-MISMATCH, R059-REVISION-MISMATCH, R059-IDENTITY-VARIANTS, R059-BEFORE-WRITER, M-WORKSPACE-NAME-ONLY and
 *   R059-CHECK-ORDER.
 * - scopeBlockerOf (EAT-R062): R062-NATIVE-BLOCKED.
 * - dispatchAdmittedWriter (EAT-R058, EAT-R059, EAT-R062): the R058 and R059 lines on stage scope, and R062-NATIVE-BLOCKED,
 *   R062-GIT-CENSUS-PASSES, M-DISABLE-ALL, R062-ONE-FROZEN-ADMISSION, R062-WRITER-ERROR-PROPAGATES and R062-REFUSAL-ORDER.
 *
 * Display paths: none.
 */

/** The gate name a scope blocker carries (R062-NATIVE-BLOCKED). */
export const SCOPE_PROBE_GATE = "HX-TASK-SCOPE-PROBE";
/** The native mode: a blocker's scope and a native admission's label (R062-NATIVE-BLOCKED, R062-ONE-FROZEN-ADMISSION). */
export const NATIVE_SCOPE_MODE = "native-task-scope";
/** The Git tracked-file census mode: a blocker's notBlocked member and a git-census admission's label (R062-GIT-CENSUS-PASSES, M-DISABLE-ALL). */
export const GIT_CENSUS_MODE = "git-census";

/** The gap names, as the literal R058-GAP-ORDER holds. */
export const SCOPE_GAPS = Object.freeze([
  "answer-missing",
  "exit-nonzero",
  "terminal-unreached",
  "coverage-not-complete",
  "absence-unlicensed",
  "known-empty-unlicensed",
  "root-unbound",
  "task-scope-absent",
  "revision-unbound",
  "query-digest-absent",
] as const);
export type ScopeGap = (typeof SCOPE_GAPS)[number];
/** The mismatch names, as the literal R059-CHECK-ORDER holds. */
export const SCOPE_MISMATCHES = Object.freeze(["root", "task", "query", "revision"] as const);
export type ScopeMismatch = (typeof SCOPE_MISMATCHES)[number];

/** The workspace, task digest, query digest and base revision an answer is judged against. */
export interface ScopeExpectation {
  readonly workspace: string;
  readonly taskDigest: string;
  readonly queryDigest: string;
  readonly baseRevision: string;
}
/** One HX answer as scope evidence; null marks an identity the answer does not state. */
export interface ScopeEvidence {
  readonly answered: boolean;
  readonly exitCode: number | null;
  readonly terminalReached: boolean;
  readonly coverage: "complete" | "incomplete" | "unknown" | null;
  readonly absenceLicensed: boolean;
  readonly knownEmpty: boolean;
  readonly workspace: string | null;
  readonly taskDigest: string | null;
  readonly queryDigest: string | null;
  readonly resolvedRevision: string | null;
}
export type ScopeVerdict =
  | { readonly outcome: "admitted" }
  | { readonly outcome: "needs_evidence"; readonly gaps: readonly ScopeGap[] }
  | { readonly outcome: "refused"; readonly mismatch: ScopeMismatch };

export type ScopeGateWitness = "supported" | "unsupported" | "missing";
/** A scope gate reading: its witness (R062-NATIVE-BLOCKED). */
export interface ScopeGate {
  readonly witness: ScopeGateWitness;
}
export interface ScopeBlocker {
  readonly gate: typeof SCOPE_PROBE_GATE;
  readonly scope: typeof NATIVE_SCOPE_MODE;
  readonly witness: "unsupported" | "missing";
  readonly notBlocked: readonly (typeof GIT_CENSUS_MODE)[];
}
export interface NativeWriterRequest {
  readonly mode: typeof NATIVE_SCOPE_MODE;
  readonly invocationId: string;
  readonly gate: ScopeGate;
  readonly scope: { readonly expected: ScopeExpectation; readonly evidence: ScopeEvidence };
}
export interface GitCensusWriterRequest {
  readonly mode: typeof GIT_CENSUS_MODE;
  readonly invocationId: string;
  /** The host's authority decision for this request (R062-GIT-CENSUS-PASSES, R062-REFUSAL-ORDER). */
  readonly authorized: boolean;
}
export type WriterRequest = NativeWriterRequest | GitCensusWriterRequest;
/** The admission a writer receives (R062-ONE-FROZEN-ADMISSION). */
export interface WriterAdmission {
  readonly invocationId: string;
  readonly label: typeof NATIVE_SCOPE_MODE | typeof GIT_CENSUS_MODE;
}
export type WriterRefusal =
  | { readonly stage: "request"; readonly reason: "malformed-request" }
  | { readonly stage: "gate"; readonly blocker: ScopeBlocker }
  | { readonly stage: "scope"; readonly verdict: Exclude<ScopeVerdict, { readonly outcome: "admitted" }> }
  | { readonly stage: "authority"; readonly reason: "git-census-unauthorized" };
export type WriterOutcome<T> =
  | { readonly dispatched: true; readonly admission: WriterAdmission; readonly value: T }
  | { readonly dispatched: false; readonly refusal: WriterRefusal };

type Facts = Readonly<Record<string, unknown>>;

function facts(value: unknown): Facts | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Facts) : undefined;
}
function stated(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

/** Judges `evidence` against `expected`: the R058 and R059 lines of the census. */
export function judgeScopeEvidence(expected: ScopeExpectation, evidence: ScopeEvidence): ScopeVerdict {
  const answer = facts(evidence) ?? {};
  const identities: readonly (readonly [ScopeMismatch, string | null, string])[] = [
    ["root", stated(answer.workspace), expected.workspace],
    ["task", stated(answer.taskDigest), expected.taskDigest],
    ["query", stated(answer.queryDigest), expected.queryDigest],
    ["revision", stated(answer.resolvedRevision), expected.baseRevision],
  ];
  for (const [mismatch, value, wanted] of identities) {
    if (value !== null && value !== wanted) return Object.freeze({ outcome: "refused", mismatch });
  }
  const gaps: ScopeGap[] = [];
  const complete = answer.coverage === "complete";
  const licensed = answer.absenceLicensed === true;
  if (answer.answered !== true) gaps.push("answer-missing");
  if (answer.exitCode !== 0) gaps.push("exit-nonzero");
  if (answer.terminalReached !== true) gaps.push("terminal-unreached");
  if (!complete) gaps.push("coverage-not-complete");
  if (!licensed) gaps.push("absence-unlicensed");
  if (answer.knownEmpty !== false && !(complete && licensed)) gaps.push("known-empty-unlicensed");
  for (const [gap, value] of [
    ["root-unbound", answer.workspace],
    ["task-scope-absent", answer.taskDigest],
    ["revision-unbound", answer.resolvedRevision],
    ["query-digest-absent", answer.queryDigest],
  ] as const) {
    if (stated(value) === null) gaps.push(gap);
  }
  return gaps.length === 0 ? Object.freeze({ outcome: "admitted" }) : Object.freeze({ outcome: "needs_evidence", gaps: Object.freeze(gaps) });
}

/** The blocker of `gate`, or null: R062-NATIVE-BLOCKED. */
export function scopeBlockerOf(gate: ScopeGate): ScopeBlocker | null {
  const witness = facts(gate)?.witness;
  if (witness === "supported") return null;
  return Object.freeze({
    gate: SCOPE_PROBE_GATE,
    scope: NATIVE_SCOPE_MODE,
    witness: witness === "unsupported" ? "unsupported" : "missing",
    notBlocked: Object.freeze([GIT_CENSUS_MODE] as const),
  });
}

function wellFormed(request: unknown): request is WriterRequest {
  const shape = facts(request);
  if (shape === undefined || stated(shape.invocationId) === null) return false;
  if (shape.mode === GIT_CENSUS_MODE) return true;
  if (shape.mode !== NATIVE_SCOPE_MODE) return false;
  const scope = facts(shape.scope);
  const expected = facts(scope?.expected);
  if (facts(shape.gate) === undefined || scope === undefined || facts(scope.evidence) === undefined || expected === undefined) return false;
  return stated(expected.workspace) !== null && stated(expected.taskDigest) !== null && stated(expected.queryDigest) !== null && stated(expected.baseRevision) !== null;
}
function refusedWith<T>(refusal: WriterRefusal): WriterOutcome<T> {
  return Object.freeze({ dispatched: false, refusal: Object.freeze(refusal) });
}

/**
 * The writer gate: the R062 lines of the census, R058-POSITIVE-CONTROL and the R058 and R059 lines on stage scope state what
 * it returns, and whether it calls `writer`, for the requests they build.
 */
export async function dispatchAdmittedWriter<T>(request: WriterRequest, writer: (admission: WriterAdmission) => T | Promise<T>): Promise<WriterOutcome<T>> {
  if (!wellFormed(request) || typeof writer !== "function") return refusedWith({ stage: "request", reason: "malformed-request" });
  let admission: WriterAdmission;
  if (request.mode === GIT_CENSUS_MODE) {
    if (request.authorized !== true) return refusedWith({ stage: "authority", reason: "git-census-unauthorized" });
    admission = Object.freeze({ invocationId: request.invocationId, label: GIT_CENSUS_MODE });
  } else {
    const blocker = scopeBlockerOf(request.gate);
    if (blocker !== null) return refusedWith({ stage: "gate", blocker });
    const scope = judgeScopeEvidence(request.scope.expected, request.scope.evidence);
    if (scope.outcome !== "admitted") return refusedWith({ stage: "scope", verdict: scope });
    admission = Object.freeze({ invocationId: request.invocationId, label: NATIVE_SCOPE_MODE });
  }
  const value = await writer(admission);
  return Object.freeze({ dispatched: true, admission, value });
}
