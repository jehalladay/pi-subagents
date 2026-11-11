/**
 * Family-level hold-out for the evaluation harness (TW-EAT-R007, MechanicalWorkflows-5ci8).
 * A declared hold-out names fixture families whose episodes are reserved for evaluation:
 * training/selection input never draws from them (an explicit draw is refused by name), and
 * the held-out evaluation runs the existing evaluateEpisodes over ONLY those families.
 * Additive: evaluateEpisodes itself is unchanged. Interaction with the seed-parity hold-out
 * (combined seed+family splits) is deliberately unspecified and remains TARGET; this module
 * neither composes nor forbids it.
 */
import { evaluateEpisodes } from "./evaluation.js";
import type { EpisodeEvaluationEntry, EpisodeEvaluationInput, LabelledEpisode, MixedEvaluationReport } from "./evaluation.js";

export interface FamilyHoldOut {
  readonly kind: "family-hold-out";
  /** Sorted, unique family names reserved for evaluation. */
  readonly heldOut: readonly string[];
}

const fail = (code: string, detail: string): never => { throw new RangeError(`${code}: ${detail}`); };

/** Declare a family-level hold-out. Empty, blank or duplicated names are invalid. */
export function familyHoldOut(families: readonly string[]): FamilyHoldOut {
  if (families.length === 0) fail("EVALUATION_HOLDOUT_INVALID", "no families named");
  if (families.some(family => family.trim().length === 0)) fail("EVALUATION_HOLDOUT_INVALID", "blank family name");
  if (new Set(families).size !== families.length) fail("EVALUATION_HOLDOUT_INVALID", `duplicate family names in ${families.join(",")}`);
  return { kind: "family-hold-out", heldOut: [...families].sort() };
}

const isHeldOut = (holdOut: FamilyHoldOut, family: string): boolean => holdOut.heldOut.includes(family);

/** The training/selection side: every episode whose family is NOT held out. */
export function trainingEpisodes(holdOut: FamilyHoldOut, episodes: readonly LabelledEpisode[]): LabelledEpisode[] {
  return episodes.filter(row => !isHeldOut(holdOut, row.episode.task.family));
}

/** An explicit training/selection draw from one family. A held-out family refuses by name. */
export function drawTrainingFamily(holdOut: FamilyHoldOut, episodes: readonly LabelledEpisode[], family: string): LabelledEpisode[] {
  if (isHeldOut(holdOut, family)) {
    fail("EVALUATION_FAMILY_HELD_OUT", `training/selection input may not draw from the held-out family ${family} (held out: ${holdOut.heldOut.join(", ")})`);
  }
  return episodes.filter(row => row.episode.task.family === family);
}

/** Evaluate ONLY the held-out families: each entry's episodes filter to the hold-out, then the unchanged evaluateEpisodes runs. */
export function evaluateHeldOutFamilies(holdOut: FamilyHoldOut, input: EpisodeEvaluationInput): MixedEvaluationReport {
  const entries: EpisodeEvaluationEntry[] = input.entries.map(entry => {
    const episodes = entry.episodes.filter(row => isHeldOut(holdOut, row.episode.task.family));
    if (episodes.length === 0) {
      fail("EVALUATION_HOLDOUT_EMPTY", `${entry.configuration.id} carries no episode of a held-out family (held out: ${holdOut.heldOut.join(", ")})`);
    }
    return { ...entry, episodes };
  });
  return evaluateEpisodes({ ...input, entries });
}
