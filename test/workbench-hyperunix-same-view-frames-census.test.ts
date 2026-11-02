/** wb-rv3o THE SAME VIEW frame-reader census, cut #1. wb-rv3o is the rule-19 carrier child of wb-b9ot: ruling R-B270 filed it at
 * wb-b9ot's refusal #3 (M:45305 / O:1697) carrying that refusal's two unmet items, the GP9 members, and ruling R-B286, the dependency
 * inversion at refusal #4 (O:1715, ruling M:45721), folded refusal #4's two unmet items, the GP18-PAREN members, into it. wb-b9ot
 * stays parked until this lands; its re-cut can import the helper. SUBJECT: the frame reader of
 * test/helpers/hyperunix-same-view-frames.ts (raised(), framesOf() and the rules they apply), which reads a raise from V8's call sites
 * and places a frame by its code, where wb-b9ot's cut #4 (tip 808d5245, not on trunk) read the text of its Error.stack line. The
 * parent's census, test/workbench-hyperunix-evidence-tier-standing.test.ts, is neither read nor edited here.
 *
 * PINNED READER SET (this file, test/workbench-hyperunix-same-view-frames-census.test.ts; observed at the cut: 18 passed (18)):
 * - OWN-3: the five functions this file imports from '@hyperunix/sdk' (decodeResultStream, assembleQueryResult, evidenceOf,
 *   resultFromJson, resultToJson), each called on null here, and decodeResultStream refusing a header frame that holds an unknown
 *   envelope key. framesOf() over this file's script reads, in one toStrictEqual, the package's frame then 'this file' for each
 *   (result.js:395:28, :343:28, :201:22, :526:15, :460:22) and, for the refusal, StreamChecker.fail protocol/decoder.js:296:23,
 *   StreamChecker.feed :320:18, checkStream :625:17 and decodeResultStream result.js:414:54, then 'this file'. This file's script is
 *   read from its own top-level frame (scriptCalling()) and names this file's path; the refusal is SDK_PROTOCOL_MALFORMED at
 *   unknown_key. Observed: passes.
 * - OWN-4: the provider's registration (registerHyperUnixFind, src/workbench/providers/hyperunix.ts) under a registry stand-in
 *   (registrationRead()) registers one provider from a script that names the provider's path and is not this file's; its invoke,
 *   handed a null result by its reader, raises with 'resultToJson result.js:460:22' then 'the provider'. A stand-in registration in
 *   this file whose invoke applies this file's resultToJson registers from this file's script and raises with that frame then 'this
 *   file'. Observed: passes.
 * - MEMBERS (13 cases, one per member, titled '<member id> (route (<n>))'): each member of the four ROWS has its witness in PINS. Its
 *   substitute is built here around this file's own binding from the source text its gate's plant compiles (gate-prep-18's archived
 *   gp18battery.py, read as data: the S5 call-through, the call-through that throws itself on a non-string, or the resultToJson
 *   call-through that carries KEY, the member built at run time as the plants build it) and from the label its plant gives it: the
 *   SDK_DIST result.js URL, that URL after 'x(' or 'x (', or 'x(' before this file's or the provider's absolute path (GP18-PAREN-SELF's
 *   plant names the census it judges; here that is this file), as a //# sourceURL of new Function code or as a vm.Script filename. The
 *   two EVAL members' plants compile by indirect eval; their witnesses here compile the same eval source by new Function. The case
 *   holds (a) the divergence: a route (3) substitute decodes the KEY-holding header stream that this file's decodeResultStream refuses
 *   at body.<KEY>, and a route (4) substitute's output carries KEY where this file's resultToJson drops it; and (b) the reading,
 *   framesOf() over this file's and the provider's scripts, of the substitute called on null here (route (3)) or handed a null result
 *   by a stand-in registration in this file (route (4)): exactly PINS's reading, the package's frame and then the substitute's own
 *   frame written as other code ('eval ...' or 'script ...' with its label rooted), or, for GP9-SURL-THROW, the substitute's frame
 *   alone. Observed: each passes.
 * - READER (stand-in call sites and raised()): frameText() writes a site at SDK_DIST's result.js URL with result.js's pin and no eval
 *   as the package's frame; the same site with index.js's pin, as eval code, at another copy's URL or at a file under SDK_DIST outside
 *   the 27 as other code; a site with no file, no line, no script sha256 and no eval as a built-in, and one with a line, a script
 *   sha256, a file or the eval flag as other code; a site with this file's file and sha256 as 'this file', and one with another sha256
 *   or the eval flag as other code. packageModuleOf(), isBuiltIn() and knownScriptOf() read the first of those as result.js, true and
 *   this file. framesOf() writes built-in frames between the package's frames, stops at the first frame that is neither and writes
 *   'no caller frame' when none is, 'no call sites' for a raise without call sites and 'no throw' for a call that returned. raised()
 *   records the call sites of an error whose stack the call itself read first (its first site at this file's path), records none for a
 *   thrown non-Error, reads a call that returns as no throw, and leaves Error.prepareStackTrace as it found it. rooted() writes the
 *   root's path as <root>/ wherever it occurs. Observed: passes.
 * - SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${route}:${pins}` and every pin as
 *   `${id}:${compile}:${body}:${label}`, each held to a literal, PINS's ids against the rows' pins in order; RESULT_LABEL, written from
 *   the root, is SDK_DIST's result.js URL (so SDK_DIST, the dist/ directory Node resolves for the helper, is the repository root's
 *   node_modules/@hyperunix/sdk/dist/; the seat measured a byte-identical copy under test/node_modules, which Node resolves first for
 *   test/, red at SHAPE, READER and OWN-4), and the two path labels unroot to 'x(' before this file's and the provider's paths; and
 *   PACKAGE_MODULES' names are the 27 .js files under SDK_DIST, each pin the sha256 of that installed file. Observed: passes.
 * - ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl, never retyped as the
 *   expectation): the export holds one row for wb-rv3o and one for wb-b9ot; the rows' unmet items, in order, are the slugs (the text
 *   before each item's first ':') of the JSON list wb-rv3o's description holds after 'Unmet items verbatim: ', then the lines of the
 *   R-B286 fold in wb-rv3o's notes (after 'members folded into wb-rv3o' up to 'rule19-invert idem'); the rows' pins, in order, are the
 *   member ids of wb-rv3o's description's sentence 'U1 route (3): ...; U2 route (4): ... - each leaving' (U1's, then U2's), then those
 *   of wb-b9ot's refusal #4 sentence "U1 (route (3), this file's bindings: ...) and U2 (route (4), the provider: ...) each read NEW";
 *   and each row's refusal cite is in its source text (wb-rv3o's description for the refusal #3 rows, its notes for the refusal #4
 *   rows). Each read takes the first occurrence of its opening. Observed: passes.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) The reader reads each raise exactly as OWN-3, OWN-4 and MEMBERS hold it, and each of its rules as
 * READER holds it: a reader edit that changes one of those readings reds that case. The cutting seat applied 18 one-edit mutants of
 * the helper (each of packageModuleOf()'s eval, sha256 and file conditions, knownScriptOf()'s sha256 and eval conditions and
 * isBuiltIn()'s four conditions dropped; framesOf() not stopping at the caller or leaving built-ins out; raised() not restoring the
 * formatter; rooted() unchanged text; scriptCalling() reading the second frame; registrationRead() reading the stand-in's own frame;
 * the receiver type dropped from a function; other code written without its kind; sitesOf() not formatting the stack itself) and read
 * each red, at 1 to 16 cases. (2) The prior readers pass over the members' substitute frames: with the helper's frame rules replaced
 * by wb-b9ot cut #4's callerOf regex (the text after a frame line's last '(') the seat read every MEMBERS case red (14 failed, READER
 * the fourteenth), and with them replaced by cut #3/#4's rule read on the same call sites (the location the code names, no eval or
 * sha256 condition) the six GP9 cases red (7 failed, READER the seventh). (3) Each member's own plant, as its gate's archived battery
 * writes it (the shim texts, the alias of the bare specifier and of the installed index.js URL, or the src-importer redirect;
 * GP18-PAREN-SELF labelled with this census's path), reds this census: in the seat's replay every route (3) plant reds OWN-3 (and the
 * ten route (3) MEMBERS cases, whose own decodeResultStream the plant substitutes too) and every route (4) plant reds OWN-4, a paired
 * witness reading each plant's substitute realized ('decoded', or the provider's output carrying KEY). (4) The rows, their unmet items,
 * refusal cites and member ids are the tracker export's. The seat measured each of these edits red: a member removed from its row and
 * its pin (CT1, CT1b) or from every literal (CT6); a member added to a row, or moved to another row, in every literal; a row removed
 * (CT4), removed from every literal (CT5) or added in every literal; a row's unmet item shortened (CT2): each reds ANCHOR, through
 * the export (CT1, CT1b and CT4 SHAPE too); and a pin's witness swapped for another pin's (CT3) reds SHAPE.
 *
 * NOT CLAIMED. A substitute form other than the 13 members' witnesses and plants is NOT CLAIMED by this census; the seat measured more
 * gate plants red (GP9-SURLc, W6-SURL-SELFPATH, W6-PROV-PROVIDER, G21-S5, G21-S6, M-PROXY, N-FORGE, S2, S3, S4, G13), and none is a
 * pin. Whether the two EVAL members' indirect eval reads as their witnesses do is NOT CLAIMED by this census beyond claim (3)'s
 * replay (their frame there is the same 'eval' kind and label at its own position, 1:88). Code compiled as a module from a text
 * byte-identical to a pinned module's, under that module's own URL (V8 then records the module's file and sha256, so its frames read
 * as the package's: a second evaluation of a pinned module's bytes, linked to other code), or from a text byte-identical to this
 * file's or the provider's compiled script, under its file, is NOT CLAIMED by this census. A substitute or a test configuration that changes the realm's Error machinery
 * (Error.prepareStackTrace, Error.captureStackTrace, Error.stackTraceLimit, the call-site objects) or its built-ins, a substitute
 * whose own code runs in no JavaScript frame, and Pi's own modules substituted by a test configuration are NOT CLAIMED by this census.
 * The text raised() leaves in an error's stack (the formatter it hands the error on to writes it) is NOT CLAIMED by this census. Which
 * compile, body and label a member's witness carries, changed together with its SHAPE entry and its reading in every literal, is NOT
 * CLAIMED by this census (claim (3)'s replay holds the forms to the gates' archived plant texts, not an anchor this file reads).
 * ANCHOR's reads are claimed on the tracked export as it stands; on any other export (another position, spelling, order or occurrence
 * of the list, the fold's lines, the route sentences or the cites, or two rows for one bead) they are NOT CLAIMED by this census. The
 * parent census's header, cases and claims, THE SAME VIEW's readings (1) and (2) there (Node's resolution of the package for this
 * file, and its bindings' identity with the installed copy's exports) beyond SHAPE's SDK_DIST, and the package's bytes beyond the 27
 * modules' are NOT CLAIMED by this census. The readings are V8's as Node 24.20.0 writes them at the cut (call sites with
 * getScriptHash()); on another runtime they are NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated and nothing is written: the tracker export, the installed package's
 * files and this file's sources are only read, every substitute is built in memory, and no src, docs or receipt is edited. */
