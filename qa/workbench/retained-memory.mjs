// W21-C (wb-9x5.3): retained-memory bound receipt for the grouped-10k inspector.
//
// docs/workbench/10 says the existing bench heap figure is "transient-inclusive, not retained-memory proof".
// This module is the retained-memory proof it names as missing: a post-GC heap series taken across sustained
// navigation / focus / blur over the landed grouped fixture (qa/workbench/grouped-fixture.mjs, reused, not
// redefined), plus an on-blur release falsifier.
//
// Pure ESM that loads no src/ or dist/ module: the caller hands in the projection class, the inspector
// functions and a gc function, so test/workbench-retained-memory.test.ts drives the TypeScript sources and
// qa/workbench/inspector-retained-memory-bench.mjs drives the compiled build.
//
// What is measured, and its scope (also written into every receipt):
// - The projection keeps payload REFERENCES only (a payloadRef string per node). A payload BODY is a bench
//   stand-in: for each focus a Uint8Array sized from the node's declared ref (capped) is attached to the model
//   object handed to the renderer while the node is focused. After blur the bench drops its own references,
//   yields to the event loop (a WeakRef keeps its target alive for the rest of the current job), forces GC and
//   asks a WeakRef whether the body, or the wrapper that carried it, is still reachable. Anything the renderer
//   kept (a module-level cache, a stashed model) makes it reachable: the falsifier fails the run (exit 1).
// - A body still reachable at that first look gets up to RELEASE_RECHECK_ROUNDS further collect rounds (a header
//   constant stated before any run) before it is counted. One released within them is recorded as LATE-COLLECTED,
//   separately from retained, and never fails the run; one that outlives every round is retained (exit 1). The
//   cycle's memory sample is taken after the probe settles. Why: at ea221f1 the wb-9x5.3 gate measured a body
//   reachable at the first look in 6 of 12 runs (always cycle 22) that one more collect round released with no
//   renderer or carried-state reference: a false finding. Its mechanism stays UNDETERMINED (GC timing).
// - The probe is itself checked by a positive control, judged through the same bounded probe: a body deliberately
//   held must still be reachable after every round, and must be released once dropped. A blind probe is exit 2,
//   never a pass.
// - Heap figures are process.memoryUsage() after an explicit GC, in bytes, for this whole process (the fixture
//   arrays the bench holds are a constant baseline, not projection state).
//
// The pass/fail bounds are constants stated before any run (RETAINED_BOUNDS). A miss is recorded as a miss:
// nothing here tunes a bound, a fixture or a cap. Production caps (observation.ts) are not touched.
//
// publishRetainedReceipt prints the receipt line BEFORE the optional file write, so an unwritable receipt path
// still leaves the receipt on stdout and exits 3, never a silent 1 (one-liner batch item (5), bound onto wb-9x5.3).
import {writeFileSync} from 'node:fs';
import {assessFixtureShape, BENCH_ONLY_LIMITS, INVOCATION_ID, SCOPE, SIZES} from './grouped-fixture.mjs';

export const RETAINED_RECEIPT_CONTRACT = 'workbench.inspector-retained-memory-bench/v1';
const BENCHMARK = 'inspector-retained-memory-grouped-10k';
const MIB = 1_048_576;
/** Stated before the run; a miss is a finding (exit 1), never retuned. */
export const RETAINED_BOUNDS = Object.freeze({
  /** Worst measured post-GC heapUsed minus the end-of-warmup post-GC heapUsed. */
  heapGrowthAfterWarmupBytes: 16 * MIB,
  /** Worst measured post-GC arrayBuffers minus the pre-cycle post-GC arrayBuffers: one body of tolerance. */
  arrayBufferGrowthBytes: MIB,
  /** Payload bodies still reachable from the renderer after blur. */
  reachableBodiesAfterBlur: 0,
});
/** Stated in the receipt header before any measurement: how the post-warmup growth is anchored. */
export const WARMUP_ANCHOR = Object.freeze({
  choice: 'last-warmup-sample',
  rule: 'heap growth after warmup is the worst measured post-GC heapUsed minus the post-GC heapUsed of the final warmup sample; a different anchor (first warmup sample, baseline) would give a different figure',
});
/**
 * Stated in the receipt header before any measurement: how many further collect rounds (each an event-loop yield,
 * a GC, a yield and a GC) the release probe gives a body that is still reachable at its first look before counting it.
 */
