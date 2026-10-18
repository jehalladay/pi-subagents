/** Read-only Beads Work readiness reader (wb-752.6, W13-F/VC-4).
 *
 * Beads has no vendored SDK and docs/workbench/07 forbids assuming one, so the only contract is the measured
 * `bd show <id> --json` envelope (bd 1.1.0-rc.1). The envelope arrives through an injected argv seam; this module
 * never spawns a process and never issues a bd mutation. Edges come only from `dependencies[].dependency_type` and
 * the `parent` field, never from titles, text or ordering. Descriptions, notes, acceptance criteria and close-reason
 * text are never copied: only the sanitized, bounded title and enumerated scalar fields are retained.
 */
import {CapabilityError} from './capability-registry.js';
import type {NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {sanitizeWorkbenchText} from './redaction.js';

export const BEADS_WORK_CONTRACT = 'beads.work.readiness/v1';

export interface BeadsShowCall {
  cwd: string;
  timeoutMs: number;
  signal?: AbortSignal;
}
export interface BeadsShowResult {
  exit: number;
  stdout: string;
  stderr: string;
  /** Only when the seam measured it (for example from `bd --version`); never guessed here. */
  producerVersion?: string;
}
/** The one injected seam: `bd show <id> --json` run with cwd = workspace root. Tests use a fake. */
export interface BeadsReadClient {
  show(id: string, call: BeadsShowCall): Promise<BeadsShowResult>;
}
export interface BeadsReadLimits {
  maxDependencies: number;
  maxTitleChars: number;
  timeoutMs: number;
}
export interface BeadsReadOptions {
  workId: string;
  workspaceRoot: string;
  scope: ObservationScope;
  limits: BeadsReadLimits;
  now: () => string;
  signal?: AbortSignal;
}
export interface BeadsDependencyReference {
  id: string;
  dependencyType: string;
  status: string;
}
export interface BeadsWorkReading {
  contract: typeof BEADS_WORK_CONTRACT;
  source: {provider: 'beads'; workId: string; workspaceRoot: string; ownership: 'external'; producer: 'bd'; producerVersion?: string};
  capturedAt: string;
  observedAt: string;
  freshness: 'current';
  completeness: 'complete' | 'partial';
  work: {title: string; status: string; issueType: string; priority: number; parent?: string; closedAt?: string; closeReasonPresent: boolean};
  dependencies: {offered: number; returned: number; truncated: boolean; items: BeadsDependencyReference[]};
  /** Native dependency types that name no dependency or grouping edge, with how many entries carried each. */
  unmappedDependencyTypes: Record<string, number>;
  /** Entries (or a parent field) naming the work itself: counted, never edged. Present only when nonzero. */
  selfReferences?: number;
}
/** Exactly the statement ObservationProjection.relate accepts. */
export type BeadsWorkRelation = Parameters<ObservationProjection['relate']>[0];
export interface BeadsWorkProjection {
  snapshot: NativeSnapshot;
  relations: BeadsWorkRelation[];
  truncated: boolean;
}

const MAX_STDOUT_CHARS = 4_194_304;
const MAX_LABEL_CHARS = 64;
const WORK_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const DEPENDENCY_TYPE = /^[a-z][a-z0-9_-]{0,31}$/;
const UNRECOGNIZED_TYPE = 'unrecognized';
const STATUS_TONES: ReadonlyMap<string, Presentation['statusTone']> = new Map([
  ['in_progress', 'active'],
  ['open', 'waiting'],
  ['blocked', 'waiting'],
  ['deferred', 'waiting'],
  // Closure is a readiness fact, not a verified outcome: a closed item may be a withdrawn duplicate.
  ['closed', 'unknown'],
]);

type JsonRecord = Record<string, unknown>;
const isRecord = (value: unknown): value is JsonRecord => value !== null && typeof value === 'object' && !Array.isArray(value);
const unavailable = (message: string): CapabilityError => new CapabilityError('unavailable', message);

/** Untrusted producer text bound for display: the shared helper (normalize, redact, strip), then cut by code point. */
function cleanText(value: string, maxChars: number): string {
  return Array.from(sanitizeWorkbenchText(value)).slice(0, maxChars).join('').trim();
}
function label(value: unknown, field: string): string {
  if (typeof value !== 'string') throw unavailable(`Beads ${field} is not a string.`);
  const cleaned = cleanText(value, MAX_LABEL_CHARS);
  if (!cleaned) throw unavailable(`Beads ${field} is empty.`);
  return cleaned;
}
function workIdOf(value: unknown, field: string): string {
  if (typeof value !== 'string' || !WORK_ID.test(value)) throw unavailable(`Beads ${field} is not a work id.`);
  return value;
}
function validateLimits(limits: BeadsReadLimits): void {
  for (const [key, value] of Object.entries(limits)) {
    if (!Number.isSafeInteger(value) || value < 1 || (key === 'timeoutMs' && value > 2_147_483_647)) throw new CapabilityError('validation', `Invalid Beads read budget: ${key}`);
  }
}
function assertHostBound(scope: ObservationScope, workspaceRoot: string): void {
  if (!workspaceRoot || scope.workspace !== workspaceRoot || !scope.principal) {
    throw new CapabilityError('authorization', 'Beads reader requires a host-bound workspace and principal.');
  }
}
function parseEnvelope(result: BeadsShowResult, workId: string): JsonRecord {
  if (result.exit !== 0) throw unavailable(`bd show exited with code ${result.exit}.`);
  if (typeof result.stdout !== 'string' || result.stdout.length > MAX_STDOUT_CHARS) throw unavailable('bd show output is missing or exceeds the read bound.');
  let parsed: unknown;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw unavailable('bd show output is not JSON.');
  }
  if (!Array.isArray(parsed) || parsed.length === 0) throw unavailable('bd show returned no issue array.');
  const first: unknown = parsed[0];
  if (!isRecord(first)) throw unavailable('bd show issue is not an object.');
  if (first.id !== workId) throw unavailable('bd show returned a different work id than requested.');
  return first;
}
interface DependencyReading {
  item: BeadsDependencyReference;
  /** The bucket this entry is counted under when it names no edge; absent for a raw mapped literal. */
  unmappedLabel?: string;
}
/** The mapped literals are compared on the RAW string; sanitized text only labels the unmapped count. */
function dependencyEntry(raw: unknown): DependencyReading {
  if (!isRecord(raw)) throw unavailable('Beads dependency entry is not an object.');
  const id = workIdOf(raw.id, 'dependency id');
  const status = label(raw.status, 'dependency status');
  const rawType = raw.dependency_type;
  if (rawType === 'blocks' || rawType === 'parent-child') return {item: {id, dependencyType: rawType, status}};
  const cleanedType = label(rawType, 'dependency_type');
  const shaped = DEPENDENCY_TYPE.test(cleanedType);
  // A sanitized label that equals a mapped literal is aliased hostile text: it names no edge.
  const aliased = cleanedType === 'blocks' || cleanedType === 'parent-child';
  return {item: {id, dependencyType: shaped && !aliased ? cleanedType : UNRECOGNIZED_TYPE, status}, unmappedLabel: shaped ? cleanedType : UNRECOGNIZED_TYPE};
}

