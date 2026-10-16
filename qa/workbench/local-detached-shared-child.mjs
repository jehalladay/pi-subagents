// wb-0kg.7 (VC-7 / W18-E): multi-reader shared-child cancellation-ownership conformance.
// One real detached child, observed by two readers. Closing a reader (a real reader process exiting, or
// a reader that merely stops waiting) must not stop the child: the child's exactly-once effect marker is
// proven on disk, the child reaches its own terminal, and the control seam stays empty (client-side call
// counts plus the host's own control audit). A stop succeeds only through the explicit owner grant; a
// reader without the grant gets a typed refusal and the child keeps running. Measurement only: it reuses
// the wb-0kg.1 provider fixture, adds no hook to the host, and records a violation (exit 1), never fixes
// it. Exit 0 = realised and clean, 1 = realised with findings, 2 = not realised. The receipt is printed
// as one JSON line and written to $DETACHED_SHARED_CHILD_RECEIPT when set, before the process exits.
import {execFileSync, spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {faultProviderSource} from './local-detached-faults-receipt.mjs';
import {buildSharedChildReceipt, exitCodeFor, SHARED_CHILD_CASES} from './local-detached-shared-child-receipt.mjs';

const HOLD_MS = 2500;
const BOUND_MS = 6000;
const POLL_MS = 20;
const SETTLE_MS = 600;
const EFFECT = 'local.effect';
const ALL_PERMISSIONS = ['inspect', 'execute', 'cancel', 'shutdown'];
const READ_ONLY_PERMISSIONS = ['inspect', 'execute'];

const diagnostics = [];
const journeys = {};
const pids = new Set();
const children = new Set();
const now = () => new Date().toISOString();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const message = error => (error instanceof Error ? error.message : String(error));
const round = ms => Math.round(ms * 100) / 100;
const sha = path => `sha256:${createHash('sha256').update(readFileSync(path)).digest('hex')}`;

async function until(read, done, bound = BOUND_MS) {
  const start = performance.now();
  let value = await read();
  while (!done(value) && performance.now() - start < bound) {
    await sleep(POLL_MS);
    value = await read();
  }
  return {value, ok: done(value), ms: round(performance.now() - start)};
}

function revision() {
  try {
    const root = fileURLToPath(new URL('../..', import.meta.url));
    const head = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim();
    return /^[0-9a-f]{7,64}$/.test(head) ? head : 'working-tree';
  } catch {
    return 'working-tree';
  }
}

function emit(markerCounts) {
  const receipt = buildSharedChildReceipt({
    utc: now(),
    revision: revision(),
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    journeys,
    markerCounts,
    diagnostics,
  });
  const line = JSON.stringify(receipt);
  if (process.env.DETACHED_SHARED_CHILD_RECEIPT) writeFileSync(process.env.DETACHED_SHARED_CHILD_RECEIPT, `${line}\n`);
  console.log(line);
  return exitCodeFor(receipt);
}

let host;
try {
  host = await import('../../dist/workbench/hosts/local-detached.js');
  host.localOperator();
} catch (error) {
  diagnostics.push(`not realised: ${message(error)}`);
}
if (!host) process.exit(emit({}));

const hostUrl = new URL('../../dist/workbench/hosts/local-detached.js', import.meta.url).href;
const directory = mkdtempSync(join(tmpdir(), 'wb-shared-'));
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

function writeFixture(name, text) {
  const path = join(workspace, name);
  writeFileSync(path, text, {mode: 0o600});
  return path;
}

// The wb-0kg.1 provider fixture: one write-class capability, one irreversible marker per invocation, held running.
const holdPath = writeFixture('effect-hold-provider.mjs', faultProviderSource({capabilityId: EFFECT, markerDirectory: markers, crashAfterEffect: false, holdMs: HOLD_MS}));
const effectScript = writeFixture('effect-workflow.js', `export const meta={name:"shared-child",description:"controlled shared-child fixture"};\nreturn await node(${JSON.stringify(EFFECT)},args);`);
// A reader is an observer-only process: it attaches, inspects, reports its control-call counts and exits.
// It lives beside, not inside, the provider workspace: the host pins the whole provider tree and refuses an absolute import in it.
const readerPath = join(directory, 'reader.mjs');
writeFileSync(
  readerPath,
  `import * as host from ${JSON.stringify(hostUrl)};
const [root, id] = process.argv.slice(2);
const client = host.connectDetachedWorkflow(root, id);
const calls = {observerCancelCalls: 0, observerShutdownCalls: 0};
const seam = {inspect: () => client.inspect(), cancel: reason => { calls.observerCancelCalls += 1; return client.cancel(reason); }, shutdown: reason => { calls.observerShutdownCalls += 1; return client.shutdown(reason); }};
const first = await seam.inspect();
const second = await seam.inspect();
const attached = first.observation !== 'unknown' && second.observation !== 'unknown';
process.stdout.write(JSON.stringify({attached, observation: second.observation, ...calls}) + '\\n', () => process.exit(0));
`,
  {mode: 0o600},
);

function request(id, permissions, extra = {}) {
  return {
    directory: hosts,
    invocationId: id,
    scriptPath: effectScript,
    cwd: workspace,
    input: {token: 'shared'},
    trustedScript: true,
    backend: 'deterministic',
    providers: [],
    grants: ['fixture:effect'],
    permissions,
    localProvider: {kind: 'trusted-local', version: '1.0.0', capabilities: [EFFECT], modulePath: holdPath, digest: sha(holdPath)},
    sourceFiles: [effectScript, holdPath],
    ...extra,
  };
}

async function launch(id, permissions, extra) {
  const receipt = await host.launchDetachedWorkflow(request(id, permissions, extra));
  pids.add(receipt.pid);
  return receipt;
}

/** A reader handle whose cancel and shutdown are counted at the client seam: the observer-close control ledger. */
function reader(id) {
  const client = host.connectDetachedWorkflow(hosts, id);
  const calls = {observerCancelCalls: 0, observerShutdownCalls: 0};
  return {
    calls,
    inspect: () => client.inspect(),
    execute: () => client.execute(),
    cancel: reason => { calls.observerCancelCalls += 1; return client.cancel(reason); },
    shutdown: reason => { calls.observerShutdownCalls += 1; return client.shutdown(reason); },
  };
}

/** A real reader process attaches, inspects twice and exits ("Pi closed"); resolves with what it reported. */
function readerProcess(id) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, [readerPath, hosts, id], {stdio: ['ignore', 'pipe', 'pipe']});
    children.add(child);
    let out = '';
    const timer = setTimeout(() => child.kill('SIGKILL'), BOUND_MS);
    child.stdout.on('data', chunk => { out += chunk; });
    child.once('exit', (code, signal) => {
      clearTimeout(timer);
      children.delete(child);
      try {
        resolve({exited: true, code, signal, report: JSON.parse(out.trim().split('\n').pop() ?? '{}')});
      } catch {
        resolve({exited: true, code, signal, report: {}});
      }
    });
  });
}

