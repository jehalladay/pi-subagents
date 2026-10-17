// W21-D (wb-9x5.6): cap-saturation receipt over the wb-9x5.2 grouped-10k fixture.
//
// Where qa/workbench/grouped-fixture.mjs measures a population that fits the bench-only limits, this
// module measures the regime the parent wb-9x5 note fences before any cap raise: the grouped-10k
// population OFFERED to a projection whose node cap is far below it. The questions are what happens to
// the overflow (it must be a counted remainder, never a silent drop), what the reducer and layout cost
// at and past the cap boundary, how many rows the terminal renders against how many nodes are retained,
// and whether memory follows the projection or the offered population.
//
// Measurement-only. Production caps are not touched: the "production-default" pass constructs the
// projection with no argument and reports the cap it measured. Every other pass passes a bench-only
// limits object defined once, in this file. A slow or unbounded result is recorded, never tuned away.
//
// The only import is the sibling fixture module, which loads nothing; the projection class and the
// inspector functions are arguments, so test/workbench-cap-saturation-receipt.test.ts hands in the
// TypeScript sources and qa/workbench/inspector-cap-saturation-bench.mjs hands in the compiled build.
import {
  applyFixture,
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  censusOf,
  distribution,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  navigate,
  SCOPE,
  SIZES,
} from './grouped-fixture.mjs';

export const CAP_RECEIPT_CONTRACT = 'workbench.inspector-cap-saturation/v1';
/** Production caps this receipt is measured against (parent wb-9x5 note: no cap raise without this evidence). */
export const PRODUCTION_CAPS = Object.freeze({projectionMaxNodes: 2_000, projectionMaxEdges: 4_000, runtimeNodeCalls: 1_000, runtimeAgents: 1_000});
/** Bench-only node caps; edges keep the production 1:2 ratio; events and query pages stay at the grouped bench's values. */
export const CAP_SERIES = Object.freeze([1_000, 2_000, 4_000, 8_000]);
export const BOUNDARY_CAPS = Object.freeze([1_000, 2_000]);
export const CONTROL_LIMITS = BENCH_ONLY_LIMITS;
export const CAP_SAMPLING = Object.freeze({blocks: 8, keypressesPerBlock: 100, resizeSamples: 40});
const EVENTS_AND_QUERY = Object.freeze({maxEvents: BENCH_ONLY_LIMITS.maxEvents, maxQuery: BENCH_ONLY_LIMITS.maxQuery});
/** Production event and query-page defaults of the projection, stated beside the bench-only values so the header is self-contained. */
const PRODUCTION_EVENTS_AND_QUERY = Object.freeze({maxEvents: 20_000, maxQuery: 100});
/** Owner ruling F3 (wb-9x5.6): the cross-pass memory series mixes bench-only event and query limits with production-sized node caps. */
export const MEMORY_COMPARABILITY = `non-comparable (bench-only limits ${EVENTS_AND_QUERY.maxEvents}/${EVENTS_AND_QUERY.maxQuery} vs production ${PRODUCTION_EVENTS_AND_QUERY.maxEvents.toLocaleString('en-US')}/${PRODUCTION_EVENTS_AND_QUERY.maxQuery})`;
const UNLABELED_OVERFLOW = 'unlabeled-product-overflow';
const VIEW_CYCLE = 4;
const OVERFLOW_WORDS = /trunc|overflow|evict|dropp|not retained|omitted|capped/i;
/** The two docs sections this receipt answers, quoted so the test can pin them against drift. */
export const DOC_QUOTES = Object.freeze({
  scalability: Object.freeze({
    doc: 'docs/workbench/10-terminal-inspector.md',
    section: 'Scalability targets (proposed, not measured)',
    quotes: Object.freeze([
      '10k+ grouped operations P2',
      'memory bounded by active projection rather than accumulating full prompt bodies',
      "don't declare targets met without measured runs",
    ]),
  }),
  performance: Object.freeze({
    doc: 'docs/workbench/14-qa-and-benchmarks.md',
    section: 'Performance benchmark',
    quotes: Object.freeze([
      'number of visible rendered rows vs total nodes',
      'report measured hardware/toolchain and outliers. No invented pass numbers.',
    ]),
  }),
});

