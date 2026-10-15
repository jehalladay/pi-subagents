/**
 * W22-G (wb-cax.5): typed degradation-policy conformance.
 *
 * docs/workbench/17-packaging-and-operations.md section "Error and degradation
 * policy" says two things this suite pins at runtime, over the existing
 * fixture seams only (the documented ClaudeQuery injection and the real
 * CapabilityRegistry; no new src seam, the SDK module is never mocked):
 *
 *   D1 "Missing Claude auth -> clear config error; do not silently use Pi model."
 *   D2 "Unsupported provider version -> capability unavailable diagnostic; no
 *       fictitious CLI fallback."
 *
 * Registration-surface behaviour is wb-cax.4 territory and is not touched.
 */
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";
import { tmpdir } from "node:os";
import type { SDKAssistantMessageError, SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AgentManager } from "../src/agent-manager.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { runWorkflow, type WorkflowSpawnResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "degradation", description: "degradation policy probe" };\n';
const CWD = tmpdir();
const SECRET = "sk-ant-api03-ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdef";
/** The typed config-error code D1 requires at the head of the outcome (claude-host.ts). */
const AUTH_CODE = "CLAUDE_AUTH_REQUIRED";

afterEach(() => {
  vi.restoreAllMocks();
  // Put the builtin's named ESM exports back in step with its restored default export (see D2a).
  syncBuiltinESMExports();
});

/** Every Pi AgentManager entry point throws if reached: the never-Pi-model falsifier. */
function forbidPiManager() {
  return (["spawn", "spawnAndWait", "resume"] as const).map(name =>
    vi.spyOn(AgentManager.prototype, name).mockImplementation(() => {
      throw new Error(`Forbidden Pi manager ${name}`);
    }),
  );
}

/** The SDK's own auth-failure shape: an assistant frame flagged authentication_failed, then an error result. */
function authFailureStream(detail: string): SDKMessage[] {
  const init = { type: "system", subtype: "init", session_id: "sdk-auth", model: "claude-opus-5-5", permissionMode: "dontAsk", tools: [] };
  const assistant = {
    type: "assistant", session_id: "sdk-auth", parent_tool_use_id: null, error: "authentication_failed",
    message: { id: "msg-auth", role: "assistant", model: "claude-opus-5-5", content: [{ type: "text", text: detail }] },
  };
  const result = {
    type: "result", subtype: "success", session_id: "sdk-auth", is_error: true, result: detail, num_turns: 1,
    stop_reason: "end_turn", total_cost_usd: 0, modelUsage: {}, permission_denials: [],
  };
  return [init, assistant, result] as unknown as SDKMessage[];
}

function authQuery(detail: string): { query: ClaudeQuery; calls: number[] } {
  const calls: number[] = [];
  const query: ClaudeQuery = () => {
    calls.push(calls.length);
    const messages = authFailureStream(detail);
    return (async function* () {
      for (const message of messages) yield message;
    })();
  };
  return { query, calls };
}

/** The same failure shape with the assistant frame flagged by a non-auth SDK error instead. */
function flaggedFailureStream(flag: Exclude<SDKAssistantMessageError, "authentication_failed">, detail: string): SDKMessage[] {
  return authFailureStream(detail).map(message => (message.type === "assistant" ? { ...message, error: flag } : message));
}

/** Streams `frames`, then throws `thrown` when given, as the SDK does when its CLI process exits mid-stream. */
function framesQuery(frames: readonly SDKMessage[], thrown?: Error): ClaudeQuery {
  return () => (async function* () {
    for (const frame of frames) yield frame;
    if (thrown) throw thrown;
  })();
}

function spawnRequest() {
  return { agentId: "wf-agent-0", index: 0, prompt: "hello", label: "hello", agentType: "general-purpose" };
}

