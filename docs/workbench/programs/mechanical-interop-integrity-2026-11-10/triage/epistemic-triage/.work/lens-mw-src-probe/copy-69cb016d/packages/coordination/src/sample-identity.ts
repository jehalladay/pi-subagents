/**
 * One sample survives fan-out (APO program, 02 APO-008; 03 temporal semantics: a retried decision identity must not
 * reroll randomness). When one decision is fanned out to several consumers, every consumer sees the same sample
 * identity, the same seed and the same sampled value: a different value under one identity is a reroll, and a
 * second identity under one decision is a fork unless it is an explicit resample that names the sample it
 * replaces and carries a new identity. Samples are cached by decision instance only, so one sample identity or
 * one seed appearing under two decisions correlates decisions that must be independent (the correlation negative
 * fixture named by APO-008) and is refused. The adapter's decision sidecar records the sampled id (APO-EAT-R005);
 * this law constrains how that sample may be shared. Pure; nothing here draws, caches or mints an identifier.
 */

export interface SampledDraw {
  readonly decisionId: string;
  readonly sampleId: string;
  readonly seed: number;
  /** Who consumed this draw: a worker, a node, an arm. */
  readonly consumer: string;
  /** The sampled choice as recorded. */
  readonly value: string;
  /** Present only on an explicit resample: the sample identity it replaces. */
  readonly resampleOf?: string;
}

export type FanOutRefusalCode =
  | "SAMPLE_REROLLED"
  | "SAMPLE_IDENTITY_FORKED"
  | "SAMPLE_RESAMPLE_SAME_IDENTITY"
  | "SAMPLE_RESAMPLE_UNKNOWN_ORIGIN"
  | "SAMPLE_SHARED_ACROSS_DECISIONS"
  | "SAMPLE_SEED_SHARED_ACROSS_DECISIONS";

export interface FanOutRefusal {
  readonly code: FanOutRefusalCode;
  readonly decisionId: string;
  readonly sampleId: string;
  readonly detail: string;
}

export interface FanOutSample {
  readonly sampleId: string;
  readonly seed: number;
  readonly value: string;
  readonly consumers: readonly string[];
  readonly resampleOf: string | null;
}

export interface FanOutDecision {
  readonly decisionId: string;
  readonly samples: readonly FanOutSample[];
}

export interface FanOutValidation {
  readonly schema: "mw.fan-out-sample.v0";
  readonly ok: boolean;
  readonly decisions: readonly FanOutDecision[];
  readonly refusals: readonly FanOutRefusal[];
}

function malformed(draw: SampledDraw): string | undefined {
  if (draw.decisionId.length === 0) return "empty decision id";
  if (draw.sampleId.length === 0) return "empty sample id";
  if (draw.consumer.length === 0) return "no consumer";
  if (!Number.isInteger(draw.seed)) return `seed ${String(draw.seed)} is not an integer`;
  if (draw.resampleOf !== undefined && draw.resampleOf.length === 0) return "empty resample origin";
  return undefined;
}

const byString = (x: string, y: string): number => (x < y ? -1 : x > y ? 1 : 0);

/** Validate that fanned-out draws preserve one sample per decision and correlate nothing across decisions. Pure. */
export function validateFanOut(draws: readonly SampledDraw[]): FanOutValidation {
  if (draws.length === 0) throw new Error("SAMPLE_DRAWS_EMPTY: a fan-out validation needs at least one draw");
  for (const draw of draws) {
    const problem = malformed(draw);
    if (problem !== undefined) throw new Error(`SAMPLE_DRAW_MALFORMED: ${problem} (decision ${JSON.stringify(draw.decisionId)}, sample ${JSON.stringify(draw.sampleId)})`);
  }
  const refusals: FanOutRefusal[] = [];
  const decisionIds = [...new Set(draws.map(draw => draw.decisionId))].sort(byString);
  const decisions: FanOutDecision[] = [];
  for (const decisionId of decisionIds) {
    const own = draws.filter(draw => draw.decisionId === decisionId);
    const sampleIds = [...new Set(own.map(draw => draw.sampleId))].sort(byString);
    const samples: FanOutSample[] = [];
    for (const sampleId of sampleIds) {
      const group = own.filter(draw => draw.sampleId === sampleId);
      const first = group[0]!;
      const values = [...new Set(group.map(draw => draw.value))].sort(byString);
      if (values.length > 1) {
        refusals.push({ code: "SAMPLE_REROLLED", decisionId, sampleId, detail: `sample ${sampleId} of decision ${decisionId} carries ${values.length} values (${values.join(", ")}); one identity means one draw` });
      }
      const origins = [...new Set(group.map(draw => draw.resampleOf).filter((o): o is string => o !== undefined))].sort(byString);
      const resampleOf = origins[0] ?? null;
      if (resampleOf !== null) {
        if (resampleOf === sampleId) refusals.push({ code: "SAMPLE_RESAMPLE_SAME_IDENTITY", decisionId, sampleId, detail: `sample ${sampleId} claims to resample itself; a resample carries a new identity` });
        else if (!sampleIds.includes(resampleOf)) refusals.push({ code: "SAMPLE_RESAMPLE_UNKNOWN_ORIGIN", decisionId, sampleId, detail: `sample ${sampleId} resamples ${resampleOf}, which decision ${decisionId} never drew` });
      }
      samples.push({ sampleId, seed: first.seed, value: values[0]!, consumers: [...new Set(group.map(draw => draw.consumer))].sort(byString), resampleOf });
    }
    const roots = samples.filter(sample => sample.resampleOf === null);
    for (const extra of roots.slice(1)) {
      refusals.push({ code: "SAMPLE_IDENTITY_FORKED", decisionId, sampleId: extra.sampleId, detail: `decision ${decisionId} carries sample ${extra.sampleId} beside ${roots[0]!.sampleId} with no explicit resample; one decision, one sample` });
    }
    decisions.push({ decisionId, samples });
  }
  const sampleOwners = new Map<string, string[]>();
  const seedOwners = new Map<number, string[]>();
  for (const decision of decisions) for (const sample of decision.samples) {
    sampleOwners.set(sample.sampleId, [...(sampleOwners.get(sample.sampleId) ?? []), decision.decisionId]);
    seedOwners.set(sample.seed, [...(seedOwners.get(sample.seed) ?? []), decision.decisionId]);
  }
  for (const [sampleId, owners] of sampleOwners) {
    const distinct = [...new Set(owners)].sort(byString);
    if (distinct.length > 1) refusals.push({ code: "SAMPLE_SHARED_ACROSS_DECISIONS", decisionId: distinct[1]!, sampleId, detail: `sample ${sampleId} appears under decisions ${distinct.join(", ")}; samples are cached by decision instance only` });
  }
  for (const [seed, owners] of seedOwners) {
    const distinct = [...new Set(owners)].sort(byString);
    if (distinct.length > 1 && !refusals.some(r => r.code === "SAMPLE_SHARED_ACROSS_DECISIONS" && distinct.includes(r.decisionId))) {
      refusals.push({ code: "SAMPLE_SEED_SHARED_ACROSS_DECISIONS", decisionId: distinct[1]!, sampleId: decisions.find(d => d.decisionId === distinct[1])!.samples.find(s => s.seed === seed)!.sampleId, detail: `seed ${seed} drives decisions ${distinct.join(", ")}; independent decisions draw from independent seeds` });
    }
  }
  refusals.sort((x, y) => byString(x.code, y.code) || byString(x.decisionId, y.decisionId) || byString(x.sampleId, y.sampleId));
  return { schema: "mw.fan-out-sample.v0", ok: refusals.length === 0, decisions, refusals };
}
