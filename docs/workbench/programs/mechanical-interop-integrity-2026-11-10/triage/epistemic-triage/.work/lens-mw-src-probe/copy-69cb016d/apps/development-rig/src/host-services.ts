/**
 * Application-owned DevelopmentServices bundle for the Pi function host (EAT-R008..R011).
 * Pure composition: the four service closures come from the application, never from descriptor
 * callback names; the verification projection never credits a PASS the Forge envelope did not earn;
 * the producer-id record never fabricates an id. No provider SDK import, no Pi import.
 */
import { develop, type Candidate, type DevelopmentOutcome, type DevelopmentRequest, type DevelopmentServices, type VerificationResult } from "@mechanical/workflows-development";
import type { GateObservation } from "./live-gate.js";

export const HOST_SERVICE_NAMES = ["discover", "compileContext", "implement", "verify"] as const;

export class HostServicesError extends Error {
  readonly code: "HOST_SERVICE_UNBOUND" | "HOST_SERVICE_EXTRA_MEMBER" | "HOST_REQUEST_MISMATCH";
  constructor(code: HostServicesError["code"], detail: string) {
    super(code + ": " + detail);
    this.name = "HostServicesError";
    this.code = code;
  }
}

function sameRequest(left: DevelopmentRequest, right: DevelopmentRequest): boolean {
  return left.task === right.task && left.workspaceId === right.workspaceId && left.baseRevision === right.baseRevision;
}

/**
 * EAT-R008: close the four services over the pinned request. The bundle must carry exactly the four members; the
 * closures are captured at construction, so later mutation of the input cannot change which code runs, and a call for a
 * different request refuses before the closure starts. Any extra argument (a descriptor, callback names) is never read.
 */
export function createDevelopmentServices(bindings: DevelopmentServices, pinned: DevelopmentRequest): DevelopmentServices {
  const supplied = bindings as unknown as Record<string, unknown>;
  for (const name of HOST_SERVICE_NAMES) {
    if (typeof supplied[name] !== "function") throw new HostServicesError("HOST_SERVICE_UNBOUND", name);
  }
  for (const name of Object.keys(supplied)) {
    if (!(HOST_SERVICE_NAMES as readonly string[]).includes(name)) throw new HostServicesError("HOST_SERVICE_EXTRA_MEMBER", name);
  }
  const { discover, compileContext, implement, verify } = bindings;
  const pin = { task: pinned.task, workspaceId: pinned.workspaceId, baseRevision: pinned.baseRevision };
  const guard = (request: DevelopmentRequest): void => {
    if (!sameRequest(request, pin)) throw new HostServicesError("HOST_REQUEST_MISMATCH", "request differs from the pinned request");
  };
  const bundle: DevelopmentServices = {
    discover: async request => { guard(request); return discover(request); },
    compileContext: async (scope, request) => { guard(request); return compileContext(scope, request); },
    implement: async (context, scope, request) => { guard(request); return implement(context, scope, request); },
    verify: async (candidate, request) => { guard(request); return verify(candidate, request); },
  };
  return Object.freeze(bundle);
}

/** EAT-R009: run core develop() through the factory and return its DevelopmentOutcome unchanged (same object, no rewrite). */
export function developThroughHost(bindings: DevelopmentServices, request: DevelopmentRequest): Promise<DevelopmentOutcome> {
  return develop(createDevelopmentServices(bindings, request), request);
}

export interface GateAdmission {
  /** SHA-256 of forge.toml pinned at admission. */
  readonly admittedManifestSha256: string;
  /** SHA-256 of forge.toml observed when the gate result arrived. */
  readonly currentManifestSha256: string;
}

/**
 * EAT-R011: project one native Forge observation onto the verification the core judges. Only an observation that is a
 * pass, for exactly the candidate commit, with a native gate_definition and an unchanged forge.toml, projects "passed".
 * A mismatched subject, a missing gate definition, a changed manifest, a partial/unknown/transport result all project
 * "unknown"; a red for the right subject stays "failed". The native operation id is retained as evidence in every case.
 */
export function projectForgeVerification(observation: GateObservation, candidate: Candidate, admission: GateAdmission): VerificationResult {
  const basis = { workspaceId: candidate.basis.workspaceId, revision: candidate.basis.revision };
  const retained = observation.operationId ? { evidence: { system: "forge", kind: "operation", id: observation.operationId } } : {};
  const unknown = (diagnostic: string): VerificationResult => ({ basis, verdict: "unknown", ...retained, diagnostic });
  if (admission.admittedManifestSha256 !== admission.currentManifestSha256) return unknown("GATE_DEFINITION_CHANGED");
  if (observation.basis.commit !== candidate.basis.revision) return unknown("VERIFICATION_SUBJECT_CHANGED");
  if (observation.kind === "passed") {
    if (observation.binding.gateDefinition !== "native") return unknown("FORGE_GATE_DEFINITION_MISSING");
    return { basis, verdict: "passed", ...retained, diagnostic: observation.reason };
  }
  if (observation.kind === "failed") return { basis, verdict: "failed", ...retained, diagnostic: observation.reason };
  return unknown(observation.reason);
}

export interface ProducerIds {
  readonly claudeSessionId: string | null;
  readonly forgeOperationId: string | null;
}
export interface ProducerAvailability {
  readonly sdkCredentials: boolean;
  readonly forgeExecutable: boolean;
}
export interface ProducerReceipt {
  readonly status: "recorded" | "blocked";
  readonly claude_session_id: string | "uncertain" | null;
  readonly forge_operation_id: string | "uncertain" | null;
  readonly blockedBy: readonly string[];
}

/**
 * EAT-R010 receipt facts: an id appears only when its producer answered with a nonblank id, otherwise "uncertain";
 * absent credentials or Forge executable record "blocked" (ids null, no stub PASS), never a fabricated id.
 */
export function describeProducerReceipt(ids: ProducerIds, available: ProducerAvailability): ProducerReceipt {
  const blockedBy = [...(available.sdkCredentials ? [] : ["claude-sdk-credentials"]), ...(available.forgeExecutable ? [] : ["forge-executable"])];
  if (blockedBy.length > 0) return { status: "blocked", claude_session_id: null, forge_operation_id: null, blockedBy };
  const named = (id: string | null): string => (typeof id === "string" && id.trim().length > 0 ? id : "uncertain");
  return { status: "recorded", claude_session_id: named(ids.claudeSessionId), forge_operation_id: named(ids.forgeOperationId), blockedBy };
}
