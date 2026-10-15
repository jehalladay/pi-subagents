// W21-B (wb-6ze.5): observation recovery and bounded-query size receipt.
// Pure fixture, measurement and judgement. This module imports nothing and does no I/O: the bench
// CLI hands it the compiled ObservationProjection class and the offline test hands it the source
// class, and either way only the public projection API is driven.
//
// Determinism follows the header rules of test/helpers/perf-fixtures.ts: every timestamp derives
// from one fixed epoch, every varying field from a seeded PRNG, and nothing in the measured path
// reads a wall clock or a random source. The only clock is the injected monotonic timer that times
// individual calls, and the only memory reading is the injected heap probe.
//
// Measurement order per pass: baseline read-current snapshots (every node current) and fixture
// relations; ingest every update; bounded census through window() pages; disconnect(provider);
// census; reconnect(provider) ALONE; census (the reconnect-alone falsifier); one refresh() per node
// of that provider, each timed on its own; census; then an evicted cursor and a retained cursor.
// The provider population each census sees is recorded, so a node that leaves the window pages cannot
// silently drop out of the stale/current counts.

export const RECEIPT_CONTRACT = 'workbench.observation-recovery/v1';
export const FIXTURE_EPOCH = '2026-10-15T00:00:00.000Z';
export const HEAP_LABEL = 'transient-inclusive';
export const PERCENTILE_METHOD = 'nearest-rank';
/** The projection's documented default retained-event window (MAX_DEFAULT.maxEvents), quoted rather
 * than imported, so a pass constructed with no limits argument is judged against that default. */
export const DOCUMENTED_DEFAULT_MAX_EVENTS = 20_000;
/** window() refuses a page above 100 rows; censuses page through it and queryLimit may not exceed it. */
export const WINDOW_PAGE_CAP = 100;
export const QUERY_METHODS = Object.freeze(['query', 'window', 'relations', 'events']);
/** Measured semantic violations, in the order assessRecovery reports them (exit 1). */
export const FINDING_RULES = Object.freeze([
  'census-population-changed',
  'disconnect-not-stale',
  'reconnect-restored-current',
  'stale-after-full-refresh',
  'gap-not-detected',
  'retained-cursor-gap',
  'retained-window-exceeded',
  'limit-exceeded',
  'ansi-in-result',
]);
/** Probes that did not arm, in the order assessRecovery reports them (exit 2: not the claimed measurement). */
export const UNREALISED_PROBES = Object.freeze([
  'provider-population',
  'falsifier-unarmed',
  'population-truncated',
  'reconcile-incomplete',
  'gap-probe-unarmed',
  'resume-probe-unarmed',
  'relations-probe-unarmed',
  'bound-unexercised',
  'non-finite-measurement',
]);
/** Receipt-level reasons a pass is not realised (exit 2). */
export const RECEIPT_PROBES = Object.freeze(['shape-below-claim', 'measurement-error']);

const WORKSPACE = 'w21-recovery-bench';
const PRINCIPAL = 'bench-reader';
const INVOCATION_ID = 'w21-recovery-run';
const EPOCH_MS = Date.parse(FIXTURE_EPOCH);
const UNICODE_PATH = 'workspace/模块/компонент/ετικέτα/タスク';
const QUEUED = Object.freeze({statusText: 'QUEUED', statusTone: 'waiting'});
const RUNNING = Object.freeze({statusText: 'RUNNING', statusTone: 'active'});
const WAITING = Object.freeze({statusText: 'WAITING', statusTone: 'waiting'});
const FAILED = Object.freeze({statusText: 'FAILED', statusTone: 'failure'});
const SUCCEEDED = Object.freeze({statusText: 'SUCCEEDED', statusTone: 'success'});
const OUTCOME = Object.freeze({applied: 1, duplicate: 2, 'out-of-order': 3});
// Raw ESC / C1 CSI, and their JSON-escaped spellings: JSON.stringify writes ESC as the six characters
// backslash-u-0-0-1-b, which a consumer decodes back into a live escape.
const ANSI_ESCAPE = /\x1b|\x9b|\\u001b|\\u009b/i;

const defaultClock = () => performance.now();
const defaultHeapUsed = () => process.memoryUsage().heapUsed;

