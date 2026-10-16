// W21 (wb-9x5.7): grouped-10k timeline lane-model build receipt, as a pure measurement module.
//
// This file imports only the W21 fixture module (qa/workbench/grouped-fixture.mjs, reused, never forked). The
// projection class and buildTimelineLanes are ARGUMENTS: test/workbench-timeline-grouped-bench.test.ts hands in the
// TypeScript sources and qa/workbench/timeline-grouped-bench.mjs hands in the compiled dist/ build; neither path is
// named here. That keeps this module loadable without a build, the way grouped-fixture.mjs is.
//
// Pure lane-model build cost only: buildTimelineLanes over a populated projection. No layoutInspector call, no
// terminal bytes and no redraw claim. Measurement-only: bench-only limits are spread locally here and never written
// into src/; a slow result or a reads-over-rows violation is recorded honestly (exit 1), never tuned away.
//
// The timed region is exactly one call to buildTimelineLanes, bracketed by performance.now(); the counting reader's
// increments sit inside that call and are part of the measured cost. Everything derived from the model (notes,
// lanes, rates) is computed after the clock stops.
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  SCOPE,
} from './grouped-fixture.mjs';

export const TIMELINE_RECEIPT_CONTRACT = 'workbench.timeline-grouped-bench/v1';
export const TIMELINE_BENCHMARK = 'timeline-grouped-10k';
export const MIN_SAMPLES_PER_PASS = 1_000;
/** The frozen note vocabulary of timeline.ts (TimelineNoteCode); the histogram carries every code, zero or not. */
export const NOTE_VOCABULARY = Object.freeze([
  'clocks-may-differ', 'open-intervals-present', 'intervals-missing', 'stale-rows-present', 'window-partial',
  'relation-page-full', 'multiple-parents', 'rows-outside-viewport', 'phase-kinds-unavailable',
]);
/** The second pass raises only the projection's query cap, locally. BENCH_ONLY_LIMITS itself is never edited. */
export const PASS_LIMITS = Object.freeze({
  'maxQuery-40': BENCH_ONLY_LIMITS,
  'maxQuery-100': Object.freeze({...BENCH_ONLY_LIMITS, maxQuery: 100}),
});
export const DEFAULT_TIMELINE_SAMPLING = Object.freeze({
  limit: 100, zooms: Object.freeze([1, 2, 4, 8]), pans: Object.freeze([0, 10, 100]), columns: Object.freeze([80, 120]), rounds: 1,
});
/** The request knobs left at the model's own defaults (timeline.ts DEFAULT_LANES / DEFAULT_ROWS / DEFAULT_RELATIONS). */
export const MODEL_DEFAULTS = Object.freeze({maxLanes: 16, maxRowsPerLane: 40, relationLimit: 40});
const OUTLIERS = 5;
const clock = () => performance.now();
const round = value => Math.round(value * 10_000) / 10_000;
const rate = (count, total) => (total === 0 ? 0 : round(count / total));

/** p50/p95/max in ms (0.1 us rounding) with the sample count; an empty series has nulls, never zeros. */
export function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}
const counts = values => {
  if (values.length === 0) return {p50: null, max: null};
  const sorted = Float64Array.from(values).sort();
  return {p50: sorted[Math.floor(sorted.length * 0.5)], max: sorted[sorted.length - 1]};
};

function applyFixture(projection, fixture) {
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  for (const update of fixture.updates) projection.ingest(update);
}

/** Untimed census of incoming-edge pages at the projection's query cap: how many rows have a cut page. */
function incomingCensus(projection, maxQuery) {
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  let rows = 0;
  let atMaxQuery = 0;
  let maxObserved = 0;
  for (let offset = 0; offset < head.total; offset += DEFAULT_TIMELINE_SAMPLING.limit) {
    const page = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: DEFAULT_TIMELINE_SAMPLING.limit});
    for (const node of page.nodes) {
      const incoming = projection.relations({scope: SCOPE, to: node.key, limit: maxQuery});
      rows++;
      if (incoming.length >= maxQuery) atMaxQuery++;
      maxObserved = Math.max(maxObserved, incoming.length);
    }
  }
  return {rows, atMaxQuery, atMaxQueryRate: rate(atMaxQuery, rows), maxObserved, cap: maxQuery};
}

