// wb-0kg.4 (VC-7 / W18-D): Furnace Work retry while child Run establishment is uncertain -- FIXTURE-tier receipt.
// Pure judgement and receipt shaping over the journeys the runner measured through the landed wb-zmd adapter's
// per-Attempt embedded bridge and a REPAIRED copy of the vendored @furnace/sdk. This module does no I/O and reads no
// clock or environment; its only import is the wb-0kg.1 fault receipt's path scrubber, reused, never copied.
// Spec: docs/workbench/14 "Parent Furnace Work retry while child Run establishment is uncertain."; wb-zmd "one bridge
// host session per Attempt" with receipts stating "no crash durability (controller or Pi death leaves running Attempts
// needing operator recovery), Observe answered by the resident session (session-word), per-Attempt identity"; BOUNDARY 07:30Z "never reintroduce a
// Furnace-owned-retry premise" (every retry here is the operator path). Owner Q1 (22:15Z): (a) this FIXTURE receipt,
// (c) the LIVE receipt is wb-3hc.
import {basenameOnly} from './local-detached-faults-receipt.mjs';

export const RETRY_FAULT_RECEIPT_CONTRACT = 'workbench.furnace-hosted-retry-fault/v1';
export const RETRY_FAULT_TIER = 'fixture';
export const RETRY_FAULT_TIER_STATEMENT =
  'FIXTURE tier: the landed wb-zmd adapter (built dist) over its real per-Attempt EmbeddedHost bridge, driven by a scripted operator through a REPAIRED copy of the vendored @furnace/sdk (manifest digest realigned to the generated validators); no Furnace binary, no live Run, no Furnace verb, no furnace doctor or probe. The LIVE receipt is wb-3hc.';
export const RETRY_FAULT_LIMITS_STATEMENT =
  'no crash durability (controller or Pi death leaves running Attempts needing operator recovery); Observe answered by the resident session (session-word); per-Attempt identity';
/** Journey keys the measurement needs; any one missing or unarmed means "not realised" (runner exit 2). */
export const RETRY_FAULT_JOURNEYS = Object.freeze([
  'lostConnectionRetry',
  'explicitUncertainRetry',
  'sameAttemptReexecution',
  'observerNoControl',
  'dropBeforeAdmissionReply',
]);
/** Measured semantic violations, in the order assessRetryFaultJourneys can report them (runner exit 1). */
export const RETRY_FAULT_FINDING_RULES = Object.freeze([
  'retry-session-reused',
  'establishment-not-exactly-once',
  'uncertain-reported-success',
  'uncertain-not-parked',
  'uncertain-merged',
  'retry-not-settled',
  'identity-violation',
  'reexecution-unrecorded',
  'furnace-retry-premise',
  'limits-misstated',
  'observer-gained-control',
  'observe-faked',
  'settled-attempt-cancelled-by-close',
]);
/** The adapter receipt's disclosed limits (src/workbench/hosts/furnace-hosted.ts LIMITS). */
export const EXPECTED_LIMITS = Object.freeze({
  crashDurability: 'none',
  observe: 'session-word',
  identity: 'per-attempt',
  replyBounds: 'none',
  retry: 'adapter-never-retries; furnace-auto-retries-by-recorded-retry-policy; work_failure-and-indeterminate-park',
});

/** The operator-retry journeys: an uncertain first Attempt, then a NEW Attempt on a NEW bridge connection. */
const RETRY_JOURNEYS = ['lostConnectionRetry', 'explicitUncertainRetry', 'dropBeforeAdmissionReply'];
/** Retry journeys whose first Attempt parks (pending) until the host closes, then settles indeterminate. */
const PARKED_UNTIL_CLOSE = new Set(['lostConnectionRetry', 'dropBeforeAdmissionReply']);
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const isText = value => typeof value === 'string' && value.length > 0;
/**
 * The facts that show each fault was actually injected and observed. A journey is armed only when its own `armed`
 * flag AND these facts agree, so a runner that claimed armed without the facts measures nothing (not realised).
 */
