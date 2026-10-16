// W21-K / VC-5 (wb-9x5.13): attention report build receipt over the grouped-10k fixture, over the compiled dist/.
//
// Run after `npm run build`, outside the default gate: `forge run attention-grouped-bench`, or
// `node qa/workbench/attention-grouped-bench.mjs`. It times selectAttention (src/workbench/attention.ts, wb-6ze.4)
// at limit 100 over one projection page while the fixture's 1..100-change ticks are applied (live churn).
//
// BENCH RULES (wb-9x5.4 binds every W21 bench; stated here BEFORE any measurement):
//   - Bench-only limits. Pass "maxQuery-40" uses BENCH_ONLY_LIMITS from qa/workbench/grouped-fixture.mjs exactly
//     as defined there (maxQuery 40). Pass "maxQuery-100" spreads {...BENCH_ONLY_LIMITS, maxQuery: 100} LOCALLY, here
//     only. Neither is a production value: production caps (observation.ts MAX_DEFAULT, attention.ts DEFAULT_LIMIT,
//     MAX_LIMIT, DEFAULT_BOTTLENECKS, MAX_BOTTLENECKS) are NOT touched; the receipt echoes the values the test pins by
//     reading the source. This file never edits src/ or the shared fixture module and forks no second fixture.
//   - Hard-coded constants of this bench, disclosed: SETTINGS (bottlenecks 5 and 20; caller-clock lag 0 and 1,000 ms),
//     SAMPLE_EVERY (a sample point after every second tick block), DISCONNECT_CYCLE (a provider is disconnected at
//     sample point 50 of every 200 and reconnected at 150, rotating over forge, furnace and claude-agent-sdk),
//     MAX_PAIR_READS (2,000, mirrored from attention.ts and pinned against its source by the test), and the minimum of
//     1,000 timed samples per pass.
//   - The clock is the fixture's: input.now is FIXTURE_EPOCH_MS plus whole seconds of the tick index (minus the
//     setting's lag), formatted from that number. Nothing here reads the host wall clock or an unseeded random source;
//     durations come from performance.now() around the one selectAttention call.
//   - Page order: the projection's query returns the first `min(limit, maxQuery)` rows in insertion (snapshot) order,
//     so the examined page is the first group rows and the first operations of the depth-first fixture, not a random
//     10k sample; churn reaches the page only where an update lands on those operations.
//   - Reads are counted by a SEPARATE untimed call of the same selectAttention through a counting wrapper over
//     Pick<ObservationProjection, "query" | "relations">, so the timed call carries no wrapper overhead.
//   - The pair re-read counts measure the semantics at the recorded revision (before wb-6ze.29 adopts relationsPage);
//     re-run the receipt after that lands.
//
// ONE JSON receipt line (contract workbench.attention-grouped-bench/v1) is printed, and written to
// $W21_ATTENTION_RECEIPT when set, BEFORE the exit code is set:
//   0  the W21 shape was measured and every judged p95 is <= 20 ms with no reads violation
//   1  the W21 shape was measured but a judged p95 is over 20 ms or a reads violation occurred: a finding, recorded,
//      never tuned away
//   2  the measurement is not the W21 claim (fixture shape not realised, fewer than 1,000 samples, a truncated
//      projection, an unsampled series)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision comes from $W21_REVISION (else "working-tree"). $W21_SEED, $W21_NODES, $W21_DEPTH and $W21_TICKS
// override the fixture; any override below the W21 shape is still measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {
  assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, FIXTURE_EPOCH_MS, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID,
  NAVIGATION_TARGET_MS, PROVIDERS, SCOPE,
} from './grouped-fixture.mjs';

export const ATTENTION_RECEIPT_CONTRACT = 'workbench.attention-grouped-bench/v1';
export const MIN_SAMPLES_PER_PASS = 1_000;
/** Mirrors attention.ts MAX_PAIR_READS; the test pins this value against the source. */
export const MAX_PAIR_READS = 2_000;
export const ATTENTION_LIMIT = 100;
export const SETTINGS = Object.freeze([
  Object.freeze({label: 'bottlenecks-5/lag-0', bottlenecks: 5, clockLagMs: 0}),
  Object.freeze({label: 'bottlenecks-20/lag-0', bottlenecks: 20, clockLagMs: 0}),
  Object.freeze({label: 'bottlenecks-5/lag-1000', bottlenecks: 5, clockLagMs: 1_000}),
  Object.freeze({label: 'bottlenecks-20/lag-1000', bottlenecks: 20, clockLagMs: 1_000}),
]);
export const SAMPLE_EVERY = 2;
export const DISCONNECT_CYCLE = Object.freeze({period: 200, disconnectAt: 50, reconnectAt: 150});
export const PASSES = Object.freeze([
  Object.freeze({label: 'maxQuery-40', limits: BENCH_ONLY_LIMITS}),
  Object.freeze({label: 'maxQuery-100', limits: Object.freeze({...BENCH_ONLY_LIMITS, maxQuery: 100})}),
]);

