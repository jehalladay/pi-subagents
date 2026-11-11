import { canonicalJson, digest } from "./canonical.js";
import { UNKNOWN, type EpisodeMode, type Maybe } from "./episode.js";
import type { Comparison, ConfigurationKind, EvaluationReport } from "./evaluation.js";

/**
 * The exit report generator `mw.exit-report.v1` (collective-adaptation M3, slice C; the 05 exit report template).
 * `exportExitReport` is a pure function from declared inputs to one canonical, digest-pinned record that carries every
 * field of the template: commit, scenario ids and seeds, configured models and checkpoints, native environment
 * revisions with their receipt ids, expected against observed evidence, baseline against candidate comparisons with
 * their confidence bounds, failed cases, profiler data and residual risks. A value the caller did not supply is the
 * explicit literal `"unknown"`, never omitted, defaulted or `null`. Numbers are integers (micro-units where fractional).
 * Mode labels are copied verbatim from the inputs; the report mode is the lowest label present and is never raised.
 */

export type ExitMilestoneReason = "AUTHORITY_CHECK_UNAVAILABLE" | "EVIDENCE_UNKNOWN" | "LIVE_WITNESS_UNAVAILABLE" | "MODE_NOT_LIVE";

export interface ExitReportInputs {
  /** The 40 hex commit the evidence was gathered at. */
  readonly commit?: string | undefined;
  readonly scenarios?: readonly { readonly id: string; readonly seeds: readonly number[] }[] | undefined;
  readonly models?: readonly { readonly role: string; readonly model: string; readonly checkpoint?: string | undefined }[] | undefined;
  readonly nativeRevisions?: readonly { readonly system: string; readonly revision?: string | undefined; readonly receiptIds: readonly string[] }[] | undefined;
  /** Expected against observed evidence; `mode` is one of fixture, replay or live and is copied verbatim. */
  readonly evidence?: readonly { readonly claim: string; readonly expected: string; readonly observed?: string | undefined; readonly mode: string; readonly receiptIds: readonly string[] }[] | undefined;
  readonly evaluation?: EvaluationReport | undefined;
  readonly failedCases?: readonly { readonly id: string; readonly environment: string; readonly seed: number; readonly reason: string; readonly receiptId?: string | undefined }[] | undefined;
  /** Profiler samples in integer micro-units. */
  readonly profiler?: readonly { readonly name: string; readonly valueMicro: number }[] | undefined;
  readonly residualRisks?: readonly string[] | undefined;
  /** The required live witness: absent or unavailable marks the milestone incomplete. */
  readonly liveWitness?: { readonly available: boolean; readonly reference?: string | undefined } | undefined;
  /** The independent authority check: absent or unavailable marks the milestone incomplete. */
  readonly authorityCheck?: { readonly available: boolean; readonly reference?: string | undefined } | undefined;
}

export interface ExitReportEvaluation {
  readonly schema: string;
  readonly mode: EpisodeMode;
  readonly reportDigest: string;
  readonly partitionHash: string;
  readonly configurations: readonly { readonly id: string; readonly revision: string; readonly kind: ConfigurationKind; readonly configHash: string; readonly aggregateCompletionMicro: number }[];
  readonly comparisons: readonly Comparison[];
}

export interface ExitReport {
  readonly schema: "mw.exit-report.v1";
  readonly mode: Maybe<EpisodeMode>;
  readonly commit: Maybe<string>;
  readonly scenarios: Maybe<readonly { readonly id: string; readonly seeds: readonly number[] }[]>;
  readonly models: Maybe<readonly { readonly role: string; readonly model: string; readonly checkpoint: Maybe<string> }[]>;
  readonly nativeRevisions: Maybe<readonly { readonly system: string; readonly revision: Maybe<string>; readonly receiptIds: readonly string[] }[]>;
  readonly evidence: Maybe<readonly { readonly claim: string; readonly expected: string; readonly observed: Maybe<string>; readonly mode: EpisodeMode; readonly receiptIds: readonly string[] }[]>;
  readonly evaluation: Maybe<ExitReportEvaluation>;
  readonly failedCases: Maybe<readonly { readonly id: string; readonly environment: string; readonly seed: number; readonly reason: string; readonly receiptId: Maybe<string> }[]>;
  readonly profiler: Maybe<readonly { readonly name: string; readonly valueMicro: number }[]>;
  readonly residualRisks: Maybe<readonly string[]>;
  readonly liveWitness: Maybe<{ readonly available: boolean; readonly reference: Maybe<string> }>;
  readonly authorityCheck: Maybe<{ readonly available: boolean; readonly reference: Maybe<string> }>;
  readonly milestone: { readonly status: "complete" | "incomplete"; readonly reasons: readonly ExitMilestoneReason[] };
  readonly reportDigest: string;
}

const MODE_RANK: Readonly<Record<EpisodeMode, number>> = { fixture: 0, replay: 1, live: 2 };
const COMMIT = /^[0-9a-f]{40}$/;

function isMode(value: string): value is EpisodeMode {
  return Object.prototype.hasOwnProperty.call(MODE_RANK, value);
}

function requireMode(value: string, where: string): EpisodeMode {
  if (!isMode(value)) throw new RangeError(`EXIT_REPORT_MODE_INVALID: ${where} mode ${value} is not fixture, replay or live`);
  return value;
}

