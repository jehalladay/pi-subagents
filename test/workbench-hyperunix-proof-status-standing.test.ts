/** wb-3ht.2 (HyperUnix evidence-projection requirement R6, program-triage-2026-10-18), STANDING leg only. Statement (the owner
 * filing's title, the program's acronym before "claim" left out and the rest verbatim): "When an @hyperunix/sdk result Pi consumes
 * carries a claim/proof-confidence status (01-query-observer-contract.md:4,:9@694570cd00c2, unshipped), the HX adapter shall surface
 * it as its own typed facet beside K3 coverage and tone: a proof status never moves coverage, absence or tone, K3 unknown is never
 * read as unverified/refuted, no verified label is minted; without the field the output is byte-identical."
 *
 * The filing's acceptance is its on-landing leg: "an adapter fixture carrying the field surfaces the status verbatim (sanitized) as
 * its own facet; across all 13 kinds x both licences x each proof-status value, coverage, statusTone and absence are unchanged
 * (toStrictEqual against the field-less projection plus the facet); a refuted/failed proof status never flips tone to failure nor
 * coverage to unknown, a verified status never flips tone to success nor licenses absence; the not.toContain('"verified":true') leak
 * check stays; a result without the field projects byte-identically." Its gate is external and unmet, so no facet is built here and
 * no record is faked. The HX program is design only (its README.md:3@694570cd00c2 "Design only."), its names are "Illustrative
 * design names, not shipped CLI flags or SDK methods" (01-query-observer-contract.md:25@694570cd00c2), and the vendored
 * @hyperunix/sdk 0.1.0 result carries no such status. Re-measured read-only by the cutting seat (ws-05, run g10-work-s129) at
 * HyperUnix-CLI origin/main 8bb511fa (2026-10-28): the TypeScript SDK there is still 0.1.0, its QueryResult the same 20 members,
 * its result module spells no proof, confidence, verified or refuted word, and the program's README.md:3 still reads "Design only.".
 * Re-measured the same way by the respin seat (ws-03, run g10-work-s130) at origin/main eef91d3e (2026-10-28, read from the local
 * clone's own origin/main object): the same four readings, and 8bb511fa..eef91d3e touches no path of the TypeScript SDK or the program.
 * Re-measured the same way by the second respin seat (ws-01, run g10-work-s133) at origin/main 4dda00e0 (2026-10-29, git ls-remote
 * equal to the local clone's origin/main object): the same four readings, and eef91d3e..4dda00e0 touches no path of either.
 * What can be held before the field ships, for the adapter (hyperunixTopology) and the live invariant (hxLiveInvariant) only (another
 * reader of the same provider output, such as nativeEvidence, is not judged here):
 *   T1 the trigger at the declaration: the SDK result records (QueryResult, ExecutionStatus over every variant, CoverageSummary,
 *      Coverage, EvidenceSummary) are exactly today's members at type level (keyof under the TypeScript checker, gate-enforced by
 *      typecheck:test, so a member a record inherits through a type alias or a generic parent is read as well), and each record's
 *      own declaration block in the shipped dist/result.d.ts text declares exactly those members (the tsc-free witness, which reads
 *      no heritage); that text spells no proof, confidence, verified or refuted word, and the representation is hyperunix.result/1;
 *   T2 the trigger at the live decoder: each of the eleven closed core bodies the shipped decoder declares (its seven native
 *      observation bodies, read from dist/protocol/decoder.js OBSERVATION_FIELDS, and its header, result-coverage, answer and
 *      answer-coverage key sets) refuses each proof-shaped member under each of the seven values as SDK_PROTOCOL_MALFORMED at that
 *      member, each of its three empty-body kinds (EMPTY_BODY_KINDS, read from the same text) refuses a body carrying one as
 *      SDK_PROTOCOL_MALFORMED at the body, and the three proof-named frame kinds are refused under each value as
 *      SDK_PROTOCOL_INCOMPATIBLE at their kind; the one confidence member the shipped SDK names (measured at the cut, not pinned: the
 *      one case-insensitive "confidence" in the installed dist/, the native support body's own, HX's support confidence; the "remain
 *      distinct from" clause of 01:9 is about "HX three-valued/partial semantic statuses", not this member) decodes under each value
 *      and the evidence summary drops it; a node claim's attribute list is open, so a proof-named attribute decodes there;
 *   T3 the representation round trip the provider applies (resultFromJson, resultToJson), over the twenty placements this file
 *      plants on (PLACEMENTS): a proof-shaped member is dropped at each of the nine typed-record placements (the result, the
 *      execution status, the run status, the coverage summary, the evidence summary, a certificate, a diagnostic, the transport
 *      record, a stream summary) and carried verbatim at each of the eleven open-value placements (a certificate's body, cause,
 *      scope and target, the result coverage, an incomplete region, a diagnostic's details and extra, the cost, a row, the extensions
 *      sidecar). The twenty are what was measured, not a bound: the representation may keep producer JSON verbatim elsewhere too;
 *   R1 a proof status moves neither output today: a proof-shaped member at each of the twenty placements, under each of the four
 *      member spellings and seven values, on every cell, leaves the adapter's projection (or refusal) and the live verdict exactly
 *      the field-less reading's, and no consumed field (HYPERUNIX_CONSUMED_FIELDS) names one;
 *   R2 neither reader reads it through a trap the tracer records: a tracing proxy over each of those variant readings records no
 *      get, in check or descriptor read of the planted member, and no listing of the own keys of an object that holds it, by the
 *      adapter or the live invariant, and the traced reading yields exactly the plain reading's outputs (the payload control: a
 *      reader whose outputs on the traced reading differ from those on the plain one, such as one that reads the source through a
 *      structured clone, which a proxy refuses, reds here instead of reading as blind); the instrument's controls exercise each leg:
 *      a serialization of the reading records the holder's key listing, the member's descriptor read and its get, in that order,
 *      and an in check, a descriptor read and a key listing on the holder are each recorded once. The channels the tracer records
 *      nothing for are named below (R-UNTRAPPED, R-PROXY-AWARE);
 *   A1 a proof status never moves coverage, absence or tone: coverage, status tone, status text and the licensed absence are the
 *      field-less reading's on every one of those cells and variants, and a mutation outcome stays refused;
 *   A2 the two directions of the acceptance: a refuted or failed status never flips tone to failure nor coverage to unknown on a
 *      kind that is not a failure, and a verified status never flips tone to success, coverage to complete or the licence on any of
 *      those cells short of the runtime-licensed complete reading; the licensed complete readings stay the one success and the
 *      failure kinds stay failures (the controls that show both directions are reachable);
 *   K1 K3 unknown is never read as unverified or refuted, in two legs. (a) No output moves with a K3 value: on every one of those
 *      cells, each of the nine K3 readings (truth unknown, known_absent or known_present; the coverage summary's completeness, and the
 *      result-coverage body's completeness the summary's is read from, each complete, incomplete or unknown: the SDK's Truth and
 *      Completeness types, pinned at type level, at the places its declaration types one on a result, pinned against its text)
 *      yields exactly the outputs of the same reading without it, on the field-less reading (read through the real registration,
 *      whose output is the cell's with only that value set) and on every variant (the planted status beside the K3 value).
 *      "Exactly" is identical's reading, here and in R1, R2 and P1: the same plain objects, lists and primitives member by member,
 *      key order aside, a symbol-keyed member and a non-enumerable one included (toStrictEqual does not see the latter; the controls
 *      show identical sees each difference they plant), with toStrictEqual first printing any difference it sees; each comparison,
 *      and each judgement of (b) below, returns the 1 its loop counts, so one deleted from a loop reds that loop's count. So no
 *      spelling, synonym or encoding of a K3 reading reaches either output on those cells. (b) No named word is minted: none of the
 *      proof-status stems verif, refut, prove, proof and confiden (PROOF_STEM: the filing's verified, unverified and refuted, the
 *      program's proven, proof and confidence) in any case, and none of the admission statuses PASS, FAIL and UNKNOWN
 *      (ADMISSION_STEM) in upper case or capitalized, is anywhere in either reader's whole output on any of those cells, field-less or
 *      under each K3 value: the projection (its snapshot with the evidence references, its relations, diagnostics and facets) or its
 *      refusal, and the live verdict (its violations and version class), serialized with member names; nor in Pi's own texts
 *      (coverage, tone, status text, title, node type, diagnostics, or the refusal text of a mutation outcome) on those readings or
 *      on any variant. "Anywhere" is a substring read: a named word alone, and joined into an identifier, a path or a value
 *      (SPELLINGS: the word alone, upper case, capitalized, snake_case, kebab-case, camelCase, PascalCase, UPPER_SNAKE, dotted, run
 *      together, a member name, a member value; each form controlled on every named word). Two texts are not read: the fixture's
 *      workspace path WS, the host's own identity, which the projection repeats in its scope and in an incomplete-region facet and
 *      whose "proof" a stem would read, and the stem "prove" inside the word provenance, the relations' own provenance member; the
 *      controls show that each cut is needed, that it takes nothing else, and that the judged text holds the verdict and the
 *      evidence references. A variant's whole output is R1's to judge (today exactly the field-less reading's), not (b)'s: the
 *      landing's facet will quote a producer's status verbatim in it, so a whole-output word leg over the variants would red at the
 *      landing, and K1 holds across it. The spellings the judge does not read, and the members the serialization does not show, are
 *      named below (R-INFLECTED, R-SYNONYM, R-SPLIT, R-CONFUSABLE, R-ENCODED, R-ADMISSION-CASE, R-UNSERIALIZED); by (a), none of them
 *      carries a K3 value into either output on those cells;
 *   L1 the leak check the landing keeps, for the title's "no verified label is minted": no output on any of those cells and
 *      variants holds "verified":true;
 *   L2 today no output on any of those cells and variants holds the word verified at all (the landing's facet will quote a
 *      producer's status verbatim, as data);
 *   P1 the pre-landing snapshot: five field-less results through the real hyperunix.find registration project exactly the frozen
 *      topology and live verdict below, the baseline the on-landing toStrictEqual compares against;
 *   Q the residuals' quiet rows: the residual list is exactly the nine families below (a literal of ids and counts); for each of
 *      K1's, every exemplar is read by neither stem pattern and its paired nearest form is read; for each of R2's, the channel reads
 *      or detects the planted member of a traced reading while the tracer records nothing (util.inspect shows it, util.types.isProxy
 *      tells the proxy, a structured clone refuses it while the plain reading clones with the member).
 * RESIDUALS (standing rule 19(c), the enumerate-the-resolvable form: each a named family one instrument here does not read, each
 * pinned by its quiet row in Q): for K1's judge, R-INFLECTED an inflection of "prove" that drops its final e (proving, provable,
 * unprovable); R-SYNONYM a word of the same reading built on no named stem (unconfirmed, falsified, certified, attested, untrusted,
 * disputed); R-SPLIT a named word split inside by a visible or an invisible character; R-CONFUSABLE a letter of another script
 * standing for a Latin one; R-ENCODED a named word written through an encoding or a transformation (a percent escape, a backslash
 * escape, base64, reversed); R-ADMISSION-CASE an admission status, or the filing's "failed", in neither upper case nor capitalized
 * (Pi's own and the SDK's lowercase vocabulary holds unknown, failure and the four -failed kinds, so those forms are not read);
 * R-UNSERIALIZED a member a serialization does not show (non-enumerable, or symbol-keyed) is not in the whole-output text (identical
 * sees both, so K1 (a), R1, R2's payload control and P1 compare them); for R2's tracer, R-UNTRAPPED a read through a channel no proxy
 * trap observes (util.inspect reads a proxy's target directly) that leaves both outputs unchanged; R-PROXY-AWARE a reader that tells
 * a traced reading from a plain one (util.types.isProxy, or a structured clone, which reads every member of a plain reading and
 * refuses a proxy) and reads the member only when untraced, its outputs unchanged. By K1 (a) no K3 value, and by R1 no planted
 * status, moves either output on those cells today, so a K1 residual reaches an output only as the readers' own making, alike on
 * every reading of its cell (P1 freezes five field-less readings whole).
 * THE CELLS of R1, R2, A1, A2, K1, L1 and L2: every kind under each licence in each of two document shapes (SHAPES), read through
 * the real registration, each carrying one producer diagnostic, a result coverage, one incomplete region and an empty cost so every
 * open-value placement exists: 'narrow' (one row, none on complete-empty; rows retained; one certificate; the plain host context)
 * and 'wide' (no row, from a stream that did not retain rows; three certificates; the host context naming the invoking node call).
 * The rows claim nothing about a reading of another shape.
 * T1, T2, T3, R1, R2 and L2 state the vendored SDK 0.1.0 and today's adapter and move with the landing (each names this bead's
 * on-landing leg); A1, A2, K1, L1, P1 and Q hold before and after it. NOT ARMED, by design: a status an SDK release carries only inside
 * an open producer value (T3's eleven open-value placements carry one verbatim today, among them the extensions sidecar, the
 * declaration's "Lossless sidecar of negotiated extension frames") changes no record, closed body or frame kind, so T1-T3 stay
 * green on it; R1 and R2 hold the adapter blind to it there, and reading it is the on-landing leg's.
 * Values: the filing's own words (verified, unverified, refuted, failed) and the explicit admission statuses of
 * 02-adoption-qa.md:4@694570cd00c2 ("explicit PASS/FAIL/UNKNOWN admission statuses"). Member spellings and placements are this
 * file's own illustrative literals, as every name of the program is illustrative (a scalar proof status, a proof confidence, a claim
 * status, and a list of 01:4's proposed Claims(receipt,predicate,snapshot,checker,status) records); no outside anchor holds them.
 * K1's named words, SPELLINGS and the residual exemplars are this file's own literals too; the K3 values are the SDK's (its types).
 * Display paths added: none (test-only). Pure: no HX binary, scratch directory, clock, network or file write; the only files read
 * are two installed SDK files, dist/result.d.ts (T1, K1) and dist/protocol/decoder.js (T2). */
