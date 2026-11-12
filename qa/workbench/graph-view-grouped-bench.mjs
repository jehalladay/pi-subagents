// W21-H (wb-9x5.10): graph-view model build receipt over the grouped-10k fixture, over the compiled dist/.
//
// Run after `npm run build`, outside the default gate: `forge run graph-view-grouped-bench`, or
// `node qa/workbench/graph-view-grouped-bench.mjs`. It times the graph view model of src/workbench/graph-view.ts (wb-6ze.32)
// through its two landed entry points: buildGraphView, one uncached build, and createGraphViewBuilder, the builder holding the
// topology-revision cache that the inspector dialog keeps per open view (src/ui/workflow-menu.ts graphViewModel, wb-6ze.37).
//
// BENCH RULES (wb-9x5.4 binds every W21 bench; stated here BEFORE any measurement):
//   - Bench-only limits. Pass "maxQuery-40" uses BENCH_ONLY_LIMITS from qa/workbench/grouped-fixture.mjs exactly as defined
//     there; pass "maxQuery-100" spreads {...BENCH_ONLY_LIMITS, maxQuery: 100} LOCALLY, here only. Every request asks relation
//     pages of the pass's maxQuery (caps.relationLimit) and as many rows as its viewport (caps.maxNodes); maxFanOut and
//     maxReferences stay at the module defaults (MODEL_DEFAULTS, pinned against graph-view.ts by the test). No production cap or
//     default moves (observation.ts MAX_DEFAULT, the graph-view.ts caps): the test pins them by reading the source. This file
//     never edits src/ or the shared fixture module and forks no second fixture.
//   - Two request shapes over viewports of 30 and 100 rows. "focus": a focus row and its direct neighbours, six focus rows
//     spread over each viewport at window pages of 100 rows (the per-focus sampling the bead names). "page": the whole viewport
//     with no focus, at a window offset every 20 rows: the request shape the inspector dialog issues (it sends no focus; focus
//     and filter narrow the drawing in the renderer, not the request).
//   - Three regimes per request. "cold": one buildGraphView call, so a fresh cache. "cache-hit": a createGraphViewBuilder warmed
//     by one untimed build of the same request, then its timed build of that request at the same topology revision.
//     "neighborhood-change": a second sweep that runs after every cold and cache-hit sample of the pass: a fresh builder warmed
//     by one untimed build, then ONE new observed dependency edge (from the focus, or the first viewport row, to the next row,
//     under a provenance source unique to the sample) moves the topology revision, then its timed rebuild of the same request.
//     The edges this sweep adds stay, so later samples of the sweep see the earlier ones; the cold and cache-hit samples ran
//     before any was added.
//   - The timed region is exactly one call, bracketed by performance.now(). Every build reads through one counting reader over
//     the pass's projection (window, relationsPage and relationRevision only); its relationsPage counter is part of the measured
//     cost and is read after the clock stops, as are the model counts (supernodes, references, partial labels).
//   - Nothing in the measured path reads the host wall clock or an unseeded random source; the added edges carry the fixture
//     epoch as their observation time.
//
// ONE JSON receipt line (contract workbench.graph-view-grouped-bench/v1) is printed, and written to $W21_GRAPH_RECEIPT when
// set, BEFORE the exit code is set:
//   0  the W21 shape was measured and every judged p95 is <= 20 ms, with no cache-hit build reading a relation page and no
//      builder report of relation reads that differs from the counted reads
//   1  the W21 shape was measured but a judged p95 is over 20 ms, a cache-hit build read a relation page, or a builder's report
//      disagrees with the counted reads: a finding, recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape not realised, fewer than 1,000 samples in a regime of a shape, a pass
//      that did not retain the whole fixture, an unsampled series, a neighborhood change that did not move the topology)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs (wb-oq3);
// $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES, $W21_DEPTH and
// $W21_TICKS override the fixture; any override below the W21 shape is still measured and exits 2.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  FIXTURE_EPOCH_MS,
  GROUPED_FIXTURE_DEFAULTS,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  SCOPE,
} from './grouped-fixture.mjs';

