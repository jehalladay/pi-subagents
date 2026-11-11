/**
 * Durable effect-intent record (EAT-R013; MechanicalWorkflows-loexn.7). The host persists exactly one intent record
 * before the first writer side effect, attaches the native agent session, candidate commit and Forge operation id as
 * each is observed, and settles it only against external native refs: the committed tree and the gate definition hash,
 * never a human-readable gate status alone. A record that is not settled reads as "uncertain": a fresh process that
 * finds it knows an effect may exist and must reconcile, not retry.
 */
import { closeSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, writeSync } from "node:fs";
import { dirname } from "node:path";

export const EFFECT_INTENT_SCHEMA = "mechanical.effect-intent/v1";
export type EffectDisposition = "uncertain" | "settled";
export type SettlementVerdict = "passed" | "failed";

export interface EffectIntentSettlement {
  readonly verdict: SettlementVerdict;
  /** The exact committed tree the gate verified; equals the candidate tree the host observed. */
  readonly committedTree: string;
  /** SHA-256 of the Forge manifest the gate definition came from. */
  readonly gateDefinitionSha256: string;
  readonly forgeOperationId: string;
}
export interface EffectIntentRecord {
  readonly schema: typeof EFFECT_INTENT_SCHEMA;
  readonly intentId: string;
  /** Identity digest of the invocation, when the host has one at this point. */
  readonly invocationIdentitySha256: string | null;
  readonly workspace: string;
  readonly taskSha256: string;
  readonly base: { readonly commit: string; readonly tree: string };
  readonly gateDefinitionSha256: string;
  readonly disposition: EffectDisposition;
  readonly agentSessionId: string | null;
  readonly candidate: { readonly commit: string; readonly tree: string } | null;
  readonly forgeOperationId: string | null;
  readonly settlement: EffectIntentSettlement | null;
}
export interface EffectIntentStore {
  /** Persists the full record durably (replacing the same intent's earlier state) or throws. */
  write(record: EffectIntentRecord): Promise<void> | void;
}

export interface OpenEffectIntentInput {
  readonly intentId: string;
  readonly invocationIdentitySha256?: string | null;
  readonly workspace: string;
  readonly taskSha256: string;
  readonly base: { readonly commit: string; readonly tree: string };
  readonly gateDefinitionSha256: string;
}

/** The intent as first written: an effect may follow, nothing is observed, the disposition is uncertain. */
export function openEffectIntent(input: OpenEffectIntentInput): EffectIntentRecord {
  return {
    schema: EFFECT_INTENT_SCHEMA, intentId: input.intentId, invocationIdentitySha256: input.invocationIdentitySha256 ?? null,
    workspace: input.workspace, taskSha256: input.taskSha256, base: { commit: input.base.commit, tree: input.base.tree },
    gateDefinitionSha256: input.gateDefinitionSha256, disposition: "uncertain",
    agentSessionId: null, candidate: null, forgeOperationId: null, settlement: null,
  };
}

const nonblank = (value: string | null | undefined): value is string => typeof value === "string" && value.trim() !== "";

/** Attaches the refs observed so far; a ref already set is never replaced by a different one. */
export function attachEffectRefs(record: EffectIntentRecord, refs: {
  readonly agentSessionId?: string | null; readonly candidate?: { readonly commit: string; readonly tree: string } | null; readonly forgeOperationId?: string | null;
}): EffectIntentRecord {
  const agentSessionId = nonblank(refs.agentSessionId) ? refs.agentSessionId : null;
  const forgeOperationId = nonblank(refs.forgeOperationId) ? refs.forgeOperationId : null;
  const candidate = refs.candidate && nonblank(refs.candidate.commit) && nonblank(refs.candidate.tree) ? { commit: refs.candidate.commit, tree: refs.candidate.tree } : null;
  if (agentSessionId !== null && record.agentSessionId !== null && record.agentSessionId !== agentSessionId) throw new Error("EFFECT_INTENT_REF_CONFLICT: agent session " + record.agentSessionId + " is already attached");
  if (forgeOperationId !== null && record.forgeOperationId !== null && record.forgeOperationId !== forgeOperationId) throw new Error("EFFECT_INTENT_REF_CONFLICT: Forge operation " + record.forgeOperationId + " is already attached");
  if (candidate !== null && record.candidate !== null && (record.candidate.commit !== candidate.commit || record.candidate.tree !== candidate.tree)) throw new Error("EFFECT_INTENT_REF_CONFLICT: candidate " + record.candidate.commit + " is already attached");
  return { ...record, agentSessionId: agentSessionId ?? record.agentSessionId, candidate: candidate ?? record.candidate, forgeOperationId: forgeOperationId ?? record.forgeOperationId };
}

/**
 * A settled record holds exactly one settlement (EAT-R016): a completion event delivered again with the same verdict,
 * tree, gate definition and Forge operation returns the held record unchanged; a different completion for the same
 * candidate refuses with EFFECT_INTENT_SETTLEMENT_CONFLICT and never replaces it; a late observation that could not
 * settle (unknown verdict, other tree or gate definition, no operation id) leaves the settlement untouched, unless it names a
 * different Forge operation id, which refuses with EFFECT_INTENT_REF_CONFLICT.
 */
