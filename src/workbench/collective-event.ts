/**
 * collective-event.ts — the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope (wb-4ap.15,
 * COLLECTIVE-ADAPTATION-R15). Any Pi ingestion of such events goes through ingestCollectiveEvent.
 *
 * The envelope read here is MechanicalWorkflows' own schema, packages/coordination/schema/collective.event.v1.schema.json,
 * vendored byte-identical at MechanicalWorkflows f489cee4 as test/fixtures/mw-collective-event-v1.schema.json, where the test
 * holds every constant below to the schema's own text. It is a precursor: the ecosystem-wide freeze of the envelope with
 * version negotiation belongs to the collective-adaptation 08 implementation index (T0) and is unpublished, so this boundary
 * recognizes exactly one version, `collective.event.v1`, and refuses every other version as a typed diagnostic, never as a
 * silent success.
 *
 * Checked before the projection is touched: the envelope is a closed object (no member outside the schema's set at the top
 * level, in episode_root or in subject, and none of them missing); every id (episode_id, event_id, actor_id, episode_root.id
 * and each causal_parents entry) matches the schema's id pattern; producer_revision and episode_root.digest are sha256
 * digests; mode is one of the schema's three members, carried verbatim and never read from the episode_id prefix (the
 * producer moved mode to its own member so no consumer parses it out of the composite id); status is `observed` and authority
 * `observation-only`; the free text (subject.uri, subject.revision and each evidence reference) is projection text within
 * NATIVE_TEXT_BYTES carrying no unsafe unit; evidence_refs and causal_parents hold at most COLLECTIVE_EVENT_MAX_REFS entries;
 * and the host names the native receipt payload it retained beside the projection. A refusal is a closed-vocabulary
 * diagnostic (code, field, reason) that never echoes the refused text, and neither ingest() nor relate() is called for it.
 *
 * An accepted envelope becomes one observation event of its own node (provider mechanical-workflows, type collective-event,
 * id event_id) whose payloadRef is the retained receipt reference, whose evidenceRefs are the envelope's own, and whose trace
 * correlation ids carry the episode, its root, mode, actor, producer revision and subject verbatim. No presentation is
 * composed from envelope text. The boundary hands that event to the projection's ingest() itself, so a refused envelope
 * provably never reaches it; once the event is applied it returns, frozen, one `hypothesis` statement parent -> event per
 * causal_parents entry with the producer as its source, which the caller applies with ObservationProjection.relate the way it
 * applies every pure observer's relations (FurnaceObserver.projectionTopology, claude-topology.ts) - this module never states
 * a relation itself. Event linkage is provenance, not proof of causal responsibility (MechanicalWorkflows
 * docs/programs/collective-adaptation-2026-10-16/02-architecture.md:44), and an observation-only envelope carries no
 * producer-confirmed statement, so no causation, ownership or grouping statement is ever derived from it and no control
 * decision can read one as a confirmed-ownership basis.
 */
import { type NativeRef, type ObservationEvent, type ObservationProjection, type ObservationScope, unsafeIdentityUnit } from "./observation.js";

