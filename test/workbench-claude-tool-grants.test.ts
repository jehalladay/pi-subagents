/**
 * wb-wupg (MWI B-detached-grants, EAT-R012/EAT-R013): the exact Claude tool right the local-detached preflight checks,
 * `claude:tool:<name>` (validateRequest, src/workbench/hosts/local-detached.ts: one exact grant per configured Claude
 * tool), is a form workbench.capabilityGrants admits, so the operator can authorize the exact SDK tool rights a detached
 * Claude launch needs (test/workbench-detached-grants.test.ts drives those launches through the registered tools).
 *
 * The form is exact: `claude:tool:` and one tool name, a letter and then up to 63 letters, digits, `_` or `-` (built-in
 * names such as Read, MCP names such as mcp__docs__search). No wildcard, rule pattern, extra segment, space, control
 * character or other case of the prefix reads as one. Every module that parses the capabilityGrants grammar reads the
 * form the same way, so holding a tool right never turns a reader's whole grant list into unknown permission data, and a
 * malformed tool right still does in every one of them. READERS lists those modules; the src scan holds the list to the
 * modules that actually carry the grammar, so a reader added without a row, or a row whose module no longer parses the
 * grammar, reds here.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadSettings } from "../src/settings.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { decideControl } from "../src/workbench/control.js";
import { decideExecute, EXECUTE_GRANT } from "../src/workbench/execute.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { decideReconcile } from "../src/workbench/reconcile-decision.js";
import { buildWorkflowValidateReply } from "../src/workbench/validate-reply.js";
import { hermeticDir } from "./helpers/boot-extension.js";

const TOOL_GRANTS: readonly string[] = ["claude:tool:Read", "claude:tool:mcp__docs__search", `claude:tool:${"T".repeat(64)}`];
const MALFORMED_TOOL_GRANTS: readonly string[] = [
  "claude:tool:*", "claude:tool:", "claude:tool:Read:write", "claude:tool:Bash(git:*)", "claude:tool:Read*", "claude:tool: Read",
  "claude:tool:Read ", "claude:tool:9lives", "claude:tool:_Read", "CLAUDE:tool:Read", "claude:Tool:Read", "claude:tool:Read\n",
  `claude:tool:${"T".repeat(65)}`,
];
const NOW = "2026-11-06T00:00:00Z";
const DIGEST = `sha256:${"ab".repeat(32)}`;

let sandbox: ReturnType<typeof hermeticDir> | undefined;
beforeEach(() => { sandbox = hermeticDir(); });
afterEach(() => { sandbox?.restore(); sandbox = undefined; });

function settingsOutcome(grants: readonly string[]): string {
  const dir = sandbox?.dir;
  if (!dir) throw new Error("no hermetic settings sandbox");
  writeFileSync(join(dir, ".pi", "subagents.json"), JSON.stringify({ workbench: { workflowAgentBackend: "claude", capabilityGrants: grants } }));
  try {
    const held = loadSettings(dir).workbench?.capabilityGrants;
    return JSON.stringify(held) === JSON.stringify(grants) ? "admitted" : `altered:${JSON.stringify(held)}`;
  } catch (error) {
    return error instanceof Error && /capabilityGrants/.test(error.message) ? "refused" : `threw:${String(error)}`;
  }
}
function executeOutcome(grants: readonly string[]): string {
  const decision = decideExecute(
    { definitionRef: { kind: "script", id: "/ws/.pi/workflows/demo.js", schemaVersion: "workflow-script/v1", artifactDigest: DIGEST }, input: {}, hostMode: "embedded" },
    { grants, invocationId: "wf_wupg00000001" },
  );
  return decision.decision === "refused" ? decision.policy : decision.decision;
}
function controlOutcome(grants: readonly string[]): string {
  const decision = decideControl({
    scope: { workspace: "/ws", principal: "local-operator:1:s1" }, principal: { id: "local-operator:1:s1", role: "local-operator" }, grants,
    target: { provider: "furnace", type: "run", id: "frn-run-r1", scope: "/ws" }, action: "stop", params: { confirmed: true },
    invocationId: "inv-wupg-1", requestedAt: NOW,
  }, { projection: new ObservationProjection(), now: () => NOW });
  return decision.decision === "denied" ? decision.policy : decision.decision;
}
function validateOutcome(grants: readonly string[]): string {
  const source = { definition: { kind: "script" as const, id: "/ws/demo.js", schemaVersion: "workflow-script/v1", artifactDigest: DIGEST }, sourceRef: "/ws/demo.js", source: "return 1\n" };
  const { reply } = buildWorkflowValidateReply({ request: { sourceRef: source.sourceRef, digest: DIGEST }, source, grants });
  return reply.status === "refused" ? reply.refusal.code : reply.status;
}
function reconcileOutcome(grants: readonly string[]): string {
  const decision = decideReconcile({
    action: "inspect", taskId: "wf_task01", position: 0, grants, scope: { workspace: "/ws", principal: "local-operator:1:s1" }, sessionId: "s1",
    principal: { id: "local-operator:1:s1", role: "local-operator" }, params: {},
  }, { task: undefined, entries: [], receipts: [], currentEffectClass: () => undefined, now: () => NOW });
  return decision.decision === "denied" ? decision.policy : decision.decision;
}
function curatedToolsOutcome(grants: readonly string[]): string {
  try {
    createCuratedTools({ registry: new CapabilityRegistry(), allowedCapabilities: [], grants, principal: { id: "local-operator", role: "reviewer" }, workspace: "/ws", invocationId: "inv-wupg-1", signal: new AbortController().signal });
    return "admitted";
  } catch (error) {
    return error instanceof Error && /Invalid curated Claude capability policy/.test(error.message) ? "refused" : `threw:${String(error)}`;
  }
}

/** Every module that parses the capabilityGrants grammar: a grant list it reads, and what it answers for unknown permission data. */
interface Reader {
  readonly module: string;
  readonly base: readonly string[];
  readonly unknown: string;
  readonly outcome: (grants: readonly string[]) => string;
}
const READERS: readonly Reader[] = [
  { module: "src/settings.ts", base: ["workbench:execute"], unknown: "refused", outcome: settingsOutcome },
  { module: "src/workbench/claude-capability-tools.ts", base: ["forge:inspect"], unknown: "refused", outcome: curatedToolsOutcome },
  { module: "src/workbench/control.ts", base: ["control:furnace.stop"], unknown: "unknown-permission-data", outcome: controlOutcome },
  { module: "src/workbench/execute.ts", base: [EXECUTE_GRANT], unknown: "unknown-permission-data", outcome: executeOutcome },
  { module: "src/workbench/reconcile-decision.ts", base: ["workbench:design"], unknown: "unknown-permission-data", outcome: reconcileOutcome },
  { module: "src/workbench/validate-reply.ts", base: ["workbench:observe"], unknown: "UNKNOWN_PERMISSION_DATA", outcome: validateOutcome },
];

