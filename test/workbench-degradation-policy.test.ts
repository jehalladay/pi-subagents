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
import { safeWorkflowTerminalText } from "../src/ui/workflow-card.js";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "../src/workbench/redaction.js";
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

/**
 * wb-wyr (wb-cax.5 gate F1, owner R1=(a)): every producer-side outcome of claude-host.ts is untrusted SDK text and
 * routes through the one helper with a NAMED layout ("label": a single-line outcome string). A plain redactor upstream
 * of display commits to the separator reading of an invisible inside a credential and consumes the key prefix; the
 * display helper then deletes the glued code point and the tail survives. Driven through the REAL host
 * (createClaudeWorkflowHost.spawnAgent) over the documented ClaudeQuery seam, on every failure path that carries SDK text.
 * Seat rule F11: every invisible code point is built with String.fromCodePoint.
 */
const cpWy = (code: number): string => String.fromCodePoint(code);
const UNSAFE_OUTCOME = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

interface WyProbe {
  readonly id: string;
  readonly raw: string;
  readonly secret: string;
}

/** The ten corpus credential tails the cax.5 gate measured leaking through every census-clean helper (10/756). */
const WY_PROBES: readonly WyProbe[] = [
  ...[0xad, 0x2061, 0x180e, 0x34f, 0xfe0f, 0x200e, 0xe0041, 0x61c].map((code, index) => ({
    id: `I${index + 1} U+${code.toString(16).toUpperCase()} inside a key`,
    raw: `sk-ant-aaaa${cpWy(code)}TAILIGNORABLE${index + 1}`,
    secret: `TAILIGNORABLE${index + 1}`,
  })),
  { id: "Z5 lone surrogate inside a key", raw: `sk-ant-aaaa${cpWy(0xd800)}SURROGATETAIL`, secret: "SURROGATETAIL" },
  { id: "B1 U+FEFF inside a Bearer token", raw: `Bearer abc${cpWy(0xfeff)}BEARERTAIL`, secret: "BEARERTAIL" },
];

function initFrame(): SDKMessage {
  return { type: "system", subtype: "init", session_id: "sdk-wy", model: "claude-opus-5-5", permissionMode: "dontAsk", tools: [] } as unknown as SDKMessage;
}

function resultFrame(fields: Record<string, unknown>): SDKMessage {
  return { type: "result", session_id: "sdk-wy", is_error: true, num_turns: 1, stop_reason: "end_turn", total_cost_usd: 0, modelUsage: {}, permission_denials: [], ...fields } as unknown as SDKMessage;
}

/** The five failure paths that carry SDK text into an outcome: two auth paths, the two result arms, the thrown catch. */
const WY_PATHS: readonly (readonly [name: string, query: (raw: string) => ClaudeQuery])[] = [
  ["auth-flagged frame then error result (authRequiredError, terminal path)", raw => framesQuery(authFailureStream(raw))],
  ["auth-flagged frame then thrown error (authRequiredError, catch path)", raw => framesQuery(authFailureStream(raw).slice(0, 2), new Error(raw))],
  ["unflagged success-subtype error result (terminal.result arm)", raw => framesQuery([initFrame(), resultFrame({ subtype: "success", result: raw })])],
  ["unflagged error-subtype result (terminal.errors arm)", raw => framesQuery([initFrame(), resultFrame({ subtype: "error_during_execution", errors: [raw] })])],
  ["unflagged thrown error (catch message)", raw => framesQuery([initFrame()], new Error(raw))],
];

