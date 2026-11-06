/**
 * forge-transport-probe.mjs - wb-muip (MWI B-unknowns, slice PI-0), EAT-R081: "The Forge transport probe MUST settle the
 * exit-zero failed-gate premise from producer evidence." Acceptance (vendored in test/fixtures/mwi-unknowns-requirements-roster.json):
 * pin the Forge source/contract or collect a native transcript pairing process exit, gate verdict and operation ID.
 *
 * What it does, and nothing more: on the installed `forge` this runner finds on PATH it records the exit-code contract
 * (`forge codes --json`, data.exit_codes) and runs `forge build` in throwaway packages whose one gate step exits 0 (the
 * PASS control) or 1 (the failed gate), once plain and once with --keep-going --no-replay. Each run is a native
 * transcript: the process exit this runner observed beside the envelope's own status, data.exit_code, data.gate_verdict,
 * ids.operation_id and envelope.provenance (version, revision, variant). The record is written as JSON (stdout, or the
 * file named by --write); test/workbench-mechanical-evidence-census.test.ts judges the committed copy
 * (qa/workbench/receipts/wb-muip-forge-transport-probe.json) and ties it to these bytes through probe.scriptSha256.
 *
 * Scope is the recorded argv on the recorded build only: other verbs and flags, other versions and the Forge source are
 * not read here. No host path is recorded (the executable is named by its SHA-256). Every package lives in a guarded
 * scratch directory (program rule 11, qa/workbench/scratch.mjs) and is removed before exit; no gate slot is involved, since
 * no run passes --require-complete and none runs against a repository checkout.
 *
 * Usage: node qa/workbench/forge-transport-probe.mjs [--write <path>]
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { accessSync, constants, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

export const SCHEMA = 'workbench.forge-transport-probe/v1';
export const SCRIPT = 'qa/workbench/forge-transport-probe.mjs';

/** The runs: one PASS control and two failed gates. `stepExit` is the exit of the package's only gate step. */
export const CASES = Object.freeze([
  Object.freeze({ id: 'pass-control', stepExit: 0, args: Object.freeze(['build', '--json']) }),
  Object.freeze({ id: 'fail', stepExit: 1, args: Object.freeze(['build', '--json']) }),
  Object.freeze({ id: 'fail-keep-going', stepExit: 1, args: Object.freeze(['build', '--keep-going', '--no-replay', '--json']) }),
]);

/**
 * The environment a forge child runs under: the caller's, minus every FORGE_ variable (an inherited
 * FORGE_REQUIRE_COMPLETE or similar would change the verdict rule), plus FORGE_JSON=1.
 * @returns {Record<string, string>}
 */
function forgeEnv() {
  /** @type {Record<string, string>} */
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && !key.startsWith('FORGE_')) env[key] = value;
  }
  env.FORGE_JSON = '1';
  return env;
}

/**
 * The SHA-256 of the first executable regular file named `forge` on PATH, or null when none is found.
 * @returns {string | null}
 */
function forgeExecutableSha256() {
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (dir === '') continue;
    const candidate = join(dir, 'forge');
    try {
      accessSync(candidate, constants.X_OK);
      const resolved = realpathSync(candidate);
      if (!statSync(resolved).isFile()) continue;
      return createHash('sha256').update(readFileSync(resolved)).digest('hex');
    } catch {
      /* not here: keep looking */
    }
  }
  return null;
}

/**
 * Runs forge with `args` in `cwd`; returns the observed process exit and the parsed envelope (null when stdout is not JSON).
 * @param {readonly string[]} args
 * @param {string} cwd
 * @returns {{ processExit: number | null, envelope: Record<string, unknown> | null }}
 */
function runForge(args, cwd) {
  const child = spawnSync('forge', [...args], { cwd, env: forgeEnv(), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
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
 * Writes a one-step package whose gate step exits `stepExit`, committed in its own fresh repository.
 * @param {string} dir
 * @param {string} name
 * @param {number} stepExit
 * @returns {string} the step command as written
 */
function writePackage(dir, name, stepExit) {
  const step = `node -e "process.exit(${stepExit})"`;
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
  git('-c', 'user.name=forge-transport-probe', '-c', 'user.email=probe@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-q', '-m', 'probe package');
  return step;
}

/**
 * Runs every case and assembles the record.
 * @returns {Record<string, unknown>}
 */
export function probe() {
  const scriptPath = fileURLToPath(import.meta.url);
  const scratch = makeScratch('forge-transport-probe-');
  try {
    const codes = runForge(['codes', '--json'], scratch);
    const exitCodes = objectOf(objectOf(codes.envelope?.data).exit_codes);
    const transcripts = CASES.map((entry) => {
      const dir = join(scratch, entry.id);
      mkdirSync(dir);
      const step = writePackage(dir, `transport-probe-${entry.id}`, entry.stepExit);
      const run = runForge(entry.args, dir);
      const envelope = run.envelope ?? {};
      const data = objectOf(envelope.data);
      const provenance = objectOf(objectOf(envelope.envelope).provenance);
      return {
        id: entry.id,
        source: 'native-transcript',
        stepCommand: step,
        argv: ['forge', ...entry.args],
        processExit: run.processExit,
        envelopeStatus: stringOf(envelope.status),
        envelopeExitCode: typeof data.exit_code === 'number' ? data.exit_code : null,
        gateVerdict: stringOf(data.gate_verdict),
        operationId: stringOf(objectOf(envelope.ids).operation_id),
        producer: { name: 'forge', version: stringOf(provenance.version), revision: stringOf(provenance.revision), variant: stringOf(provenance.variant) },
      };
    });
    const first = transcripts[0]?.producer ?? { version: null, revision: null, variant: null };
    return {
      schema: SCHEMA,
      bead: 'wb-muip',
      requirement: 'EAT-R081',
      utc: new Date().toISOString(),
      probe: { script: SCRIPT, scriptSha256: createHash('sha256').update(readFileSync(scriptPath)).digest('hex') },
      producer: { name: 'forge', version: first.version, revision: first.revision, variant: first.variant, executableSha256: forgeExecutableSha256() },
      exitCodeContract: { argv: ['forge', 'codes', '--json'], processExit: codes.processExit, exitCodes },
      transcripts,
    };
  } finally {
    removeScratch(scratch);
  }
}

const argv1 = process.argv[1];
if (argv1 !== undefined && import.meta.url === pathToFileURL(realpathSync(argv1)).href) {
  const args = process.argv.slice(2);
  const writeAt = args.indexOf('--write');
  const text = `${JSON.stringify(probe(), null, 2)}\n`;
  if (writeAt >= 0) {
    const target = args[writeAt + 1];
    if (target === undefined) {
      process.stderr.write('usage: node qa/workbench/forge-transport-probe.mjs [--write <path>]\n');
      process.exitCode = 2;
    } else {
      writeFileSync(target, text);
    }
  } else {
    process.stdout.write(text);
  }
}
