/**
 * dx-p14-acquisition-judge.mjs - wb-mo89, the pi-system DX triage packet P14 (EAT-R478..EAT-R483; requirement text vendored
 * in test/fixtures/dx-p14-requirements-roster.json from pi-subagents master 0a5ac3a3, req-r-followon.md lines 116-200).
 *
 * The judges shared by the native probe (qa/workbench/dx-p14-acquisition-probe.mjs, which records the readings into
 * qa/workbench/receipts/wb-mo89-dx-p14-acquisition-probe.json) and by the default-tier tests that re-judge that committed
 * record (test/workbench-dx-p14-acquisition.test.ts) and the descendant fixture (test/workbench-rf-descendant-pipe.test.ts).
 *
 * Each exported function's comment names its requirement and the census cases that assert its readings. Beyond the
 * @param and @returns types, no comment here states what a function returns for an input: the census claims are those
 * cases' titles.
 */

/** The committed record's schema, the probe that writes it and where it is committed. */
export const RECORD_SCHEMA = 'workbench.dx-p14-acquisition-probe/v1';
export const PROBE_SCRIPT = 'qa/workbench/dx-p14-acquisition-probe.mjs';
export const RECORD_PATH = 'qa/workbench/receipts/wb-mo89-dx-p14-acquisition-probe.json';

/** The gate each requirement's acquisition names (TDD-MATRIX.md gate registry at the pin). */
export const GATES = Object.freeze({
  'EAT-R478': 'G-EXTERNAL-ENFORCEMENT',
  'EAT-R479': 'G-FORGE',
  'EAT-R480': 'G-FORK-MEDIA',
  'EAT-R481': 'G-CROSS-HOST',
  'EAT-R482': 'G-DESCENDANT-PIPE',
  'EAT-R483': 'G-RF',
});

/** EAT-R483's loopback host value. */
export const LOOPBACK_HOST = '127.0.0.1';

/** The wildcard host spellings. */
export const WILDCARD_HOSTS = Object.freeze(['0.0.0.0', '::', '[::]', '*']);

/**
 * EAT-R483 criterion 2: the launcher-contract judge of one captured argv. The census cases that assert its readings:
 * R483-C1-ARGV, R483-C1-BASELINE, R483-C2-FORMS, R483-C2-REFUSALS, R483-C2-ORDER and R483-Q-ARGV-HOST-ONLY.
 * @param {readonly string[]} argv a captured process argv; argv[0] is the executable
 * @returns {{ verdict: 'not-sql-server' } | { verdict: 'explicit-loopback', flags: Array<{ form: string, value: string }> } | { verdict: 'refused', reason: 'unrecognized-host-form' | 'missing-host-value' | 'no-explicit-host-flag' | 'wildcard-host' | 'host-not-127.0.0.1', flags: Array<{ form: string, value: string | null }> }}
 */
export function judgeDoltServerArgv(argv) {
  const rest = argv.slice(1);
  if (!rest.includes('sql-server')) return { verdict: 'not-sql-server' };
  /** @type {Array<{ form: string, value: string | null }>} */
  const flags = [];
  for (let index = 0; index < rest.length; index++) {
    const token = rest[index] ?? '';
    if (token === '-H' || token === '--host') {
      const value = rest[index + 1];
      if (value === undefined || value === '' || value.startsWith('-')) {
        flags.push({ form: token, value: null });
      } else {
        flags.push({ form: token, value });
        index++;
      }
    } else if (token.startsWith('--host=')) {
      const value = token.slice('--host='.length);
      flags.push({ form: '--host=', value: value === '' ? null : value });
    } else if (token.startsWith('-H') || token.startsWith('--host')) {
      flags.push({ form: 'unrecognized', value: token });
    }
  }
  if (flags.some((flag) => flag.form === 'unrecognized')) return { verdict: 'refused', reason: 'unrecognized-host-form', flags };
  if (flags.some((flag) => flag.value === null)) return { verdict: 'refused', reason: 'missing-host-value', flags };
  if (flags.length === 0) return { verdict: 'refused', reason: 'no-explicit-host-flag', flags };
  if (flags.some((flag) => flag.value !== null && WILDCARD_HOSTS.includes(flag.value))) return { verdict: 'refused', reason: 'wildcard-host', flags };
  if (flags.some((flag) => flag.value !== LOOPBACK_HOST)) return { verdict: 'refused', reason: 'host-not-127.0.0.1', flags };
  return { verdict: 'explicit-loopback', flags: flags.map((flag) => ({ form: flag.form, value: flag.value ?? '' })) };
}

