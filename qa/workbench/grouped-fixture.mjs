// W21 (wb-9x5.1): deterministic grouped-10k fixture and the two-pass inspector measurement over it.
//
// Pure ESM that loads no module at all. buildGroupedFixture() returns plain data only: the exact inputs
// ObservationProjection.refresh(), relate() and ingest() accept. The measurement functions take the
// projection class and the inspector functions as arguments, so test/workbench-grouped-fixture.test.ts
// hands in the TypeScript sources and qa/workbench/inspector-grouped-bench.mjs hands in the compiled
// build; neither path is named here.
//
// Determinism follows the header of test/helpers/perf-fixtures.ts: no wall-clock read and no unseeded
// randomness anywhere in this file. Every timestamp is FIXTURE_EPOCH_MS plus or minus whole seconds,
// and all variation comes from one seeded mulberry32 stream.
//
// Measurement-only. Production caps (observation.ts defaults, the Pi runtime projection) are not
// touched. Pass "default-limits" constructs the projection with NO argument and reports FIFO truncation
// as retained-versus-offered counts. Pass "bench-only-limits" uses BENCH_ONLY_LIMITS, which exist only
// in this file, and reports navigation, layout and resize timing. A slow result is recorded honestly and
// never tuned away; cap raises and supernode aggregation are later decisions this receipt informs.

export const FIXTURE_CONTRACT = 'workbench.grouped-fixture/v1';
export const RECEIPT_CONTRACT = 'workbench.inspector-grouped-bench/v1';
/** 2026-10-15T00:00:00.000Z, the one epoch every fixture timestamp is derived from. */
export const FIXTURE_EPOCH_MS = 1_792_022_400_000;
export const SCOPE = Object.freeze({workspace: 'w21-grouped-bench', principal: 'fixture-reader'});
export const INVOCATION_ID = 'w21-grouped-run';
export const FIXTURE_PROVENANCE = 'fixture-producer';
export const PROVIDERS = Object.freeze(['forge', 'furnace', 'claude-agent-sdk']);
export const GROUPED_FIXTURE_DEFAULTS = Object.freeze({seed: 21, nodes: 10_000, depth: 5, ticks: 2_000});
/** The W21 claim (docs/workbench/14 "Performance benchmark", docs/workbench/15 W21). */
export const W21_SHAPE = Object.freeze({
  minOperations: 10_000, depth: 5, minUpdates: 100_000, minTicks: 100,
  minChangesPerTick: 1, maxChangesPerTick: 100, minKeypresses: 1_000,
});
/** Proposed responsive target, docs/workbench/14: <=20 ms per navigation/layout calculation. */
export const NAVIGATION_TARGET_MS = 20;
/** Bench-only projection limits for the full-10k pass. Defined here once; never in src/. */
export const BENCH_ONLY_LIMITS = Object.freeze({maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40});
export const DEFAULT_SAMPLING = Object.freeze({blocks: 16, keypressesPerBlock: 100, resizeSamples: 200});
/** Consecutive entries always differ in terminal dimensions, so every size change is a real resize. */
export const SIZES = Object.freeze([
  Object.freeze({label: '80x24', width: 80, rows: 24, ascii: false}),
  Object.freeze({label: '120x40', width: 120, rows: 40, ascii: false}),
  Object.freeze({label: '80x24-ascii', width: 80, rows: 24, ascii: true}),
  Object.freeze({label: '120x40-ascii', width: 120, rows: 40, ascii: true}),
]);

