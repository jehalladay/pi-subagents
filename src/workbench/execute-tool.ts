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
 *
 * The function branch (wb-4bxo, packet P04 of mechanical-native-interoperability-2026-11-09: EAT-R235..EAT-R241 of its
 * requirements/ATOMIC-REQUIREMENTS.md at 18b016b2, extending EAT-R032..EAT-R035 and EAT-R155). It exists only where the host
 * composes function hosting (WorkflowExecuteDeps.functions; src/index.ts takes it from SubagentsExtensionInjection.functionHosting,
 * which no Pi session sets), so in a Pi session a function definition refuses as unsupported-definition-kind exactly as before
 * (RF11b), and so does a furnace-formula definition wherever hosting is composed (RF05). Where it is composed, a function
 * definition admitted by decideExecute is judged before the detach conjunction and the script path, in this order, each claim
 * held to the cases of test/workbench-registered-function.test.ts named beside it, all driven through the tool objects
 * src/index.ts registers with one injected installed host (evidence level V3, injected callbacks; never MechanicalWorkflows'
 * native exit of the same label):
 *  1. the definition id names a reviewed entrypoint of MECHANICAL_REVIEWED_ENTRYPOINTS, else unsupported-definition-kind with
 *     its own fixed reason and no package, Git or host call; pinned as the reviewed id launching (RF01) and 18 listed ids that
 *     differ from it refusing (RF04: another version, segment or id, the id extended after its end, the id upper-cased; RF04b:
 *     the id extended before its start, its first letter upper-cased, cut to its first three, two and one segments or by its
 *     last character, its last three, two and one segments, padded with a space before or after it, its separators replaced,
 *     its first letter in its fullwidth compatibility form); an id outside those families is NOT CLAIMED (the class guard of
 *     record M:78521 binds the reviewed-id match words, so they name only this pinned set);
 *  2. only an embedded launch is hosted, with or without workbench:detach held, else unsupported-definition-kind with its own
 *     fixed reason and no package, Git or host call (RF12);
 *  3. dispatchFunctionChain (function-dispatch-chain.ts) judges entry authority, the SDK edge's rights, the installed package,
 *     source admission and the final boundary; a refusal there replies launch-failed, its reason the deciding layer's own code
 *     then that layer's fixed reason, and starts nothing: authority (RF06 and RF10 at entry, RF09 at the final boundary), the
 *     SDK edge (RF17), the installed package (RF08), source admission (RF07, RF15);
 *  4. the chain's one effect is the host's run of the function: the reply returns launched, completion not-asserted, once the
 *     host reports its native references, while the run, and with it the chain's writer lease, continues until it settles
 *     (RF01, RF03, RF15); the host's start receives the chain's frozen grant (RF01; with an SDK edge, its rights, RF17b) and the
 *     input decideExecute admitted for a function definition: the request input through withoutBeadsNotes (identity.ts,
 *     EAT-R154, location-scoped under the owner ruling U8), which omits the Beads note at the seven omitted forms RF13b lists,
 *     without invoking it at the four forms RF13c lists, while a caller's own notes member at the nine kept forms RF13b lists
 *     reaches the host byte for byte, the host's input digesting to the admission's input digest (RF13b), as a JSON copy
 *     frozen at every object and list (RF13); a host that rejects at start replies launch-failed (RF14).
 * The branch adds no refusal code to the reply: ExecuteErrorCode keeps its members, and a function refusal/recovery code
 * mapping is the joint P00 vocabulary ruling (MII EAT-R419), NOT CLAIMED here.
 * NOT CLAIMED here: an adopted action spelling (FUNCTION_ACTION_CONTRACT stays unadopted, so under the shipped contract the
 * reviewed function's dispatch refuses as function-action-unadopted, RF10); a real installed MechanicalWorkflows package or
 * native evidence (P07);
 * the definition's artifact digest compared against anything here (the package host's admission is packet P02's); the
 * projection of a Mechanical outcome (P05); controls, cancellation and the journal (P06).
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
import type { FunctionActionContract } from "./function-authority.js";
import {
  dispatchFunctionChain,
  type FunctionChainGrant,
  type FunctionChainHost,
  type FunctionChainRefused,
  type FunctionPackageHost,
  type FunctionSdkHost,
} from "./function-dispatch-chain.js";
import { type DefinitionRef, withoutBeadsNotes } from "./identity.js";
import { MECHANICAL_REVIEWED_ENTRYPOINTS, type MechanicalReviewedEntrypoint } from "./mechanical-descriptor.js";
import type { NativeRef, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";
import type { SourceAdmissionHost } from "./source-admission.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "./tool-replies.js";

/** The second half of the detached conjunction; the first is EXECUTE_GRANT from the pure module. */
export const DETACH_GRANT = "workbench:detach";
/**
 * The refusal every scripted-workflow launch door of this extension gives while its master switch (workflowsEnabled) reads
 * off (EAT-R485): it names the setting and the two places to turn it on, in the --subagents-workflow-file notice's own
 * words, and nothing of the caller's request.
 */
export const WORKFLOWS_DISABLED_REASON =
  'Workflows are off in this session, so nothing was launched. Turn them on in /agents → Settings → Workflows, or set `"workflowsEnabled": true` in .pi/subagents.json.';
/** Host-set byte cap of the model-facing text: inside the pure module's accepted interval, never below its floor. */
const DEFAULT_REPLY_BYTES = 8192;
const MIN_REPLY_BYTES = 2048;
const REASON_CHARS = 512;
/** The reply builder's own notes for identity text it had to cut; any of them makes the native references non-addressable. */
const IDENTITY_TRIM_NOTES: readonly string[] = ["native reference text trimmed", "invocation reference trimmed", "definition text trimmed"];

/** Typed host-boundary refusals, beside the pure module's ExecuteRefusalPolicy. */
export type ExecuteLaunchRefusal =
  | "workflows-disabled"
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

/** What a function launch's one effect receives: the reviewed entry, the input as JSON data and the grant the chain decided. */
export interface ExecuteFunctionLaunch {
  readonly invocationId: string;
  readonly toolCallId: string;
  readonly definition: Readonly<DefinitionRef>;
  readonly entrypoint: Readonly<MechanicalReviewedEntrypoint>;
  readonly input: JsonValue;
  readonly inputDigest: string;
  readonly grant: FunctionChainGrant;
  readonly scope: { readonly workspace: string; readonly principal: string; readonly sessionId: string };
}
/** The function branch's host seams (packet P04); absent, a function definition refuses as unsupported-definition-kind. */
export interface WorkflowFunctionDeps {
  /** The function action contract in force; only a contract adoptFunctionActions returned authorizes a dispatch. */
  readonly contract: FunctionActionContract;
  /** The composed chain host of this call: authority reads from host context, source admission, the installed package and the SDK edge (RF17, RF17b). */
  chainHost(ctx: ExtensionContext): FunctionChainHost;
  /**
   * The chain's one effect, the function's run: it reports the host's native references through started() once the host has
   * accepted the work, and settles only when the run settles, so the chain's writer lease covers the whole run.
   */
  run(ctx: ExtensionContext, launch: ExecuteFunctionLaunch, started: (nativeRefs: readonly NativeRef[]) => void): Promise<void>;
}
/** What the installed host is asked to start: the reviewed entry, the definition, the input as frozen JSON data, the chain's frozen grant and an AbortSignal. */
export interface FunctionHostStart {
  readonly invocationId: string;
  readonly entrypoint: Readonly<MechanicalReviewedEntrypoint>;
  readonly definition: Readonly<DefinitionRef>;
  readonly input: JsonValue;
  readonly grant: FunctionChainGrant;
  readonly signal: AbortSignal;
}
/** The installed host's answer once it accepted the work: its native references now, the run's settlement later. */
export interface FunctionHostStarted {
  readonly nativeRefs: readonly NativeRef[];
  readonly settled: Promise<unknown>;
}
/** Function hosting a host composes for workflow_execute (packet P04); the model never names any part of it. */
export interface WorkflowFunctionHosting {
  readonly contract: FunctionActionContract;
  readonly source: SourceAdmissionHost;
  readonly package: FunctionPackageHost;
  readonly sdk?: FunctionSdkHost;
  start(request: FunctionHostStart): Promise<FunctionHostStarted>;
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
  /**
   * The host's master switch for scripted workflows (EAT-R485), read on every call like the grants: false refuses an
   * admitted request as workflows-disabled in either hostMode, before the saved source is read and before either launcher
   * runs, whatever the grants. A host without such a switch leaves it out.
   */
  workflowsEnabled?(ctx: ExtensionContext): boolean;
  /** Host-set cap for the model-facing text; clamped into the pure module's accepted interval. */
  replyMaxBytes?: number;
  /** The function branch (packet P04); a host that composes no function hosting leaves it absent. */
  functions?: WorkflowFunctionDeps;
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

/** A JSON copy of a value, frozen at every object and list, so the host holds none of the request's own objects (RF13). */
function frozenJson(value: unknown): JsonValue {
  const freeze = (item: JsonValue): JsonValue => {
    if (typeof item === "object" && item !== null) {
      for (const member of Object.values(item)) freeze(member);
      Object.freeze(item);
    }
    return item;
  };
  return freeze(JSON.parse(JSON.stringify(value ?? null)) as JsonValue);
}
/** A chain refusal's reason as the reply carries it: the deciding layer's own code, then that layer's fixed reason (RF06-RF10, RF15, RF17). */
function chainRefusal(refused: FunctionChainRefused): string {
  if (refused.layer === "authority") return `${refused.refusal.policy}: ${refused.refusal.reason}`;
  return `${refused.refusal.code}: ${refused.refusal.reason}`;
}
type FunctionLaunchResult = { readonly nativeRefs: readonly NativeRef[] } | { readonly code: ExecuteLaunchRefusal; readonly reason: string };
/**
 * The function branch's steps 1 to 4 (module header). The chain runs on after the reply: its writer lease is held until the
 * function's run settles, and a rejection after the host started is the run's own record (src/index.ts records it on the task).
 */
async function launchFunction(
  functions: WorkflowFunctionDeps,
  ctx: ExtensionContext,
  toolCallId: string,
  admission: ExecuteAdmission,
  input: unknown,
  scope: ExecuteFunctionLaunch["scope"],
): Promise<FunctionLaunchResult> {
  const { definition, invocationId } = admission;
  const entrypoint = MECHANICAL_REVIEWED_ENTRYPOINTS.find(entry => entry.id === definition.id);
  if (entrypoint === undefined) return { code: "unsupported-definition-kind", reason: "the definition names no reviewed Mechanical entrypoint" };
  if (admission.hostMode !== "embedded") return { code: "unsupported-definition-kind", reason: "only an embedded function launch is hosted" };
  const data = frozenJson(withoutBeadsNotes(input));
  let report: (nativeRefs: readonly NativeRef[]) => void = () => undefined;
  const started = new Promise<readonly NativeRef[]>(resolve => {
    report = resolve;
  });
  try {
    const chain = dispatchFunctionChain({ admission, contract: functions.contract, workspace: scope.workspace }, functions.chainHost(ctx), grant =>
      functions.run(ctx, Object.freeze({ invocationId, toolCallId, definition, entrypoint, input: data, inputDigest: admission.inputDigest, grant, scope }), nativeRefs =>
        report(nativeRefs),
      ),
    );
    chain.catch(() => undefined);
    const first = await Promise.race([started.then(nativeRefs => ({ nativeRefs })), chain.then(outcome => ({ outcome }))]);
    if ("nativeRefs" in first) return first;
    if (first.outcome.status === "refused") return { code: "launch-failed", reason: chainRefusal(first.outcome) };
    return { code: "launch-failed", reason: "the installed host settled the run without reporting a native reference" };
  } catch (error) {
    return { code: "launch-failed", reason: message(error) };
  }
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
      // EAT-R485: the master switch closes this launch door in both hostModes; nothing is read or launched past it.
      if (deps.workflowsEnabled !== undefined && !deps.workflowsEnabled(ctx)) {
        const disabled = refusedLaunch("workflows-disabled", WORKFLOWS_DISABLED_REASON);
        return textResult(sanitizeWorkbenchJsonText(envelope(buildWorkflowExecuteReply(decision, disabled.outcome, maxBytes), disabled.code, maxBytes, scope.workspace), maxBytes));
      }
      const { admission } = decision;
      // The function branch (module header): only where hosting is composed, decided before the detach conjunction and the script path.
      if (admission.definition.kind === "function" && deps.functions !== undefined) {
        const launchScope = Object.freeze({ workspace: scope.workspace, principal: scope.principal, sessionId: deps.sessionIdOf(ctx) });
        const launched = await launchFunction(deps.functions, ctx, toolCallId, admission, params.input, launchScope);
        const result: { outcome: LaunchOutcome; code: ExecuteLaunchRefusal | undefined } =
          "nativeRefs" in launched ? { outcome: { status: "launched", nativeRefs: launched.nativeRefs }, code: undefined } : refusedLaunch(launched.code, launched.reason);
        return textResult(sanitizeWorkbenchJsonText(envelope(buildWorkflowExecuteReply(decision, result.outcome, maxBytes), result.code, maxBytes, scope.workspace), maxBytes));
      }
      let launchCode: ExecuteLaunchRefusal | undefined;
      let outcome: LaunchOutcome;
      const refuse = (code: ExecuteLaunchRefusal, reason: string): void => {
        const refusal = refusedLaunch(code, reason);
        launchCode = refusal.code;
        outcome = refusal.outcome;
      };
      outcome = { status: "refused", reason: "launch refused" };
      // EAT-R337 criterion 1 (claim C118): at the request forms the EAT-R337 criterion 1 cases of test/workbench-execute-tool.test.ts list, the kind is
      // judged before the detach conjunction: a function or furnace-formula definition refuses unsupported-definition-kind, never missing-detach-grant; other forms are NOT CLAIMED.
      if (admission.definition.kind !== "script") {
        refuse("unsupported-definition-kind", "only script definitions launch in this host");
      } else if (admission.hostMode === "detached" && !rights.includes(DETACH_GRANT)) {
        refuse("missing-detach-grant", `detached hostMode requires both ${EXECUTE_GRANT} and ${DETACH_GRANT}; execute alone never reaches a detached launch`);
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
