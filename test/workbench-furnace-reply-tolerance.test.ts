/**
 * wb-lrz.6 (FURNACE-PI-R2): Pi's Furnace reply readers keep accepting a reply that carries additive unknown members
 * beside the members they read, and still refuse a reply that is missing a member they require. The duty is Furnace's,
 * addressed to clients: "Clients MUST be able to ignore additive fields within the same compatible protocol version."
 * (FRN-PRO-002, Furnace docs/initial-setup/02-atomic-requirements.md:162@8f20e9bb8).
 *
 * Four readers are covered here, each through the hermetic fake-client seam its own suite already uses (no Furnace
 * binary, no network, no bridge socket, no scratch directory):
 *   run status    FurnaceObserver.snapshot() reading runs.get().status()  src/workbench/furnace-observer.ts
 *   attempt list  FurnaceObserver.snapshot() reading attempts.list()      src/workbench/furnace-observer.ts
 *   run inspect   the registered furnace.run.inspect capability           src/workbench/providers/furnace.ts
 *   run start     FurnaceHostedExecutor.start() reading runs.start()      src/workbench/hosts/furnace-hosted.ts
 * The fifth reader, logs read (src/workbench/furnace-evidence.ts), is deliberately NOT repeated here: wb-6ze.8's fixture
 * already feeds additive members through it (test/workbench-furnace-evidence.test.ts:239-254) and that suite's
 * malformed-shape table covers its missing-required half (:385-396). The observer's own logs read below is fed only its
 * green fixture for the same reason.
 *
 * Every covered reader gets the same three rows, all built from ONE green fixture per reader:
 *   additive  the fixture plus ONE unknown top-level member, graph_ref {relation: "x"}, and ONE unknown nested member,
 *             graph_node; the produced reading is deep-equal (toStrictEqual) to the green fixture's reading.
 *   missing   the fixture with one required member removed; the reader refuses with the typed category it uses today.
 *   green     the fixture alone, read first, so the additive comparison is never vacuous.
 * Where each unknown member goes, per reader (the top-level member sits at the top of the reply payload the reader
 * validates first; the nested member sits inside an object nested in that payload):
 *   run status    data.graph_ref, and data.controller.graph_node (RunDto.controller, the liveness record run status reports)
 *   attempt list  data.graph_ref, and data.attempts[0].graph_node (an Attempt item)
 *   run inspect   data.graph_ref, and data.controller.graph_node (the Run record's controller)
 *   run start     graph_ref beside record and requestId, and record.graph_node (the hosted client's reply carries its
 *                 payload as record, the SDK StartedRun shape, so the reply object is its top level)
 * No row compares key sets: a reader is pinned on what it reads, never on what else a reply may carry. The source census
 * at the end pins the same property on the four reader files.
 */