/**
 * EAT-R483 criterion 1: the `ss -ltnpH` text reader whose rows judgeLoopbackListeners judges. The census cases that assert
 * its readings: R483-C1-LISTENER-REFUSALS and R483-Q-UNATTRIBUTED-LISTENER.
 * @param {string} text
 * @returns {Array<{ address: string, port: number, pids: number[] }>}
 */
export function parseSsListeners(text) {
  /** @type {Array<{ address: string, port: number, pids: number[] }>} */
  const listeners = [];
  for (const line of text.split('\n')) {
    const fields = line.trim().split(/\s+/);
    if (fields[0] !== 'LISTEN' || fields.length < 6) continue;
    const local = fields[3] ?? '';
    const colon = local.lastIndexOf(':');
    const port = Number(local.slice(colon + 1));
    if (colon <= 0 || !Number.isInteger(port)) continue;
    const pids = [...fields.slice(5).join(' ').matchAll(/pid=(\d+)/g)].map((match) => Number(match[1]));
    listeners.push({ address: local.slice(0, colon), port, pids });
  }
  return listeners;
}

/**
 * EAT-R483 criterion 1: the socket-readback judge of one pid's listeners and its server-ledger port. The census cases that
 * assert its readings: R483-C1-SOCKETS, R483-C1-LISTENER-REFUSALS and R483-Q-UNATTRIBUTED-LISTENER.
 * @param {{ pid: number, port: number, listeners: ReadonlyArray<{ address: string, port: number, pids: readonly number[] }> }} reading
 * @returns {{ verdict: 'loopback-only' | 'refused', reason?: 'no-listener-for-pid' | 'listener-not-127.0.0.1' | 'ledger-port-not-listening', addresses: string[] }}
 */
export function judgeLoopbackListeners({ pid, port, listeners }) {
  const own = listeners.filter((listener) => listener.pids.includes(pid));
  const addresses = [...new Set(own.map((listener) => `${listener.address}:${listener.port}`))];
  if (own.length === 0) return { verdict: 'refused', reason: 'no-listener-for-pid', addresses };
  if (own.some((listener) => listener.address !== LOOPBACK_HOST)) return { verdict: 'refused', reason: 'listener-not-127.0.0.1', addresses };
  if (!own.some((listener) => listener.port === port)) return { verdict: 'refused', reason: 'ledger-port-not-listening', addresses };
  return { verdict: 'loopback-only', addresses };
}

/**
 * @param {string} requirement
 * @param {string[]} missing
 * @returns {{ status: 'BLOCKED', requirement: string, gate: string, missing: string[] }}
 */
function blocked(requirement, missing) {
  return { status: 'BLOCKED', requirement, gate: GATES[/** @type {keyof typeof GATES} */ (requirement)], missing };
}

/** @param {unknown} value @returns {value is string} */
const text = (value) => typeof value === 'string' && value.trim() !== '';
/** @param {unknown} value @returns {value is string} */
const fullSha = (value) => typeof value === 'string' && /^[0-9a-f]{40}$/.test(value);
/** @param {unknown} value @returns {value is string[]} */
const texts = (value) => Array.isArray(value) && value.length > 0 && value.every(text);
/** @param {unknown} value @returns {value is Record<string, unknown>} */
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * EAT-R478: the judge of an outside-machine enforcement receipt for a seam-changing cut. The census cases that assert its
 * readings: R478-C2-BLOCKED, R478-C1-FIELDS, R478-C1-SHAS and R478-C2-CONTROLS.
 * @param {unknown} evidence
 */
