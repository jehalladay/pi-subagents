/**
 * wb-o4h0.1 (RF-FEDERATED-WORKSPACES-R1). Statement (bead notes, read from the committed store export .beads/issues.jsonl): "Any
 * Pi cache, dedupe or diff over imported rf observations shall key on all read-visible fields (status, provenance, coverage,
 * sensitivity, revisions, origin, accepted commit), never on payload equality alone, and any Pi projection omitting such a field
 * shall be justified by factorization - legal only when every downstream Pi operation factors through the reduced view
 * (cache-key rule pinnable today; projection echo gated ObserverContract/v1, unshipped, no FW bead)"
 * (ReactiveFiberCLI docs/programs/federated-workspaces-2026-10-18/01-requirements-decisions.md:31@6a251bf73af5).
 *
 * MEASURED AT BASE 0b2a80f (read by the cutting seat; this cut changes no product code): Pi imports rf observations through one
 * provider, reactivefiber.render.preview (src/workbench/providers/reactivefiber.ts), whose reading carries the validated envelope
 * verbatim; no imported federation envelope is shipped at the pin. The planes a reading or its projection enters:
 *  - the observation cache (observation.ts ObservationProjection) keys a node on native identity (scope, provider, type, scope ref
 *    and id, the envelope operation_id); refresh re-stores and bumps the revision unconditionally; payloadRef is stored, never a
 *    key, an index or a comparison;
 *  - the derived graph view (graph-view.ts) re-derives on the projection revision;
 *  - the workflow journal (journal.ts nodeJournalKey) keys a node call on capability plus input and records a read's whole reading;
 *  - reconcile evidence receipts (reconcile-decision.ts mintEvidenceReceipt) digest the whole reading (resultDigest);
 *  - the evidence loader cache (evidence-loader.ts) keys on identity plus the evidence reference, and no rf loader is registered.
 * The one hash over an rf payload is the observer's rf-output:sha256 digest of result.output.text: a content REFERENCE
 * (nativePayloadRef) that no plane keys on.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). One pin per read-visible family (the bead's two family lists, read from the export): equal-payload readings
 *    (one output.text, so one nativePayloadRef) that differ in the family occupy distinct cache entries under distinct operation
 *    ids and, re-read under one id, trigger invalidation (refresh applied, revision bumped, the stored node is the variant's, the
 *    derived graph view re-derives). Accepted commit is refused before projection. Sensitivity and coverage digest are unshipped
 *    (residual R-UNSHIPPED-FIELDS): Pi reads neither, yet a re-read still invalidates, so neither is ever deduped.
 *  B, acceptance (b), the guard. B1 the src modules that name rf, each with a role; B2 every hash site in the observation planes,
 *    classified; B3 a TypeScript AST scan of every src module for a hash over an rf payload outside the one reference site; B4 the
 *    same scan for a payload reference in a key position (a Map/Set key, a JSON.stringify array key, an equality, a computed
 *    name); B5 the scans' controls; B6 equal-payload readings mint distinct reconcile receipts; B7 the cache keys on identity and
 *    never on the payload reference; B8 (wb-l4q7, the o4h0.1 gate's F1) two equal-payload readings under two identities stay two
 *    rows in the cache's stored count, in window(), in query() by scope and by invocation, and in the graph view built on the
 *    window.
 *  C, acceptance (c), the factorization census FIELDS: one row per envelope field of the shared full-shape render fixture
 *    (test/helpers/rf-render-fixture.ts, held to the captured roster test/fixtures/rf-result-keys.json) plus the read-visible
 *    slices of the additive shapes the observer reads (a failure, an ok diagnostic, an observation row, a --view contract, the TSX
 *    engine entries). Each row is projected (an admitted variation changes the projection), fenced (every variation of the field
 *    alone is refused, so no two admitted readings differ in it) or omitted (an admitted variation changes nothing downstream),
 *    and an omitted row names its factorization justification. C1 the universe and its outside anchors; C2-C4 the measured
 *    outcome of every row; C5 the justification roster. "Downstream" is every Pi operation over the reading's projections: the
 *    observer topology, nativeEvidence, nativeRefOf, the observation cache and the graph view; a downstream operation that reads
 *    an omitted field changes its output under the row's variation and reds C4. The full-reading planes (the journal text, the
 *    receipt digest, the tool reply) carry every field verbatim, so no omission arises there. wb-hs2j.1 (RCA-R1) moved
 *    result.blocks and result.necessity from omitted (J-STRUCTURE) to projected: the reader adapter's inclusion leg reads the
 *    block count and the withheld-decision count, and their PAIRED variations are an emptied block list and one added withheld
 *    decision.
 *  D, acceptance (d), gated: no ObserverContract carrier exists in src or in the captured rf result roster, so there is no
 *    declared projection to echo yet; D1 reds when either appears, and the armed half is due then.
 *  Q, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and FIELDS `${base}:${path}:${disposition}` as literals; the
 * judged set (labels, pins, witnesses, fields and justifications) is held to the out-of-file roster
 * test/fixtures/rf-observation-cache-key-roster.json; the clause letters and the family list are held to the bead's export row;
 * every row's pin set is held to the judged-pin table of the append-only receipt docs/workbench/receipts/wb-l4q7.md, an anchor
 * outside this census (wb-l4q7, the o4h0.1 gate's F2: a pin removed from ROWS, the frozen literal, IMPL and the roster together
 * still stands in that table). The full-shape rows of the field universe are held to the full-shape fixture, the captured result
 * roster and the observer's and provider's own key constants read from src. The five additive slices are shapes this census
 * authors (BASES), so their fields are held to the additive-slice table of the same receipt (the gate's F3) and, for both
 * diagnostic slices, to the observer's DIAGNOSTIC_KEYS. The note member of both engine entries is planted here as an unread
 * member, not a field the producer writes (the receipt records that read); its two rows stand for any unread engine-entry member.
 * RESIDUALS (named, each with a pinned quiet row): R-UNSHIPPED-FIELDS rf states no sensitivity and no coverage digest at the pin,
 * so Pi has none to read or key on (Q1); R-ALIASED-PAYLOAD a payload bound to a local name before it is hashed or keyed is
 * invisible to the B3/B4 text-of-argument scans (Q2). Its backstop is bounded (wb-l4q7 narrows it, the o4h0.1 gate's F1): B2's
 * per-plane hash-site roster reds on a new hash site in any plane module, and the behavioral rows read these paths of an
 * equal-payload pair - refresh and re-read under one identity (the A rows); stored, window(), query() by scope and by
 * invocation, and the graph view built on the window (B8). An aliased Map or Set key, or an aliased comparison, anywhere else -
 * another query() filter, another plane module - is seen by neither.
 *
 * Display paths added: none. Test-only: no scratch, no spawn; src, the fixtures and the store export are only read.
 */
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { buildGraphView, createGraphViewBuilder, type GraphViewRequest } from "../src/workbench/graph-view.js";
import { type NativeEvidence, nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { type NativeSnapshot, ObservationProjection, type ObservationScope, type ObservedNode } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import {
  REACTIVEFIBER_OBSERVATION_CONTRACT,
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { mintEvidenceReceipt } from "../src/workbench/reconcile-decision.js";
import { docsSection, sectionTables } from "./helpers/census.js";
import { fullShapeRf, type Json, readRfResultRoster, rfFixtureDecision } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-observation-cache-key-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-o4h0.1";
const PREVIEW_ID = "reactivefiber.render.preview";
const OBSERVER = "src/workbench/reactivefiber-observer.ts";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
/** wb-l4q7 (the o4h0.1 gate's F2 and F3): the append-only receipt whose two tables anchor this census from outside it. */
const RECEIPT_PATH = join(REPO, "docs", "workbench", "receipts", "wb-l4q7.md");
/** The rendered headings the two table sections sit under: the receipt's title and the entry that states them. */
const RECEIPT_PARENTS: readonly string[] = [
  "wb-l4q7: o4h0.1 census F1-F3 follow-up: aliased payload-only dedupe survives (P10/P10c), pin-level CT6 self-anchoring (B5/C4/Q2), self-anchored field universe - red-first cures",
  "2026-10-24 the cache-key census pin set and additive-slice fields, anchored outside the census (wb-o4h0.1 gate F2 and F3)",
];
const PIN_SECTION = "Judged pins, wb-l4q7 cut 1";
const PIN_HEADER: readonly string[] = ["Row", "Pin"];
const SLICE_SECTION = "Additive-slice fields, wb-l4q7 cut 1";
const SLICE_HEADER: readonly string[] = ["Base", "Field"];

/** A fixed reading root: nothing here touches the filesystem through it. */
const ROOT = "/workspace/rf-cache-key-census";
const SCOPE: ObservationScope = { workspace: ROOT, principal: "local-operator:tester" };
const INVOCATION = "wf_rf_cache_key";
const HOST: ReactiveFiberTopologyContext = {
  scope: SCOPE, seam: "rf-cli", capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z", invocationId: INVOCATION,
};
/** A second rf operation id: a distinct render of the same payload. */
const OTHER_OPERATION = `rfo_${"b".repeat(22)}`;
const VIEW: GraphViewRequest = { scope: SCOPE, invocationId: INVOCATION, viewport: { offset: 0, limit: 10 } };

const digest = (fill: string): string => `sha256:${fill.repeat(64)}`;
const same = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function diagnosticRow(code: string, severity: string): JsonObject {
  return { code, severity, message: "fixture diagnostic", hint: null, source: null, metadata: {} };
}
function withResult(source: JsonObject, patch: JsonObject): JsonObject {
  return { ...source, result: { ...objectOf(source.result, "result"), ...patch } };
}
function withProvenance(source: JsonObject, patch: JsonObject): JsonObject {
  const result = objectOf(source.result, "result");
  return withResult(source, { provenance: { ...objectOf(result.provenance, "result.provenance"), ...patch } });
}

/** One field path of a source: dot-separated keys; a key ending in [] stands for every element of that list. */
function update(value: Json, segments: readonly string[], change: (leaf: Json) => Json): Json {
  if (segments.length === 0) return change(value);
  const [head = "", ...rest] = segments;
  const many = head.endsWith("[]");
  const key = many ? head.slice(0, -2) : head;
  const holder = objectOf(value, key);
  const child = holder[key];
  if (child === undefined) throw new Error(`the source has no field ${key}`);
  if (!many) return { ...holder, [key]: update(child, rest, change) };
  if (!Array.isArray(child) || child.length === 0) throw new Error(`${key} must be a non-empty list`);
  return { ...holder, [key]: child.map(item => update(item, rest, change)) };
}
function changed(source: JsonObject, path: string, change: (leaf: Json) => Json): JsonObject {
  return objectOf(update(source, path.split("."), change), path);
}
function valueAt(value: Json, path: string): Json {
  let at: Json = value;
  for (const segment of path.split(".")) {
    const many = segment.endsWith("[]");
    const next = objectOf(at, segment)[many ? segment.slice(0, -2) : segment];
    if (next === undefined) throw new Error(`no value at ${path}`);
    at = many ? (Array.isArray(next) && next[0] !== undefined ? next[0] : null) : next;
  }
  return at;
}

type BaseId = "full" | "failure" | "diagnostic" | "observed" | "view" | "engine";
/** The readings every census row and variant starts from: the shared full-shape fixture and five additive shapes of it. */
const BASES: Readonly<Record<BaseId, () => JsonObject>> = {
  full: () => fullShapeRf(ROOT),
  failure: () => ({ ...fullShapeRf(ROOT), ok: false, result: null, diagnostics: [diagnosticRow("RF_RENDER_FAILED", "error")] }),
  diagnostic: () => ({ ...fullShapeRf(ROOT), diagnostics: [diagnosticRow("RF_RENDER_NOTE", "info")] }),
  observed: () => withResult(fullShapeRf(ROOT), {
    observations: [{ status: "null", freshness: "captured_at_render", replayed: false, degraded: false, binding_ref: "binding.fixture" }],
  }),
  view: () => withResult(fullShapeRf(ROOT), {
    view_id: "ctx.main", view_contract: { view_id: "ctx.main", satisfied: true, degraded: false, failures: [], contract_digest: digest("3") },
  }),
  engine: () => {
    const source = fullShapeRf(ROOT);
    const provenance = objectOf(objectOf(source.result, "result").provenance, "result.provenance");
    return withProvenance(source, {
      sdk_versions: {
        ...objectOf(provenance.sdk_versions, "result.provenance.sdk_versions"),
        tsx_runtime: { distribution_version: "2.9.7", contract_fingerprint: digest("4"), note: "engine.fixture" },
        tsx_sdk: { distribution_version: "0.1.341", contract_fingerprint: "unknown", note: "engine.fixture" },
      },
    });
  },
};
/** The slices of each additive shape the census adds to the full-shape universe. */
const SLICES: Readonly<Record<Exclude<BaseId, "full">, readonly string[]>> = {
  failure: ["diagnostics[]"],
  diagnostic: ["diagnostics[]"],
  observed: ["result.observations[]"],
  view: ["result.view_id", "result.view_contract"],
  engine: ["result.provenance.sdk_versions.tsx_runtime", "result.provenance.sdk_versions.tsx_sdk"],
};
/** Containers the census judges as one field (every member varied at once): no member of one reaches a projection. */
const OPAQUE: ReadonlySet<string> = new Set([
  "result.work_metrics", "result.retry_work", "result.plan", "result.provenance.storage",
  // wb-jwc.4 (the rf 0.1.845 pin): the two judge-context containers whose member keys carry a dot (session.active, task.tags,
  // agent.role), which a dotted field path cannot name; no member of either reaches a projection.
  "result.judge_context.workspace_facts", "result.judge_context_layers",
  "result.provenance.sdk_versions.fiber_optics", "result.provenance.sdk_versions.reactive_lenses",
  "result.provenance.sdk_versions.reactive_components", "result.provenance.sdk_versions.reactive_inference",
]);

/** Every field path of a value: objects are entered (an opaque or empty one is a field itself), lists and scalars are fields. */
function leaves(value: Json, prefix: string): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value) || OPAQUE.has(prefix) || Object.keys(value).length === 0) return [prefix];
  return Object.keys(value).flatMap(key => leaves(objectOf(value, prefix)[key] ?? null, prefix === "" ? key : `${prefix}.${key}`));
}
function universe(): string[] {
  const rows = leaves(BASES.full(), "").map(path => `full:${path}`);
  for (const base of Object.keys(SLICES) as Exclude<BaseId, "full">[]) {
    for (const slice of SLICES[base]) rows.push(...leaves(valueAt(BASES[base](), slice), slice).map(path => `${base}:${path}`));
  }
  return rows;
}

