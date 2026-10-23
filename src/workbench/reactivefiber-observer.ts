/** ReactiveFiber reader adapter (docs/workbench/09 § Reader adapters: "RF: render context provenance and context artifact
 * references."). It consumes exactly the value the registered reactivefiber.render.preview provider returns (providers/
 * reactivefiber.ts: the contract, the workspace root and the validated reactive-fiber.cli/v1 envelope of a noncommitted preview)
 * and projects one snapshot plus, when the host names the invoking operation, one display-grouping edge. Pure and synchronous: no
 * clock, randomness, environment, file, process or SDK access and no projection mutation; the caller applies the frozen result with
 * ObservationProjection.refresh and relate. This module never invokes rf, so it can never issue a history-creating verb; it only
 * reads an envelope the host already holds. Only the full noncommitted-preview shape (ok, ephemeral, render_id null, transaction_id
 * null, zero storage writes, a sha256 graph basis) can read as a render; an error summary, an exhausted budget, an observation
 * row that observed no value, was replayed from an earlier render or was degraded, an unsatisfied --view contract, or a render
 * that states no inclusion records, includes no block or withholds a judged candidate (wb-hs2j.1: exit 0 is never document
 * completeness) is partial, an RF_ failure stays a failure and anything malformed or contradictory is refused. The context text
 * itself is never copied: it is referenced by its sha256 digest, so no output, budget payload or diagnostic body reaches any
 * surfaced string; of an observation row only its status word and the row counts ever do, of a view contract only its
 * failed-check count and, when it is satisfied, its view id, and of the inclusion records only their counts.
 */
import {createHash} from 'node:crypto';
import {CapabilityError, type JsonValue} from './capability-registry.js';
import {reportedRelease} from './native-evidence.js';
import type {NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT} from './providers/reactivefiber.js';
import {sanitizeWorkbenchText, stripUnsafeText} from './redaction.js';

/** This adapter's projection contract, for the tool wiring that will surface it. */
export const REACTIVEFIBER_OBSERVATION_CONTRACT = 'workbench.reactivefiber-observation/v1';
/** Exactly the statement ObservationProjection.relate accepts; this adapter only ever states display grouping. */
export type ReactiveFiberObservedRelation = Parameters<ObservationProjection['relate']>[0];
/** Where the envelope came from: the installed rf CLI, or a test/fixture seam whose text is never a real generated context. */
export type ReactiveFiberSeam = 'rf-cli' | 'injected-fixture';
/** Host-bound context of one read: the authenticated scope, the seam the envelope came through, the host's own clock readings and,
 * optionally, the invocation and the operation (such as the workflow node call) that issued the read. */
export interface ReactiveFiberTopologyContext {
  scope: ObservationScope;
  seam: ReactiveFiberSeam;
  capturedAt: string;
  observedAt: string;
  invocationId?: string;
  operationRef?: NativeRef;
  /** wb-973.4 (SCG-R4): the RF workspace root the host authorized (the validated reactivefiberWorkspaceRoot setting). When present it,
   * and only it, replaces scope.workspace as the root a reading may name; scope.workspace stays the Pi realpath. */
  authorizedRfRoot?: string;
}
/** Deeply frozen: one preview snapshot, at most one grouping edge and at most 8 sanitized diagnostics. */
export interface ReactiveFiberProjectionTopology {
  snapshots: readonly NativeSnapshot[];
  relations: readonly ReactiveFiberObservedRelation[];
  diagnostics: readonly string[];
}

const CONTRACT = REACTIVEFIBER_RENDER_PREVIEW_CONTRACT;
const SCHEMA = REACTIVE_FIBER_CLI_SCHEMA;
const COMMAND = 'context.render';
const ENVELOPE_KEYS = ['schema', 'ok', 'command', 'operation_id', 'workspace', 'transaction_id', 'result', 'diagnostics'];
const DIAGNOSTIC_KEYS = ['code', 'severity', 'message', 'hint', 'source', 'metadata'];
const WORK_KEYS = ['source_capture_count', 'fiber_signal_count', 'component_render_count', 'lens_resolution_count', 'necessity_eval_count', 'storage_write_count'];
const FORMULA_KEYS = ['context_window', 'output_reserve', 'occupied_tokens', 'overhead', 'safety_margin'];
const OPERATION_ID = /^rfo_[0-9a-z]{22,32}$/;
const WORKSPACE_ID = /^rfw_[0-9a-z]{22,32}$/;
const GRAPH_DIGEST = /^sha256:[0-9a-f]{64}$/;
const FAILURE_CODE = /^RF_[A-Z0-9_]{1,60}$/;
const MAX_IDENTITY_BYTES = 256;
const DIAGNOSTIC = 200;
const MAX_DIAGNOSTICS = 8;
/** A zone-qualified ISO-8601 instant; looser text that Date.parse still accepts names no comparable host clock reading. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;
/** A UTF-16 code unit orphaned when a length bound cuts through a surrogate pair. */
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;
const SEAM_LABEL: Readonly<Record<ReactiveFiberSeam, string>> = {
  'rf-cli': 'noncommitted preview (rf-cli)',
  'injected-fixture': 'fixture seam (not a real render)',
};
/** The JL-A34 engine keys (RF ruling A28): an object-shaped result.provenance.sdk_versions carries them exactly when the render
 * loaded a TSX definition, beside the sibling SDK entries and the wire format, which this reader never reads. */
