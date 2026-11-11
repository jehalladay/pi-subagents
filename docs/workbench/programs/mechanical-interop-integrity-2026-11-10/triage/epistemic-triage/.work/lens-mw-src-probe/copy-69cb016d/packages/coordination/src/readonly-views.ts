/**
 * Read-only operator views (APO-020; 11 "Read-only workbench"): the operational decision graph, epistemic why-not,
 * credit, developmental ancestry, resource pressure and certificate dependency are snapshots, never actuation paths.
 * `snapshotView` copies a trace into a record frozen at every depth, dropping any actuation-shaped member (actuate,
 * submit, effects, intents and their kin) and redacting any member whose name looks like a secret, token, password or
 * credential, and reports both lists. `whyNot` explains a refused intent from the trace's own refusal codes, reports an
 * admitted intent as admitted, and leaves an intent the trace never saw unknown. `exportView` yields the reproducible
 * trace: canonical bytes and their digest. `assertNoActuationPath` is the law any view must satisfy — no function
 * member, no actuation field, frozen at every depth. Own string and symbol keys are checked, never the prototype chain.
 * An unknown view kind throws VIEW_KIND_UNKNOWN; a non-string refusal subject becomes VIEW_SUBJECT_NOT_STRING. DevTools and the workbench are never required for correctness or
 * hosting; nothing here reaches reconcile, an effect client or a native host.
 */
import { canonicalJson, digest } from "./canonical.js";
import { UNKNOWN } from "./episode.js";
import type { Maybe } from "./episode.js";

export type ViewKind = "decision-graph" | "why-not" | "credit" | "ancestry" | "resource-pressure" | "certificate-dependency";

export const VIEW_KINDS: readonly ViewKind[] = Object.freeze(["decision-graph", "why-not", "credit", "ancestry", "resource-pressure", "certificate-dependency"] as const);

export interface TraceRefusal {
  readonly code: string;
  readonly subject: string;
}

export interface TraceRecord {
  readonly decisionId: string;
  readonly intentId: string;
  readonly outcome: "admitted" | "refused";
  readonly refusals: readonly TraceRefusal[];
}

export interface TraceInput {
  readonly revision: string;
  readonly records: readonly TraceRecord[];
}

export interface ReadOnlyView {
  readonly schema: "mw.readonly-view.v0";
  readonly kind: ViewKind;
  readonly revision: string;
  readonly rows: readonly TraceRecord[];
  /** Actuation-shaped member names found in the source and left out, sorted. */
  readonly dropped: readonly string[];
  /** Secret-looking member names found in the source and left out, sorted. */
  readonly redacted: readonly string[];
}

const ACTUATION_NAMES: ReadonlySet<string> = new Set(["actuate", "submit", "effects", "effect", "intents", "intent", "execute", "apply", "commit", "push"]);
const SECRET_NAME = /secret|token|password|credential|apikey|api_key/i;

const deepFreeze = <T>(value: T): T => {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
  }
  return value;
};

/** Renders an own key for a path: a string key as written, a symbol key as `[Symbol(desc)]`. */
const keyLabel = (key: string | symbol): string => (typeof key === "symbol" ? `[${key.toString()}]` : key);
const joinPath = (path: string, key: string | symbol): string => (path.length === 0 ? keyLabel(key) : `${path}.${keyLabel(key)}`);

/**
 * Copies a plain value, dropping actuation-shaped and secret-looking members at every depth and collecting their names.
 * Own keys are string and symbol keys (the prototype chain is not checked: snapshots are plain data). A symbol-keyed
 * member never reaches the string-keyed canonical JSON, so it is dropped and listed as `[Symbol(desc)]`. A function
 * array element is an actuation path: it is removed and listed under its dotted path (for example `rows.0.notes.1`),
 * never coerced to undefined and never dropped without a dropped[] entry.
 */
const sanitize = (value: unknown, dropped: Set<string>, redacted: Set<string>, path: string): unknown => {
  if (Array.isArray(value)) {
    const out: unknown[] = [];
    value.forEach((member, index) => {
      const here = `${path}.${index}`;
      if (typeof member === "function") { dropped.add(here); return; }
      out.push(sanitize(member, dropped, redacted, here));
    });
    return out;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Reflect.ownKeys(value)) {
      const member = (value as Record<string | symbol, unknown>)[key];
      if (typeof key === "symbol") { dropped.add(keyLabel(key)); continue; }
      if (typeof member === "function" || ACTUATION_NAMES.has(key)) { dropped.add(key); continue; }
      if (SECRET_NAME.test(key)) { redacted.add(key); continue; }
      out[key] = sanitize(member, dropped, redacted, `${path}.${key}`);
    }
    return out;
  }
  return value;
};

