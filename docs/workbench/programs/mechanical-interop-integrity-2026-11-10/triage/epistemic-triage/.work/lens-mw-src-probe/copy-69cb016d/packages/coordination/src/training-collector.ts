import type { EpisodeMode, Maybe } from "./episode.js";
import type { TrainingExport, TrainingMask, TrainingStep } from "./training-export.js";

/**
 * Training-example collector (APO-EAT-R006). A pure function from `mw.training-export.v1` records plus the
 * per-decision sidecars that carry the recorded log probability and the sampler's pre-sampling legal support
 * to the examples a learner may read. A step becomes an example only when a sidecar names a finite
 * non-positive log probability and a non-empty support that contains every sampled intent. Anything else is
 * refused with a stable code and the reasons that apply; the collector never substitutes zero for a value
 * nobody recorded, so the current exports (which record neither) yield no gradient input. It collects and never
 * trains: no learner, no network, no file write.
 */

/** One recorded decision: the log probability the sampler reported and the legal support it drew from. */
export interface DecisionSidecar {
  readonly episodeId: string;
  readonly step: number;
  readonly preSamplingSupport: readonly string[];
  readonly logProb: number;
}

export interface TrainingExample {
  readonly episodeId: string;
  readonly mode: EpisodeMode;
  readonly step: number;
  readonly actorId: Maybe<string>;
  readonly sampled: readonly string[];
  readonly mask: TrainingMask;
  readonly support: TrainingStep["support"];
  readonly preSamplingSupport: readonly string[];
  readonly logProb: number;
  readonly checkpoint: TrainingStep["checkpoint"];
  readonly observationDigest: string;
  readonly provenance: TrainingStep["provenance"];
}

export type CollectorRefusalCode = "TRAINING_SUPPORT_UNKNOWN" | "TRAINING_SIDECAR_MISMATCH";
export type CollectorReason = "logprob-unknown" | "support-absent" | "logprob-differs" | "sampled-outside-support" | "duplicate-sidecar";

export interface CollectorRefusal {
  readonly episodeId: string;
  readonly step: number;
  readonly code: CollectorRefusalCode;
  readonly reasons: readonly CollectorReason[];
}

export interface TrainingCollection {
  readonly examples: readonly TrainingExample[];
  readonly refusals: readonly CollectorRefusal[];
}

const keyOf = (episodeId: string, step: number): string => JSON.stringify([episodeId, step]);

const validLogProb = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value <= 0;

const validSupport = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.length > 0 && value.every(entry => typeof entry === "string");

function indexSidecars(sidecars: readonly DecisionSidecar[]): { readonly byKey: Map<string, DecisionSidecar>; readonly duplicated: Set<string> } {
  const byKey = new Map<string, DecisionSidecar>();
  const duplicated = new Set<string>();
  for (const sidecar of sidecars) {
    const key = keyOf(sidecar.episodeId, sidecar.step);
    if (byKey.has(key)) duplicated.add(key);
    else byKey.set(key, sidecar);
  }
  return { byKey, duplicated };
}

function collectStep(exported: TrainingExport, step: TrainingStep, sidecar: DecisionSidecar | undefined, duplicated: boolean): TrainingExample | CollectorRefusal {
  const refuse = (code: CollectorRefusalCode, reasons: readonly CollectorReason[]): CollectorRefusal => ({ episodeId: exported.episodeId, step: step.step, code, reasons });
  if (duplicated) return refuse("TRAINING_SIDECAR_MISMATCH", ["duplicate-sidecar"]);
  const reasons: CollectorReason[] = [];
  if (sidecar === undefined || !validLogProb(sidecar.logProb)) reasons.push("logprob-unknown");
  if (sidecar === undefined || !validSupport(sidecar.preSamplingSupport)) reasons.push("support-absent");
  if (sidecar === undefined || reasons.length > 0) return refuse("TRAINING_SUPPORT_UNKNOWN", reasons);
  if (typeof step.logProb === "number" && !Object.is(step.logProb, sidecar.logProb)) return refuse("TRAINING_SIDECAR_MISMATCH", ["logprob-differs"]);
  if (!step.sampled.every(intentId => sidecar.preSamplingSupport.includes(intentId))) return refuse("TRAINING_SIDECAR_MISMATCH", ["sampled-outside-support"]);
  return {
    episodeId: exported.episodeId, mode: exported.mode, step: step.step, actorId: step.actorId,
    sampled: [...step.sampled], mask: step.mask, support: step.support, preSamplingSupport: [...sidecar.preSamplingSupport],
    logProb: sidecar.logProb, checkpoint: step.checkpoint, observationDigest: step.observationDigest, provenance: step.provenance,
  };
}

/** Collect the examples a learner may read, in input order, and the refusals for every step that cannot become one. */
export function collectTrainingExamples(exports: readonly TrainingExport[], sidecars: readonly DecisionSidecar[] = []): TrainingCollection {
  const { byKey, duplicated } = indexSidecars(sidecars);
  const examples: TrainingExample[] = [];
  const refusals: CollectorRefusal[] = [];
  for (const exported of exports) {
    for (const step of exported.steps) {
      const key = keyOf(exported.episodeId, step.step);
      const outcome = collectStep(exported, step, byKey.get(key), duplicated.has(key));
      if ("code" in outcome) refusals.push(outcome);
      else examples.push(outcome);
    }
  }
  return { examples, refusals };
}
