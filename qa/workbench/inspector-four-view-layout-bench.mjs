// W21-I (wb-9x5.11): grouped-10k four-view layoutInspector navigation and resize layout-time benchmark over the compiled dist/.
//
// Run after `npm run build`, outside the default gate: `forge run inspector-four-view-layout-bench`, or
// `node qa/workbench/inspector-four-view-layout-bench.mjs`. One deterministic fixture (qa/workbench/grouped-fixture.mjs, reused
// exactly as inspector-grouped-bench.mjs does) is applied once at BENCH_ONLY_LIMITS and driven through view switches, selection
// moves, scroll steps and 80x24<->120x40 resizes in all four views; the measuring and the receipt assessment live in
// qa/workbench/inspector-four-view-layout-core.mjs, which takes the projection class, the inspector and the host read sides as
// arguments. ONE JSON receipt line is printed, and written to $W21_FOUR_VIEW_LAYOUT_RECEIPT when set, BEFORE the exit code is set:
//   0  the W21 shape was measured, every judged p95 is <= 20 ms, no navigation read a full fold and every resize kept its state
//   1  the W21 shape was measured but a judged p95 is over 20 ms, a navigation read a full fold, or a resize lost the selection
//      position, the focus or the state: a finding, recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape, fewer than 1,000 samples per action, a truncated pass, an unsampled
//      series, a missing receipt field)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs; $W21_REVISION
// only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES, $W21_DEPTH and $W21_TICKS override the
// fixture; any override below the W21 shape is still measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {initialInspectorState, layoutInspector, reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
import {selectAttention} from '../../dist/workbench/attention.js';
import {CapabilityError} from '../../dist/workbench/capability-registry.js';
import {createGraphViewBuilder} from '../../dist/workbench/graph-view.js';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {buildTimelineLanes} from '../../dist/workbench/timeline.js';
import {selectLinkedTopology} from '../../dist/workbench/topology-slice.js';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS} from './grouped-fixture.mjs';
import {fourViewLayoutExitCodeFor, runFourViewLayoutBench} from './inspector-four-view-layout-core.mjs';

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
  receipt = withBenchRevision(runFourViewLayoutBench({
    Projection: ObservationProjection,
    inspector: {initialInspectorState, layoutInspector, reduceInspectorKey},
    readSides: {createGraphViewBuilder, buildTimelineLanes, selectAttention, selectLinkedTopology, CapabilityError},
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
      command: 'node qa/workbench/inspector-four-view-layout-bench.mjs',
      overrides: Object.fromEntries(OVERRIDES.filter(name => process.env[name] !== undefined && process.env[name] !== '').map(name => [name, process.env[name]])),
    },
  }), stamp);
} catch (error) {
  console.error(JSON.stringify({benchmark: 'inspector-four-view-layout-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
  process.exit(3);
}
if (process.env.W21_FOUR_VIEW_LAYOUT_RECEIPT) writeFileSync(process.env.W21_FOUR_VIEW_LAYOUT_RECEIPT, `${JSON.stringify(receipt)}\n`);
console.log(JSON.stringify(receipt));
process.exitCode = fourViewLayoutExitCodeFor(receipt);
