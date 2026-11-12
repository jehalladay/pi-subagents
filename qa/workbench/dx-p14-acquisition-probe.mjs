/**
 * dx-p14-acquisition-probe.mjs - wb-mo89, the pi-system DX triage packet P14: the native acquisition runner for EAT-R478,
 * EAT-R479, EAT-R480, EAT-R481 and EAT-R483 (EAT-R482 is measured by its own fixture suite,
 * test/workbench-rf-descendant-pipe.test.ts). Requirement text: test/fixtures/dx-p14-requirements-roster.json.
 *
 * What it records, and nothing more. The judges are qa/workbench/dx-p14-acquisition-judge.mjs; the committed record,
 * qa/workbench/receipts/wb-mo89-dx-p14-acquisition-probe.json, is re-judged by test/workbench-dx-p14-acquisition.test.ts
 * and tied to these bytes through probe.scriptSha256.
 *  - EAT-R479 (G-FORGE): in a throwaway one-step Forge package, two `forge build --json` gate runs (each its argv, process
 *    exit, gate verdict and operation and command ids), then two reads through the registered forge.gate.status capability
 *    (registerNativeForgeGateStatus, invoked through a CapabilityRegistry: the read a workflow_reconcile evidence action
 *    runs). For each reading: operation_id, status, command id, reason code, provenance and every package row's
 *    last_result and source_ref; with the producer's version and executable SHA-256.
 *  - EAT-R483 (G-RF): in a throwaway dolt-backed rf workspace (`rf init --backend dolt`), the h09 journey: the rf server
 *    ledger for that root, one invoke of the registered reactivefiber.render.preview capability (registerNative
 *    ReactiveFiberRender, through a CapabilityRegistry), the ledger again, the launched server's argv (/proc/<pid>/cmdline),
 *    its pid-bound `ss -ltnpH` listeners, the root-selected stop (`rf storage local-servers --root <ws> --stop --yes`) and the
 *    ledger after it. The only server ever stopped is the one rf's ledger names for this probe's own workspace root.
 *  - EAT-R478 (G-EXTERNAL-ENFORCEMENT), EAT-R480 (G-FORK-MEDIA), EAT-R481 (G-CROSS-HOST): the evidence each acquisition can
 *    find from this seat, and its judge's reading. No outside-machine store is read, nothing is published or uploaded, no
 *    network read is made and no host is provisioned. The EAT-R481 leg records this host's own layout, which by that
 *    requirement is not an independent-host receipt.
 *
 * No host path is recorded: executables are named by name and SHA-256, and the scratch roots by the tokens <fixture> and
 * <workspace>. Every scratch directory is a guarded one (program rule 11, qa/workbench/scratch.mjs) removed before exit. No
 * gate slot is involved: no run passes --require-complete and none runs against a repository checkout.
 *
 * Usage: npm run build && node qa/workbench/dx-p14-acquisition-probe.mjs [--write <path>]
 * (the providers come from the dist build, as in qa/workbench/forge-gate-status-probe.mjs)
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { accessSync, constants, existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter, join, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CapabilityRegistry } from '../../dist/workbench/capability-registry.js';
import { registerNativeForgeGateStatus } from '../../dist/workbench/providers/forge.js';
import { registerNativeReactiveFiberRender } from '../../dist/workbench/providers/reactivefiber.js';
import {
  GATES,
  judgeCrossHost,
  judgeDoltServerArgv,
  judgeExternalEnforcement,
  judgeForgeLeg,
  judgeForkMedia,
  judgeLoopbackListeners,
  PROBE_SCRIPT,
  parseSsListeners,
  RECORD_SCHEMA,
} from './dx-p14-acquisition-judge.mjs';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

const REPO = fileURLToPath(new URL('../../', import.meta.url));
/** The render input the live rf-preview tier uses (test/workbench-native-rf-preview.test.ts). */
const RENDER_INPUT = Object.freeze({ model: 'claude-opus-5', task: 'Summarize workbench integration' });
/** The SDK's own launch of the app server it reads gate.status from (node_modules/@forge/sdk/dist/transport.js, ServerConnection.spawn). */
const FORGE_SDK_LAUNCH = Object.freeze(['forge', 'app-server', '--stdio']);

