// wb-752.3 (VC-4 residual): live external Furnace Run observation acceptance. Run `npm run build` first.
// Attaches the COMPILED FurnaceObserver and ObservationProjection to a real Run that this process did not create as
// its own child workflow: either FURNACE_RUN_ID (+ FURNACE_WORKSPACE) supplied by the operator, or a disposable Run
// that this runner starts out-of-band through the furnace CLI in a throwaway /tmp workspace (own session, stdio
// detached) and then attaches to by Run ID only. Measured, in order:
//   attached      read-current snapshot of the running Attempt, projected;
//   disconnected  the observer's poll source is forced to fail; the reading and nodes must go stale, last-known running;
//   reconnected   the poll source is restored and NOTHING is read; freshness must stay stale;
//   reconciled    one real read-current snapshot; only this may clear stale;
//   close         observer.close(); every native call it made is recorded from a logging shim in front of the furnace
//                 binary (so a control verb cannot hide behind the SDK), and the Run is read independently before/after.
// One JSON receipt (workbench.furnace-vc4/v1) is printed and written to $VC4_RECEIPT (when set) before the exit code
// is set: 0 realised clean; 1 realised with findings (never tuned away); 2 not realised (diagnostic names the step).
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { cpus, tmpdir } from 'node:os';
import { join } from 'node:path';
import { Furnace } from '@furnace/sdk';
import { FurnaceObserver } from '../../dist/workbench/furnace-observer.js';
import { ObservationProjection } from '../../dist/workbench/observation.js';
import { buildReceipt, exitCodeFor } from './live-furnace-vc4-receipt.mjs';

const COMMAND = 'node qa/workbench/live-furnace-vc4.mjs';
const PRINCIPAL = 'vc4-live-reader';
const CALL_TIMEOUT_MS = 10_000;
const HOLD_SECONDS = Number.parseInt(process.env.FURNACE_VC4_HOLD_SECONDS ?? '30', 10);
const LIMITS = { maxPolls: 20, intervalMs: 500, maxElapsedMs: 60_000, attemptLimit: 5, logBytes: 512, callTimeoutMs: CALL_TIMEOUT_MS };

const reasonOf = (error) =>
  String(error instanceof Error ? error.message : error)
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .slice(0, 400);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const firstLine = (text) => String(text ?? '').split('\n')[0].trim();

function toolchain() {
  const furnace = spawnSync('furnace', ['--version'], { encoding: 'utf8' });
  const bd = spawnSync('bd', ['--version'], { encoding: 'utf8' });
  const lines = String(furnace.stdout ?? '').split('\n');
  const digest = lines.find((line) => line.startsWith('binary sha256'));
  return {
    available: furnace.status === 0,
    diagnostic: furnace.status === 0 ? undefined : reasonOf(furnace.error ?? furnace.stderr ?? `furnace --version exited ${furnace.status}`),
    furnace: { version: firstLine(furnace.stdout), sha256: digest ? digest.replace('binary sha256', '').trim() : undefined },
    bd: firstLine(bd.stdout) || 'unavailable',
  };
}

function revision() {
  if (process.env.VC4_REVISION) return process.env.VC4_REVISION;
  const git = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8', cwd: new URL('../..', import.meta.url).pathname });
  return git.status === 0 ? firstLine(git.stdout) : 'working-tree';
}

