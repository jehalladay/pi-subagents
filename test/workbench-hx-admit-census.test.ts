/**
 * wb-pxvv (MWI B-hx-admit, slice PI-5; MNI packet P12), the hx-admit census: the readings of judgeScopeEvidence,
 * scopeBlockerOf and dispatchAdmittedWriter (src/workbench/scope-admission.ts) over the answers and requests this file builds,
 * and the fields and readings of the committed named-query record qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json
 * (written by qa/workbench/hx-named-query-probe.mjs, judged by qa/workbench/hx-named-query-judge.mjs). Requirements, vendored
 * verbatim with their SHA-256 in test/fixtures/mwi-hx-admit-requirements-roster.json: EAT-R058, EAT-R059 and EAT-R062 of
 * mechanical-workflows-interop-2026-11-04 (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e) and
 * EAT-R163 of the 2026-11-06 delta (triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md at b8cd53aa).
 *
 * FORM (cut 3, the respin of refusal #2, authored in rule 19(c)'s enumerate-the-resolvable form): each line of the PINNED
 * READER SET claims exactly the inputs its cases build, named in the line or by the constant or builder of this file that
 * holds them, and exactly the readings its cases assert. The modes the census knows it does not pin are the NOT CLAIMED scope
 * sentences and the named RESIDUAL with its pinned quiet row, below.
 *
 * THE INPUTS (constants and builders of this file):
 *  - EXPECTATIONS: MEASURED, the measured task's expectation (workspace WORKSPACE, which is <workspace>; wb-f3wd's task
 *    digest; the committed definition's semantic digest; wb-f3wd's base revision), and SYNTHETIC (workspace ws-alpha/beta,
 *    task digest sha256: then 0123456789abcdef four times, query digest sha256/hxq-normalized-v1: then fedcba9876543210 four
 *    times, base revision 0123456789abcdef0123456789abcdef01234567).
 *  - capableEvidence(e): answered, exit code 0, terminal reached, coverage complete, absence licensed, not empty, and e's
 *    workspace, task digest, query digest and base revision as its four identities.
 *  - sweptEvidence(e, mask), mask 0 to 1023: bit d set misses dimension d (0 answered, 1 exit code, 2 terminal, 3 coverage,
 *    4 absence licence, 5 the answer is empty, 6 workspace, 7 task digest, 8 resolved revision, 9 query digest); a missed exit
 *    code is MISSED_EXITS[mask mod 6] (3, -1, null, 0.5, NaN, 256), a missed coverage MISSED_COVERAGE[mask mod 3] (incomplete,
 *    unknown, null) and a missed identity null for an even mask and the empty string for an odd one; every dimension not
 *    missed reads as in capableEvidence(e).
 *  - variantsOf(v): the variant corpus of an identity value v, each member a string other than v and unique within its
 *    family, in the fifteen families of VARIANT_FAMILIES: case-whole (v upper-cased, v lower-cased), case-one (one cased character's case swapped, at each
 *    position), prefix (each proper prefix), suffix (each proper suffix), extension (0 or x after v, 0 or x before it, v
 *    twice), padding (each of the 33 PADS before v, after it and on both sides: tab, line feed, vertical tab, form feed,
 *    carriage return, space, U+0085, U+00A0, U+00AD, U+1680, U+180E, U+2000 to U+200A, U+200B, U+200C, U+200D, U+2028,
 *    U+2029, U+202F, U+205F, U+2060, U+3000, U+FEFF, and carriage return with line feed), path-form (/, //, a backslash or /.
 *    after v, / or ./ before it), substitution (each character replaced by x, or by y for an x, and by its successor in its
 *    class: 0-9, a-z and A-Z each wrapping around, any other character to _, and _ to -), deletion (each character removed),
 *    insertion (x at each position), transposition (each two adjacent unequal characters swapped), full-width (each printable
 *    ASCII character as its full-width form, all at once and one at a time), combining-mark (U+0301 after each character),
 *    encoded (percent-encoded, JSON-quoted, single-quoted, backtick-quoted, HTML-escaped) and prefixed (git:, sha256: or
 *    refs/heads/ before v). VARIANT_COUNTS holds each identity's corpus size under both expectations.
 *  - the measured answers: the five observations of the two committed probe records (wb-f3wd's three find-verb legs, this
 *    bead's two named-query legs) read as scope evidence through evidenceOf (the residual R-EVIDENCE-ADAPTER).
 *  - nativeRequest(e, evidence, gate): mode native-task-scope, invocation inv-hx-admit-1, the gate (witness supported unless
 *    a line names another) and e with the evidence; a git-census request carries mode git-census, its invocation id and
 *    authorized.
 *
 * PINNED READER SET (one claim per line; the cases before the colon are its pins):
 *  - R058-MEASURED-PARTIAL, R058-MEASURED-UNKNOWN: against MEASURED, each measured answer is needs_evidence with exactly its
 *    gaps of GAPS_OF_FIND or GAPS_OF_NAMED, and dispatchAdmittedWriter refuses its native request at stage scope with that
 *    verdict, with zero writer calls: wb-f3wd's legs filesystem-live and filesystem-live-best-effort (results with coverage
 *    incomplete and exit codes 3 and 0) and revision-pinned (a process failure with no coverage and exit code 4), and the two
 *    named-query legs (coverage unknown).
 *  - R058-FALSE-KNOWN-EMPTY: against MEASURED, the measured filesystem-live-best-effort answer restated empty (answer count 0)
 *    is needs_evidence with its six listed gaps, known-empty-unlicensed among them, and capableEvidence(MEASURED) restated
 *    empty with absence not licensed is needs_evidence [absence-unlicensed, known-empty-unlicensed]; dispatchAdmittedWriter
 *    refuses each at stage scope with that verdict, with zero writer calls.
 *  - R058-POSITIVE-CONTROL: for each expectation e, capableEvidence(e), and capableEvidence(e) restated empty, are admitted,
 *    and dispatchAdmittedWriter of each one's native request calls the writer exactly once, with a frozen admission equal to
 *    { invocationId: inv-hx-admit-1, label: native-task-scope }, and returns { dispatched: true } with that admission and the
 *    writer's value.
 *  - M-EMPTY-AS-COMPLETE: for each e, capableEvidence(e) restated empty with coverage incomplete, unknown or null is
 *    needs_evidence [coverage-not-complete, known-empty-unlicensed].
 *  - R058-EACH-CONDITION: for each e, capableEvidence(e) with one condition missed in each form listed here is needs_evidence
 *    with exactly that condition's gap, and dispatchAdmittedWriter refuses its native request at stage scope with that
 *    verdict, with zero writer calls: answered false (answer-missing); each exit code of EXIT_CODES_NOT_ZERO - every integer
 *    from -300 to 300 but 0, plus and minus 2^16, 2^31, 2^32 and 2^53 - 1, plus and minus 0.4, 0.5, 1e-300 and Infinity, NaN,
 *    and null (exit-nonzero); terminal not reached (terminal-unreached); coverage incomplete, unknown or null
 *    (coverage-not-complete); absence not licensed (absence-unlicensed); the workspace, task digest, resolved revision or
 *    query digest null or the empty string (root-unbound, task-scope-absent, revision-unbound, query-digest-absent).
 *    capableEvidence(e) with exit code 0 or -0 is admitted.
 *  - R058-GAP-ORDER: SCOPE_GAPS is the literal list answer-missing, exit-nonzero, terminal-unreached, coverage-not-complete,
 *    absence-unlicensed, known-empty-unlicensed, root-unbound, task-scope-absent, revision-unbound, query-digest-absent; for
 *    each e, each of the 1024 answers sweptEvidence(e, mask) is admitted when sweptGaps(mask) is empty and is otherwise
 *    needs_evidence with exactly sweptGaps(mask), in that order - the gap of each missed dimension but dimension 5, and
 *    known-empty-unlicensed when bit 5 is set with bit 3 or bit 4; sweptEvidence(e, 1023) reports all ten.
 *  - R059-TASK-MISMATCH, R059-QUERY-MISMATCH, R059-REVISION-MISMATCH: capableEvidence(MEASURED) stating the task digest
 *    sha256: then 9 sixty-four times, the query digest sha256/hxq-normalized-v1: then 8 sixty-four times, or the resolved
 *    revision 7 forty times is refused with task, query or revision, and dispatchAdmittedWriter refuses its native request at
 *    stage scope with that verdict, with zero writer calls.
 *  - R059-IDENTITY-VARIANTS (refusal #2's U1 to U4): for each expectation e and each identity - the workspace (root), the task
 *    digest (task), the query digest (query) and the resolved revision against the base revision (revision) - each member of
 *    variantsOf of e's value, stated as that identity, is refused with that identity's mismatch by judgeScopeEvidence on
 *    capableEvidence(e), on sweptEvidence(e, 1023) and, for MEASURED, on each of the five measured answers;
 *    dispatchAdmittedWriter refuses each on capableEvidence(e) at stage scope with that verdict, with zero writer calls; and
 *    the value itself, rebuilt as a new string, leaves capableEvidence(e) admitted. VARIANT_FAMILIES and VARIANT_COUNTS are
 *    held as literals, and every family yields at least one member for each of the eight values.
 *  - R059-BEFORE-WRITER: for each identity, each of its two planted values of IDENTITIES (<other-workspace> or the plant of
 *    R059-TASK-MISMATCH, R059-QUERY-MISMATCH or R059-REVISION-MISMATCH, and a single space) and the first member of each
 *    family of variantsOf of MEASURED's value, stated on each of the 1024 answers
 *    sweptEvidence(MEASURED, mask) and on each measured named-query answer, is refused with that identity's mismatch by
 *    judgeScopeEvidence; on the measured named-query answers dispatchAdmittedWriter refuses each at stage scope with that
 *    verdict and returns before the writer, which is called zero times.
 *  - M-WORKSPACE-NAME-ONLY: on capableEvidence(MEASURED), the task, query and revision plants of R059-TASK-MISMATCH,
 *    R059-QUERY-MISMATCH and R059-REVISION-MISMATCH each refuse with the workspace equal to MEASURED's, and the workspace
 *    stated as <other-workspace> alone refuses as root.
 *  - R059-CHECK-ORDER: SCOPE_MISMATCHES is the literal list root, task, query, revision; each of the 15 non-empty sets of the
 *    four identities, each member stated as its first planted value of IDENTITIES, on capableEvidence(MEASURED) and on
 *    sweptEvidence(MEASURED, 1023) with all four identities null, is refused with the set's first member in that order.
 *  - R062-NATIVE-BLOCKED: scopeBlockerOf of the gates with witness unsupported and missing is { gate: HX-TASK-SCOPE-PROBE,
 *    scope: native-task-scope, witness, notBlocked: [git-census] } and of the gate with witness supported null; the native
 *    request of capableEvidence(MEASURED) under witness unsupported or missing is refused at stage gate with that blocker,
 *    with zero writer calls.
 *  - R062-GIT-CENSUS-PASSES: the authorized git-census request inv-hx-admit-1 is dispatched once with the admission
 *    { invocationId: inv-hx-admit-1, label: git-census }, while the native request of capableEvidence(MEASURED) under witness
 *    unsupported is not dispatched; that git-census request unauthorized is refused at stage authority
 *    (git-census-unauthorized), with zero writer calls.
 *  - M-DISABLE-ALL: the blocker of the witness gateOfRecord reads for the committed record names git-census as not blocked,
 *    and the authorized git-census request inv-hx-admit-1 is dispatched with one writer call.
 *  - R062-ONE-FROZEN-ADMISSION: the native request inv-native-7 (capableEvidence(MEASURED), witness supported) and the
 *    authorized git-census request inv-census-8, each with a writer returning written-now and with one returning a promise
 *    of written-later, call the writer exactly once with a frozen admission strictly equal to the request's
 *    { invocationId, label } (labels native-task-scope and git-census), and the outcome has exactly the keys dispatched
 *    (true), admission (that same object) and value (the writer's value, resolved).
 *  - R062-WRITER-ERROR-PROPAGATES: under each of those two requests, a writer that throws and one that returns a rejected
 *    promise, each with an Error, a string, a plain object and undefined, make dispatchAdmittedWriter reject with that same
 *    value after exactly one writer call.
 *  - R062-REFUSAL-ORDER: the native request whose invocation id, or one of whose four expected identities, is the empty string
 *    is refused at stage request (malformed-request) under each witness (supported, unsupported, missing) with each of four
 *    evidences (capableEvidence(MEASURED), the measured named-query-strict answer, capableEvidence(MEASURED) stating the task
 *    plant of R059-TASK-MISMATCH, sweptEvidence(MEASURED, 1023)), and so is the git-census request whose invocation id is the
 *    empty string, authorized or not; the native request under witness unsupported or missing is refused at stage gate with
 *    each of those four evidences; none of these calls the writer.
 *  - R163-RECORD-PINS: the committed named-query record reads schema workbench.hx-named-query-probe/v1, bead wb-pxvv,
 *    requirement EAT-R163, gate HX-TASK-SCOPE-PROBE and route named-query; producer hx, version 0.1.0, a binary SHA-256 of 64
 *    lower-case hex digits equal to the receipt's Measured record row and other than wb-f3wd's record's, origin path, HXS
 *    1.0, protocol hxs/1.0, a capability count equal to the receipt's row, no task-named capability and the sdk
 *    @hyperunix/sdk, version 0.1.0, reported 0.1.0; a task equal to wb-f3wd's record's task (id, kind, root, base revision
 *    and digest); a definition named hx-admit-task-scope with verb run, the one parameter task (string, default the task id),
 *    the task digest as its doc, formed under git:<base revision>, saved view null, the four commands of r163Commands token
 *    for token and a semantic digest of the form sha256/hxq-normalized-v1:<64 hex digits> equal to the receipt's row; the legs
 *    named-query-strict and named-query-best-effort in that order, each with its query (operation run, name
 *    hx-admit-task-scope, kind hx.fs/regular-file, root ., view git:<base revision>, its best-effort flag) and its argv token
 *    for token (only the best-effort leg carries --best-effort), the diagnostics [HX-COVERAGE-INCOMPLETE, severity error or
 *    warning, no reason], a query digest equal to the semantic digest, an exit code equal to the receipt's row and the view
 *    hx.view/workspace-head; and a findVerb section whose binary SHA-256 equals the producer's, whose legs are wb-f3wd's three
 *    leg ids in order and whose verdict and exit codes equal the receipt's rows.
 *  - R163-NAMED-QUERY-VERDICT: the committed record's verdict, capable set, reasons and blocker equal judgeNamedQueryRoute
 *    over its task and observations, which equals the landed wb-f3wd judgeTaskScope over them: verdict
 *    task-scope-unsupported, each leg's reasons as listed in the case, and the blocker on HX-TASK-SCOPE-PROBE scoped to
 *    native-task-scope with witness unsupported and git-census not blocked.
 *  - R163-GATE-INDEPENDENT (refusal #2's U6): gateOfRecord reads { named-query, unsupported } for the committed record and
 *    { named-query, supported } for the capable plant (capableLeg in place of the strict leg, rejudged); called on each of the
 *    two through a recording proxy, it reads exactly the keys blocker, capable, definition, observations, producer, reasons,
 *    route, schema, task and verdict of the record, with no in-check, no key listing and no property-descriptor read, so it
 *    reads no findVerb key; each of the two with its findVerb section replaced by each member of FIND_VERB_VARIANTS (binary
 *    SHA-256 0 sixty-four times, null, wb-f3wd's binary or removed; verdict task-scope-supported, task-scope-unsupported or
 *    removed; legs empty, reversed or with every exit code 0; an empty object, null, an array, a string) or with the section
 *    removed reads its same witness; and each witness maps through dispatchAdmittedWriter (capableEvidence(MEASURED)) to the
 *    record's blocker or to one dispatch. Every record this file hands gateOfRecord that is an object and not an array is
 *    read through the recording proxy - in this line's key check or through witnessOf, which fails its case when the
 *    record's findVerb key is read or its keys are listed.
 *  - M-FIND-RECITED: the committed record rejudged with wb-f3wd's find-verb observations as committed, with the first two of
 *    them relabelled to the named-query leg ids, and with its own named-query legs keeping wb-f3wd's exit codes with query
 *    digest null and digest source absent, reads its listed findings and witness missing; the committed record with its
 *    verdict restated as task-scope-supported reads [verdict-not-judged] and witness missing.
 *  - R163-RECORD-TIED (refusal #2's U5): the committed record's probe section is PROBE_SCRIPT and JUDGE_SCRIPT with the
 *    SHA-256 of each file; its utc reads true under isInstantOn(utc, 2026-11-11) - a string that starts with 2026-11-11T and
 *    that new Date(utc).toISOString() returns unchanged - whose readings of INSTANT_PLANTS are held as listed; recordFindings
 *    of it is empty; and no key or string value of it contains the repository root, the home directory or /tmp/, and none,
 *    split at white space, quotes, backticks, =, commas, semicolons, |, parentheses, square and curly brackets and angle
 *    brackets, holds a token that starts with / or with file:, is ~ or starts with ~/, starts with a drive letter, a colon and
 *    a slash or backslash, or carries :/ before a character other than / (hostPathsIn, which reads each of its ten planted
 *    host-path strings as a value and the first as a key).
 *  - R163-RECORD-FINDINGS: FINDINGS is the literal list of the ten findings; recordFindings of the capable plant is empty and
 *    of each record of RECORD_PLANTS reads exactly its listed findings, in FINDINGS order, and witnessOf of each reads
 *    missing. RECORD_PLANTS: null, an array, a string and a number (record-not-object); the committed record with schema
 *    workbench.hx-task-scope-probe/v1 (schema-other); route find (route-other); binary SHA-256 null, eight hex digits or upper
 *    case (binary-unpinned); definition name hx-admit-other or verb find (definition-missing); a leg dropped or the legs
 *    reversed, rejudged (leg-set-other); the strict leg relabelled filesystem-live, rejudged (leg-set-other,
 *    find-leg-recited); the strict leg's operation find (find-leg-recited, verb-not-run); its argv with find appended
 *    (find-leg-recited); its operation exec, or its argv without run or without the query name (verb-not-run); its query
 *    digest sha256/hxq-normalized-v1: then 8 sixty-four times (digest-not-definition); its digest source absent, rejudged
 *    (digest-not-definition); its verdict restated as task-scope-supported, its capable set as [named-query-strict], the
 *    strict leg's reasons as [] or its blocker as null (verdict-not-judged); an empty object (schema-other, route-other,
 *    binary-unpinned, definition-missing, leg-set-other, verdict-not-judged); the capable plant with schema
 *    workbench.hx-task-scope-probe/v1 (schema-other); and the corpus plants - the committed record's schema, route,
 *    definition name and definition verb, and the strict leg's operation, its argv's run token, its argv's query-name token
 *    and its query digest, each replaced by each member of variantsOf of its committed value (schema-other, route-other,
 *    definition-missing, definition-missing, verb-not-run, verb-not-run, verb-not-run, digest-not-definition; no member is
 *    find, which the case asserts), and the producer's binary SHA-256 replaced by each of the ten binaryForms of the case
 *    (null, the empty string, its first 63 digits, its digits with 0 appended, its upper case, its first letter upper-cased,
 *    g in place of its first digit, a leading space, a trailing space, sha256: before it) (binary-unpinned).
 * Shape and anchor rows: FROZEN-SHAPE (standing rule 16), CASES-REGISTERED, ANCHOR-ROSTER, ANCHOR-RECEIPT-PINS,
 * ANCHOR-RECEIPT-RESIDUALS and ANCHOR-MEASURED.
 *
 * NOT CLAIMED (scope sentences): EAT-R060 and EAT-R061 (the committed RF context guards) are NOT CLAIMED by this census; EAT-R063
 * (the live installed-host witness) is NOT CLAIMED by this census; a registered workflow_execute or workflow_observe oracle
 * (EAT-R299(1)(4)) is NOT CLAIMED by this census; the PI-HX-RF-LIVE gate is NOT CLAIMED by this census; hx verbs other than
 * find and run, hx builds other than the recorded binary and a version-wide statement are NOT CLAIMED by this census; a fresh
 * probe run, and observationOfRun and digestText on any answer other than the ones the committed record keeps, are NOT
 * CLAIMED by this census (the record is tied to the probe and the judge by SHA-256 alone); an input of another type than
 * the interfaces declare is NOT CLAIMED by this census; an expectation other than the two of EXPECTATIONS, an identity stated
 * as a string outside its value's variantsOf corpus and its planted values, an exit code or a coverage outside the forms the
 * lines above list, a find-verb section outside FIND_VERB_VARIANTS, a record outside RECORD_PLANTS and the plants the lines
 * above name, and a utc outside INSTANT_PLANTS are NOT CLAIMED by this census; the doc comments of the judge and the probe,
 * which keep cut 1's bytes under the record's SHA-256 tie, are NOT CLAIMED by this census beyond the readings its lines
 * state.
 *
 * RESIDUAL (named family, pinned quiet row): R-EVIDENCE-ADAPTER - the measured answers reach judgeScopeEvidence through this
 * census's evidenceOf, not through a host reader (no host reader of a live HX answer exists until P04), and evidenceOf states
 * the workspace as the census constant WORKSPACE rather than reading it from the answer; QUIET-EVIDENCE-ADAPTER pins
 * evidenceOf's reading of each of the five measured answers as its literal row of ADAPTER_READINGS (no task digest, no
 * resolved revision, the named-query legs' runtime query digest and no query digest on the find verb, the workspace
 * WORKSPACE), that each measured answer holds each field of ADAPTER_FIELDS, and that WORKSPACE equals the landed
 * WORKSPACE_TOKEN and the argv token after --workspace of each measured answer, so an adapter that starts supplying a task
 * digest or a revision, or states another workspace, reds.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  DEFINITION_TOKEN,
  FINDINGS,
  type GateWitness,
  gateOfRecord,
  JUDGE_SCRIPT,
  judgeNamedQueryRoute,
  LEGS,
  PROBE_RECORD,
  PROBE_SCRIPT,
  QUERY_NAME,
  ROUTE,
  recordFindings,
  VERB,
} from "../qa/workbench/hx-named-query-judge.mjs";
import { LEGS as FIND_LEGS, PROBE_RECORD as FIND_RECORD, judgeTaskScope, type Observation, WORKSPACE_TOKEN } from "../qa/workbench/hx-task-scope-judge.mjs";
import {
  dispatchAdmittedWriter,
  GIT_CENSUS_MODE,
  judgeScopeEvidence,
  NATIVE_SCOPE_MODE,
  SCOPE_GAPS,
  SCOPE_MISMATCHES,
  SCOPE_PROBE_GATE,
  type ScopeEvidence,
  type ScopeExpectation,
  type ScopeGap,
  type ScopeGate,
  type ScopeMismatch,
  scopeBlockerOf,
  type WriterAdmission,
  type WriterRequest,
} from "../src/workbench/scope-admission.js";
import { docsSection, sectionTables } from "./helpers/census.js";

const REPO = fileURLToPath(new URL("../", import.meta.url));
const ROSTER = "test/fixtures/mwi-hx-admit-requirements-roster.json";
const RECEIPT = "docs/workbench/receipts/wb-pxvv.md";
const RECEIPT_ENTRY =
  "2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 3 (machine seat ws-08, run g10-work-s337, base ce180d8)";
const RECEIPT_TABLES = {
  pins: { heading: "Judged pins, wb-pxvv cut 3", header: ["Row", "Pin"] },
  residuals: { heading: "Residuals, wb-pxvv cut 3", header: ["Residual", "Quiet row"] },
  measured: { heading: "Measured record, wb-pxvv cut 3", header: ["Field", "Value"] },
} as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly mutant: string;
  readonly pins: readonly string[];
}
/** The judged rows: each requirement's Statement as its label, its Adversarial mutant, and the cases that pin it. */
const ROWS: readonly Row[] = [
  {
    id: "EAT-R058",
    label: "Pi MUST stop native-profile writer dispatch on incomplete HX scope.",
    mutant: "Map empty files to complete coverage.",
    pins: [
      "R058-MEASURED-PARTIAL",
      "R058-MEASURED-UNKNOWN",
      "R058-FALSE-KNOWN-EMPTY",
      "R058-POSITIVE-CONTROL",
      "M-EMPTY-AS-COMPLETE",
      "R058-EACH-CONDITION",
      "R058-GAP-ORDER",
    ],
  },
  {
    id: "EAT-R059",
    label: "Pi MUST refuse HX evidence from another query or revision.",
    mutant: "Compare only the workspace name.",
    pins: [
      "R059-TASK-MISMATCH",
      "R059-QUERY-MISMATCH",
      "R059-REVISION-MISMATCH",
      "R059-IDENTITY-VARIANTS",
      "R059-BEFORE-WRITER",
      "M-WORKSPACE-NAME-ONLY",
      "R059-CHECK-ORDER",
    ],
  },
  {
    id: "EAT-R062",
    label: "Pi MUST block only the native profile when native evidence is unavailable.",
    mutant: "Disable every Mechanical invocation when native HX is unavailable.",
    pins: ["R062-NATIVE-BLOCKED", "R062-GIT-CENSUS-PASSES", "M-DISABLE-ALL", "R062-ONE-FROZEN-ADMISSION", "R062-WRITER-ERROR-PROPAGATES", "R062-REFUSAL-ORDER"],
  },
  {
    id: "EAT-R163",
    label:
      "Before `hx-task-scope-v1` is described as unsupported version-wide at hx 0.1.0, the HX admission bead MUST probe a workspace-defined named query carrying a task scope against the same installed binary and record exit code, verb, roster and verdict in a dated receipt; until that receipt exists every program statement MUST keep the find-verb/84-capability-roster bound of wb-f3wd.",
    mutant: "Reuse the wb-f3wd find-verb exit codes as the named-query verdict; the receipt validator must refuse.",
    pins: ["R163-RECORD-PINS", "R163-NAMED-QUERY-VERDICT", "R163-GATE-INDEPENDENT", "M-FIND-RECITED", "R163-RECORD-TIED", "R163-RECORD-FINDINGS"],
  },
];
/** The named residual families and their quiet rows. */
const RESIDUALS: readonly (readonly [string, string])[] = [["R-EVIDENCE-ADAPTER", "QUIET-EVIDENCE-ADAPTER"]];