const OPTION_BOUNDS = Object.freeze({depth: 6, nodes: 100_000, ticks: 20_000});
const ROOT_GROUPS = 2;
const FANOUT = Object.freeze({min: 3, spread: 3});
const DEPENDENCY_EVERY = 7;
const HYPOTHESIS_EVERY = 13;
const EPOCH_ISO = new Date(FIXTURE_EPOCH_MS).toISOString();
const TRACE = Object.freeze({invocationId: INVOCATION_ID});
/** Every title carries this mount: a path separator, kana and a combining acute accent. */
const ROOT_PATH = '/ワークスペース/proje\u0301ct';
const SEGMENTS = Object.freeze([
  '工作流', 'ワークフロー', '모듈', 'Пакет', 'Ενότητα', 'cafe\u0301', 'pin\u0303ata', 'a\u030angstro\u0308m',
  'कार्य', '長い名前の作業ディレクトリ', '数据管道', '빌드-단계', 'U\u0308ni\u0308co\u0308de\u0301',
  'nai\u0308ve-re\u0301sume\u0301', '測試套件', 'संकलन',
]);
const OPERATION_SEGMENTS = Object.freeze(['タスク', '작업', 'задача', 'εργασία', 'ta\u0302che\u0323', '任务', 'कदम', 'e\u0301tape']);
const LONG_TAIL = '/深い/階層の/とても長い/パス名-e\u0301\u0323';
const STATUS_TEXT = Object.freeze({active: 'RUNNING', waiting: 'WAITING', success: 'SUCCEEDED', failure: 'FAILED'});
const VIEWS = Object.freeze(['overview', 'graph', 'timeline', 'details']);
const KEYS = Object.freeze(['j', 'k', 'tab', 'enter', 'f']);
const KEY_DATA = Object.freeze({j: 'j', k: 'k', tab: '\t', enter: '\r', f: 'f'});
const WINDOW_PAGE = 100;
/** At or below both the default and the bench-only query caps, so a full page is detectable. */
const RELATION_PAGE = 40;
const GROUP_STRIDE = 37;

const isoAt = seconds => new Date(FIXTURE_EPOCH_MS + seconds * 1_000).toISOString();
const byteLength = text => Buffer.byteLength(text);
const refKey = ref => JSON.stringify([ref.provider, ref.type, ref.scope ?? '', ref.id]);
const round = value => Math.round(value * 10_000) / 10_000;
const clock = () => performance.now();

/** mulberry32: a small, fully deterministic 32-bit generator. */
function seeded(seed) {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
  const int = bound => Math.floor(next() * bound);
  return {
    next,
    int,
    pick: items => items[int(items.length)],
    hex: words => {
      let out = '';
      for (let i = 0; i < words; i++) out += int(4_294_967_296).toString(16).padStart(8, '0');
      return out;
    },
  };
}

function integerOption(name, value, min, max) {
  if (!Number.isSafeInteger(value) || value < min || value > max) {
    throw new RangeError(`buildGroupedFixture: ${name} must be an integer in ${min}..${max} (got ${String(value)}).`);
  }
  return value;
}

/** Seeded per-tick change counts: every block of 100 ticks is a shuffle of 1..100. */
function tickCounts(ticks, rng) {
  const counts = [];
  while (counts.length < ticks) {
    const block = Array.from({length: W21_SHAPE.maxChangesPerTick}, (_, i) => i + 1);
    for (let i = block.length - 1; i > 0; i--) {
      const j = rng.int(i + 1);
      [block[i], block[j]] = [block[j], block[i]];
    }
    counts.push(...block);
  }
  return counts.slice(0, ticks);
}

function nextStatus(status, rng) {
  if (status !== 'active') return 'active';
  const roll = rng.next();
  return roll < 0.45 ? 'waiting' : roll < 0.85 ? 'success' : 'failure';
}

/**
 * Deterministic W21 fixture as plain data:
 * - `nodes` sdk-operation snapshots under exactly `depth` nested group levels (2 roots, seeded fan-out
 *   3..5), every level stated by a fixture-producer 'grouping' relation; operations sit under level-`depth`
 *   groups; snapshots are in depth-first producer order.
 * - partial links between operations: a 'dependency' on every 7th operation (from an operation emitted
 *   earlier) and a 'hypothesis' on every 13th; never ownership, which needs native confirmation.
 * - forge/furnace/claude-agent-sdk operations with colliding numeric ids (id n exists for all three), so
 *   only provider-qualified keys tell them apart; one scope and one invocationId throughout.
 * - long Unicode paths in every title (kana, CJK, Hangul, combining marks) and transcript payload
 *   references (declared sizes of 1-64 MiB) on every operation, never transcript bodies.
 * - `ticks` ticks of 1..100 distinct status changes each (a shuffled 1..100 per 100 ticks), contiguous
 *   per-source sequences after the snapshot's sequence 1, one second of fixed-epoch time per tick.
 */