/** @param {string | Buffer} bytes */
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function objectOf(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? /** @type {Record<string, unknown>} */ (value) : {};
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function stringOf(value) {
  return typeof value === 'string' ? value : null;
}

/**
 * The first executable regular file named `name` on PATH, as its realpath and SHA-256, or null.
 * @param {string} name
 * @returns {{ resolved: string, sha256: string } | null}
 */
function executableOnPath(name) {
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (dir === '') continue;
    try {
      const candidate = join(dir, name);
      accessSync(candidate, constants.X_OK);
      const resolved = realpathSync(candidate);
      if (!statSync(resolved).isFile()) continue;
      return { resolved, sha256: sha256(readFileSync(resolved)) };
    } catch {
      /* not here: keep looking */
    }
  }
  return null;
}

/**
 * Every string in `value` with `root` replaced by `token` (a deep copy; JSON values only).
 * @param {unknown} value
 * @param {string} root
 * @param {string} token
 * @returns {unknown}
 */
function redact(value, root, token) {
  return JSON.parse(JSON.stringify(value ?? null, (_key, item) => (typeof item === 'string' ? item.split(root).join(token) : item)));
}

/**
 * Runs a producer command and parses its stdout as one JSON envelope (null when it is not JSON).
 * @param {string} command
 * @param {readonly string[]} args
 * @param {string} cwd
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {{ processExit: number | null, envelope: Record<string, unknown> | null }}
 */
function runJson(command, args, cwd, env = process.env) {
  const child = spawnSync(command, [...args], { cwd, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 300_000 });
  if (child.error) throw child.error;
  /** @type {Record<string, unknown> | null} */
  let envelope = null;
  try {
    const parsed = JSON.parse(child.stdout);
    envelope = parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
  } catch {
    envelope = null;
  }
  return { processExit: child.status, envelope };
}

/** The caller's environment minus every FORGE_ variable, plus FORGE_JSON=1 (as qa/workbench/forge-transport-probe.mjs). */
function forgeEnv() {
  /** @type {NodeJS.ProcessEnv} */
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && !key.startsWith('FORGE_')) env[key] = value;
  }
  env.FORGE_JSON = '1';
  return env;
}

/** @param {number} ms */
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Whether /proc still shows `pid` as a live (non-zombie) process.
 * @param {number} pid
 */
function alive(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    return stat.slice(stat.lastIndexOf(')') + 2, stat.lastIndexOf(')') + 3) !== 'Z';
  } catch {
    return false;
  }
}

/**
 * Writes a one-step package whose gate step exits 0, committed in its own fresh repository.
 * @param {string} dir
 * @param {string} name
 * @returns {string} the step command as written
 */
function writePackage(dir, name) {
  const step = 'node -e "process.exit(0)"';
  const manifest = [
    '[package]',
    `name = "${name}"`,
    'type = "code"',
    'version = "0.0.1"',
    'language = "typescript"',
    '',
    '[build]',
    'backend = "typescript"',
    'gate = ["check"]',
    '',
    '[build.commands]',
    `check = ${JSON.stringify(step)}`,
    '',
  ].join('\n');
  writeFileSync(join(dir, 'forge.toml'), manifest);
  writeFileSync(join(dir, 'package.json'), `${JSON.stringify({ name, version: '0.0.1', private: true })}\n`);
  writeFileSync(join(dir, '.gitignore'), '.forge/\n');
  const git = (/** @type {string[]} */ ...gitArgs) => {
    const result = spawnSync('git', gitArgs, { cwd: dir, encoding: 'utf8' });
    if (result.status !== 0) throw new Error(`git ${gitArgs.join(' ')} exited ${result.status}: ${result.stderr}`);
  };
  git('init', '-q', '-b', 'main');
  git('add', '-A');
  git('-c', 'user.name=dx-p14-acquisition-probe', '-c', 'user.email=probe@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-q', '-m', 'probe package');
  return step;
}

