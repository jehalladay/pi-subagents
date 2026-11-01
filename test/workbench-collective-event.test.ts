/**
 * wb-4ap.15 (COLLECTIVE-ADAPTATION-R15): the one Pi boundary for MechanicalWorkflows' collective.event.v1 interchange envelope.
 *
 * Statement: "any Pi ingestion of such events shall validate event_id and producer_revision at the boundary, retain the native
 * receipt payload reference beside the projection, project causal_parents as provenance (grouping/hypothesis) never as causation,
 * and refuse an unrecognized schema version as a diagnostic, never silent success."
 *
 * The envelope read here is MechanicalWorkflows' PRECURSOR schema, packages/coordination/schema/collective.event.v1.schema.json,
 * vendored byte-identical at MechanicalWorkflows f489cee4ce2088e25440c82ecc448cc0dc9a66ce (git blob f035f3c7) as
 * test/fixtures/mw-collective-event-v1.schema.json, and the producer's own exported projection
 * qa/integration/python-consumer/fixtures/collective-events-replay-native-receipts.json (git blob 897e75bc, last changed at
 * MechanicalWorkflows 0bcdad8a) as test/fixtures/mw-collective-events-replay-native-receipts.json. The gate artifact itself - the
 * ecosystem-wide freeze of the envelope with version negotiation (collective-adaptation 08 implementation index, T0) - is
 * unpublished at that pin, so each "frozen-schema" row below runs over the precursor; the freeze leg stays parked on the bead.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  COLLECTIVE_EVENT_FIELDS,
  COLLECTIVE_EVENT_ID_PATTERN,
  COLLECTIVE_EVENT_KIND,
  COLLECTIVE_EVENT_MAX_REFS,
  COLLECTIVE_EVENT_MEMBERS,
  COLLECTIVE_EVENT_MODES,
  COLLECTIVE_EVENT_PROVIDER,
  COLLECTIVE_EVENT_REASONS,
  COLLECTIVE_EVENT_REVISION_PATTERN,
  COLLECTIVE_EVENT_SCHEMA,
  COLLECTIVE_EVENT_TYPE,
  type CollectiveEvent,
  type CollectiveEventDiagnostic,
  type CollectiveEventIngest,
  type CollectiveEventOptions,
  type CollectiveEventSink,
  type CollectiveObservedRelation,
  collectiveEventRef,
  collectiveEventRelations,
  ingestCollectiveEvent,
  readCollectiveEvent,
} from "../src/workbench/collective-event.js";
import { NATIVE_CONTROL_ACTIONS } from "../src/workbench/control.js";
import { type NativeRef, type ObservationEvent, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const SCHEMA_TEXT = readFileSync(new URL("./fixtures/mw-collective-event-v1.schema.json", import.meta.url), "utf8");
const EVENTS_TEXT = readFileSync(new URL("./fixtures/mw-collective-events-replay-native-receipts.json", import.meta.url), "utf8");
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

interface SchemaNode {
  readonly const?: string;
  readonly enum?: readonly string[];
  readonly pattern?: string;
  readonly required?: readonly string[];
  readonly properties?: Readonly<Record<string, SchemaNode>>;
  readonly items?: SchemaNode;
  readonly additionalProperties?: boolean;
}
const SCHEMA = JSON.parse(SCHEMA_TEXT) as SchemaNode & { readonly $id: string };
const member = (node: SchemaNode, name: string): SchemaNode => {
  const found = node.properties?.[name];
  if (found === undefined) throw new Error(`the vendored schema has no member ${name}`);
  return found;
};
type Envelope = Record<string, unknown>;
const EVENTS = JSON.parse(EVENTS_TEXT) as readonly Envelope[];
/** A fresh deep copy of fixture envelope n (1-based), so a mutation never reaches another case. */
const envelope = (n: number): Envelope => {
  const found = EVENTS[n - 1];
  if (found === undefined) throw new Error(`the vendored fixture has no event ${n}`);
  return structuredClone(found);
};