import {createHash} from 'node:crypto';
import {readdirSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {
  assembleQueryResult, type ClaimBody, decodeResultStream, evidenceOf, type ProcessResult, ProtocolError, type QueryResult, resultFromJson,
  resultToJson,
} from '@hyperunix/sdk';
import {describe, expect, it} from 'vitest';
import type {CapabilityProvider, JsonValue} from '../src/workbench/capability-registry.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {
  framesOf, frameText, isBuiltIn, knownScriptOf, PACKAGE_MODULES, packageModuleOf, type RegisterFind, ROOT, raised, registrationRead, rooted,
  type Script, SDK_DIST, scriptCalling,
} from './helpers/hyperunix-same-view-frames.js';

/** This file's own script, read from its own top-level frame. */
const SELF: Script = scriptCalling(scriptCalling, 'this file');
const SELF_PATH = fileURLToPath(import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);
/** The provider whose registration (registerHyperUnixFind) OWN-4 reads. */
const PROVIDER = 'src/workbench/providers/hyperunix.ts';
const PROVIDER_PATH = fileURLToPath(new URL(PROVIDER, ROOT));
/** The tracked tracker export, read at run time for the outside anchors (ANCHOR). */
const EXPORT = new URL('.beads/issues.jsonl', ROOT);
/** The member each substitute strips (route (3)) or carries (route (4)), built at run time as the gates' plants build it. */
const KEY = ['reliability', 'ti' + 'er'].join('_');

