/**
 * wb-pxvv (MWI B-hx-admit, slice PI-5; MNI packet P12), the hx-admit census. Requirements, vendored verbatim with their SHA-256 in
 * test/fixtures/mwi-hx-admit-requirements-roster.json: EAT-R058, EAT-R059 and EAT-R062 of mechanical-workflows-interop-2026-11-04
 * (triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master 0b25e14e) and EAT-R163 of the 2026-11-06 delta
 * (triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md at b8cd53aa). The guards are src/workbench/scope-admission.ts; the
 * named-query route probe is qa/workbench/hx-named-query-probe.mjs with its pure judge qa/workbench/hx-named-query-judge.mjs and
 * its committed record qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json.
 *
 * PINNED READER SET (one claim per line; the cases before the colon are the pins; an input no case holds is NOT CLAIMED):
 *  - R058-MEASURED-PARTIAL, R058-MEASURED-UNKNOWN: each measured answer of the two committed probe records (wb-f3wd's three
 *    find-verb legs, coverage incomplete or refused; this bead's two named-query legs, coverage unknown), read as scope evidence,
 *    is needs_evidence with exactly its listed gaps, and dispatchAdmittedWriter calls the writer zero times.
 *  - R058-FALSE-KNOWN-EMPTY: the measured best-effort answer restated empty (answer count 0) under its unlicensed coverage adds
 *    known-empty-unlicensed, as does an otherwise capable empty answer without licensed absence; the writer is called zero times.
 *  - R058-POSITIVE-CONTROL: evidence meeting every condition is admitted and the writer is called exactly once with a frozen
 *    admission labelled native-task-scope; so is a licensed complete empty answer.
 *  - M-EMPTY-AS-COMPLETE: an empty answer is never read as complete coverage: empty with coverage incomplete, unknown or null
 *    keeps coverage-not-complete.
 *  - R059-TASK-MISMATCH, R059-QUERY-MISMATCH, R059-REVISION-MISMATCH: an otherwise admitted answer stating another task digest,
 *    query digest or resolved revision is refused with that mismatch, and the writer is called zero times.
 *  - R059-BEFORE-WRITER: a mismatch refuses even when the answer also has gaps, and the refusal is returned before the writer.
 *  - M-WORKSPACE-NAME-ONLY: the three mismatches each refuse with the workspace equal; a workspace alone differing refuses
 *    as root.
 *  - R062-NATIVE-BLOCKED: a scope gate whose witness is unsupported or missing refuses the native request at stage gate with
 *    the blocker scoped to native-task-scope on HX-TASK-SCOPE-PROBE, git-census not blocked; zero writer calls.
 *  - R062-GIT-CENSUS-PASSES: an authorized git-census request is dispatched once, labelled git-census, while the same gate
 *    blocks the native request; an unauthorized one is refused at stage authority.
 *  - M-DISABLE-ALL: the blocker of the committed record's gate names git-census as not blocked and the git-census request still
 *    dispatches.
 *  - R163-RECORD-PINS: the committed named-query record pins the installed hx (version, binary SHA-256 and origin, HXS,
 *    protocol, capability count, task-named capabilities), the named-query definition (name, verb run, the task parameter,
 *    its doc, the view it was formed under, the view the saved definition keeps (none) and its semantic digest, and the
 *    commands that made it), each leg's argv, exit code and answer view, and the find-verb legs re-measured in the same run
 *    at the same binary SHA-256 with their exit codes.
 *  - R163-NAMED-QUERY-VERDICT: the record's verdict, reasons and blocker equal judgeNamedQueryRoute over its observations, which
 *    is the landed wb-f3wd judgeTaskScope over them.
 *  - R163-GATE-INDEPENDENT: gateOfRecord reads the named-query route only: the committed record reads unsupported whatever its
 *    find-verb section states, a planted capable named-query leg reads supported whatever the find-verb section states, and
 *    each maps through dispatchAdmittedWriter to the blocker or to one dispatch.
 *  - M-FIND-RECITED: a record whose legs are wb-f3wd's find-verb legs (as committed, or relabelled to the named-query ids, or
 *    only their exit codes kept) has findings and its gate witness reads missing; so does a record whose verdict is restated.
 *  - R163-RECORD-TIED: the record's probe and judge SHA-256 equal those files', its utc is a 2026-11-11 instant, it keeps no
 *    host path, and recordFindings of the record is empty.
 * Shape and anchor rows: FROZEN-SHAPE (standing rule 16), CASES-REGISTERED, ANCHOR-ROSTER, ANCHOR-RECEIPT-PINS,
 * ANCHOR-RECEIPT-RESIDUALS and ANCHOR-MEASURED.
 *
 * NOT CLAIMED (scope sentences): EAT-R060 and EAT-R061 (the committed RF context guards) are NOT CLAIMED by this census; EAT-R063
 * (the live installed-host witness) is NOT CLAIMED by this census; a registered workflow_execute or workflow_observe oracle
 * (EAT-R299(1)(4)) is NOT CLAIMED by this census; the PI-HX-RF-LIVE gate is NOT CLAIMED by this census; hx verbs other than
 * find and run, hx builds other than the recorded binary and a version-wide statement are NOT CLAIMED by this census; an
 * input of another type than the interfaces declare is NOT CLAIMED by this census.
 *
 * RESIDUAL (named family, pinned quiet row): R-EVIDENCE-ADAPTER - the measured answers reach judgeScopeEvidence through this
 * census's evidenceOf, not through a host reader (no host reader of a live HX answer exists until P04);
 * QUIET-EVIDENCE-ADAPTER pins that the adapter reads exactly the record's own fields and infers nothing (no measured answer
 * states a task scope, a resolved revision or, on the find verb, a query digest, and the adapter states none), so an adapter
 * that starts supplying them reds.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
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
  SCOPE_PROBE_GATE,
  type ScopeEvidence,
  type ScopeExpectation,
  type ScopeGap,
  type ScopeGate,
  scopeBlockerOf,
  type WriterAdmission,
  type WriterRequest,
} from "../src/workbench/scope-admission.js";
import { docsSection, sectionTables } from "./helpers/census.js";

const REPO = fileURLToPath(new URL("../", import.meta.url));
const ROSTER = "test/fixtures/mwi-hx-admit-requirements-roster.json";
const RECEIPT = "docs/workbench/receipts/wb-pxvv.md";
const RECEIPT_ENTRY =
  "2026-11-11 receipt: the hx-admit scope guards and the named-query route probe, cut 1 (machine seat ws-08, run g10-work-s337, base ce180d8)";
const RECEIPT_TABLES = {
  pins: { heading: "Judged pins, wb-pxvv cut 1", header: ["Row", "Pin"] },
  residuals: { heading: "Residuals, wb-pxvv cut 1", header: ["Residual", "Quiet row"] },
  measured: { heading: "Measured record, wb-pxvv cut 1", header: ["Field", "Value"] },
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
    pins: ["R058-MEASURED-PARTIAL", "R058-MEASURED-UNKNOWN", "R058-FALSE-KNOWN-EMPTY", "R058-POSITIVE-CONTROL", "M-EMPTY-AS-COMPLETE"],
  },
  {
    id: "EAT-R059",
    label: "Pi MUST refuse HX evidence from another query or revision.",
    mutant: "Compare only the workspace name.",
    pins: ["R059-TASK-MISMATCH", "R059-QUERY-MISMATCH", "R059-REVISION-MISMATCH", "R059-BEFORE-WRITER", "M-WORKSPACE-NAME-ONLY"],
  },
  {
    id: "EAT-R062",
    label: "Pi MUST block only the native profile when native evidence is unavailable.",
    mutant: "Disable every Mechanical invocation when native HX is unavailable.",
    pins: ["R062-NATIVE-BLOCKED", "R062-GIT-CENSUS-PASSES", "M-DISABLE-ALL"],
  },
  {
    id: "EAT-R163",
    label:
      "Before `hx-task-scope-v1` is described as unsupported version-wide at hx 0.1.0, the HX admission bead MUST probe a workspace-defined named query carrying a task scope against the same installed binary and record exit code, verb, roster and verdict in a dated receipt; until that receipt exists every program statement MUST keep the find-verb/84-capability-roster bound of wb-f3wd.",
    mutant: "Reuse the wb-f3wd find-verb exit codes as the named-query verdict; the receipt validator must refuse.",
    pins: ["R163-RECORD-PINS", "R163-NAMED-QUERY-VERDICT", "R163-GATE-INDEPENDENT", "M-FIND-RECITED", "R163-RECORD-TIED"],
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
const witnessOf = (source: unknown): GateWitness => gateOfRecord(source).witness;

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
  "R163-RECORD-PINS": () => {
    const source = nqRecord();
    expect([source.schema, source.bead, source.requirement, source.gate, source.route]).toEqual([
      "workbench.hx-named-query-probe/v1",
      "wb-pxvv",
      "EAT-R163",
      SCOPE_PROBE_GATE,
      ROUTE,
    ]);
    expect(source.producer.name).toBe("hx");
    expect(source.producer.version).toBe("0.1.0");
    expect(source.producer.binarySha256).toMatch(/^[0-9a-f]{64}$/);
    expect(source.producer.binarySha256).toBe(measured("producer.binarySha256"));
    expect([source.producer.binaryOrigin, source.producer.hxsVersion, source.producer.protocol]).toEqual(["path", "1.0", "hxs/1.0"]);
    expect(String(source.producer.capabilities.count)).toBe(measured("producer.capabilities.count"));
    expect(source.producer.capabilities.taskNamed).toEqual([]);
    expect(source.producer.sdk).toEqual({ name: "@hyperunix/sdk", version: "0.1.0", reported: "0.1.0" });
    const task = source.task;
    expect([task.id, task.kind, task.root, task.baseRevision]).toEqual(["hx-task-scope-probe", "hx.fs/regular-file", ".", findRecord().task.baseRevision]);
    expect(task.digest).toBe(findRecord().task.digest);
    const definition = source.definition;
    expect([definition.name, definition.verb]).toEqual([QUERY_NAME, VERB]);
    expect(definition.parameters).toEqual([{ name: "task", type: "string", default: task.id }]);
    expect([definition.doc, definition.formedUnder, definition.savedView]).toEqual([task.digest, `git:${task.baseRevision}`, null]);
    expect(definition.commands.map((command) => command.slice(0, 4))).toEqual([
      ["hx", "init", WORKSPACE],
      ["hx", "--hxs", `--view=git:${task.baseRevision}`, "find"],
      ["hx", "query", "save", QUERY_NAME],
      ["hx", "--hxs", "query", "show"],
    ]);
    expect(definition.semanticDigest).toMatch(/^sha256\/hxq-normalized-v1:[0-9a-f]{64}$/);
    expect(definition.semanticDigest).toBe(measured("definition.semanticDigest"));
    expect(source.observations.map((observation) => observation.id)).toEqual(LEGS.map((leg) => leg.id));
    for (const observation of source.observations) {
      expect(observation.query.operation).toBe(VERB);
      expect(observation.argv.slice(0, 4)).toEqual(["--workspace", WORKSPACE, VERB, QUERY_NAME]);
      expect(observation.argv).not.toContain("find");
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

describe("wb-pxvv hx-admit census: EAT-R058, EAT-R059, EAT-R062 and EAT-R163 (MWI B-hx-admit, gate HX-TASK-SCOPE-PROBE)", () => {
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
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["EAT-R058:5", "EAT-R059:5", "EAT-R062:3", "EAT-R163:5"]);
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
