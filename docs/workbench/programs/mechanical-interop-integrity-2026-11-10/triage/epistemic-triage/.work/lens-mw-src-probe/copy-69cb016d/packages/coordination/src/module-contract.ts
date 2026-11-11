/**
 * Per-module declared resource, evidence and timing contract (APO program, 02 requirement row APO-018, which
 * stays a TARGET row; docs/programs/adaptive-policy-organizations-2026-10-18, 06 subsystem interfaces and
 * 09 resource/evidence control). A contract is a declaration: the maximum demand a module claims, the source
 * revisions and coverage it requires, its timing bounds, its proposed effect classes and the exclusive tokens it
 * holds. The functions here validate the declaration and compare declared demand with a declared global budget;
 * they never observe a runtime and never infer true capacity from a declaration, so every result carries the
 * grade `declared`. The resource envelope reuses the four `Budget` dimensions of `contracts.ts` by import.
 * Ports, private state abstraction, query family and certificate identity are other slices and do not appear
 * here; the resolver, combinators and policy graph are untouched.
 */
import type { Budget } from "./contracts.js";

export interface ModuleContractEvidence {
  readonly requiredSourceRevisions: readonly string[];
  readonly requiredCoverageRefs: readonly string[];
}

export interface ModuleContractTiming {
  readonly maxLatencyMs: number;
  readonly maxStepsPerEpisode: number;
}

export interface ModuleContract {
  readonly moduleId: string;
  readonly revision: string;
  /** Declared maximum demand per dimension. */
  readonly resourceEnvelope: Budget;
  readonly evidence: ModuleContractEvidence;
  readonly timing: ModuleContractTiming;
  readonly effectClasses: readonly string[];
  /** Tokens naming a resource at most one module in a set may hold. */
  readonly exclusive: readonly string[];
}

export type ModuleContractRefusalCode =
  | "MODULE_CONTRACT_MALFORMED"
  | "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED"
  | "MODULE_CONTRACT_EXCLUSION_CONFLICT";

/** The grade of every result: a declaration was compared, nothing was measured or proven. */
export type ModuleContractGrade = "declared";

export type ModuleContractValidation =
  | { readonly ok: true; readonly grade: ModuleContractGrade; readonly contract: ModuleContract }
  | { readonly ok: false; readonly grade: ModuleContractGrade; readonly code: "MODULE_CONTRACT_MALFORMED"; readonly detail: string };

export interface ModuleContractExceededDimension {
  readonly dimension: keyof Budget;
  readonly sum: number;
  readonly budget: number;
}

export type ModuleContractCapacityResult =
  | { readonly ok: true; readonly grade: ModuleContractGrade; readonly sums: Budget; readonly headroom: Budget }
  | { readonly ok: false; readonly grade: ModuleContractGrade; readonly code: "MODULE_CONTRACT_MALFORMED"; readonly detail: string }
  | {
      readonly ok: false;
      readonly grade: ModuleContractGrade;
      readonly code: "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED";
      readonly detail: string;
      readonly exceeded: readonly ModuleContractExceededDimension[];
      /** Modules with a nonzero declared demand in an exceeded dimension, in input order. */
      readonly moduleIds: readonly string[];
    };

export type ModuleContractExclusionResult =
  | { readonly ok: true; readonly grade: ModuleContractGrade }
  | { readonly ok: false; readonly grade: ModuleContractGrade; readonly code: "MODULE_CONTRACT_MALFORMED"; readonly detail: string }
  | {
      readonly ok: false;
      readonly grade: ModuleContractGrade;
      readonly code: "MODULE_CONTRACT_EXCLUSION_CONFLICT";
      readonly detail: string;
      readonly token: string;
      /** Every holder of the token, sorted, so reversing the input names the same ids. */
      readonly moduleIds: readonly string[];
    };

const DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;
const TOP_FIELDS = ["moduleId", "revision", "resourceEnvelope", "evidence", "timing", "effectClasses", "exclusive"] as const;
const EVIDENCE_FIELDS = ["requiredSourceRevisions", "requiredCoverageRefs"] as const;
const TIMING_FIELDS = ["maxLatencyMs", "maxStepsPerEpisode"] as const;

const GRADE: ModuleContractGrade = "declared";

