// W21-D (wb-9x5.6): grouped-10k cap-saturation bench over the compiled dist/ projection and inspector.
//
// Run after `npm run build`, outside the default gate: `forge run inspector-cap-saturation-bench`, or
// `node --expose-gc qa/workbench/inspector-cap-saturation-bench.mjs` (--expose-gc makes the memory series
// post-collection and judgeable; without it the series is recorded and marked unjudged). The wb-9x5.2
// fixture (qa/workbench/grouped-fixture.mjs) is offered to projections capped far below it (the
// plan lives in qa/workbench/cap-saturation.mjs). ONE JSON receipt line is printed FIRST, then written to
// $CAP_BENCH_RECEIPT when set, and only then is the exit code set (publishReceipt, one-liner batch item (5)):
//   0  overflow was counted at every cap, memory followed the projection, and every p95 is <= 20 ms
//      (plain mode records an unlabeled-product-overflow finding and still exits 0)
//   1  measured, but overflow was dropped silently, the cap was exceeded, memory was unbounded or a
//      p95 is over 20 ms: a finding, recorded, never tuned away; under --strict also when no frame of
//      any view names the dropped remainder (unlabeled-product-overflow, owner ruling F1)
//   2  the measurement is not this claim (wrong fixture shape, a missing or mislabelled pass, a changed
//      production cap, an unsampled series)
//   3  nothing could be measured (an exception, reported on stderr; no receipt), or the receipt file could not be
//      written (reported on stderr; the receipt is already on stdout, never a silent exit 1)
// --strict is the falsifier arm: the Forge command stays plain. The inspector remainder line landed with wb-ea1, and since
// wb-j0b --strict counts only that whole counted remainder line as a label (the frame header's ' · capped' suffix is not
// one). The receipt header states the bench-only bounds (benchOnlyBounds) before any measurement.
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs
// (wb-oq3); $W21_REVISION, the one override name of the W21 family, read by that stamp alone, only overrides the
// revision and the receipt names the source. $CAP_BENCH_REVISION is retired (wb-oq3 re-cut decision: one override
// variable for every W21 receipt revision) and is no longer read. $CAP_BENCH_SEED, $CAP_BENCH_NODES,
// $CAP_BENCH_DEPTH and $CAP_BENCH_TICKS override the fixture; any override below the W21 shape is still
// measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {initialInspectorState, layoutInspector, reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
import {WORKFLOW_AGENT_CAP} from '../../dist/workflow/runtime.js';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {publishReceipt, runCapSaturationBench} from './cap-saturation.mjs';
import {buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS} from './grouped-fixture.mjs';

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
/** The node-call cap is a closure constant in the runtime, not an export: read its literal from the source text. */
const runtimeNodeCap = () => {
  try {
    const match = /const nodeCap = (\d+);/.exec(readFileSync(new URL('../../src/workflow/runtime.ts', import.meta.url), 'utf8'));
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
};

let receipt;
try {
  const fixture = buildGroupedFixture({
    seed: integerFromEnv('CAP_BENCH_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
    nodes: integerFromEnv('CAP_BENCH_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
    depth: integerFromEnv('CAP_BENCH_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
    ticks: integerFromEnv('CAP_BENCH_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
  });
  const processors = cpus();
  const stamp = benchRevision();
  receipt = withBenchRevision(runCapSaturationBench({
    Projection: ObservationProjection,
    inspector: {initialInspectorState, layoutInspector, reduceInspectorKey},
    fixture,
    strict: process.argv.includes('--strict'),
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
      command: 'node --expose-gc qa/workbench/inspector-cap-saturation-bench.mjs',
      runtimeCaps: {nodeCalls: runtimeNodeCap(), agents: WORKFLOW_AGENT_CAP},
    },
  }), stamp);
} catch (error) {
  console.error(JSON.stringify({benchmark: 'inspector-cap-saturation', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
  process.exit(3);
}
process.exitCode = publishReceipt(receipt, {path: process.env.CAP_BENCH_RECEIPT, log: console.log, logError: console.error, writeFile: writeFileSync});
