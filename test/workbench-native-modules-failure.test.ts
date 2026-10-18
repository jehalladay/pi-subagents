/**
 * wb-cax.10: a native module that cannot load must be reported to every waiter
 * and retried by the next call, never cached as a permanent failure and never
 * answered with a stub. The throwing factory below is an isolation tripwire
 * under the standing marker exemption (it fakes nothing; it makes one SDK
 * module unavailable the way a missing optional install would).
 */
import { beforeAll, describe, expect, it, vi } from "vitest";
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
  // Readiness, not behaviour (wb-nl8.1): the loader's SUCCESSFUL prefix -- importAll's steps 1-3 in native-modules.ts
  // (@furnace/sdk, ./claude-host.js, ./claude-transcript.js), imported here in the loader's own sequential order --
  // becomes resident under its own budget (60_000, the siblings' instrument: workbench-native-modules.test.ts:31,
  // workbench-boot-isolation.test.ts:32), so the row below measures the throwing fourth step and the loader's
  // semantics, not the cold import of ~2.8 s of Vite-inlined pi-coding-agent reached through claude-host for one path
  // helper. claude-transcript imports no hosts/providers, so the hyperunix tripwire is first reached INSIDE the row,
  // from a real import; the guard proves nothing was loaded THROUGH the loader. A hook overrun reports "Hook timed
  // out in 60000ms.", never a loader fact.
  beforeAll(async () => {
    await import("@furnace/sdk");
    await import("../src/workbench/claude-host.js");
    await import("../src/workbench/claude-transcript.js");
    expect(isWorkbenchNativeLoaded()).toBe(false);
  }, 60_000);
  // Instrument constant, not a behavioral assertion: the three sequential load
  // attempts settle in ~3.4s intrinsically (measured 3.35-3.45s across five
  // serial runs at trunk 5516365 and 7346457), leaving 1.6s of headroom under
  // the 5s default -- which timed out deterministically while parallel work
  // runs loaded the host (owner gates cmd_57bde9675662 / cmd_ad1811dbaf03).
  // Cure-in-the-test per the wb-cax.7 F3 rule; assertions unchanged.
  // wb-nl8.1 (2026-10-17): the full suite under the nl8 report flags still reached this cap once in six runs (1934 s
  // aggregate import; 24 verbatim copies pinned to 2 cores with 24 workers red 24/24 at 20.07-20.47 s), so the import
  // cost was hoisted into the hook above and the cap is KEPT: it now bounds only the loader's four-step failure path
  // (re-measured 2026-10-17 at trunk 03e2cce: the row ran 54-55 ms alone and 127-511 ms across 24 copies under the same
  // 2-core/24-worker pin, median 248 ms; the hook ran ~3.6 s alone and ~24 s per copy under that pin, 2.5x inside its
  // 60 s budget), so its effective strictness rises; a lower cap is a separate instrument decision.
  it("reports a failed load to every concurrent waiter, stays unloaded, and retries on the next call", { timeout: 20_000 }, async () => {
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

  // wb-nl8.2 (wb-nl8.1 design Q9): the row above cannot tell a fresh retry from the cached rejection, because vitest serves
  // the mock factory's one failure to every import of the mocked module (measured at trunk 5778421: the factory ran once
  // and two sequential failed loads rejected with the identical Error object), so the rejection text and identity are the
  // same whether or not native-modules.ts resets `loading = undefined` in its rejection handler. The loader's own
  // observable is the PROMISE it returns: concurrent callers share one in-flight promise, and after that promise rejects
  // the next call must build a new one. Removing the reset serves the settled rejected promise again, and this row reds.
  it("returns a new in-flight promise on the call after a failed load, not the cached rejected one", { timeout: 20_000 }, async () => {
    const first = loadWorkbenchNative();
    const concurrent = loadWorkbenchNative();
    expect(concurrent).toBe(first);
    expect(rejectionText(await first.then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    const retry = loadWorkbenchNative();
    expect(retry).not.toBe(first);
    expect(rejectionText(await retry.then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    const afterRetry = loadWorkbenchNative();
    expect(afterRetry).not.toBe(retry);
    expect(rejectionText(await afterRetry.then(() => undefined, (error: unknown) => error))).toMatch(/native module unavailable/);
    expect(isWorkbenchNativeLoaded()).toBe(false);
  });
});
