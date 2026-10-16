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
function dependencyEntry(raw: unknown, workId: string): BeadsDependencyReference {
  if (!isRecord(raw)) throw unavailable('Beads dependency entry is not an object.');
  const id = workIdOf(raw.id, 'dependency id');
  if (id === workId) throw unavailable('Beads dependency entry names the work itself.');
  const cleanedType = label(raw.dependency_type, 'dependency_type');
  return {id, dependencyType: DEPENDENCY_TYPE.test(cleanedType) ? cleanedType : UNRECOGNIZED_TYPE, status: label(raw.status, 'dependency status')};
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

  const retained = dependencies.slice(0, limits.maxDependencies).map((raw) => dependencyEntry(raw, workId));
  const truncated = dependencies.length > retained.length;
  const unmapped: Record<string, number> = Object.create(null) as Record<string, number>;
  for (const item of retained) {
    if (item.dependencyType === 'blocks' || item.dependencyType === 'parent-child') continue;
    unmapped[item.dependencyType] = (Object.hasOwn(unmapped, item.dependencyType) ? (unmapped[item.dependencyType] ?? 0) : 0) + 1;
  }
  const parent = parentField ? workIdOf(parentField, 'parent') : retained.find((item) => item.dependencyType === 'parent-child')?.id;
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
  const blockers = new Set(reading.dependencies.items.filter((item) => item.dependencyType === 'blocks').map((item) => item.id));
  for (const id of blockers) relations.push({scope: {...scope}, kind: 'dependency', from: {...self}, to: ref(id), provenance: {...provenance}});
  // The parent field and parent-child entries name the same grouping; one edge per distinct parent, never ownership.
  const parents = new Set<string>();
  if (reading.work.parent !== undefined) parents.add(reading.work.parent);
  for (const item of reading.dependencies.items) if (item.dependencyType === 'parent-child') parents.add(item.id);
  for (const id of parents) relations.push({scope: {...scope}, kind: 'grouping', from: ref(id), to: {...self}, provenance: {...provenance}});
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
