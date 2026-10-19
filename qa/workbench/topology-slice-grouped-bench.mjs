// W21 (wb-9x5.12): selectLinkedTopology receipt over the grouped-10k fixture, from the compiled dist/.
//
// Run after `npm run build`, outside the default gate: `forge run topology-slice-grouped-bench`, or
// `node qa/workbench/topology-slice-grouped-bench.mjs`. ONE deterministic fixture (qa/workbench/grouped-fixture.mjs) is
// loaded into two projections: pass "maxQuery-40" (the bench-only limits exactly as that file defines them, relation page
// 40) and pass "maxQuery-100" (the same limits with maxQuery spread to 100 here, relation page 100). Each pass times the
// linked topology slice for every sampled focus under two cap sets: the selector defaults, and perDirection 50 /
// references 50 / cycleReads 256. ONE JSON receipt line is printed, and written to $W21_TOPOLOGY_RECEIPT when set, BEFORE
// the exit code is set:
//   0  the W21 shape was measured and every judged p95 is <= 20 ms with every read inside its bound
//   1  the W21 shape was measured but a judged p95 is over 20 ms or a slice spent more reads than its bound allows:
//      a finding, recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape, fewer than 1,000 operation focuses, an unsampled group
//      depth or series, or a pass that did not retain the whole fixture)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision is git rev-parse HEAD of this checkout plus a dirty flag, stamped by qa/workbench/bench-revision.mjs (wb-oq3);
// $W21_REVISION only overrides the revision and the receipt names the source. $W21_SEED, $W21_NODES, $W21_DEPTH and
// $W21_TICKS override the fixture; any override below the W21 shape is still measured and exits 2.
//
// Measurement-only. No production cap or default moves: the page-cap fix has three other homes, and this receipt is the
// evidence they read. The measured function and its read pattern are the dist selector's own; reads are counted in an
// untimed call that precedes each timed one, so no instrumentation sits inside a timing.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {benchRevision, withBenchRevision} from './bench-revision.mjs';
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  GROUPED_FIXTURE_DEFAULTS,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  SCOPE,
} from './grouped-fixture.mjs';

