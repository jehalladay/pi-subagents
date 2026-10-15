// wb-0kg.7 (VC-7 / W18-E): shared-child cancellation-ownership receipt.
// Pure judgement and receipt shaping over journeys the runner measured (real detached child, real reader
// processes, effect markers on disk, the client-seam call counts and the host control audit). The only
// import is the wb-0kg.1 fault receipt: its provider fixture and path scrubber are reused, never copied.
// Spec: docs/workbench/08 "Multi-reader shared child MUST NOT be stopped merely because one reader closed
// Pi or stopped waiting"; docs/workbench/14 "stopping one reader must not stop child without ownership";
// docs/workbench/09 negative control 8 "Closing observer causes zero cancellation calls."
import {basenameOnly} from './local-detached-faults-receipt.mjs';

export const SHARED_CHILD_RECEIPT_CONTRACT = 'workbench.detached-shared-child/v1';
/**
 * Ownership model of the measured host: a stop is authorised by an explicit per-invocation grant held by the
 * caller, not by a per-reader identity, so a same-child owner/non-owner reader pair is inexpressible
 * (wb-0kg.7 gate F5, accepted by the owner as a documented capability limit).
 */
export const SHARED_CHILD_OWNERSHIP_MODEL = 'per-invocation-grant';
/** The four reader-close injections: the stop-one-reader fault before and after the child's first effect marker. */
export const SHARED_CHILD_CASES = Object.freeze([
  Object.freeze({when: 'before', close: 'pi-exit'}),
  Object.freeze({when: 'before', close: 'stop-waiting'}),
  Object.freeze({when: 'after', close: 'pi-exit'}),
  Object.freeze({when: 'after', close: 'stop-waiting'}),
]);
/** Measured semantic violations (runner exit 1). */
export const SHARED_CHILD_FINDING_RULES = Object.freeze([
  'child-stopped-by-reader-close',
  'duplicate-effect',
  'effect-lost',
  'observer-close-control-call',
  'child-no-own-terminal',
  'non-owner-stop-accepted',
  'non-owner-refusal-untyped',
  'non-owner-child-disturbed',
  'owner-stop-not-effective',
  'owner-stop-phase-collapsed',
  'owner-stop-unaudited',
  'owner-stop-unrequested',
]);

const TYPED_DENIAL = /authoriz|grant denied/i;
const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);
const isNumber = value => typeof value === 'number' && Number.isFinite(value);
const arrayOf = value => (Array.isArray(value) ? value : []);

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

/**
 * Judge observed journeys. Returns {findings: {rule, detail}[], realised}. A missing or unarmed journey,
 * a missing injection combination or a single-reader case makes the measurement not realised; it never
 * produces a pass and never a finding.
 */
