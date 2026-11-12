/**
 * wb-79k.1 (W13/VC-2 HyperUnix observe-wiring): the host seam that returns the registered hyperunix.find provider value to a
 * workflow node call applies the landed hyperunixTopology (src/workbench/hyperunix-observer.ts, untouched) to the live
 * ObservationProjection through refresh and relate, under a context built from host-owned values only. Spec lines pinned:
 * docs/workbench/09-observation-and-provenance.md section "Reader adapters": "HX: query coverage/bounds/query basis, and optional
 * graph traversal of linked native refs."; docs/workbench/07-native-integrations.md section "HyperUnix provider": "Incomplete
 * query cannot silently authorize \"nothing to do\" or produce false success."
 *
 * PINNED CASES (this file, by case id; each names its assertion target, and its falsifier is the mutant that turns it red):
 * W01-W08 boot the REAL extension in claude mode and run node("hyperunix.find") through the REAL registration and the REAL
 * @hyperunix/sdk against an hx stand-in executable named by HYPERUNIX_HX (an executable on a test-scoped path, the seam
 * test/workbench-native-modules.test.ts uses): it answers the SDK's two runtime probes and one find with the frames a case gives
 * it, frames the vendored SDK's strict stream checker accepts. Each reads the live projection back through workflow_observe.
 *  W01 (acceptance 1) the run holds one hyperunix.query.snapshot node, grouped by the run's node call; red with no wiring.
 *  W02 (acceptance 3) an incomplete reading (exit class 3) reads partial with an unknown tone; red if coverage or tone is upgraded.
 *  W03 (acceptance 3) a complete reading the runtime did not license reads partial with an unknown tone.
 *  W04 (acceptance 3, control) a runtime-licensed answer reads complete with a success tone, so W02 and W03 measure a distinction.
 *  W05 (acceptance 2) "Authorization: Bearer" on one line and the value on the next, in the issued query, comes out redacted.
 *  W06 (acceptance 5) a credential split by a zero-width unit inside its keyword comes out redacted (strip, redact, strip).
 *  W07 (acceptance 5) a refused grant issues no find and projects nothing.
 *  W08 (acceptance 5) a failed find returns no value and projects nothing.
 * W09-W15 drive the REAL createClaudeWorkflowHost through the REAL runWorkflow, the REAL hyperunix.find registration over an
 * injected reader (the seam test/workbench-hx-evidence-standing.test.ts uses) and a REAL ObservationProjection behind the host's
 * observation seam, with a host clock that reads fixed instants.
 *  W09 (acceptance 3) a resumed run that replays the journaled read refreshes nothing: the confirmed node keeps its first reading.
 *  W10 (acceptance 4) scope, clock readings, invocation and grouping source are the host's, whatever the provider value names.
 *  W11 (acceptance 4) the frozen adapter result is applied as it is, through refresh and relate only.
 *  W12 (acceptance 4) an adapter refusal is a typed diagnostic that projects nothing; diagnostics stay the adapter's (at most 8).
 *  W13 (acceptance 5) the one invoke carries exactly the host's grants, none of them a reconcile permission.
 *  W14 (acceptance 5) a failed read and another capability's value reach no adapter call.
 *  W15 (acceptance 4) the grouping source is the node call as the run's projection names it: the stated execution id, if any.
 * W16-W20 (wb-79k.3 respin, refusal #1 U2-U6) pin the claude-host.ts claim words of the seam, each through the same harness:
 *  W16 (U2) a snapshot refresh answers out-of-order or refused states no edge: relate is never called (falsifier: the early return
 *      for a non-applied snapshot deleted).
 *  W17 (U3) a refresh that throws is a typed diagnostic with nothing projected, the refusal keeping a CapabilityError's own category
 *      (falsifier: the refresh catch answering without its typed refusal).
 *  W18 (U4) relate refusing the edge of an applied snapshot is a typed refusal beside applied, after the adapter's diagnostics
 *      (falsifier: the relate catch dropping its refusal).
 *  W19 (U5) a host clock that throws reads as no instant, which the adapter refuses as a typed diagnostic: nothing is projected and
 *      the node still answers (falsifier: the clock catch substituting another clock's reading).
 *  W20 (U6) a throwing onObserved listener never reaches the node's value: the run completes with the registry's answer and the
 *      snapshot stays projected (falsifier: the listener's try/catch removed).
 *
 * NOT CLAIMED: the local-detached host's node calls are NOT CLAIMED by this file, nor are a Claude agent's capability tool calls
 * (claude-capability-tools.ts) or the legacy Pi host. An execution id carried by a find stream end to end is NOT CLAIMED: the
 * vendored SDK refuses one in every core frame body, so W15 pins that branch at the host seam only.
 *
 * Input hygiene only: every credential-shaped value here is obviously fake. Display paths added: none of the test's own (the
 * snapshot's title and status are the adapter's, through sanitizeWorkbenchText's label layout). Scratch: makeScratch only.
 */
import { chmodSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { resultFromJson } from "@hyperunix/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  type ClaudeNodeObservation,
  type ClaudeNodeObservationOutcome,
  type ClaudeQuery,
  createClaudeWorkflowHost,
} from "../src/workbench/claude-host.js";
import { hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { ObserveNode, ObserveReply } from "../src/workbench/observe-query.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import type { WorkflowNodeEntry } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowRunResult } from "../src/workflow/runtime.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const HEAD = 'export const meta = { name: "hx-observe-wiring", description: "wb-79k.1 hx observe wiring" };\n';
const KIND = "hx.fs/regular-file";
const ZERO_WIDTH = String.fromCodePoint(0x200b);
/** Obviously fake: no real credential has this shape or this text. */
const FAKE_VALUE = "obviouslyFake79k1BearerValue0000";

const savedHx = process.env.HYPERUNIX_HX;
const scratches: string[] = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  if (savedHx === undefined) delete process.env.HYPERUNIX_HX;
  else process.env.HYPERUNIX_HX = savedHx;
  removeScratch(...scratches.splice(0));
  vi.restoreAllMocks();
});

/* ------------------------------------------------------------------------------------------------------------------------ *
 * W01-W08: the real extension, the real registration and SDK, an hx stand-in
 * ------------------------------------------------------------------------------------------------------------------------ */

/** The verbs the vendored SDK requires in the `hx --help --hxs` inventory before its first read. */
const HX_REQUIRED_VERBS = ["show", "find", "run", "query show", "query list"] as const;
interface HxFrame {
  readonly hxs: "1.0";
  readonly stream: string;
  readonly seq: number;
  readonly kind: string;
  readonly body: Readonly<Record<string, unknown>>;
}
const frame = (seq: number, kind: string, body: Record<string, unknown>): HxFrame => ({ hxs: "1.0", stream: "hx-fs", seq, kind, body });
/** One find answer the stand-in prints: its frames and its exit class. */
interface FindAnswer {
  readonly frames: readonly HxFrame[];
  readonly exit: number;
}
const findAnswer = (completeness: "complete" | "unknown", exit: number): FindAnswer => ({
  frames: [
    frame(0, "header", { mode: "observation", schema_requirements: ["hx.fs@1.0.0"] }),
    frame(1, "answer-coverage", { completeness, count: { $int: "0" }, incomplete_regions: [], ordered: true, view: "hx.view/workspace-head", certificates: [] }),
    frame(2, "end", {}),
  ],
  exit,
});
/** Exit class 3: the SDK reads execution kind incomplete, absence not licensed. */
const INCOMPLETE = findAnswer("unknown", 3);
/** Exit class 0 under an unknown answer coverage: kind complete, absence not licensed. */
const UNLICENSED = findAnswer("unknown", 0);
/** Exit class 0 under a complete answer coverage: kind complete-empty, absence licensed by the runtime. */
const LICENSED = findAnswer("complete", 0);
/** Exit class 4, a provider failure: no typed result, so the provider throws and no value returns. */
const FAILED = findAnswer("unknown", 4);

