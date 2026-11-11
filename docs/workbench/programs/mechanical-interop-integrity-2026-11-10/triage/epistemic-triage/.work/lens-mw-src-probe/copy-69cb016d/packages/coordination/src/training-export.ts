import { canonicalJson, digest } from "./canonical.js";
import { sanitizeValue, UNKNOWN } from "./episode.js";
import type { Episode, EpisodeMode, Maybe } from "./episode.js";

/**
 * Off-policy training export `mw.training-export.v1` (collective-adaptation M3, slice A). A pure function from
 * the shared `mw.episode.v1` record to one training record per decision: the sampled intents, the eligibility
 * mask (the intents the resolver admitted and the ones it rejected with their stable code, so an on-policy
 * mask is reconstructible), the sampling support (policy id, revision and configuration hash), the actual log
 * probability when the policy recorded one else the explicit literal `"unknown"`, the checkpoints before and
 * after, the provenance, the verifier reference, the attempt lineage and the control/treatment ids. It exports
 * and never trains: no learner, no network, no file write. A value nobody recorded stays `"unknown"`, the mode
 * label is preserved and an upgrade of it is refused, and sanitisation runs before the record is materialised.
 */

export interface TrainingMask {
  /** The intents the resolver admitted at this step: the on-policy mask. */
  readonly admitted: readonly string[];
  /** The intents it refused, each with its stable rejection code. */
  readonly rejected: readonly { readonly intentId: string; readonly code: string }[];
}

export interface TrainingStep {
  readonly step: number;
  /** One actor id per decision: the episode's only role, or the explicit unknown when several roles share the episode. */
  readonly actorId: Maybe<string>;
  /** The intents the policy sampled (proposed) at this step. */
  readonly sampled: readonly string[];
  readonly mask: TrainingMask;
  readonly support: { readonly policyId: string; readonly revision: string; readonly configHash: string };
  readonly logProb: Maybe<number>;
  /** The state hash before the step (the first step reads the episode's initialCheckpoint, which is the explicit unknown only for a source that records no initial state) and after it. */
  readonly checkpoint: { readonly before: Maybe<string>; readonly after: string };
  readonly observationDigest: string;
  readonly provenance: { readonly basis: Maybe<string>; readonly family: string; readonly readSet: readonly string[]; readonly evidence: readonly string[] };
}

export interface TrainingExport {
  readonly schema: "mw.training-export.v1";
  readonly version: 1;
  readonly mode: EpisodeMode;
  readonly episodeId: string;
  readonly environment: Episode["environment"];
  readonly steps: readonly TrainingStep[];
  readonly verifier: Episode["verifier"];
  readonly lineage: { readonly attempts: Episode["attempts"]; readonly arms: Episode["arms"] };
  /** `removed` lists what this export step stripped; `inherited` lists what the episode's own sanitiser had already stripped. */
  readonly sanitize: { readonly ran: true; readonly removed: readonly string[]; readonly inherited: readonly string[] };
  /** Per-actor credit rows, present only once attached; every row derives from an intervention or counterfactual. */
  readonly credits?: readonly PerActorCredit[];
  /** Digest of every other member. */
  readonly digest: string;
}

type TrainingBody = Omit<TrainingExport, "digest">;

function body(episode: Episode): TrainingBody {
  const actorId: Maybe<string> = episode.roles.length === 1 ? episode.roles[0]! : UNKNOWN;
  return {
    schema: "mw.training-export.v1", version: 1, mode: episode.mode, episodeId: episode.episodeId, environment: episode.environment,
    steps: episode.decisions.map((decision, index) => ({
      step: decision.step, actorId, sampled: [...decision.proposed],
      mask: { admitted: [...decision.eligibility.admitted], rejected: decision.eligibility.rejected.map(entry => ({ intentId: entry.intentId, code: entry.code })) },
      support: { policyId: episode.policy.id, revision: episode.policy.revision, configHash: episode.policy.configHash },
      logProb: decision.logProb,
      checkpoint: { before: index === 0 ? episode.initialCheckpoint : episode.checkpoints[index - 1]!, after: episode.checkpoints[index]! },
      observationDigest: decision.observationDigest,
      provenance: { basis: episode.task.basis, family: episode.task.family, readSet: [...decision.readSet], evidence: [...decision.provenance] },
    })),
    verifier: { ...episode.verifier },
    lineage: { attempts: episode.attempts, arms: { ...episode.arms } },
    sanitize: { ran: true, removed: [], inherited: [...episode.sanitize.removed] },
  };
}

function seal(clean: TrainingBody): TrainingExport {
  return { ...clean, digest: digest(clean) };
}

