// W21-I (wb-9x5.11): grouped-10k four-view layoutInspector navigation and resize layout-time receipt, as a pure measurement module.
//
// This file imports only the W21 fixture module (qa/workbench/grouped-fixture.mjs, reused, never forked). The projection class,
// the inspector functions, createGraphViewBuilder and buildTimelineLanes are ARGUMENTS: test/workbench-inspector-four-view-
// layout-bench.test.ts hands in the TypeScript sources and qa/workbench/inspector-four-view-layout-bench.mjs hands in the
// compiled dist/ build; neither path is named here, so this module loads without a build, the way grouped-fixture.mjs does.
//
// Measured: layoutInspector, the WHOLE timed region of every sample, bracketed by performance.now() and nothing else inside it.
// Every layoutInspector call this module makes is a timed sample, in sample order: view switches, selection moves, scroll steps,
// resizes. Views: overview, graph, timeline and details (docs/workbench/10 "evidence/details"). Sizes: 80x24 and 120x40 with the
// docs/10 pane tiers opted in (two panes and three panes). Every view draws its landed host branch: createHostModel mirrors the
// read sides src/ui/workflow-menu.ts hands one open dialog (graphViewModel, timelineLanes, attentionReport, selectedNodeTopology,
// each with its held cache) and WorkflowDialog.render's per-view composition (only the overview gets the attention report, only
// the graph view the graph model, only the timeline view its lanes; the details view's topology slice is a model function the
// layout itself calls, so it runs inside the clock as it does in the host). The graph, timeline and attention models are built
// OUTSIDE the clock, at the host's read caps (HOST_READ_CAPS, pinned against src/index.ts by the test) and against a fixed
// attention clock: the fixture's last tick, computed from FIXTURE_EPOCH_MS, never a wall-clock read.
// Every projection read of a navigation (the view model and the layout) is counted, so a full fold over the retained rows is a
// falsifier. Measurement-only: BENCH_ONLY_LIMITS reach only this qa projection; a slow or folding result is recorded honestly
// (exit 1), never tuned away.
import {assessFixtureShape, BENCH_ONLY_LIMITS, FIXTURE_EPOCH_MS, INVOCATION_ID, NAVIGATION_TARGET_MS, SCOPE} from './grouped-fixture.mjs';

export const RECEIPT_CONTRACT = 'workbench.inspector-four-view-layout-bench/v1';
export const BENCHMARK = 'inspector-four-view-layout-grouped-10k';
export const VIEWS = Object.freeze(['overview', 'graph', 'timeline', 'details']);
export const ACTIONS = Object.freeze(['view-switch', 'selection-move', 'scroll-step', 'resize']);
export const SIZES = Object.freeze([
  Object.freeze({label: '80x24', width: 80, rows: 24, panes: true, tier: 'two-pane'}),
  Object.freeze({label: '120x40', width: 120, rows: 40, panes: true, tier: 'three-pane'}),
]);
/** The read caps src/index.ts hands the host seam: WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_TIMELINE_COLUMNS, WORKBENCH_ATTENTION_BOTTLENECKS. */
export const HOST_READ_CAPS = Object.freeze({relationPage: 40, timelineColumns: 24, attentionBottlenecks: 5});
export const MIN_SAMPLES_PER_ACTION = 1_000;
export const DEFAULT_SAMPLING = Object.freeze({viewSwitches: 1_000, selectionMoves: 1_000, scrollSteps: 1_000, resizes: 1_000});
/** Timed samples per placement run: one run is one start position, one view and (except resize) one size. */
export const RUN_LENGTH = Object.freeze({'view-switch': VIEWS.length, 'selection-move': 8, 'scroll-step': 10, resize: 10});
const SAMPLING_KEYS = Object.freeze({'view-switch': 'viewSwitches', 'selection-move': 'selectionMoves', 'scroll-step': 'scrollSteps', resize: 'resizes'});
const FOCUS_LINE = ' Focused on selected node and confirmed direct relations only';
const OUTLIERS = 5;
const clock = () => performance.now();
const round = value => Math.round(value * 10_000) / 10_000;

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

