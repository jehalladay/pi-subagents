// W21 (wb-9x5.1): grouped-10k inspector benchmark over the compiled dist/ projection and inspector.
//
// Run after `npm run build`, outside the default gate: `forge run inspector-grouped-bench`, or
// `node qa/workbench/inspector-grouped-bench.mjs`. One deterministic fixture (qa/workbench/grouped-fixture.mjs)
// is measured twice: pass "default-limits" (constructed with no argument; honest FIFO truncation) and pass
// "bench-only-limits" (navigation/layout/resize timing over the whole fixture). ONE JSON receipt line is
// printed, and written to $W21_BENCH_RECEIPT when set, BEFORE the exit code is set:
//   0  the W21 shape was measured and every judged bench-only p95 is <= 20 ms
//   1  the W21 shape was measured but a judged p95 is over 20 ms: a finding, recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape, sampling, or a truncated bench-only pass)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs
// ($W21_REVISION only overrides the revision, never the dirty flag; wb-4jr wired it, the W21 family rule of wb-oq3).
// $W21_SEED, $W21_NODES, $W21_DEPTH and $W21_TICKS override the fixture; any override below the W21 shape is still
// measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {initialInspectorState, layoutInspector, reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {buildGroupedFixture, exitCodeFor, GROUPED_FIXTURE_DEFAULTS, runGroupedBench} from './grouped-fixture.mjs';

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
  receipt = withBenchRevision(runGroupedBench({
    Projection: ObservationProjection,
    inspector: {initialInspectorState, layoutInspector, reduceInspectorKey},
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
      command: 'node qa/workbench/inspector-grouped-bench.mjs',
    },
  }), stamp);
} catch (error) {
  console.error(JSON.stringify({benchmark: 'inspector-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
  process.exit(3);
}
if (process.env.W21_BENCH_RECEIPT) writeFileSync(process.env.W21_BENCH_RECEIPT, `${JSON.stringify(receipt)}\n`);
console.log(JSON.stringify(receipt));
process.exitCode = exitCodeFor(receipt);
