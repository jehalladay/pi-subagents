// wb-752.3 (VC-4 residual): the tier's own launcher for the live external Furnace Run receipt.
// It is the only program of this tier that starts a Run, and it starts exactly one, before anything attaches:
//   1. mkdtemp a disposable /tmp/pi-external-furnace-realbd.* workspace (never the product store, never a repository);
//   2. bd init a real bd store of its own there (prefix fx) and write one throwaway formula, vc4-external;
//   3. run start that formula detached (own session, stdio to files beside the stores) with a quiet executor that holds
//      one Attempt running for VC4_HOLD_SECONDS (default 300) and then exits 0, so the Run completes by itself and
//      nothing ever has to control it;
//   4. read until the Run lists a running Attempt under a live controller, write launcher/fixture.json beside (never
//      inside) .beads and .furnace, and print the fixture identity as one JSON line on stdout.
// Furnace verbs spoken: run start once, then run list and run status reads, always with -C <that workspace> and with
// every BEADS_*, BD_* and FURNACE_* variable removed from the environment, so no other store can be addressed.
// Then: PI_FURNACE_FIXTURE_ROOT=<root> PI_FURNACE_FIXTURE_RUN_ID=<runId> forge run furnace-vc4-live
// Exit 0 with the identity printed; 2 with a JSON diagnostic naming the workspace (left in place for inspection).
// Remove the workspace once the Run has completed: rm -rf <root>.
import { spawn, spawnSync } from 'node:child_process';
import { chmodSync, closeSync, mkdirSync, mkdtempSync, openSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FIXTURE_ROOT_PATTERN, FIXTURE_ROOT_PREFIX, LAUNCHER_CONTRACT, LAUNCHER_RECORD } from './live-furnace-vc4-receipt.mjs';

const FORMULA = 'vc4-external';
const HOLD_SECONDS = Number.parseInt(process.env.VC4_HOLD_SECONDS ?? '300', 10);
const READY_TIMEOUT_MS = 60_000;
const POLL_MS = 500;
const SCRUBBED = /^(?:BEADS|BD|FURNACE)_/;
const ENDED = new Set(['completed', 'stopped', 'failed', 'needs_attention']);

const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !SCRUBBED.test(key)));
const reasonOf = (error) =>
  String(error instanceof Error ? error.message : error)
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .slice(0, 400);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isDirectory = (path) => {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
};

class LaunchError extends Error {
  constructor(message, root) {
    super(message);
    this.root = root;
  }
}

/** One bounded read against the disposable workspace only; the envelope's data, or the reason it was refused. */
function read(root, words) {
  const result = spawnSync('furnace', ['-C', root, ...words, '--json'], { cwd: root, env, encoding: 'utf8', timeout: 30_000 });
  if (result.status !== 0) return { error: reasonOf(result.error ?? (result.stderr || result.stdout || `exit ${result.status}`)) };
  try {
    return { data: JSON.parse(result.stdout).data };
  } catch (error) {
    return { error: reasonOf(error) };
  }
}

async function launch() {
  if (!Number.isInteger(HOLD_SECONDS) || HOLD_SECONDS < 30) throw new LaunchError(`VC4_HOLD_SECONDS must be an integer of at least 30, not ${String(process.env.VC4_HOLD_SECONDS)}`);
  const root = realpathSync(mkdtempSync(FIXTURE_ROOT_PREFIX));
  if (!FIXTURE_ROOT_PATTERN.test(root)) throw new LaunchError(`mkdtemp gave ${root}, not a ${FIXTURE_ROOT_PREFIX}* workspace`, root);
  const init = spawnSync('bd', ['init', '--non-interactive', '--prefix', 'fx', '--quiet'], { cwd: root, env, encoding: 'utf8', timeout: 60_000 });
  if (init.status !== 0) throw new LaunchError(`bd init failed in the disposable workspace: ${reasonOf(init.error ?? init.stderr)}`, root);
  if (!isDirectory(join(root, '.beads', 'embeddeddolt'))) throw new LaunchError('bd init left no embedded store at .beads/embeddeddolt', root);
  mkdirSync(join(root, '.beads', 'formulas'), { recursive: true });
  writeFileSync(
    join(root, '.beads', 'formulas', `${FORMULA}.formula.toml`),
    `formula = "${FORMULA}"\ndescription = "VC-4 external observation fixture (wb-752.3)"\nversion = 1\ntype = "workflow"\n\n[[steps]]\nid = "hold"\ntitle = "hold"\ndescription = "hold one Attempt running for the observation window"\n`,
  );
  const side = join(root, 'launcher');
  mkdirSync(side);
  const executor = join(side, 'hold.sh');
  writeFileSync(executor, `#!/bin/sh\nexec sleep ${HOLD_SECONDS}\n`);
  chmodSync(executor, 0o755);

  const launchedAt = new Date().toISOString();
  const requestId = `vc4-external-${process.pid}-${Date.now().toString(36)}`;
  const stdout = openSync(join(side, 'controller.stdout'), 'w');
  const stderr = openSync(join(side, 'controller.stderr'), 'w');
  const controller = spawn('furnace', ['-C', root, 'run', 'start', FORMULA, '--executor-program', executor, '--request-id', requestId, '--json'], {
    cwd: root,
    env,
    detached: true,
    stdio: ['ignore', stdout, stderr],
  });
  controller.unref();
  closeSync(stdout);
  closeSync(stderr);

  let runId;
  let last = 'no answer yet';
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    await sleep(POLL_MS);
    if (!runId) {
      const listed = read(root, ['run', 'list', '--creating-request-id', requestId]);
      runId = listed.data?.runs?.[0]?.run_id;
      last = listed.error ?? 'the Run is not listed yet';
      if (!runId) continue;
    }
    const status = read(root, ['run', 'status', runId]);
    const running = status.data?.active?.find((attempt) => attempt.state === 'running');
    if (running && status.data.controller?.live === true) {
      const record = {
        contract: LAUNCHER_CONTRACT,
        root,
        runId,
        requestId,
        formula: FORMULA,
        launcherPid: process.pid,
        controllerPid: controller.pid ?? null,
        holdSeconds: HOLD_SECONDS,
        launchedAt,
        runningAt: new Date().toISOString(),
        attemptId: running.attempt_id,
        env: { PI_FURNACE_FIXTURE_ROOT: root, PI_FURNACE_FIXTURE_RUN_ID: runId },
      };
      writeFileSync(join(root, LAUNCHER_RECORD), `${JSON.stringify(record, null, 2)}\n`);
      return record;
    }
    if (ENDED.has(status.data?.state)) throw new LaunchError(`Run ${runId} reached ${status.data.state} before an Attempt was seen running`, root);
    last = status.error ?? `Run ${runId} is ${String(status.data?.state)} with no running Attempt under a live controller yet`;
  }
  throw new LaunchError(`no running Attempt within ${READY_TIMEOUT_MS / 1000}s: ${last}`, root);
}

try {
  const record = await launch();
  console.log(JSON.stringify(record));
  console.error(`live-furnace-vc4-launch: Run ${record.runId} running in ${record.root} for ${record.holdSeconds}s; attach with PI_FURNACE_FIXTURE_ROOT=${record.root} PI_FURNACE_FIXTURE_RUN_ID=${record.runId}`);
} catch (error) {
  console.log(JSON.stringify({ contract: LAUNCHER_CONTRACT, error: reasonOf(error), root: error instanceof LaunchError ? (error.root ?? null) : null }));
  console.error(`live-furnace-vc4-launch: exit 2 (${reasonOf(error)})`);
  process.exitCode = 2;
}
