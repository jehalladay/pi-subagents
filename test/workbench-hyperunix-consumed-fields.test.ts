/** wb-3ht.1 (HX-CAC-EVIDENCE-PROJECTION-R5, program-triage-2026-10-18): the consumed-field manifest of the HyperUnix reader
 * adapter. Statement (the owner filing's title): "When @hyperunix/sdk ships the query-observer boundary declaration (B=(q,h);
 * 01-query-observer-contract.md:12@694570cd00c2, unshipped), Pi shall declare as observed every hyperunix.find result field
 * hyperunixTopology consumes beyond rows (kind, licence, retention, operation, coverage batch ids, runtime identity) so plan
 * rewrites must preserve them; until then a test pins that consumed-field set." Standing acceptance (the filing's notes, default
 * tier): "one exported frozen consumed-field manifest in hyperunix-observer.ts and a test that fails when the adapter reads a field
 * outside it or the manifest names a field the adapter ignores (mutant: drop the coverage batch-id read -> red)". This file is that
 * test over src/workbench/hyperunix-observer.ts HYPERUNIX_CONSUMED_FIELDS. The filing's on-landing clauses (the declaration built
 * from the manifest on every find, a dropped observable reading partial or refused) wait for the SDK's boundary declaration: the
 * vendored @hyperunix/sdk 0.1.0 declares none.
 *
 * THE INSTRUMENT. traced() wraps a provider output in proxies that record each field read through them as a dotted path from the
 * output root: an object member is '<path>.<key>' (a member the value lacks included), any element of a list is '<path>[]', a
 * list's length is the list's own path, and an enumeration of an object's keys is '<path>.*' ('*' at the root). A member
 * inherited from a prototype (a list method, an Object.prototype member) is not a field and is not recorded. Property gets, `in`
 * checks, own-descriptor reads and key enumerations are all recorded, and a descriptor's value is wrapped like a get. A read is
 * INSIDE the manifest when it is a manifest field or a container on the way to one; a manifest field is READ when its exact path
 * was recorded. The rows:
 *  M1 the manifest: deeply frozen, its entries pinned in order, its path set equal to the filing's measured read list (FILING_READS,
 *     verbatim) and its observed set equal to the title's parenthetical list (TITLE_LIST, verbatim), the rows entry apart.
 *  M2 every projectable kind under both licences reads exactly the manifest (nothing outside it, every field read, no row body),
 *     and the traced projection equals the untraced one.
 *  M3 every refusal branch reads only manifest fields before it refuses: the twelve REFUSALS rows under the fixed host context
 *     (the mutation branch under both licences) and the operation reference that aliases the query node itself. The table is held
 *     to the module source: every throw statement in hyperunixTopology's body (read with the TypeScript parser, its message
 *     argument as the matcher) is reached by a row, and every row's refusal message matches exactly one of them.
 *  M4 every manifest field is used, not only touched: an observed field at another valid value (ALTERNATE) moves the projection,
 *     an envelope field at another value is refused, and the row list moves it by its length and never by a row body.
 *  M5 the registered provider's own output (registerHyperUnixFind over an SDK-decoded result) carries every manifest field at its
 *     path, its top level is the envelope FILING_READS is read against, and the adapter reads exactly the manifest from it, no row
 *     body included.
 *  M6 hxLiveInvariant, the live tier's verdict over the same output, reads only manifest fields.
 *  M7 the instrument itself: stand-in readers touching a row body, a producer diagnostic code or a key set read outside the
 *     manifest, one skipping the batch ids leaves that field unread, and a reader of exactly the manifest is quiet.
 *
 * Display paths added: none. Test-only: no file, process, clock or network access; the provider row injects its reader.
 */
