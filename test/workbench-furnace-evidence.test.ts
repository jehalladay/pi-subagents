/**
 * W15-E/VC-5 bounded Furnace Attempt log evidence reader (wb-6ze.8): the docs/workbench/20 § Producer mapping
 * "furnace run" row. Every case pins a docs/workbench clause. The Furnace client is a vi.fn fixture that also carries
 * the native control verbs as spies, and an afterEach proves none of them, nor a Run status read or an Attempt
 * listing, ran in any case; no case needs a Furnace binary, a TTY or the network.
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, type Mock, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  FURNACE_EVIDENCE_CONTRACT, type FurnaceEvidenceContent, type FurnaceEvidenceRequest, readFurnaceAttemptLogEvidence,
} from "../src/workbench/furnace-evidence.js";
import { FurnaceObserver, type FurnaceObserverClient } from "../src/workbench/furnace-observer.js";
import { ObservationProjection } from "../src/workbench/observation.js";

type LogsResponse = Awaited<ReturnType<FurnaceObserverClient["logs"]["read"]>>;
type LogsData = LogsResponse["data"];
type Read = FurnaceObserverClient["logs"]["read"];

const WORKSPACE = "/tmp/furnace-evidence-ws";
const RUN = "frn-run-evidence-1";
const ATTEMPT = "frn-atm-evidence-1-2";
const SIBLING = "frn-atm-evidence-1-1";
const CLOCK = "2026-10-15T09:00:00.000Z";
const MARKER = "[REDACTED]";
/** Terminal escapes, C0/C1 controls, bidi marks and the zero-width set the preview pass strips. */
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069\u200b\u200c\u2060\ufeff]|\u200d/;
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/;
const numbered = (count: number): string[] => Array.from({ length: count }, (_, index) => `line-${index}`);

interface Fixture { client: Pick<FurnaceObserverClient, "logs">; read: Mock<Read>; controls: readonly Mock[] }
const fixtures: Fixture[] = [];

/** docs/workbench/09 § Acceptance/negative controls 8 and docs/workbench/08 § Cancellation and ownership: in every case,
 * aborts included, the injected object's Run status read, Attempt listing and control verbs stay uncalled, and the
 * module performs at most one bounded logs read. */
afterEach(() => {
  for (const made of fixtures.splice(0)) {
    for (const spy of made.controls) expect(spy).not.toHaveBeenCalled();
    expect(made.read.mock.calls.length).toBeLessThanOrEqual(1);
  }
});

function logsData(overrides: Partial<LogsData> = {}): LogsData {
  return {
    run_id: RUN, attempt_id: ATTEMPT, stream: "stderr", complete: true, limit: 4096, returned: 120, next_cursor: null, lossy: false,
    lines: ["first line", "second line"], ...overrides,
  };
}
/** A success envelope around any data, well-formed or not: malformed producer shapes are the point of several cases. */
function envelope(data: unknown, kind = "logs_read", requestId: unknown = "req-logs", stderr = ""): LogsResponse {
  return { protocolVersion: 1, kind, requestId, data, exit: { code: 0, signal: null }, stderr } as unknown as LogsResponse;
}
/** The injected object carries every native control verb; the accepted client type exposes logs alone. */
function fixture(answer: Read = async () => envelope(logsData())): Fixture {
  const read = vi.fn<Read>(answer);
  const status = vi.fn();
  const stop = vi.fn();
  const pause = vi.fn();
  const resume = vi.fn();
  const get = vi.fn(() => ({ status, stop, pause, resume }));
  const list = vi.fn();
  const retry = vi.fn();
  const client = { logs: { read }, runs: { get }, attempts: { list }, work: { retry } };
  const made: Fixture = { client, read, controls: [get, status, stop, pause, resume, list, retry] };
  fixtures.push(made);
  return made;
}
function request(client: Pick<FurnaceObserverClient, "logs">, overrides: Partial<FurnaceEvidenceRequest> = {}): FurnaceEvidenceRequest {
  return {
    client, runId: RUN, workspaceRoot: WORKSPACE,
    owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN, scope: WORKSPACE }, evidenceRefs: [SIBLING, ATTEMPT] },
    attemptId: ATTEMPT, stream: "stderr", maxBytes: 4096, maxLines: 200, timeoutMs: 2000,
    signal: new AbortController().signal, capturedAt: () => CLOCK, ...overrides,
  };
}
async function load(data: Partial<LogsData> = {}, overrides: Partial<FurnaceEvidenceRequest> = {}): Promise<FurnaceEvidenceContent> {
  const made = fixture(async () => envelope(logsData(data)));
  return readFurnaceAttemptLogEvidence(request(made.client, overrides));
}
/** The CapabilityError a read settled with; anything else, a resolution included, fails the case. */
async function refusal(pending: Promise<unknown>): Promise<CapabilityError> {
  try {
    await pending;
  } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
  throw new Error("expected a CapabilityError refusal, but the read resolved");
}
function keysOf(value: unknown, into: string[] = []): string[] {
  if (Array.isArray(value)) for (const item of value) keysOf(item, into);
  else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      into.push(key);
      keysOf(child, into);
    }
  }
  return into;
}
const tick = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));