export const RELEASE_RECHECK_ROUNDS = 3;
const RELEASE_RECHECK_RULE = `a body still reachable at the first look after blur gets up to ${RELEASE_RECHECK_ROUNDS} further collect rounds; one released within them is recorded as late-collected, separately from retained, and is not a finding; one still reachable after every round is retained (exit 1); the cycle's memory sample is taken after the probe settles`;
/** Bench limits are not the production configuration at the same node cap, so no figure here is comparable to a production run. */
export const COMPARABILITY = 'non-comparable to production (bench limits 12000/128/40 vs 2000/20000/100)';
const SLOPE_LABEL = 'UNDETERMINED: least-squares post-GC heapUsed slope over the measured samples at bench limits; no significance test, not a leak claim and not a clean bill';
export const DEFAULT_RETAINED_SAMPLING = Object.freeze({cycles: 48, warmupCycles: 8, keypressesPerCycle: 60, bodyBytesCap: 4 * MIB});

const MIN_MEASURED_SAMPLES = 2;
const ROW_STRIDE = 389;
const PAYLOAD_SEARCH = 64;
const LABELS = Object.freeze({
  heap: 'post-gc-retained: process.memoryUsage() after an explicit GC; includes the fixture arrays the bench holds as a constant baseline',
  body: 'bench stand-in: a Uint8Array sized from the focused node declared payloadRef bytes (capped) attached to the model handed to the renderer; the projection itself holds references only',
  probe: 'WeakRef after a yield to the event loop and a forced GC; a positive control must be detected while held and released once dropped',
});

const round = value => Math.round(value * 10_000) / 10_000;
const sizeOfRef = (payloadRef, cap) => {
  const declared = /[?&]bytes=(\d+)/.exec(payloadRef ?? '');
  return Math.max(1, Math.min(cap, declared ? Number(declared[1]) : cap));
};
const settle = () => new Promise(resolve => setImmediate(resolve));
const memory = () => {
  const usage = process.memoryUsage();
  return {heapUsed: usage.heapUsed, arrayBuffers: usage.arrayBuffers, external: usage.external, rss: usage.rss};
};

/** Two collections around event-loop turns, so finalisation and WeakRef job pinning settle. */
async function collect(gc) {
  await settle();
  gc();
  await settle();
  gc();
}

/**
 * The release probe: one collection, then up to RELEASE_RECHECK_ROUNDS more while `isReachable` still says yes.
 * `retained` is true only when the target outlived every round; `rounds` is how many further rounds ran (0 = gone at
 * the first look). `isReachable` returns a boolean, so no strong reference to the target enters this frame, and each
 * round opens with an event-loop yield, so a previous deref's job pinning has ended before the next collection.
 */
async function probeRelease(gc, isReachable) {
  await collect(gc);
  let rounds = 0;
  while (rounds < RELEASE_RECHECK_ROUNDS && isReachable()) {
    rounds++;
    await collect(gc);
  }
  return {retained: isReachable(), rounds};
}

function applyFixture(projection, fixture) {
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  for (const update of fixture.updates) projection.ingest(update);
}

const freshBody = (bytes, tag) => {
  const body = new Uint8Array(bytes);
  body.fill((tag & 0xfe) | 1);
  return body;
};

/** Positive control. Returns only WeakRefs so no body reference stays in the caller's frame. */
function holdControl(holder, bytes) {
  const body = freshBody(bytes, 7);
  holder.push(body);
  return new WeakRef(body);
}