import {readFileSync} from 'node:fs';
import {resultFromJson} from '@hyperunix/sdk';
import ts from 'typescript';
import {describe, expect, it} from 'vitest';
import {CapabilityError, CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, type HyperUnixConsumedField, type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';

type Json = {[key: string]: JsonValue};

/** The runtime identity the measured live read of this workspace reported (test/workbench-hyperunix-observer.test.ts BINARY). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const OTHER_BINARY = 'f'.repeat(64);
const WS = '/tmp/hyperunix-consumed-ws';
const context: HyperUnixTopologyContext = {scope: {workspace: WS, principal: 'local-operator:tester'},
  target: {kind: 'hx.fs/regular-file', root: 'src'}, capturedAt: '2026-10-26T23:10:00Z', observedAt: '2026-10-26T23:10:01Z'};
const MUTATION = new Set<string>(['mutation-rejected', 'mutation-partial']);
/** The kinds the adapter projects (the vendored kind tuple minus the two mutation outcomes it refuses). */
const PROJECTABLE = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION.has(kind));
const INDEX = /^(?:0|[1-9]\d*)$/;

/** The filing's measured read list, verbatim (bead notes: "src/workbench/hyperunix-observer.ts:180-249 reads ..."). */
const FILING_READS = 'execution_status.kind, coverage_summary.licenses_absence, rows (length only), rows_retained, operation, coverage[].batch_id, runtime.version, runtime.binarySha256, workspaceRoot, source.representation, contract';
/** The title's observed list, verbatim, and each of its words read onto the fields it names. */
const TITLE_LIST = 'kind, licence, retention, operation, coverage batch ids, runtime identity';
const TITLE_FIELDS: readonly (readonly [string, readonly string[]])[] = [
  ['kind', ['source.execution_status.kind']],
  ['licence', ['source.coverage_summary.licenses_absence']],
  ['retention', ['source.rows_retained']],
  ['operation', ['source.operation']],
  ['coverage batch ids', ['source.coverage[].batch_id']],
  ['runtime identity', ['runtime.binarySha256', 'runtime.version']],
];
/** The provider envelope's own top level (src/workbench/providers/hyperunix.ts:26; M5 reads it from the provider's output). */
const ENVELOPE_KEYS = ['contract', 'source', 'workspaceRoot', 'runtime'];

const PATHS: readonly string[] = HYPERUNIX_CONSUMED_FIELDS.map(field => field.path);
const pathsOf = (use: HyperUnixConsumedField['use']): string[] => HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use === use).map(field => field.path);

const isJsonRecord = (value: JsonValue | undefined): value is Json => typeof value === 'object' && value !== null && !Array.isArray(value);
/** A read is inside the manifest when it names a manifest field or a container on the way to one. */
const inside = (paths: readonly string[], read: string): boolean =>
  paths.some(path => path === read || path.startsWith(`${read}.`) || path.startsWith(`${read}[]`));
const outside = (reads: ReadonlySet<string>, paths: readonly string[] = PATHS): string[] => [...reads].filter(read => !inside(paths, read)).sort();
const unread = (reads: ReadonlySet<string>): string[] => PATHS.filter(path => !reads.has(path));
/** "rows (length only)": any read below the row list's own path (an element, a row body) is a row-body read. */
const rowBodyReads = (reads: ReadonlySet<string>): string[] => [...reads].filter(read => read.startsWith('source.rows[]')).sort();

/** Wraps a JSON value so each field read through it lands in reads (see THE INSTRUMENT above). */
function traced(value: JsonValue, reads: Set<string>, path = ''): JsonValue {
  if (typeof value !== 'object' || value === null) return value;
  const list = Array.isArray(value);
  const at = (key: string): string => {
    if (list && key === 'length') return path;
    if (list && INDEX.test(key)) return `${path}[]`;
    return path === '' ? key : `${path}.${key}`;
  };
  const field = (target: object, key: string | symbol): key is string =>
    typeof key === 'string' && (Object.hasOwn(target, key) || !Reflect.has(target, key));
  const wrapped = (key: string, item: unknown): unknown =>
    list && key === 'length' ? item : traced(item as JsonValue, reads, at(key));
  return new Proxy(value, {
    get(target, key, receiver) {
      const item: unknown = Reflect.get(target, key, receiver);
      if (!field(target, key)) return item;
      reads.add(at(key));
      return wrapped(key, item);
    },
    has(target, key) {
      if (field(target, key)) reads.add(at(key));
      return Reflect.has(target, key);
    },
    getOwnPropertyDescriptor(target, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!field(target, key)) return descriptor;
      reads.add(at(key));
      return descriptor && 'value' in descriptor ? {...descriptor, value: wrapped(key, descriptor.value)} : descriptor;
    },
    ownKeys(target) {
      reads.add(path === '' ? '*' : `${path}.*`);
      return Reflect.ownKeys(target);
    },
  });
}

