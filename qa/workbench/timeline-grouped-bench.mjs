// W21 (wb-9x5.7): grouped-10k timeline lane-model build benchmark over the compiled dist/ buildTimelineLanes.
//
// Run after `npm run build`, outside the default gate: `forge run timeline-grouped-bench`, or
// `node qa/workbench/timeline-grouped-bench.mjs`. One deterministic fixture (qa/workbench/grouped-fixture.mjs, reused
// exactly as inspector-grouped-bench.mjs does) is measured twice: pass "maxQuery-40" (BENCH_ONLY_LIMITS as defined) and
// pass "maxQuery-100" (the same limits with the query cap spread to 100, locally, bench-only). The measuring and the receipt
// assessment live in qa/workbench/timeline-grouped-core.mjs, which takes the projection class and buildTimelineLanes as
// arguments. ONE JSON receipt line is printed, and written to $W21_TIMELINE_RECEIPT when set, BEFORE the exit code is set:
//   0  the W21 shape was measured and every judged p95 is <= 20 ms with relation reads never above rows returned
//   1  the W21 shape was measured but a judged p95 is over 20 ms or a build read more relations than rows: a finding,
//      recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape, fewer than 1,000 samples per pass, a truncated pass)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs (wb-oq3);
// $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES, $W21_DEPTH and
// $W21_TICKS override the fixture; any override below the W21 shape is still measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {buildTimelineLanes} from '../../dist/workbench/timeline.js';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS} from './grouped-fixture.mjs';
import {runTimelineBench, timelineExitCodeFor} from './timeline-grouped-core.mjs';

const OVERRIDES = ['W21_SEED', 'W21_NODES', 'W21_DEPTH', 'W21_TICKS', 'W21_REVISION'];
const integerFromEnv = (name, fallback) => {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  if (!/^-?\d+$/.test(raw)) throw new RangeError(`${name} must be an integer (got ${JSON.stringify(raw)}).`);
  return Number(raw);
};
const versionOf = path => {
  try {
    return String(JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8')).version);
  } catch {
    return 'unknown';
  }
};

let receipt;
try {
  const fixture = buildGroupedFixture({
    seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
    nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
    depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
    ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
  });
  const processors = cpus();
  const stamp = benchRevision();
  receipt = withBenchRevision(runTimelineBench({
    Projection: ObservationProjection,
    buildTimelineLanes,
    fixture,
    host: {
      utc: new Date().toISOString(),
      revision: stamp.revision,
      node: process.version,
      arch: process.arch,
      platform: process.platform,
      cpus: processors.length,
      cpuModel: processors[0]?.model ?? 'unknown',
      toolchain: {
        node: process.version,
        typescript: versionOf('../../node_modules/typescript/package.json'),
        piTui: versionOf('../../node_modules/@earendil-works/pi-tui/package.json'),
      },
      command: 'node qa/workbench/timeline-grouped-bench.mjs',
      overrides: Object.fromEntries(OVERRIDES.filter(name => process.env[name] !== undefined && process.env[name] !== '').map(name => [name, process.env[name]])),
    },
  }), stamp);
} catch (error) {
  console.error(JSON.stringify({benchmark: 'timeline-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
  process.exit(3);
}
if (process.env.W21_TIMELINE_RECEIPT) writeFileSync(process.env.W21_TIMELINE_RECEIPT, `${JSON.stringify(receipt)}\n`);
console.log(JSON.stringify(receipt));
process.exitCode = timelineExitCodeFor(receipt);