const clock = () => performance.now();
const refKey = ref => JSON.stringify([ref.provider, ref.type, ref.scope ?? '', ref.id]);

/**
 * The pass plan: one entry per projection built. Boundary entries offer exactly cap nodes (at) and cap+1
 * (just-past) so an off-by-one eviction cannot hide; every other entry offers the whole fixture.
 */
export function passPlan() {
  const plan = [{id: 'production-default', role: 'production-default', cap: undefined, offered: 'all'}];
  for (const cap of BOUNDARY_CAPS) {
    plan.push({id: `cap-${cap}-at`, role: 'boundary-at', cap, offered: cap});
    plan.push({id: `cap-${cap}-just-past`, role: 'boundary-just-past', cap, offered: cap + 1});
    plan.push({id: `cap-${cap}-past`, role: 'cap-sweep', cap, offered: 'all'});
  }
  for (const cap of CAP_SERIES.filter(value => !BOUNDARY_CAPS.includes(value))) {
    plan.push({id: `cap-${cap}-past`, role: 'cap-sweep', cap, offered: 'all'});
  }
  plan.push({id: 'uncapped-control', role: 'control-uncapped', cap: CONTROL_LIMITS.maxNodes, offered: 'all'});
  return plan;
}

export const PASS_IDS = Object.freeze(passPlan().map(entry => entry.id));

function limitsFor(cap) {
  if (cap === undefined) return undefined;
  if (cap === CONTROL_LIMITS.maxNodes) return {...CONTROL_LIMITS};
  return {maxNodes: cap, maxEdges: cap * 2, ...EVENTS_AND_QUERY};
}

/** The first `count` snapshots (depth-first producer order) with only the relations and updates that stay inside them. */
function subsetOf(fixture, count) {
  if (count >= fixture.snapshots.length) return {snapshots: fixture.snapshots, relations: fixture.relations, updates: fixture.updates};
  const snapshots = fixture.snapshots.slice(0, count);
  const keys = new Set(snapshots.map(snapshot => refKey(snapshot.source)));
  return {
    snapshots,
    relations: fixture.relations.filter(item => keys.has(refKey(item.from)) && keys.has(refKey(item.to))),
    updates: fixture.updates.filter(update => keys.has(refKey(update.source))),
  };
}

function offeredOf(subset) {
  const groups = subset.snapshots.filter(snapshot => snapshot.node.type === 'group').length;
  return {nodes: subset.snapshots.length, groups, operations: subset.snapshots.length - groups, edges: subset.relations.length, updates: subset.updates.length};
}

/** What the terminal shows: rows per size from the opening frame, and whether any frame of any view names an overflow. */
function surfaceOf(projection, inspector, offered) {
  const model = {projection, scope: SCOPE, invocationId: INVOCATION_ID, title: 'W21 cap saturation', status: 'running'};
  const rowsBySize = {};
  let labelled = false;
  let namesOffered = false;
  let state = inspector.initialInspectorState();
  for (let view = 0; view < VIEW_CYCLE; view++) {
    for (const size of SIZES) {
      const lines = inspector.layoutInspector(model, state, size);
      if (view === 0) rowsBySize[size.label] = lines.length;
      const text = lines.join('\n');
      if (OVERFLOW_WORDS.test(text)) labelled = true;
      if (text.includes(String(offered.nodes))) namesOffered = true;
    }
    state = inspector.reduceInspectorKey('\t', state, model)?.state ?? state;
  }
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  return {rowsBySize, inspectorLabelsOverflow: labelled, inspectorNamesOfferedTotal: namesOffered, windowTotal: head.total};
}

/**
 * An untimed, unreported navigation over the first 1,000 snapshots, so the first measured pass is not
 * charged the one-off JIT cost of the reducer and layout. Disclosed in sampling.warmupKeypresses.
 */