/** A disposable real-bd workspace and a sleeping executor; the Run itself is started detached, outside this process. */
async function startOutOfBand(root) {
  const workspace = realpathSync(mkdtempSync(join(tmpdir(), 'pi-furnace-vc4-live.')));
  const init = spawnSync('bd', ['init', '--non-interactive', '--prefix', 'fx', '--quiet'], { cwd: workspace, encoding: 'utf8' });
  if (init.status !== 0) throw new Error(`bd init failed in the disposable workspace: ${reasonOf(init.stderr)}`);
  mkdirSync(join(workspace, '.beads', 'formulas'), { recursive: true });
  writeFileSync(join(workspace, '.beads', 'formulas', 'vc4-live.formula.toml'), 'formula = "vc4-live"\ndescription = "VC-4 live observation"\nversion = 1\ntype = "workflow"\n\n[[steps]]\nid = "work"\ntitle = "work"\ndescription = "hold the Run open"\n');
  const executor = join(workspace, 'hold.sh');
  writeFileSync(executor, `#!/bin/sh\nsleep ${HOLD_SECONDS}\n`);
  chmodSync(executor, 0o755);
  const requestId = `vc4-live-${process.pid}-${Date.now().toString(36)}`;
  const child = spawn('furnace', ['-C', workspace, 'run', 'start', 'vc4-live', '--executor-program', executor, '--request-id', requestId, '--json'], { detached: true, stdio: 'ignore' });
  child.unref();
  for (let attempt = 0; attempt < 60; attempt++) {
    await sleep(500);
    const listed = spawnSync('furnace', ['-C', workspace, 'run', 'list', '--creating-request-id', requestId, '--json'], { encoding: 'utf8' });
    if (listed.status !== 0) continue;
    const run = JSON.parse(listed.stdout).data?.runs?.[0];
    if (run?.run_id) {
      root.cleanup = workspace;
      return { mode: 'out-of-band', workspace, runId: run.run_id };
    }
  }
  rmSync(workspace, { recursive: true, force: true });
  throw new Error('the out-of-band Run never appeared in `run list` within 30s');
}

function acquire(root) {
  const supplied = process.env.FURNACE_RUN_ID;
  if (!supplied) return startOutOfBand(root);
  if (!process.env.FURNACE_WORKSPACE) throw new Error('FURNACE_RUN_ID needs FURNACE_WORKSPACE (the Run workspace)');
  return Promise.resolve({ mode: 'supplied', workspace: realpathSync(process.env.FURNACE_WORKSPACE), runId: supplied });
}

/** A furnace binary stand-in that appends every argv to a log, then execs the real binary. */
function installShim(scriptDir, log) {
  const real = spawnSync('sh', ['-c', 'command -v furnace'], { encoding: 'utf8' }).stdout.trim();
  const shim = join(scriptDir, 'furnace-shim.sh');
  writeFileSync(shim, `#!/bin/sh\nprintf '%s\\t' "$@" >> '${log}'\nprintf '\\n' >> '${log}'\nexec '${real}' "$@"\n`);
  chmodSync(shim, 0o755);
  writeFileSync(log, '');
  return shim;
}

const argvLog = (log) =>
  readFileSync(log, 'utf8')
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => line.split('\t').filter((word, index, all) => index < all.length - 1 || word !== ''));

async function independentRead(raw, runId) {
  const status = await raw.runs.get(runId).status({ timeoutMs: CALL_TIMEOUT_MS });
  const attempts = await raw.attempts.list(runId, { limit: LIMITS.attemptLimit }, { timeoutMs: CALL_TIMEOUT_MS });
  const items = attempts.data.attempts;
  return {
    status: status.data,
    attempts: items,
    summary: {
      state: status.data.state,
      controllerSessionId: status.data.controller?.controller_session_id ?? null,
      attemptIds: items.map((item) => item.attempt_id),
      cancelledAttemptIds: items.filter((item) => item.outcome === 'cancelled').map((item) => item.attempt_id),
    },
  };
}