const ARMING_FACTS = Object.freeze({
  lostConnectionRetry: journey => journey.droppedAfterStarted === true && isText(journey.retriedWireStatus),
  explicitUncertainRetry: journey => arrayOf(journey.wireStatuses).length === 2 && arrayOf(journey.wireStatuses).every(isText),
  sameAttemptReexecution: journey => arrayOf(journey.wireStatuses).length === 2 && arrayOf(journey.wireStatuses).every(isText),
  observerNoControl: journey => isObject(journey.cancelReply) && isObject(journey.observeReply) && typeof journey.aborted === 'boolean' && isText(journey.ownerWireStatus),
  dropBeforeAdmissionReply: journey => journey.droppedBeforeReply === true && journey.admissionReplySeen === false && journey.firstReachedHost === true && isText(journey.retriedWireStatus),
});
const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);
const arrayOf = value => (Array.isArray(value) ? value : []);
const attemptsOf = receipt => (isObject(receipt) ? arrayOf(receipt.attempts).filter(isObject) : []);

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

/** A bridge reply is exactly {protocol_version: 1, op, request_id, output: {status}}: nothing echoed beside the status. */
function replyIs(reply, op, requestId, status) {
  if (!isObject(reply) || reply.op !== op || reply.request_id !== requestId || reply.protocol_version !== 1) return false;
  if (Object.keys(reply).sort().join(',') !== 'op,output,protocol_version,request_id') return false;
  return isObject(reply.output) && Object.keys(reply.output).join(',') === 'status' && reply.output.status === status;
}

/**
 * Judge observed journeys. Returns {findings: {rule, detail}[], realised}. A missing or unarmed journey (its `armed`
 * flag or its arming facts), or an SDK copy that is not the recorded repaired one, makes the measurement not realised;
 * it never produces a pass and never a finding.
 */