const ROW: Json = {path: 'src/a.ts', claim: {body: 'row body'}};
const certificate = (batch_id: string): Json => ({mode: 'opportunistic', cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode: 'opportunistic'}});
/** A hyperunix.find/v1 provider output carrying the producer fields the adapter must not read beside the ones it does. */
function output(kind = 'incomplete', licenses_absence = false, source: Json = {}): Json {
  return {contract: 'hyperunix.find/v1',
    source: {representation: 'hyperunix.result/1', operation: 'find', rows: kind === 'complete-empty' ? [] : [ROW], rows_retained: true,
      coverage: [certificate('b1'), certificate('b2')], status: {exit_code: 0, terminal_reached: true},
      execution_status: {kind, diagnostic_code: 'HX-CODE'}, diagnostics: [{code: 'HX-CODE', severity: 'warning', message: 'producer text'}],
      coverage_summary: {completeness: 'incomplete', licenses_absence, certificates_license_absence: false, answer_count: 1},
      evidence: {support_ids: []}, digest: null, execution_id: null, ...source},
    workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY, path: '/usr/bin/hx'}};
}
const without = (value: Json, key: string): Json => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));

/** The value with the field at path set to next ('[]' sets it in every element); the field must exist in the value. */
function setAt(value: JsonValue, path: string, next: JsonValue): JsonValue {
  const apply = (node: JsonValue, steps: readonly string[]): JsonValue => {
    const [step, ...rest] = steps;
    if (step === undefined) return next;
    if (step === '[]') {
      if (!Array.isArray(node) || node.length === 0) throw new Error(`setAt: ${path} needs a non-empty list`);
      return node.map(item => apply(item, rest));
    }
    const child = isJsonRecord(node) ? node[step] : undefined;
    if (!isJsonRecord(node) || child === undefined) throw new Error(`setAt: the value has no ${path}`);
    return {...node, [step]: apply(child, rest)};
  };
  return apply(value, path.replace(/\[\]/g, '.[]').split('.'));
}
/** One step of a property walk: an object member, or a list element by index. */
function member(node: JsonValue | undefined, step: string): JsonValue | undefined {
  if (Array.isArray(node)) return INDEX.test(step) ? node[Number(step)] : undefined;
  return isJsonRecord(node) ? node[step] : undefined;
}
/** Every value at path ('[]' walks every element, a numeric step one element), read by plain property access. */
function readAll(value: JsonValue, path: string): JsonValue[] {
  let nodes: (JsonValue | undefined)[] = [value];
  for (const step of path.replace(/\[\]/g, '.[]').replace(/\[(\d+)\]/g, '.$1').split('.')) {
    nodes = nodes.flatMap(node => step === '[]' ? (Array.isArray(node) ? [...node] : []) : [member(node, step)]);
  }
  return nodes.filter((node): node is JsonValue => node !== undefined);
}

