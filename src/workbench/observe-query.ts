/**
 * W16-B / VC-4: the pure, bounded reply builder behind the read-only Pi tool workflow_observe
 * (docs/workbench/11 § "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded
 * native snapshot, event window, aggregates, freshness, anomaly evidence.").
 *
 * observeInvocation is a synchronous function of one ObserveReader and one request whose scope the host has already
 * authorized; the ACL (grants, session/workspace/principal checks) stays with the registered tool in src/index.ts.
 * Per call it reads one viewport window, at most one 40-row outgoing relation page per returned node, one bounded
 * event window and, when asked, one bounded page of the request scope's typed identity refusals (wb-86q). It never
 * ingests, refreshes, relates, marks stale, reconnects or reaches a provider: an observation stays a read.
 *
 * Hygiene: every string of a reply passes the one shared helper, sanitizeWorkbenchText in redaction.ts (wb-952 census
 * site 22): it normalizes once, redacts every credential any reading of the unsafe units exposes (a unit between two
 * tokens separates, a unit inside a keyword or token glues; deletion never precedes redaction) and strips once. Each
 * string is repeated through it until that is a no-op, so the reply is a fixed point of sanitizeWorkbenchJsonText and
 * `bytes` is measured through it: exactly the size of the text the tool emits.
 *
 * Honesty: counts describe the returned window only (countsBasis "returned-window"); aggregates stay "not-wired"
 * until the ancestor-aggregate read model is wired; nothing is estimated. Over the byte cap the reply drops events,
 * then identity refusals, then relations, then nodes from the tail, says so in truncatedForBytes and droppedForBytes,
 * and points nextCursor at the first dropped node; window, freshness and anomalies are never dropped.
 *
 * Identity refusals (wb-86q, the wb-0br F5 follow-up): the projection's own rows for the request scope, read only when
 * selectors.identityRefusals asks. Every value is closed vocabulary (the admission path, the reference, the identity
 * field, the first unsafe code point and the reason), so no producer text reaches the reply; a row a reader hands over
 * outside that vocabulary is withheld and counted, never repaired.
 *
 * Cursor: opaque base64url of the canonical JSON { v: 1, offset, invocationId, scope, revision }. Beyond the
 * offset and invocation it binds a tag of the request scope (FNV-1a over the workspace/principal pair; a binding
 * check, not a secret, since every read is scope-isolated anyway) and the projection revision it was read at, so a
 * cursor is refused in another scope or invocation and refused as out-of-order when it claims a revision the
 * projection has not reached. Malformed, non-canonical, negative, non-integer and over-256-byte cursors are refused
 * with CapabilityError("validation"); none is ever a silent restart at offset 0.
 */
import { CapabilityError } from "./capability-registry.js";
import {
  type IdentityRefusal,
  type Interval,
  type NativeRef,
  type ObservationProjection,
  type ObservationScope,
  type ObservedNode,
  type Presentation,
  type RelationKind,
  unsafeIdentityUnit,
} from "./observation.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";

export const OBSERVE_CONTRACT = "workbench.observe/v1";
export const OBSERVE_DEFAULT_LIMIT = 20;
export const OBSERVE_MAX_LIMIT = 40;
export const OBSERVE_DEFAULT_MAX_BYTES = 16_384;
export const OBSERVE_MIN_MAX_BYTES = 1_024;
export const OBSERVE_MAX_MAX_BYTES = 65_536;
export const OBSERVE_CURSOR_MAX_BYTES = 256;
/** Outgoing relation rows read per returned node. A full page is reported partial, never re-read with a larger limit. */
export const OBSERVE_RELATION_PAGE = 40;
export const OBSERVE_MAX_EVIDENCE_REFS = 20;
/** Presentation title and statusText bound (sanitizeWorkbenchText(value, 200)). */
const TEXT_LIMIT = 200;
/** The projection's own bound for native reference parts; also used for kinds, bases and evidence references. */
const REFERENCE_LIMIT = 256;
/** The projection's bound for a timezone-qualified timestamp. */
const INSTANT_LIMIT = 64;
/** sanitizeWorkbenchJsonText's default text bound, which the registered tool serializes with; it bounds projection keys. */
const JSON_TEXT_LIMIT = 2_000;
const REDACTED = "[REDACTED]";
const TONES: readonly Presentation["statusTone"][] = ["active", "success", "failure", "waiting", "unknown"];
const PRESENTATION_TYPES: readonly Presentation["type"][] = ["workflow", "agent", "sdk-operation", "group"];
const FRESHNESS: readonly ObservedNode["freshness"][] = ["current", "stale", "unknown"];
const COMPLETENESS: readonly ObservedNode["completeness"][] = ["complete", "partial", "unknown"];
const CONNECTION: readonly ObservedNode["sourceConnectionState"][] = ["connected", "disconnected", "unknown"];
const RELATION_KINDS: readonly RelationKind[] = ["dependency", "causation", "ownership", "grouping", "hypothesis"];
const REFUSAL_PATHS: readonly IdentityRefusal["path"][] = ["ingest", "refresh", "relate", "markStale"];
const REFUSAL_REFS: readonly IdentityRefusal["ref"][] = ["source", "from", "to", "ref"];
const REFUSAL_FIELDS: readonly IdentityRefusal["field"][] = ["provider", "type", "id", "scope"];
/** The projection's code point form: "U+" and four to six uppercase hex digits. */
const CODE_POINT = /^U\+([0-9A-F]{4,6})$/;
const CURSOR_FIELDS = "v,offset,invocationId,scope,revision";
/** The projection's reference rule: no C0 control character and no DEL. */
const CONTROL = /[\u0000-\u001f\u007f]/;

