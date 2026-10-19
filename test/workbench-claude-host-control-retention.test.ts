/**
 * wb-cra: the Claude host's live-query retention hooks — the seam workflow_control wiring binds into its registry.
 *
 * The vendored SDK Query extends the message AsyncIterable with interrupt() (sdk.d.ts), so a host that wants to
 * interrupt a live call must see that query object BEFORE its messages are consumed. The host keeps no registry
 * itself: it fires onQueryLive(call, seam) once per query whose stream exposes a function-valued own interrupt,
 * before the first message is read, and onQueryDone(call) in the query's own finally, so a wiring registry can
 * hold and then drop exactly the live queries. The fixture query seam's plain generators expose no interrupt, so
 * existing tests observe no change.
 */
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { sdkSuccess } from "./helpers/claude-sdk-stream.js";

const CALL = { agentId: "wf-agent-0", index: 0, label: "agent-0" };

function host(cwd: string, over: Record<string, unknown>) {
  return createClaudeWorkflowHost({ cwd, ...over } as never);
}
function spawnRequest(over: Record<string, unknown> = {}) {
  return { agentId: CALL.agentId, index: CALL.index, prompt: "hello", label: CALL.label, agentType: "general-purpose", ...over } as never;
}

describe("claude host live-query retention hooks (wb-cra)", () => {
  let dir: string;
  afterEach(() => { rmSync(dir, { recursive: true, force: true }); });

  it("fires onQueryLive with the call identity and a live seam before the first message, then onQueryDone after settle", async () => {
    dir = mkdtempSync(join(tmpdir(), "wb-cra-retention-"));
    const interrupted = vi.fn(async () => "interrupt-received");
    const stream = {
      interrupt: interrupted,
      async *[Symbol.asyncIterator]() {
        yield* sdkSuccess("sess-retention-1", "done");
      },
    };
    const events: string[] = [];
    const onQueryLive = vi.fn((call: ClaudeCallIdentity, seam: { interrupt(): Promise<unknown> }) => {
      events.push(`live:${call.agentId}:${call.index}`);
      void seam;
    });
    const onQueryDone = vi.fn((call: ClaudeCallIdentity) => { events.push(`done:${call.agentId}`); });
    const onMessage = vi.fn(() => { events.push("message"); });
    const h = host(dir, { query: () => stream, onQueryLive, onQueryDone, onMessage });
    const result = await h.spawnAgent(spawnRequest());
    expect(result.ok).toBe(true);
    expect(onQueryLive).toHaveBeenCalledTimes(1);
    expect(events[0]).toBe("live:wf-agent-0:0");
    expect(events).toContain("message");
    expect(events[0]).toBe("live:wf-agent-0:0");
    expect(events.indexOf("live:wf-agent-0:0")).toBeLessThan(events.indexOf("message"));
    expect(events[events.length - 1]).toBe("done:wf-agent-0");
  });

  it("the seam proxies exactly the stream's own interrupt method and nothing else", async () => {
    dir = mkdtempSync(join(tmpdir(), "wb-cra-seam-"));
    const interrupted = vi.fn(async () => "answered");
    let seam: { interrupt(): Promise<unknown> } | undefined;
    const h = host(dir, {
      query: () => ({ interrupt: interrupted, async *[Symbol.asyncIterator]() { yield* sdkSuccess("sess-seam-1", "done"); } }),
      onQueryLive: (_call: ClaudeCallIdentity, s: { interrupt(): Promise<unknown> }) => { seam = s; },
    });
    await h.spawnAgent(spawnRequest());
    expect(seam).toBeDefined();
    await expect(seam!.interrupt()).resolves.toBe("answered");
    expect(interrupted).toHaveBeenCalledTimes(1);
    expect(Object.keys(seam!)).toEqual(["interrupt"]);
  });

  it("fires neither hook for a fixture stream with no interrupt method", async () => {
    dir = mkdtempSync(join(tmpdir(), "wb-cra-plain-"));
    const onQueryLive = vi.fn();
    const onQueryDone = vi.fn();
    const h = host(dir, { query: async function* () { yield* sdkSuccess("sess-plain-1", "done"); }, onQueryLive, onQueryDone });
    const result = await h.spawnAgent(spawnRequest());
    expect(result.ok).toBe(true);
    expect(onQueryLive).not.toHaveBeenCalled();
    expect(onQueryDone).not.toHaveBeenCalled();
  });

  it("a failed query still pairs onQueryDone when onQueryLive fired", async () => {
    dir = mkdtempSync(join(tmpdir(), "wb-cra-fail-"));
    const onQueryLive = vi.fn();
    const onQueryDone = vi.fn();
    const h = host(dir, {
      query: () => ({
        interrupt: async () => undefined,
        [Symbol.asyncIterator]: () => ({ next: async (): Promise<IteratorResult<never>> => { throw new Error("fixture transport failure"); } }),
      }),
      onQueryLive, onQueryDone,
    });
    const result = await h.spawnAgent(spawnRequest());
    expect(result.ok).toBe(false);
    expect(onQueryLive).toHaveBeenCalledTimes(1);
    expect(onQueryDone).toHaveBeenCalledTimes(1);
  });
});