export function buildGroupedFixture(options = {}) {
  const merged = {...GROUPED_FIXTURE_DEFAULTS, ...options};
  if (!Number.isSafeInteger(merged.seed)) throw new RangeError(`buildGroupedFixture: seed must be a safe integer (got ${String(merged.seed)}).`);
  const seed = merged.seed;
  const nodes = integerOption('nodes', merged.nodes, 1, OPTION_BOUNDS.nodes);
  const depth = integerOption('depth', merged.depth, 1, OPTION_BOUNDS.depth);
  const ticks = integerOption('ticks', merged.ticks, 1, OPTION_BOUNDS.ticks);
  const rng = seeded(seed);

  const leaves = [];
  const makeGroup = (parent, level, ordinal) => {
    const id = parent ? `${parent.ref.id}.${ordinal}` : `g${ordinal}`;
    const path = `${parent ? parent.path : ROOT_PATH}/${rng.pick(SEGMENTS)}-${level}.${ordinal}`;
    const group = {
      ref: Object.freeze({provider: FIXTURE_PROVENANCE, type: 'group', id}),
      parent, level, path, children: [], operations: [],
    };
    group.presentation = Object.freeze({title: `グループ L${level} · ${path}`, type: 'group', statusText: 'GROUP', statusTone: 'unknown'});
    return group;
  };
  const grow = group => {
    if (group.level === depth) {
      leaves.push(group);
      return;
    }
    const fanout = FANOUT.min + rng.int(FANOUT.spread);
    for (let i = 0; i < fanout; i++) {
      const child = makeGroup(group, group.level + 1, i);
      group.children.push(child);
      grow(child);
    }
  };
  const roots = [];
  for (let r = 0; r < ROOT_GROUPS; r++) {
    const root = makeGroup(undefined, 1, r);
    roots.push(root);
    grow(root);
  }
  for (let i = leaves.length - 1; i > 0; i--) {
    const j = rng.int(i + 1);
    [leaves[i], leaves[j]] = [leaves[j], leaves[i]];
  }

  const operations = [];
  for (let index = 0; index < nodes; index++) {
    const provider = PROVIDERS[index % PROVIDERS.length];
    const id = String(Math.floor(index / PROVIDERS.length));
    const leaf = leaves[index % leaves.length];
    const tail = LONG_TAIL.repeat(1 + rng.int(2));
    const title = `操作 ${provider}#${id} · ${leaf.path}/${rng.pick(OPERATION_SEGMENTS)}-${index}${tail}`;
    const chunks = Array.from({length: 24}, (_, k) => `c${k}-${rng.hex(1)}`).join(',');
    const payloadRef = `transcript-ref://${provider}/operation/${id}/transcript.jsonl?bytes=${(1 + rng.int(64)) * 1_048_576}&sha256=${rng.hex(8)}&chunks=${chunks}`;
    const status = rng.next() < 0.6 ? 'active' : 'waiting';
    const operation = {
      index, provider, ref: Object.freeze({provider, type: 'operation', id}), title, payloadRef,
      status, sequence: 1, startedAt: status === 'active' ? isoAt(-rng.int(3_600)) : undefined, nodes: {},
    };
    leaf.operations.push(operation);
    operations.push(operation);
  }
  const nodeOf = (operation, status) => {
    operation.nodes[status] ??= Object.freeze({
      presentation: Object.freeze({title: operation.title, type: 'sdk-operation', statusText: STATUS_TEXT[status], statusTone: status}),
    });
    return operation.nodes[status];
  };

  const snapshots = [];
  const relations = [];
  const relation = (from, to, kind) => ({scope: SCOPE, from, to, kind, provenance: {source: FIXTURE_PROVENANCE, observedAt: EPOCH_ISO}});
  const emitted = [];
  const dependencyOffset = rng.int(DEPENDENCY_EVERY);
  const hypothesisOffset = rng.int(HYPOTHESIS_EVERY);
  const emitOperation = (operation, leaf) => {
    snapshots.push({
      source: operation.ref, scope: SCOPE, capturedAt: EPOCH_ISO, observedAt: EPOCH_ISO, sequence: 1, coverage: 'partial',
      node: nodeOf(operation, operation.status).presentation, kind: 'fixture.operation.snapshot', trace: TRACE,
      nativePayloadRef: operation.payloadRef,
      ...(operation.startedAt === undefined ? {} : {interval: {startedAt: operation.startedAt}}),
    });
    relations.push(relation(leaf.ref, operation.ref, 'grouping'));
    const ordinal = emitted.length;
    if ((ordinal + dependencyOffset) % DEPENDENCY_EVERY === 0 && ordinal > 0) {
      relations.push(relation(rng.pick(emitted).ref, operation.ref, 'dependency'));
    }
    if ((ordinal + hypothesisOffset) % HYPOTHESIS_EVERY === 0 && operations.length > 1) {
      let target = rng.pick(operations);
      if (target === operation) target = operations[(operation.index + 1) % operations.length];
      relations.push(relation(operation.ref, target.ref, 'hypothesis'));
    }
    emitted.push(operation);
  };
  const emitGroup = group => {
    snapshots.push({
      source: group.ref, scope: SCOPE, capturedAt: EPOCH_ISO, observedAt: EPOCH_ISO, sequence: 1, coverage: 'partial',
      node: group.presentation, kind: 'fixture.group.snapshot', trace: TRACE,
    });
    if (group.parent) relations.push(relation(group.parent.ref, group.ref, 'grouping'));
    for (const child of group.children) emitGroup(child);
    for (const operation of group.operations) emitOperation(operation, group);
  };
  for (const root of roots) emitGroup(root);

  const updates = [];
  const counts = tickCounts(ticks, rng);
  for (let tick = 0; tick < ticks; tick++) {
    const observedAt = isoAt(tick + 1);
    const changed = new Set();
    const wanted = Math.min(counts[tick], operations.length);
    while (changed.size < wanted) changed.add(rng.int(operations.length));
    let ordinal = 0;
    for (const index of changed) {
      const operation = operations[index];
      const status = nextStatus(operation.status, rng);
      operation.sequence += 1;
      const update = {
        projectionEventId: `w21:${seed}:${tick}:${ordinal++}`,
        source: operation.ref, scope: SCOPE, sourceSequence: operation.sequence, observedAt,
        kind: 'native.status', node: nodeOf(operation, status), trace: TRACE,
      };
      if (operation.provider === 'claude-agent-sdk') update.payloadRef = operation.payloadRef;
      if (status === 'active' && (operation.status !== 'waiting' || operation.startedAt === undefined)) {
        operation.startedAt = observedAt;
        update.interval = {startedAt: observedAt};
      } else if ((status === 'success' || status === 'failure') && operation.startedAt !== undefined) {
        update.interval = {startedAt: operation.startedAt, endedAt: observedAt};
      }
      operation.status = status;
      updates.push(update);
    }
  }
  return {snapshots, relations, updates, shape: shapeOf(seed, snapshots, relations, updates)};
}