const SCOPE: ObservationScope = { workspace: "/fixture/pi-workspace", principal: "fixture-principal" };
const OBSERVED_AT = "2026-10-28T03:00:00Z";
/** The host's own reference to the native receipt payload it retained beside the projection (a fixture path). */
const RECEIPT = "retained/mw/collective-events-replay-native-receipts.json";
const OPTIONS = { scope: SCOPE, observedAt: OBSERVED_AT, receiptRef: RECEIPT };
const keyOf = (ref: NativeRef): string => JSON.stringify([SCOPE.workspace, SCOPE.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);

/**
 * A real projection behind a sink that records every ingest() call, and the caller's own apply step: each statement the
 * boundary returns is applied with ObservationProjection.relate and recorded, so a case can say whether either was reached.
 */
function recorded(): {
  projection: ObservationProjection;
  ingested: ObservationEvent[];
  results: string[];
  related: CollectiveObservedRelation[];
  ingest: (value: unknown, options?: CollectiveEventOptions) => CollectiveEventIngest;
} {
  const projection = new ObservationProjection();
  const ingested: ObservationEvent[] = [];
  const results: string[] = [];
  const related: CollectiveObservedRelation[] = [];
  const sink: CollectiveEventSink = {
    ingest: event => {
      ingested.push(event);
      const result = projection.ingest(event);
      results.push(result);
      return result;
    },
  };
  const ingest = (value: unknown, options: CollectiveEventOptions = OPTIONS): CollectiveEventIngest => {
    const result = ingestCollectiveEvent(sink, value, options);
    if (result.admitted) {
      for (const relation of result.relations) {
        related.push(relation);
        projection.relate(relation);
      }
    }
    return result;
  };
  return { projection, ingested, results, related, ingest };
}
const diagnosticOf = (result: CollectiveEventIngest): CollectiveEventDiagnostic => {
  if (result.admitted) throw new Error("expected a refusal, got an admitted envelope");
  return result.diagnostic;
};
/** The admitted reading of one envelope, or a thrown error naming the refusal. */
const readEvent = (value: unknown): CollectiveEvent => {
  const reading = readCollectiveEvent(value);
  if (!reading.ok) throw new Error(`expected an admitted envelope, got ${reading.diagnostic.field}/${reading.diagnostic.reason}`);
  return reading.event;
};
const refusal = (field: CollectiveEventDiagnostic["field"], reason: CollectiveEventDiagnostic["reason"]): CollectiveEventDiagnostic => ({ code: "collective-event-refused", field, reason });
/** The refused input changed nothing: ingest() was never called, no statement came back, and the projection holds no node, event or edge. */
function untouched(run: ReturnType<typeof recorded>): void {
  expect(run.ingested).toEqual([]);
  expect(run.related).toEqual([]);
  expect(run.projection.query({ scope: SCOPE, limit: 10 }).nodes).toEqual([]);
  expect(run.projection.events({ scope: SCOPE, limit: 10 }).events).toEqual([]);
  expect(run.projection.relations({ scope: SCOPE })).toEqual([]);
}

describe("wb-4ap.15: the vendored precursor is MechanicalWorkflows' own bytes, and the boundary reads its contract from them", () => {
  it("the vendored schema and producer fixture are byte-identical to MechanicalWorkflows f489cee4 (sha-256 pins)", () => {
    expect(sha256(SCHEMA_TEXT)).toBe("f36a652234fe741c696844458c74fd0dfd74eb5af75db42c5305ab249f36c33a");
    expect(sha256(EVENTS_TEXT)).toBe("0cb518fdd9450681c190f8f0c031d6b70164ce10acdf888984df1204270f9864");
    expect(EVENTS).toHaveLength(3);
  });

  it("the boundary's version, closed member set, id and revision patterns, mode set and consts are the schema's own", () => {
    expect(SCHEMA.$id).toBe(COLLECTIVE_EVENT_SCHEMA);
    expect(member(SCHEMA, "schema").const).toBe(COLLECTIVE_EVENT_SCHEMA);
    expect(SCHEMA.additionalProperties).toBe(false);
    expect([...COLLECTIVE_EVENT_MEMBERS]).toEqual(SCHEMA.required);
    expect([...COLLECTIVE_EVENT_MEMBERS].sort()).toEqual(Object.keys(SCHEMA.properties ?? {}).sort());
    const ids = [member(SCHEMA, "episode_id"), member(SCHEMA, "event_id"), member(SCHEMA, "actor_id"), member(member(SCHEMA, "episode_root"), "id"), member(SCHEMA, "causal_parents").items];
    for (const node of ids) expect(new RegExp(node?.pattern ?? "").source).toBe(COLLECTIVE_EVENT_ID_PATTERN.source);
    for (const node of [member(SCHEMA, "producer_revision"), member(member(SCHEMA, "episode_root"), "digest")]) {
      expect(new RegExp(node.pattern ?? "").source).toBe(COLLECTIVE_EVENT_REVISION_PATTERN.source);
    }
    expect([...COLLECTIVE_EVENT_MODES]).toEqual(member(SCHEMA, "mode").enum);
    expect(member(SCHEMA, "status").const).toBe("observed");
    expect(member(SCHEMA, "authority").const).toBe("observation-only");
    expect(member(SCHEMA, "episode_root").required).toEqual(["id", "digest"]);
    expect(member(SCHEMA, "episode_root").additionalProperties).toBe(false);
    expect(member(SCHEMA, "subject").required).toEqual(["uri", "revision"]);
    expect(member(SCHEMA, "subject").additionalProperties).toBe(false);
  });

  it("every envelope of the producer's own projection reads as admitted, unchanged", () => {
    for (const event of EVENTS) {
      const reading = readCollectiveEvent(structuredClone(event));
      expect(reading).toEqual({ ok: true, event });
    }
  });
});

describe("wb-4ap.15 acceptance 1: \"an ingest test feeds a frozen-schema event with valid event_id/producer_revision and asserts ingest() returns 'applied' with payloadRef set to the retained native receipt\" (over the precursor)", () => {
  it("event 1 of the producer's projection: ingest() returns 'applied', and the node's payloadRef is the retained native receipt", () => {
    const run = recorded();
    const result = run.ingest(envelope(1));
    const source = envelope(1);
    expect(result).toEqual({ admitted: true, ingest: "applied", ref: collectiveEventRef(String(source.event_id)), relations: [] });
    expect(run.results).toEqual(["applied"]);
    const [node] = run.projection.query({ scope: SCOPE, ref: collectiveEventRef(String(source.event_id)), limit: 1 }).nodes;
    expect(node?.payloadRef).toBe(RECEIPT);
    expect(node?.nativeRef).toEqual({ provider: COLLECTIVE_EVENT_PROVIDER, type: COLLECTIVE_EVENT_TYPE, id: source.event_id });
    expect(node?.kind).toBe(COLLECTIVE_EVENT_KIND);
    expect(node?.evidenceRefs).toEqual(source.evidence_refs);
  });

  it("the stored event carries episode, root, mode, actor, producer revision and subject verbatim as correlation ids", () => {
    const run = recorded();
    run.ingest(envelope(1));
    const source = envelope(1) as {
      episode_id: string;
      mode: string;
      episode_root: { id: string; digest: string };
      actor_id: string;
      producer_revision: string;
      subject: { uri: string; revision: string };
      event_id: string;
    };
    const [stored] = run.projection.events({ scope: SCOPE, limit: 10 }).events;
    expect(stored?.projectionEventId).toBe(source.event_id);
    expect(stored?.payloadRef).toBe(RECEIPT);
    expect(stored?.trace?.correlationIds).toEqual({
      episode_id: source.episode_id,
      episode_root: source.episode_root.id,
      episode_root_digest: source.episode_root.digest,
      mode: source.mode,
      actor_id: source.actor_id,
      producer_revision: source.producer_revision,
      subject_uri: source.subject.uri,
      subject_revision: source.subject.revision,
    });
  });

  it("an observation-only envelope renders no producer tone: the node keeps the projection's unknown presentation", () => {
    const run = recorded();
    run.ingest(envelope(1));
    const [node] = run.projection.query({ scope: SCOPE, limit: 1 }).nodes;
    expect(node?.presentation.statusTone).toBe("unknown");
    expect(node?.freshness).toBe("unknown");
  });

  it("the same envelope again is a duplicate: ingest() answers 'duplicate' and no relation is stated twice", () => {
    const run = recorded();
    run.ingest(envelope(1));
    run.ingest(envelope(2));
    const again = run.ingest(envelope(2));
    expect(again).toMatchObject({ admitted: true, ingest: "duplicate", relations: [] });
    expect(run.results).toEqual(["applied", "applied", "duplicate"]);
    expect(run.related).toHaveLength(1);
    expect(run.projection.relations({ scope: SCOPE })).toHaveLength(1);
  });

  it("no retained native receipt reference refuses the envelope as a typed diagnostic, and ingest() is not called", () => {
    for (const receiptRef of ["", `retained/${String.fromCodePoint(0x00)}receipt`, "x".repeat(257), String.fromCodePoint(0x202e)]) {
      const run = recorded();
      expect(diagnosticOf(run.ingest(envelope(1), { ...OPTIONS, receiptRef }))).toEqual(refusal("receipt", "receipt-missing"));
      untouched(run);
    }
  });
});

describe("wb-4ap.15 acceptance 2: \"A tampered producer_revision or an unknown schema version yields a typed diagnostic and ingest() is not called.\"", () => {
  const revision = String(envelope(1).producer_revision);
  const TAMPERED: readonly (readonly [string, unknown])[] = [
    ["upper-case hex", revision.toUpperCase().replace("SHA256:", "sha256:")],
    ["one hex digit short", revision.slice(0, -1)],
    ["one hex digit long", `${revision}0`],
    ["no sha256: prefix", revision.slice("sha256:".length)],
    ["another algorithm", revision.replace("sha256:", "sha512:")],
    ["a non-hex digit", `${revision.slice(0, -1)}g`],
    ["a trailing newline", `${revision}${String.fromCodePoint(0x0a)}`],
    ["empty", ""],
    ["a number", 256],
    ["null", null],
  ];
  it.each(TAMPERED)("producer_revision %s: revision-malformed, ingest() not called", (_name, value) => {
    const run = recorded();
    const result = run.ingest({ ...envelope(1), producer_revision: value });
    expect(diagnosticOf(result)).toEqual(refusal("producer_revision", "revision-malformed"));
    untouched(run);
  });

  const UNKNOWN_VERSIONS: readonly (readonly [string, unknown])[] = [
    ["collective.event.v2", "collective.event.v2"],
    ["collective.event.v0", "collective.event.v0"],
    ["a case change", "Collective.Event.V1"],
    ["a trailing space", "collective.event.v1 "],
    ["the bare family", "collective.event"],
    ["a number", 1],
    ["null", null],
  ];
  it.each(UNKNOWN_VERSIONS)("schema %s: schema-unrecognized, ingest() not called", (_name, value) => {
    const run = recorded();
    expect(diagnosticOf(run.ingest({ ...envelope(1), schema: value }))).toEqual(refusal("schema", "schema-unrecognized"));
    untouched(run);
  });

  it("an envelope with no schema member is an unrecognized version, never silent success", () => {
    const run = recorded();
    const rest = Object.fromEntries(Object.entries(envelope(1)).filter(([key]) => key !== "schema"));
    expect(diagnosticOf(run.ingest(rest))).toEqual(refusal("schema", "schema-unrecognized"));
    untouched(run);
  });

  it("an unknown version is refused as a version even when its other members would not read under v1", () => {
    const run = recorded();
    const result = run.ingest({ ...envelope(1), schema: "collective.event.v2", negotiated: true, producer_revision: "v2" });
    expect(diagnosticOf(result)).toEqual(refusal("schema", "schema-unrecognized"));
    untouched(run);
  });

  it("a diagnostic is closed vocabulary only: it never echoes the refused text", () => {
    const planted = "planted-text-0123456789";
    const cases: readonly Envelope[] = [
      { ...envelope(1), producer_revision: `sha256:${planted}` },
      { ...envelope(1), schema: planted },
      { ...envelope(1), [planted]: planted },
      { ...envelope(1), event_id: ` ${planted}` },
    ];
    for (const value of cases) {
      const diagnostic = diagnosticOf(recorded().ingest(value));
      expect(Object.keys(diagnostic).sort()).toEqual(["code", "field", "reason"]);
      expect(COLLECTIVE_EVENT_FIELDS).toContain(diagnostic.field);
      expect(COLLECTIVE_EVENT_REASONS).toContain(diagnostic.reason);
      expect(JSON.stringify(diagnostic)).not.toContain(planted);
    }
  });
});

describe("wb-4ap.15 acceptance 3: \"A causal_parents entry produces no 'causation' edge without a producer-confirmed statement.\"", () => {
  it("the producer's projection: event 2's causal parent becomes one hypothesis relation parent -> event, and no causation edge exists", () => {
    const run = recorded();
    const results = [1, 2, 3].map(n => run.ingest(envelope(n)));
    expect(results.map(result => (result.admitted ? `${result.ingest}:${result.relations.length}` : "refused"))).toEqual(["applied:0", "applied:1", "applied:0"]);
    const parent = collectiveEventRef(String(envelope(1).event_id));
    const child = collectiveEventRef(String(envelope(2).event_id));
    expect(envelope(2).causal_parents).toEqual([envelope(1).event_id]);
    expect(results[1]).toEqual({
      admitted: true,
      ingest: "applied",
      ref: child,
      relations: [{ scope: SCOPE, from: parent, to: child, kind: "hypothesis", provenance: { source: COLLECTIVE_EVENT_PROVIDER, observedAt: OBSERVED_AT } }],
    });
    expect(run.projection.relations({ scope: SCOPE })).toEqual([
      { from: keyOf(parent), to: keyOf(child), kind: "hypothesis", provenance: { source: COLLECTIVE_EVENT_PROVIDER, observedAt: OBSERVED_AT } },
    ]);
  });

  it("many causal parents: one hypothesis relation each, never causation, ownership, grouping or dependency", () => {
    const run = recorded();
    const base = envelope(3);
    const parents = ["episode-a/event:1", "episode-a/event:2", "episode-b/event:9"];
    const result = run.ingest({ ...base, causal_parents: parents });
    if (!result.admitted) throw new Error("expected an admitted envelope");
    expect(result.ingest).toBe("applied");
    expect(result.relations.map(relation => relation.kind)).toEqual(["hypothesis", "hypothesis", "hypothesis"]);
    expect(Object.isFrozen(result.relations)).toBe(true);
    const relations = run.projection.relations({ scope: SCOPE });
    expect(relations.map(relation => relation.kind)).toEqual(["hypothesis", "hypothesis", "hypothesis"]);
    expect(relations.map(relation => relation.from)).toEqual(parents.map(id => keyOf(collectiveEventRef(id))));
    for (const relation of relations) {
      expect(relation.to).toBe(keyOf(collectiveEventRef(String(base.event_id))));
      expect(relation.provenance).toEqual({ source: COLLECTIVE_EVENT_PROVIDER, observedAt: OBSERVED_AT });
    }
  });

  it("an observation-only envelope is never a confirmed-ownership basis: no ownership relation, and no control provider names it", () => {
    const run = recorded();
    for (const n of [1, 2, 3]) run.ingest(envelope(n));
    const kinds = run.projection.relations({ scope: SCOPE }).map(relation => relation.kind);
    expect(kinds).not.toContain("ownership");
    expect(kinds).not.toContain("causation");
    expect(Object.hasOwn(NATIVE_CONTROL_ACTIONS, COLLECTIVE_EVENT_PROVIDER)).toBe(false);
  });

  it("the boundary never states a relation itself: a sink whose relate() throws is never asked, and the statements come back instead", () => {
    const projection = new ObservationProjection();
    const sink = {
      ingest: (event: ObservationEvent) => projection.ingest(event),
      relate: (): never => {
        throw new Error("relate() reached");
      },
    };
    const results = [1, 2, 3].map(n => ingestCollectiveEvent(sink, envelope(n), OPTIONS));
    expect(results.map(result => result.admitted && result.ingest)).toEqual(["applied", "applied", "applied"]);
    expect(projection.relations({ scope: SCOPE })).toEqual([]);
    const second = results[1];
    expect(second?.admitted ? second.relations : []).toEqual(collectiveEventRelations(readEvent(envelope(2)), OPTIONS));
  });

  it("collectiveEventRelations states hypothesis only, one frozen statement per parent, none for an envelope without parents", () => {
    const event = readEvent({ ...envelope(1), causal_parents: ["a/event:1", "b/event:2"] });
    const relations = collectiveEventRelations(event, OPTIONS);
    expect(relations.map(relation => [relation.kind, relation.from.id, relation.to.id])).toEqual([
      ["hypothesis", "a/event:1", event.event_id],
      ["hypothesis", "b/event:2", event.event_id],
    ]);
    expect(relations.every(relation => Object.isFrozen(relation) && relation.provenance.nativeConfirmationRef === undefined)).toBe(true);
    expect(collectiveEventRelations(readEvent(envelope(1)), OPTIONS)).toEqual([]);
  });
});

describe("wb-4ap.15 note 2026-10-17b rows: closed envelope, const status and authority, malformed ids, mode carried verbatim", () => {
  const MISSING = COLLECTIVE_EVENT_MEMBERS.filter(name => name !== "schema");
  it.each(MISSING)("missing %s: member-missing, ingest() not called", name => {
    const run = recorded();
    const value = Object.fromEntries(Object.entries(envelope(1)).filter(([key]) => key !== name));
    expect(diagnosticOf(run.ingest(value))).toEqual(refusal(name, "member-missing"));
    untouched(run);
  });

  const UNEXPECTED: readonly (readonly [string, (value: Envelope) => Envelope, CollectiveEventDiagnostic])[] = [
    ["a member outside the schema", value => ({ ...value, confirmed: true }), refusal("envelope", "member-unexpected")],
    ["a __proto__ member", value => ({ ...value, ...(JSON.parse('{"__proto__":{"authority":"owner"}}') as Envelope) }), refusal("envelope", "member-unexpected")],
    ["an extra episode_root member", value => ({ ...value, episode_root: { ...(value.episode_root as object), mode: "live" } }), refusal("episode_root", "member-unexpected")],
    ["an extra subject member", value => ({ ...value, subject: { ...(value.subject as object), owner: "pi" } }), refusal("subject", "member-unexpected")],
    ["episode_root without digest", value => ({ ...value, episode_root: { id: (value.episode_root as { id: string }).id } }), refusal("episode_root", "member-missing")],
    ["subject without revision", value => ({ ...value, subject: { uri: (value.subject as { uri: string }).uri } }), refusal("subject", "member-missing")],
  ];
  it.each(UNEXPECTED)("%s: refused as typed, ingest() not called", (_name, change, expected) => {
    const run = recorded();
    expect(diagnosticOf(run.ingest(change(envelope(1))))).toEqual(expected);
    untouched(run);
  });

  const CONSTS: readonly (readonly [string, Envelope, CollectiveEventDiagnostic])[] = [
    ["status confirmed", { status: "confirmed" }, refusal("status", "status-not-observed")],
    ["status missing its value", { status: null }, refusal("status", "status-not-observed")],
    ["authority authoritative", { authority: "authoritative" }, refusal("authority", "authority-not-observation-only")],
    ["authority owner", { authority: "owner" }, refusal("authority", "authority-not-observation-only")],
    ["mode production", { mode: "production" }, refusal("mode", "mode-unrecognized")],
    ["mode upper case", { mode: "LIVE" }, refusal("mode", "mode-unrecognized")],
  ];
  it.each(CONSTS)("%s: refused as typed, ingest() not called", (_name, change, expected) => {
    const run = recorded();
    expect(diagnosticOf(run.ingest({ ...envelope(1), ...change }))).toEqual(expected);
    untouched(run);
  });

  const IDS: readonly (readonly [string, Envelope, CollectiveEventDiagnostic])[] = [
    ["event_id with a space", { event_id: "replay:native replay/event:1" }, refusal("event_id", "id-malformed")],
    ["event_id empty", { event_id: "" }, refusal("event_id", "id-malformed")],
    ["event_id 257 characters", { event_id: `e${"x".repeat(256)}` }, refusal("event_id", "id-malformed")],
    ["event_id with a leading hyphen", { event_id: "-event:1" }, refusal("event_id", "id-malformed")],
    ["event_id with a bidi override", { event_id: `event${String.fromCodePoint(0x202e)}1` }, refusal("event_id", "id-malformed")],
    ["episode_id non-ascii", { episode_id: `replay:${String.fromCodePoint(0xe9)}pisode` }, refusal("episode_id", "id-malformed")],
    ["actor_id a number", { actor_id: 7 }, refusal("actor_id", "id-malformed")],
    ["a causal parent with a control", { causal_parents: ["replay:a/event:1", `replay:a/${String.fromCodePoint(0x07)}event:2`] }, refusal("causal_parents", "id-malformed")],
    ["episode_root id malformed", { episode_root: { id: "bad id", digest: `sha256:${"0".repeat(64)}` } }, refusal("episode_root", "id-malformed")],
    ["episode_root digest malformed", { episode_root: { id: "replay:a", digest: "sha256:abc" } }, refusal("episode_root", "revision-malformed")],
  ];
  it.each(IDS)("%s: refused as typed, ingest() not called", (_name, change, expected) => {
    const run = recorded();
    expect(diagnosticOf(run.ingest({ ...envelope(1), ...change }))).toEqual(expected);
    untouched(run);
  });

  const SHAPES: readonly (readonly [string, unknown, CollectiveEventDiagnostic])[] = [
    ["an array envelope", [envelope(1)], refusal("envelope", "wrong-type")],
    ["a null envelope", null, refusal("envelope", "wrong-type")],
    ["a string envelope", JSON.stringify(envelope(1)), refusal("envelope", "wrong-type")],
    ["episode_root a string", { ...envelope(1), episode_root: "replay:a" }, refusal("episode_root", "wrong-type")],
    ["subject an array", { ...envelope(1), subject: ["mw:a", "r"] }, refusal("subject", "wrong-type")],
    ["causal_parents a string", { ...envelope(1), causal_parents: "replay:a/event:1" }, refusal("causal_parents", "wrong-type")],
    ["evidence_refs an object", { ...envelope(1), evidence_refs: { 0: "sha256:x" } }, refusal("evidence_refs", "wrong-type")],
    ["subject uri empty", { ...envelope(1), subject: { uri: "", revision: "r" } }, refusal("subject", "text-malformed")],
    ["subject uri 257 bytes", { ...envelope(1), subject: { uri: "u".repeat(257), revision: "r" } }, refusal("subject", "text-malformed")],
    ["subject revision with a bidi isolate", { ...envelope(1), subject: { uri: "mw:a", revision: `r${String.fromCodePoint(0x2066)}` } }, refusal("subject", "text-malformed")],
    ["an evidence reference with a C0 control", { ...envelope(1), evidence_refs: ["sha256:ok", `bad${String.fromCodePoint(0x01)}ref`] }, refusal("evidence_refs", "text-malformed")],
    ["an evidence reference a number", { ...envelope(1), evidence_refs: [1] }, refusal("evidence_refs", "text-malformed")],
    ["evidence_refs over the bound", { ...envelope(1), evidence_refs: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS + 1 }, (_, n) => `ref-${n}`) }, refusal("evidence_refs", "over-limit")],
    ["causal_parents over the bound", { ...envelope(1), causal_parents: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS + 1 }, (_, n) => `parent-${n}`) }, refusal("causal_parents", "over-limit")],
  ];
  it.each(SHAPES)("%s: refused as typed, ingest() not called", (_name, value, expected) => {
    const run = recorded();
    expect(diagnosticOf(run.ingest(value))).toEqual(expected);
    untouched(run);
  });

  it("the bounds admit their edge: exactly COLLECTIVE_EVENT_MAX_REFS evidence references and causal parents, and 256-byte text", () => {
    const run = recorded();
    const value = {
      ...envelope(1),
      evidence_refs: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS }, (_, n) => `ref-${n}`),
      causal_parents: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS }, (_, n) => `parent-${n}`),
      subject: { uri: "u".repeat(256), revision: "r".repeat(256) },
    };
    expect(run.ingest(value)).toMatchObject({ admitted: true, ingest: "applied" });
    expect(run.related).toHaveLength(COLLECTIVE_EVENT_MAX_REFS);
  });

  it.each(COLLECTIVE_EVENT_MODES)("mode %s is carried verbatim, never read from the episode_id prefix and never upgraded", mode => {
    const run = recorded();
    const value = { ...envelope(1), mode, episode_id: "live:landing-queue:7:restack-first" };
    expect(run.ingest(value)).toMatchObject({ admitted: true, ingest: "applied" });
    const [stored] = run.projection.events({ scope: SCOPE, limit: 1 }).events;
    expect(stored?.trace?.correlationIds?.mode).toBe(mode);
    expect(stored?.trace?.correlationIds?.episode_id).toBe("live:landing-queue:7:restack-first");
  });
});