function resettleEffectIntent(record: EffectIntentRecord, observed: Parameters<typeof settleEffectIntent>[1]): EffectIntentRecord {
  const held = record.settlement;
  const bound = observed.verdict !== "unknown" && nonblank(observed.forgeOperationId) && record.candidate !== null &&
    observed.verifiedTree === record.candidate.tree && observed.gateDefinitionSha256 === record.gateDefinitionSha256;
  if (held === null) return record;
  if (!bound) {
    // A late observation may not settle, yet a foreign Forge operation id is evidence of a second gate dispatch (EAT-R016: a gate never restarts silently).
    if (nonblank(observed.forgeOperationId) && observed.forgeOperationId !== record.forgeOperationId) throw new Error("EFFECT_INTENT_REF_CONFLICT: Forge operation " + record.forgeOperationId + " is already attached");
    return record;
  }
  if (held.verdict === observed.verdict && held.forgeOperationId === observed.forgeOperationId) return record;
  throw new Error("EFFECT_INTENT_SETTLEMENT_CONFLICT: the record is already settled as " + held.verdict + " by Forge operation " + held.forgeOperationId +
    "; a second completion (" + observed.verdict + ", " + observed.forgeOperationId + ") is not recorded");
}

/**
 * Settles the record only when the gate verified exactly the committed candidate tree under the recorded gate
 * definition with a native Forge operation id; anything else leaves it uncertain (refs kept), never settled by status alone.
 */
export function settleEffectIntent(record: EffectIntentRecord, observed: {
  readonly verdict: SettlementVerdict | "unknown"; readonly verifiedTree: string | null; readonly gateDefinitionSha256: string; readonly forgeOperationId: string | null;
}): EffectIntentRecord {
  if (record.disposition === "settled") return resettleEffectIntent(record, observed);
  if (observed.verdict === "unknown" || record.candidate === null || !nonblank(observed.forgeOperationId) ||
      observed.verifiedTree !== record.candidate.tree || observed.gateDefinitionSha256 !== record.gateDefinitionSha256) {
    return observed.forgeOperationId ? attachEffectRefs(record, { forgeOperationId: observed.forgeOperationId }) : record;
  }
  return {
    ...attachEffectRefs(record, { forgeOperationId: observed.forgeOperationId }), disposition: "settled",
    settlement: { verdict: observed.verdict, committedTree: record.candidate.tree, gateDefinitionSha256: record.gateDefinitionSha256, forgeOperationId: observed.forgeOperationId },
  };
}

const HEX = /^[0-9a-f]{40,64}$/;
/** Parses and validates a persisted record; a malformed or inconsistent one throws rather than reading as clean. */
export function parseEffectIntent(text: string): EffectIntentRecord {
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error("EFFECT_INTENT_INVALID: the record is not JSON"); }
  const r = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
  const fail = (why: string): never => { throw new Error("EFFECT_INTENT_INVALID: " + why); };
  if (r === null || r["schema"] !== EFFECT_INTENT_SCHEMA) return fail("schema is not " + EFFECT_INTENT_SCHEMA);
  for (const key of ["intentId", "workspace", "taskSha256", "gateDefinitionSha256"]) if (!nonblank(r[key] as string)) fail(key + " is blank");
  const base = r["base"] as Record<string, unknown> | null;
  if (!base || !HEX.test(String(base["commit"])) || !HEX.test(String(base["tree"]))) fail("base commit/tree is not a Git object id");
  const settled = r["disposition"] === "settled";
  if (!settled && r["disposition"] !== "uncertain") fail("disposition is neither uncertain nor settled");
  const candidate = r["candidate"] as Record<string, unknown> | null;
  if (candidate !== null && (!candidate || !HEX.test(String(candidate["commit"])) || !HEX.test(String(candidate["tree"])))) fail("candidate commit/tree is not a Git object id");
  const settlement = r["settlement"] as Record<string, unknown> | null;
  if (settled) {
    if (!candidate || !settlement || settlement["committedTree"] !== candidate["tree"] || settlement["gateDefinitionSha256"] !== r["gateDefinitionSha256"] ||
        !nonblank(settlement["forgeOperationId"] as string) || (settlement["verdict"] !== "passed" && settlement["verdict"] !== "failed")) {
      fail("a settled record must bind the committed candidate tree, the gate definition hash and a Forge operation id");
    }
  } else if (settlement !== null) fail("an uncertain record carries a settlement");
  return value as EffectIntentRecord;
}

/** A single-file store: atomic temp-file write with fsync, then rename; a fresh process reads it back with readEffectIntent. */
export function fileEffectIntentStore(path: string): EffectIntentStore {
  return {
    write(record: EffectIntentRecord): void {
      mkdirSync(dirname(path), { recursive: true });
      const temp = path + ".tmp-" + process.pid;
      const fd = openSync(temp, "w", 0o600);
      try { writeSync(fd, JSON.stringify(record, null, 2) + "\n"); fsyncSync(fd); } finally { closeSync(fd); }
      renameSync(temp, path);
    },
  };
}
export function readEffectIntent(path: string): EffectIntentRecord {
  let text: string;
  try { text = readFileSync(path, "utf8"); }
  catch (error) { throw new Error("EFFECT_INTENT_UNREADABLE: " + path + " (" + (error instanceof Error ? error.message : String(error)) + ")"); }
  return parseEffectIntent(text);
}