function warmupOf({Projection, inspector, fixture}) {
  const plan = {blocks: 1, keypressesPerBlock: 50, resizeSamples: 8};
  const subset = subsetOf(fixture, PRODUCTION_CAPS.runtimeAgents);
  const projection = new Projection(limitsFor(PRODUCTION_CAPS.runtimeAgents));
  for (const snapshot of subset.snapshots) projection.refresh(snapshot);
  for (const item of subset.relations) projection.relate(item);
  const {groupRows} = censusOf(projection);
  return navigate(projection, inspector, plan, groupRows).keypresses;
}

function measurePass({entry, Projection, inspector, fixture, plan, gcAvailable}) {
  const subset = entry.offered === 'all' ? subsetOf(fixture, fixture.snapshots.length) : subsetOf(fixture, entry.offered);
  const offered = offeredOf(subset);
  const limits = limitsFor(entry.cap);
  if (gcAvailable) globalThis.gc();
  const heapBefore = process.memoryUsage().heapUsed;
  const projection = limits === undefined ? new Projection() : new Projection(limits);
  const begin = clock();
  let refreshApplied = 0;
  for (const snapshot of subset.snapshots) if (projection.refresh(snapshot) === 'applied') refreshApplied++;
  const refreshMs = clock() - begin;
  const afterSnapshots = projection.stats().nodes;
  const relateBegin = clock();
  for (const item of subset.relations) projection.relate(item);
  const relateMs = clock() - relateBegin;
  const afterRelations = projection.stats().edges;
  const ingest = applyFixture(projection, {snapshots: [], relations: [], updates: subset.updates});
  const retained = projection.stats();
  const {census, groupRows} = censusOf(projection);
  const navigation = navigate(projection, inspector, plan, groupRows);
  const surface = surfaceOf(projection, inspector, offered);
  if (gcAvailable) globalThis.gc();
  const heapBytes = process.memoryUsage().heapUsed - heapBefore;
  const kept = projection.stats().nodes;
  const capNodes = limits === undefined ? undefined : limits.maxNodes;
  return {
    id: entry.id,
    role: entry.role,
    cap: limits === undefined
      ? {nodes: PRODUCTION_CAPS.projectionMaxNodes, edges: PRODUCTION_CAPS.projectionMaxEdges, source: 'production default: constructed with no argument, never raised', constructorArgs: 0}
      : {nodes: capNodes, edges: limits.maxEdges, source: 'bench-only: a constructor argument defined in qa/workbench/cap-saturation.mjs, never in src/', constructorArgs: 1},
    limits: limits === undefined ? 'default' : {...limits},
    offered,
    afterSnapshots: {nodes: afterSnapshots, applied: refreshApplied},
    afterRelations: {edges: afterRelations},
    retained: {...retained},
    census,
    overflow: {
      occurred: offered.nodes > retained.nodes || offered.edges > retained.edges,
      mode: offered.nodes > retained.nodes || offered.edges > retained.edges ? 'counted-remainder' : 'none',
      countedRemainder: offered.nodes - retained.nodes,
      countedEdgeRemainder: offered.edges - retained.edges,
      eviction: 'fifo (observation.ts store and relate)',
    },
    surface,
    // The refresh and relate spans are the ones bracketed above: applyFixture ran over empty snapshot and relation lists,
    // so its own refreshMs/relateMs are ~0 and must not overwrite them (wb-oq3 re-cut: found by the known-duration case).
    apply: {...ingest, refreshMs: Math.round(refreshMs * 10_000) / 10_000, relateMs: Math.round(relateMs * 10_000) / 10_000},
    navigation,
    memory: {label: gcAvailable ? 'post-gc' : 'transient-inclusive', heapBytes, retainedNodes: kept},
  };
}

/** Overflowing passes when no frame of any view in any of them names the dropped remainder; empty when some pass labels it. */
function unlabeledOverflowOf(passes) {
  const overflowing = Object.values(passes).filter(pass => pass.overflow.occurred);
  return overflowing.length > 0 && !overflowing.some(pass => pass.surface.inspectorLabelsOverflow) ? overflowing : [];
}