/** Shape realised by the returned arrays, recounted from them rather than from construction counters. */
function shapeOf(seed, snapshots, relations, updates) {
  let nodes = 0;
  let groups = 0;
  let minTitleBytes = Number.POSITIVE_INFINITY;
  let maxTitleBytes = 0;
  let payloadRefs = 0;
  let minPayloadRefBytes = Number.POSITIVE_INFINITY;
  let maxPayloadRefBytes = 0;
  const providers = {};
  const providersOfId = new Map();
  const measureRef = ref => {
    const size = byteLength(ref);
    payloadRefs++;
    minPayloadRefBytes = Math.min(minPayloadRefBytes, size);
    maxPayloadRefBytes = Math.max(maxPayloadRefBytes, size);
  };
  for (const snapshot of snapshots) {
    const size = byteLength(snapshot.node.title);
    minTitleBytes = Math.min(minTitleBytes, size);
    maxTitleBytes = Math.max(maxTitleBytes, size);
    if (snapshot.nativePayloadRef !== undefined) measureRef(snapshot.nativePayloadRef);
    if (snapshot.node.type === 'group') {
      groups++;
      continue;
    }
    nodes++;
    const {provider, id} = snapshot.source;
    providers[provider] = (providers[provider] ?? 0) + 1;
    const owners = providersOfId.get(id) ?? new Set();
    owners.add(provider);
    providersOfId.set(id, owners);
  }
  const kinds = {grouping: 0, dependency: 0, hypothesis: 0, ownership: 0, causation: 0};
  const parent = new Map();
  for (const item of relations) {
    kinds[item.kind] += 1;
    if (item.kind === 'grouping') parent.set(refKey(item.to), refKey(item.from));
  }
  let depth = 0;
  let minDepth = Number.POSITIVE_INFINITY;
  for (const snapshot of snapshots) {
    if (snapshot.node.type === 'group') continue;
    let ancestors = 0;
    for (let at = parent.get(refKey(snapshot.source)); at !== undefined && ancestors <= 64; at = parent.get(at)) ancestors++;
    depth = Math.max(depth, ancestors);
    minDepth = Math.min(minDepth, ancestors);
  }
  let ticks = 0;
  let run = 0;
  let minChangesPerTick = Number.POSITIVE_INFINITY;
  let maxChangesPerTick = 0;
  let tickAt;
  const closeTick = () => {
    if (run === 0) return;
    minChangesPerTick = Math.min(minChangesPerTick, run);
    maxChangesPerTick = Math.max(maxChangesPerTick, run);
  };
  for (const update of updates) {
    if (update.observedAt !== tickAt) {
      closeTick();
      tickAt = update.observedAt;
      run = 0;
      ticks++;
    }
    run++;
    if (update.payloadRef !== undefined) measureRef(update.payloadRef);
  }
  closeTick();
  const finite = value => (Number.isFinite(value) ? value : 0);
  return {
    contract: FIXTURE_CONTRACT,
    seed,
    nodes,
    groups,
    snapshots: snapshots.length,
    depth,
    minDepth: finite(minDepth),
    groupingEdges: kinds.grouping,
    dependencyEdges: kinds.dependency,
    hypothesisEdges: kinds.hypothesis,
    ownershipEdges: kinds.ownership,
    causationEdges: kinds.causation,
    updates: updates.length,
    ticks,
    minChangesPerTick: finite(minChangesPerTick),
    maxChangesPerTick,
    providers,
    collidingIds: [...providersOfId.values()].filter(owners => owners.size > 1).length,
    minTitleBytes: finite(minTitleBytes),
    maxTitleBytes,
    payloadRefs,
    minPayloadRefBytes: finite(minPayloadRefBytes),
    maxPayloadRefBytes,
  };
}