/** mulberry32: a small seeded PRNG; the same seed always yields the same stream. */
function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function hexFrom(random, length) {
  let text = '';
  while (text.length < length) text += Math.floor(random() * 4_294_967_296).toString(16).padStart(8, '0');
  return text.slice(0, length);
}

function nativeOf(provider, index) {
  switch (provider) {
    case 'forge':
      return {ref: {provider, type: 'operation', id: `fop_${index}`}, evidence: `forge-operation:fop_${index}`, type: 'sdk-operation', label: 'Forge operation'};
    case 'furnace':
      return {ref: {provider, type: 'run', id: `frn-run-${index}`}, evidence: `furnace-run:frn-run-${index}`, type: 'workflow', label: 'Furnace run'};
    case 'claude-agent-sdk':
      return {ref: {provider, type: 'tool', id: `toolu_${index}`}, evidence: `claude-message:m-${index}`, type: 'agent', label: 'Claude tool'};
    default:
      return {ref: {provider, type: 'operation', id: `op-${index}`}, evidence: `${provider}-operation:op-${index}`, type: 'sdk-operation', label: `${provider} operation`};
  }
}

function sameRef(left, right) {
  return left.provider === right.provider && left.type === right.type && left.id === right.id && (left.scope ?? '') === (right.scope ?? '');
}

function assertFixtureOptions({seed, nodes, events, providers}) {
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffff_ffff) throw new TypeError('buildFixture: seed must be an integer in 0..4294967295.');
  if (!Number.isSafeInteger(nodes) || nodes < 2) throw new TypeError('buildFixture: nodes must be an integer >= 2 (a relation root and its children).');
  if (!Number.isSafeInteger(events) || events < 1) throw new TypeError('buildFixture: events must be a positive integer.');
  if (!Array.isArray(providers) || providers.length === 0 || new Set(providers).size !== providers.length ||
    providers.some(name => typeof name !== 'string' || !/^[a-z][a-z0-9-]{0,63}$/.test(name))) {
    throw new TypeError('buildFixture: providers must be distinct lowercase provider names.');
  }
}

/**
 * Deterministic plain-data fixture: one scope, one invocation, providers assigned round-robin, a
 * read-current baseline snapshot per node (sequence 0), grouping edges from node 0 to every other
 * node plus partial dependency links, an update stream of 1-100 changes per tick with contiguous
 * per-node sequences, and one read-current reconcile snapshot per node taken after the stream.
 */
