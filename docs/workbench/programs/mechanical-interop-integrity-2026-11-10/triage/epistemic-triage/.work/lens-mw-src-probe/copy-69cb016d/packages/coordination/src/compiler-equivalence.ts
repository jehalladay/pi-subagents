/**
 * D2 deterministic-compiler exit evidence (APO 12 D2; carried by lrzn.3).
 *
 * Stage D2 exits on three witnesses, never on assertion: the graph compiler is
 * deterministic (repeated compiles of one manifest canonicalize to identical bytes), the
 * old/new fixture outputs are byte-equivalent pair by pair, and the local trace it read is
 * read-only (a closed vocabulary where only "read" is lawful). An empty pair set, a blank
 * side, a duplicate pair name, a diverging trial or a write in the trace refuses with the
 * first divergence named by byte offset.
 */

import { compilePolicyGraph, type PolicyGraphManifest, type PolicyGraphPlan } from "./policy-graph.js";

export type D2RefusalCode =
  | "D2_EQUIV_NO_PAIRS"
  | "D2_EQUIV_NAME_DUPLICATE"
  | "D2_EQUIV_BYTES_MISSING"
  | "D2_EQUIV_PAIR_MISMATCH"
  | "D2_DETERMINISM_TRIALS_INSUFFICIENT"
  | "D2_DETERMINISM_DIVERGED"
  | "D2_TRACE_WRITE_OBSERVED"
  | "D2_TRACE_KIND_UNKNOWN"
  | "D2_EXIT_WITNESS_MISSING";

export interface D2Refusal {
  readonly code: D2RefusalCode;
  readonly detail: string;
}

/** Canonical byte form of one compile result: stable key order, no whitespace variance. */
export function canonicalPlanBytes(plan: PolicyGraphPlan): string {
  if (plan.ok) return JSON.stringify({ ok: true, order: [...plan.order] });
  return JSON.stringify({ code: plan.code, detail: plan.detail, ok: false });
}

export interface FixturePair {
  readonly name: string;
  readonly oldBytes: string;
  readonly newBytes: string;
}

export interface EquivalenceJudgement {
  readonly ok: boolean;
  readonly pairsJudged: number;
  readonly refusals: readonly D2Refusal[];
}

/** Byte offset of the first differing position (equal-prefix length when lengths differ). */
function firstDivergenceOffset(a: string, b: string): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i += 1) if (a[i] !== b[i]) return i;
  return n;
}

/** D2 exit evidence: every old/new fixture pair matches byte for byte. */
export function judgeFixtureByteEquivalence(pairs: readonly FixturePair[]): EquivalenceJudgement {
  const refusals: D2Refusal[] = [];
  if (pairs.length === 0) refusals.push({ code: "D2_EQUIV_NO_PAIRS", detail: "an empty pair set is not equivalence evidence" });
  const seen = new Set<string>();
  for (const pair of pairs) {
    if (seen.has(pair.name)) refusals.push({ code: "D2_EQUIV_NAME_DUPLICATE", detail: `pair ${pair.name} appears twice` });
    seen.add(pair.name);
    if (pair.oldBytes === "" || pair.newBytes === "") {
      refusals.push({ code: "D2_EQUIV_BYTES_MISSING", detail: `pair ${pair.name} carries a blank side; absent bytes are not evidence` });
      continue;
    }
    if (pair.oldBytes !== pair.newBytes) {
      refusals.push({ code: "D2_EQUIV_PAIR_MISMATCH", detail: `pair ${pair.name} diverges at byte ${firstDivergenceOffset(pair.oldBytes, pair.newBytes)}` });
    }
  }
  return Object.freeze({ ok: refusals.length === 0, pairsJudged: pairs.length, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}

export type CompileFn = (manifest: PolicyGraphManifest) => PolicyGraphPlan;

export interface DeterminismWitness {
  readonly ok: boolean;
  readonly trials: number;
  readonly canonicalBytes?: string;
  readonly refusals: readonly D2Refusal[];
}

/** Repeated compiles of one manifest must canonicalize identically; the compiler is injectable so a diverging one is provable. */
export function witnessCompilerDeterminism(manifest: PolicyGraphManifest, trials: number, compile: CompileFn = compilePolicyGraph): DeterminismWitness {
  const refusals: D2Refusal[] = [];
  if (!Number.isInteger(trials) || trials < 2) {
    refusals.push({ code: "D2_DETERMINISM_TRIALS_INSUFFICIENT", detail: `determinism needs at least two trials; ${trials} given` });
    return Object.freeze({ ok: false, trials, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
  }
  const first = canonicalPlanBytes(compile(manifest));
  for (let i = 1; i < trials; i += 1) {
    const bytes = canonicalPlanBytes(compile(manifest));
    if (bytes !== first) {
      refusals.push({ code: "D2_DETERMINISM_DIVERGED", detail: `trial ${i + 1} diverges from trial 1 at byte ${firstDivergenceOffset(bytes, first)}` });
      return Object.freeze({ ok: false, trials, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
    }
  }
  return Object.freeze({ ok: true, trials, canonicalBytes: first, refusals: Object.freeze([]) });
}

export interface TraceOp {
  readonly kind: string;
  readonly subject: string;
}

export interface TraceJudgement {
  readonly ok: boolean;
  readonly opsJudged: number;
  readonly refusals: readonly D2Refusal[];
}

/** D2's trace is local and read-only: "read" is the whole lawful vocabulary. */
export function judgeReadOnlyTrace(ops: readonly TraceOp[]): TraceJudgement {
  const refusals: D2Refusal[] = [];
  for (const op of ops) {
    if (op.kind === "read") continue;
    if (op.kind === "write") refusals.push({ code: "D2_TRACE_WRITE_OBSERVED", detail: `trace wrote ${op.subject}; the D2 trace is read-only` });
    else refusals.push({ code: "D2_TRACE_KIND_UNKNOWN", detail: `trace op kind ${op.kind} on ${op.subject} is outside the read-only vocabulary` });
  }
  return Object.freeze({ ok: refusals.length === 0, opsJudged: ops.length, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}

export interface StageTwoExitInput {
  readonly determinism: DeterminismWitness;
  readonly equivalence: EquivalenceJudgement;
  readonly trace: TraceJudgement;
}

export interface StageTwoExit {
  readonly schema: "mw.stage-two-exit.v0";
  readonly ok: boolean;
  readonly refusals: readonly D2Refusal[];
}

/** The D2 exit record composes the three witnesses; any missing or failed witness refuses. */
export function recordStageTwoExit(input: StageTwoExitInput): StageTwoExit {
  const refusals: D2Refusal[] = [];
  const parts: ReadonlyArray<readonly [string, { readonly ok: boolean; readonly refusals: readonly D2Refusal[] }]> = [
    ["determinism", input.determinism],
    ["equivalence", input.equivalence],
    ["trace", input.trace],
  ];
  for (const [name, witness] of parts) {
    if (!witness.ok) {
      refusals.push({ code: "D2_EXIT_WITNESS_MISSING", detail: `witness ${name} is not green` });
      for (const r of witness.refusals) refusals.push(r);
    }
  }
  return Object.freeze({ schema: "mw.stage-two-exit.v0", ok: refusals.length === 0, refusals: Object.freeze(refusals.map((r) => Object.freeze(r))) });
}
