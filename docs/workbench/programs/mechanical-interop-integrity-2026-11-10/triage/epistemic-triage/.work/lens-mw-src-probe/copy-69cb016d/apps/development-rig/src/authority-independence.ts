/**
 * APO-022 native authorities answer independently, proven by scratch receipts
 * (02 APO-022; carried by de56.4).
 *
 * The rig's live journeys already witness Forge scratch receipts; this module carries the
 * independence judgement over ALL seamed native authorities (forge, beads, furnace, hx):
 * each must be witnessed by at least one receipt, every receipt carries nonblank ids and a
 * raw digest, and no id value is shared between two systems: a shared id would mean one
 * authority answering for another. The claim also names Reactive; the rig has NO native
 * seam for it, so Reactive is recorded as an explicit unknown, never counted witnessed and
 * never a pass.
 */

import type { NativeReceipt, NativeSystem } from "./live-observation.js";

export const AUTHORITY_SYSTEMS: readonly NativeSystem[] = Object.freeze(["forge", "beads", "furnace", "hx"]);

export const UNSEAMED_AUTHORITIES: readonly string[] = Object.freeze(["reactive"]);

export type AuthorityRefusalCode =
  | "AUTH_SYSTEM_UNKNOWN"
  | "AUTH_SYSTEM_UNWITNESSED"
  | "AUTH_IDS_BLANK"
  | "AUTH_DIGEST_BLANK"
  | "AUTH_SHARED_ID";

export interface AuthorityRefusal {
  readonly code: AuthorityRefusalCode;
  readonly detail: string;
}

export interface UnseamedRecord {
  readonly authority: string;
  readonly state: "unknown";
  readonly reason: "NO_NATIVE_SEAM";
}

/** The honest record for an authority the rig cannot witness: unknown, never passed. */
export function unseamedAuthorityRecord(authority: string): UnseamedRecord {
  return Object.freeze({ authority, state: "unknown", reason: "NO_NATIVE_SEAM" });
}

export interface AuthorityIndependence {
  readonly schema: "mw.authority-independence.v0";
  readonly ok: boolean;
  readonly witnessedBySystem: Readonly<Record<string, number>>;
  readonly unseamed: readonly UnseamedRecord[];
  readonly refusals: readonly AuthorityRefusal[];
}

const blank = (value: string): boolean => value.trim() === "";

/** Judge receipts against the APO-022 bar: every seamed authority witnessed, ids disjoint. */
export function judgeAuthorityIndependence(receipts: readonly NativeReceipt[]): AuthorityIndependence {
  const refusals: AuthorityRefusal[] = [];
  const witnessed = new Map<NativeSystem, number>(AUTHORITY_SYSTEMS.map((s) => [s, 0]));
  const idOwners = new Map<string, NativeSystem>();
  for (const receipt of receipts) {
    if (!(AUTHORITY_SYSTEMS as readonly string[]).includes(receipt.system)) {
      refusals.push({ code: "AUTH_SYSTEM_UNKNOWN", detail: `receipt system ${receipt.system} is not a seamed native authority` });
      continue;
    }
    const ids = Object.values(receipt.ids);
    if (ids.length === 0 || ids.some((v) => blank(v))) {
      refusals.push({ code: "AUTH_IDS_BLANK", detail: `a ${receipt.system} receipt carries no ids or a blank id` });
      continue;
    }
    if (blank(receipt.rawDigest)) {
      refusals.push({ code: "AUTH_DIGEST_BLANK", detail: `a ${receipt.system} receipt carries no raw digest` });
      continue;
    }
    let shared = false;
    for (const value of ids) {
      const owner = idOwners.get(value);
      if (owner !== undefined && owner !== receipt.system) {
        refusals.push({ code: "AUTH_SHARED_ID", detail: `id ${value} appears under both ${owner} and ${receipt.system}; one authority answering for another is not independence` });
        shared = true;
      }
    }
    if (shared) continue;
    for (const value of ids) idOwners.set(value, receipt.system);
    witnessed.set(receipt.system, (witnessed.get(receipt.system) ?? 0) + 1);
  }
  for (const system of AUTHORITY_SYSTEMS) {
    if ((witnessed.get(system) ?? 0) === 0) {
      refusals.push({ code: "AUTH_SYSTEM_UNWITNESSED", detail: `authority ${system} has no scratch receipt; unwitnessed is not independent` });
    }
  }
  const witnessedBySystem: Record<string, number> = {};
  for (const [system, count] of witnessed) witnessedBySystem[system] = count;
  return Object.freeze({
    schema: "mw.authority-independence.v0",
    ok: refusals.length === 0,
    witnessedBySystem: Object.freeze(witnessedBySystem),
    unseamed: Object.freeze(UNSEAMED_AUTHORITIES.map((a) => unseamedAuthorityRecord(a))),
    refusals: Object.freeze(refusals.map((r) => Object.freeze(r))),
  });
}