export function buildFixture(options = {}) {
  assertFixtureOptions(options);
  const {seed, nodes, events, providers} = options;
  const random = seededRandom(seed);
  const scope = {workspace: WORKSPACE, principal: PRINCIPAL};
  const trace = {invocationId: INVOCATION_ID};
  const stamps = new Map();
  const at = seconds => {
    let stamp = stamps.get(seconds);
    if (stamp === undefined) {
      stamp = new Date(EPOCH_MS + seconds * 1000).toISOString();
      stamps.set(seconds, stamp);
    }
    return stamp;
  };

  /** @type {Record<string, number>} */
  const providerCounts = {};
  for (const name of providers) providerCounts[name] = 0;
  const natives = [];
  for (let index = 0; index < nodes; index++) {
    const provider = providers[index % providers.length];
    providerCounts[provider] += 1;
    const native = nativeOf(provider, index);
    const root = index === 0;
    const title = `${root ? 'W21 recovery group' : native.label} ${index} · ${UNICODE_PATH}/${index % 97}/作業-${index}.ts`;
    const type = root ? 'group' : native.type;
    // Projection inputs are copied on ingest, so presentations, evidence lists and wrappers are shared per node.
    const presentation = status => ({title, type, statusText: status.statusText, statusTone: status.statusTone});
    natives.push({
      ref: native.ref,
      evidenceRefs: [native.evidence],
      payloadRef: `transcript:${provider}/${native.ref.id}#sha256:${hexFrom(random, 64)}`,
      presentation,
      streamed: [RUNNING, WAITING, FAILED].map(status => ({presentation: presentation(status)})),
    });
  }

  const baseline = natives.map(native => ({
    source: native.ref,
    scope,
    capturedAt: at(0),
    observedAt: at(1),
    sequence: 0,
    coverage: 'complete',
    nativePayloadRef: native.payloadRef,
    node: native.presentation(QUEUED),
    kind: 'native.snapshot',
    trace,
    evidenceRefs: native.evidenceRefs,
  }));

  const root = natives[0].ref;
  const provenance = {source: 'w21-fixture-trace', observedAt: at(1)};
  const relations = [];
  for (let index = 1; index < nodes; index++) relations.push({scope, from: root, to: natives[index].ref, kind: 'grouping', provenance});
  for (let index = 1; index + 1 < nodes; index++) {
    if (random() < 1 / 3) relations.push({scope, from: natives[index].ref, to: natives[index + 1].ref, kind: 'dependency', provenance});
  }

  const sequence = new Array(nodes).fill(0);
  const updates = [];
  let tick = 2;
  let ticks = 0;
  let minChanges = Number.POSITIVE_INFINITY;
  let maxChanges = 0;
  while (updates.length < events) {
    const changes = Math.min(1 + Math.floor(random() * 100), events - updates.length);
    minChanges = Math.min(minChanges, changes);
    maxChanges = Math.max(maxChanges, changes);
    const observedAt = at(tick);
    for (let change = 0; change < changes; change++) {
      const index = Math.floor(random() * nodes);
      const native = natives[index];
      sequence[index] += 1;
      const roll = random();
      updates.push({
        projectionEventId: `u-${updates.length}`,
        source: native.ref,
        scope,
        sourceSequence: sequence[index],
        sourceTimestamp: observedAt,
        observedAt,
        kind: 'native.status',
        node: native.streamed[roll < 0.8 ? 0 : roll < 0.95 ? 1 : 2],
        trace,
        evidenceRefs: native.evidenceRefs,
        payloadRef: native.payloadRef,
      });
    }
    tick += 1;
    ticks += 1;
  }

  // The source advanced by one while the observer was disconnected; these are its read-current answers.
  const capturedAt = at(tick + 60);
  const observedAt = at(tick + 61);
  const snapshots = natives.map((native, index) => ({
    source: native.ref,
    scope,
    capturedAt,
    observedAt,
    sequence: sequence[index] + 1,
    coverage: 'complete',
    nativePayloadRef: native.payloadRef,
    node: native.presentation(random() < 0.85 ? SUCCEEDED : FAILED),
    kind: 'native.snapshot',
    trace,
    evidenceRefs: native.evidenceRefs,
  }));

  const shape = {
    seed,
    nodes,
    events: updates.length,
    ticks,
    changesPerTick: {min: minChanges, max: maxChanges},
    providers: providerCounts,
    baseline: baseline.length,
    snapshots: snapshots.length,
    relations: relations.length,
    scopes: 1,
    invocations: 1,
    epoch: FIXTURE_EPOCH,
  };
  return {seed, epoch: FIXTURE_EPOCH, scope, invocationId: INVOCATION_ID, relationRoot: root, baseline, updates, snapshots, relations, shape};
}

/** Count the invocation through bounded window() pages; stale means freshness !== "current". */
function census(projection, scope, invocationId, provider, pageLimit) {
  const byProvider = new Map();
  const tally = {pages: 0, rows: 0, providerNodes: 0, current: 0, notCurrent: 0};
  for (let offset = 0; ; offset += pageLimit) {
    const page = projection.window({scope, invocationId, offset, limit: pageLimit});
    tally.pages += 1;
    for (const node of page.nodes) {
      tally.rows += 1;
      const name = node.nativeRef.provider;
      byProvider.set(name, (byProvider.get(name) ?? 0) + 1);
      if (name !== provider) continue;
      tally.providerNodes += 1;
      if (node.freshness === 'current') tally.current += 1;
      else tally.notCurrent += 1;
    }
    if (page.nodes.length === 0 || offset + pageLimit >= page.total) break;
  }
  const names = [...byProvider.keys()].sort();
  return {...tally, byProvider: Object.fromEntries(names.map(name => [name, byProvider.get(name)]))};
}

function emptySizes() {
  const zero = () => ({query: 0, window: 0, relations: 0, events: 0});
  return {bytes: zero(), rows: zero(), bound: {query: true, window: true, relations: true, events: true}, ansi: new Set()};
}