describe("R1 docs/workbench/20 § Producer mapping (furnace run): bounded read, identity checks, truncated, foreign Attempt unauthorized", () => {
  it("loads a complete stderr read of a listed Attempt as furnace.attempt.log evidence with the producer receipt", async () => {
    const made = fixture();
    const content = await readFurnaceAttemptLogEvidence(request(made.client));
    expect(content).toStrictEqual({
      contract: "workbench.furnace-evidence/v1", kind: "furnace.attempt.log", provider: "furnace",
      nativeRef: { provider: "furnace", type: "attempt", id: ATTEMPT, scope: WORKSPACE },
      stream: "stderr", capturedAt: CLOCK, bytes: 120, truncated: false, preview: ["first line", "second line"],
      producerReceipt: { requestId: "req-logs", complete: true, lossy: false, nextCursor: null }, freshness: "current",
    });
    expect(FURNACE_EVIDENCE_CONTRACT).toBe("workbench.furnace-evidence/v1");
    expect(made.read).toHaveBeenCalledTimes(1);
    expect(made.read).toHaveBeenCalledWith(RUN, { attempt: ATTEMPT, limit: 4096, stream: "stderr" }, { timeoutMs: 2000 });
  });

  it("reads the stdout stream when stdout is requested, with the request's own byte and time bounds", async () => {
    const made = fixture(async () => envelope(logsData({ stream: "stdout", returned: 2 })));
    const content = await readFurnaceAttemptLogEvidence(request(made.client, { stream: "stdout", maxBytes: 65_536, timeoutMs: 2_147_483_647 }));
    expect(content).toMatchObject({ stream: "stdout", bytes: 2, truncated: false });
    expect(made.read).toHaveBeenCalledWith(RUN, { attempt: ATTEMPT, limit: 65_536, stream: "stdout" }, { timeoutMs: 2_147_483_647 });
  });

  it.each([
    { reason: "lossy", data: { lossy: true }, receipt: { complete: true, lossy: true, nextCursor: null } },
    { reason: "incomplete", data: { complete: false }, receipt: { complete: false, lossy: false, nextCursor: null } },
    { reason: "paged", data: { next_cursor: "c2" }, receipt: { complete: true, lossy: false, nextCursor: "c2" } },
  ])("a $reason producer read loads with truncated true, named in the final preview line", async ({ reason, data, receipt }) => {
    const content = await load(data);
    expect(content.truncated).toBe(true);
    expect(content.preview).toStrictEqual(["first line", "second line", `… truncated (producer: ${reason})`]);
    expect(content.producerReceipt).toStrictEqual({ requestId: "req-logs", ...receipt });
  });

  it("keeps the newest maxLines lines of the producer tail and marks the dropped head as budget truncation", async () => {
    const content = await load({ lines: numbered(300), returned: 300 });
    expect(content.truncated).toBe(true);
    expect(content.preview).toHaveLength(201);
    expect(content.preview[0]).toBe("line-100");
    expect(content.preview[199]).toBe("line-299");
    expect(content.preview[200]).toBe("… truncated (producer: budget)");
    expect(content.producerReceipt).toStrictEqual({ requestId: "req-logs", complete: true, lossy: false, nextCursor: null });
    const exact = await load({ lines: numbered(200), returned: 200 });
    expect(exact.truncated).toBe(false);
    expect(exact.preview).toStrictEqual(numbered(200));
    expect((await load({ lines: numbered(5) }, { maxLines: 3 })).preview).toStrictEqual(["line-2", "line-3", "line-4", "… truncated (producer: budget)"]);
  });

  it("names every truncation reason at once in the documented order", async () => {
    const content = await load({ lossy: true, complete: false, next_cursor: "353882", lines: numbered(4) }, { maxLines: 2 });
    expect(content.truncated).toBe(true);
    expect(content.preview).toStrictEqual(["line-2", "line-3", "… truncated (producer: lossy, incomplete, paged, budget)"]);
  });

  it("an empty incomplete read still says it is truncated rather than presenting an empty log", async () => {
    const content = await load({ complete: false, next_cursor: "5", returned: 0, lines: [] });
    expect(content).toMatchObject({ bytes: 0, truncated: true, preview: ["… truncated (producer: incomplete, paged)"] });
  });

  it.each([
    ["an Attempt the owning run node does not list (an Attempt of another Run)", { attemptId: "frn-atm-other-run-1" }],
    ["an Attempt id that only extends a listed one", { attemptId: `${ATTEMPT}0` }],
    ["an owning node of another Run", { owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: "frn-run-other", scope: WORKSPACE }, evidenceRefs: [ATTEMPT] } }],
    ["an owning node of another workspace", { owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN, scope: "/tmp/other-ws" }, evidenceRefs: [ATTEMPT] } }],
    ["an owning node with no scope", { owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN }, evidenceRefs: [ATTEMPT] } }],
    ["an owning node that is an Attempt, not a Run", { owningRunNode: { nativeRef: { provider: "furnace", type: "attempt", id: RUN, scope: WORKSPACE }, evidenceRefs: [ATTEMPT] } }],
    ["an owning node of another producer", { owningRunNode: { nativeRef: { provider: "forge", type: "run", id: RUN, scope: WORKSPACE }, evidenceRefs: [ATTEMPT] } }],
    ["a requested Run that is not the owning node's", { runId: "frn-run-other" }],
    ["a requested workspace that is not the owning node's", { workspaceRoot: "/tmp/other-ws" }],
  ] satisfies [string, Partial<FurnaceEvidenceRequest>][])("refuses %s as unauthorized before any native read", async (_label, overrides) => {
    const made = fixture();
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, overrides)));
    expect(error.category).toBe("authorization");
    expect(made.read).not.toHaveBeenCalled();
  });

  it("accepts the owning run node exactly as FurnaceObserver projects it into the observation projection", async () => {
    const scope = { workspace: WORKSPACE, principal: "tester" };
    const run = {
      run_id: RUN, beads_run_id: "bd-evidence", workspace: WORKSPACE, state: "active", mode: "ephemeral_wisp", furnace_version: "0.1.0",
      created_at: "2026-10-15T08:00:00Z", updated_at: "2026-10-15T08:00:01Z", state_since: "2026-10-15T08:00:01Z", executor: "runner",
      max_parallel: 1, active: [], failed: [], failed_total: 0, attention: [], unreadable: [], corrupt_events: [], corrupt_events_total: 0, conflicts: [],
    };
    const attempt = (id: string, ordinal: number) => ({
      attempt_id: id, run_id: RUN, work_id: "bd-work", ordinal, executor: "runner", state: "failed", outcome: "failure", created_at: "2026-10-15T08:00:01Z",
    });
    const observerClient = {
      runs: { get: () => ({ status: async () => envelope(run, "run_status", "req-status") }) },
      attempts: {
        list: async () => envelope({ run_id: RUN, beads_run_id: "bd-evidence", complete: true, limit: 5, returned: 2, next_cursor: null, attempts: [attempt(SIBLING, 1), attempt(ATTEMPT, 2)], unreadable: [] }, "attempt_list", "req-attempts"),
      },
      logs: { read: async () => envelope(logsData({ stream: "stdout" }), "logs_read", "req-observer-logs") },
    } as unknown as FurnaceObserverClient;
    const observer = new FurnaceObserver(observerClient, { workspaceRoot: WORKSPACE, runId: RUN, scope, limits: { maxPolls: 1, intervalMs: 1, maxElapsedMs: 1000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 1000 } });
    const projection = new ObservationProjection();
    projection.refresh(observer.projectionSnapshot(await observer.snapshot()));
    observer.close();
    const [node] = projection.query({ scope, limit: 1, ref: { provider: "furnace", type: "run", id: RUN, scope: WORKSPACE } }).nodes;
    expect(node.evidenceRefs).toStrictEqual([SIBLING, ATTEMPT]);
    const made = fixture();
    const content = await readFurnaceAttemptLogEvidence(request(made.client, { owningRunNode: node }));
    expect(content.nativeRef).toStrictEqual({ provider: "furnace", type: "attempt", id: ATTEMPT, scope: WORKSPACE });
    const foreign = fixture();
    await expect(readFurnaceAttemptLogEvidence(request(foreign.client, { owningRunNode: node, attemptId: "frn-atm-elsewhere-1" }))).rejects.toMatchObject({ category: "authorization" });
    expect(foreign.read).not.toHaveBeenCalled();
  });
});