async function measure(evidence, root, scriptDir) {
  const acquired = await acquire(root);
  evidence.acquisition = { mode: acquired.mode, runId: acquired.runId, workspace: acquired.workspace };
  const { workspace, runId } = acquired;
  const log = join(scriptDir, 'observer-argv.log');
  const shim = installShim(scriptDir, log);
  const raw = new Furnace({ binary: 'furnace', cwd: workspace, timeoutMs: CALL_TIMEOUT_MS });
  const sdk = new Furnace({ binary: shim, cwd: workspace, timeoutMs: CALL_TIMEOUT_MS });
  const observerCalls = [];
  let disconnected = false;
  const guard = (name, read) => async () => {
    observerCalls.push(name);
    if (disconnected) throw Object.assign(new Error('forced poll-source disconnect'), { code: 'ECONNRESET' });
    return read();
  };
  const client = {
    runs: { get: (id) => ({ status: (call) => guard('runs.status', () => sdk.runs.get(id).status(call))() }) },
    attempts: { list: (id, request, call) => guard('attempts.list', () => sdk.attempts.list(id, request, call))() },
    logs: { read: (id, request, call) => guard('logs.read', () => sdk.logs.read(id, request, call))() },
  };
  const scope = { workspace, principal: PRINCIPAL };
  const observer = new FurnaceObserver(client, { workspaceRoot: workspace, runId, scope, limits: LIMITS });
  const projection = new ObservationProjection();
  projection.reconnect('furnace');
  const refs = (reading) => ({
    run: { provider: 'furnace', type: 'run', id: reading.source.runId, scope: workspace },
    attempt: (id) => ({ provider: 'furnace', type: 'attempt', id, scope: workspace }),
  });
  const confirmations = [];
  const outcomes = [];
  const ingest = (reading) => {
    const topology = observer.projectionTopology(reading);
    for (const snapshot of topology.snapshots) outcomes.push(projection.refresh(snapshot));
    for (const relation of topology.relations) projection.relate(relation);
    confirmations.push(reading.source.requestIds.attempts);
  };
  const nodeOf = (ref) => projection.query({ scope, limit: 5, ref }).nodes[0];
  const record = (phase, reading, attemptId) => {
    const attempt = reading.attempts.items.find((item) => item.id === attemptId);
    const runNode = nodeOf(refs(reading).run);
    const attemptNode = nodeOf(refs(reading).attempt(attemptId));
    evidence.transitions.push({
      phase,
      utc: new Date().toISOString(),
      freshness: reading.freshness,
      connection: reading.connection,
      runState: reading.run.state,
      attemptState: attempt?.state ?? 'absent',
      runNodeFreshness: runNode?.freshness ?? 'absent',
      attemptNodeFreshness: attemptNode?.freshness ?? 'absent',
      attemptNodeStatusText: attemptNode?.presentation.statusText ?? 'absent',
    });
  };

  // attached: wait (bounded) for a running Attempt; a Run that ends first is reported as not exercised.
  let reading;
  for (let poll = 0; poll < 60; poll++) {
    reading = await observer.snapshot();
    if (reading.attempts.items.some((item) => item.state === 'running') || ['completed', 'stopped', 'failed'].includes(reading.run.state)) break;
    await sleep(500);
  }
  const running = reading.attempts.items.find((item) => item.state === 'running');
  const attemptId = (running ?? reading.attempts.items.at(-1))?.id ?? 'absent';
  ingest(reading);
  const before = await independentRead(raw, runId);
  evidence.attach = {
    runId,
    attachedBy: 'run-id',
    parentInvocationId: null,
    ownership: reading.source.ownership,
    runnerPid: process.pid,
    controllerPid: before.status.controller?.pid ?? null,
  };
  record('attached', reading, attemptId);
  if (!running) return;

  // disconnected: force the poll source to fail; the last-known reading must be stale yet still say running.
  disconnected = true;
  const failure = await observer.snapshot().then(
    () => 'poll unexpectedly succeeded',
    (error) => reasonOf(error),
  );
  projection.disconnect('furnace');
  const stale = observer.last;
  record('disconnected', stale, attemptId);
  evidence.disconnectFailure = failure;
  evidence.staleRefreshRefused = (() => {
    try {
      observer.projectionSnapshot(stale);
      return false;
    } catch {
      return true;
    }
  })();

  // reconnected: restore the source and read NOTHING.
  disconnected = false;
  projection.reconnect('furnace');
  await sleep(300);
  record('reconnected', observer.last, attemptId);

  // reconciled: one real read-current snapshot.
  const fresh = await observer.snapshot();
  ingest(fresh);
  record('reconciled', fresh, attemptId);

  // topology as the projection holds it, against the producer's own listing read independently.
  const native = await independentRead(raw, runId);
  const nodes = projection.query({ scope, limit: 100 }).nodes;
  const keyed = new Map(nodes.map((node) => [node.key, node.nativeRef]));
  evidence.topology = {
    runId,
    nativeAttemptIds: native.attempts.map((item) => item.attempt_id),
    confirmations,
    nodes: nodes.map((node) => ({ type: node.nativeRef.type, id: node.nativeRef.id })),
    relations: projection.relations({ scope, limit: 100 }).map((relation) => ({
      from: keyed.get(relation.from)?.id ?? relation.from,
      to: keyed.get(relation.to)?.id ?? relation.to,
      kind: relation.kind,
      provenanceSource: relation.provenance.source,
      ...(relation.provenance.nativeConfirmationRef ? { nativeConfirmationRef: relation.provenance.nativeConfirmationRef } : {}),
    })),
    intervals: nodes
      .filter((node) => node.nativeRef.type === 'attempt' && node.interval)
      .map((node) => ({ attemptId: node.nativeRef.id, startedAt: node.interval.startedAt, ...(node.interval.endedAt ? { endedAt: node.interval.endedAt } : {}) })),
    nativeIntervals: native.attempts.map((item) => ({ attemptId: item.attempt_id, startedAt: item.started_at, finishedAt: item.finished_at })),
    completeness: fresh.completeness,
    gaps: [
      ...(fresh.attempts.complete ? [] : ['Attempt page is incomplete (next cursor present)']),
      ...(fresh.attempts.unreadableCount > 0 ? [`${fresh.attempts.unreadableCount} unreadable Attempt record(s)`] : []),
      ...(fresh.run.unreadableCount > 0 ? [`${fresh.run.unreadableCount} unreadable Run record(s)`] : []),
      ...fresh.logs.filter((entry) => !entry.complete || entry.lossy).map((entry) => `Attempt ${entry.attemptId} ${entry.stream} is a bounded tail (complete=${entry.complete}, lossy=${entry.lossy})`),
    ],
  };
  evidence.projectionRefreshOutcomes = outcomes;

  // close: record what the observer has said to the producer, then what the Run looks like without us.
  const runBefore = (await independentRead(raw, runId)).summary;
  observer.close();
  const callsAtClose = argvLog(log).length;
  const afterClose = await observer.snapshot().then(
    () => 'snapshot after close unexpectedly succeeded',
    (error) => reasonOf(error),
  );
  if (acquired.mode === 'out-of-band') {
    for (let poll = 0; poll < 2 * (HOLD_SECONDS + 40); poll++) {
      const state = (await independentRead(raw, runId)).summary.state;
      if (['completed', 'stopped', 'failed', 'needs_attention'].includes(state)) break;
      await sleep(500);
    }
  } else {
    await sleep(2_000);
  }
  evidence.close = {
    observerCalls,
    argv: argvLog(log),
    callsAfterClose: argvLog(log).length - callsAtClose,
    snapshotAfterClose: afterClose,
    runBefore,
    runAfter: (await independentRead(raw, runId)).summary,
  };
}