const ENGINE_KEYS = ['tsx_runtime', 'tsx_sdk'] as const;
/** The fingerprint an engine entry states when its lock pins no digest. */
const UNKNOWN_FINGERPRINT = 'unknown';
const ENGINE_NOTE = 'TSX engine identity from result.provenance.sdk_versions: a foreign runtime executed component source';
/** The producer-closed result.engine_metrics counters (wb-693.4): exactly these two, each a non-negative integer. */
const ENGINE_METRIC_KEYS = ['tsx_worker_spawns', 'tsx_resource_rounds'];
const SPAWN_NOTE = 'TSX worker spawned (result.engine_metrics.tsx_worker_spawns): a foreign runtime executed component source';
/** The pinned rf observed-value statuses (domain/observation.py:100@8a8b83e4d): a row reading either one observed a value. */
const OBSERVED_STATUSES: ReadonlySet<string> = new Set(['observed', 'null']);
/** At most this many distinct not-observed status words are listed in the observations note (wb-973.10). */
const MAX_STATUS_WORDS = 4;
/** A status word the note lists verbatim: a bounded ASCII token like every pinned word, so four of them, their separators and
 * the counts always fit inside DIAGNOSTIC and no listed word can carry a separator, a gap or a line break. */
const STATUS_WORD = /^[A-Za-z0-9_.-]{1,24}$/;
/** Marks the not-observed status words the note does not list. */
const UNLISTED = '…';
/** A --view render's view id: the INIT-FS-A14 declared-id grammar and bound of result.view_id and result.view_contract.view_id
 * (context.render.schema.json :1029-1033 and :1199-1203 at ReactiveFiberCLI 8a8b83e4d), so a named id is plain ASCII. */
const VIEW_ID = /^[a-z][a-z0-9_-]*(?:\.[a-z][a-z0-9_-]*)*$/;
const MAX_VIEW_ID = 128;
/** The two inclusion records a render carries (wb-hs2j.1): the final document's blocks and the per-candidate necessity decisions. */
const INCLUSION_KEYS = ['blocks', 'necessity'] as const;

type JsonRecord = {[key: string]: JsonValue};
interface CheckedContext {
  scope: ObservationScope; seam: ReactiveFiberSeam; capturedAt: string; observedAt: string; invocationId?: string; operationRef?: NativeRef; authorizedRfRoot?: string;
}
interface Summary {errors: number; warnings: number}
/** One demotion leg's verdict (wb-973.9): a leg that demotes holds the preview at partial and states its note; one that does not may
 * carry the witness note a clean render states. Each leg is its own function and the caller composes them, so the view_contract
 * leg (wb-973.2) sits beside observationRowsDemotion rather than inside it. */
type Demotion = {demotes: true; note: string} | {demotes: false; witness?: string};

const record = (value: JsonValue | undefined): JsonRecord | undefined =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value : undefined;
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const refused = (message: string): CapabilityError => new CapabilityError('validation', `ReactiveFiber topology refused: ${message}.`);
/** A bounded identity: non-empty, at most 256 UTF-8 bytes, no terminal sequence, control or bidi character. */
const identity = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= MAX_IDENTITY_BYTES && stripUnsafeText(value) === value;
const instant = (value: unknown): value is string => typeof value === 'string' && ISO_INSTANT.test(value) && Number.isFinite(Date.parse(value));
const count = (value: JsonValue | undefined): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
const hasExactKeys = (value: JsonRecord, keys: readonly string[]): boolean =>
  Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));

/** Producer or host text bound for display: the shared helper's label layout, then a code unit the bound orphaned is dropped. */
function shown(value: string, max: number): string {
  return sanitizeWorkbenchText(value, max, 'label').replace(LONE_SURROGATE, '').trim();
}