describe("D1 missing Claude auth is a clear typed config error, never a Pi-model answer", () => {
  it("D1a the host outcome is a typed, sanitized config error that names the auth prerequisite", async () => {
    const managers = forbidPiManager();
    const { query, calls } = authQuery("Invalid API key · Please run /login");
    const host = createClaudeWorkflowHost({ cwd: CWD, query });
    const result: WorkflowSpawnResult = await host.spawnAgent(spawnRequest());

    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("text");
    expect(result).not.toHaveProperty("skipped");
    expect(result.error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(result.error).toMatch(/claude \/login/);
    expect(result.error).toMatch(/ANTHROPIC_API_KEY/);
    expect(result.error).toMatch(/does not fall back to a Pi model/);
    expect(result.error).not.toMatch(/\n\s+at /);
    // The attempt was made exactly once, and no Pi path was entered.
    expect(calls).toHaveLength(1);
    for (const spy of managers) expect(spy).not.toHaveBeenCalled();
  });

  it("D1b through runWorkflow the agent row carries the typed error, yields no value, and no Pi agent runs", async () => {
    const managers = forbidPiManager();
    const { query } = authQuery("Not logged in · Please run /login");
    const host = createClaudeWorkflowHost({ cwd: CWD, query });
    const result = await runWorkflow({ script: `${HEAD}return await agent("hello");`, host });

    const rows = result.progress.filter((entry): entry is Extract<typeof entry, { type: "workflow_agent" }> => entry.type === "workflow_agent");
    const last = rows.at(-1);
    expect(last?.state).toBe("error");
    expect(last?.error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(last?.error).not.toMatch(/Claude SDK query failed/);
    // The agent never produced an answer, so no value can have come from a Pi model either.
    expect(result.value).toBeNull();
    for (const spy of managers) expect(spy).not.toHaveBeenCalled();
  });

  it("D1c an unrelated SDK failure keeps its own wording and is not mislabelled as an auth error", async () => {
    const query: ClaudeQuery = () => (async function* () {
      yield { type: "system", subtype: "init", session_id: "sdk-x", model: "claude-opus-5-5" } as unknown as SDKMessage;
      yield { type: "result", subtype: "success", session_id: "sdk-x", is_error: true, result: "overloaded", modelUsage: {} } as unknown as SDKMessage;
    })();
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(spawnRequest());
    expect(result).toMatchObject({ ok: false, error: "overloaded" });
    expect(result.error).not.toContain(AUTH_CODE);
  });

  it("D1d the catch path: an auth-failed frame, then a thrown SDK error, is still the typed config error and keeps the session", async () => {
    const managers = forbidPiManager();
    const [init, assistant] = authFailureStream("Invalid API key. Please run /login");
    const query = framesQuery([init, assistant], new Error("Claude Code process exited with code 1"));
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(spawnRequest());

    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("text");
    expect(result).not.toHaveProperty("skipped");
    expect(result.error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(result.error).not.toMatch(/Claude SDK query failed/);
    // The thrown wording is the SDK detail the typed error carries.
    expect(result.error).toContain("(SDK detail: Claude Code process exited with code 1)");
    expect(result.sessionId).toBe("sdk-auth");
    for (const spy of managers) expect(spy).not.toHaveBeenCalled();
  });

  it.each(["rate_limit", "overloaded"] as const)("D1e a frame flagged %s is not an auth error, on the result path or the thrown path", async flag => {
    const detail = `API Error: ${flag}`;
    const stream = flaggedFailureStream(flag, detail);
    // The fixture really carries the non-auth flag, so this narrowness pin cannot pass vacuously.
    expect(stream[1]).toMatchObject({ type: "assistant", error: flag });

    const settled = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery(stream) }).spawnAgent(spawnRequest());
    expect(settled).toMatchObject({ ok: false, error: detail });
    expect(settled.error).not.toContain(AUTH_CODE);

    const thrown = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery(stream.slice(0, 2), new Error("Claude Code process exited with code 1")) })
      .spawnAgent(spawnRequest());
    expect(thrown).toMatchObject({ ok: false, error: "Claude SDK query failed: Claude Code process exited with code 1" });
    expect(thrown.error).not.toContain(AUTH_CODE);
  });

  it("D3 mutation falsifier: a credential carried in the SDK's auth detail never reaches the outcome", async () => {
    const { query } = authQuery(`Invalid API key ${SECRET} · Please run /login`);
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(spawnRequest());
    expect(result.error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(result.error).not.toContain(SECRET);
    expect(result.error).not.toContain("sk-ant-api03-ABCDEFGHIJ");
  });

  it("D3b the SDK detail is carried in the outcome and bounded to 160 characters", async () => {
    const { query } = authQuery(`Invalid API key. Please run /login ${"x".repeat(5000)}`);
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(spawnRequest());
    const error = result.error ?? "";

    expect(error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(error.length).toBeLessThan(500);
    const carried = /\(SDK detail: (.*)\)$/s.exec(error)?.[1] ?? "";
    expect(carried.startsWith("Invalid API key. Please run /login x")).toBe(true);
    expect(carried.length).toBeLessThanOrEqual(160);
    expect(carried.endsWith(" [truncated]")).toBe(true);
  });
});

describe("D2 an absent optional provider is a typed capability-unavailable outcome with no fallback", () => {
  function hostWithoutProvider() {
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "present.read", version: "1.0.0", description: "Present", inputSchema: { type: "object" }, effectClass: "read", permissions: ["present:read"], supportedModes: ["invoke"] },
      invoke: async () => ({ ok: true }),
    });
    const sdkCalls: number[] = [];
    const query: ClaudeQuery = () => {
      sdkCalls.push(sdkCalls.length);
      return (async function* () {})();
    };
    const host = createClaudeWorkflowHost({ cwd: CWD, query, capabilities: registry, grants: ["present:read", "invoke:absent.read"] });
    return { host, sdkCalls };
  }

  it("D2a the node outcome is a typed unavailable CapabilityError and nothing is fabricated or spawned", async () => {
    const managers = forbidPiManager();
    const spawnSpies = (["spawn", "spawnSync", "exec", "execFile", "execSync", "execFileSync", "fork"] as const)
      .map(name => vi.spyOn(childProcess, name).mockImplementation(() => {
        throw new Error(`Forbidden child process ${name}`);
      }));
    // vi.spyOn swaps properties on the builtin's default (CJS) export. Every src spawn site imports by NAME, and a
    // named ESM binding follows the default export only once synced, so without this the falsifier is blind to them.
    syncBuiltinESMExports();
    const { host, sdkCalls } = hostWithoutProvider();
    const script = `${HEAD}try { const value = await node("absent.read", {}); return { fabricated: value }; } catch (error) { return { name: error.name, category: error.category, message: error.message }; }`;
    const result = await runWorkflow({ script, host });

    expect(result).toMatchObject({ status: "completed", value: { name: "CapabilityError", category: "unavailable" } });
    expect(result.value).not.toHaveProperty("fabricated");
    expect((result.value as { message: string }).message).toMatch(/Unknown or unavailable capability: absent\.read/);
    // No SDK query (the only route to a claude CLI process), no Pi agent, no child process.
    expect(sdkCalls).toHaveLength(0);
    for (const spy of managers) expect(spy).not.toHaveBeenCalled();
    for (const spy of spawnSpies) expect(spy).not.toHaveBeenCalled();
  });

  it("D2b the unavailable message is sanitized: a credential in the requested id never echoes", async () => {
    const { host } = hostWithoutProvider();
    const script = `${HEAD}try { await node(${JSON.stringify(`absent.${SECRET}`)}, {}); return { fabricated: true }; } catch (error) { return { category: error.category, message: error.message }; }`;
    const result = await runWorkflow({ script, host });
    expect(JSON.stringify(result)).not.toContain(SECRET);
    expect(JSON.stringify(result)).not.toContain('"fabricated"');
  });
});
