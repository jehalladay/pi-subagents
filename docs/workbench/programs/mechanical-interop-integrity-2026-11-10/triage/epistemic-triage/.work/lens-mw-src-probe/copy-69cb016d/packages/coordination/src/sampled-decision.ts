/**
 * Stochastic sampled decision record (GPC-EAT-R007, MechanicalWorkflows-j4fa). A seeded sampler draws one
 * choice from its PRE-SAMPLING legal support S with probabilities p_S. The resolver later admits a mask
 * A (a subset of S). The record keeps the two as distinct fields, and the behavior log probability is
 * the sampler's ORIGINAL log p_S(chosen) or the literal "unknown": a probability renormalized over A is
 * refused with SIDECAR_LOGPROB_NOT_ORIGINAL. A value nobody recorded is "unknown", never 0 or null.
 * The deterministic two-way Selector path records no probability and is untouched.
 */
import type { Maybe } from "./episode.js";
import type { CoordinationDecision, CoordinationDecisionPolicy } from "./coordination-decision.js";
import { validateCoordinationDecision } from "./coordination-decision.js";
import { gateDraws } from "./landing-queue.js";

/** The sampler's original distribution over its support: one non-negative probability per support id, summing to 1. */
export type SamplerProbabilities = Readonly<Record<string, number>>;

export interface SampledDecision {
  /** The sampler's pre-sampling legal support S (never the admitted mask). */
  readonly support: readonly string[];
  /** The resolver's admitted mask A, a subset of S, recorded beside the support. */
  readonly admitted: readonly string[];
  readonly chosen: string;
  /** The sampler's original p_S over the support, or "unknown" when the sampler reported none. */
  readonly probabilities: Maybe<SamplerProbabilities>;
  /** log p_S(chosen) as the sampler computed it, or "unknown". */
  readonly behaviorLogProb: Maybe<number>;
}

export interface SampleSupportedInput {
  readonly seed: number;
  readonly support: readonly string[];
  /** Resolver-admitted mask; must be a subset of support. */
  readonly admitted: readonly string[];
  /** Non-negative sampling weights per support id; absent means the sampler reports no probability ("unknown"). */
  readonly weights?: Readonly<Record<string, number>>;
}

export type SampledDecisionValidation =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "SIDECAR_SAMPLED_MALFORMED" | "SIDECAR_LOGPROB_NOT_ORIGINAL"; readonly detail: string };

const TOLERANCE = 1e-9;
const WARMUP_DRAWS = 16;
const nonblank = (value: string): boolean => typeof value === "string" && value.trim().length > 0;

function structuralDefect(record: SampledDecision): string | null {
  if (!Array.isArray(record.support) || record.support.length === 0) return "empty support";
  if (record.support.some(id => !nonblank(id))) return "blank support entry";
  if (new Set(record.support).size !== record.support.length) return "duplicate support entries";
  if (!Array.isArray(record.admitted)) return "admitted is not a list";
  if (new Set(record.admitted).size !== record.admitted.length) return "duplicate admitted entries";
  for (const id of record.admitted) if (!record.support.includes(id)) return `admitted entry ${id} is outside the support`;
  if (!record.support.includes(record.chosen)) return `chosen ${String(record.chosen)} is outside the support`;
  const p = record.probabilities;
  if (p !== "unknown") {
    if (p === null || typeof p !== "object") return "probabilities is neither a map nor the literal unknown";
    let total = 0;
    for (const id of record.support) {
      const value = p[id];
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return `probability for ${id} is not a finite non-negative number`;
      total += value;
    }
    const extra = Object.keys(p).filter(key => !record.support.includes(key)).sort();
    if (extra.length > 0) return `probabilities names keys outside the support: ${extra.join(", ")}`;
    if (Math.abs(total - 1) > 1e-6) return `probabilities sum to ${total}, not 1`;
  }
  return null;
}

/** Validates a sampled record: structure first, then that the logProb is the sampler's original log p_S(chosen) or "unknown". */
export function validateSampledDecision(record: SampledDecision): SampledDecisionValidation {
  const defect = structuralDefect(record);
  if (defect !== null) return { ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: defect };
  const logProb = record.behaviorLogProb;
  if (logProb === "unknown") return { ok: true };
  const p = record.probabilities;
  if (typeof logProb !== "number" || !Number.isFinite(logProb)) {
    return { ok: false, code: "SIDECAR_LOGPROB_NOT_ORIGINAL", detail: `behaviorLogProb ${String(logProb)} is neither a finite number nor the literal unknown` };
  }
  if (p === "unknown") {
    return { ok: false, code: "SIDECAR_LOGPROB_NOT_ORIGINAL", detail: `behaviorLogProb ${logProb} is recorded but the sampler reported no probabilities to verify it against` };
  }
  const original = Math.log(p[record.chosen]!);
  if (!(Math.abs(logProb - original) <= TOLERANCE)) {
    return { ok: false, code: "SIDECAR_LOGPROB_NOT_ORIGINAL", detail: `behaviorLogProb ${logProb} differs from the sampler's original log p_S(${record.chosen}) = ${original}` };
  }
  return { ok: true };
}