function requireIntegers(value: unknown, path: string): void {
  if (typeof value === "number") {
    if (!Number.isInteger(value)) throw new RangeError(`EXIT_REPORT_NON_INTEGER: ${path} is ${String(value)}; the report carries integers and micro-units only`);
  } else if (Array.isArray(value)) {
    value.forEach((member, index) => requireIntegers(member, `${path}[${index}]`));
  } else if (value !== null && typeof value === "object") {
    for (const [key, member] of Object.entries(value)) requireIntegers(member, `${path}.${key}`);
  }
}

function present<T, R>(value: T | undefined, build: (given: T) => R): Maybe<R> {
  return value === undefined ? UNKNOWN : build(value);
}

function evaluationSummary(evaluation: EvaluationReport): ExitReportEvaluation {
  const { reportDigest, ...body } = evaluation;
  if (digest(body) !== reportDigest) throw new RangeError(`EXIT_REPORT_EVALUATION_DIGEST_MISMATCH: the evaluation report does not hash to its own reportDigest ${reportDigest}`);
  return {
    schema: evaluation.schema, mode: requireMode(evaluation.mode, "evaluation"), reportDigest, partitionHash: evaluation.partition.hash,
    configurations: evaluation.configurations.map(c => ({ id: c.id, revision: c.revision, kind: c.kind, configHash: c.configHash, aggregateCompletionMicro: c.aggregateCompletionMicro })),
    comparisons: evaluation.comparisons,
  };
}

function lowest(modes: readonly EpisodeMode[]): Maybe<EpisodeMode> {
  if (modes.length === 0) return UNKNOWN;
  return modes.reduce((low, mode) => (MODE_RANK[mode] < MODE_RANK[low] ? mode : low));
}

function milestoneOf(report: Omit<ExitReport, "milestone" | "reportDigest">): ExitReport["milestone"] {
  const reasons: ExitMilestoneReason[] = [];
  if (report.authorityCheck === UNKNOWN || !report.authorityCheck.available) reasons.push("AUTHORITY_CHECK_UNAVAILABLE");
  if (report.evidence === UNKNOWN) reasons.push("EVIDENCE_UNKNOWN");
  if (report.liveWitness === UNKNOWN || !report.liveWitness.available) reasons.push("LIVE_WITNESS_UNAVAILABLE");
  if (report.mode !== "live") reasons.push("MODE_NOT_LIVE");
  return { status: reasons.length === 0 ? "complete" : "incomplete", reasons };
}

/** Build the exit report from declared inputs. Pure: no clock, no I/O, inputs are never mutated. */
export function exportExitReport(inputs: ExitReportInputs): ExitReport {
  requireIntegers(inputs, "inputs");
  if (inputs.commit !== undefined && !COMMIT.test(inputs.commit)) throw new RangeError(`EXIT_REPORT_COMMIT_INVALID: ${inputs.commit} is not a 40 hex sha`);
  const ids = (inputs.scenarios ?? []).map(scenario => scenario.id);
  const repeated = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (repeated.length > 0) throw new RangeError(`EXIT_REPORT_DUPLICATE_SCENARIO: ${[...new Set(repeated)].join(",")}`);
  const evidence = present(inputs.evidence, rows => rows.map(row => ({
    claim: row.claim, expected: row.expected, observed: row.observed ?? UNKNOWN, mode: requireMode(row.mode, `evidence "${row.claim}"`), receiptIds: [...row.receiptIds],
  })));
  const evaluation = present(inputs.evaluation, evaluationSummary);
  const modes = [...(evidence === UNKNOWN ? [] : evidence.map(row => row.mode)), ...(evaluation === UNKNOWN ? [] : [evaluation.mode])];
  const body = {
    schema: "mw.exit-report.v1" as const,
    mode: lowest(modes),
    commit: inputs.commit ?? UNKNOWN,
    scenarios: present(inputs.scenarios, rows => rows.map(row => ({ id: row.id, seeds: [...row.seeds] }))),
    models: present(inputs.models, rows => rows.map(row => ({ role: row.role, model: row.model, checkpoint: row.checkpoint ?? UNKNOWN }))),
    nativeRevisions: present(inputs.nativeRevisions, rows => rows.map(row => ({ system: row.system, revision: row.revision ?? UNKNOWN, receiptIds: [...row.receiptIds] }))),
    evidence,
    evaluation,
    failedCases: present(inputs.failedCases, rows => rows.map(row => ({ id: row.id, environment: row.environment, seed: row.seed, reason: row.reason, receiptId: row.receiptId ?? UNKNOWN }))),
    profiler: present(inputs.profiler, rows => rows.map(row => ({ name: row.name, valueMicro: row.valueMicro }))),
    residualRisks: present(inputs.residualRisks, rows => [...rows]),
    liveWitness: present(inputs.liveWitness, given => ({ available: given.available, reference: given.reference ?? UNKNOWN })),
    authorityCheck: present(inputs.authorityCheck, given => ({ available: given.available, reference: given.reference ?? UNKNOWN })),
  };
  const complete = { ...body, milestone: milestoneOf(body) };
  return { ...complete, reportDigest: digest(complete) };
}

/** The exported bytes of one report: canonical JSON plus a final newline, one byte sequence per report in either language. */
export function exitReportBytes(report: ExitReport): string {
  return canonicalJson(report) + "\n";
}

/** A report keeps the label its evidence supports: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelExitReport(report: ExitReport, mode: string): ExitReport {
  const label = requireMode(mode, "label");
  if (report.mode !== label) throw new Error(`EXIT_REPORT_MODE_UPGRADE_FORBIDDEN: a ${report.mode} exit report cannot be labelled ${label}`);
  return report;
}