const rowMax = Math.max(...SIZES.map(size => size.rows));

/** Series recomputed from the passes: visible rows vs nodes, timings at the boundary, memory vs retained. */
export function seriesOf(passes) {
  const ordered = Object.values(passes);
  return {
    visibleVsTotal: ordered.map(pass => ({
      pass: pass.id, role: pass.role, capNodes: pass.cap.nodes, offeredNodes: pass.offered.nodes, retainedNodes: pass.retained.nodes,
      visibleRowsMax: pass.navigation?.maxRenderedRows ?? null, visibleRowsBySize: {...pass.surface.rowsBySize},
      visibleToRetained: pass.retained.nodes > 0 && pass.navigation ? Math.round((pass.navigation.maxRenderedRows / pass.retained.nodes) * 1e6) / 1e6 : null,
    })),
    timing: ordered.map(pass => ({
      pass: pass.id, role: pass.role, capNodes: pass.cap.nodes, offeredNodes: pass.offered.nodes, retainedNodes: pass.retained.nodes,
      reducer: pass.navigation?.reducer ?? null, layout: pass.navigation?.layout ?? null, navigation: pass.navigation?.all ?? null, resize: pass.navigation?.resize ?? null,
    })),
    memoryComparability: MEMORY_COMPARABILITY,
    memory: ordered.map(pass => ({pass: pass.id, capNodes: pass.cap.nodes, offeredNodes: pass.offered.nodes, retainedNodes: pass.retained.nodes, heapBytes: pass.memory.heapBytes, label: pass.memory.label, comparability: MEMORY_COMPARABILITY})),
  };
}

function silentDropsOf(pass) {
  const out = [];
  const flag = (rule, detail) => out.push({pass: pass.id, rule, detail});
  const {offered, retained, cap, afterSnapshots, overflow, census} = pass;
  if (retained.nodes > cap.nodes || retained.edges > cap.edges) {
    flag('cap-exceeded', `retained ${retained.nodes} nodes / ${retained.edges} edges against a cap of ${cap.nodes} / ${cap.edges}`);
  }
  const expected = Math.min(offered.nodes, cap.nodes);
  if (afterSnapshots.nodes !== expected) {
    flag('dropped-beyond-cap', `${afterSnapshots.nodes} nodes held after the snapshot phase; a cap of ${cap.nodes} over ${offered.nodes} offered explains exactly ${expected}`);
  }
  const remainder = offered.nodes - retained.nodes;
  const edgeRemainder = offered.edges - retained.edges;
  const wanted = remainder > 0 || edgeRemainder > 0 ? 'counted-remainder' : 'none';
  if (overflow.countedRemainder !== remainder || overflow.countedEdgeRemainder !== edgeRemainder || overflow.mode !== wanted) {
    flag('overflow-uncounted', `receipt counts ${overflow.countedRemainder} nodes / ${overflow.countedEdgeRemainder} edges (${overflow.mode}) but ${offered.nodes - retained.nodes} / ${edgeRemainder} are missing`);
  }
  if (census.rows !== retained.nodes) flag('window-disagrees-with-store', `the inspector window lists ${census.rows} rows while the store holds ${retained.nodes}`);
  return out;
}

/**
 * Recomputes realisation and the budget judgement from a receipt's own measured fields.
 * Exit 2: not this measurement (wrong fixture shape, a missing or mislabelled pass, a changed production
 *   cap, a fixture that cannot saturate the caps, an unsampled series).
 * Exit 1: measured, but a p95 reducer+layout or resize time is over 20 ms, overflow was silently
 *   dropped or the cap was exceeded, or memory followed the offered population instead of the projection.
 */
