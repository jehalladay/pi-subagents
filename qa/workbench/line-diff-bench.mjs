// W21 (wb-9x5.8): terminal bytes-per-update line-diff receipt on the grouped-10k fixture under live churn.
//
// Run after `npm run build`, outside the default gate: `forge run line-diff-bench`, or
// `node qa/workbench/line-diff-bench.mjs`. The fixture is the wb-9x5.1 one, imported from ./grouped-fixture.mjs
// and never forked; the churn model (consecutive updates sharing one observedAt are one tick of 1..100 changes)
// and the redraw gate are the wb-9x5.4 ones. ONE JSON receipt line (contract workbench.line-diff/v1) is written
// to $W21_LINEDIFF_RECEIPT when set, printed, and only then is the exit code set:
//   0  the W21 shape was measured and no finding stands
//   1  the W21 shape was measured but a finding stands: a redraw cadence over 4 Hz, or a full 100,000-event
//      fold on a redraw. Recorded honestly, never tuned away.
//   2  the measurement is not the W21 claim (fixture shape, a truncated projection, updates not applied, a
//      series with no samples, no redraws, or a broken byte accounting: the one-line probe does not beat the
//      full frame, or a diff is larger than its own frame)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs
// (wb-oq3); $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES,
// $W21_DEPTH and $W21_TICKS override the fixture; an override below the W21 shape is still measured and exits 2.
//
// WHAT IS COUNTED. A frame is the lines layoutInspector returns for one view at one width. Full-frame repaint
// bytes are every line's UTF-8 bytes plus one terminator byte. Line-diff bytes are the same count over only the
// lines whose text differs from the previous frame of the SAME view and width, compared index by index;
// lines that disappeared are reported as removedLines and charged zero bytes (no terminal erase sequence is
// invented). The first paint of each view and width is a cold paint: recorded under firstPaint and excluded
// from every series. The selection is fixed (first row, no navigation), so the diff measures live churn only.
//
// BOUNDS, stated here before any run and exported below; none is derived from a measurement:
//   - redraw <= 4 Hz, measured on FIXTURE time (observedAt), so it is deterministic and never wall-clock.
//   - no redraw may touch >= 100,000 events/rows or request an event page of that size (a full fold).
//   - there is NO documented byte budget: docs/workbench/14 gives none, so emitted bytes are recorded and
//     never judged. "No invented pass numbers."
// The projection uses BENCH_ONLY_LIMITS from the fixture module only; production caps are never touched.
// No clock is read in the measured path: every byte count is a deterministic function of the fixture.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {
  assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID, SCOPE, SIZES,
} from './grouped-fixture.mjs';

export const LINE_DIFF_CONTRACT = 'workbench.line-diff/v1';
export const VIEW_NAMES = Object.freeze(['overview', 'graph', 'timeline', 'details']);
export const REDRAW_MAX_HZ = 4;
export const FOLD_THRESHOLD_EVENTS = 100_000;
/** Disjoint churn bands covering 1..100 changes per tick, split at the geometric means of 1, 10 and 100. */
export const BANDS = Object.freeze([
  Object.freeze({label: '1', min: 1, max: 3}),
  Object.freeze({label: '10', min: 4, max: 31}),
  Object.freeze({label: '100', min: 32, max: 100}),
]);
const VIEW_SIZES = Object.freeze([SIZES[0], SIZES[1]]);
export const WIDTHS = Object.freeze(VIEW_SIZES.map(size => size.width));
const EXACT_CHURN = Object.freeze([1, 10, 100]);
const MIN_INTERVAL_MS = 1_000 / REDRAW_MAX_HZ;
const OUTLIERS_KEPT = 5;
const READ_METHODS = Object.freeze(['window', 'query', 'events', 'relations', 'aggregate', 'indexOf', 'relationRevision', 'stats']);
const SERIES_KEYS = Object.freeze(VIEW_NAMES.flatMap(view => VIEW_SIZES.map(size => `${view}@${size.width}`)));

