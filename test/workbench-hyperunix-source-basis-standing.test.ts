/**
 * wb-lri (W07: HyperUnix provider), the source-basis STANDING leg, cut 4. The bead: "Typed HX query capability preserving source
 * basis, coverage classification, bounds, known-empty vs incomplete/unknown. Partial coverage never becomes known-empty. Verify
 * actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and source basis. Spec:
 * docs/workbench/07." Its notes: "Full source basis/observer acceptance remains open." The coverage half is landed and pinned
 * elsewhere (test/workbench-hyperunix-observer.test.ts H2 and the docs/07 census row H1); this file is the source-basis half.
 *
 * BACKGROUND (what the committed RECORD measured with qa/workbench/hx-source-basis-probe.mjs, and what the vendored @hyperunix/sdk
 * 0.1.0 declares in dist/workspace.d.ts; context for the rows, not a row): the SDK declares a read's source basis only as
 * ReadResult.revision, the runtime's resolution of a pinned view ({requested, resolvedCommit}; "null when the stream carried none
 * (a live read)"), and the record's live leg serialized no revision key. The installed hx answered the provider's find request
 * (kind, root, best effort, a 30 s wall, a 60 s wait) through the live view hx.view/workspace-head with no pinned-view resolution
 * and no runtime query digest, and refused the same request pinned to the base revision (reason "view-binding-pending: hx find
 * under --view git:<base>", HX-VIEW-013), so the recorded build printed no view identity and no resolution for a pinned find. No
 * source basis exists for a find at this build; what this census claims is that the two hyperunix.find registrations of
 * src/workbench/providers/hyperunix.ts state none, in exactly the read sets and over exactly the results enumerated below.
 *
 * HISTORY. Cut 1 (ca61b20c) ran only the injected registration; refusal #1 (g10-gate-s289, gate-prep-36) named G1-G3. Cut 2
 * (65cb9bff) read the native registration with the TypeScript parser and cured G1-G3; refusal #2 (g10-gate-s289, gate-prep-160;
 * class guard bound by R-B778) named U1-U6: the native readings named bindings by TEXT, so a same-named parameter, local or import
 * cut the tie (U1 L01, the invoke callee; U2 L02, the native serializer; U3 L04, the native Bounds); SB4 and SB5 asserted record
 * facts the receipt's Measured record table did not anchor (U4 L06-L08); a nested receipt bullet escaped the entry's item model
 * (U5 L10); and the injected output could relay the resolution's requested revision under another name (U6 L12). Cut 3 (fa7cbee3)
 * resolved the native names through the TypeScript binder, anchored the record leaf for leaf and flattened the receipt entry;
 * refusal #3 (g10-gate-s290, gate-prep-3; the second-stage cap of rule 19(c), engaged by R-B794) named U1-U5: every run-time row
 * built its result on the live view or a null view while its words ranged over any view, so a relay of the resolution keyed on a
 * pinned view (U1 N01), a pinned view rewritten to the live spelling (U2 N03) and an observer subjectBasis for a pinned view (U3
 * N04) left the census green; SB3's source-reference equality compared undefined with undefined (U4 N11); and SB6's host-path pin
 * read seven prefixes only (U5 N10).
 *
 * FORM OF RECORD (cut 4: the rule-14 enumerate-the-resolvable form the second-stage cap R-B794 requires; the rows, their pins, the
 * residual families and the anchor rows are cut 3's, unchanged; cure form PIN-AND-FALSIFY for U1-U5): each row claims exactly the
 * read set and the results this header enumerates for it; every known unread family inside the claimed subject is a named residual
 * with a pinned quiet row; a spelling, result or path outside a row's enumeration is a member of a residual family or NOT CLAIMED,
 * never a claim of that row. "No", "every", "each" and "exactly" below range over the enumerated forms. U5's survivor N10 and its
 * paired control N10c are planted verbatim into the record text SB6 reads; U1-U4's survivors change code the run-time rows execute,
 * which a planted text cannot reach, so each is replayed alone from refusal #3's archive and reds the rows the receipt names.
 *
 * BINDINGS (refusal #2's U1-U3): a name the native readings read resolves through the landed bindingOf
 * (test/helpers/hyperunix-custody-readers.ts: the TypeScript binder's own symbol at its use site, in a one-file program over the very
 * source; its falsifier census is test/workbench-hyperunix-custody-readers-census.test.ts), so a same-named declaration in another
 * scope never answers for it. This census writes a resolution as 'global'; as 'import <module> <exported name>'; or as '<kind> of
 * <owner>' for each declaration of the symbol in the file (kind: function, parameter <index>, const, let, var or catch with
 * ' = <initializer>' white space removed, or the declaration's syntax kind; owner: the enclosing function's name, a function value's
 * property or variable name, or module), joined by ' + ' when the symbol has more than one declaration; a name that resolves
 * differently at two use sites reads both, joined by ' | '. A name is read where it is a value: never a declaration's own name, a
 * member name after a dot, a property key or a name under a type.
 *
 * THE ENUMERATED RESULTS (U1-U3): each run-time row invokes the injected registration with the record's request (kind and root read
 * from the record; SB1b drops the root) over a recording reader whose runtime is version 0.1.0 and a fixed binary digest, and whose
 * result is documentWith(<view>): one hyperunix.result/1 document whose SDK serialization has exactly the record's measured keys
 * (SB2a), on each of the three view values the committed record holds and SB4/SB5 pin - the live leg's measured view
 * (hx.view/workspace-head), the pinned leg's requested view (git:<base>, the record's base revision; the recorded build answered no
 * pinned find, so this request spelling stands in for the identity a runtime would print for one) and the pinned leg's view (null).
 * The quiet row runs each view without a resolution and with one: on the pinned view a resolution of that request (requested <base>,
 * the request's revision text as the SDK declares it, and resolvedCommit <base>, the commit a full commit id names), on the live and
 * null views the distinctive control RESOLUTION below (cut 3's control, kept; a live read carries none).
 *
 * THE PINNED READER SET (each case's id, row and assertion count are the receipt's Judged pins table):
 *  REQUEST     SB1a, SB1b: the injected registration over a recording reader issues the record's request (kind, root, best effort,
 *              a 30 s wall bound, a 60 s wait) with a root, and the same request without one, and never a view member.
 *              SB1c (parser, binder): the module's find calls on an identifier receiver are exactly two, on receivers named reader
 *              (read by its name only) and then workspace (nativeHyperUnixFind's own), and the name find occurs in its code three
 *              times only; each passes exactly the five request members, a bounds member spelled exactly Bounds.create({wall: <the
 *              record's wall>}), the record's wait and best effort true; in nativeHyperUnixFind, Bounds resolves to the
 *              @hyperunix/sdk import of Bounds, workspace to its one const, and kind and root to its parameters 1 and 2. Witnesses:
 *              G2's identifier spread, a call spread and a member-access spread planted into the native call read '<spread>'; a
 *              planted raw find makes find four; L04 planted resolves the native Bounds to a const of nativeHyperUnixFind.
 *              SB1d (parser, binder): nativeHyperUnixFind's find runs on workspace, bound once as const to the module's only
 *              HyperUnix.open call, whose argument list is exactly realpathSync(workspaceRoot) (no client options, so no client default
 *              view); HyperUnix resolves to the @hyperunix/sdk import, realpathSync to the node:fs import, workspaceRoot to the
 *              function's parameter 0; the name HyperUnix occurs only as its import and that call; no identifier, private name or
 *              string or template literal text of the code contains "view" in any case. Witnesses: G1 planted reads its options
 *              argument and three view names; the planted raw find's --view names one; a planted constructed workspace reads as its
 *              binding; a planted local realpathSync reads as a const.
 *  ENVELOPE    SB2a: over a result on each of the record's two string views (hx.view/workspace-head and git:<base>, both read from the
 *              record and pinned to those spellings), the injected registration's output has exactly the members contract, source,
 *              workspaceRoot and runtime and equals the envelope built from the SDK's own serialization of that result (the contract,
 *              that serialization, the workspace root, the runtime's version and binary digest), source is exactly the record's
 *              measured serialized keys, source.view is that view verbatim, and no member name anywhere matches revision, basis or
 *              resolved in any case. SB2b: over a result on the pinned leg's null view, the output has the same four members, equals
 *              the same envelope of that result, and source.view stays null.
 *              SB2c (parser, binder): nativeHyperUnixFind's only return is JSON.parse(JSON.stringify(<object literal>)), JSON global,
 *              whose members are exactly contract, source, workspaceRoot and runtime, valued HYPERUNIX_FIND_CONTRACT (the module's
 *              const), resultToJson(result) (resultToJson the @hyperunix/sdk import, result its one const of the awaited
 *              workspace.find), realpathSync(workspaceRoot) and {version: runtime.version, binarySha256: runtime.binarySha256} (runtime
 *              its one const of the awaited client.runtime()); registerNativeHyperUnixFind's body is the one statement
 *              registry.register({descriptor, invoke}), whose invoke is a direct call of nativeHyperUnixFind resolving to the module's
 *              one function declaration of that name, the one this census reads. Witnesses: G3, a spread, an early return, a let
 *              result and a wrapped invoke read as planted; L01 planted resolves the invoke callee to registerNativeHyperUnixFind's
 *              parameter 2; L02 planted resolves the native serializer to a const of nativeHyperUnixFind; a planted JSON shadow and a
 *              planted spread after invoke read as planted.
 *  BINDING     SB7 (binder): every name the bodies of nativeHyperUnixFind and registerNativeHyperUnixFind read resolves exactly as
 *              NATIVE_NAMES and REGISTER_NAMES pin; nativeHyperUnixFind declares exactly workspace, client, onAbort, runtime and result
 *              (each const, once) and takes exactly workspaceRoot, kind, root and signal; the names nativeHyperUnixFind and
 *              registerNativeHyperUnixFind are each declared once, by an exported function declaration; and the module has no export
 *              declaration or export assignment, so the name a host imports is the function read. Witnesses: a planted second
 *              nativeHyperUnixFind, an aliased import (resultFromJson as resultToJson), an export re-route and a block-level client
 *              shadow each read as planted.
 *  PROJECTION  SB3: over the three enumerated views (pinned to the record's three values), hyperunixTopology over the injected outputs
 *              projects for each exactly one snapshot, with no subjectBasis, sourceRevision or definitionDigest member and the source
 *              reference {provider hyperunix, type query, a 64-hex id, scope the workspace}; the three topologies, their view facets
 *              set aside (one per string view, none for the null view), are equal; and each string view is exactly one view facet
 *              holding it verbatim, the null view none.
 *  MEASURED    SB4: the record's provider-live leg (no requested view, outcome result, the view hx.view/workspace-head, a revision
 *              member that is null and no revision key serialized, no runtime digest and digest source absent, absence not
 *              licensed, at least one frame). SB5: its provider-pinned leg (requested view git:<base>, outcome process-failure, exit
 *              2, terminal usage_refused, the one diagnostic HX-CLI-USAGE-ERROR with reason "view-binding-pending: hx find under
 *              --view git:<base>" and HX-VIEW-013 among its requirements; no view, no revision, no rows, zero frames). SB6: the
 *              record's schema and bead, its probe entry (this probe's path and its SHA-256), its two legs in order, a 64-hex producer
 *              binary digest, the vendored SDK's name and version, a 40-hex base revision, a UTC instant and a trailing newline; no
 *              string value of the record holds an absolute path in ABSOLUTE_PATH's forms (a slash or tilde-slash opening the value
 *              or following white space, a colon or an equals sign; a backslash pair; a lone drive letter before a backslash), and
 *              its JSON serialization holds none of the seven host roots of HOST_ROOTS. Witnesses: each form in ABSOLUTE_PATH_FORMS
 *              reads as one absolute path and each root of HOST_ROOTS as one root, and N10's /srv/ reason and N10c's /home/ reason,
 *              each planted into the record text, read as that one absolute path (N10c also as one root). Every record fact these
 *              cases assert is a leaf of the record, and ANCHOR-RECORD holds every leaf to the receipt.
 * Shape and anchor rows: FROZEN-SHAPE (rule 16), TILING, ANCHOR-RECEIPT (the receipt's cut-4 entry, read with the marked lexer
 * census.ts reads, renders one flat list whose every item is a single text block - no nested list or block, no hard break - then
 * its five table sections and nothing else; its one census line is this file's title; and its Claims, Judged pins, Residuals and
 * Shape rows tables; witnesses L10's nested census bullet, a continuation paragraph, a hard break and a census paragraph each read
 * as planted), ANCHOR-RECORD (the receipt's Measured record table is every leaf of the committed record, path for path in record
 * order, each with its JSON value), and REGISTRATION, registered last, which holds the collected task tree to this file's titles,
 * every other test run and passed. Every row states its exact assertion count (expect.assertions), each held by a receipt table.
 *
 * RESIDUALS (rule 19(d): a named family plus a pinned quiet row):
 *  R-DROPPED-RESOLUTION (ENVELOPE). Both registrations serialize the result with the SDK's resultToJson (each call binder-resolved to
 *  the @hyperunix/sdk import), which keeps no pinned-view resolution, so a result that carried one (a pinned view the runtime bound,
 *  were the provider's request or the runtime's default view ever pinned) would reach the output without its source basis. Quiet row
 *  QUIET-DROPPED-RESOLUTION pins that reading at run time over the enumerated results: for each of the three views, the injected
 *  output over the result carrying its resolution (on the pinned view git:<base>, the form a resolution travels, that request's
 *  resolution; on the live and null views the control RESOLUTION; the three pairs pinned literally, and each reader result shown to
 *  carry its resolution) equals, member for member, both the envelope of the SDK's own serialization of the result without it and the
 *  output over that result, its runtime member is exactly version and binarySha256, no member of it is named revision, and its
 *  projection equals the projection of the output without it (which SB3 pins to no subjectBasis); on the live and null views neither
 *  half of RESOLUTION appears in the output's text. Through the parser, no identifier, private name or string or template literal
 *  text of the provider's code contains "revision" or "resolvedcommit" in any case; through the binder, both resultToJson calls
 *  resolve to the SDK import (L02 planted reads a local one). It reds the day an enumerated resolution reaches the injected output
 *  over its view under any name at any depth (the output then differs from the envelope) or moves that output's projection, and the
 *  day the code names a revision or a serializer call resolves elsewhere. Another resolution, or a resolution on a view outside the
 *  enumeration, is NOT CLAIMED (below).
 *  R-RUNTIME-REWRITE (BINDING). A run-time rewrite of what a resolved binding holds - nativeHyperUnixFind itself, an SDK export such
 *  as Bounds.create or HyperUnix.open, a global such as JSON, or the SDK result - leaves every parser and binder reading above
 *  unchanged. Quiet row QUIET-RUNTIME-REWRITE pins the provider module's code to no write in the read forms: no assignment of any
 *  operator, update, delete or for-in/for-of target, and no call whose callee chains (the landed calleeChains, const aliases
 *  followed) name a member of the landed MUTATORS set; a planted reassignment of nativeHyperUnixFind, a planted Bounds.create
 *  write, a planted Object.defineProperty of JSON.stringify and that call through a const alias each read as one write. Any other
 *  rewrite form inside the module (a computed or reflective callee, a mutation through a method outside MUTATORS, such as an
 *  array's push) is a member of this family the quiet row does not read.
 *
 * NOT CLAIMED: a pinned find's source basis is NOT CLAIMED by this census (the installed hx refuses the request; the remainder
 * is HyperUnix-CLI's view binding for find). For the run-time rows (SB1a, SB1b, SB2a, SB2b, QUIET-DROPPED-RESOLUTION and SB3), a
 * request other than the record's (another kind or root), a view value other than the three enumerated (another pinned spelling,
 * the SDK's live or epoch request spelling, an identity a later runtime prints for a pinned read), a resolution other than the two
 * enumerated, and a result of another shape than documentWith's are NOT CLAIMED by this census. hyperunixTopology over any output
 * other than the injected outputs for the three enumerated views (one carrying a basis included; no enumerated output carries one)
 * is NOT CLAIMED by this census. hx verbs other than find, hx builds other than the recorded binary, and a live re-measure (the
 * census reads the committed record) are NOT CLAIMED by this census. The hyperunix.find descriptor surface (its input schema and
 * version) is NOT CLAIMED by this census (REGISTER_NAMES spells INPUT's declaration, so an edit to it reds SB7 and re-cuts this
 * census; no claim is made of it). The native registration at run time (its output values and their projection) is NOT CLAIMED by
 * this census: its code is read by the parser and the binder, never run. A view or option reaching the runtime by a route the
 * parser does not read here (the child environment, an hx or SDK configuration file, the runtime's own default view) is NOT CLAIMED
 * by this census. SDK operations or hx processes of the provider other than its two find calls are NOT CLAIMED by this census (the
 * token pins red on any that names find or a view in an identifier or a plain string literal; a name split across a template
 * literal or a string concatenation says nothing). The injected find call's receiver beyond its name is NOT CLAIMED by this census
 * (SB1c reads it as the identifier reader, so a same-named wrapper forwarding to the injected reader, as refusal #3's boundary
 * member N06 plants, is not read). The native find call's kind and root values and the invoke's arguments (the parser reads member
 * names, the bound, the wait and best effort, and the binder their names' declarations, never the values a caller passes) are NOT
 * CLAIMED by this census. Names under a type (annotations, assertions, type-only imports), which carry no run-time value, are NOT
 * CLAIMED by this census. A rewrite of an SDK export, a global or a provider binding made outside the provider module (another
 * module's code, a test's spy) is NOT CLAIMED by this census. Which host registers which registration is NOT CLAIMED by this census
 * (Pi's hosts register the native one, src/workbench/hosts/local-detached.ts and src/workbench/native-modules.ts). A host path in a
 * form SB6's two readings do not read (a relative path, a path joined to the text before it by another character, an encoded path,
 * a path in an object key) is NOT CLAIMED by this census.
 *
 * Display paths added: none (test-only). No scratch directory is allocated: WS is a string, never created or read.
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Bounds, type ClaimBody, type QueryResult, resultFromJson, resultToJson} from '@hyperunix/sdk';
import {marked, type Token, type Tokens} from 'marked';
import ts from 'typescript';
import {describe, expect, it, type RunnerTask} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {type HyperUnixProjectionTopology, type HyperUnixTopologyContext, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';
import {HYPERUNIX_FIND_CONTRACT, type HyperUnixReader, registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {docsSection, sectionTables} from './helpers/census.js';
import {bindingOf, calleeChains, descendants, MUTATORS} from './helpers/hyperunix-custody-readers.js';

type Json = {[key: string]: JsonValue};
type FindRequest = Parameters<HyperUnixReader['find']>[0];

const REPO = fileURLToPath(new URL('../', import.meta.url));
const BEAD = 'wb-lri';
const PROVIDER = 'src/workbench/providers/hyperunix.ts';
const PROBE = 'qa/workbench/hx-source-basis-probe.mjs';
const RECORD_PATH = 'qa/workbench/receipts/wb-lri-hx-source-basis-probe.json';
const RECEIPT = 'docs/workbench/receipts/wb-lri.md';
const RECEIPT_ENTRY = '2026-11-11 receipt: the source-basis standing census and the installed-HX probe, cut 4 (machine seat ws-10; cures refusal #3, U1-U5)';
const RECEIPT_TABLES = {
  claims: {heading: 'Claims, wb-lri cut 4', header: ['Row', 'Claim']},
  pins: {heading: 'Judged pins, wb-lri cut 4', header: ['Row', 'Pin', 'Assertions']},
  residuals: {heading: 'Residuals, wb-lri cut 4', header: ['Residual', 'Quiet row']},
  shape: {heading: 'Shape rows, wb-lri cut 4', header: ['Row', 'Assertions']},
  measured: {heading: 'Measured record, wb-lri cut 4', header: ['Field', 'Value']},
} as const;
/** The census title: the describe block's name and the receipt's census line. */
const HEADER =
  "wb-lri (W07) source-basis standing census: the provider module's injected hyperunix.find registration, run over a recording reader, issues the record's request, with and without its root, with no view member, and over results on the three view values the committed record holds (its live view, its pinned request spelling and its null view), each without and with its enumerated SDK pinned-view resolution, outputs exactly the envelope of the SDK's own serialization of the result without the resolution, so each view verbatim, while hyperunixTopology over those outputs states no subjectBasis, sourceRevision or definitionDigest; its native registration, read with the TypeScript parser and binder in the read sets enumerated here, spells no view in its request and no revision member in its return; and the committed record, anchored leaf for leaf, holds the installed hx's refusal of a pinned find (HX-VIEW-013)";