import {readFileSync} from 'node:fs';
import {inspect, types} from 'node:util';
import {
  type Completeness, type Coverage, type CoverageSummary, decodeResultStream, type EvidenceSummary, type ExecutionStatus, evidenceOf,
  ProtocolError, type QueryResult, resultFromJson, resultToJson, SDK_REPRESENTATION, type Truth,
} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, type HyperUnixLiveVerdict, type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';

type Json = {[key: string]: JsonValue};
/** The runtime identity of the measured live read (test/workbench-hyperunix-observer.test.ts BINARY). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const WS = '/srv/hx-proof-status-ws';
const SCOPE = {workspace: WS, principal: 'local-operator:tester'};
const context: HyperUnixTopologyContext = {scope: SCOPE, target: {kind: 'hx.fs/regular-file', root: 'src'},
  capturedAt: '2026-10-19T01:46:52Z', observedAt: '2026-10-19T01:46:53Z'};
/** The P1 incomplete row names the invoking workflow node call, so the baseline also pins the grouping edge and the trace. */
const invokedContext: HyperUnixTopologyContext = {...context, invocationId: 'wf_hx_3ht2',
  operationRef: {provider: 'pi-workflow', type: 'node-call', id: 'wf_hx_3ht2:0'}};
const CAPABILITY_CONTEXT = {grants: ['hyperunix:read'], signal: new AbortController().signal};

/** The filing's own proof-status words, then the admission statuses 02-adoption-qa.md:4@694570cd00c2 names. */
const VALUES: readonly string[] = ['verified', 'unverified', 'refuted', 'failed', 'PASS', 'FAIL', 'UNKNOWN'];
/** "a refuted/failed proof status", with the admission status FAIL. */
const NEGATIVE: ReadonlySet<string> = new Set(['refuted', 'failed', 'FAIL']);
/** "a verified status", with the admission status PASS. */
const POSITIVE: ReadonlySet<string> = new Set(['verified', 'PASS']);
/** Spellings a proof status could take in a hyperunix.result/1 source. */
const MEMBERS = ['proof_status', 'proof_confidence', 'claim_status', 'claims'] as const;
type Member = (typeof MEMBERS)[number];
/** One step from a hyperunix.result/1 source toward a placement: an object member or a list index. */
type Step = string | number;
/** The nine typed-record placements: the provider's round trip rebuilds each from the SDK's own fields, so a member there is
 * dropped (T3). */
const TYPED_PLACEMENTS: readonly (readonly [string, readonly Step[]])[] = [
  ['result', []], ['execution-status', ['execution_status']], ['run-status', ['status']], ['coverage-summary', ['coverage_summary']],
  ['evidence', ['evidence']], ['certificate', ['coverage', 0]], ['diagnostic', ['diagnostics', 0]], ['transport', ['transport']],
  ['stream', ['status', 'streams', 0]],
];
/** The eleven open-value placements: the round trip keeps each producer value verbatim, so a member there survives it (T3). */
const OPEN_PLACEMENTS: readonly (readonly [string, readonly Step[]])[] = [
  ['certificate-body', ['coverage', 0, 'body']], ['certificate-cause', ['coverage', 0, 'cause']],
  ['certificate-scope', ['coverage', 0, 'scope']], ['certificate-target', ['coverage', 0, 'target']],
  ['result-coverage', ['coverage_summary', 'result_coverage']], ['incomplete-region', ['coverage_summary', 'incomplete_regions', 0]],
  ['diagnostic-details', ['diagnostics', 0, 'details']], ['diagnostic-extra', ['diagnostics', 0, 'extra']], ['cost', ['cost']],
  ['row', ['rows', 0]], ['extensions', ['extensions']],
];
const PLACEMENTS: readonly (readonly [string, readonly Step[]])[] = [...TYPED_PLACEMENTS, ...OPEN_PLACEMENTS];
const CARRIED: ReadonlySet<string> = new Set(OPEN_PLACEMENTS.map(([placement]) => placement));
const MUTATION_KINDS: ReadonlySet<string> = new Set(['mutation-rejected', 'mutation-partial']);
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION_KINDS.has(kind));
const LICENCES = [true, false] as const;
/** K1 (b)'s judge. The named proof-status stems, read in any case anywhere in a text, so a stem joined into an identifier, a path or a
 * value reads too; "prove" is not read inside the word provenance (the relations' own provenance member). */
const PROOF_STEM = /verif|refut|prove(?!nance)|proof|confiden/i;
/** The admission statuses of 02-adoption-qa.md:4, read anywhere in a text in upper case or capitalized, so an UPPER_SNAKE, camelCase
 * or PascalCase join reads too; their lowercase forms are Pi's own and the SDK's vocabulary (R-ADMISSION-CASE). */
const ADMISSION_STEM = /PASS|FAIL|UNKNOWN|Pass|Fail|Unknown/;
/** Whether a text holds a named word in a spelling K1's judge reads. */
const named = (text: string): boolean => PROOF_STEM.test(text) || ADMISSION_STEM.test(text);
/** The named words: the filing's and the program's proof-status words, and the admission statuses. */
const PROOF_WORDS = ['verified', 'unverified', 'refuted', 'proven', 'proof', 'confidence'] as const;
const ADMISSION_WORDS = ['PASS', 'FAIL', 'UNKNOWN'] as const;
const capitalized = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
/** The spelling forms K1's judge reads, each built on one named word: alone and in each case, joined to another word into an
 * identifier or a dotted path, and as a member name or a member value of serialized output. */
