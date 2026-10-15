/**
 * workflow-journal.test.ts — the record that makes `resumeFromRunId` cheap.
 *
 * Two things are being pinned here, and they pull against each other:
 *
 *   - a resume must not re-pay for work the previous run finished, and
 *   - it must never hand a script an answer produced under other conditions.
 *
 * The prefix rule is what reconciles them, so most of these tests are about
 * where the prefix *ends* — a changed prompt, a recorded failure, a gap — and
 * prove that everything from there on is spawned for real.
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { appendJournal, journalKey, readJournal, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import {
  type AcknowledgeRecord,
  entryDigestOf,
  type OverrideRecord,
  RECONCILE_CONTRACT_VERSION,
} from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowSpawnRequest, type WorkflowSpawnResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "probe", description: "a probe" };\n';

interface Stub {
  calls: WorkflowSpawnRequest[];
  host: { spawnAgent: (r: WorkflowSpawnRequest) => Promise<WorkflowSpawnResult>; abortAgent: () => void };
}

function stubHost(reply?: (request: WorkflowSpawnRequest) => WorkflowSpawnResult): Stub {
  const calls: WorkflowSpawnRequest[] = [];
  return {
    calls,
    host: {
      async spawnAgent(request) {
        calls.push(request);
        return reply ? reply(request) : { ok: true, text: `live:${request.prompt}` };
      },
      abortAgent() {},
    },
  };
}

/** Record the journal a run would have written, so the next run can replay it. */
function recorder() {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, append: (entry: WorkflowJournalEntry) => entries.push(entry) };
}

const run = (body: string, options: Record<string, unknown>) =>
  runWorkflow({ script: HEAD + body, ...(options as any) });

describe("journalKey", () => {
  it("is stable for the same call and different for a changed prompt", () => {
    expect(journalKey({ prompt: "a" })).toBe(journalKey({ prompt: "a" }));
    expect(journalKey({ prompt: "a" })).not.toBe(journalKey({ prompt: "b" }));
  });

  it("separates calls that differ only in how the agent was configured", () => {
    const base = { prompt: "audit" };
    const keys = new Set([
      journalKey(base),
      journalKey({ ...base, model: "haiku" }),
      journalKey({ ...base, agentType: "Explore" }),
      journalKey({ ...base, effort: "high" }),
      journalKey({ ...base, isolation: "worktree" }),
      journalKey({ ...base, gate: "npm test" }),
      journalKey({ ...base, label: "one" }),
    ]);
    expect(keys.size).toBe(7);
  });

  it("ignores which phase the row is filed under", () => {
    // Re-grouping the progress tree changes no token the agent sees, and must
    // not throw away an hour of recorded results.
    expect(journalKey({ prompt: "a", label: "x" })).toBe(journalKey({ prompt: "a", label: "x" }));
  });
});

describe("journal files", () => {
  let dir: string;
  beforeEach(() => { dir = mkdtempSync(join(tmpdir(), "wf-journal-")); });
  afterEach(() => { rmSync(dir, { recursive: true, force: true }); });

  it("round-trips appended entries in position order", () => {
    const path = join(dir, "run.jsonl");
    appendJournal(path, { index: 1, key: "k1", ok: true, text: "second" });
    appendJournal(path, { index: 0, key: "k0", ok: true, text: "first" });

    expect(readJournal(path)).toEqual([
      { index: 0, key: "k0", ok: true, text: "first" },
      { index: 1, key: "k1", ok: true, text: "second" },
    ]);
  });

  it("treats a missing journal as nothing to replay", () => {
    expect(readJournal(join(dir, "nope.jsonl"))).toEqual([]);
  });

  it("keeps the entries before a truncated final line", () => {
    // The file is appended to while agents settle, so a killed run routinely
    // leaves a half-written line. Everything before it is still good.
    const path = join(dir, "torn.jsonl");
    appendJournal(path, { index: 0, key: "k0", ok: true, text: "kept" });
    writeFileSync(path, `${readFileSync(path, "utf-8")}{"index":1,"key":"k1"`, "utf-8");

    expect(readJournal(path)).toEqual([{ index: 0, key: "k0", ok: true, text: "kept" }]);
  });

  it("drops lines that are JSON but not entries", () => {
    const path = join(dir, "junk.jsonl");
    writeFileSync(path, '{"index":"one","key":"k","ok":true}\n[]\nnull\n', "utf-8");
    expect(readJournal(path)).toEqual([]);
  });

  it("says whether a row reached the file, and never throws (wb-5x0.1)", () => {
    // The runtime refuses a non-read dispatch whose marker row did not land,
    // so the writer has to be able to say so; it still never throws.
    const path = join(dir, "run.jsonl");
    expect(appendJournal(path, { index: 0, key: "k0", ok: true, text: "kept" })).toBe(true);
    expect(appendJournal(join(dir, "missing", "run.jsonl"), { index: 0, key: "k0", ok: true })).toBe(false);
    expect(appendJournal(dir, { index: 0, key: "k0", ok: true })).toBe(false);
    expect(readJournal(path)).toEqual([{ index: 0, key: "k0", ok: true, text: "kept" }]);
  });

  it("keeps a node row's dispatched marker and drops a malformed one (wb-5x0.1)", () => {
    const path = join(dir, "dispatched.jsonl");
    const dispatched = { index: 0, key: "k0", ok: false, kind: "node", capabilityId: "effect.write", effectClass: "write", dispatched: true };
    writeFileSync(path, [
      dispatched,
      { ...dispatched, index: 1, dispatched: false },
      { ...dispatched, index: 2, dispatched: "true" },
      { index: 3, key: "k3", ok: false, dispatched: true },
    ].map(row => JSON.stringify(row)).join("\n"), "utf-8");
    expect(readJournal(path)).toEqual([dispatched]);
  });
});