/** One rf-engine:<key>:<distribution_version>:<contract_fingerprint> reference per engine entry whose two identity strings are
 * bounded (wb-693.1), in ENGINE_KEYS order: the version passes identity() and the shared label layout shows it unchanged, and
 * the fingerprint is the graph digest's sha256:<64 lowercase hex> form or the literal 'unknown'. Nothing else is read
 * (wb-693.3): no other field of an entry, no sibling SDK entry and no engine metric reaches a surfaced string, and an entry
 * failing either bound is dropped, never rewritten. A LIST-shaped sdk_versions (rf <= 0.1.709), an absent one or any other
 * shape records no engine identity and is never a refusal (wb-693.2). */
function engineRefs(versions: JsonValue | undefined): string[] {
  const entries = record(versions);
  const refs: string[] = [];
  for (const key of ENGINE_KEYS) {
    const entry = entries !== undefined && Object.hasOwn(entries, key) ? record(entries[key]) : undefined;
    const version = entry?.distribution_version;
    const fingerprint = entry?.contract_fingerprint;
    if (identity(version) && shown(version, MAX_IDENTITY_BYTES) === version && typeof fingerprint === 'string' &&
      (GRAPH_DIGEST.test(fingerprint) || fingerprint === UNKNOWN_FINGERPRINT)) refs.push(`rf-engine:${key}:${version}:${fingerprint}`);
  }
  return refs;
}

/** The tsx_worker_spawns of a stated, exactly-closed result.engine_metrics (wb-693.4), else 0 when it is absent: only a validated
 * non-negative safe integer reaches the reference, so no producer text is ever surfaced. */
function engineSpawns(result: JsonRecord): number {
  if (!Object.hasOwn(result, 'engine_metrics')) return 0;
  const metrics = record(result.engine_metrics);
  if (!metrics || !hasExactKeys(metrics, ENGINE_METRIC_KEYS) || !ENGINE_METRIC_KEYS.every(key => count(metrics[key]))) {
    throw refused('result.engine_metrics needs exactly the two non-negative integer counters tsx_worker_spawns and tsx_resource_rounds');
  }
  return Number(metrics.tsx_worker_spawns);
}

/** The bundle the render pinned (wb-973.8 SCG-R8), or nothing when the envelope states none. The pinned rf schema types a stated
 * result.bundle_revision_id as sha256:<64 lowercase hex>, never null, and keeps an envelope without it valid, so a stated value
 * of any other shape is refused, never dropped or rewritten. Owner ruling G-A: the bundle owns the snapshot's sourceVersion (the
 * version cohort key) and rides as the rf-bundle reference; graph_revision_id stays sourceRevision and the rf-graph reference. */
function bundleRevision(result: JsonRecord): string | undefined {
  if (!Object.hasOwn(result, 'bundle_revision_id')) return undefined;
  const bundle = result.bundle_revision_id;
  if (typeof bundle !== 'string' || !GRAPH_DIGEST.test(bundle)) throw refused('result.bundle_revision_id must be sha256:<64 lowercase hex> when stated');
  return bundle;
}

/** The observation-row demotion leg (wb-973.10 SCG-R10, wb-973.9 SCG-R9): what result.observations contributes, which can only
 * demote. Every row states a string status, a freshness from the pinned closed pair captured_at_render or reused, a boolean
 * replayed and, when it states one, a boolean degraded; anything else is refused, and so are the two pinned contradictions this
 * reader fences: replayed must be true exactly when freshness is reused (context.render.schema.json :1144), and a degraded row
 * cannot have status observed. A row demotes the preview to partial when it observed no value (a status other than an observed
 * value; rf's status vocabulary is open, so an unknown word reads as not observed and is never refused), when it is degraded
 * (counted as not observed under its own status word) or when it was replayed from an earlier render (counted by replayed, whose
 * agreement with freshness the fence holds). A demoting set adds one note naming the row count, the reused count when it is not
 * 0 and the not-observed words; an all-fresh set of observed values demotes nothing and carries only the witness note,
 * 'observations: <n> rows, 0 reused', which the caller states on a clean render alone. An absent key and an empty list add
 * nothing at all. No other row field is read, and of the four read only the status words and the counts reach a surfaced string:
 * the note lists at most MAX_STATUS_WORDS distinct words, each one the shared label layout shows unchanged, and marks any other
 * not-observed status with UNLISTED, so a row's executable, binding_ref, observed_dep_refs, freshness_witness, timestamps, ids,
 * codes and digests never do. */
