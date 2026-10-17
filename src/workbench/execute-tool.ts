/**
 * execute-tool.ts — workflow_execute, the Pi tool over the pure admission module (wb-syh, W16; docs/workbench/11
 * § "First public Pi tools": "authorized launch; returns logical invocation and native references, not false
 * completion").
 *
 * The shell owns four impurities and nothing else: it mints the logical invocation reference, it re-reads the
 * operator's grants, principal, workspace and session from host context on EVERY call (the admission is decided at
 * dispatch time and never cached across the permission boundary), it resolves the digest-pinned definition against
 * the saved source bytes, and it performs the ONE launch the admission permits through the host's own launcher.
 * Authority comes only from host-bound context: grants, principal, workspace and session are never read from tool
 * params, and a request key the pure module does not know is never forwarded.
 *
 * Dialect (ruling F3, bound on wb-syh): exactly one dialect reaches the model. The envelope is
 * workbench.tool-reply/v1 (src/workbench/tool-replies.ts); the pure module's workbench.execute/v1 record is folded
 * into it member by member and its contract string never appears. The one ruled exception to tool-reply's constant
 * `invoked: false`: a tool that launches reports `invoked` as whether a launch happened (accepted or launched), and
 * `ok` as whether the launch was not refused. Completion stays "not-asserted" (docs/11): the producer's later answer,
 * read through workflow_observe, is the only completion evidence.
 *
 * Grants (ruling F6): the admission admits detached on workbench:execute alone (probe P6 of the wb-69g.5 gate), so
 * this shell enforces the conjunction: detached hostMode launches only when BOTH workbench:execute AND
 * workbench:detach are held; a grant never implies another.
 *
 * Provenance (ruling F7): principal {id, role: "local-operator"}, workspace scope and the session reach the launcher
 * beside the admission's grant and admissionPolicy on every invoke, as the evidence wiring supplies them.
 *
 * One-liner (owner-accepted default, wb-69g.5 gate F4): a trimmed native identity is not an addressable reference.
 * When the reply builder's squeeze trims identity text, the shell DROPS the native references from the envelope and
 * names the omission; the invocation reference is still the handle for workflow_observe.
 *
 * Review assertion for a detached launch: the local detached host admits only a reviewed script. Here the review is
 * the operator's own: a digest-pinned definition that matches the saved source bytes inside the workspace, launched
 * under the execute+detach conjunction the operator granted. A model-supplied policy never stands in for that.
 */
import { defineTool, type ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import type { JsonValue } from "./capability-registry.js";
import type { WorkflowSource } from "./designer.js";
import {
  buildWorkflowExecuteReply,
  decideExecute,
  EXECUTE_ADMISSION_POLICY,
  EXECUTE_GRANT,
  type ExecuteAdmission,
  type ExecuteDecision,
  type ExecuteRefusalPolicy,
  type LaunchOutcome,
  type WorkflowExecuteReply,
  type WorkflowExecuteRequest,
} from "./execute.js";
import type { DefinitionRef } from "./identity.js";
import type { NativeRef, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "./tool-replies.js";

/** The second half of the detached conjunction; the first is EXECUTE_GRANT from the pure module. */
export const DETACH_GRANT = "workbench:detach";
/** Host-set byte cap of the model-facing text: inside the pure module's accepted interval, never below its floor. */
const DEFAULT_REPLY_BYTES = 8192;
const MIN_REPLY_BYTES = 2048;
const REASON_CHARS = 512;
/** The reply builder's own notes for identity text it had to cut; any of them makes the native references non-addressable. */
const IDENTITY_TRIM_NOTES: readonly string[] = ["native reference text trimmed", "invocation reference trimmed", "definition text trimmed"];

/** Typed host-boundary refusals, beside the pure module's ExecuteRefusalPolicy. */
export type ExecuteLaunchRefusal =
  | "missing-detach-grant"
  | "unsupported-definition-kind"
  | "source-unavailable"
  | "definition-digest-mismatch"
  | "definition-schema-mismatch"
  | "launch-failed";
export type ExecuteErrorCode = ExecuteRefusalPolicy | ExecuteLaunchRefusal;

/** What every launcher receives: the admission and the host-bound provenance, never caller-asserted authority. */
export interface ExecuteLaunch {
  readonly invocationId: string;
  readonly toolCallId: string;
  readonly source: WorkflowSource;
  readonly input: JsonValue;
  readonly hostMode: ExecuteAdmission["hostMode"];
  readonly policy?: JsonValue;
  readonly principal: { readonly id: string; readonly role: "local-operator" };
  readonly scope: { readonly workspace: string; readonly principal: string; readonly sessionId: string };
  readonly grant: typeof EXECUTE_GRANT;
  readonly admissionPolicy: typeof EXECUTE_ADMISSION_POLICY;
}

export interface WorkflowExecuteDeps {
  grants(ctx: ExtensionContext): readonly string[];
  observerScope(ctx: ExtensionContext): ObservationScope;
  localPrincipal(ctx: ExtensionContext): string;
  sessionIdOf(ctx: ExtensionContext): string;
  /** The host mints the logical invocation reference; the caller never names one. */
  mintInvocationId(): string;
  /** The saved source the digest-pinned definition names; throws when it cannot be read inside the workspace. */
  resolveSource(definition: Readonly<DefinitionRef>, cwd: string): WorkflowSource;
  /** Launches inside this Pi session; resolves to the native references the host reports (never completion). */
  launchEmbedded(ctx: ExtensionContext, launch: ExecuteLaunch): Promise<readonly NativeRef[]>;
  /** Launches the same-machine detached host; resolves to the native references the host reports. */
  launchDetached(ctx: ExtensionContext, launch: ExecuteLaunch): Promise<readonly NativeRef[]>;
  /** Host-set cap for the model-facing text; clamped into the pure module's accepted interval. */
  replyMaxBytes?: number;
}

/** The one envelope the model reads. `invoked` is the ruled exception to tool-reply's constant false. */
export interface WorkflowExecuteEnvelope {
  readonly contract: typeof TOOL_REPLY_CONTRACT_VERSION;
  readonly tool: "workflow_execute";
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: WorkflowExecuteReply["status"];
  readonly completion: "not-asserted";
  readonly invocationId?: string;
  readonly definition?: Readonly<DefinitionRef>;
  readonly hostMode?: ExecuteAdmission["hostMode"];
  readonly nativeRefs: readonly Readonly<NativeRef>[];
  readonly nativeRefsOmitted?: { readonly count: number; readonly reason: string };
  readonly policy?: JsonValue;
  readonly provenance?: { readonly grant: typeof EXECUTE_GRANT; readonly admissionPolicy: typeof EXECUTE_ADMISSION_POLICY; readonly principalRole: "local-operator"; readonly workspace: string };
  readonly error?: { readonly code: ExecuteErrorCode; readonly message: string };
  readonly truncated?: { readonly reason: "byte-cap"; readonly maxBytes: number };
  readonly truncation?: string;
}

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }], details: undefined };
}