/**
 * One navigate / focus / blur cycle. Everything that can reach the payload body is created and dropped
 * inside this synchronous frame; only WeakRefs and byte counts leave it.
 */
function runCycle({projection, inspector, plan, ctx, cycle}) {
  const size = SIZES[cycle % SIZES.length];
  const model = {projection, scope: SCOPE, invocationId: INVOCATION_ID, title: 'W21 retained-memory fixture', status: 'running'};
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  const rowAt = start => {
    for (let step = 0; step < PAYLOAD_SEARCH; step++) {
      const offset = (start + step) % head.total;
      const node = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: 1}).nodes[0];
      if (node?.payloadRef !== undefined) return {offset, node};
    }
    return {offset: start % head.total, node: projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: start % head.total, limit: 1}).nodes[0]};
  };
  const target = rowAt(cycle * ROW_STRIDE);
  let state = {...ctx.state, view: 'overview', previousView: 'overview', focused: null, index: target.offset, selected: target.node?.key ?? null};
  const press = (data, activeModel) => {
    const outcome = inspector.reduceInspectorKey(data, state, activeModel);
    if (outcome?.state) state = outcome.state;
  };
  const sequence = ['j', 'j', 'k', '\t'];
  for (let step = 0; step < plan.keypressesPerCycle; step++) {
    press(sequence[step % sequence.length], model);
    inspector.layoutInspector(model, state, size);
  }
  // Re-aim at the payload-bearing row after the free navigation, then focus it with the payload attached.
  const aimed = rowAt(cycle * ROW_STRIDE + 1);
  state = {...state, view: 'overview', previousView: 'overview', focused: null, index: aimed.offset, selected: aimed.node?.key ?? null};
  const bytes = sizeOfRef(aimed.node?.payloadRef, plan.bodyBytesCap);
  const body = freshBody(bytes, cycle);
  const loaded = {ref: aimed.node?.payloadRef ?? null, body};
  const focusedModel = {...model, loadedPayload: loaded};
  press('f', focusedModel);
  press('e', focusedModel);
  inspector.layoutInspector(focusedModel, state, size);
  press('j', focusedModel);
  press('k', focusedModel);
  inspector.layoutInspector(focusedModel, state, size);
  const focusedWhileHeld = state.focused !== null;
  const detailsWhileHeld = state.view === 'details';
  // Blur: Esc clears focus, a second Esc leaves the details view. Only the plain model is used from here on.
  for (let step = 0; step < 3 && (state.focused !== null || state.view !== 'overview'); step++) press('\u001b', model);
  inspector.layoutInspector(model, state, size);
  ctx.state = {...state, focused: null};
  return {weakBody: new WeakRef(body), weakLoaded: new WeakRef(loaded), bytes, focusedWhileHeld, detailsWhileHeld, blurred: state.focused === null};
}

function slope(values) {
  const n = values.length;
  if (n < 2) return null;
  const meanX = (n - 1) / 2;
  const meanY = values.reduce((sum, value) => sum + value, 0) / n;
  let numerator = 0;
  let denominator = 0;
  for (const [at, value] of values.entries()) {
    numerator += (at - meanX) * (value - meanY);
    denominator += (at - meanX) ** 2;
  }
  return denominator === 0 ? null : round(numerator / denominator);
}

/**
 * Recomputes realisation and the bound judgement from the receipt's own series. Instrument violations
 * (fixture not the W21 shape, no collector, a blind or unreleased control, a series too short to separate
 * warmup from measured) are exit 2; a bound miss with a sound instrument is exit 1; otherwise exit 0. Where a
 * stored summary and the series disagree the worse figure is judged, so a summary can never understate.
 */
