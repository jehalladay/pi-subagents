/**
 * Side-effect-free wiring for the Furnace ExecutorApp shell in furnace-app.ts.
 * This module never imports @furnace/sdk, so the SDK-shape guard and the
 * root-to-verify / gate-to-project plumbing stay testable without the SDK.
 */
import type { GateObservation } from "./live-gate.js";

export interface FurnaceContext {
  readonly workspace: { readonly root: string };
}
export interface FurnaceResultConstructors {
  success(options: { summary: string; data: Record<string, unknown> }): unknown;
  failure(message: string, options: { failure_class: "task"; data: Record<string, unknown> }): unknown;
  indeterminate(message: string): unknown;
}
export interface FurnaceApp {
  executor(name: string, callback: (ctx: FurnaceContext) => Promise<unknown>): unknown;
}
export interface FurnaceSdk {
  readonly ExecutorApp: new () => FurnaceApp;
  readonly ExecutionResult: FurnaceResultConstructors;
}

/** Refuse an installed module that lacks the Furnace shapes this app relies on; returns the same object. */
export function assertFurnaceSdk(candidate: unknown): FurnaceSdk {
  const installed = candidate as FurnaceSdk;
  if (typeof installed.ExecutorApp !== "function" ||
      typeof installed.ExecutionResult?.indeterminate !== "function") {
    throw new Error("FURNACE_SDK_INCOMPATIBLE: ExecutorApp/ExecutionResult missing");
  }
  return installed;
}

/** Build the mechanical.forge-gate callback: verify the workspace root, then project the observation. */
export function forgeGateCallback(
  sdk: FurnaceSdk,
  env: NodeJS.ProcessEnv,
  verify: (root: string, forgeExecutable?: string) => Promise<GateObservation>,
  project: (gate: GateObservation, result: FurnaceResultConstructors) => unknown,
): (context: FurnaceContext) => Promise<unknown> {
  return async context => {
    const gate = await verify(context.workspace.root, env["MECHANICAL_FORGE_BINARY"] ?? "forge");
    return project(gate, sdk.ExecutionResult);
  };
}