/** Whether a realised fixture shape is the W21 claim; each violated rule is named (bench exit 2). */
export function assessFixtureShape(shape) {
  const violations = [];
  const need = (ok, rule, detail) => {
    if (!ok) violations.push({rule, detail});
  };
  need(shape.nodes >= W21_SHAPE.minOperations, 'operations-below-10000', `${shape.nodes} operations; W21 needs >= ${W21_SHAPE.minOperations}`);
  need(shape.depth === W21_SHAPE.depth && shape.minDepth === W21_SHAPE.depth, 'depth-not-5', `operations nest ${shape.minDepth}..${shape.depth} group levels deep; W21 needs exactly ${W21_SHAPE.depth}`);
  need(shape.groupingEdges > 0, 'no-grouping-edges', 'no grouping relation states the nesting');
  need(shape.dependencyEdges > 0, 'no-dependency-edges', 'no partial dependency links');
  need(shape.dependencyEdges < shape.nodes, 'dependency-edges-not-partial', `${shape.dependencyEdges} dependency links for ${shape.nodes} operations; links must be partial`);
  need(shape.hypothesisEdges > 0, 'no-hypothesis-edges', 'no partial hypothesis links');
  need(shape.ownershipEdges === 0, 'ownership-edges-present', `${shape.ownershipEdges} ownership edges; a fixture cannot supply native ownership confirmation`);
  need(shape.updates >= W21_SHAPE.minUpdates, 'updates-below-100000', `${shape.updates} updates; W21 needs >= ${W21_SHAPE.minUpdates}`);
  need(shape.ticks >= W21_SHAPE.minTicks, 'ticks-below-100', `${shape.ticks} ticks; W21 needs >= ${W21_SHAPE.minTicks}`);
  need(
    shape.minChangesPerTick >= W21_SHAPE.minChangesPerTick && shape.maxChangesPerTick <= W21_SHAPE.maxChangesPerTick,
    'changes-per-tick-outside-1-100',
    `${shape.minChangesPerTick}..${shape.maxChangesPerTick} changes per tick; W21 needs 1..100`,
  );
  return {realised: violations.length === 0, violations};
}

/** p50/p95/max in ms (0.1 us rounding) with the sample count; an empty series has nulls, never zeros. */
function distribution(values) {
  if (values.length === 0) return {samples: 0, p50: null, p95: null, max: null};
  const sorted = Float64Array.from(values).sort();
  const at = quantile => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * quantile))];
  return {samples: sorted.length, p50: round(at(0.5)), p95: round(at(0.95)), max: round(sorted[sorted.length - 1])};
}