describe("R2 docs/workbench/20 § Types and docs/workbench/09 § Data retention and privacy: sanitized bounded preview, no raw payload", () => {
  it("routes every preview line through redaction, the terminal sanitizer and the zero-width strip", async () => {
    const content = await load({
      lines: ["Authorization: Bearer abc123", "\u001b[31mred alert\u001b[0m", "left\u202eright", "zero\u200bwidth\u200c\u200d\u2060join", "\ufeffbom", "tab\tseparated", "bell\u0007 and \u009bcsi"],
    });
    expect(content.preview).toStrictEqual(["Authorization: [REDACTED]", "red alert", "leftright", "zerowidthjoin", "bom", "tab separated", "bell and csi"]);
    for (const line of content.preview) {
      expect(line).not.toMatch(UNSAFE);
      expect(line.length).toBeLessThanOrEqual(200);
    }
  });

  it("redacts a credential an escape or zero-width character split from its scheme", async () => {
    const content = await load({ lines: ["Bear\u200ber abc123", "Bearer\u001b[0m abc123", "token sk-ant-\u200babc123", "pass\u2060word=abc123"] });
    expect(content.preview).toStrictEqual([MARKER, MARKER, `token ${MARKER}`, `password=${MARKER}`]);
    expect(JSON.stringify(content)).not.toContain("abc123");
  });

  it("retains no raw payload: a secret in a line, the cursor, the request id or the envelope never reaches the content", async () => {
    const made = fixture(async () => envelope(
      { ...logsData({ lines: ["SECRET-LINE Bearer abc123"], next_cursor: "Bearer abc123" }), started_at: "2026-10-15T08:00:00Z", extra: "Bearer abc123" },
      "logs_read", "req-\u001b[2Jlogs", "stderr diagnostics leak Bearer abc123",
    ));
    const content = await readFurnaceAttemptLogEvidence(request(made.client));
    const text = JSON.stringify(content);
    expect(text).not.toContain("abc123");
    expect(text).not.toContain("diagnostics");
    // JSON spells a raw ESC as \u001b, which UNSAFE alone would not see in serialized text.
    expect(text).not.toMatch(UNSAFE);
    expect(text).not.toContain("\\u001b");
    expect(content.preview).toStrictEqual(["SECRET-LINE [REDACTED]", "… truncated (producer: paged)"]);
    expect(content.producerReceipt).toStrictEqual({ requestId: "req-logs", complete: true, lossy: false, nextCursor: MARKER });
    const keys = keysOf(content);
    for (const forbidden of ["lines", "raw", "data", "payload", "stderr", "exit", "extra", "started_at"]) expect(keys).not.toContain(forbidden);
  });

  it("bounds every preview line to 200 characters, ending a clipped line in an ellipsis that counts as budget truncation", async () => {
    const exact = "x".repeat(200);
    const content = await load({ lines: [exact, "y".repeat(5000)] });
    expect(content.preview).toStrictEqual([exact, `${"y".repeat(199)}…`, "… truncated (producer: budget)"]);
    expect(content.truncated).toBe(true);
    expect((await load({ lines: [exact] })).truncated).toBe(false);
    const hidden = await load({ lines: [`a${"\u200b".repeat(3000)}Bearer abc123`] });
    expect(hidden.preview).toStrictEqual(["a…", "… truncated (producer: budget)"]);
    expect(JSON.stringify(hidden)).not.toContain("abc123");
  });

  it("never splits a surrogate pair at the line bound, and bounds an oversized cursor and request id", async () => {
    const content = await load({ lines: [`${"y".repeat(198)}\u{1F600}z`], next_cursor: "c".repeat(500) });
    expect(content.preview[0]).toBe(`${"y".repeat(198)}…`);
    expect(content.preview[0]).not.toMatch(LONE_SURROGATE);
    expect(content.producerReceipt.nextCursor).toBe(`${"c".repeat(199)}…`);
    const made = fixture(async () => envelope(logsData(), "logs_read", "r".repeat(500)));
    expect((await readFurnaceAttemptLogEvidence(request(made.client))).producerReceipt.requestId).toHaveLength(200);
  });
});