export function assessRetryFaultJourneys(observed) {
  const findings = [];
  const add = (rule, detail) => findings.push({rule, detail});
  const journeys = isObject(observed) && isObject(observed.journeys) ? observed.journeys : {};
  const sdk = isObject(observed) && isObject(observed.sdk) ? observed.sdk : undefined;

  let realised = RETRY_FAULT_JOURNEYS.every(name => isObject(journeys[name]) && journeys[name].armed === true && ARMING_FACTS[name](journeys[name]));
  if (!sdk || sdk.copy !== 'repaired' || !SHA256.test(String(sdk.repairedDigest)) || !SHA256.test(String(sdk.shippedManifestDigest))) realised = false;

  // Every adapter receipt states the wb-zmd limits and the wb-lrz.1 retry disclosure (EXPECTED_LIMITS.retry); only the same-id journey may carry a violation.
  for (const name of RETRY_FAULT_JOURNEYS) {
    const journey = journeys[name];
    if (!isObject(journey)) continue;
    for (const [phase, receipt] of [['before close', journey.beforeClose], ['after close', journey.afterClose]]) {
      const limits = isObject(receipt) && isObject(receipt.limits) ? receipt.limits : {};
      if (limits.retry !== EXPECTED_LIMITS.retry) add('furnace-retry-premise', `${name} ${phase}: limits.retry is ${limits.retry}, not ${EXPECTED_LIMITS.retry}.`);
      for (const key of ['crashDurability', 'observe', 'identity', 'replyBounds']) {
        if (limits[key] !== EXPECTED_LIMITS[key]) add('limits-misstated', `${name} ${phase}: limits.${key} is ${limits[key]}, not ${EXPECTED_LIMITS[key]}.`);
      }
      const violations = isObject(receipt) ? arrayOf(receipt.identityViolations) : [];
      if (name !== 'sameAttemptReexecution' && violations.length > 0) add('identity-violation', `${name} ${phase}: ${violations.join('; ')}`);
    }
  }

  // Claims 1-3: a fresh per-Attempt session, establishment exactly once per Attempt, the uncertain Attempt parked and never merged.
  for (const name of RETRY_JOURNEYS) {
    const journey = journeys[name];
    if (!isObject(journey)) continue;
    const before = attemptsOf(journey.beforeClose);
    const after = attemptsOf(journey.afterClose);
    const [first, retry] = before;
    const [firstAfter, retryAfter] = after;
    if (before.length !== 2 || after.length !== 2 || first.attemptId === retry.attemptId || first.ordinal !== 1 || retry.ordinal !== 2
      || firstAfter.attemptId !== first.attemptId || retryAfter.attemptId !== retry.attemptId) {
      add('uncertain-merged', `${name}: the uncertain Attempt and the operator retry must stay two distinct Attempt records in order (before close ${before.length}, after close ${after.length}).`);
      continue;
    }
    if (typeof first.sessionInstanceId !== 'string' || first.sessionInstanceId === '' || first.sessionInstanceId === retry.sessionInstanceId) {
      add('retry-session-reused', `${name}: ${retry.attemptId} ran in bridge session ${retry.sessionInstanceId}, which is not a fresh session beside ${first.attemptId}'s ${first.sessionInstanceId}.`);
    }
    for (const [phase, markers] of [['before close', journey.markersBeforeClose], ['after close', journey.markersAfterClose]]) {
      const list = arrayOf(markers);
      for (const id of [first.attemptId, retry.attemptId]) {
        const n = list.filter(marker => marker === id).length;
        if (n !== 1) add('establishment-not-exactly-once', `${name} ${phase}: ${id} has ${n} establishment markers; exactly one per Attempt.`);
      }
      const stray = list.filter(marker => marker !== first.attemptId && marker !== retry.attemptId);
      if (stray.length > 0) add('establishment-not-exactly-once', `${name} ${phase}: markers for Attempts that do not exist: ${stray.join(', ')}.`);
    }
    const wire = arrayOf(journey.wireStatuses);
    const firstWire = name === 'explicitUncertainRetry' ? wire[0] : undefined;
    const retryWire = name === 'explicitUncertainRetry' ? wire[1] : journey.retriedWireStatus;
    if (first.terminal === 'success' || firstAfter.terminal === 'success' || firstWire === 'success') {
      add('uncertain-reported-success', `${name}: the uncertain ${first.attemptId} was reported success (before close ${first.terminal}, after close ${firstAfter.terminal}).`);
    }
    if (PARKED_UNTIL_CLOSE.has(name)) {
      if (first.terminal !== 'pending') add('uncertain-not-parked', `${name}: ${first.attemptId} was ${first.terminal} before host close; it must stay pending (parked) until the operator ladder or the host acts.`);
      if (firstAfter.terminal !== 'indeterminate') add('uncertain-not-parked', `${name}: ${first.attemptId} settled ${firstAfter.terminal} at host close, not indeterminate.`);
      const cancel = isObject(firstAfter.cancel) ? firstAfter.cancel : {};
      if (cancel.requested !== true || cancel.reason !== 'host_closed') add('uncertain-not-parked', `${name}: ${first.attemptId} was not ended by the host close (cancel ${JSON.stringify(cancel)}).`);
      if (first.summary !== undefined) add('uncertain-merged', `${name}: ${first.attemptId} carries a summary before close (${first.summary}); the retry's result must not be merged into it.`);
    } else if (first.terminal !== 'indeterminate' || firstAfter.terminal !== 'indeterminate' || firstWire !== 'indeterminate') {
      add('uncertain-not-parked', `${name}: ${first.attemptId} must park as indeterminate (before close ${first.terminal}, after close ${firstAfter.terminal}, wire ${firstWire}).`);
    }
    if (retry.terminal !== 'success' || retryAfter.terminal !== 'success' || retryWire !== 'success') {
      add('retry-not-settled', `${name}: the operator retry ${retry.attemptId} must reach its own success (before close ${retry.terminal}, after close ${retryAfter.terminal}, wire ${retryWire}).`);
    }
  }

  // wb-21k: close() must leave an Attempt that settled BEFORE it alone. Every Attempt not pending at beforeClose (each
  // retry Attempt, the same-id pair, the observer's owner, an explicitly uncertain first Attempt) must still carry
  // cancel {requested: false} afterClose; only an Attempt parked until the host closed may carry host_closed (above).
  for (const name of RETRY_FAULT_JOURNEYS) {
    const journey = journeys[name];
    if (!isObject(journey)) continue;
    const after = attemptsOf(journey.afterClose);
    for (const [index, settled] of attemptsOf(journey.beforeClose).entries()) {
      if (settled.terminal === 'pending') continue;
      const closed = after[index];
      if (!closed || closed.attemptId !== settled.attemptId) continue;
      const cancel = isObject(closed.cancel) ? closed.cancel : {};
      if (cancel.requested !== false) {
        add('settled-attempt-cancelled-by-close', `${name}: ${settled.attemptId} had settled ${settled.terminal} before the host closed, yet carries cancel ${JSON.stringify(closed.cancel)} afterClose.`);
      }
    }
  }

  // The operator path is the only retry: a same-Attempt-id re-execution is a recorded violation, never accepted.
  const same = journeys.sameAttemptReexecution;
  if (isObject(same)) {
    const violations = isObject(same.beforeClose) ? arrayOf(same.beforeClose.identityViolations) : [];
    if (!violations.some(text => /executed 2 times/.test(String(text)))) add('reexecution-unrecorded', 'sameAttemptReexecution: re-executing one Attempt id was not recorded as an identity violation.');
  }

  // Claim 4: an observer without ownership gains no control; Observe for an id this session never admitted is the
  // resident session's own 'unknown' (wb-zby: the rebuilt SDK answers observe from its admission record), never a faked state.
  const observer = journeys.observerNoControl;
  if (isObject(observer)) {
    if (!replyIs(observer.cancelReply, 'cancel', observer.cancelRequestId, 'unknown_execution')) {
      add('observer-gained-control', `observerNoControl: the observer's cancel reply was not exactly unknown_execution (${JSON.stringify(observer.cancelReply)}).`);
    }
    if (observer.aborted !== false) add('observer-gained-control', `observerNoControl: the owner's workflow saw an aborted signal (${observer.aborted}).`);
    const owner = attemptsOf(observer.beforeClose)[0];
    const ownerCancel = owner && isObject(owner.cancel) ? owner.cancel : {};
    if (!owner || ownerCancel.requested !== false || owner.terminal !== 'success' || observer.ownerWireStatus !== 'success') {
      add('observer-gained-control', `observerNoControl: the owner's Attempt was disturbed (terminal ${owner?.terminal}, wire ${observer.ownerWireStatus}, cancel ${JSON.stringify(ownerCancel)}).`);
    }
    if (!replyIs(observer.observeReply, 'observe', observer.observeRequestId, 'unknown')) {
      add('observe-faked', `observerNoControl: the Observe reply was not exactly the session's unknown answer (${JSON.stringify(observer.observeReply)}).`);
    }
  }

  return {findings, realised};
}

