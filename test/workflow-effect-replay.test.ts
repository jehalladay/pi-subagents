/**
 * workflow-effect-replay.test.ts — the task/journal split for SDK node effects.
 *
 * Settled-agent prefix replay and SDK `node()` operations live in one journal
 * file but under two contracts (docs/workbench/08, 05):
 *
 *   - agents keep the legacy prefix rule, byte-for-byte on the legacy host;
 *   - a node is journaled with the effect class its host declared at invoke
 *     time, and a resume admits it per class: a "read" may replay — marked
 *     stale, never fresh — while any journaled non-read effect neither re-runs
 *     nor silently replays. The run stops on an uncertain-effect diagnostic
 *     that names the owning producer.
 *
 * The Claude host regains settled-agent prefix replay here, gated on a policy
 * basis recorded per entry, so a changed host model/permission policy still
 * declines the cache (pinned separately in workbench-host-contract.test.ts).
 */

import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { nodeJournalKey, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import {
  runWorkflow,
  type WorkflowHost,
  type WorkflowSpawnRequest,
  type WorkflowSpawnResult,
} from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "effects", description: "effect replay probe" };\n';

const run = (body: string, options: Omit<Parameters<typeof runWorkflow>[0], "script">) =>
  runWorkflow({ script: HEAD + body, ...options });

/** Record the journal a run writes, so the next run can resume from it. */
function recorder() {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, append: (entry: WorkflowJournalEntry) => entries.push(entry) };
}

interface EffectHost {
  host: WorkflowHost;
  spawns: WorkflowSpawnRequest[];
  nodeCalls: unknown[];
}

/**
 * A host with agents, a node capability, and (optionally) a declared effect
 * class — the shape the Claude host presents, without the SDK.
 */
function effectHost(options: {
  effect?: "read" | "write" | "external" | "unknown";
  node?: (input: unknown) => unknown;
  reply?: (request: WorkflowSpawnRequest) => WorkflowSpawnResult;
} = {}): EffectHost {
  const spawns: WorkflowSpawnRequest[] = [];
  const nodeCalls: unknown[] = [];
  return {
    spawns,
    nodeCalls,
    host: {
      async spawnAgent(request) {
        spawns.push(request);
        return options.reply ? options.reply(request) : { ok: true, text: `live:${request.prompt}` };
      },
      abortAgent() {},
      async callNode(request) {
        nodeCalls.push(request.input);
        return options.node ? options.node(request.input) : { answer: "live" };
      },
      ...(options.effect !== undefined ? { describeNodeEffect: () => options.effect } : {}),
    },
  };
}

const nodeDone = (result: { progress: readonly { type: string }[] }) =>
  result.progress.filter(
    (entry): entry is Extract<(typeof result.progress)[number], { type: "workflow_node" }> =>
      entry.type === "workflow_node",
  );

describe("node journal entries", () => {
  it("journals a read node with its capability, key and host-declared effect class", async () => {
    const { host } = effectHost({ effect: "read", node: () => ({ answer: 42 }) });
    const journal = recorder();

    const result = await run('return await node("record.read", { value: "x" });', { host, journal });

    expect(result.status).toBe("completed");
    expect(journal.entries).toEqual([
      {
        kind: "node",
        index: 0,
        key: nodeJournalKey("record.read", JSON.stringify({ value: "x" })),
        ok: true,
        capabilityId: "record.read",
        effectClass: "read",
        text: JSON.stringify({ answer: 42 }),
      },
    ]);
  });

  it("journals a non-read node as the effect it was, without a replayable payload", async () => {
    // The attempt has to be on the record — that is what a later resume trips
    // over — but storing the result would invite exactly the silent replay the
    // policy forbids.
    const { host } = effectHost({ effect: "write" });
    const journal = recorder();

    const result = await run('return await node("effect.write", { value: "x" });', { host, journal });

    expect(result.status).toBe("completed");
    expect(journal.entries).toHaveLength(1);
    expect(journal.entries[0]).toMatchObject({
      kind: "node",
      index: 0,
      ok: true,
      capabilityId: "effect.write",
      effectClass: "write",
    });
    expect(journal.entries[0].text).toBeUndefined();
  });

  it("journals a failed node too, so resume positions stay aligned", async () => {
    const { host } = effectHost({
      effect: "read",
      node: () => {
        throw new Error("backend away");
      },
    });
    const journal = recorder();

    const result = await run('return await node("record.read", { value: "x" });', { host, journal });

    expect(result.status).toBe("failed");
    expect(journal.entries[0]).toMatchObject({ kind: "node", index: 0, ok: false, effectClass: "read" });
  });
});

