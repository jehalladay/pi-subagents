/**
 * Evaluation extras beside the per-graph-family evaluator (MechanicalWorkflows-rev1.2, GPC experiment).
 * ADDITIVE: a new function over mw.episode.v1 episodes; evaluateGraphFamilies, evaluateEpisodes and their
 * modules are unchanged and never import this one. It reports four instruments per family and arm from
 * INJECTED inputs only (no clock, no randomness read here): replay fidelity of supplied decision tapes,
 * stability over a supplied seed set, tail cost of the injected clock, and held-out graph sizes. An absent
 * input yields the literal "unknown", never 0. Evidence grade is FIXTURE (mode "fixture", certified: false):
 * the report measures; it never claims that an arm generalizes, is stable or ranks against another.
 */
import type { Episode, Maybe } from "./episode.js";
import { digest } from "./canonical.js";
import { replayDecisions } from "./decision-replay.js";
import type { DecisionDivergenceField, DecisionEnvironment, DecisionTape } from "./decision-replay.js";

export interface GraphFamilyExtrasArm {
  readonly armId: string;
  readonly episodes: readonly Episode[];
  /** Injected wall-clock cost per episode, micro units, index-aligned with `episodes` (purity: no clock is read here). */
  readonly wallClockMicro: readonly number[];
  /** Recorded decision tapes of this arm; each must belong to a family the arm has episodes in. */
  readonly tapes?: readonly { readonly environment: DecisionEnvironment; readonly tape: DecisionTape }[] | undefined;
}

export interface GraphFamilyExtrasInput {
  readonly arms: readonly GraphFamilyExtrasArm[];
  /** Seeds over which stability is measured; absent, empty or fewer than two matching episodes leave stability "unknown". */
  readonly stabilitySeeds?: readonly number[] | undefined;
  /** Graph sizes seen in training; absent leaves held-out sizes "unknown"; present and holding out nothing refuses. */
  readonly trainingSizes?: readonly number[] | undefined;
}

export interface ReplayFidelity {
  readonly tapes: number;
  /** Count of DecisionDivergence entries replayDecisions returned over the tapes (at most one per tape). */
  readonly divergences: number;
  readonly byField: Readonly<Record<DecisionDivergenceField, number>>;
}

export interface StabilityRow {
  readonly seeds: number;
  /** max minus min of meanStepsMicro over the seed episodes. */
  readonly meanStepsSpreadMicro: number;
  readonly distinctLandedOrders: number;
}

export interface TailCost { readonly p99WallClockMicro: number; readonly maxWallClockMicro: number }

export interface HeldOutRow { readonly armId: string; readonly episodeIndex: number; readonly size: number; readonly stepsMicro: number }

export interface GraphFamilyExtrasArmResult {
  readonly armId: string;
  readonly n: number;
  readonly replayFidelity: Maybe<ReplayFidelity>;
  readonly stability: Maybe<StabilityRow>;
  readonly tail: TailCost;
}

export interface GraphFamilyExtrasBlock {
  readonly family: string;
  readonly arms: readonly GraphFamilyExtrasArmResult[];
  readonly heldOutSizes: Maybe<readonly HeldOutRow[]>;
}

export interface GraphFamilyExtrasDefinitions {
  readonly replayFidelity: string;
  readonly stability: string;
  readonly tailCost: string;
  readonly unseenSizes: string;
  readonly episodeSize: string;
}

export interface GraphFamilyExtrasReport {
  readonly schema: "mw.graph-family-evaluation-extras.v1";
  readonly mode: "fixture";
  readonly definitions: GraphFamilyExtrasDefinitions;
  readonly families: readonly GraphFamilyExtrasBlock[];
  readonly certified: false;
  readonly reportDigest: string;
}

export const GRAPH_FAMILY_EXTRAS_DEFINITIONS: GraphFamilyExtrasDefinitions = {
  replayFidelity: "Replay fidelity counts the divergences decisions replay returns for the arm's supplied tapes, so 0 means those tapes replayed unchanged and says nothing about unsupplied runs.",
  stability: "Stability is the spread (max minus min) of meanStepsMicro and the count of distinct landed orders over the arm's episodes whose seed is in the supplied seed set.",
  tailCost: "Tail cost is the nearest-rank p99 and the max of the injected wall-clock values for the arm's episodes in the family.",
  unseenSizes: "Held-out sizes list the episodes whose size is absent from the supplied training sizes, each with its own meanStepsMicro, and the report refuses when none is held out.",
  episodeSize: "Episode size is the number of distinct intent ids the episode proposed, admitted or rejected across all its decisions.",
};

const MICRO = 1_000_000;
const FIELDS: readonly DecisionDivergenceField[] = ["step", "observation", "intents", "admitted", "checkpoint", "length"];
const fail = (detail: string): never => { throw new RangeError(`GRAPH_EVALUATION_INVALID: ${detail}`); };

/** Nearest-rank percentile over a non-empty list (same convention as the p95 of the family evaluator, reimplemented locally). */
function nearestRank(values: readonly number[], fraction: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(fraction * sorted.length) - 1))]!;
}

function sizeOf(episode: Episode): number {
  const ids = new Set<string>();
  for (const decision of episode.decisions) {
    for (const id of decision.proposed) ids.add(id);
    for (const id of decision.eligibility.admitted) ids.add(id);
    for (const rejection of decision.eligibility.rejected) ids.add(rejection.intentId);
  }
  return ids.size;
}

