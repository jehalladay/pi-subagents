/**
 * Five separate evidence records, never one relabelled (APO program, 02 APO-017; 03 temporal semantics). The
 * phases of one subject's evidence are the pending proposal (a policy's), the admission (reconcile's), the native
 * receipt (the producer's), the final verification (a verifier's) and the learning evidence (a collector's). Each
 * is its own record from its own authority and cites the record of the phase before it; a record whose digest
 * equals an earlier phase's is that record relabelled, so two phases have collapsed. Never fabricate PASS: a
 * `passed` verification cites a live native receipt, a fixture or replay receipt backs only failure or
 * indeterminacy, and no record's mode exceeds the mode of what it cites (the chain-level face of
 * `EPISODE_MODE_UPGRADE_FORBIDDEN`). A verdict lives only in the verification record: a proposal or receipt that
 * carries one is unverified truth dressed as a result. Nothing here produces evidence or mints an identifier;
 * per docs/11 D-01 it is an ordinary pure function over the records a caller already holds.
 */
import type { EpisodeMode } from "./episode.js";

export type EvidencePhase = "proposal" | "admission" | "receipt" | "verification" | "learning";
export type EvidenceAuthority = "policy" | "reconcile" | "native" | "verifier" | "collector";
export type VerificationVerdict = "passed" | "failed" | "indeterminate";

export interface EvidenceRecord {
  readonly recordId: string;
  readonly phase: EvidencePhase;
  readonly authority: EvidenceAuthority;
  readonly mode: EpisodeMode;
  /** The intent or candidate the whole chain is about. */
  readonly subject: string;
  readonly digest: string;
  /** Record ids this record was derived from; the previous phase must be among them. */
  readonly basedOn: readonly string[];
  /** Only a verification carries a verdict. */
  readonly verdict?: VerificationVerdict;
}

export type EvidenceRefusalCode =
  | "EVIDENCE_AUTHORITY_MISMATCH"
  | "EVIDENCE_PHASE_ORDER"
  | "EVIDENCE_CITATION_UNKNOWN"
  | "EVIDENCE_PASS_FABRICATED"
  | "EVIDENCE_MODE_UPGRADE"
  | "EVIDENCE_PHASE_COLLAPSED"
  | "EVIDENCE_VERDICT_OUT_OF_PHASE"
  | "EVIDENCE_VERDICT_MISSING"
  | "EVIDENCE_SUBJECT_MISMATCH";

export interface EvidenceRefusal {
  readonly code: EvidenceRefusalCode;
  readonly recordId: string;
  readonly detail: string;
}

export interface EvidenceChainValidation {
  readonly schema: "mw.evidence-chain.v0";
  readonly subject: string;
  readonly ok: boolean;
  readonly phases: Readonly<Record<EvidencePhase, readonly string[]>>;
  readonly refusals: readonly EvidenceRefusal[];
}

const PHASES: readonly EvidencePhase[] = ["proposal", "admission", "receipt", "verification", "learning"];
const AUTHORITY_OF: Readonly<Record<EvidencePhase, EvidenceAuthority>> = { proposal: "policy", admission: "reconcile", receipt: "native", verification: "verifier", learning: "collector" };
const RANK: Readonly<Record<EpisodeMode, number>> = { fixture: 0, replay: 1, live: 2 };