/**
 * Contract types (JSDoc that TypeScript callers read under allowJs; nothing here runs). The frozen literals below are
 * defaults, never the accepted set: a pass takes its own label and limits of the bench-only shape, sampling takes other
 * counts too, and the receipt's pass and cap-set maps are keyed by whatever ran.
 *
 * @typedef {Readonly<Record<keyof typeof BENCH_ONLY_LIMITS, number>>} TopologyLimits
 *   Projection limits for one pass: the bench-only keys of grouped-fixture.mjs, each a number.
 * @typedef {{readonly label: string, readonly limits: TopologyLimits}} TopologyPassSpec
 * @typedef {{readonly operationFocuses: number, readonly groupSampleCap: number}} TopologySampling
 * @typedef {{
 *   refresh(snapshot: unknown): unknown,
 *   relate(item: unknown): unknown,
 *   ingest(update: unknown): string,
 *   stats(): {nodes: number, edges: number},
 *   window(filter: {scope: object, invocationId: string, offset: number, limit: number}): {
 *     total: number,
 *     nodes: ReadonlyArray<{key: string, presentation: {type: string}, nativeRef: {id: string}}>,
 *   },
 *   relations(query: object): ReadonlyArray<unknown>,
 * }} TopologyProjection The projection methods this runner calls on an ObservationProjection instance.
 * @typedef {new (limits: TopologyLimits) => TopologyProjection} TopologyProjectionClass
 * @typedef {{
 *   focus: {nativeRef: {provider: string, type: string, id: string}},
 *   upstream: {edges: ReadonlyArray<unknown>, remainder: {count: number, atLeast: boolean}},
 *   downstream: {edges: ReadonlyArray<unknown>, remainder: {count: number, atLeast: boolean}},
 *   references: ReadonlyArray<{reason: string}>,
 *   referencesRemainder: number,
 *   trace: {label: string, reasons: ReadonlyArray<string>},
 * }} TopologySliceRead The fields of one selectLinkedTopology slice this runner reads.
 * @typedef {{
 *   selectLinkedTopology(input: {scope: object, relations: object}, focusKey: string, caps: object): TopologySliceRead,
 *   readonly TOPOLOGY_CONTRACT: string,
 *   readonly TOPOLOGY_CAVEAT: string,
 *   readonly TOPOLOGY_TRACE_REASONS: ReadonlyArray<string>,
 *   readonly TOPOLOGY_REFERENCE_REASONS: ReadonlyArray<string>,
 * }} TopologyModule The topology-slice module members this runner uses.
 * @typedef {{
 *   readonly snapshots: ReadonlyArray<unknown>,
 *   readonly relations: ReadonlyArray<unknown>,
 *   readonly updates: ReadonlyArray<unknown>,
 *   readonly shape: Readonly<Record<string, unknown>>,
 * }} TopologyFixture A grouped fixture (buildGroupedFixture): every item goes to the projection as given; shape.seed
 *   seeds the focus stride and the whole shape is copied into the receipt.
 * @typedef {{
 *   readonly utc: string,
 *   readonly revision: string,
 *   readonly node: string,
 *   readonly arch: string,
 *   readonly platform: string,
 *   readonly cpus: number,
 *   readonly cpuModel: string,
 *   readonly toolchain: Readonly<Record<string, string>>,
 *   readonly command: string,
 * }} TopologyHost
 * @typedef {{samples: number, p50: number | null, p95: number | null, max: number | null}} TopologyDistribution
 * @typedef {{
 *   slices: number,
 *   withRemainder: number,
 *   atLeast: number,
 *   maxRemainderCount: number,
 *   withRemainderRate: number,
 *   atLeastRate: number,
 * }} TopologyRemainderCell
 * @typedef {{upstream: TopologyRemainderCell, downstream: TopologyRemainderCell}} TopologyRemainderPair
 * @typedef {{
 *   caps: Record<string, number>,
 *   cycleReadsInForce: number,
 *   callBudget: number,
 *   slices: number,
 *   slice: {
 *     all: TopologyDistribution,
 *     operation: TopologyDistribution,
 *     group: TopologyDistribution,
 *     byDepth: Record<string, TopologyDistribution>,
 *   },
 *   reads: {calls: TopologyDistribution, maxRowsPerCall: number, relationPage: number, violations: number},
 *   remainder: {
 *     upstream: TopologyRemainderCell,
 *     downstream: TopologyRemainderCell,
 *     operation: TopologyRemainderPair,
 *     group: TopologyRemainderPair,
 *   },
 *   traceLabels: Record<string, number>,
 *   traceReasons: Record<string, number>,
 *   referenceReasons: Record<string, {references: number, slices: number}>,
 *   referencesRemainder: {max: number, slices: number, total: number},
 *   slowest: Array<{
 *     kind: string,
 *     depth: number | null,
 *     ms: number,
 *     ref: string,
 *     reads: number,
 *     edgesListed: number,
 *     capSet: string,
 *     pass: string,
 *   }>,
 * }} TopologyCapSet One cap set of one pass.
 * @typedef {{
 *   label: string,
 *   maxQuery: number,
 *   limits: Record<keyof typeof BENCH_ONLY_LIMITS, number>,
 *   limitsLabel: string,
 *   relationPage: number,
 *   offered: {nodes: number, edges: number, updates: number},
 *   retained: {nodes: number, edges: number, updatesApplied: number},
 *   focuses: {
 *     operations: number,
 *     groups: number,
 *     byDepth: Record<string, number>,
 *     offeredByDepth: Record<string, number>,
 *     offeredOperations: number,
 *     source: string,
 *   },
 *   capSets: Record<string, TopologyCapSet>,
 * }} TopologyPass One pass, keyed in the receipt by its label.
 * @typedef {{
 *   [field: string]: unknown,
 *   seed: number,
 *   nodes: number,
 *   groups: number,
 *   snapshots: number,
 *   depth: number,
 *   minDepth: number,
 *   groupingEdges: number,
 *   dependencyEdges: number,
 *   hypothesisEdges: number,
 *   ownershipEdges: number,
 *   causationEdges: number,
 *   updates: number,
 *   ticks: number,
 *   minChangesPerTick: number,
 *   maxChangesPerTick: number,
 *   providers: Record<string, number>,
 *   collidingIds: number,
 *   minTitleBytes: number,
 *   maxTitleBytes: number,
 *   payloadRefs: number,
 *   minPayloadRefBytes: number,
 *   maxPayloadRefBytes: number,
 *   realised: boolean,
 * }} TopologyFixtureRecord The grouped fixture's realised shape as copied into the receipt: its counts by name, every
 *   other shape field (the fixture contract id among them) as given, and realised as assessFixtureShape judged it.
 * @typedef {{
 *   contract: string,
 *   benchmark: string,
 *   measured: boolean,
 *   topologyContract: string,
 *   caveat: string,
 *   note: string,
 *   utc: string,
 *   revision: string,
 *   node: string,
 *   arch: string,
 *   platform: string,
 *   cpus: number,
 *   cpuModel: string,
 *   toolchain: Record<string, string>,
 *   command: string,
 *   fixture: TopologyFixtureRecord,
 *   sampling: {operationFocuses: number, groupSampleCap: number},
 *   timing: string,
 *   passes: Record<string, TopologyPass>,
 *   target: {ms: number, statistic: string, judged: string[], over: string[]},
 *   readsViolations: string[],
 *   realised: boolean,
 *   violations: Array<{rule: string, detail: string}>,
 *   verdict: string,
 *   exitCode: number,
 * }} TopologyReceipt The receipt runTopologyBench returns: the measured fields plus assessTopologyReceipt's judgement.
 */

