/**
 * wb-lri (W07: HyperUnix provider), the source-basis STANDING leg, cut 2. The bead: "Typed HX query capability preserving source
 * basis, coverage classification, bounds, known-empty vs incomplete/unknown. Partial coverage never becomes known-empty. Verify
 * actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis. Spec:
 * docs/workbench/07." Its notes: "Full source basis/observer acceptance remains open." The coverage half is landed and pinned
 * elsewhere (test/workbench-hyperunix-observer.test.ts H2 and the docs/07 census row H1); this file is the source-basis half.
 *
 * THE GATE STATE, measured by qa/workbench/hx-source-basis-probe.mjs and committed as RECORD: the vendored @hyperunix/sdk 0.1.0
 * carries a read's source basis only as ReadResult.revision, the runtime's own resolution of a pinned view (QueryResult has no
 * such member and resultToJson writes no such key). The installed hx answers the provider's find request (kind, root, best
 * effort, a 30 s wall, a 60 s wait) through the live view (hx.view/workspace-head) with no pinned-view resolution and no runtime
 * query digest, and it refuses the same request pinned to a revision ("hx find binds no view in this build", reason
 * view-binding-pending, HX-VIEW-013). No source basis exists for a find at this build; what this census claims is that both
 * hyperunix.find registrations of src/workbench/providers/hyperunix.ts state none, in exactly the forms pinned below.
 *
 * CUT 2 (refusal #1 of cut 1, ca61b20c, gate run g10-gate-s289; cure form PIN-AND-FALSIFY for U1, U2 and U3): cut 1 ran only the
 * injected registration registerHyperUnixFind, which no src host registers, and read nativeHyperUnixFind (behind
 * registerNativeHyperUnixFind) only through its find call's literal option names. The gate's G1 (a client default view in
 * HyperUnix.open's options), G2 (a view spread into the native find call through an identifier) and G3 (the native output relaying
 * the SDK's revision member) each left it 15 of 15 green. This cut's reader (readProvider, the TypeScript parser) fails closed: a
 * spread it cannot resolve to object literals reads as the member '<spread>', a find call without one object-literal argument reads
 * as '<options>', and a property key it cannot name reads as '<computed>'. It pins HyperUnix.open's argument list and the native
 * workspace binding (SB1d, U1), resolves spreads in both find calls (SB1c, U2) and reads the native return's members and values
 * (SB2c, U3); G1, G2 and G3 are planted verbatim (the archive's mutants 01-03) into the provider text the reader reads, as in-census
 * witnesses of each fail-closed branch. A witness's anchor must occur exactly once in the provider text, so an edit to an anchored
 * provider line reds that witness's case (fail closed) and re-cuts this census with it; every token pin and its witnesses read
 * through one shared helper (findNames, hyperUnixNames, viewNames, revisionNames), so hollowing a helper reds a witness.
 *
 * THE PINNED READER SET (each case's id, row and assertion count are the receipt's Judged pins table):
 *  REQUEST     SB1a, SB1b: the injected registration over a recording reader issues the record's request (kind, root, best effort,
 *              a 30 s wall bound, a 60 s wait) with a root, and the same request without one, and never a view member.
 *              SB1c (parser): the module's find calls are exactly two, the injected reader's then nativeHyperUnixFind's own, and the
 *              name find occurs in its code three times only (the reader interface's method and those two calls); each passes exactly
 *              the five request members, a bounds member that is exactly Bounds.create({wall: <the record's wall>}), the record's
 *              wait, and best effort true. Witnesses: G2's identifier spread, a call
 *              spread and a member-access spread, each planted into the native call, read as '<spread>'; a planted raw find
 *              (workspace.raw(["find","--view","git:HEAD"])) makes the name find occur four times.
 *              SB1d (parser): nativeHyperUnixFind's find runs on workspace, bound once as const to the module's only HyperUnix.open
 *              call, whose argument list is exactly realpathSync(workspaceRoot): no client options, so no client default view; the
 *              name HyperUnix occurs only as its import and that call; no identifier, member or string literal of the code names a
 *              view. Witnesses: G1 planted reads the options argument and three view names; the planted raw find's string literal
 *              --view names one; a planted constructed workspace reads as its binding.
 *  ENVELOPE    SB2a: over a result carrying the measured view, the injected registration's output has exactly the members contract,
 *              source, workspaceRoot and runtime, source is exactly the measured result's serialized keys, source.view is the
 *              runtime's view verbatim, and no member anywhere names a revision or a basis. SB2b: a null view stays null.
 *              SB2c (parser): nativeHyperUnixFind's only return is JSON.parse(JSON.stringify(<object literal>)), whose members are
 *              exactly contract, source, workspaceRoot and runtime, valued HYPERUNIX_FIND_CONTRACT, resultToJson(result) (result bound
 *              once as const to the awaited workspace.find), realpathSync(workspaceRoot) and the runtime's version and binary
 *              digest; registerNativeHyperUnixFind's invoke is the nativeHyperUnixFind call itself. Witnesses: G3 planted reads a
 *              revision member; a planted identifier spread reads as '<spread>'; a planted early return, a let result and a wrapped
 *              invoke read as a second return, a non-const binding and the wrapper's callee.
 *  PROJECTION  SB3: hyperunixTopology over both injected outputs states no subjectBasis, sourceRevision or definitionDigest, keeps
 *              one source reference whatever the view, and carries the view only as its view facet.
 *  MEASURED    SB4: the record's provider-live leg (the live view, no pinned-view resolution, no runtime digest, absence not
 *              licensed). SB5: its provider-pinned leg (refused with exit 2, HX-CLI-USAGE-ERROR, view-binding-pending and
 *              HX-VIEW-013; no view, no rows, no frames). SB6: the record is the probe's (schema, script SHA-256, request,
 *              producer and SDK identity, base revision) and names no host path.
 * Shape and anchor rows: FROZEN-SHAPE (rule 16), TILING, ANCHOR-RECEIPT (the receipt's census line and its Claims, Judged pins,
 * Residuals and Shape rows tables, outside this file), ANCHOR-RECORD (the receipt's Measured record table against the record),
 * and REGISTRATION, registered last, which holds the collected task tree to this file's titles, every other test run and
 * passed. Every row states its exact assertion count (expect.assertions), each held by a receipt table.
 *
 * RESIDUAL (rule 19(d): a named family plus a pinned quiet row): R-DROPPED-RESOLUTION. Both registrations serialize the result
 * with resultToJson, which keeps no pinned-view resolution, so a result that carried one (a pinned view the runtime bound, were the
 * provider's request or the runtime's default view ever pinned) would reach the output without its source basis. Quiet row
 * QUIET-DROPPED-RESOLUTION pins that reading on both paths: at run time over the injected registration, and through the parser over
 * the provider code, which names no revision or resolved commit (the planted G3 relay names three). It reds the day a resolution
 * is relayed or projected.
 *
 * NOT CLAIMED: a pinned find's source basis is NOT CLAIMED by this census (the installed hx refuses the request; the remainder
 * is HyperUnix-CLI's view binding for find). The observer's projection of a basis is NOT CLAIMED by this census. hx verbs other
 * than find, hx builds other than the recorded binary, and a live re-measure (the census reads the committed record) are NOT
 * CLAIMED by this census. The hyperunix.find descriptor surface (its input schema and version) is NOT CLAIMED by this census.
 * The native registration at run time (its output values and their projection) is NOT CLAIMED by this census: its code is read
 * by the parser, never run. A view or option reaching the runtime by a route the parser does not read here (the child
 * environment, an hx configuration file, the runtime's own default view) is NOT CLAIMED by this census. SDK operations or hx
 * processes of the provider other than its two find calls are NOT CLAIMED by this census (the token pins red on any that names
 * find or a view, and say nothing of the rest). The native find call's kind and root values (the parser reads its member names,
 * bound, wait and best effort, never where kind and root come from) are NOT CLAIMED by this census. Which host registers which registration is NOT CLAIMED by this census (Pi's
 * hosts register the native one, src/workbench/hosts/local-detached.ts and src/workbench/native-modules.ts).
 *
 * Display paths added: none (test-only). No scratch directory is allocated: WS is a string, never created or read.
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Bounds, type ClaimBody, type QueryResult, resultFromJson} from '@hyperunix/sdk';
import ts from 'typescript';
import {describe, expect, it, type RunnerTask} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {type HyperUnixTopologyContext, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';
import {HYPERUNIX_FIND_CONTRACT, type HyperUnixReader, registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {docsSection, sectionTables} from './helpers/census.js';

type Json = {[key: string]: JsonValue};
type FindRequest = Parameters<HyperUnixReader['find']>[0];

const REPO = fileURLToPath(new URL('../', import.meta.url));
const BEAD = 'wb-lri';
const PROVIDER = 'src/workbench/providers/hyperunix.ts';
const PROBE = 'qa/workbench/hx-source-basis-probe.mjs';
const RECORD_PATH = 'qa/workbench/receipts/wb-lri-hx-source-basis-probe.json';
const RECEIPT = 'docs/workbench/receipts/wb-lri.md';
const RECEIPT_ENTRY = '2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 2 (machine seat ws-01; cures refusal #1, U1-U3)';
const RECEIPT_TABLES = {
  claims: {heading: 'Claims, wb-lri cut 2', header: ['Row', 'Claim']},
  pins: {heading: 'Judged pins, wb-lri cut 2', header: ['Row', 'Pin', 'Assertions']},
  residuals: {heading: 'Residuals, wb-lri cut 2', header: ['Residual', 'Quiet row']},
  measured: {heading: 'Measured record, wb-lri cut 2', header: ['Field', 'Value']},
  shape: {heading: 'Shape rows, wb-lri cut 2', header: ['Row', 'Assertions']},
} as const;
/** The census title: the describe block's name and the receipt's census line. */
const HEADER =
  "wb-lri (W07) source-basis standing census: both hyperunix.find registrations of the provider module request no view and add no revision member (the injected one run over a recording reader, the native one read with the TypeScript parser), the injected output relays the runtime's view verbatim and projects no source basis, and the installed hx refuses a pinned find (HX-VIEW-013)";