export function assessCapSaturationReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture ?? {}).violations];
  const need = (ok, rule, detail) => {
    if (!ok) violations.push({rule, detail});
  };
  const passes = receipt.passes ?? {};
  for (const id of PASS_IDS) need(passes[id] !== undefined, 'pass-missing', `no "${id}" pass`);
  need((receipt.fixture?.snapshots ?? 0) > PRODUCTION_CAPS.projectionMaxNodes, 'fixture-does-not-exceed-caps', `${receipt.fixture?.snapshots ?? 0} snapshots do not exceed the ${PRODUCTION_CAPS.projectionMaxNodes}-node production projection cap`);
  const production = receipt.caps?.production;
  need(production?.projectionMaxNodes === PRODUCTION_CAPS.projectionMaxNodes, 'production-cap-changed', `measured projection node cap ${String(production?.projectionMaxNodes)}; the receipt is about ${PRODUCTION_CAPS.projectionMaxNodes}`);
  need(production?.projectionMaxEdges === PRODUCTION_CAPS.projectionMaxEdges, 'production-cap-changed', `declared projection edge cap ${String(production?.projectionMaxEdges)}; the receipt is about ${PRODUCTION_CAPS.projectionMaxEdges}`);
  need(production?.runtimeAgents === PRODUCTION_CAPS.runtimeAgents, 'production-cap-changed', `runtime agent cap ${String(production?.runtimeAgents)}; the receipt is about ${PRODUCTION_CAPS.runtimeAgents}`);
  need(production?.runtimeNodeCalls === null || production?.runtimeNodeCalls === PRODUCTION_CAPS.runtimeNodeCalls, 'production-cap-changed', `runtime node-call cap ${String(production?.runtimeNodeCalls)}; the receipt is about ${PRODUCTION_CAPS.runtimeNodeCalls}`);
  for (const entry of passPlan()) {
    const pass = passes[entry.id];
    if (!pass) continue;
    if (entry.role === 'production-default') need(pass.cap?.constructorArgs === 0, 'production-pass-not-default', 'the production-default pass must construct the projection with no argument');
    const offeredWanted = entry.offered === 'all' ? receipt.fixture?.snapshots : entry.offered;
    need(pass.offered?.nodes === offeredWanted, 'offered-mismatch', `${entry.id} offered ${String(pass.offered?.nodes)} nodes; the plan offers ${String(offeredWanted)}`);
    if (entry.cap !== undefined) need(pass.cap?.nodes === entry.cap, 'cap-mismatch', `${entry.id} ran with cap ${String(pass.cap?.nodes)}; the plan caps it at ${entry.cap}`);
    const nav = pass.navigation;
    need(nav !== null && nav !== undefined && nav.keypresses > 0, 'pass-not-navigated', `${entry.id} recorded no navigation`);
  }
  const series = Object.values(passes).flatMap(pass => [
    [`${pass.id}:navigation`, pass.navigation?.all],
    [`${pass.id}:reducer`, pass.navigation?.reducer],
    [`${pass.id}:layout`, pass.navigation?.layout],
    [`${pass.id}:resize`, pass.navigation?.resize],
  ]);
  for (const [name, value] of series) need(Boolean(value) && value.samples > 0 && value.p95 !== null, 'series-not-sampled', `${name} has no samples`);
  need(receipt.series !== undefined && receipt.series !== null, 'series-missing', 'the visible-vs-total, timing and memory series are absent');

  const silentDrops = Object.values(passes).flatMap(silentDropsOf);
  const over = series
    .filter(([name]) => name.endsWith(':navigation') || name.endsWith(':resize'))
    .filter(([, value]) => value && value.p95 !== null && value.p95 > NAVIGATION_TARGET_MS)
    .map(([name]) => name);
  const unbounded = [];
  for (const pass of Object.values(passes)) {
    const rows = pass.navigation?.maxRenderedRows;
    if (typeof rows === 'number' && rows > rowMax) unbounded.push({pass: pass.id, rule: 'visible-rows-exceed-terminal', detail: `${rows} rendered rows against a ${rowMax}-row terminal`});
  }
  const small = passes['cap-1000-past'];
  const full = passes['uncapped-control'];
  const memoryJudged = Boolean(receipt.memory?.judged);
  if (memoryJudged && small && full && !(small.memory.heapBytes < full.memory.heapBytes)) {
    unbounded.push({pass: small.id, rule: 'memory-not-bounded-by-projection', detail: `${small.memory.heapBytes} bytes with ${small.retained.nodes} nodes retained is not below ${full.memory.heapBytes} bytes with ${full.retained.nodes} retained`});
  }
  const realised = violations.length === 0;
  const strict = receipt.strict === true;
  const unlabeled = unlabeledOverflowOf(passes);
  const strictFindings = strict && unlabeled.length > 0 ? [{id: UNLABELED_OVERFLOW, detail: `${unlabeled.length} overflowing passes name no dropped remainder in any frame of any view; --strict treats operator-invisible overflow as a failure`}] : [];
  const failed = silentDrops.length > 0 || unbounded.length > 0 || over.length > 0 || strictFindings.length > 0;
  const exitCode = !realised ? 2 : failed ? 1 : 0;
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', judged: 'navigation (reducer+layout) and resize of every pass', over},
    realised,
    violations,
    silentDrops,
    unbounded,
    strictFindings,
    verdict: exitCode === 2 ? 'not-cap-saturation-shape' : silentDrops.length > 0 ? 'silent-drop' : unbounded.length > 0 ? 'unbounded' : over.length > 0 ? 'over-budget' : strictFindings.length > 0 ? UNLABELED_OVERFLOW : 'within-budget',
    exitCode,
  };
}