export function judgeExternalEnforcement(evidence) {
  if (!object(evidence)) return blocked('EAT-R478', ['outside-machine enforcement configuration', 'producer invocation receipt']);
  const validator = object(evidence.validator) ? evidence.validator : {};
  const controls = object(evidence.controls) ? evidence.controls : {};
  const seamOnly = object(controls.seamOnly) ? controls.seamOnly : {};
  const sameCutDoc = object(controls.sameCutDoc) ? controls.sameCutDoc : {};
  /** @type {string[]} */
  const missing = [];
  if (!text(evidence.configRevision)) missing.push('external enforcement configuration revision');
  if (!fullSha(evidence.base)) missing.push('exact base');
  if (!fullSha(evidence.head)) missing.push('exact head');
  if (!texts(evidence.changedSeamPaths)) missing.push('changed seam paths');
  if (!texts(validator.argv)) missing.push('validator argv');
  if (!Number.isInteger(validator.exit)) missing.push('validator exit');
  if (!text(evidence.sameCutDecision)) missing.push('same-cut skill/doc decision');
  if (!text(seamOnly.verdict)) missing.push('seam-only cut control verdict');
  if (!text(sameCutDoc.verdict)) missing.push('same-cut documentation control verdict');
  if (missing.length > 0) return blocked('EAT-R478', missing);
  return { status: 'measured', requirement: 'EAT-R478', controlsDistinguishable: seamOnly.verdict !== sameCutDoc.verdict };
}

/**
 * EAT-R480: the judge of a captured registry-page render of the authorized fork artifact. The census cases that assert its
 * readings: R480-C2-BLOCKED, R480-C1-FIELDS and R480-C2-IDENTITY.
 * @param {unknown} evidence
 */
export function judgeForkMedia(evidence) {
  const keep = { grade: 'PLAUSIBLE' };
  if (!object(evidence)) return { ...blocked('EAT-R480', ['approved fork artifact identity', 'remote registry-page render capture']), ...keep };
  const artifact = object(evidence.capturedArtifact) ? evidence.capturedArtifact : {};
  /** @type {string[]} */
  const missing = [];
  if (!text(evidence.authorizedForkIdentity)) missing.push('approved fork artifact identity');
  if (!text(artifact.name) || !text(artifact.version)) missing.push('captured artifact identity and version');
  if (!texts(evidence.manifestMediaUrls)) missing.push('manifest media URLs');
  if (!text(evidence.pageUrl)) missing.push('registry page URL');
  if (!text(evidence.captureDate)) missing.push('capture date');
  if (!texts(evidence.renderedSources)) missing.push('rendered image/video source');
  if (missing.length > 0) return { ...blocked('EAT-R480', missing), ...keep };
  if (artifact.name !== evidence.authorizedForkIdentity || artifact.name === evidence.upstreamIdentity) {
    return { ...blocked('EAT-R480', ['a capture of the authorized fork artifact (the capture names another package)']), ...keep };
  }
  return { status: 'measured', requirement: 'EAT-R480', belongsToFork: true };
}

/**
 * EAT-R481: the judge of a native-read tier receipt from an independent host layout. The census cases that assert its
 * readings: R481-C3-BLOCKED, R481-C1-FIELDS and R481-C1-BINARIES.
 * @param {unknown} evidence
 */
export function judgeCrossHost(evidence) {
  if (!object(evidence)) return blocked('EAT-R481', ['an independent host layout without the developer home', 'that host\'s native-read receipt']);
  const binaries = Array.isArray(evidence.binaries) ? evidence.binaries : [];
  const forgeTarget = object(evidence.forgeTarget) ? evidence.forgeTarget : {};
  const testResult = object(evidence.testResult) ? evidence.testResult : {};
  /** @type {string[]} */
  const missing = [];
  if (evidence.developerHomeAvailable !== false) missing.push('a host where the developer home is not available');
  if (!text(evidence.path)) missing.push('the host\'s declared PATH');
  if (!text(evidence.hyperunixHx)) missing.push('the host\'s declared HYPERUNIX_HX');
  if (binaries.length === 0 || !binaries.every((binary) => object(binary) && text(binary.name) && text(binary.version) && typeof binary.underDeveloperHome === 'boolean')) {
    missing.push('resolved binaries and versions');
  } else if (binaries.some((binary) => object(binary) && binary.underDeveloperHome !== false)) {
    missing.push('binaries resolved outside the developer home');
  }
  if (!text(evidence.cwd)) missing.push('cwd');
  if (!text(testResult.command) || !Number.isInteger(testResult.exit)) missing.push('native-read test result');
  if (!text(forgeTarget.recorded) && forgeTarget.refusedMissing !== true) missing.push('the gate-status probe\'s own repository target or its refusal');
  if (missing.length > 0) return blocked('EAT-R481', missing);
  return { status: 'measured', requirement: 'EAT-R481', testExit: testResult.exit };
}