export function assessRetainedReceipt(receipt) {
  const violations = [];
  const instrument = (rule, detail) => violations.push({rule, detail, kind: 'instrument'});
  const bound = (rule, detail) => violations.push({rule, detail, kind: 'bound'});
  for (const item of assessFixtureShape(receipt.fixture).violations) instrument(item.rule, item.detail);
  if (!receipt.gc?.available) instrument('gc-unavailable', 'no gc function: retained heap cannot be measured (run with node --expose-gc)');
  const series = receipt.series ?? [];
  const measured = series.filter(sample => sample.phase === 'measured');
  const warmup = series.filter(sample => sample.phase === 'warmup');
  if (receipt.gc?.available) {
    if (warmup.length === 0 || measured.length < MIN_MEASURED_SAMPLES) {
      instrument('series-too-short', `${warmup.length} warmup and ${measured.length} measured samples; need >= 1 and >= ${MIN_MEASURED_SAMPLES}`);
    }
    const cycles = receipt.sampling?.cycles;
    if (receipt.falsifier && receipt.falsifier.focusedCycles !== cycles) {
      instrument('focus-not-held-every-cycle', `focus held in ${receipt.falsifier.focusedCycles ?? 'an unrecorded number of'} of ${cycles} cycles: the falsifier did not exercise a focused payload every cycle`);
    }
    if (receipt.falsifier && receipt.falsifier.detailsCycles !== cycles) {
      instrument('details-not-held-every-cycle', `details view reached in ${receipt.falsifier.detailsCycles ?? 'an unrecorded number of'} of ${cycles} cycles: the falsifier did not exercise the details view every cycle`);
    }
    const control = receipt.falsifier?.control;
    if (!control?.detectedWhileHeld) instrument('control-not-detected', 'a body deliberately held was not seen as reachable: the probe is blind');
    if (!control?.releasedAfterDrop) instrument('control-not-released', 'the control stayed reachable after it was dropped: the probe cannot tell held from free');
  }
  const limits = receipt.bounds ?? RETAINED_BOUNDS;
  let heapGrowth = null;
  let bufferGrowth = null;
  if (measured.length > 0 && warmup.length > 0) {
    const anchor = warmup[warmup.length - 1].heapUsed;
    const seriesHeap = Math.max(...measured.map(sample => sample.heapUsed)) - anchor;
    heapGrowth = Math.max(seriesHeap, receipt.summary?.heapGrowthAfterWarmupBytes ?? Number.NEGATIVE_INFINITY);
    if (heapGrowth > limits.heapGrowthAfterWarmupBytes) {
      bound('retained-heap-growth-over-bound', `post-GC heap grew ${heapGrowth} B after warmup; bound ${limits.heapGrowthAfterWarmupBytes} B`);
    }
    if (receipt.baseline) {
      const seriesBuffers = Math.max(...measured.map(sample => sample.arrayBuffers)) - receipt.baseline.arrayBuffers;
      bufferGrowth = Math.max(seriesBuffers, receipt.summary?.arrayBufferGrowthBytes ?? Number.NEGATIVE_INFINITY);
      if (bufferGrowth > limits.arrayBufferGrowthBytes) {
        bound('array-buffer-growth-over-bound', `post-GC ArrayBuffer bytes grew ${bufferGrowth} B over the pre-cycle baseline; bound ${limits.arrayBufferGrowthBytes} B`);
      }
    }
  }
  const reachable = Math.max(
    series.reduce((sum, sample) => sum + (sample.reachableBodies ?? 0), 0),
    receipt.falsifier?.reachableAfterBlur ?? 0,
  );
  if (reachable > limits.reachableBodiesAfterBlur) {
    bound('payload-body-reachable-after-blur', `${reachable} payload bodies still reachable from the renderer after blur; bound ${limits.reachableBodiesAfterBlur}`);
  }
  const realised = !violations.some(item => item.kind === 'instrument');
  const exitCode = !realised ? 2 : violations.length > 0 ? 1 : 0;
  return {
    realised,
    violations,
    judged: {heapGrowthAfterWarmupBytes: heapGrowth, arrayBufferGrowthBytes: bufferGrowth, reachableBodiesAfterBlur: reachable},
    verdict: exitCode === 2 ? 'not-measured' : exitCode === 1 ? 'over-bound' : 'within-bound',
    exitCode,
  };
}