const round = value => Math.round(value * 10_000) / 10_000;
const clock = () => performance.now();
const instantAt = (tick, lagMs) => new Date(FIXTURE_EPOCH_MS + (tick + 1) * 1_000 - lagMs).toISOString();

/** p50/p95/max with the sample count; an empty series has nulls, never zeros. */
function distribution(values, digits = 4) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  const scale = 10 ** digits;
  const fit = value => Math.round(value * scale) / scale;
  return {samples: sorted.length, p50: fit(at(0.5)), p95: fit(at(0.95)), max: fit(sorted[sorted.length - 1])};
}

/** A counting view over the two projection reads selectAttention is allowed to make. */
function countingView(projection) {
  const seen = {queryCalls: 0, relationsCalls: 0, maxQueryRows: 0, maxRelationRows: 0};
  return {
    seen,
    view: {
      query(filter) {
        seen.queryCalls += 1;
        const page = projection.query(filter);
        seen.maxQueryRows = Math.max(seen.maxQueryRows, page.nodes.length);
        return page;
      },
      relations(filter) {
        seen.relationsCalls += 1;
        const rows = projection.relations(filter);
        seen.maxRelationRows = Math.max(seen.maxRelationRows, rows.length);
        return rows;
      },
    },
  };
}

function newCell(setting) {
  return {
    setting, build: [], queryCalls: [], relationsCalls: [], maxRowsPerCall: 0, rowsOverCap: 0, readsOverBound: 0, queryCallViolations: 0,
    truncated: 0, labels: {}, reasons: {}, counts: {active: [], waiting: [], stale: [], unknown: [], disconnected: []},
    unmeasured: [], clockSkew: [], disconnectedProviders: [], examined: [], slowest: [],
  };
}

function record(cell, {ms, tick, report, reads, cap}) {
  cell.build.push(ms);
  cell.queryCalls.push(reads.queryCalls);
  cell.relationsCalls.push(reads.relationsCalls);
  const rows = Math.max(reads.maxQueryRows, reads.maxRelationRows);
  cell.maxRowsPerCall = Math.max(cell.maxRowsPerCall, rows);
  if (rows > cap) cell.rowsOverCap += 1;
  if (reads.relationsCalls > report.examined.nodes + MAX_PAIR_READS) cell.readsOverBound += 1;
  if (reads.queryCalls !== 1) cell.queryCallViolations += 1;
  if (report.examined.truncated) cell.truncated += 1;
  cell.labels[report.criticalPath.label] = (cell.labels[report.criticalPath.label] ?? 0) + 1;
  if (report.criticalPath.label === 'incomplete-trace') {
    for (const reason of report.criticalPath.reasons) cell.reasons[reason] = (cell.reasons[reason] ?? 0) + 1;
  }
  for (const name of Object.keys(cell.counts)) cell.counts[name].push(report.counts[name]);
  cell.unmeasured.push(report.unmeasured);
  cell.clockSkew.push(report.clockSkew);
  cell.disconnectedProviders.push(report.disconnectedProviders.length);
  cell.examined.push(report.examined.nodes);
  cell.slowest.push({ms, tick, setting: cell.setting.label});
}

const series = values => {
  const found = distribution(values, 0);
  return {p50: found.p50, max: found.max};
};

