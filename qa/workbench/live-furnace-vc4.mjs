// wb-752.3 (VC-4 residual): live external Furnace Run observation acceptance. Run `npm run build` first.
// The Run is never this program's. The tier's own launcher (qa/workbench/live-furnace-vc4-launch.mjs) creates it
// beforehand in a disposable /tmp/pi-external-furnace-realbd.* workspace with its own bd store and prints its identity.
// This runner reads that identity from PI_FURNACE_FIXTURE_ROOT and PI_FURNACE_FIXTURE_RUN_ID and nothing else. When
// either is unset, or the root is not such a launcher-made workspace, it speaks to no furnace at all and exits 2:
// never a skip, never a Run of its own. Otherwise, in order:
//   hash          sha256 of every file under the workspace's .beads and .furnace;
//   attach        the compiled nativeFurnaceRunInspect by Run ID: the Run record, and the binary identity it reports;
//   attached      read-current snapshot of the running Attempt through the compiled FurnaceObserver, projected;
//   disconnected  the observer's poll source is forced to fail; the reading and nodes must go stale, last-known running;
//   reconnected   the poll source is restored and NOTHING is read; freshness must stay stale;
//   reconciled    one real read-current snapshot; only this may clear stale;
//   close         observer.close(), with the Run read independently just before and just after;
//   hash          the same two stores again, to be compared byte for byte with the first hashes.
// Every furnace process this runner causes (the provider's, the observer's and its own independent reads) runs through
// a logging stand-in placed first on PATH, so a control verb cannot hide behind the SDK or the provider. BEADS_*, BD_*
// and FURNACE_* variables are removed from the environment first, so no other store can be addressed. One JSON receipt
// (workbench.furnace-vc4/v1) is printed and written to $VC4_RECEIPT (when set) before the exit code is set:
// 0 realised clean; 1 realised with findings (never tuned away); 2 not realised (the diagnostic names the step).
import { createHash } from 'node:crypto';
import { accessSync, chmodSync, constants, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Furnace } from '@furnace/sdk';
import { FurnaceObserver } from '../../dist/workbench/furnace-observer.js';
import { ObservationProjection } from '../../dist/workbench/observation.js';
import { nativeFurnaceRunInspect } from '../../dist/workbench/providers/furnace.js';
import {
  BINARY_IDENTITY_SOURCE,
  buildReceipt,
  exitCodeFor,
  FIXTURE_ROOT_PATTERN,
  fixtureIdentityOf,
  fixtureRootRefusal,
  HASHED_STORES,
  LAUNCHER_RECORD,
  RUN_ID_PATTERN,
} from './live-furnace-vc4-receipt.mjs';
import { gitStamp } from './git-stamp.mjs';

const COMMAND = 'node qa/workbench/live-furnace-vc4.mjs';
const PRINCIPAL = 'vc4-live-reader';
const CALL_TIMEOUT_MS = 10_000;
const LIMITS = { maxPolls: 20, intervalMs: 500, maxElapsedMs: 60_000, attemptLimit: 5, logBytes: 512, callTimeoutMs: CALL_TIMEOUT_MS };
const REPO_ROOT = realpathSync(fileURLToPath(new URL('../..', import.meta.url)));
/** The bytes this measurement executes, digested into the receipt beside the revision. */
const SOURCES = Object.freeze([
  'qa/workbench/live-furnace-vc4.mjs',
  'qa/workbench/live-furnace-vc4-receipt.mjs',
  'qa/workbench/live-furnace-vc4-launch.mjs',
  'qa/workbench/git-stamp.mjs',
  'dist/workbench/furnace-observer.js',
  'dist/workbench/observation.js',
  'dist/workbench/providers/furnace.js',
]);
/** The version fields copied verbatim from the inspect envelope (rule 6); nothing about the binary is read elsewhere. */
const IDENTITY_FIELDS = Object.freeze(['binary_path', 'binary_digest', 'binary_revision', 'furnace_version', 'protocol_version', 'supported_state_schema', 'beads_version']);
const SCRUBBED = /^(?:BEADS|BD|FURNACE)_/;
const ENDED = new Set(['completed', 'stopped', 'failed']);

