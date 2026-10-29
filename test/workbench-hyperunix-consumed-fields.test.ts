/** wb-3ht.1 (HyperUnix evidence-projection requirement R5, program-triage-2026-10-18): the consumed-field manifest of the HyperUnix reader
 * adapter. Statement (the owner filing's title, its opening clause restated and the rest verbatim): when @hyperunix/sdk ships the
 * boundary declaration B=(q,h) of its query-observer contract (01-query-observer-contract.md:12@694570cd00c2, unshipped), "Pi shall
 * declare as observed every hyperunix.find result field hyperunixTopology consumes beyond rows (kind, licence, retention,
 * operation, coverage batch ids, runtime identity) so plan rewrites must preserve them; until then a test pins that consumed-field
 * set." Standing acceptance (the filing's notes, default tier): "one exported frozen consumed-field manifest in hyperunix-observer.ts
 * and a test that fails when the adapter reads a field outside it or the manifest names a field the adapter ignores (mutant: drop
 * the coverage batch-id read -> red)". This file is that test over src/workbench/hyperunix-observer.ts HYPERUNIX_CONSUMED_FIELDS.
 * The filing's on-landing clauses (the declaration built from the manifest on every find, a dropped observable reading partial or
 * refused) wait for the SDK's boundary declaration: the vendored @hyperunix/sdk 0.1.0 declares none.
 *
 * THE INSTRUMENT. traced() wraps a provider output in proxies that record each field read through them as a dotted path from the
 * output root: an object member is '<path>.<key>' (a member the value lacks included), any element of a list is '<path>[]', a
 * list's length is the list's own path, and an enumeration of an object's keys is '<path>.*' ('*' at the root). A manifest path
 * ending '.*' names every member of a map keyed by data (wb-gwr.2: a provider's version, read by the provider's name): any read
 * below its prefix is inside it, and it is READ once any member is read or the keys are enumerated. A member
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
 *  M7 the instrument itself: stand-in readers touching a row body, a producer diagnostic code or a key set, or testing a member
 *     the manifest does not name with an `in` check, read outside the manifest; one skipping the batch ids leaves that field
 *     unread, and a reader of exactly the manifest is quiet; a map member read by its key is inside a '.*' field and a member of
 *     a map the manifest does not name stays outside.
 *  M1b the relayed entries (wb-gwr.2, the 'relayed' use): equal to that filing's facet list (RELAYED_LIST, verbatim from its
 *     title), each phrase read onto the fields it names; M4 holds each relayed field to moving the facets and nothing else.
 *     The phrase list is held two ways (wb-noq8, the landing-646 follow-up): RELAYED_FIELDS' phrases are exactly RELAYED_LIST's
 *     segmentation (its leading article dropped, split at each ', ' and ' or '), in order, so a phrase row deleted together with
 *     its frozen-literal element still reds, the zero-path 'consistency mode' row included; and RELAYED_LIST is held to an anchor
 *     outside this file, wb-gwr.2's row in the tracked bead export (.beads/issues.jsonl, its title only, never its notes: the text
 *     after its first 'carries ' up to the first ' (' after that), so a phrase removed from every literal here still reds.
 *
 * Display paths added: none. Test-only: the files read are the adapter module's own source (refusalSites, read-only, for M3) and
 * the tracked bead export (read-only, for M1b: the one wb-gwr.2 row's title); no write, process, clock or network access; the
 * provider row injects its reader. SPELLING (two landed censuses read this file):
 * the requirement id is cited by this bead's id and never spelled whole, since its program acronym is a needle the wb-zzb4 absence
 * census reads in a test file outside a census module; and the title's opening clause is restated rather than quoted, since the
 * title's own words for that declaration are a mention the wb-dqf.1 census's Z2 judge reads in every Pi file outside its holders.
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
/** wb-gwr.2's facet list, verbatim from its title ("When an HX result Pi consumes carries ..."), each phrase read onto the fields
 * the adapter relays for it. hyperunix.result/1 has no consistency-mode field, so that phrase names none (the observer suite's
 * R1-RESIDUAL row pins the absence against the vendored declaration). M1b holds the list to that title in the tracked export. */