type Fail = { readonly detail: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function fail(detail: string): Fail {
  return { detail };
}

function nonBlank(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function unknownFields(record: Record<string, unknown>, allowed: readonly string[], prefix: string): Fail | undefined {
  for (const key of Object.keys(record)) {
    if (!allowed.includes(key)) return fail(`${prefix}${key}: unknown field`);
  }
  return undefined;
}

function readBudget(value: unknown, prefix: string): Budget | Fail {
  if (!isRecord(value)) return fail(`${prefix.slice(0, -1)}: must be an object`);
  const unknown = unknownFields(value, DIMENSIONS, prefix);
  if (unknown) return unknown;
  const out: Record<string, number> = {};
  for (const dimension of DIMENSIONS) {
    const entry = value[dimension];
    if (typeof entry !== "number" || !Number.isFinite(entry) || entry < 0) return fail(`${prefix}${dimension}: must be a finite non-negative number`);
    out[dimension] = entry;
  }
  return Object.freeze({ compute: out.compute!, workers: out.workers!, queue: out.queue!, latencyMs: out.latencyMs! });
}

function readList(value: unknown, field: string, distinct: boolean): readonly string[] | Fail {
  if (!Array.isArray(value)) return fail(`${field}: must be an array of strings`);
  const seen = new Set<string>();
  for (const entry of value) {
    if (!nonBlank(entry)) return fail(`${field}: every entry must be a non-blank string`);
    if (distinct && seen.has(entry)) return fail(`${field}: duplicate entry ${entry}`);
    seen.add(entry);
  }
  return Object.freeze([...(value as string[])]);
}

function isFail(value: unknown): value is Fail {
  return isRecord(value) && Object.keys(value).length === 1 && typeof value.detail === "string";
}

/**
 * Validate one declared contract. Nothing is coerced or defaulted; the returned contract is deeply frozen. The
 * validator refuses on the first failure, so the order of its checks is law: shape and unknown fields, moduleId,
 * revision, resourceEnvelope, evidence, timing, then effectClasses before exclusive. A contract with both effect
 * lists malformed is refused with the effectClasses detail alone.
 */
export function validateModuleContract(input: unknown): ModuleContractValidation {
  const malformed = (detail: string): ModuleContractValidation => ({ ok: false, grade: GRADE, code: "MODULE_CONTRACT_MALFORMED", detail });
  if (!isRecord(input)) return malformed("contract: must be an object");
  const unknownTop = unknownFields(input, TOP_FIELDS, "");
  if (unknownTop) return malformed(unknownTop.detail);
  if (!nonBlank(input.moduleId)) return malformed("moduleId: must be a non-blank string");
  if (!nonBlank(input.revision)) return malformed("revision: must be a non-blank string");
  const envelope = readBudget(input.resourceEnvelope, "resourceEnvelope.");
  if (isFail(envelope)) return malformed(envelope.detail);

  const evidenceRaw = input.evidence;
  if (!isRecord(evidenceRaw)) return malformed("evidence: must be an object");
  const unknownEvidence = unknownFields(evidenceRaw, EVIDENCE_FIELDS, "evidence.");
  if (unknownEvidence) return malformed(unknownEvidence.detail);
  const revisions = readList(evidenceRaw.requiredSourceRevisions, "evidence.requiredSourceRevisions", true);
  if (isFail(revisions)) return malformed(revisions.detail);
  const coverage = readList(evidenceRaw.requiredCoverageRefs, "evidence.requiredCoverageRefs", true);
  if (isFail(coverage)) return malformed(coverage.detail);

  const timingRaw = input.timing;
  if (!isRecord(timingRaw)) return malformed("timing: must be an object");
  const unknownTiming = unknownFields(timingRaw, TIMING_FIELDS, "timing.");
  if (unknownTiming) return malformed(unknownTiming.detail);
  for (const field of TIMING_FIELDS) {
    const entry = timingRaw[field];
    if (typeof entry !== "number" || !Number.isSafeInteger(entry) || entry <= 0) return malformed(`timing.${field}: must be a positive finite integer`);
  }

  const effectClasses = readList(input.effectClasses, "effectClasses", true);
  if (isFail(effectClasses)) return malformed(effectClasses.detail);
  const exclusive = readList(input.exclusive, "exclusive", true);
  if (isFail(exclusive)) return malformed(exclusive.detail);

  const contract: ModuleContract = Object.freeze({
    moduleId: input.moduleId,
    revision: input.revision,
    resourceEnvelope: envelope,
    evidence: Object.freeze({ requiredSourceRevisions: revisions, requiredCoverageRefs: coverage }),
    timing: Object.freeze({ maxLatencyMs: timingRaw.maxLatencyMs as number, maxStepsPerEpisode: timingRaw.maxStepsPerEpisode as number }),
    effectClasses,
    exclusive,
  });
  return { ok: true, grade: GRADE, contract };
}

/** Validate every member and refuse a repeated moduleId, before any comparison runs. */
function validateSet(contracts: readonly unknown[]): readonly ModuleContract[] | Fail {
  const valid: ModuleContract[] = [];
  const seen = new Set<string>();
  for (const [index, member] of contracts.entries()) {
    const checked = validateModuleContract(member);
    if (!checked.ok) return fail(`contracts[${index}].${checked.detail}`);
    if (seen.has(checked.contract.moduleId)) return fail(`moduleId: duplicate moduleId ${checked.contract.moduleId}`);
    seen.add(checked.contract.moduleId);
    valid.push(checked.contract);
  }
  return valid;
}

/**
 * Compare the sum of declared envelopes with a declared global budget, per dimension. A sum equal to the budget is
 * admitted; a sum above it in any dimension is refused. This compares declarations only: it proves nothing about
 * what a module will actually use.
 */
export function checkGlobalCapacity(contracts: readonly ModuleContract[], globalBudget: Budget): ModuleContractCapacityResult {
  const malformed = (detail: string): ModuleContractCapacityResult => ({ ok: false, grade: GRADE, code: "MODULE_CONTRACT_MALFORMED", detail });
  const budget = readBudget(globalBudget, "globalBudget.");
  if (isFail(budget)) return malformed(budget.detail);
  const set = validateSet(contracts);
  if (isFail(set)) return malformed(set.detail);

  const sums: Record<string, number> = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
  for (const member of set) {
    for (const dimension of DIMENSIONS) sums[dimension] = sums[dimension]! + member.resourceEnvelope[dimension];
  }
  const exceeded: ModuleContractExceededDimension[] = [];
  for (const dimension of DIMENSIONS) {
    if (sums[dimension]! > budget[dimension]) exceeded.push({ dimension, sum: sums[dimension]!, budget: budget[dimension] });
  }
  if (exceeded.length > 0) {
    const moduleIds = set.filter((member) => exceeded.some((entry) => member.resourceEnvelope[entry.dimension] > 0)).map((member) => member.moduleId);
    const parts = exceeded.map((entry) => `${entry.dimension} declared sum ${entry.sum} exceeds budget ${entry.budget}`);
    return {
      ok: false,
      grade: GRADE,
      code: "MODULE_CONTRACT_GLOBAL_CAPACITY_EXCEEDED",
      detail: `${parts.join("; ")} (modules: ${moduleIds.join(", ")})`,
      exceeded: Object.freeze(exceeded),
      moduleIds: Object.freeze(moduleIds),
    };
  }
  const total = { compute: sums.compute!, workers: sums.workers!, queue: sums.queue!, latencyMs: sums.latencyMs! };
  const headroom = {
    compute: budget.compute - total.compute,
    workers: budget.workers - total.workers,
    queue: budget.queue - total.queue,
    latencyMs: budget.latencyMs - total.latencyMs,
  };
  return { ok: true, grade: GRADE, sums: Object.freeze(total), headroom: Object.freeze(headroom) };
}

/** Refuse a set in which two modules name the same exclusive token. Pure and independent of input order. */
export function checkModuleExclusion(contracts: readonly ModuleContract[]): ModuleContractExclusionResult {
  const set = validateSet(contracts);
  if (isFail(set)) return { ok: false, grade: GRADE, code: "MODULE_CONTRACT_MALFORMED", detail: set.detail };
  const holders = new Map<string, string[]>();
  for (const member of set) {
    for (const token of member.exclusive) holders.set(token, [...(holders.get(token) ?? []), member.moduleId]);
  }
  const clashing = [...holders.entries()].filter(([, ids]) => ids.length > 1).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  if (clashing.length === 0) return { ok: true, grade: GRADE };
  const [token, ids] = clashing[0]!;
  const moduleIds = [...ids].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  return {
    ok: false,
    grade: GRADE,
    code: "MODULE_CONTRACT_EXCLUSION_CONFLICT",
    detail: `exclusive token ${token} is declared by ${moduleIds.join(", ")}`,
    token,
    moduleIds: Object.freeze(moduleIds),
  };
}
