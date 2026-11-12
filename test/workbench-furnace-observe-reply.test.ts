/**
 * wb-752.13 (VC-4 W13-Fw/W16-Bw2; EAT-R349): furnace_observe answers in the bounded, sanitized workbench.tool-reply/v1 dialect
 * over the Run's own viewport.
 *
 * Specs pinned (docs/workbench in this repository):
 * - 11 "First public Pi tools (proposed)": "workflow_observe(ref,selectors?,cursor?,limit?): bounded native snapshot, event
 *   window, aggregates, freshness, anomaly evidence." (C1)
 * - 09 "Freshness and ambiguity": "A disconnected Furnace event stream must not make a previously RUNNING node permanently
 *   authoritative RUNNING; it becomes last-known-running + stale. Pi tool summaries must communicate that nuance." (C2)
 * - 11: "Use compact structured schema, discover more capability detail on demand" (C3, the byte cap)
 * - 09 "Acceptance/negative controls" item 10: "Large/secret payload does not leak into Pi tool result or screen by default."
 *   (C4)
 * - EAT-R349 (DX triage 2026-11-11): "Registered furnace_observe MUST return successes and refusals through the bounded
 *   sanitized workbench.tool-reply/v1 contract." (C1, C3, C5)
 *
 * THE PINNED READER SET (this file; each case title opens with its id):
 * - G0: target observeInvocation over an ObservationProjection refreshed with the observer's Run snapshot; observed: without
 *   FurnaceObserverOptions.traceRun the Run viewport serves zero rows (window.total 0, nodes [], "no nodes returned": the
 *   reader gap of record), and with it the Run row, then its Attempt rows.
 * - C1: target furnaceObserveReply over a complete fixture Run with two Attempts; observed: the envelope's contract, tool, ok,
 *   invoked, runId and maxBytes, its source equal to the reading's sanitized source, its observe reply (workbench.observe/v1,
 *   invocationId the Run ID, the Run row and the two Attempt rows, all current), and no key `contract` anywhere whose value is
 *   furnace.external-observation/v1.
 * - C1R: target the registered furnace_observe (boot harness, counting fake furnace first on PATH); observed: the data reply
 *   parses to the same envelope shape with the Run and Attempt rows, and its text is furnaceObserveReply's for the projection
 *   the call refreshed, read at the same fixed Date.
 * - C2: target furnaceObserveFailure after a refresh and a failed read; observed: the unavailable refusal carries lastKnown,
 *   whose Run row is stale and disconnected and whose freshness reads one last-known-running + stale.
 * - C2R: target the registered tool, one call answered and one failing; observed: the second reply is the typed unavailable
 *   refusal with lastKnown's Run row stale, and ObservationProjection.prototype.markStale was called once, with exactly the
 *   Run's ref under the call's scope.
 * - C3: target furnaceObserveReply over 20-Attempt fixtures written in ASCII, quote-escaped and non-ASCII shapes, at every
 *   cap of CAPS; observed: the UTF-8 byte length (TextEncoder) of each reply text is at most its cap, and each reply either
 *   states its truncation (observe.truncatedForBytes with droppedForBytes, or omitted facts, beside returned + dropped
 *   equal to the page's rows) or is the typed invalid-request refusal; at the 1024-byte floor too.
 * - C3P: target furnaceObserveReply over the 20-Attempt fixture; observed: 21 rows offered, 20 returned on the first page with
 *   a cursor, and the cursor's page returns the 21st.
 * - C4: target furnaceObserveReply (and the registered tool for the line-split case); observed: the probes "Bearer
 *   abc123def456" in an Attempt executor, a log cursor, the beads Run ID and the producer version, and the line-split
 *   "Authorization: Bearer" + newline + value in the beads Run ID, never reach the reply text.
 * - C5: target the registered tool's refusals; observed: no grant and an invalid Run ID each read exactly
 *   furnaceObserveRefusal's text for their code, the grant set ["workbench:observe"] still refuses, with zero fake furnace
 *   invocations each, every error code is a member of FURNACE_OBSERVE_ERROR_CODES, and a Run the fake cannot answer (exit
 *   2, no envelope; the absent state root's shape here) is the typed unavailable refusal.
 * - C6: target every workbench tool the extension registers (mode C minus mode A), each called with {} under zero grants, and
 *   furnace_observe's granted data reply; observed: no reply's contract is a provider reading contract, and the judge reds a
 *   planted raw reading reply.
 *
 * NOT CLAIMED (scope sentences): the real furnace binary's own envelopes (every native read here is the counting fake or an
 * in-memory client), Beads Work linkage (not in this cut: docs/workbench/receipts/wb-752.13.md names the landed census it
 * conflicts with), what FurnaceObserver reads from a Run and what the shared sanitizers do (both sides of every comparison use
 * them), and caps outside 1024..65536 (refused before any read).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { BEADS_WORK_CONTRACT } from "../src/workbench/beads-observer.js";
import { FURNACE_OBSERVE_ERROR_CODES, FURNACE_OBSERVE_TOOL, type FurnaceObserveView, furnaceObserveFailure, furnaceObserveRefusal, furnaceObserveReply } from "../src/workbench/furnace-observe-reply.js";
import { FURNACE_EXTERNAL_OBSERVATION_CONTRACT, FurnaceObserver, type FurnaceReading } from "../src/workbench/furnace-observer.js";
import { HYPERUNIX_OBSERVATION_CONTRACT } from "../src/workbench/hyperunix-observer.js";
import { ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { OBSERVE_CONTRACT, observeInvocation } from "../src/workbench/observe-query.js";
import { REACTIVEFIBER_OBSERVATION_CONTRACT } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { type CountingCli, type FixtureAttempt, type FixtureRun, furnaceAnswers, furnaceMissing, installCountingCli, memoryFurnace } from "./helpers/furnace-observe-fakes.js";
import { atFixedDate, bootServed, firstOnPath, type ServedBoot } from "./helpers/furnace-observe-served-reader.js";
import { installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

const CASE_TIMEOUT_MS = 120_000;
const WORKSPACE = "/fixture/external-ws";
const SCOPE: ObservationScope = { workspace: WORKSPACE, principal: "fixture" };
const LIMITS = { maxPolls: 1, intervalMs: 1000, maxElapsedMs: 30_000, attemptLimit: 20, logBytes: 512, callTimeoutMs: 10_000 } as const;
const RUN_ID = "frn-run-reply-fixture";
/** The raw provider reading contracts the C6 census refuses in any tool reply. */
const PROVIDER_READINGS: readonly string[] = [FURNACE_EXTERNAL_OBSERVATION_CONTRACT, BEADS_WORK_CONTRACT, HYPERUNIX_OBSERVATION_CONTRACT, REACTIVEFIBER_OBSERVATION_CONTRACT];
const CAPS = [1024, 1025, 1100, 1300, 1600, 2048, 3000, 4096, 8192, 16_384, 32_768, 65_536] as const;
const PROBE = "abc123def456";

