// wb-0kg.8 (VC-7 / W16 residual): detached-control-live receipt.
// Pure judgement and receipt shaping over journeys the live vitest tier measured (a real detached host behind
// the production workflow_control wiring and the wb-0kg.6 adapter). The only import is the wb-0kg.1 fault
// receipt: its path scrubber is reused, never copied. This module does no I/O and reads no clock or random
// source: the harness hands it measured journeys and the offline test hands it fabricated ones, and either
// way only the observed shape is judged. A denial that opened a socket, a minted cancel echo, a rewritten
// minted receipt and a shutdown that hid unresolvedEffects are measured violations, never papered over; the
// one journey declared unrealised by design (the strict booted-tool reading) must cite its held bead.
import {basenameOnly} from './local-detached-faults-receipt.mjs';

export const DETACHED_CONTROL_LIVE_CONTRACT = 'workbench.detached-control-live/v1';
/** The held wiring bead the strict booted-tool reading cites: nothing in src ingests detached readings yet. */
export const STRICT_BOOTED_CITATION = 'wb-79k.3';
export const STRICT_BOOTED_TOOL = 'strict-booted-tool';
/** Free-text cap per journey string: every asserted value must ALSO be a typed field (wb-6hb.12). */
export const TEXT_CAP = 400;
/** Journey keys the measurement needs; any one missing or unarmed means "not realised" (exit 2). */
export const DETACHED_CONTROL_LIVE_JOURNEYS = Object.freeze([
  'observer-close',
  'non-owner-denial',
  'observer-only-denial',
  'missing-grant-denial',
  'owner-cancel',
  'revoked-grant',
  'shutdown-unresolved',
  STRICT_BOOTED_TOOL,
]);
/** Measured semantic violations, in the order the assessor reports them (exit 1). */
export const DETACHED_CONTROL_LIVE_FINDING_RULES = Object.freeze([
  'duplicate-effect',
  'observer-close-control-call',
  'child-stopped-by-reader-close',
  'denial-untyped',
  'denial-opened-socket',
  'unsanitized-denial',
  'owner-cancel-unaudited',
  'cancel-phase-collapsed',
  'cancel-echo-minted',
  'cancel-verb-count-violated',
  'mass-cancellation',
  'revocation-ignored',
  'observation-starved',
  'minted-receipt-rewritten',
  'unresolved-effects-hidden',
  'unresolved-effects-invented',
  'post-shutdown-terminal-minted',
  'uncommitted-tree',
  'host-leaked',
  'overclaim',
]);
/** The decision-core policy each denial journey must surface, typed. */
export const DETACHED_DENIAL_POLICIES = Object.freeze({
  'non-owner-denial': 'cross-scope',
  'observer-only-denial': 'observer-only',
  'missing-grant-denial': 'missing-exact-grant',
});
/**
 * The wording the receipt is allowed to carry (W19; docs/workbench/17 "no remote auth / crash-durability /
 * native-identity claims"). buildDetachedControlLiveReceipt stamps these module constants verbatim, never
 * caller text, so the receipt cannot be worded into an overclaim; the assessor flags any drift.
 */
export const DETACHED_CONTROL_LIVE_WORDING = Object.freeze({
  security: 'same-machine-os-dac-only',
  lifetime: 'survives-client-disconnect-not-host-crash',
  nativeRuntimeIdentity: 'unsupported',
  evidenceClass: 'local-provider',
  nonClaims: Object.freeze([
    'no remote authentication evidence',
    'no host-crash durability evidence',
    `booted-tool reading unrealised: ${STRICT_BOOTED_CITATION}`,
  ]),
});

/** True once a snapshot carries ANY terminal string: a fabricated verdict still arms its wait and is judged, never hidden. */
export const reachedTerminal = snapshot => typeof snapshot === 'object' && snapshot !== null && typeof snapshot.terminal === 'string' && snapshot.terminal.length > 0;

