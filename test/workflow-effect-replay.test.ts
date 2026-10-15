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
  ACKNOWLEDGEMENT_VALUE_CONTRACT,
  type AcknowledgeRecord,
  entryDigestOf,
  type OverrideRecord,
  RECONCILE_CONTRACT_VERSION,
} from "../src/workflow/reconcile.js";
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

/* --------------------------------------------------------------------------
 * The replay basis scopes node reads too (docs/workbench/08, "Side-effect
 * replay policy on resume"): a node entry carries the recording host's basis,
 * and a journaled read comes back only when the current host vouches for the
 * same effect class, basis and key. The tripwire on a journaled effect does
 * not depend on the basis — no basis change licenses re-running a write.
 * ------------------------------------------------------------------------ */

/** {@link effectHost} under a declared replay basis — the shape the Claude and detached hosts present. */
function basisHost(replayBasis: string, options: Parameters<typeof effectHost>[0] = {}): EffectHost {
  const made = effectHost(options);
  return { ...made, host: { ...made.host, replayBasis } };
}

describe("node read replay is scoped by the recording host's basis", () => {
  const script = 'return await node("record.read", { value: "x" });';

  it("stamps the recording host's basis on every node entry: a read, an effect and a failure alike", async () => {
    const read = recorder();
    await run(script, { host: basisHost("basis-A", { effect: "read", node: () => ({ answer: 1 }) }).host, journal: read });
    const write = recorder();
    await run('return await node("effect.write", { value: "x" });', { host: basisHost("basis-A", { effect: "write" }).host, journal: write });
    const failed = recorder();
    await run(script, {
      host: basisHost("basis-A", {
        effect: "read",
        node: () => {
          throw new Error("backend away");
        },
      }).host,
      journal: failed,
    });

    expect(read.entries).toEqual([
      {
        kind: "node",
        index: 0,
        key: nodeJournalKey("record.read", JSON.stringify({ value: "x" })),
        ok: true,
        capabilityId: "record.read",
        effectClass: "read",
        text: JSON.stringify({ answer: 1 }),
        basis: "basis-A",
      },
    ]);
    expect(write.entries).toEqual([
      {
        kind: "node",
        index: 0,
        key: nodeJournalKey("effect.write", JSON.stringify({ value: "x" })),
        ok: true,
        capabilityId: "effect.write",
        effectClass: "write",
        basis: "basis-A",
      },
    ]);
    expect(failed.entries).toEqual([
      {
        kind: "node",
        index: 0,
        key: nodeJournalKey("record.read", JSON.stringify({ value: "x" })),
        ok: false,
        capabilityId: "record.read",
        effectClass: "read",
        basis: "basis-A",
      },
    ]);
  });

  it("replays a journaled read under the same basis, marked stale", async () => {
    const first = basisHost("basis-A", { effect: "read", node: () => ({ answer: "recorded" }) });
    const journal = recorder();
    await run(script, { host: first.host, journal });

    const second = basisHost("basis-A", { effect: "read", node: () => ({ answer: "fresh" }) });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ answer: "recorded" });
    expect(second.nodeCalls).toHaveLength(0);
    expect(nodeDone(result).at(-1)).toMatchObject({ state: "done", freshness: "stale" });
  });

  it("runs a journaled read live when the resuming host declares another basis", async () => {
    // The answer was produced under another workspace, grant set or provider
    // manifest; handing it back would be another contract's answer.
    const first = basisHost("basis-A", { effect: "read", node: () => ({ answer: "recorded" }) });
    const journal = recorder();
    await run(script, { host: first.host, journal });

    const second = basisHost("basis-B", { effect: "read", node: () => ({ answer: "fresh" }) });
    const result = await run(script, { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ answer: "fresh" });
    expect(second.nodeCalls).toEqual([{ value: "x" }]);
    expect(nodeDone(result).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });
  });

  it("runs live a read journaled without a basis once the host declares one, and the reverse", async () => {
    // As for agents: a host that records no basis matches only entries that
    // carry none, so neither side can vouch for the other's answer.
    const unscoped = recorder();
    await run(script, { host: effectHost({ effect: "read" }).host, journal: unscoped });
    expect(unscoped.entries[0].basis).toBeUndefined();
    const scopedResume = basisHost("basis-A", { effect: "read" });
    expect((await run(script, { host: scopedResume.host, journal: { entries: unscoped.entries } })).status).toBe("completed");
    expect(scopedResume.nodeCalls).toHaveLength(1);

    const scoped = recorder();
    await run(script, { host: basisHost("basis-A", { effect: "read" }).host, journal: scoped });
    const unscopedResume = effectHost({ effect: "read" });
    expect((await run(script, { host: unscopedResume.host, journal: { entries: scoped.entries } })).status).toBe("completed");
    expect(unscopedResume.nodeCalls).toHaveLength(1);
  });

  it("re-records a replayed read under its basis, so resuming the resume stays scoped", async () => {
    const one = recorder();
    await run(script, { host: basisHost("basis-A", { effect: "read" }).host, journal: one });

    const two = recorder();
    await run(script, { host: basisHost("basis-A", { effect: "read" }).host, journal: { entries: one.entries, append: two.append } });

    expect(two.entries).toEqual(one.entries);
    expect(two.entries[0]).toMatchObject({ kind: "node", effectClass: "read", basis: "basis-A" });
  });

  it("never re-runs a journaled write because the basis changed", async () => {
    const first = basisHost("basis-A", { effect: "write" });
    const journal = recorder();
    await run('return await node("effect.write", { value: "x" });', { host: first.host, journal });

    const second = basisHost("basis-B", { effect: "write" });
    const result = await run('return await node("effect.write", { value: "x" });', { host: second.host, journal: { entries: journal.entries } });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(second.nodeCalls).toHaveLength(0);
  });

  it("declines a read the Claude host journaled under another grant set, and replays it under the same one", async () => {
    const script = `${HEAD}return await node("record.read", { value: "x" });`;
    const host = (registry: CapabilityRegistry, grants: string[]) =>
      createClaudeWorkflowHost({ cwd: "/tmp", query: sdkQuery([]), capabilities: registry, grants });
    const first = claudeRegistry("read");
    const journal = recorder();
    expect((await runWorkflow({ script, host: host(first.registry, ["fixture:grant"]), journal })).status).toBe("completed");
    expect(journal.entries[0]).toMatchObject({ kind: "node", effectClass: "read", basis: expect.any(String) });

    const same = claudeRegistry("read");
    const replayed = await runWorkflow({ script, host: host(same.registry, ["fixture:grant"]), journal: { entries: journal.entries } });
    expect(replayed.status).toBe("completed");
    expect(same.invocations).toHaveLength(0);
    expect(nodeDone(replayed).at(-1)).toMatchObject({ state: "done", freshness: "stale" });

    const widened = claudeRegistry("read");
    const live = await runWorkflow({
      script,
      host: host(widened.registry, ["fixture:grant", "fixture:other"]),
      journal: { entries: journal.entries },
    });
    expect(live.status).toBe("completed");
    expect(widened.invocations).toEqual([{ value: "x" }]);
    expect(nodeDone(live).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });
  });
});