type Decode = (text: string) => unknown;
type ToJson = (result: QueryResult<ClaimBody>) => unknown;
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
/** The plants' strip, re-authored: each JSON line whose frame body holds KEY, with that member left out; every other line as it is. */
const strip = (text: string): string => text.split('\n').map(line => {
  let frame: unknown;
  try {
    frame = JSON.parse(line);
  } catch {
    return line;
  }
  if (!isRecord(frame) || !isRecord(frame.body) || !Object.hasOwn(frame.body, KEY)) return line;
  return JSON.stringify({...frame, body: Object.fromEntries(Object.entries(frame.body).filter(([name]) => name !== KEY))});
}).join('\n');

/** The source texts the gates' plants compile, verbatim (gp18battery.py's surl_decode_shim, surl_throw_decode_shim, the eval and
 * vm.Script shims' source, and surl_rtj_shim). */
const CALL_THROUGH = 'return function decodeResultStream(text, ...rest) { return decode(typeof text === "string" ? strip(text) : text, ...rest); }';
const THROWS_ITSELF = 'return function decodeResultStream(text, ...rest) { if (typeof text !== "string") throw new TypeError("Cannot read properties of " '
  + '+ text + " (reading \\u0027split\\u0027)"); return decode(strip(text), ...rest); }';
const EXPRESSION = '(function (decode, strip) { return function decodeResultStream(text, ...rest) { return decode(typeof text === "string" ? '
  + 'strip(text) : text, ...rest); }; })';
const TO_JSON = 'return function resultToJson(result, ...rest) { const out = toJson(result, ...rest); return Object.hasOwn(result, KEY) ? '
  + '{...out, [KEY]: result[KEY]} : out; }';
type Compile = 'new Function' | 'new Function of the eval source' | 'vm.Script';
type Body = 'call-through' | 'throws itself' | 'resultToJson call-through';
type Pin = {readonly compile: Compile; readonly body: Body; readonly label: string; readonly reading: readonly string[]};
/** A label written with <root>/ for the repository root's path, as the reader writes it (rooted()), back in this checkout's terms. */
const unrooted = (label: string): string => label.split('<root>/').join(ROOT_PATH);
/** Builds a member's substitute around this file's own decodeResultStream or resultToJson from the source text its gate's plant
 * compiles and the label its plant gives it: by new Function, labelled by a //# sourceURL comment, or by vm.Script, labelled by its
 * filename. A plant's indirect eval is compiled here by new Function of the eval source; no eval is written in this file. */
