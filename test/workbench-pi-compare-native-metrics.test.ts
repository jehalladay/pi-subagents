/**
 * wb-rz62 NM-9, the registered-tool leg of test/workbench-compare-run.test.ts: the workflow_compare tool a Pi session
 * registers builds both comparison receipts through nativeCompareRun (src/workbench/compare-run.ts), so their metrics are
 * the session projection's own native latency rows for each task, never a list written inline at the tool (the
 * experimental tool shipped with an inline empty metrics list). The bead's acceptance, verbatim: "Done when: comparison
 * receipts consumed by wb-h8f.2 draw their metrics from the native workflow metric source, with a gate-passing test that
 * fails if metrics are supplied inline rather than natively sourced."
 *
 * The projection the tool reads is reached through a call-through spy's recorded receiver (the
 * test/workbench-observe-identity-refusals.test.ts precedent), and the receipts the tool built, with the comparison the
 * core computed over them, through a call-through spy on designer.compareWorkflowRuns (the record() precedent of
 * test/workbench-pi-compare-reply.test.ts): no stub, no replaced module. The test plays the native producer: it admits
 * read-current snapshots for each finished task, a Forge workflow root and one Claude turn with closed intervals, and every
 * figure asserted is computed by hand from those intervals. The hermetic sandbox pins no model, tools, environment or
 * cache digest and no Git workspace basis, so the registered cohort is never matched: a measured verdict or delta through
 * the registered tool is NOT CLAIMED by this file, only the natively sourced receipts and summaries.
 * The tool answers with the bounded reply of src/workbench/compare-tool.ts (wb-h8f.7), which renders a metric the core
 * did not measure as a declined row with no number. NM-9 therefore reads the figures from the receipts and from the
 * core's result, and reads from the reply each row's name, unit, kind and verdict, the wall row's evidence references,
 * the claim limits and the absence of any claimed number. The hand-computed figures in the model-facing reply text are
 * NOT CLAIMED by this file.
 * This is a behavioural test file and carries no census: a census of its own case set (the NM-9 case id, its title or
 * its run mode, so the case removed, skipped or retitled) is NOT CLAIMED by this file.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import type { CompareCompletedReply, WorkflowCompareReply } from "../src/workbench/compare-tool.js";
import type { CompareRun, WorkflowComparison } from "../src/workbench/designer.js";
import * as designer from "../src/workbench/designer.js";
import { type Interval, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const TIMEOUT = 60_000;
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  vi.restoreAllMocks();
  sandbox?.restore();
  sandbox = undefined;
});

const T0 = Date.parse("2026-11-11T08:00:00.000Z");
const at = (seconds: number): string => new Date(T0 + seconds * 1000).toISOString();
const span = (start: number, end: number): Interval => ({ startedAt: at(start), endedAt: at(end) });
async function waitFor(predicate: () => boolean): Promise<void> {
  for (let i = 0; i < 3000; i++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("the compared workflows did not finish in the test window");
}

/** What one registered workflow_compare call answered, beside the receipts the host built and the core's result over them. */
interface Compared {
  reply: CompareCompletedReply;
  receipts: readonly CompareRun[];
  comparison: WorkflowComparison;
}
function numbers(value: unknown): number[] {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numbers);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(numbers);
  return [];
}
/** Every number of the reply outside the byte-cap bookkeeping (counts, truncation): a metric value, a delta or a summary statistic. */
function claimedNumbers(reply: CompareCompletedReply): number[] {
  const { counts: _counts, truncation: _truncation, ...rest } = reply;
  return numbers(rest);
}