/**
 * The projection every navigation reads, counting what it reads: window() rows are node rows (the full-fold measure),
 * relations()/relationsPage() rows are counted apart. Values pass through unchanged.
 */
function countingProjection(projection) {
  const state = {windowCalls: 0, windowRows: 0, maxWindowLimit: 0, relationCalls: 0, relationRows: 0};
  const reader = Object.create(projection);
  reader.window = input => {
    const page = projection.window(input);
    state.windowCalls++;
    state.windowRows += page.nodes.length;
    state.maxWindowLimit = Math.max(state.maxWindowLimit, input.limit);
    return page;
  };
  reader.relations = input => {
    const rows = projection.relations(input);
    state.relationCalls++;
    state.relationRows += rows.length;
    return rows;
  };
  reader.relationsPage = input => {
    const page = projection.relationsPage(input);
    state.relationCalls++;
    state.relationRows += page.relations.length;
    return page;
  };
  return {reader, state, reset: () => Object.assign(state, {windowCalls: 0, windowRows: 0, maxWindowLimit: 0, relationCalls: 0, relationRows: 0})};
}

/** The attention clock of a fixture: its last tick (one fixed-epoch second per tick), never a wall-clock read. */
export const attentionNowOf = fixture => new Date(FIXTURE_EPOCH_MS + fixture.shape.ticks * 1_000).toISOString();

/**
 * One open dialog's inspector model per redraw over `reader`, mirrored from src/ui/workflow-menu.ts (the read sides with their
 * held caches) and WorkflowDialog.render (the per-view composition). `base` carries title and status; `now` is the attention clock.
 */
export function createHostModel({reader, readSides, base, now}) {
  const {createGraphViewBuilder, buildTimelineLanes, selectAttention, selectLinkedTopology, CapabilityError} = readSides;
  const page = HOST_READ_CAPS.relationPage;
  const scope = SCOPE;
  const invocationId = INVOCATION_ID;
  const builder = createGraphViewBuilder(reader);
  let heldLanes;
  let heldAttention;
  let heldTopology;
  const topology = node => {
    const revision = reader.relationRevision();
    if (heldTopology?.key === node.key && heldTopology.revision === revision) return heldTopology.slice;
    let slice;
    try {
      slice = selectLinkedTopology({scope, relations: reader}, node.key, {relationPage: page});
    } catch (error) {
      if (!(error instanceof CapabilityError)) throw error;
    }
    heldTopology = {key: node.key, revision, slice};
    return slice;
  };
  const observation = {projection: reader, scope, invocationId, title: base.title, status: base.status, topology};
  const current = state => {
    // The row the inspector draws as current: the selected key's row, else the cursor, clamped to the rows that exist.
    const wanted = (state.selected ? reader.indexOf({scope, invocationId, key: state.selected}) : undefined) ?? state.index;
    const probe = reader.window({scope, invocationId, offset: wanted - (wanted % page), limit: page});
    return {at: Math.min(wanted, Math.max(0, probe.total - 1)), revision: probe.revision};
  };
  const lanes = state => {
    const {at, revision} = current(state);
    const request = {scope, invocationId, offset: at - (at % page), limit: page, zoom: state.zoom, pan: state.pan, columns: HOST_READ_CAPS.timelineColumns, relationLimit: page};
    const key = JSON.stringify([revision, reader.relationRevision(), request]);
    if (heldLanes?.key !== key) heldLanes = {key, model: buildTimelineLanes(reader, request)};
    return heldLanes.model;
  };
  const attention = () => {
    const {revision} = reader.window({scope, invocationId, offset: 0, limit: 1});
    const key = JSON.stringify([revision, scope.workspace, scope.principal]);
    if (heldAttention?.key !== key) heldAttention = {key, report: selectAttention(reader, {scope, invocationId, now, limit: page, bottlenecks: HOST_READ_CAPS.attentionBottlenecks})};
    return heldAttention.report;
  };
  const graph = state => {
    const {at} = current(state);
    return builder.build({scope, invocationId, viewport: {offset: at - (at % page), limit: page}, caps: {maxNodes: page, relationLimit: page}});
  };
  return {
    observation,
    modelFor: state => {
      if (state.view === 'timeline') return {...observation, timeline: lanes(state)};
      if (state.view === 'overview') return {...observation, attention: attention()};
      if (state.view === 'graph') return {...observation, graph: graph(state)};
      return observation;
    },
  };
}