/**
 * The fields of a registered forge.gate.status reading the record keeps (the capability value's contract, protocol
 * method and the source fields src/workbench/native-evidence.ts reads, plus the package rows' result and source).
 * @param {unknown} reading
 */
function projectStatusReading(reading) {
  const value = objectOf(reading);
  const source = objectOf(value.source);
  const envelope = objectOf(source.envelope);
  const provenance = objectOf(envelope.provenance);
  const data = objectOf(source.data);
  const packages = Array.isArray(data.packages) ? data.packages : [];
  return {
    contract: stringOf(value.contract),
    protocolMethod: stringOf(value.protocolMethod),
    source: {
      operation_id: stringOf(source.operation_id),
      status: stringOf(source.status),
      ids: { command_id: stringOf(objectOf(source.ids).command_id) },
      envelope: { reason_code: stringOf(envelope.reason_code), provenance: { version: stringOf(provenance.version), revision: stringOf(provenance.revision), variant: stringOf(provenance.variant) } },
      data: {
        ...(typeof data.source_snapshot_id === 'string' ? { source_snapshot_id: data.source_snapshot_id } : {}),
        ...(typeof data.gated_tree === 'string' ? { gated_tree: data.gated_tree } : {}),
        packages: packages.map((row) => {
          const item = objectOf(row);
          const state = objectOf(item.last_result_state);
          const sourceRef = Array.isArray(state.source_ref) ? state.source_ref.filter((ref) => typeof ref === 'string') : [];
          return { ref: stringOf(item.ref), last_result: stringOf(item.last_result), last_result_state: { freshness: stringOf(state.freshness), source_ref: sourceRef } };
        }),
      },
    },
  };
}

/** EAT-R479: two gate runs and two registered gate.status reads in one throwaway package. */
async function forgeLeg(scratch) {
  const executable = executableOnPath('forge');
  if (executable === null) return { requirement: 'EAT-R479', gate: GATES['EAT-R479'], verdict: judgeForgeLeg(null) };
  const dir = join(scratch, 'forge-fixture');
  mkdirSync(dir);
  const name = 'dx-p14-reconcile-binding';
  const step = writePackage(dir, name);
  const gateRuns = [1, 2].map((ordinal) => {
    const args = ['build', '--json'];
    const run = runJson('forge', args, dir, forgeEnv());
    const envelope = run.envelope ?? {};
    const ids = objectOf(envelope.ids);
    return {
      ordinal,
      argv: ['forge', ...args],
      processExit: run.processExit,
      envelopeStatus: stringOf(envelope.status),
      gateVerdict: stringOf(objectOf(envelope.data).gate_verdict),
      operationId: stringOf(ids.operation_id),
      commandId: stringOf(ids.command_id),
      provenance: objectOf(objectOf(envelope.envelope).provenance),
    };
  });
  const registry = new CapabilityRegistry({ deadlineMs: 300_000 });
  registerNativeForgeGateStatus(registry, dir);
  const statusReads = [];
  for (const ordinal of [1, 2]) {
    const reading = await registry.invoke('forge.gate.status', { target: dir }, { grants: ['forge:inspect'], signal: new AbortController().signal });
    statusReads.push({
      ordinal,
      capabilityId: 'forge.gate.status',
      input: { target: '<fixture>' },
      grants: ['forge:inspect'],
      transport: {
        launch: FORGE_SDK_LAUNCH,
        method: 'gate.status',
        params: { root: '<fixture>' },
        serverExit: 'not observed: the SDK owns and reaps the app-server process (ServerConnection.close)',
      },
      reading: redact(projectStatusReading(reading), dir, '<fixture>'),
    });
  }
  const provenance = objectOf(gateRuns[0]?.provenance);
  const leg = {
    requirement: 'EAT-R479',
    gate: GATES['EAT-R479'],
    producer: {
      name: 'forge',
      version: stringOf(provenance.version),
      revision: stringOf(provenance.revision),
      variant: stringOf(provenance.variant),
      executableSha256: executable.sha256,
    },
    fixture: { package: name, gateStep: step, root: '<fixture>' },
    gateRuns: gateRuns.map(({ provenance: _provenance, ...run }) => run),
    statusReads,
  };
  return { ...leg, verdict: judgeForgeLeg(leg) };
}

