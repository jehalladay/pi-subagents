// wb-0kg.1 (VC-7 / W18-A): detached-host fault-injection conformance tier.
// Real detached child processes, real signals, exactly-once effect markers on disk. Measurement only:
// it drives the compiled host and judges what it observes, and it adds no hook to the host. A crash
// outcome is only ever "unknown plus reconcile"; a measured violation is recorded in the receipt
// (exit 1) and is never fixed or hidden here. Exit 0 = realised and clean, 1 = realised with findings,
// 2 = not realised (diagnostics say why). The receipt is printed as one JSON line and written to
// $DETACHED_FAULTS_RECEIPT when set, before the process exits.
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {realpathSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync, readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildFaultReceipt, builtinAccessViolations, CLAIMS_NO_EFFECT, exitCodeFor, faultProviderSource, PROVIDER_FIXTURES, reachedTerminal} from './local-detached-faults-receipt.mjs';

const HOLD_MS = 10000;
const BOUND_MS = 5000;
const POLL_MS = 20;
const EFFECT = 'local.effect';
const WAIT = 'local.wait';

const diagnostics = [];
const journeys = {};
const providerLint = {surveyed: [], violations: []};
const pids = new Set();
const now = () => new Date().toISOString();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const message = error => (error instanceof Error ? error.message : String(error));
const sha = path => `sha256:${createHash('sha256').update(readFileSync(path)).digest('hex')}`;

async function until(read, done, bound = BOUND_MS) {
  const start = performance.now();
  let value = await read();
  while (!done(value) && performance.now() - start < bound) {
    await sleep(POLL_MS);
    value = await read();
  }
  return {value, ok: done(value), ms: Math.round((performance.now() - start) * 100) / 100};
}

// git-stamp:begin (copied byte-for-byte into status-ledger.mjs, local-detached-faults.mjs and local-detached-shared-child.mjs, whose
// guards allow only node: imports; test/workbench-git-stamp.test.ts fails on any drift)
const HEX = /^[0-9a-f]{7,64}$/;

