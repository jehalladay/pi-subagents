// W21 (wb-9x5.4): reducer-update and UI selector time under live churn on the grouped-10k fixture.
//
// Run after `npm run build`, outside the default gate: `forge run reducer-selector-bench`, or
// `node qa/workbench/reducer-selector-bench.mjs`. The fixture is the wb-9x5.1 one, imported from
// ./grouped-fixture.mjs and never forked. ONE JSON receipt line (contract workbench.reducer-selector/v1)
// is printed FIRST, then written to $W21_REDUCER_RECEIPT when set, and only then is the exit code set:
//   0  the W21 shape was measured and no judged series is over its bound
//   1  the W21 shape was measured but a finding stands: a selector p95 over 20 ms, a full 100,000-event
//      fold on a redraw, or a redraw cadence over 4 Hz. Recorded honestly, never tuned away.
//   2  the measurement is not the W21 claim (fixture shape, a truncated projection, updates not applied,
//      a series with no samples, a non-positive timing, no redraws)
//   3  nothing could be measured (an exception, reported on stderr; no receipt), or the receipt file could
//      not be written (reported on stderr; the receipt is already on stdout, never a silent exit 1)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs
// (wb-oq3); $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES,
// $W21_DEPTH and $W21_TICKS override the fixture; an override below the W21 shape is still measured and exits 2.
//
// BOUNDS, stated here before any run and exported below; none is derived from a measurement:
//   - selector p95 <= 20 ms per view and per churn band: the one numeric target docs/workbench/14 gives
//     ("<=20 ms per navigation/layout calculation"). A selector here is layoutInspector for one view.
//   - redraw <= 4 Hz, measured on FIXTURE time (observedAt), so it is deterministic and never wall-clock.
//   - no redraw may touch >= 100,000 events/rows or request an event page of that size (a full fold).
//   - the redraw cap is a property of the fixture's 1 s tick spacing, not of the product: on that spacing it
//     never binds (nothing is skipped), so the receipt carries REDRAW_CAP_LABEL and a bound-versus-unbound
//     verdict (`cadence.capBound`, from skipped ticks) and the product's live redraw scheduler stays unmeasured.
//   - every timed distribution with samples must be strictly positive in p50, p95 and max; a series with no
//     samples is `unmeasured` (null quantiles), never zero, and a non-positive timing is an instrument fault
//     (exit 2), never a result.
//   - the reducer (ObservationProjection.ingest) has NO documented target: its p50/p95/max are recorded
//     and never judged. docs/workbench/14: "No invented pass numbers."
// The projection uses BENCH_ONLY_LIMITS from the fixture module only; production caps are never touched.
// Selector timings include the read-counting wrappers that implement the fold falsifier (documented in
// the receipt as `instrumentation`); reducer timings call ingest on the raw projection, uninstrumented.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {
  assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID, NAVIGATION_TARGET_MS, SCOPE, SIZES,
} from './grouped-fixture.mjs';

export const REDUCER_SELECTOR_CONTRACT = 'workbench.reducer-selector/v1';
export const VIEW_NAMES = Object.freeze(['overview', 'graph', 'timeline', 'details']);
export const SELECTOR_TARGET_MS = NAVIGATION_TARGET_MS;
export const REDRAW_MAX_HZ = 4;
export const FOLD_THRESHOLD_EVENTS = 100_000;
export const REDRAW_CAP_LABEL = "redraw cap never binds on 1s fixture ticks; the product's live redraw scheduler is not measured";
/** Disjoint churn bands covering 1..100 changes per tick, split at the geometric means of 1, 10 and 100. */
export const BANDS = Object.freeze([
  Object.freeze({label: '1', min: 1, max: 3}),
  Object.freeze({label: '10', min: 4, max: 31}),
  Object.freeze({label: '100', min: 32, max: 100}),
]);
const EXACT_CHURN = Object.freeze([1, 10, 100]);
const VIEW_SIZE = SIZES[1];
const MIN_INTERVAL_MS = 1_000 / REDRAW_MAX_HZ;
const SELECTION_STRIDE = 37;
const OUTLIERS_KEPT = 5;
const TENTH = 10;
const READ_METHODS = Object.freeze(['window', 'query', 'events', 'relations', 'aggregate', 'indexOf', 'relationRevision', 'stats']);