const RELAYED_LIST = 'a view identity or consistency mode, provider versions, conflict or incomplete-region statuses';
/** The bead whose title RELAYED_LIST is quoted from (M1b's outside anchor). */
const RELAYED_BEAD = 'wb-gwr.2';
const RELAYED_FIELDS: readonly (readonly [string, readonly string[]])[] = [
  ['view identity', ['source.view']],
  ['consistency mode', []],
  ['provider versions', ['source.evidence.providers[]', 'source.evidence.provider_versions.*']],
  ['conflict', ['source.diagnostics[].code']],
  ['incomplete-region statuses', ['source.coverage_summary.incomplete_regions[].scope', 'source.coverage_summary.incomplete_regions[].target']],
];
/** The provider envelope's own top level (src/workbench/providers/hyperunix.ts:26; M5 reads it from the provider's output). */
const ENVELOPE_KEYS = ['contract', 'source', 'workspaceRoot', 'runtime'];

const PATHS: readonly string[] = HYPERUNIX_CONSUMED_FIELDS.map(field => field.path);
const pathsOf = (use: HyperUnixConsumedField['use']): string[] => HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use === use).map(field => field.path);

const isJsonRecord = (value: JsonValue | undefined): value is Json => typeof value === 'object' && value !== null && !Array.isArray(value);
/** A read is inside the manifest when it names a manifest field or a container on the way to one. */
const inside = (paths: readonly string[], read: string): boolean =>
  paths.some(path => path === read || path.startsWith(`${read}.`) || path.startsWith(`${read}[]`) || (path.endsWith('.*') && read.startsWith(path.slice(0, -1))));
const outside = (reads: ReadonlySet<string>, paths: readonly string[] = PATHS): string[] => [...reads].filter(read => !inside(paths, read)).sort();
/** A manifest field is read when its exact path was recorded; a map field ('.*') when any member of the map was read. */
const unread = (reads: ReadonlySet<string>): string[] =>
  PATHS.filter(path => !reads.has(path) && !(path.endsWith('.*') && [...reads].some(read => read.startsWith(path.slice(0, -1)))));
/** "rows (length only)": any read below the row list's own path (an element, a row body) is a row-body read. */
const rowBodyReads = (reads: ReadonlySet<string>): string[] => [...reads].filter(read => read.startsWith('source.rows[]')).sort();