function note(sizes, method, result, rows, exercised) {
  const text = JSON.stringify(result);
  sizes.bytes[method] = Math.max(sizes.bytes[method], Buffer.byteLength(text, 'utf8'));
  sizes.rows[method] = Math.max(sizes.rows[method], rows);
  if (exercised !== undefined) sizes.bound[method] = sizes.bound[method] && exercised;
  if (ANSI_ESCAPE.test(text)) sizes.ansi.add(method);
}

/** One bounded read per model-facing method; "exercised" means the limit actually cut the answer. */
function sampleSizes(projection, probe, sizes) {
  const {scope, invocationId, rootKey, rootFanOut, queryLimit} = probe;
  const queried = projection.query({scope, invocationId, limit: queryLimit});
  note(sizes, 'query', queried, queried.nodes.length, queried.truncated === true);
  const windowed = projection.window({scope, invocationId, offset: 0, limit: queryLimit});
  note(sizes, 'window', windowed, windowed.nodes.length, windowed.total > windowed.nodes.length);
  const related = rootKey === undefined ? [] : projection.relations({scope, from: rootKey, limit: queryLimit});
  note(sizes, 'relations', related, related.length, rootFanOut > queryLimit && related.length === queryLimit);
  const evented = projection.events({scope, limit: queryLimit});
  note(sizes, 'events', evented, evented.events.length, evented.truncated === true);
}

/** Nearest-rank p50/p95/max over individual samples (never an amortised mean). */
export function percentiles(samples) {
  const sorted = Float64Array.from(samples).sort();
  const rank = fraction => (sorted.length === 0 ? null : sorted[Math.ceil(fraction * sorted.length) - 1]);
  return {p50: rank(0.5), p95: rank(0.95), max: sorted.length === 0 ? null : sorted[sorted.length - 1], samples: sorted.length, method: PERCENTILE_METHOD};
}

function cursorOf(update) {
  return {source: {...update.source}, projectionEventId: update.projectionEventId};
}

/**
 * Drive one projection instance through ingest, disconnect, reconnect alone, per-node reconcile and
 * cursor recovery. `limits` omitted constructs with NO argument (the production defaults); latency is
 * reported, never judged. Returns plain JSON-safe data.
 */
