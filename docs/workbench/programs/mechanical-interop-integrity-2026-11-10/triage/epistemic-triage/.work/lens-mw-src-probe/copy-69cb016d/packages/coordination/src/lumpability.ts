/**
 * Lumpability-based interface discovery (APO 06; carried by b677.3).
 *
 * For a finite controlled kernel and a partition of its states, strong controlled lumpability
 * demands that states in one block assign equal mass to every (output label, successor block)
 * pair for every allowed input. Discovery starts from the mandatory observation partition,
 * computes each state's signature by (input, label, successor block, mass) and splits blocks
 * whose states disagree until the partition is stable; the stable partition induces the
 * quotient kernel. A candidate abstraction with a distinguishing trace is rejected. A learned
 * projection may PROPOSE blocks but cannot certify itself: certification requires the exact
 * refinement check and carries the model revision and intervention class. Pure and finite.
 */

export type LumpabilityRefusalCode =
  | "LUMP_STATE_UNKNOWN"
  | "LUMP_MASS_INVALID"
  | "LUMP_BLOCK_UNEQUAL_MASS"
  | "LUMP_PARTITION_NOT_COVERING"
  | "LUMP_LEARNED_SELF_CERTIFIED"
  | "LUMP_TRACE_REFUTES"
  | "LUMP_CERT_MEMBER_MISSING"
  | "LUMP_PARTITION_OVERLAP"
  | "LUMP_BLOCK_EMPTY"
  | "LUMP_MASS_NOT_NORMALIZED";

export interface KernelTransition {
  readonly from: string;
  readonly input: string;
  readonly label: string;
  readonly to: string;
  readonly mass: number;
}

export interface FiniteKernel {
  readonly states: readonly string[];
  readonly transitions: readonly KernelTransition[];
}

export type Partition = ReadonlyArray<readonly string[]>;

export interface RefinementResult {
  readonly schema: "mw.lumpability.v0";
  readonly ok: boolean;
  readonly stable: Partition;
  readonly iterations: number;
  readonly refusals: ReadonlyArray<{ readonly code: LumpabilityRefusalCode; readonly subject: string; readonly detail: string }>;
}

/** Absolute tolerance for the per-(state, input) mass total (ahh4 seat ruling V3 (a)). */
const LUMP_MASS_NORMALIZATION_TOLERANCE = 1e-9;

const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);

function blockIndexOf(partition: Partition, state: string): number {
  return partition.findIndex((block) => block.includes(state));
}

/** Signature of a state under a partition: sorted (input, label, successor block, total mass) rows. */
function signature(kernel: FiniteKernel, partition: Partition, state: string): string {
  const rows = new Map<string, number>();
  for (const t of kernel.transitions) {
    if (t.from !== state) continue;
    const key = `${t.input}|${t.label}|${blockIndexOf(partition, t.to)}`;
    rows.set(key, (rows.get(key) ?? 0) + t.mass);
  }
  return [...rows.entries()].map(([key, mass]) => `${key}=${mass}`).sort().join(";");
}

function validateKernelAndPartition(kernel: FiniteKernel, partition: Partition): Array<{ code: LumpabilityRefusalCode; subject: string; detail: string }> {
  const refusals: Array<{ code: LumpabilityRefusalCode; subject: string; detail: string }> = [];
  const states = new Set(kernel.states);
  for (const t of kernel.transitions) {
    if (!states.has(t.from) || !states.has(t.to)) refusals.push({ code: "LUMP_STATE_UNKNOWN", subject: `${t.from}->${t.to}`, detail: "a transition names a state outside the kernel" });
    if (!finite(t.mass) || t.mass <= 0) refusals.push({ code: "LUMP_MASS_INVALID", subject: `${t.from}->${t.to}`, detail: `mass ${String(t.mass)} is not a positive finite number` });
  }
  const pairTotals = new Map<string, { total: number; valid: boolean }>();
  for (const t of kernel.transitions) {
    const key = `${t.from}|${t.input}`;
    const entry = pairTotals.get(key) ?? { total: 0, valid: true };
    if (!finite(t.mass) || t.mass <= 0) entry.valid = false;
    else entry.total += t.mass;
    pairTotals.set(key, entry);
  }
  for (const [pair, { total, valid }] of pairTotals) {
    if (valid && Math.abs(total - 1) > LUMP_MASS_NORMALIZATION_TOLERANCE) {
      refusals.push({ code: "LUMP_MASS_NOT_NORMALIZED", subject: pair, detail: `transitions from ${pair.replace("|", " under input ")} total mass ${String(total)}, not 1 within ${String(LUMP_MASS_NORMALIZATION_TOLERANCE)}` });
    }
  }
  const firstBlock = new Map<string, number>();
  for (const [index, block] of partition.entries()) {
    if (block.length === 0) refusals.push({ code: "LUMP_BLOCK_EMPTY", subject: `block.${index}`, detail: `block ${index} has no members; a block is non-empty` });
    for (const member of block) {
      const earlier = firstBlock.get(member);
      if (earlier === undefined) firstBlock.set(member, index);
      else refusals.push({ code: "LUMP_PARTITION_OVERLAP", subject: member, detail: `${member} is a member of block ${earlier} and block ${index}; a partition assigns each state to exactly one block` });
    }
  }
  const covered = new Set(partition.flat());
  for (const state of kernel.states) {
    if (!covered.has(state)) refusals.push({ code: "LUMP_PARTITION_NOT_COVERING", subject: state, detail: `${state} is in no block; start from the mandatory observation partition` });
  }
  for (const member of covered) {
    if (!states.has(member)) refusals.push({ code: "LUMP_STATE_UNKNOWN", subject: member, detail: `${member} is in a block but not in the kernel` });
  }
  return refusals;
}