const REGISTRATION_TITLE = "REGISTRATION: the collected task tree is exactly this file's titles in order, and every other test ran and passed before this one";
/** The registration row's own assertion count (the receipt's Shape rows table holds it with the anchor rows'). */
const REGISTRATION_ASSERTIONS = 3;

const WS = '/workspace/wb-lri';
const BINARY = '5d'.repeat(32);
const CAPABILITY = 'hyperunix.find';
const REQUEST_MEMBERS = ['kind', 'root', 'bestEffort', 'bounds', 'timeoutMs'];
const OUTPUT_MEMBERS = ['contract', 'source', 'workspaceRoot', 'runtime'];
const context: HyperUnixTopologyContext = {scope: {workspace: WS, principal: 'local-operator:wb-lri'}, target: {kind: 'hx.fs/regular-file', root: 'src'},
  capturedAt: '2026-11-11T05:30:00Z', observedAt: '2026-11-11T05:30:01Z'};

interface Diagnosed {
  readonly code: string | null;
  readonly severity: string | null;
  readonly reason: string | null;
  readonly requirements: readonly string[];
}
interface Leg {
  readonly id: string;
  readonly requestedView: string | null;
  readonly outcome: string;
  readonly errorCode?: string | null;
  readonly exitCode: number | null;
  readonly terminal: string | null;
  readonly statusKind?: string | null;
  readonly diagnostics: readonly Diagnosed[];
  readonly view: string | null;
  readonly revision: {readonly requested: string; readonly resolvedCommit: string} | null;
  readonly revisionMember?: boolean;
  readonly resultJsonKeys?: readonly string[];
  readonly queryDigest?: string | null;
  readonly digestSource?: string | null;
  readonly licensesAbsence?: boolean;
  readonly completeness?: string | null;
  readonly rows: number | null;
  readonly frames: number | null;
}
interface ProbeRecord {
  readonly schema: string;
  readonly bead: string;
  readonly utc: string;
  readonly probe: {readonly script: string; readonly scriptSha256: string};
  readonly producer: {readonly name: string; readonly version: string | null; readonly binarySha256: string | null; readonly binaryOrigin: string | null;
    readonly hxsVersion: string | null; readonly protocol: string | null; readonly sdk: {readonly name: string; readonly version: string | null}};
  readonly repository: {readonly files: readonly string[]; readonly baseRevision: string};
  readonly request: {readonly kind: string; readonly root: string; readonly bestEffort: boolean; readonly wall: string; readonly timeoutMs: number};
  readonly legs: readonly Leg[];
}