describe("R3 docs/workbench/09 § Acceptance/negative controls 8 and docs/workbench/08 § Cancellation and ownership: aborts stop only the local read", () => {
  it("an abort while the native read is pending rejects as transport, and the abandoned read can never resolve the content", async () => {
    let release: (answer: LogsResponse) => void = () => undefined;
    const made = fixture(() => new Promise<LogsResponse>(resolve => { release = resolve; }));
    const controller = new AbortController();
    const clock = vi.fn(() => CLOCK);
    let resolved = false;
    const outcome = readFurnaceAttemptLogEvidence(request(made.client, { signal: controller.signal, capturedAt: clock }));
    outcome.then(() => { resolved = true; }, () => undefined);
    await tick();
    expect(made.read).toHaveBeenCalledTimes(1);
    controller.abort();
    const error = await refusal(outcome);
    expect(error.category).toBe("transport");
    expect(error.message).toBe("Furnace evidence read cancelled.");
    release(envelope(logsData()));
    await tick();
    expect(resolved).toBe(false);
    expect(clock).not.toHaveBeenCalled();
  });

  it("a native failure arriving after the abort is absorbed, never an unhandled rejection", async () => {
    let fail: (error: Error) => void = () => undefined;
    const made = fixture(() => new Promise<LogsResponse>((_resolve, reject) => { fail = reject; }));
    const controller = new AbortController();
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown): void => { unhandled.push(reason); };
    process.on("unhandledRejection", onUnhandled);
    try {
      const outcome = readFurnaceAttemptLogEvidence(request(made.client, { signal: controller.signal }));
      controller.abort();
      expect((await refusal(outcome)).category).toBe("transport");
      fail(new Error("late failure Bearer zzz"));
      await tick();
      await tick();
      expect(unhandled).toStrictEqual([]);
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
    expect(made.read).toHaveBeenCalledTimes(1);
  });

  it("an abort raised while the read launches still refuses as transport", async () => {
    const controller = new AbortController();
    const made = fixture(async () => {
      controller.abort();
      return envelope(logsData());
    });
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, { signal: controller.signal })));
    expect(error.category).toBe("transport");
    expect(made.read).toHaveBeenCalledTimes(1);
  });

  it("detaches its abort listener once the read settles, answered or failed", async () => {
    for (const answer of [async () => envelope(logsData()), async () => Promise.reject(new Error("closed"))]) {
      const controller = new AbortController();
      const added = vi.spyOn(controller.signal, "addEventListener");
      const removed = vi.spyOn(controller.signal, "removeEventListener");
      const made = fixture(answer);
      await readFurnaceAttemptLogEvidence(request(made.client, { signal: controller.signal })).catch(() => undefined);
      expect(added).toHaveBeenCalledTimes(1);
      expect(removed).toHaveBeenCalledTimes(1);
      expect(removed.mock.calls[0][0]).toBe("abort");
      expect(removed.mock.calls[0][1]).toBe(added.mock.calls[0][1]);
    }
  });

  it("a signal aborted before launch refuses as transport with no native read", async () => {
    const made = fixture();
    const controller = new AbortController();
    controller.abort();
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, { signal: controller.signal })));
    expect(error.category).toBe("transport");
    expect(error.message).toBe("Furnace evidence read cancelled before launch.");
    expect(made.read).not.toHaveBeenCalled();
  });
});