export const RECEIPT_CONTRACT = 'workbench.topology-slice-grouped-bench/v1';
export const BENCHMARK = 'topology-slice-grouped-10k';
/** Bench-only passes. The second spreads maxQuery locally; nothing here is ever written into a production module. */
export const PASS_SPECS = Object.freeze([
  Object.freeze({label: 'maxQuery-40', limits: BENCH_ONLY_LIMITS}),
  Object.freeze({label: 'maxQuery-100', limits: Object.freeze({...BENCH_ONLY_LIMITS, maxQuery: 100})}),
]);
/** Cap sets handed to the selector; relationPage is added per pass and never exceeds the projection's page cap. */
export const CAP_SETS = Object.freeze({
  defaults: Object.freeze({}),
  wide: Object.freeze({perDirection: 50, references: 50, cycleReads: 256}),
});
export const DEFAULT_SAMPLING = Object.freeze({operationFocuses: 1_000, groupSampleCap: 200});
export const GROUP_DEPTHS = Object.freeze([1, 2, 3, 4, 5]);
/** The selector's default relation-read budget, pinned against topology-slice.ts by the assessor test. */
const DEFAULT_CYCLE_READS = 64;
/** A slice spends at most one read per direction plus its cycle budget. */
const FIXED_READS = 2;
const MIN_OPERATION_FOCUSES = 1_000;
const WINDOW_PAGE = 100;
const SLOWEST = 5;
const SERIES = Object.freeze(['all', 'operation', 'group']);
const FOCUS_SOURCE = 'projection window pages over the retained nodes (offset/limit 100); no key is synthesized';

const round = value => Math.round(value * 10_000) / 10_000;
const rate = (count, total) => (total === 0 ? 0 : Math.round((count / total) * 1_000_000) / 1_000_000);
const defaultClock = () => performance.now();