/** The capabilityGrants grammar's namespace:permission form, as each reader spells it in its source. */
const BASE_FORM = "[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*";
/** The exact Claude tool right's form, as each reader spells it in its source. */
const TOOL_FORM = "claude:tool:[A-Za-z][A-Za-z0-9_-]{0,63}";
function sourcesCarrying(form: string): string[] {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const carrying: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && entry.name.endsWith(".ts") && readFileSync(path, "utf8").includes(form)) carrying.push(relative(root, path));
    }
  };
  visit(join(root, "src"));
  return carrying.sort();
}

describe("the exact claude:tool:<name> grant form, read the same way by every capabilityGrants reader", () => {
  it("READERS is exactly the src modules that carry the grammar, and every one of them carries the exact tool form", () => {
    expect(READERS.map(reader => reader.module)).toEqual([
      "src/settings.ts", "src/workbench/claude-capability-tools.ts", "src/workbench/control.ts", "src/workbench/execute.ts",
      "src/workbench/reconcile-decision.ts", "src/workbench/validate-reply.ts",
    ]);
    expect(sourcesCarrying(BASE_FORM)).toEqual(READERS.map(reader => reader.module));
    expect(sourcesCarrying(TOOL_FORM)).toEqual(READERS.map(reader => reader.module));
  });

  it.each(READERS.map(reader => [reader.module, reader] as const))("%s: an exact tool right beside its grants changes nothing, so it is never unknown permission data", (_module, reader) => {
    const held = reader.outcome(reader.base);
    expect(held).not.toBe(reader.unknown);
    for (const tool of TOOL_GRANTS) expect(reader.outcome([...reader.base, tool]), tool).toBe(held);
  });

  it.each(READERS.map(reader => [reader.module, reader] as const))("%s: a malformed tool right is still unknown permission data, never a partial grant", (_module, reader) => {
    for (const malformed of MALFORMED_TOOL_GRANTS) expect(reader.outcome([...reader.base, malformed]), JSON.stringify(malformed)).toBe(reader.unknown);
  });
});
