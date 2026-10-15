/** HyperUnix hyperunix.find reader adapter (docs/workbench/09 § Reader adapters: "HX: query coverage/bounds/query basis, and
 * optional graph traversal of linked native refs"). It consumes exactly the value the registered hyperunix.find provider returns
 * (providers/hyperunix.ts: the contract, the vendored SDK's hyperunix.result/1 representation, the workspace root and the runtime
 * identity) and projects one query snapshot plus, when the host names the invoking operation, one display-grouping edge. Pure and
 * synchronous: no clock, randomness, environment, file or SDK access and no projection mutation; the caller applies the frozen
 * result with ObservationProjection.refresh and relate. Only a runtime-licensed absence on a complete kind is complete coverage:
 * an incomplete or unlicensed answer stays partial and never a success, a failed query stays a failure, and a mutation outcome
 * is refused because this is a read adapter. Row, claim and certificate bodies are never read into any output field.
 */
import {createHash} from 'node:crypto';
import {CapabilityError, type JsonValue} from './capability-registry.js';
import type {NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {redactWorkbenchText, stripUnsafeText} from './redaction.js';

/** This adapter's projection contract, for the tool wiring that will surface it. */
export const HYPERUNIX_OBSERVATION_CONTRACT = 'workbench.hyperunix-observation/v1';
/** The vendored SDK's closed ExecutionStatusKind set (@hyperunix/sdk dist/result.d.ts) in declaration order. The test suite pins
 * it to the SDK type and to the shipped declaration, so an SDK enum change fails there rather than reading as a known kind. */
export const HYPERUNIX_EXECUTION_KINDS = Object.freeze([
  'complete', 'complete-empty', 'incomplete', 'budget-exhausted', 'cancelled', 'view-invalidated', 'provider-failed',
  'schema-failed', 'internal-failed', 'protocol-failed', 'usage-error', 'mutation-rejected', 'mutation-partial',
] as const);
export type HyperUnixExecutionKind = (typeof HYPERUNIX_EXECUTION_KINDS)[number];
/** Exactly the statement ObservationProjection.relate accepts; this adapter only ever states display grouping. */
export type HyperUnixObservedRelation = Parameters<ObservationProjection['relate']>[0];
/** Host-bound context of one read: the authenticated scope, the query the host issued (the result does not name it), the host's
 * own clock readings and, optionally, the invocation and the operation (such as the workflow node call) that issued the read. */
export interface HyperUnixTopologyContext {
  scope: ObservationScope;
  target: {kind: string; root?: string};
  capturedAt: string;
  observedAt: string;
  invocationId?: string;
  operationRef?: NativeRef;
}
/** Deeply frozen: one query snapshot, at most one grouping edge and at most 8 sanitized diagnostics. */
export interface HyperUnixProjectionTopology {
  snapshots: readonly NativeSnapshot[];
  relations: readonly HyperUnixObservedRelation[];
  diagnostics: readonly string[];
}

const CONTRACT = 'hyperunix.find/v1';
const REPRESENTATION = 'hyperunix.result/1';
const MAX_IDENTITY_BYTES = 256;
const TITLE = 120;
const DIAGNOSTIC = 200;
const MAX_DIAGNOSTICS = 8;
/** ObservationProjection admits at most 32 evidence references per snapshot. */
const MAX_EVIDENCE = 32;
const BINARY_DIGEST = /^[0-9a-f]{64}$/;
/** A zone-qualified ISO-8601 instant; looser text that Date.parse still accepts names no comparable host clock reading. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;
/** A UTF-16 code unit orphaned when a length bound cuts through a surrogate pair. */
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;
const DERIVED = 'query id is a derived digest, not a native identifier';

type Reading = 'complete' | 'partial' | 'failure' | 'mutation';
/** How each native kind reads. A Record over the kind union, so a tuple member without a reading fails typing. */
const READING: Readonly<Record<HyperUnixExecutionKind, Reading>> = {
  complete: 'complete', 'complete-empty': 'complete',
  incomplete: 'partial', 'budget-exhausted': 'partial', cancelled: 'partial', 'view-invalidated': 'partial',
  'provider-failed': 'failure', 'schema-failed': 'failure', 'internal-failed': 'failure', 'protocol-failed': 'failure', 'usage-error': 'failure',
  'mutation-rejected': 'mutation', 'mutation-partial': 'mutation',
};
const KINDS: ReadonlySet<string> = new Set(HYPERUNIX_EXECUTION_KINDS);

type JsonRecord = {[key: string]: JsonValue};
interface CheckedContext {
  scope: ObservationScope; kind: string; root?: string; capturedAt: string; observedAt: string; invocationId?: string; operationRef?: NativeRef;
}

const record = (value: JsonValue | undefined): JsonRecord | undefined =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value : undefined;
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const refused = (message: string): CapabilityError => new CapabilityError('validation', `HyperUnix topology refused: ${message}.`);
const isKind = (value: unknown): value is HyperUnixExecutionKind => typeof value === 'string' && KINDS.has(value);
/** A bounded identity: non-empty, at most 256 UTF-8 bytes, no terminal sequence, control or bidi character. */
const identity = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= MAX_IDENTITY_BYTES && stripUnsafeText(value) === value;
/** An identity that also displays exactly as stored: nothing the shared redactor would rewrite. */
const exact = (value: unknown): value is string => identity(value) && redactWorkbenchText(value) === value;
const instant = (value: unknown): value is string => typeof value === 'string' && ISO_INSTANT.test(value) && Number.isFinite(Date.parse(value));

/** Producer or host text bound for display. Unsafe sequences become spaces BEFORE the shared redactor runs, so an escape or bidi
 * mark glued to a credential cannot hide it; redactWorkbenchText then redacts and bounds, stripUnsafeText strips, and a code unit
 * the bound orphaned is dropped. */
function shown(value: string, max: number): string {
  const spaced = stripUnsafeText(value, ' ').replace(/\s+/g, ' ').trim();
  return stripUnsafeText(redactWorkbenchText(spaced, max)).replace(LONE_SURROGATE, '').trim();
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

/** The host context, copied field by field after validation. Target text is display and identity input, never refused for its
 * characters (it is sanitized for display); scope, invocation and operation identities must already be displayable. */
function checkedContext(context: HyperUnixTopologyContext): CheckedContext {
  if (!isObject(context)) throw refused('the host context must be an object');
  const {scope, target, capturedAt, observedAt, invocationId, operationRef} = context;
  if (!isObject(scope) || !identity(scope.workspace) || !identity(scope.principal)) {
    throw refused('the host scope needs a bounded, displayable workspace and principal');
  }
  if (!isObject(target) || typeof target.kind !== 'string' || target.kind.length === 0 || target.root !== undefined && typeof target.root !== 'string') {
    throw refused('the read target needs a non-empty kind and an optional string root');
  }
  if (!instant(capturedAt) || !instant(observedAt)) throw refused('capture and observation times must be zone-qualified ISO-8601 instants');
  if (invocationId !== undefined && !identity(invocationId)) throw refused('the invocation id must be a bounded, displayable identity');
  if (operationRef !== undefined && (!isObject(operationRef) || !identity(operationRef.provider) || !identity(operationRef.type) ||
    !identity(operationRef.id) || operationRef.scope !== undefined && !identity(operationRef.scope))) {
    throw refused('the operation reference must name a bounded, displayable native identity');
  }
  return {
    scope: {workspace: scope.workspace, principal: scope.principal}, kind: target.kind, ...(target.root !== undefined ? {root: target.root} : {}),
    capturedAt, observedAt, ...(invocationId !== undefined ? {invocationId} : {}),
    ...(operationRef !== undefined ? {operationRef: {provider: operationRef.provider, type: operationRef.type, id: operationRef.id,
      ...(operationRef.scope !== undefined ? {scope: operationRef.scope} : {})}} : {}),
  };
}

/** One hyperunix.query snapshot and, when context.operationRef names the invoking operation, one grouping edge from it. Every
 * refusal is a CapabilityError raised before anything is projected: 'validation' for an unrecognized contract, representation
 * or field, an unpinned kind and any mutation outcome; 'authorization' for a reading of another workspace. The result carries no
 * native timestamps, payload reference, basis or definition digest, so the snapshot states none of them. */
export function hyperunixTopology(reading: JsonValue, context: HyperUnixTopologyContext): HyperUnixProjectionTopology {
  const host = checkedContext(context);
  const value = record(reading);
  if (!value || value.contract !== CONTRACT) throw refused(`the reading must be the ${CONTRACT} provider output`);
  const source = record(value.source);
  if (!source || source.representation !== REPRESENTATION) throw refused(`source.representation must be ${REPRESENTATION}`);
  const kind = record(source.execution_status)?.kind;
  if (!isKind(kind)) throw refused('source.execution_status.kind is not a vendored SDK ExecutionStatusKind');
  const licensed = record(source.coverage_summary)?.licenses_absence;
  if (typeof licensed !== 'boolean') throw refused('source.coverage_summary.licenses_absence must be a boolean');
  const rows = source.rows;
  if (!Array.isArray(rows)) throw refused('source.rows must be an array');
  const operation = source.operation;
  if (typeof operation !== 'string' || operation.length === 0) throw refused('source.operation must be a non-empty string');
  const runtime = record(value.runtime);
  const binary = runtime?.binarySha256;
  if (typeof binary !== 'string' || !BINARY_DIGEST.test(binary)) throw refused('runtime.binarySha256 must be 64 lowercase hex characters');
  const version = runtime?.version;
  if (!exact(version)) throw refused('runtime.version must be a bounded, displayable string');
  const reads = READING[kind];
  if (reads === 'mutation') throw refused(`${kind} is a mutation outcome and this read adapter refuses mutation outcomes`);
  // The SDK reads complete-empty only for zero node-claims; rows beside it would make "rows 0" false.
  if (kind === 'complete-empty' && rows.length > 0) throw refused('a complete-empty result carries rows');
  if (value.workspaceRoot !== host.scope.workspace) throw new CapabilityError('authorization', 'HX reading workspace differs from observer scope.');

  // Certificates are read for their batch ids only: mode, cause, scope, target and body never leave this function.
  const certificates = Array.isArray(source.coverage) ? source.coverage : [];
  const batchIds = [...new Set(certificates.map(item => record(item)?.batch_id).filter((id): id is string => typeof id === 'string'))];
  // No native query identifier exists (execution_id is not a stable key), so the id is derived from the query and its basis.
  const id = createHash('sha256').update(JSON.stringify([host.scope.workspace, operation, host.kind, host.root ?? null, [...batchIds].sort()])).digest('hex');
  const ref: NativeRef = {provider: 'hyperunix', type: 'query', id, scope: host.scope.workspace};
  const {operationRef} = host;
  if (operationRef && operationRef.provider === ref.provider && operationRef.type === ref.type && operationRef.id === ref.id && operationRef.scope === ref.scope) {
    throw refused('the operation reference aliases the query node itself');
  }

  // Absence is established only by the runtime's licence on a complete kind; transport success and a 0-row answer establish nothing.
  const absence = reads === 'complete' && licensed;
  const coverage: NonNullable<NativeSnapshot['coverage']> = absence ? 'complete' : reads === 'failure' ? 'unknown' : 'partial';
  const statusTone: Presentation['statusTone'] = absence ? 'success' : reads === 'failure' ? 'failure' : 'unknown';
  const answer = absence ? (kind === 'complete-empty' ? 'known-empty (runtime-licensed) · rows 0' : `complete · rows ${rows.length}`)
    : reads === 'failure' ? kind : `${kind} · rows ${rows.length} · absence not licensed`;
  // Only an explicit false is the SDK's non-retaining stream, whose empty storage never implies an empty answer.
  const statusText = source.rows_retained === false ? `${answer} (rows not retained)` : answer;
  const title = shown(`HX ${operation} ${host.kind}${host.root ? ` ${host.root}` : ''}`, TITLE);

  const diagnostics = [`${DERIVED}: ${title}`, 'no native interval supplied'];
  if (reads === 'complete' && !licensed) diagnostics.push('runtime did not license absence');
  if (reads !== 'complete' && licensed) diagnostics.push(`runtime licensed absence on a ${kind} result, which is not honoured: only a complete kind establishes absence`);
  const evidenceRefs = [`hx-binary:sha256:${binary}`];
  let withheld = 0;
  let omitted = 0;
  for (const batchId of batchIds) {
    const evidence = `hx-coverage:${batchId}`;
    if (!exact(evidence)) withheld++;
    else if (evidenceRefs.length < MAX_EVIDENCE) evidenceRefs.push(evidence);
    else omitted++;
  }
  if (withheld > 0) diagnostics.push(`${withheld} of ${batchIds.length} coverage batch ids withheld from evidence references: not exact displayable identities`);
  if (omitted > 0) diagnostics.push(`coverage evidence references are capped at ${MAX_EVIDENCE}: ${omitted} omitted`);

  const snapshot: NativeSnapshot = {
    source: ref, scope: {...host.scope}, capturedAt: host.capturedAt, observedAt: host.observedAt, coverage,
    node: {title, type: 'sdk-operation', statusText, statusTone}, kind: 'hyperunix.query.snapshot', sourceVersion: version, evidenceRefs,
    ...(host.invocationId !== undefined ? {trace: {invocationId: host.invocationId}} : {}),
  };
  // Display grouping only: the result names no lifecycle owner, so no native confirmation reference is ever stated.
  const relations: HyperUnixObservedRelation[] = operationRef === undefined ? [] : [{scope: {...host.scope}, from: {...operationRef}, to: {...ref},
    kind: 'grouping', provenance: {source: 'hyperunix', observedAt: host.observedAt}}];
  return frozen({snapshots: [snapshot], relations, diagnostics: diagnostics.slice(0, MAX_DIAGNOSTICS).map(text => shown(text, DIAGNOSTIC))});
}