/** The generic variation of one field: another value of the same shape (every member of an opaque container varied). */
function varied(value: Json): Json {
  if (typeof value === "string") {
    if (/^sha256:[0-9a-f]{64}$/.test(value)) return value === digest("9") ? digest("8") : digest("9");
    if (/^rf[a-z]_[0-9a-z]{22,32}$/.test(value)) return `${value.slice(0, 4)}${"z".repeat(22)}`;
    if (/^[A-Z][A-Z0-9_]+$/.test(value)) return `${value}_X`;
    return `${value}-x`;
  }
  if (typeof value === "number") return value + 1;
  if (typeof value === "boolean") return !value;
  if (value === null) return "set";
  if (Array.isArray(value)) return [...value, { marker: "added" }];
  const entries = Object.entries(value);
  return entries.length === 0 ? { marker: "added" } : Object.fromEntries(entries.map(([key, item]) => [key, varied(item)]));
}

type Disposition = "projected" | "fenced" | "omitted";
interface Field {
  readonly id: string;
  readonly base: BaseId;
  readonly path: string;
  readonly disposition: Disposition;
  readonly why?: string;
}
/** The census rows: base, field path, disposition and, for an omitted field, its factorization justification. */
const FIELD_ROWS: readonly (readonly [BaseId, string, Disposition, string?])[] = [
  ["full", "schema", "fenced"],
  ["full", "ok", "fenced"],
  ["full", "command", "fenced"],
  ["full", "operation_id", "projected"],
  ["full", "workspace.id", "projected"],
  ["full", "workspace.root", "fenced"],
  ["full", "transaction_id", "fenced"],
  ["full", "result.output.text", "projected"],
  ["full", "result.output.size_bytes", "omitted", "J-PAYLOAD-RESTATED"],
  ["full", "result.output.digest", "omitted", "J-PAYLOAD-RESTATED"],
  ["full", "result.output.path", "omitted", "J-PAYLOAD-RESTATED"],
  ["full", "result.budget.schema", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.requested_model_id", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.resolved_model_id", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.context_window", "projected"],
  ["full", "result.budget.formula_terms.max_output_tokens", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.output_reserve", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.occupied_tokens", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.overhead", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.safety_margin", "omitted", "J-BUDGET-AUX"],
  ["full", "result.budget.formula_terms.available_context_tokens", "projected"],
  ["full", "result.diagnostics_summary.errors", "projected"],
  ["full", "result.diagnostics_summary.warnings", "projected"],
  ["full", "result.diagnostics_summary.has_errors", "fenced"],
  ["full", "result.diagnostics_summary.has_warnings", "fenced"],
  ["full", "result.blocks", "projected"],
  ["full", "result.components", "omitted", "J-STRUCTURE"],
  ["full", "result.provenance.created_at", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.graph_revision_id", "projected"],
  ["full", "result.provenance.necessity_policy_revision_id", "omitted", "J-POLICY-REVISION"],
  ["full", "result.provenance.workspace_schema_version", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.cli_version", "projected"],
  ["full", "result.provenance.storage_backend", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.sdk_versions.fiber_optics", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.sdk_versions.reactive_lenses", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.sdk_versions.reactive_components", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.sdk_versions.reactive_inference", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.sdk_versions.fiber_optics_wire_format", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.provenance.storage", "omitted", "J-PROVENANCE-AUX"],
  ["full", "result.work_metrics", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.work.source_capture_count", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.work.fiber_signal_count", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.work.component_render_count", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.work.lens_resolution_count", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.work.necessity_eval_count", "projected"],
  ["full", "result.work.storage_write_count", "fenced"],
  ["full", "result.engine_metrics.tsx_worker_spawns", "projected"],
  ["full", "result.engine_metrics.tsx_resource_rounds", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.scope", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.audience", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.bundle_revision_id", "projected"],
  ["full", "result.observations", "projected"],
  ["full", "result.necessity", "projected"],
  ["full", "result.judge_context.task_digest", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.task_tags", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.agent_id", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.agent_role", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.session_id", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.explicit_requests", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context.workspace_facts", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.judge_context_layers", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.attempts", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.superseded_transaction_ids", "omitted", "J-STRUCTURE"],
  ["full", "result.retry_work", "omitted", "J-WORK-COUNTERS"],
  ["full", "result.fiber_transaction_refs", "omitted", "J-STRUCTURE"],
  ["full", "result.replay_of_operation_id", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.render_id", "fenced"],
  ["full", "result.ephemeral", "fenced"],
  ["full", "result.commit_seq", "fenced"],
  ["full", "result.session_id", "omitted", "J-REQUEST-ECHO"],
  ["full", "result.effects", "omitted", "J-STRUCTURE"],
  ["full", "result.plan", "omitted", "J-STRUCTURE"],
  ["full", "diagnostics", "projected"],
  ["failure", "diagnostics[].code", "projected"],
  ["failure", "diagnostics[].severity", "fenced"],
  ["failure", "diagnostics[].message", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["failure", "diagnostics[].hint", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["failure", "diagnostics[].source", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["failure", "diagnostics[].metadata", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["diagnostic", "diagnostics[].code", "omitted", "J-DIAGNOSTIC-CODE"],
  ["diagnostic", "diagnostics[].severity", "projected"],
  ["diagnostic", "diagnostics[].message", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["diagnostic", "diagnostics[].hint", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["diagnostic", "diagnostics[].source", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["diagnostic", "diagnostics[].metadata", "omitted", "J-DIAGNOSTIC-TEXT"],
  ["observed", "result.observations[].status", "projected"],
  ["observed", "result.observations[].freshness", "projected"],
  ["observed", "result.observations[].replayed", "fenced"],
  ["observed", "result.observations[].degraded", "projected"],
  ["observed", "result.observations[].binding_ref", "omitted", "J-ROW-AUX"],
  ["view", "result.view_id", "projected"],
  ["view", "result.view_contract.view_id", "fenced"],
  ["view", "result.view_contract.satisfied", "projected"],
  ["view", "result.view_contract.degraded", "fenced"],
  ["view", "result.view_contract.failures", "fenced"],
  ["view", "result.view_contract.contract_digest", "omitted", "J-VIEW-AUX"],
  ["engine", "result.provenance.sdk_versions.tsx_runtime.distribution_version", "projected"],
  ["engine", "result.provenance.sdk_versions.tsx_runtime.contract_fingerprint", "projected"],
  ["engine", "result.provenance.sdk_versions.tsx_runtime.note", "omitted", "J-ENGINE-AUX"],
  ["engine", "result.provenance.sdk_versions.tsx_sdk.distribution_version", "projected"],
  ["engine", "result.provenance.sdk_versions.tsx_sdk.contract_fingerprint", "projected"],
  ["engine", "result.provenance.sdk_versions.tsx_sdk.note", "omitted", "J-ENGINE-AUX"],
];
const FIELDS: readonly Field[] = FIELD_ROWS.map(([base, path, disposition, why]) => ({
  id: `${base}:${path}`, base, path, disposition, ...(why !== undefined ? { why } : {}),
}));
/** FIELDS' frozen shape at base 0b2a80f (standing rule 16): every row's base, path and disposition, as a literal; wb-hs2j.1 moved the
 * result.blocks and result.necessity rows from omitted to projected; wb-jwc.4 (the rf 0.1.845 pin) added the nine rows of the three
 * result keys that pin emits, judge_context, judge_context_layers and replay_of_operation_id, each omitted. */
const FROZEN_FIELDS: readonly string[] = [
  "full:schema:fenced",
  "full:ok:fenced",
  "full:command:fenced",
  "full:operation_id:projected",
  "full:workspace.id:projected",
  "full:workspace.root:fenced",
  "full:transaction_id:fenced",
  "full:result.output.text:projected",
  "full:result.output.size_bytes:omitted",
  "full:result.output.digest:omitted",
  "full:result.output.path:omitted",
  "full:result.budget.schema:omitted",
  "full:result.budget.requested_model_id:omitted",
  "full:result.budget.resolved_model_id:omitted",
  "full:result.budget.formula_terms.context_window:projected",
  "full:result.budget.formula_terms.max_output_tokens:omitted",
  "full:result.budget.formula_terms.output_reserve:omitted",
  "full:result.budget.formula_terms.occupied_tokens:omitted",
  "full:result.budget.formula_terms.overhead:omitted",
  "full:result.budget.formula_terms.safety_margin:omitted",
  "full:result.budget.formula_terms.available_context_tokens:projected",
  "full:result.diagnostics_summary.errors:projected",
  "full:result.diagnostics_summary.warnings:projected",
  "full:result.diagnostics_summary.has_errors:fenced",
  "full:result.diagnostics_summary.has_warnings:fenced",
  "full:result.blocks:projected",
  "full:result.components:omitted",
  "full:result.provenance.created_at:omitted",
  "full:result.provenance.graph_revision_id:projected",
  "full:result.provenance.necessity_policy_revision_id:omitted",
  "full:result.provenance.workspace_schema_version:omitted",
  "full:result.provenance.cli_version:projected",
  "full:result.provenance.storage_backend:omitted",
  "full:result.provenance.sdk_versions.fiber_optics:omitted",
  "full:result.provenance.sdk_versions.reactive_lenses:omitted",
  "full:result.provenance.sdk_versions.reactive_components:omitted",
  "full:result.provenance.sdk_versions.reactive_inference:omitted",
  "full:result.provenance.sdk_versions.fiber_optics_wire_format:omitted",
  "full:result.provenance.storage:omitted",
  "full:result.work_metrics:omitted",
  "full:result.work.source_capture_count:omitted",
  "full:result.work.fiber_signal_count:omitted",
  "full:result.work.component_render_count:omitted",
  "full:result.work.lens_resolution_count:omitted",
  "full:result.work.necessity_eval_count:projected",
  "full:result.work.storage_write_count:fenced",
  "full:result.engine_metrics.tsx_worker_spawns:projected",
  "full:result.engine_metrics.tsx_resource_rounds:omitted",
  "full:result.scope:omitted",
  "full:result.audience:omitted",
  "full:result.bundle_revision_id:projected",
  "full:result.observations:projected",
  "full:result.necessity:projected",
  "full:result.judge_context.task_digest:omitted",
  "full:result.judge_context.task_tags:omitted",
  "full:result.judge_context.agent_id:omitted",
  "full:result.judge_context.agent_role:omitted",
  "full:result.judge_context.session_id:omitted",
  "full:result.judge_context.explicit_requests:omitted",
  "full:result.judge_context.workspace_facts:omitted",
  "full:result.judge_context_layers:omitted",
  "full:result.attempts:omitted",
  "full:result.superseded_transaction_ids:omitted",
  "full:result.retry_work:omitted",
  "full:result.fiber_transaction_refs:omitted",
  "full:result.replay_of_operation_id:omitted",
  "full:result.render_id:fenced",
  "full:result.ephemeral:fenced",
  "full:result.commit_seq:fenced",
  "full:result.session_id:omitted",
  "full:result.effects:omitted",
  "full:result.plan:omitted",
  "full:diagnostics:projected",
  "failure:diagnostics[].code:projected",
  "failure:diagnostics[].severity:fenced",
  "failure:diagnostics[].message:omitted",
  "failure:diagnostics[].hint:omitted",
  "failure:diagnostics[].source:omitted",
  "failure:diagnostics[].metadata:omitted",
  "diagnostic:diagnostics[].code:omitted",
  "diagnostic:diagnostics[].severity:projected",
  "diagnostic:diagnostics[].message:omitted",
  "diagnostic:diagnostics[].hint:omitted",
  "diagnostic:diagnostics[].source:omitted",
  "diagnostic:diagnostics[].metadata:omitted",
  "observed:result.observations[].status:projected",
  "observed:result.observations[].freshness:projected",
  "observed:result.observations[].replayed:fenced",
  "observed:result.observations[].degraded:projected",
  "observed:result.observations[].binding_ref:omitted",
  "view:result.view_id:projected",
  "view:result.view_contract.view_id:fenced",
  "view:result.view_contract.satisfied:projected",
  "view:result.view_contract.degraded:fenced",
  "view:result.view_contract.failures:fenced",
  "view:result.view_contract.contract_digest:omitted",
  "engine:result.provenance.sdk_versions.tsx_runtime.distribution_version:projected",
  "engine:result.provenance.sdk_versions.tsx_runtime.contract_fingerprint:projected",
  "engine:result.provenance.sdk_versions.tsx_runtime.note:omitted",
  "engine:result.provenance.sdk_versions.tsx_sdk.distribution_version:projected",
  "engine:result.provenance.sdk_versions.tsx_sdk.contract_fingerprint:projected",
  "engine:result.provenance.sdk_versions.tsx_sdk.note:omitted",
];

/** Variations that keep a reading admitted where the generic one could not: the fences move these fields together. */
const PAIRED: Readonly<Record<string, (source: JsonObject) => JsonObject>> = {
  "full:diagnostics": source => ({ ...source, diagnostics: [diagnosticRow("RF_RENDER_FLAGGED", "error")] }),
  "full:result.observations": source => withResult(source, { observations: [{ status: "unresolved", freshness: "captured_at_render", replayed: false }] }),
  // wb-hs2j.1 (RCA-R1): the inclusion leg reads the block count and the withheld count, so an emptied block list and one added
  // withheld decision are the admitted variations; varied()'s appended marker row is refused as a decision record.
  "full:result.blocks": source => withResult(source, { blocks: [] }),
  "full:result.necessity": source =>
    changed(source, "result.necessity", rows => [...(Array.isArray(rows) ? rows : []), rfFixtureDecision(false, "fixture.component:main::withheld")]),
  "full:result.diagnostics_summary.errors": source => withResult(source, { diagnostics_summary: { errors: 1, warnings: 0, has_errors: true, has_warnings: false } }),
  "full:result.diagnostics_summary.warnings": source => withResult(source, { diagnostics_summary: { errors: 0, warnings: 1, has_errors: false, has_warnings: true } }),
  "observed:result.observations[].freshness": source => changed(source, "result.observations[]", row => ({ ...objectOf(row, "row"), freshness: "reused", replayed: true })),
  "view:result.view_id": source => changed(changed(source, "result.view_id", () => "ctx.other"), "result.view_contract.view_id", () => "ctx.other"),
  "view:result.view_contract.satisfied": source =>
    changed(source, "result.view_contract", contract => ({ ...objectOf(contract, "view_contract"), satisfied: false, degraded: true, failures: [{ check: "fixture" }] })),
  "diagnostic:diagnostics[].severity": source => changed(source, "diagnostics[].severity", () => "error"),
};
function variedSource(field: Field): JsonObject {
  const paired = PAIRED[field.id];
  return paired !== undefined ? paired(BASES[field.base]()) : changed(BASES[field.base](), field.path, varied);
}

/** Why an omitted field may be dropped: no downstream Pi operation (topology, evidence, cache, graph view) reads it. */
const JUSTIFICATIONS: Readonly<Record<string, string>> = {
  "J-PAYLOAD-RESTATED": "rf's restatements of the context text (size, digest, path): Pi references the text by its own sha256 (nativePayloadRef) and no downstream Pi operation reads rf's restatement",
  "J-BUDGET-AUX": "budget terms other than context_window and available_context_tokens: validated or unread; the status line states only available of window and over-budget coverage, and no cache, query or view reads the rest",
  "J-STRUCTURE": "render structure inside the withheld context (components, effects, plan, transaction lists): Pi never surfaces the context body and the payload digest stands for it",
  "J-WORK-COUNTERS": "execution counters other than necessity_eval_count and tsx_worker_spawns: validated where fenced, read by no cache, query or view",
  "J-PROVENANCE-AUX": "auxiliary provenance (creation time, schema versions, storage, sibling SDK entries, wire format): ordering uses the host capture and observation instants, the version cohort the bundle or graph digest, the engine identity only the TSX entries",
  "J-POLICY-REVISION": "the necessity policy revision is no Pi version cohort: the cohort is the bundle digest, else the graph digest (owner ruling G-A, wb-973.8), and equal-payload renders under two policies stay distinct cache entries by their operation ids",
  "J-REQUEST-ECHO": "request echoes (audience, session id, a non-view scope, the judge's inputs and their lens layers, a replayed request key's operation): the host's own scope and invocation id key the cache and the viewport; no Pi operation reads rf's echo",
  "J-DIAGNOSTIC-TEXT": "diagnostic message, hint, source and metadata: withheld from every surfaced string; status reads only severity (ok form) or the primary code (failure form)",
  "J-DIAGNOSTIC-CODE": "a code in an ok envelope: only severity moves coverage; a code is surfaced only as a refusal's primary code",
  "J-ROW-AUX": "observation-row fields beyond status, freshness, replayed and degraded: the demotion note carries only status words and counts",
  "J-VIEW-AUX": "view-contract fields beyond view_id, satisfied, degraded and failures: the leg states only the failed-check count or the satisfied view id",
  "J-ENGINE-AUX": "engine-entry fields beyond distribution_version and contract_fingerprint: never read (wb-693.3)",
};

interface Admitted {
  readonly admitted: true;
  readonly topology: ReactiveFiberProjectionTopology;
  readonly evidence: NativeEvidence;
}
type Outcome = Admitted | { readonly admitted: false; readonly refusal: string };

function readingOf(source: JsonObject): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
/** The two projections Pi makes of one reading; a refusal is the observer's typed CapabilityError. */
function project(source: JsonObject, host: ReactiveFiberTopologyContext = HOST): Outcome {
  const reading = readingOf(source);
  try {
    return { admitted: true, topology: reactivefiberTopology(reading, host), evidence: nativeEvidence(PREVIEW_ID, reading) };
  } catch (error) {
    if (error instanceof CapabilityError) return { admitted: false, refusal: `${error.category}: ${error.message}` };
    throw error;
  }
}
function admitted(source: JsonObject, host: ReactiveFiberTopologyContext = HOST): Admitted {
  const outcome = project(source, host);
  if (!outcome.admitted) throw new Error(`expected an admitted reading, got ${outcome.refusal}`);
  return outcome;
}
function snapshotOf(source: JsonObject, host: ReactiveFiberTopologyContext = HOST): NativeSnapshot {
  const snapshot = admitted(source, host).topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the topology projected no snapshot");
  return snapshot;
}
/**
 * The body rows of one table section of the receipt, read through the shared docs reader (test/helpers/census.ts): the section
 * must render exactly one table and nothing else, carry no HTML (a comment or a tag) and keep its header, so a line added to the
 * append-only receipt can neither hide a row (a comment, an HTML block, a code fence) nor split the table and restate it. A cell
 * is the table's source text.
 */
function receiptTable(heading: string, header: readonly string[]): string[][] {
  const markdown = readFileSync(RECEIPT_PATH, "utf8");
  const where = `docs/workbench/receipts/wb-l4q7.md section "${heading}"`;
  const section = docsSection(markdown, heading, 3, RECEIPT_PARENTS);
  if (!section.ok) throw new Error(`${where}: ${section.why}`);
  if (section.hasHtml) throw new Error(`${where} carries HTML, which can hide a row of its table`);
  const kinds = section.blocks.map(block => (block.kind === "other" ? `other:${block.type}` : block.kind));
  if (!same(kinds, ["other:table"])) throw new Error(`${where} must render exactly one table and nothing else; it renders [${kinds.join(", ")}]`);
  const [head, ...rows] = sectionTables(markdown, heading, 3, RECEIPT_PARENTS).grids[0] ?? [];
  if (!same(head, header)) throw new Error(`${where}: its header row is ${JSON.stringify(head ?? null)}; the census binds ${JSON.stringify(header)}`);
  return rows.map(row => [...row]);
}

/** The parts of the projections that differ: snapshot keys, the relations, the diagnostics, the native evidence. */
function changedParts(before: Admitted, after: Admitted): string[] {
  const left: { [key: string]: unknown } = { ...before.topology.snapshots[0] };
  const right: { [key: string]: unknown } = { ...after.topology.snapshots[0] };
  const parts = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().filter(key => !same(left[key], right[key])).map(key => `snapshot.${key}`);
  if (!same(before.topology.relations, after.topology.relations)) parts.push("relations");
  if (!same(before.topology.diagnostics, after.topology.diagnostics)) parts.push("diagnostics");
  if (!same(before.evidence, after.evidence)) parts.push("evidence");
  return parts;
}
/** Every downstream Pi operation over one reading's projections, run on a fresh cache. */
function downstream(source: JsonObject): string {
  const outcome = admitted(source);
  const snapshot = snapshotOf(source);
  const cache = new ObservationProjection();
  const refresh = cache.refresh(snapshot);
  const stored = cache.query({ scope: SCOPE, limit: 10, ref: snapshot.source }).nodes;
  const view = buildGraphView(cache, VIEW);
  return JSON.stringify({ topology: outcome.topology, evidence: outcome.evidence, ref: nativeRefOf(outcome.evidence) ?? null, refresh, stored, view });
}

/** The cache fields a snapshot is stored as (observation.ts refresh), and the same fields read back from a stored node. */
function asStored(snapshot: NativeSnapshot): string {
  return JSON.stringify({
    nativeRef: snapshot.source, completeness: snapshot.coverage ?? "unknown", presentation: snapshot.node, kind: snapshot.kind ?? "native.snapshot",
    evidenceRefs: snapshot.evidenceRefs ?? [], sourceVersion: snapshot.sourceVersion ?? snapshot.sourceRevision, payloadRef: snapshot.nativePayloadRef,
  });
}
function storedAs(node: ObservedNode | undefined): string {
  if (node === undefined) return "absent";
  return JSON.stringify({
    nativeRef: node.nativeRef, completeness: node.completeness, presentation: node.presentation, kind: node.kind,
    evidenceRefs: node.evidenceRefs, sourceVersion: node.sourceVersion, payloadRef: node.payloadRef,
  });
}
function nodeOf(cache: ObservationProjection, snapshot: NativeSnapshot): ObservedNode | undefined {
  return cache.query({ scope: SCOPE, limit: 1, ref: snapshot.source }).nodes[0];
}
const revisionOf = (cache: ObservationProjection): number => cache.window({ scope: SCOPE, invocationId: INVOCATION, offset: 0, limit: 10 }).revision;

interface Variant {
  readonly id: string;
  readonly base: BaseId;
  /** Applied to the base and the variant alike: an additive field both readings carry. */
  readonly common?: (source: JsonObject) => JsonObject;
  readonly change: (source: JsonObject) => JsonObject;
  readonly host?: Partial<ReactiveFiberTopologyContext>;
}
const setTo = (path: string, value: Json) => (source: JsonObject): JsonObject => changed(source, path, () => value);

/** Acceptance (a): the variants of each read-visible family, each against its base with output.text unchanged. */
const FAMILIES: Readonly<Record<string, { readonly family: string; readonly variants: readonly Variant[] }>> = {
  A1: {
    family: "status",
    variants: [
      { id: "observation-row-status", base: "observed", change: setTo("result.observations[].status", "unresolved") },
      { id: "error-diagnostic", base: "full", change: source => ({ ...source, diagnostics: [diagnosticRow("RF_RENDER_FLAGGED", "error")] }) },
      { id: "summary-errors", base: "full", change: setTo("result.diagnostics_summary", { errors: 1, warnings: 0, has_errors: true, has_warnings: false }) },
      {
        id: "view-contract-unsatisfied",
        base: "view",
        change: source => changed(source, "result.view_contract", contract => ({ ...objectOf(contract, "view_contract"), satisfied: false, degraded: true, failures: [{ check: "fixture" }] })),
      },
    ],
  },
  A2: {
    family: "provenance",
    variants: [
      { id: "producer-release", base: "full", change: setTo("result.provenance.cli_version", "0.1.785") },
      { id: "engine-identity", base: "engine", change: setTo("result.provenance.sdk_versions.tsx_runtime.distribution_version", "2.9.8") },
    ],
  },
  A3: {
    family: "coverage",
    variants: [
      { id: "over-budget", base: "full", change: setTo("result.budget.formula_terms.available_context_tokens", -1) },
      { id: "replayed-row", base: "observed", change: source => changed(source, "result.observations[]", row => ({ ...objectOf(row, "row"), freshness: "reused", replayed: true })) },
    ],
  },
  A4: {
    family: "revisions",
    variants: [
      { id: "graph-revision", base: "full", change: setTo("result.provenance.graph_revision_id", digest("9")) },
      { id: "bundle-revision", base: "full", change: setTo("result.bundle_revision_id", digest("9")) },
    ],
  },
  A5: {
    family: "origin",
    variants: [
      { id: "workspace-id", base: "full", change: setTo("workspace.id", `rfw_${"z".repeat(22)}`) },
      { id: "fixture-seam", base: "full", change: source => source, host: { seam: "injected-fixture" } },
    ],
  },
  A6: {
    family: "accepted commit",
    variants: [
      { id: "render-id", base: "full", change: setTo("result.render_id", `rnd_${"c".repeat(22)}`) },
      { id: "commit-seq", base: "full", change: setTo("result.commit_seq", 1) },
      { id: "transaction-id", base: "full", change: setTo("transaction_id", `rft_${"c".repeat(22)}`) },
      { id: "not-ephemeral", base: "full", change: setTo("result.ephemeral", false) },
      { id: "storage-write", base: "full", change: setTo("result.work.storage_write_count", 1) },
    ],
  },
  A7: {
    family: "sensitivity",
    variants: [{ id: "sensitivity-label", base: "full", common: source => withResult(source, { sensitivity: "internal" }), change: setTo("result.sensitivity", "restricted") }],
  },
  A8: {
    family: "coverage digest",
    variants: [{ id: "coverage-digest", base: "full", common: source => withResult(source, { coverage_digest: digest("5") }), change: setTo("result.coverage_digest", digest("6")) }],
  },
};

/** One variant against its base: payload equality, the differing parts, distinct entries, and invalidation on a re-read. */
function measureVariant(variant: Variant): Json {
  const common = variant.common ?? ((source: JsonObject) => source);
  const before = common(BASES[variant.base]());
  const after = variant.change(common(BASES[variant.base]()));
  const host = { ...HOST, ...variant.host };
  const outcome = project(after, host);
  if (!outcome.admitted) return { id: variant.id, refused: outcome.refusal };
  const first = snapshotOf(before);
  const second = snapshotOf(after, host);
  const payloadEqual = first.nativePayloadRef !== undefined && first.nativePayloadRef === second.nativePayloadRef;
  const differs = changedParts(admitted(before), outcome);

  const distinctCache = new ObservationProjection();
  const other = snapshotOf({ ...after, operation_id: OTHER_OPERATION }, host);
  distinctCache.refresh(first);
  distinctCache.refresh(other);
  const eachStored = storedAs(nodeOf(distinctCache, first)) === asStored(first) && storedAs(nodeOf(distinctCache, other)) === asStored(other);

  const cache = new ObservationProjection();
  const builder = createGraphViewBuilder(cache);
  cache.refresh(first);
  builder.build(VIEW);
  builder.build(VIEW);
  const viewWarm = builder.lastBuild?.cacheHit === true;
  const revision = revisionOf(cache);
  const storedBefore = storedAs(nodeOf(cache, first));
  const refresh = cache.refresh(second);
  const revisionBumped = revisionOf(cache) > revision;
  builder.build(VIEW);
  const viewReused = builder.lastBuild?.cacheHit === true;
  const storedIsVariant = storedAs(nodeOf(cache, second)) === asStored(second);
  // Liveness of the comparison: the stored node moves exactly when a cached snapshot field differs.
  const storeMoved = storedAs(nodeOf(cache, second)) !== storedBefore;

  expect(payloadEqual, `${variant.id}: one payload`).toBe(true);
  expect(distinctCache.stats().nodes, `${variant.id}: two operations, two entries`).toBe(2);
  expect(eachStored).toBe(true);
  expect({ refresh, revisionBumped, storedIsVariant, viewWarm, viewReused }).toStrictEqual({ refresh: "applied", revisionBumped: true, storedIsVariant: true, viewWarm: true, viewReused: false });
  expect(storeMoved, `${variant.id}: the stored node moves exactly when a snapshot field differs`).toBe(differs.some(part => part.startsWith("snapshot.")));
  return {
    id: variant.id, payloadEqual, differs, distinct: { entries: distinctCache.stats().nodes, eachStored },
    reRead: { refresh, revisionBumped, storedIsVariant, storeMoved, viewWarm, viewReused },
  };
}
function familyCase(pin: string): () => Json {
  return () => {
    const entry = FAMILIES[pin];
    if (entry === undefined) throw new Error(`no family for ${pin}`);
    const measured = entry.variants.map(measureVariant);
    const refusedFamily = entry.family === "accepted commit";
    const unshipped = entry.family === "sensitivity" || entry.family === "coverage digest";
    for (const row of measured) {
      const record = objectOf(row, "measured variant");
      if (refusedFamily) expect(String(record.refused)).toMatch(/^validation: /);
      else if (unshipped) expect(record.differs).toEqual([]);
      else expect((record.differs as Json[]).length, `${String(record.id)} reaches the projection`).toBeGreaterThan(0);
    }
    return { family: entry.family, variants: measured };
  };
}

/** Every regular file below a root (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}
const SRC_FILES = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => relative(REPO, file));
const textOf = (file: string): string => readFileSync(join(REPO, file), "utf8");
/** The floor on src modules walked (115 at base 0b2a80f), so an emptied or misdirected walk reds. */
const SRC_FLOOR = 100;

function parsed(file: string, text: string): ts.SourceFile {
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function visit(node: ts.Node, fn: (node: ts.Node) => void): void {
  fn(node);
  node.forEachChild(child => visit(child, fn));
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
function enclosing(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined) return at.name.getText();
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent)) return at.parent.name.getText();
  }
  return "<module>";
}
const within = (node: ts.Node, outer: ts.Node): boolean => node.getStart() >= outer.getStart() && node.getEnd() <= outer.getEnd();

interface HashSite {
  readonly site: string;
  readonly digested: string;
  readonly payloadReference: boolean;
}
/** Every createHash and identityDigest call: what it digests (the chained update arguments, or the digest arguments) and whether
 * the hash is the value of a nativePayloadRef property (the observer's content reference). */
function hashSites(file: string, text: string): HashSite[] {
  const sites: HashSite[] = [];
  visit(parsed(file, text), node => {
    if (!ts.isCallExpression(node)) return;
    const name = calleeName(node);
    if (!ts.isIdentifier(node.expression) || (name !== "createHash" && name !== "identityDigest")) return;
    const digested: string[] = [];
    if (name === "identityDigest") digested.push(...node.arguments.map(argument => argument.getText()));
    let chain: ts.Node = node;
    while (ts.isPropertyAccessExpression(chain.parent) && ts.isCallExpression(chain.parent.parent)) {
      const call = chain.parent.parent;
      if (chain.parent.name.text === "update") digested.push(...call.arguments.map(argument => argument.getText()));
      chain = call;
    }
    let payloadReference = false;
    for (let at: ts.Node | undefined = node.parent; at !== undefined && !ts.isStatement(at); at = at.parent) {
      if (ts.isPropertyAssignment(at)) {
        payloadReference = at.name.getText() === "nativePayloadRef";
        break;
      }
    }
    sites.push({ site: `${file}#${enclosing(node)}:${name}`, digested: digested.join(", "), payloadReference });
  });
  return sites;
}
/** An argument naming an rf payload: its output, a payload reference or the rf-output prefix. */
const PAYLOAD_ARGUMENT = /\boutput\b|payloadRef|PayloadRef|rf-output/;
function payloadHashes(file: string, text: string): string[] {
  return hashSites(file, text)
    .filter(site => PAYLOAD_ARGUMENT.test(site.digested) && !(file === OBSERVER && site.payloadReference))
    .map(site => `${site.site}(${site.digested})`);
}
const PAYLOAD_NAMES: ReadonlySet<string> = new Set(["payloadRef", "nativePayloadRef"]);
const KEY_METHODS: ReadonlySet<string> = new Set(["get", "set", "has", "add", "delete"]);
const EQUALITY: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken,
]);
/** A payload reference in a key position: a Map/Set key argument, a JSON.stringify array key, an equality operand, a computed name. */
function payloadKeys(file: string, text: string): string[] {
  const found = new Set<string>();
  visit(parsed(file, text), node => {
    if (!ts.isIdentifier(node) || !PAYLOAD_NAMES.has(node.text)) return;
    for (let at: ts.Node | undefined = node.parent; at !== undefined && !ts.isStatement(at); at = at.parent) {
      if (ts.isCallExpression(at)) {
        const name = calleeName(at);
        const key = at.arguments[0];
        if (name !== undefined && KEY_METHODS.has(name) && ts.isPropertyAccessExpression(at.expression) && key !== undefined && within(node, key)) {
          found.add(`${file}:${at.getStart()}:collection-key`);
        }
        const array = at.arguments[0];
        if (at.expression.getText() === "JSON.stringify" && array !== undefined && ts.isArrayLiteralExpression(array) && within(node, array)) {
          found.add(`${file}:${at.getStart()}:compound-key`);
        }
      }
      if (ts.isBinaryExpression(at) && EQUALITY.has(at.operatorToken.kind)) {
        // A presence test (against undefined or null) compares no payloads; any other equality is a dedupe or diff key.
        const other = within(node, at.left) ? at.right : at.left;
        const presence = other.kind === ts.SyntaxKind.NullKeyword || (ts.isIdentifier(other) && other.text === "undefined") || ts.isVoidExpression(other);
        if (!presence) found.add(`${file}:${at.getStart()}:equality`);
      }
      if (ts.isComputedPropertyName(at)) found.add(`${file}:${at.getStart()}:computed-name`);
    }
  });
  return [...found].sort();
}

/** B1: the src modules that name rf, each with its role in the rf observation path. */
const RF_CONSUMERS: Readonly<Record<string, string>> = {
  "src/index.ts": "registration",
  "src/settings.ts": "configuration",
  "src/workbench/hosts/local-detached.ts": "registration",
  "src/workbench/latency.ts": "projection consumer (node fields only)",
  "src/workbench/native-evidence.ts": "projection",
  "src/workbench/native-modules.ts": "registration",
  "src/workbench/process-env.ts": "spawn environment",
  "src/workbench/providers/reactivefiber.ts": "producer (reading = envelope verbatim)",
  "src/workbench/reactivefiber-observer.ts": "projection",
  "src/workflow/reconcile.ts": "reconcile read roster",
};
const RF_TOKEN = /reactivefiber|reactive_fiber|REACTIVE_?FIBER/i;
/** The planes a reading or its projection enters without naming rf: the caches, the views, the journal and the receipts. */
const GENERIC_PLANES: readonly string[] = [
  "src/workbench/evidence-loader.ts", "src/workbench/graph-view.ts", "src/workbench/observation.ts", "src/workbench/reconcile-decision.ts",
  "src/workbench/reconcile-tool.ts", "src/workflow/journal.ts", "src/workflow/runtime.ts",
];
const PLANES: readonly string[] = [...new Set([
  ...Object.entries(RF_CONSUMERS).filter(([, role]) => role.startsWith("projection") || role.startsWith("producer") || role.startsWith("reconcile")).map(([file]) => file),
  ...GENERIC_PLANES,
])].sort();
/** B2: every hash site in the planes and what it binds. */
const PLANE_HASH_SITES: Readonly<Record<string, string>> = {
  "src/workbench/reactivefiber-observer.ts#previewSnapshot:createHash": "payload reference: rf-output:sha256 of output.text, stored as nativePayloadRef, never a key",
  "src/workbench/reconcile-decision.ts#mintEvidenceReceipt:identityDigest#1": "receipt input digest: the capability input, never the reading",
  "src/workbench/reconcile-decision.ts#mintEvidenceReceipt:identityDigest#2": "receipt result digest: the whole reading, every field bound",
  "src/workbench/reconcile-decision.ts#mintEvidenceReceipt:createHash": "receipt id: contract, task, position, capability, input digest, result digest, observation instant",
  "src/workbench/reconcile-decision.ts#decideReconcile:identityDigest": "acknowledgement resolved-value digest: an operator value, never a reading",
  "src/workbench/reconcile-decision.ts#decideReconcile:createHash#1": "acknowledgement id: entry digest, determination, principal, cited receipt ids",
  "src/workbench/reconcile-decision.ts#decideReconcile:createHash#2": "override id: entry digest, cited acknowledgement, principal",
  "src/workflow/journal.ts#journalKey:createHash": "agent call key: prompt and call options, never a reading",
  "src/workflow/journal.ts#nodeJournalKey:createHash": "node call key: capability and input, never the reading",
  "src/workflow/reconcile.ts#entryDigestOf:createHash": "journal entry binding: position, key, outcome, capability, effect class, basis",
};
/** Hash sites numbered within one function and callee, in source order. */
function numberedSites(sites: readonly HashSite[]): string[] {
  const totals = new Map<string, number>();
  for (const site of sites) totals.set(site.site, (totals.get(site.site) ?? 0) + 1);
  const seen = new Map<string, number>();
  return sites.map(site => {
    const index = (seen.get(site.site) ?? 0) + 1;
    seen.set(site.site, index);
    return (totals.get(site.site) ?? 0) > 1 ? `${site.site}#${index}` : site.site;
  });
}

interface Control {
  readonly id: string;
  /** Whether the scans must report the shape (a planted key) or stay quiet on it (a reference or a presence test). */
  readonly expected: "reported" | "quiet";
  readonly file: string;
  readonly text: string;
}
/** The observer's reference shape, composed from two parts so no literal here holds a template placeholder. */
const REFERENCE_SHAPE = ["const parts = { nativePayloadRef: `rf-output:sha256:$", "{createHash('sha256').update(output.text).digest('hex')}` };"].join("");
/** B5: shapes the scans must report, the shapes they must not, and (outside B5) the aliased shape of Q2. */
const CONTROLS: readonly Control[] = [
  { id: "hash-key", expected: "reported", file: "src/workbench/control-a.ts", text: 'const key = createHash("sha256").update(result.output.text).digest("hex"); cache.set(key, node);' },
  { id: "identity-digest", expected: "reported", file: "src/workbench/control-b.ts", text: 'const id = identityDigest("rf-payload", reading.source.result.output);' },
  { id: "seen-has", expected: "reported", file: "src/workbench/control-c.ts", text: "if (seen.has(snapshot.nativePayloadRef)) return;" },
  { id: "equality-skip", expected: "reported", file: "src/workbench/control-d.ts", text: "function skip(prior: N, node: N) { if (prior.payloadRef === node.payloadRef) return true; return false; }" },
  { id: "index-key", expected: "reported", file: "src/workbench/control-e.ts", text: "index.set(JSON.stringify([scope, node.payloadRef]), node.key);" },
  { id: "computed-name", expected: "reported", file: "src/workbench/control-f.ts", text: "const byPayload = { [node.payloadRef]: node };" },
  { id: "reference-elsewhere", expected: "reported", file: "src/workbench/control-g.ts", text: REFERENCE_SHAPE },
  { id: "reference-site", expected: "quiet", file: OBSERVER, text: REFERENCE_SHAPE },
  { id: "presence-test", expected: "quiet", file: "src/workbench/control-i.ts", text: "const refs = [...(parts.nativePayloadRef !== undefined ? [parts.nativePayloadRef] : []), ...(node.payloadRef === null ? [] : ['x'])];" },
  { id: "aliased", expected: "quiet", file: "src/workbench/control-h.ts", text: 'const body = result.output.text; const k = createHash("sha256").update(body).digest("hex"); cache.set(k, node);' },
];
function controlReading(control: Control): Json {
  return { id: control.id, hashes: payloadHashes(control.file, control.text).length, keys: payloadKeys(control.file, control.text).map(hit => hit.split(":").pop() ?? "") };
}

/** A string token of src naming an observer contract, in code or in a literal. */
const OBSERVER_CONTRACT = /observer[_-]?contract/i;
function observerContractTokens(file: string, text: string): string[] {
  const tokens: string[] = [];
  visit(parsed(file, text), node => {
    if ((ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && OBSERVER_CONTRACT.test(node.text)) {
      tokens.push(`${file}:${node.getStart()}`);
    }
  });
  return tokens;
}
/** An array-of-strings constant of a src module, read through the parser (an anchor outside this census). */
function stringConstant(file: string, name: string): string[] {
  let values: string[] | undefined;
  visit(parsed(file, textOf(file)), node => {
    if (!ts.isVariableDeclaration(node) || node.name.getText() !== name || node.initializer === undefined) return;
    let initializer: ts.Expression = node.initializer;
    while (ts.isAsExpression(initializer) || ts.isParenthesizedExpression(initializer)) initializer = initializer.expression;
    if (!ts.isArrayLiteralExpression(initializer)) return;
    values = initializer.elements.map(element => (ts.isStringLiteral(element) ? element.text : `<${element.getText()}>`));
  });
  if (values === undefined) throw new Error(`${file} declares no string-array constant ${name}`);
  return values;
}

/** The bead's own export row (the committed store export at the tree under test). */
function beadNotes(): string {
  const line = readFileSync(EXPORT_PATH, "utf8").split("\n").find(row => row.includes(`"id":"${BEAD}"`));
  if (line === undefined) throw new Error(`${BEAD} is not in the store export`);
  const row: unknown = JSON.parse(line);
  if (!isObject(row) || typeof row.notes !== "string") throw new Error(`${BEAD}'s export row carries no notes`);
  return row.notes;
}
/** The acceptance clause letters and both read-visible family lists the bead states. */
function beadSpec(notes: string): { letters: string[]; families: string[] } {
  const start = notes.indexOf("Acceptance:");
  if (start < 0) throw new Error("the bead states no acceptance");
  const acceptance = notes.slice(start, notes.indexOf("\n", start) < 0 ? undefined : notes.indexOf("\n", start));
  const letters = [...acceptance.matchAll(/\(([a-z])\) /g)].map(match => match[1] ?? "");
  const statement = /read-visible fields \(([^)]+)\)/.exec(notes)?.[1] ?? "";
  const clause = /\(a\) [^;]*?differing in ([^;]+?) occupy/.exec(acceptance)?.[1] ?? "";
  const normalize = (family: string): string => (family === "revision" ? "revisions" : family);
  const families = [...statement.split(", "), ...clause.split(/, | or /)].map(item => normalize(item.trim())).filter(item => item.length > 0);
  return { letters, families: [...new Set(families)].sort() };
}

interface Row {
  readonly id: string;
  readonly clause: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and the bead's export row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    clause: "a",
    label: "(a) equal-payload rf readings that differ in a read-visible field occupy distinct cache entries or, re-read under one identity, trigger invalidation; none is ever deduped",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
  },
  {
    id: "B",
    clause: "b",
    label: "(b) a guard over Pi's rf adapters and observation planes finds no payload-only hash key over an rf observation, and its scans report every planted key shape",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
  },
  {
    id: "C",
    clause: "c",
    label: "(c) a census maps every rf envelope field to its projection; each omitted field carries a factorization justification and no downstream Pi operation reads it",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "D",
    clause: "d",
    label: "(d) gated on ObserverContract/v1: no observer-contract carrier exists in src or in the captured rf result roster, so no declared projection is echoed yet",
    pins: ["D1"],
  },
  {
    id: "Q",
    clause: "residual",
    label: "the named residuals R-UNSHIPPED-FIELDS and R-ALIASED-PAYLOAD stay pinned quiet",
    pins: ["Q1", "Q2"],
  },
];

function fieldOutcome(field: Field): Json {
  const outcome = project(variedSource(field));
  if (!outcome.admitted) return { id: field.id, refused: outcome.refusal };
  return { id: field.id, changed: changedParts(admitted(BASES[field.base]()), outcome) };
}
function receiptOf(source: JsonObject): { receiptId: string; resultDigest: string | null } {
  const receipt = mintEvidenceReceipt({
    taskId: "task-rf-cache-key", position: 0, producer: "reactivefiber", capabilityId: PREVIEW_ID, input: { model: "m", task: "t" },
    requestedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z", result: readingOf(source), recordedNativeRefs: [],
  });
  return { receiptId: receipt.receiptId, resultDigest: receipt.resultDigest ?? null };
}

const IMPL: Readonly<Record<string, () => Json>> = {
  ...Object.fromEntries(Object.keys(FAMILIES).map(pin => [pin, familyCase(pin)])),
  B1: () => {
    const named = SRC_FILES.filter(file => RF_TOKEN.test(textOf(file)));
    expect(SRC_FILES.length, `src modules walked: ${SRC_FILES.length}`).toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(named, "a src module naming rf needs a role in RF_CONSUMERS").toStrictEqual(Object.keys(RF_CONSUMERS).sort());
    return { walked: SRC_FILES.length >= SRC_FLOOR, consumers: named.map(file => `${file}: ${RF_CONSUMERS[file] ?? "unclassified"}`) };
  },
  B2: () => {
    const sites = PLANES.flatMap(file => numberedSites(hashSites(file, textOf(file))));
    expect(PLANES.every(file => SRC_FILES.includes(file)), "every plane module exists").toBe(true);
    expect(sites.sort(), "a hash site in an observation plane needs a classification").toStrictEqual(Object.keys(PLANE_HASH_SITES).sort());
    return { planes: PLANES.length, sites: sites.map(site => `${site}: ${PLANE_HASH_SITES[site] ?? "unclassified"}`) };
  },
  B3: () => {
    const hits = SRC_FILES.flatMap(file => payloadHashes(file, textOf(file)));
    const reference = hashSites(OBSERVER, textOf(OBSERVER)).filter(site => site.payloadReference && PAYLOAD_ARGUMENT.test(site.digested));
    const prefixes = SRC_FILES.filter(file => textOf(file).includes("rf-output:"));
    expect(hits, "a hash over an rf payload outside the observer's nativePayloadRef reference").toEqual([]);
    expect(reference.map(site => site.digested)).toEqual(["output.text"]);
    expect(prefixes).toEqual([OBSERVER]);
    return { hits, reference: reference.map(site => `${site.site}(${site.digested})`), prefixFiles: prefixes };
  },
  B4: () => {
    const hits = SRC_FILES.flatMap(file => payloadKeys(file, textOf(file)));
    const mentions = SRC_FILES.filter(file => /\b(?:native)?[pP]ayloadRef\b/.test(textOf(file)));
    expect(mentions.length, "the payload reference is spelled in src").toBeGreaterThanOrEqual(2);
    expect(hits, "a payload reference used as a key, a dedupe identity or a diff comparison").toEqual([]);
    return { hits, mentionFiles: mentions };
  },
  B5: () => {
    const readings = CONTROLS.filter(control => control.id !== "aliased").map(control => ({ control, reading: objectOf(controlReading(control), control.id) }));
    for (const { control, reading } of readings) {
      const reported = Number(reading.hashes) + (Array.isArray(reading.keys) ? reading.keys.length : 0);
      if (control.expected === "quiet") expect(reported, `${control.id} stays quiet`).toBe(0);
      else expect(reported, `${control.id} is reported`).toBeGreaterThan(0);
    }
    return readings.map(({ reading }) => reading);
  },
  B6: () => {
    // Every admitted reading-side variant of row A (the seam variant changes the host, not the reading, so it has no receipt).
    const variants = Object.values(FAMILIES).flatMap(entry => entry.variants).filter(variant => variant.host === undefined);
    const rows = variants.flatMap(variant => {
      const common = variant.common ?? ((source: JsonObject) => source);
      const after = variant.change(common(BASES[variant.base]()));
      if (!project(after).admitted) return [];
      const before = receiptOf(common(BASES[variant.base]()));
      const minted = receiptOf(after);
      return [{ id: variant.id, distinctResult: before.resultDigest !== minted.resultDigest, distinctReceipt: before.receiptId !== minted.receiptId }];
    });
    const again = same(receiptOf(BASES.full()), receiptOf(BASES.full()));
    expect(rows.every(row => row.distinctResult && row.distinctReceipt)).toBe(true);
    expect(again).toBe(true);
    return { variants: rows, deterministic: again };
  },
  B7: () => {
    const snapshot = snapshotOf(BASES.full());
    const sameIdentity = new ObservationProjection();
    sameIdentity.refresh(snapshot);
    sameIdentity.refresh({ ...snapshot, nativePayloadRef: `rf-output:${digest("7")}` });
    const samePayload = new ObservationProjection();
    samePayload.refresh(snapshot);
    samePayload.refresh(snapshotOf({ ...BASES.full(), operation_id: OTHER_OPERATION }));
    const reading = { sameIdentityEntries: sameIdentity.stats().nodes, storedPayload: nodeOf(sameIdentity, snapshot)?.payloadRef ?? null, samePayloadEntries: samePayload.stats().nodes };
    expect(reading).toStrictEqual({ sameIdentityEntries: 1, storedPayload: `rf-output:${digest("7")}`, samePayloadEntries: 2 });
    return reading;
  },
  B8: () => {
    // wb-l4q7 (the o4h0.1 gate's F1): one payload under two identities, read back through the stored count, window(), query() by
    // scope and by invocation, and the graph view. The gate's plants P10 (window) and P10c (query) dedupe on an aliased payload
    // reference the B3/B4 scans cannot see.
    const first = snapshotOf(BASES.full());
    const second = snapshotOf({ ...BASES.full(), operation_id: OTHER_OPERATION });
    const cache = new ObservationProjection();
    const refreshed = [cache.refresh(first), cache.refresh(second)];
    const ids = (nodes: readonly { readonly nativeRef: { readonly id: string } }[]): string[] => nodes.map(node => node.nativeRef.id).sort();
    const viewport = cache.window({ scope: SCOPE, invocationId: INVOCATION, offset: 0, limit: 10 });
    const reading = {
      payloadEqual: first.nativePayloadRef !== undefined && first.nativePayloadRef === second.nativePayloadRef,
      refreshed,
      identities: [first.source.id, second.source.id].sort(),
      stored: cache.stats().nodes,
      window: { rows: ids(viewport.nodes), total: viewport.total },
      byScope: ids(cache.query({ scope: SCOPE, limit: 10 }).nodes),
      byInvocation: ids(cache.query({ scope: SCOPE, invocationId: INVOCATION, limit: 10 }).nodes),
      view: ids(buildGraphView(cache, VIEW).nodes),
    };
    expect(reading.payloadEqual, "the two readings carry one payload").toBe(true);
    expect(new Set(reading.identities).size, "under two identities").toBe(2);
    const paths = { window: reading.window.rows, byScope: reading.byScope, byInvocation: reading.byInvocation, view: reading.view };
    for (const [path, rows] of Object.entries(paths)) expect(rows, `${path} keeps both readings`).toStrictEqual(reading.identities);
    return reading;
  },
  C1: () => {
    const roster = readRfResultRoster();
    const derived = universe();
    const resultKeys = [...new Set(FIELDS.filter(field => field.base === "full" && field.path.startsWith("result.")).map(field => field.path.split(".")[1] ?? ""))].sort();
    const provenanceKeys = [...new Set(FIELDS.filter(field => field.path.startsWith("result.provenance.")).map(field => field.path.split(".")[2] ?? ""))];
    const envelopeKeys = [...new Set(FIELDS.filter(field => field.base === "full" && !field.path.startsWith("result.")).map(field => field.path.split(".")[0] ?? ""))].sort();
    const diagnosticKeys = FIELDS.filter(field => field.base === "failure").map(field => field.path.split(".")[1] ?? "");
    const okDiagnosticKeys = FIELDS.filter(field => field.base === "diagnostic").map(field => field.path.split(".")[1] ?? "");
    const slices = FIELDS.filter(field => field.base !== "full").map(field => [field.base, field.path]);
    const engineEntries = [...new Set(FIELDS.filter(field => field.base === "engine").map(field => field.path.split(".")[3] ?? ""))];
    const workKeys = FIELDS.filter(field => field.path.startsWith("result.work.")).map(field => field.path.split(".")[2] ?? "");
    expect(FIELDS.map(field => field.id), "the census rows are exactly the field universe").toStrictEqual(derived);
    expect(resultKeys).toStrictEqual([...roster.resultKeys].sort());
    expect(roster.provenanceKeys.every(key => provenanceKeys.includes(key))).toBe(true);
    // The envelope's result is entered, not a row: the rows name every other envelope key the observer and the provider pin.
    expect([...envelopeKeys, "result"].sort()).toStrictEqual([...stringConstant(OBSERVER, "ENVELOPE_KEYS")].sort());
    expect([...envelopeKeys, "result"].sort()).toStrictEqual([...stringConstant(PROVIDER, "RF_KEYS")].sort());
    expect(diagnosticKeys).toStrictEqual(stringConstant(OBSERVER, "DIAGNOSTIC_KEYS"));
    expect(okDiagnosticKeys).toStrictEqual(stringConstant(OBSERVER, "DIAGNOSTIC_KEYS"));
    // wb-l4q7 (the o4h0.1 gate's F3): the additive slices, which this census authors, held to the receipt's slice table.
    expect(slices, "the additive-slice fields stand in the receipt's slice table").toStrictEqual(receiptTable(SLICE_SECTION, SLICE_HEADER));
    expect(engineEntries).toStrictEqual(stringConstant(OBSERVER, "ENGINE_KEYS"));
    expect(workKeys).toStrictEqual(stringConstant(OBSERVER, "WORK_KEYS"));
    expect(workKeys).toStrictEqual(roster.workKeys);
    return {
      rows: FIELDS.length, byBase: Object.fromEntries((Object.keys(BASES) as BaseId[]).map(base => [base, FIELDS.filter(field => field.base === base).length])),
      resultKeys: resultKeys.length, rosterRfVersion: roster.rfVersion, envelopeKeys, diagnosticKeys, engineEntries, workKeys: workKeys.length,
      anchoredSlices: slices.length,
    };
  },
  C2: () => {
    const rows = FIELDS.filter(field => field.disposition === "projected").map(fieldOutcome);
    for (const row of rows) expect(isObject(row) && Array.isArray(row.changed) && row.changed.length > 0, `projected ${JSON.stringify(row)}`).toBe(true);
    return rows;
  },
  C3: () => {
    const rows = FIELDS.filter(field => field.disposition === "fenced").map(fieldOutcome);
    for (const row of rows) expect(isObject(row) && typeof row.refused === "string" && row.refused.startsWith("validation: "), `fenced ${JSON.stringify(row)}`).toBe(true);
    return rows;
  },
  C4: () => {
    const omitted = FIELDS.filter(field => field.disposition === "omitted");
    const rows = omitted.map(field => {
      const outcome = fieldOutcome(field);
      const factors = downstream(BASES[field.base]()) === downstream(variedSource(field));
      expect(isObject(outcome) && Array.isArray(outcome.changed) && outcome.changed.length === 0, `omitted ${JSON.stringify(outcome)}`).toBe(true);
      expect(factors, `${field.id}: every downstream Pi operation factors through the reduced view`).toBe(true);
      return { id: field.id, why: field.why ?? null, factors };
    });
    // Liveness of the downstream leg: a projected field's variation reaches it, so an identical reading above is a measurement.
    const downstreamLive = downstream(BASES.full()) !== downstream(changed(BASES.full(), "result.output.text", varied));
    expect(downstreamLive).toBe(true);
    return { rows, downstreamLive };
  },
  C5: () => {
    const used = [...new Set(FIELDS.flatMap(field => (field.why === undefined ? [] : [field.why])))].sort();
    expect(FIELDS.filter(field => field.disposition === "omitted").every(field => field.why !== undefined && JUSTIFICATIONS[field.why] !== undefined)).toBe(true);
    expect(FIELDS.filter(field => field.disposition !== "omitted").every(field => field.why === undefined)).toBe(true);
    expect(used).toStrictEqual(Object.keys(JUSTIFICATIONS).sort());
    return Object.fromEntries(used.map(id => [id, FIELDS.filter(field => field.why === id).length]));
  },
  D1: () => {
    const roster = readRfResultRoster();
    const tokens = SRC_FILES.flatMap(file => observerContractTokens(file, textOf(file)));
    const rosterKeys = [...roster.resultKeys, ...roster.provenanceKeys].filter(key => OBSERVER_CONTRACT.test(key));
    const control = observerContractTokens("src/workbench/control.ts", 'export const OBSERVER_CONTRACT_V1 = "ObserverContract/v1";').length;
    expect(tokens, "an ObserverContract carrier in src arms acceptance (d)").toEqual([]);
    expect(rosterKeys, "an observer-contract key in the captured roster arms acceptance (d)").toEqual([]);
    expect(control).toBe(2);
    expect(REACTIVEFIBER_OBSERVATION_CONTRACT).toBe("workbench.reactivefiber-observation/v1");
    return { srcTokens: tokens.length, rosterKeys, control, observerContract: REACTIVEFIBER_OBSERVATION_CONTRACT };
  },
  Q1: () => {
    const roster = readRfResultRoster();
    const unshipped = /sensitiv|coverage[_-]?digest/i;
    const rosterKeys = [...roster.resultKeys, ...roster.provenanceKeys].filter(key => unshipped.test(key));
    const base = admitted(BASES.full());
    const carried = admitted(withResult(BASES.full(), { sensitivity: "restricted", coverage_digest: digest("6") }));
    const reading = { rosterKeys, projectionReadsThem: changedParts(base, carried) };
    expect(reading).toStrictEqual({ rosterKeys: [], projectionReadsThem: [] });
    return reading;
  },
  Q2: () => {
    const aliased = CONTROLS.find(control => control.id === "aliased");
    if (aliased === undefined) throw new Error("the aliased control is missing");
    const reading = controlReading(aliased);
    expect(reading).toStrictEqual({ id: "aliased", hashes: 0, keys: [] });
    return reading;
  },
};

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly clause: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly families: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly fields: readonly string[];
  readonly justifications: Readonly<Record<string, string>>;
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.fields) || !Array.isArray(raw.families) || !isObject(raw.justifications)) {
    throw new Error("the roster needs a bead, families, rows, fields and justifications");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.clause !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a clause, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, clause: row.clause, label: row.label, pins };
  });
  const strings = (value: unknown[], field: string): string[] => {
    if (!value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
    return value.map(item => String(item));
  };
  const justifications = Object.fromEntries(Object.entries(raw.justifications).map(([id, text]) => {
    if (typeof text !== "string") throw new Error(`roster justification ${id} must be a string`);
    return [id, text];
  }));
  return { bead: raw.bead, families: strings(raw.families, "families"), rows, fields: strings(raw.fields, "fields"), justifications };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

describe("wb-o4h0.1 rf observation cache-key census (RF-FEDERATED-WORKSPACES-R1)", () => {
  it("the judged set: the frozen shapes, the out-of-file roster, the receipt's judged-pin table, the bead's export row and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:8", "B:8", "C:5", "D:1", "Q:2"]);
    // wb-l4q7 (the o4h0.1 gate's F2): every row's pins, in order, held to the receipt's judged-pin table outside this census.
    expect(ROWS.flatMap(row => row.pins.map(pin => [row.id, pin])), "the pins stand in the receipt's judged-pin table").toStrictEqual(receiptTable(PIN_SECTION, PIN_HEADER));
    expect(ROWS.map(({ id, clause, label, pins }) => ({ id, clause, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, clause, label, pins }) => ({ id, clause, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(FIELDS.map(field => `${field.base}:${field.path}:${field.disposition}`)).toEqual(FROZEN_FIELDS);
    expect(FIELDS.map(field => `${field.id}:${field.disposition}${field.why !== undefined ? `:${field.why}` : ""}`)).toStrictEqual([...ROSTER.fields]);
    expect(JUSTIFICATIONS).toStrictEqual(ROSTER.justifications);
    const spec = beadSpec(beadNotes());
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROWS.filter(row => row.clause !== "residual").map(row => row.clause)).toStrictEqual(spec.letters);
    expect(Object.values(FAMILIES).map(entry => entry.family).sort()).toStrictEqual(spec.families);
    expect([...ROSTER.families].sort()).toStrictEqual(spec.families);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});