export async function readBeadsWork(client: BeadsReadClient, options: BeadsReadOptions): Promise<BeadsWorkReading> {
  const {workId, workspaceRoot, scope, limits, now, signal} = options;
  validateLimits(limits);
  assertHostBound(scope, workspaceRoot);
  if (!WORK_ID.test(workId)) throw new CapabilityError('validation', 'Beads work id is not a work id.');
  const aborted = (): CapabilityError => new CapabilityError('transport', 'Beads read aborted.');
  if (signal?.aborted) throw aborted();
  let result: BeadsShowResult;
  try {
    result = await client.show(workId, {cwd: workspaceRoot, timeoutMs: limits.timeoutMs, ...(signal ? {signal} : {})});
  } catch {
    // A native failure is untrusted: no message, stack or argv is surfaced.
    throw signal?.aborted ? aborted() : unavailable('bd show could not be run.');
  }
  if (signal?.aborted) throw aborted();

  const issue = parseEnvelope(result, workId);
  const {status, issue_type: issueType, priority, dependencies, title} = issue;
  if (typeof title !== 'string') throw unavailable('Beads title is not a string.');
  if (typeof priority !== 'number' || !Number.isSafeInteger(priority)) throw unavailable('Beads priority is not an integer.');
  if (!Array.isArray(dependencies)) throw unavailable('Beads dependencies is not an array.');
  const parentField = issue.parent;
  if (parentField !== undefined && parentField !== null && typeof parentField !== 'string') throw unavailable('Beads parent is not a string.');

  const readings = dependencies.slice(0, limits.maxDependencies).map(dependencyEntry);
  const retained = readings.map((entry) => entry.item);
  const truncated = dependencies.length > retained.length;
  const unmapped: Record<string, number> = Object.create(null) as Record<string, number>;
  for (const {unmappedLabel} of readings) {
    if (unmappedLabel === undefined) continue;
    unmapped[unmappedLabel] = (Object.hasOwn(unmapped, unmappedLabel) ? (unmapped[unmappedLabel] ?? 0) : 0) + 1;
  }
  // A self-reference (entry or parent field) is counted and never edged, in either direction.
  let selfReferences = retained.filter((item) => item.id === workId && (item.dependencyType === 'blocks' || item.dependencyType === 'parent-child')).length;
  const fieldParent = parentField ? workIdOf(parentField, 'parent') : undefined;
  if (fieldParent === workId) selfReferences += 1;
  // The parent FIELD is authoritative; an entry only supplies the parent when the field is absent. With no field the
  // FIRST parent-child entry is the single parent (gate-pinned reading, wb-752.11 U4): a second distinct parent-child entry
  // stays in dependencies.items but is neither edged nor counted.
  const parent = fieldParent !== undefined ? (fieldParent === workId ? undefined : fieldParent) : retained.find((item) => item.dependencyType === 'parent-child' && item.id !== workId)?.id;
  const closedAt = typeof issue.closed_at === 'string' ? cleanText(issue.closed_at, MAX_LABEL_CHARS) : '';
  const clean = cleanText(title, limits.maxTitleChars);
  const stamp = now();
  return {
    contract: BEADS_WORK_CONTRACT,
    source: {
      provider: 'beads',
      workId,
      workspaceRoot,
      ownership: 'external',
      producer: 'bd',
      ...(typeof result.producerVersion === 'string' && cleanText(result.producerVersion, MAX_LABEL_CHARS) ? {producerVersion: cleanText(result.producerVersion, MAX_LABEL_CHARS)} : {}),
    },
    capturedAt: stamp,
    observedAt: stamp,
    freshness: 'current',
    completeness: truncated ? 'partial' : 'complete',
    work: {
      title: clean || workId,
      status: label(status, 'status'),
      issueType: label(issueType, 'issue_type'),
      priority,
      ...(parent !== undefined ? {parent} : {}),
      ...(closedAt ? {closedAt} : {}),
      closeReasonPresent: typeof issue.close_reason === 'string' && issue.close_reason.trim().length > 0,
    },
    dependencies: {offered: dependencies.length, returned: retained.length, truncated, items: retained},
    unmappedDependencyTypes: unmapped,
    ...(selfReferences > 0 ? {selfReferences} : {}),
  };
}