export const exitCodeFor = receipt => assessCapSaturationReceipt(receipt).exitCode;

/**
 * Publishes one receipt (one-liner batch item (5), bound onto wb-9x5.6 by name; the wb-9x5.15 shape). The receipt line
 * is printed FIRST, then the same line is written to `path` when one is given, and only then is the exit code returned,
 * re-assessed from the receipt rather than read from it. A failed write is reported on `logError` and returns 3 with the
 * receipt already printed, so an unwritable receipt path never loses the measurement and never surfaces as the
 * over-budget 1 or as a pass. The writers are arguments because this module imports nothing but the fixture.
 */
export function publishReceipt(receipt, {path, log, logError, writeFile}) {
  const line = JSON.stringify(receipt);
  log(line);
  if (path) {
    try {
      writeFile(path, `${line}\n`);
    } catch (error) {
      logError(JSON.stringify({benchmark: 'inspector-cap-saturation', error: 'receipt-write-failed', path, detail: error instanceof Error ? error.message : String(error)}));
      return 3;
    }
  }
  return exitCodeFor(receipt);
}

function findingsOf(passes, memoryJudged, runtimeNodeCalls) {
  const findings = [
    {id: 'runtime-cap-modelled', detail: 'The runtime node-call cap is a closure constant in src/workflow/runtime.ts; this bench models it as a projection cap of the same size and does not start workflow workers.'},
  ];
  const overflowing = Object.values(passes).filter(pass => pass.overflow.occurred);
  if (unlabeledOverflowOf(passes).length > 0) {
    findings.push({id: UNLABELED_OVERFLOW, detail: `No frame of any view in ${overflowing.length} overflowing passes names the dropped remainder; FIFO eviction is counted by this receipt only. Plain mode records this finding and exits 0; --strict exits 1 until the inspector remainder line (wb-ea1) lands.`});
  }
  const edgeLoss = overflowing.filter(pass => pass.retained.edges < pass.afterRelations.edges);
  if (edgeLoss.length > 0) {
    findings.push({id: 'edges-follow-evicted-nodes', detail: `Evicting a node removes its edges: ${edgeLoss.length} overflowing passes end the run holding fewer edges than they held after the relation phase (for example ${edgeLoss[0].id}: ${edgeLoss[0].afterRelations.edges} then ${edgeLoss[0].retained.edges}) because updates for evicted nodes re-admit them and evict others. Every edge not held is counted as countedEdgeRemainder.`});
  }
  if (!memoryJudged) findings.push({id: 'memory-unjudged', detail: 'No garbage-collection hook was exposed, so heap series are transient-inclusive and the memory-bounded judgement was not made. Run with node --expose-gc.'});
  if (runtimeNodeCalls === null) findings.push({id: 'runtime-node-cap-unread', detail: 'The runtime node-call cap literal could not be read from src/workflow/runtime.ts.'});
  return findings;
}

