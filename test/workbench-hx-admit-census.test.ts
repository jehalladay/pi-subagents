/**
 * wb-pxvv (MWI B-hx-admit, slice PI-5; MNI packet P12), the hx-admit census over the scope guards of
 * src/workbench/scope-admission.ts and the committed named-query record qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json
 * (made by qa/workbench/hx-named-query-probe.mjs, judged by qa/workbench/hx-named-query-judge.mjs). Requirements, vendored
 * verbatim with their SHA-256 in test/fixtures/mwi-hx-admit-requirements-roster.json: EAT-R058, EAT-R059 and EAT-R062 of
 * mechanical-workflows-interop-2026-11-04 (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e) and
 * EAT-R163 of the 2026-11-06 delta (triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md at b8cd53aa).
 *
 * PINNED READER SET (one claim per line; the cases before the colon are its pins, and its words state only the inputs and
 * readings those cases hold):
 *  - R058-MEASURED-PARTIAL, R058-MEASURED-UNKNOWN: each measured answer of the two committed probe records, read as scope
 *    evidence through evidenceOf, is needs_evidence with exactly its listed gaps, and dispatchAdmittedWriter refuses it at
 *    stage scope with zero writer calls: wb-f3wd's three find-verb legs (filesystem-live and filesystem-live-best-effort,
 *    results with coverage incomplete and exit codes 3 and 0; revision-pinned, a process failure with no coverage and exit
 *    code 4) and this bead's two named-query legs (coverage unknown).
 *  - R058-FALSE-KNOWN-EMPTY: the measured filesystem-live-best-effort answer restated empty (answer count 0) adds
 *    known-empty-unlicensed to its gaps, as does an otherwise capable empty answer whose absence is not licensed; neither
 *    calls the writer.
 *  - R058-POSITIVE-CONTROL: an answer meeting every condition, and a capable empty answer with complete coverage and licensed
 *    absence, are admitted, and dispatchAdmittedWriter calls the writer exactly once with a frozen admission whose
 *    invocation id is the request's and whose label is native-task-scope.
 *  - M-EMPTY-AS-COMPLETE: an otherwise capable empty answer whose coverage is incomplete, unknown or null is needs_evidence
 *    with coverage-not-complete and known-empty-unlicensed.
 *  - R058-EACH-CONDITION: an otherwise capable answer that misses one condition is needs_evidence with exactly that
 *    condition's gap, and dispatchAdmittedWriter refuses it at stage scope with zero writer calls: answered false
 *    (answer-missing); an exit code that is not 0, held as every integer from -300 to 300 but 0, plus and minus 2^16, 2^31,
 *    2^32 and 2^53 - 1, plus and minus 0.4, 0.5, 1e-300 and Infinity, NaN, and null (exit-nonzero); terminal not reached
 *    (terminal-unreached); coverage incomplete, unknown or null (coverage-not-complete); absence not licensed
 *    (absence-unlicensed); a workspace, task digest, resolved revision or query digest that is null or the empty string
 *    (root-unbound, task-scope-absent, revision-unbound, query-digest-absent). Exit codes 0 and -0 are admitted.
 *  - R058-GAP-ORDER: SCOPE_GAPS is the literal list answer-missing, exit-nonzero, terminal-unreached, coverage-not-complete,
 *    absence-unlicensed, known-empty-unlicensed, root-unbound, task-scope-absent, revision-unbound, query-digest-absent; over
 *    all 1024 combinations of the nine conditions met or missed and the answer empty or not, an answer is admitted exactly
 *    when no gap applies and is otherwise needs_evidence with exactly the gaps that apply, in that order
 *    (known-empty-unlicensed applies to an empty answer whose coverage is not complete or whose absence is not licensed); an
 *    answer that misses every condition and is empty reports all ten.
 *  - R059-TASK-MISMATCH, R059-QUERY-MISMATCH, R059-REVISION-MISMATCH: an otherwise admitted answer stating another task
 *    digest, query digest or resolved revision is refused with that mismatch, and the writer is called zero times.
 *  - R059-BEFORE-WRITER: a stated identity that differs refuses with that mismatch whatever gaps the answer also has: the
 *    workspace (root), task digest (task), query digest (query) or resolved revision (revision) stated as another string or
 *    as a single space, over the 1024 combinations of R058-GAP-ORDER and on each measured named-query answer, is refused
 *    with that mismatch by judgeScopeEvidence, and on the measured answers by dispatchAdmittedWriter at stage scope,
 *    returned before the writer, which is called zero times.
 *  - M-WORKSPACE-NAME-ONLY: the task, query and revision mismatches each refuse with the workspace equal; a workspace alone
 *    differing refuses as root.
 *  - R059-CHECK-ORDER: SCOPE_MISMATCHES is the literal list root, task, query, revision; each of the 15 non-empty sets of
 *    those identities stated as other strings, on a capable answer and on an empty answer that misses every other
 *    condition, is refused with the set's first member in that order.
 *  - R062-NATIVE-BLOCKED: a scope gate whose witness is unsupported or missing refuses the native request at stage gate with
 *    the blocker scoped to native-task-scope on HX-TASK-SCOPE-PROBE, git-census not blocked, with zero writer calls; a
 *    supported witness has no blocker.
 *  - R062-GIT-CENSUS-PASSES: an authorized git-census request is dispatched once, labelled git-census, while the same gate
 *    blocks the native request; an unauthorized one is refused at stage authority.
 *  - M-DISABLE-ALL: the blocker of the committed record's gate names git-census as not blocked and the git-census request
 *    still dispatches.
 *  - R062-ONE-FROZEN-ADMISSION: a native request whose gate and evidence admit and an authorized git-census request, each
 *    with a writer that returns a value and one that returns a resolved promise, call the writer exactly once with a frozen
 *    admission that is exactly the request's invocation id and its mode's label, and the outcome is dispatched with that
 *    same admission object and the writer's resolved value.
 *  - R062-WRITER-ERROR-PROPAGATES: under each of those two dispatched requests, a writer that throws, and one that returns a
 *    rejected promise, with an Error, a string, a plain object or undefined makes dispatchAdmittedWriter reject with that
 *    same value after one writer call.
 *  - R062-REFUSAL-ORDER: a native request whose invocation id or one of its four expected identities is the empty string is
 *    refused at stage request (malformed-request) under each gate witness (supported, unsupported, missing) with each scope
 *    evidence (capable, the measured strict named-query answer, a task mismatch, an empty answer that misses every
 *    condition), and so is a git-census request whose invocation id is the empty string, authorized or not; a native
 *    request under an unsupported or missing witness is refused at stage gate with each of those evidences; none of these
 *    calls the writer.
 *  - R163-RECORD-PINS: the committed named-query record pins the installed hx (version 0.1.0, binary SHA-256, which is not
 *    wb-f3wd's recorded binary, origin path, HXS 1.0, protocol hxs/1.0, capability count, no task-named capability, the SDK
 *    @hyperunix/sdk 0.1.0 as installed and as reported), the task (wb-f3wd's id, kind, root, base revision and digest), the
 *    named-query definition (name hx-admit-task-scope, verb run, the task parameter, its doc equal to the task digest,
 *    formed under git:<base revision>, the saved definition keeping no view, and its semantic digest), the four commands
 *    that made it token for token, each leg's query and argv token for token (only the best-effort leg carries
 *    --best-effort), its diagnostics, its exit code, its answer view and its query digest equal to the semantic digest, and
 *    the find-verb legs re-measured in the same run at the same binary SHA-256 with their verdict and exit codes; the binary
 *    SHA-256, capability count, semantic digest, leg exit codes, find-verb verdict and find-verb exit codes equal the
 *    receipt's Measured record table.
 *  - R163-NAMED-QUERY-VERDICT: the record's verdict, capable set, reasons and blocker equal judgeNamedQueryRoute over its
 *    observations, which equals the landed wb-f3wd judgeTaskScope over them.
 *  - R163-GATE-INDEPENDENT: gateOfRecord reads the named-query route only: the committed record reads unsupported whatever
 *    its find-verb section states, a planted capable named-query leg reads supported whatever the find-verb section states,
 *    and each maps through dispatchAdmittedWriter to the blocker or to one dispatch.
 *  - M-FIND-RECITED: a record whose legs are wb-f3wd's find-verb legs (as committed, relabelled to the named-query ids, or
 *    only their exit codes kept) has findings and its gate witness reads missing; so does a record whose verdict is restated.
 *  - R163-RECORD-TIED: the record's probe and judge SHA-256 equal those files', its utc is a 2026-11-11 instant,
 *    recordFindings of it is empty, and it keeps no host path: no key or string value of it contains the repository root,
 *    the home directory or /tmp/, and none, split at white space, quotes, backticks, =, commas, semicolons, |, parentheses,
 *    square and curly brackets and angle brackets, holds a token that starts with / or with file:, is ~ or starts with ~/,
 *    starts with a drive letter, a colon and a slash or backslash, or carries :/ before a character other than /.
 *  - R163-RECORD-FINDINGS: FINDINGS is the literal list of the ten findings, and recordFindings reports, in that order,
 *    exactly the findings of each planted record: a non-object (null, an array, a string, a number) reads
 *    record-not-object; another schema, another route, an unpinned binary SHA-256 (null, eight hex digits, upper case), a
 *    definition with another name or verb, another leg set (a leg dropped, the legs reversed), a leg whose operation is
 *    another verb or whose argv lacks run or the query name, a leg whose argv carries find, a leg whose query digest is
 *    another digest or whose digest source is absent, and a restated verdict, capable set, reasons or blocker each read
 *    their one finding; a named-query leg relabelled with a find-verb leg id reads leg-set-other and find-leg-recited, a leg
 *    whose operation is find reads find-leg-recited and verb-not-run, and an empty object reads schema-other, route-other,
 *    binary-unpinned, definition-missing, leg-set-other and verdict-not-judged; gateOfRecord of every planted record, a
 *    capable record with another schema among them, reads missing.
 * Shape and anchor rows: FROZEN-SHAPE (standing rule 16), CASES-REGISTERED, ANCHOR-ROSTER, ANCHOR-RECEIPT-PINS,
 * ANCHOR-RECEIPT-RESIDUALS and ANCHOR-MEASURED.
 *
 * NOT CLAIMED (scope sentences): EAT-R060 and EAT-R061 (the committed RF context guards) are NOT CLAIMED by this census; EAT-R063
 * (the live installed-host witness) is NOT CLAIMED by this census; a registered workflow_execute or workflow_observe oracle
 * (EAT-R299(1)(4)) is NOT CLAIMED by this census; the PI-HX-RF-LIVE gate is NOT CLAIMED by this census; hx verbs other than
 * find and run, hx builds other than the recorded binary and a version-wide statement are NOT CLAIMED by this census; a fresh
 * probe run, and observationOfRun and digestText on any answer other than the ones the committed record keeps, are NOT
 * CLAIMED by this census (the record is tied to the probe and the judge by SHA-256 alone); an input of another type than
 * the interfaces declare is NOT CLAIMED by this census.
 *
 * RESIDUAL (named family, pinned quiet row): R-EVIDENCE-ADAPTER - the measured answers reach judgeScopeEvidence through this
 * census's evidenceOf, not through a host reader (no host reader of a live HX answer exists until P04);
 * QUIET-EVIDENCE-ADAPTER pins that the adapter reads exactly the record's own fields and infers nothing (no measured answer
 * states a task scope, a resolved revision or, on the find verb, a query digest, and the adapter states none), so an adapter
 * that starts supplying them reds.
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
import { LEGS as FIND_LEGS, PROBE_RECORD as FIND_RECORD, judgeTaskScope, type Observation } from "../qa/workbench/hx-task-scope-judge.mjs";
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
  "2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 2 (machine seat ws-16, run g10-work-s338, base ce180d8)";
const RECEIPT_TABLES = {
  pins: { heading: "Judged pins, wb-pxvv cut 2", header: ["Row", "Pin"] },
  residuals: { heading: "Residuals, wb-pxvv cut 2", header: ["Residual", "Quiet row"] },
  measured: { heading: "Measured record, wb-pxvv cut 2", header: ["Field", "Value"] },
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
    pins: ["R059-TASK-MISMATCH", "R059-QUERY-MISMATCH", "R059-REVISION-MISMATCH", "R059-BEFORE-WRITER", "M-WORKSPACE-NAME-ONLY", "R059-CHECK-ORDER"],
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

// ---- scope evidence: the measured answers of the two committed probe records, read as the host would hold them ----
const WORKSPACE = "<workspace>";
/** The record fields evidenceOf reads (R-EVIDENCE-ADAPTER): the producer's own statements and nothing derived. */
const ADAPTER_FIELDS = ["outcome", "exitCode", "terminalReached", "completeness", "licensesAbsence", "answerCount", "scope", "digestSource", "queryDigest", "revision"];
/** One measured answer read as scope evidence: only what the producer stated, nothing inferred (R-EVIDENCE-ADAPTER). */
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
/** Evidence meeting every condition for `expected` (the positive control every mismatch plant starts from). */
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
/** The four identities in the census's own check order: the evidence field, the mismatch it refuses with, two other stated values. */
const IDENTITIES: readonly (readonly [IdentityField, ScopeMismatch, readonly [string, string]])[] = [
  ["workspace", "root", ["<other-workspace>", " "]],
  ["taskDigest", "task", [`sha256:${"9".repeat(64)}`, " "]],
  ["queryDigest", "query", [`sha256/hxq-normalized-v1:${"8".repeat(64)}`, " "]],
  ["resolvedRevision", "revision", ["7".repeat(40), " "]],
];
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
/** A git-census request; only `authorized: true` dispatches. */
const censusRequest = (authorized: boolean, invocationId: string = INVOCATION): WriterRequest => ({ mode: GIT_CENSUS_MODE, invocationId, authorized });