/** A reader exposing exactly what buildTimelineLanes may use, counting relation reads and relation pages. */
function countingReader(projection, maxQuery) {
  const state = {reads: 0, windowRows: 0, atRequestedLimit: 0, atMaxQuery: 0};
  const reader = {
    window: input => {
      const page = projection.window(input);
      state.windowRows = Math.min(page.nodes.length, input.limit);
      return page;
    },
    relations: input => {
      const pageRows = projection.relations(input);
      state.reads++;
      if (input.limit !== undefined && pageRows.length >= input.limit) state.atRequestedLimit++;
      if (pageRows.length >= maxQuery) state.atMaxQuery++;
      return pageRows;
    },
    relationRevision: () => projection.relationRevision(),
  };
  return {reader, state, reset: () => Object.assign(state, {reads: 0, windowRows: 0, atRequestedLimit: 0, atMaxQuery: 0})};
}

function measurePass({label, Projection, buildTimelineLanes, fixture, limits, sampling}) {
  const projection = new Projection(limits);
  applyFixture(projection, fixture);
  const retained = projection.stats();
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  const counting = countingReader(projection, limits.maxQuery);
  const samples = [];
  const notes = Object.fromEntries(NOTE_VOCABULARY.map(code => [code, 0]));
  let unknownNotes = 0;
  const flagged = {relations: 0, window: 0, rows: 0, lanes: 0};
  let spanComplete = 0;
  let readsOverRows = 0;
  let totalReads = 0;
  let totalRows = 0;
  let pagesAtRequestedLimit = 0;
  let pagesAtMaxQuery = 0;
  let maxRowsPerLane = 0;
  let maxConcurrency = 0;
  const readsPerBuild = [];
  const lanesPerModel = [];
  for (let round_ = 0; round_ < sampling.rounds; round_++) {
    for (let offset = 0; offset < head.total; offset += sampling.limit) {
      for (const zoom of sampling.zooms) {
        for (const pan of sampling.pans) {
          for (const columns of sampling.columns) {
            const request = {scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: sampling.limit, zoom, pan, columns};
            counting.reset();
            const begin = clock();
            const model = buildTimelineLanes(counting.reader, request);
            const ms = clock() - begin;
            const {reads, windowRows} = counting.state;
            samples.push({ms, offset, zoom, pan, columns});
            readsPerBuild.push(reads);
            totalReads += reads;
            totalRows += windowRows;
            pagesAtRequestedLimit += counting.state.atRequestedLimit;
            pagesAtMaxQuery += counting.state.atMaxQuery;
            if (reads > windowRows) readsOverRows++;
            for (const key of Object.keys(flagged)) if (model.truncated[key]) flagged[key]++;
            if (model.span.complete) spanComplete++;
            for (const note of model.notes) {
              if (note.code in notes) notes[note.code]++;
              else unknownNotes++;
            }
            lanesPerModel.push(model.lanes.length);
            for (const lane of model.lanes) maxRowsPerLane = Math.max(maxRowsPerLane, lane.rows.length);
            maxConcurrency = Math.max(maxConcurrency, model.concurrency.maxMeasured);
          }
        }
      }
    }
  }
  const total = samples.length;
  const series = {overall: distribution(samples.map(sample => sample.ms))};
  for (const zoom of sampling.zooms) {
    for (const columns of sampling.columns) {
      series[`z${zoom}c${columns}`] = distribution(samples.filter(sample => sample.zoom === zoom && sample.columns === columns).map(sample => sample.ms));
    }
  }
  const byPan = Object.fromEntries(sampling.pans.map(pan => [`pan${pan}`, distribution(samples.filter(sample => sample.pan === pan).map(sample => sample.ms))]));
  const slowest = [...samples].sort((a, b) => b.ms - a.ms).slice(0, OUTLIERS).map(sample => ({
    ms: round(sample.ms), offset: sample.offset, zoom: sample.zoom, pan: sample.pan, columns: sample.columns,
  }));
  const reads = counts(readsPerBuild);
  const lanes = counts(lanesPerModel);
  const over = Object.entries(series).filter(([, value]) => value.p95 !== null && value.p95 > NAVIGATION_TARGET_MS).map(([name]) => `${label}/${name}`);
  return {
    label,
    limits: {...limits},
    limitsLabel: 'bench-only: spread locally in qa/workbench/timeline-grouped-core.mjs from BENCH_ONLY_LIMITS, never written into src/',
    constructorArgs: 1,
    offered: {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length},
    retained,
    truncation: {
      truncated: retained.nodes < fixture.snapshots.length || retained.edges < fixture.relations.length,
      nodesNotRetained: fixture.snapshots.length - retained.nodes,
      edgesNotRetained: fixture.relations.length - retained.edges,
    },
    rows: head.total,
    samples: total,
    build: {...series, byPan},
    relationReads: {
      perBuild: reads,
      total: totalReads,
      rowsReturned: totalRows,
      buildsExceedingRows: readsOverRows,
      invariant: 'reads <= rows returned by window() on every build; buildsExceedingRows must be 0',
    },
    relationPages: {
      requestedLimit: MODEL_DEFAULTS.relationLimit,
      pages: totalReads,
      atRequestedLimit: pagesAtRequestedLimit,
      atRequestedLimitRate: rate(pagesAtRequestedLimit, totalReads),
      atMaxQuery: pagesAtMaxQuery,
      atMaxQueryRate: rate(pagesAtMaxQuery, totalReads),
      label: 'proxy: relations() reports no truncation, so a page of exactly the requested limit is the stand-in for a cut page',
      incoming: incomingCensus(projection, limits.maxQuery),
    },
    truncatedRates: {relations: rate(flagged.relations, total), window: rate(flagged.window, total), rows: rate(flagged.rows, total), lanes: rate(flagged.lanes, total)},
    notes: {histogram: notes, unknownCodes: unknownNotes, rates: Object.fromEntries(NOTE_VOCABULARY.map(code => [code, rate(notes[code], total)]))},
    lanesPerModel: lanes,
    rowsPerLaneMax: maxRowsPerLane,
    concurrencyMaxMeasured: maxConcurrency,
    spanCompleteRate: rate(spanComplete, total),
    outliers: slowest,
    over,
    pass: over.length === 0 && readsOverRows === 0,
  };
}