interface Requirement {
  readonly id: string;
  readonly lines: string;
  readonly sha256: string;
  readonly text: readonly string[];
}
interface RosterSource {
  readonly commit: string;
  readonly path: string;
  readonly blob: string;
  readonly fileSha256: string;
  readonly requirements: readonly Requirement[];
}
interface Roster {
  readonly bead: string;
  readonly sources: readonly RosterSource[];
}
interface Task {
  readonly id: string;
  readonly kind: string;
  readonly root: string;
  readonly baseRevision: string;
  readonly digest: string;
}
interface Blocker {
  readonly gate: string;
  readonly scope: string;
  readonly witness: string;
  readonly notBlocked: readonly string[];
}
interface FindRecord {
  readonly producer: { readonly binarySha256: string };
  readonly task: Task;
  readonly observations: readonly Observation[];
  readonly verdict: string;
}
interface NamedQueryRecord {
  readonly schema: string;
  readonly bead: string;
  readonly requirement: string;
  readonly gate: string;
  readonly route: string;
  readonly utc: string;
  readonly probe: { readonly script: string; readonly scriptSha256: string; readonly judge: string; readonly judgeSha256: string };
  readonly producer: {
    readonly name: string;
    readonly version: string | null;
    readonly binarySha256: string | null;
    readonly binaryOrigin: string | null;
    readonly hxsVersion: string | null;
    readonly protocol: string | null;
    readonly capabilities: { readonly count: number; readonly taskNamed: readonly string[] };
    readonly sdk: { readonly name: string; readonly version: string | null; readonly reported: string | null };
  };
  readonly task: Task;
  readonly definition: {
    readonly name: string;
    readonly verb: string;
    readonly parameters: readonly { readonly name: string; readonly type: string; readonly default: string | null }[];
    readonly doc: string | null;
    readonly formedUnder: string | null;
    readonly savedView: string | null;
    readonly semanticDigest: string;
    readonly commands: readonly (readonly string[])[];
  };
  readonly observations: readonly Observation[];
  readonly verdict: string;
  readonly capable: readonly string[];
  readonly reasons: Readonly<Record<string, readonly string[]>>;
  readonly blocker: Blocker | null;
  readonly findVerb: {
    readonly binarySha256: string | null;
    readonly verdict: string;
    readonly legs: readonly { readonly id: string; readonly exitCode: number | null }[];
  };
}

