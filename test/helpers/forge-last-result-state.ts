/**
 * The measured Forge gate.status package row that publishes last_result_state: SOURCE_WITH_STATE's one package row in
 * test/workbench-forge-contract.test.ts (wb-4ap.11, COLLECTIVE-ADAPTATION-R11 present-branch, measured on the installed
 * forge 0.2.1 rev 909bee0e2df8). The row is parsed from that file's text, so every collective-adaptation case
 * (wb-4ap.2-.6, .8, .9) pins the real wire shape - a freshness from the closed four-word set, a digest-shaped derived_from
 * and the v2 invalidation-basis kind - and follows the fixture if it is ever re-measured. Every malformed or planted variant
 * is a mutation of this row, never a hand-rolled descriptor.
 */
import { readFileSync } from "node:fs";
import type { JsonValue } from "../../src/workbench/capability-registry.js";

export type JsonRecord = { [key: string]: JsonValue };

const CONTRACT_TEST = new URL("../workbench-forge-contract.test.ts", import.meta.url);
/** SOURCE_WITH_STATE spreads its one row as `{...( <row> as Record<string,unknown>)}`; the row itself is one JSON object. */
const SPREAD_ROW = /\{\.\.\.\(\s*(\{.*\})\s*as Record<string,\s*unknown>\)\}/;

const isRecord = (value: unknown): value is JsonRecord => value !== null && typeof value === "object" && !Array.isArray(value);

function measuredRow(): JsonRecord {
  const text = readFileSync(CONTRACT_TEST, "utf8");
  const declaration = text.indexOf("const SOURCE_WITH_STATE=");
  const row = declaration < 0 ? undefined : SPREAD_ROW.exec(text.slice(declaration))?.[1];
  if (row === undefined) throw new Error("SOURCE_WITH_STATE's package row was not found in test/workbench-forge-contract.test.ts");
  const parsed: unknown = JSON.parse(row);
  if (!isRecord(parsed)) throw new Error("SOURCE_WITH_STATE's package row is not a JSON object");
  return parsed;
}
function child(value: JsonRecord, key: string): JsonRecord {
  const found = value[key];
  if (!isRecord(found)) throw new Error(`the measured row carries no ${key} object`);
  return found;
}
function text(value: JsonRecord, key: string): string {
  const found = value[key];
  if (typeof found !== "string") throw new Error(`the measured row carries no ${key} string`);
  return found;
}

/** The measured package row: ref code:pi-subagents, last_result success, authoritative_current false, freshness STALE. */
export const MEASURED_ROW: JsonRecord = measuredRow();
export const MEASURED_STATE: JsonRecord = child(MEASURED_ROW, "last_result_state");
export const MEASURED_BASIS: JsonRecord = child(MEASURED_STATE, "invalidation_basis");
/** The measured digests: A is what the source reads now (source_digest), B what the verdict was derived from (derived_from). */
export const A: string = text(MEASURED_BASIS, "source_digest");
export const B: string = text(MEASURED_BASIS, "derived_from");
/** Forge's closed FreshnessStatus vocabulary. */
export const FRESHNESS_WORDS = ["CURRENT", "STALE", "UNKNOWN", "NOT_APPLICABLE"] as const;
/** The measured row without its descriptor key: every other measured producer field kept. */
export const DESCRIPTORLESS: JsonRecord = Object.fromEntries(Object.entries(MEASURED_ROW).filter(([key]) => key !== "last_result_state"));

/** The measured invalidation_basis with its two digests replaced; kind, declared_roots and root_digests are kept. */
export const basis = (sourceDigest: string, derivedFrom: string): JsonRecord => ({ ...MEASURED_BASIS, source_digest: sourceDigest, derived_from: derivedFrom });
/** The measured row with descriptor fields (`state`) and row fields (`row`) overridden: a mutation, never a new shape. */
export const described = (state: JsonRecord, row: JsonRecord = {}): JsonRecord => ({ ...MEASURED_ROW, ...row, last_result_state: { ...MEASURED_STATE, ...state } });

/** A src/workbench module's text, for the static pins over the adapter (R5 tone/coverage, R6 purity). */
export const workbenchSource = (module: string): string => readFileSync(new URL(`../../src/workbench/${module}`, import.meta.url), "utf8");