/** A facet list's phrases: its leading article dropped, split at each ', ' and ' or ' (M1b). */
const phrasesOf = (list: string): string[] => list.replace(/^a /, '').split(/, | or /);
/** The title of id's one row in the tracked bead export; the row's notes are never read, so a later note append never moves M1b. */
function exportTitle(id: string): string {
  const titles: string[] = [];
  for (const line of readFileSync(new URL('../.beads/issues.jsonl', import.meta.url), 'utf8').split('\n')) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row = JSON.parse(line) as JsonValue;
    if (isJsonRecord(row) && row.id === id && typeof row.title === 'string') titles.push(row.title);
  }
  const [title, ...others] = titles;
  if (title === undefined || others.length > 0) throw new Error(`the tracked bead export carries ${titles.length} rows for ${id}`);
  return title;
}
/** The facet list a title quotes: the text after its first 'carries ' up to the first ' (' after that. */
function quotedFacetList(title: string): string {
  const start = title.indexOf('carries ');
  const end = start < 0 ? -1 : title.indexOf(' (', start);
  if (start < 0 || end < 0) throw new Error(`the title carries no "carries ... (" span: ${title}`);
  return title.slice(start + 'carries '.length, end);
}

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
      coverage_summary: {completeness: 'incomplete', licenses_absence, certificates_license_absence: false, answer_count: 1,
        incomplete_regions: [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}]},
      // The facet fields wb-gwr.2 relays, at the values the 2026-10-28 measured read carried.
      view: 'hx.view/workspace-head', evidence: {support_ids: [], providers: ['hx.fs/builtin'], provider_versions: {'hx.fs/builtin': '0.1.0'}},
      digest: null, execution_id: null, ...source},
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
    if (step === '*') {
      if (!isJsonRecord(node) || Object.keys(node).length === 0) throw new Error(`setAt: ${path} needs a non-empty map`);
      return Object.fromEntries(Object.entries(node).map(([key, item]) => [key, apply(item, rest)]));
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
/** Every value at path ('[]' walks every element, '*' every member of a map, a numeric step one element), read by plain property
 * access. */
function readAll(value: JsonValue, path: string): JsonValue[] {
  let nodes: (JsonValue | undefined)[] = [value];
  for (const step of path.replace(/\[\]/g, '.[]').replace(/\[(\d+)\]/g, '.$1').split('.')) {
    nodes = nodes.flatMap(node => step === '[]' ? (Array.isArray(node) ? [...node] : [])
      : step === '*' ? (isJsonRecord(node) ? Object.values(node) : []) : [member(node, step)]);
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
  'source.view': 'hx.view/pinned-live',
  'source.evidence.providers[]': 'hx.fs/other',
  'source.evidence.provider_versions.*': '0.2.0',
  'source.coverage_summary.incomplete_regions[].scope': '/tmp/hyperunix-consumed-other/src',
  'source.coverage_summary.incomplete_regions[].target': 'hx.fs/regular-file',
  'source.diagnostics[].code': 'HX-SCHEMA-CONFLICT',
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
 * (test/workbench-hyperunix-observer.test.ts sdkDocument), here with one row and three certificates b1..b3, and the view and
 * provider version the 2026-10-28 measured read carried (wb-gwr.2: the observer suite's measuredDocument). */
const sdkDocument = (): Json => ({representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'src/index.ts'}], rows_retained: true,
  coverage: ['b1', 'b2', 'b3'].map(certificate),
  status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 272, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 272},
  execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'},
  diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'licenses no absence'}],
  view: 'hx.view/workspace-head', cost: null,
  transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0,
    stderr_bytes_retained: 0, frames: 272},
  workspace_root: WS, terminal: 'complete', truth: null,
  coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
    incomplete_regions: [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}], result_coverage: null, answer_count: 1},
  evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: ['hx.fs/builtin'], provider_versions: {'hx.fs/builtin': '0.1.0'}},
  digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}});
async function providerOutput(): Promise<JsonValue> {
  const native = resultFromJson(sdkDocument());
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}), close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, {grants: ['hyperunix:read'], signal: new AbortController().signal});
}

