/**
 * Trust zones (APO program, 04 "HLD and ownership"): learned scores, policy rewrites, training collectors and
 * simulator/verifier predictions are untrusted advisory values; protected scopes, budgets and native gate
 * requirements are exact hard checks; user-defined collector code executes only under an explicit trusted
 * process boundary. `admitUnderTrust` grounds an admission on the hard checks alone — every one present and
 * passed — and carries advisories as advisory, never as grounds: an advisory that tries to override, force,
 * admit or pass is itself a refusal, and an advisory kind posing as a hard check is a confusion of zones.
 * `collectorBoundary` refuses a collector run whose trusted process boundary is absent, untrusted, undeclared or
 * merely inferred. The collector's hard refusal of unknown support is APO-EAT-R006 (165k); this is the zone law
 * around it. Pure; nothing here evaluates a check, runs a collector or mints an identifier.
 */

export type AdvisoryKind = "learned-score" | "policy-rewrite" | "collector-output" | "predictor-output";
export type HardKind = "protected-scope" | "budget" | "native-gate";
export type TrustKind = AdvisoryKind | HardKind;
export type TrustZone = "advisory" | "hard";

export const TRUST_ZONE_OF: Readonly<Record<TrustKind, TrustZone>> = {
  "learned-score": "advisory",
  "policy-rewrite": "advisory",
  "collector-output": "advisory",
  "predictor-output": "advisory",
  "protected-scope": "hard",
  "budget": "hard",
  "native-gate": "hard",
};

const HARD_KINDS: readonly HardKind[] = ["budget", "native-gate", "protected-scope"];
const OVERRIDE_KEYS: ReadonlySet<string> = new Set(["override", "force", "admit", "passed", "admitted"]);

export interface HardCheck {
  readonly kind: HardKind;
  readonly passed: boolean;
  /** Who performed the exact check: reconcile, a native gate id, a budget ledger. */
  readonly source: string;
}

export interface AdvisoryValue {
  readonly kind: AdvisoryKind;
  readonly source: string;
  readonly value: unknown;
}

export interface TrustAdmissionInput {
  readonly subject: string;
  readonly hardChecks: readonly HardCheck[];
  readonly advisories: readonly AdvisoryValue[];
}

export type TrustRefusalCode = "TRUST_HARD_CHECK_MISSING" | "TRUST_HARD_CHECK_FAILED" | "TRUST_ADVISORY_CANNOT_OVERRIDE" | "TRUST_ZONE_CONFUSED";

export interface TrustRefusal {
  readonly code: TrustRefusalCode;
  readonly kind: string;
  readonly detail: string;
}

export interface TrustAdmission {
  readonly schema: "mw.trust-admission.v0";
  readonly subject: string;
  readonly admitted: boolean;
  /** The hard kinds the admission rests on, sorted; empty when refused. */
  readonly groundedOn: readonly HardKind[];
  /** Advisories carried as advisory; never grounds. */
  readonly advisories: readonly { readonly kind: AdvisoryKind; readonly source: string; readonly zone: "advisory" }[];
  readonly refusals: readonly TrustRefusal[];
}

function overrideKeys(value: unknown): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.keys(value as Record<string, unknown>).filter(key => OVERRIDE_KEYS.has(key)).sort();
}

const byString = (x: string, y: string): number => (x < y ? -1 : x > y ? 1 : 0);

/** Ground an admission on the exact hard checks alone; advisories never decide. Pure. */
export function admitUnderTrust(input: TrustAdmissionInput): TrustAdmission {
  const refusals: TrustRefusal[] = [];
  for (const check of input.hardChecks) {
    if (TRUST_ZONE_OF[check.kind as TrustKind] !== "hard") {
      refusals.push({ code: "TRUST_ZONE_CONFUSED", kind: String(check.kind), detail: `${String(check.kind)} is an advisory value and cannot stand among the hard checks` });
    }
  }
  const hard = input.hardChecks.filter(check => TRUST_ZONE_OF[check.kind as TrustKind] === "hard");
  for (const kind of HARD_KINDS) {
    const own = hard.filter(check => check.kind === kind);
    if (own.length === 0) {
      refusals.push({ code: "TRUST_HARD_CHECK_MISSING", kind, detail: `no ${kind} check was performed; a hard check is required, not inferred` });
    } else if (own.some(check => !check.passed)) {
      refusals.push({ code: "TRUST_HARD_CHECK_FAILED", kind, detail: `${kind} failed (${own.filter(check => !check.passed).map(check => check.source).sort(byString).join(", ")}); no advisory value can lift it` });
    }
  }
  for (const advisory of [...input.advisories].sort((x, y) => byString(x.kind, y.kind) || byString(x.source, y.source))) {
    const keys = overrideKeys(advisory.value);
    if (keys.length > 0) {
      refusals.push({ code: "TRUST_ADVISORY_CANNOT_OVERRIDE", kind: advisory.kind, detail: `advisory ${advisory.kind} from ${advisory.source} carries ${keys.join(", ")}; an advisory value cannot override a hard check` });
    }
  }
  refusals.sort((x, y) => byString(x.code, y.code) || byString(x.kind, y.kind));
  const admitted = refusals.length === 0;
  return {
    schema: "mw.trust-admission.v0",
    subject: input.subject,
    admitted,
    groundedOn: admitted ? [...HARD_KINDS] : [],
    advisories: [...input.advisories].sort((x, y) => byString(x.kind, y.kind) || byString(x.source, y.source)).map(advisory => ({ kind: advisory.kind, source: advisory.source, zone: "advisory" as const })),
    refusals,
  };
}

export interface CollectorBoundary {
  readonly kind: "process";
  readonly trusted: boolean;
  /** Who declared the boundary: the host that owns the collector sandbox. */
  readonly declaredBy: string;
  /** Set when the boundary was deduced rather than declared; an inferred boundary is no boundary. */
  readonly inferred?: boolean;
}

export interface CollectorRun {
  readonly collectorId: string;
  readonly boundary?: CollectorBoundary;
}

export type CollectorBoundaryCode = "TRUST_COLLECTOR_UNSANDBOXED" | "TRUST_COLLECTOR_BOUNDARY_INFERRED" | "TRUST_COLLECTOR_BOUNDARY_UNDECLARED";

export type CollectorBoundaryVerdict =
  | { readonly ok: true; readonly collectorId: string; readonly boundary: string }
  | { readonly ok: false; readonly collectorId: string; readonly code: CollectorBoundaryCode; readonly detail: string };

/** May this collector run? Only under an explicit, trusted, declared process boundary. Pure. */
export function collectorBoundary(run: CollectorRun): CollectorBoundaryVerdict {
  const boundary = run.boundary;
  if (boundary === undefined || !boundary.trusted) {
    return { ok: false, collectorId: run.collectorId, code: "TRUST_COLLECTOR_UNSANDBOXED", detail: `collector ${run.collectorId} declares no trusted process boundary; user-defined collector code does not run in-process` };
  }
  if (boundary.inferred === true) {
    return { ok: false, collectorId: run.collectorId, code: "TRUST_COLLECTOR_BOUNDARY_INFERRED", detail: `collector ${run.collectorId}: the process boundary was inferred, not declared; an inferred boundary is no boundary` };
  }
  if (boundary.declaredBy.length === 0) {
    return { ok: false, collectorId: run.collectorId, code: "TRUST_COLLECTOR_BOUNDARY_UNDECLARED", detail: `collector ${run.collectorId}: nobody declared the process boundary` };
  }
  return { ok: true, collectorId: run.collectorId, boundary: `${boundary.kind} by ${boundary.declaredBy}` };
}