describe("R4 docs/workbench/20 § Refusal and freshness rules and docs/workbench/10 § Failure and deception defenses: transport success is not verification", () => {
  it.each([
    ["a complete read", {}],
    ["a lossy, incomplete, paged read", { lossy: true, complete: false, next_cursor: "9" }],
  ] satisfies [string, Partial<LogsData>][])("%s states no verdict, status, tone or outcome, and freshness only as current", async (_label, data) => {
    const content = await load({ ...data, lines: ["exit status 0", "all checks verified"] });
    for (const key of ["verified", "status", "statusText", "statusTone", "tone", "outcome", "verdict"]) expect(Object.hasOwn(content, key)).toBe(false);
    expect(content.freshness).toBe("current");
    expect(JSON.stringify(content)).not.toContain('"verified"');
  });
});

describe("R5 docs/workbench/13 § Key validations: an unrecognized native answer is a diagnostic, never silent success", () => {
  it("refuses a response of another kind as unavailable", async () => {
    const made = fixture(async () => envelope(logsData(), "run_status"));
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client)));
    expect(error.category).toBe("unavailable");
    expect(error.message).toContain("response kind differs from requested native read");
  });

  it.each([
    ["run_id", { run_id: "frn-run-other" }],
    ["attempt_id", { attempt_id: SIBLING }],
    ["stream", { stream: "stdout" }],
  ] satisfies [string, Partial<LogsData>][])("refuses identity drift in %s as unauthorized", async (_field, data) => {
    const error = await refusal(load(data));
    expect(error.category).toBe("authorization");
    expect(error.message).not.toContain(SIBLING);
  });

  it.each([
    ["returned beyond maxBytes", { returned: 70_000 }, { maxBytes: 65_536 }],
    ["non-array lines", { lines: "x" }, {}],
    ["a non-string line", { lines: ["ok", 7] }, {}],
    ["non-boolean lossy", { lossy: "no" }, {}],
    ["non-boolean complete", { complete: "yes" }, {}],
    ["a fractional returned", { returned: 1.5 }, {}],
    ["a negative returned", { returned: -1 }, {}],
    ["a non-numeric returned", { returned: "120" }, {}],
    ["a numeric next_cursor", { next_cursor: 7 }, {}],
    ["an absent next_cursor", { next_cursor: undefined }, {}],
  ] satisfies [string, Record<string, unknown>, Partial<FurnaceEvidenceRequest>][])("refuses %s as a malformed native log shape", async (_label, data, overrides) => {
    const made = fixture(async () => envelope({ ...logsData(), ...data }));
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, overrides)));
    expect(error.category).toBe("unavailable");
    expect(error.message).toContain("malformed native log shape");
  });

  it.each([
    ["a null envelope", null],
    ["a null data member", envelope(null)],
    ["a non-string request id", envelope(logsData(), "logs_read", 7)],
    ["an empty request id", envelope(logsData(), "logs_read", "")],
  ])("refuses %s as unavailable", async (_label, answer) => {
    const made = fixture(async () => answer as LogsResponse);
    expect((await refusal(readFurnaceAttemptLogEvidence(request(made.client)))).category).toBe("unavailable");
  });

  it("surfaces a thrown SDK error as unavailable with a redacted, bounded message, never verbatim", async () => {
    const made = fixture(async () => {
      throw new Error("ENOENT /home/alice/.furnace Bearer zzz");
    });
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client)));
    expect(error.category).toBe("unavailable");
    expect(error.message).toContain(MARKER);
    expect(error.message).not.toContain("zzz");
    expect(error.message.length).toBeLessThanOrEqual(200);
    const noisy = fixture(async () => {
      throw new Error(`\u001b]0;title\u0007\u202e${"e".repeat(5000)} password=hunter2`);
    });
    const loud = await refusal(readFurnaceAttemptLogEvidence(request(noisy.client)));
    expect(loud.category).toBe("unavailable");
    expect(loud.message.length).toBeLessThanOrEqual(200);
    expect(loud.message).not.toMatch(UNSAFE);
    expect(loud.message).not.toContain("hunter2");
  });

  it("maps a synchronous client throw and a non-Error rejection to unavailable without echoing them", async () => {
    const thrower = fixture(() => {
      throw new Error("spawn furnace Bearer zzz");
    });
    const sync = await refusal(readFurnaceAttemptLogEvidence(request(thrower.client)));
    expect(sync.category).toBe("unavailable");
    expect(sync.message).not.toContain("zzz");
    const rejecter = fixture(() => Promise.reject("raw string Bearer zzz"));
    const raw = await refusal(readFurnaceAttemptLogEvidence(request(rejecter.client)));
    expect(raw.category).toBe("unavailable");
    expect(raw.message).not.toContain("zzz");
  });
});

