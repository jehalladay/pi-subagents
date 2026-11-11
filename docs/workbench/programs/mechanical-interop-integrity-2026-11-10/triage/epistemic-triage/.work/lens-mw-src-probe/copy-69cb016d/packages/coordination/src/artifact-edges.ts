/**
 * Edge classification for one mw.episode.v1 record (TW program, tw-artifact-consumption-edges-not-causal).
 * Consuming or creating an artifact is lineage: it says where bytes came from and who read them. A
 * causal effect edge is something else entirely — it comes only from a recorded intervention (the
 * episode's control/treatment arm), is estimated across matched arms, and is never derived from an
 * artifact edge, however the attempts are ordered or however they ended. The classification is pure
 * and reads the episode as recorded: an explicit unknown lineage source is reported as unknown, never
 * as an empty list of edges. No validator or export may promote a lineage edge to a causal one; the
 * vocabulary below gives a consumption nowhere to go but `lineage`.
 */
import type { Episode, Maybe } from "./episode.js";
import { UNKNOWN } from "./episode.js";

/** An artifact was created by, or consumed by, an attempt or producer: provenance, not causal responsibility. */
export interface LineageEdge {
  readonly class: "lineage";
  readonly kind: "created" | "consumed";
  readonly artifactId: string;
  readonly digest: Maybe<string>;
  /** The producer of a created artifact, or the attempt that consumed one. */
  readonly by: Maybe<string>;
}

/** The recorded intervention this episode sits in; effects are estimated across matched arms, not read off one episode. */
export interface CausalEdge {
  readonly class: "causal";
  readonly kind: "intervention";
  readonly controlId: Maybe<string>;
  readonly treatmentId: Maybe<string>;
}

export type EpisodeEdge = LineageEdge | CausalEdge;

export type LineageSource = "created" | "consumed";

export interface EpisodeEdgeClassification {
  /** Created edges first, then consumed, each in the episode's recorded order. */
  readonly lineage: readonly LineageEdge[];
  /** At most one edge: the intervention the episode records, or none when no arm is known. */
  readonly causal: readonly CausalEdge[];
  /** Lineage sources the episode records as the explicit unknown; an unknown is not an empty list. */
  readonly unknown: readonly LineageSource[];
}

/** Classify every artifact edge of an episode as lineage and surface the recorded intervention, if any, as the only causal edge. */
export function classifyEpisodeEdges(episode: Episode): EpisodeEdgeClassification {
  const lineage: LineageEdge[] = [];
  const unknown: LineageSource[] = [];
  const { created, consumed } = episode.artifacts;
  if (created === UNKNOWN) {
    unknown.push("created");
  } else {
    for (const artifact of created) {
      lineage.push({ class: "lineage", kind: "created", artifactId: artifact.id, digest: artifact.digest, by: artifact.producer });
    }
  }
  if (consumed === UNKNOWN) {
    unknown.push("consumed");
  } else {
    for (const use of consumed) {
      lineage.push({ class: "lineage", kind: "consumed", artifactId: use.artifactId, digest: use.digest, by: use.attempt });
    }
  }
  const { controlId, treatmentId } = episode.arms;
  const causal: CausalEdge[] = controlId === UNKNOWN && treatmentId === UNKNOWN
    ? []
    : [{ class: "causal", kind: "intervention", controlId, treatmentId }];
  return { lineage, causal, unknown };
}