const REGISTRATION_TITLE = "REGISTRATION: the collected task tree is exactly this file's titles in order, and every other test ran and passed before this one";
/** The registration row's own assertion count (the receipt's Shape rows table holds it with the anchor rows'). */
const REGISTRATION_ASSERTIONS = 3;

const WS = '/workspace/wb-lri';
const BINARY = '5d'.repeat(32);
const CAPABILITY = 'hyperunix.find';
const REQUEST_MEMBERS = ['kind', 'root', 'bestEffort', 'bounds', 'timeoutMs'];
const OUTPUT_MEMBERS = ['contract', 'source', 'workspaceRoot', 'runtime'];
const RUNTIME_MEMBERS = ['version', 'binarySha256'];
/** The table subsections the receipt entry renders after its one list, in order (ANCHOR-RECEIPT). */
const ENTRY_BLOCKS = ['list', ...Array.from({length: 5}, () => ['heading:3', 'table']).flat()];
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
const isObject = (value: unknown): value is {readonly [key: string]: unknown} => value !== null && typeof value === 'object' && !Array.isArray(value);
/** Every leaf of a JSON value in document order, as [dotted path, JSON text]: a scalar, or an array of scalars, is one leaf; an array
 * holding an object keys each element by its string id member (the legs) or else by its index (a leg's diagnostics). */