const SPELLINGS: readonly (readonly [string, (word: string) => string])[] = [
  ['word', word => word],
  ['upper case', word => word.toUpperCase()],
  ['capitalized', word => capitalized(word)],
  ['snake_case', word => `truth_${word}`],
  ['kebab-case', word => `truth-${word}`],
  ['camelCase', word => `truth${capitalized(word)}`],
  ['PascalCase', word => `Truth${capitalized(word)}`],
  ['UPPER_SNAKE', word => `TRUTH_${word.toUpperCase()}`],
  ['dotted', word => `truth.${word}`],
  ['run together', word => `truth${word}`],
  ['member name', word => JSON.stringify({[`truth${capitalized(word)}`]: true})],
  ['member value', word => JSON.stringify({truth: word})],
];
/** The SDK's K3 values: its Truth and Completeness types (dist/result.d.ts), pinned to them at type level in K1. */
const TRUTHS = ['known_present', 'known_absent', 'unknown'] as const;
const COMPLETENESSES = ['complete', 'incomplete', 'unknown'] as const;
/** Where a hyperunix.result/1 source carries a K3 value, as the SDK types one on a result: QueryResult.truth, CoverageSummary.completeness,
 * and the result-coverage body's completeness the summary's is read from (pinned against dist/result.d.ts in K1). */
type K3Place = 'truth' | 'completeness' | 'result-coverage';
/** One K3 reading: its place and its value. */
type K3 = readonly [K3Place, string];
const K3S: readonly K3[] = [...TRUTHS.map(value => ['truth', value] as const), ...COMPLETENESSES.map(value => ['completeness', value] as const),
  ...COMPLETENESSES.map(value => ['result-coverage', value] as const)];
/** K1's word residuals: each family's quiet pairs, an exemplar neither stem pattern reads beside its nearest form they read (Q). The
 * invisible and other-script characters are built from their code points. */
const WORD_RESIDUALS: readonly (readonly [string, readonly (readonly [string, string])[]])[] = [
  ['R-INFLECTED', [['proving', 'proven'], ['provable', 'proved'], ['unprovable', 'unproven']]],
  ['R-SYNONYM', [['unconfirmed', 'unverified'], ['falsified', 'refuted'], ['certified', 'verified'], ['attested', 'proven'],
    ['untrusted', 'unverified'], ['disputed', 'refuted']]],
  ['R-SPLIT', [['veri_fied', 'verified'], ['ref-uted', 'refuted'], ['pro of', 'proof'], [`confi${String.fromCodePoint(0x200b)}dence`, 'confidence']]],
  ['R-CONFUSABLE', [[`v${String.fromCodePoint(0x435)}rified`, 'verified'], [`pr${String.fromCodePoint(0x43e)}of`, 'proof']]],
  ['R-ENCODED', [['%76erified', 'verified'], ['\\u0076erified', 'verified'], [Buffer.from('unverified').toString('base64'), 'unverified'],
    [[...'unverified'].reverse().join(''), 'unverified']]],
  ['R-ADMISSION-CASE', [['truth_unknown', 'TRUTH_UNKNOWN'], ['admission-pass', 'admissionPass'], ['status.fail', 'statusFail'],
    ['failed', 'Failed'], ['pASS', 'PASS'], ['UnKnOwN', 'Unknown']]],
  ['R-UNSERIALIZED', [[JSON.stringify(Object.defineProperty({}, 'truthUnverified', {value: true})), JSON.stringify({truthUnverified: true})],
    [JSON.stringify({[Symbol('truthUnverified')]: true}), JSON.stringify({truthUnverified: true})]]],
];
/** R2's residuals: the channels each family names, each reading or detecting a traced reading with no trap the tracer records (Q). */
const TRAP_RESIDUALS: readonly (readonly [string, readonly string[]])[] = [
  ['R-UNTRAPPED', ['util.inspect']],
  ['R-PROXY-AWARE', ['util.types.isProxy', 'structuredClone']],
];
const TRIGGER = 'wb-3ht.2 trigger: the vendored @hyperunix/sdk result or the adapter now carries a claim or proof-confidence status; build '
  + 'the on-landing leg (the status verbatim, sanitized, as its own facet; A1, A2, K1, L1 and P1 unchanged) before re-pinning this';

/** Today's members of the SDK result records, in declaration order (dist/result.d.ts). */
const RESULT_MEMBERS = ['operation', 'rows', 'rowsRetained', 'coverage', 'coverageSummary', 'status', 'terminal', 'truth', 'diagnostics',
  'view', 'evidence', 'queryDigest', 'digestSource', 'executionId', 'actualCost', 'budgetDimension', 'extensions', 'transport',
  'workspaceRoot', 'streams'] as const;
/** StatusBase's members, then the variants' own (the kind of every variant, the dimension of budget-exhausted). */
const STATUS_MEMBERS = ['exitCode', 'signal', 'terminalReached', 'framesTotal', 'diagnosticCode', 'kind', 'dimension'] as const;
const SUMMARY_MEMBERS = ['certificates', 'modes', 'completeness', 'licensesAbsence', 'certificatesLicenseAbsence', 'incompleteRegions',
  'resultCoverage', 'answerCount'] as const;
const COVERAGE_MEMBERS = ['mode', 'cause', 'scope', 'target', 'provider', 'stream', 'batchId', 'body'] as const;
const EVIDENCE_MEMBERS = ['supportIds', 'evidenceClasses', 'derivationHandles', 'providers', 'providerVersions'] as const;
/** Every member name across the variants of a union. */
type Members<T> = T extends unknown ? keyof T : never;

const json = (value: unknown): JsonValue => JSON.parse(JSON.stringify(value)) as JsonValue;
function asRecord(value: JsonValue | undefined): Json {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected a JSON object');
  return value;
}
/** The object at a path from a source, or undefined when a step is missing or lands on no object (a 0-row reading has no row). */
function holderAt(source: JsonValue, path: readonly Step[]): Json | undefined {
  let node: JsonValue | undefined = source;
  for (const step of path) {
    if (typeof step === 'number') node = Array.isArray(node) ? node[step] : undefined;
    else node = node !== null && node !== undefined && typeof node === 'object' && !Array.isArray(node) ? node[step] : undefined;
  }
  return node !== null && node !== undefined && typeof node === 'object' && !Array.isArray(node) ? node : undefined;
}
/** A copy of node with the member set on the object at path, copying only the objects and lists along that path. */
function plantedAt(node: JsonValue, path: readonly Step[], member: string, memberValue: JsonValue): JsonValue {
  const [step, ...rest] = path;
  if (step === undefined) return {...asRecord(node), [member]: memberValue};
  if (typeof step === 'number') {
    if (!Array.isArray(node) || node[step] === undefined) throw new Error(`no element ${step} on the path`);
    return node.map((item, index) => (index === step ? plantedAt(item, rest, member, memberValue) : item));
  }
  const record = asRecord(node);
  const child = record[step];
  if (child === undefined) throw new Error(`no ${step} on the path`);
  return {...record, [step]: plantedAt(child, rest, member, memberValue)};
}
/** Freezes a tree in place, so variants that share its untouched branches can never see a reader write into them. */
function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    const children: unknown[] = Object.values(value);
    for (const child of children) deepFreeze(child);
  }
  return value;
}
/** A member's value: the status itself, or one proposed Claims record (01:4) carrying it. */
const memberValue = (member: string, value: string): JsonValue => member === 'claims'
  ? [{receipt: 'receipt-1', predicate: 'predicate-1', snapshot: 'snapshot-1', checker: 'checker-1', status: value}] : value;
/** One proof-shaped variant of a provider output: the member planted in its source. */
interface Variant {
  readonly label: string;
  readonly member: Member;
  readonly value: string;
  readonly reading: JsonValue;
}
/** Every placement the reading holds, under every member spelling and value, one at a time (each variant copies only its path). */
function* variantsOf(reading: JsonValue): Generator<Variant> {
  const top = asRecord(reading);
  const source = asRecord(top.source);
  for (const [placement, path] of PLACEMENTS) {
    if (holderAt(source, path) === undefined) continue;
    for (const member of MEMBERS) {
      for (const value of VALUES) {
        yield {label: `${placement} ${member} ${value}`, member, value,
          reading: {...top, source: plantedAt(source, path, member, memberValue(member, value))}};
      }
    }
  }
}
/** A copy of a hyperunix.result/1 source (or document) carrying one K3 value, copying only the objects along its path. */
function withK3(source: Json, [place, value]: K3): Json {
  if (place === 'truth') return {...source, truth: value};
  const summary = asRecord(source.coverage_summary);
  return {...source, coverage_summary: place === 'completeness' ? {...summary, completeness: value}
    : {...summary, result_coverage: {...asRecord(summary.result_coverage), completeness: value}}};
}
/** A provider output whose source carries one K3 value. */
function k3Reading(reading: JsonValue, k3: K3): JsonValue {
  const top = asRecord(reading);
  return {...top, source: withK3(asRecord(top.source), k3)};
}
/** The value a provider output's source carries where a K3 reading sets one. */
function k3Value(reading: JsonValue, [place]: K3): JsonValue | undefined {
  const source = asRecord(asRecord(reading).source);
  if (place === 'truth') return source.truth;
  const summary = asRecord(source.coverage_summary);
  return place === 'completeness' ? summary.completeness : asRecord(summary.result_coverage).completeness;
}
/** Every member dist/result.d.ts types as a K3 value, named by the declaration that holds it. */
function declaredK3(declaration: string): string[] {
  const found: string[] = [];
  let owner = '';
  for (const line of declaration.split('\n')) {
    const opening = /^(?:export )?(?:declare )?(?:interface|type) (\w+)/.exec(line);
    if (opening !== null) owner = opening[1];
    const member = /^\s+readonly (\w+)\??: (?:Truth|Completeness)\b/.exec(line);
    if (member !== null) found.push(`${owner}.${member[1]}`);
  }
  return found;
}
/** Whether two trees are one tree member by member: the same primitives (Object.is); plain objects or lists alike (any other object,
 * whose state its own keys need not show, is never called identical); and the same own members (Reflect.ownKeys, so an
 * undefined-valued member, a symbol-keyed one and a non-enumerable one, which toStrictEqual does not see, all count; key order does
 * not, as for toStrictEqual), each a data member of the same enumerability holding an identical value. */
