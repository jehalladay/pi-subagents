/**
 * VC-1 / W02-C (wb-a2g.7): where the constant ~2.0 s abort-to-acknowledgement
 * comes from.
 *
 * The live adverse tier measured abort-request-to-acknowledged-cancellation
 * at 2002-2003 ms in every run while late-init latencies varied 3-39 ms. This
 * file reproduces that latency without a credential or a network by driving
 * the REAL createClaudeWorkflowHost over the REAL Claude Agent SDK ProcessTransport
 * (the host's documented query seam only pins the stub executable), against
 * a child process the test controls, and rules on the owner of the interval.
 *
 * Finding: the interval belongs to the SDK. Aborting closes the child's stdin
 * and the SDK's ProcessTransport then waits a fixed 2000 ms for the child to
 * leave on its own before it sends SIGTERM; the query stream (and so the
 * host's onSettled) ends only when the child's stdout closes. A child that
 * leaves on stdin EOF acknowledges in milliseconds. The Workbench host adds
 * no wait of its own: both cases below run through identical host code.
 *
 * This is a real-process, real-clock measurement on purpose (the only timer
 * tier besides the live one); the bounds are wide enough for a loaded gate
 * machine and tight enough to tell 2 s from a few ms.
 */
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";

/** Stub Claude Code executable: answers control requests, emits one system/init frame, then idles. */
const STUB = `
import { createInterface } from "node:readline";
const exitOnEof = process.env.STUB_EXIT_ON_EOF === "1";
const send = (message) => process.stdout.write(JSON.stringify(message) + "\\n");
let initSent = false;
createInterface({ input: process.stdin }).on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (message.type === "control_request") {
    send({ type: "control_response", response: { subtype: "success", request_id: message.request_id, response: {} } });
  }
  if (!initSent) {
    initSent = true;
    send({ type: "system", subtype: "init", session_id: "11111111-2222-4333-8444-555555555555", model: "stub", cwd: process.cwd(), tools: [], mcp_servers: [], permissionMode: "dontAsk", apiKeySource: "none", slash_commands: [], output_style: "default", uuid: "11111111-2222-4333-8444-555555555556" });
  }
});
process.stdin.on("end", () => { if (exitOnEof) process.exit(0); });
setInterval(() => {}, 1000);
`;

const request: WorkflowSpawnRequest = { agentId: "wf-agent-0", index: 0, prompt: "p", label: "wf-agent-0", agentType: "general-purpose" };
const CANCELLED = "Claude SDK query was cancelled.";

let dir = "";
let stubPath = "";
beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "wb-a2g7-"));
  stubPath = join(dir, "stub-claude.mjs");
  writeFileSync(stubPath, STUB);
});
afterAll(() => {
  rmSync(dir, { recursive: true, force: true });
});

/** Abort the run the moment the child's init frame reaches the host; return abort-to-onSettled in ms and the result. */
async function abortToAck(exitOnEof: boolean): Promise<{ ms: number; result: WorkflowSpawnResult }> {
  const controller = new AbortController();
  let abortedAt = 0;
  let ackedAt = 0;
  let settledResult: WorkflowSpawnResult | undefined;
  const host = createClaudeWorkflowHost({
    cwd: dir,
    signal: controller.signal,
    settingSources: [],
    query: ({ prompt, options }) => sdkQuery({
      prompt,
      options: { ...options, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, STUB_EXIT_ON_EOF: exitOnEof ? "1" : "0" } },
    }),
    onMessage: (message) => {
      if (message.type === "system" && message.subtype === "init" && abortedAt === 0) {
        abortedAt = performance.now();
        controller.abort();
      }
    },
    onSettled: (result) => {
      ackedAt = performance.now();
      settledResult = result;
    },
  });
  await host.spawnAgent(request);
  if (settledResult === undefined) throw new Error("onSettled never fired");
  return { ms: ackedAt - abortedAt, result: settledResult };
}

/** The SDK ProcessTransport.close() grace before SIGTERM (sdk.mjs `bqe`), observed on @anthropic-ai/claude-agent-sdk 0.3.300. */
const SDK_SIGTERM_GRACE_MS = 2000;

describe("abort-to-acknowledgement latency (wb-a2g.7)", () => {
  it("a child that ignores stdin EOF is acknowledged only when the SDK's fixed 2000 ms SIGTERM grace elapses", async () => {
    const { ms, result } = await abortToAck(false);
    expect(result).toMatchObject({ ok: false, skipped: true, error: CANCELLED });
    // Reproduces the live 2002-2003 ms: the grace plus a few ms of SIGTERM-to-stdout-close.
    expect(ms).toBeGreaterThanOrEqual(SDK_SIGTERM_GRACE_MS - 50);
    expect(ms).toBeLessThan(SDK_SIGTERM_GRACE_MS + 750);
  }, 20_000);

  it("the same host acknowledges in milliseconds when the child leaves on stdin EOF: the host adds no wait of its own", async () => {
    const { ms, result } = await abortToAck(true);
    expect(result).toMatchObject({ ok: false, skipped: true, error: CANCELLED });
    expect(ms).toBeLessThan(500);
  }, 20_000);
});