describe("replayed read nodes are counted as journal provenance", () => {
  const script = 'const a = await agent("first");\nconst r = await node("record.read", { value: "x" });\nreturn [a, r];';

  it("counts a replayed read node apart from replayed agents and marks its row", async () => {
    const first = effectHost({ effect: "read" });
    const journal = recorder();
    const live = await run(script, { host: first.host, journal });
    expect(live.replayedCount).toBe(0);
    expect(live.replayedNodeCount).toBe(0);
    expect(nodeDone(live).at(-1)).not.toHaveProperty("cached");

    const second = effectHost({ effect: "read" });
    const resumed = await run(script, { host: second.host, journal: { entries: journal.entries } });
    expect(resumed.status).toBe("completed");
    // One agent and one node came back from the journal; neither is folded into the other's count.
    expect(resumed.replayedCount).toBe(1);
    expect(resumed.replayedNodeCount).toBe(1);
    expect(second.spawns).toHaveLength(0);
    expect(second.nodeCalls).toHaveLength(0);
    expect(nodeDone(resumed).at(-1)).toMatchObject({ state: "done", freshness: "stale", cached: true });
  });

  it("does not count a refused journaled effect or a live re-read as replayed", async () => {
    const writes = recorder();
    await run('return await node("record.write", { value: "x" });', { host: effectHost({ effect: "write" }).host, journal: writes });
    const refused = await run('return await node("record.write", { value: "x" });', { host: effectHost({ effect: "write" }).host, journal: { entries: writes.entries } });
    expect(refused.capabilityError?.category).toBe("uncertain-effect");
    expect(refused.replayedNodeCount).toBe(0);
    expect(nodeDone(refused).at(-1)).not.toHaveProperty("cached");

    const reads = recorder();
    await run('return await node("record.read", { value: "x" });', { host: effectHost({ effect: "read" }).host, journal: reads });
    const live = await run('return await node("record.read", { value: "y" });', { host: effectHost({ effect: "read" }).host, journal: { entries: reads.entries } });
    expect(live.replayedNodeCount).toBe(0);
    expect(nodeDone(live).at(-1)).not.toHaveProperty("cached");
  });
});