/** p50/p95/max in ms (0.1 us rounding) with the sample count; an empty series has nulls, never zeros. */
function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}

const strideOf = (count, wanted) => Math.max(1, Math.floor(count / wanted));
/** Every `stride`-th entry from a seeded offset, so the sample is spread over the whole order and repeats exactly. */
function strided(items, stride, seed) {
  const offset = ((seed % stride) + stride) % stride;
  const picked = [];
  for (let at = offset; at < items.length; at += stride) picked.push(items[at]);
  return picked;
}

/** Focus keys from the projection's own window pages: operations by seeded stride, groups per depth (sampled above the cap). */
function planFocuses(projection, seed, sampling) {
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  const operations = [];
  const groupsByDepth = Object.fromEntries(GROUP_DEPTHS.map(depth => [depth, []]));
  for (let offset = 0; offset < head.total; offset += WINDOW_PAGE) {
    const page = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: WINDOW_PAGE});
    for (const node of page.nodes) {
      if (node.presentation.type !== 'group') {
        operations.push({kind: 'operation', depth: null, key: node.key});
        continue;
      }
      const depth = node.nativeRef.id.split('.').length;
      if (groupsByDepth[depth]) groupsByDepth[depth].push({kind: 'group', depth, key: node.key});
    }
  }
  const chosenOperations = strided(operations, strideOf(operations.length, sampling.operationFocuses), seed);
  const chosenGroups = {};
  for (const depth of GROUP_DEPTHS) {
    const all = groupsByDepth[depth];
    const stride = all.length > sampling.groupSampleCap ? Math.ceil(all.length / sampling.groupSampleCap) : 1;
    chosenGroups[depth] = strided(all, stride, seed);
  }
  return {
    operations: chosenOperations,
    groups: GROUP_DEPTHS.flatMap(depth => chosenGroups[depth]),
    summary: {
      operations: chosenOperations.length,
      groups: GROUP_DEPTHS.reduce((sum, depth) => sum + chosenGroups[depth].length, 0),
      byDepth: Object.fromEntries(GROUP_DEPTHS.map(depth => [depth, chosenGroups[depth].length])),
      offeredByDepth: Object.fromEntries(GROUP_DEPTHS.map(depth => [depth, groupsByDepth[depth].length])),
      offeredOperations: operations.length,
      source: FOCUS_SOURCE,
    },
  };
}

const remainderCell = () => ({slices: 0, withRemainder: 0, atLeast: 0, maxRemainderCount: 0});
function addRemainder(cell, remainder) {
  cell.slices += 1;
  if (remainder.count > 0) cell.withRemainder += 1;
  if (remainder.atLeast) cell.atLeast += 1;
  cell.maxRemainderCount = Math.max(cell.maxRemainderCount, remainder.count);
}
const finishRemainder = cell => ({
  ...cell,
  withRemainderRate: rate(cell.withRemainder, cell.slices),
  atLeastRate: rate(cell.atLeast, cell.slices),
});