function message(error: unknown): string {
  return sanitizeWorkbenchText(error instanceof Error ? error.message : String(error), REASON_CHARS, "label");
}

function refusedLaunch(code: ExecuteLaunchRefusal, reason: string): { outcome: LaunchOutcome; code: ExecuteLaunchRefusal } {
  return { outcome: { status: "refused", reason }, code };
}

/**
 * Folds the pure module's reply into the tool-reply/v1 envelope. A refused admission maps its policy to the error
 * code; a refused launch carries the host-boundary code the shell decided. Trimmed identity text drops the native
 * references (one-liner); the byte-cap marker is tool-reply's own shape and the builder's note rides beside it.
 */
function envelope(built: WorkflowExecuteReply, launchCode: ExecuteLaunchRefusal | undefined, maxBytes: number, workspace: string): WorkflowExecuteEnvelope {
  const refused = built.status === "refused";
  const note = built.truncation;
  const identityTrimmed = note !== undefined && IDENTITY_TRIM_NOTES.some(fragment => note.includes(fragment));
  const nativeRefs = identityTrimmed ? [] : built.nativeRefs;
  const code: ExecuteErrorCode | undefined = built.refusal?.policy ?? launchCode ?? (refused ? "launch-failed" : undefined);
  const reason = built.refusal?.reason ?? built.reason;
  return {
    contract: TOOL_REPLY_CONTRACT_VERSION,
    tool: "workflow_execute",
    ok: !refused,
    invoked: !refused,
    status: built.status,
    completion: "not-asserted",
    // A refusal launched nothing addressable, so it carries no invocation reference (and stays byte-stable for the census).
    ...(built.invocationId !== undefined && !refused ? { invocationId: built.invocationId } : {}),
    ...(built.definition !== undefined ? { definition: built.definition } : {}),
    ...(built.hostMode !== undefined ? { hostMode: built.hostMode } : {}),
    nativeRefs,
    ...(identityTrimmed && built.nativeRefs.length > 0
      ? { nativeRefsOmitted: { count: built.nativeRefs.length, reason: "trimmed identity text is not an addressable reference; observe the launch through workflow_observe by its invocation reference" } }
      : {}),
    ...(built.policy !== undefined ? { policy: built.policy } : {}),
    ...(built.definition !== undefined ? { provenance: { grant: EXECUTE_GRANT, admissionPolicy: EXECUTE_ADMISSION_POLICY, principalRole: "local-operator", workspace } } : {}),
    ...(refused && code !== undefined ? { error: { code, message: reason ?? "launch refused" } } : {}),
    ...(built.truncated ? { truncated: { reason: "byte-cap", maxBytes } } : {}),
    ...(note !== undefined ? { truncation: note } : {}),
  };
}

