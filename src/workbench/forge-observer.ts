/** Forge gate.status reader adapter (docs/workbench/09 § Reader adapters).
 * It consumes exactly the value readForgeGateStatus (providers/forge.ts) returns and projects read-model snapshots
 * plus display-scope grouping edges. It never reads, decodes or runs Forge itself. A package's last_result without
 * authoritative_current === true is history, never current verification, and transport success is never a PASS. A package's
 * published last_result_state is echoed, never judged: its freshness word is quoted beside that label and its derived_from
 * becomes the package subjectBasis, and neither changes a tone or a coverage.
 */
import {CapabilityError, type JsonValue} from './capability-registry.js';
import {nativeEvidence} from './native-evidence.js';
import type {NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {sanitizeWorkbenchText, stripUnsafeText} from './redaction.js';

/** Exactly the statement ObservationProjection.relate accepts; this adapter only ever states grouping. */
export type ForgeObservedRelation = Parameters<ObservationProjection['relate']>[0];
/** Host-bound context of one read: the authenticated scope, the read target and the host's own clock readings. */
export interface ForgeGateObservationContext {scope: ObservationScope; target: string; capturedAt: string; observedAt: string; invocationId?: string}
export interface ForgeGateTopology {snapshots: NativeSnapshot[]; relations: ForgeObservedRelation[]; diagnostics: string[]}

const CONTRACT = 'forge.gate.status/v1';
/** The workspace node's native id; a package ref equal to it would alias the workspace node, so it is refused. */
const WORKSPACE_ID = 'workspace';
const MAX_IDENTITY_BYTES = 256;
const MAX_TEXT = 200;
/** Per-field bound for producer text, so every native field and the qualifier fit within MAX_TEXT together. */
const MAX_FIELD = 48;
/** Forge records a gate that ran to completion and failed as CommandStatus 'error'; 'failure' carries the same meaning. */
const FAILED = new Set(['failure', 'error']);
/** Forge's closed freshness vocabulary; a word outside it is malformed and never displayed. */
const FRESHNESS = new Set(['CURRENT', 'STALE', 'UNKNOWN', 'NOT_APPLICABLE']);
/** The one invalidation-basis kind whose derived_from is read as a package's basis; any other kind is malformed. */
const BASIS_KIND = 'invalidation-basis/v2';
/** A withheld-basis diagnostic quotes a whole package ref (at most MAX_IDENTITY_BYTES) inside one fixed sentence. */
const MAX_DIAGNOSTIC = MAX_TEXT + MAX_IDENTITY_BYTES;

type JsonRecord = {[key: string]: JsonValue};
/** A package's last_result_state as read here: the producer's freshness word and verdict basis, or withheld when malformed. */
type DerivedState = {freshness: string; basis: string} | 'withheld';
interface ForgePackage {ref: string; lastResult?: string; current: boolean; authority: JsonValue | undefined; reason?: string; state?: DerivedState}

const record = (value: JsonValue | undefined): JsonRecord | undefined =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value : undefined;
const refused = (message: string): CapabilityError => new CapabilityError('validation', `Forge gate topology refused: ${message}.`);
/** A bounded identity: non-empty, at most 256 UTF-8 bytes, no terminal sequence, control or bidi character. */
const identity = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= MAX_IDENTITY_BYTES && stripUnsafeText(value) === value;
const instant = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
/** Producer text bound for display: the shared helper's label layout (normalize once, redact every reading, strip once). */
const shown = (value: string, max: number): string => sanitizeWorkbenchText(value, max, 'label');
/** An evidence reference is listed only when it displays exactly as stored, never as a mangled identity. */
const exact = (value: string): boolean => identity(value) && sanitizeWorkbenchText(value, MAX_TEXT) === value;
/** One of the three digest shapes native-evidence.ts accepts as a source basis, decided by that module's one rule rather than
 * a copy of it: the value must come back unchanged as the sourceBasis of a minimal reading of this contract. */
const digestShaped = (value: string): boolean =>
  nativeEvidence('forge.gate.status', {contract: CONTRACT, source: {data: {source_snapshot_id: value}}}).sourceBasis === value;

/** A package's last_result_state, read for exactly two fields: its freshness word and invalidation_basis.derived_from, the
 * digest the verdict was derived from. Absent, or null (the producer's value for a null last_result), is no descriptor. Any
 * other shape (not an object, a word outside the closed set, another basis kind, a derived_from that is not digest-shaped) is
 * malformed and withheld whole. The word is echoed as published: the adapter never compares the basis digests, never resolves
 * them against a tree or a repository and never mints a word of its own. */
function derivedState(value: JsonValue | undefined): DerivedState | undefined {
  if (value === undefined || value === null) return undefined;
  const state = record(value);
  const basis = record(state?.invalidation_basis);
  const freshness = state?.freshness;
  const derivedFrom = basis?.derived_from;
  return typeof freshness === 'string' && FRESHNESS.has(freshness) && basis?.kind === BASIS_KIND && typeof derivedFrom === 'string' && digestShaped(derivedFrom)
    ? {freshness, basis: derivedFrom} : 'withheld';
}

function checkedContext(context: ForgeGateObservationContext): ForgeGateObservationContext {
  const {scope, target, capturedAt, observedAt, invocationId} = context;
  if (!scope || !identity(scope.workspace) || !identity(scope.principal) || !identity(target)) {
    throw refused('the host scope and read target must be bounded, displayable identities');
  }
  if (!instant(capturedAt) || !instant(observedAt)) throw refused('capture and observation times must be timezone-qualified instants');
  if (invocationId !== undefined && !identity(invocationId)) throw refused('the invocation id must be a bounded, displayable identity');
  return {scope: {workspace: scope.workspace, principal: scope.principal}, target, capturedAt, observedAt, ...(invocationId !== undefined ? {invocationId} : {})};
}

/** Known package fields only; unknown producer fields are tolerated and never read, so they never reach presentation.
 * last_result_state is read through derivedState alone, so none of its other fields is read either. */
function packagesOf(source: JsonRecord): ForgePackage[] {
  const packages = record(source.data)?.packages;
  if (!Array.isArray(packages)) throw refused('source.data.packages must be an array');
  const seen = new Set<string>();
  return packages.map((value, index) => {
    const pkg = record(value);
    if (!pkg) throw refused(`package ${index} is not an object`);
    const ref = pkg.ref;
    if (!identity(ref)) throw refused(`package ${index} ref must be a string of 1..256 bytes without control characters`);
    if (ref === WORKSPACE_ID) throw refused(`package ${index} ref aliases the workspace node`);
    if (seen.has(ref)) throw refused(`package ${index} repeats an earlier ref`);
    seen.add(ref);
    const state = derivedState(pkg.last_result_state);
    return {ref, ...(typeof pkg.last_result === 'string' ? {lastResult: pkg.last_result} : {}), current: pkg.authoritative_current === true,
      authority: pkg.authoritative_current, ...(typeof pkg.unverified_reason === 'string' ? {reason: pkg.unverified_reason} : {}),
      ...(state !== undefined ? {state} : {})};
  });
}

/** One workspace snapshot, one snapshot and one workspace->package grouping edge per package, plus diagnostics.
 * Forge gate status carries no timestamps or lifecycle confirmation, so no snapshot has an interval or definitionDigest
 * and no edge claims ownership, dependency, causation or a hypothesis. A package that publishes a well-formed
 * last_result_state carries its derived_from as subjectBasis; the workspace snapshot and every other package carry none. */
export function forgeGateTopology(reading: JsonValue, context: ForgeGateObservationContext): ForgeGateTopology {
  const {scope, target, capturedAt, observedAt, invocationId} = checkedContext(context);
  // native-evidence.ts owns the pinned contract gate and the native status/operation shaping; nothing is re-decoded here.
  const native = nativeEvidence('forge.gate.status', reading);
  const value = record(reading);
  if (!value || native.provider !== 'forge') throw refused(`the reading must be the ${CONTRACT} provider output`);
  if (value.protocolMethod !== 'gate.status') throw refused('the reading must answer protocol method gate.status');
  const source = record(value.source);
  const envelope = record(source?.envelope);
  if (!source || !envelope || typeof envelope.reason_code !== 'string') throw refused('source.envelope.reason_code must be a string');
  const reasonCode = envelope.reason_code;
  const packages = packagesOf(source);
  const diagnostics: string[] = [];
  const status = native.domainStatus;
  const verdict = envelope.verdict;
  const readSucceeded = status === 'success';
  // Every package must carry current authority before the workspace is judged at all; an empty list judges nothing.
  const judged = packages.length > 0 && packages.every(pkg => pkg.current);
  const allCurrentSuccess = judged && packages.every(pkg => pkg.lastResult === 'success');
  // gate.status verifies nothing itself: success also needs a successful read and no declared verdict (a degraded read declares COULD_NOT_JUDGE).
  const tone: Presentation['statusTone'] = !judged ? 'unknown'
    : packages.some(pkg => FAILED.has(pkg.lastResult ?? '')) ? 'failure'
    : allCurrentSuccess && readSucceeded && (verdict === null || verdict === undefined) ? 'success' : 'unknown';
  if (packages.length === 0) diagnostics.push('Forge gate.status reported an empty package list: no package was observed and workspace verification stays indeterminate.');
  if (allCurrentSuccess && tone !== 'success') diagnostics.push('Every package reports current success but the read status or declared verdict does not, so workspace success is withheld.');
  const qualifier = tone === 'failure' ? 'current gate failed' : tone === 'success' ? 'current gate passed' : 'verification indeterminate';
  const fields = [(status === undefined ? '' : shown(status, MAX_FIELD)) || 'status unavailable', typeof verdict === 'string' ? shown(verdict, MAX_FIELD) : '', shown(reasonCode, MAX_FIELD)];
  const statusText = [...fields.filter(field => field.length > 0), qualifier].join(' · ');
  const evidenceRefs: string[] = [];
  const reasonRef = `forge:gate.status:${reasonCode}`;
  if (reasonCode.length > 0 && exact(reasonRef)) evidenceRefs.push(reasonRef);
  else diagnostics.push('Forge gate.status reason_code is not an exact displayable code, so its evidence reference is withheld.');
  if (native.nativeId !== undefined) {
    // docs/workbench/20 ruling 5: the EvidenceLoader resolves a Forge node's native operation through this reference.
    const operationRef = `forge-operation:${native.nativeId}`;
    if (exact(operationRef)) evidenceRefs.push(operationRef);
    else diagnostics.push('Forge gate.status operation_id is not an exact displayable identity, so its forge-operation evidence reference is withheld.');
  }
  const snapshot = (ref: NativeRef, kind: string, coverage: 'complete' | 'partial', node: Presentation, refs: readonly string[] = [], subjectBasis?: string): NativeSnapshot => ({
    source: ref, scope: {...scope}, capturedAt, observedAt, coverage, sourceVersion: CONTRACT, node, kind,
    ...(refs.length > 0 ? {evidenceRefs: [...refs]} : {}), ...(subjectBasis !== undefined ? {subjectBasis} : {}),
    ...(invocationId !== undefined ? {trace: {invocationId}} : {}),
  });
  const workspace: NativeRef = {provider: 'forge', type: 'gate-status', id: WORKSPACE_ID, scope: target};
  const snapshots: NativeSnapshot[] = [snapshot(workspace, 'forge.gate.status.snapshot', readSucceeded && judged ? 'complete' : 'partial',
    {title: shown(`Forge gate status ${target}`, MAX_TEXT), type: 'sdk-operation', statusText, statusTone: tone}, evidenceRefs)];
  const relations: ForgeObservedRelation[] = [];
  for (const pkg of packages) {
    const ref: NativeRef = {provider: 'forge', type: 'gate-status', id: pkg.ref, scope: target};
    const result = pkg.lastResult === undefined ? 'no last_result' : shown(pkg.lastResult, MAX_FIELD) || 'unprintable last_result';
    const reason = pkg.reason === undefined ? '' : shown(pkg.reason, MAX_FIELD);
    // The native value is always quoted: a tone classifies it and never replaces it (docs/workbench/13 § Observation projection).
    const label = pkg.current ? `${result} (current)`
      : `${result} (historical; authoritative_current=${pkg.authority === false ? 'false' : 'unknown'}${reason ? `; ${reason}` : ''})`;
    // A descriptor appends its quoted word after the native text and authority label, never in place of either; a withheld
    // (malformed) descriptor reads basis UNKNOWN, never CURRENT, and names its package in one diagnostic.
    const word = pkg.state === undefined ? undefined : pkg.state === 'withheld' ? 'UNKNOWN' : shown(pkg.state.freshness, MAX_FIELD);
    const text = word === undefined ? label : `${label} · basis ${word}`;
    if (pkg.state === 'withheld') {
      diagnostics.push(shown(`Forge gate.status package ${pkg.ref} published a last_result_state that is not well formed, so its basis is withheld and shown as basis UNKNOWN.`, MAX_DIAGNOSTIC));
    }
    const basis = typeof pkg.state === 'object' ? pkg.state.basis : undefined;
    const packageTone: Presentation['statusTone'] = !pkg.current ? 'unknown'
      : pkg.lastResult === 'success' ? 'success' : FAILED.has(pkg.lastResult ?? '') ? 'failure' : 'unknown';
    snapshots.push(snapshot(ref, 'forge.gate.status.package.snapshot', pkg.current && readSucceeded ? 'complete' : 'partial',
      {title: shown(`Forge package ${pkg.ref}`, MAX_TEXT), type: 'sdk-operation', statusText: text, statusTone: packageTone}, [], basis));
    // Grouping is display scope only: gate.status names no native lifecycle confirmation, so ownership is never stated.
    relations.push({scope: {...scope}, from: {...workspace}, to: {...ref}, kind: 'grouping', provenance: {source: 'forge-observer', observedAt}});
  }
  return {snapshots, relations, diagnostics};
}