function measureCapSet({passLabel, capSetName, extraCaps, relationPage, projection, plan, topology, clock}) {
  const {selectLinkedTopology, TOPOLOGY_TRACE_REASONS, TOPOLOGY_REFERENCE_REASONS} = topology;
  const caps = {...extraCaps, relationPage};
  const cycleReadsInForce = caps.cycleReads ?? DEFAULT_CYCLE_READS;
  const callBudget = FIXED_READS + cycleReadsInForce;
  const timedInput = {scope: SCOPE, relations: projection};
  let reads = 0;
  let rowsPerRead = 0;
  const readInput = {
    scope: SCOPE,
    relations: {
      relations: query => {
        reads += 1;
        const rows = projection.relations(query);
        rowsPerRead = Math.max(rowsPerRead, rows.length);
        return rows;
      },
    },
  };
  const ms = {all: [], operation: [], group: []};
  const byDepth = Object.fromEntries(GROUP_DEPTHS.map(depth => [depth, []]));
  const calls = [];
  let maxRowsPerCall = 0;
  let violations = 0;
  const remainder = {
    all: {upstream: remainderCell(), downstream: remainderCell()},
    operation: {upstream: remainderCell(), downstream: remainderCell()},
    group: {upstream: remainderCell(), downstream: remainderCell()},
  };
  const traceLabels = {observed: 0, 'incomplete-trace': 0};
  const traceReasons = Object.fromEntries(TOPOLOGY_TRACE_REASONS.map(reason => [reason, 0]));
  const referenceReasons = Object.fromEntries(TOPOLOGY_REFERENCE_REASONS.map(reason => [reason, {references: 0, slices: 0}]));
  const referencesRemainder = {max: 0, slices: 0, total: 0};
  const samples = [];
  for (const focus of [...plan.operations, ...plan.groups]) {
    reads = 0;
    rowsPerRead = 0;
    const slice = selectLinkedTopology(readInput, focus.key, caps);
    // timed-region:begin
    const started = clock();
    selectLinkedTopology(timedInput, focus.key, caps);
    const elapsed = clock() - started;
    // timed-region:end
    ms.all.push(elapsed);
    ms[focus.kind].push(elapsed);
    if (focus.depth !== null) byDepth[focus.depth].push(elapsed);
    calls.push(reads);
    maxRowsPerCall = Math.max(maxRowsPerCall, rowsPerRead);
    if (reads > callBudget || rowsPerRead > relationPage) violations += 1;
    for (const scope of ['all', focus.kind]) {
      addRemainder(remainder[scope].upstream, slice.upstream.remainder);
      addRemainder(remainder[scope].downstream, slice.downstream.remainder);
    }
    traceLabels[slice.trace.label] += 1;
    for (const reason of slice.trace.reasons) traceReasons[reason] += 1;
    const seen = new Set();
    for (const reference of slice.references) {
      referenceReasons[reference.reason].references += 1;
      seen.add(reference.reason);
    }
    for (const reason of seen) referenceReasons[reason].slices += 1;
    if (slice.referencesRemainder > 0) {
      referencesRemainder.slices += 1;
      referencesRemainder.total += slice.referencesRemainder;
      referencesRemainder.max = Math.max(referencesRemainder.max, slice.referencesRemainder);
    }
    const {provider, type, id} = slice.focus.nativeRef;
    samples.push({kind: focus.kind, depth: focus.depth, ms: elapsed, ref: `${provider}:${type}:${id}`, calls: reads, edges: slice.upstream.edges.length + slice.downstream.edges.length});
  }
  const slowest = samples
    .sort((a, b) => b.ms - a.ms)
    .slice(0, SLOWEST)
    .map(entry => ({kind: entry.kind, depth: entry.depth, ms: round(entry.ms), ref: entry.ref, reads: entry.calls, edgesListed: entry.edges, capSet: capSetName, pass: passLabel}));
  const finish = group => ({upstream: finishRemainder(group.upstream), downstream: finishRemainder(group.downstream)});
  return {
    caps,
    cycleReadsInForce,
    callBudget,
    slices: ms.all.length,
    slice: {
      all: distribution(ms.all),
      operation: distribution(ms.operation),
      group: distribution(ms.group),
      byDepth: Object.fromEntries(GROUP_DEPTHS.map(depth => [depth, distribution(byDepth[depth])])),
    },
    reads: {calls: distribution(calls), maxRowsPerCall, relationPage, violations},
    remainder: {...finish(remainder.all), operation: finish(remainder.operation), group: finish(remainder.group)},
    traceLabels,
    traceReasons,
    referenceReasons,
    referencesRemainder,
    slowest,
  };
}