const HEX_HEAD = /^[0-9a-f]{7,64}$/;
const UNSAFE_TEXT = /[\u0000-\u001f\u007f]/;
const GRANT_LIST_LEAK = /observe:|workbench:/;
const NEVER_A_VERDICT = new Set(['completed', 'failed', 'cancelled']);
const FULL_PERMISSIONS = Object.freeze(['inspect', 'execute', 'cancel', 'shutdown']);

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

/** True when any string in the value runs past the free-text cap. */
function overlongText(value) {
  if (typeof value === 'string') return value.length > TEXT_CAP;
  if (Array.isArray(value)) return value.some(overlongText);
  if (isObject(value)) return Object.values(value).some(overlongText);
  return false;
}

/**
 * Judge observed journeys. Returns {findings: {rule, detail}[], realised}. A missing or unarmed journey makes
 * the measurement not realised (never a pass, never itself a finding) — except the strict booted-tool reading,
 * which is unrealised BY DESIGN and must cite its held bead to count. Everything else that deviates from the
 * host's own answers is a measured finding.
 */
export function assessDetachedControlLiveJourneys(observed) {
  const findings = [];
  const add = (rule, detail) => findings.push({rule, detail});
  if (!isObject(observed)) return {findings, realised: false};
  const journeys = isObject(observed.journeys) ? observed.journeys : {};
  const markerCounts = isObject(observed.markerCounts) ? observed.markerCounts : {};
  let realised = true;

  for (const key of DETACHED_CONTROL_LIVE_JOURNEYS) {
    const journey = journeys[key];
    if (!isObject(journey)) {
      realised = false;
      continue;
    }
    if (key === STRICT_BOOTED_TOOL) {
      if (journey.realised === false) {
        if (!(typeof journey.detail === 'string' && journey.detail.includes(STRICT_BOOTED_CITATION))) realised = false;
      } else if (journey.realised !== true) {
        realised = false;
      }
      continue;
    }
    if (journey.realised !== true) realised = false;
    // wb-6hb.12: typed fields beside every capped text — a text-only measured journey is an overclaim.
    const typed = Object.entries(journey).filter(([field, value]) => field !== 'realised' && field !== 'detail' && typeof value !== 'string');
    if (journey.realised === true && typed.length === 0) add('overclaim', `${key} carries only text; every asserted value must also appear as a typed field.`);
  }
  for (const [key, journey] of Object.entries(journeys)) {
    if (overlongText(journey)) add('overclaim', `${key} carries free text beyond the ${TEXT_CAP}-character cap.`);
  }

  // Committed-tree guard (wb-7uq / wb-vko lesson): dirty, unknown HEAD or a mismatched toplevel dates the evidence.
  const revision = observed.revision;
  if (isObject(revision)) {
    if (revision.committedTree !== true || revision.dirty !== false || !HEX_HEAD.test(String(revision.head)) || typeof revision.toplevel !== 'string' || revision.toplevel.length === 0) {
      add('uncommitted-tree', `revision is not a committed tree (head ${String(revision.head)}, dirty ${String(revision.dirty)}, committedTree ${String(revision.committedTree)}).`);
    }
  } else {
    realised = false;
  }
  const wording = observed.wording;
  if (isObject(wording)) {
    const claims = arrayOf(wording.nonClaims);
    if (
      wording.security !== DETACHED_CONTROL_LIVE_WORDING.security ||
      wording.lifetime !== DETACHED_CONTROL_LIVE_WORDING.lifetime ||
      wording.nativeRuntimeIdentity !== DETACHED_CONTROL_LIVE_WORDING.nativeRuntimeIdentity ||
      !DETACHED_CONTROL_LIVE_WORDING.nonClaims.every(claim => claims.includes(claim))
    ) {
      add('overclaim', 'wording drifted from the frozen non-claims (remote auth, crash durability and native identity are never claimed).');
    }
  } else {
    realised = false;
  }
  const launchProfile = observed.launchProfile;
  if (isObject(launchProfile)) {
    const permissions = arrayOf(launchProfile.permissions);
    if (launchProfile.deviatesFromPiTool !== true || permissions.length !== FULL_PERMISSIONS.length || FULL_PERMISSIONS.some((permission, at) => permissions[at] !== permission)) {
      add('overclaim', 'the full-permission launch deviation from the Pi tool pin must be recorded, not hidden.');
    }
  } else {
    realised = false;
  }

  for (const [id, count] of Object.entries(markerCounts)) {
    if (isNumber(count) && count > 1) add('duplicate-effect', `${id} has ${count} markers; the effect must happen exactly once per logical invocation.`);
  }

  // AC1: observing session close cancels nothing.
  const close = isObject(journeys['observer-close']) ? journeys['observer-close'] : undefined;
  if (close) {
    if (close.readerSeamCancelCalls !== 0 || close.readerSeamShutdownCalls !== 0 || arrayOf(close.hostControlAuditAfterClose).length > 0 || close.wiringLedgerCancelEntries !== 0) {
      add('observer-close-control-call', `${close.invocationId} observer close issued control: reader cancel ${close.readerSeamCancelCalls}, reader shutdown ${close.readerSeamShutdownCalls}, host audit ${arrayOf(close.hostControlAuditAfterClose).length}, wiring ledger ${close.wiringLedgerCancelEntries}.`);
    }
    if (close.postCloseObservation !== 'observed-running') add('child-stopped-by-reader-close', `${close.invocationId} observation after the reader closed was ${close.postCloseObservation}, not running.`);
    for (const [stage, count] of [['atClose', close.markersAtClose], ['afterClose', close.markersAfterClose], ['final', close.markersFinal]]) {
      if (isNumber(count) && count > 1) add('duplicate-effect', `${close.invocationId} has ${count} markers ${stage}.`);
    }
    if (!(close.markersAtClose >= 1 && close.markersAfterClose >= 1 && close.markersFinal >= 1)) realised = false;
    if (!(isObject(close.readerExit) && close.readerExit.code === 0) || close.readerAttached !== true) realised = false;
  }

  // AC2/AC3: typed denials with zero socket traffic.
  for (const [key, policy] of Object.entries(DETACHED_DENIAL_POLICIES)) {
    const journey = isObject(journeys[key]) ? journeys[key] : undefined;
    if (!journey) continue;
    const reply = isObject(journey.reply) ? journey.reply : {};
    const control = isObject(reply.control) ? reply.control : {};
    const error = isObject(reply.error) ? reply.error : {};
    const typed = reply.ok === false && reply.invoked === false && reply.status === 'refused' && control.status === 'denied'
      && control.category === 'authorization' && control.policy === policy && control.effect === 'none' && error.code === policy;
    if (!typed) add('denial-untyped', `${key} did not surface the typed ${policy} denial.`);
    if (key === 'missing-grant-denial' && control.requiredGrant !== 'control:local-detached.cancel') {
      add('denial-untyped', `${key} must name the exact missing grant control:local-detached.cancel (got ${String(control.requiredGrant)}).`);
    }
    if (journey.connectCallsDelta !== 0 || journey.hostControlAuditLengthDelta !== 0) {
      add('denial-opened-socket', `${key} reached the host: connect delta ${journey.connectCallsDelta}, host audit delta ${journey.hostControlAuditLengthDelta}.`);
    }
    if (journey.seamCancelCalls !== 0 || journey.seamShutdownCalls !== 0) {
      add('cancel-verb-count-violated', `${key} issued control verbs on a denial (cancel ${journey.seamCancelCalls}, shutdown ${journey.seamShutdownCalls}).`);
    }
    const reason = control.reason;
    if (typeof reason !== 'string' || reason.length === 0 || reason.length > 200 || UNSAFE_TEXT.test(reason) || GRANT_LIST_LEAK.test(reason)) {
      add('unsanitized-denial', `${key} denial reason is not the fixed sanitized refusal text.`);
    }
    if (journey.postDenialObservation !== 'observed-running') {
      add('mass-cancellation', `${key} host was ${String(journey.postDenialObservation)} after a denied call that must touch nothing.`);
    }
  }

  // AC2/AC3: the owner cancel echoes the host, never mints.
  const owner = isObject(journeys['owner-cancel']) ? journeys['owner-cancel'] : undefined;
  if (owner) {
    const audit = arrayOf(owner.hostControlAudit);
    if (audit.length !== 1 || !isObject(audit[0]) || audit[0].command !== 'cancel' || audit[0].accepted !== true
      || audit[0].ownership !== 'owned-local-interpreter-only' || audit[0].terminalConfirmed !== false) {
      add('owner-cancel-unaudited', `${owner.invocationId} host audit must hold exactly the one explicit accepted cancel (${audit.length} entries).`);
    }
    const echo = isObject(owner.echo) ? owner.echo : {};
    if (echo.accepted !== true || echo.terminalConfirmed !== false) add('cancel-echo-minted', `${owner.invocationId} echo was altered: the host answered accepted with terminalConfirmed false.`);
    const reply = isObject(owner.reply) ? owner.reply : {};
    const requested = isObject(reply.requested) ? reply.requested : {};
    const acknowledged = isObject(reply.acknowledged) ? reply.acknowledged : {};
    const result = isObject(reply.result) ? reply.result : {};
    if (result.outcome !== 'unknown') add('cancel-echo-minted', `${owner.invocationId} reply claimed outcome ${String(result.outcome)}; the host confirmed no terminal in its answer.`);
    if (typeof result.nativeResultRef !== 'string' || !result.nativeResultRef.endsWith(':cancel:terminalConfirmed=false')) {
      add('cancel-echo-minted', `${owner.invocationId} nativeResultRef does not carry the host's terminalConfirmed=false answer.`);
    }
    if (!(typeof requested.requestId === 'string' && requested.requestId.length > 0 && typeof acknowledged.acknowledgedAt === 'string'
      && typeof acknowledged.nativeAckRef === 'string' && acknowledged.nativeAckRef.endsWith(':cancel:accepted') && typeof result.settledAt === 'string')) {
      add('cancel-phase-collapsed', `${owner.invocationId} requested/acknowledged/result phases are not all distinct and present.`);
    }
    if (owner.cancellationRequestedAtFirstInspect !== true) add('cancel-phase-collapsed', `${owner.invocationId} first inspect after cancel did not show cancellationRequested.`);
    if (owner.hostTerminal !== 'cancelled') add('cancel-phase-collapsed', `${owner.invocationId} ended ${String(owner.hostTerminal)}, not cancelled, after the owner cancel.`);
    if (JSON.stringify(arrayOf(owner.wiringLedgerPhases)) !== JSON.stringify(['requested', 'result'])) {
      add('cancel-phase-collapsed', `${owner.invocationId} wiring ledger phases were ${JSON.stringify(owner.wiringLedgerPhases)}, not requested then result.`);
    }
    if (owner.hostTerminalSource !== 'inspect-snapshot') add('cancel-echo-minted', `${owner.invocationId} terminal was taken from ${String(owner.hostTerminalSource)}, not the inspect snapshot.`);
    if (owner.seamCancelCalls !== 1) add('cancel-verb-count-violated', `${owner.invocationId} issued ${String(owner.seamCancelCalls)} cancel verbs; exactly one must reach the host.`);
    if (owner.otherHostsControlAuditEntries !== 0) add('mass-cancellation', `${owner.invocationId} cancel grew another host's control audit by ${String(owner.otherHostsControlAuditEntries)}.`);
    if (isNumber(owner.markersFinal) && owner.markersFinal > 1) add('duplicate-effect', `${owner.invocationId} has ${owner.markersFinal} markers.`);
    if (!(owner.markersFinal >= 1)) realised = false;
  }

  // AC4: mid-journey grant revocation.
  const revoked = isObject(journeys['revoked-grant']) ? journeys['revoked-grant'] : undefined;
  if (revoked) {
    const first = isObject(revoked.first) ? revoked.first : {};
    if (first.outcome !== 'unknown') add('cancel-echo-minted', `${String(first.invocationId)} first cancel outcome ${String(first.outcome)} was minted beyond the host's echo.`);
    const reply = isObject(revoked.revokedReply) ? revoked.revokedReply : {};
    if (!(reply.ok === false && reply.invoked === false && reply.status === 'refused' && reply.policy === 'missing-exact-grant' && reply.requiredGrant === 'control:local-detached.cancel')) {
      add('revocation-ignored', `the revoked cancel was not denied missing-exact-grant naming control:local-detached.cancel (policy ${String(reply.policy)}).`);
    }
    if (revoked.connectCallsDeltaAfterRevoke !== 0 || revoked.r2ControlAuditLength !== 0) {
      add('revocation-ignored', `the revoked cancel reached the host: connect delta ${String(revoked.connectCallsDeltaAfterRevoke)}, audit ${String(revoked.r2ControlAuditLength)}.`);
    }
    if (revoked.r2Observation !== 'observed-running' || revoked.projectionReadsServed !== true) {
      add('observation-starved', `observation did not keep serving after the revocation (host ${String(revoked.r2Observation)}, projection reads ${String(revoked.projectionReadsServed)}).`);
    }
    if (revoked.mintedReceiptsUnchanged !== true) add('minted-receipt-rewritten', 'the expiry rewrote a receipt that was already minted.');
    if (!(isNumber(revoked.grantsReadCount) && revoked.grantsReadCount >= 2)) realised = false;
    if (isNumber(revoked.r2MarkersFinal) && revoked.r2MarkersFinal > 1) add('duplicate-effect', `the revoked-journey host has ${revoked.r2MarkersFinal} markers.`);
  }

  // AC5: shutdown surfaces unresolvedEffects typed and bounded.
  const shutdown = isObject(journeys['shutdown-unresolved']) ? journeys['shutdown-unresolved'] : undefined;
  if (shutdown) {
    const running = isObject(shutdown.running) ? shutdown.running : {};
    const idle = isObject(shutdown.idle) ? shutdown.idle : {};
    const runningEcho = isObject(running.echo) ? running.echo : {};
    const idleEcho = isObject(idle.echo) ? idle.echo : {};
    if (runningEcho.accepted !== true || runningEcho.unresolvedEffects !== true || running.outcome !== 'unknown'
      || typeof running.nativeResultRef !== 'string' || !running.nativeResultRef.endsWith(':shutdown:unresolvedEffects=true')) {
      add('unresolved-effects-hidden', `${String(running.invocationId)} was running at shutdown but did not report unresolvedEffects true with outcome unknown.`);
    }
    if (idleEcho.accepted !== true || idleEcho.unresolvedEffects !== false || idle.outcome !== 'completed'
      || typeof idle.nativeResultRef !== 'string' || !idle.nativeResultRef.endsWith(':shutdown:unresolvedEffects=false')) {
      add('unresolved-effects-invented', `${String(idle.invocationId)} never executed but did not report unresolvedEffects false with outcome completed.`);
    }
    const post = isObject(shutdown.postShutdownInspect) ? shutdown.postShutdownInspect : {};
    if (NEVER_A_VERDICT.has(post.terminal)) {
      add('post-shutdown-terminal-minted', `post-shutdown inspect reported terminal ${String(post.terminal)}; after host stop only unknown-with-reconcile is honest.`);
    } else if (post.terminal !== 'unknown' || post.observation !== 'unknown' || post.source !== 'local-client-transport' || post.reconcileHint !== true) {
      add('post-shutdown-terminal-minted', 'post-shutdown inspect must be unknown from local-client-transport with a never-retry reconcile hint.');
    }
    if (running.taskControlAuditEntries !== 2 || idle.taskControlAuditEntries !== 2 || shutdown.projectionEventsMatchReply !== true) {
      add('overclaim', 'the wiring ledger and projected control events must agree with the reply — audited and projected, never minted.');
    }
  }

  // Hosts leave only by the shutdown verb; anything that survives teardown is named, never hidden.
  const teardown = observed.teardown;
  if (isObject(teardown)) {
    for (const leftover of arrayOf(teardown.leftovers)) {
      if (typeof leftover === 'string') add('host-leaked', leftover);
    }
  } else {
    realised = false;
  }

  return {findings, realised};
}