const round = value => Math.round(value * 1_000_000) / 1_000_000;
const lineBytes = line => Buffer.byteLength(line) + 1;

/** Full-frame repaint bytes: every line in UTF-8 plus one terminator byte. */
export const frameBytes = lines => lines.reduce((sum, line) => sum + lineBytes(line), 0);

/** Line-diff bytes of `next` painted over `previous`: only lines whose text differs at the same index. */
export function diffFrames(previous, next) {
  let diffBytes = 0;
  let changedLines = 0;
  for (let at = 0; at < next.length; at++) {
    if (previous[at] === next[at]) continue;
    diffBytes += lineBytes(next[at]);
    changedLines++;
  }
  return {fullBytes: frameBytes(next), diffBytes, changedLines, totalLines: next.length, removedLines: Math.max(0, previous.length - next.length)};
}

/** p50/p95/max with the sample count; an empty series has nulls, never zeros. */
function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
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
 * Wraps the projection's read methods with call and touched-row counters (the fold falsifier). The wrapper
 * delegates to the real instance; mutators (ingest, refresh, relate) are deliberately not wrapped.
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

const newSeries = () => ({diff: [], full: [], ratio: [], changed: [], zero: 0});
const newBand = (label, min, max) => ({
  label, minChanges: min, maxChanges: max, ticks: 0, updates: 0, redraws: 0,
  series: Object.fromEntries(SERIES_KEYS.map(key => [key, newSeries()])),
});
const finishSeries = series => ({
  diffBytes: distribution(series.diff),
  fullBytes: distribution(series.full),
  ratio: distribution(series.ratio),
  changedLines: distribution(series.changed),
  zeroDiffRedraws: series.zero,
});
const finishBand = band => ({
  label: band.label, minChanges: band.minChanges, maxChanges: band.maxChanges,
  ticks: band.ticks, updates: band.updates, redraws: band.redraws,
  series: Object.fromEntries(SERIES_KEYS.map(key => [key, finishSeries(band.series[key])])),
});
const record = (series, result) => {
  series.diff.push(result.diffBytes);
  series.full.push(result.fullBytes);
  series.ratio.push(result.fullBytes === 0 ? 0 : round(result.diffBytes / result.fullBytes));
  series.changed.push(result.changedLines);
  if (result.diffBytes === 0) series.zero++;
};

/**
 * Ingests the fixture's whole update stream and, after each tick, draws all four views at both widths at most
 * REDRAW_MAX_HZ times per fixture second, accounting the line-diff and full-frame bytes of each repaint.
 * `Projection` is the ObservationProjection class and `inspector` is {initialInspectorState, layoutInspector,
 * reduceInspectorKey}; `host` carries utc, revision, node, arch, platform, cpus, cpuModel, toolchain, command.
 */
