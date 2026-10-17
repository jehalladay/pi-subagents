/** ReactiveFiber reader adapter (docs/workbench/09 § Reader adapters: "RF: render context provenance and context artifact
 * references."). It consumes exactly the value the registered reactivefiber.render.preview provider returns (providers/
 * reactivefiber.ts: the contract, the workspace root and the validated reactive-fiber.cli/v1 envelope of a noncommitted preview)
 * and projects one snapshot plus, when the host names the invoking operation, one display-grouping edge. Pure and synchronous: no
 * clock, randomness, environment, file, process or SDK access and no projection mutation; the caller applies the frozen result with
 * ObservationProjection.refresh and relate. This module never invokes rf, so it can never issue a history-creating verb; it only
 * reads an envelope the host already holds. Only the full noncommitted-preview shape (ok, ephemeral, render_id null, transaction_id
 * null, zero storage writes, a sha256 graph basis) can read as a render; an error summary or an exhausted budget is partial, an
 * RF_ failure stays a failure and anything malformed or contradictory is refused. The context text itself is never copied: it is
 * referenced by its sha256 digest, so no output, budget payload or diagnostic body reaches any surfaced string.
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

type JsonRecord = {[key: string]: JsonValue};
interface CheckedContext {
  scope: ObservationScope; seam: ReactiveFiberSeam; capturedAt: string; observedAt: string; invocationId?: string; operationRef?: NativeRef;
}
interface Summary {errors: number; warnings: number}

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

/** Freezes a tree this module just built; nothing in it is shared with the caller's input. */
function frozen<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    const children: unknown[] = Object.values(value);
    for (const child of children) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/** The host context, copied field by field after validation; scope, invocation and operation identities must already be displayable. */
function checkedContext(context: ReactiveFiberTopologyContext): CheckedContext {
  if (!isObject(context)) throw refused('the host context must be an object');
  const {scope, seam, capturedAt, observedAt, invocationId, operationRef} = context;
  if (!isObject(scope) || !identity(scope.workspace) || !identity(scope.principal)) {
    throw refused('the host scope needs a bounded, displayable workspace and principal');
  }
  if (seam !== 'rf-cli' && seam !== 'injected-fixture') throw refused('the host seam must be rf-cli or injected-fixture');
  if (!instant(capturedAt) || !instant(observedAt)) throw refused('capture and observation times must be zone-qualified ISO-8601 instants');
  if (invocationId !== undefined && !identity(invocationId)) throw refused('the invocation id must be a bounded, displayable identity');
  if (operationRef !== undefined && (!isObject(operationRef) || !identity(operationRef.provider) || !identity(operationRef.type) ||
    !identity(operationRef.id) || operationRef.scope !== undefined && !identity(operationRef.scope))) {
    throw refused('the operation reference must name a bounded, displayable native identity');
  }
  return {
    scope: {workspace: scope.workspace, principal: scope.principal}, seam, capturedAt, observedAt,
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
  const work = record(result.work);
  if (!work || !hasExactKeys(work, WORK_KEYS) || !WORK_KEYS.every(key => count(work[key]))) throw refused('result.work needs exactly the six non-negative integer counters');
  if (work.storage_write_count !== 0) throw refused('result.work.storage_write_count must be 0: a preview writes nothing');

  const window = Number(formula.context_window);
  const available = formula.available_context_tokens;
  const overBudget = available < 0;
  const flagged = summary.has_errors || diagnostics.some(item => item.severity === 'error');
  const counts: Summary = {errors: summary.errors, warnings: summary.warnings};
  const live = host.seam === 'rf-cli';
  const budget = overBudget ? `over budget by ${-available} (context window ${window} tokens)` : `${available} of ${window} context tokens available`;
  const statusText = `${SEAM_LABEL[host.seam]} · ${budget} · necessity evals ${work.necessity_eval_count} · ${counts.errors} errors, ${counts.warnings} warnings`;
  const clean = live && !flagged && !overBudget;
  const notes = ['ephemeral noncommitted preview: render_id null, transaction_id null, 0 storage writes', 'context text withheld: referenced by sha256 digest'];
  if (!live) notes.push('fixture seam: not a real generated context');
  if (flagged) notes.push('render reported errors: partial, not a clean render');
  if (overBudget) notes.push('context exceeds the available budget: partial');
  if (release !== undefined) notes.push(`producer release from result.provenance.cli_version: rf@${release}`);
  return {
    operationId: String(envelope.operation_id), coverage: clean ? 'complete' : 'partial', statusTone: clean ? 'success' : 'unknown', statusText,
    evidenceRefs: [`rf-graph:${graph}`, `rf-workspace:${workspaceId}`, ...(release !== undefined ? [`rf-cli:${release}`] : [])], notes, sourceRevision: graph,
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
  if (value.workspaceRoot !== host.scope.workspace) throw new CapabilityError('authorization', 'RF reading workspace differs from observer scope.');
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
