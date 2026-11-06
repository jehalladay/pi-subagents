/**
 * wb-413a [MWI-replay]: the Claude host binds settled-agent replay to MEASURED dependencies, at the host seam.
 *
 * Program mechanical-workflows-interop-2026-11-04, slice PI-4, requirements EAT-R017..EAT-R021 as written in
 * docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md@0b25e14e
 * (pi-subagents master). The acceptance lines this suite pins, verbatim:
 *  - EAT-R017 "Hold prompt constant and change source Git commit/tree and dirty-file digest; assert recorded answer is not
 *    reused; exact same measured dependencies remain the read-only positive control."
 *  - EAT-R018 "Hold prompt constant and change skill/system instruction bytes; assert recorded answer is not reused; exact
 *    same measured dependencies remain the read-only positive control."
 *  - EAT-R019 "Hold prompt constant and change effective provider version/settings; assert recorded answer is not reused;
 *    exact same measured dependencies remain the read-only positive control."
 *  - EAT-R020 "Mark one dependency unmeasurable; assert a stale coding or verification result is not replayed even if
 *    prompt matches." (adversarial mutant: "Coerce unknown dependency to an empty stable digest.")
 *  - EAT-R021 "Lose settlement after non-read dispatch then resume; assert typed uncertain-effect and no second dispatch;
 *    read-only replay remains visibly stale." (adversarial mutant: "Treat unknown non-read journal row as cache miss and
 *    rerun it.")
 *  - Conditions of EAT-R017..R019: "Existing cwd/model/permissions/settings/tools/roles/grants/principal dimensions remain
 *    unchanged."
 *
 * Here the readings are INJECTED (ClaudeWorkflowHostOptions.replayDependencies), so each row judges the host's use of a
 * reading: a changed reading declines the journal, an equal one replays it, and an unknown one replays nothing (no agent
 * answer, and no journaled node read either: H-R020-NODE-READ). How the
 * embedded Pi host MEASURES each reading is judged by test/workbench-replay-dependency-readers.test.ts (the readers) and
 * test/workbench-replay-dependencies-wiring.test.ts (the registered SubagentWorkflow path over a real Git repository).
 */