const sha256 = (bytes: string | Buffer): string => createHash('sha256').update(bytes).digest('hex');
const repoText = (path: string): string => readFileSync(join(REPO, path), 'utf8');
const record = (): ProbeRecord => JSON.parse(repoText(RECORD_PATH)) as ProbeRecord;
const leg = (id: string): Leg => {
  const found = record().legs.filter(item => item.id === id);
  if (found.length !== 1) throw new Error(`${RECORD_PATH} carries ${found.length} legs named ${id}; the census reads exactly one`);
  return found[0] as Leg;
};
/** One table of the receipt's cut-1 entry, read from the rendered section it sits in (header row checked, rows returned). */
const receiptTable = (table: {readonly heading: string; readonly header: readonly string[]}): string[][] => {
  const markdown = repoText(RECEIPT);
  const parents = [(markdown.split('\n')[0] ?? '').replace(/^# /, ''), RECEIPT_ENTRY];
  const where = `${RECEIPT} section "${table.heading}"`;
  const section = docsSection(markdown, table.heading, 3, parents);
  if (!section.ok) throw new Error(`${where}: ${section.why}`);
  if (section.hasHtml) throw new Error(`${where} carries HTML, which can hide a row of its table`);
  const kinds = section.blocks.map(block => (block.kind === 'other' ? `other:${block.type}` : block.kind));
  if (JSON.stringify(kinds) !== JSON.stringify(['other:table'])) throw new Error(`${where} must render exactly one table and nothing else; it renders [${kinds.join(', ')}]`);
  const [head, ...rows] = sectionTables(markdown, table.heading, 3, parents).grids[0] ?? [];
  if (JSON.stringify(head ?? null) !== JSON.stringify(table.header)) throw new Error(`${where}: its header row is ${JSON.stringify(head ?? null)}; the census binds ${JSON.stringify(table.header)}`);
  return rows.map(row => [...row]);
};
/** The list items of the receipt's cut-1 entry, as a reader sees them. */
const entryItems = (): string[] => {
  const markdown = repoText(RECEIPT);
  const section = docsSection(markdown, RECEIPT_ENTRY, 2, [(markdown.split('\n')[0] ?? '').replace(/^# /, '')]);
  if (!section.ok) throw new Error(`${RECEIPT} entry "${RECEIPT_ENTRY}": ${section.why}`);
  if (section.hasHtml) throw new Error(`${RECEIPT} entry "${RECEIPT_ENTRY}" carries HTML, which can hide an item`);
  return section.blocks.flatMap(block => (block.kind === 'list' ? block.items.map(item => item.text) : []));
};

/** One hyperunix.result/1 document of the measured live answer's shape, with the view the case names. */
const documentWith = (view: string | null): Json => ({
  representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'src/a.txt'}], rows_retained: true,
  coverage: [{mode: 'opportunistic', cause: {cause: 'other', detail: 'No_change_exclusion'}, scope: {path: [], scope: 'fs-subtree'},
    target: {target: 'relation-expansion'}, provider: 'hx.fs/provider', stream: 'hx-fs', batch_id: 'b1', body: {mode: 'opportunistic'}}],
  status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 4, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 4},
  execution_status: {kind: 'complete', diagnostic_code: null},
  diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'licenses no absence'}],
  view, cost: null,
  transport: {started_at: '2026-11-11T05:30:00.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 100, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 4},
  workspace_root: WS, terminal: 'complete', truth: null,
  coverage_summary: {modes: ['opportunistic'], completeness: 'unknown', licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
    result_coverage: null, answer_count: 1},
  evidence: {support_ids: [], evidence_classes: ['observed'], derivation_handles: [], providers: ['hx.fs/provider'], provider_versions: {'hx.fs/provider': '0.1.0'}},
  digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {},
});
/** A result carrying the SDK's pinned-view resolution beside the decoded document (the ReadResult member QueryResult lacks). */
const RESOLUTION = {requested: 'HEAD', resolvedCommit: 'c0ffee'.repeat(7).slice(0, 40)};

/** The real hyperunix.find registration over a reader that records every request it receives. */
function recording(result: () => QueryResult<ClaimBody>) {
  const requests: FindRequest[] = [];
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {
    find: async request => {
      requests.push(request);
      return result();
    },
    runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {},
  }, WS);
  const invoke = (input: Json) => registry.invoke(CAPABILITY, input, {grants: ['hyperunix:read'], signal: new AbortController().signal});
  return {requests, invoke};
}
const outputFor = async (view: string | null): Promise<Json> =>
  (await recording(() => resultFromJson(documentWith(view))).invoke({kind: 'hx.fs/regular-file', root: 'src'})) as Json;
/** Every member name of a JSON tree, at any depth. */
const memberNames = (value: JsonValue): string[] =>
  Array.isArray(value) ? value.flatMap(memberNames)
    : value !== null && typeof value === 'object' ? Object.entries(value).flatMap(([key, child]) => [key, ...memberNames(child)]) : [];

/** One find call of the provider module: its receiver, its option members in order, its bounds initializer without white space, its
 * wait and its best-effort literal. */
interface FindCall {
  readonly receiver: string;
  readonly members: readonly string[];
  readonly bounds: string | undefined;
  readonly timeoutMs: number | undefined;
  readonly bestEffort: string | undefined;
}
/** One variable nativeHyperUnixFind declares itself: its name, const or not, its initializer without white space, the call it awaits. */
interface Binding {
  readonly name: string;
  readonly kind: 'const' | 'other';
  readonly initializer: string | null;
  readonly awaited: string | null;
}
/** One return statement of nativeHyperUnixFind: JSON.parse(JSON.stringify(<object literal>)) or not, that object's members and values. */
interface NativeReturn {
  readonly shape: 'json-round-trip' | 'other';
  readonly members: readonly string[];
  readonly values: readonly (readonly [string, string])[];
}
/** The provider module as the TypeScript parser reads it; comments are trivia and never count as code. */
interface ProviderRead {
  /** Every `<identifier>.find(...)` call, in source order. */
  readonly finds: readonly FindCall[];
  /** Every `HyperUnix.open(...)` call: its argument texts without white space. */
  readonly opens: readonly (readonly string[])[];
  /** nativeHyperUnixFind's own variable declarations (a nested function's are its own). */
  readonly bindings: readonly Binding[];
  /** nativeHyperUnixFind's own return statements (a nested function's are its own). */
  readonly returns: readonly NativeReturn[];
  /** Each invoke member of registerNativeHyperUnixFind: the callee its arrow body calls directly, else '<other>'. */
  readonly nativeInvokes: readonly string[];
  /** Every identifier, private name and string or template literal text of the code, in source order. */
  readonly tokens: readonly string[];
}

const squash = (text: string): string => text.replace(/\s+/g, '');
/** A property key as written: an identifier or a string literal; any other key (computed, numeric) reads as '<computed>'. */
const memberName = (property: ts.ObjectLiteralElementLike): string =>
  property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : '<computed>';