/** The hx stand-in, named by HYPERUNIX_HX: it logs its argv, answers the two runtime probes and one find, and exits 2 on anything else. */
function hxStandIn(answer: FindAnswer): { readonly finds: () => number } {
  const dir = makeScratch("wb-79k1-hx-");
  scratches.push(dir);
  const log = join(dir, "argv.jsonl");
  const path = join(dir, "hx");
  const inventory = `${JSON.stringify({ hxs: "1.0", stream: "help", seq: 0, kind: "hx.command-inventory", body: { commands: HX_REQUIRED_VERBS.map(name => ({ name, implementation: "implemented" })) } })}\n`;
  const frames = answer.frames.map(item => `${JSON.stringify(item)}\n`).join("");
  writeFileSync(
    path,
    [
      `#!${process.execPath}`,
      "const argv = process.argv.slice(2);",
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(argv) + "\\n");`,
      `if (argv[0] === "--version") { process.stdout.write("0.1.0\\n"); process.exit(0); }`,
      `if (argv[0] === "--help") { process.stdout.write(${JSON.stringify(inventory)}); process.exit(0); }`,
      `if (argv[0] === "find") { process.stdout.write(${JSON.stringify(frames)}); process.exit(${answer.exit}); }`,
      "process.exit(2);",
      "",
    ].join("\n"),
  );
  chmodSync(path, 0o700);
  process.env.HYPERUNIX_HX = path;
  const argvs = (): string[][] => (existsSync(log) ? readFileSync(log, "utf8").trim().split("\n").map(line => JSON.parse(line) as string[]) : []);
  return { finds: () => argvs().filter(argv => argv[0] === "find").length };
}

interface Booted {
  readonly pi: ReturnType<typeof makePi>;
  readonly context: ExtensionContext;
  readonly workspace: string;
}

async function boot(rights: readonly string[] = ["workbench:observe", "hyperunix:read"]): Promise<Booted> {
  const hermetic = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...rights] } } });
  sandbox = hermetic;
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: hermetic.dir }) as ExtensionContext;
  await pi.lifecycle.get("session_start")?.({}, context);
  return { pi, context, workspace: realpathSync(hermetic.dir) };
}

/** The registered tool's reply: the task-level envelope beside the builder's ObserveReply. */
interface ObservedReply extends ObserveReply {
  readonly taskId: string;
  readonly status: string;
}

async function observeText(booted: Booted, params: Record<string, unknown>): Promise<string> {
  return textOf(await booted.pi.tools.get("workflow_observe").execute("o", params, undefined, undefined, booted.context));
}

async function observe(booted: Booted, params: Record<string, unknown>): Promise<ObservedReply> {
  return JSON.parse(await observeText(booted, params)) as ObservedReply;
}

/** Launch one node("hyperunix.find") run through the registered SubagentWorkflow and read it back until it leaves "running". */
async function runFind(booted: Booted, input: { readonly kind: string; readonly root?: string }): Promise<string> {
  const script = `${HEAD}return await node("hyperunix.find", ${JSON.stringify(input)}, { label: "hx find" });`;
  const launched = await booted.pi.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, booted.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  for (let i = 0; i < 1_500; i++) {
    if ((await observe(booted, { taskId })).status !== "running") return taskId;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error("workflow did not settle in the test window");
}

const hxNodes = (reply: ObserveReply): readonly ObserveNode[] => reply.nodes.filter(node => node.nativeRef.provider === "hyperunix");
const reading = (node: ObserveNode) => ({ completeness: node.completeness, tone: node.presentation.statusTone, status: node.presentation.statusText });

describe("wb-79k.1 the live projection behind workflow_observe holds the returned hyperunix.find reading", () => {
  it("W01 one hyperunix.query.snapshot node for the run, grouped by the run's node call", { timeout: 60_000 }, async () => {
    hxStandIn(UNLICENSED);
    const booted = await boot();
    const taskId = await runFind(booted, { kind: KIND, root: "src" });
    const reply = await observe(booted, { taskId, selectors: { relations: true } });
    expect(reply.status).toBe("completed");
    expect(hxNodes(reply).map(node => ({ kind: node.kind, type: node.nativeRef.type, scope: node.nativeRef.scope, title: node.presentation.title }))).toEqual([
      { kind: "hyperunix.query.snapshot", type: "query", scope: booted.workspace, title: `HX find ${KIND} src` },
    ]);
    const calls = reply.nodes.filter(node => node.nativeRef.provider === "pi-workflow" && node.nativeRef.type === "node-call");
    expect(calls.map(node => node.nativeRef.id.startsWith(`${taskId}:`))).toEqual([true]);
    const grouping = reply.relations?.perNode.find(entry => entry.key === calls[0]?.key)?.outgoing.grouping;
    expect(grouping).toBe(1);
  });

  it("W02 an incomplete reading (exit class 3) reads partial with an unknown tone, never complete or success", { timeout: 60_000 }, async () => {
    hxStandIn(INCOMPLETE);
    const booted = await boot();
    const reply = await observe(booted, { taskId: await runFind(booted, { kind: KIND, root: "src" }) });
    expect(hxNodes(reply).map(reading)).toEqual([{ completeness: "partial", tone: "unknown", status: "incomplete · rows 0 · absence not licensed" }]);
  });

  it("W03 a complete reading the runtime did not license reads partial with an unknown tone, never complete or success", { timeout: 60_000 }, async () => {
    hxStandIn(UNLICENSED);
    const booted = await boot();
    const reply = await observe(booted, { taskId: await runFind(booted, { kind: KIND, root: "src" }) });
    expect(hxNodes(reply).map(reading)).toEqual([{ completeness: "partial", tone: "unknown", status: "complete · rows 0 · absence not licensed" }]);
  });

  it("W04 control: only a runtime-licensed answer reads complete with a success tone", { timeout: 60_000 }, async () => {
    hxStandIn(LICENSED);
    const booted = await boot();
    const reply = await observe(booted, { taskId: await runFind(booted, { kind: KIND, root: "src" }) });
    expect(hxNodes(reply).map(reading)).toEqual([{ completeness: "complete", tone: "success", status: "known-empty (runtime-licensed) · rows 0" }]);
  });

  it("W05 a line-split credential in the issued query (Authorization: Bearer, then the value on the next line) comes out redacted", { timeout: 60_000 }, async () => {
    hxStandIn(UNLICENSED);
    const booted = await boot();
    const taskId = await runFind(booted, { kind: KIND, root: `Authorization: Bearer\n${FAKE_VALUE}` });
    const text = await observeText(booted, { taskId });
    expect(hxNodes(JSON.parse(text) as ObserveReply).map(node => node.presentation.title)).toEqual([`HX find ${KIND} Authorization: [REDACTED]`]);
    expect(text).not.toMatch(/obviouslyFake/i);
  });

  it("W06 a credential split by a zero-width unit inside its keyword comes out redacted too (strip, redact, strip)", { timeout: 60_000 }, async () => {
    hxStandIn(UNLICENSED);
    const booted = await boot();
    const taskId = await runFind(booted, { kind: KIND, root: `Bea${ZERO_WIDTH}rer ${FAKE_VALUE}` });
    const text = await observeText(booted, { taskId });
    expect(hxNodes(JSON.parse(text) as ObserveReply).map(node => node.presentation.title)).toEqual([`HX find ${KIND} [REDACTED]`]);
    expect(text).not.toMatch(/obviouslyFake/i);
  });

  it("W07 a refused grant issues no find and projects nothing", { timeout: 60_000 }, async () => {
    const hx = hxStandIn(UNLICENSED);
    const booted = await boot(["workbench:observe"]);
    const reply = await observe(booted, { taskId: await runFind(booted, { kind: KIND, root: "src" }) });
    expect(reply.status).toBe("failed");
    expect(hxNodes(reply)).toEqual([]);
    expect(hx.finds()).toBe(0);
  });

  it("W08 a failed find returns no value and projects nothing", { timeout: 60_000 }, async () => {
    const hx = hxStandIn(FAILED);
    const booted = await boot();
    const reply = await observe(booted, { taskId: await runFind(booted, { kind: KIND, root: "src" }) });
    expect(reply.status).toBe("failed");
    expect(hx.finds()).toBe(1);
    expect(hxNodes(reply)).toEqual([]);
  });
});

/* ------------------------------------------------------------------------------------------------------------------------ *
 * W09-W15: the real Claude host and runtime, the real registration over an injected reader, a real projection
 * ------------------------------------------------------------------------------------------------------------------------ */

type Json = { [key: string]: JsonValue };
const SCOPE: ObservationScope = { workspace: "/workspace/wb-79k.1", principal: "local-operator:wb-79k.1" };
const BINARY = "7c".repeat(32);
const INVOCATION = "wf-79k1-first";
const TARGET = { kind: KIND, root: "src" };
const SCRIPT = `${HEAD}return await node("hyperunix.find", ${JSON.stringify(TARGET)});`;
const T0 = "2026-11-11T06:00:00.000Z";
const T1 = "2026-11-11T06:00:01.000Z";

/** One SDK result in its hyperunix.result/1 form, incomplete and unlicensed unless a case says otherwise. */
function hxDocument(overrides: Json = {}): Json {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [],
    status: { exit_code: 3, signal: null, streams: [{ name: "hx-fs", frames: 3, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 3 },
    execution_status: { kind: "incomplete", diagnostic_code: null },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-11-11T05:59:59.000Z", startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 100, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 3 },
    workspace_root: SCOPE.workspace,
    terminal: "partial",
    truth: null,
    coverage_summary: { modes: [], completeness: "unknown", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [], result_coverage: null, answer_count: null },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
    ...overrides,
  };
}

/** The real hyperunix.find registration over a reader that answers one document. */
function hxRegistry(document: Json, workspaceRoot = SCOPE.workspace) {
  const find = vi.fn(async () => resultFromJson(document));
  const runtime = vi.fn(async () => ({ version: "0.1.0", binarySha256: BINARY }));
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, { find, runtime, close: async () => {} }, workspaceRoot);
  return { registry, find };
}

/** A host clock that reads the given instants in order, then keeps the last one. */
function clock(...instants: readonly string[]): () => string {
  let next = 0;
  return () => instants[Math.min(next++, instants.length - 1)] ?? "";
}

function observing(projection: ObservationProjection, now: () => string = clock(T0, T1)) {
  const outcomes: ClaudeNodeObservationOutcome[] = [];
  const observation: ClaudeNodeObservation = {
    refresh: snapshot => projection.refresh(snapshot),
    relate: statement => projection.relate(statement),
    scope: SCOPE,
    now,
    onObserved: outcome => {
      outcomes.push(outcome);
    },
  };
  return { observation, outcomes };
}

/** No case here runs an agent: a query reaching the SDK seam fails the case. */
const NO_AGENTS: ClaudeQuery = () => {
  throw new Error("wb-79k.1: no agent runs in these cases");
};

function hostOf(registry: CapabilityRegistry, observation: ClaudeNodeObservation, invocationId = INVOCATION) {
  return createClaudeWorkflowHost({ cwd: SCOPE.workspace, query: NO_AGENTS, capabilities: registry, grants: ["hyperunix:read"], invocationId, observation });
}

const projectionOf = (): ObservationProjection => new ObservationProjection({ maxEvents: 64, maxNodes: 64, maxEdges: 64, maxQuery: 16 });

function recorder() {
  const entries: WorkflowJournalEntry[] = [];
  return { entries, append: (entry: WorkflowJournalEntry) => entries.push(entry) };
}

/** The run's node call, as the runtime reports it (callId and the native id it read from the value). */
function nodeCall(result: WorkflowRunResult): WorkflowNodeEntry {
  const entry = result.progress.filter((item): item is WorkflowNodeEntry => item.type === "workflow_node").at(-1);
  if (entry === undefined) throw new Error("the run reported no node call");
  return entry;
}

const nodeCallRef = (invocationId: string, callId: number): NativeRef => ({ provider: "pi-workflow", type: "node-call", id: `${invocationId}:${callId}` });
const hxOf = (projection: ObservationProjection, filter: Omit<Parameters<ObservationProjection["query"]>[0], "limit" | "scope"> = {}) =>
  projection.query({ scope: SCOPE, limit: 16, ...filter }).nodes.filter(node => node.nativeRef.provider === "hyperunix");

describe("wb-79k.1 the Claude host's node seam applies the frozen adapter result under a host-bound context", () => {
  it("W09 a resumed run that replays the journaled read refreshes nothing: the confirmed node keeps its first reading", async () => {
    const { registry, find } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const first = observing(projection);
    const journal = recorder();
    expect((await runWorkflow({ script: SCRIPT, host: hostOf(registry, first.observation), journal })).status).toBe("completed");
    const confirmed = hxOf(projection, { invocationId: INVOCATION });
    expect(confirmed.map(node => [node.lastConfirmedAt, node.observedAt])).toEqual([[T0, T1]]);

    const resumed = observing(projection, clock("2026-11-11T07:00:00.000Z", "2026-11-11T07:00:01.000Z"));
    const rerun = await runWorkflow({ script: SCRIPT, host: hostOf(registry, resumed.observation, "wf-79k1-resumed"), journal: { entries: journal.entries } });
    expect({ status: rerun.status, replayed: rerun.replayedNodeCount, reads: find.mock.calls.length, observed: resumed.outcomes.length }).toEqual({
      status: "completed",
      replayed: 1,
      reads: 1,
      observed: 0,
    });
    expect(hxOf(projection, { invocationId: "wf-79k1-resumed" })).toEqual([]);
    const after = confirmed[0] === undefined ? [] : hxOf(projection, { ref: confirmed[0].nativeRef });
    expect(after.map(node => [node.lastConfirmedAt, node.observedAt, node.invocationId])).toEqual([[T0, T1, INVOCATION]]);
  });

  it("W10 scope, clock readings, invocation and grouping source are the host's, whatever the provider value names", async () => {
    const hostile = "1999-12-31T23:59:59.000Z";
    const { registry } = hxRegistry(
      hxDocument({
        workspace_root: "/hostile/workspace",
        transport: { started_at: hostile, startup_latency_s: 0, process_duration_s: 0, stdout_bytes: 0, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 3 },
        extensions: { invocationId: "hostile-invocation", capturedAt: hostile, observedAt: hostile, scope: { workspace: "/hostile/workspace", principal: "hostile" } },
      }),
    );
    const projection = projectionOf();
    const { observation } = observing(projection);
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
    const nodes = hxOf(projection);
    expect(nodes.map(node => ({ scope: node.scope, captured: node.lastConfirmedAt, observed: node.observedAt, invocation: node.invocationId }))).toEqual([
      { scope: SCOPE, captured: T0, observed: T1, invocation: INVOCATION },
    ]);
    const grouped = hxOf(projection, { parent: nodeCallRef(INVOCATION, nodeCall(result).callId) });
    expect(grouped.map(node => node.key)).toEqual(nodes.map(node => node.key));
    expect(projection.query({ scope: { workspace: "/hostile/workspace", principal: "hostile" }, limit: 16 }).nodes).toEqual([]);
    expect(hxOf(projection, { invocationId: "hostile-invocation" })).toEqual([]);
  });

  it("W11 the frozen adapter result is applied as it is, through refresh and relate only", async () => {
    const { registry } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const spies = {
      ingest: vi.spyOn(projection, "ingest"),
      refresh: vi.spyOn(projection, "refresh"),
      markStale: vi.spyOn(projection, "markStale"),
      disconnect: vi.spyOn(projection, "disconnect"),
      reconnect: vi.spyOn(projection, "reconnect"),
      relate: vi.spyOn(projection, "relate"),
    };
    const { observation } = observing(projection);
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
    expect(Object.fromEntries(Object.entries(spies).map(([name, spy]) => [name, spy.mock.calls.length]))).toEqual({
      ingest: 0,
      refresh: 1,
      markStale: 0,
      disconnect: 0,
      reconnect: 0,
      relate: 1,
    });
    const expected = hyperunixTopology(result.value as JsonValue, {
      scope: SCOPE,
      target: TARGET,
      capturedAt: T0,
      observedAt: T1,
      invocationId: INVOCATION,
      operationRef: nodeCallRef(INVOCATION, nodeCall(result).callId),
    });
    const applied = spies.refresh.mock.calls[0]?.[0];
    expect(applied).toEqual(expected.snapshots[0]);
    expect(Object.isFrozen(applied)).toBe(true);
    expect(spies.relate.mock.calls[0]?.[0]).toEqual(expected.relations[0]);
  });

  it("W12 an adapter refusal is a typed diagnostic that projects nothing; a reading's diagnostics stay the adapter's (at most 8)", async () => {
    const refusals: Array<{ readonly name: string; readonly category: string; readonly message: string } | undefined> = [];
    for (const [document, workspaceRoot] of [
      [hxDocument({ execution_status: { kind: "mutation-rejected", diagnostic_code: null } }), SCOPE.workspace],
      [hxDocument(), "/elsewhere/wb-79k.1"],
    ] as const) {
      const { registry } = hxRegistry(document, workspaceRoot);
      const projection = projectionOf();
      const { observation, outcomes } = observing(projection);
      const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
      expect(result.status).toBe("completed");
      expect(projection.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
      expect(outcomes.map(outcome => ({ result: outcome.result, related: outcome.related, diagnostics: outcome.diagnostics.length }))).toEqual([
        { result: "diagnostic", related: 0, diagnostics: 1 },
      ]);
      refusals.push(outcomes[0]?.refusal);
    }
    expect(refusals.map(refusal => [refusal?.name, refusal?.category])).toEqual([
      ["CapabilityError", "validation"],
      ["CapabilityError", "authorization"],
    ]);

    const { registry } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const { observation, outcomes } = observing(projection);
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
    const expected = hyperunixTopology(result.value as JsonValue, {
      scope: SCOPE,
      target: TARGET,
      capturedAt: T0,
      observedAt: T1,
      invocationId: INVOCATION,
      operationRef: nodeCallRef(INVOCATION, nodeCall(result).callId),
    });
    expect(outcomes.map(outcome => ({ result: outcome.result, related: outcome.related, diagnostics: outcome.diagnostics }))).toEqual([
      { result: "applied", related: 1, diagnostics: expected.diagnostics },
    ]);
    expect(expected.diagnostics.length).toBeLessThanOrEqual(8);
  });

  it("W13 the one invoke carries exactly the host's grants, none of them a reconcile permission", async () => {
    const { registry } = hxRegistry(hxDocument());
    const invoke = vi.spyOn(registry, "invoke");
    const projection = projectionOf();
    const { observation, outcomes } = observing(projection);
    await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
    expect(invoke.mock.calls.map(([id, , context]) => ({ id, grants: [...context.grants] }))).toEqual([{ id: "hyperunix.find", grants: ["hyperunix:read"] }]);
    expect(invoke.mock.calls.flatMap(([, , context]) => context.grants).filter(grant => grant.startsWith("reconcile:"))).toEqual([]);
    expect(outcomes.map(outcome => outcome.result)).toEqual(["applied"]);
  });

  it("W14 a failed read and another capability's value reach no adapter call", async () => {
    const failing = new CapabilityRegistry();
    registerHyperUnixFind(
      failing,
      {
        find: async () => {
          throw new Error("wb-79k.1 fake hx read failure");
        },
        runtime: async () => ({ version: "0.1.0", binarySha256: BINARY }),
        close: async () => {},
      },
      SCOPE.workspace,
    );
    const other = new CapabilityRegistry();
    const { registry: shaped } = hxRegistry(hxDocument());
    const value = await shaped.invoke("hyperunix.find", TARGET, { grants: ["hyperunix:read"], signal: new AbortController().signal });
    other.register({
      descriptor: { id: "record.read", version: "1.0.0", description: "fixture read", inputSchema: { type: "object" }, effectClass: "read", permissions: ["hyperunix:read"], supportedModes: ["invoke"] },
      invoke: async () => value,
    });
    const statuses: string[] = [];
    for (const [registry, script] of [
      [failing, SCRIPT],
      [other, `${HEAD}return await node("record.read", {});`],
    ] as const) {
      const projection = projectionOf();
      const { observation, outcomes } = observing(projection);
      statuses.push((await runWorkflow({ script, host: hostOf(registry, observation) })).status);
      expect({ outcomes: outcomes.length, stats: projection.stats() }).toEqual({ outcomes: 0, stats: { nodes: 0, events: 0, edges: 0 } });
    }
    expect(statuses).toEqual(["failed", "completed"]);
  });

  it("W15 the grouping source is the node call as the run's projection names it: the stated execution id, if any", async () => {
    const sources: Array<readonly string[]> = [];
    for (const [execution, source] of [
      ["hx-exec-79k1", (): NativeRef => ({ provider: "hyperunix", type: "operation", id: "hx-exec-79k1" })],
      [null, (result: WorkflowRunResult): NativeRef => nodeCallRef(INVOCATION, nodeCall(result).callId)],
    ] as const) {
      const { registry } = hxRegistry(hxDocument({ execution_id: execution }));
      const projection = projectionOf();
      const { observation } = observing(projection);
      const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
      expect(nodeCall(result).nativeId).toBe(execution ?? undefined);
      sources.push(hxOf(projection, { parent: source(result) }).map(node => node.kind));
    }
    expect(sources).toEqual([["hyperunix.query.snapshot"], ["hyperunix.query.snapshot"]]);
  });

  it("W16 a snapshot the projection does not admit states no edge: an out-of-order or refused refresh never reaches relate", async () => {
    for (const answer of ["out-of-order", "refused"] as const) {
      const { registry } = hxRegistry(hxDocument());
      const { observation, outcomes } = observing(projectionOf());
      const relate = vi.fn();
      const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, { ...observation, refresh: () => answer, relate }) });
      expect(result.status).toBe("completed");
      expect(relate).not.toHaveBeenCalled();
      expect(outcomes.map(outcome => ({ result: outcome.result, related: outcome.related, refusal: outcome.refusal }))).toEqual([{ result: answer, related: 0, refusal: undefined }]);
    }
  });

  it("W17 a refresh that throws is a typed diagnostic with nothing projected, keeping a CapabilityError's own category", async () => {
    const refusals: Array<readonly [string, string | undefined]> = [];
    for (const failure of [new Error("wb-79k.3 fake refresh failure"), new CapabilityError("authorization", "wb-79k.3 fake refresh refusal")]) {
      const { registry } = hxRegistry(hxDocument());
      const projection = projectionOf();
      const { observation, outcomes } = observing(projection);
      const relate = vi.fn();
      const refresh = (): never => {
        throw failure;
      };
      const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, { ...observation, refresh, relate }) });
      expect(result.status).toBe("completed");
      expect(relate).not.toHaveBeenCalled();
      expect(projection.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
      expect(outcomes.map(outcome => ({ result: outcome.result, related: outcome.related, diagnostics: outcome.diagnostics, name: outcome.refusal?.name }))).toEqual([
        { result: "diagnostic", related: 0, diagnostics: [failure.message], name: "CapabilityError" },
      ]);
      refusals.push([outcomes[0]?.refusal?.message ?? "", outcomes[0]?.refusal?.category]);
    }
    expect(refusals).toEqual([
      ["wb-79k.3 fake refresh failure", "validation"],
      ["wb-79k.3 fake refresh refusal", "authorization"],
    ]);
  });

  it("W18 relate refusing the edge of an applied snapshot is a typed refusal beside applied, after the adapter's own diagnostics", async () => {
    const { registry } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const { observation, outcomes } = observing(projection);
    const relate = (): never => {
      throw new Error("wb-79k.3 fake relate refusal");
    };
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, { ...observation, relate }) });
    expect(result.status).toBe("completed");
    const expected = hyperunixTopology(result.value as JsonValue, {
      scope: SCOPE,
      target: TARGET,
      capturedAt: T0,
      observedAt: T1,
      invocationId: INVOCATION,
      operationRef: nodeCallRef(INVOCATION, nodeCall(result).callId),
    });
    expect(outcomes.map(outcome => ({ result: outcome.result, related: outcome.related, diagnostics: outcome.diagnostics, category: outcome.refusal?.category }))).toEqual([
      { result: "applied", related: 0, diagnostics: [...expected.diagnostics.slice(0, 7), "wb-79k.3 fake relate refusal"], category: "validation" },
    ]);
    expect(hxOf(projection)).toHaveLength(1);
  });

  it("W19 a host clock that throws reads as no instant: a typed diagnostic, nothing projected, and the node still answers", async () => {
    const { registry } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const { observation, outcomes } = observing(projection, () => {
      throw new Error("wb-79k.3 fake clock failure");
    });
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, observation) });
    expect(result.status).toBe("completed");
    expect(outcomes.map(outcome => [outcome.result, outcome.related, outcome.refusal?.category])).toEqual([["diagnostic", 0, "validation"]]);
    expect(projection.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
  });

  it("W20 a throwing onObserved listener never reaches the node's value: the run completes with the registry's answer and the snapshot projected", async () => {
    const { registry } = hxRegistry(hxDocument());
    const projection = projectionOf();
    const { observation } = observing(projection);
    const onObserved = (): never => {
      throw new Error("wb-79k.3 fake listener failure");
    };
    const result = await runWorkflow({ script: SCRIPT, host: hostOf(registry, { ...observation, onObserved }) });
    expect(result.status).toBe("completed");
    expect(hxOf(projection)).toHaveLength(1);
    const unobserved = await runWorkflow({
      script: SCRIPT,
      host: createClaudeWorkflowHost({ cwd: SCOPE.workspace, query: NO_AGENTS, capabilities: hxRegistry(hxDocument()).registry, grants: ["hyperunix:read"], invocationId: INVOCATION }),
    });
    expect(result.value).toEqual(unobserved.value);
  });
});