const round = value => Math.round(value * 10_000) / 10_000;
const clock = () => performance.now();

/** p50/p95/max in ms (0.1 us rounding) with the sample count; an empty series has nulls, never zeros. */
export function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null, unmeasured: true};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}

/** Consecutive updates with one observedAt are one tick; the group size is the tick's churn. */
function ticksOf(updates) {
  const ticks = [];
  for (let from = 0; from < updates.length;) {
    let to = from + 1;
    while (to < updates.length && updates[to].observedAt === updates[from].observedAt) to++;
    ticks.push({from, to, churn: to - from, atMs: Date.parse(updates[from].observedAt)});
    from = to;
  }
  return ticks;
}

/**
 * Wraps the projection's read methods with call and touched-row counters. The wrapper delegates to the real
 * instance, so private state is untouched. Mutators (ingest, refresh, relate) are deliberately not wrapped.
 */
function countingReads(projection) {
  const counters = {calls: {}, touched: 0, maxEventsRequested: 0, requestedSinceReset: 0};
  const touchedBy = (name, result) => {
    if (name === 'window') return result.nodes.length;
    if (name === 'query') return result.examined;
    if (name === 'events') return result.events.length;
    if (name === 'relations') return result.length;
    return 0;
  };
  const counted = Object.create(projection);
  for (const name of READ_METHODS) {
    const original = projection[name];
    if (typeof original !== 'function') continue;
    counted[name] = (...args) => {
      counters.calls[name] = (counters.calls[name] ?? 0) + 1;
      if (name === 'events' && typeof args[0]?.limit === 'number') {
        counters.requestedSinceReset = Math.max(counters.requestedSinceReset, args[0].limit);
        counters.maxEventsRequested = Math.max(counters.maxEventsRequested, args[0].limit);
      }
      const result = original.apply(projection, args);
      counters.touched += touchedBy(name, result);
      return result;
    };
  }
  return {counted, counters};
}

function newBand(label, min, max) {
  return {label, minChanges: min, maxChanges: max, ticks: 0, updates: 0, redraws: 0, reducerMs: [], selectorMs: Object.fromEntries(VIEW_NAMES.map(view => [view, []]))};
}

const finishBand = band => ({
  label: band.label, minChanges: band.minChanges, maxChanges: band.maxChanges,
  ticks: band.ticks, updates: band.updates, redraws: band.redraws,
  reducer: distribution(band.reducerMs),
  selectors: Object.fromEntries(VIEW_NAMES.map(view => [view, distribution(band.selectorMs[view])])),
});

function slowest(samples) {
  return [...samples].sort((a, b) => b.ms - a.ms || a.ordinal - b.ordinal).slice(0, OUTLIERS_KEPT).map(sample => ({...sample, ms: round(sample.ms)}));
}

/** Most redraws inside any window of one fixture second (fixture timestamps, sliding). */
function maxInOneSecond(redrawAtMs) {
  let most = 0;
  let from = 0;
  for (let to = 0; to < redrawAtMs.length; to++) {
    while (redrawAtMs[to] - redrawAtMs[from] >= 1_000) from++;
    most = Math.max(most, to - from + 1);
  }
  return most;
}

/**
 * Ingests the fixture's whole update stream through the reducer, timing each update, and after each tick
 * draws all four views at most REDRAW_MAX_HZ times per fixture second. `Projection` is the
 * ObservationProjection class and `inspector` is {initialInspectorState, layoutInspector, reduceInspectorKey};
 * `host` carries utc, revision, node, arch, platform, cpus, cpuModel, toolchain and command.
 */
