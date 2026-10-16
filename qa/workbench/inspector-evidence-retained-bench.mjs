// W21 (wb-9x5.14): retained-memory and wall-time receipt for evidence-bearing grouped-10k navigation through the
// REAL trunk evidence channel: EvidenceStore.request/get/abortAll driven by the inspector reducer exactly as
// the workflow dialog drives them (Enter on a selected reference names a 'load-evidence' action, the host calls
// store.request, the details view renders from the synchronous store.get, close calls abortAll). No stand-in
// payload field exists anywhere in this file.
//
// Run after `npm run build`, outside the default gate: `forge run inspector-evidence-retained-bench`, or
// `node --expose-gc qa/workbench/inspector-evidence-retained-bench.mjs`. ONE JSON receipt line (contract
// workbench.evidence-retained-bench/v1) is written to $W21_EVIDENCE_RECEIPT when set, printed, and only then
// is the exit code set:
//   0  the W21 shape was measured and no judged series or falsifier is over its bound
//   1  the W21 shape was measured but a bound is missed or a falsifier fires: recorded, never tuned away
//   2  the measurement is not the W21 claim (fixture shape, a truncated projection, updates not applied, gc
//      unavailable, focusedCycles or detailsCycles not equal to cycles, no loads, no aborts, a series with no
//      samples, a positive control that is not detected and released)
//   3  nothing could be measured (an exception, reported on stderr; no receipt)
// The revision comes from $W21_REVISION (else "working-tree"). $W21_SEED, $W21_NODES, $W21_DEPTH and $W21_TICKS
// override the fixture; an override below the W21 shape is still measured and exits 2.
//
// BOUNDS, stated here before any run and exported below; none is derived from a measurement:
//   - retained growth <= 8 MiB: post-GC (heapUsed + external) after the last cycle minus the same after the
//     warmup anchor. The store budget is maxEntries * maxBytes = 128 KiB of preview text; 8 MiB is generous
//     headroom for allocator noise, so growth near it would still be a finding.
//   - teardown residue <= 16 MiB: post-GC retained after the store is dropped minus the post-GC retained
//     before the store existed (projection and fixture loaded, no evidence).
//   - details layout p95 <= 20 ms: the one numeric target docs/workbench/14 gives ("<=20 ms per
//     navigation/layout calculation"), judged on every layoutInspector call of the details view.
//   - cycle wall p95 <= 250 ms: a bench-chosen bound fixed before measurement, NOT a docs target. docs/workbench
//     gives no wall target for an evidence load; the cycle is request + settle + render + abort + settle.
//   - warmup anchor: the first 16 cycles are warmup; the retained-growth baseline is the post-GC sample taken
//     right after cycle 16. Warmup cycles still count in cycles, the wall series and the offered bytes.
// Bench-only limits (fixture size, maxEntries 8, maxBytes 16 KiB, timeoutMs 5000, payload 4 MiB per load) are
// constants of this file. The receipt carries the label "non-comparable to production (bench limits ... vs
// production ...)": production caps (observation.ts defaults, the runtime EvidenceStore wiring) are untouched.
// Previews come from a FIXTURE EvidenceLoader defined in this file; it is never a real producer, so the receipt
// proves the store and reducer path, not any producer's read cost.
// Release semantics measured honestly: abortAll stops only loads in flight and keeps loaded previews inside the
// store's bounded LRU, so the release falsifier proves (a) no in-flight entry and no late result survives a
// close, (b) the loaded previews stay inside maxEntries * maxBytes, and (c) dropping the store returns the heap
// to its pre-evidence floor within the teardown bound.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {runInNewContext} from 'node:vm';
import {setFlagsFromString} from 'node:v8';
import {
  assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID, NAVIGATION_TARGET_MS, PROVIDERS, SCOPE, SIZES,
} from './grouped-fixture.mjs';

export const EVIDENCE_RETAINED_CONTRACT = 'workbench.evidence-retained-bench/v1';
export const BENCH_BOUNDS = Object.freeze({
  retainedGrowthBytes: 8 * 1_048_576,
  teardownResidueBytes: 16 * 1_048_576,
  detailsLayoutP95Ms: NAVIGATION_TARGET_MS,
  cycleWallP95Ms: 250,
});
export const BENCH_EVIDENCE_LIMITS = Object.freeze({
  cycles: 192, warmupCycles: 16, sampleEvery: 16, payloadBytes: 4 * 1_048_576, maxEntries: 8, maxBytes: 16_384, timeoutMs: 5_000, controlBytes: 16 * 1_048_576,
});
export const NON_COMPARABLE_LABEL = 'non-comparable to production (bench limits maxEntries 8 / maxBytes 16384 / payload 4 MiB per load / projection 12000/128/40 vs production EvidenceStore wiring and projection 2000/20000/100)';
export const LOADER_PROVENANCE = 'fixture EvidenceLoader defined in qa/workbench/inspector-evidence-retained-bench.mjs (never a real producer)';