/** The members a spread contributes, resolved through object literals, parentheses and conditional branches only; any other spread
 * (an identifier, a call, a member access) reads as the one member '<spread>', so the reader fails closed. */
function spreadMembers(expression: ts.Expression): string[] {
  if (ts.isParenthesizedExpression(expression)) return spreadMembers(expression.expression);
  if (ts.isConditionalExpression(expression)) return [...spreadMembers(expression.whenTrue), ...spreadMembers(expression.whenFalse)];
  return ts.isObjectLiteralExpression(expression) ? objectMembers(expression) : ['<spread>'];
}
/** An object literal's members in order, its spreads resolved by spreadMembers. */
function objectMembers(literal: ts.ObjectLiteralExpression): string[] {
  return literal.properties.flatMap(property => (ts.isSpreadAssignment(property) ? spreadMembers(property.expression) : [memberName(property)]));
}
/** One find call's read; anything but exactly one object-literal argument reads as the one member '<options>' (fail closed). */
function findCall(receiver: string, call: ts.CallExpression, file: ts.SourceFile): FindCall {
  const [options, ...rest] = call.arguments;
  if (options === undefined || rest.length > 0 || !ts.isObjectLiteralExpression(options)) {
    return {receiver, members: ['<options>'], bounds: undefined, timeoutMs: undefined, bestEffort: undefined};
  }
  let bounds: string | undefined;
  let timeoutMs: number | undefined;
  let bestEffort: string | undefined;
  for (const property of options.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
    const name = property.name.text;
    if (name === 'timeoutMs' && ts.isNumericLiteral(property.initializer)) timeoutMs = Number(property.initializer.text.replaceAll('_', ''));
    if (name === 'bestEffort') bestEffort = property.initializer.getText(file);
    if (name === 'bounds') bounds = squash(property.initializer.getText(file));
  }
  return {receiver, members: objectMembers(options), bounds, timeoutMs, bestEffort};
}
function binding(declaration: ts.VariableDeclaration, name: string, file: ts.SourceFile): Binding {
  const list = declaration.parent;
  const kind = ts.isVariableDeclarationList(list) && (list.flags & ts.NodeFlags.Const) !== 0 ? 'const' : 'other';
  const value = declaration.initializer;
  const awaited = value !== undefined && ts.isAwaitExpression(value) && ts.isCallExpression(value.expression) ? squash(value.expression.expression.getText(file)) : null;
  return {name, kind, initializer: value === undefined ? null : squash(value.getText(file)), awaited};
}
/** The single argument of a JSON.<member>(...) call, else undefined. */
function jsonArgument(node: ts.Expression | undefined, member: 'parse' | 'stringify'): ts.Expression | undefined {
  if (node === undefined || !ts.isCallExpression(node) || node.arguments.length !== 1 || !ts.isPropertyAccessExpression(node.expression)) return undefined;
  const {expression: owner, name} = node.expression;
  return ts.isIdentifier(owner) && owner.text === 'JSON' && name.text === member ? node.arguments[0] : undefined;
}
function nativeReturn(expression: ts.Expression | undefined, file: ts.SourceFile): NativeReturn {
  let unwrapped = expression;
  while (unwrapped !== undefined && (ts.isAsExpression(unwrapped) || ts.isSatisfiesExpression(unwrapped) || ts.isParenthesizedExpression(unwrapped))) unwrapped = unwrapped.expression;
  const literal = jsonArgument(jsonArgument(unwrapped, 'parse'), 'stringify');
  if (literal === undefined || !ts.isObjectLiteralExpression(literal)) return {shape: 'other', members: [], values: []};
  const values = literal.properties.map((property): readonly [string, string] => {
    if (ts.isPropertyAssignment(property)) return [memberName(property), squash(property.initializer.getText(file))];
    if (ts.isShorthandPropertyAssignment(property)) return [property.name.text, property.name.text];
    return [ts.isSpreadAssignment(property) ? '<spread>' : memberName(property), '<other>'];
  });
  return {shape: 'json-round-trip', members: objectMembers(literal), values};
}
/** Reads the provider module's text with the TypeScript parser (see ProviderRead). */
function readProvider(source: string): ProviderRead {
  const file = ts.createSourceFile(PROVIDER, source, ts.ScriptTarget.Latest, true);
  const finds: FindCall[] = [];
  const opens: string[][] = [];
  const tokens: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      tokens.push(node.text);
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression)) {
      const receiver = node.expression.expression.text;
      if (node.expression.name.text === 'find') finds.push(findCall(receiver, node, file));
      if (receiver === 'HyperUnix' && node.expression.name.text === 'open') opens.push(node.arguments.map(argument => squash(argument.getText(file))));
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  const declared = (name: string): ts.FunctionDeclaration | undefined =>
    file.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === name);
  const native = declared('nativeHyperUnixFind');
  const bindings: Binding[] = [];
  const returns: NativeReturn[] = [];
  const own = (node: ts.Node): void => {
    if (node !== native && ts.isFunctionLike(node)) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) bindings.push(binding(node, node.name.text, file));
    if (ts.isReturnStatement(node)) returns.push(nativeReturn(node.expression, file));
    ts.forEachChild(node, own);
  };
  if (native !== undefined) own(native);
  const nativeInvokes: string[] = [];
  const invokes = (node: ts.Node): void => {
    if ((ts.isPropertyAssignment(node) || ts.isMethodDeclaration(node)) && memberName(node) === 'invoke') {
      const value = ts.isPropertyAssignment(node) ? node.initializer : undefined;
      const body = value !== undefined && ts.isArrowFunction(value) && !ts.isBlock(value.body) ? value.body : undefined;
      nativeInvokes.push(body !== undefined && ts.isCallExpression(body) && ts.isIdentifier(body.expression) ? body.expression.text : '<other>');
    }
    ts.forEachChild(node, invokes);
  };
  const register = declared('registerNativeHyperUnixFind');
  if (register !== undefined) invokes(register);
  return {finds, opens, bindings, returns, nativeInvokes, tokens};
}
const providerRead = (): ProviderRead => readProvider(repoText(PROVIDER));

/** The provider text with each anchor replaced; an anchor that does not occur exactly once throws (a moved witness reds its case). */
const planted = (plants: readonly (readonly [string, string])[]): ProviderRead =>
  readProvider(plants.reduce((text, [from, to]) => {
    const count = text.split(from).length - 1;
    if (count !== 1) throw new Error(`${PROVIDER}: a planted witness's anchor occurs ${count} times, never exactly once: ${from}`);
    return text.replace(from, () => to);
  }, repoText(PROVIDER)));