/**
 * The read methods of ObservationProjection this builder may call; nothing else is reachable through it. identityRefusals
 * is optional so a reader written before it still serves every other selector; asked for refusals, such a reader is
 * refused typed "unavailable", never answered with an empty page.
 */
export type ObserveReader = Pick<ObservationProjection, "window" | "relations" | "events" | "relationRevision" | "stats"> &
  Partial<Pick<ObservationProjection, "identityRefusals">>;

/** A source-qualified event position, passed through to ObservationProjection.events({after}). */
export interface ObserveEventCursor {
  readonly source: NativeRef;
  readonly projectionEventId: string;
}

export interface ObserveSelectors {
  /** Keep only returned nodes whose presentation.statusTone is this tone (applied to each scanned page). */
  readonly tone?: Presentation["statusTone"];
  /** Keep only returned nodes of this exact native kind (applied to each scanned page). */
  readonly kind?: string;
  /** Count each returned node's outgoing relations (one page of at most 40 rows per node). */
  readonly relations?: boolean;
  /** Summarize one bounded event window of the request scope (1..40 events, optionally after a cursor). */
  readonly events?: { readonly limit: number; readonly after?: ObserveEventCursor };
  /** Return one bounded page (1..40 rows) of the request scope's typed identity refusals (wb-86q). */
  readonly identityRefusals?: { readonly limit: number };
}

export interface ObserveRequest {
  /** Already authorized by the host; only workspace and principal are read. */
  readonly scope: ObservationScope;
  readonly invocationId: string;
  readonly cursor?: string;
  /** 1..40, default 20. */
  readonly limit?: number;
  readonly selectors?: ObserveSelectors;
  /** 1024..65536, default 16384. */
  readonly maxBytes?: number;
}

export interface ObserveNode {
  readonly key: string;
  readonly nativeRef: Readonly<NativeRef>;
  readonly kind: string;
  /** Native statusText beside the derived statusTone; the tone never replaces it. */
  readonly presentation: Readonly<Presentation>;
  readonly freshness: ObservedNode["freshness"];
  readonly completeness: ObservedNode["completeness"];
  readonly sourceConnectionState: ObservedNode["sourceConnectionState"];
  readonly observedAt: string;
  readonly lastConfirmedAt?: string;
  readonly subjectBasis?: string;
  readonly interval?: Readonly<Interval>;
  /** At most 20, each sanitized; never a payload reference or body. */
  readonly evidenceRefs: readonly string[];
  readonly evidenceTruncated: boolean;
}

export interface ObserveRelationCount {
  readonly key: string;
  readonly outgoing: Readonly<Record<RelationKind, number>>;
  /** The 40-row page came back full, or carried a row of an unknown kind: more edges may exist than are counted. */
  readonly partial: boolean;
}

export interface ObserveRelations {
  readonly perNode: readonly ObserveRelationCount[];
  readonly basis: "returned-window-only";
  /** relationRevision() at read time: a revision of the observed topology only. */
  readonly revision: number;
}

export interface ObserveEvents {
  readonly returned: number;
  readonly truncated: boolean;
  readonly completeness: "complete" | "partial-gap";
  /** Counts by sanitized event kind; a kind the shared JSON sanitizer treats as a secret field name counts as "[REDACTED]". */
  readonly kinds: Readonly<Record<string, number>>;
  readonly providers: readonly string[];
  /** The projection's retained event window of the whole request scope (oldest first, or after the given cursor). */
  readonly basis: "scope-event-window";
}