/** Receipt paths a complete receipt must carry (C2). */
const REQUIRED_FIELDS = Object.freeze([
  'contract', 'benchmark', 'measured', 'utc', 'revision', 'node', 'arch', 'platform', 'cpus', 'cpuModel', 'toolchain', 'command',
  'overrides', 'scopeLabel', 'fixture', 'sampling', 'sampling.limit', 'sampling.zooms', 'sampling.pans', 'sampling.columns', 'sampling.defaults',
  'passes', 'passes.maxQuery-40', 'passes.maxQuery-100',
]);
const REQUIRED_PASS_FIELDS = Object.freeze([
  'limits', 'samples', 'build', 'build.overall', 'relationReads', 'relationReads.perBuild', 'relationReads.buildsExceedingRows',
  'relationPages', 'relationPages.atRequestedLimitRate', 'relationPages.atMaxQueryRate', 'relationPages.incoming', 'truncatedRates', 'truncatedRates.relations',
  'truncatedRates.window', 'truncatedRates.rows', 'truncatedRates.lanes', 'notes', 'notes.histogram', 'lanesPerModel', 'rowsPerLaneMax',
  'concurrencyMaxMeasured', 'spanCompleteRate', 'outliers', 'pass', 'retained', 'offered',
]);
const FIXTURE_FIELDS = Object.freeze(['seed', 'nodes', 'depth', 'ticks', 'realised']);
const hasPath = (value, path) => {
  let at = value;
  for (const part of path.split('.')) {
    if (at === null || typeof at !== 'object') return false;
    // A pass label such as maxQuery-40 contains no dot, so a split on '.' is exact.
    if (!(part in at) || at[part] === undefined) return false;
    at = at[part];
  }
  return true;
};

/**
 * Recomputes completeness, realisation and the target judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (a missing field, fixture shape not realised, a truncated pass, or fewer than 1,000
 * samples). Exit 1: complete and realised, but a judged p95 is over 20 ms or a build read more relations than the
 * window returned: a finding. A receipt whose own pass flag contradicts its measurements is listed under
 * `inconsistencies`; the exit code follows the measurements, never the flag.
 */