/**
 * Every pass over one fixture, as one receipt. `Projection` is the ObservationProjection class and
 * `inspector` is {initialInspectorState, layoutInspector, reduceInspectorKey}; `host` carries utc,
 * revision, node, arch, platform, cpus, cpuModel, toolchain, command and runtimeCaps {nodeCalls, agents}.
 */
export function runCapSaturationBench({Projection, inspector, fixture, host, sampling = CAP_SAMPLING, strict = false}) {
  const plan = {blocks: sampling.blocks, keypressesPerBlock: sampling.keypressesPerBlock, resizeSamples: sampling.resizeSamples};
  const gcAvailable = typeof globalThis.gc === 'function';
  const warm = warmupOf({Projection, inspector, fixture});
  const passes = {};
  for (const entry of passPlan()) passes[entry.id] = measurePass({entry, Projection, inspector, fixture, plan, gcAvailable});
  const defaults = passes['production-default'];
  const memoryJudged = gcAvailable;
  const runtimeNodeCalls = host.runtimeCaps?.nodeCalls ?? null;
  const receipt = {
    contract: CAP_RECEIPT_CONTRACT,
    benchmark: 'inspector-cap-saturation',
    measured: true,
    aggregation: 'none: supernode aggregation, sharding and cap changes are later decisions this receipt informs',
    strict: strict === true,
    benchOnlyBounds: {
      nodes: [...CAP_SERIES, CONTROL_LIMITS.maxNodes],
      boundary: [...BOUNDARY_CAPS],
      edgeRatio: 2,
      events: EVENTS_AND_QUERY.maxEvents,
      query: EVENTS_AND_QUERY.maxQuery,
      productionEvents: PRODUCTION_EVENTS_AND_QUERY.maxEvents,
      productionQuery: PRODUCTION_EVENTS_AND_QUERY.maxQuery,
      source: 'hard-coded in qa/workbench/cap-saturation.mjs and qa/workbench/grouped-fixture.mjs (BENCH_ONLY_LIMITS); not read from configuration; stated here before any measurement',
    },
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    docs: DOC_QUOTES,
    caps: {
      production: {
        projectionMaxNodes: defaults.retained.nodes,
        projectionMaxEdges: defaults.afterRelations.edges,
        projectionLabel: 'measured on a no-argument projection offered the whole fixture: nodes retained after the run, edges held right after the relation phase (before updates re-admit and evict nodes, which removes their edges)',
        runtimeNodeCalls,
        runtimeAgents: host.runtimeCaps?.agents ?? null,
        runtimeLabel: 'read from the build and src/workflow/runtime.ts; modelled, not driven',
      },
      benchOnly: {nodes: [...CAP_SERIES, CONTROL_LIMITS.maxNodes], boundary: [...BOUNDARY_CAPS], edgeRatio: 2, events: EVENTS_AND_QUERY.maxEvents, query: EVENTS_AND_QUERY.maxQuery},
    },
    fixture: {...fixture.shape, providers: {...fixture.shape.providers}},
    sampling: {...plan, keypresses: plan.blocks * plan.keypressesPerBlock, warmupKeypresses: warm, sizes: SIZES.map(size => size.label)},
    memory: {
      judged: memoryJudged,
      label: gcAvailable ? 'post-gc: heap after a forced collection while the projection is still referenced' : 'transient-inclusive',
      claim: 'memory bounded by active projection rather than accumulating full prompt bodies',
    },
    passes,
  };
  receipt.series = seriesOf(passes);
  receipt.findings = findingsOf(passes, memoryJudged, runtimeNodeCalls);
  return {...receipt, ...assessCapSaturationReceipt(receipt)};
}

export {distribution};