type Json = Record<string, unknown>;
const parse = (text: string): Json => JSON.parse(text) as Json;
const bytes = (text: string): number => new TextEncoder().encode(text).length;
const textOfResult = (result: unknown): string => {
  const content = (result as { content?: { text?: unknown }[] } | undefined)?.content;
  const text = content?.[0]?.text;
  if (typeof text !== "string") throw new Error("the tool returned no text item");
  return text;
};

function attempts(count: number, shape: (index: number) => Partial<FixtureAttempt> = () => ({})): FixtureAttempt[] {
  return Array.from({ length: count }, (_, index) => ({ attempt_id: `frn-atm-${index + 1}`, work_id: `bd-work-${index + 1}`, state: "running", started_at: "2026-01-01T00:00:01Z", ...shape(index) }));
}

async function viewed(run: FixtureRun): Promise<{ projection: ObservationProjection; reading: FurnaceReading }> {
  const observer = new FurnaceObserver(memoryFurnace(run), { workspaceRoot: WORKSPACE, runId: run.runId, scope: SCOPE, limits: LIMITS, traceRun: true });
  const reading = await observer.snapshot();
  const projection = new ObservationProjection();
  projection.refresh(observer.projectionSnapshot(reading));
  const topology = observer.projectionTopology(reading);
  for (const attempt of topology.snapshots.slice(1)) projection.refresh(attempt);
  for (const relation of topology.relations) projection.relate(relation);
  return { projection, reading };
}