function observationRowsDemotion(value: JsonValue | undefined): Demotion {
  if (value === undefined) return {demotes: false};
  if (!Array.isArray(value)) throw refused('result.observations must be an array of rows');
  const listed: string[] = [];
  let notObserved = 0;
  let reused = 0;
  let unlisted = false;
  for (const item of value) {
    const row = record(item);
    const status = row?.status;
    if (row === undefined || typeof status !== 'string') throw refused('every result.observations row must be an object with a string status');
    const {freshness, replayed} = row;
    if (freshness !== 'captured_at_render' && freshness !== 'reused') throw refused('every result.observations row must state freshness captured_at_render or reused');
    if (typeof replayed !== 'boolean') throw refused('every result.observations row must state a boolean replayed');
    const degraded = Object.hasOwn(row, 'degraded') ? row.degraded : false;
    if (typeof degraded !== 'boolean') throw refused('a stated result.observations degraded flag must be a boolean');
    if ((freshness === 'reused') !== replayed) throw refused('a result.observations row is replayed exactly when its freshness is reused');
    if (degraded && status === 'observed') throw refused('a degraded result.observations row cannot have status observed');
    if (replayed) reused += 1;
    if (OBSERVED_STATUSES.has(status) && !degraded) continue;
    notObserved += 1;
    if (listed.includes(status)) continue;
    if (listed.length < MAX_STATUS_WORDS && STATUS_WORD.test(status) && shown(status, DIAGNOSTIC) === status) listed.push(status);
    else unlisted = true;
  }
  if (value.length === 0) return {demotes: false};
  const rows = `observations: ${value.length} ${value.length === 1 ? 'row' : 'rows'}`;
  if (reused === 0 && notObserved === 0) return {demotes: false, witness: `${rows}, 0 reused`};
  const words = unlisted ? [...listed, UNLISTED] : listed;
  const terms = [...(reused > 0 ? [`${reused} reused`] : []), ...(notObserved > 0 ? [`${notObserved} not observed (${words.join(', ')})`] : [])];
  return {demotes: true, note: `${rows}, ${terms.join(', ')}: partial`};
}

/** Freezes a tree this module just built; nothing in it is shared with the caller's input. */
function frozen<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    const children: unknown[] = Object.values(value);
    for (const child of children) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/** The view_contract demotion leg of a --view render (wb-973.2, SCG-R2), beside the observation leg: what result.view_contract
 * contributes, which can only demote. Of the outcome (ViewContractOutcome.to_json at ReactiveFiberCLI 8a8b83e4d,
 * domain/view_contract.py:236-249) it reads the satisfied and degraded flags, the length of the failures list and the view id,
 * and nothing else, so no check row, expected or actual text, unavailable lens source, view revision or contract digest reaches a
 * surfaced string; the object stays open to additive keys. The pinned contradictions are refused: satisfied holds exactly when
 * failures is empty and degraded is its negation (view_contract.py:217-225, the flags-versus-counts fence of diagnostics_summary),
 * the outcome names the view the render was scoped to (result.view_id, context.render.schema.json :1199-1203), and a --view render
 * carries a null result.scope (render_service.py:1509 and :1515-1526; schema :1033). An unsatisfied outcome demotes the preview to
 * partial with one note naming only the failed-check count; a satisfied one demotes nothing and carries a witness note naming the
 * view id, which the caller states on a clean render alone. A render without result.view_contract, a --view render of an rf that
 * predates the contract included, adds nothing. */
function viewContractLeg(result: JsonRecord): Demotion {
  const viewed = Object.hasOwn(result, 'view_id');
  if (viewed && Object.hasOwn(result, 'scope') && result.scope !== null) throw refused('a --view render (result.view_id) must carry a null result.scope');
  if (!Object.hasOwn(result, 'view_contract')) return {demotes: false};
  const outcome = record(result.view_contract);
  if (!outcome) throw refused('result.view_contract must be an object');
  const {view_id: viewId, satisfied, degraded, failures} = outcome;
  if (typeof satisfied !== 'boolean' || typeof degraded !== 'boolean' || !Array.isArray(failures)) {
    throw refused('result.view_contract needs boolean satisfied and degraded flags and a failures array');
  }
  if (typeof viewId !== 'string' || viewId.length > MAX_VIEW_ID || !VIEW_ID.test(viewId)) {
    throw refused(`result.view_contract.view_id must be a declared view id of at most ${MAX_VIEW_ID} characters`);
  }
  if (!viewed || result.view_id !== viewId) throw refused('result.view_contract must name the view the render was scoped to (result.view_id)');
  if (degraded === satisfied) throw refused('result.view_contract degraded must be the negation of satisfied');
  if (satisfied !== (failures.length === 0)) throw refused('result.view_contract satisfied contradicts its failures');
  if (satisfied) return {demotes: false, witness: `view contract: satisfied (${viewId})`};
  return {demotes: true, note: `view contract: ${failures.length} failed ${failures.length === 1 ? 'check' : 'checks'}: partial`};
}