export function measureRecovery(ProjectionClass, fixture, options = {}) {
  const {limits, provider, queryLimit, clock = defaultClock, heapUsed = defaultHeapUsed} = options;
  if (typeof ProjectionClass !== 'function') throw new TypeError('measureRecovery: pass the ObservationProjection class to measure.');
  if (typeof provider !== 'string' || provider.length === 0) throw new TypeError('measureRecovery: provider must name the provider to disconnect.');
  if (!Number.isSafeInteger(queryLimit) || queryLimit < 1 || queryLimit > WINDOW_PAGE_CAP) {
    throw new TypeError(`measureRecovery: queryLimit must be an integer in 1..${WINDOW_PAGE_CAP}, the window() page cap.`);
  }
  if (!fixture || !Array.isArray(fixture.updates) || !Array.isArray(fixture.baseline) || !Array.isArray(fixture.snapshots) || !Array.isArray(fixture.relations)) {
    throw new TypeError('measureRecovery: fixture must come from buildFixture.');
  }
  const {scope, invocationId, updates} = fixture;

  const heapBefore = heapUsed();
  const projection = limits === undefined ? new ProjectionClass() : new ProjectionClass(limits);
  for (const snapshot of fixture.baseline) projection.refresh(snapshot);
  for (const relation of fixture.relations) projection.relate(relation);

  const outcomes = new Uint8Array(updates.length);
  const ingestStart = clock();
  for (let index = 0; index < updates.length; index++) outcomes[index] = OUTCOME[projection.ingest(updates[index])];
  const ingestMs = clock() - ingestStart;
  const heapGrowthBytes = heapUsed() - heapBefore;
  const stats = projection.stats();
  const retained = {nodes: stats.nodes, events: stats.events, edges: stats.edges};
  const applied = [];
  let duplicate = 0;
  let outOfOrder = 0;
  for (let index = 0; index < outcomes.length; index++) {
    if (outcomes[index] === OUTCOME.applied) applied.push(index);
    else if (outcomes[index] === OUTCOME.duplicate) duplicate += 1;
    else if (outcomes[index] === OUTCOME['out-of-order']) outOfOrder += 1;
  }

  const rootKey = projection.query({scope, ref: fixture.relationRoot, limit: 1}).nodes[0]?.key;
  const rootFanOut = fixture.relations.filter(relation => sameRef(relation.from, fixture.relationRoot)).length;
  const sizes = emptySizes();
  const sample = () => sampleSizes(projection, {scope, invocationId, rootKey, rootFanOut, queryLimit}, sizes);
  const count = () => census(projection, scope, invocationId, provider, queryLimit);

  const beforeDisconnect = count();
  sample();
  let started = clock();
  projection.disconnect(provider);
  const disconnectMs = clock() - started;
  const afterDisconnect = count();
  started = clock();
  projection.reconnect(provider);
  const reconnectMs = clock() - started;
  const afterReconnect = count();
  sample();

  const reconcile = fixture.snapshots.filter(snapshot => snapshot.source.provider === provider);
  const latencies = new Float64Array(reconcile.length);
  const refreshOutcomes = {applied: 0, outOfOrder: 0};
  const reconcileStart = clock();
  for (let index = 0; index < reconcile.length; index++) {
    const begin = clock();
    const outcome = projection.refresh(reconcile[index]);
    latencies[index] = clock() - begin;
    if (outcome === 'applied') refreshOutcomes.applied += 1;
    else refreshOutcomes.outOfOrder += 1;
  }
  const reconcileMs = clock() - reconcileStart;
  const afterRefresh = count();
  sample();

  const probe = (cursor, armed) => {
    if (cursor === null) return {result: {armed, cursor, completeness: null, rows: 0}, ms: null};
    const begin = clock();
    const answer = projection.events({scope, limit: queryLimit, after: cursor});
    const ms = clock() - begin;
    note(sizes, 'events', answer, answer.events.length, undefined);
    return {result: {armed, cursor, completeness: answer.completeness, rows: answer.events.length}, ms};
  };
  // The retained window holds the newest retained.events applied updates, so the first applied one is
  // outside it exactly when more were applied than retained.
  const gapCursor = applied.length > 0 ? cursorOf(updates[applied[0]]) : null;
  const gap = probe(gapCursor, gapCursor !== null && applied.length > retained.events);
  // A retained cursor with a full page (or the whole window) of newer events after it.
  const resumeCursor = applied.length > 0 && retained.events > 0
    ? cursorOf(updates[applied[applied.length - 1 - Math.min(queryLimit, retained.events - 1)]])
    : null;
  const resume = probe(resumeCursor, resumeCursor !== null);

  return {
    limits: limits === undefined ? 'default' : {...limits},
    provider,
    queryLimit,
    shape: JSON.parse(JSON.stringify(fixture.shape)),
    ingest: {offered: updates.length, applied: applied.length, duplicate, outOfOrder},
    ingestMs,
    eventsPerSecond: ingestMs > 0 ? (updates.length * 1000) / ingestMs : null,
    retained,
    heapGrowthBytes,
    heapLabel: HEAP_LABEL,
    population: {nodes: beforeDisconnect.rows, byProvider: beforeDisconnect.byProvider},
    providerNodes: beforeDisconnect.providerNodes,
    currentBeforeDisconnect: beforeDisconnect.current,
    disconnectMs,
    staleAfterDisconnect: afterDisconnect.notCurrent,
    reconnectMs,
    currentRegainedWithoutSnapshot: afterReconnect.current,
    providerCensus: {
      beforeDisconnect: beforeDisconnect.providerNodes,
      afterDisconnect: afterDisconnect.providerNodes,
      afterReconnect: afterReconnect.providerNodes,
      afterRefresh: afterRefresh.providerNodes,
    },
    refreshCalls: reconcile.length,
    refreshOutcomes,
    refreshLatencyMs: percentiles(latencies),
    reconcileMs,
    staleAfterRefresh: afterRefresh.notCurrent,
    gap: gap.result,
    gapDetectMs: gap.ms,
    resume: resume.result,
    resumeMs: resume.ms,
    queryBytes: sizes.bytes,
    rowsReturned: sizes.rows,
    boundExercised: sizes.bound,
    ansiIn: QUERY_METHODS.filter(method => sizes.ansi.has(method)),
    relationRootFound: rootKey !== undefined,
    censusPages: beforeDisconnect.pages + afterDisconnect.pages + afterReconnect.pages + afterRefresh.pages,
  };
}

