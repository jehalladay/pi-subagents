/**
 * Adversarial corpus judge (APO-024, acceptance "adversarial corpus"; 11 "QA, security, negative controls"): the
 * program's rejection claims — incompatible, missing and unknown evidence, nonfinite numbers, stale graphs and stale
 * checkpoints, bad evidence references — are kept honest by a corpus of adversarial cases, each naming the row it
 * attacks and the refusal code the validator under attack must produce. `judgeCorpus` grades the observed outcomes: a
 * case passes only when the expected code is among the codes observed; a case that was admitted (no code at all) or
 * refused for another reason fails; every row must carry at least two distinct cases, and case ids are unique (a repeated id is refused and then skipped, so it counts once). The judge is a
 * pure record over outcomes the test harness collected by driving the real validators; it drives nothing itself.
 * Sibling slices gated elsewhere: nonfinite/negative ResourceClaim (APO-EAT-R001), checkpoint mismatch (APO-EAT-R011),
 * unknown logProb/support (APO-EAT-R006).
 */

export type AdversarialRow =
  | "bad-evidence-reference"
  | "incompatible-evidence"
  | "missing-evidence"
  | "unknown-evidence"
  | "nonfinite-number"
  | "stale-graph"
  | "stale-checkpoint";

export const ADVERSARIAL_ROWS: readonly AdversarialRow[] = Object.freeze(["bad-evidence-reference", "incompatible-evidence", "missing-evidence", "unknown-evidence", "nonfinite-number", "stale-graph", "stale-checkpoint"] as const);

/** Every row must carry at least this many distinct cases (tga5 Q2: the corpus law is "every row is covered at least twice"). */
export const MIN_CASES_PER_ROW = 2;

export interface CaseOutcome {
  readonly caseId: string;
  readonly row: AdversarialRow;
  /** The validator driven, for the record. */
  readonly validator: string;
  readonly expected: string;
  /** Every refusal code the validator produced; empty when it admitted the input. */
  readonly observed: readonly string[];
}

export type CaseVerdict = "refused-as-expected" | "refused-otherwise" | "admitted";

export interface CaseJudgement {
  readonly caseId: string;
  readonly row: AdversarialRow;
  readonly validator: string;
  readonly expected: string;
  readonly observed: readonly string[];
  readonly verdict: CaseVerdict;
}

export type CorpusRefusalCode = "CORPUS_ROW_UNCOVERED" | "CORPUS_ROW_UNDERCOVERED" | "CORPUS_CASE_DUPLICATE" | "CORPUS_ROW_UNKNOWN";

export interface CorpusJudgement {
  readonly schema: "mw.adversarial-corpus.v0";
  readonly ok: boolean;
  readonly total: number;
  readonly passed: number;
  /** Case count per row, every row present. */
  readonly coverage: Readonly<Record<AdversarialRow, number>>;
  readonly cases: readonly CaseJudgement[];
  /** Cases that did not refuse as expected. */
  readonly failures: readonly CaseJudgement[];
  readonly refusals: readonly { readonly code: CorpusRefusalCode; readonly subject: string; readonly detail: string }[];
}

export function judgeCorpus(outcomes: readonly CaseOutcome[]): CorpusJudgement {
  const refusals: CorpusJudgement["refusals"][number][] = [];
  const coverage: Record<AdversarialRow, number> = { "bad-evidence-reference": 0, "incompatible-evidence": 0, "missing-evidence": 0, "unknown-evidence": 0, "nonfinite-number": 0, "stale-graph": 0, "stale-checkpoint": 0 };
  const seen = new Set<string>();
  const cases: CaseJudgement[] = [];
  for (const outcome of outcomes) {
    if (seen.has(outcome.caseId)) {
      refusals.push({ code: "CORPUS_CASE_DUPLICATE", subject: outcome.caseId, detail: `case ${outcome.caseId} appears more than once` });
      continue;
    }
    seen.add(outcome.caseId);
    if (!ADVERSARIAL_ROWS.includes(outcome.row)) {
      refusals.push({ code: "CORPUS_ROW_UNKNOWN", subject: outcome.caseId, detail: `case ${outcome.caseId} attacks row ${String(outcome.row)}, which the matrix does not have` });
      continue;
    }
    coverage[outcome.row] += 1;
    const verdict: CaseVerdict = outcome.observed.length === 0 ? "admitted" : outcome.observed.includes(outcome.expected) ? "refused-as-expected" : "refused-otherwise";
    cases.push({ caseId: outcome.caseId, row: outcome.row, validator: outcome.validator, expected: outcome.expected, observed: outcome.observed, verdict });
  }
  for (const row of ADVERSARIAL_ROWS) {
    if (coverage[row] === 0) refusals.push({ code: "CORPUS_ROW_UNCOVERED", subject: row, detail: `row ${row} has no adversarial case` });
    else if (coverage[row] < MIN_CASES_PER_ROW) refusals.push({ code: "CORPUS_ROW_UNDERCOVERED", subject: row, detail: `row ${row} has ${coverage[row]} adversarial case, fewer than the ${MIN_CASES_PER_ROW} every row must carry` });
  }
  const failures = cases.filter(judged => judged.verdict !== "refused-as-expected");
  const passed = cases.length - failures.length;
  return { schema: "mw.adversarial-corpus.v0", ok: refusals.length === 0 && failures.length === 0, total: cases.length, passed, coverage, cases, failures, refusals };
}