describe("R6 docs/workbench/10 § Four views (Details) and § Rendering pipeline: one lazy read per call, pure, no host clock", () => {
  it("performs exactly one bounded logs read per call", async () => {
    const made = fixture();
    await readFurnaceAttemptLogEvidence(request(made.client));
    expect(made.read).toHaveBeenCalledTimes(1);
    const again = fixture();
    await readFurnaceAttemptLogEvidence(request(again.client));
    expect(again.read).toHaveBeenCalledTimes(1);
    expect(made.read).toHaveBeenCalledTimes(1);
  });

  it("stamps capturedAt from the injected clock alone, read once after the native answer", async () => {
    const spy = vi.spyOn(Date, "now");
    try {
      const clock = vi.fn(() => "2026-10-15T11:30:00+02:00");
      const made = fixture();
      const content = await readFurnaceAttemptLogEvidence(request(made.client, { capturedAt: clock }));
      expect(content.capturedAt).toBe("2026-10-15T11:30:00+02:00");
      expect(clock).toHaveBeenCalledTimes(1);
      expect(clock.mock.invocationCallOrder[0]).toBeGreaterThan(made.read.mock.invocationCallOrder[0]);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });

  it.each(["", "2026-10-15T09:00:00", "yesterday", "2026-13-45T09:00:00Z", "2026-10-15T09:00:00Z\u001b[2J", `${"2".repeat(60)}-10-15T09:00:00Z`, 7])(
    "refuses an injected clock reading %j that is not a bounded timezone-qualified instant", async reading => {
      const made = fixture();
      const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, { capturedAt: () => reading as string })));
      expect(error.category).toBe("validation");
    });

  it("imports only the observer and observation types, the capability errors and the shared sanitizers", () => {
    const source = readFileSync(new URL("../src/workbench/furnace-evidence.ts", import.meta.url), "utf8");
    const imports = [...source.matchAll(/^import\s+(type\s+)?[^;]*?\sfrom\s+"([^"]+)";/gm)].map(match => `${match[1] ? "type " : ""}${match[2]}`).sort();
    expect(imports).toStrictEqual(["./capability-registry.js", "./redaction.js", "type ./furnace-observer.js", "type ./observation.js"]);
    expect(source.match(/^import\b/gm)).toHaveLength(4);
    for (const banned of ["node:", "process.", "Date.now", "Math.random", "import("]) expect(source).not.toContain(banned);
  });
});