function git(root, args) {
  const run = spawnSync('git', args, {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']});
  return run.status === 0 && typeof run.stdout === 'string' ? run.stdout : undefined;
}

function sameDir(a, b) {
  try {
    return realpathSync(a) === realpathSync(b);
  } catch {
    return false;
  }
}

/** `{head, porcelain}` for `root`: both null unless root is the repository toplevel with a valid HEAD; porcelain alone is null when the status read fails. */
function gitStamp(root) {
  const top = git(root, ['rev-parse', '--show-toplevel']);
  if (top === undefined || !sameDir(top.trim(), root)) return {head: null, porcelain: null};
  const head = (git(root, ['rev-parse', 'HEAD']) ?? '').trim();
  if (!HEX.test(head)) return {head: null, porcelain: null};
  return {head, porcelain: git(root, ['status', '--porcelain']) ?? null};
}

/** HEAD sha, suffixed `-dirty` when the tree has changes; `working-tree` when root is not a toplevel or its status cannot be read. */
function revisionOf(root) {
  const {head, porcelain} = gitStamp(root);
  if (head === null || porcelain === null) return 'working-tree';
  return porcelain.trim().length > 0 ? `${head}-dirty` : head;
}
// git-stamp:end

function revision() {
  return revisionOf(fileURLToPath(new URL('../..', import.meta.url)));
}

function emit(markerCounts) {
  const receipt = buildFaultReceipt({
    utc: now(),
    revision: revision(),
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    journeys,
    markerCounts,
    providerLint,
    diagnostics,
  });
  const line = JSON.stringify(receipt);
  if (process.env.DETACHED_FAULTS_RECEIPT) writeFileSync(process.env.DETACHED_FAULTS_RECEIPT, `${line}\n`);
  console.log(line);
  return exitCodeFor(receipt);
}

let host;
try {
  host = await import('../../dist/workbench/hosts/local-detached.js');
  host.localOperator();
  if (typeof process.getBuiltinModule !== 'function') throw new Error('process.getBuiltinModule is unavailable; the marker provider cannot load fs.');
} catch (error) {
  diagnostics.push(`not realised: ${message(error)}`);
}
if (!host) process.exit(emit({}));

const directory = mkdtempSync(join(tmpdir(), 'wb-faults-'));
const workspace = join(directory, 'source');
const markers = join(workspace, 'markers');
const hosts = join(directory, 'hosts');
mkdirSync(workspace, {mode: 0o700});
mkdirSync(markers, {mode: 0o700});

const markerCount = id => readdirSync(markers).filter(name => name.startsWith(`${id}.`)).length;
const markerCounts = () => {
  const counts = {};
  for (const name of readdirSync(markers)) {
    const id = name.slice(0, name.lastIndexOf('.'));
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
};

function writeFixture(name, text, lint = false) {
  if (lint) {
    providerLint.surveyed.push(name);
    for (const violation of builtinAccessViolations(text)) providerLint.violations.push(`${name}: ${violation}`);
  }
  const path = join(workspace, name);
  writeFileSync(path, text, {mode: 0o600});
  return path;
}

const crashPath = writeFixture(PROVIDER_FIXTURES.crash, faultProviderSource({capabilityId: EFFECT, markerDirectory: markers, crashAfterEffect: true}), true);
const holdPath = writeFixture(PROVIDER_FIXTURES.hold, faultProviderSource({capabilityId: EFFECT, markerDirectory: markers, crashAfterEffect: false, holdMs: HOLD_MS}), true);
const waitPath = writeFixture(PROVIDER_FIXTURES.wait, `export function register(registry){registry.register({descriptor:{id:${JSON.stringify(WAIT)},version:'1.0.0',description:'controlled test provider, not native',inputSchema:{type:'object',properties:{ms:{type:'integer',minimum:1,maximum:10000}},required:['ms'],additionalProperties:false},effectClass:'read',permissions:['fixture:wait'],supportedModes:['invoke'],contractSource:'fixture:source'},async invoke(input,ctx){await new Promise((resolve,reject)=>{const t=setTimeout(resolve,input.ms);ctx.signal.addEventListener('abort',()=>{clearTimeout(t);reject(Error('fixture cancelled'));},{once:true});});return {coverage:'fixture',invocationId:ctx.invocationId};}});}`, true);
const effectScript = writeFixture('effect-workflow.js', `export const meta={name:"fault-effect",description:"controlled fault fixture"};\nreturn await node(${JSON.stringify(EFFECT)},args);`);
const waitScript = writeFixture('wait-workflow.js', `export const meta={name:"fault-wait",description:"controlled fault fixture"};\nreturn await node(${JSON.stringify(WAIT)},args);`);

function request(id, kind, extra = {}) {
  const [modulePath, capability, grants, scriptPath, input] =
    kind === 'crash' ? [crashPath, EFFECT, ['fixture:effect'], effectScript, {token: 'fault'}]
    : kind === 'hold' ? [holdPath, EFFECT, ['fixture:effect'], effectScript, {token: 'fault'}]
    : [waitPath, WAIT, ['fixture:wait'], waitScript, {ms: HOLD_MS}];
  return {
    directory: hosts,
    invocationId: id,
    scriptPath,
    cwd: workspace,
    input,
    trustedScript: true,
    backend: 'deterministic',
    providers: [],
    grants,
    localProvider: {kind: 'trusted-local', version: '1.0.0', capabilities: [capability], modulePath, digest: sha(modulePath)},
    sourceFiles: [scriptPath, modulePath],
    ...extra,
  };
}

async function launch(id, kind, extra) {
  const receipt = await host.launchDetachedWorkflow(request(id, kind, extra));
  pids.add(receipt.pid);
  return receipt;
}

const terminalsOf = snapshots => [...new Set(snapshots.map(snapshot => snapshot.terminal).filter(terminal => typeof terminal === 'string'))];

/** Launch a crashing host without autoStart, then send the first execute and tolerate losing its reply: the crash may beat it. */
async function crashingInvocation(id) {
  const launchedAt = now();
  const receipt = await launch(id, 'crash', {autoStart: false, permissions: ['inspect', 'execute']});
  const client = host.connectDetachedWorkflow(hosts, id);
  const started = performance.now();
  const firstExecute = await client.execute().then(() => 'replied', () => 'reply-lost-to-crash');
  const seen = [];
  const unknown = await until(async () => { const snapshot = await client.inspect(); seen.push(snapshot); return snapshot; }, reachedTerminal);
  return {receipt, client, launchedAt, firstExecute, seen, unknown, latencyMs: Math.round((performance.now() - started) * 100) / 100};
}

/** Try to launch the SAME invocation id again; a refusal naming exists/conflict is the only accepted rejection. */
async function attemptRelaunch(id) {
  return await host.launchDetachedWorkflow(request(id, 'crash', {autoStart: false, permissions: ['inspect', 'execute']})).then(
    receipt => { pids.add(receipt.pid); return {rejected: false, diagnostic: 'same-id relaunch accepted'}; },
    error => ({rejected: /exists|conflict/i.test(message(error)), diagnostic: message(error)}),
  );
}

async function effectCrashJourney() {
  const id = 'effect-crash';
  const first = await crashingInvocation(id);
  const journey = {invocationId: id, armed: first.unknown.ok, launchedAt: first.launchedAt, unknownAt: now(), latencyMs: first.latencyMs, firstExecute: first.firstExecute, claimsNoEffect: CLAIMS_NO_EFFECT.honest};
  if (!first.unknown.ok) diagnostics.push(`${id}: the crashing provider did not terminate the host within ${BOUND_MS} ms.`);
  const crashCount = markerCount(id);
  const inspected = await first.client.inspect();
  const afterInspect = markerCount(id);
  const executeRejected = await first.client.execute().then(() => false, () => true);
  const afterExecute = markerCount(id);
  const relaunch = await attemptRelaunch(id);
  const afterRelaunch = markerCount(id);
  Object.assign(journey, {
    effectObserved: crashCount >= 1,
    terminals: terminalsOf([...first.seen, inspected]),
    inspect: {observation: inspected.observation, source: inspected.source, terminal: inspected.terminal, reconcileHint: inspected.reconcileHint ?? '', hasResult: Object.hasOwn(inspected, 'result')},
    executeRejected,
    relaunchRejected: relaunch.rejected,
    relaunchDiagnostic: relaunch.diagnostic,
    markersAfter: {crash: crashCount, inspect: afterInspect, execute: afterExecute, relaunch: afterRelaunch},
  });
  // A deliberate second request is a NEW logical invocation, not a retry.
  const secondId = 'effect-crash-second';
  const second = await crashingInvocation(secondId).then(result => ({accepted: true, result}), error => ({accepted: false, error: message(error)}));
  if (!second.accepted) diagnostics.push(`${secondId}: ${second.error}`);
  const secondMarkers = markerCount(secondId);
  // The original id must still be refused once the deliberate second logical invocation exists.
  const relaunchAfterSecond = await attemptRelaunch(id);
  Object.assign(journey, {
    relaunchRejectedAfterSecond: relaunchAfterSecond.rejected,
    second: {invocationId: secondId, accepted: second.accepted, markers: secondMarkers},
    explicitSecondRequest: true,
    totalMarkers: afterRelaunch + secondMarkers,
  });
  return journey;
}

async function cancelIsolationJourney() {
  const cancelledId = 'iso-a';
  const siblingId = 'iso-b';
  await launch(cancelledId, 'wait');
  await launch(siblingId, 'wait');
  const a = host.connectDetachedWorkflow(hosts, cancelledId);
  const b = host.connectDetachedWorkflow(hosts, siblingId);
  const running = await until(async () => [await a.inspect(), await b.inspect()], pair => pair.every(snapshot => snapshot.observation === 'observed-running'));
  const view = snapshot => ({observation: snapshot.observation, terminal: snapshot.terminal, cancellationRequested: snapshot.cancellationRequested, controlAudit: snapshot.controlAudit});
  const polls = [];
  const cancelledAt = now();
  const started = performance.now();
  const reply = await a.cancel('fault journey: cancel one host only');
  const firstInspect = await a.inspect();
  polls.push(view(await b.inspect()));
  const cancelled = await until(() => a.inspect(), reachedTerminal);
  const latencyMs = Math.round((performance.now() - started) * 100) / 100;
  // One poll interval after the terminal, inspect again: the terminal must hold, and the record reads this fresh snapshot.
  await sleep(POLL_MS);
  const postCancel = await a.inspect();
  polls.push(view(await b.inspect()));
  await sleep(100);
  polls.push(view(await b.inspect()));
  const shutdown = await b.shutdown('fault journey: sibling ends by its own shutdown').catch(() => ({accepted: false}));
  await a.shutdown('fault journey: dispose cancelled host').catch(() => undefined);
  if (!running.ok) diagnostics.push('cancel isolation: both hosts did not reach observed-running within the bound.');
  if (!cancelled.ok) diagnostics.push('cancel isolation: the cancelled host did not reach a terminal within the bound.');
  return {
    armed: running.ok && cancelled.ok,
    cancelledHost: {
      invocationId: cancelledId,
      accepted: reply.accepted,
      terminalConfirmed: reply.terminalConfirmed,
      cancellationRequestedAtFirstInspect: firstInspect.cancellationRequested === true,
      terminal: cancelled.value.terminal,
      terminalObservedAt: cancelled.value.observedAt,
      latencyMs,
      cancelledAt,
    },
    postCancelInspect: {terminal: postCancel.terminal, observedAt: postCancel.observedAt, cancellationRequested: postCancel.cancellationRequested === true, controlAuditLength: Array.isArray(postCancel.controlAudit) ? postCancel.controlAudit.length : 0, hasResult: Object.hasOwn(postCancel, 'result')},
    sibling: {invocationId: siblingId, polls, endedByOwnShutdown: shutdown.accepted === true},
  };
}

async function shutdownUnresolvedJourney() {
  const runningId = 'unresolved';
  const idleId = 'idle';
  await launch(runningId, 'wait');
  await launch(idleId, 'wait', {autoStart: false});
  const running = host.connectDetachedWorkflow(hosts, runningId);
  const idle = host.connectDetachedWorkflow(hosts, idleId);
  const live = await until(() => running.inspect(), snapshot => snapshot.observation === 'observed-running');
  const runningReply = await running.shutdown('fault journey: shutdown a running host');
  const idleReply = await idle.shutdown('fault journey: shutdown a host that never executed');
  const after = await until(() => running.inspect(), reachedTerminal);
  if (!live.ok) diagnostics.push(`${runningId}: the host did not reach observed-running before shutdown.`);
  if (!after.ok) diagnostics.push(`${runningId}: inspect did not reach a terminal after shutdown within the bound.`);
  return {
    armed: live.ok && after.ok,
    running: {invocationId: runningId, unresolvedEffects: runningReply.unresolvedEffects, afterTerminal: after.value.terminal, afterReconcileHint: after.value.reconcileHint ?? ''},
    idle: {invocationId: idleId, unresolvedEffects: idleReply.unresolvedEffects},
  };
}

async function sigtermJourney() {
  const id = 'sigterm';
  const receipt = await launch(id, 'hold');
  const client = host.connectDetachedWorkflow(hosts, id);
  const live = await until(async () => ({snapshot: await client.inspect(), markers: markerCount(id)}), state => state.snapshot.observation === 'observed-running' && state.markers >= 1);
  const markersBefore = markerCount(id);
  const signalledAt = now();
  const started = performance.now();
  process.kill(receipt.pid, 'SIGTERM');
  const seen = [];
  const lost = await until(async () => { const snapshot = await client.inspect(); seen.push(snapshot); return snapshot; }, reachedTerminal);
  const latencyMs = Math.round((performance.now() - started) * 100) / 100;
  const executeRejected = await client.execute().then(() => false, () => true);
  await sleep(300);
  if (!live.ok) diagnostics.push(`${id}: the host did not reach observed-running with its effect marker before SIGTERM.`);
  if (!lost.ok) diagnostics.push(`${id}: inspect did not reach a terminal after SIGTERM within the bound.`);
  return {
    armed: live.ok && lost.ok,
    invocationId: id,
    signalledAt,
    latencyMs,
    terminal: lost.value.terminal,
    terminals: terminalsOf(seen),
    executeRejected,
    markersBefore,
    markersAfter: markerCount(id),
  };
}

async function measure(key, run) {
  try {
    journeys[key] = await run();
  } catch (error) {
    diagnostics.push(`${key}: measurement error: ${message(error)}`);
  }
}

let code = 2;
try {
  await measure('effectCrash', effectCrashJourney);
  await measure('cancelIsolation', cancelIsolationJourney);
  await measure('shutdownUnresolved', shutdownUnresolvedJourney);
  await measure('sigterm', sigtermJourney);
} finally {
  for (const pid of pids) {
    try { process.kill(pid, 'SIGTERM'); } catch { /* already gone */ }
  }
  await sleep(400);
  for (const pid of pids) {
    try { process.kill(pid, 0); process.kill(pid, 'SIGKILL'); } catch { /* already gone */ }
  }
  try {
    code = emit(markerCounts());
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
}
process.exit(code);
