import { canonicalJson, digest } from "./canonical.js";
import type { Episode, EpisodeMode } from "./episode.js";

/**
 * The ecosystem interchange envelope `collective.event.v1` (collective-adaptation 02 "End-to-end event contract",
 * 08 T0), projected from the shared `mw.episode.v1` record. MechanicalWorkflows owns this projection only: the
 * ecosystem-wide freeze of the envelope belongs to the 08 implementation index. The projection yields one
 * envelope per episode event, is observation-only, and keeps every native receipt it can name in `evidence_refs`
 * (the episode's verifier receipt digest plus the evidence each decision at that step cited). A value the episode
 * does not know stays the literal `"unknown"`. The environment mode is a structured enum member (`mode`) and the
 * episode root travels as `episode_root` (id plus digest), so no consumer parses mode out of the `episode_id`
 * composite string (TW-EAT-R012); the `episode_id` prefix remains for identity continuity only.
 */

export interface CollectiveEvent {
  readonly schema: "collective.event.v1";
  readonly episode_id: string;
  /** The episode's environment mode as a structured enum, never parsed from a composite string. */
  readonly mode: EpisodeMode;
  /** The identical episode root this event derives from: its id and the digest of the whole episode record. */
  readonly episode_root: { readonly id: string; readonly digest: string };
  readonly event_id: string;
  readonly actor_id: string;
  readonly producer_revision: string;
  readonly subject: { readonly uri: string; readonly revision: string };
  readonly causal_parents: readonly string[];
  readonly evidence_refs: readonly string[];
  readonly status: "observed";
  readonly authority: "observation-only";
}

export interface CollectiveEventOptions {
  /** Override the producer revision (`sha256:` plus 64 lowercase hex). Default: the digest of the producing module record. */
  readonly producerRevision?: string;
}

const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:@/=+-]{0,255}$/;
const REVISION_PATTERN = /^sha256:[0-9a-f]{64}$/;
const UNKNOWN_LITERAL = "unknown";

/** The module record whose digest is the default `producer_revision`: who produced the projection and from which episode format. */
export function producerModuleRecord(episode: Episode): { readonly module: string; readonly episodeSchema: string; readonly episodeVersion: number; readonly policy: string; readonly configHash: string } {
  return { module: "@mechanical/workflows-coordination/collective-event", episodeSchema: episode.schema, episodeVersion: episode.version, policy: `${episode.policy.id}@${episode.policy.revision}`, configHash: episode.policy.configHash };
}

function checkId(label: string, value: string): string {
  if (!ID_PATTERN.test(value)) throw new Error(`COLLECTIVE_EVENT_ID_INVALID: ${label} ${JSON.stringify(value)} does not match ${ID_PATTERN.source}`);
  return value;
}

/**
 * Project one episode to its `collective.event.v1` envelopes, one per episode event in event order. Pure: the
 * episode is read, never altered, and the same episode always yields the same bytes (an event id is the episode
 * id plus the one-based event position, so re-projection is idempotent). Throws `COLLECTIVE_EVENT_ID_INVALID`
 * when the episode id or a generated event id is empty or holds a space, control or non-ASCII character, and
 * `COLLECTIVE_PRODUCER_REVISION_INVALID` when a supplied producer revision is not a sha256 digest.
 */
export function projectCollectiveEvents(episode: Episode, options: CollectiveEventOptions = {}): readonly CollectiveEvent[] {
  const episodeId = checkId("episode_id", episode.episodeId);
  const revision = options.producerRevision ?? digest(producerModuleRecord(episode));
  if (!REVISION_PATTERN.test(revision)) throw new Error(`COLLECTIVE_PRODUCER_REVISION_INVALID: producer revision ${JSON.stringify(revision)} is not sha256:<64 lowercase hex>`);
  const actor = checkId("actor_id", `policy:${episode.policy.id}@${episode.policy.revision}`);
  const episodeRoot = { id: episodeId, digest: digest(episode) };
  const lastBySubject = new Map<string, string>();
  return episode.events.map((event, index) => {
    const eventId = checkId("event_id", `${episodeId}/event:${index + 1}`);
    const cited = episode.decisions.filter(decision => decision.step === event.step).flatMap(decision => decision.provenance);
    const parent = event.subject === UNKNOWN_LITERAL ? undefined : lastBySubject.get(event.subject);
    if (event.subject !== UNKNOWN_LITERAL) lastBySubject.set(event.subject, eventId);
    return {
      schema: "collective.event.v1" as const,
      episode_id: episodeId,
      mode: episode.mode,
      episode_root: episodeRoot,
      event_id: eventId,
      actor_id: actor,
      producer_revision: revision,
      subject: { uri: event.subject === UNKNOWN_LITERAL ? UNKNOWN_LITERAL : `mw:${episode.environment}/${event.subject}`, revision: episode.task.basis },
      causal_parents: parent === undefined ? [] : [parent],
      evidence_refs: [...new Set([episode.verifier.receiptDigest, ...cited])].sort(),
      status: "observed" as const,
      authority: "observation-only" as const,
    };
  });
}

/** The exported bytes of one projection: canonical JSON array plus a final newline, one byte sequence per projection in either language. */
export function collectiveEventBytes(events: readonly CollectiveEvent[]): string {
  return canonicalJson(events) + "\n";
}