const VIEW_SIZE = SIZES[1];
const SELECTION_STRIDE = 37;
const GRANT = 'fixture:evidence';
const CAPTURED_AT = new Date(1_792_022_400_000).toISOString();
const PAYLOAD_LINE = 'fixture transcript payload line 0123456789 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ\n';
const PREVIEW_MARK_ALLOWANCE_BYTES = 16;
const POSITIVE_DETECT_FRACTION = 0.9;
const POSITIVE_RELEASE_FRACTION = 0.25;
const OUTLIERS_KEPT = 5;
const KEY = Object.freeze({j: 'j', tab: '\t', enter: '\r', f: 'f', e: 'e'});

const round = value => Math.round(value * 10_000) / 10_000;
const clock = () => performance.now();
const tick = () => new Promise(resolve => setImmediate(resolve));

/** p50/p95/max in ms (0.1 us rounding) with the sample count; an empty series has nulls, never zeros. */
function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}

/** The explicit collector: --expose-gc when the command passes it, else the same hook switched on at runtime. */
function resolveGc() {
  if (typeof globalThis.gc === 'function') return globalThis.gc;
  try {
    setFlagsFromString('--expose_gc');
    const hook = runInNewContext('gc');
    return typeof hook === 'function' ? hook : undefined;
  } catch {
    return undefined;
  }
}

async function settledGc(gc) {
  for (let pass = 0; pass < 3; pass++) {
    await tick();
    gc();
  }
}

function memory() {
  const usage = process.memoryUsage();
  return {heapUsed: usage.heapUsed, external: usage.external, arrayBuffers: usage.arrayBuffers, retained: usage.heapUsed + usage.external};
}

/** Fixture snapshots plus two evidence references on every operation node; groups carry none. */
function withEvidenceRefs(fixture) {
  const snapshots = fixture.snapshots.map(snapshot => {
    if (snapshot.kind !== 'fixture.operation.snapshot') return snapshot;
    const base = `evidence://fixture/${snapshot.source.provider}/${snapshot.source.id}`;
    return {...snapshot, evidenceRefs: [`${base}/transcript`, `${base}/result`]};
  });
  return {...fixture, snapshots};
}

function applyFixture(projection, fixture) {
  let refreshApplied = 0;
  for (const snapshot of fixture.snapshots) if (projection.refresh(snapshot) === 'applied') refreshApplied++;
  for (const item of fixture.relations) projection.relate(item);
  const results = {applied: 0, duplicate: 0, 'out-of-order': 0};
  for (const update of fixture.updates) results[projection.ingest(update)] += 1;
  return {refreshApplied, ingestApplied: results.applied, ingestDuplicate: results.duplicate, ingestOutOfOrder: results['out-of-order']};
}

/** Counts the projection's mutators so the close step can prove it issued none. Reads stay untouched. */
function countingMutators(projection) {
  const counter = {mutations: 0};
  for (const name of ['refresh', 'relate', 'ingest']) {
    const original = projection[name].bind(projection);
    projection[name] = (...args) => {
      counter.mutations++;
      return original(...args);
    };
  }
  return counter;
}

function operationRows(projection, total) {
  const rows = [];
  for (let offset = 0; offset < total; offset += 100) {
    const page = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: 100});
    for (const [at, node] of page.nodes.entries()) if (node.presentation.type === 'sdk-operation' && node.evidenceRefs.length >= 2) rows.push(offset + at);
  }
  return rows;
}