function groupedDistribution(samples, field, names) {
  return Object.fromEntries(names.map(name => [name, distribution(samples.filter(sample => sample[field] === name).map(sample => sample.ms))]));
}

function offeredOf(fixture) {
  const {shape} = fixture;
  return {
    nodes: fixture.snapshots.length, groups: shape.groups, operations: shape.nodes, edges: fixture.relations.length,
    groupingEdges: shape.groupingEdges, dependencyEdges: shape.dependencyEdges, hypothesisEdges: shape.hypothesisEdges,
    updates: fixture.updates.length,
  };
}

function applyFixture(projection, fixture) {
  let refreshApplied = 0;
  let refreshOutOfOrder = 0;
  const started = clock();
  for (const snapshot of fixture.snapshots) {
    if (projection.refresh(snapshot) === 'applied') refreshApplied++;
    else refreshOutOfOrder++;
  }
  const refreshed = clock();
  for (const item of fixture.relations) projection.relate(item);
  const related = clock();
  const results = {applied: 0, duplicate: 0, 'out-of-order': 0};
  const perTick = [];
  let tickAt;
  let tickStarted = related;
  for (const update of fixture.updates) {
    if (update.observedAt !== tickAt) {
      const now = clock();
      if (tickAt !== undefined) perTick.push(now - tickStarted);
      tickAt = update.observedAt;
      tickStarted = now;
    }
    results[projection.ingest(update)] += 1;
  }
  const ingested = clock();
  if (tickAt !== undefined) perTick.push(ingested - tickStarted);
  const ingestMs = ingested - related;
  return {
    refreshMs: round(refreshed - started),
    relateMs: round(related - refreshed),
    ingestMs: round(ingestMs),
    eventsPerSecond: ingestMs > 0 ? Math.round(fixture.updates.length / (ingestMs / 1_000)) : 0,
    refreshApplied,
    refreshOutOfOrder,
    ingestApplied: results.applied,
    ingestDuplicate: results.duplicate,
    ingestOutOfOrder: results['out-of-order'],
    ingestPerTick: distribution(perTick),
  };
}

/** Retained rows and edges, read only through the bounded window() and relations() APIs. */
function censusOf(projection) {
  const head = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1});
  const rows = {rows: head.total, groups: 0, operations: 0, current: 0, stale: 0, unknown: 0};
  const providers = {};
  const keys = new Set();
  const groupRows = [];
  for (let offset = 0; offset < head.total; offset += WINDOW_PAGE) {
    const page = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: WINDOW_PAGE});
    for (const [at, node] of page.nodes.entries()) {
      keys.add(node.key);
      if (node.presentation.type === 'group') {
        rows.groups++;
        groupRows.push(offset + at);
      } else rows.operations++;
      rows[node.freshness] += 1;
      providers[node.nativeRef.provider] = (providers[node.nativeRef.provider] ?? 0) + 1;
    }
  }
  const edgesByKind = {};
  let between = 0;
  let complete = true;
  for (const key of keys) {
    const incoming = projection.relations({scope: SCOPE, to: key, limit: RELATION_PAGE});
    if (incoming.length >= RELATION_PAGE) complete = false;
    for (const item of incoming) {
      if (!keys.has(item.from)) continue;
      between++;
      edgesByKind[item.kind] = (edgesByKind[item.kind] ?? 0) + 1;
    }
  }
  const census = {...rows, providers, edgesBetweenRetainedRows: between, edgesByKind, danglingEdges: projection.stats().edges - between, complete};
  return {census, groupRows};
}

/** Deterministic key mix: mostly j, every 4th k, Enter on a group row every 17th, f every 41st, Tab every 25th. */
const keyAt = step =>
  step % 25 === 24 ? 'tab' : step % 41 === 40 ? 'f' : step % 17 === 16 ? 'enter' : step % 4 === 3 ? 'k' : 'j';

const changedBytes = (previous, lines) =>
  lines.reduce((sum, line, at) => sum + (line === previous[at] ? 0 : byteLength(line) + 1), 0);