/** Rows a page step moves at `size`: the inspector's own body page, max(1, min(32, rows - 9)). */
const pageRows = size => Math.max(1, Math.min(32, size.rows - 9));
const positionOf = lines => {
  const match = / · (\d+)\/(\d+)$/u.exec(lines[1] ?? '');
  return match ? {index: Number(match[1]) - 1, total: Number(match[2])} : undefined;
};

function measure({Projection, inspector, readSides, fixture, sampling}) {
  const projection = new Projection(BENCH_ONLY_LIMITS);
  applyFixture(projection, fixture);
  const retained = projection.stats();
  const counting = countingProjection(projection);
  const reader = counting.reader;
  const host = createHostModel({reader, readSides, base: {title: 'W21 grouped fixture · ワークフロー', status: 'running'}, now: attentionNowOf(fixture)});
  const base = host.observation;
  const total = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1}).total;
  const keyAt = index => projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: index, limit: 1}).nodes[0]?.key ?? null;
  const placed = (index, view, focused = false) => {
    const key = keyAt(index);
    return {...inspector.initialInspectorState(), view, index, selected: key, focused: focused ? key : null, previousView: view};
  };
  const samples = [];
  const resize = {checked: 0, positionKept: 0, focusKept: 0, stateUnchanged: 0, focusedSamples: 0};
  /** One navigation: the view model and the layout read through the counting projection; only layoutInspector is timed. */
  const record = (action, state, size) => {
    counting.reset();
    const model = host.modelFor(state);
    const before = JSON.stringify(state);
    const begin = clock();
    const lines = inspector.layoutInspector(model, state, size);
    const ms = clock() - begin;
    samples.push({
      action, ms, view: state.view, size: size.label, index: state.index, lines: lines.length,
      windowRows: counting.state.windowRows, windowCalls: counting.state.windowCalls, maxWindowLimit: counting.state.maxWindowLimit,
      relationRows: counting.state.relationRows, relationCalls: counting.state.relationCalls,
    });
    return {lines, unchanged: JSON.stringify(state) === before};
  };
  const runsOf = action => Math.ceil(sampling[SAMPLING_KEYS[action]] / RUN_LENGTH[action]);
  /** Run r's start row, spread evenly over the viewport and leaving room for the run's own steps. */
  const startOf = (action, run, room) => Math.max(0, Math.min(Math.max(0, total - 1 - room), Math.floor(((run + 0.5) * total) / runsOf(action))));
  const remaining = action => sampling[SAMPLING_KEYS[action]] - samples.filter(sample => sample.action === action).length;

  // View switch: from a placed row, Tab through all four views (each Tab lands on the next view; the first lands on overview).
  for (let run = 0; remaining('view-switch') > 0; run++) {
    const size = SIZES[run % SIZES.length];
    let state = placed(startOf('view-switch', run, 0), 'details');
    for (let step = 0; step < RUN_LENGTH['view-switch'] && remaining('view-switch') > 0; step++) {
      state = inspector.reduceInspectorKey('\t', state, base)?.state ?? state;
      record('view-switch', state, size);
    }
  }
  // Selection move: from a placed row in one view, j moves the selection one row per press.
  for (let run = 0; remaining('selection-move') > 0; run++) {
    const size = SIZES[run % SIZES.length];
    let state = placed(startOf('selection-move', run, RUN_LENGTH['selection-move']), VIEWS[Math.floor(run / SIZES.length) % VIEWS.length]);
    for (let step = 0; step < RUN_LENGTH['selection-move'] && remaining('selection-move') > 0; step++) {
      state = inspector.reduceInspectorKey('j', state, base)?.state ?? state;
      record('selection-move', state, size);
    }
  }
  // Scroll step: the virtualized viewport advances one body page per step (no reducer key pages, so the state change is untimed).
  for (let run = 0; remaining('scroll-step') > 0; run++) {
    const size = SIZES[run % SIZES.length];
    const stride = pageRows(size);
    const view = VIEWS[Math.floor(run / SIZES.length) % VIEWS.length];
    const start = startOf('scroll-step', run, RUN_LENGTH['scroll-step'] * stride);
    for (let step = 0; step < RUN_LENGTH['scroll-step'] && remaining('scroll-step') > 0; step++) {
      record('scroll-step', placed(Math.min(total - 1, start + (step + 1) * stride), view), size);
    }
  }
  // Resize: one placed state per run, redrawn alternately at 80x24 and 120x40; runs cycle the four views, and every other cycle is
  // focused, so each view is reflowed both focused and unfocused. Each reflow is checked against the rendered frame (the i/N
  // position line, the focus line) and the state the layout was handed (never mutated).
  for (let run = 0; remaining('resize') > 0; run++) {
    const focused = Math.floor(run / VIEWS.length) % 2 === 1;
    const state = placed(startOf('resize', run, 0), VIEWS[run % VIEWS.length], focused);
    const at = state.selected === null ? undefined : projection.indexOf({scope: SCOPE, invocationId: INVOCATION_ID, key: state.selected});
    for (let step = 0; step < RUN_LENGTH.resize && remaining('resize') > 0; step++) {
      const {lines, unchanged} = record('resize', state, SIZES[step % SIZES.length]);
      const position = positionOf(lines);
      resize.checked++;
      if (focused) resize.focusedSamples++;
      if (position !== undefined && position.index === (at ?? state.index) && position.total === total) resize.positionKept++;
      if (lines.includes(FOCUS_LINE) === focused) resize.focusKept++;
      if (unchanged) resize.stateUnchanged++;
    }
  }
  return {retained, total, samples, resize, attentionNow: attentionNowOf(fixture)};
}

