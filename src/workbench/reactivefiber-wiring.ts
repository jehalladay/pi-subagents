/**
 * reactivefiber-wiring.ts (wb-79k.2, W13/VC-2): the ReactiveFiber observe-wiring of the host seam that answers a workflow node()
 * call. When the value the host hands back is a reading of the registered ReactiveFiber render preview, the landed reader adapter
 * (reactivefiber-observer.ts reactivefiberTopology) projects it and its frozen output is applied to the live ObservationProjection:
 * refresh for the one preview snapshot, relate for the display-grouping edge from the invoking node call (docs/workbench/09 §
 * Reader adapters: "RF: render context provenance and context artifact references.").
 *
 * Every field of the adapter's context is the host's own: the authenticated scope, the seam the host registered (rf-cli only for
 * the real registered CLI path, injected-fixture for any test seam, so the adapter's fixture label reaches every surfaced label),
 * the host clock's reading as capturedAt and observedAt, the run's invocation id, and the invoking operation's reference, which is
 * the key the host already gives a node call (provider pi-workflow, type node-call, id `<invocation>:<call id>`), built from the
 * invocation id and the runtime's own call id, never from the script's label or input or from the producer's envelope.
 *
 * Which values are previews is decided by native-evidence.ts nativeEvidence, the landed classifier the runtime already applies to
 * every node value: only a value its reactivefiber branch recognizes (the provider's preview contract, as that classifier and the
 * provider pin it) reaches the adapter, so a value of any other capability gets no adapter call, and a call that answered no
 * value never reaches this module. The wiring never invokes rf or a capability registry, mints no grant and copies no producer text. An adapter refusal
 * (a CapabilityError, or any other throw) projects nothing, never an invented snapshot: it is a typed diagnostic whose one line
 * of text is fixed wording through the shared label layout. A snapshot the projection does not apply (out of order behind a
 * later confirmation, or refused for its identity) states no edge either, so a reading the projection keeps out changes nothing.
 */
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { nativeEvidence } from "./native-evidence.js";
import type { NativeRef, ObservationProjection, ObservationScope } from "./observation.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberSeam, reactivefiberTopology } from "./reactivefiber-observer.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** The longest refusal line the wiring logs, in UTF-16 code units. */
export const REACTIVEFIBER_WIRING_DIAGNOSTIC_CHARS = 200;

/** The host-owned context of one run's ReactiveFiber observe-wiring. */
export interface ReactiveFiberObserveHost {
  /** The live projection the host's observe tools read. */
  readonly projection: ObservationProjection;
  /** The authenticated scope of the run: the workspace realpath and the local principal. */
  readonly scope: ObservationScope;
  /** The seam the host registered the render capability through: rf-cli for the real registered CLI path, else injected-fixture. */
  readonly seam: ReactiveFiberSeam;
  /** The run's invocation id: the reading's trace and the invoking node call's key both carry it. */
  readonly invocationId: string;
  /** The host clock: one reading per projected preview is its capturedAt and its observedAt. */
  readonly now: () => string;
  /** The RF workspace root the host authorized (the validated reactivefiberWorkspaceRoot setting), when one replaces the scope. */
  readonly authorizedRfRoot?: string;
  /** Receives the one typed diagnostic line of a refused reading (the run's workflow_log, in the extension). */
  readonly log?: (message: string) => void;
}

/** The two fields of a node request the wiring reads: the capability that answered and the runtime's own call id. */
export interface ReactiveFiberNodeCall {
  readonly capabilityId: string;
  readonly callId: number;
}

/** What one node value did to the live projection. */
export type ReactiveFiberNodeObservation =
  /** Not a ReactiveFiber preview reading: the adapter was not called and the projection was not touched. */
  | { readonly kind: "not-a-preview" }
  /** The adapter's snapshot went to refresh, which answered `refresh`; `related` edges were stated (0 unless it was applied). */
  | { readonly kind: "projected"; readonly refresh: "applied" | "out-of-order" | "refused"; readonly related: number }
  /** The adapter refused the reading: nothing was projected and the one diagnostic line was logged. */
  | { readonly kind: "refused"; readonly category: "validation" | "authorization"; readonly diagnostic: string };

/** The key the host gives a node call before any native id: the invoking operation of a reading the call answered with. */
function nodeCallRef(invocationId: string, callId: number): NativeRef {
  return { provider: "pi-workflow", type: "node-call", id: `${invocationId}:${callId}` };
}

/** Applies one node value to the live projection when it is a ReactiveFiber preview reading; see the module header. */
export function observeReactiveFiberNode(host: ReactiveFiberObserveHost, call: ReactiveFiberNodeCall, value: JsonValue): ReactiveFiberNodeObservation {
  if (nativeEvidence(call.capabilityId, value).provider !== "reactivefiber") return { kind: "not-a-preview" };
  const at = host.now();
  let topology: ReactiveFiberProjectionTopology;
  try {
    topology = reactivefiberTopology(value, {
      scope: { workspace: host.scope.workspace, principal: host.scope.principal }, seam: host.seam, capturedAt: at, observedAt: at,
      invocationId: host.invocationId, operationRef: nodeCallRef(host.invocationId, call.callId),
      ...(host.authorizedRfRoot !== undefined ? { authorizedRfRoot: host.authorizedRfRoot } : {}),
    });
  } catch (error) {
    const category = error instanceof CapabilityError && error.category === "authorization" ? "authorization" : "validation";
    const diagnostic = sanitizeWorkbenchText(`ReactiveFiber preview of node call ${call.callId} not projected (${category})`, REACTIVEFIBER_WIRING_DIAGNOSTIC_CHARS, "label");
    host.log?.(diagnostic);
    return { kind: "refused", category, diagnostic };
  }
  let refresh: "applied" | "out-of-order" | "refused" = "refused";
  for (const snapshot of topology.snapshots) refresh = host.projection.refresh(snapshot);
  if (refresh !== "applied") return { kind: "projected", refresh, related: 0 };
  for (const relation of topology.relations) host.projection.relate(relation);
  return { kind: "projected", refresh, related: topology.relations.length };
}

/** The node-value hook a host hands its workflow host: every value of the run passes observeReactiveFiberNode. */
export function reactiveFiberNodeObserver(host: ReactiveFiberObserveHost): (call: ReactiveFiberNodeCall, value: JsonValue) => void {
  return (call, value) => {
    observeReactiveFiberNode(host, call, value);
  };
}

/** The hook of a host whose registry holds the native provider (native-modules.ts registerNativeProviders, which spawns the
 * installed CLI): every reading it answers came through the real registered CLI path, so the seam is rf-cli. */
export function nativeReactiveFiberNodeObserver(host: Omit<ReactiveFiberObserveHost, "seam">): (call: ReactiveFiberNodeCall, value: JsonValue) => void {
  return reactiveFiberNodeObserver({ ...host, seam: "rf-cli" });
}