/** The inclusion leg (wb-hs2j.1, RF-REACTIVE-CONTEXT-ASSEMBLY-R1), beside the observation and view_contract legs: what the render
 * states about which candidate blocks reached its document, which can only demote. An rf exit 0 is never document completeness
 * (ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:36 at 6a251bf73af5:
 * a render executed seven components while six candidate blocks were excluded under task-conditional necessity, and only context
 * explain reported host_necessity:6). context explain reads a recorded render and a --no-commit preview records none (render_id
 * null), and the render's own result.summary.counts_by_stage is unshipped (RFCLI rfc-s24ro.2, open), so the leg reads the two
 * inclusion records the preview itself carries: result.blocks, the blocks of the final document (context.render.schema.json
 * :628-640 at 6a251bf73af5), and result.necessity, one decision record per judged candidate with a boolean include (:907-936). A
 * judged candidate decided include false is exactly the one explain counts at host_necessity (integrations/components.py:3015-3060
 * _judged_outcome and domain/rendering.py:806-822 exclusion_stage_for at 6a251bf73af5). A render that does not state both lists
 * has not been diagnosed and is partial; zero included blocks is never a complete document; one withheld candidate holds the
 * preview at partial. A stated list of another shape is refused, never dropped. Of either list only its length and the count of
 * include false rows reach a surfaced string: no candidate key, component id, reason, judge or token cost does. A diagnosed render
 * with at least one block and no withheld candidate demotes nothing and adds no note, so a clean projection stays byte-identical
 * to the one this reader made before the leg existed. Two stages stay uncounted until summary.counts_by_stage ships: a candidate
 * dropped at host_visibility is never judged, so neither list states it, and telling a judged candidate the budget cut at
 * sdk_assembly from an included one would need a candidate_key join across the two lists whose occurrence keys (rfc-s24ro.17)
 * this reader does not pin, so it counts lengths only. */
function inclusionLeg(result: JsonRecord): Demotion {
  const stated = INCLUSION_KEYS.filter(key => Object.hasOwn(result, key));
  if (stated.length < INCLUSION_KEYS.length) {
    const missing = INCLUSION_KEYS.filter(key => !stated.includes(key)).map(key => `result.${key}`).join(' and ');
    return {demotes: true, note: `inclusion not diagnosed: ${missing} absent: partial`};
  }
  const {blocks, necessity} = result;
  if (!Array.isArray(blocks) || !blocks.every(item => record(item) !== undefined)) throw refused('result.blocks must be an array of block objects');
  if (!Array.isArray(necessity) || !necessity.every(item => typeof record(item)?.include === 'boolean')) {
    throw refused('result.necessity must be an array of decision records, each with a boolean include');
  }
  const withheld = necessity.filter(item => record(item)?.include === false).length;
  const judged = `${necessity.length} judged ${necessity.length === 1 ? 'candidate' : 'candidates'}`;
  const head = `inclusion: ${blocks.length} ${blocks.length === 1 ? 'block' : 'blocks'} included, ${withheld} of ${judged} withheld at host_necessity`;
  return blocks.length === 0 || withheld > 0 ? {demotes: true, note: `${head}: partial`} : {demotes: false};
}

/** The host context, copied field by field after validation; scope, invocation and operation identities must already be displayable. */
function checkedContext(context: ReactiveFiberTopologyContext): CheckedContext {
  if (!isObject(context)) throw refused('the host context must be an object');
  const {scope, seam, capturedAt, observedAt, invocationId, operationRef, authorizedRfRoot} = context;
  if (!isObject(scope) || !identity(scope.workspace) || !identity(scope.principal)) {
    throw refused('the host scope needs a bounded, displayable workspace and principal');
  }
  if (seam !== 'rf-cli' && seam !== 'injected-fixture') throw refused('the host seam must be rf-cli or injected-fixture');
  if (!instant(capturedAt) || !instant(observedAt)) throw refused('capture and observation times must be zone-qualified ISO-8601 instants');
  if (authorizedRfRoot !== undefined && !identity(authorizedRfRoot)) throw refused('the authorized RF root must be a bounded, displayable identity');
  if (invocationId !== undefined && !identity(invocationId)) throw refused('the invocation id must be a bounded, displayable identity');
  if (operationRef !== undefined && (!isObject(operationRef) || !identity(operationRef.provider) || !identity(operationRef.type) ||
    !identity(operationRef.id) || operationRef.scope !== undefined && !identity(operationRef.scope))) {
    throw refused('the operation reference must name a bounded, displayable native identity');
  }
  return {
    scope: {workspace: scope.workspace, principal: scope.principal}, seam, capturedAt, observedAt,
    ...(authorizedRfRoot !== undefined ? {authorizedRfRoot} : {}),
    ...(invocationId !== undefined ? {invocationId} : {}),
    ...(operationRef !== undefined ? {operationRef: {provider: operationRef.provider, type: operationRef.type, id: operationRef.id,
      ...(operationRef.scope !== undefined ? {scope: operationRef.scope} : {})}} : {}),
  };
}