type Outcome = {projection: HyperUnixProjectionTopology} | {refused: string};
function outcomeOf(value: JsonValue, host: HyperUnixTopologyContext = context): Outcome {
  try {
    return {projection: hyperunixTopology(value, host)};
  } catch (error) {
    if (error instanceof CapabilityError) return {refused: error.category};
    throw error;
  }
}
/** The typed refusal message hyperunixTopology raises for value (a projection here is a test failure). */
function refusalMessage(value: JsonValue, host: HyperUnixTopologyContext = context): string {
  try {
    hyperunixTopology(value, host);
  } catch (error) {
    if (error instanceof CapabilityError) return error.message;
    throw error;
  }
  throw new Error('expected hyperunixTopology to refuse');
}
/** The refusal sites of hyperunixTopology, read from the module source: one matcher per throw statement in the function's body,
 * built from the thrown error's message argument (literal text verbatim, each template substitution any text), anchored at the
 * end of the raised message, which refused() closes with a full stop. */
function refusalSites(): RegExp[] {
  const text = readFileSync(new URL('../src/workbench/hyperunix-observer.ts', import.meta.url), 'utf8');
  const file = ts.createSourceFile('hyperunix-observer.ts', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const subject = file.statements.find((node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === 'hyperunixTopology');
  const escaped = (part: string): string => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = (node: ts.Expression): RegExp => {
    const parts = ts.isStringLiteralLike(node) ? [node.text]
      : ts.isTemplateExpression(node) ? [node.head.text, ...node.templateSpans.map(span => span.literal.text)] : undefined;
    if (parts === undefined) throw new Error(`refusalSites: unreadable message ${node.getText(file)}`);
    return new RegExp(`(?:^|: )${parts.map(escaped).join('[\\s\\S]+?')}\\.?$`);
  };
  const sites: RegExp[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isThrowStatement(node)) {
      const thrown = node.expression;
      const message = ts.isCallExpression(thrown) || ts.isNewExpression(thrown) ? thrown.arguments?.at(-1) : undefined;
      if (message === undefined) throw new Error(`refusalSites: unreadable throw ${node.getText(file)}`);
      sites.push(matcher(message));
    }
    ts.forEachChild(node, visit);
  };
  if (subject?.body !== undefined) visit(subject.body);
  return sites;
}
/** The fields the adapter read from value, and its outcome. */
function readsOf(value: JsonValue, host: HyperUnixTopologyContext = context): {reads: Set<string>; outcome: Outcome} {
  const reads = new Set<string>();
  return {reads, outcome: outcomeOf(traced(value, reads), host)};
}

/** One alternate per manifest field, each a valid value of that field's kind (M4). */
const ALTERNATE: Readonly<Record<string, JsonValue>> = {
  contract: 'hyperunix.find/v2',
  'source.representation': 'hyperunix.result/2',
  'source.execution_status.kind': 'cancelled',
  'source.coverage_summary.licenses_absence': true,
  'source.rows': [ROW, {path: 'src/b.ts', claim: {body: 'second row body'}}],
  'source.operation': 'grep',
  'runtime.binarySha256': OTHER_BINARY,
  'runtime.version': '0.2.0',
  workspaceRoot: '/tmp/hyperunix-consumed-other',
  'source.coverage[].batch_id': 'b9',
  'source.rows_retained': false,
};

/** Every refusal branch hyperunixTopology takes on the provider output under the fixed host context, the mutation branch under
 * both licences, with its typed category (M3; the aliasing branch needs its own host context and has its own row). */
const REFUSALS: readonly (readonly [string, Json, string])[] = [
  ['a missing contract', without(output(), 'contract'), 'validation'],
  ['another representation', output('incomplete', false, {representation: 'hyperunix.result/2'}), 'validation'],
  ['a kind outside the vendored tuple', output('unpinned-kind'), 'validation'],
  ['a licence that is not a boolean', output('incomplete', false, {coverage_summary: {completeness: 'incomplete'}}), 'validation'],
  ['rows that are not a list', output('incomplete', false, {rows: 'two rows'}), 'validation'],
  ['an empty operation', output('incomplete', false, {operation: ''}), 'validation'],
  ['a malformed binary digest', {...output(), runtime: {version: '0.1.0', binarySha256: 'not-hex'}}, 'validation'],
  ['an undisplayable runtime version', {...output(), runtime: {version: 'v\u001b[2J', binarySha256: BINARY}}, 'validation'],
  ['a mutation-rejected outcome', output('mutation-rejected'), 'validation'],
  ['a runtime-licensed mutation-partial outcome', output('mutation-partial', true), 'validation'],
  ['a complete-empty result carrying rows', output('complete-empty', true, {rows: [ROW]}), 'validation'],
  ['a reading of another workspace', {...output(), workspaceRoot: '/tmp/hyperunix-consumed-other'}, 'authorization'],
];

/** M5's provider input: an SDK hyperunix.result/1 document shaped like the measured live read of this workspace
 * (test/workbench-hyperunix-observer.test.ts sdkDocument), here with one row and three certificates b1..b3. */
const sdkDocument = (): Json => ({representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'src/index.ts'}], rows_retained: true,
  coverage: ['b1', 'b2', 'b3'].map(certificate),
  status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 272, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 272},
  execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'},
  diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'licenses no absence'}],
  view: null, cost: null,
  transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0,
    stderr_bytes_retained: 0, frames: 272},
  workspace_root: WS, terminal: 'complete', truth: null,
  coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
    incomplete_regions: [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}], result_coverage: null, answer_count: 1},
  evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
  digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}});