export const GRAPH_VIEW_RECEIPT_CONTRACT = 'workbench.graph-view-grouped-bench/v1';
export const GRAPH_VIEW_BENCHMARK = 'graph-view-grouped-10k';
/** The W21 floor: at least this many timed samples in every regime of every request shape of every pass. */
export const MIN_SAMPLES = 1_000;
export const REGIMES = Object.freeze(['cold', 'cache-hit', 'neighborhood-change']);
export const SHAPES = Object.freeze(['focus', 'page']);
/** The second pass raises only the projection's query cap, locally. BENCH_ONLY_LIMITS itself is never edited. */
export const PASS_LIMITS = Object.freeze({
  'maxQuery-40': BENCH_ONLY_LIMITS,
  'maxQuery-100': Object.freeze({...BENCH_ONLY_LIMITS, maxQuery: 100}),
});
export const DEFAULT_GRAPH_SAMPLING = Object.freeze({viewports: Object.freeze([30, 100]), focusPage: 100, focusesPerViewport: 6, pageStep: 20});
/** The graph-view.ts request defaults left in force (DEFAULT_FAN_OUT, DEFAULT_REFERENCES); the test pins them to the source. */
export const MODEL_DEFAULTS = Object.freeze({maxFanOut: 8, maxReferences: 50});
/** The one edge a neighborhood-change sample adds: a dependency (no nesting), under a source unique to the sample. */
export const CHANGE_EDGE = Object.freeze({kind: 'dependency', sourcePrefix: 'w21-graph-view-bench'});
const PARTIAL_SCOPES = Object.freeze(['window', 'relations', 'references']);
const OUTLIERS = 5;
const EDGE_OBSERVED_AT = new Date(FIXTURE_EPOCH_MS).toISOString();
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
/** p50 and max of a count series; an empty series has nulls. */
function counts(values) {
  if (values.length === 0) return {p50: null, max: null};
  const sorted = Float64Array.from(values).sort();
  return {p50: sorted[Math.floor(sorted.length * 0.5)], max: sorted[sorted.length - 1]};
}

function applyFixture(projection, fixture) {
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  for (const update of fixture.updates) projection.ingest(update);
}

/** A reader exposing exactly what the graph view may use (its GraphReader), counting relation pages. */
function countingReader(projection) {
  const state = {pages: 0};
  const reader = {
    window: input => projection.window(input),
    relationsPage: input => {
      state.pages++;
      return projection.relationsPage(input);
    },
    relationRevision: () => projection.relationRevision(),
  };
  return {reader, state};
}

/**
 * The samples of one pass, read from the projection's own window pages (no key is synthesized). Each sample names its
 * request and the edge its neighborhood-change sample adds: from the focus (or the first viewport row) to the next row.
 */
function planSamples(projection, sampling) {
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  const samples = [];
  const sampleAt = (shape, offset, limit, position) => {
    const page = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit});
    const rows = page.nodes;
    if (rows.length === 0) return;
    const from = rows[position];
    const to = rows[(position + 1) % rows.length];
    samples.push({shape, offset, limit, position, focus: shape === 'focus' ? from.key : undefined, fromKey: from.key, fromRef: from.nativeRef, toRef: to.nativeRef});
  };
  for (let offset = 0; offset < head.total; offset += sampling.focusPage) {
    for (const limit of sampling.viewports) {
      const rows = Math.min(limit, head.total - offset);
      const positions = new Set();
      for (let i = 0; i < sampling.focusesPerViewport; i++) positions.add(Math.floor(((i + 0.5) * rows) / sampling.focusesPerViewport));
      for (const position of positions) sampleAt('focus', offset, limit, position);
    }
  }
  for (let offset = 0; offset < head.total; offset += sampling.pageStep) {
    for (const limit of sampling.viewports) sampleAt('page', offset, limit, 0);
  }
  return {rows: head.total, samples};
}