const SDK_IMPORT = 'import { Bounds, type ClaimBody, HyperUnix, type QueryResult, resultToJson } from "@hyperunix/sdk";';
const SDK_IMPORT_WITH_GITVIEW = 'import { Bounds, type ClaimBody, GitView, HyperUnix, type QueryResult, resultToJson } from "@hyperunix/sdk";';
const NATIVE_OPEN = 'const workspace=HyperUnix.open(realpathSync(workspaceRoot));';
const NATIVE_FIND = 'const result=await workspace.find({kind,root,bestEffort:true,bounds:Bounds.create({wall:"30s"}),timeoutMs:60_000});';
const nativeFindWith = (tail: string): string => NATIVE_FIND.replace('timeoutMs:60_000})', () => `timeoutMs:60_000,${tail}})`);
/** The gate's three cut-1 survivors (g10-gate-s289 archive mutants 01-03), verbatim: G1 a client default view, G2 an identifier
 * spread of a view into the native find, G3 the native output relaying the SDK's revision member. */
const G1 = [[SDK_IMPORT, SDK_IMPORT_WITH_GITVIEW], [NATIVE_OPEN, 'const workspace=HyperUnix.open(realpathSync(workspaceRoot),{view:new GitView("HEAD")});']] as const;
const G2 = [[SDK_IMPORT, SDK_IMPORT_WITH_GITVIEW], [NATIVE_FIND, `const pin={view:new GitView("HEAD")};${nativeFindWith('...pin')}`]] as const;
const G3 = [['source:resultToJson(result),', 'source:resultToJson(result),revision:(result as unknown as {revision?:JsonValue}).revision??null,']] as const;
/** A raw hx find naming its view as string literals, planted before the native find: the token pins' string-literal witness. */
const RAW_FIND = [[NATIVE_FIND, `await workspace.raw(["find","--view","git:HEAD"]);${NATIVE_FIND}`]] as const;
/** The code tokens each token pin reads, one helper per pin shared with its planted witnesses, so hollowing a helper reds a witness. */
const findNames = (read: ProviderRead): string[] => read.tokens.filter(token => token === 'find');
const hyperUnixNames = (read: ProviderRead): string[] => read.tokens.filter(token => token === 'HyperUnix');
const viewNames = (read: ProviderRead): string[] => read.tokens.filter(token => /view/i.test(token));
const revisionNames = (read: ProviderRead): string[] => read.tokens.filter(token => /revision|resolvedcommit/i.test(token));

type RowId = 'REQUEST' | 'ENVELOPE' | 'PROJECTION' | 'MEASURED';
interface Case {
  readonly id: string;
  readonly row: RowId;
  readonly kind: 'claim' | 'quiet';
  readonly title: string;
  readonly assertions: number;
  readonly run: () => Promise<void> | void;
}