/** Split differing states until stable; the result is the coarsest strongly lumpable refinement of the initial partition. */
export function refinePartition(kernel: FiniteKernel, initial: Partition): RefinementResult {
  const refusals = validateKernelAndPartition(kernel, initial);
  if (refusals.length > 0) return { schema: "mw.lumpability.v0", ok: false, stable: initial, iterations: 0, refusals };
  let partition: Partition = initial.map((block) => [...block].sort());
  let iterations = 0;
  for (;;) {
    iterations += 1;
    const next: string[][] = [];
    for (const block of partition) {
      const bySignature = new Map<string, string[]>();
      for (const state of block) {
        const sig = signature(kernel, partition, state);
        bySignature.set(sig, [...(bySignature.get(sig) ?? []), state]);
      }
      next.push(...[...bySignature.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([, members]) => members));
    }
    if (next.length === partition.length) {
      return { schema: "mw.lumpability.v0", ok: true, stable: next.map((block) => Object.freeze([...block])), iterations, refusals: [] };
    }
    partition = next;
  }
}

/** Verify strong controlled lumpability of a given partition: every pair in a block agrees on mass to each (label, block). */
export function checkLumpability(kernel: FiniteKernel, partition: Partition): RefinementResult {
  const refusals = validateKernelAndPartition(kernel, partition);
  if (refusals.length === 0) {
    for (const [index, block] of partition.entries()) {
      const signatures = new Set(block.map((state) => signature(kernel, partition, state)));
      if (signatures.size > 1) {
        refusals.push({ code: "LUMP_BLOCK_UNEQUAL_MASS", subject: `block.${index}`, detail: `states ${block.join(", ")} assign unequal mass to some (label, successor block) under some input` });
      }
    }
  }
  return { schema: "mw.lumpability.v0", ok: refusals.length === 0, stable: partition, iterations: 1, refusals };
}

export interface AbstractionCandidate {
  readonly partition: Partition;
  readonly proposedBy: "learned-projection" | "exact-refinement";
  readonly modelRevision: string;
  readonly interventionClass: string;
  /** A trace that distinguishes two states the candidate lumps together, when one is known. */
  readonly distinguishingTrace?: string;
}

export type AbstractionCertificate =
  | { readonly kind: "certified"; readonly schema: "mw.abstraction-certificate.v0"; readonly blocks: number; readonly modelRevision: string; readonly interventionClass: string; readonly basis: "exact-refinement-check" }
  | { readonly kind: "refused"; readonly code: LumpabilityRefusalCode; readonly detail: string };

/** A learned projection may propose blocks but cannot certify itself; only the exact refinement check certifies, carrying revision and intervention class. */
export function certifyAbstraction(kernel: FiniteKernel, candidate: AbstractionCandidate, basis: "exact-refinement-check" | "learned-self-assessment"): AbstractionCertificate {
  if (basis === "learned-self-assessment") {
    return { kind: "refused", code: "LUMP_LEARNED_SELF_CERTIFIED", detail: "a learned projection may propose blocks but cannot certify itself; run the exact refinement check" };
  }
  if (candidate.modelRevision.trim() === "" || candidate.interventionClass.trim() === "") {
    return { kind: "refused", code: "LUMP_CERT_MEMBER_MISSING", detail: "a certificate carries the model revision and the intervention class" };
  }
  if (candidate.distinguishingTrace !== undefined && candidate.distinguishingTrace !== "") {
    return { kind: "refused", code: "LUMP_TRACE_REFUTES", detail: `a distinguishing trace refutes the candidate: ${candidate.distinguishingTrace}` };
  }
  const check = checkLumpability(kernel, candidate.partition);
  if (!check.ok) {
    const first = check.refusals[0]!;
    return { kind: "refused", code: first.code, detail: first.detail };
  }
  return { kind: "certified", schema: "mw.abstraction-certificate.v0", blocks: candidate.partition.length, modelRevision: candidate.modelRevision, interventionClass: candidate.interventionClass, basis: "exact-refinement-check" };
}
