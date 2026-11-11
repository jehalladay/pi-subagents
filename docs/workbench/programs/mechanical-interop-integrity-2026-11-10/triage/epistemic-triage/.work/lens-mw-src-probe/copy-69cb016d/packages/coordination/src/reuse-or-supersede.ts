/**
 * D1 reuse-or-supersede decision record (APO 12 L16; carried by lrzn.2).
 *
 * D1/D2 overlap two landed surfaces: the CompositionTree compiler
 * (packages/coordination/src/evaluation.ts treeConfiguration) and the APO-003 policy-graph
 * manifest pipeline (packages/coordination/src/policy-graph.ts validatePolicyGraph /
 * compilePolicyGraph). D1 work starts with an explicit decision per surface: reuse it as-is,
 * extend it with named gaps, or supersede it with a named successor. A decision that rules on
 * a surface nobody read, a reuse that admits gaps, or a supersession without a successor is
 * refused, never recorded.
 */

export interface D1Subject {
  readonly key: string;
  readonly sourcePath: string;
  readonly members: readonly string[];
}

export const D1_DECISION_SUBJECTS: readonly D1Subject[] = Object.freeze([
  Object.freeze({
    key: "composition-tree-compiler",
    sourcePath: "packages/coordination/src/evaluation.ts",
    members: Object.freeze(["treeConfiguration", "CompositionTree"]) as readonly string[],
  }),
  Object.freeze({
    key: "policy-graph-manifest",
    sourcePath: "packages/coordination/src/policy-graph.ts",
    members: Object.freeze(["PolicyGraphManifest", "validatePolicyGraph", "compilePolicyGraph"]) as readonly string[],
  }),
]);

export type D1Disposition = "reuse" | "extend" | "supersede";

export const D1_DISPOSITIONS: readonly D1Disposition[] = Object.freeze(["reuse", "extend", "supersede"]);

export type D1RefusalCode =
  | "D1_SUBJECT_UNKNOWN"
  | "D1_DISPOSITION_UNKNOWN"
  | "D1_RATIONALE_MISSING"
  | "D1_EVIDENCE_MISSING"
  | "D1_REUSE_WITH_GAPS"
  | "D1_SUPERSEDE_WITHOUT_SUCCESSOR"
  | "D1_SUBJECT_UNDECIDED"
  | "D1_SUBJECT_DOUBLE_DECIDED";

/** Closed-union decoder: unknown text never reaches a decision record. */
export function parseD1Disposition(value: string): D1Disposition | undefined {
  return (D1_DISPOSITIONS as readonly string[]).includes(value) ? (value as D1Disposition) : undefined;
}

export interface D1Successor {
  readonly module: string;
  readonly members: readonly string[];
}

export interface D1DecisionInput {
  readonly subject: string;
  readonly disposition: string;
  readonly rationale: string;
  readonly readPaths: readonly string[];
  readonly namedGaps: readonly string[];
  readonly successor?: D1Successor;
}

export interface D1DecisionRecord {
  readonly schema: "mw.d1-decision.v0";
  readonly subject: string;
  readonly disposition: D1Disposition;
  readonly rationale: string;
  readonly readPaths: readonly string[];
  readonly namedGaps: readonly string[];
  readonly successor?: D1Successor;
}

export interface D1DecisionOutcome {
  readonly ok: boolean;
  readonly record?: D1DecisionRecord;
  readonly refusals: ReadonlyArray<{ readonly code: D1RefusalCode; readonly detail: string }>;
}

export function recordD1Decision(input: D1DecisionInput): D1DecisionOutcome {
  const refusals: Array<{ code: D1RefusalCode; detail: string }> = [];
  const subject = D1_DECISION_SUBJECTS.find((s) => s.key === input.subject);
  if (!subject) refusals.push({ code: "D1_SUBJECT_UNKNOWN", detail: `subject ${input.subject} is not a pinned D1 surface` });
  const disposition = parseD1Disposition(input.disposition);
  if (disposition === undefined) refusals.push({ code: "D1_DISPOSITION_UNKNOWN", detail: `disposition ${input.disposition} is not reuse, extend or supersede` });
  if (input.rationale.trim() === "") refusals.push({ code: "D1_RATIONALE_MISSING", detail: "a decision carries a nonblank rationale" });
  if (subject && !input.readPaths.includes(subject.sourcePath)) {
    refusals.push({ code: "D1_EVIDENCE_MISSING", detail: `the decision must witness reading ${subject.sourcePath}` });
  }
  if (disposition === "reuse" && input.namedGaps.length > 0) {
    refusals.push({ code: "D1_REUSE_WITH_GAPS", detail: `reuse with ${input.namedGaps.length} named gaps is inconsistent: a gap demands extend or supersede` });
  }
  const successorBlank = input.successor === undefined || input.successor.module.trim() === "" || input.successor.members.length === 0;
  if (disposition === "supersede" && successorBlank) {
    refusals.push({ code: "D1_SUPERSEDE_WITHOUT_SUCCESSOR", detail: "supersession names a successor module and its members" });
  }
  if (refusals.length > 0 || !subject || disposition === undefined) {
    return Object.freeze({ ok: false, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  const record: D1DecisionRecord = Object.freeze({
    schema: "mw.d1-decision.v0",
    subject: subject.key,
    disposition,
    rationale: input.rationale,
    readPaths: Object.freeze([...input.readPaths]) as readonly string[],
    namedGaps: Object.freeze([...input.namedGaps]) as readonly string[],
    ...(input.successor === undefined
      ? {}
      : { successor: Object.freeze({ module: input.successor.module, members: Object.freeze([...input.successor.members]) as readonly string[] }) }),
  });
  return Object.freeze({ ok: true, record, refusals: Object.freeze([]) });
}

export interface D1CoverageJudgement {
  readonly complete: boolean;
  readonly refusals: ReadonlyArray<{ readonly code: D1RefusalCode; readonly detail: string }>;
}

/** Exactly one decision per pinned surface: none is undecided work, two is a contradiction. */
export function judgeD1Coverage(records: readonly D1DecisionRecord[]): D1CoverageJudgement {
  const refusals: Array<{ code: D1RefusalCode; detail: string }> = [];
  for (const subject of D1_DECISION_SUBJECTS) {
    const n = records.filter((r) => r.subject === subject.key).length;
    if (n === 0) refusals.push({ code: "D1_SUBJECT_UNDECIDED", detail: `pinned surface ${subject.key} carries no decision` });
    if (n > 1) refusals.push({ code: "D1_SUBJECT_DOUBLE_DECIDED", detail: `pinned surface ${subject.key} carries ${n} decisions; exactly one is the record` });
  }
  return Object.freeze({ complete: refusals.length === 0, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}