/**
 * The rf server ledger for one workspace root.
 * @param {string} ws
 */
function ledgerFor(ws) {
  const args = ['storage', 'local-servers', '--root', ws, '--json'];
  const run = runJson('rf', args, ws);
  const result = objectOf(run.envelope?.result);
  const servers = Array.isArray(result.servers) ? result.servers : [];
  return {
    argv: ['rf', ...args.map((arg) => (arg === ws ? '<workspace>' : arg))],
    processExit: run.processExit,
    ok: run.envelope?.ok === true,
    totals: objectOf(result.totals),
    servers: servers.map((entry) => {
      const server = objectOf(entry);
      return {
        server_id: stringOf(server.server_id),
        provenance: stringOf(server.provenance),
        pid: typeof server.pid === 'number' ? server.pid : null,
        port: typeof server.port === 'number' ? server.port : null,
        class: stringOf(server.class),
        proven: server.proven === true,
        listener_owned: server.listener_owned === true,
        workspaceRootIsProbeRoot: server.workspace_root === ws,
        rf_version: stringOf(server.rf_version),
      };
    }),
  };
}

/** EAT-R483: the h09 journey through the registered preview on a dolt-backed workspace. */
async function rfLeg(scratch) {
  const rf = executableOnPath('rf');
  const dolt = executableOnPath('dolt');
  if (rf === null || dolt === null) {
    return { requirement: 'EAT-R483', gate: GATES['EAT-R483'], status: 'BLOCKED', missing: [...(rf === null ? ['rf executable'] : []), ...(dolt === null ? ['dolt executable'] : [])] };
  }
  const ws = join(scratch, 'rf-workspace');
  mkdirSync(ws);
  const version = runJson('rf', ['--json', '--version'], ws);
  const doltVersion = spawnSync('dolt', ['version'], { cwd: ws, encoding: 'utf8', timeout: 60_000 });
  const initArgs = ['init', '--backend', 'dolt', '--json', '--no-input', ws];
  const init = runJson('rf', initArgs, ws);
  const ledgerBefore = ledgerFor(ws);
  const registry = new CapabilityRegistry({ deadlineMs: 300_000 });
  registerNativeReactiveFiberRender(registry, ws);
  const startedAt = Date.now();
  /** @type {Record<string, unknown>} */
  let render;
  try {
    const reading = objectOf(await registry.invoke('reactivefiber.render.preview', RENDER_INPUT, { grants: ['reactivefiber:render'], signal: new AbortController().signal }));
    const source = objectOf(reading.source);
    render = { outcome: 'returned', contract: stringOf(reading.contract), ok: source.ok === true, command: stringOf(source.command), ephemeral: objectOf(source.result).ephemeral === true };
  } catch (error) {
    render = { outcome: 'error', category: stringOf(objectOf(error).category) };
  }
  render = { capabilityId: 'reactivefiber.render.preview', input: RENDER_INPUT, grants: ['reactivefiber:render'], ...render, durationMs: Date.now() - startedAt };
  const ledgerAfter = ledgerFor(ws);
  const launched = ledgerAfter.servers.filter((server) => server.workspaceRootIsProbeRoot && server.provenance === 'launched' && typeof server.pid === 'number');
  /** @type {Record<string, unknown> | null} */
  let server = null;
  const first = launched[0];
  if (first !== undefined && typeof first.pid === 'number' && typeof first.port === 'number') {
    const pid = first.pid;
    const argv = readFileSync(`/proc/${pid}/cmdline`).toString('utf8').split('\0').filter((arg) => arg !== '');
    const exe = argv[0] ?? '';
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    const ss = spawnSync('ss', ['-ltnpH'], { encoding: 'utf8', timeout: 60_000 });
    const listeners = parseSsListeners(ss.stdout ?? '').filter((listener) => listener.pids.includes(pid));
    const recordedArgv = [exe.slice(exe.lastIndexOf(sep) + 1), ...argv.slice(1).map((arg) => arg.split(ws).join('<workspace>'))];
    server = {
      pid,
      port: first.port,
      ppid: Number(stat.slice(stat.lastIndexOf(')') + 2).split(' ')[1]),
      executableSha256: existsSync(exe) ? sha256(readFileSync(realpathSync(exe))) : null,
      executableIsDoltOnPath: existsSync(exe) && realpathSync(exe) === dolt.resolved,
      argv: recordedArgv,
      argvRedaction: 'argv[0] is the executable basename; the workspace root reads <workspace>',
      ss: { argv: ['ss', '-ltnpH'], processExit: ss.status },
      listeners,
      verdicts: { argv: judgeDoltServerArgv(recordedArgv), listeners: judgeLoopbackListeners({ pid, port: first.port, listeners }) },
    };
  }
  const stopArgs = ['storage', 'local-servers', '--root', ws, '--stop', '--yes', '--json'];
  const stop = runJson('rf', stopArgs, ws);
  let pidGoneAfterStop = null;
  if (server !== null && typeof server.pid === 'number') {
    const pid = server.pid;
    for (let waited = 0; waited < 10_000 && alive(pid); waited += 100) await pause(100);
    pidGoneAfterStop = !alive(pid);
  }
  const ledgerFinal = ledgerFor(ws);
  return {
    requirement: 'EAT-R483',
    gate: GATES['EAT-R483'],
    producer: {
      rf: { version: stringOf(objectOf(version.envelope?.result).version), executableSha256: rf.sha256 },
      dolt: { version: (doltVersion.stdout ?? '').trim().split('\n')[0] ?? null, executableSha256: dolt.sha256 },
    },
    workspace: { root: '<workspace>', init: { argv: ['rf', ...initArgs.map((arg) => (arg === ws ? '<workspace>' : arg))], processExit: init.processExit, ok: init.envelope?.ok === true } },
    ledgerBefore,
    render,
    ledgerAfter,
    server,
    stop: { argv: ['rf', ...stopArgs.map((arg) => (arg === ws ? '<workspace>' : arg))], processExit: stop.processExit, ok: stop.envelope?.ok === true },
    pidGoneAfterStop,
    ledgerFinal,
  };
}

