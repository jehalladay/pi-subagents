/**
 * mw.decision-receipt.v1 (GPC-EAT-R006, MechanicalWorkflows-d804). The ONE home of the GPC
 * per-decision sidecar field list is schema/decision-receipt.v1.schema.json; both program
 * documents reference it and enumerate nothing. A receipt correlates one decision's proposal,
 * admission and outcome records: GP graph/program/checkpoint/snapshot hashes, feature-projection
 * digest, actor and selector id+revision, pre-sampling legal support, behavior log probability,
 * observation completeness, proposed/admitted/executed action ids, source receipt, resolver
 * verdict, verifier outcome and feedback status. Every value no source reported is the literal
 * "unknown" — a builder or validator never fabricates one (no GP, no support/logProb producer,
 * no completeness recorder, no general verifier channel exist today). mw.training-export.v1 and
 * the APO sidecar mw.coordination-decision.v1 are separate records and stay untouched.
 */
import type { Episode, Maybe } from "./episode.js";

export type DecisionReceiptFeedbackStatus = "unknown" | "pending" | "final";

export interface DecisionReceiptGp {
  readonly graphHash: Maybe<string>;
  readonly programHash: Maybe<string>;
  readonly checkpointHash: Maybe<string>;
  readonly snapshotHash: Maybe<string>;
}

export interface DecisionReceiptActions {
  readonly proposed: readonly string[];
  readonly admitted: Maybe<readonly string[]>;
  readonly executed: Maybe<readonly string[]>;
}

export interface DecisionReceipt {
  readonly schema: "mw.decision-receipt.v1";
  readonly version: 1;
  readonly decisionId: string;
  readonly gp: DecisionReceiptGp;
  readonly featureProjectionDigest: Maybe<string>;
  readonly actor: { readonly id: string; readonly revision: string };
  readonly selector: { readonly id: Maybe<string>; readonly revision: Maybe<string> };
  /** The sampler's pre-sampling legal support; "unknown" until a producer exists (post-admission masks are never read as support). */
  readonly support: Maybe<readonly string[]>;
  readonly logProb: Maybe<number>;
  readonly completeness: Maybe<string>;
  readonly actions: DecisionReceiptActions;
  readonly sourceReceipt: Maybe<string>;
  readonly resolverVerdict: Maybe<string>;
  readonly verifierOutcome: Maybe<string>;
  readonly feedback: { readonly status: DecisionReceiptFeedbackStatus };
}

export type DecisionReceiptValidation =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "DECISION_RECEIPT_MALFORMED"; readonly detail: string };

const DIGEST = /^sha256:[0-9a-f]{64}$/;
const STATUSES: ReadonlySet<string> = new Set<DecisionReceiptFeedbackStatus>(["unknown", "pending", "final"]);
const nonblank = (value: string): boolean => value.trim().length > 0;
const UNKNOWN = "unknown" as const;

/** A decoded receipt can carry any JSON value at a member typed string; the nonblank sites read it only after this guard (MechanicalWorkflows-qa1sm). */
function notString(member: string, value: unknown): string | null {
  return typeof value === "string" ? null : `${member} is not a string (typeof ${typeof value})`;
}

/** An id list must be an array of strings; the literal unknown also passes where the member is Maybe. Names the member and the typeof of the offending value. */
function listType(member: string, value: unknown, maybe: boolean): string | null {
  if (maybe && value === UNKNOWN) return null;
  if (!Array.isArray(value)) return `${member} is not an array (typeof ${typeof value})`;
  for (let index = 0; index < value.length; index += 1) {
    const defect = notString(`${member}[${index}]`, value[index]);
    if (defect !== null) return defect;
  }
  return null;
}

function badIds(value: Maybe<readonly string[]>): boolean {
  return value !== UNKNOWN && (value.length === 0 || value.some(id => !nonblank(id)));
}

function badDigest(value: Maybe<string>): boolean {
  return value !== UNKNOWN && !DIGEST.test(value);
}

