// wb-0kg.1 (VC-7 / W18-A): detached-host fault-injection receipt.
// Pure fixture text, judgement and receipt shaping. This module imports nothing and does no I/O and
// reads no clock: the runner hands it measured journeys (real child processes, real signals, effect
// markers on disk) and the offline test hands it fabricated journeys, and either way only the
// observed shape is judged. A crash outcome is only ever "unknown plus reconcile": the assessor flags
// a fabricated verdict, a replayed effect, a reused invocation and a sibling cancellation as measured
// violations rather than papering over them.

export const FAULT_RECEIPT_CONTRACT = 'workbench.detached-faults/v1';
/** Measured semantic violations, in the order assessFaultJourneys reports them (runner exit 1). */
export const FAULT_FINDING_RULES = Object.freeze([
  'duplicate-effect',
  'fabricated-terminal',
  'reuse-after-loss',
  'effect-denied',
  'unknown-not-reconcilable',
  'second-request-refused',
  'second-request-unlabelled',
  'cancel-phase-collapsed',
  'mass-cancellation',
  'unresolved-effects-hidden',
  'unresolved-effects-invented',
  'provider-builtin-escape',
]);
/** Journey keys the measurement needs; any one missing or unarmed means "not realised" (runner exit 2). */
export const FAULT_JOURNEYS = Object.freeze(['effectCrash', 'cancelIsolation', 'shutdownUnresolved', 'sigterm']);

/** True once a snapshot carries ANY terminal string: a fabricated verdict still arms its journey so it is judged, not hidden as unrealised. */
export const reachedTerminal = snapshot => typeof snapshot === 'object' && snapshot !== null && typeof snapshot.terminal === 'string' && snapshot.terminal.length > 0;

/** The one shared answer to "did the lost-result invocation deny its effect": honest is what the runner records, denied is what the assessor rejects. */
export const CLAIMS_NO_EFFECT = Object.freeze({denied: true, honest: false});

export const SURVEYED_UNIVERSE_LABEL = 'surveyed source universe';
export const SURVEYED_UNIVERSE_NON_CLAIM =
  'This is a lint over the text the fixture emits, not a sandbox: node:vm and a text survey are not a hostile-JavaScript isolation boundary, and no claim is made about code outside the surveyed text.';
/** The only builtin the emitted provider text may reach, and only as a literal process.getBuiltinModule argument. */
export const ALLOWED_BUILTINS = Object.freeze(['node:fs']);
/** The three provider texts the runner emits and lints, by role; a receipt whose survey lacks any one of them is not realised. */
export const PROVIDER_FIXTURES = Object.freeze({crash: 'effect-crash-provider.mjs', hold: 'effect-hold-provider.mjs', wait: 'wait-provider.mjs'});

const RECONCILE_HINT = /never.*retry|do not.*retry/i;
const NEVER_A_VERDICT = new Set(['completed', 'failed']);
const CAPABILITY_ID = /^[A-Za-z][A-Za-z0-9_.-]{0,63}$/;
const MAX_HOLD_MS = 60_000;
// The fixed-width UTC instant Date#toISOString emits; two such strings sort chronologically as text.
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
// An absolute path: a slash that does not continue a word, then at least one directory segment.
const ABSOLUTE_PATH = /(?<![A-Za-z0-9._@+~-])\/(?:[A-Za-z0-9._@+~-]+\/)+([A-Za-z0-9._@+~-]*)/g;

/**
 * ESM text of a trusted-local provider whose single write-class capability appends one irreversible
 * marker file per invocation and, when crashAfterEffect, kills the host before it can record a result.
 * The provider loads fs through process.getBuiltinModule: the host's provider-tree check admits only
 * relative static imports, and this text imports nothing (never node:net or node:child_process).
 */