/** The fixture loader: every load allocates a real payload buffer, derives a preview from it, and drops it. */
function makeLoaders(ctx) {
  return PROVIDERS.map(provider => ({
    provider,
    requiredGrant: GRANT,
    canLoad: evidenceRef => evidenceRef.startsWith(`evidence://fixture/${provider}/`),
    async load(request) {
      ctx.loads++;
      const payload = Buffer.allocUnsafe(ctx.payloadBytes);
      payload.fill(PAYLOAD_LINE);
      ctx.offered += payload.length;
      ctx.weakPayloads.push(new WeakRef(payload));
      await tick();
      if (request.signal.aborted) {
        ctx.aborted++;
        throw new Error('fixture load aborted');
      }
      const content = {
        kind: 'transcript', provider, capturedAt: CAPTURED_AT, bytes: payload.length, truncated: true, freshness: 'current',
        preview: payload.toString('utf8', 0, Math.min(payload.length, request.maxBytes * 2)).split('\n'),
      };
      ctx.weakContents.push(new WeakRef(content));
      return content;
    },
  }));
}

function slowest(samples) {
  return [...samples].sort((a, b) => b.ms - a.ms || a.cycle - b.cycle).slice(0, OUTLIERS_KEPT).map(sample => ({...sample, ms: round(sample.ms)}));
}

const previewBytes = entry => entry.preview.reduce((sum, line) => sum + Buffer.byteLength(line), 0);

/**
 * Measures the grouped-10k fixture. `Projection` is ObservationProjection, `EvidenceStore` the compiled store
 * class (a subclass is fine), `inspector` is {initialInspectorState, layoutInspector, reduceInspectorKey,
 * inspectorEvidenceTarget}; `host` carries utc, revision, node, arch, platform, cpus, cpuModel, toolchain and
 * command; `limits` may lower any BENCH_EVIDENCE_LIMITS member; `gc` overrides the collector.
 */