export function assessSharedChildJourneys(observed) {
  const findings = [];
  const add = (rule, detail) => findings.push({rule, detail});
  const journeys = isObject(observed) && isObject(observed.journeys) ? observed.journeys : {};
  const markerCounts = isObject(observed) && isObject(observed.markerCounts) ? observed.markerCounts : {};
  const readerClose = isObject(journeys.readerClose) ? journeys.readerClose : undefined;
  const nonOwner = isObject(journeys.nonOwnerStop) ? journeys.nonOwnerStop : undefined;
  const owner = isObject(journeys.ownerStop) ? journeys.ownerStop : undefined;
  const cases = readerClose ? arrayOf(readerClose.cases).filter(isObject) : [];

  let realised = [readerClose, nonOwner, owner].every(journey => journey !== undefined && journey.armed === true);
  for (const wanted of SHARED_CHILD_CASES) {
    const matching = cases.filter(entry => entry.when === wanted.when && entry.close === wanted.close);
    if (matching.length !== 1 || !(matching[0].readers >= 2)) realised = false;
  }

  for (const [id, count] of Object.entries(markerCounts)) {
    if (isNumber(count) && count > 1) add('duplicate-effect', `${id} has ${count} markers; the effect must happen exactly once per logical invocation.`);
  }

  for (const entry of cases) {
    const label = `${entry.invocationId} (${entry.when}/${entry.close})`;
    if (entry.hostAliveAfterClose !== true) add('child-stopped-by-reader-close', `${label} host process was gone after the reader closed.`);
    if (entry.cancellationRequestedAfterClose !== false) add('child-stopped-by-reader-close', `${label} showed cancellationRequested after the reader closed.`);
    if (entry.observationAfterClose !== 'observed-running' && entry.observationAfterClose !== 'observed-started') {
      add('child-stopped-by-reader-close', `${label} observation after close was ${entry.observationAfterClose}, not running.`);
    }
    if (entry.terminal === 'cancelled' || entry.terminal === 'unknown') add('child-stopped-by-reader-close', `${label} ended ${entry.terminal} after a reader closed.`);
    else if (entry.terminal !== 'completed') add('child-no-own-terminal', `${label} did not reach its own completed terminal (${entry.terminal}).`);
    if ((isNumber(entry.markersAfterClose) && entry.markersAfterClose > 1) || (isNumber(entry.markersFinal) && entry.markersFinal > 1)) {
      add('duplicate-effect', `${label} has more than one marker (after close ${entry.markersAfterClose}, final ${entry.markersFinal}).`);
    }
    if (!(entry.markersFinal >= 1) || (entry.when === 'after' && !(entry.markersAtClose >= 1))) {
      add('effect-lost', `${label} lacks its effect marker (at close ${entry.markersAtClose}, final ${entry.markersFinal}).`);
    }
    if (entry.observerCancelCalls !== 0 || entry.observerShutdownCalls !== 0 || arrayOf(entry.controlAuditAfterClose).length > 0) {
      add('observer-close-control-call', `${label} observer close issued control: cancel ${entry.observerCancelCalls}, shutdown ${entry.observerShutdownCalls}, audit ${arrayOf(entry.controlAuditAfterClose).length}.`);
    }
  }

  if (nonOwner) {
    for (const [verb, refusal] of [['cancel', nonOwner.cancelRefusal], ['shutdown', nonOwner.shutdownRefusal]]) {
      const reply = isObject(refusal) ? refusal : {};
      if (reply.rejected !== true) add('non-owner-stop-accepted', `${nonOwner.invocationId} non-owner ${verb} was not rejected.`);
      else if (reply.category !== 'authorization' || !TYPED_DENIAL.test(String(reply.diagnostic ?? ''))) {
        add('non-owner-refusal-untyped', `${nonOwner.invocationId} non-owner ${verb} refusal was not a typed authorization denial (${reply.category}).`);
      }
    }
    if (nonOwner.observationAfter !== 'observed-running') add('non-owner-child-disturbed', `${nonOwner.invocationId} observation after refused stops was ${nonOwner.observationAfter}.`);
    if (nonOwner.cancellationRequested !== false) add('non-owner-child-disturbed', `${nonOwner.invocationId} showed cancellationRequested after refused stops.`);
    if (arrayOf(nonOwner.controlAudit).length > 0) add('non-owner-child-disturbed', `${nonOwner.invocationId} carries control audit entries after refused stops.`);
    if (nonOwner.terminal !== 'completed') add('child-no-own-terminal', `${nonOwner.invocationId} did not reach its own completed terminal (${nonOwner.terminal}).`);
    if (isNumber(nonOwner.markersFinal) && nonOwner.markersFinal > 1) add('duplicate-effect', `${nonOwner.invocationId} has ${nonOwner.markersFinal} markers.`);
    if (!(nonOwner.markersFinal >= 1)) add('effect-lost', `${nonOwner.invocationId} has no effect marker.`);
  }

  if (owner) {
    const cancel = isObject(owner.cancel) ? owner.cancel : {};
    const audit = arrayOf(owner.controlAudit);
    if (cancel.accepted !== true) add('owner-stop-not-effective', `${owner.invocationId} explicit owner cancel was not accepted.`);
    if (owner.terminal !== 'cancelled') add('owner-stop-not-effective', `${owner.invocationId} ended ${owner.terminal}, not cancelled, after the owner cancel.`);
    if (cancel.terminalConfirmed !== false) add('owner-stop-phase-collapsed', `${owner.invocationId} cancel reply claimed terminalConfirmed with the request.`);
    if (owner.cancellationRequestedAtFirstInspect !== true) add('owner-stop-phase-collapsed', `${owner.invocationId} first inspect after cancel did not show cancellationRequested.`);
    if (audit.length !== 1 || !isObject(audit[0]) || audit[0].command !== 'cancel' || audit[0].accepted !== true) {
      add('owner-stop-unaudited', `${owner.invocationId} control audit must hold exactly the one explicit accepted cancel (${audit.length} entries).`);
    }
    if (owner.readerClosedFirst !== true || owner.terminalBeforeStop !== null) {
      add('owner-stop-unrequested', `${owner.invocationId} must have survived a reader close with no terminal before the explicit owner stop (terminalBeforeStop ${owner.terminalBeforeStop}).`);
    }
    if (isNumber(owner.markersFinal) && owner.markersFinal > 1) add('duplicate-effect', `${owner.invocationId} has ${owner.markersFinal} markers.`);
    if (!(owner.markersFinal >= 1) || !(owner.markersBeforeStop >= 1)) add('effect-lost', `${owner.invocationId} lacks its effect marker (before stop ${owner.markersBeforeStop}, final ${owner.markersFinal}).`);
  }

  return {findings, realised};
}

function requiredText(input, field) {
  const value = input[field];
  if (typeof value !== 'string' || value.length === 0) throw new Error(`buildSharedChildReceipt: ${field} is required.`);
  return value;
}

/** Frozen evidence-grade receipt. Journeys are scrubbed to basenames so no absolute path survives. */
export function buildSharedChildReceipt(input) {
  if (!isObject(input)) throw new Error('buildSharedChildReceipt: input is required.');
  const utc = requiredText(input, 'utc');
  const revision = requiredText(input, 'revision');
  const node = requiredText(input, 'node');
  const arch = requiredText(input, 'arch');
  const platform = requiredText(input, 'platform');
  const journeys = basenameOnly(isObject(input.journeys) ? input.journeys : {});
  const markerCounts = basenameOnly(isObject(input.markerCounts) ? input.markerCounts : {});
  const diagnostics = arrayOf(input.diagnostics).filter(entry => typeof entry === 'string').map(basenameOnly);
  const {findings, realised} = assessSharedChildJourneys({journeys, markerCounts});
  return deepFreeze(structuredClone({
    contract: SHARED_CHILD_RECEIPT_CONTRACT,
    utc,
    revision,
    node,
    arch,
    platform,
    ownershipModel: SHARED_CHILD_OWNERSHIP_MODEL,
    journeys,
    markerCounts,
    findings: basenameOnly(findings),
    diagnostics,
    realised,
    pass: realised && findings.length === 0,
  }));
}

/** Runner exit semantics: 0 realised and clean, 1 realised with findings, 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length === 0 ? 0 : 1;
}