const requestOf = (sample, relationLimit) => ({
  scope: SCOPE,
  invocationId: INVOCATION_ID,
  viewport: {offset: sample.offset, limit: sample.limit},
  caps: {maxNodes: sample.limit, relationLimit},
  ...(sample.focus === undefined ? {} : {focus: sample.focus}),
});

/** One timed sample: the measured call's span, its counted relation pages, the builder's own report and the model's counts. */
function recordOf(sample, ms, reads, model, report, changedId) {
  return {
    ms, reads, shape: sample.shape, offset: sample.offset, limit: sample.limit, position: sample.position,
    reported: report?.relationReads, cacheHit: report?.cacheHit,
    recomputedChanged: changedId === undefined ? undefined : (report?.recomputed ?? []).includes(changedId),
    supernodes: model.supernodes.length,
    references: model.references.length,
    partials: model.partials.length,
    partialScopes: new Set(model.partials.map(partial => partial.scope)),
    complete: model.complete,
    contract: model.contract,
  };
}

function summarise(records, sampling) {
  const build = {overall: distribution(records.map(record => record.ms))};
  for (const shape of SHAPES) {
    build[shape] = distribution(records.filter(record => record.shape === shape).map(record => record.ms));
    for (const limit of sampling.viewports) {
      build[`${shape}-v${limit}`] = distribution(records.filter(record => record.shape === shape && record.limit === limit).map(record => record.ms));
    }
  }
  const total = records.length;
  return {
    samples: total,
    samplesByShape: Object.fromEntries(SHAPES.map(shape => [shape, records.filter(record => record.shape === shape).length])),
    build,
    relationReads: {
      perBuild: counts(records.map(record => record.reads)),
      total: records.reduce((sum, record) => sum + record.reads, 0),
      buildsAboveZero: records.filter(record => record.reads > 0).length,
      reportedMismatch: records.filter(record => record.reported !== undefined && record.reported !== record.reads).length,
    },
    supernodes: counts(records.map(record => record.supernodes)),
    references: counts(records.map(record => record.references)),
    partials: {
      perModel: counts(records.map(record => record.partials)),
      rates: {
        any: rate(records.filter(record => !record.complete).length, total),
        ...Object.fromEntries(PARTIAL_SCOPES.map(scope => [scope, rate(records.filter(record => record.partialScopes.has(scope)).length, total)])),
      },
    },
    outliers: [...records].sort((a, b) => b.ms - a.ms).slice(0, OUTLIERS).map(record => ({
      ms: round(record.ms), shape: record.shape, offset: record.offset, limit: record.limit, position: record.position, reads: record.reads,
    })),
  };
}

