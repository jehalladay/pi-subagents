/**
 * wb-f5y (W03, role/tool/model config and permissions): the Claude host's tool policy and its least-privilege wiring.
 *
 * Spec lines pinned:
 * - docs/workbench/04 "Spawn algorithm" step 1: "Validate request, agentType, model alias, effort, schema, tool policy,
 *   workspace materialization, requested isolation."
 * - docs/workbench/04 "Tests": "Negative: ... invalid tool policy."
 * - docs/workbench/12 "Authorization design": "Treat unknown permission data as deny."
 * - the bead: "tool policy / permission mode wiring for Claude sessions, least-privilege default. Acceptance: rejected
 *   disallowed access."
 *
 * The REAL createClaudeWorkflowHost runs behind its one documented fixture seam, `ClaudeWorkflowHostOptions.query`
 * (FakeClaudeSdk): the SDK module is never mocked, nothing is spawned, nothing touches the network.
 *
 * CLAIMED, case by case:
 * - TP-1: each MALFORMED_TOOL_NAMES entry in the host tool list is refused before any SDK query: the spawn settles
 *   ok false with the typed tool-policy diagnostic, which names the entry by position and never echoes it, and
 *   neither beforeDispatch nor query() is called.
 * - TP-2: the same, for each entry in a configured role's tool list.
 * - TP-3: a tool list that is not an array of strings (the SDK's preset object, a number entry, a null entry) is
 *   refused the same way.
 * - TP-4: each EXACT_TOOL_LISTS list reaches query() unchanged as options.tools, once (a repeated name included).
 * - TP-5: the refusal reads the effective list (the role's own list, else the workbench default): a role with its own
 *   exact list runs under a malformed workbench default, which still refuses a general-purpose spawn and a role that
 *   names no tools of its own.
 * - TP-6: with nothing configured, query() receives permissionMode dontAsk, permissionPrompts none, settingSources []
 *   and tools [], and no allowedTools or mcpServers.
 * - TP-7: a configured permissionMode default and settingSources reach query() as configured, still with
 *   permissionPrompts none.
 * NOT CLAIMED by this file: how the native SDK or CLI interprets any tool name, permission mode or prompt setting
 * (fixture seam only); the detached host's own grant preflight (test/workbench-detached-grants.test.ts); settings
 * loading (src/settings.ts is unchanged); a live role run.
 */