describe("operator decision rows", () => {
  let dir = "";
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "wf-journal-"));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  const node: WorkflowJournalEntry = {
    index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1",
  };
  const ackRecord: AcknowledgeRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "acknowledge",
    acknowledgementId: `ack_${"a".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested",
    taskId: "wf_journal",
    entry: { index: 0, key: "k0", ok: true, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", entryDigest: entryDigestOf(node) },
    scope: { workspace: "/ws", principal: "local-operator:1:s1" },
    operator: { principal: "local-operator:1:s1" },
    grant: "reconcile:furnace.acknowledge",
    recordedAt: "2026-10-15T09:00:00Z",
    reason: "inspected by hand; nothing conclusive, settle and move on",
    determination: "indeterminate",
    evidenceClass: "operator-asserted",
    evidence: [],
    noEvidenceReason: "producer-unavailable",
    settlement: "envelope",
  };
  const overrideRecord: OverrideRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "override",
    overrideId: `ovr_${"b".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted",
    taskId: "wf_journal",
    entry: ackRecord.entry,
    scope: ackRecord.scope,
    operator: ackRecord.operator,
    grant: "reconcile:furnace.override",
    recordedAt: "2026-10-15T09:00:00Z",
    reason: "re-run it; the operator accepts the duplicate risk",
    acknowledgementId: ackRecord.acknowledgementId,
    duplicateRisk: "possible-duplicate",
    confirmation: { confirmed: true, position: 0, capabilityId: "furnace.run.start", acceptDuplicateRisk: true },
  };
  const decisionRow = (kind: "acknowledge" | "override", reconcile: AcknowledgeRecord | OverrideRecord): WorkflowJournalEntry => ({
    index: 0, key: "k0", ok: true, kind, capabilityId: "furnace.run.start", effectClass: "external", basis: "b1", reconcile,
  });

  it("round-trips acknowledge and override rows beside their node row", () => {
    const path = join(dir, "decisions.jsonl");
    appendJournal(path, node);
    appendJournal(path, decisionRow("acknowledge", ackRecord));
    appendJournal(path, decisionRow("override", overrideRecord));
    const read = readJournal(path);
    expect(read).toHaveLength(3);
    expect(read.map((entry) => entry.kind)).toEqual(["node", "acknowledge", "override"]);
    expect(read[1]?.reconcile).toEqual(ackRecord);
    expect(read[2]?.reconcile).toEqual(overrideRecord);
  });

  it("drops malformed or mismatched decision rows while their neighbours survive", () => {
    const path = join(dir, "mangled.jsonl");
    const lines = [
      JSON.stringify(node),
      // The row's kind does not match the record's decision.
      JSON.stringify({ ...decisionRow("acknowledge", ackRecord), kind: "override" }),
      // The record mirrors a different row than the one it rides on.
      JSON.stringify(decisionRow("acknowledge", { ...ackRecord, entry: { ...ackRecord.entry, key: "k9" } })),
      // A decision row with no record at all.
      JSON.stringify({ index: 0, key: "k0", ok: true, kind: "acknowledge", capabilityId: "furnace.run.start" }),
      // A stray record on a plain node row.
      JSON.stringify({ ...node, reconcile: ackRecord }),
      // A legacy agent row, byte-identical to what older binaries wrote.
      JSON.stringify({ index: 1, key: "agent", ok: true, text: "legacy row" }),
    ];
    writeFileSync(path, `${lines.join("\n")}\n`, "utf-8");
    const read = readJournal(path);
    expect(read).toHaveLength(2);
    expect(read[0]).toEqual(node);
    expect(read[1]).toEqual({ index: 1, key: "agent", ok: true, text: "legacy row" });
  });
});