function requiredText(input, field) {
  const value = input[field];
  if (typeof value !== 'string' || value.length === 0) throw new Error(`buildDetachedControlLiveReceipt: ${field} is required.`);
  return value;
}

/** Frozen evidence-grade receipt. Journeys are scrubbed to basenames so no absolute path survives. */
export function buildDetachedControlLiveReceipt(input) {
  if (!isObject(input)) throw new Error('buildDetachedControlLiveReceipt: input is required.');
  const utc = requiredText(input, 'utc');
  const node = requiredText(input, 'node');
  const arch = requiredText(input, 'arch');
  const platform = requiredText(input, 'platform');
  const revision = input.revision;
  if (!isObject(revision) || typeof revision.head !== 'string' || typeof revision.toplevel !== 'string' || typeof revision.dirty !== 'boolean' || typeof revision.committedTree !== 'boolean') {
    throw new Error('buildDetachedControlLiveReceipt: revision {head, dirty, toplevel, committedTree} is required.');
  }
  const commands = input.commands;
  if (!isObject(commands) || ['build', 'vitest', 'forge'].some(field => typeof commands[field] !== 'string' || commands[field].length === 0)) {
    throw new Error('buildDetachedControlLiveReceipt: commands {build, vitest, forge} is required.');
  }
  const distHost = input.distHost;
  if (!isObject(distHost) || typeof distHost.path !== 'string' || typeof distHost.realpath !== 'boolean' || typeof distHost.sha256 !== 'string') {
    throw new Error('buildDetachedControlLiveReceipt: distHost {path, realpath, sha256} is required.');
  }
  const revisionBlock = {head: revision.head, dirty: revision.dirty, toplevel: basenameOnly(revision.toplevel), committedTree: revision.committedTree};
  // Wording is stamped from the module constants, never from caller text: the receipt cannot be worded into an overclaim.
  const wording = {
    security: DETACHED_CONTROL_LIVE_WORDING.security,
    lifetime: DETACHED_CONTROL_LIVE_WORDING.lifetime,
    nativeRuntimeIdentity: DETACHED_CONTROL_LIVE_WORDING.nativeRuntimeIdentity,
    evidenceClass: DETACHED_CONTROL_LIVE_WORDING.evidenceClass,
    nonClaims: [...DETACHED_CONTROL_LIVE_WORDING.nonClaims],
  };
  const launchProfile = isObject(input.launchProfile) ? input.launchProfile : {};
  const journeys = basenameOnly(isObject(input.journeys) ? input.journeys : {});
  const markerCounts = basenameOnly(isObject(input.markerCounts) ? input.markerCounts : {});
  const verbCounts = isObject(input.verbCounts) ? input.verbCounts : {};
  const teardown = basenameOnly(isObject(input.teardown) ? input.teardown : {});
  const diagnostics = arrayOf(input.diagnostics).filter(entry => typeof entry === 'string').map(basenameOnly);
  const {findings, realised} = assessDetachedControlLiveJourneys({revision: revisionBlock, wording, launchProfile, journeys, markerCounts, teardown});
  return deepFreeze(structuredClone({
    contract: DETACHED_CONTROL_LIVE_CONTRACT,
    utc,
    revision: revisionBlock,
    node,
    arch,
    platform,
    commands: {build: commands.build, vitest: commands.vitest, forge: commands.forge},
    distHost: {path: basenameOnly(distHost.path), realpath: distHost.realpath, sha256: distHost.sha256},
    wording,
    launchProfile,
    journeys,
    markerCounts,
    verbCounts,
    teardown,
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