/**
 * Seeded stochastic selector over the legal support. Same seed, same choice. With weights the record carries
 * the original p_S and log p_S(chosen); without them the draw is uniform and both stay the literal "unknown".
 */
export function sampleSupportedDecision(input: SampleSupportedInput): SampledDecision {
  if (!Number.isInteger(input.seed) || input.seed < 0) throw new Error("SIDECAR_SAMPLED_MALFORMED: seed must be a non-negative integer");
  const { support } = input;
  const shell = { support, admitted: input.admitted, chosen: support[0] ?? "", probabilities: "unknown", behaviorLogProb: "unknown" } as SampledDecision;
  const defect = structuralDefect(shell);
  if (defect !== null) throw new Error(`SIDECAR_SAMPLED_MALFORMED: ${defect}`);
  let probabilities: Maybe<SamplerProbabilities> = "unknown";
  let masses: number[];
  if (input.weights === undefined) {
    masses = support.map(() => 1 / support.length);
  } else {
    const raw = support.map(id => input.weights![id]);
    if (raw.some(w => typeof w !== "number" || !Number.isFinite(w) || w < 0)) throw new Error("SIDECAR_SAMPLED_MALFORMED: every support id needs a finite non-negative weight");
    // Scale by the largest weight first: a plain sum of finite weights can overflow to Infinity.
    const peak = Math.max(...(raw as number[]));
    if (!(peak > 0)) throw new Error("SIDECAR_SAMPLED_MALFORMED: weights sum to zero");
    const scaled = (raw as number[]).map(w => w / peak);
    const total = scaled.reduce((acc, w) => acc + w, 0);
    masses = scaled.map(w => w / total);
    probabilities = Object.fromEntries(support.map((id, index) => [id, masses[index]!]));
  }
  const draw = gateDraws(input.seed);
  for (let warm = 0; warm < WARMUP_DRAWS; warm += 1) draw();
  const u = draw() / 4294967296;
  let index = 0;
  let cumulative = masses[0]!;
  while (u > cumulative && index < support.length - 1) { index += 1; cumulative += masses[index]!; }
  while (masses[index]! === 0 && index > 0) index -= 1;
  const chosen = support[index]!;
  return {
    support: [...support],
    admitted: [...input.admitted],
    chosen,
    probabilities,
    behaviorLogProb: probabilities === "unknown" ? "unknown" : Math.log(masses[index]!),
  };
}

export interface SampledSidecarBase {
  readonly decisionId: string;
  readonly intentId: string;
  readonly vocabulary: readonly string[];
  readonly observationDigest: string;
  readonly policy: CoordinationDecisionPolicy;
  readonly rngStreamId: string;
  readonly readSet?: readonly string[];
}

/** Builds the mw.coordination-decision.v1 sidecar from a validated sample: support is S (not A), sampled.logProb is the original value. */
export function sampledDecisionToSidecar(base: SampledSidecarBase, record: SampledDecision): CoordinationDecision {
  const verdict = validateSampledDecision(record);
  if (!verdict.ok) throw new Error(`${verdict.code}: ${verdict.detail}`);
  const sidecar: CoordinationDecision = {
    schema: "mw.coordination-decision.v1",
    version: 1,
    decisionId: base.decisionId,
    intentId: base.intentId,
    graphId: "unknown",
    actorId: "unknown",
    nodeId: "unknown",
    observationDigest: base.observationDigest,
    readSet: base.readSet ?? [],
    policy: base.policy,
    vocabulary: [...base.vocabulary],
    support: [...record.support],
    sampled: { id: record.chosen, logProb: record.behaviorLogProb },
    rng: { streamId: base.rngStreamId },
    prestate: { memoryRevision: "unknown" },
    nativeOutcomeRef: "unknown",
    mode: "fixture",
    feedback: { status: "unknown", reward: "unknown" },
  };
  const check = validateCoordinationDecision(sidecar);
  if (!check.ok) throw new Error(`${check.code}: ${check.detail}`);
  return sidecar;
}