function identical(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (typeof left !== 'object' || typeof right !== 'object' || left === null || right === null) return false;
  const prototype: unknown = Object.getPrototypeOf(left);
  if (prototype !== Object.getPrototypeOf(right) || prototype !== Object.prototype && prototype !== Array.prototype) return false;
  const keys = Reflect.ownKeys(left);
  return keys.length === Reflect.ownKeys(right).length && keys.every(key => {
    const mine = Object.getOwnPropertyDescriptor(left, key);
    const theirs = Object.getOwnPropertyDescriptor(right, key);
    if (mine === undefined || theirs === undefined || !('value' in mine) || !('value' in theirs) || mine.enumerable !== theirs.enumerable) return false;
    const value: unknown = mine.value;
    return identical(value, theirs.value);
  });
}
/** The arbiter wherever this file claims exactly the same outputs (R1, R2's payload control, K1 (a), P1): the two trees are identical;
 * a pair that is not goes to toStrictEqual first, so a difference it sees is printed, and then fails on identical. It returns the 1
 * its loop counts, so a comparison deleted from a loop reds that loop's count. */
function expectIdentical(actual: unknown, expected: unknown, label: string): 1 {
  if (!identical(actual, expected)) {
    expect(actual, label).toStrictEqual(expected);
    expect(identical(actual, expected), `${label} (a difference toStrictEqual does not see)`).toBe(true);
  }
  return 1;
}
/** K1 (b)'s judgement of one reading's texts: each text named reads is recorded in minted under the label, with the word read. It
 * returns the 1 its loop counts, so a judgement deleted from a loop reds that loop's count. */
function judgeTexts(texts: readonly string[], label: string, minted: string[]): 1 {
  for (const text of texts) if (named(text)) minted.push(`${label}: ${(PROOF_STEM.exec(text) ?? ADMISSION_STEM.exec(text))?.[0]}`);
  return 1;
}
/** Wraps a JSON tree so every get, in check or descriptor read of the given member, and every listing of the own keys of an object
 * that holds it, anywhere in the tree, lands in reads (R2). */
function traced(value: JsonValue, member: string, reads: string[]): JsonValue {
  if (typeof value !== 'object' || value === null) return value;
  return new Proxy(value, {
    get(target, key, receiver) {
      if (key === member) reads.push('get');
      const item: unknown = Reflect.get(target, key, receiver);
      return typeof key === 'string' && Object.hasOwn(target, key) ? traced(item as JsonValue, member, reads) : item;
    },
    has(target, key) {
      if (key === member) reads.push('in');
      return Reflect.has(target, key);
    },
    getOwnPropertyDescriptor(target, key) {
      if (key === member) reads.push('descriptor');
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      return descriptor !== undefined && 'value' in descriptor && typeof key === 'string'
        ? {...descriptor, value: traced(descriptor.value as JsonValue, member, reads)} : descriptor;
    },
    ownKeys(target) {
      if (Object.hasOwn(target, member)) reads.push('keys');
      return Reflect.ownKeys(target);
    },
  });
}

/** The two document shapes every matrix cell is read in, each through the real registration and in its own host context. 'narrow':
 * one row (none on complete-empty, which the SDK reads only for zero node-claims), rows retained, one opportunistic certificate, the
 * plain host context. 'wide': no row, from a stream that did not retain rows, three opportunistic certificates, and the host context
 * that names the invoking workflow node call (so its outputs carry the grouping edge and the trace). */
const SHAPES = ['narrow', 'wide'] as const;
type Shape = (typeof SHAPES)[number];
const rowsOf = (kind: string, shape: Shape): number => (shape === 'narrow' && kind !== 'complete-empty' ? 1 : 0);
/** The variants one cell yields: every placement but the row on a 0-row cell. */
const variantCount = (kind: string, shape: Shape, values: number): number =>
  (PLACEMENTS.length - (rowsOf(kind, shape) === 0 ? 1 : 0)) * MEMBERS.length * values;

/** One coverage certificate in the SDK's JSON representation, shaped as the measured live read certified its batches. */
const certificate = (batch_id: string, mode: string): Json => ({mode, cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode}});
/** A hyperunix.result/1 document with no row, certificate, view, listed provider, diagnostic, incomplete region or proof status. */
function sdkDocument(overrides: Json = {}): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [],
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind: 'incomplete', diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-19T01:46:51.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 300, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: [], completeness: null, licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: null},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides};
}
/** The one producer diagnostic every cell carries, so the diagnostic placements exist. */
const DIAGNOSTIC: Json = {code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'coverage incomplete', details: {}, remediation: null,
  request: null, origin: 'hxs', stream: 'hx-fs', extra: {}};
/** One kind under one licence in one shape (SHAPES), the cell every matrix row varies; every open-value placement exists in it. */
const cellDocument = (kind: string, licensed: boolean, shape: Shape = 'narrow'): Json => sdkDocument({
  execution_status: {kind, diagnostic_code: null}, rows: rowsOf(kind, shape) === 1 ? [{path: 'src/index.ts'}] : [],
  rows_retained: shape === 'narrow', coverage: (shape === 'narrow' ? ['b1'] : ['b1', 'b2', 'b3']).map(id => certificate(id, 'opportunistic')),
  diagnostics: [DIAGNOSTIC], cost: {},
  coverage_summary: {modes: ['opportunistic'], completeness: null, licenses_absence: licensed, certificates_license_absence: false,
    incomplete_regions: [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}], result_coverage: {completeness: 'incomplete'},
    answer_count: null}});
/** What the registered hyperunix.find capability returns for a document: the real registration, invoked through the registry. */
async function provided(document: Json): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, CAPABILITY_CONTEXT);
}
/** One matrix cell: a kind under a licence in a shape, its document, the host context it is read in and the provider output. */
interface Cell {
  readonly label: string;
  readonly kind: string;
  readonly shape: Shape;
  readonly host: HyperUnixTopologyContext;
  readonly document: Json;
  readonly reading: JsonValue;
}
/** Every given kind under each licence in each shape, read through the real registration; each output is frozen, since every
 * variant shares its untouched branches. */
async function cellsOf(kinds: readonly string[]): Promise<Cell[]> {
  const cells: Cell[] = [];
  for (const shape of SHAPES) {
    for (const kind of kinds) {
      for (const licensed of LICENCES) {
        const document = cellDocument(kind, licensed, shape);
        cells.push({label: `${shape} ${kind} ${licensed}`, kind, shape, host: shape === 'narrow' ? context : invokedContext, document,
          reading: deepFreeze(await provided(document))});
      }
    }
  }
  return cells;
}

function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected a refusal');
}
/** Everything the adapter and the live invariant make of one reading: the projection (or its refusal) and the verdict. */
interface Outputs {
  readonly projection: HyperUnixProjectionTopology | {readonly refused: string};
  readonly verdict: HyperUnixLiveVerdict;
}
function outputsOf(reading: JsonValue, host: HyperUnixTopologyContext = context): Outputs {
  let projection: Outputs['projection'];
  try { projection = hyperunixTopology(reading, host); } catch (error) { projection = {refused: (error as Error).message}; }
  return {projection, verdict: hxLiveInvariant(reading)};
}
/** The reading's coverage, tone, status text and licensed absence, or the refusal of a mutation outcome. */
interface Axis {
  readonly refused?: string;
  readonly coverage?: string;
  readonly statusTone?: string;
  readonly statusText?: string;
  readonly absenceLicensed: boolean;
}
function axisOf(reading: JsonValue, host: HyperUnixTopologyContext = context): Axis {
  const {absenceLicensed} = hxLiveInvariant(reading);
  try {
    const [snapshot] = hyperunixTopology(reading, host).snapshots;
    return {coverage: snapshot.coverage, statusTone: snapshot.node.statusTone, statusText: snapshot.node.statusText, absenceLicensed};
  } catch (error) {
    return {refused: (error as Error).message, absenceLicensed};
  }
}
/** Pi's own texts in one reading's outputs: every text the adapter composes, or the refusal it raises. */
function ownText({projection}: Outputs): string[] {
  if ('refused' in projection) return [projection.refused];
  const [snapshot] = projection.snapshots;
  return [snapshot.coverage ?? '', snapshot.node.statusTone, snapshot.node.statusText, snapshot.node.title, snapshot.node.type, ...projection.diagnostics];
}
/** The whole of one reading's outputs as K1 judges it: the projection (or its refusal) and the live verdict serialized, member names
 * included, with the fixture's workspace path WS cut out (the host's own identity, which the projection repeats in its scope and in
 * an incomplete-region facet, and whose "proof" PROOF_STEM would read). */
const wholeText = (outputs: Outputs): string => JSON.stringify(outputs).replaceAll(WS, '');
/** The member names of one declaration block of dist/result.d.ts, from its opening line to its closing brace. */
function declaredMembers(declaration: string, opening: string, closing = '\n}'): string[] {
  const start = declaration.indexOf(opening);
  if (start < 0) throw new Error(`the declaration has no ${opening}`);
  const block = declaration.slice(start, declaration.indexOf(closing, start));
  return [...new Set([...block.matchAll(/^\s+readonly (\w+)\??:/gm)].map(match => match[1]))];
}

/** One HXS line on stream hx-fs; an observation payload frame carries its batch id. */
const frameLine = (seq: number, kind: string, body: Json, batch?: string): string =>
  JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq, kind, body, ...(batch === undefined ? {} : {batch_id: batch})});
/** The header under its mode, the one frame under test (inside batch b1 when it is an observation payload) and the end frame. */
function streamOf(mode: 'observation' | 'results', kind: string, body: Json, batched: boolean): string {
  const header = frameLine(0, 'header', {mode, schema_requirements: []});
  const rest = batched
    ? [frameLine(1, 'observation-begin', {}, 'b1'), frameLine(2, kind, body, 'b1'), frameLine(3, 'observation-end', {}, 'b1'), frameLine(4, 'end', {})]
    : [frameLine(1, kind, body), frameLine(2, 'end', {})];
  return [header, ...rest].join('\n');
}
const SUPPORT: Json = {id: 's1', provider: {$id: 'hx.fs/builtin'}, provider_version: '0.1.0', status: 'observed', view: {$id: 'view-1'}};
const supportStream = (extra: Json): string => streamOf('observation', 'support', {...SUPPORT, ...extra}, true);
const NODE_CLAIM: Json = {element: {$id: 'n1'}, identities: [], kinds: [], locators: [], attributes: [], supports: []};
const nodeClaimStream = (extra: Json): string => streamOf('observation', 'node-claim', {...NODE_CLAIM, ...extra}, true);
/** An answer frame names an earlier node claim by its seq, so its stream carries one batch with that claim first, and the answer
 * projection closes with its answer-coverage (ordered, count 1). */