function malformed(receipt: DecisionReceipt): string | null {
  if (receipt.schema !== "mw.decision-receipt.v1" || receipt.version !== 1) return `unsupported schema/version ${String(receipt.schema)}/${String(receipt.version)}`;
  const decisionIdType = notString("decisionId", receipt.decisionId);
  if (decisionIdType !== null) return decisionIdType;
  if (!nonblank(receipt.decisionId)) return "blank decisionId";
  for (const member of ["graphHash", "programHash", "checkpointHash", "snapshotHash"] as const) {
    if (badDigest(receipt.gp[member])) return `gp.${member} is neither a sha256 digest nor the literal unknown`;
  }
  if (badDigest(receipt.featureProjectionDigest)) return "featureProjectionDigest is neither a sha256 digest nor the literal unknown";
  const scalarType = notString("actor.id", receipt.actor.id) ?? notString("actor.revision", receipt.actor.revision);
  if (scalarType !== null) return scalarType;
  if (!nonblank(receipt.actor.id) || !nonblank(receipt.actor.revision)) return "actor id/revision is blank";
  const selectorType = notString("selector.id", receipt.selector.id) ?? notString("selector.revision", receipt.selector.revision);
  if (selectorType !== null) return selectorType;
  if (receipt.selector.id !== UNKNOWN && !nonblank(receipt.selector.id)) return "selector id is blank";
  if (receipt.selector.revision !== UNKNOWN && !nonblank(receipt.selector.revision)) return "selector revision is blank";
  const supportType = listType("support", receipt.support, true);
  if (supportType !== null) return supportType;
  if (badIds(receipt.support)) return "support is neither a non-empty id list nor the literal unknown";
  if (receipt.logProb !== UNKNOWN && !Number.isFinite(receipt.logProb)) return "logProb is neither a finite number nor the literal unknown";
  const completenessType = notString("completeness", receipt.completeness);
  if (completenessType !== null) return completenessType;
  if (receipt.completeness !== UNKNOWN && !nonblank(receipt.completeness)) return "completeness is blank";
  const listsType = listType("proposed", receipt.actions.proposed, false) ?? listType("admitted", receipt.actions.admitted, true) ?? listType("executed", receipt.actions.executed, true);
  if (listsType !== null) return listsType;
  if (receipt.actions.proposed.some(id => !nonblank(id))) return "proposed carries a blank action id";
  if (receipt.actions.admitted !== UNKNOWN && receipt.actions.admitted.some(id => !nonblank(id))) return "admitted carries a blank action id";
  if (receipt.actions.executed !== UNKNOWN && receipt.actions.executed.some(id => !nonblank(id))) return "executed carries a blank action id";
  if (badDigest(receipt.sourceReceipt)) return "sourceReceipt is neither a sha256 digest nor the literal unknown";
  const outcomeType = notString("resolverVerdict", receipt.resolverVerdict) ?? notString("verifierOutcome", receipt.verifierOutcome);
  if (outcomeType !== null) return outcomeType;
  if (receipt.resolverVerdict !== UNKNOWN && !nonblank(receipt.resolverVerdict)) return "resolverVerdict is blank";
  if (receipt.verifierOutcome !== UNKNOWN && !nonblank(receipt.verifierOutcome)) return "verifierOutcome is blank";
  if (!STATUSES.has(receipt.feedback.status)) return `feedback status ${String(receipt.feedback.status)} is outside {unknown, pending, final}`;
  return null;
}

/** Validate one receipt. Recorded values are admitted when well-formed; nothing is defaulted. */
export function validateDecisionReceipt(receipt: DecisionReceipt): DecisionReceiptValidation {
  const defect = malformed(receipt);
  return defect === null ? { ok: true } : { ok: false, code: "DECISION_RECEIPT_MALFORMED", detail: defect };
}

/**
 * One receipt per decision of an mw.episode.v1 episode. Only what the episode actually records is
 * carried: everything else — GP hashes, projection digest, selector, support, logProb,
 * completeness, executed ids, verifier outcome, feedback — is the literal "unknown"; the decision's own recorded logProb and the episode's verifier receipt digest are carried as recorded.
 */
export function buildDecisionReceipts(episode: Episode): DecisionReceipt[] {
  return episode.decisions.map(decision => ({
    schema: "mw.decision-receipt.v1",
    version: 1,
    decisionId: `${episode.episodeId}:${decision.step}`,
    gp: { graphHash: UNKNOWN, programHash: UNKNOWN, checkpointHash: UNKNOWN, snapshotHash: UNKNOWN },
    featureProjectionDigest: UNKNOWN,
    actor: { id: episode.policy.id, revision: episode.policy.revision },
    selector: { id: UNKNOWN, revision: UNKNOWN },
    support: UNKNOWN,
    logProb: decision.logProb,
    completeness: UNKNOWN,
    actions: { proposed: [...decision.proposed], admitted: [...decision.eligibility.admitted], executed: UNKNOWN },
    sourceReceipt: episode.verifier.receiptDigest,
    resolverVerdict: `admitted=${decision.eligibility.admitted.length},rejected=${decision.eligibility.rejected.length}`,
    verifierOutcome: UNKNOWN,
    feedback: { status: UNKNOWN },
  }));
}