/** One rf diagnostic in the CLI's strict six-key shape. */
function diagnostic(value: JsonValue): JsonRecord | undefined {
  const item = record(value);
  if (!item || !hasExactKeys(item, DIAGNOSTIC_KEYS)) return undefined;
  const {code, severity, message, hint, source, metadata} = item;
  const valid = typeof code === 'string' && /^[A-Z][A-Z0-9_]+$/.test(code) && (severity === 'info' || severity === 'warning' || severity === 'error') &&
    typeof message === 'string' && (hint === null || typeof hint === 'string') && (source === null || typeof source === 'string') && record(metadata) !== undefined;
  return valid ? item : undefined;
}

/** The refusal (ok false) of a render: one primary RF_ error diagnostic, a null result and no transaction. */
function failureSnapshot(envelope: JsonRecord, diagnostics: readonly JsonRecord[], host: CheckedContext, workspaceId: string | undefined): ProjectionParts {
  const primary = diagnostics[0];
  const code = primary?.code;
  if (primary === undefined || primary.severity !== 'error' || typeof code !== 'string' || !FAILURE_CODE.test(code)) {
    throw refused('a failed envelope needs a primary RF_ error diagnostic');
  }
  if (envelope.result !== null) throw refused('a failed envelope carries a result');
  const operationId = String(envelope.operation_id);
  const text = `refused · ${code}`;
  return {
    operationId, coverage: 'unknown', statusTone: 'failure', statusText: host.seam === 'injected-fixture' ? `${SEAM_LABEL[host.seam]} · ${text}` : text,
    evidenceRefs: workspaceId !== undefined ? [`rf-workspace:${workspaceId}`] : [],
    notes: [`render refused with ${code}`, 'diagnostic message, hint and metadata withheld'],
  };
}

interface ProjectionParts {
  operationId: string;
  coverage: NonNullable<NativeSnapshot['coverage']>;
  statusTone: Presentation['statusTone'];
  statusText: string;
  evidenceRefs: readonly string[];
  notes: readonly string[];
  sourceVersion?: string;
  sourceRevision?: string;
  nativePayloadRef?: string;
}

