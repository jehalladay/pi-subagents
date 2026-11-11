/**
 * The finite abstraction oracle (APO 12 D4; carried by lrzn.4).
 *
 * An in-repo pure TypeScript reference enumeration of the lane marking automaton: every lane
 * is free, reserved or busy; the modeled inputs are reserve, acquire and release per lane; a
 * disallowed input is a self-loop labeled "refused" so the kernel is total and every state's
 * allowed-input set is observable. Conservation L_free + L_reserved + L_busy = L_total holds
 * by construction and is re-checked over every transition. The oracle takes the admission
 * consumer's view — {free} versus {reserved, busy} — as the candidate abstraction and runs the
 * exact lumpability refinement (b677.3): the candidate is NOT strongly lumpable, and the
 * returned counterexample is the free/reserved/busy exit evidence D4 names (reserved and busy
 * answer the same input with different labels). Nothing here is research-owned: it is a
 * finite enumeration with tests, so the D4 gate does not block on an external owner.
 */

import { refinePartition } from "./lumpability.js";
import type { FiniteKernel, KernelTransition, Partition } from "./lumpability.js";

export const LANE_OCCUPANCIES: readonly string[] = Object.freeze(["free", "reserved", "busy"]);
export const LANE_INPUTS: readonly string[] = Object.freeze(["reserve", "acquire", "release"]);
export const ORACLE_MAX_LANES = 3;

export type OracleRefusalCode = "ORACLE_LANES_OUT_OF_RANGE" | "ORACLE_CONSERVATION_VIOLATED";

/** The single-lane step: the allowed transitions; anything else is a refused self-loop. */
function stepLane(occupancy: string, input: string): { readonly next: string; readonly label: "ok" | "refused" } {
  if (occupancy === "free" && input === "reserve") return { next: "reserved", label: "ok" };
  if (occupancy === "reserved" && input === "acquire") return { next: "busy", label: "ok" };
  if (occupancy === "reserved" && input === "release") return { next: "free", label: "ok" };
  if (occupancy === "busy" && input === "release") return { next: "free", label: "ok" };
  return { next: occupancy, label: "refused" };
}

export function encodeMarking(marking: readonly string[]): string {
  return marking.join("|");
}

export function decodeMarking(state: string): readonly string[] {
  return state.split("|");
}

export type EnumerationOutcome =
  | { readonly kind: "kernel"; readonly kernel: FiniteKernel }
  | { readonly kind: "refused"; readonly code: OracleRefusalCode; readonly detail: string };

/** Enumerate every marking of `laneCount` lanes and every per-lane input as a total deterministic kernel. */
export function enumerateLaneAutomaton(laneCount: number): EnumerationOutcome {
  if (!Number.isInteger(laneCount) || laneCount < 1 || laneCount > ORACLE_MAX_LANES) {
    return { kind: "refused", code: "ORACLE_LANES_OUT_OF_RANGE", detail: `laneCount ${String(laneCount)} is outside 1..${ORACLE_MAX_LANES}; the reference enumeration is finite by design` };
  }
  let markings: string[][] = [[]];
  for (let i = 0; i < laneCount; i++) {
    markings = markings.flatMap((m) => LANE_OCCUPANCIES.map((o) => [...m, o]));
  }
  const states = markings.map(encodeMarking);
  const transitions: KernelTransition[] = [];
  for (const marking of markings) {
    for (let lane = 0; lane < laneCount; lane++) {
      for (const input of LANE_INPUTS) {
        const step = stepLane(marking[lane]!, input);
        const next = marking.map((o, i) => (i === lane ? step.next : o));
        transitions.push({ from: encodeMarking(marking), input: `${input}:${lane}`, label: step.label, to: encodeMarking(next), mass: 1 });
      }
    }
  }
  return { kind: "kernel", kernel: { states, transitions } };
}

export interface ConservationCheck {
  readonly ok: boolean;
  readonly laneCount: number;
  readonly refusals: ReadonlyArray<{ readonly code: OracleRefusalCode; readonly subject: string; readonly detail: string }>;
}