export async function runEvidenceRetainedBench({Projection, EvidenceStore, inspector, fixture, host, limits = {}, gc = resolveGc()}) {
  const bench = {...BENCH_EVIDENCE_LIMITS, ...limits};
  const gcAvailable = typeof gc === 'function';
  const collect = gcAvailable ? () => settledGc(gc) : async () => { await tick(); };
  const offeredFixture = withEvidenceRefs(fixture);

  let projection = new Projection(BENCH_ONLY_LIMITS);
  const applied = applyFixture(projection, offeredFixture);
  const mutators = countingMutators(projection);
  const total = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1}).total;
  const rows = operationRows(projection, total);
  const stats = projection.stats();

  await collect();
  const floor = memory();

  const ctx = {payloadBytes: bench.payloadBytes, loads: 0, aborted: 0, offered: 0, weakPayloads: [], weakContents: []};
  const counts = {requestCalls: 0, getCalls: 0, abortAllCalls: 0};
  let store = new EvidenceStore({loaders: makeLoaders(ctx), maxEntries: bench.maxEntries, maxBytes: bench.maxBytes, timeoutMs: bench.timeoutMs});
  const evidence = {
    request: (...args) => { counts.requestCalls++; return store.request(...args); },
    get: (...args) => { counts.getCalls++; return store.get(...args); },
    abortAll: () => { counts.abortAllCalls++; store.abortAll(); },
  };
  const model = {projection, scope: SCOPE, invocationId: INVOCATION_ID, title: 'w21 evidence retained bench', status: 'RUNNING', evidence};

  const cycleSamples = [];
  const renderSamples = [];
  const series = [];
  const run = {focusedCycles: 0, detailsCycles: 0, loadedCycles: 0, loadedEntries: 0, unavailableEntries: 0, inFlightSurvivors: 0, lateResultsKept: 0, closeControlCalls: 0};
  const budget = {maxStoreSize: 0, maxPreviewBytes: 0, previewOverBudget: 0};
  let peakHeapUsed = floor.heapUsed;
  let peakRetained = floor.retained;
  let afterWarmup = floor;

  const render = state => {
    const started = clock();
    const lines = inspector.layoutInspector(model, state, {width: VIEW_SIZE.width, rows: VIEW_SIZE.rows, ascii: VIEW_SIZE.ascii});
    renderSamples.push(clock() - started);
    return lines;
  };

  for (let cycle = 0; cycle < bench.cycles; cycle++) {
    const started = clock();
    let state = {...inspector.initialInspectorState(), index: Math.max(0, rows[(cycle * SELECTION_STRIDE) % Math.max(1, rows.length)] - 1)};
    const press = key => {
      const outcome = inspector.reduceInspectorKey(KEY[key], state, model);
      if (outcome === undefined) throw new Error(`inspector refused key ${key} at cycle ${cycle}`);
      state = outcome.state;
      return outcome.action;
    };
    const load = () => {
      const target = inspector.inspectorEvidenceTarget(model, state);
      return {target, pending: target === undefined ? Promise.resolve() : model.evidence.request(target.scope, target.nativeRef, target.evidenceRef)};
    };
    press('j');
    press('tab'); press('tab'); press('tab');
    press('f');
    if (state.view === 'details') run.detailsCycles++;
    if (state.focused !== null && state.focused === state.selected) run.focusedCycles++;

    const first = press('enter') === 'load-evidence' ? load() : undefined;
    render(state);
    await first?.pending;
    const shown = render(state);
    const entry = first?.target === undefined ? undefined : model.evidence.get(first.target.scope, first.target.nativeRef, first.target.evidenceRef);
    if (entry?.state === 'loaded') {
      run.loadedEntries++;
      const bytes = previewBytes(entry);
      budget.maxPreviewBytes = Math.max(budget.maxPreviewBytes, bytes);
      if (bytes > bench.maxBytes + PREVIEW_MARK_ALLOWANCE_BYTES) budget.previewOverBudget++;
      if (shown.some(line => line.includes('loaded ·'))) run.loadedCycles++;
    } else if (entry?.state === 'unavailable') run.unavailableEntries++;
    budget.maxStoreSize = Math.max(budget.maxStoreSize, store.size);

    // A second reference is requested and the dialog is closed while that load is still in flight.
    press('e');
    const second = press('enter') === 'load-evidence' ? load() : undefined;
    render(state);
    const mutationsBefore = mutators.mutations;
    model.evidence.abortAll();
    run.closeControlCalls += mutators.mutations - mutationsBefore;
    const secondGet = () => second?.target === undefined ? undefined : model.evidence.get(second.target.scope, second.target.nativeRef, second.target.evidenceRef);
    if (secondGet()?.state !== 'not-requested') run.inFlightSurvivors++;
    await second?.pending;
    if (secondGet()?.state !== 'not-requested') run.lateResultsKept++;
    budget.maxStoreSize = Math.max(budget.maxStoreSize, store.size);

    const ms = clock() - started;
    cycleSamples.push({ms, cycle, view: state.view});
    const now = memory();
    peakHeapUsed = Math.max(peakHeapUsed, now.heapUsed);
    peakRetained = Math.max(peakRetained, now.retained);
    const done = cycle + 1;
    if (done === bench.warmupCycles) {
      await collect();
      afterWarmup = memory();
      series.push({cycle: done, retained: afterWarmup.retained, heapUsed: afterWarmup.heapUsed, external: afterWarmup.external});
    } else if (done > bench.warmupCycles && (done % bench.sampleEvery === 0 || done === bench.cycles)) {
      await collect();
      const sampled = memory();
      series.push({cycle: done, retained: sampled.retained, heapUsed: sampled.heapUsed, external: sampled.external});
    }
  }

  await collect();
  const final = memory();
  if (series.length === 0 || series[series.length - 1].cycle !== bench.cycles) series.push({cycle: bench.cycles, retained: final.retained, heapUsed: final.heapUsed, external: final.external});
  const loadedAtCheck = store.size;
  const rawPayloadsReachable = ctx.weakPayloads.filter(ref => ref.deref() !== undefined).length;
  const rawContentsReachable = ctx.weakContents.filter(ref => ref.deref() !== undefined).length;

  // Positive control: a deliberately retained payload must be seen as retained, then released when dropped.
  const beforeControl = memory();
  let held = Buffer.alloc(bench.controlBytes, 1);
  const heldRef = new WeakRef(held);
  await collect();
  const withControl = memory();
  const deltaBytes = withControl.retained - beforeControl.retained;
  const detected = gcAvailable && deltaBytes >= bench.controlBytes * POSITIVE_DETECT_FRACTION && heldRef.deref() !== undefined;
  held = undefined;
  await collect();
  const afterControl = memory();
  const released = gcAvailable && heldRef.deref() === undefined && afterControl.retained - beforeControl.retained <= bench.controlBytes * POSITIVE_RELEASE_FRACTION;

  // Teardown: drop the store; the heap must return to the floor taken before it existed.
  const offered = ctx.offered;
  const loaderLoads = ctx.loads;
  const loaderAborted = ctx.aborted;
  store = undefined;
  ctx.weakPayloads.length = 0;
  ctx.weakContents.length = 0;
  await collect();
  const torn = memory();
  projection = undefined;

  const receipt = {
    contract: EVIDENCE_RETAINED_CONTRACT,
    benchmark: 'inspector-evidence-retained-grouped-10k',
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
    projectionLimits: {...BENCH_ONLY_LIMITS},
    limits: {...bench},
    limitsLabel: 'bench-only: BENCH_ONLY_LIMITS from qa/workbench/grouped-fixture.mjs as the one projection constructor argument; EvidenceStore budgets and payload size are constants of this file; production caps untouched',
    nonComparable: NON_COMPARABLE_LABEL,
    loaderProvenance: LOADER_PROVENANCE,
    bounds: {...BENCH_BOUNDS},
    sampling: {
      view: VIEW_SIZE.label, evidenceRefsPerOperation: 2, operationRows: rows.length, selection: `operation row (cycle * ${SELECTION_STRIDE}) mod operationRows`,
      keys: 'j, tab x3, f, enter, render, settle, render, e, enter, render, abortAll, settle',
      warmupAnchor: `post-GC sample after cycle ${bench.warmupCycles}`,
    },
    offered: {nodes: offeredFixture.snapshots.length, edges: offeredFixture.relations.length, updates: offeredFixture.updates.length},
    retained: {nodes: stats.nodes, edges: stats.edges},
    apply: {ingestApplied: applied.ingestApplied, ingestDuplicate: applied.ingestDuplicate, ingestOutOfOrder: applied.ingestOutOfOrder},
    cycles: bench.cycles,
    focusedCycles: run.focusedCycles,
    detailsCycles: run.detailsCycles,
    loadedCycles: run.loadedCycles,
    channel: {...counts, loaderLoads, loaderAborted},
    entries: {loaded: run.loadedEntries, aborted: loaderAborted, unavailable: run.unavailableEntries},
    wall: {cycle: distribution(cycleSamples.map(sample => sample.ms)), detailsRender: distribution(renderSamples)},
    heap: {
      gcAvailable,
      floorRetained: floor.retained,
      afterWarmupRetained: afterWarmup.retained,
      finalRetained: final.retained,
      growthBytes: final.retained - afterWarmup.retained,
      peakHeapUsed,
      peakRetained,
      series,
    },
    bytes: {offered, retainedPostGc: final.retained - floor.retained},
    falsifiers: {
      release: {
        inFlightSurvivors: run.inFlightSurvivors, lateResultsKept: run.lateResultsKept, closeControlCalls: run.closeControlCalls,
        teardownResidueBytes: torn.retained - floor.retained,
      },
      positiveControl: {heldBytes: bench.controlBytes, deltaBytes, detected, released},
      budget: {...budget, rawPayloadsReachable, rawContentsReachable, loadedAtCheck},
    },
    outliers: slowest(cycleSamples),
  };
  return {...receipt, ...assessEvidenceRetainedReceipt(receipt)};
}