/** The Run viewport the host hands the builders: observeInvocation over the projection, scoped to the Run, with the paging. */
function viewOf(projection: ObservationProjection, bounds: { readonly maxBytes?: number; readonly limit?: number; readonly cursor?: string } = {}): FurnaceObserveView {
  const { maxBytes, limit, cursor } = bounds;
  return {
    runId: RUN_ID,
    maxBytes,
    read: budget => observeInvocation(projection, { scope: SCOPE, invocationId: RUN_ID, maxBytes: budget, ...(limit === undefined ? {} : { limit }), ...(cursor === undefined ? {} : { cursor }) }),
  };
}

/** Every value of a key named `contract` anywhere in a parsed reply. */
function contracts(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(contracts);
  if (typeof value !== "object" || value === null) return [];
  return Object.entries(value).flatMap(([key, child]) => [...(key === "contract" && typeof child === "string" ? [child] : []), ...contracts(child)]);
}

/** C6's judge: the reply text's own contract, when it parses to an object, must not be a provider reading contract. */
function rawReading(text: string): string | undefined {
  try {
    const value: unknown = JSON.parse(text);
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const contract = (value as Json).contract;
      return typeof contract === "string" && PROVIDER_READINGS.includes(contract) ? contract : undefined;
    }
  } catch {}
  return undefined;
}