import { readFileSync } from "node:fs";
import type { AttemptDto, AttemptListDto, ControllerDto, LogsReadDto, Response, ResponseKind, RunDto, RunStatusDto } from "@furnace/sdk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { FurnaceObserver, type FurnaceObserverClient, type FurnaceObserverOptions } from "../src/workbench/furnace-observer.js";
import { type FurnaceHostedClient, FurnaceHostedExecutor, type FurnaceSdk, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
import { FURNACE_RUN_INSPECT_CONTRACT, type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";

/** A workspace path nothing creates: the inspect provider canonicalizes it, and an absent path canonicalizes to itself. */
const WORKSPACE = "/workspace/furnace-reply-tolerance";
const RUN = "frn-run-tolerance-1";
const BEADS_RUN = "bd-run-tolerance-1";
const CLOCK = "2026-10-17T07:00:00.000Z";
/** The unknown top-level member, exactly as the bead names it. */
const TOP_LEVEL = { graph_ref: { relation: "x" } } as const;
/** The unknown nested member. */
const NESTED = { graph_node: { id: "frn-node-fixture" } } as const;

/** The fixture plus extra members. The result keeps the fixture's type: a reader is typed for what it reads. */
function withMembers<T extends object>(value: T, extra: Readonly<Record<string, unknown>>): T {
  return { ...value, ...extra };
}
/** The fixture with one required member removed: no longer the DTO its type names, which is the point of the row. */
function without<T extends object>(value: T, member: keyof T): T {
  const copy: { -readonly [K in keyof T]?: T[K] } = { ...value };
  delete copy[member];
  return copy as T;
}
function envelope<T>(kind: ResponseKind, data: T): Response<T> {
  return { protocolVersion: 1, kind, requestId: `req-${kind}`, data, exit: { code: 0, signal: null }, stderr: "" };
}

const CONTROLLER: ControllerDto = {
  live: true, pid: 4242, start_fingerprint: "fixture-fingerprint", controller_session_id: "fixture-session", hostname: "fixture-host", started_at: "2026-10-15T00:00:00Z", executable_hint: null,
};
const RECORD: RunDto = {
  run_id: RUN, beads_run_id: BEADS_RUN, workspace: WORKSPACE, state: "active", mode: "ephemeral_wisp", furnace_version: "0.1.0", created_at: "2026-10-15T00:00:00Z",
  updated_at: "2026-10-15T00:00:01Z", state_since: "2026-10-15T00:00:01Z", executor: "runner", max_parallel: 1, attempt_timeout: "off", controller: CONTROLLER,
};
const STATUS: RunStatusDto = {
  ...RECORD, active: [], failed: [], failed_total: 0, attention: [], unreadable: [], corrupt_events: [], corrupt_events_total: 0, conflicts: [], completed: 0, total: 1,
};
const ATTEMPT: AttemptDto = {
  attempt_id: "frn-atm-tolerance-1", run_id: RUN, work_id: "bd-work-tolerance", ordinal: 1, executor: "runner", controller_session_id: "fixture-session", state: "running", created_at: "2026-10-15T00:00:01Z", started_at: "2026-10-15T00:00:02Z",
};
const ATTEMPTS: AttemptListDto = { run_id: RUN, beads_run_id: BEADS_RUN, complete: true, limit: 5, returned: 1, next_cursor: null, attempts: [ATTEMPT], unreadable: [] };
const LOGS: LogsReadDto = { run_id: RUN, attempt_id: ATTEMPT.attempt_id, stream: "stdout", complete: true, limit: 512, returned: 1, next_cursor: null, lossy: false, lines: ["fixture line"] };

describe("Furnace observer: run status and attempt list readers (FRN-PRO-002)", () => {
  interface Replies { status: RunStatusDto; attempts: AttemptListDto; logs: LogsReadDto }
  const GREEN: Replies = { status: STATUS, attempts: ATTEMPTS, logs: LOGS };
  const OPTIONS: FurnaceObserverOptions = {
    workspaceRoot: WORKSPACE, runId: RUN, scope: { workspace: WORKSPACE, principal: "fixture-principal" },
    limits: { maxPolls: 1, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 },
  };
  function client(replies: Replies): FurnaceObserverClient {
    return {
      runs: { get: () => ({ status: async () => envelope("run_status", replies.status) }) },
      attempts: { list: async () => envelope("attempt_list", replies.attempts) },
      logs: { read: async () => envelope("logs_read", replies.logs) },
    };
  }
  const read = (replies: Replies) => new FurnaceObserver(client(replies), OPTIONS).snapshot();

  // The reading stamps capturedAt/observedAt/lastConfirmedAt from the host clock; one frozen clock makes two readings comparable whole.
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(CLOCK));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reads the green fixture: the members beside each additive member are the ones the reading carries", async () => {
    const reading = await read(GREEN);
    expect(reading.capturedAt).toBe(CLOCK);
    expect(reading.run).toMatchObject({ state: "active", controllerLive: "yes", progress: { completed: 0, total: 1 } });
    expect(reading.attempts).toMatchObject({ complete: true, returned: 1, items: [{ id: ATTEMPT.attempt_id, runId: RUN, workId: ATTEMPT.work_id, state: "running" }] });
    expect(reading.source).toMatchObject({ runId: RUN, beadsRunId: BEADS_RUN, workspaceRoot: WORKSPACE });
  });

  it("run status: an unknown top-level member and an unknown member inside the run's controller leave the reading unchanged", async () => {
    const status = withMembers(STATUS, { ...TOP_LEVEL, controller: withMembers(CONTROLLER, NESTED) });
    expect(await read({ ...GREEN, status })).toStrictEqual(await read(GREEN));
  });

  it("attempt list: an unknown top-level member and an unknown member inside an Attempt item leave the reading unchanged", async () => {
    const attempts = withMembers(ATTEMPTS, { ...TOP_LEVEL, attempts: [withMembers(ATTEMPT, NESTED)] });
    expect(await read({ ...GREEN, attempts })).toStrictEqual(await read(GREEN));
  });

  it("run status: a reply missing run.workspace still refuses (authorization)", async () => {
    await expect(read({ ...GREEN, status: without(STATUS, "workspace") })).rejects.toMatchObject({ category: "authorization" });
  });

  it("attempt list: a reply missing the page's run identity still refuses (unavailable)", async () => {
    await expect(read({ ...GREEN, attempts: without(ATTEMPTS, "run_id") })).rejects.toMatchObject({ category: "unavailable" });
  });
});