function seriesOf(samples) {
  return {
    layout: distribution(samples.map(sample => sample.ms)),
    byView: Object.fromEntries(VIEWS.map(view => [view, distribution(samples.filter(sample => sample.view === view).map(sample => sample.ms))])),
    bySize: Object.fromEntries(SIZES.map(size => [size.label, distribution(samples.filter(sample => sample.size === size.label).map(sample => sample.ms))])),
  };
}
function readsOf(samples, total) {
  return {
    windowRowsPerNavigation: counts(samples.map(sample => sample.windowRows)),
    windowCallsPerNavigation: counts(samples.map(sample => sample.windowCalls)),
    relationRowsPerNavigation: counts(samples.map(sample => sample.relationRows)),
    maxWindowLimit: Math.max(0, ...samples.map(sample => sample.maxWindowLimit)),
    fullFoldSamples: samples.filter(sample => sample.windowRows >= total).length,
    invariant: 'a navigation (view model plus layout) reads fewer window rows than the viewport retains; fullFoldSamples must be 0',
  };
}
const outliersOf = samples => [...samples].sort((a, b) => b.ms - a.ms).slice(0, OUTLIERS).map(sample => ({
  ms: round(sample.ms), action: sample.action, view: sample.view, size: sample.size, index: sample.index,
}));

/** Receipt paths a complete receipt must carry. */
const REQUIRED_FIELDS = Object.freeze([
  'contract', 'benchmark', 'measured', 'utc', 'revision', 'node', 'arch', 'platform', 'cpus', 'cpuModel', 'toolchain', 'command', 'overrides',
  'scopeLabel', 'fixture', 'offered', 'retained', 'sampling', 'hostReadCaps', 'attentionNow', 'actions', 'views', 'visibleRows', 'resizeState', 'outliers',
]);
const hasPath = (value, path) => {
  let at = value;
  for (const part of path.split('.')) {
    if (at === null || typeof at !== 'object' || !(part in at) || at[part] === undefined) return false;
    at = at[part];
  }
  return true;
};

/**
 * Recomputes completeness, realisation and every judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (a missing field, fixture shape not realised, the bench pass truncated, fewer than 1,000 samples in
 * an action, an unsampled action/view/size series). Exit 1: complete and realised, but a judged p95 is over 20 ms, a navigation
 * read a full fold of window rows, or a resize lost the selection position, the focus or the state: a finding. A receipt whose
 * pass flag disagrees with its measurements is listed under `passFlagMismatches`; the exit code follows the measurements.
 */