describe("read effect replay", () => {
  const script = 'return await node("record.read", { value: "x" });';

  it("replays a journaled read without invoking the capability again", async () => {
    const first = effectHost({ effect: "read", node: () => ({ answer: "recorded" }) });
    const journal = recorder();
    await run(script, { host: first.host, journal });

    const second = effectHost({ effect: "read", node: () => ({ answer: "fresh" }) });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ answer: "recorded" });
    expect(second.nodeCalls).toHaveLength(0);
  });

  it("marks a replayed read as stale, never fresh", async () => {
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    const live = await run(script, { host: first.host, journal });
    // A live node's snapshot establishes no freshness claim of its own…
    expect(nodeDone(live).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });

    const second = effectHost({ effect: "read" });
    const replayed = await run(script, { host: second.host, journal: { entries: journal.entries } });

    // …but a journaled answer is affirmatively not current, and the row says so.
    expect(nodeDone(replayed).at(-1)).toMatchObject({ state: "done", freshness: "stale" });
  });

  it("re-records a replayed read, so a resume can itself be resumed", async () => {
    const first = effectHost({ effect: "read" });
    const one = recorder();
    await run(script, { host: first.host, journal: one });

    const two = recorder();
    await run(script, {
      host: effectHost({ effect: "read" }).host,
      journal: { entries: one.entries, append: two.append },
    });

    expect(two.entries).toEqual(one.entries);
  });

  it("keeps the settled-agent prefix intact across a replayed read", async () => {
    const script = 'const a = await agent("first");\nawait node("record.read", { value: "x" });\nreturn await agent("second");';
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    await run(script, { host: first.host, journal });

    const second = effectHost({ effect: "read" });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(result.replayedCount).toBe(2);
    expect(second.spawns).toHaveLength(0);
    expect(second.nodeCalls).toHaveLength(0);
  });

  it("runs a read live when its input changed, and ends the prefix there", async () => {
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    await run(
      'await agent("first");\nawait node("record.read", { value: "old" });\nreturn await agent("second");',
      { host: first.host, journal },
    );

    const second = effectHost({ effect: "read" });
    const result = await run(
      'await agent("first");\nawait node("record.read", { value: "new" });\nreturn await agent("second");',
      { host: second.host, journal: { entries: journal.entries } },
    );

    expect(result.status).toBe("completed");
    expect(result.replayedCount).toBe(1);
    expect(second.nodeCalls).toEqual([{ value: "new" }]);
    expect(second.spawns.map(spawn => spawn.prompt)).toEqual(["second"]);
  });

  it("re-runs a read the journal recorded as failed", async () => {
    const broken = effectHost({
      effect: "read",
      node: () => {
        throw new Error("backend away");
      },
    });
    const journal = recorder();
    const first = await run(script, { host: broken.host, journal });
    expect(first.status).toBe("failed");

    const second = effectHost({ effect: "read", node: () => ({ answer: "retried" }) });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ answer: "retried" });
    expect(second.nodeCalls).toHaveLength(1);
  });

  it("re-runs live when the journal carries no effect metadata", async () => {
    // A journal recorded by a host that declared nothing keeps today's
    // semantics: the node runs live and the prefix ends there. The runtime
    // cannot retroactively grant replay to an entry nobody vouched for.
    const first = effectHost({});
    const journal = recorder();
    await run(script, { host: first.host, journal });
    expect(journal.entries[0].effectClass).toBeUndefined();

    const second = effectHost({});
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(second.nodeCalls).toHaveLength(1);
  });

  it("does not replay a read the current host cannot vouch for", async () => {
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    await run(script, { host: first.host, journal });

    const second = effectHost({});
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(second.nodeCalls).toHaveLength(1);
  });
});

describe("non-read effects on resume", () => {
  const script = 'await agent("first");\nawait node("effect.write", { value: "x" });\nreturn await agent("second");';

  it("neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect", async () => {
    const first = effectHost({ effect: "write" });
    const journal = recorder();
    const one = await run(script, { host: first.host, journal });
    expect(one.status).toBe("completed");

    const second = effectHost({ effect: "write" });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    // The reconcile hint names the owning producer and the way out.
    expect(result.error).toContain("effect.write");
    expect(result.error).toContain('producer "effect"');
    expect(result.error).toContain("resumeFromRunId");
    // The effect was not re-executed, and the run did not continue past it.
    expect(second.nodeCalls).toHaveLength(0);
    expect(second.spawns).toHaveLength(0);
  });

  it("refuses even when the call at that position changed", async () => {
    // A different input is a different operation, but the recorded write at
    // this position still happened — the resume cannot step over it.
    const first = effectHost({ effect: "write" });
    const journal = recorder();
    await run('return await node("effect.write", { value: "old" });', { host: first.host, journal });

    const second = effectHost({ effect: "write" });
    const result = await run('return await node("effect.write", { value: "new" });', {
      host: second.host,
      journal: { entries: journal.entries },
    });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(second.nodeCalls).toHaveLength(0);
  });

  it("refuses a journaled read whose capability now declares an effect", async () => {
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    await run('return await node("record.read", { value: "x" });', { host: first.host, journal });

    const second = effectHost({ effect: "write" });
    const result = await run('return await node("record.read", { value: "x" });', {
      host: second.host,
      journal: { entries: journal.entries },
    });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(second.nodeCalls).toHaveLength(0);
  });

  it("carries the recorded effect forward into the new journal", async () => {
    // A resume that stopped on the uncertainty must leave its own journal just
    // as protective — otherwise resuming the failed resume would re-run the
    // write blindly after all.
    const first = effectHost({ effect: "write" });
    const one = recorder();
    await run(script, { host: first.host, journal: one });

    const two = recorder();
    const result = await run(script, {
      host: effectHost({ effect: "write" }).host,
      journal: { entries: one.entries, append: two.append },
    });

    expect(result.status).toBe("failed");
    const carried = two.entries.find(entry => entry.kind === "node");
    expect(carried).toMatchObject({ kind: "node", capabilityId: "effect.write", effectClass: "write" });
  });
});

