/**
 * Decision witness binding (APO-010): every decision binds an observation witness — the canonical digest of the
 * observed content — and one source-revision witness for each source in its read set, covering that read set exactly.
 * `bindDecisionWitnesses` refuses a digest that does not match the content, a read source without a witness, a
 * witness for a source that was not read, a blank revision and two different revisions for one source.
 * `admitAgainstCurrentRevisions` compares a binding with the current revisions of its sources: a source that moved
 * since the decision read it is a stale witness and a refusal naming the witnessed and current revisions; a source
 * whose current revision is not known is a refusal too, never admitted by default; an invalid binding is never
 * admitted. Admission is an order-independent boundary for decoded input (o25m seat ruling R1 to R4): two different
 * current revisions for one source refuse as `WITNESS_CURRENT_CONFLICT` naming both, identical duplicates collapse,
 * and a blank or non-string current revision is `WITNESS_CURRENT_UNKNOWN`; a repeated read-set entry counts once; a
 * non-string witness revision is `WITNESS_BINDING_INVALID` and non-finite observation content is a digest mismatch,
 * never a throw. Pure records: nothing here reads a source or observes anything.
 */
import { digest } from "./canonical.js";

export interface SourceRevisionWitness {
  readonly source: string;
  readonly revision: string;
}

export interface DecisionWitnesses {
  readonly decisionId: string;
  /** The sources the decision read; the witnesses must cover exactly these. */
  readonly readSet: readonly string[];
  readonly observation: { readonly digest: string; readonly content: unknown };
  readonly sources: readonly SourceRevisionWitness[];
}

export type WitnessBindingRefusalCode =
  | "WITNESS_OBSERVATION_DIGEST_MISMATCH"
  | "WITNESS_SOURCE_MISSING"
  | "WITNESS_SOURCE_UNREAD"
  | "WITNESS_REVISION_BLANK"
  | "WITNESS_SOURCE_CONFLICT"
  | "WITNESS_BINDING_INVALID";

export interface WitnessRefusal<Code extends string> {
  readonly code: Code;
  readonly subject: string;
  readonly detail: string;
}

export interface DecisionWitnessBinding {
  readonly schema: "mw.decision-witness-binding.v0";
  readonly decisionId: string;
  readonly ok: boolean;
  readonly observationDigest: string;
  /** One witness per read source, sorted by source. */
  readonly bound: readonly SourceRevisionWitness[];
  readonly refusals: readonly WitnessRefusal<WitnessBindingRefusalCode>[];
}

export function bindDecisionWitnesses(witnesses: DecisionWitnesses): DecisionWitnessBinding {
  const refusals: WitnessRefusal<WitnessBindingRefusalCode>[] = [];
  let expected: string | undefined;
  let digestError = "";
  try {
    expected = digest(witnesses.observation.content);
  } catch (error) {
    digestError = error instanceof Error ? error.message : String(error);
  }
  if (expected === undefined) {
    refusals.push({ code: "WITNESS_OBSERVATION_DIGEST_MISMATCH", subject: witnesses.decisionId, detail: `${witnesses.decisionId} claims observation digest ${witnesses.observation.digest}; the observed content cannot be canonicalised: ${digestError}` });
  } else if (witnesses.observation.digest !== expected) {
    refusals.push({ code: "WITNESS_OBSERVATION_DIGEST_MISMATCH", subject: witnesses.decisionId, detail: `${witnesses.decisionId} claims observation digest ${witnesses.observation.digest}; the observed content gives ${expected}` });
  }
  const read = new Set(witnesses.readSet);
  const bydSource = new Map<string, string>();
  for (const witness of witnesses.sources) {
    if (!read.has(witness.source)) {
      refusals.push({ code: "WITNESS_SOURCE_UNREAD", subject: witness.source, detail: `${witness.source} carries a witness but is not in the read set of ${witnesses.decisionId}` });
      continue;
    }
    if (typeof witness.revision !== "string") {
      refusals.push({ code: "WITNESS_BINDING_INVALID", subject: witness.source, detail: `${witness.source} is witnessed at a revision of type ${typeof witness.revision}; a revision is a string` });
      continue;
    }
    if (witness.revision.trim().length === 0) {
      refusals.push({ code: "WITNESS_REVISION_BLANK", subject: witness.source, detail: `${witness.source} is witnessed at a blank revision` });
      continue;
    }
    const seen = bydSource.get(witness.source);
    if (seen !== undefined && seen !== witness.revision) {
      refusals.push({ code: "WITNESS_SOURCE_CONFLICT", subject: witness.source, detail: `${witness.source} is witnessed at both ${seen} and ${witness.revision}` });
      continue;
    }
    bydSource.set(witness.source, witness.revision);
  }
  for (const source of read) {
    if (!bydSource.has(source) && !witnesses.sources.some(w => w.source === source)) {
      refusals.push({ code: "WITNESS_SOURCE_MISSING", subject: source, detail: `${source} was read by ${witnesses.decisionId} and carries no source-revision witness` });
    }
  }
  const bound = [...bydSource].map(([source, revision]) => ({ source, revision })).sort((a, b) => (a.source < b.source ? -1 : a.source > b.source ? 1 : 0));
  return { schema: "mw.decision-witness-binding.v0", decisionId: witnesses.decisionId, ok: refusals.length === 0, observationDigest: witnesses.observation.digest, bound, refusals };
}