export const retainedExitCodeFor = receipt => assessRetainedReceipt(receipt).exitCode;

/**
 * Prints the receipt line FIRST, then writes the same line to the optional receipt file, and returns the exit code
 * recomputed from the receipt (never a stored field). A failed write is reported on stderr and returns 3 with the
 * receipt already on stdout: it never surfaces as the bound miss 1, the instrument refusal 2 or a pass (one-liner
 * batch item (5), bound onto wb-9x5.3 by name; the wb-9x5.15 reducer-selector shape).
 */
export function publishRetainedReceipt(receipt, {path, log = console.log, logError = console.error, writeFile = writeFileSync} = {}) {
  const line = JSON.stringify(receipt);
  log(line);
  if (path) {
    try {
      writeFile(path, `${line}\n`);
    } catch (error) {
      logError(JSON.stringify({benchmark: BENCHMARK, error: 'receipt-write-failed', path, detail: error instanceof Error ? error.message : String(error)}));
      return 3;
    }
  }
  return retainedExitCodeFor(receipt);
}

/**
 * The whole measurement as one receipt. `Projection` is the ObservationProjection class, `inspector` is
 * {initialInspectorState, layoutInspector, reduceInspectorKey}, `gc` is a synchronous full-collection function
 * (undefined is recorded honestly and exits 2), and `host` carries utc, revision, node, arch, platform, cpus,
 * cpuModel, toolchain and command.
 */
