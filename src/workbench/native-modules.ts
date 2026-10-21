/**
 * native-modules.ts — the one dynamic-import seam for the native SDKs (wb-cax.10).
 *
 * docs/workbench/17 § "Install profile": "optional Claude Agent SDK and provider
 * adapters behind validated feature config. Keep standard upstream features
 * working when Workbench is disabled." Every module that reaches a native SDK
 * at run time (@furnace/sdk, @forge/sdk, @hyperunix/sdk, the Claude Agent SDK)
 * is imported here and only here, and only once the validated workbench
 * settings ask for the Claude backend. A Pi install with the Workbench off
 * therefore boots without resolving a single SDK module; the tripwire is
 * test/workbench-boot-isolation.test.ts. The enabled surface is unchanged: the
 * same functions, loaded once and frozen, reached through `workbenchNative()`
 * after `loadWorkbenchNative()` has settled. Nothing here is a fallback: a
 * synchronous caller that runs before the load is a programming error and is
 * named as one, never answered with a stub.
 */
import type { Furnace } from "@furnace/sdk";
import type { CapabilityRegistry } from "./capability-registry.js";
import type { createClaudeWorkflowHost } from "./claude-host.js";
import type { createClaudeObserver, readClaudeTranscript } from "./claude-transcript.js";
import type { connectDetachedWorkflow, launchDetachedWorkflow } from "./hosts/local-detached.js";
import type { openForgeOperationConnection } from "./providers/forge.js";

/** Host-validated options for native provider registration (wb-973.4, SCG-R4). */
export interface NativeProviderOptions {
  /**
   * The swarm's RF workspace (an absolute path from the validated reactivefiberWorkspaceRoot setting). When present it, and only
   * it, replaces the authorized workspace root for the RF render capability; the other three providers keep the scope.
   */
  readonly reactivefiberWorkspaceRoot?: string;
}

export interface WorkbenchNativeModules {
  readonly Furnace: typeof Furnace;
  readonly createClaudeWorkflowHost: typeof createClaudeWorkflowHost;
  readonly createClaudeObserver: typeof createClaudeObserver;
  readonly readClaudeTranscript: typeof readClaudeTranscript;
  readonly connectDetachedWorkflow: typeof connectDetachedWorkflow;
  readonly launchDetachedWorkflow: typeof launchDetachedWorkflow;
  /** One pinned, owned Forge app-server connection for an operation this host starts and observes (wb-a3s). */
  readonly openForgeOperationConnection: typeof openForgeOperationConnection;
  /**
   * Registers the four native read capabilities on one registry for one
   * authorized workspace root, in the order the identity capture has always
   * seen them (forge, hyperunix, furnace, reactivefiber).
   */
  readonly registerNativeProviders: (registry: CapabilityRegistry, workspaceRoot: string, options?: NativeProviderOptions) => void;
}

export const WORKBENCH_NATIVE_UNLOADED =
  'Workbench native modules are not loaded: validated workbench settings with workflowAgentBackend "claude" load them before any native path is offered.';

let loaded: WorkbenchNativeModules | undefined;
let loading: Promise<WorkbenchNativeModules> | undefined;

async function importAll(): Promise<WorkbenchNativeModules> {
  // Sequential on purpose: the SDK packages are imported by more than one of
  // these modules, and a concurrent first import of the same external module
  // races module mocking in the test runner (the second importer can observe
  // the real module while the mock's factory is still settling). Module
  // evaluation is single-threaded anyway, so nothing is lost.
  const furnaceSdk = await import("@furnace/sdk");
  const claudeHost = await import("./claude-host.js");
  const claudeTranscript = await import("./claude-transcript.js");
  const detached = await import("./hosts/local-detached.js");
  const forge = await import("./providers/forge.js");
  const furnace = await import("./providers/furnace.js");
  const hyperunix = await import("./providers/hyperunix.js");
  const reactivefiber = await import("./providers/reactivefiber.js");
  // Getters, not captured references: every read goes to the module's live
  // binding, exactly as a static import would, so the namespace is a seam and
  // never a snapshot of the functions it fronts.
  return Object.freeze({
    get Furnace() {
      return furnaceSdk.Furnace;
    },
    get createClaudeWorkflowHost() {
      return claudeHost.createClaudeWorkflowHost;
    },
    get createClaudeObserver() {
      return claudeTranscript.createClaudeObserver;
    },
    get readClaudeTranscript() {
      return claudeTranscript.readClaudeTranscript;
    },
    get connectDetachedWorkflow() {
      return detached.connectDetachedWorkflow;
    },
    get launchDetachedWorkflow() {
      return detached.launchDetachedWorkflow;
    },
    get openForgeOperationConnection() {
      return forge.openForgeOperationConnection;
    },
    registerNativeProviders(registry: CapabilityRegistry, workspaceRoot: string, options?: NativeProviderOptions): void {
      forge.registerNativeForgeGateStatus(registry, workspaceRoot);
      hyperunix.registerNativeHyperUnixFind(registry, workspaceRoot);
      furnace.registerNativeFurnaceRunInspect(registry, workspaceRoot);
      reactivefiber.registerNativeReactiveFiberRender(registry, options?.reactivefiberWorkspaceRoot ?? workspaceRoot);
    },
  });
}

/**
 * Loads the native modules once. Concurrent callers share the one in-flight
 * import; a failed import is reported to every waiter and retried by the next
 * call rather than cached, so a transient failure never pins the Workbench off.
 */
export function loadWorkbenchNative(): Promise<WorkbenchNativeModules> {
  if (loaded !== undefined) return Promise.resolve(loaded);
  if (loading === undefined) {
    loading = importAll().then(
      modules => {
        loaded = modules;
        return modules;
      },
      (error: unknown) => {
        loading = undefined;
        throw error;
      },
    );
  }
  return loading;
}

export function isWorkbenchNativeLoaded(): boolean {
  return loaded !== undefined;
}

/**
 * The loaded namespace for synchronous callers that run only after the
 * validated feature config loaded it (tool bodies registered behind the gate,
 * the registry builder those tools call). Anything earlier throws by name.
 */
export function workbenchNative(): WorkbenchNativeModules {
  if (loaded === undefined) throw new Error(WORKBENCH_NATIVE_UNLOADED);
  return loaded;
}