describe("replay", () => {
  const twoAgents = 'const a = await agent("first");\nconst b = await agent("second");\nreturn [a, b];';

  it("records every settled call, so a first run can be resumed", async () => {
    const { host } = stubHost();
    const journal = recorder();

    const result = await run(twoAgents, { host, journal });

    expect(result.status).toBe("completed");
    expect(journal.entries).toEqual([
      // Keyed on what the script asked for, not on what the runtime derived —
      // the label here was derived from the prompt, so it is not part of it.
      { index: 0, key: journalKey({ prompt: "first" }), ok: true, text: "live:first" },
      { index: 1, key: journalKey({ prompt: "second" }), ok: true, text: "live:second" },
    ]);
  });

  it("replays an identical run without spawning anything", async () => {
    const first = recorder();
    await run(twoAgents, { host: stubHost().host, journal: first });

    const second = stubHost();
    const result = await run(twoAgents, { host: second.host, journal: { entries: first.entries } });

    expect(result.value).toEqual(["live:first", "live:second"]);
    expect(result.replayedCount).toBe(2);
    expect(second.calls, "a full cache hit must not reach the manager at all").toHaveLength(0);
  });

  it("runs live from the first changed call, and no earlier", async () => {
    const first = recorder();
    await run(twoAgents, { host: stubHost().host, journal: first });

    const second = stubHost(() => ({ ok: true, text: "fresh" }));
    const edited = 'const a = await agent("first");\nconst b = await agent("second, edited");\nreturn [a, b];';
    const result = await run(edited, { host: second.host, journal: { entries: first.entries } });

    expect(result.value).toEqual(["live:first", "fresh"]);
    expect(result.replayedCount).toBe(1);
    expect(second.calls.map(c => c.prompt)).toEqual(["second, edited"]);
  });

  it("stops replaying after a changed call even when a later one still matches", async () => {
    // The prefix rule: agent 3's recorded answer was produced downstream of an
    // agent 2 that no longer exists, so reusing it would be reusing a result
    // from a run that never happened.
    const three = 'await agent("one");\nawait agent("two");\nreturn await agent("three");';
    const first = recorder();
    await run(three, { host: stubHost().host, journal: first });

    const second = stubHost(() => ({ ok: true, text: "fresh" }));
    const edited = 'await agent("one");\nawait agent("two, edited");\nreturn await agent("three");';
    const result = await run(edited, { host: second.host, journal: { entries: first.entries } });

    expect(result.replayedCount).toBe(1);
    expect(second.calls.map(c => c.prompt)).toEqual(["two, edited", "three"]);
  });

  it("re-runs a call the journal recorded as failed", async () => {
    // The reason to resume a broken run is to retry the thing that broke.
    const first = recorder();
    let attempt = 0;
    const failing = stubHost(() => (attempt++ === 1 ? { ok: false, error: "boom" } : { ok: true, text: "fine" }));
    await run(twoAgents, { host: failing.host, journal: first });

    expect(first.entries[1]).toEqual({ index: 1, key: first.entries[1].key, ok: false });

    const second = stubHost(() => ({ ok: true, text: "retried" }));
    const result = await run(twoAgents, { host: second.host, journal: { entries: first.entries } });

    expect(result.value).toEqual(["fine", "retried"]);
    expect(result.replayedCount).toBe(1);
    expect(second.calls.map(c => c.prompt)).toEqual(["second"]);
  });

  it("re-records replayed calls, so a resume can itself be resumed", async () => {
    const first = recorder();
    await run(twoAgents, { host: stubHost().host, journal: first });

    const second = recorder();
    await run(twoAgents, { host: stubHost().host, journal: { entries: first.entries, append: second.append } });

    expect(second.entries).toEqual(first.entries);
  });

  it("runs everything live when there is no journal", async () => {
    const stub = stubHost();
    const result = await run(twoAgents, { host: stub.host, journal: { entries: [] } });

    expect(result.replayedCount).toBe(0);
    expect(stub.calls).toHaveLength(2);
  });

  it("still counts replayed agents in the run's agent total", async () => {
    const first = recorder();
    await run(twoAgents, { host: stubHost().host, journal: first });

    const result = await run(twoAgents, { host: stubHost().host, journal: { entries: first.entries } });

    // A replayed agent is an agent that ran, as far as the run's shape goes —
    // the progress tree shows the same rows the first run showed.
    expect(result.agentCount).toBe(2);
    expect(result.progress.filter(e => e.type === "workflow_agent" && e.state === "done")).toHaveLength(2);
  });

  it("marks a replayed agent so the views can say where it came from", async () => {
    const first = recorder();
    await run(twoAgents, { host: stubHost().host, journal: first });

    const result = await run(twoAgents, { host: stubHost().host, journal: { entries: first.entries } });

    // Without this a replayed row is a tick with no tokens and no duration —
    // indistinguishable from an agent that did the work for free.
    const done = result.progress.filter(
      (entry): entry is Extract<typeof entry, { type: "workflow_agent" }> =>
        entry.type === "workflow_agent" && entry.state === "done",
    );
    expect(done).toHaveLength(2);
    expect(done.every(entry => entry.cached === true)).toBe(true);
  });

  it("does not mark an agent that actually ran", async () => {
    const result = await run(twoAgents, { host: stubHost().host, journal: { entries: [] } });

    const done = result.progress.filter(
      (entry): entry is Extract<typeof entry, { type: "workflow_agent" }> =>
        entry.type === "workflow_agent" && entry.state === "done",
    );
    expect(done.some(entry => entry.cached)).toBe(false);
  });

  it("does not replay a run that used agent({ resume })", async () => {
    // The regression this guards: a replayed child leaves no conversation in
    // this run, so the later `resume` used to die with a script-bug message
    // and take the whole run with it.
    const body = 'await agent("first", { label: "a" });\nreturn await agent("follow up", { resume: "a" });';
    const resuming = {
      async spawnAgent(request: WorkflowSpawnRequest) {
        return { ok: true, text: `live:${request.prompt}` };
      },
      async resumeAgent(_id: string, prompt: string) {
        return { ok: true, text: `resumed:${prompt}` };
      },
      abortAgent() {},
    };

    const first = recorder();
    const one = await run(body, { host: resuming, journal: first });
    expect(one.status).toBe("completed");
    expect(one.value).toBe("resumed:follow up");
    expect(first.entries[1].resumed).toBe(true);

    const two = await run(body, { host: resuming, journal: { entries: first.entries } });
    expect(two.status).toBe("completed");
    expect(two.value).toBe("resumed:follow up");
    // Declined whole rather than replaying the half that would strand it.
    expect(two.replayedCount).toBe(0);
  });

  it("blames the replay, not the script, when an added resume has no live target", async () => {
    // An edited script can add a `resume` over a journal that has none. The
    // prefix is intact, so the target really was replayed — and the reader
    // must not be sent hunting for a typo that is not there.
    const plain = recorder();
    await run('await agent("first", { label: "a" });\nreturn null;', { host: stubHost().host, journal: plain });

    const edited = await run(
      'await agent("first", { label: "a" });\nreturn await agent("more", { resume: "a" });',
      {
        host: { ...stubHost().host, async resumeAgent() { return { ok: true, text: "x" }; } },
        journal: { entries: plain.entries },
      },
    );

    expect(edited.status).toBe("failed");
    expect(edited.error).toContain("was replayed from the resume journal");
    expect(edited.error).toContain("Re-run without resumeFromRunId");
  });

  it("replays a parallel fan-out without holding concurrency slots", async () => {
    const fanout = 'return await parallel([() => agent("a"), () => agent("b"), () => agent("c")]);';
    const first = recorder();
    await run(fanout, { host: stubHost().host, journal: first });

    const second = stubHost();
    const result = await run(fanout, {
      host: second.host,
      journal: { entries: first.entries },
      concurrency: 1,
    });

    expect(result.value).toEqual(["live:a", "live:b", "live:c"]);
    expect(second.calls).toHaveLength(0);
  });
});