const reasonOf = (error) =>
  String(error instanceof Error ? error.message : error)
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .slice(0, 400);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const statOf = (path) => {
  try {
    return statSync(path);
  } catch {
    return undefined;
  }
};
const isDirectory = (path) => statOf(path)?.isDirectory() === true;
const isFile = (path) => statOf(path)?.isFile() === true;
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function realDirectory(path) {
  if (!path) return null;
  try {
    const real = realpathSync(path);
    return isDirectory(real) ? real : null;
  } catch {
    return null;
  }
}

function launcherRecordOf(path) {
  try {
    const record = JSON.parse(readFileSync(path, 'utf8'));
    return record && typeof record === 'object' && !Array.isArray(record) ? record : null;
  } catch {
    return null;
  }
}

/** The fixture as the receipt judges it. Nothing inside a root is looked at until its path is a disposable fixture path. */
function fixtureOf(identity) {
  const realRoot = realDirectory(identity.root);
  const fixture = { root: identity.root, runId: identity.runId, realRoot, repoRoot: REPO_ROOT, beadsStore: false, runRecord: false, launcher: null };
  if (identity.missing.length > 0 || !realRoot || !FIXTURE_ROOT_PATTERN.test(realRoot) || !RUN_ID_PATTERN.test(identity.runId)) return fixture;
  return {
    ...fixture,
    beadsStore: isDirectory(join(realRoot, '.beads', 'embeddeddolt')),
    runRecord: isFile(join(realRoot, '.furnace', 'runs', identity.runId, 'run.json')),
    launcher: launcherRecordOf(join(realRoot, LAUNCHER_RECORD)),
  };
}

/** The furnace executable PATH names, found by looking, never by running anything. */
function furnaceOnPath(pathVariable) {
  for (const directory of String(pathVariable ?? '').split(delimiter)) {
    if (!directory) continue;
    const candidate = join(directory, 'furnace');
    try {
      accessSync(candidate, constants.X_OK);
      if (isFile(candidate)) return realpathSync(candidate);
    } catch {
      // not here; keep looking
    }
  }
  return null;
}

/** A furnace stand-in first on PATH: it appends its argv (tab-separated, after a marker) to the log, then becomes the real binary. */
function installShim(directory, real, log) {
  if ([directory, real, log].some((path) => path.includes("'"))) throw new Error('a shim path holds a quote');
  const shim = join(directory, 'furnace');
  writeFileSync(shim, `#!/bin/sh\nprintf 'argv' >> '${log}'\nprintf '\\t%s' "$@" >> '${log}'\nprintf '\\n' >> '${log}'\nexec '${real}' "$@"\n`);
  chmodSync(shim, 0o755);
  writeFileSync(log, '');
  process.env.PATH = `${directory}${delimiter}${process.env.PATH ?? ''}`;
}

const argvLog = (log) =>
  readFileSync(log, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('argv'))
    .map((line) => line.split('\t').slice(1));

/** sha256 of every regular file under the HASHED_STORES of the root, keyed by its path relative to the root. */
function hashStores(root, stamp) {
  const startedAt = new Date().toISOString();
  const files = {};
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files[relative(root, path)] = sha256(readFileSync(path));
    }
  };
  for (const store of HASHED_STORES) walk(join(root, store));
  const finishedAt = new Date().toISOString();
  const paths = Object.keys(files).sort();
  return {
    // Before the attach the hash speaks for the moment it finished; after the close, for the moment it began.
    at: stamp === 'finished' ? finishedAt : startedAt,
    digest: sha256(paths.map((path) => `${path}\t${files[path]}\n`).join('')),
    count: paths.length,
    files: Object.fromEntries(paths.map((path) => [path, files[path]])),
  };
}

function binaryIdentityOf(version) {
  const identity = { source: BINARY_IDENTITY_SOURCE };
  for (const field of IDENTITY_FIELDS) if (version && typeof version === 'object' && Object.hasOwn(version, field)) identity[field] = version[field];
  return identity;
}

async function independentRead(client, runId) {
  const status = await client.runs.get(runId).status({ timeoutMs: CALL_TIMEOUT_MS });
  const attempts = await client.attempts.list(runId, { limit: LIMITS.attemptLimit }, { timeoutMs: CALL_TIMEOUT_MS });
  const items = attempts.data.attempts;
  const live = status.data.controller?.live;
  return {
    status: status.data,
    attempts: items,
    summary: {
      state: status.data.state,
      updatedAt: status.data.updated_at,
      controllerSessionId: status.data.controller?.controller_session_id ?? null,
      controllerLive: typeof live === 'boolean' ? live : null,
      attemptIds: items.map((item) => item.attempt_id),
      cancelledAttemptIds: items.filter((item) => item.outcome === 'cancelled').map((item) => item.attempt_id),
      attemptStates: Object.fromEntries(items.map((item) => [item.attempt_id, item.state])),
    },
  };
}