/** The noncommitted-preview success shape of providers/reactivefiber.ts isPreviewEnvelope, plus the cross-field contradictions. */
function previewSnapshot(envelope: JsonRecord, diagnostics: readonly JsonRecord[], host: CheckedContext, workspaceId: string): ProjectionParts {
  const result = record(envelope.result);
  if (!result) throw refused('an ok envelope needs an object result');
  if (result.ephemeral !== true) throw refused('result.ephemeral must be true');
  if (result.render_id !== null) throw refused('result.render_id must be null: a committed render is not a preview');
  if (Object.hasOwn(result, 'commit_seq') && result.commit_seq !== null) throw refused('result.commit_seq must be absent or null');
  const output = record(result.output);
  if (!output || typeof output.text !== 'string') throw refused('result.output.text must be a string');
  const provenance = record(result.provenance);
  const graph = provenance?.graph_revision_id;
  if (typeof graph !== 'string' || !GRAPH_DIGEST.test(graph)) throw refused('result.provenance.graph_revision_id must be sha256:<64 lowercase hex>');
  // The producer's own release, read only when the envelope states it (wb-2j3.1; wb-2j3.2: an absent one is never synthesized).
  // Owner ruling G-A: it travels as a distinct rf-cli evidence reference and a note, never as sourceVersion.
  const release = reportedRelease(provenance?.cli_version);
  // RF ruling A28 engine identity, read only from an object-shaped sdk_versions: references and one note, never coverage or tone.
  const engines = engineRefs(provenance?.sdk_versions);
  // wb-973.8 (SCG-R8): the pinned bundle, read only when stated; it keys the version cohort beside the graph digest's revision.
  const bundle = bundleRevision(result);
  const formula = record(record(result.budget)?.formula_terms);
  if (!formula || !FORMULA_KEYS.every(key => count(formula[key])) || typeof formula.available_context_tokens !== 'number' ||
    !Number.isSafeInteger(formula.available_context_tokens)) {
    throw refused('result.budget.formula_terms needs non-negative integer terms and an integer available_context_tokens');
  }
  const summary = record(result.diagnostics_summary);
  if (!summary || !count(summary.errors) || !count(summary.warnings) || typeof summary.has_errors !== 'boolean' || typeof summary.has_warnings !== 'boolean') {
    throw refused('result.diagnostics_summary needs integer counts and boolean flags');
  }
  if (summary.has_errors !== summary.errors > 0 || summary.has_warnings !== summary.warnings > 0) {
    throw refused('result.diagnostics_summary flags contradict its counts');
  }
  // wb-693.4: engine_metrics is read only when stated (a pre-TSX rf states none and is never refused); a stated one is closed.
  const spawns = engineSpawns(result);
  const work = record(result.work);
  if (!work || !hasExactKeys(work, WORK_KEYS) || !WORK_KEYS.every(key => count(work[key]))) throw refused('result.work needs exactly the six non-negative integer counters');
  if (work.storage_write_count !== 0) throw refused('result.work.storage_write_count must be 0: a preview writes nothing');
  // wb-973.10 (SCG-R10) and wb-973.9 (SCG-R9): the observation-row demotion leg; a row can demote the preview, never upgrade it.
  const observations = observationRowsDemotion(result.observations);

  // wb-973.2 (SCG-R2): the view_contract leg beside the observation leg; an unsatisfied contract can demote, never upgrade.
  const contractLeg = viewContractLeg(result);
  // wb-hs2j.1 (RCA-R1): the inclusion leg; exit 0 is never document completeness, so an undiagnosed, empty or withheld render demotes.
  const inclusion = inclusionLeg(result);

  const window = Number(formula.context_window);
  const available = formula.available_context_tokens;
  const overBudget = available < 0;
  const flagged = summary.has_errors || diagnostics.some(item => item.severity === 'error');
  const counts: Summary = {errors: summary.errors, warnings: summary.warnings};
  const live = host.seam === 'rf-cli';
  const budget = overBudget ? `over budget by ${-available} (context window ${window} tokens)` : `${available} of ${window} context tokens available`;
  const statusText = `${SEAM_LABEL[host.seam]} · ${budget} · necessity evals ${work.necessity_eval_count} · ${counts.errors} errors, ${counts.warnings} warnings`;
  const clean = live && !flagged && !overBudget && !observations.demotes && !contractLeg.demotes && !inclusion.demotes;
  const notes = ['ephemeral noncommitted preview: render_id null, transaction_id null, 0 authoritative storage writes (envelope storage_write_count)', 'context text withheld: referenced by sha256 digest'];
  // The contract leg states its note when it demotes and its witness on a clean render alone, so a partial render is unchanged.
  if (contractLeg.demotes) notes.push(contractLeg.note);
  else if (clean && contractLeg.witness !== undefined) notes.push(contractLeg.witness);
  // The inclusion leg states its note whenever it demotes, early so the diagnostics bound never drops it; a clean render adds none.
  if (inclusion.demotes) notes.push(inclusion.note);
  if (!live) notes.push('fixture seam: not a real generated context');
  if (flagged) notes.push('render reported errors: partial, not a clean render');
  if (overBudget) notes.push('context exceeds the available budget: partial');
  // A demoting leg states its note; an all-fresh list states its witness only on a clean render, so a partial one is unchanged.
  if (observations.demotes) notes.push(observations.note);
  else if (clean && observations.witness !== undefined) notes.push(observations.witness);
  if (release !== undefined) notes.push(`producer release from result.provenance.cli_version: rf@${release}`);
  // One foreign-runtime note: the identity note already states it, so the spawn note is added only beside no identity.
  if (engines.length > 0) notes.push(ENGINE_NOTE);
  else if (spawns > 0) notes.push(SPAWN_NOTE);
  return {
    operationId: String(envelope.operation_id), coverage: clean ? 'complete' : 'partial', statusTone: clean ? 'success' : 'unknown', statusText,
    evidenceRefs: [`rf-graph:${graph}`, `rf-workspace:${workspaceId}`, ...(bundle !== undefined ? [`rf-bundle:${bundle}`] : []),
      ...(release !== undefined ? [`rf-cli:${release}`] : []), ...engines, ...(spawns > 0 ? [`rf-engine-spawns:${spawns}`] : [])], notes,
    ...(bundle !== undefined ? {sourceVersion: bundle} : {}), sourceRevision: graph,
    nativePayloadRef: `rf-output:sha256:${createHash('sha256').update(output.text).digest('hex')}`,
  };
}