const renderKind = (kind: unknown): string => {
  if (typeof kind === "symbol") return kind.toString();
  try { return JSON.stringify(kind) ?? typeof kind; } catch { return typeof kind; }
};

/** Throws RangeError `VIEW_KIND_UNKNOWN` for a kind outside VIEW_KINDS: type-only guarantees do not survive decoded JSON. */
export function snapshotView(kind: ViewKind, trace: TraceInput): ReadOnlyView {
  if (!VIEW_KINDS.includes(kind)) throw new RangeError(`VIEW_KIND_UNKNOWN: ${renderKind(kind)} is not one of ${VIEW_KINDS.join(", ")}`);
  const dropped = new Set<string>();
  const redacted = new Set<string>();
  const rows = sanitize(trace.records, dropped, redacted, "rows") as TraceRecord[];
  return deepFreeze({ schema: "mw.readonly-view.v0" as const, kind, revision: trace.revision, rows, dropped: [...dropped].sort(), redacted: [...redacted].sort() });
}

export interface WhyNotReason {
  readonly decisionId: string;
  readonly code: string;
  readonly subject: string;
}

export interface WhyNotView {
  readonly schema: "mw.readonly-view.why-not.v0";
  readonly revision: string;
  readonly intentId: string;
  readonly status: Maybe<"admitted" | "refused">;
  /** Sorted by decision then code; empty when admitted or unknown. A non-string refusal subject appears as code VIEW_SUBJECT_NOT_STRING with the typeof as subject. */
  readonly reasons: readonly WhyNotReason[];
}

export function whyNot(trace: TraceInput, intentId: string): WhyNotView {
  const records = trace.records.filter(record => record.intentId === intentId);
  if (records.length === 0) return deepFreeze({ schema: "mw.readonly-view.why-not.v0" as const, revision: trace.revision, intentId, status: UNKNOWN, reasons: [] });
  const refused = records.filter(record => record.outcome === "refused");
  // A non-string subject is refused, never carried: freezing or aliasing a caller-owned object would leak an actuation side effect and skip redaction.
  const reasons = refused.flatMap(record => record.refusals.map(refusal => (typeof refusal.subject === "string"
    ? { decisionId: record.decisionId, code: refusal.code, subject: refusal.subject }
    : { decisionId: record.decisionId, code: "VIEW_SUBJECT_NOT_STRING", subject: typeof refusal.subject })))
    .sort((a, b) => (a.decisionId < b.decisionId ? -1 : a.decisionId > b.decisionId ? 1 : a.code < b.code ? -1 : a.code > b.code ? 1 : 0));
  return deepFreeze({ schema: "mw.readonly-view.why-not.v0" as const, revision: trace.revision, intentId, status: refused.length > 0 ? ("refused" as const) : ("admitted" as const), reasons });
}

export interface ViewExport {
  readonly bytes: string;
  readonly digest: string;
}

/** Canonical bytes of a view and their digest: equal views export identical bytes whatever the key order they were built from. */
export function exportView(view: ReadOnlyView | WhyNotView): ViewExport {
  return { bytes: canonicalJson(view), digest: digest(view) };
}

export type ActuationPathRefusalCode = "VIEW_HAS_FUNCTION_MEMBER" | "VIEW_HAS_ACTUATION_FIELD" | "VIEW_NOT_FROZEN";

export interface ActuationPathCheck {
  readonly ok: boolean;
  readonly refusals: readonly { readonly code: ActuationPathRefusalCode; readonly path: string }[];
}

export function assertNoActuationPath(view: ReadOnlyView | WhyNotView): ActuationPathCheck {
  const refusals: { code: ActuationPathRefusalCode; path: string }[] = [];
  const walk = (value: unknown, path: string): void => {
    if (typeof value === "function") { refusals.push({ code: "VIEW_HAS_FUNCTION_MEMBER", path }); return; }
    if (value === null || typeof value !== "object") return;
    if (!Object.isFrozen(value)) refusals.push({ code: "VIEW_NOT_FROZEN", path });
    for (const key of Reflect.ownKeys(value)) {
      const member = (value as Record<string | symbol, unknown>)[key];
      const here = joinPath(path, key);
      if (typeof key === "string" && ACTUATION_NAMES.has(key)) { refusals.push({ code: "VIEW_HAS_ACTUATION_FIELD", path: here }); continue; }
      walk(member, here);
    }
  };
  walk(view, "");
  return { ok: refusals.length === 0, refusals };
}