function measurePass({label, Projection, graphView, fixture, limits, sampling}) {
  const projection = new Projection(limits);
  applyFixture(projection, fixture);
  const retained = projection.stats();
  const {reader, state} = countingReader(projection);
  const plan = planSamples(projection, sampling);
  const relationLimit = limits.maxQuery;
  const timed = call => {
    state.pages = 0;
    const begin = clock();
    const model = call();
    const ms = clock() - begin;
    return {model, ms, reads: state.pages};
  };
  const cold = [];
  const hits = [];
  for (const sample of plan.samples) {
    const request = requestOf(sample, relationLimit);
    const coldRun = timed(() => graphView.buildGraphView(reader, request));
    cold.push(recordOf(sample, coldRun.ms, coldRun.reads, coldRun.model, undefined, undefined));
    const builder = graphView.createGraphViewBuilder(reader);
    builder.build(request);
    const hitRun = timed(() => builder.build(request));
    hits.push(recordOf(sample, hitRun.ms, hitRun.reads, hitRun.model, builder.lastBuild, undefined));
  }
  const changes = [];
  let applied = 0;
  let notApplied = 0;
  for (const [index, sample] of plan.samples.entries()) {
    const request = requestOf(sample, relationLimit);
    const builder = graphView.createGraphViewBuilder(reader);
    builder.build(request);
    const before = projection.relationRevision();
    projection.relate({
      scope: SCOPE, from: sample.fromRef, to: sample.toRef, kind: CHANGE_EDGE.kind,
      provenance: {source: `${CHANGE_EDGE.sourcePrefix}-${label}-${index}`, observedAt: EDGE_OBSERVED_AT},
    });
    if (projection.relationRevision() === before + 1) applied++;
    else notApplied++;
    const changeRun = timed(() => builder.build(request));
    changes.push(recordOf(sample, changeRun.ms, changeRun.reads, changeRun.model, builder.lastBuild, `out:${sample.fromKey}`));
  }
  const coldSummary = summarise(cold, sampling);
  const hitSummary = {...summarise(hits, sampling), notReportedAsHit: hits.filter(record => record.cacheHit !== true).length};
  const changeSummary = {
    ...summarise(changes, sampling),
    change: {applied, notApplied, recomputedChanged: changes.filter(record => record.recomputedChanged === true).length},
  };
  const regimes = {cold: coldSummary, 'cache-hit': hitSummary, 'neighborhood-change': changeSummary};
  const over = Object.entries(regimes).flatMap(([regime, summary]) =>
    Object.entries(summary.build).filter(([, value]) => value.p95 !== null && value.p95 > NAVIGATION_TARGET_MS).map(([name]) => `${label}/${regime}/${name}`));
  const reportedMismatch = Object.values(regimes).reduce((sum, summary) => sum + summary.relationReads.reportedMismatch, 0);
  return {
    label,
    limits: {...limits},
    limitsLabel: 'bench-only: spread locally in qa/workbench/graph-view-grouped-bench.mjs from BENCH_ONLY_LIMITS, never written into src/',
    caps: {relationLimit, maxNodes: 'the viewport limit of each request', ...MODEL_DEFAULTS},
    constructorArgs: 1,
    offered: {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length},
    retained,
    truncation: {
      truncated: retained.nodes < fixture.snapshots.length || retained.edges < fixture.relations.length,
      nodesNotRetained: fixture.snapshots.length - retained.nodes,
      edgesNotRetained: fixture.relations.length - retained.edges,
    },
    rows: plan.rows,
    modelContracts: [...new Set([...cold, ...hits, ...changes].map(record => record.contract))],
    regimes,
    addedEdges: applied,
    reportedMismatch,
    over,
    pass: over.length === 0 && hitSummary.relationReads.buildsAboveZero === 0 && reportedMismatch === 0,
  };
}

/** Receipt paths a complete receipt must carry. A pass label or regime name contains no dot, so a split on '.' is exact. */
const REQUIRED_FIELDS = Object.freeze([
  'contract', 'benchmark', 'measured', 'utc', 'revision', 'node', 'arch', 'platform', 'cpus', 'cpuModel', 'toolchain', 'command',
  'overrides', 'scopeLabel', 'fixture', 'sampling', 'sampling.viewports', 'sampling.focusPage', 'sampling.focusesPerViewport',
  'sampling.pageStep', 'passes', 'passes.maxQuery-40', 'passes.maxQuery-100',
]);
const REQUIRED_REGIME_FIELDS = Object.freeze([
  'samples', 'samplesByShape', 'build', 'build.overall', 'relationReads', 'relationReads.perBuild', 'relationReads.buildsAboveZero',
  'relationReads.reportedMismatch', 'supernodes', 'references', 'references.max', 'partials', 'partials.rates', 'outliers',
]);
const REQUIRED_PASS_FIELDS = Object.freeze([
  'limits', 'offered', 'retained', 'rows', 'regimes', 'regimes.cache-hit.notReportedAsHit', 'regimes.neighborhood-change.change',
  'regimes.neighborhood-change.change.notApplied', 'pass',
  ...REGIMES.flatMap(regime => REQUIRED_REGIME_FIELDS.map(field => `regimes.${regime}.${field}`)),
]);
const FIXTURE_FIELDS = Object.freeze(['seed', 'nodes', 'depth', 'ticks', 'realised']);
const hasPath = (value, path) => {
  let at = value;
  for (const part of path.split('.')) {
    if (at === null || typeof at !== 'object') return false;
    if (!(part in at) || at[part] === undefined) return false;
    at = at[part];
  }
  return true;
};