export function assessFourViewLayoutReceipt(receipt) {
  const violations = [];
  for (const path of REQUIRED_FIELDS) if (!hasPath(receipt, path)) violations.push({rule: 'receipt-field-missing', detail: path});
  for (const action of ACTIONS) {
    for (const path of ['layout', 'byView', 'bySize', 'reads', 'reads.fullFoldSamples']) {
      if (!hasPath(receipt.actions ?? {}, `${action}.${path}`)) violations.push({rule: 'receipt-field-missing', detail: `actions.${action}.${path}`});
    }
  }
  for (const view of VIEWS) {
    if (!hasPath(receipt.views ?? {}, view)) violations.push({rule: 'receipt-field-missing', detail: `views.${view}`});
    if (!hasPath(receipt.visibleRows ?? {}, `${view}.renderedRows`)) violations.push({rule: 'receipt-field-missing', detail: `visibleRows.${view}.renderedRows`});
  }
  if (violations.length === 0) {
    violations.push(...assessFixtureShape(receipt.fixture).violations);
    if (receipt.retained.nodes < receipt.offered.nodes || receipt.retained.edges < receipt.offered.edges) {
      violations.push({rule: 'bench-pass-truncated', detail: `retained ${receipt.retained.nodes}/${receipt.offered.nodes} nodes and ${receipt.retained.edges}/${receipt.offered.edges} edges`});
    }
    for (const action of ACTIONS) {
      const series = receipt.actions[action];
      if (series.layout.samples < MIN_SAMPLES_PER_ACTION) {
        violations.push({rule: 'samples-below-1000', detail: `${action}: ${series.layout.samples} samples; W21 needs >= ${MIN_SAMPLES_PER_ACTION}`});
      }
      for (const [group, names] of [['byView', VIEWS], ['bySize', SIZES.map(size => size.label)]]) {
        for (const name of names) {
          const value = series[group][name];
          if (!value || value.samples === 0 || value.p95 === null) violations.push({rule: 'series-not-sampled', detail: `${action}/${group}/${name} has no samples`});
        }
      }
    }
    if (receipt.resizeState.checked < MIN_SAMPLES_PER_ACTION) {
      violations.push({rule: 'resize-checks-below-1000', detail: `${receipt.resizeState.checked} reflows checked; W21 needs >= ${MIN_SAMPLES_PER_ACTION}`});
    }
  }
  const over = [];
  const fullFold = [];
  const resizeLost = [];
  const passFlagMismatches = [];
  if (violations.length === 0) {
    for (const action of ACTIONS) {
      const series = receipt.actions[action];
      if (series.layout.p95 > NAVIGATION_TARGET_MS) over.push(`${action}`);
      for (const view of VIEWS) if (series.byView[view].p95 > NAVIGATION_TARGET_MS) over.push(`${action}/${view}`);
      for (const size of SIZES) if (series.bySize[size.label].p95 > NAVIGATION_TARGET_MS) over.push(`${action}/${size.label}`);
      if (series.reads.fullFoldSamples > 0) fullFold.push(action);
    }
    for (const view of VIEWS) if (receipt.views[view].p95 > NAVIGATION_TARGET_MS) over.push(`view:${view}`);
    const resize = receipt.resizeState;
    for (const check of ['positionKept', 'focusKept', 'stateUnchanged']) if (resize[check] !== resize.checked) resizeLost.push(check);
  }
  const realised = violations.length === 0;
  const findings = over.length > 0 || fullFold.length > 0 || resizeLost.length > 0;
  const exitCode = !realised ? 2 : findings ? 1 : 0;
  if (realised && receipt.pass !== undefined && receipt.pass !== !findings) {
    passFlagMismatches.push({rule: 'pass-flag-disagrees-with-measurement', detail: `pass=${String(receipt.pass)} but the measurements say ${String(!findings)}`});
  }
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', judged: 'every action, action/view, action/size and view series', over, fullFold, resizeLost},
    realised,
    violations,
    passFlagMismatches,
    verdict: exitCode === 2 ? 'not-w21-shape' : resizeLost.length > 0 ? 'resize-state-lost' : fullFold.length > 0 ? 'full-fold' : over.length > 0 ? 'over-target' : 'within-target',
    exitCode,
  };
}

