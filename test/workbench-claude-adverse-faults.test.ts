/**
 * VC-1 / W02-D: the offline NON-cancellation adverse-journey tier (wb-a2g.9).
 *
 * docs/workbench/04 § "Tests" lists the negatives of the Claude host: inaccessible
 * cwd, malformed native output, stream error after partial text, and "No false
 * successful tool or domain verdict after SDK result error". The cancellation
 * half lives in workbench-claude-cancel-faults.test.ts (wb-a2g.2); absent
 * credentials in wb-cax.5; transcript privacy in wb-dc0.1.
 *
 * The REAL createClaudeWorkflowHost is driven through its one documented fixture
 * seam, `ClaudeWorkflowHostOptions.query`. The SDK module is never mocked; there
 * is no network, no credential and no timer. Each journey asserts the exact typed
 * outcome, that `ok` is never true, that `skipped` is never set on a
 * non-cancellation failure, and that every string that originates in SDK text has
 * passed redactWorkbenchText. The injected query() call count stands in for "the
 * Pi AgentManager path is never entered": the host imports neither AgentManager
 * nor createAgentSession, so the only execution path is the fixture query.
 *
 * It proves fixture behaviour at the seam, never native SDK behaviour.
 */
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ModelUsage, SDKMessage, SDKResultError, SDKResultSuccess } from "@anthropic-ai/claude-agent-sdk";
import { afterEach, describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type CompiledSchema, compileJsonSchema } from "../src/workflow/json-schema.js";
import type { WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { FakeClaudeSdk, sdkAssistantText, sdkInit, sdkResultSuccess, sdkSuccess } from "./helpers/claude-sdk-stream.js";

const CWD = tmpdir();
const SESSION = "adverse-session-1";
const BEARER_SECRET = "Bearer abcDEF123456SECRETtoken";
const JSON_SECRET = '"password": "hunter2hunter2"';
const BEARER_VALUE = "abcDEF123456SECRETtoken";
const JSON_VALUE = "hunter2hunter2";

const fakes: FakeClaudeSdk[] = [];
const scratch: string[] = [];
afterEach(() => {
  for (const fake of fakes.splice(0)) fake.release();
  for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true });
});

function fakeSdk(script?: ConstructorParameters<typeof FakeClaudeSdk>[0]): FakeClaudeSdk {
  const fake = new FakeClaudeSdk(script);
  fakes.push(fake);
  return fake;
}

function request(schema?: CompiledSchema, agentId = "wf-agent-0"): WorkflowSpawnRequest {
  return { agentId, index: 0, prompt: "adverse prompt", label: agentId, agentType: "general-purpose", ...(schema ? { schema } : {}) };
}

function answerSchema(): CompiledSchema {
  const compilation = compileJsonSchema({
    type: "object",
    properties: { answer: { type: "string" } },
    required: ["answer"],
    additionalProperties: false,
  });
  if (!compilation.ok) throw new Error(compilation.message);
  return compilation.compiled;
}

/** A scripted stream: the messages are pushed up front and the stream closes after them. */
function scripted(messages: readonly SDKMessage[]) {
  return fakeSdk({
    script: call => {
      call.push(...messages);
      call.end();
    },
  });
}

/** A success result with the fields a test varies; everything else is the helper's shape. */
function success(overrides: Partial<SDKResultSuccess>, base: SDKMessage = sdkResultSuccess(SESSION, "done")): SDKMessage {
  return { ...(base as SDKResultSuccess), ...overrides } as SDKMessage;
}

function resultError(overrides: Partial<SDKResultError>): SDKMessage {
  const frame: Partial<SDKResultError> = {
    type: "result", subtype: "error_max_turns", session_id: SESSION, is_error: true, num_turns: 1,
    stop_reason: null, total_cost_usd: 0, modelUsage: {}, permission_denials: [], errors: [], ...overrides,
  };
  return frame as SDKMessage;
}

/** A frame under a discriminant the host does not recognise, dressed as a success. */
function unknownFrame(type: string): SDKMessage {
  return { type, session_id: SESSION, subtype: "success", is_error: false, result: "looks fine", structured_output: { answer: "x" } } as unknown as SDKMessage;
}