function eventWindowOf(limits) {
  if (limits === 'default' || limits === undefined || limits === null || limits.maxEvents === undefined) return DOCUMENTED_DEFAULT_MAX_EVENTS;
  return limits.maxEvents;
}

/**
 * Judge one measurement. Findings are measured semantic violations; unrealised entries say a probe did
 * not arm, so the measurement is not the claimed one. A probe that did not arm is never judged.
 */
export function assessRecovery(measurement) {
  const m = measurement;
  const findings = [];
  const unrealised = [];
  const find = (rule, detail) => findings.push({rule, detail});
  const miss = (probe, detail) => unrealised.push({probe, detail});
  const who = `${m.provider} nodes`;

  if (m.providerNodes === 0) miss('provider-population', `no ${who} in the measured invocation, so nothing was disconnected`);
  if (m.currentBeforeDisconnect !== m.providerNodes) {
    miss('falsifier-unarmed', `${m.currentBeforeDisconnect} of ${m.providerNodes} ${who} were current before disconnect, so reconnect alone could not be falsified for the rest`);
  }
  if (m.population.nodes !== m.shape.nodes) miss('population-truncated', `${m.population.nodes} of ${m.shape.nodes} fixture nodes are retained in the invocation`);
  if (m.refreshCalls !== m.providerNodes) miss('reconcile-incomplete', `${m.refreshCalls} refresh() calls for ${m.providerNodes} ${who}`);
  if (!m.gap.armed) {
    miss('gap-probe-unarmed', `${m.ingest.applied} applied updates fit the ${m.retained.events}-event retained window, so no cursor had been evicted`);
  }
  if (!m.resume.armed) miss('resume-probe-unarmed', 'no retained cursor was available for a resume');
  if (!m.relationRootFound) miss('relations-probe-unarmed', 'the relation root is not retained, so relations() was not measured');
  const unexercised = QUERY_METHODS.filter(method => m.boundExercised[method] !== true);
  if (unexercised.length > 0) {
    miss('bound-unexercised', `${unexercised.join(', ')} never had more matching rows than limit ${m.queryLimit}, so the bound was not exercised`);
  }
  const measured = {
    ingestMs: m.ingestMs,
    eventsPerSecond: m.eventsPerSecond,
    heapGrowthBytes: m.heapGrowthBytes,
    disconnectMs: m.disconnectMs,
    reconnectMs: m.reconnectMs,
    'refreshLatencyMs.p50': m.refreshLatencyMs.p50,
    'refreshLatencyMs.p95': m.refreshLatencyMs.p95,
    'refreshLatencyMs.max': m.refreshLatencyMs.max,
    reconcileMs: m.reconcileMs,
    gapDetectMs: m.gapDetectMs,
    resumeMs: m.resumeMs,
  };
  const nonFinite = Object.keys(measured).filter(name => typeof measured[name] !== 'number' || !Number.isFinite(measured[name]));
  if (nonFinite.length > 0) miss('non-finite-measurement', `${nonFinite.join(', ')} not measured as a finite number`);

  // Every count below is over the provider's nodes visible through window() pages. A census that shrinks
  // or grows between phases would let a hidden node escape the stale/current counts, so it is a finding.
  const census = m.providerCensus;
  if ([census.afterDisconnect, census.afterReconnect, census.afterRefresh].some(nodes => nodes !== census.beforeDisconnect)) {
    find('census-population-changed', `${m.provider} nodes visible through window() pages: ${census.beforeDisconnect} before disconnect, ${census.afterDisconnect} after disconnect, ${census.afterReconnect} after reconnect, ${census.afterRefresh} after refresh`);
  }
  if (m.staleAfterDisconnect !== m.providerNodes) {
    find('disconnect-not-stale', `${m.staleAfterDisconnect} of ${m.providerNodes} ${who} read not-current after disconnect(${m.provider})`);
  }
  if (m.currentRegainedWithoutSnapshot !== 0) {
    find('reconnect-restored-current', `${m.currentRegainedWithoutSnapshot} ${who} read current after reconnect(${m.provider}) alone, before any read-current snapshot`);
  }
  if (m.staleAfterRefresh !== 0) {
    find('stale-after-full-refresh', `${m.staleAfterRefresh} ${who} still not current after one refresh() per node (${m.refreshOutcomes.applied} applied, ${m.refreshOutcomes.outOfOrder} out-of-order)`);
  }
  if (m.gap.armed && m.gap.completeness !== 'partial-gap') {
    find('gap-not-detected', `events(after: evicted cursor ${m.gap.cursor?.projectionEventId ?? 'none'}) reported ${m.gap.completeness}, not partial-gap`);
  }
  if (m.resume.armed && m.resume.completeness !== 'complete') {
    find('retained-cursor-gap', `events(after: retained cursor ${m.resume.cursor?.projectionEventId ?? 'none'}) reported ${m.resume.completeness}, not complete`);
  }
  const eventWindow = eventWindowOf(m.limits);
  if (m.retained.events > eventWindow) find('retained-window-exceeded', `${m.retained.events} events retained over a ${eventWindow}-event window`);
  const over = QUERY_METHODS.filter(method => m.rowsReturned[method] > m.queryLimit);
  if (over.length > 0) {
    find('limit-exceeded', `${over.map(method => `${method} returned ${m.rowsReturned[method]}`).join(', ')} rows over limit ${m.queryLimit}`);
  }
  if (m.ansiIn.length > 0) find('ansi-in-result', `a terminal escape appears in the serialized ${m.ansiIn.join(', ')} result`);
  return {findings, unrealised, realised: unrealised.length === 0};
}

