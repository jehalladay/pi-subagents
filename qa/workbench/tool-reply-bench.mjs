// W21 (wb-9x5.5): bounded Pi tool reply size and build-latency receipt over the grouped-10k fixture.
//
// Run after `npm run build`, outside the default gate: `forge run tool-reply-bench`, or
// `node qa/workbench/tool-reply-bench.mjs`. The fixture is the wb-9x5.1 one, imported from ./grouped-fixture.mjs
// and never forked. The workflow_observe reply builder (observeInvocation, wb-752.2) is driven across every cursor
// page of the whole invocation viewport, for each selector shape at the default (16384) and maximum (65536)
// maxBytes. ONE JSON receipt line (contract workbench.tool-reply-bench/v1) is printed FIRST, then written to
// $W21_TOOL_REPLY_RECEIPT when set, and only then is the exit code set:
//   0  the W21 shape was measured and no reply exceeded its maxBytes
//   1  the W21 shape was measured but a reply exceeded its maxBytes: a hard FAIL regardless of timings
//   2  the measurement is not the W21 claim (fixture shape, a truncated projection, updates not applied, a series
//      that is missing, unsampled or not paged to the end, a selector that never rode a reply)
//   3  nothing could be measured (an exception, reported on stderr; no receipt), or the receipt file could not be
//      written (reported on stderr; the receipt is already on stdout, never a silent exit 1)
// The revision comes from $W21_REVISION (else "working-tree"). $W21_SEED, $W21_NODES, $W21_DEPTH and $W21_TICKS
// override the fixture; an override below the W21 shape is still measured and exits 2.
//
// BOUNDS, stated here before any run and exported below; none is derived from a measurement:
//   - a reply's size is the UTF-8 length of JSON.stringify(reply), measured here and never taken from the reply's own
//     `bytes` field (which is recorded as a mismatch count only). It must not exceed the maxBytes requested.
//   - build time (observeInvocation alone) has NO documented target: p50/p95/max are recorded and never judged.
//     docs/workbench/14: "No invented pass numbers."
// The projection uses BENCH_ONLY_LIMITS from the fixture module only; production caps (reply maxBytes defaults and
// maxima, page limit) are never touched.
import {readFileSync, writeFileSync} from 'node:fs';
import {cpus} from 'node:os';
import {pathToFileURL} from 'node:url';
import {
  assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID, SCOPE,
} from './grouped-fixture.mjs';

export const TOOL_REPLY_CONTRACT = 'workbench.tool-reply-bench/v1';
/** The default and the maximum maxBytes a workflow_observe request may carry (src/workbench/observe-query.ts). */
export const BYTE_CAPS = Object.freeze([16_384, 65_536]);
/** The largest page limit a workflow_observe request may carry. */
export const PAGE_LIMIT = 40;
export const SHAPE_NAMES = Object.freeze(['plain', 'tone', 'kind', 'relations', 'events', 'relations+events']);
const OUTLIERS_KEPT = 5;

const round = value => Math.round(value * 10_000) / 10_000;
const clock = () => performance.now();

/** p50/p95/max with the sample count; an empty series has nulls, never zeros. */
function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}

const selectorsOf = (shape, values) => {
  if (shape === 'plain') return undefined;
  if (shape === 'tone') return {tone: values.tone};
  if (shape === 'kind') return {kind: values.kind};
  if (shape === 'relations') return {relations: true};
  if (shape === 'events') return {events: {limit: PAGE_LIMIT}};
  return {relations: true, events: {limit: PAGE_LIMIT}};
};