/** Export one episode for off-policy training. Pure: the episode is read, never altered, and the result is sanitised before its digest is taken. An episode whose verifier label outranks its mode label is refused. */
export function exportEpisodeForTraining(episode: Episode): TrainingExport {
  if (MODE_RANK[episode.verifier.label] > MODE_RANK[episode.mode]) {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: an episode labelled ${episode.mode} carries a ${episode.verifier.label} verifier`);
  }
  const cleaned = sanitizeValue(body(episode));
  return seal({ ...cleaned.value, sanitize: { ran: true, removed: cleaned.removed, inherited: [...cleaned.value.sanitize.inherited] } });
}

/** The batch variant: the element-wise export, in input order. */
export function exportEpisodesForTraining(episodes: readonly Episode[]): TrainingExport[] {
  return episodes.map(exportEpisodeForTraining);
}

const MODE_RANK: Readonly<Record<EpisodeMode, number>> = { fixture: 0, replay: 1, live: 2 };

/** Relabel an export. Keeping or lowering the label is allowed (the digest follows); any upgrade, and any label outside the closed enum (the requested one or the export's own), is refused. */
export function labelTrainingMode(exported: TrainingExport, mode: string): TrainingExport {
  const own = (label: unknown): label is EpisodeMode => typeof label === "string" && Object.prototype.hasOwnProperty.call(MODE_RANK, label);
  if (!own(mode) || !own(exported.mode) || MODE_RANK[mode] > MODE_RANK[exported.mode]) {
    throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a training export labelled ${String(exported.mode)} cannot be labelled ${String(mode)}`);
  }
  const { digest: _digest, ...rest } = exported;
  return seal({ ...rest, mode: mode as EpisodeMode });
}


/** One per-actor credit row: a benefit value in integer micro-units attributed to one actor, carrying the intervention or counterfactual it derives from. */
export interface PerActorCredit {
  readonly actorId: string;
  /** Integer micro-units; finite, never NaN. */
  readonly valueMicro: number;
  /** The derivation the attribution rests on: a global team outcome alone is never one. */
  readonly derivation: { readonly kind: "intervention" | "counterfactual"; readonly reference: string };
}

const DERIVATION_KINDS: Readonly<Record<"intervention" | "counterfactual", true>> = { intervention: true, counterfactual: true };

/** Attach per-actor credit to an export. Every row must derive from an intervention or counterfactual (a global team outcome alone never attributes per-actor benefit), name an actor some step attributes a decision to, and carry a finite integer micro-value. An export already carrying credits is refused; the result is re-sealed with a fresh digest. */
export function attachPerActorCredit(exported: TrainingExport, credits: readonly PerActorCredit[]): TrainingExport {
  if (Object.prototype.hasOwnProperty.call(exported, "credits")) {
    throw new Error("TRAINING_CREDIT_INVALID: the export already carries credits; attribution is attached once, never overwritten");
  }
  if (credits.length === 0) {
    throw new Error("TRAINING_CREDIT_INVALID: attach at least one credit row or attach nothing");
  }
  const actors = new Set<string>();
  for (const step of exported.steps) if (step.actorId !== UNKNOWN) actors.add(step.actorId);
  const rows = credits.map((row, index) => {
    const derivation = (row as { derivation?: { kind?: unknown; reference?: unknown } }).derivation;
    const kind = derivation?.kind;
    if (typeof kind !== "string" || !Object.prototype.hasOwnProperty.call(DERIVATION_KINDS, kind)) {
      throw new Error(`TRAINING_CREDIT_WITHOUT_INTERVENTION: credit ${index} derives from no intervention or counterfactual; a global team outcome alone never attributes per-actor benefit`);
    }
    if (typeof derivation?.reference !== "string" || derivation.reference.trim().length === 0) {
      throw new Error(`TRAINING_CREDIT_WITHOUT_INTERVENTION: credit ${index} names no derivation reference`);
    }
    if (typeof row.actorId !== "string" || row.actorId.trim().length === 0 || !Number.isSafeInteger(row.valueMicro)) {
      throw new Error(`TRAINING_CREDIT_INVALID: credit ${index} needs a named actor and a safe integer micro-value (beyond 2^53-1 JavaScript no longer represents every integer exactly, so cross-language digest parity cannot be guaranteed)`);
    }
    if (!actors.has(row.actorId)) {
      throw new Error(`TRAINING_CREDIT_ACTOR_UNKNOWN: credit ${index} names ${row.actorId}, which no step of this export attributes a decision to`);
    }
    return { actorId: row.actorId, valueMicro: row.valueMicro, derivation: { kind: kind as "intervention" | "counterfactual", reference: derivation.reference } };
  });
  const cleaned = sanitizeValue(rows);
  const { digest: _digest, ...body } = exported;
  return seal({
    ...body,
    credits: cleaned.value,
    sanitize: { ran: true, removed: [...body.sanitize.removed, ...cleaned.removed.map(path => "/credits" + path)], inherited: [...body.sanitize.inherited] },
  });
}

/** The exported bytes of one training export: canonical JSON plus a final newline, one byte sequence per export in either language. */
export function trainingBytes(exported: TrainingExport): string {
  return canonicalJson(exported) + "\n";
}
