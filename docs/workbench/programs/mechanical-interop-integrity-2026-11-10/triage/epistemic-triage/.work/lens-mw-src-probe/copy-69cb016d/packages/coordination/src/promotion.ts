/**
 * Promotion of a candidate with an invalid or unproven required guarantee is refused (APO program, 02 APO-023;
 * acceptance is the gate-negative test). A candidate names the guarantees its promotion requires and carries the
 * proof records a verifier produced for them. This decision only reads those records: a required guarantee is
 * promotable when every record for it is `proven`, references its proof, and was proved against this candidate's
 * hash; a missing record, an `unproven` or `invalid` status, a stale hash or an unreferenced claim of proof each
 * refuse the promotion by name, and the worst record for a guarantee decides it. A proof of a guarantee nobody
 * required covers nothing. The output is a record (`authority: record-only`): it has no force or override
 * surface and writes no status anywhere — whoever promotes reads the record and acts under its own authority.
 * Per docs/11 D-01 this is an ordinary pure function over existing records.
 */
import type { Maybe } from "./episode.js";
import { UNKNOWN } from "./episode.js";

export type GuaranteeProofStatus = "proven" | "unproven" | "invalid";

/** A verifier's record about one guarantee of one candidate. */
export interface GuaranteeProof {
  readonly guaranteeId: string;
  readonly status: GuaranteeProofStatus;
  /** Reference to the proof artifact; a `proven` record without one is an unreferenced claim. */
  readonly proofRef?: string;
  /** The candidate hash the proof was taken against; another hash makes the proof stale for this candidate. */
  readonly provedAgainst?: string;
}

export interface PromotionCandidate {
  readonly candidateId: string;
  readonly candidateHash: string;
  readonly requiredGuarantees: readonly string[];
  readonly proofs: readonly GuaranteeProof[];
}

export type PromotionRefusalCode =
  | "PROMOTION_GUARANTEE_MISSING"
  | "PROMOTION_GUARANTEE_INVALID"
  | "PROMOTION_GUARANTEE_UNPROVEN"
  | "PROMOTION_GUARANTEE_PROOF_STALE"
  | "PROMOTION_GUARANTEE_PROOF_UNREFERENCED";

export interface PromotionRefusal {
  readonly code: PromotionRefusalCode;
  readonly guaranteeId: string;
  readonly detail: string;
}

export type GuaranteeVerdict = GuaranteeProofStatus | "missing" | "stale" | "unreferenced";

export interface GuaranteeJudgement {
  readonly guaranteeId: string;
  readonly status: GuaranteeVerdict;
  readonly proofRef: Maybe<string>;
}

export interface PromotionDecision {
  readonly schema: "mw.promotion-decision.v0";
  readonly candidateId: string;
  readonly candidateHash: string;
  readonly decision: "promote" | "refuse";
  /** A decision record, never a status write; the promoter acts under its own authority. */
  readonly authority: "record-only";
  readonly guarantees: readonly GuaranteeJudgement[];
  readonly refusals: readonly PromotionRefusal[];
}

/** Lower is worse; the worst record for a guarantee decides it. */
const SEVERITY: Readonly<Record<PromotionRefusalCode, number>> = {
  PROMOTION_GUARANTEE_INVALID: 0,
  PROMOTION_GUARANTEE_MISSING: 1,
  PROMOTION_GUARANTEE_UNPROVEN: 2,
  PROMOTION_GUARANTEE_PROOF_STALE: 3,
  PROMOTION_GUARANTEE_PROOF_UNREFERENCED: 4,
};

/** The judgement names the refusal outcome; the record's self-claimed status is never copied (docs/10 4v6o.5). */
const VERDICT_OF: Readonly<Record<PromotionRefusalCode, GuaranteeVerdict>> = {
  PROMOTION_GUARANTEE_INVALID: "invalid",
  PROMOTION_GUARANTEE_MISSING: "missing",
  PROMOTION_GUARANTEE_UNPROVEN: "unproven",
  PROMOTION_GUARANTEE_PROOF_STALE: "stale",
  PROMOTION_GUARANTEE_PROOF_UNREFERENCED: "unreferenced",
};