/** The one envelope version this boundary recognizes: the schema's `$id` and its `schema` const. */
export const COLLECTIVE_EVENT_SCHEMA = "collective.event.v1";
/** The producer every node and relation this boundary states names. */
export const COLLECTIVE_EVENT_PROVIDER = "mechanical-workflows";
/** The native type of an envelope's node. */
export const COLLECTIVE_EVENT_TYPE = "collective-event";
/** The observation event kind of an accepted envelope. */
export const COLLECTIVE_EVENT_KIND = "collective.event.v1";
/** The schema's closed member set, in its `required` order. */
export const COLLECTIVE_EVENT_MEMBERS = [
  "schema", "episode_id", "mode", "episode_root", "event_id", "actor_id", "producer_revision", "subject", "causal_parents", "evidence_refs",
  "status", "authority",
] as const;
/** The schema's id pattern (episode_id, event_id, actor_id, episode_root.id, causal_parents items). */
export const COLLECTIVE_EVENT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:@/=+-]{0,255}$/;
/** The schema's revision pattern (producer_revision, episode_root.digest). */
export const COLLECTIVE_EVENT_REVISION_PATTERN = /^sha256:[0-9a-f]{64}$/;
/** The schema's mode members. */
export const COLLECTIVE_EVENT_MODES = ["fixture", "replay", "live"] as const;
/** Entries one envelope may carry in evidence_refs or in causal_parents: the projection's own evidence bound. */
export const COLLECTIVE_EVENT_MAX_REFS = 32;
/** The text bound of an envelope's free text and of the retained receipt reference (the projection's correlation bound). */
const NATIVE_TEXT_BYTES = 256;
const EPISODE_ROOT_MEMBERS: readonly string[] = ["id", "digest"];
const SUBJECT_MEMBERS: readonly string[] = ["uri", "revision"];

