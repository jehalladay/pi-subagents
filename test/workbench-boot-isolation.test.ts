/**
 * wb-cax.10: a Pi install with the Workbench disabled must not load the native
 * SDKs at extension boot (docs/workbench/17: optional SDKs behind validated
 * feature config; standard upstream features keep working when disabled).
 *
 * The four factories below are isolation TRIPWIRES under the standing marker
 * exemption (a vi.mock whose factory only throws is permitted; one returning a
 * value is a forbidden behavior mock): if booting the disabled extension — or
 * merely importing src/index.js — reaches any native SDK module, the throw
 * names the leak. Nothing is faked; the enabled path is covered by every
 * other suite with the real modules.
 */
import { describe, expect, it, vi } from "vitest";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

vi.mock("@furnace/sdk", () => {
  throw new Error("disabled Workbench boot must not load @furnace/sdk");
});
vi.mock("@forge/sdk", () => {
  throw new Error("disabled Workbench boot must not load @forge/sdk");
});
vi.mock("@hyperunix/sdk", () => {
  throw new Error("disabled Workbench boot must not load @hyperunix/sdk");
});
vi.mock("@anthropic-ai/claude-agent-sdk", () => {
  throw new Error("disabled Workbench boot must not load the Claude Agent SDK");
});

describe("extension boot isolation with the Workbench disabled (wb-cax.10)", () => {
  // The whole extension graph is imported inside the test (so the tripwires see
  // it); under a full-suite run that import alone can exceed the default budget.
  it("activates and registers its standard tools without touching a native SDK", { timeout: 60_000 }, async () => {
    const sandbox = hermeticDir({ settings: { workflowsEnabled: false } });
    try {
      const { default: subagentsExtension } = await import("../src/index.js");
      const pi = makePi();
      subagentsExtension(pi.pi);
      await pi.lifecycle.get("session_start")?.({}, ctx({ cwd: sandbox.dir }));
      // The standard upstream surface still registers; no workbench tool does.
      expect(pi.tools.size).toBeGreaterThan(0);
      expect(pi.tools.get("workflow_reconcile")).toBeUndefined();
      expect(pi.tools.get("workbench_catalog")).toBeUndefined();
    } finally {
      sandbox.restore();
    }
  });
});