function summarise(cell, reasonNames) {
  const samples = cell.build.length;
  const rate = count => (samples === 0 ? null : round(count / samples));
  return {
    label: cell.setting.label,
    bottlenecks: cell.setting.bottlenecks,
    clockLagMs: cell.setting.clockLagMs,
    samples,
    build: distribution(cell.build),
    reads: {
      queryCallsPerReport: series(cell.queryCalls),
      relationsCallsPerReport: series(cell.relationsCalls),
      maxRowsPerCall: cell.maxRowsPerCall,
      reportsWithRowsOverPageCap: cell.rowsOverCap,
      reportsOverRelationsBound: cell.readsOverBound,
      reportsWithQueryCallsNotOne: cell.queryCallViolations,
    },
    examinedNodes: series(cell.examined),
    truncatedRate: rate(cell.truncated),
    criticalPath: {
      partialEstimatedRate: rate(cell.labels['partial-estimated'] ?? 0),
      incompleteTraceRate: rate(cell.labels['incomplete-trace'] ?? 0),
      traceReasonReports: Object.fromEntries(reasonNames.map(name => [name, cell.reasons[name] ?? 0])),
      traceReasonRates: Object.fromEntries(reasonNames.map(name => [name, rate(cell.reasons[name] ?? 0)])),
    },
    counts: Object.fromEntries(Object.entries(cell.counts).map(([name, values]) => [name, series(values)])),
    unmeasured: series(cell.unmeasured),
    clockSkew: series(cell.clockSkew),
    disconnectedProviders: {cardinality: series(cell.disconnectedProviders)},
  };
}

/** One pass: ingest the snapshots and relations, then sample after every SAMPLE_EVERY-th tick while churn is applied. */
function measurePass({label, limits, Projection, selectAttention, reasonNames, fixture}) {
  const projection = new Projection(limits);
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  const cells = SETTINGS.map(newCell);
  const cap = limits.maxQuery;
  let sampleIndex = 0;
  let tick = -1;
  let tickAt;
  let disconnected;
  const sampleTick = at => {
    if (at % SAMPLE_EVERY !== 0) return;
    const phase = sampleIndex % DISCONNECT_CYCLE.period;
    if (phase === DISCONNECT_CYCLE.disconnectAt && disconnected === undefined) {
      disconnected = PROVIDERS[Math.floor(sampleIndex / DISCONNECT_CYCLE.period) % PROVIDERS.length];
      projection.disconnect(disconnected);
    } else if (phase === DISCONNECT_CYCLE.reconnectAt && disconnected !== undefined) {
      projection.reconnect(disconnected);
      disconnected = undefined;
    }
    for (const cell of cells) {
      const input = {
        scope: SCOPE, invocationId: INVOCATION_ID, now: instantAt(at, cell.setting.clockLagMs), limit: ATTENTION_LIMIT,
        bottlenecks: cell.setting.bottlenecks,
      };
      const begin = clock();
      const report = selectAttention(projection, input);
      const ms = clock() - begin;
      const counted = countingView(projection);
      selectAttention(counted.view, input);
      record(cell, {ms, tick: at, report, reads: counted.seen, cap});
    }
    sampleIndex += 1;
  };
  for (const update of fixture.updates) {
    if (update.observedAt !== tickAt) {
      if (tickAt !== undefined) sampleTick(tick);
      tickAt = update.observedAt;
      tick += 1;
    }
    projection.ingest(update);
  }
  if (tickAt !== undefined) sampleTick(tick);
  if (disconnected !== undefined) projection.reconnect(disconnected);
  const slowest = cells.flatMap(cell => cell.slowest).sort((a, b) => b.ms - a.ms).slice(0, 5).map(item => ({...item, ms: round(item.ms)}));
  const retained = projection.stats();
  return {
    label,
    limits: {...limits},
    limitsLabel: 'bench-only: defined in qa/workbench/grouped-fixture.mjs (maxQuery-100 spreads it locally), never in src/',
    sampleEvery: SAMPLE_EVERY,
    sampleTicks: sampleIndex,
    samples: cells.reduce((sum, cell) => sum + cell.build.length, 0),
    offered: {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length},
    retained: {nodes: retained.nodes, events: retained.events, edges: retained.edges},
    settings: cells.map(cell => summarise(cell, reasonNames)),
    slowest,
  };
}

const judgedName = (pass, setting) => `${pass.label}:${setting.label}`;

/**
 * Recomputes realisation and the target judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (fixture shape, fewer than 1,000 samples in a pass, a truncated projection, an unsampled
 * series). Exit 1: realised, but a judged p95 is over 20 ms or a reads violation was recorded.
 */