import type { Options } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { type ClaudeWorkflowHostOptions, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

const CWD = process.cwd();
const SESSION = "sdk-session-f5y";
const POLICY_PREFIX = "Invalid Claude SDK tool policy: ";
const NUL = String.fromCodePoint(0);
const TAB = String.fromCodePoint(9);
const LF = String.fromCodePoint(10);
const DEL = String.fromCodePoint(0x7f);
const CYRILLIC_IE = String.fromCodePoint(0x435);

/** Names that are not one exact tool name: a wildcard, a rule pattern, whitespace, a control, a bad first character, a long or confusable name. */
const MALFORMED_TOOL_NAMES: readonly string[] = [
  "*", "", "Bash(git:*)", "Read*", " Read", "Read ", "Read:write", "9lives", "_Read", "-Read", "mcp__*",
  "T".repeat(65), `Re${NUL}ad`, `${TAB}Read`, `Read${LF}`, `Read${DEL}`, `R${CYRILLIC_IE}ad`,
];

/** Lists of exact tool names: built-ins, MCP-style names, the 64-character bound, a repeated name and the empty list. */
const EXACT_TOOL_LISTS: readonly (readonly string[])[] = [
  ["Read"], ["Read", "Grep", "Glob"], ["mcp__docs__search", "mcp__docs-v2__search"], ["T".repeat(64)], ["Read", "Read"], [],
];

const request = (overrides: Partial<WorkflowSpawnRequest> = {}): WorkflowSpawnRequest => ({
  agentId: "wf-agent-0", index: 0, prompt: "Say OK", label: "f5y", agentType: "general-purpose", ...overrides,
});

function completingSdk(): FakeClaudeSdk {
  return new FakeClaudeSdk({ script: call => { call.push(...sdkSuccess(SESSION, "OK")); call.end(); } });
}

interface Spawned {
  readonly result: WorkflowSpawnResult;
  readonly calls: readonly Options[];
  readonly dispatches: number;
}

async function spawnUnder(config: Omit<ClaudeWorkflowHostOptions, "cwd" | "query">, spawn: WorkflowSpawnRequest = request()): Promise<Spawned> {
  const sdk = completingSdk();
  let dispatches = 0;
  const host = createClaudeWorkflowHost({ cwd: CWD, ...config, query: sdk.query, beforeDispatch: () => { dispatches++; } });
  const result = await host.spawnAgent(spawn);
  sdk.release();
  return { result, calls: sdk.calls.map(call => call.options), dispatches };
}

/** A refusal before any SDK work: the typed diagnostic, no session, no dispatch, no query. */
function expectRefused(spawned: Spawned, label: string): string {
  expect(spawned.result.ok, label).toBe(false);
  expect(spawned.result, label).not.toHaveProperty("skipped");
  expect(spawned.result.sessionId, label).toBeUndefined();
  expect(spawned.result.error?.startsWith(POLICY_PREFIX), label).toBe(true);
  expect(spawned.dispatches, label).toBe(0);
  expect(spawned.calls, label).toHaveLength(0);
  return spawned.result.error ?? "";
}

describe("wb-f5y W03: the Claude host refuses an invalid tool policy before any SDK query", () => {
  it("TP-1: each MALFORMED_TOOL_NAMES entry in the host tool list refuses the spawn by position, never echoed, with zero dispatches and zero query() calls", async () => {
    for (const name of MALFORMED_TOOL_NAMES) {
      const error = expectRefused(await spawnUnder({ tools: ["Read", name] }), JSON.stringify(name));
      // The exact text: the entry is named by its position, so no configured name is echoed into the display.
      expect(error, JSON.stringify(name)).toBe(
        `${POLICY_PREFIX}entry 2 of 2 is not an exact tool name (a letter, then up to 63 letters, digits, "_" or "-"); wildcards and rule patterns are refused.`,
      );
    }
  });

  it("TP-2: each MALFORMED_TOOL_NAMES entry in a role's tool list refuses that role's spawn with zero dispatches and zero query() calls", async () => {
    for (const name of MALFORMED_TOOL_NAMES) {
      const spawned = await spawnUnder({ tools: ["Read"], roles: { reviewer: { prompt: "Review only.", tools: [name] } } }, request({ agentType: "reviewer" }));
      expect(expectRefused(spawned, JSON.stringify(name)), JSON.stringify(name)).toContain("entry 1 of 1 is not an exact tool name");
    }
  });

  it("TP-3: a tool list that is not an array of strings (the SDK preset object, a number entry, a null entry) refuses with zero dispatches and zero query() calls", async () => {
    const preset = { type: "preset", preset: "claude_code" } as unknown as string[];
    expect(expectRefused(await spawnUnder({ tools: preset }), "preset")).toBe(`${POLICY_PREFIX}the tool list must be an array of exact tool names.`);
    expect(expectRefused(await spawnUnder({ tools: ["Read", 7] as unknown as string[] }), "number")).toContain("entry 2 of 2 is not an exact tool name");
    expect(expectRefused(await spawnUnder({ tools: [null] as unknown as string[] }), "null")).toContain("entry 1 of 1 is not an exact tool name");
  });

  it("TP-4: each EXACT_TOOL_LISTS list reaches query() unchanged as options.tools, once", async () => {
    for (const tools of EXACT_TOOL_LISTS) {
      const spawned = await spawnUnder({ tools: [...tools] });
      expect(spawned.result.ok, JSON.stringify(tools)).toBe(true);
      expect(spawned.dispatches, JSON.stringify(tools)).toBe(1);
      expect(spawned.calls, JSON.stringify(tools)).toHaveLength(1);
      expect(spawned.calls[0]?.tools, JSON.stringify(tools)).toEqual(tools);
    }
  });

  it("TP-5: the refusal reads the effective list: a role's own exact list runs under a malformed workbench default, which still refuses a general-purpose spawn", async () => {
    const config = { tools: ["Bash(*)"], roles: { reviewer: { prompt: "Review only.", tools: ["Read"] } } };
    const role = await spawnUnder(config, request({ agentType: "reviewer" }));
    expect(role.result.ok).toBe(true);
    expect(role.calls).toHaveLength(1);
    expect(role.calls[0]?.tools).toEqual(["Read"]);
    expect(expectRefused(await spawnUnder(config), "general-purpose")).toContain("entry 1 of 1 is not an exact tool name");
    const inherited = await spawnUnder({ tools: ["Bash(*)"], roles: { reviewer: { prompt: "Review only." } } }, request({ agentType: "reviewer" }));
    expect(expectRefused(inherited, "role without its own tools")).toContain("entry 1 of 1 is not an exact tool name");
  });
});

describe("wb-f5y W03: least-privilege permission wiring reaches the SDK options", () => {
  it("TP-6: with nothing configured, query() receives permissionMode dontAsk, permissionPrompts none, settingSources [] and tools [], and no allowedTools or mcpServers", async () => {
    const spawned = await spawnUnder({});
    expect(spawned.result.ok).toBe(true);
    expect(spawned.calls).toHaveLength(1);
    const options = spawned.calls[0];
    expect(options).toMatchObject({ permissionMode: "dontAsk", permissionPrompts: "none", settingSources: [], tools: [] });
    expect(options?.allowedTools).toBeUndefined();
    expect(options?.mcpServers).toBeUndefined();
    expect(options?.allowDangerouslySkipPermissions).toBeUndefined();
  });

  it("TP-7: a configured permissionMode default and settingSources reach query() as configured, still with permissionPrompts none", async () => {
    const spawned = await spawnUnder({ permissionMode: "default", settingSources: ["project"], tools: ["Read"] });
    expect(spawned.result.ok).toBe(true);
    expect(spawned.calls).toHaveLength(1);
    expect(spawned.calls[0]).toMatchObject({ permissionMode: "default", permissionPrompts: "none", settingSources: ["project"], tools: ["Read"] });
    expect(spawned.calls[0]?.allowDangerouslySkipPermissions).toBeUndefined();
  });
});