it("NM-9 the registered workflow_compare draws both receipts' metrics from the session projection's native intervals, never inline", async () => {
  sandbox = hermeticDir({ nonRepo: true, settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:design", "workbench:observe"] } } });
  const scriptPath = join(sandbox.dir, "compare.js");
  writeFileSync(scriptPath, 'export const meta={name:"compare",description:"local"}; return 1;');
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const ids: string[] = [];
  for (let i = 0; i < 2; i++) {
    const launched = await pi.tools.get("SubagentWorkflow").execute(`native-${i}`, { scriptPath }, undefined, undefined, context);
    ids.push(launched.details.taskId as string);
  }
  await waitFor(() => ids.every(id => pi.pi.sendMessage.mock.calls.some(([item]: [unknown]) => JSON.stringify(item).includes(id))));
  const core = vi.spyOn(designer, "compareWorkflowRuns");
  const reads = vi.spyOn(ObservationProjection.prototype, "query");
  const compare = async (): Promise<Compared> => {
    const call = core.mock.calls.length;
    const reply = JSON.parse((await pi.tools.get("workflow_compare").execute("compare", { referenceTask: ids[0], candidateTask: ids[1] }, undefined, undefined, context)).content[0].text) as WorkflowCompareReply;
    if (reply.status === "refused") throw new Error(`unexpected refusal ${reply.error.code}`);
    expect(core.mock.calls.length, "the core ran once for this call").toBe(call + 1);
    const [reference, candidate] = core.mock.calls[call];
    return { reply, receipts: [...reference, ...candidate], comparison: core.mock.results[call]?.value as WorkflowComparison };
  };
  // Nothing native observed for either task yet: no metric on either receipt and no metric row at all.
  const before = await compare();
  expect(before.receipts.map(run => run.metrics)).toEqual([[], []]);
  expect(before.comparison.metrics).toEqual([]);
  expect(before.comparison.perMetric).toEqual([]);
  expect(before.reply.metrics).toEqual([]);
  const projection: unknown = reads.mock.contexts[0];
  const scope: ObservationScope | undefined = reads.mock.calls[0]?.[0].scope;
  if (!(projection instanceof ObservationProjection) || scope === undefined) throw new Error("the registered tool read no projection");
  for (const [id, wall, turnEnd] of [[ids[0], 100, 40], [ids[1], 80, 30]] as const) {
    for (const node of [
      { provider: "forge", id: `${id}-root`, type: "workflow" as const, interval: span(0, wall) },
      { provider: "claude-agent-sdk", id: `${id}-turn`, type: "agent" as const, interval: span(10, turnEnd) },
    ]) {
      expect(
        projection.refresh({
          source: { provider: node.provider, type: "operation", id: node.id }, scope, capturedAt: at(0), observedAt: at(0),
          node: { title: `Native ${node.id}`, type: node.type, statusText: "DONE", statusTone: "success" },
          trace: { invocationId: id }, interval: node.interval, evidenceRefs: [`ev:${node.id}`],
        }),
      ).toBe("applied");
    }
  }
  const after = await compare();
  // Reference: turn [10,40] = 30 s, wall 100 s, overhead 70 s. Candidate: turn [10,30] = 20 s, wall 80 s, overhead 60 s.
  expect(after.receipts.map(run => Object.fromEntries(run.metrics.map(item => [item.name, [item.unit, item.value]])))).toEqual([
    { "latency.model.unionMs": ["ms", 30_000], "latency.model.busyMs": ["ms", 30_000], "latency.wall.ms": ["ms", 100_000], "latency.overhead.ms": ["ms", 70_000] },
    { "latency.model.unionMs": ["ms", 20_000], "latency.model.busyMs": ["ms", 20_000], "latency.wall.ms": ["ms", 80_000], "latency.overhead.ms": ["ms", 60_000] },
  ]);
  expect(Object.fromEntries(after.comparison.metrics.map(item => [item.name, [item.unit, item.reference.mean, item.candidate.mean]]))).toEqual({
    "latency.model.unionMs": ["ms", 30_000, 20_000],
    "latency.model.busyMs": ["ms", 30_000, 20_000],
    "latency.wall.ms": ["ms", 100_000, 80_000],
    "latency.overhead.ms": ["ms", 70_000, 60_000],
  });
  expect(after.comparison.metrics.find(item => item.name === "latency.wall.ms")?.evidenceRefs).toEqual([`ev:${ids[0]}-root`, `ev:${ids[0]}-turn`, `ev:${ids[1]}-root`, `ev:${ids[1]}-turn`]);
  // The unpinned hermetic cohort is never matched: natively sourced summaries, no delta, no measured verdict, no claim.
  expect(after.comparison.metrics.every(item => item.delta === undefined)).toBe(true);
  expect(after.comparison.perMetric.map(item => item.verdict)).toEqual(["unknown", "unknown", "unknown", "unknown"]);
  expect(after.comparison.claim).toBe("none");
  expect(after.comparison.causalClaim).toBe(false);
  // The bounded reply the model reads (wb-h8f.7): the same four native rows, each declined with the core's verdict, and no number.
  expect(Object.fromEntries(after.reply.metrics.map(row => [row.name, [row.unit, row.kind, row.kind === "declined" ? row.verdict : "measured"]]))).toEqual({
    "latency.model.unionMs": ["ms", "declined", "unknown"],
    "latency.model.busyMs": ["ms", "declined", "unknown"],
    "latency.wall.ms": ["ms", "declined", "unknown"],
    "latency.overhead.ms": ["ms", "declined", "unknown"],
  });
  expect(after.reply.metrics.find(row => row.name === "latency.wall.ms")?.evidenceRefs).toEqual([`ev:${ids[0]}-root`, `ev:${ids[0]}-turn`, `ev:${ids[1]}-root`, `ev:${ids[1]}-turn`]);
  expect(after.reply).toMatchObject({ status: "declined", limits: { claim: "none", causalClaim: false } });
  expect(claimedNumbers(after.reply)).toEqual([]);
}, TIMEOUT);