describe('wb-3ht.1 HyperUnix consumed-field manifest (evidence-projection R5, standing tier)', () => {
  it("M1: the manifest is deeply frozen, pinned in order, equal to the filing's measured read list and, rows apart, to the title's observed list", () => {
    expect(HYPERUNIX_CONSUMED_FIELDS.map(field => `${field.path}:${field.use}`)).toStrictEqual([
      'contract:envelope', 'source.representation:envelope', 'source.execution_status.kind:observed',
      'source.coverage_summary.licenses_absence:observed', 'source.rows:rows', 'source.operation:observed', 'runtime.binarySha256:observed',
      'runtime.version:observed', 'workspaceRoot:envelope', 'source.coverage[].batch_id:observed', 'source.rows_retained:observed',
      'source.view:relayed', 'source.evidence.providers[]:relayed', 'source.evidence.provider_versions.*:relayed',
      'source.diagnostics[].code:relayed', 'source.coverage_summary.incomplete_regions[].scope:relayed',
      'source.coverage_summary.incomplete_regions[].target:relayed',
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
    // wb-3ht.1's filing names the entries it measured; the relayed entries are wb-gwr.2's (M1b).
    const relayed = pathsOf('relayed');
    expect([...PATHS.filter(path => !relayed.includes(path))].sort()).toStrictEqual([...filing].sort());
    expect(TITLE_FIELDS.map(([word]) => word).join(', ')).toBe(TITLE_LIST);
    expect(pathsOf('observed').sort()).toStrictEqual(TITLE_FIELDS.flatMap(([, paths]) => paths).sort());
    // "beyond rows": the row list is consumed for its length only, and every other field is the provider's envelope.
    expect(pathsOf('rows')).toStrictEqual(['source.rows']);
    expect(FILING_READS).toContain('rows (length only)');
    expect(pathsOf('envelope')).toStrictEqual(['contract', 'source.representation', 'workspaceRoot']);
  });

  it("M1b: the relayed entries are wb-gwr.2's facet list, phrase by phrase, and only the relayed use names a field outside both filings", () => {
    expect(RELAYED_FIELDS.map(([phrase, paths]) => `${phrase}:${paths.length}`)).toStrictEqual([
      'view identity:1', 'consistency mode:0', 'provider versions:2', 'conflict:1', 'incomplete-region statuses:2',
    ]);
    for (const [phrase] of RELAYED_FIELDS) expect(RELAYED_LIST).toContain(phrase);
    expect(RELAYED_LIST.indexOf('view identity')).toBeLessThan(RELAYED_LIST.indexOf('consistency mode'));
    expect(RELAYED_LIST.indexOf('provider versions')).toBeLessThan(RELAYED_LIST.indexOf('conflict'));
    expect(RELAYED_LIST.indexOf('conflict')).toBeLessThan(RELAYED_LIST.indexOf('incomplete-region statuses'));
    // The other way (wb-noq8): the list's phrases are exactly the rows', in order, so no phrase row - a zero-path one included -
    // can leave with its literal element while the list keeps the phrase.
    expect(RELAYED_FIELDS.map(([phrase]) => phrase)).toStrictEqual(phrasesOf(RELAYED_LIST));
    // The outside anchor: the list is the one wb-gwr.2's title quotes in the tracked bead export, so a phrase removed from every
    // literal of this file (its row, its frozen-literal element, the list and its ordering check) still reds.
    expect(quotedFacetList(exportTitle(RELAYED_BEAD))).toBe(RELAYED_LIST);
    expect([...pathsOf('relayed')].sort()).toStrictEqual(RELAYED_FIELDS.flatMap(([, paths]) => paths).sort());
    expect(new Set(HYPERUNIX_CONSUMED_FIELDS.map(field => field.use))).toStrictEqual(new Set(['envelope', 'observed', 'rows', 'relayed']));
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
      } else if (field.use === 'relayed') {
        // A relayed field moves its facet and nothing else: snapshots (coverage, tone, id, versions), relations and diagnostics stay.
        if (!('projection' in result) || !('projection' in base)) throw new Error(`${field.path}: expected two projections`);
        const {facets: movedFacets, ...movedRest} = result.projection;
        const {facets: baseFacets, ...baseRest} = base.projection;
        expect(JSON.stringify(movedFacets), `${field.path} at another valid value moves the facets`).not.toBe(JSON.stringify(baseFacets));
        expect(movedRest, `${field.path} moves nothing but the facets`).toStrictEqual(baseRest);
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
    // An `in` check is a read: testing a member the manifest does not name reads outside it.
    const membership = run(value => readAll(value, 'source').map(item => isJsonRecord(item) && 'execution_id' in item));
    expect(outside(membership)).toStrictEqual(['source.execution_id']);
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
    // A map member read by its key sits inside a '.*' field and reads it; a member of a map the manifest does not name stays outside.
    const versionByKey = run(value => readAll(value, 'source.evidence.provider_versions').map(item => member(item, 'hx.fs/builtin')));
    expect(versionByKey.has('source.evidence.provider_versions.hx.fs/builtin')).toBe(true);
    expect(outside(versionByKey)).toStrictEqual([]);
    expect(unread(versionByKey)).not.toContain('source.evidence.provider_versions.*');
    expect(unread(run(value => readAll(value, 'source.evidence.provider_versions')))).toContain('source.evidence.provider_versions.*');
    const otherMember = run(value => readAll(value, 'source.status').map(item => member(item, 'exit_code')));
    expect(outside(otherMember)).toStrictEqual(['source.status', 'source.status.exit_code']);
  });
});