/* --------------------------------------------------------------------------
 * Claude host direction: settled-agent prefix replay returns, under a policy
 * basis, and the host stamps each node's registry effect class.
 * ------------------------------------------------------------------------ */

const sdkMessages = (sessionId = "sdk-session-1") => [
  { type: "system", subtype: "init", session_id: sessionId, model: "claude-opus-5-5", permissionMode: "dontAsk", tools: [], cwd: "/tmp" },
  { type: "assistant", session_id: sessionId, uuid: "m1", parent_tool_use_id: null,
    message: { id: "msg1", model: "claude-opus-5-5", role: "assistant", content: [{ type: "text", text: "OK" }], usage: { input_tokens: 4, output_tokens: 3 } } },
  { type: "result", subtype: "success", session_id: sessionId, uuid: "r1", is_error: false, result: "OK",
    structured_output: undefined, modelUsage: { "claude-opus-5-5": { inputTokens: 4, outputTokens: 3, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 } },
    usage: { input_tokens: 4, output_tokens: 3 }, total_cost_usd: 0.01 },
] as const;

function sdkQuery(calls: Array<{ prompt: string; options: Record<string, unknown> }>) {
  return ({ prompt, options }: { prompt: string; options: Record<string, unknown> }) => {
    calls.push({ prompt, options });
    return (async function* () { for (const message of sdkMessages()) yield message; })();
  };
}

const SCHEMA = { type: "object", properties: { value: { type: "string" } }, required: ["value"], additionalProperties: false };

function claudeRegistry(effectClass: "read" | "write") {
  const invocations: unknown[] = [];
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      id: effectClass === "read" ? "record.read" : "effect.write",
      version: "1.0.0",
      description: "fixture capability",
      inputSchema: SCHEMA,
      effectClass,
      permissions: ["fixture:grant"],
      supportedModes: ["invoke"],
    },
    async invoke(input) {
      invocations.push(input);
      return { echoed: input };
    },
  });
  return { registry, invocations };
}

describe("Claude host effect policy", () => {
  it("replays settled agents under an unchanged policy basis", async () => {
    const script = 'return await agent("same prompt");';
    const calls: Array<{ prompt: string; options: Record<string, unknown> }> = [];
    const journal = recorder();
    const first = createClaudeWorkflowHost({ cwd: "/tmp", model: "claude-opus-5-5", query: sdkQuery(calls) });
    await runWorkflow({ script: HEAD + script, host: first, journal });

    expect(journal.entries[0].basis).toBeDefined();

    const second = createClaudeWorkflowHost({ cwd: "/tmp", model: "claude-opus-5-5", query: sdkQuery(calls) });
    const rerun = await runWorkflow({ script: HEAD + script, host: second, journal: { entries: journal.entries } });

    expect(rerun.status).toBe("completed");
    expect(rerun.replayedCount).toBe(1);
    expect(calls).toHaveLength(1);
  });

  it("stamps the registry's effect class into node journal entries", async () => {
    const { registry } = claudeRegistry("read");
    const host = createClaudeWorkflowHost({
      cwd: "/tmp", query: sdkQuery([]), capabilities: registry, grants: ["fixture:grant"],
    });
    const journal = recorder();

    const result = await runWorkflow({
      script: `${HEAD}return await node("record.read", { value: "x" });`,
      host,
      journal,
    });

    expect(result.status).toBe("completed");
    expect(journal.entries[0]).toMatchObject({ kind: "node", capabilityId: "record.read", effectClass: "read" });
  });

  it("refuses to resume past a write the Claude host journaled", async () => {
    const script = `${HEAD}return await node("effect.write", { value: "x" });`;
    const first = claudeRegistry("write");
    const journal = recorder();
    const one = await runWorkflow({
      script,
      host: createClaudeWorkflowHost({ cwd: "/tmp", query: sdkQuery([]), capabilities: first.registry, grants: ["fixture:grant"] }),
      journal,
    });
    expect(one.status).toBe("completed");
    expect(journal.entries[0]).toMatchObject({ kind: "node", effectClass: "write" });

    const second = claudeRegistry("write");
    const rerun = await runWorkflow({
      script,
      host: createClaudeWorkflowHost({ cwd: "/tmp", query: sdkQuery([]), capabilities: second.registry, grants: ["fixture:grant"] }),
      journal: { entries: journal.entries },
    });

    expect(rerun.status).toBe("failed");
    expect(rerun.capabilityError?.category).toBe("uncertain-effect");
    expect(second.invocations).toHaveLength(0);
  });
});