/**
 * EAT-R479: the judge of the live Forge leg the probe records. The census cases that assert its readings: R479-C1-PRODUCER
 * and R479-C2-BLOCKED.
 * @param {unknown} leg
 */
export function judgeForgeLeg(leg) {
  if (!object(leg)) return blocked('EAT-R479', ['forge executable', 'disposable fixture gate runs', 'gate.status operation envelope']);
  const producer = object(leg.producer) ? leg.producer : {};
  const runs = Array.isArray(leg.gateRuns) ? leg.gateRuns : [];
  const reads = Array.isArray(leg.statusReads) ? leg.statusReads : [];
  /** @type {string[]} */
  const missing = [];
  if (!text(producer.executableSha256) || !text(producer.version)) missing.push('forge executable');
  if (runs.length < 2 || !runs.every((run) => object(run) && text(run.operationId) && Number.isInteger(run.processExit))) missing.push('disposable fixture gate runs');
  if (reads.length === 0 || !reads.every((read) => object(read) && object(read.reading) && object(read.reading.source) && text(read.reading.source.operation_id))) {
    missing.push('gate.status operation envelope');
  }
  if (missing.length > 0) return blocked('EAT-R479', missing);
  return { status: 'measured', requirement: 'EAT-R479' };
}

/**
 * EAT-R482: the judge of one descendant-pipe trial. The census cases that assert its readings (in
 * test/workbench-rf-descendant-pipe.test.ts): R482-C1-HELD, R482-C2-NO-GRANDCHILD and R482-C3-BLOCKED.
 * @param {unknown} trial
 */
export function judgeDescendantTrial(trial) {
  if (!object(trial)) return blocked('EAT-R482', ['instrumented descendant fixture', 'process-tree readback']);
  const child = object(trial.child) ? trial.child : {};
  const grandchild = object(trial.grandchild) ? trial.grandchild : {};
  const readEnd = object(trial.readEnd) ? trial.readEnd : {};
  const samples = Array.isArray(trial.samples) ? trial.samples.filter((sample) => object(sample) && typeof sample.at === 'number' && typeof sample.inFlight === 'number') : [];
  const held = trial.variant === 'held-pipe';
  /** @type {string[]} */
  const missing = [];
  if (trial.procfs !== true) missing.push('process-tree readback');
  if (!Number.isInteger(child.pid) || !text(child.stdout)) missing.push('direct child pid and stdout readback');
  if (held && (!Number.isInteger(grandchild.pid) || !text(grandchild.stdout))) missing.push('grandchild pid and stdout readback');
  if (!text(readEnd.link)) missing.push('read-end readback');
  if (samples.length === 0) missing.push('registry inFlight samples');
  if (typeof trial.deadlineAt !== 'number') missing.push('deadline time');
  if (typeof trial.childGoneAt !== 'number') missing.push('direct child disappearance time');
  if (typeof trial.graceMs !== 'number') missing.push('grace window');
  if (missing.length > 0) return blocked('EAT-R482', missing);
  const childGoneAt = /** @type {number} */ (trial.childGoneAt);
  const graceAt = childGoneAt + /** @type {number} */ (trial.graceMs);
  const atGrace = samples.find((sample) => sample.at >= graceAt);
  const settledAt = typeof trial.settledAt === 'number' ? trial.settledAt : null;
  const pipeClosedAt = typeof trial.pipeClosedAt === 'number' ? trial.pipeClosedAt : null;
  return {
    status: 'measured',
    requirement: 'EAT-R482',
    variant: trial.variant,
    inFlightAtGrace: atGrace === undefined ? null : atGrace.inFlight,
    settled: settledAt !== null,
    windowExpired: settledAt === null,
    settledAfterChildGoneMs: settledAt === null ? null : settledAt - childGoneAt,
    settledAfterPipeClosedMs: settledAt === null || pipeClosedAt === null ? null : settledAt - pipeClosedAt,
  };
}
