/**
 * mw.coordination-decision.v1 (APO 08 sidecar, MechanicalWorkflows-gc3g). A typed immutable
 * per-decision sidecar: pre-sampling action vocabulary and legal support, the sampled id with
 * its behavior log probability, the RNG stream id, the policy program/checkpoint digests, the
 * observation and read witness, prestate memory revision and the native outcome correlation.
 * It is a SEPARATE record: TraceEvent, mw.episode.v1 and mw.training-export.v1 are unchanged,
 * and this value is never serialized into TraceEvent.detail. A value nobody recorded is the
 * explicit literal "unknown", never omitted, defaulted or null.
 */
import type { EpisodeMode, Maybe } from "./episode.js";

export type CoordinationFeedbackStatus = "unknown" | "pending" | "final";

/**
 * Where the choice came from (APO-EAT-R010). "fallback" is the one deterministic fallback of
 * docs/programs/adaptive-policy-organizations-2026-10-18/04-hld-ownership.md L16: a pre-declared policy
 * id@revision (fallbackPolicy), used only when the numerical evaluator is unavailable. A basis or
 * checkpoint mismatch is a refusal, never a fallback and never a resample.
 */
export type CoordinationDecisionSource = "mp" | "fallback" | "unknown";

/** Feedback on one decision (GPC-EAT-R008): a closed status enum, and a reward that is numeric only once the status is final. */
export interface CoordinationFeedback {
  /** unknown: nothing recorded; pending: awaiting the verifier; final: the verifier has spoken. */
  readonly status: CoordinationFeedbackStatus;
  /** A finite number only when status is "final"; every other record carries the literal "unknown". */
  readonly reward: Maybe<number>;
}

export interface CoordinationDecisionPolicy {
  readonly programDigest: string;
  readonly checkpointDigest: string;
}

export interface CoordinationDecisionSample {
  readonly id: string;
  readonly logProb: Maybe<number>;
}

export interface CoordinationDecision {
  readonly schema: "mw.coordination-decision.v1";
  readonly version: 1;
  readonly decisionId: string;
  /** Correlates to the Intent this decision proposed. */
  readonly intentId: string;
  readonly graphId: Maybe<string>;
  readonly actorId: Maybe<string>;
  readonly nodeId: Maybe<string>;
  readonly observationDigest: string;
  readonly readSet: readonly string[];
  readonly policy: CoordinationDecisionPolicy;
  /** The full action vocabulary presented to the policy. */
  readonly vocabulary: readonly string[];
  /** The pre-sampling legal support: the subset of the vocabulary that was eligible. */
  readonly support: readonly string[];
  readonly sampled: CoordinationDecisionSample;
  readonly rng: { readonly streamId: string };
  readonly prestate: { readonly memoryRevision: Maybe<string> };
  readonly nativeOutcomeRef: Maybe<string>;
  /** The episode mode this decision was recorded under; a fixture record never upgrades (labelCoordinationDecision). */
  readonly mode: EpisodeMode;
  readonly feedback: CoordinationFeedback;
  /** Additive and optional (a record without it predates APO-EAT-R010 and keeps validating). */
  readonly decisionSource?: CoordinationDecisionSource;
  /** The pre-declared id@revision of the fallback policy; present exactly when decisionSource is "fallback". */
  readonly fallbackPolicy?: string;
}

export type CoordinationDecisionValidation =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "DECISION_CHOICE_NOT_IN_SUPPORT" | "DECISION_SIDECAR_MALFORMED" | "DECISION_FEEDBACK_REWARD_WITHOUT_FINAL"; readonly detail: string };

const DIGEST = /^sha256:[0-9a-f]{64}$/;
const MODE_RANK: Readonly<Record<EpisodeMode, number>> = { fixture: 0, replay: 1, live: 2 };
const DECISION_SOURCES: ReadonlySet<string> = new Set<CoordinationDecisionSource>(["mp", "fallback", "unknown"]);
const POLICY_REF = /^[^@\s]+@[^@\s]+$/;
const FEEDBACK_STATUSES: ReadonlySet<string> = new Set<CoordinationFeedbackStatus>(["unknown", "pending", "final"]);