/**
 * The request scope's typed identity refusals (wb-0br rows, surfaced by wb-86q). A refused input made no node, event or
 * edge, so these rows can explain a window that is short or empty; they never carry the refused text.
 */
export interface ObserveIdentityRefusals {
  /** Rows in this reply, oldest retained first. */
  readonly returned: number;
  /** Every identity refusal the projection counted for the request scope, retained or not. */
  readonly total: number;
  /** More retained rows exist than this page returned. */
  readonly truncated: boolean;
  /** Rows the reader handed over outside the closed vocabulary: withheld from rows, never repaired. */
  readonly unrecognized: number;
  readonly rows: readonly Readonly<IdentityRefusal>[];
  /** The projection's retained refusal rows of the whole request scope; a row names no invocation. */
  readonly basis: "scope-refusal-window";
}

export interface ObserveFreshness {
  readonly current: number;
  readonly stale: number;
  readonly unknown: number;
  /** Returned nodes whose tone is "active" but whose freshness is not "current". */
  readonly lastKnownRunningStale: number;
  readonly summary: string;
}

export interface ObserveAnomalies {
  readonly disconnectedProviders: readonly string[];
  readonly partialCompleteness: number;
  readonly eventGap: boolean;
  /** Relations were read and no returned node has an observed outgoing edge; absence is not independence. */
  readonly noRelationsAvailable: boolean;
}

export interface ObserveWindow {
  readonly offset: number;
  readonly limit: number;
  /** Viewport rows this reply consumed from offset; the next page starts at offset + scanned. */
  readonly scanned: number;
  readonly returned: number;
  readonly total: number;
  readonly revision: number;
  readonly nextCursor: string | null;
  readonly truncated: boolean;
}

/** The explicit byte-cap marker: what was read but left out of this reply. */
export interface ObserveDropped {
  readonly events: boolean;
  /** Present exactly when selectors.identityRefusals was given. */
  readonly identityRefusals?: boolean;
  readonly relations: boolean;
  readonly nodes: number;
}

export interface ObserveReply {
  readonly contract: typeof OBSERVE_CONTRACT;
  readonly invocationId: string;
  readonly window: ObserveWindow;
  readonly nodes: readonly ObserveNode[];
  readonly relations?: ObserveRelations;
  readonly events?: ObserveEvents;
  readonly identityRefusals?: ObserveIdentityRefusals;
  readonly freshness: ObserveFreshness;
  readonly anomalies: ObserveAnomalies;
  readonly aggregates: "not-wired";
  readonly countsBasis: "returned-window";
  readonly bytes: number;
  readonly truncatedForBytes: boolean;
  readonly droppedForBytes: ObserveDropped;
}

interface Plan {
  readonly scope: ObservationScope;
  readonly tag: string;
  readonly invocationId: string;
  readonly cursor?: string;
  readonly limit: number;
  readonly tone?: Presentation["statusTone"];
  readonly kind?: string;
  readonly relations: boolean;
  readonly events?: { readonly limit: number; readonly after?: ObserveEventCursor };
  readonly identityRefusals?: { readonly limit: number };
  readonly maxBytes: number;
}

interface Picked {
  /** Row position within the scanned page. */
  readonly index: number;
  /** The reader's own key, used only to ask the reader for this node's relations. */
  readonly rawKey: string;
  readonly node: ObserveNode;
}