const landedOrderOf = (episode: Episode): string => episode.decisions.flatMap(decision => decision.eligibility.admitted).join(",");

function checkInput(input: GraphFamilyExtrasInput): void {
  if (input.arms.length === 0) fail("no arms");
  const ids = input.arms.map(arm => arm.armId);
  if (new Set(ids).size !== ids.length) fail(`duplicate arm ids ${ids.join(",")}`);
  for (const arm of input.arms) {
    if (arm.armId.trim().length === 0) fail("blank arm id");
    if (arm.episodes.length === 0) fail(`arm ${arm.armId} carries no episode`);
    if (arm.wallClockMicro.length !== arm.episodes.length) fail(`arm ${arm.armId} injects ${arm.wallClockMicro.length} wall-clock costs for ${arm.episodes.length} episodes`);
    for (const cost of arm.wallClockMicro) if (!Number.isFinite(cost) || cost < 0) fail(`arm ${arm.armId} injects a non-finite or negative wall-clock cost`);
    arm.episodes.forEach((episode, index) => { if (episode.schema !== "mw.episode.v1") fail(`arm ${arm.armId} episode ${index} has schema ${String(episode.schema)}`); });
    const families = new Set(arm.episodes.map(episode => episode.task.family));
    for (const tape of arm.tapes ?? []) if (!families.has(tape.environment)) fail(`arm ${arm.armId} supplies a tape for ${tape.environment}, a family it has no episode in`);
  }
  if (input.trainingSizes !== undefined && input.trainingSizes.length === 0) fail("no training sizes supplied, so no split can be named");
  for (const size of input.trainingSizes ?? []) if (!Number.isInteger(size) || size < 0) fail(`training size ${String(size)} is not a non-negative integer`);
  for (const seed of input.stabilitySeeds ?? []) if (!Number.isInteger(seed)) fail(`seed ${String(seed)} is not an integer`);
}

function replayFidelityOf(arm: GraphFamilyExtrasArm, family: string): Maybe<ReplayFidelity> {
  const tapes = (arm.tapes ?? []).filter(entry => entry.environment === family);
  if (tapes.length === 0) return "unknown";
  const byField = Object.fromEntries(FIELDS.map(field => [field, 0])) as Record<DecisionDivergenceField, number>;
  let divergences = 0;
  for (const entry of tapes) {
    const result = replayDecisions(entry.environment, entry.tape);
    if (result.divergence !== null) { divergences += 1; byField[result.divergence.field] += 1; }
  }
  return { tapes: tapes.length, divergences, byField };
}

function stabilityOf(episodes: readonly Episode[], seeds: readonly number[] | undefined): Maybe<StabilityRow> {
  if (seeds === undefined) return "unknown";
  const wanted = new Set(seeds);
  const picked = episodes.filter(episode => wanted.has(episode.source.seed));
  if (picked.length < 2) return "unknown";
  const steps = picked.map(episode => episode.cost.steps * MICRO);
  return { seeds: picked.length, meanStepsSpreadMicro: Math.max(...steps) - Math.min(...steps), distinctLandedOrders: new Set(picked.map(landedOrderOf)).size };
}

/** Evaluate the four extras per family and arm. Additive beside evaluateGraphFamilies, which is unchanged. */
export function evaluateGraphFamilyExtras(input: GraphFamilyExtrasInput): GraphFamilyExtrasReport {
  checkInput(input);
  const training = input.trainingSizes === undefined ? undefined : new Set(input.trainingSizes);
  const families = [...new Set(input.arms.flatMap(arm => arm.episodes.map(episode => episode.task.family)))].sort();
  let heldOutTotal = 0;
  const blocks: GraphFamilyExtrasBlock[] = families.map(family => {
    const held: HeldOutRow[] = [];
    const arms: GraphFamilyExtrasArmResult[] = [...input.arms].sort((a, b) => (a.armId < b.armId ? -1 : a.armId > b.armId ? 1 : 0)).flatMap(arm => {
      const indices = arm.episodes.flatMap((episode, index) => (episode.task.family === family ? [index] : []));
      if (indices.length === 0) return [];
      const episodes = indices.map(index => arm.episodes[index]!);
      const clock = indices.map(index => arm.wallClockMicro[index]!);
      if (training !== undefined) {
        indices.forEach(index => {
          const episode = arm.episodes[index]!;
          const size = sizeOf(episode);
          if (!training.has(size)) held.push({ armId: arm.armId, episodeIndex: index, size, stepsMicro: episode.cost.steps * MICRO });
        });
      }
      return [{
        armId: arm.armId, n: episodes.length,
        replayFidelity: replayFidelityOf(arm, family),
        stability: stabilityOf(episodes, input.stabilitySeeds),
        tail: { p99WallClockMicro: nearestRank(clock, 0.99), maxWallClockMicro: Math.max(...clock) },
      }];
    });
    heldOutTotal += held.length;
    return { family, arms, heldOutSizes: training === undefined ? ("unknown" as const) : held };
  });
  if (training !== undefined && heldOutTotal === 0) throw new RangeError("GRAPH_EVALUATION_NO_HELD_OUT_SIZE: every episode size appears in the training sizes, so no generalization split exists");
  const body = { schema: "mw.graph-family-evaluation-extras.v1" as const, mode: "fixture" as const, definitions: GRAPH_FAMILY_EXTRAS_DEFINITIONS, families: blocks, certified: false as const };
  return { ...body, reportDigest: digest(body) };
}
