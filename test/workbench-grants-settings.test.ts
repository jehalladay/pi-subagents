/** Host configuration is an explicit finite permission grant, not provider registration. */
import { afterEach, describe, expect, it } from "vitest";
import { loadSettings } from "../src/settings.js";
import { hermeticDir } from "./helpers/boot-extension.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; });

describe("Workbench explicit capability grants", () => {
  it("retains the operator's finite grant list", () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude", capabilityGrants: ["forge:inspect"] } } });
    expect(loadSettings(sandbox.dir).workbench).toMatchObject({ capabilityGrants: ["forge:inspect"] });
  });
  it("does not manufacture grants when only the Claude executor is selected", () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude" } } });
    expect(loadSettings(sandbox.dir).workbench).not.toHaveProperty("capabilityGrants");
  });
  it.each(["*", "", "forge:*", "forge:inspect\n", 42])("refuses malformed grant %j", grant => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude", capabilityGrants: [grant] } } });
    expect(() => loadSettings(sandbox!.dir)).toThrow(/capabilityGrants/);
  });
  it("refuses an unbounded non-list grant", () => {
    sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "claude", capabilityGrants: "forge:inspect" } } });
    expect(() => loadSettings(sandbox!.dir)).toThrow(/capabilityGrants/);
  });
});