const root = { cleanup: undefined };
const scriptDir = mkdtempSync(join(tmpdir(), 'pi-furnace-vc4-scripts.'));
const tools = toolchain();
const evidence = {
  environment: { furnaceAvailable: tools.available, ...(tools.diagnostic ? { diagnostic: tools.diagnostic } : {}) },
  acquisition: {},
  attach: {},
  transitions: [],
  close: {},
  topology: {},
};
if (tools.available) {
  try {
    await measure(evidence, root, scriptDir);
  } catch (error) {
    if (!evidence.acquisition.runId) evidence.acquisition = { ...evidence.acquisition, error: reasonOf(error) };
    else evidence.measurementError = reasonOf(error);
  }
}

let code;
try {
  const receipt = buildReceipt({
    utc: new Date().toISOString(),
    revision: revision(),
    command: COMMAND,
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    cpus: cpus().length,
    toolchain: { furnace: tools.furnace, bd: tools.bd, sdk: '@furnace/sdk@0.1.0', furnaceBinarySha256: tools.furnace.sha256 ?? createHash('sha256').update('').digest('hex') },
    evidence,
  });
  const line = JSON.stringify(receipt);
  console.log(line);
  let written = true;
  if (process.env.VC4_RECEIPT) {
    try {
      writeFileSync(process.env.VC4_RECEIPT, `${line}\n`);
    } catch (error) {
      written = false;
      console.error(`live-furnace-vc4: could not write VC4_RECEIPT: ${reasonOf(error)}`);
    }
  }
  code = written ? exitCodeFor(receipt) : 2;
  const verdict = code === 0 ? 'realised, no findings' : code === 1 ? `${receipt.findings.length} measured violation(s)` : `not realised: ${receipt.unrealised.map((entry) => `${entry.step}: ${entry.diagnostic}`).join('; ') || 'receipt not written'}`;
  console.error(`live-furnace-vc4: exit ${code} (${verdict})`);
} catch (error) {
  code = 2;
  console.error(`live-furnace-vc4: exit 2 (receipt refused: ${reasonOf(error)})`);
}
rmSync(scriptDir, { recursive: true, force: true });
if (root.cleanup) rmSync(root.cleanup, { recursive: true, force: true });
process.exitCode = code;