function isMode(value: string): value is EpisodeMode {
  return Object.prototype.hasOwnProperty.call(MODE_RANK, value);
}
const nonblank = (value: string): boolean => value.trim().length > 0;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isNonblankString = (value: unknown): value is string => typeof value === "string" && nonblank(value);
const isMaybeNumber = (value: unknown): boolean => value === "unknown" || (typeof value === "number" && Number.isFinite(value));

/** Closed member sets: the validator accepts exactly the members the committed JSON Schema lists (additionalProperties false at every level). */
const REQUIRED_TOP_MEMBERS = ["schema", "version", "decisionId", "intentId", "graphId", "actorId", "nodeId", "observationDigest", "readSet", "policy", "vocabulary", "support", "sampled", "rng", "prestate", "nativeOutcomeRef", "mode", "feedback"] as const;
/** Additive and optional members (APO-EAT-R010): the exact-key guard must admit them, their value laws follow in malformed(). */
const OPTIONAL_TOP_MEMBERS = ["decisionSource", "fallbackPolicy"] as const;
const NESTED_MEMBERS: Readonly<Record<string, readonly string[]>> = {
  policy: ["programDigest", "checkpointDigest"],
  sampled: ["id", "logProb"],
  rng: ["streamId"],
  prestate: ["memoryRevision"],
  feedback: ["status", "reward"],
};

function memberDefect(label: string, value: unknown, required: readonly string[], optional: readonly string[] = []): string | null {
  if (!isRecord(value)) return `${label} is not an object`;
  for (const key of required) if (!Object.prototype.hasOwnProperty.call(value, key)) return `${label} lacks member ${key}`;
  for (const key of Object.keys(value)) if (!required.includes(key) && !optional.includes(key)) return `${label} carries an unexpected member ${key}`;
  return null;
}

/**
 * Runtime shape guard (SIDECAR-VALIDATOR-REFUSAL-1): a JSON sidecar can arrive with any member of any type, so every
 * member the semantic rules below read is checked first and a wrong shape refuses instead of throwing.
 */
function shapeDefect(input: unknown): string | null {
  const top = memberDefect("sidecar", input, REQUIRED_TOP_MEMBERS, OPTIONAL_TOP_MEMBERS);
  if (top !== null || !isRecord(input)) return top ?? "sidecar is not an object";
  for (const [label, members] of Object.entries(NESTED_MEMBERS)) {
    const nested = memberDefect(label, input[label], members);
    if (nested !== null) return nested;
  }
  for (const key of ["schema", "decisionId", "intentId", "graphId", "actorId", "nodeId", "nativeOutcomeRef", "observationDigest", "mode"]) {
    if (typeof input[key] !== "string") return `${key} is not a string`;
  }
  for (const key of ["graphId", "actorId", "nodeId", "nativeOutcomeRef"]) if (!isNonblankString(input[key])) return `blank ${key}`;
  for (const key of ["readSet", "vocabulary", "support"]) {
    const list = input[key];
    if (!Array.isArray(list)) return `${key} is not an array`;
    if (list.some(entry => typeof entry !== "string")) return `${key} carries a non-string entry`;
  }
  const policy = input["policy"] as Record<string, unknown>;
  if (typeof policy["programDigest"] !== "string" || typeof policy["checkpointDigest"] !== "string") return "policy program/checkpoint digest is not a string";
  const sampled = input["sampled"] as Record<string, unknown>;
  if (typeof sampled["id"] !== "string") return "sampled id is not a string";
  if (!isMaybeNumber(sampled["logProb"])) return "sampled logProb is neither a finite number nor the literal unknown";
  if (typeof sampled["logProb"] === "number" && sampled["logProb"] > 0) return "sampled logProb is above 0";
  if (typeof (input["rng"] as Record<string, unknown>)["streamId"] !== "string") return "rng stream id is not a string";
  if (!isNonblankString((input["prestate"] as Record<string, unknown>)["memoryRevision"])) return "blank or non-string prestate memoryRevision";
  const feedback = input["feedback"] as Record<string, unknown>;
  if (typeof feedback["status"] !== "string") return "feedback status is not a string";
  if (!isMaybeNumber(feedback["reward"])) return "feedback reward is neither a finite number nor the literal unknown";
  return null;
}