/** Validate that one subject's evidence is five separate, ordered, honestly labelled records. Pure. */
export function validateEvidenceChain(records: readonly EvidenceRecord[]): EvidenceChainValidation {
  if (records.length === 0) throw new Error("EVIDENCE_CHAIN_EMPTY: an evidence chain has at least one record");
  const sorted = [...records].sort((x, y) => (x.recordId < y.recordId ? -1 : x.recordId > y.recordId ? 1 : 0));
  const subject = [...sorted].sort((x, y) => PHASES.indexOf(x.phase) - PHASES.indexOf(y.phase))[0]!.subject;
  const byId = new Map<string, EvidenceRecord>();
  const refusals: EvidenceRefusal[] = [];
  const phases: Record<EvidencePhase, string[]> = { proposal: [], admission: [], receipt: [], verification: [], learning: [] };
  const refuse = (code: EvidenceRefusalCode, recordId: string, detail: string): void => { refusals.push({ code, recordId, detail }); };

  for (const record of sorted) {
    const seen = byId.get(record.recordId);
    if (seen !== undefined && seen.phase !== record.phase) {
      refuse("EVIDENCE_PHASE_COLLAPSED", record.recordId, `record id ${record.recordId} is used for both ${seen.phase} and ${record.phase}`);
    }
    byId.set(record.recordId, record);
  }

  for (const record of sorted) {
    phases[record.phase].push(record.recordId);
    if (record.subject !== subject) refuse("EVIDENCE_SUBJECT_MISMATCH", record.recordId, `record ${record.recordId} is about ${record.subject}, the chain is about ${subject}`);
    if (record.authority !== AUTHORITY_OF[record.phase]) {
      refuse("EVIDENCE_AUTHORITY_MISMATCH", record.recordId, `a ${record.phase} record is the ${AUTHORITY_OF[record.phase]}'s, not the ${record.authority}'s`);
    }
    if (record.phase === "verification") {
      if (record.verdict === undefined) refuse("EVIDENCE_VERDICT_MISSING", record.recordId, `verification ${record.recordId} records no verdict`);
    } else if (record.verdict !== undefined) {
      refuse("EVIDENCE_VERDICT_OUT_OF_PHASE", record.recordId, `a ${record.phase} record carries verdict ${record.verdict}; only a verification decides`);
    }
    const earlier = sorted.find(other => other.recordId !== record.recordId && other.digest === record.digest && PHASES.indexOf(other.phase) < PHASES.indexOf(record.phase));
    if (earlier !== undefined) {
      refuse("EVIDENCE_PHASE_COLLAPSED", record.recordId, `${record.phase} ${record.recordId} has the digest of ${earlier.phase} ${earlier.recordId}; it is that record relabelled`);
    }
    const index = PHASES.indexOf(record.phase);
    if (index === 0) continue;
    const previous = PHASES[index - 1]!;
    const cited = record.basedOn.map(id => byId.get(id));
    const unknown = record.basedOn.filter((_, position) => cited[position] === undefined);
    if (unknown.length > 0) {
      refuse("EVIDENCE_CITATION_UNKNOWN", record.recordId, `${record.recordId} cites ${unknown.join(", ")}, which is not in the chain`);
      continue;
    }
    const predecessors = cited.filter((other): other is EvidenceRecord => other !== undefined && other.phase === previous);
    if (predecessors.length === 0) {
      refuse("EVIDENCE_PHASE_ORDER", record.recordId, `${record.phase} ${record.recordId} cites no ${previous} record`);
      continue;
    }
    const ceiling = Math.min(...predecessors.map(other => RANK[other.mode]));
    if (RANK[record.mode] > ceiling) {
      const lowest = predecessors.find(other => RANK[other.mode] === ceiling)!;
      refuse("EVIDENCE_MODE_UPGRADE", record.recordId, `${record.phase} ${record.recordId} is ${record.mode} but cites ${lowest.phase} ${lowest.recordId} of mode ${lowest.mode}`);
    }
    if (record.phase === "verification" && record.verdict === "passed" && predecessors.some(other => other.mode !== "live")) {
      refuse("EVIDENCE_PASS_FABRICATED", record.recordId, `verification ${record.recordId} is passed over a receipt that is not a live native receipt; a fixture or replay receipt backs only failure or indeterminacy`);
    }
  }

  refusals.sort((x, y) => (x.code < y.code ? -1 : x.code > y.code ? 1 : x.recordId < y.recordId ? -1 : x.recordId > y.recordId ? 1 : 0));
  return { schema: "mw.evidence-chain.v0", subject, ok: refusals.length === 0, phases, refusals };
}
