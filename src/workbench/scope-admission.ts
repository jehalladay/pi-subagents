/**
 * scope-admission.ts: the Pi-side HX scope admission guards of the hx-admit packet (wb-pxvv, MWI B-hx-admit, slice PI-5; MNI
 * packet P12), for requirements EAT-R058, EAT-R059 and EAT-R062 of mechanical-workflows-interop-2026-11-04
 * (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e), vendored with their SHA-256 in
 * test/fixtures/mwi-hx-admit-requirements-roster.json. test/workbench-hx-admit-census.test.ts names the case that pins each
 * form stated in this comment and in the doc comments below (the case ids in parentheses), and its header carries the NOT
 * CLAIMED sentences.
 *
 * - judgeScopeEvidence (EAT-R058, EAT-R059): an identity is stated when it is a string other than the empty string. A stated
 *   workspace, task digest, query digest or resolved revision that differs from the expectation's is refused with that
 *   mismatch (root, task, query or revision; the first in SCOPE_MISMATCHES order when several differ), whatever gaps the
 *   answer also has (R059-BEFORE-WRITER, R059-CHECK-ORDER). Without such a mismatch an answer is admitted only when answered
 *   is true, exitCode is 0, terminalReached is true, coverage is complete, absenceLicensed is true and its workspace, task
 *   digest, resolved revision and query digest are stated; otherwise it is needs_evidence with the gap of every condition it
 *   misses, in SCOPE_GAPS order (R058-EACH-CONDITION, R058-GAP-ORDER). An empty answer (knownEmpty true) adds
 *   known-empty-unlicensed unless its coverage is complete and its absence licensed (R058-FALSE-KNOWN-EMPTY,
 *   M-EMPTY-AS-COMPLETE, R058-POSITIVE-CONTROL).
 * - scopeBlockerOf (EAT-R062): a gate whose witness is supported has no blocker; an unsupported or missing witness is a
 *   blocker on HX-TASK-SCOPE-PROBE scoped to native-task-scope that names git-census as not blocked (R062-NATIVE-BLOCKED).
 * - dispatchAdmittedWriter (EAT-R062): its doc comment below states the order of its guards and what the writer receives.
 *
 * Display paths: none.
 */

/** The program's real-infra gate a scope gate witness is read for (R062-NATIVE-BLOCKED, R163-GATE-INDEPENDENT). */
export const SCOPE_PROBE_GATE = "HX-TASK-SCOPE-PROBE";
/** The mode a scope gate that is not supported blocks (R062-NATIVE-BLOCKED). */
export const NATIVE_SCOPE_MODE = "native-task-scope";
/** The independently authorized mode, the Git tracked-file census: a git-census request reads no scope gate (R062-GIT-CENSUS-PASSES, M-DISABLE-ALL). */
export const GIT_CENSUS_MODE = "git-census";

/** Every gap judgeScopeEvidence reports, in the order it reports them (R058-GAP-ORDER). */
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
/** The mismatches judgeScopeEvidence refuses with, in the order it checks them (R059-CHECK-ORDER). */
export const SCOPE_MISMATCHES = Object.freeze(["root", "task", "query", "revision"] as const);
export type ScopeMismatch = (typeof SCOPE_MISMATCHES)[number];

/** What the invocation's task asks: the workspace, the task and query digests and the base revision. */
export interface ScopeExpectation {
  readonly workspace: string;
  readonly taskDigest: string;
  readonly queryDigest: string;
  readonly baseRevision: string;
}
/** One terminal HX answer as the host reads it; an identity the producer did not state is null. */
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
/** The scope gate's reading: the witness the host holds for the HX-TASK-SCOPE-PROBE route. */
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
  /** The host's authority decision for this request: only true dispatches (R062-GIT-CENSUS-PASSES). */
  readonly authorized: boolean;
}
export type WriterRequest = NativeWriterRequest | GitCensusWriterRequest;
/** The frozen admission the writer receives, once per dispatch (R062-ONE-FROZEN-ADMISSION). */
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

/** Whether `evidence` is the HX scope answer `expected` asks for, and complete enough to dispatch a native writer on. */
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

/** The blocker a scope gate puts on the native profile, or null when its witness is supported. */
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
 * Calls `writer` exactly once, with one frozen admission { invocationId, label }, when every guard `request` asks for admits,
 * and returns { dispatched: true, admission, value } with that same admission and the writer's resolved value
 * (R062-ONE-FROZEN-ADMISSION, R058-POSITIVE-CONTROL, R062-GIT-CENSUS-PASSES). Otherwise it returns the first refusal without
 * calling the writer (R062-REFUSAL-ORDER): stage request (malformed-request) first, for an invocation id or, on a native
 * request, an expected identity that is the empty string; then, on a git-census request, stage authority unless authorized
 * is true; on a native request, stage gate when scopeBlockerOf reads a blocker, then stage scope with any verdict of
 * judgeScopeEvidence other than admitted. A writer's throw or rejection propagates unchanged: the call rejects with the
 * same value (R062-WRITER-ERROR-PROPAGATES).
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