export function faultProviderSource({capabilityId, markerDirectory, crashAfterEffect, holdMs = 0}) {
  if (typeof capabilityId !== 'string' || !CAPABILITY_ID.test(capabilityId)) throw new Error('faultProviderSource: invalid capability id.');
  if (typeof markerDirectory !== 'string' || !markerDirectory.startsWith('/') || markerDirectory.includes('\0')) throw new Error('faultProviderSource: marker directory must be an absolute path.');
  if (typeof crashAfterEffect !== 'boolean') throw new Error('faultProviderSource: crashAfterEffect must be a boolean.');
  if (!Number.isInteger(holdMs) || holdMs < 0 || holdMs > MAX_HOLD_MS) throw new Error('faultProviderSource: holdMs must be an integer from 0 to 60000.');
  const afterEffect = crashAfterEffect
    ? '      process.kill(process.pid, "SIGKILL");\n'
    : holdMs > 0
      ? `      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, ${holdMs});
        ctx.signal.addEventListener("abort", () => { clearTimeout(timer); reject(new Error("fixture cancelled")); }, { once: true });
      });\n`
      : '';
  return `export function register(registry) {
  registry.register({
    descriptor: {
      id: ${JSON.stringify(capabilityId)},
      version: "1.0.0",
      description: "controlled fault-injection provider, not native",
      inputSchema: { type: "object", properties: { token: { type: "string" } }, additionalProperties: false },
      effectClass: "write",
      permissions: ["fixture:effect"],
      supportedModes: ["invoke"],
      contractSource: "fixture:source",
    },
    async invoke(input, ctx) {
      const fs = process.getBuiltinModule("node:fs");
      const directory = ${JSON.stringify(markerDirectory)};
      let n = 0;
      for (;;) {
        try {
          fs.writeFileSync(directory + "/" + ctx.invocationId + "." + n, String(process.pid), { flag: "wx", mode: 0o600 });
          break;
        } catch (error) {
          if (!error || error.code !== "EEXIST") throw error;
          n += 1;
        }
      }
${afterEffect}      return { coverage: "fixture", marker: n, invocationId: ctx.invocationId };
    },
  });
}
`;
}

/**
 * Lint the emitted provider text: the only builtin access is process.getBuiltinModule with the literal
 * "node:fs"; any other getBuiltinModule argument, a require call, a dynamic import, a static import or
 * createRequire is a violation. Returns violation strings (empty = clean). A text survey, never a sandbox.
 */
export function builtinAccessViolations(text) {
  const source = typeof text === 'string' ? text : '';
  const violations = [];
  const calls = [...source.matchAll(/getBuiltinModule\s*\(([^)]*)\)/g)];
  const bare = (source.match(/getBuiltinModule/g) ?? []).length;
  if (bare !== calls.length) violations.push('getBuiltinModule is referenced without a literal call.');
  for (const call of calls) {
    const argument = call[1].trim();
    if (!ALLOWED_BUILTINS.some(name => argument === `"${name}"` || argument === `'${name}'`)) violations.push(`getBuiltinModule(${argument}) is outside the allowlist.`);
  }
  if (/\brequire\s*\(/.test(source)) violations.push('a require call is present.');
  if (/\bimport\s*\(/.test(source)) violations.push('a dynamic import is present.');
  if (/^\s*import\b/m.test(source)) violations.push('a static import is present.');
  if (/\bcreateRequire\b/.test(source)) violations.push('createRequire is present.');
  return violations;
}

const isObject = value => typeof value === 'object' && value !== null && !Array.isArray(value);
const isNumber = value => typeof value === 'number' && Number.isFinite(value);
const arrayOf = value => (Array.isArray(value) ? value : []);
const strictlyAfter = (later, earlier) => typeof later === 'string' && typeof earlier === 'string' && ISO_INSTANT.test(later) && ISO_INSTANT.test(earlier) && later > earlier;

/** Replace every absolute path in every string of a JSON-like value with its basename. */
export function basenameOnly(value) {
  if (typeof value === 'string') return value.replace(ABSOLUTE_PATH, '$1');
  if (Array.isArray(value)) return value.map(basenameOnly);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, basenameOnly(child)]));
  return value;
}

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

/**
 * Judge observed journeys. Returns {findings: {rule, detail}[], realised}. A missing or unarmed journey
 * makes the measurement not realised, and so does a post-cancel record that is not a later second inspect
 * or a provider-lint survey that lacks any of the three provider fixtures; not realised never produces a
 * pass and is never itself a finding.
 */