interface Gathered {
  readonly plan: Plan;
  readonly offset: number;
  readonly pageRows: number;
  readonly total: number;
  readonly revision: number;
  readonly picked: readonly Picked[];
  readonly outgoing?: readonly ObserveRelationCount[];
  readonly relationRevision?: number;
  readonly events?: ObserveEvents;
  readonly identityRefusals?: ObserveIdentityRefusals;
}

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Observe request refused: ${message}.`);
const unavailable = (what: string): CapabilityError => new CapabilityError("unavailable", `Observation reader returned an invalid ${what}.`);
const malformed = (): CapabilityError => refused("Malformed observe cursor (not one this tool issued)");
const record = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const integer = (value: unknown, min: number, max: number): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= min && value <= max;
const count = (value: unknown): value is number => integer(value, 0, Number.MAX_SAFE_INTEGER);
const reference = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0 && Buffer.byteLength(value, "utf8") <= REFERENCE_LIMIT && !CONTROL.test(value);
const member = <T extends string>(values: readonly T[], value: unknown, fallback: T): T => values.find((candidate) => candidate === value) ?? fallback;
const inScope = (scope: ObservationScope | undefined, expected: ObservationScope): boolean =>
  scope?.workspace === expected.workspace && scope?.principal === expected.principal;
const byCodeUnit = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/**
 * One producer string bound for the model: the one shared helper, repeated until it is a no-op. After the first pass no
 * unsafe unit is left, so later passes are the plain redactor (idempotent or over-redacting only, wb-3l3) or remove the
 * half of a surrogate pair a length bound orphaned.
 */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  let text = sanitizeWorkbenchText(value, max);
  for (;;) {
    const next = sanitizeWorkbenchText(text, max);
    if (next === text) return text;
    text = next;
  }
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

/** FNV-1a (32-bit) over the UTF-8 workspace/principal pair: binds a cursor to the scope that read it. */
function scopeTag(scope: ObservationScope): string {
  let hash = 0x811c9dc5;
  for (const byte of Buffer.from(JSON.stringify([scope.workspace, scope.principal]), "utf8")) hash = Math.imul(hash ^ byte, 0x01000193) >>> 0;
  return hash.toString(16).padStart(8, "0");
}

function mint(offset: number, invocationId: string, tag: string, revision: number): string {
  return Buffer.from(JSON.stringify({ v: 1, offset, invocationId, scope: tag, revision }), "utf8").toString("base64url");
}

function known(value: Record<string, unknown>, fields: readonly string[], what: string): void {
  for (const field of Object.keys(value)) {
    if (!fields.includes(field)) throw refused(`Unknown observe ${what} field ${JSON.stringify(clean(field, 64))}`);
  }
}

function eventSelector(events: unknown): NonNullable<Plan["events"]> {
  if (!record(events)) throw refused(`selectors.events must be an object with an event limit 1..${OBSERVE_MAX_LIMIT}`);
  known(events, ["limit", "after"], "event selector");
  const { limit, after } = events;
  if (!integer(limit, 1, OBSERVE_MAX_LIMIT)) throw refused(`selectors.events needs an event limit that is a safe integer 1..${OBSERVE_MAX_LIMIT}`);
  if (after === undefined) return { limit };
  const shape = "selectors.events.after is an event cursor of {source: {provider, type, id, scope?}, projectionEventId}";
  if (!record(after)) throw refused(shape);
  known(after, ["source", "projectionEventId"], "event cursor");
  const { source, projectionEventId } = after;
  if (!record(source) || !reference(projectionEventId)) throw refused(shape);
  known(source, ["provider", "type", "id", "scope"], "event cursor source");
  const { provider, type, id, scope } = source;
  if (!reference(provider) || !reference(type) || !reference(id) || (scope !== undefined && !reference(scope))) throw refused(shape);
  return { limit, after: { source: { provider, type, id, ...(scope === undefined ? {} : { scope }) }, projectionEventId } };
}

function refusalSelector(selector: unknown): NonNullable<Plan["identityRefusals"]> {
  if (!record(selector)) throw refused(`selectors.identityRefusals must be an object with a refusal limit 1..${OBSERVE_MAX_LIMIT}`);
  known(selector, ["limit"], "identity refusal selector");
  const { limit } = selector;
  if (!integer(limit, 1, OBSERVE_MAX_LIMIT)) throw refused(`selectors.identityRefusals needs a refusal limit that is a safe integer 1..${OBSERVE_MAX_LIMIT}`);
  return { limit };
}

function selectorsOf(selectors: unknown): Pick<Plan, "tone" | "kind" | "relations" | "events" | "identityRefusals"> {
  if (selectors === undefined) return { relations: false };
  if (!record(selectors)) throw refused("selectors must be an object");
  known(selectors, ["tone", "kind", "relations", "events", "identityRefusals"], "selector");
  const { tone, kind, relations, events, identityRefusals } = selectors;
  if (tone !== undefined && !TONES.some((candidate) => candidate === tone)) throw refused(`selectors.tone must be one of ${TONES.join(", ")}`);
  if (kind !== undefined && !reference(kind)) throw refused(`selectors.kind must be a non-empty string of at most ${REFERENCE_LIMIT} bytes without control characters`);
  if (relations !== undefined && typeof relations !== "boolean") throw refused("selectors.relations must be a boolean");
  return {
    ...(tone === undefined ? {} : { tone: member(TONES, tone, "unknown") }),
    ...(kind === undefined ? {} : { kind }),
    relations: relations === true,
    ...(events === undefined ? {} : { events: eventSelector(events) }),
    ...(identityRefusals === undefined ? {} : { identityRefusals: refusalSelector(identityRefusals) }),
  };
}

function planOf(request: unknown): Plan {
  if (!record(request)) throw refused("the request must be an object");
  known(request, ["scope", "invocationId", "cursor", "limit", "selectors", "maxBytes"], "request");
  const { scope, invocationId, cursor, limit, selectors, maxBytes } = request;
  if (!record(scope) || !reference(scope.workspace) || !reference(scope.principal)) {
    throw refused(`scope needs a workspace and a principal of at most ${REFERENCE_LIMIT} bytes without control characters`);
  }
  const normalized: ObservationScope = { workspace: scope.workspace, principal: scope.principal };
  const tag = scopeTag(normalized);
  if (
    typeof invocationId !== "string" ||
    invocationId.length === 0 ||
    clean(invocationId, REFERENCE_LIMIT) !== invocationId ||
    Buffer.byteLength(mint(Number.MAX_SAFE_INTEGER, invocationId, tag, Number.MAX_SAFE_INTEGER), "utf8") > OBSERVE_CURSOR_MAX_BYTES
  ) {
    throw refused(`invocationId must be a non-empty display-safe string whose largest cursor fits ${OBSERVE_CURSOR_MAX_BYTES} bytes`);
  }
  if (cursor !== undefined && typeof cursor !== "string") throw refused("cursor must be a string");
  if (limit !== undefined && !integer(limit, 1, OBSERVE_MAX_LIMIT)) throw refused(`limit must be a safe integer 1..${OBSERVE_MAX_LIMIT}`);
  if (maxBytes !== undefined && !integer(maxBytes, OBSERVE_MIN_MAX_BYTES, OBSERVE_MAX_MAX_BYTES)) {
    throw refused(`maxBytes must be a safe integer ${OBSERVE_MIN_MAX_BYTES}..${OBSERVE_MAX_MAX_BYTES}`);
  }
  return {
    scope: normalized,
    tag,
    invocationId,
    ...(cursor === undefined ? {} : { cursor }),
    limit: limit ?? OBSERVE_DEFAULT_LIMIT,
    ...selectorsOf(selectors),
    maxBytes: maxBytes ?? OBSERVE_DEFAULT_MAX_BYTES,
  };
}

/** Decode an issued cursor. Anything that is not byte-for-byte the canonical form this module mints is refused. */
function positionOf(cursor: string, plan: Plan): { readonly offset: number; readonly revision: number } {
  if (Buffer.byteLength(cursor, "utf8") > OBSERVE_CURSOR_MAX_BYTES) throw refused(`cursor exceeds ${OBSERVE_CURSOR_MAX_BYTES} bytes`);
  const text = Buffer.from(cursor, "base64url").toString("utf8");
  if (cursor === "" || Buffer.from(text, "utf8").toString("base64url") !== cursor) throw malformed();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw malformed();
  }
  if (!record(body) || Object.keys(body).join(",") !== CURSOR_FIELDS || JSON.stringify(body) !== text || body.v !== 1) throw malformed();
  const { offset, revision } = body;
  if (!count(offset)) throw refused("cursor offset must be a nonnegative safe integer");
  if (!count(revision)) throw refused("cursor revision must be a nonnegative safe integer");
  if (body.scope !== plan.tag) throw refused("cursor belongs to another scope");
  if (body.invocationId !== plan.invocationId) throw refused("cursor belongs to another invocation");
  return { offset, revision };
}

function shaped(row: ObservedNode): ObserveNode {
  const { nativeRef, presentation, interval, evidenceRefs } = row;
  return {
    key: clean(row.key, JSON_TEXT_LIMIT),
    nativeRef: {
      provider: clean(nativeRef.provider, REFERENCE_LIMIT),
      type: clean(nativeRef.type, REFERENCE_LIMIT),
      id: clean(nativeRef.id, REFERENCE_LIMIT),
      ...(nativeRef.scope === undefined ? {} : { scope: clean(nativeRef.scope, REFERENCE_LIMIT) }),
    },
    kind: clean(row.kind, REFERENCE_LIMIT),
    presentation: {
      title: clean(presentation.title, TEXT_LIMIT),
      type: member(PRESENTATION_TYPES, presentation.type, "sdk-operation"),
      statusText: clean(presentation.statusText, TEXT_LIMIT),
      statusTone: member(TONES, presentation.statusTone, "unknown"),
    },
    freshness: member(FRESHNESS, row.freshness, "unknown"),
    completeness: member(COMPLETENESS, row.completeness, "unknown"),
    sourceConnectionState: member(CONNECTION, row.sourceConnectionState, "unknown"),
    observedAt: clean(row.observedAt, INSTANT_LIMIT),
    ...(row.lastConfirmedAt === undefined ? {} : { lastConfirmedAt: clean(row.lastConfirmedAt, INSTANT_LIMIT) }),
    ...(row.subjectBasis === undefined ? {} : { subjectBasis: clean(row.subjectBasis, REFERENCE_LIMIT) }),
    ...(interval === undefined
      ? {}
      : {
          interval: {
            startedAt: clean(interval.startedAt, INSTANT_LIMIT),
            ...(interval.endedAt === undefined ? {} : { endedAt: clean(interval.endedAt, INSTANT_LIMIT) }),
          },
        }),
    evidenceRefs: evidenceRefs.slice(0, OBSERVE_MAX_EVIDENCE_REFS).map((evidence) => clean(evidence, REFERENCE_LIMIT)),
    evidenceTruncated: evidenceRefs.length > OBSERVE_MAX_EVIDENCE_REFS,
  };
}

/** Rows outside the request scope are never returned, even from a reader that hands them over. */
function admits(row: ObservedNode, plan: Plan): boolean {
  return (
    inScope(row.scope, plan.scope) &&
    (plan.tone === undefined || member(TONES, row.presentation.statusTone, "unknown") === plan.tone) &&
    (plan.kind === undefined || row.kind === plan.kind)
  );
}

function outgoingOf(reader: ObserveReader, plan: Plan, row: Picked): ObserveRelationCount {
  const outgoing: Record<RelationKind, number> = { dependency: 0, causation: 0, ownership: 0, grouping: 0, hypothesis: 0 };
  const edges = reader.relations({ scope: plan.scope, from: row.rawKey, limit: OBSERVE_RELATION_PAGE }).slice(0, OBSERVE_RELATION_PAGE);
  let partial = edges.length >= OBSERVE_RELATION_PAGE;
  for (const edge of edges) {
    const kind = RELATION_KINDS.find((candidate) => candidate === edge.kind);
    if (kind === undefined) partial = true;
    else outgoing[kind] += 1;
  }
  return { key: row.node.key, outgoing, partial };
}

/** A count label for an event kind; one the shared JSON sanitizer would treat as a secret field name counts as "[REDACTED]". */
function kindLabel(kind: unknown): string {
  const label = clean(kind, REFERENCE_LIMIT);
  return sanitizeWorkbenchJsonText({ [label]: 0 }) === JSON.stringify({ [label]: 0 }) ? label : REDACTED;
}

function eventsOf(reader: ObserveReader, plan: Plan, selector: NonNullable<Plan["events"]>): ObserveEvents {
  const read = reader.events({ scope: plan.scope, limit: selector.limit, ...(selector.after === undefined ? {} : { after: selector.after }) });
  const kinds = new Map<string, number>();
  const providers = new Set<string>();
  let returned = 0;
  for (const event of read.events.slice(0, selector.limit)) {
    if (!inScope(event.scope, plan.scope)) continue;
    returned += 1;
    const label = kindLabel(event.kind);
    kinds.set(label, (kinds.get(label) ?? 0) + 1);
    providers.add(clean(event.source.provider, REFERENCE_LIMIT));
  }
  return {
    returned,
    truncated: read.truncated === true || read.events.length > selector.limit,
    completeness: read.completeness === "complete" ? "complete" : "partial-gap",
    kinds: Object.fromEntries([...kinds].sort(([a], [b]) => byCodeUnit(a, b))),
    providers: [...providers].sort(byCodeUnit),
    basis: "scope-event-window",
  };
}

/** The projection's first unsafe code point of an identity part, exactly as it spells it, or nothing. */
function refusedCodePoint(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const hex = CODE_POINT.exec(value)?.[1];
  const code = hex === undefined ? undefined : Number.parseInt(hex, 16);
  if (code === undefined || code > 0x10ffff) return undefined;
  return unsafeIdentityUnit(String.fromCodePoint(code)) === value ? value : undefined;
}

/** One reader row in the closed vocabulary, rebuilt from this module's own values; anything else is undefined. */
function refusalRow(value: unknown): IdentityRefusal | undefined {
  if (!record(value)) return undefined;
  const path = REFUSAL_PATHS.find((candidate) => candidate === value.path);
  const at = REFUSAL_REFS.find((candidate) => candidate === value.ref);
  const field = REFUSAL_FIELDS.find((candidate) => candidate === value.field);
  const codePoint = refusedCodePoint(value.codePoint);
  if (path === undefined || at === undefined || field === undefined || codePoint === undefined || value.reason !== "unsafe-identity") return undefined;
  return { path, ref: at, field, codePoint, reason: "unsafe-identity" };
}

function identityRefusalsOf(reader: ObserveReader, plan: Plan, selector: NonNullable<Plan["identityRefusals"]>): ObserveIdentityRefusals {
  if (reader.identityRefusals === undefined) throw new CapabilityError("unavailable", "Observation reader cannot read identity refusals.");
  const read: unknown = reader.identityRefusals({ scope: plan.scope, limit: selector.limit });
  if (!record(read) || !Array.isArray(read.refusals)) throw unavailable("identity refusal page");
  const page: readonly unknown[] = read.refusals.slice(0, selector.limit);
  if (!count(read.total) || read.total < page.length) throw unavailable("identity refusal total");
  const rows: IdentityRefusal[] = [];
  for (const entry of page) {
    const row = refusalRow(entry);
    if (row !== undefined) rows.push(row);
  }
  return {
    returned: rows.length,
    total: read.total,
    truncated: read.truncated === true || read.refusals.length > selector.limit,
    unrecognized: page.length - rows.length,
    rows,
    basis: "scope-refusal-window",
  };
}

function freshnessOf(nodes: readonly ObserveNode[]): ObserveFreshness {
  let current = 0;
  let stale = 0;
  let unknown = 0;
  let lastKnownRunningStale = 0;
  for (const node of nodes) {
    if (node.freshness === "current") current += 1;
    else if (node.freshness === "stale") stale += 1;
    else unknown += 1;
    if (node.presentation.statusTone === "active" && node.freshness !== "current") lastKnownRunningStale += 1;
  }
  const counts = `${stale} stale / ${unknown} unknown`;
  const summary =
    nodes.length === 0
      ? "no nodes returned"
      : lastKnownRunningStale > 0
        ? `${lastKnownRunningStale} last-known-running + stale (active, not current); ${counts}`
        : current === nodes.length
          ? "all returned nodes current"
          : counts;
  return { current, stale, unknown, lastKnownRunningStale, summary };
}

function anomaliesOf(nodes: readonly ObserveNode[], outgoing: readonly ObserveRelationCount[] | undefined, events: ObserveEvents | undefined): ObserveAnomalies {
  return {
    disconnectedProviders: [...new Set(nodes.filter((node) => node.sourceConnectionState === "disconnected").map((node) => node.nativeRef.provider))].sort(byCodeUnit),
    partialCompleteness: nodes.filter((node) => node.completeness === "partial").length,
    eventGap: events?.completeness === "partial-gap",
    noRelationsAvailable:
      outgoing !== undefined && outgoing.length > 0 && outgoing.every((entry) => !entry.partial && Object.values(entry.outgoing).every((edges) => edges === 0)),
  };
}

/** One candidate reply: `keep` returned nodes, with or without the read events/refusals/relations, measured through the shared serializer. */
function candidate(gathered: Gathered, keep: number, withEvents: boolean, withRefusals: boolean, withRelations: boolean): ObserveReply {
  const { plan, picked } = gathered;
  const kept = picked.slice(0, keep);
  const nodes = kept.map((row) => row.node);
  const outgoing = gathered.outgoing?.slice(0, keep);
  // A trimmed page ends just before the first dropped node, so the next page starts on it.
  const scanned = keep < picked.length ? picked[keep].index : gathered.pageRows;
  const next = gathered.offset + scanned;
  const nextCursor = next < gathered.total ? mint(next, plan.invocationId, plan.tag, gathered.revision) : null;
  const relations = withRelations && outgoing !== undefined && gathered.relationRevision !== undefined
    ? { perNode: outgoing, basis: "returned-window-only" as const, revision: gathered.relationRevision }
    : undefined;
  const events = withEvents ? gathered.events : undefined;
  const identityRefusals = withRefusals ? gathered.identityRefusals : undefined;
  const droppedForBytes: ObserveDropped = {
    events: gathered.events !== undefined && !withEvents,
    ...(gathered.identityRefusals === undefined ? {} : { identityRefusals: !withRefusals }),
    relations: gathered.outgoing !== undefined && !withRelations,
    nodes: picked.length - keep,
  };
  const freshness = freshnessOf(nodes);
  const anomalies = anomaliesOf(nodes, outgoing, gathered.events);
  const reply = (bytes: number): ObserveReply => ({
    contract: OBSERVE_CONTRACT,
    invocationId: plan.invocationId,
    window: { offset: gathered.offset, limit: plan.limit, scanned, returned: nodes.length, total: gathered.total, revision: gathered.revision, nextCursor, truncated: nextCursor !== null },
    nodes,
    ...(relations === undefined ? {} : { relations }),
    ...(events === undefined ? {} : { events }),
    ...(identityRefusals === undefined ? {} : { identityRefusals }),
    freshness,
    anomalies,
    aggregates: "not-wired",
    countsBasis: "returned-window",
    bytes,
    truncatedForBytes: droppedForBytes.events || droppedForBytes.identityRefusals === true || droppedForBytes.relations || droppedForBytes.nodes > 0,
    droppedForBytes,
  });
  // `bytes` counts itself: settle on the value that equals the length of the text that carries it.
  let bytes = 0;
  for (let measured = Buffer.byteLength(sanitizeWorkbenchJsonText(reply(bytes), JSON_TEXT_LIMIT), "utf8"); measured !== bytes; ) {
    bytes = measured;
    measured = Buffer.byteLength(sanitizeWorkbenchJsonText(reply(bytes), JSON_TEXT_LIMIT), "utf8");
  }
  return reply(bytes);
}

/** Deterministic byte cap: drop events, then identity refusals, then relations, then nodes from the tail; the skeleton itself always fits 1024 bytes. */
function fitted(gathered: Gathered): ObserveReply {
  let withEvents = gathered.events !== undefined;
  let withRefusals = gathered.identityRefusals !== undefined;
  let withRelations = gathered.outgoing !== undefined;
  let keep = gathered.picked.length;
  for (;;) {
    const reply = candidate(gathered, keep, withEvents, withRefusals, withRelations);
    if (reply.bytes <= gathered.plan.maxBytes || (!withEvents && !withRefusals && !withRelations && keep === 0)) return deepFreeze(reply);
    if (withEvents) withEvents = false;
    else if (withRefusals) withRefusals = false;
    else if (withRelations) withRelations = false;
    else keep -= 1;
  }
}

/**
 * workflow_observe's reply over one invocation's viewport. Pure and synchronous: one window() read; when
 * selectors.relations, one relations() page per returned node plus one relationRevision(); when selectors.events and
 * the invocation is observed in this scope, one events() read; when selectors.identityRefusals, one identityRefusals()
 * read of the request scope, also for an empty window, since a refused input makes no node. Throws
 * CapabilityError("validation") for any invalid request or cursor and CapabilityError("unavailable") when the reader
 * returns counters JSON cannot carry or cannot read identity refusals.
 */
export function observeInvocation(reader: ObserveReader, request: ObserveRequest): ObserveReply {
  const plan = planOf(request);
  const position = plan.cursor === undefined ? undefined : positionOf(plan.cursor, plan);
  const offset = position?.offset ?? 0;
  const read = reader.window({ scope: plan.scope, invocationId: plan.invocationId, offset, limit: plan.limit });
  if (!count(read.total)) throw unavailable("window total");
  if (!count(read.revision)) throw unavailable("window revision");
  if (position !== undefined && position.revision > read.revision) {
    throw refused(`cursor revision ${position.revision} is ahead of the projection revision ${read.revision} (out-of-order)`);
  }
  const page = read.nodes.slice(0, plan.limit);
  const picked: Picked[] = [];
  for (const [index, row] of page.entries()) if (admits(row, plan)) picked.push({ index, rawKey: row.key, node: shaped(row) });
  let outgoing: ObserveRelationCount[] | undefined;
  let relationRevision: number | undefined;
  if (plan.relations && picked.length > 0) {
    outgoing = picked.map((row) => outgoingOf(reader, plan, row));
    const revision = reader.relationRevision();
    if (!count(revision)) throw unavailable("relation revision");
    relationRevision = revision;
  }
  const events = plan.events !== undefined && read.total > 0 ? eventsOf(reader, plan, plan.events) : undefined;
  const identityRefusals = plan.identityRefusals === undefined ? undefined : identityRefusalsOf(reader, plan, plan.identityRefusals);
  return fitted({
    plan,
    offset,
    pageRows: page.length,
    total: read.total,
    revision: read.revision,
    picked,
    ...(outgoing === undefined ? {} : { outgoing }),
    ...(relationRevision === undefined ? {} : { relationRevision }),
    ...(events === undefined ? {} : { events }),
    ...(identityRefusals === undefined ? {} : { identityRefusals }),
  });
}
