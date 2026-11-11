/**
 * scope-admission.ts: the Pi-side HX scope admission guards of the hx-admit packet (wb-pxvv, MWI B-hx-admit, slice PI-5; MNI
 * packet P12). Requirements EAT-R058, EAT-R059 and EAT-R062 of mechanical-workflows-interop-2026-11-04 (triage/requirements/
 * ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e), vendored with their SHA-256 in
 * test/fixtures/mwi-hx-admit-requirements-roster.json; test/workbench-hx-admit-census.test.ts names the case that pins each
 * form stated here, and its header carries the NOT CLAIMED sentences.
 *
 * Pure and synchronous except dispatchAdmittedWriter, which awaits its writer once: no clock, randomness, environment, file,
 * process or SDK access. The module decides; it loads nothing and wires nothing. No registered tool composes it yet:
 * workflow_execute still refuses a function definition (execute-tool.ts, unsupported-definition-kind), so composing these
 * guards into a registered launch, and the host reader that turns a live HX answer into ScopeEvidence, belong to the dispatch
 * packet (P04), and the installed-host witness (EAT-R063, gate PI-HX-RF-LIVE) stays owed there.
 *
 * - judgeScopeEvidence (EAT-R058, EAT-R059): an HX scope answer is the invocation's only when every identity it states - the
 *   workspace root (mismatch root), the task digest, the query digest and the resolved revision - equals the expectation's; a stated identity that
 *   differs refuses with that mismatch, checked before any gap, so evidence from another task, query or revision never reads
 *   as merely incomplete. An answer of this invocation is admitted only when it was answered natively, exited 0, reached its
 *   terminal, carries coverage the runtime certified complete and licensed absence, and states its workspace, task scope,
 *   resolved revision and query digest; otherwise it is needs_evidence with every gap in SCOPE_GAPS order. An empty answer is
 *   never complete coverage: a stated empty result (or one that does not say it is not empty) without licensed complete
 *   coverage adds known-empty-unlicensed.
 * - scopeBlockerOf and dispatchAdmittedWriter (EAT-R062): only a scope gate whose witness is supported opens the native
 *   task-scope profile; any other witness is a blocker on HX-TASK-SCOPE-PROBE scoped to native-task-scope that names
 *   git-census as not blocked, and an independently authorized git-census request dispatches under its own limited label
 *   whatever the scope gate reads. dispatchAdmittedWriter calls its writer at most once, only after every guard the request
 *   asks for admits, with one frozen admission; every refusal returns before the writer and carries a closed-vocabulary code.
 *
 * Display paths: none. Refusals are closed-vocabulary codes and carry no producer text; nothing here is a label, title or reply.
 */

/** The program's real-infra gate whose witness opens the certified native task-scope profile. */
export const SCOPE_PROBE_GATE = "HX-TASK-SCOPE-PROBE";
/** The only mode a scope gate that is not supported blocks. */
export const NATIVE_SCOPE_MODE = "native-task-scope";
/** The independently authorized mode a closed scope gate never blocks: the Git tracked-file census. */
export const GIT_CENSUS_MODE = "git-census";

/** Every condition a scope answer can miss, in the order judgeScopeEvidence reports them. */
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
/** The identities a scope answer can belong to another invocation by, in check order. */
export const SCOPE_MISMATCHES = Object.freeze(["root", "task", "query", "revision"] as const);
export type ScopeMismatch = (typeof SCOPE_MISMATCHES)[number];

/** What the invocation's task asks: the workspace, the task and query digests and the base revision it is pinned to. */
export interface ScopeExpectation {
  readonly workspace: string;
  readonly taskDigest: string;
  readonly queryDigest: string;
  readonly baseRevision: string;
}
/** The host's reading of one terminal HX answer: only what the producer stated, a null where it stated nothing. */
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
/** The scope gate's reading: the witness of the HX-TASK-SCOPE-PROBE route the host holds. */
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
  /** The host's own authority decision for this request (never the model's): only true dispatches. */
  readonly authorized: boolean;
}
export type WriterRequest = NativeWriterRequest | GitCensusWriterRequest;
/** The one frozen admission the writer receives. */
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
 * Calls `writer` at most once, with one frozen admission, and only after every guard `request` asks for admits; otherwise
 * returns the first refusal (request shape, then the git-census authority, or the native scope gate and the scope evidence)
 * without calling it. A writer's rejection or throw propagates unchanged.
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