/**
 * Recomputes completeness, realisation and the judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (a missing field, the fixture shape not realised, a truncated pass, fewer than 1,000 samples in a
 * regime of a shape, an unsampled series, a neighborhood change that did not move the topology). Exit 1: complete and realised,
 * but a judged p95 is over 20 ms, a cache-hit build read a relation page, or a builder's relationReads report differs from the
 * counted reads: a finding. A receipt whose own pass flag contradicts its measurements is listed under `contradictions`; the
 * exit code follows the measurements, never the flag.
 */
export function assessGraphViewReceipt(receipt) {
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
      if (pass.retained.nodes < pass.offered.nodes || pass.retained.edges < pass.offered.edges) {
        violations.push({
          rule: 'pass-truncated',
          detail: `${label}: retained ${pass.retained.nodes}/${pass.offered.nodes} nodes and ${pass.retained.edges}/${pass.offered.edges} edges`,
        });
      }
      for (const regime of REGIMES) {
        const summary = pass.regimes[regime];
        for (const shape of SHAPES) {
          const samples = summary.samplesByShape[shape] ?? 0;
          if (samples < MIN_SAMPLES) violations.push({rule: 'samples-below-1000', detail: `${label}/${regime}/${shape}: ${samples} samples; W21 needs >= ${MIN_SAMPLES}`});
        }
        for (const [name, value] of Object.entries(summary.build)) {
          if (!value || value.samples === 0 || value.p95 === null) violations.push({rule: 'series-not-sampled', detail: `${label}/${regime}/${name} has no samples`});
        }
      }
      const {notApplied} = pass.regimes['neighborhood-change'].change;
      if (notApplied > 0) violations.push({rule: 'neighborhood-change-not-applied', detail: `${label}: ${notApplied} added edges did not move the topology revision`});
    }
  }
  const over = [];
  const cacheHitReads = [];
  const reportMismatches = [];
  const contradictions = [];
  if (violations.length === 0) {
    for (const [label, pass] of Object.entries(passes)) {
      const passOver = [];
      for (const regime of REGIMES) {
        for (const [name, value] of Object.entries(pass.regimes[regime].build)) if (value.p95 > NAVIGATION_TARGET_MS) passOver.push(`${label}/${regime}/${name}`);
      }
      over.push(...passOver);
      const hitReads = pass.regimes['cache-hit'].relationReads.buildsAboveZero;
      if (hitReads > 0) cacheHitReads.push(`${label}: ${hitReads} cache-hit builds read a relation page`);
      const mismatched = REGIMES.reduce((sum, regime) => sum + pass.regimes[regime].relationReads.reportedMismatch, 0);
      if (mismatched > 0) reportMismatches.push(`${label}: ${mismatched} builds report relation reads that differ from the counted reads`);
      const recomputed = passOver.length === 0 && hitReads === 0 && mismatched === 0;
      if (pass.pass !== recomputed) contradictions.push({rule: 'pass-flag-contradicts-measurement', detail: `${label}: pass=${String(pass.pass)} but the measurements say ${String(recomputed)}`});
    }
  }
  const realised = violations.length === 0;
  const findings = over.length > 0 || cacheHitReads.length > 0 || reportMismatches.length > 0;
  const exitCode = !realised ? 2 : findings ? 1 : 0;
  const verdict = exitCode === 2
    ? 'not-w21-shape'
    : over.length > 0 ? 'over-target' : cacheHitReads.length > 0 ? 'cache-hit-reads' : reportMismatches.length > 0 ? 'report-mismatch' : 'within-target';
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', passes: Object.keys(PASS_LIMITS), regimes: [...REGIMES], over, cacheHitReads, reportMismatches},
    realised,
    violations,
    contradictions,
    verdict,
    exitCode,
  };
}