function requiredText(input, field) {
  const value = input[field];
  if (typeof value !== 'string' || value.length === 0) throw new Error(`buildRetryFaultReceipt: ${field} is required.`);
  return value;
}

/** Frozen evidence-grade receipt. Journeys and diagnostics are scrubbed to basenames; the scratch path itself is never recorded. */
export function buildRetryFaultReceipt(input) {
  if (!isObject(input)) throw new Error('buildRetryFaultReceipt: input is required.');
  const utc = requiredText(input, 'utc');
  const revision = requiredText(input, 'revision');
  const node = requiredText(input, 'node');
  const arch = requiredText(input, 'arch');
  const platform = requiredText(input, 'platform');
  const revisionClean = typeof input.revisionClean === 'boolean' ? input.revisionClean : null;
  const sdk = isObject(input.sdk)
    ? {copy: String(input.sdk.copy), repairedDigest: String(input.sdk.repairedDigest), shippedManifestDigest: String(input.sdk.shippedManifestDigest)}
    : null;
  const scratch = isObject(input.scratch)
    ? {source: String(input.scratch.source), ...(typeof input.scratch.reason === 'string' ? {reason: input.scratch.reason} : {})}
    : null;
  const journeys = basenameOnly(isObject(input.journeys) ? input.journeys : {});
  const diagnostics = arrayOf(input.diagnostics).filter(entry => typeof entry === 'string').map(basenameOnly);
  const {findings, realised} = assessRetryFaultJourneys({journeys, sdk});
  return deepFreeze(structuredClone({
    contract: RETRY_FAULT_RECEIPT_CONTRACT,
    tier: RETRY_FAULT_TIER,
    tierStatement: RETRY_FAULT_TIER_STATEMENT,
    limitsStatement: RETRY_FAULT_LIMITS_STATEMENT,
    utc,
    revision,
    revisionClean,
    node,
    arch,
    platform,
    sdk,
    scratch,
    journeys,
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