import { createHash } from "node:crypto";
import type { SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { ClaudeReplayDependencies, ReplayDependency } from "../src/workbench/replay-dependencies.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow, type WorkflowRunResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "replay-dependencies", description: "measured replay basis probe" };\n';
/** One verification agent: the prompt is held constant across every run of a row. */
const AGENT_SCRIPT = `${HEAD}return await agent("verify the candidate");`;
const RECORDED = "answer under the recorded dependencies";
const CURRENT = "answer under the current dependencies";

const digestOf = (seed: string): string => `sha256:${createHash("sha256").update(seed).digest("hex")}`;
const measured = (seed: string): ReplayDependency => ({ state: "measured", digest: digestOf(seed) });
const unknown = (reason: string): ReplayDependency => ({ state: "unknown", reason });
const BASELINE: ClaudeReplayDependencies = {
  source: measured("source: commit c1, tree t1, candidate k1"),
  instructions: measured("instructions: SKILL.md bytes v1"),
  provider: measured("provider: sdk 0.3.300, contracts p1, settings s1"),
};

/** Deliberately partial SDK frames (only the fields the host reads), crossing the ClaudeQuery seam by assertion. */
function sdkQuery(prompts: string[], answer: string): ClaudeQuery {
  return ({ prompt }) => {
    prompts.push(prompt);
    const frames = [
      { type: "system", subtype: "init", session_id: "sdk-session-1", model: "claude-opus-5-5", permissionMode: "dontAsk", tools: [], cwd: "/tmp" },
      { type: "assistant", session_id: "sdk-session-1", uuid: "m1", parent_tool_use_id: null,
        message: { id: "msg1", model: "claude-opus-5-5", role: "assistant", content: [{ type: "text", text: answer }], usage: { input_tokens: 4, output_tokens: 3 } } },
      { type: "result", subtype: "success", session_id: "sdk-session-1", uuid: "r1", is_error: false, result: answer, structured_output: undefined,
        modelUsage: { "claude-opus-5-5": { inputTokens: 4, outputTokens: 3, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 } },
        usage: { input_tokens: 4, output_tokens: 3 }, total_cost_usd: 0.01 },
    ] as unknown as readonly SDKMessage[];
    return (async function* () { for (const frame of frames) yield frame; })();
  };
}

interface Resumed {
  first: WorkflowRunResult;
  resumed: WorkflowRunResult;
  /** Every prompt the SDK was handed, across both runs: one means the resume dispatched nothing. */
  prompts: string[];
  journal: WorkflowJournalEntry[];
}

/** Record one run under `recorded`, then resume its journal under `current`, the prompt unchanged. */
async function recordThenResume(
  recorded: ClaudeReplayDependencies | undefined,
  current: ClaudeReplayDependencies | undefined,
  options: { recordModel?: string; resumeModel?: string } = {},
): Promise<Resumed> {
  const prompts: string[] = [];
  const journal: WorkflowJournalEntry[] = [];
  const first = await runWorkflow({
    script: AGENT_SCRIPT,
    host: createClaudeWorkflowHost({ cwd: "/tmp", model: options.recordModel ?? "claude-opus-5-5", query: sdkQuery(prompts, RECORDED), ...(recorded ? { replayDependencies: recorded } : {}) }),
    journal: { entries: [], append: entry => journal.push(entry) },
  });
  const resumed = await runWorkflow({
    script: AGENT_SCRIPT,
    host: createClaudeWorkflowHost({ cwd: "/tmp", model: options.resumeModel ?? "claude-opus-5-5", query: sdkQuery(prompts, CURRENT), ...(current ? { replayDependencies: current } : {}) }),
    journal: { entries: [...journal] },
  });
  return { first, resumed, prompts, journal };
}

/** The resume reused the recorded answer: nothing dispatched, the recorded value returned. */
function expectReplayed(outcome: Resumed): void {
  expect(outcome.first.status).toBe("completed");
  expect(outcome.resumed.status).toBe("completed");
  expect(outcome.resumed.replayedCount).toBe(1);
  expect(outcome.prompts).toEqual(["verify the candidate"]);
  expect(outcome.resumed.value).toBe(RECORDED);
}

/** The resume declined the recorded answer: the same prompt dispatched again, the live value returned. */
function expectNotReused(outcome: Resumed): void {
  expect(outcome.first.status).toBe("completed");
  expect(outcome.resumed.status).toBe("completed");
  expect(outcome.resumed.replayedCount).toBe(0);
  expect(outcome.prompts).toEqual(["verify the candidate", "verify the candidate"]);
  expect(outcome.resumed.value).toBe(CURRENT);
}

describe("wb-413a host seam: a changed measured dependency declines the journal (EAT-R017..R019)", () => {
  it("H-CONTROL: exact same measured dependencies replay the recorded answer (the positive control)", async () => {
    expectReplayed(await recordThenResume(BASELINE, { ...BASELINE }));
  });

  it("H-SHAPE: the journal row carries the readings it was produced under, after the eight policy dimensions", async () => {
    const outcome = await recordThenResume(BASELINE, { ...BASELINE });
    expect(outcome.journal).toHaveLength(1);
    expect(JSON.parse(outcome.journal[0]?.basis ?? "null")).toEqual([
      "/tmp", "claude-opus-5-5", "dontAsk", [], [], null, null, null,
      { source: BASELINE.source, instructions: BASELINE.instructions, provider: BASELINE.provider },
    ]);
  });

  it("H-R017: a changed source reading (commit, tree or dirty-file digest) is not reused", async () => {
    expectNotReused(await recordThenResume(BASELINE, { ...BASELINE, source: measured("source: commit c2, tree t1, candidate k1") }));
  });

  it("H-R018: a changed instruction reading (skill or system instruction bytes) is not reused", async () => {
    expectNotReused(await recordThenResume(BASELINE, { ...BASELINE, instructions: measured("instructions: SKILL.md bytes v2") }));
  });

  it("H-R019: a changed provider reading (effective provider version or settings) is not reused", async () => {
    expectNotReused(await recordThenResume(BASELINE, { ...BASELINE, provider: measured("provider: sdk 0.3.301, contracts p1, settings s1") }));
  });

  it("H-SHAPE-BYTES: the recorded basis is the eight policy elements and then {source, instructions, provider}, in that order, each reading as supplied", async () => {
    const outcome = await recordThenResume(BASELINE, { ...BASELINE });
    expect(outcome.journal[0]?.basis).toBe(
      JSON.stringify(["/tmp", "claude-opus-5-5", "dontAsk", [], [], null, null, null, { source: BASELINE.source, instructions: BASELINE.instructions, provider: BASELINE.provider }]),
    );
  });

  it("H-SHAPE-LEGACY: a host built without readings records the eight policy elements alone, byte for byte, and replays under them", async () => {
    const outcome = await recordThenResume(undefined, undefined);
    expect(outcome.journal).toHaveLength(1);
    expect(outcome.journal[0]?.basis).toBe('["/tmp","claude-opus-5-5","dontAsk",[],[],null,null,null]');
    expectReplayed(outcome);
  });

  it("H-LEGACY: the policy dimensions still decline the journal beside the readings (a model pin change)", async () => {
    expectNotReused(await recordThenResume(BASELINE, { ...BASELINE }, { resumeModel: "claude-haiku-5-5" }));
  });

  it("H-UNSCOPED: an answer recorded with no readings is not reused by a host that measures them, nor the reverse", async () => {
    expectNotReused(await recordThenResume(undefined, BASELINE));
    expectNotReused(await recordThenResume(BASELINE, undefined));
  });
});

describe("wb-413a host seam: an unknown dependency replays nothing (EAT-R020)", () => {
  const dimensions = ["source", "instructions", "provider"] as const;

  for (const dimension of dimensions) {
    it(`H-R020-${dimension}: the ${dimension} reading unknown in both runs, prompt equal: the answer is not replayed`, async () => {
      const blind: ClaudeReplayDependencies = { ...BASELINE, [dimension]: unknown(`${dimension}-unmeasurable`) };
      expectNotReused(await recordThenResume(blind, { ...blind }));
    });
  }

  it("H-R020-RECORDED: an answer recorded under an unknown reading is not replayed once the reading is measured", async () => {
    expectNotReused(await recordThenResume({ ...BASELINE, source: unknown("source-unmeasurable") }, BASELINE));
  });

  it("H-R020-RESUMED: a measured answer is not replayed while the current reading is unknown", async () => {
    expectNotReused(await recordThenResume(BASELINE, { ...BASELINE, provider: unknown("provider-unmeasurable") }));
  });

  it("H-R020-COERCED: a reading that claims measured with an empty or malformed digest is refused as unknown", async () => {
    for (const digest of ["", "sha256:", "empty", `sha256:${"0".repeat(63)}`]) {
      const coerced: ClaudeReplayDependencies = { ...BASELINE, instructions: { state: "measured", digest } };
      expectNotReused(await recordThenResume(coerced, { ...coerced }));
    }
  });

  it("H-R020-HOST: the host permits no settled-agent replay while any reading is unknown", () => {
    expect(createClaudeWorkflowHost({ cwd: "/tmp", replayDependencies: BASELINE }).replaySafe).toBe(true);
    for (const dimension of dimensions) {
      expect(createClaudeWorkflowHost({ cwd: "/tmp", replayDependencies: { ...BASELINE, [dimension]: unknown("unmeasurable") } }).replaySafe).toBe(false);
    }
  });
});

/* --------------------------------------------------------------------------
 * EAT-R021: the uncertain non-read denial is retained while the fingerprint is extended. A non-read node journals a
 * dispatched marker before its provider acts (wb-5x0.1); losing the settled row leaves only the marker, and a resume must
 * refuse there with the typed uncertain-effect, whatever the readings say, and never dispatch the effect a second time.
 * ------------------------------------------------------------------------ */

const SCHEMA = { type: "object", properties: { value: { type: "string" } }, required: ["value"], additionalProperties: false };

/** The external world the write acts on, shared across runs: "no second dispatch" is counted here. */
interface World { effects: number; reads: number }

function registryOf(world: World): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: { id: "effect.write", version: "1.0.0", description: "fixture write", inputSchema: SCHEMA, effectClass: "write", permissions: ["fixture:grant"], supportedModes: ["invoke"] },
    async invoke() { world.effects++; return { accepted: true }; },
  });
  registry.register({
    descriptor: { id: "record.read", version: "1.0.0", description: "fixture read", inputSchema: SCHEMA, effectClass: "read", permissions: ["fixture:grant"], supportedModes: ["invoke"] },
    async invoke() { world.reads++; return { observed: `read ${world.reads}` }; },
  });
  return registry;
}

