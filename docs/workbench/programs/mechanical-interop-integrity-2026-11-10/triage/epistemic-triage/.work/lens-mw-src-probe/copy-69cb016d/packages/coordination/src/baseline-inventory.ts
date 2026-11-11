/**
 * The D0 baseline inventory (APO 12 D0; carried by lrzn.1).
 *
 * D1, D2 and D3 all depend on one pinned baseline: the owner/source inventory the program was
 * derived from (15, pinned at 19ca8d48), the exact set of episode-exported MW fixture
 * environments, and the consumed subset of the installed MicroPolicy decision-receipt API.
 * `D0_BASELINE` is that pin as a frozen record; `checkBaselineInventory` holds an observed
 * inventory against it and refuses drift in EITHER direction — a missing pinned source, an added
 * or renamed fixture environment, a dropped or added receipt field — so the negative tests the
 * D0 row names are real refusals, not documentation. Pure; nothing here reads a repository.
 */

export const D0_PROGRAM_PIN = "19ca8d48";

export const D0_BASELINE = Object.freeze({
  schema: "mw.d0-baseline.v0" as const,
  programPin: D0_PROGRAM_PIN,
  sourceInventory: Object.freeze([
    "packages/coordination/src/contracts.ts",
    "packages/coordination/src/combinators.ts",
    "packages/coordination/src/resolver.ts",
    "packages/coordination/src/episode.ts",
    "packages/coordination/src/training-export.ts",
    "packages/coordination/src/elastic-landing.ts",
  ] as const),
  neighborOwners: Object.freeze(["MicroPolicyCli", "ReactiveQuerySDK", "FiberOpticsResearch"] as const),
  fixtureEnvironments: Object.freeze(["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence"] as const),
  receiptSchema: "micropolicy.decision-receipt.v1" as const,
  receiptFields: Object.freeze({
    receipt: Object.freeze(["schema", "decisionId", "backend", "programDigest", "checkpointDigest", "selection"] as const),
    selection: Object.freeze(["choices", "action", "rng", "probability", "logProbability"] as const),
    choice: Object.freeze(["action", "eligible", "probability"] as const),
    rng: Object.freeze(["algorithm", "seed", "draw"] as const),
  }),
});

export type BaselineRefusalCode =
  | "BASELINE_SOURCE_MISSING"
  | "BASELINE_ENVIRONMENT_DRIFT"
  | "BASELINE_RECEIPT_SCHEMA_DRIFT"
  | "BASELINE_RECEIPT_FIELD_DRIFT";

export interface ObservedInventory {
  /** Source paths present in the repository, relative to its root. */
  readonly sourcePaths: readonly string[];
  readonly fixtureEnvironments: readonly string[];
  readonly receiptSchema: string;
  readonly receiptFields: {
    readonly receipt: readonly string[];
    readonly selection: readonly string[];
    readonly choice: readonly string[];
    readonly rng: readonly string[];
  };
}

export interface BaselineCheck {
  readonly schema: "mw.d0-baseline-check.v0";
  readonly programPin: string;
  readonly ok: boolean;
  readonly refusals: ReadonlyArray<{ readonly code: BaselineRefusalCode; readonly subject: string; readonly detail: string }>;
}

function setDrift(pinned: readonly string[], observed: readonly string[]): { readonly missing: string[]; readonly added: string[] } {
  const p = new Set(pinned);
  const o = new Set(observed);
  return { missing: pinned.filter((x) => !o.has(x)), added: observed.filter((x) => !p.has(x)) };
}

/** Hold an observed inventory against the pin; drift in either direction refuses. */
export function checkBaselineInventory(observed: ObservedInventory): BaselineCheck {
  const refusals: Array<{ code: BaselineRefusalCode; subject: string; detail: string }> = [];
  const present = new Set(observed.sourcePaths);
  for (const path of D0_BASELINE.sourceInventory) {
    if (!present.has(path)) refusals.push({ code: "BASELINE_SOURCE_MISSING", subject: path, detail: `pinned source ${path} is absent from the observed inventory` });
  }
  const envDrift = setDrift(D0_BASELINE.fixtureEnvironments, observed.fixtureEnvironments);
  for (const env of envDrift.missing) refusals.push({ code: "BASELINE_ENVIRONMENT_DRIFT", subject: env, detail: `pinned fixture environment ${env} is missing` });
  for (const env of envDrift.added) refusals.push({ code: "BASELINE_ENVIRONMENT_DRIFT", subject: env, detail: `fixture environment ${env} is not in the D0 pin; an addition is drift until the baseline is re-pinned` });
  if (observed.receiptSchema !== D0_BASELINE.receiptSchema) {
    refusals.push({ code: "BASELINE_RECEIPT_SCHEMA_DRIFT", subject: observed.receiptSchema, detail: `receipt schema ${observed.receiptSchema} is not the pinned ${D0_BASELINE.receiptSchema}` });
  }
  for (const group of ["receipt", "selection", "choice", "rng"] as const) {
    const drift = setDrift(D0_BASELINE.receiptFields[group], observed.receiptFields[group]);
    for (const f of drift.missing) refusals.push({ code: "BASELINE_RECEIPT_FIELD_DRIFT", subject: `${group}.${f}`, detail: `pinned receipt field ${group}.${f} is missing from the installed API` });
    for (const f of drift.added) refusals.push({ code: "BASELINE_RECEIPT_FIELD_DRIFT", subject: `${group}.${f}`, detail: `receipt field ${group}.${f} is not in the D0 pin; an addition is drift until re-pinned` });
  }
  return { schema: "mw.d0-baseline-check.v0", programPin: D0_BASELINE.programPin, ok: refusals.length === 0, refusals };
}