const CASES: readonly Case[] = [
  {
    id: 'SB1a', row: 'REQUEST', kind: 'claim', assertions: 9,
    title: "with a root, the injected registration over a recording reader issues exactly the record's request: kind, root, best effort, the 30 s wall bound, the 60 s wait, and no view member",
    run: async () => {
      const {requests, invoke} = recording(() => resultFromJson(documentWith('hx.view/workspace-head')));
      const {request: asked} = record();
      await invoke({kind: asked.kind, root: asked.root});
      expect(requests).toHaveLength(1);
      const [request] = requests;
      expect(Object.keys(request ?? {})).toEqual(REQUEST_MEMBERS);
      expect(request?.kind).toBe(asked.kind);
      expect(request?.root).toBe(asked.root);
      expect(request?.bestEffort).toBe(asked.bestEffort);
      expect(request?.bounds).toBeInstanceOf(Bounds);
      expect(JSON.stringify(request?.bounds)).toBe(JSON.stringify(Bounds.create({wall: asked.wall})));
      expect(request?.timeoutMs).toBe(asked.timeoutMs);
      expect(request).not.toHaveProperty('view');
    },
  },
  {
    id: 'SB1b', row: 'REQUEST', kind: 'claim', assertions: 3,
    title: 'without a root, the injected registration issues the same request without a root member, and still no view member',
    run: async () => {
      const {requests, invoke} = recording(() => resultFromJson(documentWith('hx.view/workspace-head')));
      await invoke({kind: record().request.kind});
      expect(requests).toHaveLength(1);
      expect(Object.keys(requests[0] ?? {})).toEqual(REQUEST_MEMBERS.filter(member => member !== 'root'));
      expect(requests[0]).not.toHaveProperty('view');
    },
  },
  {
    id: 'SB1c', row: 'REQUEST', kind: 'claim', assertions: 14,
    title: "read with the TypeScript parser, the provider's find calls are exactly two (the injected reader's, then nativeHyperUnixFind's own), the name find occurs in its code three times only, and each call passes exactly the five request members, a bound that is exactly Bounds.create of the record's wall, the record's wait and best effort true; an identifier, call or member-access spread planted into the native call reads as '<spread>' (G2 the first), and a planted raw find makes find four",
    run: () => {
      const read = providerRead();
      const {request: asked} = record();
      expect(read.finds.map(call => call.receiver)).toEqual(['reader', 'workspace']);
      expect(findNames(read), "the reader interface's find method and the two calls' find members").toHaveLength(3);
      for (const call of read.finds) {
        expect(call.members, call.receiver).toEqual(REQUEST_MEMBERS);
        expect(call.bounds, call.receiver).toBe(`Bounds.create({wall:"${asked.wall}"})`);
        expect(call.timeoutMs, call.receiver).toBe(asked.timeoutMs);
        expect(call.bestEffort, call.receiver).toBe(String(asked.bestEffort));
      }
      expect(planted(G2).finds[1]?.members, 'G2: an identifier spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(planted([[NATIVE_FIND, nativeFindWith('...pinned()')]]).finds[1]?.members, 'a call spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(planted([[NATIVE_FIND, nativeFindWith('...settings.pin')]]).finds[1]?.members, 'a member-access spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(findNames(planted(RAW_FIND)), 'a raw find names find as a string literal').toHaveLength(4);
    },
  },
  {
    id: 'SB1d', row: 'REQUEST', kind: 'claim', assertions: 8,
    title: "read with the TypeScript parser, nativeHyperUnixFind's find runs on workspace, bound once as const to the module's only HyperUnix.open call, whose argument list is exactly realpathSync(workspaceRoot) (no client options, so no client default view); HyperUnix occurs only as its import and that call, and no code token names a view; G1's client default view planted reads its options argument and three view names, a planted raw find's string literal names one, and a planted constructed workspace reads as its binding",
    run: () => {
      const read = providerRead();
      expect(read.opens).toEqual([['realpathSync(workspaceRoot)']]);
      expect(read.bindings.filter(item => item.name === 'workspace')).toEqual([{name: 'workspace', kind: 'const', initializer: 'HyperUnix.open(realpathSync(workspaceRoot))', awaited: null}]);
      expect(hyperUnixNames(read), 'the import specifier and the open call').toHaveLength(2);
      expect(viewNames(read)).toEqual([]);
      const g1 = planted(G1);
      expect(g1.opens, 'G1: a client default view').toEqual([['realpathSync(workspaceRoot)', '{view:newGitView("HEAD")}']]);
      expect(viewNames(g1), 'G1: the import, the option and the constructor').toEqual(['GitView', 'view', 'GitView']);
      expect(viewNames(planted(RAW_FIND)), 'a raw find: the string literal --view').toEqual(['--view']);
      const constructed = planted([[NATIVE_OPEN, 'const workspace=new HyperUnix({}).workspace(realpathSync(workspaceRoot));']]);
      expect([constructed.bindings.filter(item => item.name === 'workspace'), hyperUnixNames(constructed)], 'a constructed workspace: its binding, and HyperUnix named by the import and the construction')
        .toEqual([[{name: 'workspace', kind: 'const', initializer: 'newHyperUnix({}).workspace(realpathSync(workspaceRoot))', awaited: null}], ['HyperUnix', 'HyperUnix']]);
    },
  },
  {
    id: 'SB2a', row: 'ENVELOPE', kind: 'claim', assertions: 6,
    title: "over a result carrying the measured view, the injected registration's output has exactly contract, source, workspaceRoot and runtime, source is exactly the measured result's serialized keys with the runtime's view verbatim, and no member names a revision or a basis",
    run: async () => {
      const live = leg('provider-live');
      const output = await outputFor(live.view);
      expect(Object.keys(output)).toEqual(OUTPUT_MEMBERS);
      expect(output.contract).toBe(HYPERUNIX_FIND_CONTRACT);
      const source = output.source as Json;
      expect(Object.keys(source)).toEqual(live.resultJsonKeys);
      expect(source.view).toBe(live.view);
      expect(live.view).toBe('hx.view/workspace-head');
      expect(memberNames(output).filter(name => /revision|basis|resolved/i.test(name))).toEqual([]);
    },
  },
  {
    id: 'SB2b', row: 'ENVELOPE', kind: 'claim', assertions: 2,
    title: "over a result without a view the injected registration's output keeps the same members and relays the view as null, never a requested or default spelling",
    run: async () => {
      const output = await outputFor(null);
      expect(Object.keys(output)).toEqual(OUTPUT_MEMBERS);
      expect((output.source as Json).view).toBeNull();
    },
  },
  {
    id: 'SB2c', row: 'ENVELOPE', kind: 'claim', assertions: 10,
    title: "read with the TypeScript parser, nativeHyperUnixFind's only return is JSON.parse(JSON.stringify(...)) of exactly contract, source, workspaceRoot and runtime, valued HYPERUNIX_FIND_CONTRACT, resultToJson of its own const result of the awaited workspace.find, realpathSync(workspaceRoot) and the runtime's version and binary digest, and registerNativeHyperUnixFind's invoke is that call itself; G3's revision relay planted reads a revision member, a planted spread reads '<spread>', a planted early return a second return, a let result a non-const binding and a wrapped invoke its wrapper",
    run: () => {
      const read = providerRead();
      expect(read.returns.map(item => item.shape)).toEqual(['json-round-trip']);
      expect(read.returns[0]?.members).toEqual(OUTPUT_MEMBERS);
      expect(read.returns[0]?.values).toEqual([['contract', 'HYPERUNIX_FIND_CONTRACT'], ['source', 'resultToJson(result)'], ['workspaceRoot', 'realpathSync(workspaceRoot)'],
        ['runtime', '{version:runtime.version,binarySha256:runtime.binarySha256}']]);
      expect(read.bindings.filter(item => item.name === 'result').map(item => [item.kind, item.awaited])).toEqual([['const', 'workspace.find']]);
      expect(read.nativeInvokes).toEqual(['nativeHyperUnixFind']);
      expect(planted(G3).returns[0]?.members, 'G3: the SDK revision member relayed').toEqual(['contract', 'source', 'revision', 'workspaceRoot', 'runtime']);
      expect(planted([['workspaceRoot:realpathSync(workspaceRoot),', 'workspaceRoot:realpathSync(workspaceRoot),...relay,']]).returns[0]?.members, 'an identifier spread')
        .toEqual(['contract', 'source', 'workspaceRoot', '<spread>', 'runtime']);
      expect(planted([[NATIVE_OPEN, `if(kind==="")return relay;${NATIVE_OPEN}`]]).returns.map(item => item.shape), 'an early return').toEqual(['other', 'json-round-trip']);
      expect(planted([['const result=await workspace.find(', 'let result=await workspace.find(']]).bindings.filter(item => item.name === 'result').map(item => [item.kind, item.awaited]), 'a let result')
        .toEqual([['other', 'workspace.find']]);
      expect(planted([['=>nativeHyperUnixFind(', '=>relay(nativeHyperUnixFind('], ['ctx.signal)});', 'ctx.signal))});']]).nativeInvokes, 'a wrapped invoke').toEqual(['relay']);
    },
  },
  {
    id: 'QUIET-DROPPED-RESOLUTION', row: 'ENVELOPE', kind: 'quiet', assertions: 6,
    title: "a reader result carrying the SDK's pinned-view resolution reaches the injected output and its projection without it (no revision member, no resolved commit, no subjectBasis), and the provider's code, read with the TypeScript parser, names no revision or resolved commit (G3's relay planted names three)",
    run: async () => {
      const {invoke} = recording(() => ({...resultFromJson(documentWith('hx.view/workspace-head')), revision: RESOLUTION}) as QueryResult<ClaimBody>);
      const output = (await invoke({kind: 'hx.fs/regular-file', root: 'src'})) as Json;
      expect(Object.keys(output)).toEqual(OUTPUT_MEMBERS);
      expect(memberNames(output)).not.toContain('revision');
      expect(JSON.stringify(output)).not.toContain(RESOLUTION.resolvedCommit);
      expect(hyperunixTopology(output, context).snapshots[0]).not.toHaveProperty('subjectBasis');
      expect(revisionNames(providerRead())).toEqual([]);
      expect(revisionNames(planted(G3)), 'G3: the member, its type and its read').toEqual(['revision', 'revision', 'revision']);
    },
  },
  {
    id: 'SB3', row: 'PROJECTION', kind: 'claim', assertions: 9,
    title: 'hyperunixTopology over both injected outputs states no subjectBasis, sourceRevision or definitionDigest, keeps one source reference whatever the view, and carries the view only as its view facet',
    run: async () => {
      const live = leg('provider-live');
      const viewed = hyperunixTopology(await outputFor(live.view), context);
      const bare = hyperunixTopology(await outputFor(null), context);
      for (const topology of [viewed, bare]) {
        for (const key of ['subjectBasis', 'sourceRevision', 'definitionDigest']) expect(topology.snapshots[0], key).not.toHaveProperty(key);
      }
      expect(viewed.snapshots[0]?.source).toStrictEqual(bare.snapshots[0]?.source);
      expect((viewed.facets ?? []).filter(facet => facet.kind === 'view')).toStrictEqual([{kind: 'view', view: live.view}]);
      expect((bare.facets ?? []).filter(facet => facet.kind === 'view')).toStrictEqual([]);
    },
  },
  {
    id: 'SB4', row: 'MEASURED', kind: 'claim', assertions: 10,
    title: "the record's provider-live leg answered through the live view: no requested view, the runtime's hx.view/workspace-head, a revision member that is null and no revision key serialized, no runtime digest, absence not licensed",
    run: () => {
      const live = leg('provider-live');
      expect(live.requestedView).toBeNull();
      expect(live.outcome).toBe('result');
      expect(live.view).toBe('hx.view/workspace-head');
      expect(live.revisionMember).toBe(true);
      expect(live.revision).toBeNull();
      expect(live.resultJsonKeys).not.toContain('revision');
      expect(live.queryDigest).toBeNull();
      expect(live.digestSource).toBe('absent');
      expect(live.licensesAbsence).toBe(false);
      expect(live.frames).toBeGreaterThan(0);
    },
  },
  {
    id: 'SB5', row: 'MEASURED', kind: 'claim', assertions: 11,
    title: "the record's provider-pinned leg, the same request pinned to the base revision, was refused and never answered: exit 2, usage_refused, HX-CLI-USAGE-ERROR, view-binding-pending, HX-VIEW-013, no view, no rows, no frames",
    run: () => {
      const pinned = leg('provider-pinned');
      const base = record().repository.baseRevision;
      expect(pinned.requestedView).toBe(`git:${base}`);
      expect(pinned.outcome).toBe('process-failure');
      expect(pinned.exitCode).toBe(2);
      expect(pinned.terminal).toBe('usage_refused');
      expect(pinned.diagnostics.map(item => item.code)).toEqual(['HX-CLI-USAGE-ERROR']);
      expect(pinned.diagnostics[0]?.reason).toBe(`view-binding-pending: hx find under --view git:${base}`);
      expect(pinned.diagnostics[0]?.requirements).toContain('HX-VIEW-013');
      expect(pinned.view).toBeNull();
      expect(pinned.revision).toBeNull();
      expect(pinned.rows).toBeNull();
      expect(pinned.frames).toBe(0);
    },
  },
  {
    id: 'SB6', row: 'MEASURED', kind: 'claim', assertions: 10,
    title: "the record is the probe's: its schema and bead, the probe's script SHA-256, both legs in order, a 64-hex producer binary, the vendored SDK version, a 40-hex base revision, a zoned instant and no host path",
    run: () => {
      const probed = record();
      const vendored = JSON.parse(repoText('node_modules/@hyperunix/sdk/package.json')) as {version: string};
      expect(probed.schema).toBe('wb-lri.hx-source-basis-probe/1');
      expect(probed.bead).toBe(BEAD);
      expect(probed.probe).toStrictEqual({script: PROBE, scriptSha256: sha256(repoText(PROBE))});
      expect(probed.legs.map(item => item.id)).toEqual(['provider-live', 'provider-pinned']);
      expect(probed.producer.binarySha256).toMatch(/^[0-9a-f]{64}$/);
      expect(probed.producer.sdk).toStrictEqual({name: '@hyperunix/sdk', version: vendored.version});
      expect(probed.repository.baseRevision).toMatch(/^[0-9a-f]{40}$/);
      expect(probed.utc).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/);
      expect(JSON.stringify(probed)).not.toMatch(/\/(?:tmp|home|local|workplace|Users|private|var)\//);
      expect(repoText(RECORD_PATH).endsWith('\n')).toBe(true);
    },
  },
];

/** The census rows: each the claim one header sentence makes and the cases that pin it. */
const ROWS: readonly {readonly id: RowId; readonly text: string; readonly pins: readonly string[]}[] = [
  {id: 'REQUEST', text: "the injected registration's request carries no view at run time, with a root and without one; read with the TypeScript parser, both find calls pass exactly the five request members, nativeHyperUnixFind opens its workspace with the realpath root alone, and no code token names a view", pins: ['SB1a', 'SB1b', 'SB1c', 'SB1d']},
  {id: 'ENVELOPE', text: "the injected registration's output carries exactly the contract, source, workspace root and runtime members, the runtime's view identity verbatim and no member naming a revision or a basis; read with the TypeScript parser, nativeHyperUnixFind returns exactly those four members, its source being resultToJson of its own find result", pins: ['SB2a', 'SB2b', 'SB2c']},
  {id: 'PROJECTION', text: "hyperunixTopology over the injected registration's outputs states no subjectBasis, sourceRevision or definitionDigest, whatever view the runtime printed", pins: ['SB3']},
  {id: 'MEASURED', text: 'the committed record, tied to its probe, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013', pins: ['SB4', 'SB5', 'SB6']},
];
/** The named residual families, each with its row and its pinned quiet case. */
const RESIDUALS: readonly {readonly id: string; readonly row: RowId; readonly quiet: string}[] = [
  {id: 'R-DROPPED-RESOLUTION', row: 'ENVELOPE', quiet: 'QUIET-DROPPED-RESOLUTION'},
];
/** The receipt's Measured record fields, each read from the record by valueAt. */
const MEASURED_FIELDS = [
  'producer.version', 'producer.binarySha256', 'producer.binaryOrigin', 'producer.sdk.version', 'repository.baseRevision',
  'provider-live.view', 'provider-live.revision', 'provider-live.digestSource', 'provider-pinned.exitCode', 'provider-pinned.code',
  'provider-pinned.requirements',
] as const;
const valueAt = (field: (typeof MEASURED_FIELDS)[number]): string => {
  const probed = record();
  const pinned = leg('provider-pinned');
  switch (field) {
    case 'producer.version': return String(probed.producer.version);
    case 'producer.binarySha256': return String(probed.producer.binarySha256);
    case 'producer.binaryOrigin': return String(probed.producer.binaryOrigin);
    case 'producer.sdk.version': return String(probed.producer.sdk.version);
    case 'repository.baseRevision': return probed.repository.baseRevision;
    case 'provider-live.view': return String(leg('provider-live').view);
    case 'provider-live.revision': return JSON.stringify(leg('provider-live').revision);
    case 'provider-live.digestSource': return String(leg('provider-live').digestSource);
    case 'provider-pinned.exitCode': return String(pinned.exitCode);
    case 'provider-pinned.code': return pinned.diagnostics.map(item => item.code).join(' ');
    case 'provider-pinned.requirements': return pinned.diagnostics.flatMap(item => item.requirements).join(' ');
  }
};

/** The shape and anchor rows, registered after the cases. */
const ANCHOR_ROWS: readonly {readonly id: string; readonly title: string; readonly assertions: number; readonly run: () => void}[] = [
  {
    id: 'FROZEN-SHAPE',
    assertions: 4,
    title: 'FROZEN-SHAPE: the rows, their pin counts, the residual families, the anchor rows and the measured fields are exactly the cut\'s (rule 16)',
    run: () => {
      expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(['REQUEST:4', 'ENVELOPE:3', 'PROJECTION:1', 'MEASURED:3']);
      expect(RESIDUALS.map(residual => `${residual.id}:${residual.row}:${residual.quiet}`)).toEqual(['R-DROPPED-RESOLUTION:ENVELOPE:QUIET-DROPPED-RESOLUTION']);
      expect(ANCHOR_ROWS.map(row => row.id)).toEqual(['FROZEN-SHAPE', 'TILING', 'ANCHOR-RECEIPT', 'ANCHOR-RECORD']);
      expect([...MEASURED_FIELDS]).toHaveLength(11);
    },
  },
  {
    id: 'TILING',
    assertions: 26,
    title: 'TILING: the rows and the residuals pin every case exactly once, each by a row of its own row and kind, and every id is distinct',
    run: () => {
      const ids = CASES.map(item => item.id);
      expect(new Set(ids).size).toBe(ids.length);
      const placed = [...ROWS.flatMap(row => row.pins.map(pin => [pin, row.id, 'claim'] as const)), ...RESIDUALS.map(residual => [residual.quiet, residual.row, 'quiet'] as const)];
      expect(placed.map(([id]) => id).sort()).toEqual([...ids].sort());
      for (const [id, row, kind] of placed) {
        const pinned = CASES.find(item => item.id === id);
        expect(pinned?.row, id).toBe(row);
        expect(pinned?.kind, id).toBe(kind);
      }
    },
  },
  {
    id: 'ANCHOR-RECEIPT',
    assertions: 5,
    title: "ANCHOR-RECEIPT: outside anchor, the receipt's census line is this file's title and its Claims, Judged pins, Residuals and Shape rows tables are exactly the rows, the cases with their assertion counts, the residual families and the shape rows with theirs",
    run: () => {
      expect(entryItems().filter(text => text.startsWith('Census: '))).toStrictEqual([`Census: ${HEADER}`]);
      expect(ROWS.map(row => [row.id, row.text])).toStrictEqual(receiptTable(RECEIPT_TABLES.claims));
      const pins = ROWS.flatMap(row => row.pins.map(pin => [row.id, pin, String(CASES.find(item => item.id === pin)?.assertions)]));
      const quiet = RESIDUALS.map(residual => [residual.row, residual.quiet, String(CASES.find(item => item.id === residual.quiet)?.assertions)]);
      expect([...pins, ...quiet]).toStrictEqual(receiptTable(RECEIPT_TABLES.pins));
      expect(RESIDUALS.map(residual => [residual.id, residual.quiet])).toStrictEqual(receiptTable(RECEIPT_TABLES.residuals));
      expect([...ANCHOR_ROWS.map(row => [row.id, String(row.assertions)]), ['REGISTRATION', String(REGISTRATION_ASSERTIONS)]]).toStrictEqual(receiptTable(RECEIPT_TABLES.shape));
    },
  },
  {
    id: 'ANCHOR-RECORD',
    assertions: 2,
    title: "ANCHOR-RECORD: outside anchor, the receipt's Measured record table names exactly the measured fields and each holds the committed record's value",
    run: () => {
      const table = receiptTable(RECEIPT_TABLES.measured);
      expect(table.map(([name]) => name)).toStrictEqual([...MEASURED_FIELDS]);
      expect(table.map(([, value]) => value)).toStrictEqual(MEASURED_FIELDS.map(valueAt));
    },
  },
];

const caseTitle = (item: Case): string => `${item.id} [${item.row}] ${item.title}`;
/** Every test this file registers, in registration order: the cases, the anchor rows, then the registration row. */
const registeredTitles = (): string[] => [...CASES.map(caseTitle), ...ANCHOR_ROWS.map(row => row.title), REGISTRATION_TITLE];
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the test doing the reading. */
const registered = (tasks: readonly RunnerTask[], self: RunnerTask): Registered[] =>
  tasks.flatMap((child): Registered[] => {
    if (child.type === 'test') return [{name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self}];
    return child.type === 'suite' ? registered(child.tasks, self) : [];
  });

describe(HEADER, () => {
  for (const item of CASES) {
    it(caseTitle(item), async () => {
      expect.assertions(item.assertions);
      await item.run();
    });
  }

  for (const row of ANCHOR_ROWS) {
    it(row.title, () => {
      expect.assertions(row.assertions);
      row.run();
    });
  }

  it(REGISTRATION_TITLE, ({task}) => {
    expect.assertions(REGISTRATION_ASSERTIONS);
    const walked = registered(task.file.tasks, task);
    expect(walked.map(entry => entry.name), 'every registered test of this file (vitest task tree), exactly and in order').toEqual(registeredTitles());
    expect(walked.findIndex(entry => entry.self), 'this row finds itself by task identity, registered last').toBe(walked.length - 1);
    const unrun = walked.filter(entry => !entry.self && (entry.mode !== 'run' || entry.fails || entry.state !== 'pass'));
    expect(unrun.map(entry => `${entry.name} | ${entry.mode}${entry.fails ? '+fails' : ''} | ${entry.state ?? 'no result'}`), 'every other test is set to run, not inverted, and passed before this row').toEqual([]);
  });
});