function measurePass({spec, Projection, topology, fixture, sampling, clock}) {
  const projection = new Projection(spec.limits);
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  const results = {applied: 0, duplicate: 0, 'out-of-order': 0};
  for (const update of fixture.updates) results[projection.ingest(update)] += 1;
  const retained = projection.stats();
  const relationPage = spec.limits.maxQuery;
  const plan = planFocuses(projection, fixture.shape.seed, sampling);
  const capSets = {};
  for (const [capSetName, extraCaps] of Object.entries(CAP_SETS)) {
    capSets[capSetName] = measureCapSet({passLabel: spec.label, capSetName, extraCaps, relationPage, projection, plan, topology, clock});
  }
  return {
    label: spec.label,
    maxQuery: spec.limits.maxQuery,
    limits: {...spec.limits},
    limitsLabel: 'bench-only: defined in qa/workbench/grouped-fixture.mjs (maxQuery 100 spread in this file), never in a production module',
    relationPage,
    offered: {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length},
    retained: {nodes: retained.nodes, edges: retained.edges, updatesApplied: results.applied},
    focuses: plan.summary,
    capSets,
  };
}

/**
 * Recomputes realisation and the target judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (fixture shape, fewer than 1,000 operation focuses, an unsampled group depth or series, a
 * pass that retained less than the whole fixture). Exit 1: realised, but a judged p95 is over 20 ms or a slice spent
 * more reads, or read more rows per call, than its bound allows.
 */
export function assessTopologyReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture).violations];
  const series = [];
  const readsViolations = [];
  for (const [label, pass] of Object.entries(receipt.passes ?? {})) {
    if (pass.retained.nodes < pass.offered.nodes || pass.retained.edges < pass.offered.edges) {
      violations.push({rule: 'pass-truncated', detail: `${label} retained ${pass.retained.nodes}/${pass.offered.nodes} nodes and ${pass.retained.edges}/${pass.offered.edges} edges`});
    }
    if (pass.focuses.operations < MIN_OPERATION_FOCUSES) {
      violations.push({rule: 'operation-focuses-below-1000', detail: `${label} timed ${pass.focuses.operations} operation focuses; W21 needs >= ${MIN_OPERATION_FOCUSES}`});
    }
    for (const depth of GROUP_DEPTHS) {
      if (!(pass.focuses.byDepth[depth] > 0)) violations.push({rule: 'group-depth-unsampled', detail: `${label} timed no group focus at depth ${depth}`});
    }
    for (const [capSetName, capSet] of Object.entries(pass.capSets)) {
      for (const name of SERIES) series.push([`${label}/${capSetName}/${name}`, capSet.slice[name]]);
      if (capSet.reads.violations > 0) readsViolations.push(`${label}/${capSetName}`);
    }
  }
  if (series.length === 0) violations.push({rule: 'series-not-sampled', detail: 'the receipt carries no measured pass'});
  for (const [name, value] of series) {
    if (!value || value.samples === 0 || value.p95 === null) violations.push({rule: 'series-not-sampled', detail: `${name} has no samples`});
  }
  const over = series.filter(([, value]) => value && value.p95 !== null && value.p95 > NAVIGATION_TARGET_MS).map(([name]) => name);
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 || readsViolations.length > 0 ? 1 : 0;
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', judged: series.map(([name]) => name), over},
    readsViolations,
    realised,
    violations,
    verdict: exitCode === 2 ? 'not-w21-shape' : exitCode === 1 ? 'over-target' : 'within-target',
    exitCode,
  };
}

export const exitCodeFor = receipt => assessTopologyReceipt(receipt).exitCode;