const alive = pid => {
  try { process.kill(pid, 0); return true; } catch { return false; }
};
const running = snapshot => snapshot.observation === 'observed-running';
const categoryOf = text => /^Detached (\w+):/.exec(text)?.[1] ?? 'none';

async function readerCloseCase({when, close}) {
  const name = `${close}-${when}-effect`;
  const id = `shared-${name}`;
  const receipt = await launch(id, ALL_PERMISSIONS, {autoStart: when === 'after'});
  const other = reader(id);
  const leaving = reader(id);
  if (when === 'after') {
    const live = await until(async () => ({snapshot: await other.inspect(), markers: markerCount(id)}), state => running(state.snapshot) && state.markers >= 1);
    if (!live.ok) diagnostics.push(`${id}: the child did not reach observed-running with its effect marker before the reader closed.`);
  }
  // Both readers observe the one child; then one of them goes away.
  const attachedBoth = (await other.inspect()).observation !== 'unknown' && (await leaving.inspect()).observation !== 'unknown';
  const processReader = close === 'pi-exit' ? await readerProcess(id) : undefined;
  const processCalls = processReader ? processReader.report : {};
  const markersAtClose = markerCount(id);
  const closedAt = now();
  await sleep(SETTLE_MS);
  const after = await other.inspect();
  const markersAfterClose = markerCount(id);
  const hostAliveAfterClose = alive(receipt.pid);
  if (when === 'before') await other.execute();
  const finished = await until(() => other.inspect(), snapshot => typeof snapshot.terminal === 'string' && snapshot.terminal !== 'unknown', BOUND_MS + HOLD_MS);
  const terminal = finished.value.terminal ?? 'none';
  if (!finished.ok) diagnostics.push(`${id}: the child did not reach its own terminal within the bound.`);
  return {
    name,
    when,
    close,
    invocationId: id,
    readers: attachedBoth && (processReader ? processReader.report.attached === true : true) ? 2 : 1,
    hostPid: receipt.pid,
    readerClosedAt: closedAt,
    readerExit: processReader ? {code: processReader.code, signal: processReader.signal} : {stoppedWaiting: true},
    markersAtClose,
    markersAfterClose,
    hostAliveAfterClose,
    observationAfterClose: after.observation,
    cancellationRequestedAfterClose: after.cancellationRequested === true,
    controlAuditAfterClose: after.controlAudit,
    observerCancelCalls: other.calls.observerCancelCalls + leaving.calls.observerCancelCalls + (processCalls.observerCancelCalls ?? 0),
    observerShutdownCalls: other.calls.observerShutdownCalls + leaving.calls.observerShutdownCalls + (processCalls.observerShutdownCalls ?? 0),
    terminal,
    markersFinal: markerCount(id),
    childTerminalMs: finished.ms,
  };
}