/** L_free + L_reserved + L_busy = L_total on every state, and a transition moves at most one lane. */
export function checkConservation(kernel: FiniteKernel, laneCount: number): ConservationCheck {
  const refusals: Array<{ code: OracleRefusalCode; subject: string; detail: string }> = [];
  for (const state of kernel.states) {
    const marking = decodeMarking(state);
    const counts = LANE_OCCUPANCIES.map((o) => marking.filter((m) => m === o).length);
    const total = counts.reduce((a, b) => a + b, 0);
    if (total !== laneCount || marking.some((m) => !LANE_OCCUPANCIES.includes(m))) {
      refusals.push({ code: "ORACLE_CONSERVATION_VIOLATED", subject: state, detail: `free+reserved+busy = ${total}, total lanes ${laneCount}` });
    }
  }
  for (const t of kernel.transitions) {
    const a = decodeMarking(t.from);
    const b = decodeMarking(t.to);
    const moved = a.filter((o, i) => o !== b[i]).length;
    if (moved > 1) refusals.push({ code: "ORACLE_CONSERVATION_VIOLATED", subject: `${t.from}->${t.to}`, detail: `a single input moved ${moved} lanes` });
  }
  return { ok: refusals.length === 0, laneCount, refusals };
}

export interface AbstractionCounterexample {
  readonly states: readonly [string, string];
  readonly input: string;
  readonly labels: readonly [string, string];
}

export type OracleVerdict =
  | {
      readonly kind: "verdict";
      readonly schema: "mw.abstraction-oracle.v0";
      readonly laneCount: number;
      readonly candidate: Partition;
      readonly stable: Partition;
      readonly lumpable: boolean;
      readonly counterexample: AbstractionCounterexample | null;
    }
  | { readonly kind: "refused"; readonly code: OracleRefusalCode; readonly detail: string };

/** The admission consumer's candidate abstraction: markings with any free lane versus none. */
export function admissionCandidate(kernel: FiniteKernel): Partition {
  const available = kernel.states.filter((s) => decodeMarking(s).includes("free"));
  const unavailable = kernel.states.filter((s) => !decodeMarking(s).includes("free"));
  return [available, unavailable].filter((block) => block.length > 0);
}

/** Prefer a one-step witness whose LABELS differ (observable directly); fall back to a successor-block split under the stable partition. */
function distinguishingPair(kernel: FiniteKernel, block: readonly string[], stable: Partition): AbstractionCounterexample | null {
  const blockOf = (s: string): number => stable.findIndex((b) => b.includes(s));
  const pairs: Array<readonly [string, string]> = [];
  for (let i = 0; i < block.length; i++) {
    for (let j = i + 1; j < block.length; j++) {
      if (blockOf(block[i]!) !== blockOf(block[j]!)) pairs.push([block[i]!, block[j]!]);
    }
  }
  const stepsOf = (state: string): readonly KernelTransition[] => kernel.transitions.filter((t) => t.from === state);
  for (const byLabel of [true, false]) {
    for (const [a, b] of pairs) {
      for (const ta of stepsOf(a)) {
        const tb = stepsOf(b).find((t) => t.input === ta.input);
        if (tb === undefined) continue;
        const differs = byLabel ? ta.label !== tb.label : blockOf(ta.to) !== blockOf(tb.to);
        if (differs) return { states: [a, b], input: ta.input, labels: [ta.label, tb.label] };
      }
    }
  }
  return null;
}

/** Run the exact refinement against the admission candidate; report lumpability and the free/reserved/busy counterexample. */
export function laneAbstractionOracle(laneCount: number): OracleVerdict {
  const enumerated = enumerateLaneAutomaton(laneCount);
  if (enumerated.kind === "refused") return enumerated;
  const conservation = checkConservation(enumerated.kernel, laneCount);
  if (!conservation.ok) {
    const first = conservation.refusals[0]!;
    return { kind: "refused", code: first.code, detail: first.detail };
  }
  const candidate = admissionCandidate(enumerated.kernel);
  const refined = refinePartition(enumerated.kernel, candidate);
  const lumpable = refined.ok && refined.stable.length === candidate.length;
  let counterexample: AbstractionCounterexample | null = null;
  if (!lumpable) {
    for (const block of candidate) {
      counterexample = distinguishingPair(enumerated.kernel, block, refined.stable);
      if (counterexample !== null) break;
    }
  }
  return { kind: "verdict", schema: "mw.abstraction-oracle.v0", laneCount, candidate, stable: refined.stable, lumpable, counterexample };
}