function malformed(input: unknown): string | null {
  const shape = shapeDefect(input);
  if (shape !== null) return shape;
  const decision = input as CoordinationDecision;
  if (decision.schema !== "mw.coordination-decision.v1" || decision.version !== 1) return `unsupported schema/version ${String(decision.schema)}/${String(decision.version)}`;
  if (!nonblank(decision.decisionId) || !nonblank(decision.intentId)) return "blank decision or intent id";
  if (!DIGEST.test(decision.observationDigest)) return "observation digest is not a sha256 digest";
  if (!DIGEST.test(decision.policy.programDigest) || !DIGEST.test(decision.policy.checkpointDigest)) return "policy program/checkpoint digest is not a sha256 digest";
  if (decision.vocabulary.length === 0 || decision.vocabulary.some(action => !nonblank(action))) return "empty or blank-entry vocabulary";
  if (new Set(decision.vocabulary).size !== decision.vocabulary.length) return "duplicate vocabulary entries";
  if (decision.support.length === 0) return "empty support";
  if (new Set(decision.support).size !== decision.support.length) return "duplicate support entries";
  const vocabulary = new Set(decision.vocabulary);
  for (const action of decision.support) if (!vocabulary.has(action)) return `support entry ${action} is outside the vocabulary`;
  if (!nonblank(decision.sampled.id)) return "blank sampled id";
  if (!nonblank(decision.rng.streamId)) return "blank rng stream id";
  if (decision.readSet.some(scope => !nonblank(scope))) return "blank readSet entry";
  if (!isMode(decision.mode)) return `mode ${String(decision.mode)} is outside {fixture, replay, live}`;
  if (!FEEDBACK_STATUSES.has(decision.feedback.status)) return `feedback status ${String(decision.feedback.status)} is outside {unknown, pending, final}`;
  const reward = decision.feedback.reward;
  if (reward !== "unknown" && !(typeof reward === "number" && Number.isFinite(reward))) return "feedback reward is neither a finite number nor the literal unknown";
  if (decision.decisionSource !== undefined && !DECISION_SOURCES.has(decision.decisionSource)) return `decisionSource ${String(decision.decisionSource)} is outside {mp, fallback, unknown}`;
  if (decision.decisionSource === "fallback" && !(typeof decision.fallbackPolicy === "string" && POLICY_REF.test(decision.fallbackPolicy))) return "decisionSource fallback requires a fallbackPolicy of the form id@revision";
  if (decision.decisionSource !== "fallback" && decision.fallbackPolicy !== undefined) return "fallbackPolicy is present but decisionSource is not fallback";
  return null;
}

/**
 * Validates one sidecar (a parsed JSON value of any shape: a wrong shape refuses with DECISION_SIDECAR_MALFORMED and never throws).
 * The impossible-mask replay (APO-006): a sampled id outside the recorded support is its own refusal.
 */
export function validateCoordinationDecision(input: unknown): CoordinationDecisionValidation {
  const defect = malformed(input);
  if (defect !== null) return { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: defect };
  const decision = input as CoordinationDecision;
  if (decision.feedback.status !== "final" && decision.feedback.reward !== "unknown") {
    return { ok: false, code: "DECISION_FEEDBACK_REWARD_WITHOUT_FINAL", detail: `a numeric reward ${decision.feedback.reward} is recorded while feedback status is ${decision.feedback.status}` };
  }
  if (!decision.support.includes(decision.sampled.id)) {
    return { ok: false, code: "DECISION_CHOICE_NOT_IN_SUPPORT", detail: `sampled ${decision.sampled.id} is outside the recorded support {${[...decision.support].sort().join(", ")}}` };
  }
  return { ok: true };
}

/**
 * Relabel a sidecar. Keeping or lowering the mode is allowed; any upgrade (a fixture record labelled
 * replay or live), and any label outside the closed enum, is refused with EPISODE_MODE_UPGRADE_FORBIDDEN
 * and the input is left untouched, so its digest is unchanged. Mirrors labelEpisodeMode.
 */
export function labelCoordinationDecision(decision: CoordinationDecision, mode: string): CoordinationDecision {
  if (!isMode(decision.mode) || !isMode(mode) || MODE_RANK[mode] > MODE_RANK[decision.mode]) {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a decision labelled ${String(decision.mode)} cannot be labelled ${mode}`);
  }
  return { ...decision, mode };
}