function usage(inputTokens: number, outputTokens: number, cacheReadInputTokens: number, cacheCreationInputTokens: number): ModelUsage {
  return {
    inputTokens, outputTokens, cacheReadInputTokens, cacheCreationInputTokens,
    webSearchRequests: 0, costUSD: 0.01, contextWindow: 200_000, maxOutputTokens: 32_000,
  };
}

async function run(
  sdk: FakeClaudeSdk,
  spawn: WorkflowSpawnRequest = request(),
  extra: { cwd?: string; onMessage?: (message: SDKMessage) => void } = {},
): Promise<WorkflowSpawnResult> {
  const host = createClaudeWorkflowHost({ cwd: extra.cwd ?? CWD, query: sdk.query, ...(extra.onMessage ? { onMessage: extra.onMessage } : {}) });
  return host.spawnAgent(spawn);
}

/** Facts true of every journey here: not a success, not a cancellation, no SDK text left unredacted. */
function expectPlainFailure(result: WorkflowSpawnResult): string {
  expect(result.ok).toBe(false);
  expect(result).not.toHaveProperty("text");
  expect(result.skipped).toBeUndefined();
  expect(typeof result.error).toBe("string");
  expect(result.error).not.toBe("");
  const error = result.error ?? "";
  expect(error).not.toContain(BEARER_VALUE);
  expect(error).not.toContain(JSON_VALUE);
  return error;
}

describe("N1 inaccessible cwd refuses before any query", () => {
  it("a relative cwd yields the typed diagnostic and zero query() calls", async () => {
    const sdk = scripted(sdkSuccess(SESSION, "never"));
    const result = await run(sdk, request(), { cwd: "relative/dir" });
    expect(expectPlainFailure(result)).toBe("Claude SDK cwd is inaccessible: relative/dir.");
    expect(result).not.toHaveProperty("sessionId");
    expect(sdk.calls).toHaveLength(0);
  });

  it("a non-existent absolute cwd yields the typed diagnostic and zero query() calls", async () => {
    const root = mkdtempSync(join(tmpdir(), "wb-a2g9-"));
    scratch.push(root);
    const missing = join(root, "does-not-exist");
    expect(existsSync(missing)).toBe(false);
    const sdk = scripted(sdkSuccess(SESSION, "never"));
    const result = await run(sdk, request(), { cwd: missing });
    expect(expectPlainFailure(result)).toBe(`Claude SDK cwd is inaccessible: ${missing}.`);
    expect(sdk.calls).toHaveLength(0);
  });

  it("control: an accessible cwd reaches the query exactly once", async () => {
    const sdk = scripted(sdkSuccess(SESSION, "ok"));
    const result = await run(sdk);
    expect(result).toMatchObject({ ok: true, text: "ok", sessionId: SESSION });
    expect(sdk.calls).toHaveLength(1);
  });
});

describe("N2/N3 malformed native output is never a success", () => {
  it("N2: a declared schema with structured_output undefined reports missing structured_output", async () => {
    const sdk = scripted([sdkInit(SESSION), sdkAssistantText(SESSION, '{"answer":"partial"'), success({ result: '{"answer":"partial"', structured_output: undefined })]);
    const result = await run(sdk, request(answerSchema()));
    expect(expectPlainFailure(result)).toBe("Claude SDK result is missing structured_output.");
    expect(result.sessionId).toBe(SESSION);
    expect(sdk.calls).toHaveLength(1);
  });

  it("N3: a structured_output that fails schema.check reports did not match schema, with no text", async () => {
    const sdk = scripted([sdkInit(SESSION), success({ result: '{"answer":7}', structured_output: { answer: 7 } })]);
    const result = await run(sdk, request(answerSchema()));
    const error = expectPlainFailure(result);
    expect(error).toMatch(/^Claude SDK structured output did not match schema: .+/);
    expect(error).not.toContain("missing structured_output");
    expect(result.sessionId).toBe(SESSION);
    expect(sdk.calls).toHaveLength(1);
  });

  it("N3: an extra property is rejected too (additionalProperties:false), never coerced", async () => {
    const sdk = scripted([sdkInit(SESSION), success({ result: "x", structured_output: { answer: "ok", extra: true } })]);
    const result = await run(sdk, request(answerSchema()));
    expect(expectPlainFailure(result)).toMatch(/^Claude SDK structured output did not match schema: /);
  });

  it("control: a conforming structured_output succeeds and the text is its JSON", async () => {
    const sdk = scripted([sdkInit(SESSION), success({ result: "ignored prose", structured_output: { answer: "ok" } })]);
    const result = await run(sdk, request(answerSchema()));
    expect(result).toMatchObject({ ok: true, text: '{"answer":"ok"}', sessionId: SESSION });
  });
});