/** EAT-R478: no outside-machine artifact is named at the pin, and no outside-machine store read is authorized. */
function externalEnforcementLeg() {
  const comparator = 'qa/workbench/mwi-release.mjs';
  if (!existsSync(join(REPO, comparator))) throw new Error(`the repository comparator ${comparator} is missing`);
  return {
    requirement: 'EAT-R478',
    gate: GATES['EAT-R478'],
    evidence: null,
    searched: 'nothing outside this repository: no outside-machine enforcement configuration or producer invocation receipt is named at the pin, and no external machine read is authorized',
    repositoryComparator: { path: comparator },
    verdict: judgeExternalEnforcement(null),
  };
}

/** EAT-R480: the manifest's identity and media fields; no approved fork artifact identity and no render capture exist. */
function forkMediaLeg() {
  const manifest = objectOf(JSON.parse(readFileSync(join(REPO, 'package.json'), 'utf8')));
  const pi = objectOf(manifest.pi);
  // The manifest's pi.image and pi.video URLs, each recorded by its SHA-256 rather than verbatim, so the committed record
  // carries no media file name (a landed census reads every src and qa text for a media vocabulary).
  const media = [stringOf(pi.image), stringOf(pi.video)].filter((url) => url !== null).map((url) => `sha256:${sha256(url)}`);
  const evidence = {
    manifestIdentity: { name: stringOf(manifest.name), version: stringOf(manifest.version) },
    upstreamIdentity: stringOf(manifest.name),
    authorizedForkIdentity: null,
    manifestMediaUrlForm: 'sha256 of the manifest pi.image and pi.video URLs, in that order',
    manifestMediaUrls: media,
    capturedArtifact: null,
    pageUrl: null,
    captureDate: null,
    renderedSources: [],
  };
  return {
    requirement: 'EAT-R480',
    gate: GATES['EAT-R480'],
    evidence,
    searched: 'package.json only: no network read, no registry page fetch, no publication and no local page mock',
    verdict: judgeForkMedia(evidence),
  };
}