/** Whether a receipt is the W21 claim (violations, exit 2) and whether a bound is missed (over, exit 1). */
export function assessEvidenceRetainedReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture).violations];
  const need = (ok, rule, detail) => {
    if (!ok) violations.push({rule, detail});
  };
  need(
    receipt.retained.nodes >= receipt.offered.nodes && receipt.retained.edges >= receipt.offered.edges,
    'projection-truncated',
    `retained ${receipt.retained.nodes}/${receipt.offered.nodes} nodes and ${receipt.retained.edges}/${receipt.offered.edges} edges`,
  );
  need(receipt.apply.ingestApplied === receipt.offered.updates, 'updates-not-applied', `${receipt.apply.ingestApplied} of ${receipt.offered.updates} updates applied`);
  need(receipt.heap.gcAvailable === true, 'gc-unavailable', 'no explicit collector: post-GC retained memory cannot be measured');
  need(receipt.cycles > 0 && receipt.channel.loaderLoads > 0, 'no-loads', `${receipt.channel.loaderLoads} fixture loads over ${receipt.cycles} cycles`);
  need(receipt.channel.loaderAborted > 0, 'no-aborts', `${receipt.channel.loaderAborted} in-flight loads were aborted by a close`);
  need(receipt.focusedCycles === receipt.cycles, 'focused-cycles-short', `${receipt.focusedCycles} of ${receipt.cycles} cycles rendered with the node focused`);
  need(receipt.detailsCycles === receipt.cycles, 'details-cycles-short', `${receipt.detailsCycles} of ${receipt.cycles} cycles rendered the details view`);
  need(receipt.loadedCycles === receipt.cycles, 'loaded-cycles-short', `${receipt.loadedCycles} of ${receipt.cycles} cycles rendered a loaded preview`);
  need(receipt.wall.cycle.samples > 0 && receipt.wall.cycle.p95 !== null, 'no-wall-samples', 'no cycle wall time was sampled');
  need(receipt.wall.detailsRender.samples > 0 && receipt.wall.detailsRender.p95 !== null, 'no-render-samples', 'no details render was timed');
  need(receipt.falsifiers.positiveControl.detected === true, 'positive-control-undetected', `a retained ${receipt.falsifiers.positiveControl.heldBytes} byte payload was not seen as retained`);
  need(receipt.falsifiers.positiveControl.released === true, 'positive-control-not-released', 'the retained control payload was not released when dropped');
  const over = [];
  const {bounds, falsifiers} = receipt;
  if (receipt.heap.growthBytes > bounds.retainedGrowthBytes) over.push(`retained-growth: ${receipt.heap.growthBytes} bytes over ${bounds.retainedGrowthBytes}`);
  if (falsifiers.release.teardownResidueBytes > bounds.teardownResidueBytes) over.push(`teardown-residue: ${falsifiers.release.teardownResidueBytes} bytes over ${bounds.teardownResidueBytes}`);
  if (receipt.wall.detailsRender.p95 !== null && receipt.wall.detailsRender.p95 > bounds.detailsLayoutP95Ms) over.push(`details-layout-p95: ${receipt.wall.detailsRender.p95} ms over ${bounds.detailsLayoutP95Ms}`);
  if (receipt.wall.cycle.p95 !== null && receipt.wall.cycle.p95 > bounds.cycleWallP95Ms) over.push(`cycle-wall-p95: ${receipt.wall.cycle.p95} ms over ${bounds.cycleWallP95Ms}`);
  if (falsifiers.release.inFlightSurvivors > 0) over.push(`in-flight-survivor: ${falsifiers.release.inFlightSurvivors} entries survived abortAll`);
  if (falsifiers.release.lateResultsKept > 0) over.push(`late-result-kept: ${falsifiers.release.lateResultsKept} late results were stored`);
  if (falsifiers.release.closeControlCalls > 0) over.push(`close-control-call: ${falsifiers.release.closeControlCalls} projection mutations during close`);
  if (falsifiers.budget.maxStoreSize > receipt.limits.maxEntries) over.push(`store-over-budget: ${falsifiers.budget.maxStoreSize} entries over ${receipt.limits.maxEntries}`);
  if (falsifiers.budget.previewOverBudget > 0) over.push(`preview-over-budget: ${falsifiers.budget.previewOverBudget} previews over ${receipt.limits.maxBytes} bytes`);
  if (falsifiers.budget.rawPayloadsReachable > 0 || falsifiers.budget.rawContentsReachable > 0) {
    over.push(`raw-payload-reachable: ${falsifiers.budget.rawPayloadsReachable} buffers and ${falsifiers.budget.rawContentsReachable} contents still reachable`);
  }
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 ? 1 : 0;
  return {
    realised, violations, over, pass: exitCode === 0, exitCode,
    verdict: exitCode === 0
      ? 'measured on the W21 shape; every judged series and falsifier is within its stated bound'
      : exitCode === 1
        ? `measured on the W21 shape; findings: ${over.join('; ')}`
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
  const {initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey} = await import('../../dist/ui/workflow-inspector.js');
  const {ObservationProjection} = await import('../../dist/workbench/observation.js');
  const {EvidenceStore} = await import('../../dist/workbench/evidence-loader.js');
  const fixture = buildGroupedFixture({
    seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
    nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
    depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
    ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
  });
  const processors = cpus();
  return runEvidenceRetainedBench({
    Projection: ObservationProjection,
    EvidenceStore,
    inspector: {initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey},
    fixture,
    host: {
      utc: process.env.W21_UTC ?? new Date().toISOString(),
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
      command: 'node --expose-gc qa/workbench/inspector-evidence-retained-bench.mjs',
    },
  });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let receipt;
  try {
    receipt = await main();
  } catch (error) {
    console.error(JSON.stringify({benchmark: 'inspector-evidence-retained-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  if (process.env.W21_EVIDENCE_RECEIPT) writeFileSync(process.env.W21_EVIDENCE_RECEIPT, `${JSON.stringify(receipt)}\n`);
  console.log(JSON.stringify(receipt));
  process.exitCode = receipt.exitCode;
}