/**
 * wb-95tn (the R694 follow-up of wb-4ap.15's landing 644; gate cmd_af88b64da162, PREP F1-F3, CONFIRMED there by gate mutants G18,
 * G23 and G26, each re-measured surviving this file's 84 cases at trunk 9ad61f3 before these rows were written). Three behaviours
 * of the boundary that held but were unpinned:
 * F1 THE NAMED RESIDUAL of the wb-4ap.15 park note's owed item 3, "(3) if the negotiation defines a producer pin, refuse a
 *    well-formed but foreign producer_revision (today 'tampered' reads as outside the schema's ^sha256:[0-9a-f]{64}$ contract - a
 *    well-formed foreign revision is the named residual)". Today such a revision is ADMITTED and applied in every mode (fixture,
 *    replay and live) and carried verbatim; the quiet rows below assert exactly that admission, so the cut that adopts a producer
 *    pin from the T0 freeze - for every mode or for live feeds only - flips them into refusal rows (they are the residual's pinned
 *    rows: turned, never deleted).
 * F2 the diagnostic order when the envelope and the host's receipt reference are both bad: the receipt is judged only after the
 *    whole envelope reads, so the envelope's own refusal wins and a refused envelope never reports receipt-missing.
 * F3 duplicate evidence references are kept as given, in order ("every value is the envelope's or the host's own, copied
 *    verbatim", collectiveObservationEvent): the reading, the event handed to ingest(), the node and the stored event carry them.
 */