function navigate(projection, inspector, plan, groupRows) {
  const model = {projection, scope: SCOPE, invocationId: INVOCATION_ID, title: 'W21 grouped fixture · ワークフロー', status: 'running'};
  let state = inspector.initialInspectorState();
  const samples = [];
  const resize = [];
  const changed = [];
  let frames = 0;
  let maxRenderedRows = 0;
  let maxTerminalBytes = 0;
  let maxChangedBytes = 0;
  let enters = 0;
  let enterOnGroupRows = 0;
  let step = 0;
  let sizeAt = -1;
  const frame = lines => {
    frames++;
    maxRenderedRows = Math.max(maxRenderedRows, lines.length);
    maxTerminalBytes = Math.max(maxTerminalBytes, byteLength(lines.join('\n')));
  };
  const resizeTo = () => {
    sizeAt = (sizeAt + 1) % SIZES.length;
    const size = SIZES[sizeAt];
    const begin = clock();
    const lines = inspector.layoutInspector(model, state, size);
    resize.push(clock() - begin);
    frame(lines);
    return {size, lines};
  };
  for (let block = 0; block < plan.blocks; block++) {
    const resized = resizeTo();
    const size = resized.size;
    let previous = resized.lines;
    for (let press = 0; press < plan.keypressesPerBlock; press++, step++) {
      const key = keyAt(step);
      if (key === 'enter' && groupRows.length > 0) {
        // Untimed jump standing in for the j/k presses a user makes to reach a group row. The timed Enter
        // collapses that group; the next Enter returns to the same row and expands it.
        const at = groupRows[(Math.floor(enters / 2) * GROUP_STRIDE) % groupRows.length];
        const row = projection.window({scope: SCOPE, invocationId: INVOCATION_ID, offset: at, limit: 1}).nodes[0];
        state = {...state, index: at, selected: row?.key ?? null};
        if (row?.presentation.type === 'group') enterOnGroupRows++;
        enters++;
      }
      const begin = clock();
      const result = inspector.reduceInspectorKey(KEY_DATA[key], state, model);
      const reduced = clock();
      state = result?.state ?? state;
      const lines = inspector.layoutInspector(model, state, size);
      const laid = clock();
      samples.push({ms: laid - begin, reducerMs: reduced - begin, layoutMs: laid - reduced, view: state.view, size: size.label, key});
      frame(lines);
      const diff = changedBytes(previous, lines);
      changed.push(diff);
      maxChangedBytes = Math.max(maxChangedBytes, diff);
      previous = lines;
    }
  }
  for (let sample = 0; sample < plan.resizeSamples; sample++) {
    // Move to the next view (untimed) once per round of sizes, so resizes are sampled in every view.
    if (sample > 0 && sample % SIZES.length === 0) state = inspector.reduceInspectorKey('\t', state, model)?.state ?? state;
    resizeTo();
  }
  return {
    keypresses: samples.length,
    frames,
    enterOnGroupRows,
    all: distribution(samples.map(sample => sample.ms)),
    reducer: distribution(samples.map(sample => sample.reducerMs)),
    layout: distribution(samples.map(sample => sample.layoutMs)),
    resize: distribution(resize),
    changedBytes: distribution(changed),
    byView: groupedDistribution(samples, 'view', VIEWS),
    bySize: groupedDistribution(samples, 'size', SIZES.map(size => size.label)),
    byKey: groupedDistribution(samples, 'key', KEYS),
    maxRenderedRows,
    maxTerminalBytes,
    maxChangedBytes,
  };
}

function measurePass({label, Projection, inspector, fixture, limits, plan}) {
  const heapBefore = process.memoryUsage().heapUsed;
  const projection = limits === undefined ? new Projection() : new Projection(limits);
  const apply = applyFixture(projection, fixture);
  const retained = projection.stats();
  const {census, groupRows} = censusOf(projection);
  const navigation = plan === undefined ? null : navigate(projection, inspector, plan, groupRows);
  const heapGrowthBytes = process.memoryUsage().heapUsed - heapBefore;
  const offered = offeredOf(fixture);
  return {
    label,
    limits: limits === undefined ? 'default' : {...limits},
    limitsLabel: limits === undefined
      ? 'default caps: constructed with no argument, never raised'
      : 'bench-only: a constructor argument defined in qa/workbench/grouped-fixture.mjs, never in src/',
    constructorArgs: limits === undefined ? 0 : 1,
    offered,
    apply,
    retained,
    census,
    truncation: {
      truncated: retained.nodes < offered.nodes || retained.edges < offered.edges,
      nodesNotRetained: offered.nodes - retained.nodes,
      edgesNotRetained: offered.edges - retained.edges,
      eviction: 'fifo (observation.ts store and relate)',
    },
    heapGrowthBytes,
    heapLabel: 'transient-inclusive',
    navigation,
  };
}