export const graphViewExitCodeFor = receipt => assessGraphViewReceipt(receipt).exitCode;

/**
 * Both passes over one fixture, as one receipt. `Projection` is the ObservationProjection class; `graphView` carries the graph
 * view's buildGraphView and createGraphViewBuilder; `host` carries utc, revision, node, arch, platform, cpus, cpuModel,
 * toolchain, command and overrides (the W21_* environment overrides in force).
 */
export function runGraphViewBench({Projection, graphView, fixture, host, sampling = DEFAULT_GRAPH_SAMPLING}) {
  const plan = {...DEFAULT_GRAPH_SAMPLING, ...sampling};
  const passes = Object.fromEntries(
    Object.entries(PASS_LIMITS).map(([label, limits]) => [label, measurePass({label, Projection, graphView, fixture, limits, sampling: plan})]),
  );
  const base = {
    contract: GRAPH_VIEW_RECEIPT_CONTRACT,
    benchmark: GRAPH_VIEW_BENCHMARK,
    measured: true,
    scopeLabel: 'pure graph-view model build cost: buildGraphView (cold) and createGraphViewBuilder (cache hit, single-neighborhood change); no layoutInspector call, no terminal bytes, no redraw claim',
    productionCaps: 'unchanged: bench-only limits live in qa/ and are spread locally; nothing is written into src/',
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
      viewports: [...plan.viewports], focusPage: plan.focusPage, focusesPerViewport: plan.focusesPerViewport, pageStep: plan.pageStep,
      regimes: [...REGIMES], shapes: [...SHAPES], minSamples: MIN_SAMPLES, defaults: {...MODEL_DEFAULTS}, changeEdge: {...CHANGE_EDGE}, warmupSamples: 0,
      timedRegion: 'one buildGraphView or builder.build call, bracketed by performance.now()',
      orderNote: 'passes run sequentially in one process; per pass every cold and cache-hit sample runs first, then the neighborhood-change sweep adds one edge per sample and keeps it; no sample is discarded, so the first pass carries the cold JIT cost',
    },
    passes,
  };
  const assessment = assessGraphViewReceipt(base);
  return {...base, pass: Object.values(passes).every(pass => pass.pass), ...assessment};
}

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

async function main() {
  let receipt;
  try {
    const {ObservationProjection} = await import('../../dist/workbench/observation.js');
    const {buildGraphView, createGraphViewBuilder} = await import('../../dist/workbench/graph-view.js');
    const fixture = buildGroupedFixture({
      seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
      nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
      depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
      ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
    });
    const processors = cpus();
    const stamp = benchRevision();
    receipt = withBenchRevision(runGraphViewBench({
      Projection: ObservationProjection,
      graphView: {buildGraphView, createGraphViewBuilder},
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
        command: 'node qa/workbench/graph-view-grouped-bench.mjs',
        overrides: Object.fromEntries(OVERRIDES.filter(name => process.env[name] !== undefined && process.env[name] !== '').map(name => [name, process.env[name]])),
      },
    }), stamp);
  } catch (error) {
    console.error(JSON.stringify({benchmark: GRAPH_VIEW_BENCHMARK, measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  if (process.env.W21_GRAPH_RECEIPT) writeFileSync(process.env.W21_GRAPH_RECEIPT, `${JSON.stringify(receipt)}\n`);
  console.log(JSON.stringify(receipt));
  process.exitCode = graphViewExitCodeFor(receipt);
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