export function runReducerSelectorBench({Projection, inspector, fixture, host}) {
  const projection = new Projection(BENCH_ONLY_LIMITS);
  const {counted, counters} = countingReads(projection);
  const model = {projection: counted, scope: SCOPE, invocationId: INVOCATION_ID, title: 'W21 reducer/selector bench', status: 'running'};
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  const offered = {
    nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length,
  };

  const bands = BANDS.map(band => newBand(band.label, band.min, band.max));
  const exact = EXACT_CHURN.map(churn => newBand(String(churn), churn, churn));
  const reducerSamples = [];
  const selectorSamples = [];
  const redrawAtMs = [];
  const touchedPerRedraw = [];
  const applied = {applied: 0, duplicate: 0, 'out-of-order': 0};
  let skipped = 0;
  let layoutCalls = 0;
  let fullFoldRedraws = 0;
  let lastRedrawMs = Number.NEGATIVE_INFINITY;
  let ordinal = 0;

  const ticks = ticksOf(fixture.updates);
  for (const [tickNumber, tick] of ticks.entries()) {
    const owners = [bands[BANDS.findIndex(band => tick.churn >= band.min && tick.churn <= band.max)], ...exact.filter(band => band.minChanges === tick.churn)];
    for (const owner of owners) {
      owner.ticks++;
      owner.updates += tick.churn;
    }
    for (let at = tick.from; at < tick.to; at++) {
      const begin = clock();
      const result = projection.ingest(fixture.updates[at]);
      const ms = clock() - begin;
      applied[result] += 1;
      reducerSamples.push({ms, ordinal, tick: tickNumber, churn: tick.churn});
      for (const owner of owners) owner.reducerMs.push(ms);
      ordinal++;
    }
    if (tick.atMs - lastRedrawMs < MIN_INTERVAL_MS) {
      skipped++;
      continue;
    }
    lastRedrawMs = tick.atMs;
    redrawAtMs.push(tick.atMs);
    const total = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1}).total;
    const index = total === 0 ? 0 : (tickNumber * SELECTION_STRIDE) % total;
    const row = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: index, limit: 1}).nodes[0];
    const touchedBefore = counters.touched;
    counters.requestedSinceReset = 0;
    for (const owner of owners) owner.redraws++;
    for (const view of VIEW_NAMES) {
      const state = {...inspector.initialInspectorState(), view, index, selected: row?.key ?? null};
      const begin = clock();
      inspector.layoutInspector(model, state, VIEW_SIZE);
      const ms = clock() - begin;
      layoutCalls++;
      selectorSamples.push({ms, ordinal: selectorSamples.length, tick: tickNumber, churn: tick.churn, view});
      for (const owner of owners) owner.selectorMs[view].push(ms);
    }
    const touched = counters.touched - touchedBefore;
    touchedPerRedraw.push(touched);
    if (touched >= FOLD_THRESHOLD_EVENTS || counters.requestedSinceReset >= FOLD_THRESHOLD_EVENTS) fullFoldRedraws++;
  }

  const third = Math.max(1, Math.floor(reducerSamples.length / TENTH));
  const first = distribution(reducerSamples.slice(0, third).map(sample => sample.ms));
  const last = distribution(reducerSamples.slice(reducerSamples.length - third).map(sample => sample.ms));
  const stats = projection.stats();
  const fixtureSpanMs = ticks.length > 1 ? ticks[ticks.length - 1].atMs - ticks[0].atMs : 0;
  const tickGaps = ticks.slice(1).map((tick, at) => tick.atMs - ticks[at].atMs);
  const aggregates = typeof projection.aggregateStats === 'function' ? projection.aggregateStats() : null;
  const receipt = {
    contract: REDUCER_SELECTOR_CONTRACT,
    benchmark: 'reducer-selector-grouped-10k',
    measured: true,
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    fixture: {...fixture.shape, providers: {...fixture.shape.providers}},
    limits: {...BENCH_ONLY_LIMITS},
    limitsLabel: 'bench-only: BENCH_ONLY_LIMITS from qa/workbench/grouped-fixture.mjs as the one constructor argument; production caps untouched',
    instrumentation: 'selector timings include read-method counting wrappers; reducer timings call ingest on the raw projection',
    sampling: {view: VIEW_SIZE.label, views: [...VIEW_NAMES], warmupUpdates: 0, warmupRedraws: 0, selection: `row (tick * ${SELECTION_STRIDE}) mod total`},
    bounds: {selectorTargetMs: SELECTOR_TARGET_MS, redrawMaxHz: REDRAW_MAX_HZ, foldThresholdEvents: FOLD_THRESHOLD_EVENTS},
    offered,
    retained: stats,
    apply: {ingestApplied: applied.applied, ingestDuplicate: applied.duplicate, ingestOutOfOrder: applied['out-of-order']},
    reducer: {
      all: distribution(reducerSamples.map(sample => sample.ms)),
      firstTenth: first,
      lastTenth: last,
      growthRatio: first.p50 && last.p50 !== null ? round(last.p50 / first.p50) : null,
      judged: false,
      note: 'ObservationProjection.ingest per update; no documented target, so recorded and never judged',
    },
    bands: bands.map(finishBand),
    exactChurn: exact.map(finishBand),
    selectors: Object.fromEntries(VIEW_NAMES.map(view => [view, distribution(selectorSamples.filter(sample => sample.view === view).map(sample => sample.ms))])),
    folds: {
      redraws: redrawAtMs.length,
      layoutCalls,
      readCalls: {...counters.calls},
      ingestCalls: applied.applied + applied.duplicate + applied['out-of-order'],
      maxTouchedPerRedraw: touchedPerRedraw.reduce((most, value) => Math.max(most, value), 0),
      p50TouchedPerRedraw: distribution(touchedPerRedraw).p50,
      maxEventsRequested: counters.maxEventsRequested,
      fullFoldRedraws,
      threshold: FOLD_THRESHOLD_EVENTS,
      retainedEvents: stats.events,
      aggregateStats: aggregates,
    },
    cadence: {
      capHz: REDRAW_MAX_HZ,
      minIntervalMs: MIN_INTERVAL_MS,
      basis: 'fixture time (observedAt), one redraw per tick when at least minIntervalMs has elapsed',
      ticks: ticks.length,
      redraws: redrawAtMs.length,
      skipped,
      fixtureSpanMs,
      effectiveHz: fixtureSpanMs > 0 ? round(redrawAtMs.length / (fixtureSpanMs / 1_000)) : 0,
      maxRedrawsInOneSecond: maxInOneSecond(redrawAtMs),
      minTickIntervalMs: tickGaps.length > 0 ? tickGaps.reduce((least, gap) => Math.min(least, gap), Number.POSITIVE_INFINITY) : null,
      capBound: skipped > 0,
      capBinding: skipped > 0 ? 'bound' : 'unbound',
      capLabel: REDRAW_CAP_LABEL,
    },
    outliers: {
      rule: `the ${OUTLIERS_KEPT} slowest samples of each series, with tick and churn`,
      reducer: slowest(reducerSamples),
      selector: slowest(selectorSamples),
    },
  };
  return {...receipt, ...assessReducerSelectorReceipt(receipt)};
}