export function createWorkflowExecuteTool(deps: WorkflowExecuteDeps) {
  const maxBytes = Math.max(MIN_REPLY_BYTES, Number.isFinite(deps.replyMaxBytes) ? Math.floor(deps.replyMaxBytes as number) : DEFAULT_REPLY_BYTES);
  return defineTool({
    name: "workflow_execute",
    label: "Execute workflow definition",
    description:
      "Launch one digest-pinned saved workflow definition in this Pi session (hostMode embedded) or on the same-machine detached host (hostMode detached). Requires the exact workbench:execute grant; detached additionally requires workbench:detach. Returns the logical invocation and native references only, never completion: observe the launch through workflow_observe.",
    parameters: Type.Object({
      definitionRef: Type.Object({
        kind: Type.Union([Type.Literal("script"), Type.Literal("function"), Type.Literal("furnace-formula")]),
        id: Type.String({ minLength: 1, maxLength: 256 }),
        schemaVersion: Type.String({ minLength: 1, maxLength: 256 }),
        artifactDigest: Type.String({ minLength: 1, maxLength: 256 }),
      }),
      input: Type.Unknown(),
      hostMode: Type.String({ minLength: 1, maxLength: 32 }),
      policy: Type.Optional(Type.Unknown()),
    }),
    execute: async (toolCallId, params, _signal, _onUpdate, ctx) => {
      // Host context first, on every call: a cached decision would outlive a revoked grant.
      const invocationId = deps.mintInvocationId();
      const rights = deps.grants(ctx);
      const scope = deps.observerScope(ctx);
      const request: WorkflowExecuteRequest = {
        definitionRef: params.definitionRef,
        input: params.input as JsonValue,
        hostMode: params.hostMode,
        ...(params.policy !== undefined ? { policy: params.policy as JsonValue } : {}),
      };
      const decision: ExecuteDecision = decideExecute(request, { grants: rights, invocationId });
      if (decision.decision === "refused") {
        return textResult(sanitizeWorkbenchJsonText(envelope(buildWorkflowExecuteReply(decision, undefined, maxBytes), undefined, maxBytes, scope.workspace), maxBytes));
      }
      const { admission } = decision;
      let launchCode: ExecuteLaunchRefusal | undefined;
      let outcome: LaunchOutcome;
      const refuse = (code: ExecuteLaunchRefusal, reason: string): void => {
        const refusal = refusedLaunch(code, reason);
        launchCode = refusal.code;
        outcome = refusal.outcome;
      };
      outcome = { status: "refused", reason: "launch refused" };
      if (admission.hostMode === "detached" && !rights.includes(DETACH_GRANT)) {
        refuse("missing-detach-grant", `detached hostMode requires both ${EXECUTE_GRANT} and ${DETACH_GRANT}; execute alone never reaches a detached launch`);
      } else if (admission.definition.kind !== "script") {
        refuse("unsupported-definition-kind", "only script definitions launch in this host");
      } else {
        let source: WorkflowSource | undefined;
        try {
          source = deps.resolveSource(admission.definition, ctx.cwd);
        } catch (error) {
          refuse("source-unavailable", message(error));
        }
        if (source !== undefined) {
          if (source.definition.artifactDigest !== admission.definition.artifactDigest) {
            refuse("definition-digest-mismatch", "definition digest does not match the saved source bytes");
          } else if (source.definition.schemaVersion !== admission.definition.schemaVersion) {
            refuse("definition-schema-mismatch", "definition schemaVersion does not match the saved source");
          } else {
            const launch: ExecuteLaunch = Object.freeze({
              invocationId: admission.invocationId,
              toolCallId,
              source,
              input: params.input as JsonValue,
              hostMode: admission.hostMode,
              ...(admission.policy !== undefined ? { policy: admission.policy } : {}),
              principal: Object.freeze({ id: deps.localPrincipal(ctx), role: "local-operator" as const }),
              scope: Object.freeze({ workspace: scope.workspace, principal: scope.principal, sessionId: deps.sessionIdOf(ctx) }),
              grant: admission.grant,
              admissionPolicy: admission.admissionPolicy,
            });
            try {
              const nativeRefs = admission.hostMode === "detached" ? await deps.launchDetached(ctx, launch) : await deps.launchEmbedded(ctx, launch);
              outcome = { status: "launched", nativeRefs };
            } catch (error) {
              refuse("launch-failed", message(error));
            }
          }
        }
      }
      return textResult(sanitizeWorkbenchJsonText(envelope(buildWorkflowExecuteReply(decision, outcome, maxBytes), launchCode, maxBytes, scope.workspace), maxBytes));
    },
  });
}