/** One reactivefiber.render.preview snapshot and, when context.operationRef names the invoking operation, one grouping edge from
 * it. Every refusal is a CapabilityError raised before anything is projected: 'validation' for an unrecognized contract, envelope,
 * field or contradiction; 'authorization' for a reading of another workspace. */
export function reactivefiberTopology(reading: JsonValue, context: ReactiveFiberTopologyContext): ReactiveFiberProjectionTopology {
  const host = checkedContext(context);
  const value = record(reading);
  if (!value || value.contract !== CONTRACT) throw refused(`the reading must be the ${CONTRACT} provider output`);
  if (typeof value.workspaceRoot !== 'string' || value.workspaceRoot.length === 0) throw refused('workspaceRoot must be a non-empty string');
  if (value.workspaceRoot !== (host.authorizedRfRoot ?? host.scope.workspace)) throw new CapabilityError('authorization', 'RF reading workspace differs from observer scope.');
  const envelope = record(value.source);
  if (!envelope || !hasExactKeys(envelope, ENVELOPE_KEYS)) throw refused('source must be the strict eight-key rf envelope');
  if (envelope.schema !== SCHEMA || envelope.command !== COMMAND) throw refused(`source must be a ${SCHEMA} ${COMMAND} envelope`);
  if (typeof envelope.ok !== 'boolean') throw refused('source.ok must be a boolean');
  if (typeof envelope.operation_id !== 'string' || !OPERATION_ID.test(envelope.operation_id)) throw refused('source.operation_id must be an rfo_ identifier');
  if (envelope.transaction_id !== null) throw refused('source.transaction_id must be null: a noncommitted read opens no transaction');
  if (!Array.isArray(envelope.diagnostics)) throw refused('source.diagnostics must be an array');
  const diagnostics: JsonRecord[] = [];
  for (const item of envelope.diagnostics) {
    const checked = diagnostic(item);
    if (!checked) throw refused('source.diagnostics holds a malformed rf diagnostic');
    diagnostics.push(checked);
  }
  const workspace = record(envelope.workspace);
  if (envelope.workspace !== null && !workspace) throw refused('source.workspace must be an object or, on a failure, null');
  if (workspace && (!hasExactKeys(workspace, ['id', 'root']) || typeof workspace.id !== 'string' || !WORKSPACE_ID.test(workspace.id) || workspace.root !== value.workspaceRoot)) {
    throw refused('source.workspace needs an rfw_ id and the reading workspace root');
  }
  const workspaceId = workspace ? String(workspace.id) : undefined;
  let parts: ProjectionParts;
  if (envelope.ok) {
    if (workspaceId === undefined) throw refused('an ok envelope needs a workspace');
    parts = previewSnapshot(envelope, diagnostics, host, workspaceId);
  } else {
    parts = failureSnapshot(envelope, diagnostics, host, workspaceId);
  }

  const ref: NativeRef = {provider: 'reactivefiber', type: 'context-preview', id: parts.operationId, scope: host.scope.workspace};
  const {operationRef} = host;
  if (operationRef && operationRef.provider === ref.provider && operationRef.type === ref.type && operationRef.id === ref.id && operationRef.scope === ref.scope) {
    throw refused('the operation reference aliases the preview node itself');
  }
  const snapshot: NativeSnapshot = {
    source: ref, scope: {...host.scope}, capturedAt: host.capturedAt, observedAt: host.observedAt, coverage: parts.coverage,
    node: {title: shown(`RF context preview ${parts.operationId}`, 120), type: 'sdk-operation', statusText: shown(parts.statusText, 200), statusTone: parts.statusTone},
    kind: 'reactivefiber.render.preview.snapshot', evidenceRefs: [...parts.evidenceRefs],
    ...(parts.sourceVersion !== undefined ? {sourceVersion: parts.sourceVersion} : {}),
    ...(parts.sourceRevision !== undefined ? {sourceRevision: parts.sourceRevision} : {}),
    ...(parts.nativePayloadRef !== undefined ? {nativePayloadRef: parts.nativePayloadRef} : {}),
    ...(host.invocationId !== undefined ? {trace: {invocationId: host.invocationId}} : {}),
  };
  // Display grouping only: the envelope names no lifecycle owner, so no native confirmation reference is ever stated.
  const relations: ReactiveFiberObservedRelation[] = operationRef === undefined ? [] : [{scope: {...host.scope}, from: {...operationRef}, to: {...ref},
    kind: 'grouping', provenance: {source: 'reactivefiber', observedAt: host.observedAt}}];
  const notes = [...parts.notes, 'no native interval supplied'];
  return frozen({snapshots: [snapshot], relations, diagnostics: notes.slice(0, MAX_DIAGNOSTICS).map(text => shown(text, DIAGNOSTIC))});
}