describe("Furnace run inspect provider reader (FRN-PRO-002)", () => {
  type InspectReply = Awaited<ReturnType<ReturnType<FurnaceReadClient["runs"]["get"]>["inspect"]>>;
  const GREEN: InspectReply = { kind: "run_inspect", requestId: "req-run_inspect", exit: { code: 0, signal: null }, data: RECORD };
  async function read(reply: InspectReply) {
    const registry = new CapabilityRegistry();
    registerFurnaceRunInspect(registry, { runs: { get: () => ({ inspect: async () => reply }) } }, WORKSPACE);
    return registry.invoke("furnace.run.inspect", { runId: RUN }, { grants: ["furnace:inspect"], signal: new AbortController().signal });
  }

  it("reads the green fixture as its contract, its workspace and the native reply", async () => {
    expect(await read(GREEN)).toStrictEqual({ contract: FURNACE_RUN_INSPECT_CONTRACT, workspaceRoot: WORKSPACE, source: GREEN });
  });

  it("an unknown top-level member and an unknown member inside the record's controller leave the reading unchanged", async () => {
    // This reader passes the native reply through verbatim (providers/furnace.ts), so "unchanged" means: the same
    // contract and workspace as the green reading, and a source equal to the reply it was fed, member for member.
    const reply: InspectReply = { ...GREEN, data: withMembers(RECORD, { ...TOP_LEVEL, controller: withMembers(CONTROLLER, NESTED) }) };
    expect(await read(reply)).toStrictEqual({ contract: FURNACE_RUN_INSPECT_CONTRACT, workspaceRoot: WORKSPACE, source: reply });
  });

  it("a reply missing record.run_id still refuses (unavailable)", async () => {
    await expect(read({ ...GREEN, data: without(RECORD, "run_id") })).rejects.toMatchObject({ category: "unavailable" });
  });
});