export function runLineDiffBench({Projection, inspector, fixture, host}) {
  const projection = new Projection(BENCH_ONLY_LIMITS);
  const {counted, counters} = countingReads(projection);
  const model = {projection: counted, scope: SCOPE, invocationId: INVOCATION_ID, title: 'W21 line-diff bench', status: 'running'};
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  const offered = {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length};

  const bands = BANDS.map(band => newBand(band.label, band.min, band.max));
  const exact = EXACT_CHURN.map(churn => newBand(String(churn), churn, churn));
  const overall = Object.fromEntries(SERIES_KEYS.map(key => [key, newSeries()]));
  const previous = new Map();
  const firstPaint = {};
  const diffSamples = [];
  const redrawAtMs = [];
  const touchedPerRedraw = [];
  const applied = {applied: 0, duplicate: 0, 'out-of-order': 0};
  let skipped = 0;
  let layoutCalls = 0;
  let fullFoldRedraws = 0;
  let lastRedrawMs = Number.NEGATIVE_INFINITY;

  const ticks = ticksOf(fixture.updates);
  for (const [tickNumber, tick] of ticks.entries()) {
    const owners = [bands[BANDS.findIndex(band => tick.churn >= band.min && tick.churn <= band.max)], ...exact.filter(band => band.minChanges === tick.churn)];
    for (const owner of owners) {
      owner.ticks++;
      owner.updates += tick.churn;
    }
    for (let at = tick.from; at < tick.to; at++) applied[projection.ingest(fixture.updates[at])] += 1;
    if (tick.atMs - lastRedrawMs < MIN_INTERVAL_MS) {
      skipped++;
      continue;
    }
    lastRedrawMs = tick.atMs;
    redrawAtMs.push(tick.atMs);
    const touchedBefore = counters.touched;
    counters.requestedSinceReset = 0;
    for (const owner of owners) owner.redraws++;
    for (const view of VIEW_NAMES) {
      for (const size of VIEW_SIZES) {
        const key = `${view}@${size.width}`;
        const lines = inspector.layoutInspector(model, {...inspector.initialInspectorState(), view}, size);
        layoutCalls++;
        const before = previous.get(key);
        previous.set(key, lines);
        if (before === undefined) {
          firstPaint[key] = {fullBytes: frameBytes(lines), lines: lines.length};
          continue;
        }
        const result = diffFrames(before, lines);
        record(overall[key], result);
        for (const owner of owners) record(owner.series[key], result);
        diffSamples.push({bytes: result.diffBytes, ordinal: diffSamples.length, tick: tickNumber, churn: tick.churn, view, width: size.width, fullBytes: result.fullBytes, changedLines: result.changedLines});
      }
    }
    const touched = counters.touched - touchedBefore;
    touchedPerRedraw.push(touched);
    if (touched >= FOLD_THRESHOLD_EVENTS || counters.requestedSinceReset >= FOLD_THRESHOLD_EVENTS) fullFoldRedraws++;
  }

  // F1 self-check: change exactly one line of the last drawn frame and account it the same way as every
  // sample. The ratio must land strictly under 1, or the accounting is reporting full frames as diffs.
  const lastFrame = previous.get(SERIES_KEYS[0]) ?? [];
  const probed = lastFrame.length === 0 ? [] : lastFrame.map((line, at) => (at === Math.floor(lastFrame.length / 2) ? `${line} *` : line));
  const probeDiff = diffFrames(lastFrame, probed);

  const stats = projection.stats();
  const fixtureSpanMs = ticks.length > 1 ? ticks[ticks.length - 1].atMs - ticks[0].atMs : 0;
  const aggregates = typeof projection.aggregateStats === 'function' ? projection.aggregateStats() : null;
  const receipt = {
    contract: LINE_DIFF_CONTRACT,
    benchmark: 'line-diff-grouped-10k',
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
    accounting: 'full = sum over lines of UTF-8 bytes + 1; diff = the same over lines whose text differs from the previous frame of the same view and width at the same index; removed lines are counted, not charged; first paint excluded',
    instrumentation: 'layout calls run behind read-method counting wrappers (the fold falsifier); no clock is read in the measured path',
    sampling: {
      views: [...VIEW_NAMES],
      sizes: VIEW_SIZES.map(size => ({label: size.label, width: size.width, rows: size.rows, ascii: size.ascii})),
      selection: 'fixed: first row, no navigation (live churn only)',
      warmupRedraws: 1,
    },
    bounds: {redrawMaxHz: REDRAW_MAX_HZ, foldThresholdEvents: FOLD_THRESHOLD_EVENTS, byteBudget: null},
    offered,
    retained: stats,
    apply: {ingestApplied: applied.applied, ingestDuplicate: applied.duplicate, ingestOutOfOrder: applied['out-of-order']},
    series: Object.fromEntries(SERIES_KEYS.map(key => [key, finishSeries(overall[key])])),
    bands: bands.map(finishBand),
    exactChurn: exact.map(finishBand),
    firstPaint,
    probe: {
      fullBytes: probeDiff.fullBytes,
      diffBytes: probeDiff.diffBytes,
      changedLines: probeDiff.changedLines,
      ratio: probeDiff.fullBytes === 0 ? 1 : round(probeDiff.diffBytes / probeDiff.fullBytes),
    },
    folds: {
      redraws: redrawAtMs.length,
      layoutCalls,
      readCalls: {...counters.calls},
      ingestCalls: applied.applied + applied.duplicate + applied['out-of-order'],
      maxTouchedPerRedraw: touchedPerRedraw.reduce((most, value) => Math.max(most, value), 0),
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
    },
    outliers: {
      rule: `the ${OUTLIERS_KEPT} largest line-diff repaints, with tick, churn, view and width`,
      diff: [...diffSamples].sort((a, b) => b.bytes - a.bytes || a.ordinal - b.ordinal).slice(0, OUTLIERS_KEPT),
    },
  };
  return {...receipt, ...assessLineDiffReceipt(receipt)};
}

