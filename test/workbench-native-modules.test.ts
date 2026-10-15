/**
 * wb-cax.10: the native-modules loader is the one seam through which the
 * native SDKs enter the process. These tests pin its contract: nothing is
 * reachable synchronously before the load, the load happens once and is
 * shared, the namespace is frozen, and the provider registration order is
 * the one the identity capture has always digested.
 */
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import {
  isWorkbenchNativeLoaded,
  loadWorkbenchNative,
  WORKBENCH_NATIVE_UNLOADED,
  workbenchNative,
} from "../src/workbench/native-modules.js";

const DISCOVER_GRANTS = [
  "discover:forge.gate.status",
  "discover:hyperunix.find",
  "discover:furnace.run.inspect",
  "discover:reactivefiber.render.preview",
];

describe("native-modules loader (wb-cax.10)", () => {
  it("refuses synchronous access by name before anything loaded", () => {
    expect(isWorkbenchNativeLoaded()).toBe(false);
    expect(() => workbenchNative()).toThrow(WORKBENCH_NATIVE_UNLOADED);
  });

  it("loads once, freezes the namespace and shares it with every caller", async () => {
    const [first, second] = await Promise.all([loadWorkbenchNative(), loadWorkbenchNative()]);
    expect(first).toBe(second);
    expect(Object.isFrozen(first)).toBe(true);
    expect(isWorkbenchNativeLoaded()).toBe(true);
    expect(workbenchNative()).toBe(first);
    expect(await loadWorkbenchNative()).toBe(first);
    expect(typeof first.Furnace).toBe("function");
    expect(typeof first.createClaudeWorkflowHost).toBe("function");
    expect(typeof first.createClaudeObserver).toBe("function");
    expect(typeof first.readClaudeTranscript).toBe("function");
    expect(typeof first.connectDetachedWorkflow).toBe("function");
    expect(typeof first.launchDetachedWorkflow).toBe("function");
  });

  it("registers the four native read capabilities in the identity-capture order", async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, process.cwd());
    const ids = registry.discover({ grants: DISCOVER_GRANTS }).map(descriptor => descriptor.id);
    expect(ids).toEqual(["forge.gate.status", "hyperunix.find", "furnace.run.inspect", "reactivefiber.render.preview"]);
  });
});