describe("N4 a success without a session id refuses", () => {
  it("no session_id on init, assistant or result: ok:false and no fabricated sessionId", async () => {
    const bare = (message: SDKMessage): SDKMessage => {
      const copy = { ...message } as Record<string, unknown>;
      delete copy.session_id;
      return copy as unknown as SDKMessage;
    };
    const sdk = scripted([bare(sdkInit(SESSION)), bare(sdkAssistantText(SESSION, "hi")), bare(sdkResultSuccess(SESSION, "hi"))]);
    const result = await run(sdk);
    expect(expectPlainFailure(result)).toBe("Claude SDK succeeded without a session ID.");
    expect(result).not.toHaveProperty("sessionId");
    expect(sdk.calls).toHaveLength(1);
  });
});

describe("N5 usage is reported only when the SDK supplied it", () => {
  const absent = (): SDKMessage => {
    const copy = { ...(sdkResultSuccess(SESSION, "hi") as SDKResultSuccess) } as Record<string, unknown>;
    delete copy.modelUsage;
    return copy as unknown as SDKMessage;
  };

  it("modelUsage absent: tokens and outputTokens are absent properties, not 0 and not null", async () => {
    const result = await run(scripted([sdkInit(SESSION), absent()]));
    expect(result).toMatchObject({ ok: true, sessionId: SESSION });
    expect(result).not.toHaveProperty("tokens");
    expect(result).not.toHaveProperty("outputTokens");
  });

  it("modelUsage {}: tokens and outputTokens are absent properties", async () => {
    const result = await run(scripted([sdkInit(SESSION), success({ modelUsage: {} })]));
    expect(result.ok).toBe(true);
    expect(result).not.toHaveProperty("tokens");
    expect(result).not.toHaveProperty("outputTokens");
  });

  it("positive control: populated modelUsage sums input+output+cacheRead+cacheCreation across models", async () => {
    const modelUsage = { "claude-opus-5-5": usage(10, 5, 3, 2), "claude-haiku-5-5": usage(1, 1, 1, 1) };
    const result = await run(scripted([sdkInit(SESSION), success({ modelUsage })]));
    expect(result).toMatchObject({ ok: true, tokens: 20 + 4, outputTokens: 6 });
  });

  it("a resume after an absent-usage turn takes no baseline: the later turn reports its full cumulative usage", async () => {
    const queue: SDKMessage[][] = [
      [sdkInit(SESSION), success({ modelUsage: {} })],
      [sdkInit(SESSION), success({ modelUsage: { "claude-opus-5-5": usage(10, 5, 3, 2) } })],
    ];
    const calls: number[] = [];
    const host = createClaudeWorkflowHost({
      cwd: CWD,
      getSession: async () => ({ sessionId: SESSION }) as Awaited<ReturnType<NonNullable<Parameters<typeof createClaudeWorkflowHost>[0]["getSession"]>>>,
      query: () => {
        calls.push(calls.length);
        const messages = queue[calls.length - 1] ?? [];
        return (async function* () { yield* messages; })();
      },
    });
    const first = await host.spawnAgent(request());
    expect(first.ok).toBe(true);
    expect(first).not.toHaveProperty("tokens");
    const second = await host.resumeAgent?.("wf-agent-0", "again");
    expect(second).toMatchObject({ ok: true, tokens: 20, outputTokens: 5 });
    expect(calls).toHaveLength(2);
  });
});

/** A query that yields `messages`, then throws `failure` from the stream; counts its invocations. */
function throwingQuery(messages: readonly SDKMessage[], failure: unknown) {
  const counter = { calls: 0 };
  const query = (): AsyncIterable<SDKMessage> => {
    counter.calls++;
    return (async function* () {
      yield* messages;
      throw failure;
    })();
  };
  return { counter, query };
}