describe("wb-wyr producer outcomes route through the one helper with a named layout", () => {
  for (const [path, queryFor] of WY_PATHS) {
    it.each(WY_PROBES)(`${path}: $id`, async probe => {
      const result = await createClaudeWorkflowHost({ cwd: CWD, query: queryFor(probe.raw) }).spawnAgent(spawnRequest());
      const error = result.error ?? "";
      expect(result.ok).toBe(false);
      expect(error.length).toBeGreaterThan(0);
      expect(error, `${probe.id} leaked at the producer`).not.toContain(probe.secret);
      expect(error, `${probe.id} kept an unsafe code point at the producer`).not.toMatch(UNSAFE_OUTCOME);
      // The composed display (what a card, a label, a reply or a JSON text then shows) stays clean too.
      for (const shown of [safeWorkflowTerminalText(error), sanitizeWorkbenchText(error, 2000, "label"), sanitizeWorkbenchText(error), sanitizeWorkbenchJsonText({ error })]) {
        expect(shown, `${probe.id} leaked at display`).not.toContain(probe.secret);
      }
    });
  }

  it("G1 the error-subtype detail arm keeps the joined errors and the bare subtype, redacted", async () => {
    const joined = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery([initFrame(), resultFrame({ subtype: "error_during_execution", errors: ["first failure", `second ${SECRET}`] })]) })
      .spawnAgent(spawnRequest());
    expect(joined).toMatchObject({ ok: false });
    expect(joined.error).toMatch(/^first failure; second /);
    expect(joined.error).not.toContain(SECRET);
    const bare = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery([initFrame(), resultFrame({ subtype: "error_max_turns", errors: [] })]) }).spawnAgent(spawnRequest());
    expect(bare).toMatchObject({ ok: false, error: "error_max_turns" });
  });

  it("G2 the terminal auth return keeps the session, the usage and the tool-call count", async () => {
    const [init, assistant, result] = authFailureStream("Invalid API key. Please run /login");
    const usageFrame = { ...(result as object), modelUsage: { "claude-opus-5-5": { inputTokens: 10, outputTokens: 4, cacheReadInputTokens: 1, cacheCreationInputTokens: 2 } } } as unknown as SDKMessage;
    const withTool = { ...(assistant as object), message: { id: "msg-auth", role: "assistant", model: "claude-opus-5-5", content: [{ type: "tool_use", id: "toolu_1", name: "Read", input: {} }] } } as unknown as SDKMessage;
    const settled = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery([init, withTool, usageFrame]) }).spawnAgent(spawnRequest());
    expect(settled.error).toMatch(new RegExp(`^${AUTH_CODE}: `));
    expect(settled).toMatchObject({ ok: false, sessionId: "sdk-auth", tokens: 17, outputTokens: 4, toolCalls: 1 });
  });

  /** An auth-flagged frame, then the run's own abort lands, then the SDK reports its failure on the given path. */
  async function abortedAfterAuthFrame(thrown: boolean): Promise<WorkflowSpawnResult> {
    const controller = new AbortController();
    const [init, assistant, result] = authFailureStream("Invalid API key. Please run /login");
    const query: ClaudeQuery = () => (async function* () {
      yield init;
      yield assistant;
      controller.abort();
      if (thrown) throw new Error("Claude Code process exited with code 1");
      yield result;
    })();
    return createClaudeWorkflowHost({ cwd: CWD, query, signal: controller.signal }).spawnAgent(spawnRequest());
  }

  it.each([["terminal path", false], ["catch path", true]] as const)("G5/G6 a cancel that lands after an auth-flagged frame is a skipped cancellation, never the auth error (%s)", async (_name, thrown) => {
    const outcome = await abortedAfterAuthFrame(thrown);
    expect(outcome).toMatchObject({ ok: false, skipped: true, error: "Claude SDK query was cancelled." });
    expect(outcome.error).not.toContain(AUTH_CODE);
  });

  /**
   * G7: every SDKAssistantMessageError member at SDK 0.3.300 other than authentication_failed is deliberately NOT mapped to
   * the auth error. The Record type makes the table exhaustive: a member added by an SDK upgrade fails strict tsc here until
   * it is classified, and an auth-adjacent member (oauth_org_not_allowed, billing_error, account_on_hold,
   * verification_required, cloud_credential_error) is an asserted exclusion, not an omission.
   */
  const UNMAPPED: Readonly<Record<Exclude<SDKAssistantMessageError, "authentication_failed">, true>> = {
    oauth_org_not_allowed: true, account_on_hold: true, verification_required: true, billing_error: true, rate_limit: true, overloaded: true,
    invalid_request: true, model_not_found: true, server_error: true, unknown: true, max_output_tokens: true, cloud_credential_error: true,
  };

  it.each(Object.keys(UNMAPPED) as (keyof typeof UNMAPPED)[])("G7 a frame flagged %s keeps its own wording on the result path and the thrown path", async flag => {
    const detail = `API Error: ${flag}`;
    const stream = flaggedFailureStream(flag, detail);
    expect(stream[1]).toMatchObject({ type: "assistant", error: flag });
    const settled = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery(stream) }).spawnAgent(spawnRequest());
    expect(settled).toMatchObject({ ok: false, error: detail });
    const thrown = await createClaudeWorkflowHost({ cwd: CWD, query: framesQuery(stream.slice(0, 2), new Error("Claude Code process exited with code 1")) }).spawnAgent(spawnRequest());
    expect(thrown).toMatchObject({ ok: false, error: "Claude SDK query failed: Claude Code process exited with code 1" });
    expect(`${settled.error} ${thrown.error}`).not.toContain(AUTH_CODE);
  });
});