/** Pages one shape at one cap from the start of the viewport to the end, keeping every reply's measurements. */
function pageThrough({projection, observe, shape, cap, values}) {
  const id = `${shape}@${cap}`;
  const selectors = selectorsOf(shape, values);
  const bytes = [];
  const buildMs = [];
  const largest = [];
  const slowest = [];
  const series = {
    id, shape, cap, replies: 0, offeredNodes: 0, scannedNodes: 0, returnedNodes: 0, truncatedReplies: 0,
    droppedNodesForBytes: 0, finalCursorNull: false, repliesWithRelations: 0, repliesWithEvents: 0,
    overCap: 0, maxOverBy: 0, selfReportedMismatch: 0,
  };
  let cursor;
  let bound = Number.POSITIVE_INFINITY;
  while (series.replies < bound) {
    const request = {scope: SCOPE, invocationId: INVOCATION_ID, limit: PAGE_LIMIT, maxBytes: cap};
    if (selectors !== undefined) request.selectors = selectors;
    if (cursor !== undefined) request.cursor = cursor;
    const begin = clock();
    const reply = observe(projection, request);
    const ms = clock() - begin;
    const size = Buffer.byteLength(JSON.stringify(reply), 'utf8');
    const page = series.replies;
    if (page === 0) {
      series.offeredNodes = reply.window.total;
      bound = reply.window.total + 1;
    }
    series.replies++;
    series.scannedNodes += reply.window.scanned;
    series.returnedNodes += reply.window.returned;
    if (reply.truncatedForBytes) series.truncatedReplies++;
    series.droppedNodesForBytes += reply.droppedForBytes.nodes;
    if (reply.relations !== undefined) series.repliesWithRelations++;
    if (reply.events !== undefined) series.repliesWithEvents++;
    if (size > cap) {
      series.overCap++;
      series.maxOverBy = Math.max(series.maxOverBy, size - cap);
    }
    if (reply.bytes !== size) series.selfReportedMismatch++;
    bytes.push(size);
    buildMs.push(ms);
    largest.push({id, page, bytes: size});
    slowest.push({id, page, ms});
    if (reply.window.nextCursor === null) {
      series.finalCursorNull = true;
      break;
    }
    if (reply.window.scanned === 0) break;
    cursor = reply.window.nextCursor;
  }
  return {
    series: {...series, bytes: distribution(bytes), buildMs: distribution(buildMs)},
    largest,
    slowest,
  };
}

/**
 * Ingests the whole fixture, then pages every shape at every cap. `Projection` is the ObservationProjection class,
 * `observeInvocation` is the reply builder, and `host` carries utc, revision, node, arch, platform, cpus, cpuModel,
 * toolchain and command. `production` optionally carries the reply builder's own cap constants
 * ({defaultMaxBytes, maxMaxBytes, maxLimit}); without it the receipt states this module's caps as the production ones.
 */
export function runToolReplyBench({Projection, observeInvocation: observe, fixture, host, production}) {
  const projection = new Projection(BENCH_ONLY_LIMITS);
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const item of fixture.relations) projection.relate(item);
  const applied = {applied: 0, duplicate: 0, 'out-of-order': 0};
  for (const update of fixture.updates) applied[projection.ingest(update)] += 1;
  const offered = {nodes: fixture.snapshots.length, edges: fixture.relations.length, updates: fixture.updates.length};

  const first = observe(projection, {scope: SCOPE, invocationId: INVOCATION_ID, limit: 1}).nodes[0];
  const selectorValues = {tone: first?.presentation.statusTone ?? null, kind: first?.kind ?? null};

  const measured = BYTE_CAPS.flatMap(cap => SHAPE_NAMES.map(shape => pageThrough({projection, observe, shape, cap, values: selectorValues})));
  const largestReplies = measured.flatMap(item => item.largest).sort((a, b) => b.bytes - a.bytes || a.page - b.page).slice(0, OUTLIERS_KEPT);
  const slowestBuilds = measured.flatMap(item => item.slowest).sort((a, b) => b.ms - a.ms || a.page - b.page).slice(0, OUTLIERS_KEPT).map(item => ({...item, ms: round(item.ms)}));

  const receipt = {
    contract: TOOL_REPLY_CONTRACT,
    benchmark: 'tool-reply-grouped-10k',
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
    productionCaps: production === undefined
      ? {defaultMaxBytes: BYTE_CAPS[0], maxMaxBytes: BYTE_CAPS[1], maxLimit: PAGE_LIMIT}
      : {defaultMaxBytes: production.defaultMaxBytes, maxMaxBytes: production.maxMaxBytes, maxLimit: production.maxLimit},
    caps: [...BYTE_CAPS],
    pageLimit: PAGE_LIMIT,
    sizing: 'UTF-8 length of JSON.stringify(reply), measured here; the reply\'s own bytes field is counted as a mismatch only',
    timing: 'observeInvocation alone per reply; no documented target, so recorded and never judged',
    offered,
    retained: projection.stats(),
    apply: {ingestApplied: applied.applied, ingestDuplicate: applied.duplicate, ingestOutOfOrder: applied['out-of-order']},
    selectorValues,
    series: measured.map(item => item.series),
    outliers: {
      rule: `the ${OUTLIERS_KEPT} largest replies and the ${OUTLIERS_KEPT} slowest builds across every series, with series id and page`,
      largestReplies,
      slowestBuilds,
    },
  };
  return {...receipt, ...assessToolReplyReceipt(receipt)};
}

const hasSamples = value => value !== undefined && value.samples > 0 && value.p95 !== null;

/**
 * Recomputes realisation and the judgement from a receipt's own measured fields; a stored verdict is ignored.
 * Exit 2: not the W21 claim. Exit 1: realised, but a reply exceeded its cap. Exit 0: realised and clean.
 */