describe("N6 a non-abort stream throw after partial text is failed, never cancelled", () => {
  it("is ok:false with the query-failed prefix, the init session id, and a redacted diagnostic", async () => {
    const { counter, query } = throwingQuery(
      [sdkInit(SESSION), sdkAssistantText(SESSION, "partial answer")],
      new Error(`socket reset while sending ${BEARER_SECRET} and ${JSON_SECRET}`),
    );
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(request());
    const error = expectPlainFailure(result);
    expect(error).toMatch(/^Claude SDK query failed: socket reset while sending /);
    expect(error).toContain("[REDACTED]");
    expect(error).not.toContain("cancelled");
    expect(result.sessionId).toBe(SESSION);
    expect(counter.calls).toBe(1);
  });

  it("a thrown non-Error value is stringified and redacted the same way", async () => {
    const { query } = throwingQuery([], `raw ${BEARER_SECRET}`);
    const result = await createClaudeWorkflowHost({ cwd: CWD, query }).spawnAgent(request());
    const error = expectPlainFailure(result);
    expect(error).toMatch(/^Claude SDK query failed: raw /);
    expect(result).not.toHaveProperty("sessionId");
  });
});

describe("N7 an unrecognised message discriminant is never terminal", () => {
  it.each(["result_v2", "final", "completion"])("a success-looking `%s` frame ends as stream-without-result, forwarded once", async type => {
    const seen: SDKMessage[] = [];
    const frame = unknownFrame(type);
    const sdk = scripted([sdkInit(SESSION), frame]);
    const result = await run(sdk, request(), { onMessage: message => seen.push(message) });
    expect(expectPlainFailure(result)).toBe("Claude SDK stream ended without a result message.");
    expect(result.sessionId).toBe(SESSION);
    expect(seen.filter(message => message === frame)).toHaveLength(1);
    expect(sdk.calls).toHaveLength(1);
  });

  it("with a declared schema an unknown frame carrying structured_output still never succeeds", async () => {
    const sdk = scripted([sdkInit(SESSION), unknownFrame("result_v2")]);
    const result = await run(sdk, request(answerSchema()));
    expect(expectPlainFailure(result)).toBe("Claude SDK stream ended without a result message.");
  });
});

describe("N8 error-subtype results are never a success", () => {
  it("error_max_turns reports the redacted errors text", async () => {
    const sdk = scripted([sdkInit(SESSION), resultError({ errors: [`turn limit; upstream said ${BEARER_SECRET}`, JSON_SECRET] })]);
    const result = await run(sdk);
    const error = expectPlainFailure(result);
    expect(error).toMatch(/^turn limit; upstream said \[REDACTED\]; /);
    expect(error).toContain("[REDACTED]");
    expect(result.sessionId).toBe(SESSION);
    expect(sdk.calls).toHaveLength(1);
  });

  it.each(["error_max_turns", "error_during_execution", "error_max_budget_usd", "error_max_structured_output_retries"] as const)(
    "%s with errors [] falls back to the subtype label, never an empty string",
    async subtype => {
      const result = await run(scripted([sdkInit(SESSION), resultError({ subtype, errors: [] })]));
      expect(expectPlainFailure(result)).toBe(subtype);
    },
  );

  it("an error subtype with is_error:false is still not a success", async () => {
    const result = await run(scripted([sdkInit(SESSION), resultError({ is_error: false, errors: ["budget exhausted"] })]));
    expect(expectPlainFailure(result)).toBe("budget exhausted");
  });

  it("subtype success with is_error:true reports the redacted result text", async () => {
    const sdk = scripted([sdkInit(SESSION), success({ is_error: true, result: `API error: ${BEARER_SECRET} ${JSON_SECRET}` })]);
    const result = await run(sdk);
    const error = expectPlainFailure(result);
    expect(error).toMatch(/^API error: \[REDACTED\]/);
    expect(error).toContain("[REDACTED]");
  });

  it("an error result under a declared schema never reaches schema validation", async () => {
    const result = await run(scripted([sdkInit(SESSION), resultError({ errors: ["nope"] })]), request(answerSchema()));
    expect(expectPlainFailure(result)).toBe("nope");
  });
});