function judgedSeries(navigation) {
  return [
    ['navigation', navigation.all],
    ['resize', navigation.resize],
    ...VIEWS.map(view => [`view:${view}`, navigation.byView[view]]),
    ...SIZES.map(size => [`size:${size.label}`, navigation.bySize[size.label]]),
  ];
}

/**
 * Recomputes realisation and the target judgement from a receipt's own measured fields.
 * Exit 2: not the W21 claim (fixture shape, fewer than 1,000 keypresses, a truncated or unmeasured
 * bench-only pass, an unsampled series). Exit 1: realised, but a judged bench-only p95 is over 20 ms.
 */
export function assessReceipt(receipt) {
  const violations = [...assessFixtureShape(receipt.fixture).violations];
  const pass = receipt.passes?.['bench-only-limits'];
  const navigation = pass?.navigation ?? null;
  if (!pass || !navigation) violations.push({rule: 'bench-only-pass-not-measured', detail: 'the bench-only pass recorded no navigation'});
  else {
    if (navigation.keypresses < W21_SHAPE.minKeypresses) {
      violations.push({rule: 'keypresses-below-1000', detail: `${navigation.keypresses} keypresses; W21 needs >= ${W21_SHAPE.minKeypresses}`});
    }
    if (pass.retained.nodes < pass.offered.nodes || pass.retained.edges < pass.offered.edges) {
      violations.push({
        rule: 'bench-only-pass-truncated',
        detail: `retained ${pass.retained.nodes}/${pass.offered.nodes} nodes and ${pass.retained.edges}/${pass.offered.edges} edges`,
      });
    }
  }
  const series = navigation ? judgedSeries(navigation) : [];
  for (const [name, value] of series) {
    if (!value || value.samples === 0 || value.p95 === null) violations.push({rule: 'series-not-sampled', detail: `${name} has no samples`});
  }
  const over = series.filter(([, value]) => value && value.p95 !== null && value.p95 > NAVIGATION_TARGET_MS).map(([name]) => name);
  const realised = violations.length === 0;
  const exitCode = !realised ? 2 : over.length > 0 ? 1 : 0;
  return {
    target: {ms: NAVIGATION_TARGET_MS, statistic: 'p95', pass: 'bench-only-limits', judged: series.map(([name]) => name), over},
    realised,
    violations,
    verdict: exitCode === 2 ? 'not-w21-shape' : exitCode === 1 ? 'over-target' : 'within-target',
    exitCode,
  };
}

export const exitCodeFor = receipt => assessReceipt(receipt).exitCode;

/**
 * Both passes over one fixture, as one receipt. `Projection` is the ObservationProjection class and
 * `inspector` is {initialInspectorState, layoutInspector, reduceInspectorKey}; `host` carries utc,
 * revision, node, arch, platform, cpus, cpuModel, toolchain and command.
 */
export function runGroupedBench({Projection, inspector, fixture, host, sampling = DEFAULT_SAMPLING}) {
  const plan = {blocks: sampling.blocks, keypressesPerBlock: sampling.keypressesPerBlock, resizeSamples: sampling.resizeSamples};
  const passes = {
    'default-limits': measurePass({label: 'default-limits', Projection, inspector, fixture, limits: undefined, plan: undefined}),
    'bench-only-limits': measurePass({label: 'bench-only-limits', Projection, inspector, fixture, limits: BENCH_ONLY_LIMITS, plan}),
  };
  const receipt = {
    contract: RECEIPT_CONTRACT,
    benchmark: 'inspector-grouped-10k',
    measured: true,
    aggregation: 'none: supernode aggregation and cap changes are later decisions this receipt informs',
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
    sampling: {...plan, keypresses: plan.blocks * plan.keypressesPerBlock, warmupKeypresses: 0, sizes: SIZES.map(size => size.label)},
    passes,
  };
  return {...receipt, ...assessReceipt(receipt)};
}

// wb-9x5.6: the measurement internals the cap-saturation bench (qa/workbench/cap-saturation.mjs) reuses
// rather than duplicates. Additive: nothing above changed.
export {applyFixture, censusOf, distribution, navigate};