function nodeHost(world: World, replayDependencies: ClaudeReplayDependencies) {
  return createClaudeWorkflowHost({ cwd: "/tmp", query: sdkQuery([], RECORDED), capabilities: registryOf(world), grants: ["fixture:grant"], replayDependencies });
}

/** A journal that loses every settled node row, as a run killed between the provider's effect and its record does. */
function losingSettlement() {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, append(entry: WorkflowJournalEntry) { if (entry.kind === "node" && entry.dispatched !== true) return; entries.push(entry); } };
}

const nodeRows = (result: WorkflowRunResult) => result.progress.filter(entry => entry.type === "workflow_node");

describe("wb-413a host seam: the uncertain non-read denial is retained (EAT-R021)", () => {
  const WRITE = `${HEAD}return await node("effect.write", { value: "x" });`;
  const READ = `${HEAD}return await node("record.read", { value: "x" });`;

  it("H-R021-SAME: a lost settlement after a non-read dispatch resumes to a typed uncertain-effect and no second dispatch", async () => {
    const world: World = { effects: 0, reads: 0 };
    const journal = losingSettlement();
    const first = await runWorkflow({ script: WRITE, host: nodeHost(world, BASELINE), journal });
    expect(first.status).toBe("completed");
    expect(journal.entries).toEqual([expect.objectContaining({ kind: "node", index: 0, dispatched: true, effectClass: "write" })]);
    expect(world.effects).toBe(1);

    const resumed = await runWorkflow({ script: WRITE, host: nodeHost(world, { ...BASELINE }), journal: { entries: journal.entries } });
    expect(resumed.status).toBe("failed");
    expect(resumed.capabilityError).toMatchObject({ name: "CapabilityError", category: "uncertain-effect" });
    expect(world.effects).toBe(1);
  });

  it("H-R021-CHANGED: no changed or unknown reading licenses re-running the dispatched effect", async () => {
    const world: World = { effects: 0, reads: 0 };
    const journal = losingSettlement();
    await runWorkflow({ script: WRITE, host: nodeHost(world, BASELINE), journal });
    for (const current of [
      { ...BASELINE, source: measured("source: commit c2") },
      { ...BASELINE, instructions: unknown("instructions-unmeasurable") },
    ]) {
      const resumed = await runWorkflow({ script: WRITE, host: nodeHost(world, current), journal: { entries: journal.entries } });
      expect(resumed.status).toBe("failed");
      expect(resumed.capabilityError?.category).toBe("uncertain-effect");
    }
    expect(world.effects).toBe(1);
  });

  it("H-R021-SETTLED: a settled write journaled under the readings is refused, never re-run, under changed readings too", async () => {
    const world: World = { effects: 0, reads: 0 };
    const journal: WorkflowJournalEntry[] = [];
    await runWorkflow({ script: WRITE, host: nodeHost(world, BASELINE), journal: { entries: [], append: entry => journal.push(entry) } });
    expect(journal.map(entry => entry.dispatched === true)).toEqual([true, false]);
    for (const current of [{ ...BASELINE }, { ...BASELINE, source: measured("source: commit c2") }]) {
      const resumed = await runWorkflow({ script: WRITE, host: nodeHost(world, current), journal: { entries: journal } });
      expect(resumed.status).toBe("failed");
      expect(resumed.capabilityError?.category).toBe("uncertain-effect");
    }
    expect(world.effects).toBe(1);
  });

  it("H-R021-STALE: a journaled read replays under the same readings marked stale, and runs live under changed ones", async () => {
    const world: World = { effects: 0, reads: 0 };
    const journal: WorkflowJournalEntry[] = [];
    const first = await runWorkflow({ script: READ, host: nodeHost(world, BASELINE), journal: { entries: [], append: entry => journal.push(entry) } });
    expect(first.value).toEqual({ observed: "read 1" });
    expect(journal).toEqual([expect.objectContaining({ kind: "node", effectClass: "read", basis: expect.any(String) })]);

    const replayed = await runWorkflow({ script: READ, host: nodeHost(world, { ...BASELINE }), journal: { entries: journal } });
    expect(replayed.value).toEqual({ observed: "read 1" });
    expect(replayed.replayedNodeCount).toBe(1);
    expect(nodeRows(replayed).at(-1)).toMatchObject({ state: "done", freshness: "stale", cached: true });
    expect(world.reads).toBe(1);

    const live = await runWorkflow({ script: READ, host: nodeHost(world, { ...BASELINE, provider: measured("provider: contracts p2") }), journal: { entries: journal } });
    expect(live.value).toEqual({ observed: "read 2" });
    expect(live.replayedNodeCount).toBe(0);
    expect(nodeRows(live).at(-1)).toMatchObject({ state: "done", freshness: "unknown" });
    expect(world.reads).toBe(2);
  });
});

describe("wb-413a host seam: an unknown reading replays no journaled node read either (EAT-R020)", () => {
  const READ_NODE = `${HEAD}return await node("record.read", { value: "x" });`;

  it("H-R020-NODE-READ: with a reading unknown in both runs, a journaled read runs live again and nothing is replayed", async () => {
    for (const dimension of ["source", "instructions", "provider"] as const) {
      const world: World = { effects: 0, reads: 0 };
      const blind: ClaudeReplayDependencies = { ...BASELINE, [dimension]: unknown(`${dimension}-unmeasurable`) };
      const journal: WorkflowJournalEntry[] = [];
      const first = await runWorkflow({ script: READ_NODE, host: nodeHost(world, blind), journal: { entries: [], append: entry => journal.push(entry) } });
      expect(first.value).toEqual({ observed: "read 1" });
      expect(journal).toEqual([expect.objectContaining({ kind: "node", effectClass: "read" })]);
      const resumed = await runWorkflow({ script: READ_NODE, host: nodeHost(world, { ...blind }), journal: { entries: journal } });
      expect(resumed.value, dimension).toEqual({ observed: "read 2" });
      expect(resumed.replayedNodeCount).toBe(0);
      expect(world.reads).toBe(2);
    }
  });
});