describe("a journaled effect carries the producer's native reference when the payload names one", () => {
  const payload = { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", data: { run_id: "frn-run-7", state: "active" } } };
  const script = 'return await node("furnace.run.inspect", { runId: "frn-run-7" });';

  it("records nativeRefs on a non-read entry, keeps no answer, and leaves the entry replay-refusing", async () => {
    const journal = recorder();
    const host = effectHost({ effect: "external", node: () => payload });
    const live = await run(script, { host: host.host, journal });
    expect(live.status).toBe("completed");
    const entry = journal.entries.find(item => item.kind === "node");
    expect(entry).toMatchObject({ capabilityId: "furnace.run.inspect", effectClass: "external", ok: true, nativeRefs: [{ provider: "furnace", type: "run", id: "frn-run-7" }] });
    expect(entry).not.toHaveProperty("text");
    const resumed = await run(script, { host: effectHost({ effect: "external", node: () => payload }).host, journal: { entries: journal.entries } });
    expect(resumed.capabilityError?.category).toBe("uncertain-effect");
  });

  it("records no reference when the payload carries none, and a read entry keeps its text instead", async () => {
    const blank = recorder();
    await run('return await node("record.write", { value: 1 });', { host: effectHost({ effect: "write", node: () => ({ accepted: true }) }).host, journal: blank });
    expect(blank.entries.find(item => item.kind === "node")).not.toHaveProperty("nativeRefs");
    const reads = recorder();
    await run(script, { host: effectHost({ effect: "read", node: () => payload }).host, journal: reads });
    const read = reads.entries.find(item => item.kind === "node");
    expect(read).toHaveProperty("text");
    expect(read).not.toHaveProperty("nativeRefs");
  });
});


/* --------------------------------------------------------------------------
 * Operator reconciliation at a refusing position (wb-g8f part B.2): a resume
 * that meets a journaled effect refuses until a recorded operator decision
 * binds to that exact row — an acknowledgement settles it with an envelope,
 * an override authorizes exactly one re-run and is spent by it.
 * ------------------------------------------------------------------------ */

const RECONCILE_AT = "2026-10-15T09:30:00Z";
const OPERATOR_PRINCIPAL = "local-operator:1:s1";

function reconcileEntryOf(recorded: WorkflowJournalEntry) {
  return {
    index: recorded.index,
    key: recorded.key,
    ok: recorded.ok,
    capabilityId: recorded.capabilityId ?? "",
    effectClass: recorded.effectClass ?? "",
    ...(recorded.basis !== undefined ? { basis: recorded.basis } : {}),
    entryDigest: entryDigestOf(recorded),
  };
}

function acknowledgeRowFor(recorded: WorkflowJournalEntry, changes: Partial<AcknowledgeRecord> = {}): WorkflowJournalEntry {
  const record: AcknowledgeRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "acknowledge",
    acknowledgementId: `ack_${"1".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested",
    taskId: "wf_resume01",
    entry: reconcileEntryOf(recorded),
    scope: { workspace: "/ws", principal: OPERATOR_PRINCIPAL },
    operator: { principal: OPERATOR_PRINCIPAL, role: "local-operator" },
    grant: "reconcile:furnace.acknowledge",
    recordedAt: RECONCILE_AT,
    reason: "inspected the producer by hand",
    determination: "indeterminate",
    evidenceClass: "operator-asserted",
    evidence: [],
    noEvidenceReason: "producer-unavailable",
    settlement: "envelope",
    ...changes,
  };
  return {
    index: recorded.index, key: recorded.key, ok: true, kind: "acknowledge",
    capabilityId: recorded.capabilityId, effectClass: recorded.effectClass, reconcile: record,
  };
}

function overrideRowFor(recorded: WorkflowJournalEntry, changes: Partial<OverrideRecord> = {}): WorkflowJournalEntry {
  const record: OverrideRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "override",
    overrideId: `ovr_${"2".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted",
    taskId: "wf_resume01",
    entry: reconcileEntryOf(recorded),
    scope: { workspace: "/ws", principal: OPERATOR_PRINCIPAL },
    operator: { principal: OPERATOR_PRINCIPAL, role: "local-operator" },
    grant: "reconcile:furnace.override",
    recordedAt: RECONCILE_AT,
    reason: "the effect never happened; re-run it once",
    acknowledgementId: `ack_${"1".repeat(32)}`,
    duplicateRisk: "possible-duplicate",
    confirmation: { confirmed: true, position: recorded.index, capabilityId: recorded.capabilityId ?? "", acceptDuplicateRisk: true },
    ...changes,
  };
  return {
    index: recorded.index, key: recorded.key, ok: true, kind: "override",
    capabilityId: recorded.capabilityId, effectClass: recorded.effectClass, reconcile: record,
  };
}

describe("operator reconciliation at a refusing position", () => {
  const script = 'const v = await node("furnace.run.start", { value: "x" });\nawait agent("after");\nreturn v;';

  async function journaledEffect() {
    const first = effectHost({ effect: "external" });
    const journal = recorder();
    const one = await run(script, { host: first.host, journal });
    expect(one.status).toBe("completed");
    const recorded = journal.entries.find(entry => entry.kind === "node");
    if (recorded === undefined) throw new Error("no node row journaled");
    return { entries: journal.entries, recorded, firstRun: one };
  }

  it("settles an acknowledged position with the envelope, marked stale, and ends the prefix", async () => {
    const { entries, recorded, firstRun } = await journaledEffect();
    // A live run's node rows carry no reconcile provenance.
    expect(nodeDone(firstRun).every(row => row.reconcile === undefined)).toBe(true);

    const second = effectHost({ effect: "external" });
    const rec2 = recorder();
    const result = await run(script, {
      host: second.host,
      journal: { entries: [...entries, acknowledgeRowFor(recorded)], append: rec2.append },
    });

    expect(result.status).toBe("completed");
    expect(result.value).toMatchObject({
      contract: ACKNOWLEDGEMENT_VALUE_CONTRACT, decision: "acknowledged", position: 0,
      capabilityId: "furnace.run.start", producer: "furnace", determination: "indeterminate",
      operator: { principal: OPERATOR_PRINCIPAL },
    });
    expect(result.value).not.toHaveProperty("resolvedValue");
    expect(second.nodeCalls).toHaveLength(0);
    expect(second.spawns).toHaveLength(1);
    expect(result.reconciledNodeCount).toBe(1);
    expect(result.replayedNodeCount).toBe(0);
    const settled = nodeDone(result).find(row => row.state === "done");
    expect(settled).toMatchObject({
      freshness: "stale",
      reconcile: { state: "acknowledged", acknowledgementId: `ack_${"1".repeat(32)}`, principal: OPERATOR_PRINCIPAL },
    });
    expect(settled?.cached).toBeUndefined();
    // Carried forward: the node row verbatim plus the acknowledgement stamped applied.
    expect(rec2.entries.find(entry => entry.kind === "node")).toMatchObject({ capabilityId: "furnace.run.start", effectClass: "external" });
    const applied = rec2.entries.find(entry => entry.kind === "acknowledge");
    expect(applied?.reconcile).toHaveProperty("applied");
  });

  it("keeps an effect-absent acknowledgement refusing, naming the principal and the override path", async () => {
    const { entries, recorded } = await journaledEffect();
    const second = effectHost({ effect: "external" });
    const result = await run(script, {
      host: second.host,
      journal: { entries: [...entries, acknowledgeRowFor(recorded, { determination: "effect-absent", settlement: "none" })] },
    });

    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("uncertain-effect");
    expect(result.error).toContain("effect-absent");
    expect(result.error).toContain(OPERATOR_PRINCIPAL);
    expect(result.error).toContain("override");
    expect(result.error).toContain("workflow_reconcile");
    expect(second.nodeCalls).toHaveLength(0);
    expect(second.spawns).toHaveLength(0);
    const row = nodeDone(result).find(entry => entry.state === "error");
    expect(row?.reconcile).toMatchObject({
      state: "pending", position: 0, producer: "furnace", capabilityId: "furnace.run.start",
      decisions: { acknowledged: 1, overridesLive: 0, overridesSpent: 0 },
    });
  });

  it("appends the binding failure to the hint when a recorded decision does not bind", async () => {
    const { entries, recorded } = await journaledEffect();
    const unbound = acknowledgeRowFor(recorded);
    const result = await run(script, {
      host: effectHost({ effect: "external" }).host,
      journal: { entries: [...entries, { ...unbound, reconcile: { ...(unbound.reconcile as AcknowledgeRecord), entry: { ...reconcileEntryOf(recorded), entryDigest: `sha256:${"0".repeat(64)}` } } }] },
    });
    expect(result.status).toBe("failed");
    expect(result.error).toContain("does not bind");
    expect(result.error).toContain("workflow_reconcile");
  });

  it("re-runs once under a live override, records the consumed copy, and refuses a resume of the resume", async () => {
    const { entries, recorded } = await journaledEffect();
    const decided = [
      ...entries,
      acknowledgeRowFor(recorded, { determination: "effect-absent", settlement: "none" }),
      overrideRowFor(recorded),
    ];
    const second = effectHost({ effect: "external" });
    const rec2 = recorder();
    const result = await run(script, { host: second.host, journal: { entries: decided, append: rec2.append } });

    expect(result.status).toBe("completed");
    expect(second.nodeCalls).toHaveLength(1);
    expect(result.reconciledNodeCount).toBe(1);
    const row = nodeDone(result).find(entry => entry.state === "done");
    expect(row?.reconcile).toMatchObject({
      state: "overridden", overrideId: `ovr_${"2".repeat(32)}`, principal: OPERATOR_PRINCIPAL,
      duplicateRisk: "possible-duplicate", outcome: "re-run-ok",
    });
    // The new journal: a fresh node row, the consumed override, and no carried acknowledgement.
    expect(rec2.entries.find(entry => entry.kind === "node")).toMatchObject({ ok: true, capabilityId: "furnace.run.start", effectClass: "external" });
    const consumed = rec2.entries.find(entry => entry.kind === "override");
    expect(consumed?.reconcile).toMatchObject({ decision: "override", consumed: { outcome: "re-run-ok" } });
    expect(rec2.entries.some(entry => entry.kind === "acknowledge")).toBe(false);

    const third = effectHost({ effect: "external" });
    const again = await run(script, { host: third.host, journal: { entries: rec2.entries } });
    expect(again.status).toBe("failed");
    expect(again.capabilityError?.category).toBe("uncertain-effect");
    expect(third.nodeCalls).toHaveLength(0);
  });

  it("spends the override even when the re-run throws", async () => {
    const { entries, recorded } = await journaledEffect();
    const decided = [...entries, acknowledgeRowFor(recorded), overrideRowFor(recorded)];
    const second = effectHost({
      effect: "external",
      node: () => { throw new Error("boom"); },
    });
    const rec2 = recorder();
    const result = await run(script, { host: second.host, journal: { entries: decided, append: rec2.append } });

    expect(result.status).toBe("failed");
    expect(second.nodeCalls).toHaveLength(1);
    expect(result.reconciledNodeCount).toBe(1);
    const consumed = rec2.entries.find(entry => entry.kind === "override");
    expect(consumed?.reconcile).toMatchObject({ consumed: { outcome: "re-run-failed" } });
    expect(rec2.entries.find(entry => entry.kind === "node")).toMatchObject({ ok: false });
  });
});