describe("docs/workbench/13 § Key validations: request shape and budgets are validated before any native read", () => {
  it.each([
    ["a run id without the frn-run- prefix", { runId: "run-evidence-1" }],
    ["a run id over 100 identifier characters", { runId: `frn-run-${"a".repeat(101)}` }],
    ["a run id with a path separator", { runId: "frn-run-a/b" }],
    ["a run id with a trailing newline", { runId: `${RUN}\n` }],
    ["an attempt id without the frn-atm- prefix", { attemptId: "atm-evidence-1" }],
    ["an attempt id with whitespace", { attemptId: "frn-atm-a 1" }],
    ["an attempt id over 100 identifier characters", { attemptId: `frn-atm-${"b".repeat(101)}` }],
    ["an empty workspace root", { workspaceRoot: "" }],
    ["a stream outside stdout and stderr", { stream: "stdlog" }],
    ["maxBytes 0", { maxBytes: 0 }],
    ["maxBytes 65537", { maxBytes: 65_537 }],
    ["fractional maxBytes", { maxBytes: 1.5 }],
    ["NaN maxBytes", { maxBytes: Number.NaN }],
    ["maxLines 0", { maxLines: 0 }],
    ["maxLines 201", { maxLines: 201 }],
    ["timeoutMs 0", { timeoutMs: 0 }],
    ["timeoutMs 2147483648", { timeoutMs: 2_147_483_648 }],
    ["Infinity timeoutMs", { timeoutMs: Number.POSITIVE_INFINITY }],
    ["evidence refs that are not an array", { owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN, scope: WORKSPACE }, evidenceRefs: ATTEMPT } }],
    ["a missing owning node", { owningRunNode: undefined }],
    ["a client without logs.read", { client: { logs: {} } }],
    ["a missing signal", { signal: undefined }],
    ["a clock that is not a function", { capturedAt: CLOCK }],
  ] satisfies [string, Record<string, unknown>][])("refuses %s as validation", async (_label, overrides) => {
    const made = fixture();
    const error = await refusal(readFurnaceAttemptLogEvidence(request(made.client, overrides as Partial<FurnaceEvidenceRequest>)));
    expect(error.category).toBe("validation");
    expect(made.read).not.toHaveBeenCalled();
  });

  it("accepts the inclusive budget bounds and 100-character identifiers", async () => {
    const runId = `frn-run-${"r".repeat(100)}`;
    const attemptId = `frn-atm-${"a".repeat(100)}`;
    const made = fixture(async () => envelope(logsData({ run_id: runId, attempt_id: attemptId, returned: 1 })));
    const content = await readFurnaceAttemptLogEvidence(request(made.client, {
      runId, attemptId, maxBytes: 1, maxLines: 1, timeoutMs: 1,
      owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: runId, scope: WORKSPACE }, evidenceRefs: [attemptId] },
    }));
    expect(content).toMatchObject({ bytes: 1, preview: ["second line", "… truncated (producer: budget)"] });
    expect(made.read).toHaveBeenCalledWith(runId, { attempt: attemptId, limit: 1, stream: "stderr" }, { timeoutMs: 1 });
  });
});