export function assessFaultJourneys(observed) {
  const findings = [];
  const add = (rule, detail) => findings.push({rule, detail});
  const journeys = isObject(observed) && isObject(observed.journeys) ? observed.journeys : {};
  const markerCounts = isObject(observed) && isObject(observed.markerCounts) ? observed.markerCounts : {};
  const crash = isObject(journeys.effectCrash) ? journeys.effectCrash : undefined;
  const cancel = isObject(journeys.cancelIsolation) ? journeys.cancelIsolation : undefined;
  const shutdown = isObject(journeys.shutdownUnresolved) ? journeys.shutdownUnresolved : undefined;
  const sigterm = isObject(journeys.sigterm) ? journeys.sigterm : undefined;
  const providerLint = isObject(observed) && isObject(observed.providerLint) ? observed.providerLint : {};

  let realised = [crash, cancel, shutdown, sigterm].every(journey => journey !== undefined && journey.armed === true);
  const sibling = cancel && isObject(cancel.sibling) ? cancel.sibling : undefined;
  if (cancel && (!sibling || arrayOf(sibling.polls).length === 0)) realised = false;
  const after = crash && isObject(crash.markersAfter) ? crash.markersAfter : {};
  if (crash && !(after.crash >= 1)) realised = false;
  if (crash && typeof crash.relaunchRejectedAfterSecond !== 'boolean') realised = false;
  if (cancel && !isObject(cancel.postCancelInspect)) realised = false;
  // The post-cancel record must come from a SECOND inspect, observed after the snapshot on which the wait saw the terminal.
  const postCancel = cancel && isObject(cancel.postCancelInspect) ? cancel.postCancelInspect : {};
  const cancelledHost = cancel && isObject(cancel.cancelledHost) ? cancel.cancelledHost : {};
  if (cancel && !strictlyAfter(postCancel.observedAt, cancelledHost.terminalObservedAt)) realised = false;
  // Every provider text the runner emits must be in the lint survey: a partial survey is an unrealised measurement, never a clean lint.
  const surveyed = arrayOf(providerLint.surveyed);
  if (!Object.values(PROVIDER_FIXTURES).every(name => surveyed.includes(name))) realised = false;

  // D1/D2/D3: an effect that happened is never repeated, never denied, never reported as a verdict.
  for (const [id, count] of Object.entries(markerCounts)) {
    if (isNumber(count) && count > 1) add('duplicate-effect', `${id} has ${count} markers; the effect must happen exactly once per logical invocation.`);
  }
  if (crash) {
    for (const stage of ['crash', 'inspect', 'execute', 'relaunch']) {
      if (isNumber(after[stage]) && after[stage] > 1) add('duplicate-effect', `${crash.invocationId} has ${after[stage]} markers after ${stage}.`);
    }
    const second = isObject(crash.second) ? crash.second : {};
    if (isNumber(second.markers) && second.markers > 1) add('duplicate-effect', `${second.invocationId} has ${second.markers} markers.`);
    const expectedTotal = (isNumber(after.relaunch) ? after.relaunch : 0) + (isNumber(second.markers) ? second.markers : 0);
    if (isNumber(crash.totalMarkers) && crash.totalMarkers > expectedTotal) add('duplicate-effect', `total markers ${crash.totalMarkers} exceeds the ${expectedTotal} the two logical invocations account for.`);

    const terminals = arrayOf(crash.terminals);
    const inspect = isObject(crash.inspect) ? crash.inspect : {};
    for (const terminal of [...terminals, inspect.terminal]) {
      if (NEVER_A_VERDICT.has(terminal)) add('fabricated-terminal', `${crash.invocationId} reported terminal ${terminal} after host loss.`);
    }
    if (inspect.hasResult === true) add('fabricated-terminal', `${crash.invocationId} unknown carries a result field.`);
    if (inspect.observation !== 'unknown' || inspect.source !== 'local-client-transport' || inspect.terminal !== 'unknown' || !RECONCILE_HINT.test(String(inspect.reconcileHint ?? ''))) {
      add('unknown-not-reconcilable', `${crash.invocationId} inspect after loss must be unknown from local-client-transport with a never-retry reconcile hint.`);
    }

    if (crash.executeRejected !== true) add('reuse-after-loss', `${crash.invocationId} execute() succeeded after host loss.`);
    if (crash.relaunchRejected !== true) add('reuse-after-loss', `${crash.invocationId} was relaunched under the same id after host loss.`);
    if (typeof crash.relaunchRejectedAfterSecond === 'boolean' && crash.relaunchRejectedAfterSecond !== true) {
      add('reuse-after-loss', `${crash.invocationId} was relaunched under the same id after the deliberate second request was accepted.`);
    }

    if (crash.claimsNoEffect === CLAIMS_NO_EFFECT.denied || (crash.effectObserved !== true && after.crash >= 1)) {
      add('effect-denied', `${crash.invocationId} lost its result but the marker proves the effect happened; it must be reported as effectObserved with terminal unknown.`);
    }
    if (second.accepted !== true) add('second-request-refused', `${second.invocationId} (an explicit new logical invocation) was not accepted.`);
    if (crash.explicitSecondRequest !== true) add('second-request-unlabelled', 'The deliberate second request must be labelled explicitSecondRequest, not presented as a retry.');
  }

  // D6: SIGTERM is loss, not completion.
  if (sigterm) {
    for (const terminal of [...arrayOf(sigterm.terminals), sigterm.terminal]) {
      if (NEVER_A_VERDICT.has(terminal)) add('fabricated-terminal', `${sigterm.invocationId} reported terminal ${terminal} after SIGTERM.`);
    }
    if (sigterm.terminal !== 'unknown') add('unknown-not-reconcilable', `${sigterm.invocationId} after SIGTERM ended as ${sigterm.terminal}, not unknown.`);
    if (sigterm.executeRejected !== true) add('reuse-after-loss', `${sigterm.invocationId} execute() succeeded after SIGTERM.`);
    if (isNumber(sigterm.markersBefore) && isNumber(sigterm.markersAfter) && sigterm.markersAfter > sigterm.markersBefore) {
      add('duplicate-effect', `${sigterm.invocationId} marker count grew from ${sigterm.markersBefore} to ${sigterm.markersAfter} across SIGTERM.`);
    }
  }

  // D4: cancellation has three phases and touches one host.
  if (cancel) {
    const cancelled = isObject(cancel.cancelledHost) ? cancel.cancelledHost : {};
    if (cancelled.accepted !== true) add('cancel-phase-collapsed', `${cancelled.invocationId} cancel() was not accepted.`);
    if (cancelled.terminalConfirmed !== false) add('cancel-phase-collapsed', `${cancelled.invocationId} cancel() claimed terminalConfirmed in the same reply as the request.`);
    if (cancelled.cancellationRequestedAtFirstInspect !== true) add('cancel-phase-collapsed', `${cancelled.invocationId} first inspect after cancel() did not show cancellationRequested.`);
    if (cancelled.terminal !== 'cancelled') add('cancel-phase-collapsed', `${cancelled.invocationId} ended as ${cancelled.terminal}, not cancelled.`);
    const post = isObject(cancel.postCancelInspect) ? cancel.postCancelInspect : undefined;
    if (post) {
      if (NEVER_A_VERDICT.has(post.terminal)) add('fabricated-terminal', `${cancelled.invocationId} post-cancel inspect reported terminal ${post.terminal}.`);
      else if (post.terminal !== 'cancelled') add('cancel-phase-collapsed', `${cancelled.invocationId} post-cancel inspect ended as ${post.terminal}, not cancelled.`);
      if (post.cancellationRequested !== true) add('cancel-phase-collapsed', `${cancelled.invocationId} post-cancel inspect lost cancellationRequested.`);
      if (post.hasResult === true) add('fabricated-terminal', `${cancelled.invocationId} post-cancel inspect carries a result field.`);
    }
    if (sibling) {
      const polls = arrayOf(sibling.polls);
      polls.forEach((poll, index) => {
        if (!isObject(poll)) return;
        if (poll.cancellationRequested !== false) add('mass-cancellation', `${sibling.invocationId} poll ${index} shows cancellationRequested.`);
        if (poll.terminal !== undefined) add('mass-cancellation', `${sibling.invocationId} poll ${index} reached terminal ${poll.terminal}.`);
        if (arrayOf(poll.controlAudit).length > 0) add('mass-cancellation', `${sibling.invocationId} poll ${index} carries control audit entries.`);
        if (poll.observation !== 'observed-running' && poll.observation !== 'observed-started') add('mass-cancellation', `${sibling.invocationId} poll ${index} observation ${poll.observation} is not running.`);
      });
      if (sibling.endedByOwnShutdown !== true) add('mass-cancellation', `${sibling.invocationId} did not end by its own shutdown command.`);
    }
  }

  // D5: shutdown reports unresolved effects honestly.
  if (shutdown) {
    const running = isObject(shutdown.running) ? shutdown.running : {};
    const idle = isObject(shutdown.idle) ? shutdown.idle : {};
    if (running.unresolvedEffects !== true) add('unresolved-effects-hidden', `${running.invocationId} was running at shutdown but reported unresolvedEffects ${running.unresolvedEffects}.`);
    if (idle.unresolvedEffects !== false) add('unresolved-effects-invented', `${idle.invocationId} never executed but reported unresolvedEffects ${idle.unresolvedEffects}.`);
    if (NEVER_A_VERDICT.has(running.afterTerminal)) add('fabricated-terminal', `${running.invocationId} reported terminal ${running.afterTerminal} after shutdown.`);
    if (running.afterTerminal !== 'unknown' || !RECONCILE_HINT.test(String(running.afterReconcileHint ?? ''))) {
      add('unknown-not-reconcilable', `${running.invocationId} inspect after shutdown must be unknown with a never-retry reconcile hint.`);
    }
  }

  // The provider-text lint: any builtin access outside the allowlist is a measured violation, not an unrealised run.
  for (const violation of arrayOf(providerLint.violations)) {
    if (typeof violation === 'string') add('provider-builtin-escape', violation);
  }

  return {findings, realised};
}