const sha256 = (bytes: string | Buffer): string => createHash("sha256").update(bytes).digest("hex");
const repoText = (path: string): string => readFileSync(join(REPO, path), "utf8");
const roster = (): Roster => JSON.parse(repoText(ROSTER)) as Roster;
const findRecord = (): FindRecord => JSON.parse(repoText(FIND_RECORD)) as FindRecord;
const nqRecord = (): NamedQueryRecord => JSON.parse(repoText(PROBE_RECORD)) as NamedQueryRecord;
const requirements = (): Requirement[] => roster().sources.flatMap((source) => [...source.requirements]);
const field = (requirement: Requirement, name: "Statement" | "Adversarial mutant"): string => {
  const prefix = `- ${name}: `;
  const line = requirement.text.find((candidate) => candidate.startsWith(prefix));
  return line === undefined ? "" : line.slice(prefix.length);
};
/** The body rows of one table section of the receipt, read through the shared docs reader (exactly one table, no HTML, its header). */
const receiptTable = (table: { readonly heading: string; readonly header: readonly string[] }): string[][] => {
  const markdown = repoText(RECEIPT);
  const parents = [(markdown.split("\n")[0] ?? "").replace(/^# /, ""), RECEIPT_ENTRY];
  const where = `${RECEIPT} section "${table.heading}"`;
  const section = docsSection(markdown, table.heading, 3, parents);
  if (!section.ok) throw new Error(`${where}: ${section.why}`);
  if (section.hasHtml) throw new Error(`${where} carries HTML, which can hide a row of its table`);
  const kinds = section.blocks.map((block) => (block.kind === "other" ? `other:${block.type}` : block.kind));
  if (JSON.stringify(kinds) !== JSON.stringify(["other:table"])) throw new Error(`${where} must render exactly one table; it renders [${kinds.join(", ")}]`);
  const [head, ...rows] = sectionTables(markdown, table.heading, 3, parents).grids[0] ?? [];
  if (JSON.stringify(head ?? null) !== JSON.stringify(table.header)) throw new Error(`${where}: header ${JSON.stringify(head ?? null)}`);
  return rows.map((row) => [...row]);
};
/** One row of the receipt's Measured record table. */
const measured = (name: string): string => {
  const value = receiptTable(RECEIPT_TABLES.measured).find(([key]) => key === name)?.[1];
  if (value === undefined) throw new Error(`${RECEIPT} has no Measured record row ${name}`);
  return value;
};

// ---- scope evidence: the measured answers of the two committed probe records, read as scope evidence ----
const WORKSPACE = "<workspace>";
/** The record fields evidenceOf reads (R-EVIDENCE-ADAPTER); it states the workspace as WORKSPACE, not from the answer. */
const ADAPTER_FIELDS = ["outcome", "exitCode", "terminalReached", "completeness", "licensesAbsence", "answerCount", "scope", "digestSource", "queryDigest", "revision"];
/** One measured answer read as scope evidence (R-EVIDENCE-ADAPTER; QUIET-EVIDENCE-ADAPTER pins its five readings). */
const evidenceOf = (observation: Observation, task: Task): ScopeEvidence => ({
  answered: observation.outcome === "result",
  exitCode: observation.exitCode,
  terminalReached: observation.terminalReached,
  coverage: observation.completeness === "complete" || observation.completeness === "incomplete" || observation.completeness === "unknown" ? observation.completeness : null,
  absenceLicensed: observation.licensesAbsence,
  knownEmpty: observation.answerCount === 0,
  workspace: WORKSPACE,
  taskDigest: observation.scope === "task" ? task.digest : null,
  queryDigest: observation.digestSource === "runtime" ? observation.queryDigest : null,
  resolvedRevision: observation.revision === null ? null : observation.revision.resolvedCommit,
});
const expectationOf = (task: Task, queryDigest: string): ScopeExpectation => ({ workspace: WORKSPACE, taskDigest: task.digest, queryDigest, baseRevision: task.baseRevision });
/** capableEvidence(e) of the header's INPUTS: every condition met and e's four identities stated. */
const capableEvidence = (expected: ScopeExpectation): ScopeEvidence => ({
  answered: true,
  exitCode: 0,
  terminalReached: true,
  coverage: "complete",
  absenceLicensed: true,
  knownEmpty: false,
  workspace: expected.workspace,
  taskDigest: expected.taskDigest,
  queryDigest: expected.queryDigest,
  resolvedRevision: expected.baseRevision,
});
const OPEN_GATE: ScopeGate = { witness: "supported" };
const INVOCATION = "inv-hx-admit-1";
interface Counted {
  readonly calls: WriterAdmission[];
  readonly writer: (admission: WriterAdmission) => string;
}
const countingWriter = (): Counted => {
  const calls: WriterAdmission[] = [];
  return {
    calls,
    writer: (admission) => {
      calls.push(admission);
      return "written";
    },
  };
};
const nativeRequest = (expected: ScopeExpectation, evidence: ScopeEvidence, gate: ScopeGate = OPEN_GATE): WriterRequest => ({
  mode: NATIVE_SCOPE_MODE,
  invocationId: INVOCATION,
  gate,
  scope: { expected, evidence },
});
/** The scope-stage refusal dispatchAdmittedWriter returns for `verdict`. */
const scopeRefusal = (verdict: unknown): unknown => ({ dispatched: false, refusal: { stage: "scope", verdict } });

// ---- the conditions of an admitted answer, swept (R058-EACH-CONDITION, R058-GAP-ORDER, R059-BEFORE-WRITER, R059-CHECK-ORDER) ----
/** The ten gaps in the order this census expects them reported, held against SCOPE_GAPS (R058-GAP-ORDER). */
const GAP_ORDER: readonly ScopeGap[] = [
  "answer-missing",
  "exit-nonzero",
  "terminal-unreached",
  "coverage-not-complete",
  "absence-unlicensed",
  "known-empty-unlicensed",
  "root-unbound",
  "task-scope-absent",
  "revision-unbound",
  "query-digest-absent",
];
/** The exit codes R058-EACH-CONDITION holds as not exit 0. */
const EXIT_CODES_NOT_ZERO: readonly (number | null)[] = [
  ...Array.from({ length: 601 }, (_, index) => index - 300).filter((code) => code !== 0),
  2 ** 16,
  -(2 ** 16),
  2 ** 31,
  -(2 ** 31),
  2 ** 32,
  -(2 ** 32),
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  0.4,
  -0.4,
  0.5,
  -0.5,
  1e-300,
  -1e-300,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  Number.NaN,
  null,
];
type IdentityField = "workspace" | "taskDigest" | "queryDigest" | "resolvedRevision";
/** The four identities in the census's own check order: the evidence field, the mismatch it refuses with, its two planted values. */
const IDENTITIES: readonly (readonly [IdentityField, ScopeMismatch, readonly [string, string]])[] = [
  ["workspace", "root", ["<other-workspace>", " "]],
  ["taskDigest", "task", [`sha256:${"9".repeat(64)}`, " "]],
  ["queryDigest", "query", [`sha256/hxq-normalized-v1:${"8".repeat(64)}`, " "]],
  ["resolvedRevision", "revision", ["7".repeat(40), " "]],
];
/** The expectation field each identity is judged against (the resolved revision against the base revision). */
const EXPECTED_FIELD: Readonly<Record<IdentityField, keyof ScopeExpectation>> = {
  workspace: "workspace",
  taskDigest: "taskDigest",
  queryDigest: "queryDigest",
  resolvedRevision: "baseRevision",
};
/** The gap each identity left unstated reports. */
const UNSTATED_GAPS: readonly (readonly [IdentityField, ScopeGap])[] = [
  ["workspace", "root-unbound"],
  ["taskDigest", "task-scope-absent"],
  ["resolvedRevision", "revision-unbound"],
  ["queryDigest", "query-digest-absent"],
];
/** `evidence` with one identity field set to `value`. */
const stating = (evidence: ScopeEvidence, name: IdentityField, value: string | null): ScopeEvidence => {
  const copy: { -readonly [K in keyof ScopeEvidence]: ScopeEvidence[K] } = { ...evidence };
  copy[name] = value;
  return copy;
};
const SWEEP = 1 << 10;
const MISSED_EXITS: readonly (number | null)[] = [3, -1, null, 0.5, Number.NaN, 256];
const MISSED_COVERAGE: readonly ScopeEvidence["coverage"][] = ["incomplete", "unknown", null];
/**
 * One answer of the sweep: bit d of `mask` set means dimension d is missed - 0 answered, 1 exit code, 2 terminal, 3 coverage,
 * 4 absence licence, 5 the answer is empty, 6 workspace, 7 task digest, 8 resolved revision, 9 query digest (an unstated
 * identity alternates null and the empty string, a missed exit code and coverage cycle through several forms).
 */
const sweptEvidence = (expected: ScopeExpectation, mask: number): ScopeEvidence => {
  const missed = (bit: number): boolean => (mask & (1 << bit)) !== 0;
  const blank = mask % 2 === 0 ? null : "";
  return {
    answered: !missed(0),
    exitCode: missed(1) ? (MISSED_EXITS[mask % MISSED_EXITS.length] ?? null) : 0,
    terminalReached: !missed(2),
    coverage: missed(3) ? (MISSED_COVERAGE[mask % MISSED_COVERAGE.length] ?? null) : "complete",
    absenceLicensed: !missed(4),
    knownEmpty: missed(5),
    workspace: missed(6) ? blank : expected.workspace,
    taskDigest: missed(7) ? blank : expected.taskDigest,
    resolvedRevision: missed(8) ? blank : expected.baseRevision,
    queryDigest: missed(9) ? blank : expected.queryDigest,
  };
};
/** The gaps the census expects of sweptEvidence(mask), in GAP_ORDER. */
const sweptGaps = (mask: number): ScopeGap[] => {
  const missed = (bit: number): boolean => (mask & (1 << bit)) !== 0;
  const applies: Readonly<Record<ScopeGap, boolean>> = {
    "answer-missing": missed(0),
    "exit-nonzero": missed(1),
    "terminal-unreached": missed(2),
    "coverage-not-complete": missed(3),
    "absence-unlicensed": missed(4),
    "known-empty-unlicensed": missed(5) && (missed(3) || missed(4)),
    "root-unbound": missed(6),
    "task-scope-absent": missed(7),
    "revision-unbound": missed(8),
    "query-digest-absent": missed(9),
  };
  return GAP_ORDER.filter((gap) => applies[gap]);
};
const MALFORMED = { dispatched: false, refusal: { stage: "request", reason: "malformed-request" } } as const;
/** A git-census request with its authorized flag and invocation id. */
const censusRequest = (authorized: boolean, invocationId: string = INVOCATION): WriterRequest => ({ mode: GIT_CENSUS_MODE, invocationId, authorized });

// ---- the identity variant corpus (R059-IDENTITY-VARIANTS, R059-BEFORE-WRITER, R163-RECORD-FINDINGS) ----
/** The families of variantsOf, in the order it yields them. */
const VARIANT_FAMILIES = [
  "case-whole",
  "case-one",
  "prefix",
  "suffix",
  "extension",
  "padding",
  "path-form",
  "substitution",
  "deletion",
  "insertion",
  "transposition",
  "full-width",
  "combining-mark",
  "encoded",
  "prefixed",
] as const;
type VariantFamily = (typeof VARIANT_FAMILIES)[number];
/** VARIANT_COUNTS: the corpus size of each identity value under each expectation (R059-IDENTITY-VARIANTS). */
const VARIANT_COUNTS: readonly string[] = [
  "MEASURED.workspace:225",
  "MEASURED.taskDigest:775",
  "MEASURED.queryDigest:952",
  "MEASURED.resolvedRevision:492",
  "SYNTHETIC.workspace:244",
  "SYNTHETIC.taskDigest:783",
  "SYNTHETIC.queryDigest:957",
  "SYNTHETIC.resolvedRevision:488",
];
/** The code points padding places around a value, built by number (never written raw): ASCII and Unicode spaces and invisibles. */
const PAD_CODE_POINTS: readonly number[] = [
  0x09,
  0x0a,
  0x0b,
  0x0c,
  0x0d,
  0x20,
  0x85,
  0xa0,
  0xad,
  0x1680,
  0x180e,
  ...Array.from({ length: 11 }, (_, index) => 0x2000 + index),
  0x200b,
  0x200c,
  0x200d,
  0x2028,
  0x2029,
  0x202f,
  0x205f,
  0x2060,
  0x3000,
  0xfeff,
];
/** The 33 pads: each code point of PAD_CODE_POINTS alone, and carriage return with line feed. */
const PADS: readonly string[] = [...PAD_CODE_POINTS.map((point) => String.fromCodePoint(point)), "\r\n"];
const COMBINING_ACUTE = String.fromCodePoint(0x301);
/** A character's successor in its class (0-9, a-z, A-Z, each wrapping around); any other character reads _, and _ reads -. */
const successor = (character: string): string => {
  const point = character.codePointAt(0) ?? 0;
  if (character >= "0" && character <= "9") return character === "9" ? "0" : String.fromCodePoint(point + 1);
  if (character >= "a" && character <= "z") return character === "z" ? "a" : String.fromCodePoint(point + 1);
  if (character >= "A" && character <= "Z") return character === "Z" ? "A" : String.fromCodePoint(point + 1);
  return character === "_" ? "-" : "_";
};
/** A printable ASCII character's full-width form; any other character unchanged. */
const fullWidth = (character: string): string => {
  const point = character.codePointAt(0) ?? 0;
  return point >= 0x21 && point <= 0x7e ? String.fromCodePoint(point + 0xfee0) : character;
};
const htmlEscaped = (value: string): string => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
/** The variant corpus of an identity value: [family, variant] pairs, each variant a string other than `value`, unique within its family. */
const variantsOf = (value: string): (readonly [VariantFamily, string])[] => {
  const characters = Array.from(value);
  const replaced = (index: number, replacement: string): string => [...characters.slice(0, index), replacement, ...characters.slice(index + 1)].join("");
  const byFamily: Readonly<Record<VariantFamily, readonly string[]>> = {
    "case-whole": [value.toUpperCase(), value.toLowerCase()],
    "case-one": characters.flatMap((character, index) =>
      character.toUpperCase() === character.toLowerCase() ? [] : [replaced(index, character === character.toUpperCase() ? character.toLowerCase() : character.toUpperCase())],
    ),
    prefix: characters.slice(1).map((_, index) => characters.slice(0, index + 1).join("")),
    suffix: characters.slice(1).map((_, index) => characters.slice(index + 1).join("")),
    extension: [`${value}0`, `${value}x`, `0${value}`, `x${value}`, `${value}${value}`],
    padding: PADS.flatMap((pad) => [`${pad}${value}`, `${value}${pad}`, `${pad}${value}${pad}`]),
    "path-form": [`${value}/`, `${value}//`, `${value}\\`, `${value}/.`, `/${value}`, `./${value}`],
    substitution: characters.flatMap((character, index) => [replaced(index, character === "x" ? "y" : "x"), replaced(index, successor(character))]),
    deletion: characters.map((_, index) => replaced(index, "")),
    insertion: Array.from({ length: characters.length + 1 }, (_, index) => [...characters.slice(0, index), "x", ...characters.slice(index)].join("")),
    transposition: characters
      .slice(1)
      .flatMap((character, index) =>
        character === characters[index] ? [] : [[...characters.slice(0, index), character, characters[index] ?? "", ...characters.slice(index + 2)].join("")],
      ),
    "full-width": [characters.map(fullWidth).join(""), ...characters.flatMap((character, index) => (fullWidth(character) === character ? [] : [replaced(index, fullWidth(character))]))],
    "combining-mark": characters.map((character, index) => replaced(index, `${character}${COMBINING_ACUTE}`)),
    encoded: [encodeURIComponent(value), JSON.stringify(value), `'${value}'`, `\`${value}\``, htmlEscaped(value)],
    prefixed: [`git:${value}`, `sha256:${value}`, `refs/heads/${value}`],
  };
  const corpus: (readonly [VariantFamily, string])[] = [];
  for (const family of VARIANT_FAMILIES) {
    const seen = new Set<string>();
    for (const variant of byFamily[family]) {
      if (variant === value || seen.has(variant)) continue;
      seen.add(variant);
      corpus.push([family, variant]);
    }
  }
  return corpus;
};

// ---- the named-query route ----
const nqTask = (): Task => nqRecord().task;
const nqExpectation = (): ScopeExpectation => expectationOf(nqTask(), nqRecord().definition.semanticDigest);
/** SYNTHETIC of the header's EXPECTATIONS. */
const SYNTHETIC_EXPECTATION: ScopeExpectation = {
  workspace: "ws-alpha/beta",
  taskDigest: `sha256:${"0123456789abcdef".repeat(4)}`,
  queryDigest: `sha256/hxq-normalized-v1:${"fedcba9876543210".repeat(4)}`,
  baseRevision: "0123456789abcdef0123456789abcdef01234567",
};
/** The header's EXPECTATIONS: MEASURED (the measured task's) and SYNTHETIC. */
const expectations = (): readonly (readonly [string, ScopeExpectation])[] => [
  ["MEASURED", nqExpectation()],
  ["SYNTHETIC", SYNTHETIC_EXPECTATION],
];
/** The five measured answers as scope evidence: wb-f3wd's three find-verb legs and this bead's two named-query legs. */
const measuredAnswers = (): readonly (readonly [string, ScopeEvidence])[] => [
  ...findRecord().observations.map((observation) => [observation.id, evidenceOf(observation, findRecord().task)] as const),
  ...nqRecord().observations.map((observation) => [observation.id, evidenceOf(observation, nqTask())] as const),
];
/** The capable plant's strict leg: the committed strict leg with scope task, exit code 0, coverage complete, absence licensed and the base revision resolved. */
const capableLeg = (source: NamedQueryRecord): Observation => {
  const strict = source.observations[0];
  if (strict === undefined) throw new Error("the record has no named-query leg");
  return {
    ...strict,
    scope: "task",
    exitCode: 0,
    completeness: "complete",
    licensesAbsence: true,
    revision: { requested: `git:${source.task.baseRevision}`, resolvedCommit: source.task.baseRevision },
  };
};
/** A record with `observations` and its verdict, reasons and blocker recomputed by the judge (a coherent plant). */
const rejudged = (source: NamedQueryRecord, observations: readonly Observation[]): NamedQueryRecord => {
  const judged = judgeNamedQueryRoute(source.task, observations);
  return { ...source, observations, verdict: judged.verdict, capable: judged.capable, reasons: judged.reasons, blocker: judged.blocker };
};
/** `source` with leg `index` merged with `patch` (and its query with `query`); the stated verdict, reasons and blocker are kept. */
const legPlant = (
  source: NamedQueryRecord,
  index: number,
  patch: Readonly<Record<string, unknown>>,
  query: Readonly<Record<string, unknown>> = {},
): Readonly<Record<string, unknown>> => ({
  ...source,
  observations: source.observations.map((observation, at) => (at === index ? { ...observation, ...patch, query: { ...observation.query, ...query } } : observation)),
});
interface ReadLog {
  readonly keys: string[];
  readonly inChecks: string[];
  listings: number;
  readonly descriptors: string[];
}
/** `record` behind a proxy that logs each key read, in-check, key listing and property-descriptor read (R163-GATE-INDEPENDENT). */
const recording = (record: object): { readonly proxy: object; readonly log: ReadLog } => {
  const log: ReadLog = { keys: [], inChecks: [], listings: 0, descriptors: [] };
  const proxy = new Proxy(record, {
    get: (target, key, receiver) => {
      log.keys.push(String(key));
      return Reflect.get(target, key, receiver);
    },
    has: (target, key) => {
      log.inChecks.push(String(key));
      return Reflect.has(target, key);
    },
    ownKeys: (target) => {
      log.listings += 1;
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor: (target, key) => {
      log.descriptors.push(String(key));
      return Reflect.getOwnPropertyDescriptor(target, key);
    },
  });
  return { proxy, log };
};
/** gateOfRecord's witness for `source`, read through the recording proxy when `source` is an object: a read of its findVerb key or a listing of its keys fails the case. */
const witnessOf = (source: unknown): GateWitness => {
  if (source === null || typeof source !== "object" || Array.isArray(source)) return gateOfRecord(source).witness;
  const { proxy, log } = recording(source);
  const witness = gateOfRecord(proxy).witness;
  if (log.keys.includes("findVerb") || log.inChecks.length > 0 || log.listings > 0 || log.descriptors.length > 0) {
    throw new Error(`gateOfRecord read the record's findVerb key or listed its keys: ${JSON.stringify(log)}`);
  }
  return witness;
};
/** The record keys gateOfRecord reads (R163-GATE-INDEPENDENT), sorted. */
const GATE_KEYS = ["blocker", "capable", "definition", "observations", "producer", "reasons", "route", "schema", "task", "verdict"];
/** `record` without its `key` property. */
const without = (record: object, key: string): Readonly<Record<string, unknown>> => Object.fromEntries(Object.entries(record).filter(([name]) => name !== key));
/** FIND_VERB_VARIANTS: the find-verb sections R163-GATE-INDEPENDENT puts in place of `source`'s. */
const findVerbVariants = (source: NamedQueryRecord): readonly (readonly [string, unknown])[] => {
  const section = source.findVerb;
  return [
    ["binary 0 sixty-four times", { ...section, binarySha256: "0".repeat(64) }],
    ["binary null", { ...section, binarySha256: null }],
    ["binary wb-f3wd's", { ...section, binarySha256: findRecord().producer.binarySha256 }],
    ["binary removed", without(section, "binarySha256")],
    ["verdict task-scope-supported", { ...section, verdict: "task-scope-supported" }],
    ["verdict task-scope-unsupported", { ...section, verdict: "task-scope-unsupported" }],
    ["verdict removed", without(section, "verdict")],
    ["legs empty", { ...section, legs: [] }],
    ["legs reversed", { ...section, legs: [...section.legs].reverse() }],
    ["every leg exit code 0", { ...section, legs: section.legs.map((leg) => ({ ...leg, exitCode: 0 })) }],
    ["an empty object", {}],
    ["null", null],
    ["an array", []],
    ["a string", "task-scope-supported"],
  ];
};
/** Every object key and string value of `value`, depth first. */
const stringsOf = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((item: unknown) => stringsOf(item));
  if (value !== null && typeof value === "object") return Object.entries(value).flatMap(([key, inner]) => [key, ...stringsOf(inner)]);
  return [];
};
/** Where R163-RECORD-TIED splits a string into tokens. */
const TOKEN_SPLIT = /[\s"'`=,;|()[\]{}<>]+/;
/** The token forms R163-RECORD-TIED reads as a host path. */
const HOST_PATH_TOKENS: readonly RegExp[] = [/^\//, /^file:/i, /^~(?:\/|$)/, /^[A-Za-z]:[\\/]/, /:\/[^/]/];
/** The strings of `value` that hold a host path: one of `roots`, or a token of a host-path form. */
const hostPathsIn = (value: unknown, roots: readonly string[]): string[] =>
  stringsOf(value).filter((text) => roots.some((root) => text.includes(root)) || text.split(TOKEN_SPLIT).some((token) => HOST_PATH_TOKENS.some((form) => form.test(token))));
/** isInstantOn(utc, day) of R163-RECORD-TIED: a string that starts with `${day}T` and that new Date(utc).toISOString() returns unchanged. */
const isInstantOn = (utc: unknown, day: string): boolean => {
  if (typeof utc !== "string" || !utc.startsWith(`${day}T`)) return false;
  const time = Date.parse(utc);
  return Number.isFinite(time) && new Date(time).toISOString() === utc;
};
/** INSTANT_PLANTS: utc values and their isInstantOn(utc, 2026-11-11) readings. */
const INSTANT_PLANTS: readonly (readonly [unknown, boolean])[] = [
  ["2026-11-11T00:00:00.000Z", true],
  ["2026-11-11T23:59:59.999Z", true],
  ["2026-11-11T99:99:99.999Z", false],
  ["2026-11-11T24:00:00.000Z", false],
  ["2026-11-11T23:60:00.000Z", false],
  ["2026-11-11T23:59:60.000Z", false],
  ["2026-11-11T07:41:37.214+00:00", false],
  ["2026-11-11T07:41:37Z", false],
  ["2026-11-11T07:41:37.2140Z", false],
  ["2026-11-11T7:41:37.214Z", false],
  ["2026-11-11T07:41:37.214z", false],
  ["2026-11-11 07:41:37.214Z", false],
  ["2026-11-12T00:00:00.000Z", false],
  [1794382897214, false],
  [null, false],
];
/** The four commands of the committed definition, for `task` (R163-RECORD-PINS). */
const r163Commands = (task: Task): readonly (readonly string[])[] => [
  ["hx", "init", WORKSPACE],
  ["hx", "--hxs", `--view=git:${task.baseRevision}`, "find", "--kind", "hx.fs/regular-file", "--plan", "."],
  ["hx", "query", "save", "hx-admit-task-scope", "--param=task:string=hx-task-scope-probe", `--doc=${task.digest}`],
  ["hx", "--hxs", "query", "show", "hx-admit-task-scope"],
];

const GAPS_OF_FIND: Readonly<Record<string, readonly ScopeGap[]>> = {
  "filesystem-live": ["exit-nonzero", "coverage-not-complete", "absence-unlicensed", "task-scope-absent", "revision-unbound", "query-digest-absent"],
  "filesystem-live-best-effort": ["coverage-not-complete", "absence-unlicensed", "task-scope-absent", "revision-unbound", "query-digest-absent"],
  "revision-pinned": [
    "answer-missing",
    "exit-nonzero",
    "terminal-unreached",
    "coverage-not-complete",
    "absence-unlicensed",
    "task-scope-absent",
    "revision-unbound",
    "query-digest-absent",
  ],
};
const GAPS_OF_NAMED: Readonly<Record<string, readonly ScopeGap[]>> = {
  "named-query-strict": ["exit-nonzero", "coverage-not-complete", "absence-unlicensed", "task-scope-absent", "revision-unbound"],
  "named-query-best-effort": ["coverage-not-complete", "absence-unlicensed", "task-scope-absent", "revision-unbound"],
};
/** QUIET-EVIDENCE-ADAPTER's literal readings of the five measured answers. */
const ADAPTER_READINGS: Readonly<Record<string, ScopeEvidence>> = {
  "filesystem-live": {
    answered: true,
    exitCode: 3,
    terminalReached: true,
    coverage: "incomplete",
    absenceLicensed: false,
    knownEmpty: false,
    workspace: "<workspace>",
    taskDigest: null,
    queryDigest: null,
    resolvedRevision: null,
  },
  "filesystem-live-best-effort": {
    answered: true,
    exitCode: 0,
    terminalReached: true,
    coverage: "incomplete",
    absenceLicensed: false,
    knownEmpty: false,
    workspace: "<workspace>",
    taskDigest: null,
    queryDigest: null,
    resolvedRevision: null,
  },
  "revision-pinned": {
    answered: false,
    exitCode: 4,
    terminalReached: false,
    coverage: null,
    absenceLicensed: false,
    knownEmpty: false,
    workspace: "<workspace>",
    taskDigest: null,
    queryDigest: null,
    resolvedRevision: null,
  },
  "named-query-strict": {
    answered: true,
    exitCode: 3,
    terminalReached: true,
    coverage: "unknown",
    absenceLicensed: false,
    knownEmpty: false,
    workspace: "<workspace>",
    taskDigest: null,
    queryDigest: "sha256/hxq-normalized-v1:82613cb1319b7d5d696a7687b6b98ae8a8711e82ea5b9bc803fe80935823ab13",
    resolvedRevision: null,
  },
  "named-query-best-effort": {
    answered: true,
    exitCode: 0,
    terminalReached: true,
    coverage: "unknown",
    absenceLicensed: false,
    knownEmpty: false,
    workspace: "<workspace>",
    taskDigest: null,
    queryDigest: "sha256/hxq-normalized-v1:82613cb1319b7d5d696a7687b6b98ae8a8711e82ea5b9bc803fe80935823ab13",
    resolvedRevision: null,
  },
};

const CASES: Readonly<Record<string, () => void | Promise<void>>> = {
  "R058-MEASURED-PARTIAL": async () => {
    const source = findRecord();
    expect(source.observations.map((observation) => observation.id)).toEqual(Object.keys(GAPS_OF_FIND));
    expect(source.observations.map((observation) => [observation.id, observation.outcome, observation.completeness, observation.exitCode])).toEqual([
      ["filesystem-live", "result", "incomplete", 3],
      ["filesystem-live-best-effort", "result", "incomplete", 0],
      ["revision-pinned", "process-failure", null, 4],
    ]);
    const expected = nqExpectation();
    for (const observation of source.observations) {
      const evidence = evidenceOf(observation, source.task);
      expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "needs_evidence", gaps: GAPS_OF_FIND[observation.id] });
      const counted = countingWriter();
      const outcome = await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
      expect(outcome).toEqual(scopeRefusal({ outcome: "needs_evidence", gaps: GAPS_OF_FIND[observation.id] }));
      expect(counted.calls).toHaveLength(0);
    }
  },
  "R058-MEASURED-UNKNOWN": async () => {
    const source = nqRecord();
    expect(source.observations.map((observation) => [observation.id, observation.completeness])).toEqual([
      ["named-query-strict", "unknown"],
      ["named-query-best-effort", "unknown"],
    ]);
    for (const observation of source.observations) {
      const evidence = evidenceOf(observation, source.task);
      expect(judgeScopeEvidence(nqExpectation(), evidence)).toEqual({ outcome: "needs_evidence", gaps: GAPS_OF_NAMED[observation.id] });
      const counted = countingWriter();
      const outcome = await dispatchAdmittedWriter(nativeRequest(nqExpectation(), evidence), counted.writer);
      expect(outcome.dispatched).toBe(false);
      expect(outcome).toEqual(scopeRefusal({ outcome: "needs_evidence", gaps: GAPS_OF_NAMED[observation.id] }));
      expect(counted.calls).toHaveLength(0);
    }
  },
  "R058-FALSE-KNOWN-EMPTY": async () => {
    const source = findRecord();
    const bestEffort = source.observations.find((observation) => observation.id === "filesystem-live-best-effort");
    if (bestEffort === undefined) throw new Error("no best-effort leg");
    const evidence = evidenceOf({ ...bestEffort, answerCount: 0 }, source.task);
    const expected = nqExpectation();
    const restated = { outcome: "needs_evidence", gaps: ["coverage-not-complete", "absence-unlicensed", "known-empty-unlicensed", "task-scope-absent", "revision-unbound", "query-digest-absent"] };
    expect(judgeScopeEvidence(expected, evidence)).toEqual(restated);
    const capableButEmpty = { ...capableEvidence(expected), knownEmpty: true, absenceLicensed: false };
    const unlicensed = { outcome: "needs_evidence", gaps: ["absence-unlicensed", "known-empty-unlicensed"] };
    expect(judgeScopeEvidence(expected, capableButEmpty)).toEqual(unlicensed);
    const counted = countingWriter();
    expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer)).toEqual(scopeRefusal(restated));
    expect(await dispatchAdmittedWriter(nativeRequest(expected, capableButEmpty), counted.writer)).toEqual(scopeRefusal(unlicensed));
    expect(counted.calls).toHaveLength(0);
  },
  "R058-POSITIVE-CONTROL": async () => {
    for (const [label, expected] of expectations()) {
      for (const evidence of [capableEvidence(expected), { ...capableEvidence(expected), knownEmpty: true }]) {
        expect(judgeScopeEvidence(expected, evidence), label).toEqual({ outcome: "admitted" });
        const counted = countingWriter();
        const outcome = await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
        expect(counted.calls, label).toHaveLength(1);
        expect(counted.calls[0], label).toEqual({ invocationId: INVOCATION, label: NATIVE_SCOPE_MODE });
        expect(Object.isFrozen(counted.calls[0]), label).toBe(true);
        expect(outcome, label).toEqual({ dispatched: true, admission: counted.calls[0], value: "written" });
      }
    }
  },
  "M-EMPTY-AS-COMPLETE": () => {
    for (const [label, expected] of expectations()) {
      for (const coverage of ["incomplete", "unknown", null] as const) {
        const verdict = judgeScopeEvidence(expected, { ...capableEvidence(expected), knownEmpty: true, coverage });
        expect(verdict, `${label} ${String(coverage)}`).toEqual({ outcome: "needs_evidence", gaps: ["coverage-not-complete", "known-empty-unlicensed"] });
      }
    }
  },
  "R058-EACH-CONDITION": async () => {
    expect(EXIT_CODES_NOT_ZERO).toHaveLength(600 + 8 + 6 + 2 + 1 + 1);
    for (const [label, expected] of expectations()) {
      const capable = capableEvidence(expected);
      const plants: (readonly [string, ScopeEvidence, ScopeGap])[] = [
        ["answered false", { ...capable, answered: false }, "answer-missing"],
        ...EXIT_CODES_NOT_ZERO.map((exitCode) => [`exit ${String(exitCode)}`, { ...capable, exitCode }, "exit-nonzero"] as const),
        ["terminal not reached", { ...capable, terminalReached: false }, "terminal-unreached"],
        ...(["incomplete", "unknown", null] as const).map((coverage) => [`coverage ${String(coverage)}`, { ...capable, coverage }, "coverage-not-complete"] as const),
        ["absence not licensed", { ...capable, absenceLicensed: false }, "absence-unlicensed"],
        ...UNSTATED_GAPS.flatMap(([name, gap]) => [null, ""].map((value) => [`${name} ${JSON.stringify(value)}`, stating(capable, name, value), gap] as const)),
      ];
      expect(plants).toHaveLength(1 + EXIT_CODES_NOT_ZERO.length + 1 + 3 + 1 + 8);
      const counted = countingWriter();
      for (const [name, evidence, gap] of plants) {
        const verdict = { outcome: "needs_evidence", gaps: [gap] };
        expect(judgeScopeEvidence(expected, evidence), `${label} ${name}`).toEqual(verdict);
        expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer), `${label} ${name}`).toEqual(scopeRefusal(verdict));
      }
      expect(counted.calls).toHaveLength(0);
      for (const exitCode of [0, -0]) expect(judgeScopeEvidence(expected, { ...capable, exitCode }), label).toEqual({ outcome: "admitted" });
    }
  },
  "R058-GAP-ORDER": () => {
    expect(SCOPE_GAPS).toEqual(GAP_ORDER);
    for (const [label, expected] of expectations()) {
      for (let mask = 0; mask < SWEEP; mask += 1) {
        const gaps = sweptGaps(mask);
        expect(judgeScopeEvidence(expected, sweptEvidence(expected, mask)), `${label} mask ${mask}`).toEqual(gaps.length === 0 ? { outcome: "admitted" } : { outcome: "needs_evidence", gaps });
      }
      expect(judgeScopeEvidence(expected, sweptEvidence(expected, SWEEP - 1))).toEqual({ outcome: "needs_evidence", gaps: [...SCOPE_GAPS] });
    }
    expect(sweptGaps(SWEEP - 1)).toHaveLength(10);
  },
  "R059-TASK-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), taskDigest: `sha256:${"9".repeat(64)}` };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "task" });
    const counted = countingWriter();
    expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer)).toEqual(scopeRefusal({ outcome: "refused", mismatch: "task" }));
    expect(counted.calls).toHaveLength(0);
  },
  "R059-QUERY-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), queryDigest: `sha256/hxq-normalized-v1:${"8".repeat(64)}` };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "query" });
    const counted = countingWriter();
    expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer)).toEqual(scopeRefusal({ outcome: "refused", mismatch: "query" }));
    expect(counted.calls).toHaveLength(0);
  },
  "R059-REVISION-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), resolvedRevision: "7".repeat(40) };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "revision" });
    const counted = countingWriter();
    expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer)).toEqual(scopeRefusal({ outcome: "refused", mismatch: "revision" }));
    expect(counted.calls).toHaveLength(0);
  },
  "R059-IDENTITY-VARIANTS": async () => {
    expect(VARIANT_FAMILIES).toEqual([
      "case-whole",
      "case-one",
      "prefix",
      "suffix",
      "extension",
      "padding",
      "path-form",
      "substitution",
      "deletion",
      "insertion",
      "transposition",
      "full-width",
      "combining-mark",
      "encoded",
      "prefixed",
    ]);
    expect(PAD_CODE_POINTS.map((point) => point.toString(16))).toEqual([
      "9",
      "a",
      "b",
      "c",
      "d",
      "20",
      "85",
      "a0",
      "ad",
      "1680",
      "180e",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "200a",
      "200b",
      "200c",
      "200d",
      "2028",
      "2029",
      "202f",
      "205f",
      "2060",
      "3000",
      "feff",
    ]);
    expect(PADS).toHaveLength(33);
    expect(PADS[32]).toBe("\r\n");
    expect(new Set(PADS).size).toBe(33);
    const counts: string[] = [];
    const failures: string[] = [];
    for (const [label, expected] of expectations()) {
      const bases: readonly (readonly [string, ScopeEvidence])[] = [
        ["capableEvidence", capableEvidence(expected)],
        ["sweptEvidence 1023", sweptEvidence(expected, SWEEP - 1)],
        ...(label === "MEASURED" ? measuredAnswers() : []),
      ];
      for (const [name, mismatch] of IDENTITIES) {
        const value = expected[EXPECTED_FIELD[name]];
        const corpus = variantsOf(value);
        counts.push(`${label}.${name}:${corpus.length}`);
        expect([...new Set(corpus.map(([family]) => family))], `${label} ${name} families`).toEqual([...VARIANT_FAMILIES]);
        const refused = { outcome: "refused", mismatch };
        const counted = countingWriter();
        for (const [family, variant] of corpus) {
          if (variant === value) failures.push(`${label} ${name} ${family}: the variant equals the value`);
          for (const [baseName, base] of bases) {
            const verdict = judgeScopeEvidence(expected, stating(base, name, variant));
            if (JSON.stringify(verdict) !== JSON.stringify(refused)) failures.push(`${label} ${name} ${family} ${JSON.stringify(variant)} on ${baseName}: ${JSON.stringify(verdict)}`);
          }
          const outcome = await dispatchAdmittedWriter(nativeRequest(expected, stating(capableEvidence(expected), name, variant)), counted.writer);
          if (JSON.stringify(outcome) !== JSON.stringify(scopeRefusal(refused))) failures.push(`${label} ${name} ${family} ${JSON.stringify(variant)} dispatched: ${JSON.stringify(outcome)}`);
        }
        expect(counted.calls, `${label} ${name}`).toHaveLength(0);
        const rebuilt = Array.from(value).join("");
        expect(judgeScopeEvidence(expected, stating(capableEvidence(expected), name, rebuilt)), `${label} ${name} rebuilt`).toEqual({ outcome: "admitted" });
      }
    }
    expect(failures).toEqual([]);
    expect(counts).toEqual(VARIANT_COUNTS);
  },
  "R059-BEFORE-WRITER": async () => {
    const expected = nqExpectation();
    const strict = nqRecord().observations[0];
    if (strict === undefined) throw new Error("no strict leg");
    const gappy = { ...evidenceOf(strict, nqTask()), resolvedRevision: "7".repeat(40) };
    expect(judgeScopeEvidence(expected, gappy)).toEqual({ outcome: "refused", mismatch: "revision" });
    const order: string[] = [];
    const outcome = await dispatchAdmittedWriter(nativeRequest(expected, gappy), () => {
      order.push("writer");
      return "written";
    });
    order.push("returned");
    expect(outcome.dispatched).toBe(false);
    expect(order).toEqual(["returned"]);
    const failures: string[] = [];
    let judged = 0;
    for (const [name, mismatch, planted] of IDENTITIES) {
      const corpus = variantsOf(expected[EXPECTED_FIELD[name]]);
      const representatives = [...planted, ...VARIANT_FAMILIES.map((family) => corpus.find(([of]) => of === family)?.[1] ?? "")];
      expect(representatives, name).toHaveLength(2 + VARIANT_FAMILIES.length);
      expect(representatives.includes(""), name).toBe(false);
      const refused = { outcome: "refused", mismatch };
      for (const other of representatives) {
        for (let mask = 0; mask < SWEEP; mask += 1) {
          const verdict = judgeScopeEvidence(expected, stating(sweptEvidence(expected, mask), name, other));
          judged += 1;
          if (JSON.stringify(verdict) !== JSON.stringify(refused)) failures.push(`${mismatch} ${JSON.stringify(other)} mask ${mask}: ${JSON.stringify(verdict)}`);
        }
        for (const observation of nqRecord().observations) {
          const evidence = stating(evidenceOf(observation, nqTask()), name, other);
          expect(judgeScopeEvidence(expected, evidence)).toEqual(refused);
          const steps: string[] = [];
          const answered = await dispatchAdmittedWriter(nativeRequest(expected, evidence), () => {
            steps.push("writer");
            return "written";
          });
          steps.push("returned");
          expect(answered).toEqual(scopeRefusal(refused));
          expect(steps).toEqual(["returned"]);
        }
      }
    }
    expect(failures).toEqual([]);
    expect(judged).toBe(IDENTITIES.length * (2 + VARIANT_FAMILIES.length) * SWEEP);
  },
  "M-WORKSPACE-NAME-ONLY": () => {
    const expected = nqExpectation();
    const capable = capableEvidence(expected);
    const plants: readonly (readonly [Partial<ScopeEvidence>, string])[] = [
      [{ taskDigest: `sha256:${"9".repeat(64)}` }, "task"],
      [{ queryDigest: `sha256/hxq-normalized-v1:${"8".repeat(64)}` }, "query"],
      [{ resolvedRevision: "7".repeat(40) }, "revision"],
      [{ workspace: "<other-workspace>" }, "root"],
    ];
    for (const [plant, mismatch] of plants) {
      const evidence = { ...capable, ...plant };
      if (mismatch !== "root") expect(evidence.workspace).toBe(expected.workspace);
      expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch });
    }
  },
  "R059-CHECK-ORDER": () => {
    expect(SCOPE_MISMATCHES).toEqual(["root", "task", "query", "revision"]);
    expect(IDENTITIES.map(([, mismatch]) => mismatch)).toEqual(["root", "task", "query", "revision"]);
    const expected = nqExpectation();
    for (let set = 1; set < 1 << IDENTITIES.length; set += 1) {
      const members = IDENTITIES.filter((_, index) => (set & (1 << index)) !== 0);
      const first = members[0]?.[1];
      for (const base of [capableEvidence(expected), stating(stating(stating(stating(sweptEvidence(expected, SWEEP - 1), "workspace", null), "taskDigest", null), "queryDigest", null), "resolvedRevision", null)]) {
        let evidence = base;
        for (const [name, , [other]] of members) evidence = stating(evidence, name, other);
        expect(judgeScopeEvidence(expected, evidence), `set ${set}`).toEqual({ outcome: "refused", mismatch: first });
      }
    }
  },
  "R062-NATIVE-BLOCKED": async () => {
    const expected = nqExpectation();
    for (const witness of ["unsupported", "missing"] as const) {
      const blocker = { gate: SCOPE_PROBE_GATE, scope: NATIVE_SCOPE_MODE, witness, notBlocked: [GIT_CENSUS_MODE] };
      expect(scopeBlockerOf({ witness })).toEqual(blocker);
      const counted = countingWriter();
      const outcome = await dispatchAdmittedWriter(nativeRequest(expected, capableEvidence(expected), { witness }), counted.writer);
      expect(outcome).toEqual({ dispatched: false, refusal: { stage: "gate", blocker } });
      expect(counted.calls).toHaveLength(0);
    }
    expect(scopeBlockerOf(OPEN_GATE)).toBeNull();
  },
  "R062-GIT-CENSUS-PASSES": async () => {
    const expected = nqExpectation();
    const closed = await dispatchAdmittedWriter(nativeRequest(expected, capableEvidence(expected), { witness: "unsupported" }), () => "written");
    expect(closed.dispatched).toBe(false);
    const counted = countingWriter();
    const census = await dispatchAdmittedWriter({ mode: GIT_CENSUS_MODE, invocationId: INVOCATION, authorized: true }, counted.writer);
    expect(counted.calls).toEqual([{ invocationId: INVOCATION, label: GIT_CENSUS_MODE }]);
    expect(census).toEqual({ dispatched: true, admission: counted.calls[0], value: "written" });
    const refused = countingWriter();
    expect(await dispatchAdmittedWriter({ mode: GIT_CENSUS_MODE, invocationId: INVOCATION, authorized: false }, refused.writer)).toEqual({
      dispatched: false,
      refusal: { stage: "authority", reason: "git-census-unauthorized" },
    });
    expect(refused.calls).toHaveLength(0);
  },
  "M-DISABLE-ALL": async () => {
    const blocker = scopeBlockerOf({ witness: witnessOf(nqRecord()) });
    expect(blocker?.notBlocked).toEqual([GIT_CENSUS_MODE]);
    const counted = countingWriter();
    await dispatchAdmittedWriter({ mode: GIT_CENSUS_MODE, invocationId: INVOCATION, authorized: true }, counted.writer);
    expect(counted.calls).toHaveLength(1);
  },
  "R062-ONE-FROZEN-ADMISSION": async () => {
    const expected = nqExpectation();
    const requests: readonly (readonly [WriterRequest, string, string])[] = [
      [{ mode: NATIVE_SCOPE_MODE, invocationId: "inv-native-7", gate: OPEN_GATE, scope: { expected, evidence: capableEvidence(expected) } }, "inv-native-7", NATIVE_SCOPE_MODE],
      [censusRequest(true, "inv-census-8"), "inv-census-8", GIT_CENSUS_MODE],
    ];
    for (const [request, invocationId, label] of requests) {
      for (const later of [false, true]) {
        const calls: WriterAdmission[] = [];
        const outcome = await dispatchAdmittedWriter(request, (admission): string | Promise<string> => {
          calls.push(admission);
          return later ? Promise.resolve("written-later") : "written-now";
        });
        expect(calls).toHaveLength(1);
        const [admission] = calls;
        expect(admission).toStrictEqual({ invocationId, label });
        expect(Object.isFrozen(admission)).toBe(true);
        expect(outcome.dispatched).toBe(true);
        if (!outcome.dispatched) throw new Error(`${label} was not dispatched`);
        expect(outcome.admission).toBe(admission);
        expect(outcome.value).toBe(later ? "written-later" : "written-now");
        expect(Object.keys(outcome).sort()).toEqual(["admission", "dispatched", "value"]);
      }
    }
  },
  "R062-WRITER-ERROR-PROPAGATES": async () => {
    const expected = nqExpectation();
    const requests: readonly WriterRequest[] = [nativeRequest(expected, capableEvidence(expected)), censusRequest(true)];
    const thrown: readonly unknown[] = [new Error("writer failed"), "writer failed", { writer: "failed" }, undefined];
    for (const request of requests) {
      for (const value of thrown) {
        let throwing = 0;
        await expect(
          dispatchAdmittedWriter(request, (): string => {
            throwing += 1;
            throw value;
          }),
        ).rejects.toBe(value);
        expect(throwing).toBe(1);
        let rejecting = 0;
        await expect(
          dispatchAdmittedWriter(request, (): Promise<string> => {
            rejecting += 1;
            return Promise.reject(value);
          }),
        ).rejects.toBe(value);
        expect(rejecting).toBe(1);
      }
    }
  },
  "R062-REFUSAL-ORDER": async () => {
    const expected = nqExpectation();
    const strict = nqRecord().observations[0];
    if (strict === undefined) throw new Error("no strict leg");
    const evidences: readonly ScopeEvidence[] = [
      capableEvidence(expected),
      evidenceOf(strict, nqTask()),
      { ...capableEvidence(expected), taskDigest: `sha256:${"9".repeat(64)}` },
      sweptEvidence(expected, SWEEP - 1),
    ];
    const witnesses = ["supported", "unsupported", "missing"] as const;
    const counted = countingWriter();
    let malformed = 0;
    for (const witness of witnesses) {
      for (const evidence of evidences) {
        const requests: readonly WriterRequest[] = [
          { mode: NATIVE_SCOPE_MODE, invocationId: "", gate: { witness }, scope: { expected, evidence } },
          { mode: NATIVE_SCOPE_MODE, invocationId: INVOCATION, gate: { witness }, scope: { expected: { ...expected, workspace: "" }, evidence } },
          { mode: NATIVE_SCOPE_MODE, invocationId: INVOCATION, gate: { witness }, scope: { expected: { ...expected, taskDigest: "" }, evidence } },
          { mode: NATIVE_SCOPE_MODE, invocationId: INVOCATION, gate: { witness }, scope: { expected: { ...expected, queryDigest: "" }, evidence } },
          { mode: NATIVE_SCOPE_MODE, invocationId: INVOCATION, gate: { witness }, scope: { expected: { ...expected, baseRevision: "" }, evidence } },
        ];
        for (const request of requests) {
          expect(await dispatchAdmittedWriter(request, counted.writer)).toEqual(MALFORMED);
          malformed += 1;
        }
      }
    }
    for (const authorized of [true, false]) {
      expect(await dispatchAdmittedWriter(censusRequest(authorized, ""), counted.writer)).toEqual(MALFORMED);
      malformed += 1;
    }
    expect(malformed).toBe(witnesses.length * evidences.length * 5 + 2);
    for (const witness of ["unsupported", "missing"] as const) {
      for (const evidence of evidences) {
        expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence, { witness }), counted.writer)).toEqual({
          dispatched: false,
          refusal: { stage: "gate", blocker: { gate: SCOPE_PROBE_GATE, scope: NATIVE_SCOPE_MODE, witness, notBlocked: [GIT_CENSUS_MODE] } },
        });
      }
    }
    expect(counted.calls).toHaveLength(0);
  },
  "R163-RECORD-PINS": () => {
    const source = nqRecord();
    expect([source.schema, source.bead, source.requirement, source.gate, source.route]).toEqual([
      "workbench.hx-named-query-probe/v1",
      "wb-pxvv",
      "EAT-R163",
      SCOPE_PROBE_GATE,
      ROUTE,
    ]);
    expect([ROUTE, VERB, QUERY_NAME, DEFINITION_TOKEN]).toEqual(["named-query", "run", "hx-admit-task-scope", "<captured-definition>"]);
    expect(source.producer.name).toBe("hx");
    expect(source.producer.version).toBe("0.1.0");
    expect(source.producer.binarySha256).toMatch(/^[0-9a-f]{64}$/);
    expect(source.producer.binarySha256).toBe(measured("producer.binarySha256"));
    expect(source.producer.binarySha256).not.toBe(findRecord().producer.binarySha256);
    expect([source.producer.binaryOrigin, source.producer.hxsVersion, source.producer.protocol]).toEqual(["path", "1.0", "hxs/1.0"]);
    expect(String(source.producer.capabilities.count)).toBe(measured("producer.capabilities.count"));
    expect(source.producer.capabilities.taskNamed).toEqual([]);
    expect(source.producer.sdk).toEqual({ name: "@hyperunix/sdk", version: "0.1.0", reported: "0.1.0" });
    const task = source.task;
    expect(task).toEqual(findRecord().task);
    expect([task.id, task.kind, task.root, task.baseRevision]).toEqual(["hx-task-scope-probe", "hx.fs/regular-file", ".", findRecord().task.baseRevision]);
    expect(task.digest).toBe(findRecord().task.digest);
    const definition = source.definition;
    expect([definition.name, definition.verb]).toEqual([QUERY_NAME, VERB]);
    expect([definition.name, definition.verb]).toEqual(["hx-admit-task-scope", "run"]);
    expect(definition.parameters).toEqual([{ name: "task", type: "string", default: task.id }]);
    expect([definition.doc, definition.formedUnder, definition.savedView]).toEqual([task.digest, `git:${task.baseRevision}`, null]);
    expect(definition.commands.map((command) => command.slice(0, 4))).toEqual([
      ["hx", "init", WORKSPACE],
      ["hx", "--hxs", `--view=git:${task.baseRevision}`, "find"],
      ["hx", "query", "save", QUERY_NAME],
      ["hx", "--hxs", "query", "show"],
    ]);
    expect(definition.commands).toEqual(r163Commands(task));
    expect(definition.semanticDigest).toMatch(/^sha256\/hxq-normalized-v1:[0-9a-f]{64}$/);
    expect(definition.semanticDigest).toBe(measured("definition.semanticDigest"));
    expect(source.observations.map((observation) => observation.id)).toEqual(LEGS.map((leg) => leg.id));
    const legs = [
      ["named-query-strict", false, "error"],
      ["named-query-best-effort", true, "warning"],
    ] as const;
    expect(LEGS.map((leg) => [leg.id, leg.bestEffort])).toEqual(legs.map(([id, bestEffort]) => [id, bestEffort]));
    expect(source.observations.map((observation) => observation.id)).toEqual(legs.map(([id]) => id));
    for (const [index, observation] of source.observations.entries()) {
      const [, bestEffort, severity] = legs[index] ?? ["", false, ""];
      expect(observation.query.operation).toBe(VERB);
      expect(observation.argv.slice(0, 4)).toEqual(["--workspace", WORKSPACE, VERB, QUERY_NAME]);
      expect(observation.argv).not.toContain("find");
      expect(observation.argv).toEqual([
        "--workspace",
        WORKSPACE,
        "run",
        "hx-admit-task-scope",
        "--query",
        "<captured-definition>",
        ...(bestEffort ? ["--best-effort"] : []),
        "--hxs",
      ]);
      expect(observation.query).toEqual({ operation: "run", name: "hx-admit-task-scope", kind: "hx.fs/regular-file", root: ".", view: `git:${task.baseRevision}`, bestEffort });
      expect(observation.diagnostics).toEqual([{ code: "HX-COVERAGE-INCOMPLETE", severity, reason: null }]);
      expect(observation.queryDigest).toBe(definition.semanticDigest);
      expect(String(observation.exitCode)).toBe(measured(`${observation.id}.exitCode`));
      expect(observation.view).toBe("hx.view/workspace-head");
    }
    expect(source.findVerb.binarySha256).toBe(source.producer.binarySha256);
    expect(source.findVerb.legs.map((leg) => leg.id)).toEqual(FIND_LEGS.map((leg) => leg.id));
    expect(source.findVerb.verdict).toBe(measured("findVerb.verdict"));
    expect(source.findVerb.legs.map((leg) => String(leg.exitCode))).toEqual(FIND_LEGS.map((leg) => measured(`findVerb.${leg.id}.exitCode`)));
  },
  "R163-NAMED-QUERY-VERDICT": () => {
    const source = nqRecord();
    const judged = judgeNamedQueryRoute(source.task, source.observations);
    expect(judged).toEqual(judgeTaskScope(source.task, source.observations));
    expect({ verdict: source.verdict, capable: source.capable, reasons: source.reasons, blocker: source.blocker }).toEqual(judged);
    expect(source.verdict).toBe("task-scope-unsupported");
    expect(source.reasons).toEqual({
      "named-query-strict": ["exit-nonzero", "coverage-not-complete", "absence-unlicensed", "scope-not-task", "revision-unbound"],
      "named-query-best-effort": ["coverage-not-complete", "absence-unlicensed", "scope-not-task", "revision-unbound"],
    });
    expect(source.blocker).toEqual({ gate: SCOPE_PROBE_GATE, scope: NATIVE_SCOPE_MODE, witness: "unsupported", notBlocked: [GIT_CENSUS_MODE] });
  },
  "R163-GATE-INDEPENDENT": async () => {
    const source = nqRecord();
    expect(witnessOf(source)).toBe("unsupported");
    const findSaysSupported = { ...source, findVerb: { ...source.findVerb, verdict: "task-scope-supported" } };
    expect(witnessOf(findSaysSupported)).toBe("unsupported");
    const capable = rejudged(source, [capableLeg(source), ...source.observations.slice(1)]);
    expect(capable.verdict).toBe("task-scope-supported");
    for (const verdict of ["task-scope-unsupported", "task-scope-supported"]) {
      expect(witnessOf({ ...capable, findVerb: { ...capable.findVerb, verdict } })).toBe("supported");
    }
    const records: readonly (readonly [string, NamedQueryRecord, GateWitness])[] = [
      ["the committed record", source, "unsupported"],
      ["the capable plant", capable, "supported"],
    ];
    const variants = findVerbVariants(source);
    expect(variants.map(([name]) => name)).toEqual([
      "binary 0 sixty-four times",
      "binary null",
      "binary wb-f3wd's",
      "binary removed",
      "verdict task-scope-supported",
      "verdict task-scope-unsupported",
      "verdict removed",
      "legs empty",
      "legs reversed",
      "every leg exit code 0",
      "an empty object",
      "null",
      "an array",
      "a string",
    ]);
    for (const [name, record, witness] of records) {
      const { proxy, log } = recording(record);
      expect(gateOfRecord(proxy), name).toEqual({ route: ROUTE, witness });
      expect([...new Set(log.keys)].sort(), name).toEqual(GATE_KEYS);
      expect([log.inChecks, log.listings, log.descriptors], name).toEqual([[], 0, []]);
      for (const [variantName, section] of variants) {
        expect(witnessOf({ ...record, findVerb: section }), `${name}, findVerb ${variantName}`).toBe(witness);
      }
      expect(witnessOf(without(record, "findVerb")), `${name}, findVerb removed`).toBe(witness);
    }
    const expected = nqExpectation();
    const blocked = countingWriter();
    const closed = await dispatchAdmittedWriter(nativeRequest(expected, capableEvidence(expected), { witness: witnessOf(source) }), blocked.writer);
    expect(closed).toEqual({ dispatched: false, refusal: { stage: "gate", blocker: source.blocker } });
    const opened = countingWriter();
    await dispatchAdmittedWriter(nativeRequest(expected, capableEvidence(expected), { witness: witnessOf(capable) }), opened.writer);
    expect([blocked.calls.length, opened.calls.length]).toEqual([0, 1]);
  },
  "M-FIND-RECITED": () => {
    const source = nqRecord();
    const find = findRecord();
    const asCommitted = rejudged(source, find.observations);
    expect(recordFindings(asCommitted)).toEqual(["leg-set-other", "find-leg-recited", "verb-not-run", "digest-not-definition"]);
    const relabelled = rejudged(
      source,
      find.observations.slice(0, 2).map((observation, index) => ({ ...observation, id: LEGS[index]?.id ?? observation.id })),
    );
    expect(recordFindings(relabelled)).toEqual(["find-leg-recited", "verb-not-run", "digest-not-definition"]);
    const exitCodesOnly = rejudged(
      source,
      source.observations.map((observation, index) => ({ ...observation, exitCode: find.observations[index]?.exitCode ?? null, queryDigest: null, digestSource: "absent" as const })),
    );
    expect(recordFindings(exitCodesOnly)).toEqual(["digest-not-definition"]);
    for (const planted of [asCommitted, relabelled, exitCodesOnly]) expect(witnessOf(planted)).toBe("missing");
    expect(witnessOf({ ...source, verdict: "task-scope-supported" })).toBe("missing");
    expect(recordFindings({ ...source, verdict: "task-scope-supported" })).toEqual(["verdict-not-judged"]);
  },
  "R163-RECORD-TIED": () => {
    const source = nqRecord();
    expect(source.probe).toEqual({
      script: PROBE_SCRIPT,
      scriptSha256: sha256(readFileSync(join(REPO, PROBE_SCRIPT))),
      judge: JUDGE_SCRIPT,
      judgeSha256: sha256(readFileSync(join(REPO, JUDGE_SCRIPT))),
    });
    expect(source.utc).toMatch(/^2026-11-11T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(isInstantOn(source.utc, "2026-11-11")).toBe(true);
    expect(new Date(source.utc).toISOString()).toBe(source.utc);
    expect(INSTANT_PLANTS.map(([utc]) => isInstantOn(utc, "2026-11-11"))).toEqual(INSTANT_PLANTS.map(([, instant]) => instant));
    expect(INSTANT_PLANTS.filter(([, instant]) => instant)).toHaveLength(2);
    expect(recordFindings(source)).toEqual([]);
    expect(JSON.stringify(source)).not.toContain(REPO.replace(/\/$/, ""));
    expect(JSON.stringify(source)).not.toMatch(/\/tmp\//);
    const roots = [REPO.replace(/\/$/, ""), homedir(), "/tmp/"];
    expect(roots.every((root) => root.length > 1)).toBe(true);
    expect(hostPathsIn(source, roots)).toEqual([]);
    expect(stringsOf(source).length).toBeGreaterThan(100);
    const planted = ["/opt/hx/bin/hx", "see /var/tmp/hx.log", "path=/srv/hx", "file:///srv/hx", "~", "~/bin/hx", "C:\\hx\\bin", "D:/hx", "at:/srv/hx", `${homedir()}/x`];
    for (const text of planted) expect(hostPathsIn({ ...source, extra: { reason: text } }, roots), text).toEqual([text]);
    expect(hostPathsIn({ [planted[0] ?? ""]: 1 }, roots)).toEqual([planted[0]]);
  },
  "R163-RECORD-FINDINGS": () => {
    expect(FINDINGS).toEqual([
      "record-not-object",
      "schema-other",
      "route-other",
      "binary-unpinned",
      "definition-missing",
      "leg-set-other",
      "find-leg-recited",
      "verb-not-run",
      "digest-not-definition",
      "verdict-not-judged",
    ]);
    const source = nqRecord();
    const strict = source.observations[0];
    if (strict === undefined) throw new Error("no strict leg");
    const capable = rejudged(source, [capableLeg(source), ...source.observations.slice(1)]);
    expect(recordFindings(capable)).toEqual([]);
    // RECORD_PLANTS of the header: the 27 fixed plants listed here, then the corpus plants and the binaryForms plants pushed after them.
    const plants: (readonly [string, unknown, readonly string[]])[] = [
      ["null", null, ["record-not-object"]],
      ["an array", [source], ["record-not-object"]],
      ["a string", JSON.stringify(source), ["record-not-object"]],
      ["a number", 163, ["record-not-object"]],
      ["another schema", { ...source, schema: "workbench.hx-task-scope-probe/v1" }, ["schema-other"]],
      ["another route", { ...source, route: "find" }, ["route-other"]],
      ["binary null", { ...source, producer: { ...source.producer, binarySha256: null } }, ["binary-unpinned"]],
      ["binary eight hex digits", { ...source, producer: { ...source.producer, binarySha256: (source.producer.binarySha256 ?? "").slice(0, 8) } }, ["binary-unpinned"]],
      ["binary upper case", { ...source, producer: { ...source.producer, binarySha256: (source.producer.binarySha256 ?? "").toUpperCase() } }, ["binary-unpinned"]],
      ["definition another name", { ...source, definition: { ...source.definition, name: "hx-admit-other" } }, ["definition-missing"]],
      ["definition another verb", { ...source, definition: { ...source.definition, verb: "find" } }, ["definition-missing"]],
      ["a leg dropped", rejudged(source, source.observations.slice(0, 1)), ["leg-set-other"]],
      ["the legs reversed", rejudged(source, [...source.observations].reverse()), ["leg-set-other"]],
      ["a find-verb leg id", rejudged(source, [{ ...strict, id: "filesystem-live" }, ...source.observations.slice(1)]), ["leg-set-other", "find-leg-recited"]],
      ["operation find", legPlant(source, 0, {}, { operation: "find" }), ["find-leg-recited", "verb-not-run"]],
      ["argv carries find", legPlant(source, 0, { argv: [...strict.argv, "find"] }), ["find-leg-recited"]],
      ["another operation", legPlant(source, 0, {}, { operation: "exec" }), ["verb-not-run"]],
      ["argv without run", legPlant(source, 0, { argv: strict.argv.map((token) => (token === "run" ? "exec" : token)) }), ["verb-not-run"]],
      ["argv without the query name", legPlant(source, 0, { argv: strict.argv.filter((token) => token !== QUERY_NAME) }), ["verb-not-run"]],
      ["another query digest", legPlant(source, 0, { queryDigest: `sha256/hxq-normalized-v1:${"8".repeat(64)}` }), ["digest-not-definition"]],
      ["digest source absent", rejudged(source, [{ ...strict, digestSource: "absent" }, ...source.observations.slice(1)]), ["digest-not-definition"]],
      ["a restated verdict", { ...source, verdict: "task-scope-supported" }, ["verdict-not-judged"]],
      ["a restated capable set", { ...source, capable: ["named-query-strict"] }, ["verdict-not-judged"]],
      ["restated reasons", { ...source, reasons: { ...source.reasons, "named-query-strict": [] } }, ["verdict-not-judged"]],
      ["a restated blocker", { ...source, blocker: null }, ["verdict-not-judged"]],
      ["an empty object", {}, ["schema-other", "route-other", "binary-unpinned", "definition-missing", "leg-set-other", "verdict-not-judged"]],
      ["a capable record with another schema", { ...capable, schema: "workbench.hx-task-scope-probe/v1" }, ["schema-other"]],
    ];
    expect(plants).toHaveLength(27);
    const corpora: readonly (readonly [string, string, (variant: string) => unknown, readonly string[]])[] = [
      ["schema", source.schema, (variant) => ({ ...source, schema: variant }), ["schema-other"]],
      ["route", source.route, (variant) => ({ ...source, route: variant }), ["route-other"]],
      ["definition name", source.definition.name, (variant) => ({ ...source, definition: { ...source.definition, name: variant } }), ["definition-missing"]],
      ["definition verb", source.definition.verb, (variant) => ({ ...source, definition: { ...source.definition, verb: variant } }), ["definition-missing"]],
      ["strict leg operation", strict.query.operation, (variant) => legPlant(source, 0, {}, { operation: variant }), ["verb-not-run"]],
      ["strict leg argv run token", VERB, (variant) => legPlant(source, 0, { argv: strict.argv.map((token) => (token === VERB ? variant : token)) }), ["verb-not-run"]],
      ["strict leg argv query-name token", QUERY_NAME, (variant) => legPlant(source, 0, { argv: strict.argv.map((token) => (token === QUERY_NAME ? variant : token)) }), ["verb-not-run"]],
      ["strict leg query digest", strict.queryDigest ?? "", (variant) => legPlant(source, 0, { queryDigest: variant }), ["digest-not-definition"]],
    ];
    expect(corpora.map(([, value]) => value)).toEqual([
      "workbench.hx-named-query-probe/v1",
      "named-query",
      "hx-admit-task-scope",
      "run",
      "run",
      "run",
      "hx-admit-task-scope",
      source.definition.semanticDigest,
    ]);
    for (const [name, value, plant, findings] of corpora) {
      const corpus = variantsOf(value);
      expect(corpus.length, name).toBeGreaterThan(0);
      expect(corpus.some(([, variant]) => variant === "find"), name).toBe(false);
      for (const [family, variant] of corpus) plants.push([`${name} ${family} ${JSON.stringify(variant)}`, plant(variant), findings]);
    }
    const binary = source.producer.binarySha256 ?? "";
    const firstLetter = binary.search(/[a-f]/);
    const binaryForms: readonly (string | null)[] = [
      null,
      "",
      binary.slice(0, 63),
      `${binary}0`,
      binary.toUpperCase(),
      `${binary.slice(0, firstLetter)}${binary.charAt(firstLetter).toUpperCase()}${binary.slice(firstLetter + 1)}`,
      `g${binary.slice(1)}`,
      ` ${binary}`,
      `${binary} `,
      `sha256:${binary}`,
    ];
    expect(firstLetter).toBeGreaterThanOrEqual(0);
    expect(new Set(binaryForms).size).toBe(10);
    for (const form of binaryForms) plants.push([`binary ${JSON.stringify(form)}`, { ...source, producer: { ...source.producer, binarySha256: form } }, ["binary-unpinned"]]);
    for (const [name, plant, findings] of plants) {
      const reported = recordFindings(plant);
      expect(reported, name).toEqual(findings);
      expect(reported, name).toEqual(FINDINGS.filter((finding) => reported.includes(finding)));
      expect(witnessOf(plant), name).toBe("missing");
    }
  },
  "QUIET-EVIDENCE-ADAPTER": () => {
    expect(WORKSPACE).toBe(WORKSPACE_TOKEN);
    const answers = measuredAnswers();
    expect(answers.map(([id]) => id)).toEqual(Object.keys(ADAPTER_READINGS));
    for (const [id, evidence] of answers) expect(evidence, id).toEqual(ADAPTER_READINGS[id]);
    const records: readonly (readonly [readonly Observation[], Task])[] = [
      [findRecord().observations, findRecord().task],
      [nqRecord().observations, nqRecord().task],
    ];
    for (const [observations, task] of records) {
      for (const observation of observations) {
        for (const name of ADAPTER_FIELDS) expect(Object.hasOwn(observation, name)).toBe(true);
        const evidence = evidenceOf(observation, task);
        expect([evidence.taskDigest, evidence.resolvedRevision]).toEqual([null, null]);
        expect(evidence.queryDigest).toBe(observation.digestSource === "runtime" ? observation.queryDigest : null);
        const at = observation.argv.indexOf("--workspace");
        expect(at, observation.id).toBeGreaterThanOrEqual(0);
        expect(observation.argv[at + 1], observation.id).toBe(WORKSPACE);
      }
    }
    expect(findRecord().observations.map((observation) => evidenceOf(observation, findRecord().task).queryDigest)).toEqual([null, null, null]);
  },
};

describe("wb-pxvv hx-admit census: the readings of src/workbench/scope-admission.ts over this file's answers and requests, and of the committed named-query record (EAT-R058, EAT-R059, EAT-R062, EAT-R163; gate HX-TASK-SCOPE-PROBE)", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin} [${row.id}]`, async () => {
        const run = CASES[pin];
        if (run === undefined) throw new Error(`pin ${pin} has no case`);
        await run();
      });
    }
  }
  it("QUIET-EVIDENCE-ADAPTER [R-EVIDENCE-ADAPTER] the census adapter's readings of the five measured answers: no task digest, no revision, the census workspace constant", async () => {
    const run = CASES["QUIET-EVIDENCE-ADAPTER"];
    if (run === undefined) throw new Error("no quiet case");
    await run();
  });
  it("FROZEN-SHAPE (rule 16) the judged rows and their pin counts", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["EAT-R058:7", "EAT-R059:7", "EAT-R062:6", "EAT-R163:6"]);
  });
  it("CASES-REGISTERED every pin has exactly one case and every case is a pin or a quiet row", () => {
    const pins = ROWS.flatMap((row) => [...row.pins]);
    expect(new Set(pins).size).toBe(pins.length);
    expect(Object.keys(CASES).sort()).toEqual([...pins, ...RESIDUALS.map(([, quiet]) => quiet)].sort());
  });
  it("ANCHOR-ROSTER the rows are the roster's requirements in order, labelled by their Statement and Adversarial mutant", () => {
    const vendored = requirements();
    expect(ROWS.map((row) => row.id)).toEqual(vendored.map((requirement) => requirement.id));
    for (const [index, row] of ROWS.entries()) {
      const requirement = vendored[index];
      if (requirement === undefined) throw new Error(`no roster requirement for ${row.id}`);
      expect(sha256(requirement.text.join("\n"))).toBe(requirement.sha256);
      expect(requirement.text[0]?.startsWith(`### ${row.id} `)).toBe(true);
      expect(row.label).toBe(field(requirement, "Statement"));
      expect(row.mutant).toBe(field(requirement, "Adversarial mutant"));
    }
    expect(roster().sources.map((source) => [source.commit, source.blob, source.fileSha256])).toEqual([
      ["0b25e14e084a5b1d612e780bc12a927b3a80dd62", "e1282572e755a83939c89ec632b6bf9351e01508", "a3b30db58ba5ce5299a9ab273cbd72fa3169724fd510a6f07c5e593a1784ae83"],
      ["b8cd53aa367a0b3a02101b3e1576e5013087a354", "c82b3621cb1b1a504f4f28c0e1de6390deca619a", "85b1cae04570bef5d6c9dba8dbaf89bf54560e65f0ea0dc35a87cb3446c8523b"],
    ]);
  });
  it("ANCHOR-RECEIPT-PINS the receipt's judged pins table is exactly the rows' pins, in order", () => {
    expect(receiptTable(RECEIPT_TABLES.pins)).toEqual(ROWS.flatMap((row) => row.pins.map((pin) => [row.id, pin])));
  });
  it("ANCHOR-RECEIPT-RESIDUALS the receipt's residual table is exactly the named residuals", () => {
    expect(receiptTable(RECEIPT_TABLES.residuals)).toEqual(RESIDUALS.map(([family, quiet]) => [family, quiet]));
  });
  it("ANCHOR-MEASURED the receipt's measured record table holds the committed record's measured values", () => {
    const source = nqRecord();
    expect(receiptTable(RECEIPT_TABLES.measured)).toEqual([
      ["producer.binarySha256", String(source.producer.binarySha256)],
      ["producer.capabilities.count", String(source.producer.capabilities.count)],
      ["definition.semanticDigest", source.definition.semanticDigest],
      ...source.observations.map((observation) => [`${observation.id}.exitCode`, String(observation.exitCode)]),
      ["findVerb.verdict", source.findVerb.verdict],
      ...source.findVerb.legs.map((leg) => [`findVerb.${leg.id}.exitCode`, String(leg.exitCode)]),
    ]);
  });
});