export function assessAttentionReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture).violations];
  const passes = Array.isArray(receipt.passes) ? receipt.passes : [];
  if (passes.length !== PASSES.length) violations.push({rule: 'passes-missing', detail: `${passes.length} passes recorded; expected ${PASSES.length}`});
  const judged = [];
  const over = [];
  const readsViolations = [];
  for (const pass of passes) {
    if (pass.samples < MIN_SAMPLES_PER_PASS) {
      violations.push({rule: 'samples-below-1000', detail: `${pass.label} recorded ${pass.samples} samples; needs >= ${MIN_SAMPLES_PER_PASS}`});
    }
    if (pass.retained.nodes < pass.offered.nodes || pass.retained.edges < pass.offered.edges) {
      violations.push({
        rule: 'pass-truncated',
        detail: `${pass.label} retained ${pass.retained.nodes}/${pass.offered.nodes} nodes and ${pass.retained.edges}/${pass.offered.edges} edges`,
      });
    }
    for (const setting of pass.settings ?? []) {
      const name = judgedName(pass, setting);
      judged.push(name);
      if (!setting.build || setting.build.samples === 0 || setting.build.p95 === null) {
        violations.push({rule: 'series-not-sampled', detail: `${name} has no samples`});
        continue;
      }
      if (setting.build.p95 > NAVIGATION_TARGET_MS) over.push(name);
      const reads = setting.reads;
      if (reads.reportsWithRowsOverPageCap > 0 || reads.reportsOverRelationsBound > 0 || reads.reportsWithQueryCallsNotOne > 0) {
        readsViolations.push(name);
      }
    }
  }
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 || readsViolations.length > 0 ? 1 : 0;
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', judged, over, readsViolations},
    realised,
    violations,
    verdict: exitCode === 2 ? 'not-w21-shape' : exitCode === 1 ? 'over-target' : 'within-target',
    exitCode,
  };
}

export const exitCodeFor = receipt => assessAttentionReceipt(receipt).exitCode;

/**
 * Both passes over one fixture, as one receipt. `Projection` is the ObservationProjection class and `selectAttention`
 * the attention selector (the compiled build from the CLI, the TypeScript source from the test); `reasonNames` is
 * ATTENTION_TRACE_REASONS read from the same module; `host` carries utc, revision, node, arch, platform, cpus,
 * cpuModel, toolchain, command and pinnedCaps.
 */
export function runAttentionBench({Projection, selectAttention, reasonNames, fixture, host}) {
  const passes = PASSES.map(pass => measurePass({...pass, Projection, selectAttention, reasonNames, fixture}));
  const receipt = {
    contract: ATTENTION_RECEIPT_CONTRACT,
    benchmark: 'attention-grouped-10k',
    measured: true,
    aggregation: 'none: caps and the pair re-read semantics are later decisions this receipt informs (wb-6ze.29)',
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    productionCaps: {...host.pinnedCaps},
    fixture: {...fixture.shape, providers: {...fixture.shape.providers}},
    sampling: {
      limit: ATTENTION_LIMIT, minSamplesPerPass: MIN_SAMPLES_PER_PASS, sampleEvery: SAMPLE_EVERY, maxPairReads: MAX_PAIR_READS,
      settings: SETTINGS.map(setting => ({...setting})), disconnectCycle: {...DISCONNECT_CYCLE},
      clock: 'FIXTURE_EPOCH_MS + (tick + 1) seconds - setting lag; no host clock',
    },
    passes,
  };
  return {...receipt, ...assessAttentionReceipt(receipt)};
}

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

async function main() {
  let receipt;
  try {
    const {ObservationProjection} = await import('../../dist/workbench/observation.js');
    const {selectAttention, ATTENTION_TRACE_REASONS} = await import('../../dist/workbench/attention.js');
    const fixture = buildGroupedFixture({
      seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
      nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
      depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
      ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
    });
    const processors = cpus();
    receipt = runAttentionBench({
      Projection: ObservationProjection,
      selectAttention,
      reasonNames: [...ATTENTION_TRACE_REASONS],
      fixture,
      host: {
        utc: new Date().toISOString(),
        revision: process.env.W21_REVISION ?? 'working-tree',
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
        command: 'node qa/workbench/attention-grouped-bench.mjs',
        pinnedCaps: {
          observationMaxQuery: 100, attentionDefaultLimit: 100, attentionMaxLimit: 100, attentionDefaultBottlenecks: 5,
          attentionMaxBottlenecks: 20, note: 'echoed from the source by test/workbench-attention-grouped-bench.test.ts; this bench raises none of them',
        },
      },
    });
  } catch (error) {
    console.error(JSON.stringify({benchmark: 'attention-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  if (process.env.W21_ATTENTION_RECEIPT) writeFileSync(process.env.W21_ATTENTION_RECEIPT, `${JSON.stringify(receipt)}\n`);
  console.log(JSON.stringify(receipt));
  process.exitCode = exitCodeFor(receipt);
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