describe("wb-95tn: the named residual (a well-formed foreign producer_revision), the envelope-before-receipt order and verbatim duplicate evidence", () => {
  const OWN_REVISION = String(envelope(1).producer_revision);
  const OWN_EVIDENCE = String((envelope(1).evidence_refs as readonly unknown[])[0]);
  const ROOT_DIGEST = String((envelope(1).episode_root as { readonly digest: unknown }).digest);
  /** The vendored schema's own producer_revision pattern: the well-formedness anchor outside the boundary's constants. */
  const SCHEMA_REVISION = new RegExp(member(SCHEMA, "producer_revision").pattern ?? "");
  const FOREIGN: readonly (readonly [string, string])[] = [
    ["the all-zero digest", `sha256:${"0".repeat(64)}`],
    ["the all-f digest", `sha256:${"f".repeat(64)}`],
    ["the producer's own revision with its last digit changed", `${OWN_REVISION.slice(0, -1)}${OWN_REVISION.endsWith("0") ? "1" : "0"}`],
    ["the episode root's digest", ROOT_DIGEST],
  ];
  it.each(FOREIGN)("RESIDUAL F1 (quiet row): a well-formed foreign producer_revision, %s, is admitted and applied today in every mode and carried verbatim - a producer pin from the T0 freeze flips this row", (_name, foreign) => {
    expect(SCHEMA_REVISION.test(foreign)).toBe(true);
    expect(foreign).not.toBe(OWN_REVISION);
    expect(COLLECTIVE_EVENT_MODES.length).toBeGreaterThan(0);
    for (const mode of COLLECTIVE_EVENT_MODES) {
      const value = { ...envelope(1), mode, producer_revision: foreign };
      expect(readEvent(value).producer_revision).toBe(foreign);
      const run = recorded();
      expect(run.ingest(value)).toEqual({ admitted: true, ingest: "applied", ref: collectiveEventRef(String(envelope(1).event_id)), relations: [] });
      expect(run.results).toEqual(["applied"]);
      expect(run.ingested.map(event => [event.trace?.correlationIds?.mode, event.trace?.correlationIds?.producer_revision])).toEqual([[mode, foreign]]);
      const [stored] = run.projection.events({ scope: SCOPE, limit: 10 }).events;
      expect(stored?.trace?.correlationIds?.producer_revision).toBe(foreign);
    }
  });

  const BAD_RECEIPTS: readonly string[] = ["", String.fromCodePoint(0x202e)];
  const BOTH_BAD: readonly (readonly [string, unknown, CollectiveEventDiagnostic])[] = [
    ["an unknown version (the first member the reading judges)", { ...envelope(1), schema: "collective.event.v2" }, refusal("schema", "schema-unrecognized")],
    ["a null envelope", null, refusal("envelope", "wrong-type")],
    ["a tampered producer_revision", { ...envelope(1), producer_revision: "sha256:abc" }, refusal("producer_revision", "revision-malformed")],
    ["authority owner (the last member the reading judges)", { ...envelope(1), authority: "owner" }, refusal("authority", "authority-not-observation-only")],
  ];
  it.each(BOTH_BAD)("ORDER F2: %s beside a bad receipt reference - the envelope's own refusal wins over receipt-missing, and ingest() is not called", (_name, value, expected) => {
    for (const receiptRef of BAD_RECEIPTS) {
      const run = recorded();
      expect(diagnosticOf(run.ingest(value, { ...OPTIONS, receiptRef }))).toEqual(expected);
      untouched(run);
    }
  });

  it("ORDER F2 control: the same bad receipt references beside a well-formed envelope read receipt-missing, so the order, not a lost receipt check, decides the rows above", () => {
    for (const receiptRef of BAD_RECEIPTS) {
      const run = recorded();
      expect(diagnosticOf(run.ingest(envelope(1), { ...OPTIONS, receiptRef }))).toEqual(refusal("receipt", "receipt-missing"));
      untouched(run);
    }
  });

  it("DUPLICATES F3: duplicate evidence references are copied verbatim - kept, in order, by the reading, the event handed to ingest(), the node and the stored event", () => {
    const second = `sha256:${"e".repeat(64)}`;
    const refs = [OWN_EVIDENCE, OWN_EVIDENCE, second, OWN_EVIDENCE];
    expect(new Set(refs).size).toBe(2);
    const value = { ...envelope(1), evidence_refs: refs };
    expect(readEvent(value).evidence_refs).toEqual(refs);
    const run = recorded();
    expect(run.ingest(value)).toMatchObject({ admitted: true, ingest: "applied" });
    expect(run.ingested.map(event => event.evidenceRefs)).toEqual([refs]);
    const [node] = run.projection.query({ scope: SCOPE, limit: 1 }).nodes;
    expect(node?.evidenceRefs).toEqual(refs);
    const [stored] = run.projection.events({ scope: SCOPE, limit: 1 }).events;
    expect(stored?.evidenceRefs).toEqual(refs);
  });
});