function recordLeaves(value: unknown, path = ''): (readonly [string, string])[] {
  const under = (key: string): string => (path === '' ? key : `${path}.${key}`);
  if (Array.isArray(value) && value.some(item => item !== null && typeof item === 'object')) {
    return value.flatMap((item: unknown, index) => recordLeaves(item, under(isObject(item) && typeof item.id === 'string' ? item.id : String(index))));
  }
  if (isObject(value)) return Object.entries(value).flatMap(([key, child]) => recordLeaves(child, under(key)));
  return [[path, JSON.stringify(value)]];
}
/** The receipt's markdown with each anchor replaced; an anchor that does not occur exactly once throws (a moved witness reds its case). */
const replaced = (text: string, path: string, plants: readonly (readonly [string, string])[]): string =>
  plants.reduce((current, [from, to]) => {
    const count = current.split(from).length - 1;
    if (count !== 1) throw new Error(`${path}: a planted witness's anchor occurs ${count} times, never exactly once: ${from}`);
    return current.replace(from, () => to);
  }, text);
/** One table of the receipt's cut-3 entry, read from the rendered section it sits in (header row checked, rows returned). */
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
/** The top-level list items of the receipt's cut-3 entry, each as a reader sees its text (docsSection; HTML refused). */
const entryItems = (markdown = repoText(RECEIPT)): string[] => {
  const section = docsSection(markdown, RECEIPT_ENTRY, 2, [(markdown.split('\n')[0] ?? '').replace(/^# /, '')]);
  if (!section.ok) throw new Error(`${RECEIPT} entry "${RECEIPT_ENTRY}": ${section.why}`);
  if (section.hasHtml) throw new Error(`${RECEIPT} entry "${RECEIPT_ENTRY}" carries HTML, which can hide an item`);
  return section.blocks.flatMap(block => (block.kind === 'list' ? block.items.map(item => item.text) : []));
};
const isHeadingToken = (token: Token): token is Tokens.Heading => token.type === 'heading';
const isListToken = (token: Token): token is Tokens.List => token.type === 'list';
/** The tokens a token holds: a list's items' tokens, else its own tokens (none for a leaf). */
function heldTokens(token: Token): readonly Token[] {
  if (isListToken(token)) return token.items.flatMap(item => item.tokens);
  const held: unknown = 'tokens' in token ? token.tokens : undefined;
  return Array.isArray(held) ? (held as Token[]) : [];
}
const subtree = (token: Token): Token[] => [token, ...heldTokens(token).flatMap(subtree)];
/** The receipt entry's shape as the marked lexer census.ts reads lexes it (the same view): its blocks between its heading and the next
 * level-1 or level-2 heading, each as its type (a heading with its depth), and each item of its lists as its own child block types,
 * suffixed ':br' when a hard line break sits inside it. A flat item reads 'text'; a nested list reads 'text+list', a continuation
 * paragraph 'paragraph+...', and a hard break 'text:br', each a second line a reader sees inside one item. */
function entryForms(markdown = repoText(RECEIPT)): {readonly blocks: readonly string[]; readonly items: readonly string[]} {
  const tokens = marked.lexer(markdown);
  const start = tokens.findIndex(token => isHeadingToken(token) && token.depth === 2 && token.text === RECEIPT_ENTRY);
  const section: Token[] = [];
  for (const token of start < 0 ? [] : tokens.slice(start + 1)) {
    if (isHeadingToken(token) && token.depth <= 2) break;
    if (token.type !== 'space') section.push(token);
  }
  const items = section.filter(isListToken).flatMap(list => list.items.map(item => {
    const own = item.tokens.filter(token => token.type !== 'space').map(token => token.type).join('+');
    return item.tokens.flatMap(subtree).some(token => token.type === 'br') ? `${own}:br` : own;
  }));
  return {blocks: section.map(token => (isHeadingToken(token) ? `heading:${token.depth}` : token.type)), items};
}

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
/** An SDK pinned-view resolution (ReadResult.revision, the member QueryResult lacks). */
interface Resolution {
  readonly requested: string;
  readonly resolvedCommit: string;
}
/** The control resolution the quiet row puts on the live and null views (cut 3's), each half a literal no output carries by accident. */
const RESOLUTION: Resolution = {requested: 'wb-lri-quiet-requested-revision', resolvedCommit: 'c0ffee'.repeat(7).slice(0, 40)};
/** The resolution of the pinned leg's request git:<base>: the request's revision text, and the commit a full commit id names. */
const pinnedResolution = (): Resolution => ({requested: record().repository.baseRevision, resolvedCommit: record().repository.baseRevision});

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
/** The reader result over documentWith(view), carrying a resolution as its revision member or none. */
const resultOn = (view: string | null, revision: Resolution | null): QueryResult<ClaimBody> =>
  ({...resultFromJson(documentWith(view)), ...(revision === null ? {} : {revision})}) as QueryResult<ClaimBody>;
/** The injected registration's output for the record's request over resultOn(view, revision). */
const outputOver = async (view: string | null, revision: Resolution | null): Promise<Json> => {
  const {request: asked} = record();
  const {invoke} = recording(() => resultOn(view, revision));
  return (await invoke({kind: asked.kind, root: asked.root})) as Json;
};
const outputFor = (view: string | null): Promise<Json> => outputOver(view, null);
/** The three view values the committed record holds (THE ENUMERATED RESULTS above): the live leg's view, the pinned leg's requested
 * view and the pinned leg's view. */
const enumeratedViews = (): (string | null)[] => [leg('provider-live').view, leg('provider-pinned').requestedView, leg('provider-pinned').view];
/** The envelope the injected registration must output for a view, built here from the SDK's own serialization of the same result:
 * the contract, that serialization, the workspace root, and the recording reader's runtime version and binary digest. */
const envelope = (view: string | null): Json => ({contract: HYPERUNIX_FIND_CONTRACT, source: JSON.parse(JSON.stringify(resultToJson(resultFromJson(documentWith(view))))) as JsonValue,
  workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}});
/** Every member name of a JSON tree, at any depth. */
const memberNames = (value: JsonValue): string[] =>
  Array.isArray(value) ? value.flatMap(memberNames)
    : value !== null && typeof value === 'object' ? Object.entries(value).flatMap(([key, child]) => [key, ...memberNames(child)]) : [];
/** A topology with its view facets set aside (SB3): every other member as projected, the remaining facets in order. */
const unviewed = (topology: HyperUnixProjectionTopology) => ({...topology, facets: (topology.facets ?? []).filter(facet => facet.kind !== 'view')});

/** ABSOLUTE_PATH's forms (SB6): a slash or tilde-slash opening a string or following white space, a colon or an equals sign; a
 * backslash pair; a lone drive letter (opening the string or following a character that is not a letter or digit) before a
 * backslash. */
const ABSOLUTE_PATH = /(?:^|[\s:=])~?\/|\\\\|(?:^|[^A-Za-z0-9])[A-Za-z]:\\/;
/** One witness of each form of ABSOLUTE_PATH, each read as one absolute path. */
const ABSOLUTE_PATH_FORMS = ['/srv/hx', 'read at /srv/hx', 'file:/srv/hx', 'config=/srv/hx', '~/hx', 'read at ~/hx', '\\\\hx-share\\etc', 'C:\\hx\\etc', 'read at D:\\hx'];
/** The seven host roots cut 3's host-path pin read, each looked for in the record's JSON serialization. */
const HOST_ROOTS = ['/tmp/', '/home/', '/local/', '/workplace/', '/Users/', '/private/', '/var/'];
/** Every string value of a JSON tree, at any depth (an object key is not a value). */
const stringsIn = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(stringsIn) : isObject(value) ? Object.values(value).flatMap(stringsIn) : [];
const absolutePaths = (value: unknown): string[] => stringsIn(value).filter(text => ABSOLUTE_PATH.test(text));
const hostRoots = (value: unknown): string[] => HOST_ROOTS.filter(root => JSON.stringify(value).includes(root));
/** The gate's U5 survivor (N10) and its paired control (N10c): the provider-live leg's diagnostic reason as each planted it. */
const N10_REASON = '/srv/hx/etc/view.toml: no binding';
const N10C_REASON = '/home/hx/etc/view.toml: no binding';
/** The committed record with the provider-live leg's diagnostic reason planted (its only null reason), parsed. */
const recordWithLiveReason = (reason: string): unknown =>
  JSON.parse(replaced(repoText(RECORD_PATH), RECORD_PATH, [['"reason": null,', `"reason": ${JSON.stringify(reason)},`]]));

/** One find call of the provider module: its receiver, its option members in order, its bounds initializer without white space, its
 * wait and its best-effort literal. */
interface FindCall {
  readonly receiver: string;
  readonly members: readonly string[];
  readonly bounds: string | undefined;
  readonly timeoutMs: number | undefined;
  readonly bestEffort: string | undefined;
}
/** One name nativeHyperUnixFind declares itself (a variable, a destructured element, a nested function or class): its name, const or
 * not, its initializer without white space, the call it awaits. */
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
/** A name table: each value name a body reads, in first-use order, with its resolutions (BINDINGS above) joined by ' | '. */
type NameTable = readonly (readonly [string, string])[];
/** The provider module as the TypeScript parser and binder read it; comments are trivia and never count as code. */
interface ProviderRead {
  /** Every `<identifier>.find(...)` call, in source order. */
  readonly finds: readonly FindCall[];
  /** Every `HyperUnix.open(...)` call: its argument texts without white space. */
  readonly opens: readonly (readonly string[])[];
  /** nativeHyperUnixFind's own declarations (a nested function's interior is its own). */
  readonly bindings: readonly Binding[];
  /** nativeHyperUnixFind's parameter names, in order ('<pattern>' for a destructured one). */
  readonly parameters: readonly string[];
  /** nativeHyperUnixFind's own return statements (a nested function's are its own). */
  readonly returns: readonly NativeReturn[];
  /** Each invoke member of registerNativeHyperUnixFind: the callee its arrow body calls directly, else '<other>'. */
  readonly nativeInvokes: readonly string[];
  /** Each statement of registerNativeHyperUnixFind's body: 'registry.register({<members>})' for that one call form, else '<statement>'. */
  readonly registerForm: readonly string[];
  /** The value names nativeHyperUnixFind's body reads, resolved (BINDINGS above). */
  readonly nativeNames: NameTable;
  /** The value names registerNativeHyperUnixFind's body reads, resolved. */
  readonly registerNames: NameTable;
  /** Each call of resultToJson in the module: '<owner> <resolution of its callee>'. */
  readonly serializers: readonly string[];
  /** Each of the two registration names: [name, every top-level declaration of it (moduleDeclarations)]. */
  readonly registrations: NameTable;
  /** Every export declaration or export assignment of the module, without white space. */
  readonly exportForms: readonly string[];
  /** Every write the module's code spells in the read forms (QUIET-RUNTIME-REWRITE). */
  readonly writes: readonly string[];
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
/** The function a node sits in, by the name a reader calls it: a function declaration's or method's own name, a function value's
 * property or variable name, '<function>' for any other function, else 'module'. */
function ownerOf(node: ts.Node): string {
  for (let link = node.parent; !ts.isSourceFile(link); link = link.parent) {
    if ((ts.isFunctionDeclaration(link) || ts.isMethodDeclaration(link)) && link.name !== undefined && ts.isIdentifier(link.name)) return link.name.text;
    if (ts.isFunctionLike(link)) {
      const holder = link.parent;
      return (ts.isPropertyAssignment(holder) || ts.isVariableDeclaration(holder)) && ts.isIdentifier(holder.name) ? holder.name.text : '<function>';
    }
  }
  return 'module';
}
/** One declaration as BINDINGS above writes it. */
function declarationText(declaration: ts.Declaration, file: ts.SourceFile): string {
  if (ts.isImportSpecifier(declaration)) {
    const from = declaration.parent.parent.parent.moduleSpecifier;
    return `import ${ts.isStringLiteral(from) ? from.text : '<module>'} ${(declaration.propertyName ?? declaration.name).text}`;
  }
  if (ts.isImportClause(declaration)) return 'import default';
  if (ts.isNamespaceImport(declaration)) return 'import namespace';
  if (ts.isImportEqualsDeclaration(declaration)) return 'import equals';
  if (ts.isParameter(declaration)) return `parameter ${declaration.parent.parameters.indexOf(declaration)} of ${ownerOf(declaration)}`;
  if (ts.isVariableDeclaration(declaration)) {
    const list = declaration.parent;
    const keyword = !ts.isVariableDeclarationList(list) ? 'catch' : (list.flags & ts.NodeFlags.Const) !== 0 ? 'const' : (list.flags & ts.NodeFlags.Let) !== 0 ? 'let' : 'var';
    return `${keyword} of ${ownerOf(declaration)}${declaration.initializer === undefined ? '' : ` = ${squash(declaration.initializer.getText(file))}`}`;
  }
  if (ts.isFunctionDeclaration(declaration)) return `function of ${ownerOf(declaration)}`;
  return `${ts.SyntaxKind[declaration.kind]} of ${ownerOf(declaration)}`;
}
/** How the binder resolves one name at its use site (the landed bindingOf), as BINDINGS above writes it. */
function resolution(identifier: ts.Identifier, file: ts.SourceFile): string {
  const {kind, declarations} = bindingOf(identifier);
  return kind === 'global' ? 'global' : declarations.map(declaration => declarationText(declaration, file)).join(' + ');
}
/** Whether an identifier is a value a body reads: not a declaration's own name, a member name after a dot, a property key, a label
 * or a name under a type (a shorthand property's name is a read of its value). */
function isValueName(identifier: ts.Identifier): boolean {
  const parent = identifier.parent;
  const named = parent as {readonly name?: ts.Node; readonly propertyName?: ts.Node};
  if (!ts.isShorthandPropertyAssignment(parent) && (named.name === identifier || named.propertyName === identifier)) return false;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return false;
  for (let link: ts.Node = identifier; !ts.isSourceFile(link); link = link.parent) if (ts.isTypeNode(link)) return false;
  return true;
}
/** The name table of a body (NameTable above). */
function nameTable(body: ts.Node | undefined, file: ts.SourceFile): NameTable {
  const table = new Map<string, Set<string>>();
  for (const node of body === undefined ? [] : descendants(body)) {
    if (!ts.isIdentifier(node) || !isValueName(node)) continue;
    const seen = table.get(node.text) ?? new Set<string>();
    seen.add(resolution(node, file));
    table.set(node.text, seen);
  }
  return [...table].map(([name, seen]) => [name, [...seen].join(' | ')] as const);
}
const isExported = (statement: ts.Statement): boolean =>
  ts.canHaveModifiers(statement) && (ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
/** The local names a binding name declares: an identifier, or every identifier a destructuring pattern binds. */
const boundNames = (name: ts.BindingName): string[] =>
  ts.isIdentifier(name) ? [name.text] : name.elements.flatMap(element => (ts.isBindingElement(element) ? boundNames(element.name) : []));
/** Every top-level declaration of a name in a module, in source order, each as 'export ' when it carries the export modifier and then
 * its kind (function, class, enum, namespace, variable or import), joined by ' + '; '<undeclared>' when none. The binder keeps an
 * exported and an unexported declaration of one name as two symbols (TS2395), so this reading counts declarations syntactically (a
 * second top-level declaration of a name is also an early SyntaxError of an ES module, which reds this file's import of it). */
function moduleDeclarations(file: ts.SourceFile, name: string): string {
  const found = file.statements.flatMap((statement): string[] => {
    const exported = isExported(statement) ? 'export ' : '';
    const word = ts.isFunctionDeclaration(statement) ? 'function' : ts.isClassDeclaration(statement) ? 'class' : ts.isEnumDeclaration(statement) ? 'enum' : ts.isModuleDeclaration(statement) ? 'namespace' : undefined;
    if (word !== undefined) {
      const own = (statement as ts.FunctionDeclaration | ts.ClassDeclaration | ts.EnumDeclaration | ts.ModuleDeclaration).name;
      return own !== undefined && ts.isIdentifier(own) && own.text === name ? [`${exported}${word}`] : [];
    }
    if (ts.isVariableStatement(statement)) {
      return statement.declarationList.declarations.flatMap(declaration => boundNames(declaration.name)).filter(bound => bound === name).map(() => `${exported}variable`);
    }
    if (ts.isImportDeclaration(statement)) {
      const clause = statement.importClause;
      const bindings = clause?.namedBindings;
      const local = [clause?.name?.text, ...(bindings === undefined ? [] : ts.isNamespaceImport(bindings) ? [bindings.name.text] : bindings.elements.map(element => element.name.text))];
      return local.filter(bound => bound === name).map(() => 'import');
    }
    return [];
  });
  return found.length === 0 ? '<undeclared>' : found.join(' + ');
}
const isAssignment = (node: ts.Node): node is ts.BinaryExpression =>
  ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
/** Every write a module spells in the read forms (R-RUNTIME-REWRITE above), in source order. */
function writesIn(file: ts.SourceFile): string[] {
  return descendants(file).flatMap((node): string[] => {
    if (isAssignment(node)) return [`${squash(node.left.getText(file))} ${node.operatorToken.getText(file)}`];
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
      return [`${ts.tokenToString(node.operator) ?? '<update>'} ${squash(node.operand.getText(file))}`];
    }
    if (ts.isDeleteExpression(node)) return [`delete ${squash(node.expression.getText(file))}`];
    if ((ts.isForInStatement(node) || ts.isForOfStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) return [`for target ${squash(node.initializer.getText(file))}`];
    if (ts.isCallExpression(node)) return calleeChains(node.expression).filter(chain => MUTATORS.has(chain)).map(chain => `call ${chain}`);
    return [];
  });
}
/** Reads the provider module's text with the TypeScript parser and binder (see ProviderRead). */
function readProvider(source: string): ProviderRead {
  const file = ts.createSourceFile(PROVIDER, source, ts.ScriptTarget.Latest, true);
  const finds: FindCall[] = [];
  const opens: string[][] = [];
  const tokens: string[] = [];
  const serializers: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      tokens.push(node.text);
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression)) {
      const receiver = node.expression.expression.text;
      if (node.expression.name.text === 'find') finds.push(findCall(receiver, node, file));
      if (receiver === 'HyperUnix' && node.expression.name.text === 'open') opens.push(node.arguments.map(argument => squash(argument.getText(file))));
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'resultToJson') serializers.push(`${ownerOf(node)} ${resolution(node.expression, file)}`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  const declared = (name: string): ts.FunctionDeclaration[] =>
    file.statements.filter((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === name);
  const [native] = declared('nativeHyperUnixFind');
  const [register] = declared('registerNativeHyperUnixFind');
  const bindings: Binding[] = [];
  const returns: NativeReturn[] = [];
  const own = (node: ts.Node): void => {
    if (node !== native && (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node))) {
      if (node.name !== undefined) bindings.push({name: node.name.text, kind: 'other', initializer: ts.isClassDeclaration(node) ? '<class>' : '<function>', awaited: null});
      return;
    }
    if (node !== native && ts.isFunctionLike(node)) return;
    if (ts.isVariableDeclaration(node)) {
      if (ts.isIdentifier(node.name)) bindings.push(binding(node, node.name.text, file));
      else for (const element of descendants(node.name)) if (ts.isBindingElement(element) && ts.isIdentifier(element.name)) bindings.push({name: element.name.text, kind: 'other', initializer: '<pattern>', awaited: null});
    }
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
  if (register !== undefined) invokes(register);
  const registerForm = (register?.body?.statements ?? []).map(statement => {
    if (!ts.isExpressionStatement(statement) || !ts.isCallExpression(statement.expression)) return '<statement>';
    const {expression: callee, arguments: [argument, ...more]} = statement.expression;
    return squash(callee.getText(file)) === 'registry.register' && argument !== undefined && more.length === 0 && ts.isObjectLiteralExpression(argument)
      ? `registry.register({${objectMembers(argument).join(',')}})` : '<statement>';
  });
  const registrations = ['nativeHyperUnixFind', 'registerNativeHyperUnixFind'].map((name): readonly [string, string] => [name, moduleDeclarations(file, name)]);
  return {
    finds, opens, bindings, returns, nativeInvokes, registerForm, serializers, registrations, tokens,
    parameters: (native?.parameters ?? []).map(parameter => (ts.isIdentifier(parameter.name) ? parameter.name.text : '<pattern>')),
    nativeNames: nameTable(native?.body, file),
    registerNames: nameTable(register?.body, file),
    exportForms: file.statements.filter(statement => ts.isExportDeclaration(statement) || ts.isExportAssignment(statement)).map(statement => squash(statement.getText(file))),
    writes: writesIn(file),
  };
}
const providerRead = (): ProviderRead => readProvider(repoText(PROVIDER));
/** The provider read with each anchor replaced; an anchor that does not occur exactly once throws (a moved witness reds its case). */
const planted = (plants: readonly (readonly [string, string])[]): ProviderRead => readProvider(replaced(repoText(PROVIDER), PROVIDER, plants));
/** One name's resolution in a name table, else undefined. */
const resolvedAt = (table: NameTable, name: string): string | undefined => table.find(([key]) => key === name)?.[1];

const SDK_IMPORT = 'import { Bounds, type ClaimBody, HyperUnix, type QueryResult, resultToJson } from "@hyperunix/sdk";';
const SDK_IMPORT_WITH_GITVIEW = 'import { Bounds, type ClaimBody, GitView, HyperUnix, type QueryResult, resultToJson } from "@hyperunix/sdk";';
const CONTRACT_LINE = 'export const HYPERUNIX_FIND_CONTRACT = "hyperunix.find/v1";';
const NATIVE_OPEN = 'const workspace=HyperUnix.open(realpathSync(workspaceRoot));';
const NATIVE_FIND = 'const result=await workspace.find({kind,root,bestEffort:true,bounds:Bounds.create({wall:"30s"}),timeoutMs:60_000});';
const REGISTER_HEAD = 'export function registerNativeHyperUnixFind(registry:CapabilityRegistry,workspaceRoot:string):void {';
const nativeFindWith = (tail: string): string => NATIVE_FIND.replace('timeoutMs:60_000})', () => `timeoutMs:60_000,${tail}})`);
/** The gate's three cut-1 survivors (refusal #1, g10-gate-s289 archive mutants 01-03), verbatim: G1 a client default view, G2 an
 * identifier spread of a view into the native find, G3 the native output relaying the SDK's revision member. */
const G1 = [[SDK_IMPORT, SDK_IMPORT_WITH_GITVIEW], [NATIVE_OPEN, 'const workspace=HyperUnix.open(realpathSync(workspaceRoot),{view:new GitView("HEAD")});']] as const;
const G2 = [[SDK_IMPORT, SDK_IMPORT_WITH_GITVIEW], [NATIVE_FIND, `const pin={view:new GitView("HEAD")};${nativeFindWith('...pin')}`]] as const;
const G3 = [['source:resultToJson(result),', 'source:resultToJson(result),revision:(result as unknown as {revision?:JsonValue}).revision??null,']] as const;
/** The gate's three provider survivors of cut 2 (refusal #2, g10-gate-s289 archive mutants 01-03), verbatim: L01 a parameter named
 * nativeHyperUnixFind defaulting to a relay (U1), L02 a function-local resultToJson relaying the resolution as basis (U2), L04 a
 * function-local Bounds adding an externalProcesses budget (U3). */
const L01 = [
  [CONTRACT_LINE, `${CONTRACT_LINE}\nconst relayNative=async(...args:Parameters<typeof nativeHyperUnixFind>):Promise<JsonValue>=>({...(await nativeHyperUnixFind(...args) as {[key:string]:JsonValue}),["rev"+"ision"]:null});`],
  [REGISTER_HEAD, 'export function registerNativeHyperUnixFind(registry:CapabilityRegistry,workspaceRoot:string,nativeHyperUnixFind:typeof relayNative=relayNative):void {'],
] as const;
const L02 = [
  [CONTRACT_LINE, `${CONTRACT_LINE}\nconst sdkResultToJson=resultToJson;`],
  [NATIVE_OPEN, `const resultToJson=(read:QueryResult<ClaimBody>):JsonValue=>({...sdkResultToJson(read),basis:(read as unknown as {[key:string]:JsonValue})["rev"+"ision"]??null});${NATIVE_OPEN}`],
] as const;
const L04 = [
  [CONTRACT_LINE, `${CONTRACT_LINE}\nconst SdkBounds=Bounds;`],
  [NATIVE_OPEN, `const Bounds={create:(spec:{wall:string})=>SdkBounds.create({...spec,externalProcesses:1})};${NATIVE_OPEN}`],
] as const;
/** A raw hx find naming its view as string literals, planted before the native find: the token pins' string-literal witness. */
const RAW_FIND = [[NATIVE_FIND, `await workspace.raw(["find","--view","git:HEAD"]);${NATIVE_FIND}`]] as const;
/** Binding witnesses beside L01, L02 and L04: a local shadow of a global, an import or a const, a second declaration, an aliased
 * import, an export re-route and a spread after the invoke. */
const JSON_SHADOW = [[NATIVE_OPEN, `const JSON={parse:(text:string)=>text,stringify:(value:unknown)=>String(value)};${NATIVE_OPEN}`]] as const;
const REALPATH_SHADOW = [[NATIVE_OPEN, `const realpathSync=(path:string)=>path;${NATIVE_OPEN}`]] as const;
const CLIENT_SHADOW = [['const runtime=await client.runtime();', 'const client=relayClient;const runtime=await client.runtime();']] as const;
const SECOND_NATIVE = [[REGISTER_HEAD, `async function nativeHyperUnixFind(workspaceRoot:string,kind:string):Promise<JsonValue>{return relay(workspaceRoot,kind)}\n${REGISTER_HEAD}`]] as const;
const ALIASED_IMPORT = [[SDK_IMPORT, 'import { Bounds, type ClaimBody, HyperUnix, type QueryResult, resultFromJson as resultToJson } from "@hyperunix/sdk";']] as const;
const EXPORT_REROUTE = [[REGISTER_HEAD, REGISTER_HEAD.replace('export function', 'function')], ['ctx.signal)});\n}', 'ctx.signal)});\n}\nexport {relayRegister as registerNativeHyperUnixFind};']] as const;
const INVOKE_SPREAD = [['ctx.signal)});', 'ctx.signal),...overrides});']] as const;
/** Write witnesses (QUIET-RUNTIME-REWRITE), each planted at the module's top level before registerNativeHyperUnixFind. */
const writePlant = (statement: string) => [[REGISTER_HEAD, `${statement}\n${REGISTER_HEAD}`]] as const;
const REASSIGNED = writePlant('nativeHyperUnixFind=relayNative;');
const BOUNDS_WRITE = writePlant('Bounds.create=(spec:{wall:string})=>spec;');
const DEFINED = writePlant('Object.defineProperty(JSON,"stringify",{value:relay});');
const DEFINED_BY_ALIAS = writePlant('const define=Object.defineProperty;define(Bounds,"create",{value:relay});');
/** The code tokens each token pin reads, one helper per pin shared with its planted witnesses, so hollowing a helper reds a witness. */
const findNames = (read: ProviderRead): string[] => read.tokens.filter(token => token === 'find');
const hyperUnixNames = (read: ProviderRead): string[] => read.tokens.filter(token => token === 'HyperUnix');
const viewNames = (read: ProviderRead): string[] => read.tokens.filter(token => /view/i.test(token));
const revisionNames = (read: ProviderRead): string[] => read.tokens.filter(token => /revision|resolvedcommit/i.test(token));

/** The resolution of every value name nativeHyperUnixFind's body reads (SB7; BINDINGS above), in first-use order. */
const NATIVE_NAMES: NameTable = [
  ['isAbsolute', 'import node:path isAbsolute'],
  ['workspaceRoot', 'parameter 0 of nativeHyperUnixFind'],
  ['CapabilityError', 'import ../capability-registry.js CapabilityError'],
  ['signal', 'parameter 3 of nativeHyperUnixFind'],
  ['HyperUnix', 'import @hyperunix/sdk HyperUnix'],
  ['realpathSync', 'import node:fs realpathSync'],
  ['workspace', 'const of nativeHyperUnixFind = HyperUnix.open(realpathSync(workspaceRoot))'],
  ['client', 'const of nativeHyperUnixFind = workspace.client'],
  ['onAbort', 'const of nativeHyperUnixFind = ()=>client.dispose()'],
  ['kind', 'parameter 1 of nativeHyperUnixFind'],
  ['root', 'parameter 2 of nativeHyperUnixFind'],
  ['Bounds', 'import @hyperunix/sdk Bounds'],
  ['JSON', 'global'],
  ['HYPERUNIX_FIND_CONTRACT', 'const of module = "hyperunix.find/v1"'],
  ['resultToJson', 'import @hyperunix/sdk resultToJson'],
  ['result', 'const of nativeHyperUnixFind = awaitworkspace.find({kind,root,bestEffort:true,bounds:Bounds.create({wall:"30s"}),timeoutMs:60_000})'],
  ['runtime', 'const of nativeHyperUnixFind = awaitclient.runtime()'],
];
/** The resolution of every value name registerNativeHyperUnixFind's body reads (SB7). */
const REGISTER_NAMES: NameTable = [
  ['registry', 'parameter 0 of registerNativeHyperUnixFind'],
  ['INPUT', 'const of module = {type:"object",properties:{kind:{type:"string",minLength:1},root:{type:"string"}},required:["kind"],additionalProperties:false}'],
  ['nativeHyperUnixFind', 'function of module'],
  ['workspaceRoot', 'parameter 1 of registerNativeHyperUnixFind'],
  ['input', 'parameter 0 of invoke'],
  ['ctx', 'parameter 1 of invoke'],
];
/** The receipt witnesses (ANCHOR-RECEIPT), each planted before the entry's census item or before its first table section. */
const CENSUS_ITEM = '\n- Census: ';
const FIRST_TABLE = `\n\n### ${RECEIPT_TABLES.claims.heading}`;
const L10 = [[CENSUS_ITEM, `\n  - Census: a hollow census that pins nothing${CENSUS_ITEM}`]] as const;
const CONTINUATION = [[CENSUS_ITEM, `\n\n  Census: a hollow census that pins nothing${CENSUS_ITEM}`]] as const;
const HARD_BREAK = [[CENSUS_ITEM, `  \n  Census: a hollow census that pins nothing${CENSUS_ITEM}`]] as const;
const CENSUS_PARAGRAPH = [[FIRST_TABLE, `\n\nCensus: a hollow census that pins nothing${FIRST_TABLE}`]] as const;

type RowId = 'REQUEST' | 'ENVELOPE' | 'BINDING' | 'PROJECTION' | 'MEASURED';
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
    id: 'SB1c', row: 'REQUEST', kind: 'claim', assertions: 18,
    title: "read with the TypeScript parser and binder, the provider's find calls on an identifier receiver are exactly two (on receivers named reader, read by its name only, and then workspace, nativeHyperUnixFind's own), the name find occurs in its code three times only, and each call passes exactly the five request members, a bounds member spelled exactly Bounds.create of the record's wall, the record's wait and best effort true, the native call's Bounds resolving to the @hyperunix/sdk import, its workspace to the function's one const and its kind and root to the function's parameters 1 and 2; an identifier, call or member-access spread planted into the native call reads as '<spread>' (G2 the first), a planted raw find makes find four, and L04's function-local Bounds planted resolves as a const of nativeHyperUnixFind",
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
      expect(resolvedAt(read.nativeNames, 'Bounds'), "the native call's Bounds").toBe('import @hyperunix/sdk Bounds');
      expect(resolvedAt(read.nativeNames, 'workspace'), "the native call's receiver").toBe('const of nativeHyperUnixFind = HyperUnix.open(realpathSync(workspaceRoot))');
      expect(['kind', 'root'].map(name => resolvedAt(read.nativeNames, name)), "the native call's kind and root").toEqual(['parameter 1 of nativeHyperUnixFind', 'parameter 2 of nativeHyperUnixFind']);
      expect(planted(G2).finds[1]?.members, 'G2: an identifier spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(planted([[NATIVE_FIND, nativeFindWith('...pinned()')]]).finds[1]?.members, 'a call spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(planted([[NATIVE_FIND, nativeFindWith('...settings.pin')]]).finds[1]?.members, 'a member-access spread').toEqual([...REQUEST_MEMBERS, '<spread>']);
      expect(findNames(planted(RAW_FIND)), 'a raw find names find as a string literal').toHaveLength(4);
      expect(resolvedAt(planted(L04).nativeNames, 'Bounds'), 'L04: a function-local Bounds').toMatch(/^const of nativeHyperUnixFind = \{create:/);
    },
  },
  {
    id: 'SB1d', row: 'REQUEST', kind: 'claim', assertions: 12,
    title: "read with the TypeScript parser and binder, nativeHyperUnixFind's find runs on workspace, bound once as const to the module's only HyperUnix.open call, whose argument list is exactly realpathSync(workspaceRoot) (no client options, so no client default view), with HyperUnix resolving to the @hyperunix/sdk import, realpathSync to the node:fs import and workspaceRoot to the function's parameter 0; HyperUnix occurs only as its import and that call, and no identifier, private name or string or template literal text of the code contains view in any case; G1's client default view planted reads its options argument and three view names, a planted raw find's string literal names one, a planted constructed workspace reads as its binding, and a planted local realpathSync resolves as a const",
    run: () => {
      const read = providerRead();
      expect(read.opens).toEqual([['realpathSync(workspaceRoot)']]);
      expect(read.bindings.filter(item => item.name === 'workspace')).toEqual([{name: 'workspace', kind: 'const', initializer: 'HyperUnix.open(realpathSync(workspaceRoot))', awaited: null}]);
      expect(resolvedAt(read.nativeNames, 'HyperUnix')).toBe('import @hyperunix/sdk HyperUnix');
      expect(resolvedAt(read.nativeNames, 'realpathSync')).toBe('import node:fs realpathSync');
      expect(resolvedAt(read.nativeNames, 'workspaceRoot')).toBe('parameter 0 of nativeHyperUnixFind');
      expect(hyperUnixNames(read), 'the import specifier and the open call').toHaveLength(2);
      expect(viewNames(read)).toEqual([]);
      const g1 = planted(G1);
      expect(g1.opens, 'G1: a client default view').toEqual([['realpathSync(workspaceRoot)', '{view:newGitView("HEAD")}']]);
      expect(viewNames(g1), 'G1: the import, the option and the constructor').toEqual(['GitView', 'view', 'GitView']);
      expect(viewNames(planted(RAW_FIND)), 'a raw find: the string literal --view').toEqual(['--view']);
      const constructed = planted([[NATIVE_OPEN, 'const workspace=new HyperUnix({}).workspace(realpathSync(workspaceRoot));']]);
      expect([constructed.bindings.filter(item => item.name === 'workspace'), hyperUnixNames(constructed)], 'a constructed workspace: its binding, and HyperUnix named by the import and the construction')
        .toEqual([[{name: 'workspace', kind: 'const', initializer: 'newHyperUnix({}).workspace(realpathSync(workspaceRoot))', awaited: null}], ['HyperUnix', 'HyperUnix']]);
      expect(resolvedAt(planted(REALPATH_SHADOW).nativeNames, 'realpathSync'), 'a function-local realpathSync').toBe('const of nativeHyperUnixFind = (path:string)=>path');
    },
  },
  {
    id: 'SB2a', row: 'ENVELOPE', kind: 'claim', assertions: 13,
    title: "over a result on each of the record's two string views, the live leg's measured hx.view/workspace-head and the pinned leg's requested git:<base> (both read from the record and pinned to those spellings), the injected registration's output has exactly contract, source, workspaceRoot and runtime and equals the envelope of the contract, the SDK's own serialization of that result, the workspace root and the runtime's version and binary digest, source is exactly the record's measured serialized keys with that view verbatim, and no member name matches revision, basis or resolved in any case",
    run: async () => {
      const live = leg('provider-live');
      const views = [live.view, leg('provider-pinned').requestedView];
      expect(views, "the record's two string views").toEqual(['hx.view/workspace-head', `git:${record().repository.baseRevision}`]);
      for (const view of views) {
        const output = await outputFor(view);
        expect(Object.keys(output), String(view)).toEqual(OUTPUT_MEMBERS);
        expect(output, `${view}: the envelope, member for member`).toStrictEqual(envelope(view));
        expect(output.contract, String(view)).toBe(HYPERUNIX_FIND_CONTRACT);
        const source = output.source as Json;
        expect(Object.keys(source), String(view)).toEqual(live.resultJsonKeys);
        expect(source.view, `${view}: relayed verbatim`).toBe(view);
        expect(memberNames(output).filter(name => /revision|basis|resolved/i.test(name)), String(view)).toEqual([]);
      }
    },
  },
  {
    id: 'SB2b', row: 'ENVELOPE', kind: 'claim', assertions: 5,
    title: "over a result on the pinned leg's null view (read from the record) the injected registration's output keeps the same four members, equals the same envelope of that result, relays the view as null, never a requested or default spelling, and no member name matches revision, basis or resolved in any case",
    run: async () => {
      const view = leg('provider-pinned').view;
      expect(view, "the pinned leg's view").toBeNull();
      const output = await outputFor(view);
      expect(Object.keys(output)).toEqual(OUTPUT_MEMBERS);
      expect(output, 'the envelope, member for member').toStrictEqual(envelope(view));
      expect((output.source as Json).view).toBeNull();
      expect(memberNames(output).filter(name => /revision|basis|resolved/i.test(name))).toEqual([]);
    },
  },
  {
    id: 'SB2c', row: 'ENVELOPE', kind: 'claim', assertions: 21,
    title: "read with the TypeScript parser and binder, nativeHyperUnixFind's only return is JSON.parse(JSON.stringify(...)) of exactly contract, source, workspaceRoot and runtime, valued HYPERUNIX_FIND_CONTRACT, resultToJson of its own const result of the awaited workspace.find, realpathSync(workspaceRoot) and the runtime's version and binary digest, with JSON global, HYPERUNIX_FIND_CONTRACT the module's const, resultToJson the @hyperunix/sdk import and result and runtime the function's one consts; registerNativeHyperUnixFind's body is the one call registry.register({descriptor, invoke}) and its invoke a direct call of nativeHyperUnixFind resolving to the module's function declaration; G3's relay planted reads a revision member, a planted spread '<spread>', a planted early return a second return, a let result a non-const binding, a wrapped invoke its wrapper, L01's parameter planted resolves the invoke's callee as that parameter, L02's local serializer planted resolves as a const, a planted JSON shadow as a const and a planted spread after invoke as '<spread>'",
    run: () => {
      const read = providerRead();
      expect(read.returns.map(item => item.shape)).toEqual(['json-round-trip']);
      expect(read.returns[0]?.members).toEqual(OUTPUT_MEMBERS);
      expect(read.returns[0]?.values).toEqual([['contract', 'HYPERUNIX_FIND_CONTRACT'], ['source', 'resultToJson(result)'], ['workspaceRoot', 'realpathSync(workspaceRoot)'],
        ['runtime', '{version:runtime.version,binarySha256:runtime.binarySha256}']]);
      expect(read.bindings.filter(item => item.name === 'result').map(item => [item.kind, item.awaited])).toEqual([['const', 'workspace.find']]);
      expect(resolvedAt(read.nativeNames, 'JSON')).toBe('global');
      expect(resolvedAt(read.nativeNames, 'HYPERUNIX_FIND_CONTRACT')).toBe('const of module = "hyperunix.find/v1"');
      expect(resolvedAt(read.nativeNames, 'resultToJson')).toBe('import @hyperunix/sdk resultToJson');
      expect(resolvedAt(read.nativeNames, 'result')).toBe(`const of nativeHyperUnixFind = await${squash(NATIVE_FIND.slice('const result=await'.length, -1))}`);
      expect(resolvedAt(read.nativeNames, 'runtime')).toBe('const of nativeHyperUnixFind = awaitclient.runtime()');
      expect(read.registerForm).toEqual(['registry.register({descriptor,invoke})']);
      expect(read.nativeInvokes).toEqual(['nativeHyperUnixFind']);
      expect(resolvedAt(read.registerNames, 'nativeHyperUnixFind'), "the invoke's callee").toBe('function of module');
      expect(planted(G3).returns[0]?.members, 'G3: the SDK revision member relayed').toEqual(['contract', 'source', 'revision', 'workspaceRoot', 'runtime']);
      expect(planted([['workspaceRoot:realpathSync(workspaceRoot),', 'workspaceRoot:realpathSync(workspaceRoot),...relay,']]).returns[0]?.members, 'an identifier spread')
        .toEqual(['contract', 'source', 'workspaceRoot', '<spread>', 'runtime']);
      expect(planted([[NATIVE_OPEN, `if(kind==="")return relay;${NATIVE_OPEN}`]]).returns.map(item => item.shape), 'an early return').toEqual(['other', 'json-round-trip']);
      expect(planted([['const result=await workspace.find(', 'let result=await workspace.find(']]).bindings.filter(item => item.name === 'result').map(item => [item.kind, item.awaited]), 'a let result')
        .toEqual([['other', 'workspace.find']]);
      expect(planted([['=>nativeHyperUnixFind(', '=>relay(nativeHyperUnixFind('], ['ctx.signal)});', 'ctx.signal))});']]).nativeInvokes, 'a wrapped invoke').toEqual(['relay']);
      expect(resolvedAt(planted(L01).registerNames, 'nativeHyperUnixFind'), "L01: a parameter named nativeHyperUnixFind").toBe('parameter 2 of registerNativeHyperUnixFind');
      expect(resolvedAt(planted(L02).nativeNames, 'resultToJson'), 'L02: a function-local resultToJson').toMatch(/^const of nativeHyperUnixFind = \(read:QueryResult<ClaimBody>\):JsonValue=>/);
      expect(resolvedAt(planted(JSON_SHADOW).nativeNames, 'JSON'), 'a function-local JSON').toMatch(/^const of nativeHyperUnixFind = \{parse:/);
      expect(planted(INVOKE_SPREAD).registerForm, 'a spread after invoke').toEqual(['registry.register({descriptor,invoke,<spread>})']);
    },
  },
  {
    id: 'QUIET-DROPPED-RESOLUTION', row: 'ENVELOPE', kind: 'quiet', assertions: 25,
    title: "for each of the three enumerated views, the injected output over a reader result carrying its enumerated SDK pinned-view resolution (on the pinned view that request's own, requested and resolved to the record's base revision; on the live and null views the control resolution, each pair pinned and each reader result shown to carry its resolution) equals, member for member, the envelope of the SDK's own serialization of the result without it and the output over that result, its runtime is exactly version and binary digest, no member of it is named revision, and its projection equals the projection without it; on the live and null views neither half of the control resolution appears in the output's text; no identifier, private name or string or template literal text of the provider's code contains revision or resolvedcommit in any case, and both resultToJson calls resolve to the @hyperunix/sdk import; G3's relay planted names three revisions and L02's local serializer planted resolves the native call as a const",
    run: async () => {
      const [live = null, pinnedView = null, nullView = null] = enumeratedViews();
      const base = record().repository.baseRevision;
      const carried: readonly (readonly [string | null, Resolution])[] = [[pinnedView, pinnedResolution()], [live, RESOLUTION], [nullView, RESOLUTION]];
      expect(carried, 'the three views and their resolutions').toStrictEqual([[`git:${base}`, {requested: base, resolvedCommit: base}], ['hx.view/workspace-head', RESOLUTION], [null, RESOLUTION]]);
      expect(carried.map(([view, resolution]) => (resultOn(view, resolution) as unknown as {revision?: unknown}).revision), 'each reader result carries its resolution')
        .toStrictEqual(carried.map(([, resolution]) => resolution));
      for (const [view, resolution] of carried) {
        const output = await outputOver(view, resolution);
        const bare = await outputOver(view, null);
        expect(output, `${view}: the envelope of the result without the resolution`).toStrictEqual(envelope(view));
        expect(output, `${view}: the output over the result without the resolution`).toStrictEqual(bare);
        expect(Object.keys(output.runtime as Json), String(view)).toEqual(RUNTIME_MEMBERS);
        expect(memberNames(output), String(view)).not.toContain('revision');
        expect(hyperunixTopology(output, context), `${view}: the projection without the resolution`).toStrictEqual(hyperunixTopology(bare, context));
      }
      for (const view of [live, nullView]) {
        const text = JSON.stringify(await outputOver(view, RESOLUTION));
        expect(text, `${view}: the control resolved commit`).not.toContain(RESOLUTION.resolvedCommit);
        expect(text, `${view}: the control requested revision`).not.toContain(RESOLUTION.requested);
      }
      const read = providerRead();
      expect(revisionNames(read)).toEqual([]);
      expect(read.serializers).toEqual(['invoke import @hyperunix/sdk resultToJson', 'nativeHyperUnixFind import @hyperunix/sdk resultToJson']);
      expect(revisionNames(planted(G3)), 'G3: the member, its type and its read').toEqual(['revision', 'revision', 'revision']);
      expect(planted(L02).serializers, 'L02: the native call resolves to the local relay')
        .toEqual(['invoke import @hyperunix/sdk resultToJson', expect.stringMatching(/^nativeHyperUnixFind const of nativeHyperUnixFind = \(read:QueryResult<ClaimBody>\)/)]);
    },
  },
  {
    id: 'SB7', row: 'BINDING', kind: 'claim', assertions: 10,
    title: "read with the TypeScript binder, every name the bodies of nativeHyperUnixFind and registerNativeHyperUnixFind read resolves exactly as this census's two name tables pin, nativeHyperUnixFind declares exactly workspace, client, onAbort, runtime and result (each const, once) and takes exactly workspaceRoot, kind, root and signal, and the two registration names are each declared once, by an exported function declaration, in a module with no export declaration or export assignment; a planted second nativeHyperUnixFind, an aliased resultToJson import, an export re-route and a block-level client shadow each read as planted",
    run: () => {
      const read = providerRead();
      expect(read.nativeNames).toEqual(NATIVE_NAMES);
      expect(read.registerNames).toEqual(REGISTER_NAMES);
      expect(read.bindings.map(item => `${item.kind} ${item.name}`)).toEqual(['const workspace', 'const client', 'const onAbort', 'const runtime', 'const result']);
      expect(read.parameters).toEqual(['workspaceRoot', 'kind', 'root', 'signal']);
      expect(read.registrations).toEqual([['nativeHyperUnixFind', 'export function'], ['registerNativeHyperUnixFind', 'export function']]);
      expect(read.exportForms).toEqual([]);
      expect(planted(SECOND_NATIVE).registrations[0], 'a second, unexported nativeHyperUnixFind').toEqual(['nativeHyperUnixFind', 'export function + function']);
      expect(resolvedAt(planted(ALIASED_IMPORT).nativeNames, 'resultToJson'), 'an aliased import').toBe('import @hyperunix/sdk resultFromJson');
      const rerouted = planted(EXPORT_REROUTE);
      expect([rerouted.registrations[1], rerouted.exportForms], 'an export re-route').toEqual([['registerNativeHyperUnixFind', 'function'], ['export{relayRegisterasregisterNativeHyperUnixFind};']]);
      expect(planted(CLIENT_SHADOW).bindings.map(item => item.name), 'a block-level client shadow').toEqual(['workspace', 'client', 'onAbort', 'client', 'runtime', 'result']);
    },
  },
  {
    id: 'QUIET-RUNTIME-REWRITE', row: 'BINDING', kind: 'quiet', assertions: 5,
    title: "the provider module's code, read with the TypeScript parser, spells no write in the read forms (no assignment of any operator, update, delete or for-in/for-of target, and no call whose callee chains, const aliases followed, name a landed MUTATORS member); a planted reassignment of nativeHyperUnixFind, a planted Bounds.create write, a planted Object.defineProperty of JSON.stringify and the same call through a const alias each read as one write",
    run: () => {
      expect(providerRead().writes).toEqual([]);
      expect(planted(REASSIGNED).writes, 'a reassigned nativeHyperUnixFind').toEqual(['nativeHyperUnixFind =']);
      expect(planted(BOUNDS_WRITE).writes, 'a Bounds.create write').toEqual(['Bounds.create =']);
      expect(planted(DEFINED).writes, 'an Object.defineProperty call').toEqual(['call Object.defineProperty']);
      expect(planted(DEFINED_BY_ALIAS).writes, 'the call through a const alias').toEqual(['call Object.defineProperty']);
    },
  },
  {
    id: 'SB3', row: 'PROJECTION', kind: 'claim', assertions: 22,
    title: 'hyperunixTopology over the injected outputs for the three enumerated views projects for each exactly one snapshot, with no subjectBasis, sourceRevision or definitionDigest member and the source reference provider hyperunix, type query, a 64-hex id and the workspace as scope; the three topologies, their view facets set aside (one per string view, none for the null view), are equal; and each string view is exactly one view facet holding it verbatim, the null view none',
    run: async () => {
      const views = enumeratedViews();
      expect(views, 'the three enumerated views').toEqual(['hx.view/workspace-head', `git:${record().repository.baseRevision}`, null]);
      const topologies: HyperUnixProjectionTopology[] = [];
      for (const view of views) topologies.push(hyperunixTopology(await outputFor(view), context));
      for (const [index, topology] of topologies.entries()) {
        const view = views[index] ?? null;
        expect(topology.snapshots, `${view}: its snapshots`).toHaveLength(1);
        for (const key of ['subjectBasis', 'sourceRevision', 'definitionDigest']) expect(topology.snapshots[0], `${view}: ${key}`).not.toHaveProperty(key);
        expect(topology.snapshots[0]?.source, `${view}: its source reference`).toStrictEqual({provider: 'hyperunix', type: 'query', id: expect.stringMatching(/^[0-9a-f]{64}$/), scope: WS});
        expect((topology.facets ?? []).filter(facet => facet.kind === 'view'), `${view}: its view facets`).toStrictEqual(view === null ? [] : [{kind: 'view', view}]);
      }
      expect(topologies.map(topology => (topology.facets ?? []).length - unviewed(topology).facets.length), 'the view facets set aside, one per string view').toEqual([1, 1, 0]);
      const [viewed, pinned, bare] = topologies.map(unviewed);
      expect(viewed, 'the live view, its view facets set aside, against the null view').toStrictEqual(bare);
      expect(pinned, 'the pinned view, its view facets set aside, against the null view').toStrictEqual(bare);
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
    id: 'SB6', row: 'MEASURED', kind: 'claim', assertions: 15,
    title: "the record is the probe's: its schema and bead, the probe's script path and SHA-256, both legs in order, a 64-hex producer binary, the vendored SDK's name and version, a 40-hex base revision, a UTC instant and a trailing newline; no string value of it holds an absolute path in ABSOLUTE_PATH's forms (a slash or tilde-slash opening the value or following white space, a colon or an equals sign; a backslash pair; a lone drive letter before a backslash) and its JSON serialization holds none of the seven HOST_ROOTS; each witness form reads as one absolute path and each root as one root, and N10's /srv/ reason and N10c's /home/ reason, each planted into the record text, read as that one absolute path (N10c also as the /home/ root)",
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
      expect(repoText(RECORD_PATH).endsWith('\n')).toBe(true);
      expect(absolutePaths(probed), 'string values holding an absolute path').toEqual([]);
      expect(hostRoots(probed), 'host roots in the JSON serialization').toEqual([]);
      expect(ABSOLUTE_PATH_FORMS.filter(form => absolutePaths(form).length !== 1), 'each witness form reads as one absolute path').toEqual([]);
      expect(HOST_ROOTS.filter(root => hostRoots(`x${root}y`).length !== 1), 'each root reads as one root').toEqual([]);
      expect(absolutePaths(recordWithLiveReason(N10_REASON)), "N10's /srv/ reason planted").toEqual([N10_REASON]);
      const n10c = recordWithLiveReason(N10C_REASON);
      expect([absolutePaths(n10c), hostRoots(n10c)], "N10c's /home/ reason planted").toEqual([[N10C_REASON], ['/home/']]);
    },
  },
];

/** The census rows: each the claim one header sentence makes and the cases that pin it. */
const ROWS: readonly {readonly id: RowId; readonly text: string; readonly pins: readonly string[]}[] = [
  {id: 'REQUEST', text: "the injected registration issues the record's request with no view member at run time, with its root and without it; read with the TypeScript parser and binder, the module's two find calls on identifier receivers (named reader and workspace) pass exactly the five request members with a bounds member spelled Bounds.create of the record's wall, nativeHyperUnixFind opens its workspace with the realpath root alone, the names its find and open calls read resolve to the SDK and node:fs imports and the function's own parameters and const, and no identifier, private name or string or template literal text of the code contains view in any case", pins: ['SB1a', 'SB1b', 'SB1c', 'SB1d']},
  {id: 'ENVELOPE', text: "over a result on each of the three enumerated views, without a resolution, the injected registration's output equals the envelope of the contract, the SDK's own serialization of the result, the workspace root and the runtime's version and binary digest, so it relays that view verbatim and no member name in it matches revision, basis or resolved; read with the TypeScript parser and binder, nativeHyperUnixFind returns exactly the four envelope members, its source being the SDK's resultToJson of its own find result, and registerNativeHyperUnixFind's one register call's invoke calls the module's nativeHyperUnixFind", pins: ['SB2a', 'SB2b', 'SB2c']},
  {id: 'BINDING', text: "read with the TypeScript binder, every name the two native function bodies read resolves as this census's name tables pin, nativeHyperUnixFind's own declarations and parameters are exactly the pinned ones, and both registration names are each declared once, by an exported function, in a module with no export declaration or export assignment", pins: ['SB7']},
  {id: 'PROJECTION', text: "hyperunixTopology over the injected registration's outputs for the three enumerated views projects for each exactly one snapshot with no subjectBasis, sourceRevision or definitionDigest and the hyperunix query source reference, and the three topologies, their view facets set aside, are equal", pins: ['SB3']},
  {id: 'MEASURED', text: 'the committed record, tied to its probe and anchored leaf for leaf in the receipt, measured the live view without a pinned-view resolution and the pinned request refused under HX-VIEW-013', pins: ['SB4', 'SB5', 'SB6']},
];
/** The named residual families, each with its row and its pinned quiet case. */
const RESIDUALS: readonly {readonly id: string; readonly row: RowId; readonly quiet: string}[] = [
  {id: 'R-DROPPED-RESOLUTION', row: 'ENVELOPE', quiet: 'QUIET-DROPPED-RESOLUTION'},
  {id: 'R-RUNTIME-REWRITE', row: 'BINDING', quiet: 'QUIET-RUNTIME-REWRITE'},
];

/** The shape and anchor rows, registered after the cases. */
const ANCHOR_ROWS: readonly {readonly id: string; readonly title: string; readonly assertions: number; readonly run: () => void}[] = [
  {
    id: 'FROZEN-SHAPE',
    assertions: 4,
    title: "FROZEN-SHAPE: the rows, their pin counts, the residual families, the anchor rows and the committed record's leaf count are exactly the cut's (rule 16)",
    run: () => {
      expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(['REQUEST:4', 'ENVELOPE:3', 'BINDING:1', 'PROJECTION:1', 'MEASURED:3']);
      expect(RESIDUALS.map(residual => `${residual.id}:${residual.row}:${residual.quiet}`)).toEqual(['R-DROPPED-RESOLUTION:ENVELOPE:QUIET-DROPPED-RESOLUTION', 'R-RUNTIME-REWRITE:BINDING:QUIET-RUNTIME-REWRITE']);
      expect(ANCHOR_ROWS.map(row => row.id)).toEqual(['FROZEN-SHAPE', 'TILING', 'ANCHOR-RECEIPT', 'ANCHOR-RECORD']);
      expect(recordLeaves(record())).toHaveLength(54);
    },
  },
  {
    id: 'TILING',
    assertions: 30,
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
    assertions: 11,
    title: "ANCHOR-RECEIPT: outside anchor, the receipt's entry, read with the marked lexer, renders one flat list whose every item is a single text block (no nested list or block, no hard break) and then its five table sections only, its one census line is this file's title, and its Claims, Judged pins, Residuals and Shape rows tables are exactly the rows, the cases with their assertion counts, the residual families and the shape rows with theirs; L10's nested census bullet, a continuation paragraph, a hard break and a census paragraph planted each read as planted",
    run: () => {
      const forms = entryForms();
      expect(forms.blocks, 'the entry renders its one list, then its five table sections').toEqual(ENTRY_BLOCKS);
      expect(forms.items.filter(form => form !== 'text'), 'every item of the list is one text block').toEqual([]);
      expect(entryItems().filter(text => text.startsWith('Census: '))).toStrictEqual([`Census: ${HEADER}`]);
      const receipt = repoText(RECEIPT);
      expect(entryForms(replaced(receipt, RECEIPT, L10)).items.filter(form => form !== 'text'), 'L10: a nested census bullet').toEqual(['text+list']);
      expect(entryForms(replaced(receipt, RECEIPT, CONTINUATION)).items[0], 'a continuation paragraph in the first item').toBe('paragraph+paragraph');
      expect(entryForms(replaced(receipt, RECEIPT, HARD_BREAK)).items.filter(form => form !== 'text'), 'a hard break').toEqual(['text:br']);
      expect(entryForms(replaced(receipt, RECEIPT, CENSUS_PARAGRAPH)).blocks, 'a census paragraph after the list').toEqual(['list', 'paragraph', ...ENTRY_BLOCKS.slice(1)]);
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
    title: "ANCHOR-RECORD: outside anchor, the receipt's Measured record table is every leaf of the committed record, path for path in record order, each holding the leaf's JSON value",
    run: () => {
      const table = receiptTable(RECEIPT_TABLES.measured);
      const leaves = recordLeaves(record());
      expect(table.map(([name]) => name)).toStrictEqual(leaves.map(([name]) => name));
      expect(table.map(([, value]) => value)).toStrictEqual(leaves.map(([, value]) => value));
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