export function assessToolReplyReceipt(receipt) {
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
  const production = receipt.productionCaps;
  need(
    production.defaultMaxBytes === receipt.caps[0] && production.maxMaxBytes === receipt.caps[1] && production.maxLimit === receipt.pageLimit,
    'bench-caps-not-production',
    `bench caps ${receipt.caps.join('/')} at page limit ${receipt.pageLimit}; production ${production.defaultMaxBytes}/${production.maxMaxBytes} at ${production.maxLimit}`,
  );
  need(
    receipt.selectorValues.tone !== null && receipt.selectorValues.kind !== null,
    'selector-values-missing',
    'no node supplied a tone and a kind for the tone and kind selector shapes',
  );
  const byId = new Map(receipt.series.map(series => [series.id, series]));
  const expected = receipt.caps.flatMap(cap => SHAPE_NAMES.map(shape => `${shape}@${cap}`));
  const unsampled = expected.filter(id => {
    const series = byId.get(id);
    return series === undefined || series.replies === 0 || !hasSamples(series.bytes) || !hasSamples(series.buildMs);
  });
  need(unsampled.length === 0, 'series-not-sampled', `no samples for ${unsampled.join(', ')}`);
  const sampled = expected.map(id => byId.get(id)).filter(series => series !== undefined && series.replies > 0);
  const unfinished = sampled.filter(series => !series.finalCursorNull || series.scannedNodes !== series.offeredNodes || series.offeredNodes !== receipt.offered.nodes);
  need(
    unfinished.length === 0,
    'pagination-incomplete',
    `not paged to the end of the viewport: ${unfinished.map(series => `${series.id} (${series.scannedNodes}/${series.offeredNodes} of ${receipt.offered.nodes})`).join(', ')}`,
  );
  const silent = sampled.filter(series => (series.shape.includes('relations') && series.repliesWithRelations === 0) || (series.shape.includes('events') && series.repliesWithEvents === 0));
  need(silent.length === 0, 'selector-not-exercised', `the selector never rode a reply in ${silent.map(series => series.id).join(', ')}`);
  const over = receipt.series.filter(series => series.overCap > 0 || (series.bytes.max ?? 0) > series.cap).map(series => `cap-exceeded:${series.id}`);
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 ? 1 : 0;
  return {
    realised, violations, over, pass: exitCode === 0, exitCode,
    verdict: exitCode === 0
      ? 'measured on the W21 shape; every reply is within its maxBytes'
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
 * over-cap 1 or as a pass (owner O1, bound by name on wb-9x5.5; the one-liner batch item (5) shape of wb-9x5.12 and
 * wb-9x5.15).
 */
export function publishReceipt(receipt, {path, log = console.log, logError = console.error, writeFile = writeFileSync} = {}) {
  const line = JSON.stringify(receipt);
  log(line);
  if (path) {
    try {
      writeFile(path, `${line}\n`);
    } catch (error) {
      logError(JSON.stringify({benchmark: 'tool-reply-grouped-10k', error: 'receipt-write-failed', path, detail: error instanceof Error ? error.message : String(error)}));
      return 3;
    }
  }
  return receipt.exitCode;
}

async function main() {
  const {ObservationProjection} = await import('../../dist/workbench/observation.js');
  const observeQuery = await import('../../dist/workbench/observe-query.js');
  const fixture = buildGroupedFixture({
    seed: integerFromEnv('W21_SEED', GROUPED_FIXTURE_DEFAULTS.seed),
    nodes: integerFromEnv('W21_NODES', GROUPED_FIXTURE_DEFAULTS.nodes),
    depth: integerFromEnv('W21_DEPTH', GROUPED_FIXTURE_DEFAULTS.depth),
    ticks: integerFromEnv('W21_TICKS', GROUPED_FIXTURE_DEFAULTS.ticks),
  });
  const processors = cpus();
  return runToolReplyBench({
    Projection: ObservationProjection,
    observeInvocation: observeQuery.observeInvocation,
    fixture,
    production: {
      defaultMaxBytes: observeQuery.OBSERVE_DEFAULT_MAX_BYTES,
      maxMaxBytes: observeQuery.OBSERVE_MAX_MAX_BYTES,
      maxLimit: observeQuery.OBSERVE_MAX_LIMIT,
    },
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
      command: 'node qa/workbench/tool-reply-bench.mjs',
    },
  });
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let receipt;
  try {
    receipt = await main();
  } catch (error) {
    console.error(JSON.stringify({benchmark: 'tool-reply-grouped-10k', measured: false, error: error instanceof Error ? error.stack ?? error.message : String(error)}));
    process.exit(3);
  }
  process.exitCode = publishReceipt(receipt, {path: process.env.W21_TOOL_REPLY_RECEIPT});
}
