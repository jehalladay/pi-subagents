// W21-B (wb-6ze.5) bench: observation recovery and bounded-query sizes on the COMPILED
// ObservationProjection (run `npm run build` first). Two passes, one receipt:
//   default-limits     the production defaults, constructed with no limits argument (caps never raised);
//   bench-only-limits  explicit bench-only limits, recorded in the receipt and never written into the source.
// The receipt is printed as one JSON line and written to $W21_RECOVERY_RECEIPT (when set) before the exit
// code is set: 0 pass; 1 a measured semantic violation (findings, recorded honestly, never tuned away);
// 2 not realised (a fixture shape below its claim, a probe that did not arm, or a measurement that could
// not run). No recovery-latency threshold is specified, so latency is reported and never judged.
// The compiled module is a static top-level import: without a build the module fails to load before any
// receipt exists, which is a missing precondition, never a measurement.
import {writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {buildFixture, buildReceipt, exitCodeFor, measureRecovery} from './observation-recovery-receipt.mjs';

const PROVIDERS = Object.freeze(['forge', 'furnace', 'claude-agent-sdk']);
const DISCONNECTED_PROVIDER = 'furnace';
const QUERY_LIMIT = 100;
const COMMAND = 'node qa/workbench/observation-recovery-bench.mjs';

const DEFAULT_PASS = Object.freeze({
  label: 'default-limits',
  limits: 'default',
  claimed: Object.freeze({nodes: 1_000, events: 100_000}),
  fixture: Object.freeze({seed: 6_205_001, nodes: 1_000, events: 100_000, providers: PROVIDERS}),
});

const BENCH_ONLY_PASS = Object.freeze({
  label: 'bench-only-limits',
  limits: Object.freeze({maxNodes: 12_000, maxEdges: 24_000, maxEvents: 20_000, maxQuery: 100}),
  claimed: Object.freeze({nodes: 10_000, events: 100_000}),
  fixture: Object.freeze({seed: 6_205_002, nodes: 10_000, events: 100_000, providers: PROVIDERS}),
});

const reasonOf = error => String(error instanceof Error ? error.message : error).replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ').slice(0, 400);

function runPass(ProjectionClass, pass) {
  try {
    const fixture = buildFixture(pass.fixture);
    const measurement = measureRecovery(ProjectionClass, fixture, {
      provider: DISCONNECTED_PROVIDER,
      queryLimit: QUERY_LIMIT,
      ...(pass.limits === 'default' ? {} : {limits: pass.limits}),
    });
    return {label: pass.label, claimed: pass.claimed, measurement};
  } catch (error) {
    return {label: pass.label, claimed: pass.claimed, limits: pass.limits, error: reasonOf(error)};
  }
}

const passes = [DEFAULT_PASS, BENCH_ONLY_PASS].map(pass => runPass(ObservationProjection, pass));

const machine = cpus();
const receipt = buildReceipt({
  utc: new Date().toISOString(),
  revision: process.env.W21_REVISION ?? 'working-tree',
  command: COMMAND,
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: machine.length,
  cpuModel: machine[0]?.model ?? 'unknown',
  passes,
});

const line = JSON.stringify(receipt);
console.log(line);
let written = true;
if (process.env.W21_RECOVERY_RECEIPT) {
  try {
    writeFileSync(process.env.W21_RECOVERY_RECEIPT, `${line}\n`);
  } catch (error) {
    written = false;
    console.error(`observation-recovery-bench: could not write W21_RECOVERY_RECEIPT: ${reasonOf(error)}`);
  }
}
const code = written ? exitCodeFor(receipt) : 2;
const verdict = code === 0 ? 'pass' : code === 1 ? `${receipt.findings.length} measured violation(s)` : 'not realised';
console.error(`observation-recovery-bench: exit ${code} (${verdict})`);
process.exitCode = code;