describe("Furnace-hosted run start reader (FRN-PRO-002)", () => {
  type StartReply = Awaited<ReturnType<FurnaceHostedClient["runs"]["start"]>>;
  const GREEN: StartReply = { record: { run_id: RUN, beads_run_id: BEADS_RUN }, requestId: "req-run_start" };
  let closes = 0;
  /** Stands in for the SDK's EmbeddedHost: the start reader never reaches the bridge, so no socket, config file or
   * scratch directory is made, and the config path below is never opened (the fake client reads nothing from it). */
  class StandInHost {
    async open(): Promise<void> {}
    writeConfig(): string {
      return "/workspace/furnace-reply-tolerance/never-written.toml";
    }
    async close(): Promise<void> {
      closes += 1;
    }
  }
  /** The shipped SDK with the host stood in and context decoding stubbed: the vendored copy's decode preflight is
   * irrelevant to the reply reader under test, which reads only what client.runs.start returns. */
  const SDK: FurnaceSdk = {
    ...SHIPPED_FURNACE_SDK,
    EmbeddedHost: StandInHost as unknown as FurnaceSdk["EmbeddedHost"],
    decodeContextValue: ((document: unknown) => document) as FurnaceSdk["decodeContextValue"],
  };
  const executorFor = (reply: StartReply) =>
    new FurnaceHostedExecutor({ executor: "pi-hosted", workflow: async () => ({ status: "success" }), sdk: SDK, createClient: () => ({ runs: { start: async () => reply } }) });
  async function read(reply: StartReply) {
    const executor = executorFor(reply);
    try {
      return { started: await executor.start({ formula: "fixture" }), run: executor.receipt().run };
    } finally {
      await executor.close();
    }
  }
  beforeEach(() => {
    closes = 0;
  });

  it("reads the green fixture as the Run identity and the request that created it", async () => {
    const expected = { runId: RUN, beadsRunId: BEADS_RUN, requestId: "req-run_start" };
    expect(await read(GREEN)).toStrictEqual({ started: expected, run: expected });
  });

  it("an unknown top-level member and an unknown member inside the record leave the reading unchanged", async () => {
    const reply = withMembers(GREEN, { ...TOP_LEVEL, record: withMembers(GREEN.record, NESTED) });
    expect(await read(reply)).toStrictEqual(await read(GREEN));
  });

  it.each([
    ["record.run_id", { ...GREEN, record: without(GREEN.record, "run_id") }],
    ["record.beads_run_id", { ...GREEN, record: without(GREEN.record, "beads_run_id") }],
    ["requestId", without(GREEN, "requestId")],
  ] satisfies [string, StartReply][])("a reply missing %s refuses as an uncertain start and records no Run", async (_member, reply) => {
    const executor = executorFor(reply);
    await expect(executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "uncertain-effect" });
    const receipt = executor.receipt();
    expect(receipt.state).toBe("start-uncertain");
    expect(receipt.run).toBeUndefined();
    expect(closes).toBe(1);
    // The adapter's existing guard: an uncertain start is never followed by a second, blind one.
    await expect(executor.start({ formula: "fixture" })).rejects.toMatchObject({ category: "uncertain-effect" });
    await executor.close();
  });
});

/**
 * Source census over the four reader files (AC4): no reader enumerates the members of a native reply, so none can
 * count them (an Object.keys(...).length guard) or compare them with a literal list. The only key enumerations the four
 * files hold are over caller-supplied options, named below; a new enumeration over anything else fails here and must be
 * justified in the change that adds it. Every `.kind` test is a strict equality against one literal, never a lookup in a
 * collection of kinds, and the per-verb reply-kind checks stay in place. The census reads source text; the falsifier
 * rows prove each pattern is seen.
 */