export type WitnessAdmissionRefusalCode = "WITNESS_STALE" | "WITNESS_CURRENT_UNKNOWN" | "WITNESS_CURRENT_CONFLICT" | WitnessBindingRefusalCode;

export interface StaleWitness {
  readonly source: string;
  readonly witnessed: string;
  readonly current: string;
}

export interface DecisionWitnessAdmission {
  readonly schema: "mw.decision-witness-admission.v0";
  readonly decisionId: string;
  readonly admitted: boolean;
  /** Sources that moved since the decision read them, sorted by source. */
  readonly stale: readonly StaleWitness[];
  readonly refusals: readonly WitnessRefusal<WitnessAdmissionRefusalCode>[];
}

export function admitAgainstCurrentRevisions(binding: DecisionWitnessBinding, current: readonly SourceRevisionWitness[]): DecisionWitnessAdmission {
  const base = { schema: "mw.decision-witness-admission.v0" as const, decisionId: binding.decisionId };
  if (!binding.ok) {
    return { ...base, admitted: false, stale: [], refusals: [{ code: "WITNESS_BINDING_INVALID", subject: binding.decisionId, detail: `${binding.decisionId} has an invalid witness binding; nothing is admitted on it` }, ...binding.refusals] };
  }
  const reported = new Map<string, unknown[]>();
  for (const witness of current) reported.set(witness.source, [...(reported.get(witness.source) ?? []), witness.revision]);
  const refusals: WitnessRefusal<WitnessAdmissionRefusalCode>[] = [];
  const stale: StaleWitness[] = [];
  const conflicted = new Set<string>();
  for (const source of [...reported.keys()].sort()) {
    const distinct = [...new Set(reported.get(source)!.filter((revision): revision is string => typeof revision === "string" && revision.trim().length > 0))].sort();
    if (distinct.length < 2) continue;
    conflicted.add(source);
    refusals.push({ code: "WITNESS_CURRENT_CONFLICT", subject: source, detail: `${source} is currently reported at both ${distinct.join(" and ")}; a current revision is one value, never the last one listed` });
  }
  for (const witness of binding.bound) {
    if (conflicted.has(witness.source)) continue;
    const usable = (reported.get(witness.source) ?? []).filter((revision): revision is string => typeof revision === "string" && revision.trim().length > 0);
    const revision = usable[0];
    if (revision === undefined || usable.length < reported.get(witness.source)!.length) {
      refusals.push({ code: "WITNESS_CURRENT_UNKNOWN", subject: witness.source, detail: `${witness.source} has no known current revision; a witness cannot be judged fresh by default` });
      continue;
    }
    if (revision !== witness.revision) {
      stale.push({ source: witness.source, witnessed: witness.revision, current: revision });
      refusals.push({ code: "WITNESS_STALE", subject: witness.source, detail: `${witness.source} moved from ${witness.revision}, which ${binding.decisionId} read, to ${revision}` });
    }
  }
  return { ...base, admitted: refusals.length === 0, stale, refusals };
}