const seriesNames = receipt => [
  ...receipt.bands.map(band => ({scope: `band-${band.label}`, band})),
  ...receipt.exactChurn.map(band => ({scope: `churn-${band.minChanges}`, band})),
];

/**
 * Recomputes realisation and the judgement from a receipt's own measured fields; a stored verdict is ignored.
 * Exit 2: not the W21 claim. Exit 1: realised, but a finding stands. Exit 0: realised and clean.
 */
export function assessReducerSelectorReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture).violations];
  const need = (ok, rule, detail) => {
    if (!ok) violations.push({rule, detail});
  };
  need(
    receipt.retained.nodes >= receipt.offered.nodes && receipt.retained.edges >= receipt.offered.edges,
    'projection-truncated',
    `retained ${receipt.retained.nodes}/${receipt.offered.nodes} nodes and ${receipt.retained.edges}/${receipt.offered.edges} edges`,
  );
  need(
    receipt.apply.ingestApplied === receipt.offered.updates,
    'updates-not-applied',
    `${receipt.apply.ingestApplied} of ${receipt.offered.updates} updates applied (${receipt.apply.ingestDuplicate} duplicate, ${receipt.apply.ingestOutOfOrder} out of order)`,
  );
  need(receipt.cadence.redraws > 0, 'no-redraws', 'no redraw was sampled');
  const unsampled = [];
  const nonPositive = [];
  const over = [];
  const timed = (name, value) => {
    if (!value || value.samples === 0) return;
    if (!(value.p50 > 0 && value.p95 > 0 && value.max > 0)) nonPositive.push(`${name} (p50 ${value.p50}, p95 ${value.p95}, max ${value.max})`);
  };
  if (!receipt.reducer.all || receipt.reducer.all.samples === 0) unsampled.push('reducer:all');
  timed('reducer:all', receipt.reducer.all);
  timed('reducer:firstTenth', receipt.reducer.firstTenth);
  timed('reducer:lastTenth', receipt.reducer.lastTenth);
  for (const {scope, band} of seriesNames(receipt)) {
    if (band.reducer.samples === 0) unsampled.push(`reducer:${scope}`);
    timed(`reducer:${scope}`, band.reducer);
    for (const view of VIEW_NAMES) {
      const value = band.selectors[view];
      timed(`selector:${scope}:${view}`, value);
      if (!value || value.samples === 0 || value.p95 === null) unsampled.push(`selector:${scope}:${view}`);
      else if (value.p95 > receipt.bounds.selectorTargetMs && scope.startsWith('band-')) over.push(`selector:${scope}:${view}`);
    }
  }
  for (const view of VIEW_NAMES) {
    const value = receipt.selectors[view];
    timed(`selector:all:${view}`, value);
    if (!value || value.samples === 0 || value.p95 === null) unsampled.push(`selector:all:${view}`);
    else if (value.p95 > receipt.bounds.selectorTargetMs) over.push(`selector:all:${view}`);
  }
  need(unsampled.length === 0, 'series-not-sampled', `no samples for ${unsampled.join(', ')}`);
  need(nonPositive.length === 0, 'timing-not-positive', `non-positive timing in ${nonPositive.join(', ')}`);
  if (receipt.folds.fullFoldRedraws > 0) over.push('full-fold-per-redraw');
  if (receipt.cadence.maxRedrawsInOneSecond > receipt.bounds.redrawMaxHz) over.push('redraw-cadence-over-4hz');
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 ? 1 : 0;
  return {
    realised, violations, over, pass: exitCode === 0, exitCode,
    verdict: exitCode === 0
      ? 'measured on the W21 shape; every judged series is within its stated bound'
      : exitCode === 1
        ? `measured on the W21 shape; findings: ${over.join(', ')}`
        : `not the W21 claim: ${violations.map(violation => violation.rule).join(', ')}`,
  };
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