/**
 * Every pass over one fixture, as one receipt. `Projection` is the ObservationProjection class and `topology` carries
 * selectLinkedTopology with TOPOLOGY_CONTRACT, TOPOLOGY_CAVEAT, TOPOLOGY_TRACE_REASONS and TOPOLOGY_REFERENCE_REASONS;
 * `host` carries utc, revision, node, arch, platform, cpus, cpuModel, toolchain and command.
 *
 * @param {object} input
 * @param {TopologyProjectionClass} input.Projection the ObservationProjection class (the sources in tests, dist in the CLI)
 * @param {TopologyModule} input.topology
 * @param {TopologyFixture} input.fixture
 * @param {TopologyHost} input.host
 * @param {TopologySampling} [input.sampling] defaults to DEFAULT_SAMPLING
 * @param {() => number} [input.clock] milliseconds; defaults to the module clock
 * @param {ReadonlyArray<TopologyPassSpec>} [input.passes] defaults to PASS_SPECS
 * @returns {TopologyReceipt}
 */
export function runTopologyBench({Projection, topology, fixture, host, sampling = DEFAULT_SAMPLING, clock = defaultClock, passes = PASS_SPECS}) {
  const measured = {};
  for (const spec of passes) measured[spec.label] = measurePass({spec, Projection, topology, fixture, sampling, clock});
  const receipt = {
    contract: RECEIPT_CONTRACT,
    benchmark: BENCHMARK,
    measured: true,
    topologyContract: topology.TOPOLOGY_CONTRACT,
    caveat: topology.TOPOLOGY_CAVEAT,
    note: 'measurement only: no production cap or default changed; a full relation page is a lower bound (atLeast), never the whole neighbourhood',
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    fixture: {
      ...fixture.shape,
      providers: {...fixture.shape.providers},
      realised: assessFixtureShape(fixture.shape).realised,
    },
    sampling: {operationFocuses: sampling.operationFocuses, groupSampleCap: sampling.groupSampleCap},
    timing: 'one untimed read-counting call precedes each timed call; no warm-up beyond that; outliers are the max and the slowest focuses',
    passes: measured,
  };
  return {...receipt, ...assessTopologyReceipt(receipt)};
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
 * Prints the receipt line FIRST, then writes the optional receipt file. A failed write is reported on stderr and exits 3
 * ("nothing durably recorded") with the receipt already on stdout; it must never surface as the over-target exit 1 with no
 * receipt (owner ruling 2026-10-15T21:37Z).
 *
 * @param {{readonly fixture: object, readonly passes?: Readonly<Record<string, object>>}} receipt a runTopologyBench
 *   receipt or a copy of one; it is printed as given and judged again by assessTopologyReceipt
 * @param {object} io
 * @param {string | undefined} io.path the receipt file to write; nothing is written when it is unset
 * @param {(line: string) => void} [io.log] defaults to console.log
 * @param {(line: string) => void} [io.logError] defaults to console.error
 * @param {(path: string, data: string) => void} [io.writeFile] defaults to the node:fs synchronous writer
 * @returns {number} the judged exit code, or 3 when the receipt file could not be written
 */
export function publishReceipt(receipt, {path, log = console.log, logError = console.error, writeFile = writeFileSync}) {
  log(JSON.stringify(receipt));
  if (path) {
    try {
      writeFile(path, `${JSON.stringify(receipt)}\n`);
    } catch (error) {
      logError(JSON.stringify({benchmark: BENCHMARK, error: 'receipt-write-failed', path, detail: error instanceof Error ? error.message : String(error)}));
      return 3;
    }
  }
  return exitCodeFor(receipt);
}

async function main() {
  let receipt;
  try {
    const {ObservationProjection} = await import('../../dist/workbench/observation.js');
    const topology = await import('../../dist/workbench/topology-slice.js');
    const fixture = buildGroupedFixture({
      seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
      nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
      depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
      ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
    });
    const processors = cpus();
    const stamp = benchRevision();
    receipt = withBenchRevision(runTopologyBench({
      Projection: ObservationProjection,
      topology,
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
        },
        command: 'node qa/workbench/topology-slice-grouped-bench.mjs',
      },
    }), stamp);
  } catch (error) {
    console.error(JSON.stringify({benchmark: BENCHMARK, measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  process.exitCode = publishReceipt(receipt, {path: process.env.W21_TOPOLOGY_RECEIPT});
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