export const fourViewLayoutExitCodeFor = receipt => assessFourViewLayoutReceipt(receipt).exitCode;

/**
 * One bench pass over one fixture, as one receipt. `Projection` is the ObservationProjection class, `inspector` is
 * {initialInspectorState, layoutInspector, reduceInspectorKey}; `host` carries utc, revision, node, arch, platform, cpus,
 * cpuModel, toolchain, command and overrides (the W21_* environment overrides in force).
 */
export function runFourViewLayoutBench({Projection, inspector, readSides, fixture, host, sampling = DEFAULT_SAMPLING}) {
  const plan = {...DEFAULT_SAMPLING, ...sampling};
  const {retained, total, samples, resize, attentionNow} = measure({Projection, inspector, readSides, fixture, sampling: plan});
  const actions = Object.fromEntries(ACTIONS.map(action => {
    const own = samples.filter(sample => sample.action === action);
    return [action, {...seriesOf(own), reads: readsOf(own, total), outliers: outliersOf(own)}];
  }));
  const views = Object.fromEntries(VIEWS.map(view => [view, distribution(samples.filter(sample => sample.view === view).map(sample => sample.ms))]));
  const visibleRows = Object.fromEntries(VIEWS.map(view => {
    const own = samples.filter(sample => sample.view === view);
    return [view, {
      renderedRows: counts(own.map(sample => sample.lines)),
      windowRowsRead: counts(own.map(sample => sample.windowRows)),
      totalNodes: total,
    }];
  }));
  const base = {
    contract: RECEIPT_CONTRACT,
    benchmark: BENCHMARK,
    measured: true,
    scopeLabel: 'layoutInspector only, every sample one timed call: four views (details is the docs/10 evidence/details view), view switch, selection move, viewport scroll step and 80x24<->120x40 resize with the docs/10 pane tiers; the per-redraw graph, timeline and attention models are built outside the clock as the host builds them',
    notClaimed: [
      'the single-column host path: WorkflowDialog.render passes {width, rows} without the pane opt-in',
      'evidence-store rows: no evidence store is supplied and the grouped fixture carries no evidence references (wb-9x5.14 measures evidence retention)',
      'view-model build time (wb-9x5.7 timeline lanes, wb-9x5.10 graph model) and terminal bytes per update (wb-9x5.8)',
    ],
    productionCaps: 'unchanged: BENCH_ONLY_LIMITS reach only this qa projection; nothing is written into src/',
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
    offered: {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length},
    retained,
    limits: {...BENCH_ONLY_LIMITS},
    limitsLabel: 'bench-only: BENCH_ONLY_LIMITS from qa/workbench/grouped-fixture.mjs, never written into src/',
    hostReadCaps: {...HOST_READ_CAPS},
    attentionNow,
    hostModel: 'createHostModel mirrors src/ui/workflow-menu.ts graphViewModel, timelineLanes, attentionReport and selectedNodeTopology (held caches included) and WorkflowDialog.render; graph, timeline and attention models are built outside the clock, the topology slice inside it (the layout calls it)',
    sampling: {
      ...plan, runLength: {...RUN_LENGTH}, sizes: SIZES.map(size => ({...size})), warmupSamples: 0,
      timedRegion: 'one layoutInspector call, bracketed by performance.now()',
      scrollLabel: 'a scroll step advances the virtualized viewport one body page (max(1, min(32, rows - 9)) rows); no reducer key pages, so the state change is untimed',
      orderNote: 'actions run in the order of ACTIONS in one process; no sample is discarded, so the first action carries the cold JIT cost',
    },
    actions,
    views,
    visibleRows,
    resizeState: {...resize, label: 'per reflow: the header i/N position equals the selected row, the focus line is drawn exactly when focused, and the state handed to layoutInspector is unchanged'},
    outliers: outliersOf(samples),
  };
  const assessment = assessFourViewLayoutReceipt(base);
  return {...base, pass: assessment.exitCode === 0, ...assessment};
}