describe("Furnace reply reader source census (FRN-PRO-002)", () => {
  const READERS = ["src/workbench/furnace-observer.ts", "src/workbench/furnace-evidence.ts", "src/workbench/providers/furnace.ts", "src/workbench/hosts/furnace-hosted.ts"] as const;
  const sourceOf = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  /** Every own-key enumeration in a source text: Object.keys/values/entries/getOwnPropertyNames/getOwnPropertySymbols,
   * Reflect.ownKeys, and for-in loops, each with the expression it enumerates. */
  function keyEnumerations(source: string): string[] {
    const found: string[] = [];
    for (const match of source.matchAll(/\b(?:Object\.(?:keys|values|entries|getOwnPropertyNames|getOwnPropertySymbols)|Reflect\.ownKeys)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) found.push(match[0]);
    for (const match of source.matchAll(/\bfor\s*\(\s*(?:const|let|var)\s+[\w$]+\s+in\s+([^)]+)\)/g)) found.push(`for-in ${match[1]?.trim() ?? ""}`);
    return found;
  }
  /** Every `.kind` test that is NOT a strict equality against one quoted literal: loose equality, a non-literal
   * right-hand side, or a lookup in a collection of kinds. */
  function nonLiteralKindTests(source: string): string[] {
    const found: string[] = [];
    for (const match of source.matchAll(/[\w$.]*\.kind\s*(===|!==|==|!=)\s*([^\s;)&|?:,]+)/g)) {
      const [whole, operator, right] = match;
      if ((operator !== "===" && operator !== "!==") || !/^(['"])[\w-]+\1$/.test(right ?? "")) found.push(whole);
    }
    for (const match of source.matchAll(/\.kind\b[^;\n]*\b(?:includes|has|indexOf)\(|\b(?:includes|has|indexOf)\([^)\n]*\.kind\b|\bRESPONSE_KINDS\b/g)) found.push(match[0]);
    return found;
  }
  const ALLOWED_ENUMERATIONS: Readonly<Record<(typeof READERS)[number], readonly string[]>> = {
    "src/workbench/furnace-observer.ts": ["Object.entries(limits)"],
    "src/workbench/furnace-evidence.ts": [],
    "src/workbench/providers/furnace.ts": [],
    "src/workbench/hosts/furnace-hosted.ts": ["Object.entries(request.vars ?? {})"],
  };

  it("no reader file enumerates a native reply's members: the only enumerations are over caller-supplied options", () => {
    for (const path of READERS) expect(keyEnumerations(sourceOf(path)), path).toStrictEqual(ALLOWED_ENUMERATIONS[path]);
  });

  it("every kind test in the reader files is a strict equality against one literal, and the per-verb reply-kind checks remain", () => {
    for (const path of READERS) expect(nonLiteralKindTests(sourceOf(path)), path).toStrictEqual([]);
    const observer = sourceOf("src/workbench/furnace-observer.ts");
    for (const check of ["status.kind!=='run_status'", "attempts.kind!=='attempt_list'", "response.kind!=='logs_read'"]) expect(observer).toContain(check);
    expect(sourceOf("src/workbench/furnace-evidence.ts")).toContain('answer.kind !== "logs_read"');
  });

  it("falsifiers: the census sees every enumeration and non-literal kind shape, and passes field reads and literal kind checks", () => {
    expect(keyEnumerations("if(Object.keys(run).length!==20) throw refusal;")).toStrictEqual(["Object.keys(run)"]);
    expect(keyEnumerations("const names = Object.getOwnPropertyNames(record).sort().join(',');")).toStrictEqual(["Object.getOwnPropertyNames(record)"]);
    expect(keyEnumerations("if (Object.values(history).length > 10) fail();")).toStrictEqual(["Object.values(history)"]);
    expect(keyEnumerations("if (Object.entries(answer.data).length !== 11) fail();")).toStrictEqual(["Object.entries(answer.data)"]);
    expect(keyEnumerations("if (!Reflect.ownKeys(started).every(key => KNOWN.has(key))) fail();")).toStrictEqual(["Reflect.ownKeys(started)"]);
    expect(keyEnumerations("for (const key in data) if (!KNOWN.has(key)) fail();")).toStrictEqual(["for-in data"]);
    expect(keyEnumerations("if(run.run_id!==runId||typeof run.beads_run_id!=='string') fail(); if ('code' in error) note();")).toStrictEqual([]);
    expect(nonLiteralKindTests("if(!['run_status','run_list'].includes(status.kind)) fail();")).toHaveLength(1);
    expect(nonLiteralKindTests("if(!RESPONSE_KINDS.includes(answer.kind)) fail();")).toHaveLength(2);
    expect(nonLiteralKindTests("if(status.kind!=expected) fail();")).toStrictEqual(["status.kind!=expected"]);
    expect(nonLiteralKindTests("if(status.kind!==expected) fail();")).toStrictEqual(["status.kind!==expected"]);
    expect(nonLiteralKindTests("if(status.kind!=='run_status') fail(); if (answer.kind !== \"logs_read\") fail();")).toStrictEqual([]);
  });
});
