/**
 * Composition-time validation that every effect carries its own independent permission (CAC-WC program, 01
 * "Workflow Contract Design and Validation", claim compose-validate-independent-effect-permissions). The unit
 * of permission is one step's one write scope: a record names exactly one intent id and exactly one scope, and
 * covers exactly that pair. A permission on another step for the same scope does not transfer; a blanket or
 * composite record (a wildcard or empty step or scope) is refused as not independent and covers nothing; and no
 * permission admits a protected scope — the refusal here is the composition-time face of the resolver's
 * `INTENT_SCOPE_PROTECTED` (CACWC-EAT-R007: no selection policy, learned or declared, bypasses MW's
 * protected-scope refusal). The result is a validation record, never an authorization: `authority` stays
 * `propose-only`, admission remains with `reconcile` and whatever native per-effect gate executes the effect
 * (none is witnessed at HEAD), and nothing here mints an identifier. Read scopes are observations, not effects,
 * so they need no permission. Per docs/11 D-01 this is an ordinary pure function over existing records.
 */
import type { StepContract } from "./step-contract.js";

/** One permission for one step's one write scope. Identity is the caller's; nothing here mints an id. */
export interface EffectPermission {
  readonly permissionId: string;
  readonly intentId: string;
  readonly scope: string;
}

export type EffectPermissionRefusalCode =
  | "EFFECT_PERMISSION_ABSENT"
  | "EFFECT_PERMISSION_NOT_INDEPENDENT"
  | "EFFECT_SCOPE_PROTECTED";

/** A refusal names the step and scope it concerns; a consumer branches on the code, never on the detail text. */
export interface EffectPermissionRefusal {
  readonly code: EffectPermissionRefusalCode;
  readonly intentId: string;
  readonly scope: string;
  readonly detail: string;
}

export interface EffectPermissionCoverage {
  readonly intentId: string;
  readonly scope: string;
  readonly permissionId: string;
}

export interface EffectPermissionValidationInput {
  readonly steps: readonly StepContract[];
  readonly permissions: readonly EffectPermission[];
  /** Write scopes no policy effect may touch; a permission naming one is void. */
  readonly protectedScopes: readonly string[];
}

export interface EffectPermissionValidation {
  readonly schema: "mw.effect-permission-validation.v0";
  readonly ok: boolean;
  /** A validation never authorizes an effect; the steps stay propose-only. */
  readonly authority: "propose-only";
  readonly covered: readonly EffectPermissionCoverage[];
  readonly refusals: readonly EffectPermissionRefusal[];
}

const WILDCARD = "*";

function independent(permission: EffectPermission): boolean {
  return permission.intentId.length > 0 && permission.scope.length > 0 && permission.intentId !== WILDCARD && permission.scope !== WILDCARD;
}

function compareStrings(a: readonly string[], b: readonly string[]): number {
  for (let index = 0; index < a.length; index += 1) {
    if (a[index]! < b[index]!) return -1;
    if (a[index]! > b[index]!) return 1;
  }
  return 0;
}

/** Validate that each write effect of each step carries its own permission. Pure; never authorizes anything. */
export function validateEffectPermissions(input: EffectPermissionValidationInput): EffectPermissionValidation {
  const refusals: EffectPermissionRefusal[] = [];
  const covered: EffectPermissionCoverage[] = [];
  const usable: EffectPermission[] = [];
  for (const permission of input.permissions) {
    if (independent(permission)) {
      usable.push(permission);
    } else {
      refusals.push({
        code: "EFFECT_PERMISSION_NOT_INDEPENDENT",
        intentId: permission.intentId,
        scope: permission.scope,
        detail: `permission ${permission.permissionId} names step ${JSON.stringify(permission.intentId)} and scope ${JSON.stringify(permission.scope)}; a permission covers exactly one step's one effect scope and covers nothing otherwise`,
      });
    }
  }
  for (const step of input.steps) {
    const intentId = step.step.intentId;
    for (const scope of [...new Set(step.effectScope.write)].sort()) {
      const naming = usable.filter(permission => permission.scope === scope);
      if (input.protectedScopes.includes(scope)) {
        const voided = naming.filter(permission => permission.intentId === intentId).map(permission => permission.permissionId).sort();
        refusals.push({
          code: "EFFECT_SCOPE_PROTECTED",
          intentId,
          scope,
          detail: `step ${intentId} writes protected scope ${scope}; no permission admits a protected scope${voided.length > 0 ? ` (permission ${voided.join(", ")} is void)` : ""}`,
        });
        continue;
      }
      const own = naming.filter(permission => permission.intentId === intentId).map(permission => permission.permissionId).sort();
      if (own.length > 0) {
        covered.push({ intentId, scope, permissionId: own[0]! });
        continue;
      }
      const foreign = naming.map(permission => `${permission.permissionId} covers step ${permission.intentId} only`).sort();
      refusals.push({
        code: "EFFECT_PERMISSION_ABSENT",
        intentId,
        scope,
        detail: `no permission names step ${intentId} writing ${scope}${foreign.length > 0 ? `; ${foreign.join(", ")} and does not transfer` : ""}`,
      });
    }
  }
  covered.sort((x, y) => compareStrings([x.intentId, x.scope, x.permissionId], [y.intentId, y.scope, y.permissionId]));
  refusals.sort((x, y) => compareStrings([x.code, x.intentId, x.scope, x.detail], [y.code, y.intentId, y.scope, y.detail]));
  return { schema: "mw.effect-permission-validation.v0", ok: refusals.length === 0, authority: "propose-only", covered, refusals };
}