function judgeRecord(record: GuaranteeProof, candidateHash: string): PromotionRefusal | undefined {
  const id = record.guaranteeId;
  if (record.status === "invalid") return { code: "PROMOTION_GUARANTEE_INVALID", guaranteeId: id, detail: `guarantee ${id} is recorded invalid` };
  if (record.status === "unproven") return { code: "PROMOTION_GUARANTEE_UNPROVEN", guaranteeId: id, detail: `guarantee ${id} is recorded unproven` };
  if (record.provedAgainst !== candidateHash) {
    return { code: "PROMOTION_GUARANTEE_PROOF_STALE", guaranteeId: id, detail: `guarantee ${id} was proved against ${record.provedAgainst ?? "no candidate hash"}, this candidate is ${candidateHash}` };
  }
  if (record.proofRef === undefined || record.proofRef.length === 0) {
    return { code: "PROMOTION_GUARANTEE_PROOF_UNREFERENCED", guaranteeId: id, detail: `guarantee ${id} is claimed proven without a proof reference` };
  }
  return undefined;
}

/** Decide whether a candidate's required guarantees permit promotion. Pure; writes nothing. */
export function decidePromotion(candidate: PromotionCandidate): PromotionDecision {
  const guarantees: GuaranteeJudgement[] = [];
  const refusals: PromotionRefusal[] = [];
  for (const guaranteeId of [...new Set(candidate.requiredGuarantees)].sort()) {
    const records = candidate.proofs.filter(record => record.guaranteeId === guaranteeId);
    if (records.length === 0) {
      guarantees.push({ guaranteeId, status: "missing", proofRef: UNKNOWN });
      refusals.push({ code: "PROMOTION_GUARANTEE_MISSING", guaranteeId, detail: `required guarantee ${guaranteeId} has no proof record` });
      continue;
    }
    const judged = records.map(record => ({ record, problem: judgeRecord(record, candidate.candidateHash) }));
    const problems = judged.map(j => j.problem).filter((r): r is PromotionRefusal => r !== undefined);
    const worst = [...problems].sort((x, y) => SEVERITY[x.code] - SEVERITY[y.code])[0];
    // Canonical order (permutation-invariant): the judgement cites the least proofRef, and the stale detail names every stale hash sorted.
    const least = (refs: readonly (string | undefined)[]): Maybe<string> => refs.filter((r): r is string => r !== undefined && r.length > 0).sort()[0] ?? UNKNOWN;
    const status: GuaranteeVerdict = worst === undefined ? "proven" : VERDICT_OF[worst.code];
    const proofRef = least(judged.filter(j => (j.problem?.code) === worst?.code).map(j => j.record.proofRef));
    guarantees.push({ guaranteeId, status, proofRef });
    if (worst === undefined) continue;
    if (worst.code !== "PROMOTION_GUARANTEE_PROOF_STALE") {
      refusals.push(worst);
      continue;
    }
    const stale = judged.filter(j => j.problem?.code === worst.code).map(j => j.record);
    const hashes = [...new Set(stale.map(record => record.provedAgainst ?? "no candidate hash"))].sort();
    refusals.push({ ...worst, detail: `guarantee ${guaranteeId} has ${stale.length} stale proof record${stale.length === 1 ? "" : "s"}, proved against ${hashes.join(", ")}, this candidate is ${candidate.candidateHash}` });
  }
  refusals.sort((x, y) => (x.code < y.code ? -1 : x.code > y.code ? 1 : x.guaranteeId < y.guaranteeId ? -1 : x.guaranteeId > y.guaranteeId ? 1 : 0));
  return { schema: "mw.promotion-decision.v0", candidateId: candidate.candidateId, candidateHash: candidate.candidateHash, decision: refusals.length === 0 ? "promote" : "refuse", authority: "record-only", guarantees, refusals };
}