async function readerCloseJourney() {
  const cases = [];
  for (const entry of SHARED_CHILD_CASES) cases.push(await readerCloseCase(entry));
  return {armed: cases.length === SHARED_CHILD_CASES.length && cases.every(entry => entry.readers === 2), cases};
}

async function nonOwnerStopJourney() {
  const id = 'shared-nonowner';
  await launch(id, READ_ONLY_PERMISSIONS);
  const first = reader(id);
  const second = reader(id);
  const live = await until(async () => ({snapshot: await first.inspect(), markers: markerCount(id)}), state => running(state.snapshot) && state.markers >= 1);
  const refusal = async attempt => {
    try {
      await attempt();
      return {rejected: false, category: 'none', diagnostic: 'accepted'};
    } catch (error) {
      return {rejected: true, category: categoryOf(message(error)), diagnostic: message(error)};
    }
  };
  const cancelRefusal = await refusal(() => first.cancel('non-owner reader tries to stop the shared child'));
  const shutdownRefusal = await refusal(() => second.shutdown('non-owner reader tries to shut the shared child down'));
  const after = await first.inspect();
  const finished = await until(() => second.inspect(), snapshot => typeof snapshot.terminal === 'string' && snapshot.terminal !== 'unknown', BOUND_MS + HOLD_MS);
  if (!live.ok) diagnostics.push(`${id}: the child did not reach observed-running with its effect marker.`);
  return {
    armed: live.ok && finished.ok,
    invocationId: id,
    cancelRefusal,
    shutdownRefusal,
    observationAfter: after.observation,
    cancellationRequested: after.cancellationRequested === true,
    controlAudit: after.controlAudit,
    markersFinal: markerCount(id),
    terminal: finished.value.terminal ?? 'none',
  };
}

async function ownerStopJourney() {
  const id = 'shared-owner';
  await launch(id, ALL_PERMISSIONS);
  const owner = reader(id);
  const live = await until(async () => ({snapshot: await owner.inspect(), markers: markerCount(id)}), state => running(state.snapshot) && state.markers >= 1);
  const closed = await readerProcess(id);
  const before = await owner.inspect();
  const markersBeforeStop = markerCount(id);
  const startedAt = performance.now();
  const reply = await owner.cancel('shared-child journey: explicit owner stop after a reader closed');
  const firstInspect = await owner.inspect();
  const finished = await until(() => owner.inspect(), snapshot => snapshot.terminal === 'cancelled');
  if (!live.ok) diagnostics.push(`${id}: the child did not reach observed-running with its effect marker.`);
  if (!finished.ok) diagnostics.push(`${id}: the child did not reach cancelled after the explicit owner stop.`);
  return {
    armed: live.ok && finished.ok && closed.report.attached === true,
    invocationId: id,
    readerClosedFirst: closed.exited === true && closed.report.attached === true,
    markersBeforeStop,
    terminalBeforeStop: typeof before.terminal === 'string' ? before.terminal : null,
    cancel: {accepted: reply.accepted, terminalConfirmed: reply.terminalConfirmed},
    cancellationRequestedAtFirstInspect: firstInspect.cancellationRequested === true,
    terminal: finished.value.terminal ?? 'none',
    stopLatencyMs: round(performance.now() - startedAt),
    controlAudit: arrayOf(finished.value.controlAudit).map(entry => ({command: entry.command, accepted: entry.accepted, ownership: entry.ownership, terminalConfirmed: entry.terminalConfirmed})),
    markersFinal: markerCount(id),
  };
}

function arrayOf(value) {
  return Array.isArray(value) ? value : [];
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
  await measure('readerClose', readerCloseJourney);
  await measure('nonOwnerStop', nonOwnerStopJourney);
  await measure('ownerStop', ownerStopJourney);
} finally {
  for (const child of children) child.kill('SIGKILL');
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