// ---- the named-query route ----
const nqTask = (): Task => nqRecord().task;
const nqExpectation = (): ScopeExpectation => expectationOf(nqTask(), nqRecord().definition.semanticDigest);
/** A capable named-query leg planted from the committed strict leg: every condition the landed judge names met. */
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
const witnessOf = (source: unknown): GateWitness => gateOfRecord(source).witness;
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

const CASES: Readonly<Record<string, () => void | Promise<void>>> = {
  "R058-MEASURED-PARTIAL": async () => {
    const source = findRecord();
    expect(source.observations.map((observation) => observation.id)).toEqual(Object.keys(GAPS_OF_FIND));
    expect(source.observations.map((observation) => [observation.id, observation.outcome, observation.completeness, observation.exitCode])).toEqual([
      ["filesystem-live", "result", "incomplete", 3],
      ["filesystem-live-best-effort", "result", "incomplete", 0],
      ["revision-pinned", "process-failure", null, 4],
    ]);
    const expected = expectationOf(source.task, nqRecord().definition.semanticDigest);
    for (const observation of source.observations) {
      const evidence = evidenceOf(observation, source.task);
      expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "needs_evidence", gaps: GAPS_OF_FIND[observation.id] });
      const counted = countingWriter();
      const outcome = await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
      expect(outcome).toEqual({ dispatched: false, refusal: { stage: "scope", verdict: { outcome: "needs_evidence", gaps: GAPS_OF_FIND[observation.id] } } });
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
      expect(outcome).toEqual({ dispatched: false, refusal: { stage: "scope", verdict: { outcome: "needs_evidence", gaps: GAPS_OF_NAMED[observation.id] } } });
      expect(counted.calls).toHaveLength(0);
    }
  },
  "R058-FALSE-KNOWN-EMPTY": async () => {
    const source = findRecord();
    const bestEffort = source.observations.find((observation) => observation.id === "filesystem-live-best-effort");
    if (bestEffort === undefined) throw new Error("no best-effort leg");
    const evidence = evidenceOf({ ...bestEffort, answerCount: 0 }, source.task);
    const expected = expectationOf(source.task, nqRecord().definition.semanticDigest);
    expect(judgeScopeEvidence(expected, evidence)).toEqual({
      outcome: "needs_evidence",
      gaps: ["coverage-not-complete", "absence-unlicensed", "known-empty-unlicensed", "task-scope-absent", "revision-unbound", "query-digest-absent"],
    });
    const capableButEmpty = { ...capableEvidence(expected), knownEmpty: true, absenceLicensed: false };
    expect(judgeScopeEvidence(expected, capableButEmpty)).toEqual({ outcome: "needs_evidence", gaps: ["absence-unlicensed", "known-empty-unlicensed"] });
    const counted = countingWriter();
    await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
    await dispatchAdmittedWriter(nativeRequest(expected, capableButEmpty), counted.writer);
    expect(counted.calls).toHaveLength(0);
  },
  "R058-POSITIVE-CONTROL": async () => {
    const expected = nqExpectation();
    for (const evidence of [capableEvidence(expected), { ...capableEvidence(expected), knownEmpty: true }]) {
      expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "admitted" });
      const counted = countingWriter();
      const outcome = await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
      expect(counted.calls).toHaveLength(1);
      expect(counted.calls[0]).toEqual({ invocationId: INVOCATION, label: NATIVE_SCOPE_MODE });
      expect(Object.isFrozen(counted.calls[0])).toBe(true);
      expect(outcome).toEqual({ dispatched: true, admission: counted.calls[0], value: "written" });
    }
  },
  "M-EMPTY-AS-COMPLETE": () => {
    const expected = nqExpectation();
    for (const coverage of ["incomplete", "unknown", null] as const) {
      const verdict = judgeScopeEvidence(expected, { ...capableEvidence(expected), knownEmpty: true, coverage });
      expect(verdict).toEqual({ outcome: "needs_evidence", gaps: ["coverage-not-complete", "known-empty-unlicensed"] });
    }
  },
  "R058-EACH-CONDITION": async () => {
    const expected = nqExpectation();
    const capable = capableEvidence(expected);
    const plants: (readonly [string, ScopeEvidence, ScopeGap])[] = [
      ["answered false", { ...capable, answered: false }, "answer-missing"],
      ...EXIT_CODES_NOT_ZERO.map((exitCode) => [`exit ${String(exitCode)}`, { ...capable, exitCode }, "exit-nonzero"] as const),
      ["terminal not reached", { ...capable, terminalReached: false }, "terminal-unreached"],
      ...(["incomplete", "unknown", null] as const).map((coverage) => [`coverage ${String(coverage)}`, { ...capable, coverage }, "coverage-not-complete"] as const),
      ["absence not licensed", { ...capable, absenceLicensed: false }, "absence-unlicensed"],
      ...UNSTATED_GAPS.flatMap(([name, gap]) => [null, ""].map((value) => [`${name} ${JSON.stringify(value)}`, stating(capable, name, value), gap] as const)),
    ];
    expect(EXIT_CODES_NOT_ZERO).toHaveLength(600 + 8 + 6 + 2 + 1 + 1);
    expect(plants).toHaveLength(1 + EXIT_CODES_NOT_ZERO.length + 1 + 3 + 1 + 8);
    const counted = countingWriter();
    for (const [name, evidence, gap] of plants) {
      const verdict = { outcome: "needs_evidence", gaps: [gap] };
      expect(judgeScopeEvidence(expected, evidence), name).toEqual(verdict);
      expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer), name).toEqual({ dispatched: false, refusal: { stage: "scope", verdict } });
    }
    expect(counted.calls).toHaveLength(0);
    for (const exitCode of [0, -0]) expect(judgeScopeEvidence(expected, { ...capable, exitCode })).toEqual({ outcome: "admitted" });
  },
  "R058-GAP-ORDER": () => {
    expect(SCOPE_GAPS).toEqual(GAP_ORDER);
    const expected = nqExpectation();
    for (let mask = 0; mask < SWEEP; mask += 1) {
      const gaps = sweptGaps(mask);
      expect(judgeScopeEvidence(expected, sweptEvidence(expected, mask)), `mask ${mask}`).toEqual(gaps.length === 0 ? { outcome: "admitted" } : { outcome: "needs_evidence", gaps });
    }
    expect(judgeScopeEvidence(expected, sweptEvidence(expected, SWEEP - 1))).toEqual({ outcome: "needs_evidence", gaps: [...SCOPE_GAPS] });
    expect(sweptGaps(SWEEP - 1)).toHaveLength(10);
  },
  "R059-TASK-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), taskDigest: `sha256:${"9".repeat(64)}` };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "task" });
    const counted = countingWriter();
    expect(await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer)).toEqual({
      dispatched: false,
      refusal: { stage: "scope", verdict: { outcome: "refused", mismatch: "task" } },
    });
    expect(counted.calls).toHaveLength(0);
  },
  "R059-QUERY-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), queryDigest: `sha256/hxq-normalized-v1:${"8".repeat(64)}` };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "query" });
    const counted = countingWriter();
    await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
    expect(counted.calls).toHaveLength(0);
  },
  "R059-REVISION-MISMATCH": async () => {
    const expected = nqExpectation();
    const evidence = { ...capableEvidence(expected), resolvedRevision: "7".repeat(40) };
    expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch: "revision" });
    const counted = countingWriter();
    await dispatchAdmittedWriter(nativeRequest(expected, evidence), counted.writer);
    expect(counted.calls).toHaveLength(0);
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
    for (const [name, mismatch, others] of IDENTITIES) {
      for (const other of others) {
        for (let mask = 0; mask < SWEEP; mask += 1) {
          expect(judgeScopeEvidence(expected, stating(sweptEvidence(expected, mask), name, other)), `${mismatch} ${JSON.stringify(other)} mask ${mask}`).toEqual({
            outcome: "refused",
            mismatch,
          });
        }
        for (const observation of nqRecord().observations) {
          const evidence = stating(evidenceOf(observation, nqTask()), name, other);
          expect(judgeScopeEvidence(expected, evidence)).toEqual({ outcome: "refused", mismatch });
          const steps: string[] = [];
          const refused = await dispatchAdmittedWriter(nativeRequest(expected, evidence), () => {
            steps.push("writer");
            return "written";
          });
          steps.push("returned");
          expect(refused).toEqual({ dispatched: false, refusal: { stage: "scope", verdict: { outcome: "refused", mismatch } } });
          expect(steps).toEqual(["returned"]);
        }
      }
    }
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
        let calls = 0;
        await expect(
          dispatchAdmittedWriter(request, (): string => {
            calls += 1;
            throw value;
          }),
        ).rejects.toBe(value);
        await expect(
          dispatchAdmittedWriter(request, (): Promise<string> => {
            calls += 1;
            return Promise.reject(value);
          }),
        ).rejects.toBe(value);
        expect(calls).toBe(2);
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
    expect(definition.commands).toEqual([
      ["hx", "init", WORKSPACE],
      ["hx", "--hxs", `--view=git:${task.baseRevision}`, "find", "--kind", "hx.fs/regular-file", "--plan", "."],
      ["hx", "query", "save", "hx-admit-task-scope", "--param=task:string=hx-task-scope-probe", `--doc=${task.digest}`],
      ["hx", "--hxs", "query", "show", "hx-admit-task-scope"],
    ]);
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
    expect(gateOfRecord(source)).toEqual({ route: ROUTE, witness: "unsupported" });
    const findSaysSupported = { ...source, findVerb: { ...source.findVerb, verdict: "task-scope-supported" } };
    expect(witnessOf(findSaysSupported)).toBe("unsupported");
    const capable = rejudged(source, [capableLeg(source), ...source.observations.slice(1)]);
    expect(capable.verdict).toBe("task-scope-supported");
    for (const verdict of ["task-scope-unsupported", "task-scope-supported"]) {
      expect(witnessOf({ ...capable, findVerb: { ...capable.findVerb, verdict } })).toBe("supported");
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
    const plants: readonly (readonly [string, unknown, readonly string[]])[] = [
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
    for (const [name, plant, findings] of plants) {
      const reported = recordFindings(plant);
      expect(reported, name).toEqual(findings);
      expect(reported, name).toEqual(FINDINGS.filter((finding) => reported.includes(finding)));
      expect(witnessOf(plant), name).toBe("missing");
    }
  },
  "QUIET-EVIDENCE-ADAPTER": () => {
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
      }
    }
    expect(findRecord().observations.map((observation) => evidenceOf(observation, findRecord().task).queryDigest)).toEqual([null, null, null]);
  },
};

describe("wb-pxvv hx-admit census: the scope-admission guards and the committed named-query record (EAT-R058, EAT-R059, EAT-R062, EAT-R163; gate HX-TASK-SCOPE-PROBE)", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin} [${row.id}]`, async () => {
        const run = CASES[pin];
        if (run === undefined) throw new Error(`pin ${pin} has no case`);
        await run();
      });
    }
  }
  it("QUIET-EVIDENCE-ADAPTER [R-EVIDENCE-ADAPTER] the census adapter reads the records' own fields and states no task scope or revision they lack", async () => {
    const run = CASES["QUIET-EVIDENCE-ADAPTER"];
    if (run === undefined) throw new Error("no quiet case");
    await run();
  });
  it("FROZEN-SHAPE (rule 16) the judged rows and their pin counts", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["EAT-R058:7", "EAT-R059:6", "EAT-R062:6", "EAT-R163:6"]);
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
