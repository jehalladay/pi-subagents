/**
 * GraphPolicy host adapter fallback (GPC-EAT-R005, MechanicalWorkflows-8oy5). No GraphPolicyCLI
 * implementation exists (C003 REFUTED): this module encodes the program's proposed consumed
 * contract, not an observed one. The host is itself a pure Policy. It always evaluates the
 * configured fallback policy and returns that proposal UNCHANGED — same intents, memory and
 * trace, hence the same digest — when GraphPolicy is absent; when a configured client is
 * unavailable (throws or times out), over budget, abstains, or answers with a non-conforming body,
 * the fallback intents and memory are returned with one appended trace line of kind "gp-fallback"
 * naming the reason and logProb=unknown. A non-conforming response is treated as unavailable,
 * never as a signal (C004 CONTESTED). Only an exact "proposal" envelope of propose-only intents
 * is forwarded, with the fallback's memory and a "gp-proposal" trace line carrying its logProb.
 *
 * Shadow mode (GPC deliverable, MechanicalWorkflows-mzvd.1): with mode "shadow" the same GraphPolicy
 * evaluation runs host-side, but its proposal is only RECORDED and never applied, even when it
 * conforms. The returned proposal is the fallback's: same intents, memory and digest-relevant
 * content, plus one appended trace line ("gp-shadow" for a conforming response, the usual
 * "gp-fallback" naming the GP_* reason otherwise). The record goes to an application-owned sink as
 * an mw.decision-receipt.v1 sidecar (logProb carried as reported, "unknown" on any fallback reason);
 * nothing here touches admission or mw.training-export.v1.
 */
import type { Intent, Policy, PolicyContext, Proposal, ResourceClaim } from "./contracts.js";
import type { DecisionReceipt } from "./decision-receipt.js";
import type { Maybe } from "./episode.js";

export type GraphPolicyFallbackReason = "GP_UNCONFIGURED" | "GP_UNAVAILABLE" | "GP_BUDGET_EXHAUSTED" | "GP_ABSTAIN" | "GP_RESPONSE_MALFORMED";

/** The consumed subset of a GraphPolicy response envelope; anything else is non-conforming. */
export type GraphPolicyResponse =
  | { readonly status: "proposal"; readonly intents: readonly Intent[]; readonly logProb: Maybe<number> }
  | { readonly status: "abstain" }
  | { readonly status: "budget-exhausted" }
  | { readonly status: "timeout" };

/** A synchronous injected GraphPolicy client. It may return anything; a thrown error means unavailable. */
export type GraphPolicyClient<O> = (observation: O, context: PolicyContext) => unknown;

/** "forward" applies a conforming GraphPolicy proposal (GPC-EAT-R005); "shadow" records it and returns the fallback's. */
export type GraphPolicyHostMode = "forward" | "shadow";

/** One shadow-mode record handed to the application-owned sink. The receipt validates against schema/decision-receipt.v1.schema.json. */
export interface GraphPolicyShadowRecord {
  readonly applied: false;
  readonly outcome: "proposal" | "fallback";
  readonly reason: Maybe<GraphPolicyFallbackReason>;
  /** The GraphPolicy intents exactly as it proposed them; empty on a fallback outcome. They appear here and in the receipt, never in the returned proposal. */
  readonly gpIntents: readonly Intent[];
  readonly receipt: DecisionReceipt;
}

export interface GraphPolicyHostInput<O, I extends Intent, M> {
  readonly fallback: Policy<O, I, M>;
  /** Absent means GraphPolicy is unconfigured: every proposal is the fallback's, unchanged. */
  readonly client?: GraphPolicyClient<O> | undefined;
  /** Host policy id; defaults to `gp-host:<fallback id>`. */
  readonly id?: string | undefined;
  /** Defaults to "forward". */
  readonly mode?: GraphPolicyHostMode | undefined;
  /** Shadow mode only: receives one record per proposal made with a configured client. Application-owned; a throw propagates (fail loud, never silently unrecorded). */
  readonly onShadow?: ((record: GraphPolicyShadowRecord) => void) | undefined;
}

export interface GraphPolicyHostConfiguration {
  readonly graphPolicy: "configured" | "absent";
  readonly fallback: { readonly id: string; readonly revision: string };
  /** Construction-time fallback reason: GP_UNCONFIGURED when absent; "unknown" when a client is configured (per-proposal reasons live in the trace). */
  readonly reason: Maybe<GraphPolicyFallbackReason>;
  /** Present (true) only when the host runs in shadow mode. */
  readonly shadow?: true;
}

export interface GraphPolicyHost<O, M> extends Policy<O, Intent, M> {
  readonly configuration: GraphPolicyHostConfiguration;
}

type Verdict =
  | { readonly kind: "proposal"; readonly intents: readonly Intent[]; readonly logProb: Maybe<number> }
  | { readonly kind: "fallback"; readonly reason: GraphPolicyFallbackReason; readonly detail: string };

const CLAIM_DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const isText = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;
const isTexts = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(isText);
const isClaim = (value: unknown): value is ResourceClaim =>
  isRecord(value) && CLAIM_DIMENSIONS.every(dimension => typeof value[dimension] === "number" && Number.isFinite(value[dimension]) && (value[dimension] as number) >= 0);

/** Structural conformance of one intent: every contract member present and typed, authority absent or propose-only. */
function conformingIntent(value: unknown): value is Intent {
  if (!isRecord(value)) return false;
  if (!isText(value.intentId) || !isText(value.policyId) || !isText(value.effect) || !isText(value.expectedRevision)) return false;
  const target = value.target;
  if (!isRecord(target) || !isText(target.kind) || !isText(target.uri)) return false;
  if (!isClaim(value.claim)) return false;
  if (!isTexts(value.evidenceRefs) || !isTexts(value.writeScopes) || !isTexts(value.readScopes)) return false;
  if ("authority" in value && value.authority !== "propose-only") return false;
  return true;
}