/**
 * Prints the receipt line FIRST, then writes the same line to the optional receipt file, and only then returns the exit
 * code. A failed write is reported on stderr and returns 3 with the receipt already on stdout; it never surfaces as the
 * over-target 1 or as a pass (one-liner batch item (5), bound onto wb-9x5.15 by name; the wb-9x5.12 bench shape).
 */
export function publishReceipt(receipt, {path, log = console.log, logError = console.error, writeFile = writeFileSync} = {}) {
  const line = JSON.stringify(receipt);
  log(line);
  if (path) {
    try {
      writeFile(path, `${line}\n`);
    } catch (error) {
      logError(JSON.stringify({benchmark: 'reducer-selector-grouped-10k', error: 'receipt-write-failed', path, detail: error instanceof Error ? error.message : String(error)}));
      return 3;
    }
  }
  return receipt.exitCode;
}

async function main() {
  const {initialInspectorState, layoutInspector, reduceInspectorKey} = await import('../../dist/ui/workflow-inspector.js');
  const {ObservationProjection} = await import('../../dist/workbench/observation.js');
  const fixture = buildGroupedFixture({
    seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
    nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
    depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
    ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
  });
  const processors = cpus();
  const stamp = benchRevision();
  const receipt = runReducerSelectorBench({
    Projection: ObservationProjection,
    inspector: {initialInspectorState, layoutInspector, reduceInspectorKey},
    fixture,
    host: {
      utc: process.env.W21_UTC ?? new Date().toISOString(),
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
      command: 'node qa/workbench/reducer-selector-bench.mjs',
    },
  });
  return withBenchRevision(receipt, stamp);
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let receipt;
  try {
    receipt = await main();
  } catch (error) {
    console.error(JSON.stringify({benchmark: 'reducer-selector-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  process.exitCode = publishReceipt(receipt, {path: process.env.W21_REDUCER_RECEIPT});
}
