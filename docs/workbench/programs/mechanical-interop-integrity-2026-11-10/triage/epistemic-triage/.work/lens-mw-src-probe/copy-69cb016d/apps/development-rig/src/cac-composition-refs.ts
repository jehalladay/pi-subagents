/**
 * P1 reference checker for the design-only `CACWorkflowCompositionV0` concept (CACWC-EAT-R011,
 * MechanicalWorkflows-8h41, re-derived at head by 8h41.1 at the rig edge, never imported by packages/development or packages/coordination (CACWC-EAT-R016); docs/programs/cac-workflow-composition-2026-10-18/01-composition-contracts.md).
 * A composition record may POINT to identifiers that already exist in a native namespace (Beads issue,
 * Forge operation or gate, Furnace attempt, Git commit, HyperUnix queryDigest) and may never MINT one.
 * The caller supplies the roster of identifiers it already holds; the checker is pure, performs no
 * lookup against bd, Forge, Furnace, Git or hx, and never fetches the roster. Membership in the roster is
 * the only evidence of existence this function claims: it does not say the identifier is current, ready or
 * passing, and an accepted record is a reference check, not a bridge certificate for the composition.
 */

export type NativeNamespace = "beads" | "forgeOperations" | "furnaceAttempts" | "gitCommits" | "hxQueryDigests";

export const NATIVE_NAMESPACES: readonly NativeNamespace[] = ["beads", "forgeOperations", "furnaceAttempts", "gitCommits", "hxQueryDigests"];

/** One field value: a single identifier or a list of them. */
export type RefValue = string | readonly string[];

export type CompositionRefs = { readonly [namespace: string]: RefValue | undefined };

export interface CompositionRecord {
  readonly refs: CompositionRefs;
}

/** Identifiers the caller already holds, per namespace. A missing namespace holds none. */
export type NativeRoster = { readonly [K in NativeNamespace]?: readonly string[] };

export type CompositionRefusalCode = "CAC_REF_UNKNOWN_NATIVE_ID" | "CAC_REF_NAMESPACE_UNKNOWN" | "CAC_REF_MALFORMED";

export interface CompositionRefusal {
  readonly code: CompositionRefusalCode;
  readonly field: string;
  readonly value: string | null;
}

export type CompositionCheck =
  | { readonly ok: true; readonly refs: { readonly [K in NativeNamespace]?: readonly string[] } }
  | { readonly ok: false; readonly refusals: readonly CompositionRefusal[] };

function isNamespace(field: string): field is NativeNamespace {
  return (NATIVE_NAMESPACES as readonly string[]).includes(field);
}

function valuesOf(value: unknown): readonly unknown[] {
  return Array.isArray(value) ? (value as readonly unknown[]) : [value];
}

/**
 * Accept a record only when every reference resolves to an identifier in the caller roster, and refuse
 * every other reference with a typed code: CAC_REF_UNKNOWN_NATIVE_ID for an identifier absent from the
 * roster (including one the record minted), CAC_REF_NAMESPACE_UNKNOWN for a field outside the five native
 * namespaces, CAC_REF_MALFORMED for a value that is not a non-blank string. All refusals are collected.
 */
export function checkComposition(record: CompositionRecord, roster: NativeRoster): CompositionCheck {
  const refusals: CompositionRefusal[] = [];
  const accepted: { [K in NativeNamespace]?: readonly string[] } = {};
  for (const field of Object.keys(record.refs).sort()) {
    const raw = record.refs[field];
    if (raw === undefined) continue;
    if (!isNamespace(field)) {
      refusals.push({ code: "CAC_REF_NAMESPACE_UNKNOWN", field, value: null });
      continue;
    }
    const known = new Set(roster[field] ?? []);
    const kept: string[] = [];
    for (const value of valuesOf(raw)) {
      if (typeof value !== "string" || value.trim().length === 0) {
        refusals.push({ code: "CAC_REF_MALFORMED", field, value: typeof value === "string" ? value : null });
      } else if (!known.has(value)) {
        refusals.push({ code: "CAC_REF_UNKNOWN_NATIVE_ID", field, value });
      } else {
        kept.push(value);
      }
    }
    accepted[field] = kept;
  }
  return refusals.length === 0 ? { ok: true, refs: accepted } : { ok: false, refusals };
}