/** EAT-R481: this host's own layout (the developer layout), never an independent-host receipt. */
function crossHostLeg() {
  const home = homedir();
  // The home directory as named and as resolved (it may be a symlink): an executable's realpath is compared to both.
  const homes = [...new Set([home, existsSync(home) ? realpathSync(home) : home])];
  const binaries = ['hx', 'rf', 'forge'].map((name) => {
    const found = executableOnPath(name);
    // The version is not read on this host: this reading is the developer layout, never the receipt criterion 1 names.
    return { name, version: null, underDeveloperHome: found === null ? null : homes.some((prefix) => found.resolved.startsWith(`${prefix}${sep}`)) };
  });
  const probe = 'qa/workbench/forge-gate-status-probe.mjs';
  const defaultTarget = 'new URL("../../../../", import.meta.url)';
  const evidence = {
    developerHomeAvailable: existsSync(home),
    path: null,
    hyperunixHx: null,
    binaries,
    cwd: null,
    testResult: null,
    forgeTarget: null,
  };
  return {
    requirement: 'EAT-R481',
    gate: GATES['EAT-R481'],
    host: 'this seat (the developer layout); host paths are not recorded',
    evidence,
    // A static read at probe time, not a run on an independent checkout (criterion 2 stays BLOCKED with the rest).
    staticReads: { forgeGateStatusProbe: { path: probe, defaultTargetExpression: readFileSync(join(REPO, probe), 'utf8').includes(defaultTarget) ? defaultTarget : null } },
    verdict: judgeCrossHost(evidence),
  };
}

/**
 * Runs every leg and assembles the record.
 * @returns {Promise<Record<string, unknown>>}
 */
export async function probe() {
  const scratch = makeScratch('dx-p14-acquisition-probe-');
  try {
    const legs = {
      'EAT-R478': externalEnforcementLeg(),
      'EAT-R479': await forgeLeg(scratch),
      'EAT-R480': forkMediaLeg(),
      'EAT-R481': crossHostLeg(),
      'EAT-R483': await rfLeg(scratch),
    };
    const roster = objectOf(JSON.parse(readFileSync(join(REPO, 'test/fixtures/dx-p14-requirements-roster.json'), 'utf8')));
    const source = objectOf(roster.source);
    return {
      schema: RECORD_SCHEMA,
      bead: 'wb-mo89',
      program: 'pi-system-dx-triage-2026-11-11',
      requirementsSource: { commit: stringOf(source.commit), path: stringOf(source.path) },
      utc: new Date().toISOString(),
      probe: { script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(fileURLToPath(import.meta.url))) },
      legs,
    };
  } finally {
    removeScratch(scratch);
  }
}

const argv1 = process.argv[1];
if (argv1 !== undefined && import.meta.url === pathToFileURL(realpathSync(argv1)).href) {
  const args = process.argv.slice(2);
  const writeAt = args.indexOf('--write');
  const text = `${JSON.stringify(await probe(), null, 2)}\n`;
  if (writeAt >= 0) {
    const target = args[writeAt + 1];
    if (target === undefined) throw new Error('--write needs a path');
    writeFileSync(target, text);
  } else {
    process.stdout.write(text);
  }
}