async function withFake<T>(grants: readonly string[], read: (boot: ServedBoot, fake: CountingCli) => Promise<T>): Promise<T> {
  const fake = installCountingCli("furnace");
  try {
    if (firstOnPath("furnace") !== fake.binary) throw new Error("the counting fake furnace is not first on PATH");
    const boot = await bootServed(grants);
    try {
      return await read(boot, fake);
    } finally {
      boot.restore();
    }
  } finally {
    fake.restore();
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("furnace_observe reply (wb-752.13)", () => {
  it("G0: the reader gap of record - without traceRun the Run viewport serves zero rows; with it the Run row and its Attempt rows", { timeout: CASE_TIMEOUT_MS }, async () => {
    const run: FixtureRun = { runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(2) };
    // The base wiring: the Run snapshot alone, written by an observer without traceRun.
    const base = new FurnaceObserver(memoryFurnace(run), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS });
    const reading = await base.snapshot();
    const untraced = new ObservationProjection();
    untraced.refresh(base.projectionSnapshot(reading));
    const gap = parse(furnaceObserveReply(viewOf(untraced), reading)).observe as Json;
    expect([(gap.window as Json).total, gap.nodes, (gap.freshness as Json).summary], "the measured gap: window.total 0, nodes [], no nodes returned").toStrictEqual([0, [], "no nodes returned"]);
    const traced = await viewed(run);
    const view = parse(furnaceObserveReply(viewOf(traced.projection), traced.reading)).observe as Json;
    expect((view.nodes as Json[]).map(node => (node.nativeRef as Json).type), "the Run row first, then its Attempt rows").toStrictEqual(["run", "attempt", "attempt"]);
  });

  it("C1: the data reply is one tool-reply/v1 envelope carrying provenance and the observe/v1 Run viewport, never the raw reading", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(2) });
    const text = furnaceObserveReply(viewOf(projection), reading);
    const reply = parse(text);
    expect([reply.contract, reply.tool, reply.ok, reply.invoked, reply.runId, reply.maxBytes]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, true, false, RUN_ID, 16_384]);
    expect(reply.source, "the reading's producer provenance, sanitized").toStrictEqual(parse(sanitizeWorkbenchJsonText({ source: reading.source })).source);
    expect((reply.source as Json).ownership).toBe("external");
    expect(Object.keys(reply.attempts as Json), "the Attempt page's counts, never its items").not.toContain("items");
    const observe = reply.observe as Json;
    expect([observe.contract, observe.invocationId, (observe.window as Json).total]).toStrictEqual([OBSERVE_CONTRACT, RUN_ID, 3]);
    expect((observe.nodes as Json[]).map(node => (node.nativeRef as Json).id)).toStrictEqual([RUN_ID, "frn-atm-1", "frn-atm-2"]);
    expect((observe.freshness as Json).summary).toBe("all returned nodes current");
    expect(contracts(reply), "no key contract anywhere holds the raw reading's contract").not.toContain(FURNACE_EXTERNAL_OBSERVATION_CONTRACT);
    expect(contracts(reply)).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, OBSERVE_CONTRACT]);
  });

  it("C1R: the registered furnace_observe answers with that envelope for the Run it refreshed", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      const run: FixtureRun = { runId: RUN_ID, workspace: boot.workspace, attempts: attempts(2) };
      fake.play(furnaceAnswers(run));
      const reply = parse(textOfResult(await atFixedDate(() => boot.call({ runId: RUN_ID }))));
      expect([reply.contract, reply.tool, reply.ok, reply.runId]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, true, RUN_ID]);
      const observe = reply.observe as Json;
      expect((observe.nodes as Json[]).map(node => `${(node.nativeRef as Json).type}:${(node.nativeRef as Json).id}`)).toStrictEqual([`run:${RUN_ID}`, "attempt:frn-atm-1", "attempt:frn-atm-2"]);
      expect(contracts(reply)).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, OBSERVE_CONTRACT]);
      expect(fake.calls().map(argv => argv.find(word => ["run", "attempt", "logs"].includes(word))), "one status, one Attempt page and one log read").toStrictEqual(["run", "attempt", "logs"]);
    });
  });

  it("C2: an attach failure after a refresh carries the Run viewport as last-known-running + stale", { timeout: CASE_TIMEOUT_MS }, async () => {
    const run: FixtureRun = { runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(1) };
    const { projection } = await viewed(run);
    const failing = new FurnaceObserver(memoryFurnace(run, () => Object.assign(new Error("private native detail"), { code: "run_not_found" })), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS, traceRun: true });
    const error = await failing.snapshot().then(() => undefined, (rejected: unknown) => rejected);
    projection.markStale({ scope: SCOPE, ref: { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE } });
    const reply = parse(furnaceObserveFailure(viewOf(projection), error));
    expect([reply.contract, reply.tool, reply.ok, reply.invoked, (reply.error as Json).code, (reply.error as Json).reason]).toStrictEqual([TOOL_REPLY_CONTRACT_VERSION, FURNACE_OBSERVE_TOOL, false, false, "unavailable", "unavailable"]);
    expect((reply.error as Json).message).toBe("Furnace status unavailable (run_not_found)");
    const lastKnown = reply.lastKnown as Json;
    const runRow = (lastKnown.nodes as Json[])[0];
    expect([runRow.freshness, runRow.sourceConnectionState, (runRow.presentation as Json).statusTone]).toStrictEqual(["stale", "disconnected", "active"]);
    expect((lastKnown.freshness as Json).lastKnownRunningStale).toBe(1);
    expect((lastKnown.freshness as Json).summary).toMatch(/^1 last-known-running \+ stale/);
    expect(JSON.stringify(reply)).not.toContain("private native detail");
  });

  it("C2R: the registered tool marks only the Run stale (spied) and answers the typed refusal with its last-known Run row", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      parse(textOfResult(await boot.call({ runId: RUN_ID })));
      fake.play(furnaceMissing());
      const markStale = vi.spyOn(ObservationProjection.prototype, "markStale");
      const reply = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect(markStale).toHaveBeenCalledTimes(1);
      expect(markStale.mock.calls[0]?.[0]).toMatchObject({ scope: { workspace: boot.workspace }, ref: { provider: "furnace", type: "run", id: RUN_ID, scope: boot.workspace } });
      expect([(reply.error as Json).code, ((reply.lastKnown as Json).nodes as Json[])[0]?.freshness]).toStrictEqual(["unavailable", "stale"]);
      expect(((reply.lastKnown as Json).freshness as Json).summary).toMatch(/last-known-running \+ stale/);
    });
  });

  it("C3: every reply text fits its cap in UTF-8 bytes, ASCII, quote-escaped and non-ASCII alike, and states what it left out", { timeout: CASE_TIMEOUT_MS }, async () => {
    const shapes: Record<string, FixtureRun> = {
      ascii: { runId: RUN_ID, workspace: WORKSPACE, beadsRunId: `bd-${"a".repeat(300)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${"x".repeat(80)}-${index}` })) },
      quoted: { runId: RUN_ID, workspace: WORKSPACE, beadsRunId: `bd-${'"\\'.repeat(150)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${'"'.repeat(60)}-${index}` })) },
      nonAscii: { runId: RUN_ID, workspace: WORKSPACE, furnaceVersion: `0.1.0-${String.fromCodePoint(0x20ac).repeat(300)}`, attempts: attempts(20, index => ({ attempt_id: `frn-atm-${String.fromCodePoint(0x6f22).repeat(60)}-${index}` })) },
    };
    const seen: string[] = [];
    for (const [shape, run] of Object.entries(shapes)) {
      const { projection, reading } = await viewed(run);
      for (const cap of CAPS) {
        const text = furnaceObserveReply(viewOf(projection, { maxBytes: cap }), reading);
        expect(bytes(text), `${shape} at ${cap}: the UTF-8 bytes of the reply`).toBeLessThanOrEqual(cap);
        const reply = parse(text);
        if (reply.ok === false) {
          expect((reply.error as Json).code, `${shape} at ${cap}: a cap that cannot hold the viewport is refused typed`).toBe("invalid-request");
          seen.push(`${shape}:${cap}:refused`);
          continue;
        }
        const observe = reply.observe as Json;
        const window = observe.window as Json;
        const dropped = observe.droppedForBytes as Json;
        expect(Number(window.returned) + Number(dropped.nodes), `${shape} at ${cap}: returned + dropped is the page's rows`).toBe(Math.min(20, Number(window.total)));
        const stated = observe.truncatedForBytes === true || Array.isArray(reply.omitted);
        if (Number(window.returned) < Math.min(20, Number(window.total))) expect(stated, `${shape} at ${cap}: a short page says why`).toBe(true);
        seen.push(`${shape}:${cap}:${Number(window.returned)}`);
      }
    }
    expect(seen.filter(entry => entry.endsWith(":1024:refused") || entry.split(":")[1] === "1024"), "the floor was read for each shape").toHaveLength(3);
    expect(seen.some(entry => entry.startsWith("ascii:65536:") && !entry.endsWith(":refused")), "the widest cap returns rows").toBe(true);
  });

  it("C3P: a 20-Attempt Run offers 21 rows, returns 20 with a cursor, and the cursor's page returns the 21st", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(20) });
    const first = parse(furnaceObserveReply(viewOf(projection, { maxBytes: 65_536 }), reading));
    const window = (first.observe as Json).window as Json;
    expect([window.total, window.returned, window.truncated, typeof window.nextCursor]).toStrictEqual([21, 20, true, "string"]);
    const second = parse(furnaceObserveReply(viewOf(projection, { maxBytes: 65_536, cursor: String(window.nextCursor) }), reading));
    const rest = (second.observe as Json).nodes as Json[];
    expect(rest.map(node => (node.nativeRef as Json).id)).toStrictEqual(["frn-atm-20"]);
    const refused = parse(furnaceObserveReply(viewOf(projection, { cursor: "not-a-cursor" }), reading));
    expect([refused.ok, (refused.error as Json).code]).toStrictEqual([false, "invalid-request"]);
  });

  it("C4: credential probes in executors, log cursors, Run IDs and producer versions, line-split ones included, never reach the reply", { timeout: CASE_TIMEOUT_MS }, async () => {
    const { projection, reading } = await viewed({
      runId: RUN_ID,
      workspace: WORKSPACE,
      beadsRunId: `Authorization: Bearer\n${PROBE}ghi`,
      furnaceVersion: `0.1.0 Bearer ${PROBE}`,
      logCursor: `Bearer ${PROBE}`,
      attempts: attempts(1, () => ({ executor: `Bearer ${PROBE}` })),
    });
    const text = furnaceObserveReply(viewOf(projection), reading);
    expect(text).not.toContain(PROBE);
    expect(text).toContain("[REDACTED]");
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, beadsRunId: `Authorization: Bearer\n${PROBE}ghi`, attempts: attempts(1) }));
      const served = textOfResult(await boot.call({ runId: RUN_ID }));
      expect(parse(served).ok, "the full wired reply answered").toBe(true);
      expect(served, "the line-split credential through the full wired reply").not.toContain(PROBE);
    });
  });

  it("C5: the three refusals are typed tool-reply errors with closed codes, and denial makes zero Furnace calls", { timeout: CASE_TIMEOUT_MS }, async () => {
    await withFake([], async (boot, fake) => {
      const denied = textOfResult(await boot.call({ runId: RUN_ID }));
      expect(denied).toBe(furnaceObserveRefusal("not-granted", "Permission denied: furnace:inspect grant required."));
      expect(parse(denied)).toStrictEqual({ contract: TOOL_REPLY_CONTRACT_VERSION, tool: FURNACE_OBSERVE_TOOL, ok: false, invoked: false, error: { code: "not-granted", message: "Permission denied: furnace:inspect grant required." } });
      expect(fake.calls(), "no Furnace call without the grant").toStrictEqual([]);
    });
    await withFake(["workbench:observe"], async (boot, fake) => {
      expect(parse(textOfResult(await boot.call({ runId: RUN_ID }))).error).toStrictEqual({ code: "not-granted", message: "Permission denied: furnace:inspect grant required." });
      expect(fake.calls(), "workbench:observe never implies furnace:inspect").toStrictEqual([]);
    });
    await withFake(["furnace:inspect"], async (boot, fake) => {
      const invalid = textOfResult(await boot.call({ runId: "census-not-a-run" }));
      expect(invalid).toBe(furnaceObserveRefusal("invalid-run-id", "Invalid native Furnace Run identity."));
      expect(fake.calls(), "no Furnace call for an invalid Run ID").toStrictEqual([]);
      const tooSmall = parse(textOfResult(await boot.call({ runId: RUN_ID, maxBytes: 10 })));
      expect([(tooSmall.error as Json).code, fake.calls()]).toStrictEqual(["invalid-request", []]);
      fake.play({});
      const absent = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect([absent.ok, (absent.error as Json).code, absent.runId]).toStrictEqual([false, "unavailable", RUN_ID]);
      fake.play(furnaceMissing());
      const missing = parse(textOfResult(await boot.call({ runId: RUN_ID })));
      expect((missing.error as Json).message).toBe("Furnace status unavailable (run_not_found)");
      for (const reply of [parse(invalid), tooSmall, absent, missing]) expect(FURNACE_OBSERVE_ERROR_CODES as readonly unknown[]).toContain((reply.error as Json).code);
    });
  });

  it("C6: no registered workbench tool answers with a raw provider reading contract, and the judge reds a planted raw reply", { timeout: CASE_TIMEOUT_MS }, async () => {
    const toolsOf = async (settings: Record<string, unknown>): Promise<Map<string, { execute: (...args: unknown[]) => Promise<unknown> }>> => {
      const sandbox = hermeticDir({ settings: { workflowsEnabled: true, ...settings } });
      try {
        const booted = makePi();
        subagentsExtension(booted.pi);
        await booted.lifecycle.get("session_start")?.({}, ctx({ cwd: sandbox.dir }));
        return new Map(booted.tools);
      } finally {
        sandbox.restore();
      }
    };
    const upstream = await toolsOf({});
    const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [] } } });
    const replies: string[] = [];
    try {
      const booted = makePi();
      subagentsExtension(booted.pi);
      const context = ctx({ cwd: sandbox.dir });
      await booted.lifecycle.get("session_start")?.({}, context);
      const workbench = [...booted.tools.keys()].filter(name => !upstream.has(name)).sort();
      expect(workbench, "the census enumerates the registered workbench tools").toContain(FURNACE_OBSERVE_TOOL);
      for (const name of workbench) {
        try {
          replies.push(textOfResult(await booted.tools.get(name).execute("census", {}, undefined, undefined, context)));
        } catch {}
      }
    } finally {
      sandbox.restore();
    }
    expect(replies.map(rawReading).filter(found => found !== undefined), "no zero-grant reply carries a provider reading contract").toStrictEqual([]);
    await withFake(["furnace:inspect"], async (boot, fake) => {
      fake.play(furnaceAnswers({ runId: RUN_ID, workspace: boot.workspace, attempts: attempts(1) }));
      const data = textOfResult(await boot.call({ runId: RUN_ID }));
      expect([rawReading(data), parse(data).contract]).toStrictEqual([undefined, TOOL_REPLY_CONTRACT_VERSION]);
    });
    const { reading } = await viewed({ runId: RUN_ID, workspace: WORKSPACE, attempts: attempts(1) });
    expect(rawReading(sanitizeWorkbenchJsonText(reading)), "the judge reds the old raw reply").toBe(FURNACE_EXTERNAL_OBSERVATION_CONTRACT);
  });
});