async function providerOutput(): Promise<JsonValue> {
  const native = resultFromJson(sdkDocument());
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}), close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, {grants: ['hyperunix:read'], signal: new AbortController().signal});
}

describe('wb-3ht.1 HyperUnix consumed-field manifest (HX-CAC-EVIDENCE-PROJECTION-R5, standing tier)', () => {
  it("M1: the manifest is deeply frozen, pinned in order, equal to the filing's measured read list and, rows apart, to the title's observed list", () => {
    expect(HYPERUNIX_CONSUMED_FIELDS.map(field => `${field.path}:${field.use}`)).toStrictEqual([
      'contract:envelope', 'source.representation:envelope', 'source.execution_status.kind:observed',
      'source.coverage_summary.licenses_absence:observed', 'source.rows:rows', 'source.operation:observed', 'runtime.binarySha256:observed',
      'runtime.version:observed', 'workspaceRoot:envelope', 'source.coverage[].batch_id:observed', 'source.rows_retained:observed',
    ]);
    expect(Object.isFrozen(HYPERUNIX_CONSUMED_FIELDS)).toBe(true);
    for (const field of HYPERUNIX_CONSUMED_FIELDS) {
      expect(Object.isFrozen(field)).toBe(true);
      expect(Object.keys(field)).toStrictEqual(['path', 'use']);
    }
    expect(new Set(PATHS).size).toBe(PATHS.length);
    // The filing's list names SDK result members bare and the envelope's own members by their top-level key.
    const filing = FILING_READS.split(', ').map(item => item.replace(' (length only)', ''))
      .map(item => ENVELOPE_KEYS.includes(item.split('.')[0] ?? '') ? item : `source.${item}`);
    expect(filing).toHaveLength(11);
    expect([...PATHS].sort()).toStrictEqual([...filing].sort());
    expect(TITLE_FIELDS.map(([word]) => word).join(', ')).toBe(TITLE_LIST);
    expect(pathsOf('observed').sort()).toStrictEqual(TITLE_FIELDS.flatMap(([, paths]) => paths).sort());
    // "beyond rows": the row list is consumed for its length only, and every other field is the provider's envelope.
    expect(pathsOf('rows')).toStrictEqual(['source.rows']);
    expect(FILING_READS).toContain('rows (length only)');
    expect(pathsOf('envelope')).toStrictEqual(['contract', 'source.representation', 'workspaceRoot']);
  });

  it('M2: every projectable kind under both licences reads exactly the manifest, and the traced projection equals the untraced one', () => {
    expect(PROJECTABLE).toHaveLength(11);
    let judged = 0;
    for (const kind of PROJECTABLE) for (const licensed of [false, true]) {
      const value = output(kind, licensed);
      const {reads, outcome} = readsOf(value);
      expect(outcome, `${kind} licensed=${licensed}`).toStrictEqual({projection: hyperunixTopology(value, context)});
      expect(outside(reads), `${kind} licensed=${licensed}: reads outside the manifest`).toStrictEqual([]);
      expect(unread(reads), `${kind} licensed=${licensed}: manifest fields left unread`).toStrictEqual([]);
      expect(rowBodyReads(reads), `${kind} licensed=${licensed}: a row body was read`).toStrictEqual([]);
      judged++;
    }
    expect(judged).toBe(22);
  });

  it.each(REFUSALS)('M3: %s is refused after reading only manifest fields', (_name, value, category) => {
    const {reads, outcome} = readsOf(value);
    expect(outcome).toStrictEqual({refused: category});
    expect(reads.size).toBeGreaterThan(0);
    expect(outside(reads)).toStrictEqual([]);
  });

  it('M3: an operation reference aliasing the query node itself is refused after reading only manifest fields', () => {
    const self = hyperunixTopology(output(), context).snapshots[0]?.source;
    expect(self).toMatchObject({provider: 'hyperunix', type: 'query', scope: WS});
    const {reads, outcome} = readsOf(output(), {...context, operationRef: self});
    expect(outcome).toStrictEqual({refused: 'validation'});
    expect(outside(reads)).toStrictEqual([]);
    expect(reads.has('source.coverage[].batch_id')).toBe(true);
  });

  it('M3: the refusal rows reach every throw site of hyperunixTopology, read from its source, and each row matches exactly one site', () => {
    const sites = refusalSites();
    expect(sites.length).toBeGreaterThan(0);
    const self = hyperunixTopology(output(), context).snapshots[0]?.source;
    const messages = [...REFUSALS.map(([, value]) => refusalMessage(value)), refusalMessage(output(), {...context, operationRef: self})];
    const reached = messages.map(text => sites.flatMap((site, index) => site.test(text) ? [index] : []));
    for (const [index, hits] of reached.entries()) expect(hits, messages[index]).toHaveLength(1);
    expect([...new Set(reached.flat())].sort((a, b) => a - b)).toStrictEqual(sites.map((_, index) => index));
  });

  it('M3: the refusal table is pinned: every output refusal branch under the fixed host context, the mutation branch under both licences', () => {
    expect(REFUSALS.map(([name, , category]) => `${name}:${category}`)).toStrictEqual([
      'a missing contract:validation', 'another representation:validation', 'a kind outside the vendored tuple:validation',
      'a licence that is not a boolean:validation', 'rows that are not a list:validation', 'an empty operation:validation',
      'a malformed binary digest:validation', 'an undisplayable runtime version:validation', 'a mutation-rejected outcome:validation',
      'a runtime-licensed mutation-partial outcome:validation', 'a complete-empty result carrying rows:validation',
      'a reading of another workspace:authorization',
    ]);
  });

  it('M4: every manifest field is used - an observed field moves the projection, an envelope field at another value is refused, rows count by length only', () => {
    expect(Object.keys(ALTERNATE).sort()).toStrictEqual([...PATHS].sort());
    const base = outcomeOf(output());
    expect(base).toHaveProperty('projection');
    const moved: string[] = [];
    for (const field of HYPERUNIX_CONSUMED_FIELDS) {
      const next = ALTERNATE[field.path];
      if (next === undefined) throw new Error(`no alternate for ${field.path}`);
      const variant = setAt(output(), field.path, next);
      expect(readAll(variant, field.path).length, `${field.path} is present in the variant`).toBeGreaterThan(0);
      const result = outcomeOf(variant);
      if (field.use === 'envelope') {
        expect(result, `${field.path} at another value`).toHaveProperty('refused');
      } else {
        expect(result, `${field.path} at another valid value`).toHaveProperty('projection');
        expect(JSON.stringify(result), `${field.path} at another valid value moves the projection`).not.toBe(JSON.stringify(base));
      }
      moved.push(field.path);
    }
    expect(moved).toStrictEqual(PATHS);
    // The row list counts and its bodies never matter: one row with another body projects exactly as the base.
    const body = setAt(output(), 'source.rows', [{path: 'src/other.ts', claim: {body: 'another row body'}}]);
    expect(outcomeOf(body)).toStrictEqual(base);
  });

  it("M5: the registered provider's own output carries every manifest field, and the adapter reads exactly the manifest from it", async () => {
    const value = await providerOutput();
    expect(isJsonRecord(value) ? Object.keys(value) : []).toStrictEqual(ENVELOPE_KEYS);
    for (const path of PATHS) {
      const found = readAll(value, path);
      expect(found.length, `${path} is present in the provider output`).toBeGreaterThan(0);
    }
    expect(readAll(value, 'source.coverage[].batch_id')).toStrictEqual(['b1', 'b2', 'b3']);
    const {reads, outcome} = readsOf(value);
    expect(outcome).toHaveProperty('projection');
    expect(outside(reads)).toStrictEqual([]);
    expect(unread(reads)).toStrictEqual([]);
    expect(rowBodyReads(reads)).toStrictEqual([]);
  });

  it("M6: hxLiveInvariant, the live tier's verdict over the same output, reads only manifest fields", () => {
    let judged = 0;
    for (const kind of HYPERUNIX_EXECUTION_KINDS) for (const licensed of [false, true]) {
      const reads = new Set<string>();
      const verdict = hxLiveInvariant(traced(output(kind, licensed), reads));
      expect(verdict, `${kind} licensed=${licensed}`).toStrictEqual(hxLiveInvariant(output(kind, licensed)));
      expect(outside(reads), `${kind} licensed=${licensed}`).toStrictEqual([]);
      for (const path of ['source.execution_status.kind', 'source.coverage_summary.licenses_absence', 'runtime.binarySha256', 'runtime.version']) {
        expect(reads.has(path), `${kind} licensed=${licensed} reads ${path}`).toBe(true);
      }
      judged++;
    }
    expect(judged).toBe(26);
  });

  it('M7: the instrument names a read outside the manifest and a manifest field left unread, and stays quiet on an exact reader', () => {
    const run = (reader: (value: JsonValue) => unknown): Set<string> => {
      const reads = new Set<string>();
      reader(traced(output(), reads));
      return reads;
    };
    const rowBody = run(value => readAll(value, 'source.rows[0].path'));
    expect(outside(rowBody)).toStrictEqual(['source.rows[]', 'source.rows[].path']);
    expect(rowBodyReads(rowBody)).toStrictEqual(['source.rows[]', 'source.rows[].path']);
    const diagnosticCode = run(value => readAll(value, 'source.execution_status.diagnostic_code'));
    expect(outside(diagnosticCode)).toStrictEqual(['source.execution_status.diagnostic_code']);
    const keySet = run(value => readAll(value, 'source').map(item => isJsonRecord(item) ? Object.keys(item) : []));
    expect(outside(keySet)).toContain('source.*');
    expect(outside(keySet)).toContain('source.digest');
    const serialized = run(value => JSON.stringify(value));
    expect(outside(serialized)).toContain('source.coverage[].body');
    const noBatchIds = run(value => PATHS.filter(path => path !== 'source.coverage[].batch_id').map(path => readAll(value, path)));
    expect(outside(noBatchIds)).toStrictEqual([]);
    expect(unread(noBatchIds)).toStrictEqual(['source.coverage[].batch_id']);
    const exact = run(value => PATHS.map(path => readAll(value, path)));
    expect(outside(exact)).toStrictEqual([]);
    expect(unread(exact)).toStrictEqual([]);
    // A list method is inherited, never a field: walking the certificates records the list, its elements and the batch ids only.
    const listWalk = run(value => readAll(value, 'source.coverage').map(item => Array.isArray(item) ? item.map(entry => member(entry, 'batch_id')) : []));
    expect([...listWalk].sort()).toStrictEqual(['source', 'source.coverage', 'source.coverage[]', 'source.coverage[].batch_id']);
  });
});
