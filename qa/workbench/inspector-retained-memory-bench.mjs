// W21-C (wb-9x5.3): retained-memory bound receipt for the grouped-10k inspector, over the compiled dist/.
//
// Run after `npm run build`, outside the default gate, with a collector:
//   forge run inspector-retained-memory-bench      (or: node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs)
// ONE JSON receipt line is printed FIRST, then written to $W21_RETAINED_RECEIPT when set, and only then is the exit
// code set (publishRetainedReceipt in ./retained-memory.mjs; one-liner batch item (5), bound onto wb-9x5.3):
//   0  the W21 shape was measured, retained heap stayed within the stated bounds and no payload body outlived blur
//   1  measured with a sound probe, but a stated bound was missed or a payload body stayed reachable after blur
//      and every bounded re-collect round: a finding, recorded, never tuned away
//   2  the measurement is not the claim (fixture shape, no gc, a blind or unreleased positive control, a series
//      too short to separate warmup from measured)
//   3  nothing could be measured (an exception, reported on stderr; no receipt), or the receipt file could not be
//      written (the receipt is already on stdout; the write failure is reported on stderr)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs
// (wb-oq3); $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES,
// $W21_DEPTH, $W21_TICKS override the fixture and $W21_CYCLES, $W21_WARMUP_CYCLES, $W21_KEYS, $W21_BODY_CAP the
// sampling; any override below the W21 shape is still measured and exits 2.
import {readFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {initialInspectorState, layoutInspector, reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS} from './grouped-fixture.mjs';
import {DEFAULT_RETAINED_SAMPLING, publishRetainedReceipt, runRetainedMemoryBench} from './retained-memory.mjs';

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
  receipt = withBenchRevision(await runRetainedMemoryBench({
    Projection: ObservationProjection,
    inspector: {initialInspectorState, layoutInspector, reduceInspectorKey},
    fixture,
    gc: typeof globalThis.gc === 'function' ? globalThis.gc : undefined,
    sampling: {
      cycles: integerFromEnv('W21_CYCLES', DEFAULT_RETAINED_SAMPLING.cycles),
      warmupCycles: integerFromEnv('W21_WARMUP_CYCLES', DEFAULT_RETAINED_SAMPLING.warmupCycles),
      keypressesPerCycle: integerFromEnv('W21_KEYS', DEFAULT_RETAINED_SAMPLING.keypressesPerCycle),
      bodyBytesCap: integerFromEnv('W21_BODY_CAP', DEFAULT_RETAINED_SAMPLING.bodyBytesCap),
    },
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
      command: 'node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs',
    },
  }), stamp);
} catch (error) {
  console.error(JSON.stringify({benchmark: 'inspector-retained-memory-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
  process.exit(3);
}
process.exitCode = publishRetainedReceipt(receipt, {path: process.env.W21_RETAINED_RECEIPT});
