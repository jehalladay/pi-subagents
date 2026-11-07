/**
 * wb-wupg (MWI B-detached-grants, EAT-R012/EAT-R013): the exact Claude tool right the local-detached preflight checks,
 * `claude:tool:<name>` (validateRequest, src/workbench/hosts/local-detached.ts: one exact grant per configured Claude
 * tool), as the six src modules READERS lists read it in a workbench.capabilityGrants list, so the operator can hold the
 * tool rights the detached Claude launches of test/workbench-detached-grants.test.ts need.
 *
 * The tool right's form, as each READERS module spells it (TOOL_FORM below): `claude:tool:`, a letter, then up to 63
 * letters, digits, `_` or `-`. Cut #3 (refusal #2 of cut #2 0f18bc3f, item U5, member GP7-F1 and its witness W-F1; the
 * second-stage cap R-B657, the enumerate-the-resolvable form) adds CONTROL_TOOL_GRANTS and narrows every claim of this
 * file to its lists. CLAIMED, through the entry point each READERS row calls and beside that row's base grants:
 *   - each TOOL_GRANTS right leaves the row's answer for its base grants alone unchanged, and that answer is not the
 *     row's unknown-permission-data answer;
 *   - each MALFORMED_TOOL_GRANTS right gets the row's unknown-permission-data answer;
 *   - each CONTROL_TOOL_GRANTS right gets it too: claude:tool:Read with one character of CONTROLS - which a row here
 *     holds equal to the Unicode Cc category, U+0000 to U+001F and U+007F to U+009F - before the right, before the tool
 *     name, after its R or after its d.
 * The src scan: the .ts files under src/ whose text carries BASE_FORM are exactly the READERS modules, in READERS order,
 * and so are the .ts files under src/ whose text carries TOOL_FORM.
 * NOT CLAIMED by this file: a right outside those three lists (another character, place or number of characters); a
 * module outside READERS, and a file under src/ that is not a .ts file; a module that parses the capabilityGrants grammar
 * under any other spelling (an escaped hyphen, a reordered character class, a pattern built at run time), and a second
 * grammar reader inside a module READERS already lists (refusal #1 of cut #1 1c3cc1a4, item U5: the rows judge each
 * listed module only through the entry point they call). NAMED RESIDUALS: none.
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

const TOOL_GRANTS: readonly string[] = ["claude:tool:Read", "claude:tool:mcp__docs__search", "claude:tool:mcp__docs-v2__search", `claude:tool:${"T".repeat(64)}`];
const TAB = String.fromCodePoint(9);
const NUL = String.fromCodePoint(0);
const LF = String.fromCodePoint(10);
const MALFORMED_TOOL_GRANTS: readonly string[] = [
  "claude:tool:*", "claude:tool:", "claude:tool:Read:write", "claude:tool:Bash(git:*)", "claude:tool:Read*", "claude:tool: Read",
  "claude:tool:Read ", "claude:tool:9lives", "claude:tool:_Read", "CLAUDE:tool:Read", "claude:Tool:Read", "claude:tool:Read\n",
  `claude:tool:${"T".repeat(65)}`, "claude:tool:-Read", "Claude:tool:Read", `claude:tool:${TAB}Read`, `claude:tool:Read${TAB}`,
  `claude:tool:${NUL}Read`, `claude:tool:Re${NUL}ad`, `claude:tool:${LF}Read`,
];
/** The Unicode Cc category, U+0000 to U+001F and U+007F to U+009F, one string each (cut #3). */
const CONTROLS: readonly string[] = [...Array.from({ length: 0x20 }, (_, code) => code), ...Array.from({ length: 0x21 }, (_, offset) => 0x7f + offset)].map(code =>
  String.fromCodePoint(code),
);
/** claude:tool:Read with one character of CONTROLS before the right, before the tool name, after its R and after its d (cut #3, W-F1). */
const CONTROL_TOOL_GRANTS: readonly string[] = CONTROLS.flatMap(control => [`${control}claude:tool:Read`, `claude:tool:${control}Read`, `claude:tool:R${control}ead`, `claude:tool:Read${control}`]);
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

/** A src module whose source carries the grammar's exact spellings: a grant list it reads, and what it answers for unknown permission data. */
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

describe("the claude:tool:<name> rights TOOL_GRANTS, MALFORMED_TOOL_GRANTS and CONTROL_TOOL_GRANTS list, as each READERS module reads them", () => {
  it("READERS is exactly the .ts files under src/ whose text carries BASE_FORM, and exactly those whose text carries TOOL_FORM", () => {
    expect(READERS.map(reader => reader.module)).toEqual([
      "src/settings.ts", "src/workbench/claude-capability-tools.ts", "src/workbench/control.ts", "src/workbench/execute.ts",
      "src/workbench/reconcile-decision.ts", "src/workbench/validate-reply.ts",
    ]);
    expect(sourcesCarrying(BASE_FORM)).toEqual(READERS.map(reader => reader.module));
    expect(sourcesCarrying(TOOL_FORM)).toEqual(READERS.map(reader => reader.module));
  });

  it.each(READERS.map(reader => [reader.module, reader] as const))("%s: each TOOL_GRANTS right beside the row's base grants leaves its answer unchanged, and that answer is not unknown permission data", (_module, reader) => {
    const held = reader.outcome(reader.base);
    expect(held).not.toBe(reader.unknown);
    for (const tool of TOOL_GRANTS) expect(reader.outcome([...reader.base, tool]), tool).toBe(held);
  });

  it.each(READERS.map(reader => [reader.module, reader] as const))("%s: each MALFORMED_TOOL_GRANTS right beside the row's base grants is unknown permission data, never a partial grant", (_module, reader) => {
    for (const malformed of MALFORMED_TOOL_GRANTS) expect(reader.outcome([...reader.base, malformed]), JSON.stringify(malformed)).toBe(reader.unknown);
  });

  it("cut #3: CONTROLS is exactly the Unicode Cc category, and CONTROL_TOOL_GRANTS holds each of its characters in each of the four places", () => {
    const category: string[] = [];
    for (let code = 0; code <= 0x10ffff; code++) {
      const character = String.fromCodePoint(code);
      if (/^\p{Cc}$/u.test(character)) category.push(character);
    }
    expect(CONTROLS).toEqual(category);
    expect(CONTROL_TOOL_GRANTS).toHaveLength(4 * category.length);
    expect(new Set(CONTROL_TOOL_GRANTS).size).toBe(CONTROL_TOOL_GRANTS.length);
  });

  it.each(READERS.map(reader => [reader.module, reader] as const))("cut #3 W-F1, %s: each CONTROL_TOOL_GRANTS right beside the row's base grants is unknown permission data", (_module, reader) => {
    for (const control of CONTROL_TOOL_GRANTS) expect(reader.outcome([...reader.base, control]), JSON.stringify(control)).toBe(reader.unknown);
  });
});