function classify(response: unknown): Verdict {
  if (!isRecord(response) || typeof response.status !== "string") {
    return { kind: "fallback", reason: "GP_RESPONSE_MALFORMED", detail: "response is not an envelope with a string status" };
  }
  const status = response.status;
  switch (status) {
    case "abstain": return { kind: "fallback", reason: "GP_ABSTAIN", detail: "GraphPolicy abstained" };
    case "budget-exhausted": return { kind: "fallback", reason: "GP_BUDGET_EXHAUSTED", detail: "GraphPolicy reported its budget exhausted" };
    case "timeout": return { kind: "fallback", reason: "GP_UNAVAILABLE", detail: "GraphPolicy timed out" };
    case "proposal": {
      const intents = response.intents;
      if (!Array.isArray(intents) || !intents.every(conformingIntent)) {
        return { kind: "fallback", reason: "GP_RESPONSE_MALFORMED", detail: "proposal envelope without a conforming propose-only intent list" };
      }
      const logProb = response.logProb;
      if (logProb !== "unknown" && !(typeof logProb === "number" && Number.isFinite(logProb))) {
        return { kind: "fallback", reason: "GP_RESPONSE_MALFORMED", detail: "proposal logProb is neither a finite number nor the literal unknown" };
      }
      return { kind: "proposal", intents: (intents as readonly Intent[]).map(intent => ({ ...intent })), logProb };
    }
    default:
      return { kind: "fallback", reason: "GP_RESPONSE_MALFORMED", detail: `status ${status} is outside the consumed envelope; treated as unavailable, never as a signal` };
  }
}

const describe = (error: unknown): string => (error instanceof Error ? `${error.name}: ${error.message}` : String(error));

/** Build the host over one fallback policy and an optional GraphPolicy client. */
export function graphPolicyHost<O, I extends Intent, M>(input: GraphPolicyHostInput<O, I, M>): GraphPolicyHost<O, M> {
  const { fallback, client } = input;
  const shadow = input.mode === "shadow";
  const id = input.id ?? `gp-host:${fallback.id}`;
  const configuration: GraphPolicyHostConfiguration = {
    graphPolicy: client === undefined ? "absent" : "configured",
    fallback: { id: fallback.id, revision: fallback.revision },
    reason: client === undefined ? "GP_UNCONFIGURED" : "unknown",
    ...(shadow ? { shadow: true as const } : {}),
  };
  const fallbackWith = (base: Proposal<I, M>, reason: GraphPolicyFallbackReason, detail: string): Proposal<Intent, M> => ({
    intents: base.intents,
    memory: base.memory,
    trace: [...base.trace, { kind: "gp-fallback", policyId: id, detail: `${reason}: ${detail}; fallback ${fallback.id}@${fallback.revision} proposal returned unchanged; logProb=unknown` }],
  });
  const record = (context: PolicyContext, verdict: Verdict): GraphPolicyShadowRecord => {
    const proposal = verdict.kind === "proposal";
    const gpIntents = proposal ? verdict.intents : [];
    return {
      applied: false,
      outcome: proposal ? "proposal" : "fallback",
      reason: proposal ? "unknown" : verdict.reason,
      gpIntents,
      receipt: {
        schema: "mw.decision-receipt.v1",
        version: 1,
        decisionId: `${context.episodeId}:${context.observationDigest}`,
        gp: { graphHash: "unknown", programHash: "unknown", checkpointHash: "unknown", snapshotHash: "unknown" },
        featureProjectionDigest: "unknown",
        actor: { id: context.actorId, revision: fallback.revision },
        selector: { id, revision: fallback.revision },
        support: "unknown",
        logProb: proposal ? verdict.logProb : "unknown",
        completeness: "unknown",
        actions: { proposed: gpIntents.map(intent => intent.intentId), admitted: "unknown", executed: "unknown" },
        sourceReceipt: "unknown",
        resolverVerdict: "unknown",
        verifierOutcome: "unknown",
        feedback: { status: "unknown" },
      },
    };
  };
  return {
    id,
    revision: fallback.revision,
    configuration,
    propose(observation: O, memory: M, context: PolicyContext): Proposal<Intent, M> {
      const base = fallback.propose(observation, memory, context);
      if (client === undefined) return base;
      let response: unknown;
      let thrown: Verdict | undefined;
      try {
        response = client(observation, context);
      } catch (error) {
        thrown = { kind: "fallback", reason: "GP_UNAVAILABLE", detail: `client threw ${describe(error)}` };
      }
      const verdict = thrown ?? classify(response);
      if (shadow) input.onShadow?.(record(context, verdict));
      if (verdict.kind === "fallback") return fallbackWith(base, verdict.reason, verdict.detail);
      if (shadow) {
        return {
          intents: base.intents,
          memory: base.memory,
          trace: [...base.trace, { kind: "gp-shadow", policyId: id, detail: `GraphPolicy proposed ${verdict.intents.length} intent(s) in shadow mode, recorded and not applied; fallback ${fallback.id}@${fallback.revision} proposal returned unchanged; logProb=${String(verdict.logProb)}` }],
        };
      }
      return {
        intents: verdict.intents,
        memory: base.memory,
        trace: [...base.trace, { kind: "gp-proposal", policyId: id, detail: `GraphPolicy proposed ${verdict.intents.length} intent(s); logProb=${String(verdict.logProb)}` }],
      };
    },
  };
}
