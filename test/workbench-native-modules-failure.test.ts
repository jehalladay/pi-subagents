/**
 * wb-cax.10: a native module that cannot load must be reported to every waiter
 * and retried by the next call, never cached as a permanent failure and never
 * answered with a stub. The throwing factory below is an isolation tripwire
 * under the standing marker exemption (it fakes nothing; it makes one SDK
 * module unavailable the way a missing optional install would).
 */
import { describe, expect, it, vi } from "vitest";
import {
  isWorkbenchNativeLoaded,
  loadWorkbenchNative,
  WORKBENCH_NATIVE_UNLOADED,
  workbenchNative,
} from "../src/workbench/native-modules.js";

vi.mock("@hyperunix/sdk", () => {
  throw new Error("native module unavailable in this install");
});

/** The vitest module-mock wrapper carries the factory's error as its cause; a plain rejection carries it as its message. */
function rejectionText(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = error.cause instanceof Error ? error.cause.message : String(error.cause ?? "");
  return `${error.message} ${cause}`;
}

describe("native-modules loader failure path (wb-cax.10)", () => {
  it("reports a failed load to every concurrent waiter, stays unloaded, and retries on the next call", async () => {
    const first = loadWorkbenchNative();
    const second = loadWorkbenchNative();
    expect(rejectionText(await first.then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    expect(rejectionText(await second.then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    expect(isWorkbenchNativeLoaded()).toBe(false);
    expect(() => workbenchNative()).toThrow(WORKBENCH_NATIVE_UNLOADED);
    // A fresh attempt is made rather than the rejected promise being served again.
    expect(rejectionText(await loadWorkbenchNative().then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    expect(isWorkbenchNativeLoaded()).toBe(false);
  });
});