function requiredText(input, field) {
  const value = input[field];
  if (typeof value !== 'string' || value.length === 0) throw new Error(`buildFaultReceipt: ${field} is required.`);
  return value;
}

/** Frozen evidence-grade receipt. Journeys are scrubbed to basenames so no absolute path survives. */
export function buildFaultReceipt(input) {
  if (!isObject(input)) throw new Error('buildFaultReceipt: input is required.');
  const utc = requiredText(input, 'utc');
  const revision = requiredText(input, 'revision');
  const node = requiredText(input, 'node');
  const arch = requiredText(input, 'arch');
  const platform = requiredText(input, 'platform');
  const journeys = basenameOnly(isObject(input.journeys) ? input.journeys : {});
  const markerCounts = basenameOnly(isObject(input.markerCounts) ? input.markerCounts : {});
  const diagnostics = arrayOf(input.diagnostics).filter(entry => typeof entry === 'string').map(basenameOnly);
  const lint = isObject(input.providerLint) ? input.providerLint : {};
  const providerLint = {
    label: SURVEYED_UNIVERSE_LABEL,
    nonClaim: SURVEYED_UNIVERSE_NON_CLAIM,
    allowedBuiltins: [...ALLOWED_BUILTINS],
    surveyed: arrayOf(lint.surveyed).filter(entry => typeof entry === 'string').map(basenameOnly),
    violations: arrayOf(lint.violations).filter(entry => typeof entry === 'string').map(basenameOnly),
  };
  const {findings, realised} = assessFaultJourneys({journeys, markerCounts, providerLint});
  return deepFreeze(structuredClone({
    contract: FAULT_RECEIPT_CONTRACT,
    utc,
    revision,
    node,
    arch,
    platform,
    journeys,
    markerCounts,
    providerLint,
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