const answerStream = (extra: Json): string => [frameLine(0, 'header', {mode: 'observation', schema_requirements: []}),
  frameLine(1, 'observation-begin', {}, 'b1'), frameLine(2, 'node-claim', NODE_CLAIM, 'b1'), frameLine(3, 'observation-end', {}, 'b1'),
  frameLine(4, 'answer', {ref: {$int: '2'}, supports: [], ordinal: {$int: '1'}, ...extra}),
  frameLine(5, 'answer-coverage', {count: {$int: '1'}, ordered: true, completeness: 'complete', incomplete_regions: [], certificates: []}),
  frameLine(6, 'end', {})].join('\n');
/** Every closed core body the shipped decoder declares, each as a decodable stream extended by the given members. */
const CLOSED_BODIES: readonly (readonly [string, (extra: Json) => string])[] = [
  ['support', supportStream],
  ['derivation', extra => streamOf('observation', 'derivation', {id: 'd1', rule: 'rule-1', inputs: [], ...extra}, true)],
  ['node-claim', nodeClaimStream],
  ['edge-claim', extra => streamOf('observation', 'edge-claim', {element: {$id: 'e1'}, relation: 'contains', identity: [], scope: [], incidences: [],
    attributes: [], supports: [], ...extra}, true)],
  ['kind-claim', extra => streamOf('observation', 'kind-claim', {element: {$id: 'n1'}, kind: 'hx.fs/regular-file', supports: [], ...extra}, true)],
  ['attribute-claim', extra => streamOf('observation', 'attribute-claim', {element: {$id: 'n1'}, attribute: 'size', value: 'v', supports: [], ...extra}, true)],
  ['coverage', extra => streamOf('observation', 'coverage', {target: {target: 'relation-expansion'}, scope: {scope: 'fs-subtree', path: []},
    mode: 'complete-within-scope', provider: {$id: 'hx.fs/builtin'}, cause: {cause: 'other', detail: 'No_change_exclusion'}, ...extra}, true)],
  ['header', extra => [frameLine(0, 'header', {mode: 'observation', schema_requirements: [], ...extra}), frameLine(1, 'end', {})].join('\n')],
  ['result-coverage', extra => streamOf('results', 'result-coverage', {completeness: 'complete', incomplete_regions: [], certificates: [], ...extra}, false)],
  ['answer', answerStream],
  ['answer-coverage', extra => streamOf('observation', 'answer-coverage', {count: {$int: '0'}, ordered: true, completeness: 'complete',
    incomplete_regions: [], certificates: [], ...extra}, false)],
];
/** The kinds whose body must be empty, each as a decodable stream whose body of that kind carries the given members. */
const EMPTY_BODIES: readonly (readonly [string, (extra: Json) => string])[] = [
  ['end', extra => [frameLine(0, 'header', {mode: 'observation', schema_requirements: []}), frameLine(1, 'end', extra)].join('\n')],
  ['observation-begin', extra => [frameLine(0, 'header', {mode: 'observation', schema_requirements: []}), frameLine(1, 'observation-begin', extra, 'b1'),
    frameLine(2, 'observation-end', {}, 'b1'), frameLine(3, 'end', {})].join('\n')],
  ['observation-end', extra => [frameLine(0, 'header', {mode: 'observation', schema_requirements: []}), frameLine(1, 'observation-begin', {}, 'b1'),
    frameLine(2, 'observation-end', extra, 'b1'), frameLine(3, 'end', {})].join('\n')],
];
/** The empty-body kinds the shipped decoder text declares (EMPTY_BODY_KINDS). */
function declaredEmptyBodies(decoder: string): string[] {
  const match = decoder.match(/^const EMPTY_BODY_KINDS = new Set\(\[([^\]]*)\]\);$/m);
  if (match === null) throw new Error('the decoder has no EMPTY_BODY_KINDS');
  return [...match[1].matchAll(/"([^"]+)"/g)].map(found => found[1]);
}
/** The closed core bodies the shipped decoder text declares: its OBSERVATION_FIELDS records, then its <BODY>_KEYS sets by body name. */
function declaredClosedBodies(decoder: string): string[] {
  const start = decoder.indexOf('const OBSERVATION_FIELDS = Object.freeze({');
  if (start < 0) throw new Error('the decoder has no OBSERVATION_FIELDS');
  const block = decoder.slice(start, decoder.indexOf('\n});', start));
  const observed = [...block.matchAll(/^\s+'?([a-z-]+)'?: \[/gm)].map(match => match[1]);
  const keyed = [...decoder.matchAll(/^const ([A-Z_]+)_KEYS = new Set\(/gm)].map(match => match[1].toLowerCase().replaceAll('_', '-'));
  return [...observed, ...keyed];
}
/** Frame kinds a proof status could travel as, each read under an observation and a results header. */
const PROOF_KINDS = ['proof-status', 'claim-status', 'claims'] as const;
const MODES = ['observation', 'results'] as const;

/** The pre-landing snapshot (P1): five field-less results, the context each is read in, and exactly what today's adapter and live
 * invariant make of them through the real registration. */
interface BaselineRow {
  readonly name: string;
  readonly document: Json;
  readonly context: HyperUnixTopologyContext;
  readonly topology: HyperUnixProjectionTopology;
  readonly verdict: HyperUnixLiveVerdict;
}
const LICENSED_SUMMARY: Json = {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: true,
  certificates_license_absence: true, incomplete_regions: [], result_coverage: null, answer_count: 0};
const BINARY_REF = `hx-binary:sha256:${BINARY}`;
const DERIVED = 'query id is a derived digest, not a native identifier: HX find hx.fs/regular-file src';
const snapshotOf = (id: string, coverage: 'complete' | 'partial' | 'unknown', statusText: string,
  statusTone: 'success' | 'unknown' | 'failure', evidenceRefs: readonly string[]) => ({
  source: {provider: 'hyperunix', type: 'query', id, scope: WS}, scope: {workspace: WS, principal: 'local-operator:tester'},
  capturedAt: '2026-10-19T01:46:52Z', observedAt: '2026-10-19T01:46:53Z', coverage,
  node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation' as const, statusText, statusTone}, kind: 'hyperunix.query.snapshot',
  sourceVersion: '0.1.0', evidenceRefs: [...evidenceRefs]});
const BASELINE: readonly BaselineRow[] = [
  {name: 'runtime-licensed complete-empty',
    document: sdkDocument({execution_status: {kind: 'complete-empty', diagnostic_code: null}, coverage: [certificate('b1', 'complete-within-scope')],
      coverage_summary: LICENSED_SUMMARY}),
    context,
    topology: {snapshots: [snapshotOf('d9d97b771f27b96d937d0117655b100ec79d36208b579fc39fa03a3bb4e1fd6f', 'complete',
      'known-empty (runtime-licensed) · rows 0', 'success', [BINARY_REF, 'hx-coverage:b1'])],
    relations: [], diagnostics: [DERIVED, 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: true, versionClass: 'unstamped'}},
  {name: 'complete with two rows, without the licence',
    document: sdkDocument({execution_status: {kind: 'complete', diagnostic_code: null}, rows: [{path: 'src/a.ts'}, {path: 'src/b.ts'}],
      coverage: [certificate('b1', 'opportunistic')], coverage_summary: {...LICENSED_SUMMARY, modes: ['opportunistic'], licenses_absence: false,
        certificates_license_absence: false, answer_count: 2}}),
    context,
    topology: {snapshots: [snapshotOf('d9d97b771f27b96d937d0117655b100ec79d36208b579fc39fa03a3bb4e1fd6f', 'partial',
      'complete · rows 2 · absence not licensed', 'unknown', [BINARY_REF, 'hx-coverage:b1'])],
    relations: [], diagnostics: [DERIVED, 'no native interval supplied', 'runtime did not license absence']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'}},
  {name: 'incomplete read with two certificates, named by its invoking node call',
    document: sdkDocument({execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'}, rows: [{path: 'src/index.ts'}],
      coverage: [certificate('b1', 'opportunistic'), certificate('b2', 'opportunistic')],
      coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
        incomplete_regions: [], result_coverage: null, answer_count: 1}}),
    context: invokedContext,
    topology: {snapshots: [{...snapshotOf('75681f2ebb106898dd91671426356ad6b451b8a7ef2c93f12689d99613c01bc0', 'partial',
      'incomplete · rows 1 · absence not licensed', 'unknown', [BINARY_REF, 'hx-coverage:b1', 'hx-coverage:b2']), trace: {invocationId: 'wf_hx_3ht2'}}],
    relations: [{scope: {workspace: WS, principal: 'local-operator:tester'}, from: {provider: 'pi-workflow', type: 'node-call', id: 'wf_hx_3ht2:0'},
      to: {provider: 'hyperunix', type: 'query', id: '75681f2ebb106898dd91671426356ad6b451b8a7ef2c93f12689d99613c01bc0', scope: WS}, kind: 'grouping',
      provenance: {source: 'hyperunix', observedAt: '2026-10-19T01:46:53Z'}}],
    diagnostics: [DERIVED, 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'}},
  {name: 'cancelled with a contradicting licence, rows not retained',
    document: sdkDocument({execution_status: {kind: 'cancelled', diagnostic_code: null}, rows_retained: false,
      coverage_summary: {...LICENSED_SUMMARY, completeness: null, answer_count: null}}),
    context,
    topology: {snapshots: [snapshotOf('8bdec6bac8aa9a82f57f8a3f0b3dbd95282e6c0df342c9725cb4b101962fcaa1', 'partial',
      'cancelled · rows 0 · absence not licensed (rows not retained)', 'unknown', [BINARY_REF])],
    relations: [], diagnostics: [DERIVED, 'no native interval supplied',
      'runtime licensed absence on a cancelled result, which is not honoured: only a complete kind establishes absence']},
    verdict: {holds: false, violations: ['licence-without-complete-kind'], absenceLicensed: false, versionClass: 'unstamped'}},
  {name: 'usage-error',
    document: sdkDocument({execution_status: {kind: 'usage-error', diagnostic_code: null}}),
    context,
    topology: {snapshots: [snapshotOf('8bdec6bac8aa9a82f57f8a3f0b3dbd95282e6c0df342c9725cb4b101962fcaa1', 'unknown', 'usage-error', 'failure',
      [BINARY_REF])],
    relations: [], diagnostics: [DERIVED, 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'}},
];

describe('wb-3ht.2 standing leg: a claim or proof-confidence status is held off coverage, absence and tone until the SDK ships one', () => {
  it('T1: QueryResult, ExecutionStatus, CoverageSummary, Coverage and EvidenceSummary are exactly today\'s members, result.d.ts spells no proof, confidence, verified or refuted word, and the representation is hyperunix.result/1', () => {
    expectTypeOf<keyof QueryResult>().toEqualTypeOf<(typeof RESULT_MEMBERS)[number]>();
    expectTypeOf<Members<ExecutionStatus>>().toEqualTypeOf<(typeof STATUS_MEMBERS)[number]>();
    expectTypeOf<keyof CoverageSummary>().toEqualTypeOf<(typeof SUMMARY_MEMBERS)[number]>();
    expectTypeOf<keyof Coverage>().toEqualTypeOf<(typeof COVERAGE_MEMBERS)[number]>();
    expectTypeOf<keyof EvidenceSummary>().toEqualTypeOf<(typeof EVIDENCE_MEMBERS)[number]>();
    // The tsc-free witness of the same declarations, read from the installed SDK.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    expect(declaration.match(/proof|confidence|verif|refut/gi), TRIGGER).toBeNull();
    expect(declaredMembers(declaration, 'export interface QueryResult<'), TRIGGER).toStrictEqual([...RESULT_MEMBERS]);
    expect([...declaredMembers(declaration, 'interface StatusBase {'), ...declaredMembers(declaration, 'export type ExecutionStatus =', ';\nexport type')],
      TRIGGER).toStrictEqual([...STATUS_MEMBERS]);
    expect(declaredMembers(declaration, 'export interface CoverageSummary {'), TRIGGER).toStrictEqual([...SUMMARY_MEMBERS]);
    expect(declaredMembers(declaration, 'export interface Coverage {'), TRIGGER).toStrictEqual([...COVERAGE_MEMBERS]);
    expect(declaredMembers(declaration, 'export interface EvidenceSummary {'), TRIGGER).toStrictEqual([...EVIDENCE_MEMBERS]);
    expect(SDK_REPRESENTATION, TRIGGER).toBe('hyperunix.result/1');
  });

  it('T2: every closed core body and empty-body kind the shipped decoder declares refuses each proof-shaped member under each value, the three proof-named frame kinds are refused under each value, and the native support confidence decodes and is dropped', () => {
    // The bodies driven below are exactly the closed core bodies the shipped decoder declares, read from its own text.
    const decoder = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/protocol/decoder.js', import.meta.url), 'utf8');
    expect(CLOSED_BODIES.map(([body]) => body), TRIGGER).toStrictEqual(declaredClosedBodies(decoder));
    let refusals = 0;
    for (const [body, stream] of CLOSED_BODIES) {
      // The plain frame decodes, so each refusal below is the member, never a malformed fixture.
      expect(decodeResultStream(stream({})).frames.length, body).toBeGreaterThanOrEqual(2);
      for (const member of [...MEMBERS, 'confidence']) {
        // The support body's own confidence member is the native one, read below.
        if (body === 'support' && member === 'confidence') continue;
        for (const value of VALUES) {
          const error = thrown(() => decodeResultStream(stream({[member]: memberValue(member, value)})));
          expect(error, `${TRIGGER} (${body} ${member} ${value})`).toBeInstanceOf(ProtocolError);
          expect(error, `${TRIGGER} (${body} ${member} ${value})`).toMatchObject({code: 'SDK_PROTOCOL_MALFORMED', path: `body.${member}`});
          refusals++;
        }
      }
    }
    expect(refusals).toBe((CLOSED_BODIES.length * (MEMBERS.length + 1) - 1) * VALUES.length);
    // Each kind whose body must be empty refuses a body carrying one, at the body itself.
    expect(EMPTY_BODIES.map(([kind]) => kind), TRIGGER).toStrictEqual(declaredEmptyBodies(decoder));
    let emptied = 0;
    for (const [kind, stream] of EMPTY_BODIES) {
      expect(decodeResultStream(stream({})).frames.length, kind).toBeGreaterThanOrEqual(2);
      for (const member of [...MEMBERS, 'confidence']) {
        for (const value of VALUES) {
          const error = thrown(() => decodeResultStream(stream({[member]: memberValue(member, value)})));
          expect(error, `${TRIGGER} (${kind} ${member} ${value})`).toBeInstanceOf(ProtocolError);
          expect(error, `${TRIGGER} (${kind} ${member} ${value})`).toMatchObject({code: 'SDK_PROTOCOL_MALFORMED', path: 'body'});
          emptied++;
        }
      }
    }
    expect(emptied).toBe(EMPTY_BODIES.length * (MEMBERS.length + 1) * VALUES.length);
    let kinds = 0;
    for (const kind of PROOF_KINDS) {
      for (const mode of MODES) {
        for (const value of VALUES) {
          const error = thrown(() => decodeResultStream(streamOf(mode, kind, {status: value}, mode === 'observation')));
          expect(error, `${TRIGGER} (${kind} under ${mode}, ${value})`).toBeInstanceOf(ProtocolError);
          expect(error, `${TRIGGER} (${kind} under ${mode}, ${value})`).toMatchObject({code: 'SDK_PROTOCOL_INCOMPATIBLE', path: 'kind'});
          kinds++;
        }
      }
    }
    expect(kinds).toBe(PROOF_KINDS.length * MODES.length * VALUES.length);
    // The one confidence the protocol carries today decodes, and the evidence summary is the one the same support gets without it.
    const plain = evidenceOf(decodeResultStream(supportStream({})).frames);
    expect(plain).toMatchObject({supportIds: ['hx-fs/b1/s1'], evidenceClasses: ['observed']});
    for (const confidence of [{$float: '0x1.8p-1'}, ...VALUES]) {
      expect(evidenceOf(decodeResultStream(supportStream({confidence})).frames), TRIGGER).toStrictEqual(plain);
    }
    // A node claim's attribute list is open: a proof-named attribute decodes under each value, which is how a row can carry one on
    // the live path.
    for (const value of VALUES) {
      expect(decodeResultStream(nodeClaimStream({attributes: [{name: 'proof_status', value}]})).frames.length, value).toBe(5);
    }
  });

  it('T3: the provider\'s round trip drops a proof status at each of the nine typed-record placements and carries one verbatim at each of the eleven open-value placements', {timeout: 60_000}, () => {
    const document = cellDocument('incomplete', false);
    const bare = json(resultToJson(resultFromJson(document)));
    // Every placement exists in this document and in its round trip, so no cell below is vacuous.
    expect(PLACEMENTS.filter(([, path]) => holderAt(document, path) === undefined || holderAt(bare, path) === undefined)).toStrictEqual([]);
    expect([TYPED_PLACEMENTS.length, OPEN_PLACEMENTS.length]).toStrictEqual([9, 11]);
    let cells = 0;
    for (const [placement, path] of PLACEMENTS) {
      for (const member of MEMBERS) {
        for (const value of VALUES) {
          const rebuilt = json(resultToJson(resultFromJson(asRecord(plantedAt(document, path, member, memberValue(member, value))))));
          expect(rebuilt, `${TRIGGER} (${placement} ${member} ${value})`)
            .toStrictEqual(CARRIED.has(placement) ? plantedAt(bare, path, member, memberValue(member, value)) : bare);
          cells++;
        }
      }
    }
    expect(cells).toBe(PLACEMENTS.length * MEMBERS.length * VALUES.length);
  });

  it('R1: a proof status at any of the twenty placements, four spellings and seven values moves neither output on any cell here, and no consumed field names one', {timeout: 60_000}, async () => {
    const cells = await cellsOf(HYPERUNIX_EXECUTION_KINDS);
    expect(cells).toHaveLength(SHAPES.length * HYPERUNIX_EXECUTION_KINDS.length * LICENCES.length);
    // The wide shape is another reading, never a copy of the narrow one: its incomplete projection carries the grouping edge, the
    // trace, three certified batches and the retention note.
    const wide = cells.find(cell => cell.label === 'wide incomplete false');
    expect(wide === undefined ? undefined : outputsOf(wide.reading, wide.host).projection).toMatchObject({relations: [{kind: 'grouping'}],
      snapshots: [{trace: {invocationId: 'wf_hx_3ht2'}, evidenceRefs: [BINARY_REF, 'hx-coverage:b1', 'hx-coverage:b2', 'hx-coverage:b3'],
        node: {statusText: 'incomplete · rows 0 · absence not licensed (rows not retained)'}}]});
    let judged = 0;
    let expected = 0;
    for (const cell of cells) {
      const bare = outputsOf(cell.reading, cell.host);
      for (const variant of variantsOf(cell.reading)) {
        judged += expectIdentical(outputsOf(variant.reading, cell.host), bare, `${TRIGGER} (${cell.label} ${variant.label})`);
      }
      expected += variantCount(cell.kind, cell.shape, VALUES.length);
    }
    expect(judged).toBe(expected);
    expect(HYPERUNIX_CONSUMED_FIELDS.filter(field => /proof|confidence|claim/i.test(field.path)), TRIGGER).toStrictEqual([]);
  });

  it('R2: neither reader reads the planted member through a trap the tracer records: a tracing proxy over every variant reading here records no get, in check, descriptor read or own-key listing of it by the adapter or the live invariant, and the traced reading yields exactly the plain reading\'s outputs', {timeout: 60_000}, async () => {
    const cells = await cellsOf(HYPERUNIX_EXECUTION_KINDS);
    // The instrument's controls, one per leg, on the first variant (its member sits on the source itself): a full serialization lists
    // the holder's own keys, reads the member's descriptor and gets it, in that order, and an in check, a descriptor read and a key
    // listing on the holder are each recorded as exactly one read.
    const [control] = variantsOf(cells[0].reading);
    const holder = (reads: string[]): Json => asRecord(asRecord(traced(json(control.reading), control.member, reads)).source);
    const serialized: string[] = [];
    JSON.stringify(traced(json(control.reading), control.member, serialized));
    expect(serialized).toStrictEqual(['keys', 'descriptor', 'get']);
    const checked: string[] = [];
    expect(control.member in holder(checked)).toBe(true);
    expect(checked).toStrictEqual(['in']);
    const described: string[] = [];
    const descriptor = Object.getOwnPropertyDescriptor(holder(described), control.member);
    expect(descriptor?.value).toStrictEqual(memberValue(control.member, control.value));
    expect(described).toStrictEqual(['descriptor']);
    const listed: string[] = [];
    expect(Reflect.ownKeys(holder(listed))).toContain(control.member);
    expect(listed).toStrictEqual(['keys']);
    let judged = 0;
    let expected = 0;
    for (const cell of cells) {
      for (const variant of variantsOf(cell.reading)) {
        const reads: string[] = [];
        // A JSON copy: the cell's frozen branches cannot be wrapped (a proxy may not report another value for a frozen member).
        const outputs = outputsOf(traced(json(variant.reading), variant.member, reads), cell.host);
        expect(reads, `${TRIGGER} (${cell.label} ${variant.label})`).toStrictEqual([]);
        // The payload control: the readers' outputs on the traced reading are those on the plain one, so a reader whose traced
        // outputs differ (one that reads the source through a structured clone, which a proxy refuses) is never read as blind.
        const plain = outputsOf(variant.reading, cell.host);
        judged += expectIdentical(outputs, plain, `${TRIGGER} (${cell.label} ${variant.label}, traced)`);
      }
      expected += variantCount(cell.kind, cell.shape, VALUES.length);
    }
    expect(judged).toBe(expected);
  });

  it('A1: a proof status never moves coverage, absence or tone: on every kind, licence, shape and variant here the coverage, tone, status text and licence are the field-less reading\'s', {timeout: 60_000}, async () => {
    let judged = 0;
    let expected = 0;
    for (const cell of await cellsOf(HYPERUNIX_EXECUTION_KINDS)) {
      const bare = axisOf(cell.reading, cell.host);
      // A mutation outcome is refused and every read kind projects: the axis compared below is never an empty shape.
      expect(bare.refused !== undefined, cell.label).toBe(MUTATION_KINDS.has(cell.kind));
      for (const variant of variantsOf(cell.reading)) {
        expect(axisOf(variant.reading, cell.host), `${cell.label} ${variant.label}`).toStrictEqual(bare);
        judged++;
      }
      expected += variantCount(cell.kind, cell.shape, VALUES.length);
    }
    expect(judged).toBe(expected);
  });

  it('A2: on every cell here a refuted or failed status never flips tone to failure nor coverage to unknown, and a verified status never flips tone to success nor licenses absence', {timeout: 60_000}, async () => {
    const successes: string[] = [];
    const failures: string[] = [];
    let negatives = 0;
    let positives = 0;
    let expectedNegatives = 0;
    let expectedPositives = 0;
    for (const cell of await cellsOf(READ_KINDS)) {
      const bare = axisOf(cell.reading, cell.host);
      if (bare.statusTone === 'success') successes.push(cell.label);
      if (bare.statusTone === 'failure') failures.push(cell.label);
      for (const variant of variantsOf(cell.reading)) {
        const label = `${cell.label} ${variant.label}`;
        if (NEGATIVE.has(variant.value) && bare.statusTone !== 'failure') {
          const axis = axisOf(variant.reading, cell.host);
          expect(axis.statusTone, label).not.toBe('failure');
          expect(axis.coverage, label).not.toBe('unknown');
          negatives++;
        }
        if (POSITIVE.has(variant.value) && bare.statusTone !== 'success') {
          const axis = axisOf(variant.reading, cell.host);
          expect(axis.statusTone, label).not.toBe('success');
          expect(axis.coverage, label).not.toBe('complete');
          expect(axis.statusText, label).not.toContain('known-empty');
          expect(axis.absenceLicensed, label).toBe(false);
          positives++;
        }
      }
      if (bare.statusTone !== 'failure') expectedNegatives += variantCount(cell.kind, cell.shape, NEGATIVE.size);
      if (bare.statusTone !== 'success') expectedPositives += variantCount(cell.kind, cell.shape, POSITIVE.size);
    }
    // The controls, in each shape: the runtime-licensed complete readings are the one success, and the five failure kinds stay failures.
    expect(successes).toStrictEqual(SHAPES.flatMap(shape => [`${shape} complete true`, `${shape} complete-empty true`]));
    expect(failures).toStrictEqual(SHAPES.flatMap(shape => ['provider-failed', 'schema-failed', 'internal-failed', 'protocol-failed', 'usage-error']
      .flatMap(kind => [`${shape} ${kind} true`, `${shape} ${kind} false`])));
    expect(negatives).toBe(expectedNegatives);
    expect(positives).toBe(expectedPositives);
    expect(negatives).toBeGreaterThan(0);
    expect(positives).toBeGreaterThan(0);
  });

  it('K1: K3 unknown is never read as unverified or refuted: on every cell here no output moves with any of the SDK\'s K3 values at the three places a result carries one, on the field-less reading or beside any variant\'s planted status, and no named proof-status stem (any case) or upper-case or capitalized admission status is in either reader\'s whole output on a field-less or K3 reading, alone or joined into an identifier or a value (only the workspace path cut out, and "prove" not read inside provenance), nor in Pi\'s own texts on any variant', {timeout: 120_000}, async () => {
    // The K3 values are the SDK's own Truth and Completeness, at type level, and the places are where its declaration types one on a
    // result (the classifier's input is the one other member typed so); the summary's completeness is read from the result-coverage
    // body's, the third place.
    expectTypeOf<Truth>().toEqualTypeOf<(typeof TRUTHS)[number]>();
    expectTypeOf<Completeness>().toEqualTypeOf<(typeof COMPLETENESSES)[number]>();
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    expect(declaredK3(declaration)).toStrictEqual(['CoverageSummary.completeness', 'QueryResult.truth', 'ClassificationInput.completeness']);
    expect(K3S.map(([place, value]) => `${place} ${value}`)).toStrictEqual(['truth known_present', 'truth known_absent', 'truth unknown',
      'completeness complete', 'completeness incomplete', 'completeness unknown', 'result-coverage complete', 'result-coverage incomplete',
      'result-coverage unknown']);
    const cells = await cellsOf(HYPERUNIX_EXECUTION_KINDS);
    // The judge's controls: every named word is read in every spelling form; the one stem exclusion is needed (a bare "prove" reads
    // provenance) and takes nothing else.
    expect(SPELLINGS.map(([form]) => form)).toStrictEqual(['word', 'upper case', 'capitalized', 'snake_case', 'kebab-case', 'camelCase',
      'PascalCase', 'UPPER_SNAKE', 'dotted', 'run together', 'member name', 'member value']);
    const read: string[] = [];
    const labels: string[] = [];
    let spelled = 0;
    for (const word of [...PROOF_WORDS, ...ADMISSION_WORDS]) {
      for (const [form, spell] of SPELLINGS) {
        labels.push(`${word} ${form}`);
        spelled += judgeTexts([spell(word)], `${word} ${form}`, read);
      }
    }
    // Each spelling is read by the judgement the legs below use, exactly once.
    expect(read.map(entry => entry.slice(0, entry.indexOf(':')))).toStrictEqual(labels);
    expect(spelled).toBe((PROOF_WORDS.length + ADMISSION_WORDS.length) * SPELLINGS.length);
    expect('provenance').toMatch(/prove/i);
    expect(named('provenance')).toBe(false);
    expect(['proved', 'disproved', 'unproven', 'PROVEN', 'truthProven', 'proven_ance'].filter(text => !named(text))).toStrictEqual([]);
    // The whole-output text: it holds the live verdict and the projection's evidence references, its one cut, the fixture's
    // workspace path, is exactly what the uncut serialization of a field-less reading would otherwise be read for, and the cut takes
    // nothing else; the wide shape's text holds the relations' provenance member, the exclusion's one reading.
    const sample = outputsOf(cells[0].reading, cells[0].host);
    const uncut = JSON.stringify(sample);
    expect(uncut).toContain(WS);
    expect(named(uncut)).toBe(true);
    expect(wholeText(sample)).toBe(uncut.replaceAll(WS, ''));
    expect(named(wholeText(sample))).toBe(false);
    expect(wholeText(sample)).toContain('"versionClass":"unstamped"');
    expect(wholeText(sample)).toContain(`"evidenceRefs":["${BINARY_REF}"`);
    const words = [...PROOF_WORDS, ...ADMISSION_WORDS].join(' ');
    expect(wholeText({projection: {refused: `${WS} ${words}`}, verdict: sample.verdict})).toContain(`"refused":" ${words}"`);
    const wide = cells.find(cell => cell.label === 'wide incomplete false');
    expect(wide === undefined ? '' : wholeText(outputsOf(wide.reading, wide.host))).toContain('"provenance":{');
    // identical calls a tree one with its copy (and with its keys reordered, as toStrictEqual does) and never with a changed copy,
    // each change one toStrictEqual sees too; it also sees a non-enumerable member, which toStrictEqual does not, so expectIdentical
    // fails on one.
    const copy = asRecord(json(sample));
    const verdict = asRecord(copy.verdict);
    const violations = Array.isArray(verdict.violations) ? verdict.violations : [];
    const changes: readonly (readonly [string, unknown])[] = [
      ['a changed value', {...copy, verdict: {...verdict, holds: verdict.holds !== true}}],
      ['an added member', {...copy, verdict: {...verdict, truthUnverified: true}}],
      ['an added undefined-valued member', {...copy, verdict: {...verdict, truthUnverified: undefined}}],
      ['a removed member', {projection: copy.projection}],
      ['an added list element', {...copy, verdict: {...verdict, violations: [...violations, 'truth-unknown']}}],
      ['another prototype', Object.assign(Object.create(null), copy)],
      ['an added symbol-keyed member', {...copy, verdict: {...verdict, [Symbol('truthUnverified')]: true}}],
      ['a member made non-enumerable', {...copy, verdict: Object.defineProperty({...verdict}, 'holds', {value: verdict.holds, enumerable: false})}],
    ];
    expect(identical(sample, copy)).toBe(true);
    expect(expectIdentical(sample, copy, 'a copy')).toBe(1);
    for (const [label, changed] of changes) {
      expect(identical(sample, changed), label).toBe(false);
      expect(changed, label).not.toStrictEqual(sample);
    }
    const reordered = Object.fromEntries(Object.entries(copy).reverse());
    expect(Object.keys(reordered)).toStrictEqual([...Object.keys(copy)].reverse());
    expect(identical(sample, reordered)).toBe(true);
    const hidden = {...copy, verdict: Object.defineProperty({...verdict}, 'truthUnverified', {value: true})};
    expect(hidden).toStrictEqual(sample);
    expect(identical(sample, hidden)).toBe(false);
    expect(() => expectIdentical(hidden, sample, 'a non-enumerable member')).toThrow();
    // An object whose state its own keys do not show (a date) is never called identical, even to an equal one.
    expect(identical({at: new Date(0)}, {at: new Date(1)})).toBe(false);
    expect(identical({at: new Date(0)}, {at: new Date(0)})).toBe(false);
    // (a) No output moves with a K3 value: through the real registration on the field-less reading (its output is the cell's with
    // only that value set), then on every variant with the K3 value set beside the planted status.
    let registered = 0;
    let swept = 0;
    let carried = 0;
    let expectedSweep = 0;
    for (const cell of cells) {
      const bare = outputsOf(cell.reading, cell.host);
      for (const k3 of K3S) {
        const reading = await provided(withK3(cell.document, k3));
        registered += expectIdentical(reading, k3Reading(cell.reading, k3), `${cell.label} ${k3.join(' ')} (registration)`);
        registered += expectIdentical(outputsOf(reading, cell.host), bare, `${cell.label} ${k3.join(' ')}`);
      }
      for (const variant of variantsOf(cell.reading)) {
        const plain = outputsOf(variant.reading, cell.host);
        for (const k3 of K3S) {
          const reading = k3Reading(variant.reading, k3);
          const outputs = outputsOf(reading, cell.host);
          swept += expectIdentical(outputs, plain, `${cell.label} ${variant.label} ${k3.join(' ')}`);
          // The sweep's canary: the reading the readers got carries the K3 value.
          if (k3Value(reading, k3) === k3[1]) carried++;
        }
      }
      expectedSweep += variantCount(cell.kind, cell.shape, VALUES.length) * K3S.length;
    }
    expect(registered).toBe(cells.length * K3S.length * 2);
    expect(swept).toBe(expectedSweep);
    expect(carried).toBe(swept);
    // (b) No named word is minted: each cell's field-less reading and its nine K3 readings judged whole, and Pi's own texts on those
    // readings and on every variant.
    const minted: string[] = [];
    let wholes = 0;
    let owned = 0;
    let unknowns = 0;
    for (const cell of cells) {
      const readings: (readonly [string, JsonValue])[] = [['field-less', cell.reading],
        ...K3S.map(k3 => [k3.join(' '), k3Reading(cell.reading, k3)] as const)];
      for (const [label, value] of readings) {
        wholes += judgeTexts([wholeText(outputsOf(value, cell.host))], `${cell.label} ${label} (whole output)`, minted);
      }
      for (const variant of variantsOf(cell.reading)) readings.push([variant.label, variant.reading]);
      const axis = axisOf(cell.reading, cell.host);
      if (axis.coverage === 'unknown' || axis.statusTone === 'unknown') unknowns++;
      for (const [label, value] of readings) {
        owned += judgeTexts(ownText(outputsOf(value, cell.host)), `${cell.label} ${label}`, minted);
      }
    }
    expect(minted).toStrictEqual([]);
    // Every cell's field-less and nine K3 readings judged whole; Pi's own texts on those and on every variant; the unknown readings
    // are all but the licensed complete ones.
    expect(wholes).toBe(cells.length * (1 + K3S.length));
    expect(owned).toBe(cells.reduce((sum, cell) => sum + 1 + K3S.length + variantCount(cell.kind, cell.shape, VALUES.length), 0));
    expect(unknowns).toBe(SHAPES.length * (READ_KINDS.length * LICENCES.length - 2));
  });

  it('L1: the leak check the landing keeps: no output holds "verified":true on any cell or variant here', {timeout: 60_000}, async () => {
    const cells = await cellsOf(HYPERUNIX_EXECUTION_KINDS);
    let judged = 0;
    for (const cell of cells) {
      for (const variant of [{label: 'field-less', reading: cell.reading}, ...variantsOf(cell.reading)]) {
        expect(JSON.stringify(outputsOf(variant.reading, cell.host)), `${cell.label} ${variant.label}`).not.toContain('"verified":true');
        judged++;
      }
    }
    expect(judged).toBe(cells.reduce((sum, cell) => sum + 1 + variantCount(cell.kind, cell.shape, VALUES.length), 0));
  });

  it('L2: today no output holds the word verified at all, on any cell or variant here', {timeout: 60_000}, async () => {
    const cells = await cellsOf(HYPERUNIX_EXECUTION_KINDS);
    let judged = 0;
    for (const cell of cells) {
      for (const variant of [{label: 'field-less', reading: cell.reading}, ...variantsOf(cell.reading)]) {
        expect(JSON.stringify(outputsOf(variant.reading, cell.host)).match(/verified/gi), `${TRIGGER} (${cell.label} ${variant.label})`).toBeNull();
        judged++;
      }
    }
    expect(judged).toBe(cells.reduce((sum, cell) => sum + 1 + variantCount(cell.kind, cell.shape, VALUES.length), 0));
  });

  it('P1: the pre-landing snapshot: five field-less results through the real registration project exactly the frozen topology and verdict', async () => {
    expect(BASELINE.map(row => row.name)).toStrictEqual(['runtime-licensed complete-empty', 'complete with two rows, without the licence',
      'incomplete read with two certificates, named by its invoking node call', 'cancelled with a contradicting licence, rows not retained',
      'usage-error']);
    let pinned = 0;
    for (const row of BASELINE) {
      const reading = await provided(row.document);
      pinned += expectIdentical(hyperunixTopology(reading, row.context), row.topology, row.name);
      pinned += expectIdentical(hxLiveInvariant(reading), row.verdict, row.name);
    }
    expect(pinned).toBe(BASELINE.length * 2);
  });

  it('Q: the named residuals, each pinned by its quiet row: K1\'s judge reads no exemplar of its seven families and reads each one\'s nearest named form, and R2\'s tracer records nothing for the channels that read or detect a traced reading', async () => {
    expect([...WORD_RESIDUALS, ...TRAP_RESIDUALS].map(([id, members]) => `${id}:${members.length}`)).toStrictEqual(['R-INFLECTED:3',
      'R-SYNONYM:6', 'R-SPLIT:4', 'R-CONFUSABLE:2', 'R-ENCODED:4', 'R-ADMISSION-CASE:6', 'R-UNSERIALIZED:2', 'R-UNTRAPPED:1',
      'R-PROXY-AWARE:2']);
    // K1's: each exemplar is read by neither stem pattern, and its nearest form is read, so each family sits at the judge's edge.
    let pairs = 0;
    for (const [id, quiet] of WORD_RESIDUALS) {
      for (const [blind, read] of quiet) {
        expect(named(blind), `${id} ${blind}`).toBe(false);
        expect(named(read), `${id} ${read}`).toBe(true);
        pairs++;
      }
    }
    expect(pairs).toBe(WORD_RESIDUALS.reduce((sum, [, quiet]) => sum + quiet.length, 0));
    // R2's: on R2's control holder (the first variant of a cell, its member on the source itself) each channel reads or detects the
    // planted member while the tracer records nothing; a serialization, which the tracer records, is their nearest form.
    const [cell] = await cellsOf(['incomplete']);
    const [control] = variantsOf(cell.reading);
    const holder = (reads: string[]): Json => asRecord(asRecord(traced(json(control.reading), control.member, reads)).source);
    const serialized: string[] = [];
    JSON.stringify(holder(serialized));
    expect(serialized).toStrictEqual(['keys', 'descriptor', 'get']);
    const channels: string[] = [];
    for (const [id, names] of TRAP_RESIDUALS) {
      for (const channel of names) {
        const reads: string[] = [];
        const wrapped = holder(reads);
        if (channel === 'util.inspect') expect(inspect(wrapped), id).toContain(control.member);
        else if (channel === 'util.types.isProxy') expect(types.isProxy(wrapped), id).toBe(true);
        else if (channel === 'structuredClone') {
          expect(thrown(() => structuredClone(wrapped)), id).toMatchObject({name: 'DataCloneError'});
          expect(Object.hasOwn(structuredClone(asRecord(asRecord(json(control.reading)).source)), control.member), id).toBe(true);
        } else throw new Error(`no quiet row for ${channel}`);
        expect(reads, `${id} ${channel}`).toStrictEqual([]);
        channels.push(channel);
      }
    }
    expect(channels).toStrictEqual(['util.inspect', 'util.types.isProxy', 'structuredClone']);
  });
});
