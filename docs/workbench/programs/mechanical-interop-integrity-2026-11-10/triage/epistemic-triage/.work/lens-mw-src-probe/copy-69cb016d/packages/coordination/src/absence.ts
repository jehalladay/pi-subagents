/**
 * Absence is not evidence of absence (APO program, 06 "Subsystem interfaces", claim absence-unknown-witnesses). A
 * zero-match observation stays the explicit unknown unless the observation process declares a completeness witness
 * with the power to detect what was absent: an enumeration whose scope covers every queried domain, taken at the
 * same source generation the query ran against. Coverage and freshness are distinct, so a complete witness from
 * another generation certifies nothing here. The queried domains are dependencies even when no row matched, so
 * every classification records them. A zero-match query that names no domain certifies nothing: a witness over
 * zero domains detects nothing, so it stays unknown. An interface rewrite that changes a depended-on domain
 * invalidates an absence certificate (`affectedByScopeChange`). Nothing here queries anything or mints an
 * identifier; per docs/11 D-01 it is an ordinary pure function over records the caller already holds.
 */
import type { Maybe } from "./episode.js";
import { UNKNOWN } from "./episode.js";

/** The observation process's declaration that it enumerated these domains at this generation. */
export interface CompletenessWitness {
  readonly witnessId: string;
  readonly scope: readonly string[];
  readonly generation: string;
  /** Rows the enumeration saw; zero is a legitimate, fully enumerated empty population. */
  readonly population: number;
}

export interface NegativeObservation {
  readonly queryId: string;
  /** The domains the query depended on, matched or not. */
  readonly domains: readonly string[];
  /** The source generation the query ran against. */
  readonly generation: string;
  readonly matches: number;
  readonly witness?: CompletenessWitness;
}

export type AbsenceGapCode = "ABSENCE_QUERY_DOMAINS_EMPTY" | "ABSENCE_WITNESS_MISSING" | "ABSENCE_WITNESS_SCOPE_GAP" | "ABSENCE_WITNESS_GENERATION_MISMATCH";

export interface AbsenceGap {
  readonly code: AbsenceGapCode;
  readonly detail: string;
}

export type AbsenceStatus = "present" | "absent" | typeof UNKNOWN;

export interface AbsenceClassification {
  readonly schema: "mw.absence-classification.v0";
  readonly queryId: string;
  readonly status: AbsenceStatus;
  readonly matches: number;
  /** Sorted, deduplicated domains the query depended on; recorded whatever the status. */
  readonly dependsOn: readonly string[];
  /** The witness id when one was declared, sufficient or not; the explicit unknown otherwise. */
  readonly witness: Maybe<string>;
  /** Why a zero-match observation is not an absence; empty for present and absent. */
  readonly gaps: readonly AbsenceGap[];
}

function sortedUnique(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}

/** Classify one observation: present, absent (witnessed) or the explicit unknown. Pure. */
export function classifyAbsence(observation: NegativeObservation): AbsenceClassification {
  if (!Number.isInteger(observation.matches) || observation.matches < 0) {
    throw new Error(`ABSENCE_MATCHES_INVALID: query ${observation.queryId} reports ${String(observation.matches)} matches; a match count is a non-negative integer`);
  }
  const witness = observation.witness;
  if (witness !== undefined && (!Number.isInteger(witness.population) || witness.population < 0)) {
    throw new Error(`ABSENCE_WITNESS_POPULATION_INVALID: witness ${witness.witnessId} reports population ${String(witness.population)}; an enumeration counts a non-negative integer of rows`);
  }
  const dependsOn = sortedUnique(observation.domains);
  const base = { schema: "mw.absence-classification.v0" as const, queryId: observation.queryId, matches: observation.matches, dependsOn, witness: witness?.witnessId ?? UNKNOWN };
  if (observation.matches > 0) return { ...base, status: "present", gaps: [] };
  const gaps: AbsenceGap[] = [];
  if (dependsOn.length === 0) {
    gaps.push({ code: "ABSENCE_QUERY_DOMAINS_EMPTY", detail: `query ${observation.queryId} names no domain; a witness over zero domains has no power to detect anything and such a certificate could never be invalidated` });
  }
  if (witness === undefined) {
    gaps.push({ code: "ABSENCE_WITNESS_MISSING", detail: `query ${observation.queryId} matched nothing and no completeness witness was declared; absence of evidence stays unknown` });
    return { ...base, status: UNKNOWN, gaps };
  }
  if (witness.generation !== observation.generation) {
    gaps.push({ code: "ABSENCE_WITNESS_GENERATION_MISMATCH", detail: `witness ${witness.witnessId} enumerated generation ${witness.generation}, the query ran against ${observation.generation}; coverage and freshness are distinct` });
  }
  const covered = new Set(witness.scope);
  const uncovered = dependsOn.filter(domain => !covered.has(domain));
  if (uncovered.length > 0) {
    gaps.push({ code: "ABSENCE_WITNESS_SCOPE_GAP", detail: uncovered.join(", ") });
  }
  gaps.sort((x, y) => (x.code < y.code ? -1 : x.code > y.code ? 1 : 0));
  return gaps.length === 0 ? { ...base, status: "absent", gaps } : { ...base, status: UNKNOWN, gaps };
}

/** An interface rewrite changing any depended-on domain invalidates an absence certificate; there is nothing to invalidate otherwise. */
export function affectedByScopeChange(classification: AbsenceClassification, changedDomains: readonly string[]): boolean {
  if (classification.status !== "absent") return false;
  const changed = new Set(changedDomains);
  return classification.dependsOn.some(domain => changed.has(domain));
}