/**
 * wb-4xz (vko gate follow-on, 752.3 F1; cure shape = vko gate verdict U2): the canonical fail-closed stamp
 * (./git-stamp.mjs), rooted at this repository's toplevel. A stamp that cannot describe REPO_ROOT to the end (not the
 * repository toplevel, no valid HEAD, or a status read that failed) is 'unknown' with a null dirty bit, never a HEAD
 * beside a clean-looking tree; the value is decided in this one block and nowhere else.
 */
function gitFacts() {
  const { head, porcelain } = gitStamp(REPO_ROOT);
  if (head === null || porcelain === null) return { revision: 'unknown', dirty: null };
  return { revision: head, dirty: porcelain.trim().length > 0 };
}

function sourceDigests() {
  return Object.fromEntries(
    SOURCES.map((path) => {
      try {
        return [path, sha256(readFileSync(join(REPO_ROOT, path)))];
      } catch {
        return [path, 'unreadable'];
      }
    }),
  );
}

function sdkVersion() {
  try {
    return JSON.parse(readFileSync(join(REPO_ROOT, 'node_modules', '@furnace', 'sdk', 'package.json'), 'utf8')).version ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

async function measure(evidence, fixture, scriptDir) {
  const root = fixture.realRoot;
  const runId = fixture.runId;
  const log = join(scriptDir, 'furnace-argv.log');
  installShim(scriptDir, evidence.environment.shimForwardsTo, log);
  const client = new Furnace({ binary: 'furnace', cwd: root, timeoutMs: CALL_TIMEOUT_MS });
  const observerCalls = [];
  let disconnected = false;
  let observer;
  evidence.stores.before = hashStores(root, 'finished');
  try {
    // attach: the provider's read-only inspect by Run ID, nothing else; a refusal here means no Run was acquired.
    const inspected = await nativeFurnaceRunInspect(root, runId).catch((error) => {
      evidence.acquisition = { mode: 'fixture', workspace: root, error: `${nativeFurnaceRunInspect.name}: ${reasonOf(error)}` };
      return null;
    });
    if (!inspected) return;
    const attachedAt = new Date().toISOString();
    const runRecord = inspected.source?.data ?? {};
    evidence.acquisition = { mode: 'fixture', runId, workspace: root, requestId: inspected.source?.requestId ?? null };
    evidence.inspect = {
      contract: inspected.contract,
      workspaceRoot: inspected.workspaceRoot,
      kind: inspected.source?.kind,
      requestId: inspected.source?.requestId,
      runId: runRecord.run_id,
      workspace: runRecord.workspace,
      beadsRunId: runRecord.beads_run_id,
      creatingRequestId: runRecord.creating_request_id,
      formula: runRecord.formula,
      state: runRecord.state,
      createdAt: runRecord.created_at,
      exitCode: inspected.source?.exit?.code,
    };
    evidence.binary = binaryIdentityOf(inspected.version);
    const atAttach = await independentRead(client, runId);
    evidence.attach = {
      runId,
      attachedBy: 'run-id',
      via: nativeFurnaceRunInspect.name,
      parentInvocationId: null,
      runnerPid: process.pid,
      controllerPid: atAttach.status.controller?.pid ?? null,
      launcherPid: fixture.launcher.launcherPid,
      creatingRequestId: runRecord.creating_request_id ?? null,
      launcherRequestId: fixture.launcher.requestId,
      runCreatedAt: runRecord.created_at ?? null,
      attachedAt,
      runSummary: atAttach.summary,
    };

    const guard = (name, read) => async () => {
      observerCalls.push(name);
      if (disconnected) throw Object.assign(new Error('forced poll-source disconnect'), { code: 'ECONNRESET' });
      return read();
    };
    const observed = {
      runs: { get: (id) => ({ status: (call) => guard('runs.status', () => client.runs.get(id).status(call))() }) },
      attempts: { list: (id, request, call) => guard('attempts.list', () => client.attempts.list(id, request, call))() },
      logs: { read: (id, request, call) => guard('logs.read', () => client.logs.read(id, request, call))() },
    };
    const scope = { workspace: root, principal: PRINCIPAL };
    observer = new FurnaceObserver(observed, { workspaceRoot: root, runId, scope, limits: LIMITS });
    const projection = new ObservationProjection();
    projection.reconnect('furnace');
    const refs = (reading) => ({
      run: { provider: 'furnace', type: 'run', id: reading.source.runId, scope: root },
      attempt: (id) => ({ provider: 'furnace', type: 'attempt', id, scope: root }),
    });
    const confirmations = [];
    const ingest = (reading) => {
      const topology = observer.projectionTopology(reading);
      for (const snapshot of topology.snapshots) projection.refresh(snapshot);
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
    for (let poll = 0; poll < LIMITS.maxPolls; poll++) {
      reading = await observer.snapshot();
      if (reading.attempts.items.some((item) => item.state === 'running') || ENDED.has(reading.run.state)) break;
      await sleep(LIMITS.intervalMs);
    }
    const running = reading.attempts.items.find((item) => item.state === 'running');
    const attemptId = (running ?? reading.attempts.items.at(-1))?.id ?? 'absent';
    // Ownership is what the observer's own reading states about the Run, never assumed by this runner.
    evidence.attach.ownership = reading.source.ownership;
    ingest(reading);
    record('attached', reading, attemptId);
    if (!running) return;

    // disconnected: force the poll source to fail; the last-known reading must be stale yet still say running.
    disconnected = true;
    await observer.snapshot().catch(() => undefined);
    projection.disconnect('furnace');
    record('disconnected', observer.last, attemptId);

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
    const native = await independentRead(client, runId);
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

    // close: the Run read just before, the observer closed, then the Run read again without it.
    const runBefore = (await independentRead(client, runId)).summary;
    observer.close();
    const closedAt = new Date().toISOString();
    const runAfter = (await independentRead(client, runId)).summary;
    evidence.close = { observerCalls, closedAt, runBefore, runAfter };
  } finally {
    observer?.close();
    evidence.stores.after = hashStores(root, 'started');
    evidence.close = { ...evidence.close, observerCalls, argv: argvLog(log) };
  }
}

const identity = fixtureIdentityOf(process.env);
const fixture = fixtureOf(identity);
const evidence = { fixture, environment: {}, acquisition: {}, attach: {}, inspect: null, binary: null, transitions: [], close: {}, stores: {}, topology: {} };
let scriptDir;
// Nothing below speaks to a furnace unless the fixture identity is present and the root is a launcher-made fixture.
if (identity.missing.length === 0 && fixtureRootRefusal(fixture) === null) {
  for (const name of Object.keys(process.env)) if (SCRUBBED.test(name)) delete process.env[name];
  const furnace = furnaceOnPath(process.env.PATH);
  // Where the logging stand-in forwards; the binary's identity is still only ever the inspect envelope's (rule 6).
  evidence.environment = furnace ? { furnaceAvailable: true, shimForwardsTo: furnace } : { furnaceAvailable: false, diagnostic: 'no executable furnace on PATH' };
  if (furnace) {
    scriptDir = mkdtempSync(join(tmpdir(), 'pi-furnace-vc4-scripts.'));
    try {
      await measure(evidence, fixture, scriptDir);
    } catch (error) {
      if (!evidence.acquisition.runId) evidence.acquisition = { ...evidence.acquisition, error: reasonOf(error) };
      else evidence.measurementError = reasonOf(error);
    }
  }
}

let code;
try {
  const git = gitFacts();
  const receipt = buildReceipt({
    utc: new Date().toISOString(),
    revision: git.revision,
    dirty: git.dirty,
    sources: sourceDigests(),
    command: COMMAND,
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    toolchain: { sdk: `@furnace/sdk@${sdkVersion()}` },
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
  const verdict =
    code === 0
      ? 'realised, no findings'
      : code === 1
        ? `${receipt.findings.length} measured violation(s)`
        : `not realised: ${receipt.unrealised.map((entry) => `${entry.step}: ${entry.diagnostic}`).join('; ') || 'receipt not written'}`;
  console.error(`live-furnace-vc4: exit ${code} (${verdict})`);
} catch (error) {
  code = 2;
  console.error(`live-furnace-vc4: exit 2 (receipt refused: ${reasonOf(error)})`);
}
if (scriptDir) rmSync(scriptDir, { recursive: true, force: true });
process.exitCode = code;