export type CollectiveEventMode = (typeof COLLECTIVE_EVENT_MODES)[number];
export type CollectiveEventMember = (typeof COLLECTIVE_EVENT_MEMBERS)[number];
/** One envelope as the schema states it. */
export interface CollectiveEvent {
  readonly schema: typeof COLLECTIVE_EVENT_SCHEMA;
  readonly episode_id: string;
  readonly mode: CollectiveEventMode;
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

/** Where a refusal sits: the envelope as a whole, one of its members, or the host's retained receipt reference. */
export const COLLECTIVE_EVENT_FIELDS = ["envelope", ...COLLECTIVE_EVENT_MEMBERS, "receipt"] as const;
export type CollectiveEventField = (typeof COLLECTIVE_EVENT_FIELDS)[number];
/** Why: the closed refusal vocabulary. */
export const COLLECTIVE_EVENT_REASONS = [
  "wrong-type", "schema-unrecognized", "member-unexpected", "member-missing", "id-malformed", "revision-malformed", "mode-unrecognized",
  "status-not-observed", "authority-not-observation-only", "text-malformed", "over-limit", "receipt-missing",
] as const;
export type CollectiveEventReason = (typeof COLLECTIVE_EVENT_REASONS)[number];
/** One refused envelope: closed vocabulary only, never the refused text, so a surface can show it as-is. */
export interface CollectiveEventDiagnostic {
  readonly code: "collective-event-refused";
  readonly field: CollectiveEventField;
  readonly reason: CollectiveEventReason;
}
export type CollectiveEventReading = { readonly ok: true; readonly event: CollectiveEvent } | { readonly ok: false; readonly diagnostic: CollectiveEventDiagnostic };

/** What ingestCollectiveEvent needs from the host. */
export interface CollectiveEventOptions {
  readonly scope: ObservationScope;
  readonly observedAt: string;
  /** The host's own reference to the native receipt payload it retained beside this projection. */
  readonly receiptRef: string;
}
/** The one projection call this boundary makes, so a host can hand the projection itself. */
export type CollectiveEventSink = Pick<ObservationProjection, "ingest">;
/** Exactly the statement ObservationProjection.relate accepts; this boundary only ever states hypothesis. */
export type CollectiveObservedRelation = Parameters<ObservationProjection["relate"]>[0];
/**
 * A refused envelope (the projection untouched), or the projection's own ingest() answer for an accepted one with the
 * hypothesis statements the caller applies: one per causal parent when ingest() applied the event, none otherwise.
 */
export type CollectiveEventIngest =
  | { readonly admitted: false; readonly diagnostic: CollectiveEventDiagnostic }
  | {
      readonly admitted: true;
      readonly ingest: ReturnType<ObservationProjection["ingest"]>;
      readonly ref: NativeRef;
      readonly relations: readonly CollectiveObservedRelation[];
    };

const refused = (field: CollectiveEventField, reason: CollectiveEventReason): { readonly ok: false; readonly diagnostic: CollectiveEventDiagnostic } =>
  ({ ok: false, diagnostic: Object.freeze({ code: "collective-event-refused", field, reason }) });
const plain = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
const isId = (value: unknown): value is string => typeof value === "string" && COLLECTIVE_EVENT_ID_PATTERN.test(value);
const isRevision = (value: unknown): value is string => typeof value === "string" && COLLECTIVE_EVENT_REVISION_PATTERN.test(value);
const isMode = (value: unknown): value is CollectiveEventMode => typeof value === "string" && (COLLECTIVE_EVENT_MODES as readonly string[]).includes(value);
/** Projection text: nonempty, within the bound and carrying no unsafe unit (a control, a bidi format or a default-ignorable). */
const isText = (value: unknown): value is string =>
  typeof value === "string" && value !== "" && Buffer.byteLength(value, "utf8") <= NATIVE_TEXT_BYTES && unsafeIdentityUnit(value) === undefined;
/** A closed object's member check: a member outside the set first, then the first missing member of the set. */
function closedMembers(value: Readonly<Record<string, unknown>>, members: readonly string[]): "member-unexpected" | "member-missing" | undefined {
  for (const key of Object.keys(value)) if (!members.includes(key)) return "member-unexpected";
  for (const name of members) if (!Object.hasOwn(value, name)) return "member-missing";
  return undefined;
}

/**
 * Read one value as a collective.event.v1 envelope, member by member in the schema's order; the first refusal wins. The
 * version is judged first, so an unrecognized version is refused as a version whatever its other members hold.
 */
export function readCollectiveEvent(value: unknown): CollectiveEventReading {
  if (!plain(value)) return refused("envelope", "wrong-type");
  if (!Object.hasOwn(value, "schema") || value.schema !== COLLECTIVE_EVENT_SCHEMA) return refused("schema", "schema-unrecognized");
  for (const key of Object.keys(value)) if (!(COLLECTIVE_EVENT_MEMBERS as readonly string[]).includes(key)) return refused("envelope", "member-unexpected");
  for (const name of COLLECTIVE_EVENT_MEMBERS) if (!Object.hasOwn(value, name)) return refused(name, "member-missing");
  const { episode_id, mode, episode_root, event_id, actor_id, producer_revision, subject, causal_parents, evidence_refs, status, authority } = value;
  if (!isId(episode_id)) return refused("episode_id", "id-malformed");
  if (!isMode(mode)) return refused("mode", "mode-unrecognized");
  if (!plain(episode_root)) return refused("episode_root", "wrong-type");
  const rootMembers = closedMembers(episode_root, EPISODE_ROOT_MEMBERS);
  if (rootMembers !== undefined) return refused("episode_root", rootMembers);
  const { id: rootId, digest: rootDigest } = episode_root;
  if (!isId(rootId)) return refused("episode_root", "id-malformed");
  if (!isRevision(rootDigest)) return refused("episode_root", "revision-malformed");
  if (!isId(event_id)) return refused("event_id", "id-malformed");
  if (!isId(actor_id)) return refused("actor_id", "id-malformed");
  if (!isRevision(producer_revision)) return refused("producer_revision", "revision-malformed");
  if (!plain(subject)) return refused("subject", "wrong-type");
  const subjectMembers = closedMembers(subject, SUBJECT_MEMBERS);
  if (subjectMembers !== undefined) return refused("subject", subjectMembers);
  const { uri, revision } = subject;
  if (!isText(uri) || !isText(revision)) return refused("subject", "text-malformed");
  if (!Array.isArray(causal_parents)) return refused("causal_parents", "wrong-type");
  const parentList: readonly unknown[] = causal_parents;
  if (parentList.length > COLLECTIVE_EVENT_MAX_REFS) return refused("causal_parents", "over-limit");
  const parents: string[] = [];
  for (const parent of parentList) {
    if (!isId(parent)) return refused("causal_parents", "id-malformed");
    parents.push(parent);
  }
  if (!Array.isArray(evidence_refs)) return refused("evidence_refs", "wrong-type");
  const evidenceList: readonly unknown[] = evidence_refs;
  if (evidenceList.length > COLLECTIVE_EVENT_MAX_REFS) return refused("evidence_refs", "over-limit");
  const evidence: string[] = [];
  for (const ref of evidenceList) {
    if (!isText(ref)) return refused("evidence_refs", "text-malformed");
    evidence.push(ref);
  }
  if (status !== "observed") return refused("status", "status-not-observed");
  if (authority !== "observation-only") return refused("authority", "authority-not-observation-only");
  return {
    ok: true,
    event: Object.freeze({
      schema: COLLECTIVE_EVENT_SCHEMA, episode_id, mode, episode_root: Object.freeze({ id: rootId, digest: rootDigest }), event_id, actor_id,
      producer_revision, subject: Object.freeze({ uri, revision }), causal_parents: Object.freeze(parents), evidence_refs: Object.freeze(evidence),
      status, authority,
    }),
  };
}

/** The native reference of one envelope's node: the producer, the envelope type and the envelope's own event id. */
export const collectiveEventRef = (eventId: string): NativeRef => ({ provider: COLLECTIVE_EVENT_PROVIDER, type: COLLECTIVE_EVENT_TYPE, id: eventId });

/** The observation event one accepted envelope becomes; every value is the envelope's or the host's own, copied verbatim. */
export function collectiveObservationEvent(event: CollectiveEvent, options: CollectiveEventOptions): ObservationEvent {
  return {
    projectionEventId: event.event_id,
    source: collectiveEventRef(event.event_id),
    scope: { workspace: options.scope.workspace, principal: options.scope.principal },
    observedAt: options.observedAt,
    kind: COLLECTIVE_EVENT_KIND,
    trace: {
      correlationIds: {
        episode_id: event.episode_id,
        episode_root: event.episode_root.id,
        episode_root_digest: event.episode_root.digest,
        mode: event.mode,
        actor_id: event.actor_id,
        producer_revision: event.producer_revision,
        subject_uri: event.subject.uri,
        subject_revision: event.subject.revision,
      },
    },
    evidenceRefs: [...event.evidence_refs],
    payloadRef: options.receiptRef,
  };
}

/** One frozen `hypothesis` statement parent -> event per causal parent, the producer its source; never another kind. */
export function collectiveEventRelations(event: CollectiveEvent, options: CollectiveEventOptions): readonly CollectiveObservedRelation[] {
  return Object.freeze(
    event.causal_parents.map(parent =>
      Object.freeze({
        scope: { workspace: options.scope.workspace, principal: options.scope.principal },
        from: collectiveEventRef(parent),
        to: collectiveEventRef(event.event_id),
        kind: "hypothesis" as const,
        provenance: { source: COLLECTIVE_EVENT_PROVIDER, observedAt: options.observedAt },
      }),
    ),
  );
}

/**
 * The boundary: read the envelope, require the retained receipt reference, and only then hand the projection one observation
 * event. A refusal never calls ingest(). The hypothesis statements come back only when ingest() applied the event, so a
 * duplicate, out-of-order or identity-refused event states nothing twice.
 */
export function ingestCollectiveEvent(sink: CollectiveEventSink, value: unknown, options: CollectiveEventOptions): CollectiveEventIngest {
  const reading = readCollectiveEvent(value);
  if (!reading.ok) return { admitted: false, diagnostic: reading.diagnostic };
  if (!isText(options.receiptRef)) return { admitted: false, diagnostic: refused("receipt", "receipt-missing").diagnostic };
  const { event } = reading;
  const ref = collectiveEventRef(event.event_id);
  const ingest = sink.ingest(collectiveObservationEvent(event, options));
  return { admitted: true, ingest, ref, relations: ingest === "applied" ? collectiveEventRelations(event, options) : Object.freeze([]) };
}