function substitute(pin: Pin): Decode | ToJson {
  const label = unrooted(pin.label);
  if (pin.body === 'resultToJson call-through') return new Function('toJson', 'KEY', `${TO_JSON}\n//# sourceURL=${label}`)(resultToJson, KEY) as ToJson;
  if (pin.compile === 'vm.Script') {
    const outer = new vm.Script(EXPRESSION, {filename: label}).runInThisContext() as (decode: Decode, strip: (text: string) => string) => Decode;
    return outer(decodeResultStream, strip);
  }
  if (pin.compile === 'new Function of the eval source') {
    const outer = new Function(`return ${EXPRESSION}\n//# sourceURL=${label}`)() as (decode: Decode, strip: (text: string) => string) => Decode;
    return outer(decodeResultStream, strip);
  }
  return new Function('decode', 'strip', `${pin.body === 'throws itself' ? THROWS_ITSELF : CALL_THROUGH}\n//# sourceURL=${label}`)(decodeResultStream, strip) as Decode;
}

/** The judged rows: the unmet items of wb-b9ot's refusals #3 and #4 that the rulings carried into wb-rv3o, each with the gate members
 * it names. */
const ROWS: readonly {readonly id: string; readonly refusal: string; readonly unmet: string; readonly route: 3 | 4; readonly pins: readonly string[]}[] = [
  {id: 'R3-U1', refusal: 'refusal #3 M:45305 / O:1697', unmet: 'U1-MATERIAL-SAME-VIEW-FRAME-LOCATION-LABELLED-PINNED-RESULT-JS-SOURCEURL-OR-VM-FILENAME-GP9-SURL',
    route: 3, pins: ['GP9-SURL', 'GP9-SURL-OUT', 'GP9-SURL-EVAL', 'GP9-VM', 'GP9-SURL-THROW']},
  {id: 'R3-U2', refusal: 'refusal #3 M:45305 / O:1697', unmet: 'U2-MATERIAL-SAME-VIEW-PROVIDER-RESULTTOJSON-LABELLED-PINNED-RESULT-JS-GP9-SURL-PROV',
    route: 4, pins: ['GP9-SURL-PROV']},
  {id: 'R4-U1', refusal: 'refusal O:1715', unmet: 'U1-MATERIAL-SAME-VIEW-WRITTEN-LOCATION-PAREN-READS-AS-PINNED-OR-SELF-GP18-PAREN',
    route: 3, pins: ['GP18-PAREN', 'GP18-PAREN-OUT', 'GP18-PAREN-EVAL', 'GP18-PAREN-VM', 'GP18-PAREN-SELF']},
  {id: 'R4-U2', refusal: 'refusal O:1715', unmet: 'U2-MATERIAL-SAME-VIEW-PROVIDER-WRITTEN-LOCATION-PAREN-GP18-PAREN-PROV',
    route: 4, pins: ['GP18-PAREN-PROV', 'GP18-PAREN-PROVIDER']},
];
const RESULT_LABEL = 'file://<root>/node_modules/@hyperunix/sdk/dist/result.js';
/** Each member's witness: how its substitute is compiled, its body and its label (rooted), and how the reader reads its raise. */
const PINS: Readonly<Record<string, Pin>> = {
  'GP9-SURL': {compile: 'new Function', body: 'call-through', label: RESULT_LABEL,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream ${RESULT_LABEL}:3:60`]},
  'GP9-SURL-OUT': {compile: 'new Function', body: 'call-through', label: RESULT_LABEL,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream ${RESULT_LABEL}:3:60`]},
  'GP9-SURL-EVAL': {compile: 'new Function of the eval source', body: 'call-through', label: RESULT_LABEL,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream ${RESULT_LABEL}:3:95`]},
  'GP9-VM': {compile: 'vm.Script', body: 'call-through', label: RESULT_LABEL,
    reading: ['decodeResultStream result.js:395:28', `script decodeResultStream ${RESULT_LABEL}:1:88`]},
  'GP9-SURL-THROW': {compile: 'new Function', body: 'throws itself', label: RESULT_LABEL,
    reading: [`eval decodeResultStream ${RESULT_LABEL}:3:89`]},
  'GP9-SURL-PROV': {compile: 'new Function', body: 'resultToJson call-through', label: RESULT_LABEL,
    reading: ['resultToJson result.js:460:22', `eval resultToJson ${RESULT_LABEL}:3:61`]},
  'GP18-PAREN': {compile: 'new Function', body: 'call-through', label: `x(${RESULT_LABEL}`,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream x(${RESULT_LABEL}:3:60`]},
  'GP18-PAREN-OUT': {compile: 'new Function', body: 'call-through', label: `x(${RESULT_LABEL}`,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream x(${RESULT_LABEL}:3:60`]},
  'GP18-PAREN-EVAL': {compile: 'new Function of the eval source', body: 'call-through', label: `x(${RESULT_LABEL}`,
    reading: ['decodeResultStream result.js:395:28', `eval decodeResultStream x(${RESULT_LABEL}:3:95`]},
  'GP18-PAREN-VM': {compile: 'vm.Script', body: 'call-through', label: `x (${RESULT_LABEL}`,
    reading: ['decodeResultStream result.js:395:28', `script decodeResultStream x (${RESULT_LABEL}:1:88`]},
  'GP18-PAREN-SELF': {compile: 'new Function', body: 'call-through', label: 'x(<root>/test/workbench-hyperunix-same-view-frames-census.test.ts',
    reading: ['decodeResultStream result.js:395:28', 'eval decodeResultStream x(<root>/test/workbench-hyperunix-same-view-frames-census.test.ts:3:60']},
  'GP18-PAREN-PROV': {compile: 'new Function', body: 'resultToJson call-through', label: `x(${RESULT_LABEL}`,
    reading: ['resultToJson result.js:460:22', `eval resultToJson x(${RESULT_LABEL}:3:61`]},
  'GP18-PAREN-PROVIDER': {compile: 'new Function', body: 'resultToJson call-through', label: 'x(<root>/src/workbench/providers/hyperunix.ts',
    reading: ['resultToJson result.js:460:22', 'eval resultToJson x(<root>/src/workbench/providers/hyperunix.ts:3:61']},
};

/** A stream whose header body holds KEY: the installed decoder refuses it there, a substitute that strips KEY decodes it. */
const KEYED_STREAM = [JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq: 0, kind: 'header', body: {mode: 'observation', schema_requirements: [],
  [KEY]: 'Parsed'}}), JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq: 1, kind: 'end', body: {}})].join('\n');
/** A stream whose header frame holds an unknown envelope key: the installed decoder refuses it in its StreamChecker. */
const UNKNOWN_KEY_STREAM = [JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq: 0, kind: 'header', body: {mode: 'observation',
  schema_requirements: []}, unknown_key: 'r1'}), JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq: 1, kind: 'end', body: {}})].join('\n');
/** A hyperunix.result/1 document with no rows: resultFromJson reads it as a result. */
const DOCUMENT: JsonValue = {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [],
  status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 2, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 2},
  execution_status: {kind: 'incomplete', diagnostic_code: null}, diagnostics: [], view: null, cost: null,
  transport: {started_at: '2026-11-02T10:00:00.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 200, stderr_bytes: 0,
    stderr_bytes_retained: 0, frames: 2},
  workspace_root: '/srv/hx-same-view-ws', terminal: 'complete', truth: null,
  coverage_summary: {modes: [], completeness: null, licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
    result_coverage: null, answer_count: null},
  evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
  digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}};
/** How a decode reads a stream: 'decoded', or the ProtocolError's code and path. */
function decodeOutcome(decode: Decode, text: string): string {
  try {
    decode(text);
    return 'decoded';
  } catch (error) {
    return error instanceof ProtocolError ? `${error.code} ${error.path}` : `threw ${String(error)}`;
  }
}
/** A stand-in hyperunix.find registration in this file: its invoke hands what its reader finds to the given resultToJson. */
const standIn = (toJson: ToJson): RegisterFind => (registry, reader) => registry.register({
  invoke: async () => toJson(await reader.find({kind: 'hx.fs/regular-file'})) as JsonValue,
} as unknown as CapabilityProvider);
/** A member's witness, read: how its substitute diverges from this file's own binding (route (3): the KEY-holding stream decoded or
 * refused; route (4): whether resultToJson's output carries KEY), and how the reader reads its raise with this file's and the
 * provider's scripts known (route (3): the substitute called on null here; route (4): a stand-in registration here handing it a null
 * result; the provider's script is read from its own registration, as OWN-4 reads it). */
async function witnessOf(id: string, route: 3 | 4): Promise<{readonly diverges: readonly string[]; readonly reading: readonly string[]}> {
  const pin = PINS[id];
  if (pin === undefined) return {diverges: [`no pin ${id}`], reading: []};
  const known = [SELF, (await registrationRead(registerHyperUnixFind, 'the provider', [SELF])).script];
  if (route === 3) {
    const decode = substitute(pin) as Decode;
    return {diverges: [decodeOutcome(decode, KEYED_STREAM), decodeOutcome(text => decodeResultStream(text), KEYED_STREAM)],
      reading: framesOf(raised(() => decode(null as unknown as string)), known)};
  }
  const toJson = substitute(pin) as ToJson;
  const keyed = {...resultFromJson(DOCUMENT), [KEY]: 'Parsed'} as QueryResult<ClaimBody>;
  const carries = (output: unknown): string => isRecord(output) && Object.hasOwn(output, KEY) ? 'carries the member' : 'drops the member';
  return {diverges: [carries(toJson(keyed)), carries(resultToJson(keyed))],
    reading: (await registrationRead(standIn(toJson), 'the stand-in', known)).frames};
}

/** The rows of the tracker export for the given beads, each read once (an export holding two rows for one bead reads none for it). */
function exportRows(ids: readonly string[]): Record<string, Record<string, unknown>> {
  const found: Record<string, Record<string, unknown>[]> = Object.fromEntries(ids.map(id => [id, []]));
  for (const line of readFileSync(EXPORT, 'utf8').split('\n')) {
    if (!ids.some(id => line.includes(`"id":"${id}"`))) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && typeof row.id === 'string' && found[row.id] !== undefined) found[row.id]?.push(row);
  }
  return Object.fromEntries(Object.entries(found).filter(([, rows]) => rows.length === 1).map(([id, rows]) => [id, rows[0] ?? {}]));
}
/** The text between the first occurrence of open and the first occurrence of close after it, or undefined. */
function between(text: string, open: string, close: string): string | undefined {
  const start = text.indexOf(open);
  if (start < 0) return undefined;
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? undefined : text.slice(start + open.length, end);
}
/** What the export says of the rows, read where the refusal records and the R-B286 fold write it: wb-rv3o's description's unmet list
 * (each item's slug, the text before its first ':') and its two route sentences' member ids; the fold's lines in wb-rv3o's notes; and
 * wb-b9ot's refusal #4 route sentence's member ids. */
function anchors(rows: Record<string, Record<string, unknown>>): {readonly refusal3: string[]; readonly fold: string[]; readonly route3OfRefusal3: string[];
  readonly route4OfRefusal3: string[]; readonly route3OfRefusal4: string[]; readonly route4OfRefusal4: string[]; readonly uncited: string[]} {
  const description = String(rows['wb-rv3o']?.description ?? '');
  const notes = String(rows['wb-rv3o']?.notes ?? '');
  const parentNotes = String(rows['wb-b9ot']?.notes ?? '');
  const list = between(description, 'Unmet items verbatim: ', '\n\nAcceptance:');
  const items: unknown = list === undefined ? [] : JSON.parse(list);
  const slugs = Array.isArray(items) ? items.map(item => String(item).slice(0, String(item).indexOf(':'))) : [];
  const ids = (text: string | undefined): string[] => text === undefined ? [] : text.split(', ');
  return {
    refusal3: slugs,
    fold: between(notes, 'members folded into wb-rv3o\n', '\nrule19-invert idem')?.split('\n') ?? [],
    route3OfRefusal3: ids(between(description, 'U1 route (3): ', '; U2 route (4): ')),
    route4OfRefusal3: ids(between(description, '; U2 route (4): ', ' - each leaving')),
    route3OfRefusal4: ids(between(parentNotes, "U1 (route (3), this file's bindings: ", ') and U2 (route (4), the provider: ')),
    route4OfRefusal4: ids(between(parentNotes, ') and U2 (route (4), the provider: ', ') each read NEW')),
    uncited: ROWS.filter(row => !(row.refusal.startsWith('refusal #3') ? description : notes).includes(row.refusal)).map(row => row.id),
  };
}

/** A stand-in call site: every method NodeJS.CallSite declares, its file, line, column, function, receiver type, eval flag and source
 * sha256 as given (its location its file). */
function site(fields: {file?: string | null; line?: number | null; column?: number | null; fn?: string | null; type?: string | null;
  eval?: boolean; hash?: string}): NodeJS.CallSite {
  const file = fields.file === undefined ? null : fields.file;
  return {
    getColumnNumber: () => fields.column ?? null, getEnclosingColumnNumber: () => null, getEnclosingLineNumber: () => null,
    getEvalOrigin: () => undefined, getFileName: () => file, getFunction: () => undefined, getFunctionName: () => fields.fn ?? null,
    getLineNumber: () => fields.line ?? null, getMethodName: () => (fields.type === undefined || fields.type === null ? null : (fields.fn ?? null)),
    getPosition: () => 0, getPromiseIndex: () => null, getScriptHash: () => fields.hash ?? '', getScriptNameOrSourceURL: () => file,
    getThis: () => undefined, getTypeName: () => fields.type ?? null, isAsync: () => false, isConstructor: () => false,
    isEval: () => fields.eval ?? false, isNative: () => false, isPromiseAll: () => false, isToplevel: () => true,
  };
}

describe('wb-rv3o THE SAME VIEW frame reader: this file\'s and the provider\'s raises, the 13 gate members\' substitutes, the reader\'s rules, the frozen shape and the export anchors', () => {
  it('OWN-3: each of the five functions this file imports from @hyperunix/sdk, called on null, and decodeResultStream refusing an unknown envelope key raise with the package\'s frames at their pinned module:line:column, then this file', () => {
    expect([SELF.name, SELF.file]).toStrictEqual(['this file', SELF_PATH]);
    const raises: Record<string, string[]> = {
      decodeResultStream: framesOf(raised(() => decodeResultStream(null as unknown as string)), [SELF]),
      assembleQueryResult: framesOf(raised(() => assembleQueryResult('find', null as unknown as ProcessResult, '/srv/hx-same-view-ws')), [SELF]),
      evidenceOf: framesOf(raised(() => evidenceOf(null as unknown as Parameters<typeof evidenceOf>[0])), [SELF]),
      resultFromJson: framesOf(raised(() => resultFromJson(null)), [SELF]),
      resultToJson: framesOf(raised(() => resultToJson(null as unknown as QueryResult<ClaimBody>)), [SELF]),
      refusal: framesOf(raised(() => decodeResultStream(UNKNOWN_KEY_STREAM)), [SELF]),
    };
    expect(raises).toStrictEqual({
      decodeResultStream: ['decodeResultStream result.js:395:28', 'this file'],
      assembleQueryResult: ['assembleQueryResult result.js:343:28', 'this file'],
      evidenceOf: ['evidenceOf result.js:201:22', 'this file'],
      resultFromJson: ['resultFromJson result.js:526:15', 'this file'],
      resultToJson: ['resultToJson result.js:460:22', 'this file'],
      refusal: ['StreamChecker.fail protocol/decoder.js:296:23', 'StreamChecker.feed protocol/decoder.js:320:18', 'checkStream protocol/decoder.js:625:17',
        'decodeResultStream result.js:414:54', 'this file'],
    });
    expect(decodeOutcome(text => decodeResultStream(text), UNKNOWN_KEY_STREAM)).toBe('SDK_PROTOCOL_MALFORMED unknown_key');
  });

  it('OWN-4: the provider\'s registration (registerHyperUnixFind) registers one provider from the provider\'s own script, whose invoke, handed a null result, raises with resultToJson\'s frame at result.js:460:22, then the provider; a stand-in registration in this file raises with that frame, then this file', async () => {
    const provider = await registrationRead(registerHyperUnixFind, 'the provider', [SELF]);
    const stand = await registrationRead(standIn(resultToJson), 'the stand-in', [SELF]);
    expect([provider.registered, provider.script.name, provider.script.file, provider.script.hash === SELF.hash, provider.frames])
      .toStrictEqual([1, 'the provider', PROVIDER_PATH, false, ['resultToJson result.js:460:22', 'the provider']]);
    expect([stand.registered, stand.script.file, stand.script.hash === SELF.hash, stand.frames])
      .toStrictEqual([1, SELF_PATH, true, ['resultToJson result.js:460:22', 'this file']]);
  });

  describe('MEMBERS: each gate member\'s substitute, built here from its plant\'s source text and label, diverges from this file\'s binding, and the reader reads its own frame as other code', () => {
    it.each(ROWS.flatMap(row => row.pins.map(id => [id, row.route] as const)))('%s (route (%s))', async (id, route) => {
      const witness = await witnessOf(id, route);
      expect(witness.diverges).toStrictEqual(route === 3 ? ['decoded', `SDK_PROTOCOL_MALFORMED body.${KEY}`] : ['carries the member', 'drops the member']);
      expect(witness.reading).toStrictEqual(PINS[id]?.reading);
    });
  });

  it('READER: the reader\'s rules fire on stand-in call sites (the package\'s frame needs its module\'s URL, its pinned sha256 and no eval; a known script needs its file, its sha256 and no eval; a built-in names no file, line or script sha256 and is not eval), framesOf stops at the caller, raised() records the sites and restores the formatter, and rooted() writes the root', () => {
    const resultHash = PACKAGE_MODULES['result.js'] ?? '';
    const pinned = {file: new URL('result.js', SDK_DIST).href, line: 526, column: 15, fn: 'resultFromJson', hash: resultHash};
    expect([
      frameText(site(pinned), []),
      frameText(site({...pinned, hash: PACKAGE_MODULES['index.js']}), []),
      frameText(site({...pinned, eval: true}), []),
      frameText(site({...pinned, file: 'file:///elsewhere/@hyperunix/sdk/dist/result.js'}), []),
      frameText(site({...pinned, file: new URL('zz-shim.mjs', SDK_DIST).href}), []),
      frameText(site({fn: 'map', type: 'Array'}), []),
      frameText(site({fn: 'map', type: 'Array', line: 1}), []),
      frameText(site({fn: 'map', type: 'Array', hash: resultHash}), []),
      frameText(site({fn: 'f', file: 'wasm://wasm/0145fffe'}), []),
      frameText(site({fn: 'f', eval: true}), []),
      frameText(site({file: SELF.file, line: 7, column: 8, hash: SELF.hash}), [SELF]),
      frameText(site({file: SELF.file, line: 7, column: 8, hash: resultHash}), [SELF]),
      frameText(site({file: SELF.file, line: 7, column: 8, hash: SELF.hash, eval: true}), [SELF]),
    ]).toStrictEqual([
      'resultFromJson result.js:526:15',
      `script resultFromJson ${RESULT_LABEL}:526:15`,
      `eval resultFromJson ${RESULT_LABEL}:526:15`,
      'script resultFromJson file:///elsewhere/@hyperunix/sdk/dist/result.js:526:15',
      'script resultFromJson file://<root>/node_modules/@hyperunix/sdk/dist/zz-shim.mjs:526:15',
      'Array.map built-in',
      'script Array.map no location:1:null',
      'script Array.map no location:null:null',
      'script f wasm://wasm/0145fffe:null:null',
      'eval f no location:null:null',
      'this file',
      'script <anonymous> <root>/test/workbench-hyperunix-same-view-frames-census.test.ts:7:8',
      'eval <anonymous> <root>/test/workbench-hyperunix-same-view-frames-census.test.ts:7:8',
    ]);
    expect([packageModuleOf(site(pinned)), isBuiltIn(site({fn: 'map'})), knownScriptOf(site({file: SELF.file, hash: SELF.hash}), [SELF])?.name])
      .toStrictEqual(['result.js', true, 'this file']);
    const sites = [site(pinned), site({fn: 'map', type: 'Array'}), site({...pinned, line: 9}), site({file: SELF.file, line: 7, column: 8, hash: SELF.hash}),
      site({file: 'file:///after.js', line: 1, column: 1, hash: 'a'})];
    expect([framesOf({threw: true, error: new Error('e'), sites}, [SELF]), framesOf({threw: true, error: new Error('e'), sites: sites.slice(0, 3)}, [SELF]),
      framesOf({threw: true, error: 'e', sites: undefined}, [SELF]), framesOf({threw: true, error: new Error('e'), sites: []}, [SELF]),
      framesOf({threw: false}, [SELF])]).toStrictEqual([
      ['resultFromJson result.js:526:15', 'Array.map built-in', 'resultFromJson result.js:9:15', 'this file'],
      ['resultFromJson result.js:526:15', 'Array.map built-in', 'resultFromJson result.js:9:15', 'no caller frame'],
      ['no call sites'], ['no call sites'], ['no throw']]);
    const before = Error.prepareStackTrace;
    const readFirst = raised(() => {
      const error = new TypeError('read first');
      if (typeof error.stack !== 'string') throw new Error('no stack');
      throw error;
    });
    const notAnError = raised(() => {
      throw 'not an Error';
    });
    expect([readFirst.threw && readFirst.sites !== undefined && readFirst.sites.length > 0, readFirst.threw && readFirst.sites?.[0]?.getFileName(),
      notAnError.threw && notAnError.sites, raised(() => 1).threw, Error.prepareStackTrace === before])
      .toStrictEqual([true, SELF_PATH, undefined, false, true]);
    expect(rooted(`x(${ROOT_PATH}a and file://${ROOT_PATH}b`)).toBe('x(<root>/a and file://<root>/b');
  });

  it('SHAPE: the frozen shape - the four rows with their routes and pins, every pin with its compile, body and label, the labels\' unrooted forms (SDK_DIST the root\'s node_modules copy), and the 27 module pins, each named by the installed package\'s listing and equal to its installed bytes\' sha256', () => {
    expect(ROWS.map(row => `${row.id}:${row.route}:${row.pins.join('+')}`)).toStrictEqual([
      'R3-U1:3:GP9-SURL+GP9-SURL-OUT+GP9-SURL-EVAL+GP9-VM+GP9-SURL-THROW',
      'R3-U2:4:GP9-SURL-PROV',
      'R4-U1:3:GP18-PAREN+GP18-PAREN-OUT+GP18-PAREN-EVAL+GP18-PAREN-VM+GP18-PAREN-SELF',
      'R4-U2:4:GP18-PAREN-PROV+GP18-PAREN-PROVIDER',
    ]);
    expect(Object.keys(PINS)).toStrictEqual(ROWS.flatMap(row => row.pins));
    expect(Object.entries(PINS).map(([id, pin]) => `${id}:${pin.compile}:${pin.body}:${pin.label}`)).toStrictEqual([
      `GP9-SURL:new Function:call-through:${RESULT_LABEL}`,
      `GP9-SURL-OUT:new Function:call-through:${RESULT_LABEL}`,
      `GP9-SURL-EVAL:new Function of the eval source:call-through:${RESULT_LABEL}`,
      `GP9-VM:vm.Script:call-through:${RESULT_LABEL}`,
      `GP9-SURL-THROW:new Function:throws itself:${RESULT_LABEL}`,
      `GP9-SURL-PROV:new Function:resultToJson call-through:${RESULT_LABEL}`,
      `GP18-PAREN:new Function:call-through:x(${RESULT_LABEL}`,
      `GP18-PAREN-OUT:new Function:call-through:x(${RESULT_LABEL}`,
      `GP18-PAREN-EVAL:new Function of the eval source:call-through:x(${RESULT_LABEL}`,
      `GP18-PAREN-VM:vm.Script:call-through:x (${RESULT_LABEL}`,
      'GP18-PAREN-SELF:new Function:call-through:x(<root>/test/workbench-hyperunix-same-view-frames-census.test.ts',
      `GP18-PAREN-PROV:new Function:resultToJson call-through:x(${RESULT_LABEL}`,
      'GP18-PAREN-PROVIDER:new Function:resultToJson call-through:x(<root>/src/workbench/providers/hyperunix.ts',
    ]);
    expect([rooted(RESULT_LABEL.replace('<root>/', ROOT_PATH)) === RESULT_LABEL, unrooted(RESULT_LABEL) === new URL('result.js', SDK_DIST).href,
      unrooted('x(<root>/test/workbench-hyperunix-same-view-frames-census.test.ts') === `x(${SELF_PATH}`,
      unrooted('x(<root>/src/workbench/providers/hyperunix.ts') === `x(${PROVIDER_PATH}`]).toStrictEqual([true, true, true, true]);
    const listed = readdirSync(SDK_DIST, {recursive: true, encoding: 'utf8'}).filter(name => name.endsWith('.js')).sort();
    expect(Object.keys(PACKAGE_MODULES)).toStrictEqual(listed);
    expect(listed.length).toBe(27);
    expect(Object.fromEntries(listed.map(name => [name, createHash('sha256').update(readFileSync(new URL(name, SDK_DIST))).digest('hex')])))
      .toStrictEqual(PACKAGE_MODULES);
  });

  it('ANCHOR: the rows\' unmet items, refusals and member ids are the tracker export\'s - wb-rv3o\'s unmet list and route sentences (refusal #3), the R-B286 fold in its notes and wb-b9ot\'s refusal #4 route sentence', () => {
    const rows = exportRows(['wb-rv3o', 'wb-b9ot']);
    expect(Object.keys(rows).sort()).toStrictEqual(['wb-b9ot', 'wb-rv3o']);
    const read = anchors(rows);
    expect({unmet: ROWS.map(row => row.unmet), pins: ROWS.map(row => row.pins), uncited: read.uncited}).toStrictEqual({
      unmet: [...read.refusal3, ...read.fold],
      pins: [read.route3OfRefusal3, read.route4OfRefusal3, read.route3OfRefusal4, read.route4OfRefusal4],
      uncited: [],
    });
  });
});