const everySeries = receipt => [
  ...receipt.bands.flatMap(band => SERIES_KEYS.map(key => ({scope: `band-${band.label}`, key, value: band.series[key]}))),
  ...receipt.exactChurn.flatMap(band => SERIES_KEYS.map(key => ({scope: `churn-${band.minChanges}`, key, value: band.series[key]}))),
  ...SERIES_KEYS.map(key => ({scope: 'all', key, value: receipt.series[key]})),
];

/**
 * Recomputes realisation and the judgement from a receipt's own measured fields; a stored verdict is ignored.
 * Exit 2: not the W21 claim, or the byte accounting is broken. Exit 1: realised, but a finding stands.
 * Exit 0: realised and clean.
 */
export function assessLineDiffReceipt(receipt) {
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
  const inverted = [];
  for (const {scope, key, value} of everySeries(receipt)) {
    if (!value || !value.diffBytes || value.diffBytes.samples === 0 || value.diffBytes.p95 === null) unsampled.push(`${scope}:${key}`);
    else if ((value.ratio?.max ?? 0) > 1) inverted.push(`${scope}:${key}`);
  }
  need(unsampled.length === 0, 'series-not-sampled', `no samples for ${unsampled.join(', ')}`);
  need(inverted.length === 0, 'diff-exceeds-full', `a diff larger than its own frame in ${inverted.join(', ')}`);
  need(
    receipt.probe.changedLines === 1 && receipt.probe.ratio < 1,
    'probe-diff-equals-full',
    `a one-line change accounted ${receipt.probe.diffBytes} of ${receipt.probe.fullBytes} bytes over ${receipt.probe.changedLines} lines (ratio ${receipt.probe.ratio})`,
  );
  const over = [];
  if (receipt.folds.fullFoldRedraws > 0) over.push('full-fold-per-redraw');
  if (receipt.cadence.maxRedrawsInOneSecond > receipt.bounds.redrawMaxHz) over.push('redraw-cadence-over-4hz');
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 ? 1 : 0;
  return {
    realised, violations, over, pass: exitCode === 0, exitCode,
    verdict: exitCode === 0
      ? 'measured on the W21 shape; no finding stands (emitted bytes are recorded, not judged: docs/workbench/14 gives no byte budget)'
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
  const receipt = runLineDiffBench({
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
      command: 'node qa/workbench/line-diff-bench.mjs',
    },
  });
  return withBenchRevision(receipt, stamp);
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let receipt;
  try {
    receipt = await main();
  } catch (error) {
    console.error(JSON.stringify({benchmark: 'line-diff-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  if (process.env.W21_LINEDIFF_RECEIPT) writeFileSync(process.env.W21_LINEDIFF_RECEIPT, `${JSON.stringify(receipt)}\n`);
  console.log(JSON.stringify(receipt));
  process.exitCode = receipt.exitCode;
}