/**
 * wb-ctnw (the R694 follow-up of wb-95tn's landing 694; gate cmd_051ba6dde937, PREP PF1, CONFIRMED there by measurement on
 * probe fbfe927d): "pin the envelope-wins-over-receipt-missing order for every refusal field of the collective-event reading,
 * not only the 4 that the order rows sample". The ORDER F2 rows above sample 4 of the reading's 13 refusal fields (envelope,
 * schema, producer_revision, authority), so the per-field precedence plant GP-B8 - receipt-missing wins only over a refusal on
 * one field - reds them on each sampled field and survives them on the 9 others (episode_id, mode, episode_root, event_id,
 * actor_id, subject, causal_parents, evidence_refs, status).
 * The rows below iterate every refusal arm readCollectiveEvent has at this base: each of its 21 refusals with a literal field
 * and reason, the member-missing loop once per member it can reach (11: an absent schema is refused as a version first) and
 * closedMembers' two reasons at each of its two sites (episode_root, subject), 36 arms. Three of those arms also get a row for
 * each further way they refuse: the not-a-plain-object arm as null, as an array and as a string; the version arm with its
 * member absent and foreign; the subject-text arm on its uri and on its revision - 40 rows. Each row stands beside both bad
 * receipt references (the empty string and U+202E), the PD3 shape, and first reads its value alone, so the row is anchored
 * to the refusal it names.
 * ENFORCED here: every refusal field and reason the boundary names but the receipt's own (COLLECTIVE_EVENT_FIELDS,
 * COLLECTIVE_EVENT_REASONS) has a row, so each per-field precedence plant meets one, and the member-missing rows are derived
 * from COLLECTIVE_EVENT_MEMBERS (an absent schema excepted); a field or reason the boundary names later with no row here reds
 * the coverage row, and a member it gains later gets its member-missing row by that derivation. DESCRIBED, not enforced: the
 * one-row-per-arm correspondence above, read from the reading at this base.
 * NOT CLAIMED: these are behaviour rows like the ORDER F2 rows above, not a frozen table - a refusal arm the reading gains
 * later on a field and reason that already have a row, or a row removed while its field and reason keep another, is not
 * detected here; the further failure modes inside a predicate (isId, isRevision, isMode, isText) are not iterated one by one.
 */