function deepFreeze(value) {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function passOf(entry) {
  const claimed = {nodes: entry.claimed?.nodes, events: entry.claimed?.events};
  if (entry.error !== undefined || entry.measurement === undefined) {
    const detail = typeof entry.error === 'string' && entry.error.length > 0 ? entry.error : 'no measurement was produced';
    return {label: entry.label, limits: entry.limits ?? 'unknown', claimed, error: detail, findings: [], unrealised: [{probe: 'measurement-error', detail}], realised: false};
  }
  const measurement = JSON.parse(JSON.stringify(entry.measurement));
  const assessment = assessRecovery(measurement);
  const unrealised = [...assessment.unrealised];
  const shape = measurement.shape ?? {};
  if (!(shape.nodes >= claimed.nodes && shape.events >= claimed.events)) {
    unrealised.push({probe: 'shape-below-claim', detail: `fixture ${shape.nodes} nodes / ${shape.events} events is below the claimed ${claimed.nodes} / ${claimed.events}`});
  }
  return {label: entry.label, claimed, ...measurement, findings: assessment.findings, unrealised, realised: unrealised.length === 0};
}

/**
 * Assemble the frozen receipt. Each pass is judged here (assessRecovery plus the claimed fixture shape),
 * so the receipt cannot disagree with its own measurements.
 */
export function buildReceipt(input) {
  const passes = {};
  const findings = [];
  const unrealised = [];
  for (const entry of input.passes ?? []) {
    if (typeof entry?.label !== 'string' || entry.label.length === 0 || Object.hasOwn(passes, entry.label)) {
      throw new TypeError('buildReceipt: every pass needs a distinct non-empty label.');
    }
    const pass = passOf(entry);
    passes[entry.label] = pass;
    for (const finding of pass.findings) findings.push({pass: entry.label, ...finding});
    for (const reason of pass.unrealised) unrealised.push({pass: entry.label, ...reason});
  }
  const labels = Object.keys(passes);
  const realised = labels.length > 0 && labels.every(label => passes[label].realised);
  return deepFreeze({
    contract: RECEIPT_CONTRACT,
    utc: input.utc,
    revision: input.revision,
    command: input.command,
    node: input.node,
    arch: input.arch,
    platform: input.platform,
    cpus: input.cpus,
    cpuModel: input.cpuModel,
    fixture: {
      epoch: FIXTURE_EPOCH,
      determinism: 'seeded PRNG and one fixed epoch; no wall clock or random source in the measured path',
      percentile: PERCENTILE_METHOD,
      heapLabel: HEAP_LABEL,
      latency: 'reported, never judged: no recovery-latency threshold is specified',
    },
    passes,
    findings,
    unrealised,
    realised,
    pass: realised && findings.length === 0,
  });
}

/** 2 when any pass is not realised (it dominates), 1 for a measured violation, 0 for a pass. */
export function exitCodeFor(receipt) {
  if (receipt?.realised !== true) return 2;
  return Array.isArray(receipt.findings) && receipt.findings.length > 0 ? 1 : 0;
}