export async function runRetainedMemoryBench({Projection, inspector, fixture, host, gc, sampling = DEFAULT_RETAINED_SAMPLING}) {
  const plan = {
    cycles: sampling.cycles,
    warmupCycles: sampling.warmupCycles,
    keypressesPerCycle: sampling.keypressesPerCycle,
    bodyBytesCap: sampling.bodyBytesCap,
  };
  const offered = {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length};
  const receipt = {
    contract: RETAINED_RECEIPT_CONTRACT,
    benchmark: BENCHMARK,
    measured: false,
    heapLabel: 'post-gc-retained',
    labels: {...LABELS},
    comparability: COMPARABILITY,
    warmupAnchor: {...WARMUP_ANCHOR},
    releaseRecheck: {rounds: RELEASE_RECHECK_ROUNDS, rule: RELEASE_RECHECK_RULE},
    aggregation: 'none: no cap change and no supernode aggregation; this receipt informs those later decisions',
    utc: host.utc,
    revision: host.revision,
    node: host.node,
    arch: host.arch,
    platform: host.platform,
    cpus: host.cpus,
    cpuModel: host.cpuModel,
    toolchain: {...host.toolchain},
    command: host.command,
    limits: {...BENCH_ONLY_LIMITS},
    limitsLabel: 'bench-only: a constructor argument defined in qa/workbench/grouped-fixture.mjs, never in src/',
    bounds: {...RETAINED_BOUNDS},
    gc: {available: typeof gc === 'function', method: typeof gc === 'function' ? 'explicit gc() after two event-loop yields' : 'none'},
    fixture: {...fixture.shape, providers: {...fixture.shape.providers}},
    sampling: {...plan, sizes: SIZES.map(size => size.label)},
    projection: {offered, retained: null},
    preIngest: null,
    baseline: null,
    series: [],
    summary: null,
    falsifier: null,
  };
  if (typeof gc !== 'function') return {...receipt, ...assessRetainedReceipt(receipt)};

  await collect(gc);
  receipt.preIngest = memory();
  const projection = new Projection(BENCH_ONLY_LIMITS);
  applyFixture(projection, fixture);
  await collect(gc);
  receipt.baseline = memory();
  receipt.projection.retained = projection.stats();

  const holder = [];
  const controlWeak = holdControl(holder, plan.bodyBytesCap);
  const controlReachable = () => controlWeak.deref() !== undefined;
  const whileHeld = await probeRelease(gc, controlReachable);
  const detectedWhileHeld = whileHeld.retained;
  holder.length = 0;
  const afterDrop = await probeRelease(gc, controlReachable);
  const releasedAfterDrop = !afterDrop.retained;

  const ctx = {state: inspector.initialInspectorState()};
  const leakedCycles = [];
  const lateCollectedCycles = [];
  let blurCycles = 0;
  let focusedCycles = 0;
  let detailsCycles = 0;
  let bodiesIssued = 0;
  let payloadBytesOffered = 0;
  for (let cycle = 0; cycle < plan.cycles; cycle++) {
    const issued = runCycle({projection, inspector, plan, ctx, cycle});
    bodiesIssued++;
    if (issued.blurred) blurCycles++;
    if (issued.focusedWhileHeld) focusedCycles++;
    if (issued.detailsWhileHeld) detailsCycles++;
    payloadBytesOffered += issued.bytes;
    const probe = await probeRelease(gc, () => issued.weakBody.deref() !== undefined || issued.weakLoaded.deref() !== undefined);
    const usage = memory();
    const reachableBodies = probe.retained ? 1 : 0;
    const lateCollected = !probe.retained && probe.rounds > 0 ? 1 : 0;
    if (reachableBodies > 0) leakedCycles.push(cycle);
    if (lateCollected > 0) lateCollectedCycles.push(cycle);
    receipt.series.push({
      cycle,
      phase: cycle < plan.warmupCycles ? 'warmup' : 'measured',
      ...usage,
      payloadBytesOffered,
      reachableBodies,
      lateCollected,
      releaseRounds: probe.rounds,
    });
  }
  const measuredSamples = receipt.series.filter(sample => sample.phase === 'measured');
  const warmupSamples = receipt.series.filter(sample => sample.phase === 'warmup');
  const anchor = warmupSamples[warmupSamples.length - 1];
  const last = receipt.series[receipt.series.length - 1];
  receipt.measured = true;
  receipt.falsifier = {
    blurCycles,
    bodiesIssued,
    focusedCycles,
    detailsCycles,
    reachableAfterBlur: leakedCycles.length,
    leakedCycles,
    lateCollectedAfterBlur: lateCollectedCycles.length,
    lateCollectedCycles,
    controlProbeRounds: {whileHeld: whileHeld.rounds, afterDrop: afterDrop.rounds},
    control: {detectedWhileHeld, releasedAfterDrop},
  };
  receipt.summary = {
    heapGrowthAfterWarmupBytes: anchor && measuredSamples.length > 0 ? Math.max(...measuredSamples.map(sample => sample.heapUsed)) - anchor.heapUsed : null,
    heapSlopeBytesPerCycle: slope(measuredSamples.map(sample => sample.heapUsed)),
    heapSlopeVerdict: 'UNDETERMINED',
    heapSlopeLabel: SLOPE_LABEL,
    arrayBufferGrowthBytes: measuredSamples.length > 0 ? Math.max(...measuredSamples.map(sample => sample.arrayBuffers)) - receipt.baseline.arrayBuffers : null,
    payloadBytesOffered,
    payloadBytesRetained: last ? Math.max(0, last.arrayBuffers - receipt.baseline.arrayBuffers) : null,
    retainedHeapPerRetainedNodeBytes: receipt.projection.retained.nodes > 0 ? round((receipt.baseline.heapUsed - receipt.preIngest.heapUsed) / receipt.projection.retained.nodes) : null,
    retainedHeapPerRetainedNodeLabel: 'post-gc heap after ingest minus post-gc heap before ingest, over retained projection nodes',
  };
  return {...receipt, ...assessRetainedReceipt(receipt)};
}