describe("wb-ctnw: the envelope-before-receipt order for every refusal arm of the reading, each beside both bad receipt references", () => {
  const BAD_RECEIPTS: readonly string[] = ["", String.fromCodePoint(0x202e)];
  const ROOT = envelope(1).episode_root as { readonly id: string; readonly digest: string };
  const SUBJECT = envelope(1).subject as { readonly uri: string; readonly revision: string };
  const without = (name: string): Envelope => Object.fromEntries(Object.entries(envelope(1)).filter(([key]) => key !== name));
  const ARMS: readonly (readonly [string, unknown, CollectiveEventDiagnostic])[] = [
    ["a null envelope (not a plain object)", null, refusal("envelope", "wrong-type")],
    ["an array envelope (not a plain object)", [envelope(1)], refusal("envelope", "wrong-type")],
    ["a string envelope (not a plain object)", JSON.stringify(envelope(1)), refusal("envelope", "wrong-type")],
    ["no schema member (the version, absent)", without("schema"), refusal("schema", "schema-unrecognized")],
    ["an unknown version (the version, foreign)", { ...envelope(1), schema: "collective.event.v2" }, refusal("schema", "schema-unrecognized")],
    ["a member outside the schema", { ...envelope(1), confirmed: true }, refusal("envelope", "member-unexpected")],
    ...COLLECTIVE_EVENT_MEMBERS.filter(name => name !== "schema").map((name): readonly [string, unknown, CollectiveEventDiagnostic] => [`no ${name} member`, without(name), refusal(name, "member-missing")]),
    ["episode_id malformed", { ...envelope(1), episode_id: "bad id" }, refusal("episode_id", "id-malformed")],
    ["mode unrecognized", { ...envelope(1), mode: "production" }, refusal("mode", "mode-unrecognized")],
    ["episode_root not a plain object", { ...envelope(1), episode_root: ROOT.id }, refusal("episode_root", "wrong-type")],
    ["episode_root with a member outside its set", { ...envelope(1), episode_root: { ...ROOT, mode: "live" } }, refusal("episode_root", "member-unexpected")],
    ["episode_root without its digest", { ...envelope(1), episode_root: { id: ROOT.id } }, refusal("episode_root", "member-missing")],
    ["episode_root id malformed", { ...envelope(1), episode_root: { id: "bad id", digest: ROOT.digest } }, refusal("episode_root", "id-malformed")],
    ["episode_root digest malformed", { ...envelope(1), episode_root: { id: ROOT.id, digest: "sha256:abc" } }, refusal("episode_root", "revision-malformed")],
    ["event_id malformed", { ...envelope(1), event_id: "" }, refusal("event_id", "id-malformed")],
    ["actor_id malformed", { ...envelope(1), actor_id: 7 }, refusal("actor_id", "id-malformed")],
    ["producer_revision malformed", { ...envelope(1), producer_revision: "sha256:abc" }, refusal("producer_revision", "revision-malformed")],
    ["subject not a plain object", { ...envelope(1), subject: [SUBJECT.uri, SUBJECT.revision] }, refusal("subject", "wrong-type")],
    ["subject with a member outside its set", { ...envelope(1), subject: { ...SUBJECT, owner: "pi" } }, refusal("subject", "member-unexpected")],
    ["subject without its revision", { ...envelope(1), subject: { uri: SUBJECT.uri } }, refusal("subject", "member-missing")],
    ["subject uri empty", { ...envelope(1), subject: { uri: "", revision: SUBJECT.revision } }, refusal("subject", "text-malformed")],
    ["subject revision empty", { ...envelope(1), subject: { uri: SUBJECT.uri, revision: "" } }, refusal("subject", "text-malformed")],
    ["causal_parents not an array", { ...envelope(1), causal_parents: "replay:a/event:1" }, refusal("causal_parents", "wrong-type")],
    ["causal_parents over the bound", { ...envelope(1), causal_parents: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS + 1 }, (_, n) => `parent-${n}`) }, refusal("causal_parents", "over-limit")],
    ["a causal parent malformed", { ...envelope(1), causal_parents: ["replay:a/event:1", "bad id"] }, refusal("causal_parents", "id-malformed")],
    ["evidence_refs not an array", { ...envelope(1), evidence_refs: { 0: "sha256:x" } }, refusal("evidence_refs", "wrong-type")],
    ["evidence_refs over the bound", { ...envelope(1), evidence_refs: Array.from({ length: COLLECTIVE_EVENT_MAX_REFS + 1 }, (_, n) => `ref-${n}`) }, refusal("evidence_refs", "over-limit")],
    ["an evidence reference empty", { ...envelope(1), evidence_refs: ["sha256:ok", ""] }, refusal("evidence_refs", "text-malformed")],
    ["status not observed", { ...envelope(1), status: "confirmed" }, refusal("status", "status-not-observed")],
    ["authority not observation-only", { ...envelope(1), authority: "owner" }, refusal("authority", "authority-not-observation-only")],
  ];

  it("COVERAGE: every refusal field and reason the boundary names but the receipt's own has a row below, the member-missing rows are the members' own, and both receipt references read receipt-missing beside a well-formed envelope", () => {
    expect([...new Set(ARMS.map(([, , expected]) => expected.field))].sort()).toEqual(COLLECTIVE_EVENT_FIELDS.filter(field => field !== "receipt").sort());
    expect([...new Set(ARMS.map(([, , expected]) => expected.reason))].sort()).toEqual(COLLECTIVE_EVENT_REASONS.filter(reason => reason !== "receipt-missing").sort());
    expect(ARMS.filter(([name]) => name.startsWith("no ") && name.endsWith(" member")).map(([, , expected]) => expected.field)).toEqual(COLLECTIVE_EVENT_MEMBERS.filter(name => name !== "schema"));
    expect(BAD_RECEIPTS).toEqual(["", String.fromCodePoint(0x202e)]);
    for (const receiptRef of BAD_RECEIPTS) {
      const run = recorded();
      expect(diagnosticOf(run.ingest(envelope(1), { ...OPTIONS, receiptRef }))).toEqual(refusal("receipt", "receipt-missing"));
      untouched(run);
    }
  });

  it.each(ARMS)("ORDER (every arm): %s beside each bad receipt reference - the envelope's own refusal wins over receipt-missing, and ingest() is not called", (_name, value, expected) => {
    expect(readCollectiveEvent(value)).toEqual({ ok: false, diagnostic: expected });
    for (const receiptRef of BAD_RECEIPTS) {
      const run = recorded();
      expect(diagnosticOf(run.ingest(value, { ...OPTIONS, receiptRef }))).toEqual(expected);
      untouched(run);
    }
  });
});