export function assessTimelineReceipt(receipt) {
  const violations = [];
  for (const path of REQUIRED_FIELDS) if (!hasPath(receipt, path)) violations.push({rule: 'receipt-field-missing', detail: path});
  for (const field of FIXTURE_FIELDS) if (!hasPath(receipt, `fixture.${field}`)) violations.push({rule: 'receipt-field-missing', detail: `fixture.${field}`});
  const passes = receipt.passes ?? {};
  for (const label of Object.keys(PASS_LIMITS)) {
    const pass = passes[label];
    if (!pass) continue;
    for (const path of REQUIRED_PASS_FIELDS) if (!hasPath(pass, path)) violations.push({rule: 'receipt-field-missing', detail: `passes.${label}.${path}`});
  }
  if (violations.length === 0) {
    violations.push(...assessFixtureShape(receipt.fixture).violations);
    for (const [label, pass] of Object.entries(passes)) {
      if (pass.samples < MIN_SAMPLES_PER_PASS) {
        violations.push({rule: 'samples-below-1000', detail: `${label}: ${pass.samples} samples; W21 needs >= ${MIN_SAMPLES_PER_PASS}`});
      }
      if (pass.retained.nodes < pass.offered.nodes || pass.retained.edges < pass.offered.edges) {
        violations.push({
          rule: 'pass-truncated',
          detail: `${label}: retained ${pass.retained.nodes}/${pass.offered.nodes} nodes and ${pass.retained.edges}/${pass.offered.edges} edges`,
        });
      }
      for (const [name, value] of Object.entries(pass.build)) {
        if (name === 'byPan') continue;
        if (!value || value.samples === 0 || value.p95 === null) violations.push({rule: 'series-not-sampled', detail: `${label}/${name} has no samples`});
      }
    }
  }
  const over = [];
  const readViolations = [];
  const inconsistencies = [];
  if (violations.length === 0) {
    for (const [label, pass] of Object.entries(passes)) {
      const passOver = Object.entries(pass.build)
        .filter(([name, value]) => name !== 'byPan' && value.p95 > NAVIGATION_TARGET_MS)
        .map(([name]) => `${label}/${name}`);
      over.push(...passOver);
      if (pass.relationReads.buildsExceedingRows > 0) readViolations.push(label);
      const recomputed = passOver.length === 0 && pass.relationReads.buildsExceedingRows === 0;
      if (pass.pass !== recomputed) inconsistencies.push({rule: 'pass-flag-contradicts-measurement', detail: `${label}: pass=${String(pass.pass)} but the measurements say ${String(recomputed)}`});
    }
  }
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 || readViolations.length > 0 ? 1 : 0;
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', passes: Object.keys(PASS_LIMITS), over, readsExceedingRows: readViolations},
    realised,
    violations,
    inconsistencies,
    verdict: exitCode === 2 ? 'not-w21-shape' : exitCode === 1 ? (over.length > 0 ? 'over-target' : 'reads-exceed-rows') : 'within-target',
    exitCode,
  };
}

export const timelineExitCodeFor = receipt => assessTimelineReceipt(receipt).exitCode;

/**
 * Both passes over one fixture, as one receipt. `Projection` is the ObservationProjection class and
 * `buildTimelineLanes` the lane-model builder under test; `host` carries utc, revision, node, arch, platform, cpus,
 * cpuModel, toolchain, command and overrides (the W21_* environment overrides in force).
 */
export function runTimelineBench({Projection, buildTimelineLanes, fixture, host, sampling = DEFAULT_TIMELINE_SAMPLING}) {
  const plan = {...DEFAULT_TIMELINE_SAMPLING, ...sampling};
  const passes = Object.fromEntries(
    Object.entries(PASS_LIMITS).map(([label, limits]) => [label, measurePass({label, Projection, buildTimelineLanes, fixture, limits, sampling: plan})]),
  );
  const base = {
    contract: TIMELINE_RECEIPT_CONTRACT,
    benchmark: TIMELINE_BENCHMARK,
    measured: true,
    scopeLabel: 'pure lane-model build cost: buildTimelineLanes only; no layoutInspector call, no terminal bytes, no redraw claim',
    productionCaps: 'unchanged: bench-only limits live in qa/ and are spread locally; nothing is written into src/',
    comparisonLabel: 'comparison degenerate at relationLimit 40: timeline.ts requests 40 so both passes issue identical reader calls; the grouped-10k fixture never fills a relation page (incoming maxObserved 4) and every truncation rate is 0 at both caps',
    spanCompleteLabel: 'span.complete rate 0: every 100-row window holds an open or missing interval',
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    overrides: {...(host.overrides ?? {})},
    fixture: {...fixture.shape, providers: {...fixture.shape.providers}, realised: assessFixtureShape(fixture.shape).realised},
    sampling: {
      limit: plan.limit, zooms: [...plan.zooms], pans: [...plan.pans], columns: [...plan.columns], rounds: plan.rounds,
      defaults: {...MODEL_DEFAULTS}, warmupSamples: 0,
      orderNote: 'passes run sequentially in one process in the order of passes; no sample is discarded, so the first pass carries the cold JIT cost and an early-pass difference is not a maxQuery effect', timedRegion: 'one buildTimelineLanes call, bracketed by performance.now()',
    },
    passes,
  };
  const assessment = assessTimelineReceipt(base);
  return {...base, pass: Object.values(passes).every(pass => pass.pass), ...assessment};
}