export function projectBeadsWork(reading: BeadsWorkReading, scope: ObservationScope): BeadsWorkProjection {
  const {workId, workspaceRoot} = reading.source;
  assertHostBound(scope, workspaceRoot);
  const ref = (id: string): NativeRef => ({provider: 'beads', type: 'work', id, scope: workspaceRoot});
  const self = ref(workId);
  const provenance = {source: 'beads', observedAt: reading.observedAt, nativeConfirmationRef: `bd:show:${workId}`};
  const relations: BeadsWorkRelation[] = [];
  // A dependency edge runs from the dependent work to the blocker it waits on (the direction attention.ts reads).
  const blockers = new Set(reading.dependencies.items.filter((item) => item.dependencyType === 'blocks' && item.id !== workId).map((item) => item.id));
  for (const id of blockers) relations.push({scope: {...scope}, kind: 'dependency', from: {...self}, to: ref(id), provenance: {...provenance}});
  // The reading's parent is the single authoritative grouping (field first, else the entry); never ownership, never doubled.
  const {parent} = reading.work;
  if (parent !== undefined && parent !== workId) relations.push({scope: {...scope}, kind: 'grouping', from: ref(parent), to: {...self}, provenance: {...provenance}});
  const snapshot: NativeSnapshot = {
    source: self,
    scope: {...scope},
    capturedAt: reading.capturedAt,
    observedAt: reading.observedAt,
    coverage: reading.completeness,
    ...(reading.source.producerVersion !== undefined ? {sourceVersion: reading.source.producerVersion} : {}),
    kind: 'beads.work.snapshot',
    node: {
      title: reading.work.title,
      type: reading.work.issueType === 'epic' ? 'group' : 'sdk-operation',
      statusText: reading.work.status,
      statusTone: STATUS_TONES.get(reading.work.status) ?? 'unknown',
    },
  };
  return {snapshot, relations, truncated: reading.dependencies.truncated};
}
