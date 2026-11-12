/**
 * wb-79k.3 (W13/VC-7, local-detached observe-wiring, acceptance B1-B6): the src/index.ts seams that launch or attach the local
 * detached profile apply the landed reader adapter (src/workbench/detached-observer.ts projectDetachedReading and
 * applyDetachedReading, untouched) to the live ObservationProjection through the host's detached observe-wiring
 * (src/workbench/detached-wiring.ts), under host-owned scope, operator and clock. Spec lines pinned (docs/workbench/09, measured
 * at 4fc7a9d): § "Reader adapters" "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?,
 * nativePayloadRef} and optional change stream with cursor." (B1); § "Relationships are typed and provenanced" "lifecycle
 * ownership (only if native producer confirms)" and "Store edge provenance with timestamp and source" (B2); § "Freshness and
 * ambiguity" "A disconnected Furnace event stream must not make a previously RUNNING node permanently authoritative RUNNING; it
 * becomes last-known-running + stale." (B3); § "Acceptance/negative controls" items 8 "Closing observer causes zero cancellation
 * calls." (B4) and 10 "Large/secret payload does not leak into Pi tool result or screen by default." (B5).
 *
 * PINNED CASES (this file, by case id; each names its assertion target, and the falsifier that turns it red):
 * DW01-DW09 drive the REAL wiring over a REAL ObservationProjection with receipts and snapshots in the adapter's own shapes
 * (test/workbench-detached-observer.test.ts) and a host clock that reads fixed instants:
 *  DW01 (B1) a live reading reaches the projection through refresh and relate only, as the adapter's frozen output for the
 *       host's scope, operator and clock, whatever the snapshot names; falsifier: no wiring, or a context field taken from the
 *       caller.
 *  DW02 (B2) the ownership edge lands only with its receipt-backed confirmation and its provenance (source and the host clock's
 *       timestamp); a later host-lost reading keeps it while both nodes read stale and unknown; falsifier: an edge for a foreign
 *       owner, a dropped provenance or an edge withdrawn on host loss.
 *  DW03 (B3) live-detached-host reads current; local-client-transport and an unknown observation read stale and unknown, and
 *       after a terminal reading no terminal verdict is replayed; falsifier: a host-lost reading upgraded or replaying a verdict.
 *  DW04 (B3) equal-instant guard: a second reading at the instant the projection holds is not applied, so a terminal status is
 *       never regressed; a later instant still applies; falsifier: the guard deleted (the bare apply regresses, its control).
 *  DW05 (B5) the truncation marker survives the byte clamp on multi-byte producer text; falsifier: the byte bound deleted (the
 *       bare adapter loses it, its control).
 *  DW06 (B5) a line-split credential in the producer's text never reaches a projected string; falsifier: unsanitized text.
 *  DW07 (B5) pid parity with wb-0kg.6: a ten-digit pid projects an edge the control adapter reads; an eleven-digit pid is
 *       refused with nothing projected; falsifier: the parity guard deleted (the bare adapter's edge is refused by the control
 *       adapter, its control).
 *  DW08 (B1, B2) the receipt basis is the host's: a reading with no held receipt, a reading (with its own embedded receipt) of
 *       another invocation than the one the host read, or one conflicting with the launch receipt projects nothing; an embedded
 *       receipt is retained, so a later host-lost reading still projects; a throwing operator read is a typed refusal.
 *  DW09 (B1, B4) the wiring is handed values only: it imports no socket, process or clock module and no client value.
 * DW10-DW13 boot the REAL extension in claude mode and drive a REAL detached host (the compiled dist entrypoint) through the
 * registered workflow_detached and workflow_control tools only, reading the session's live projection back through
 * call-through spies on ObservationProjection.prototype.refresh (the instance is the extension's own) and through
 * workflow_control's decision, the projection's consumer:
 *  DW10 (B1, B2, B5) after a workflow_detached inspect the booted projection holds the host's invocation and host-process nodes
 *       and the native-confirmed ownership edge in the session's scope: workflow_control reads cross-scope before it and
 *       operator-confirmation after it, and an operator-confirmed cancel reaches the host, which refuses the verb under the Pi
 *       launch permissions (inspect, execute). The reply stays the inspect snapshot, sanitized, and a line-split credential the
 *       script returns comes out redacted; falsifier: the inspect seam's observe call deleted.
 *  DW11 (B4) closing the session that observed the host opens no socket and sends no control verb: the host still answers
 *       live, uncancelled and with no control audit; falsifier: a close that reaches the host.
 *  DW12 (B1, B3) the workflow_detached launch seam retains its receipt: a host lost before any inspect reads, at its first
 *       inspect, stale and unknown with no ownership (workflow_control reads no-confirmed-ownership); falsifier: the launch
 *       seam's retention deleted (the reading then names no receipt and projects nothing).
 *  DW13 (B1, B3) the workflow_execute detached launcher retains its receipt the same way; falsifier: that seam's retention
 *       deleted.
 *
 * NOT CLAIMED: the reply contract change ("the workflow_detached reply reads the refreshed projection, never the raw snapshot")
 * is NOT CLAIMED by this file: owner ruling M:76321 (2) defers it to the G-RATIFY decision riding the wb-w8fk P00 ratification
 * record, and DW10 pins the current reply. Readings of an invocation launched outside this process's two launch seams and
 * never read live by it are NOT CLAIMED (DW08 pins that they project nothing). A projection of the four-view inspector or of
 * workflow_observe for a detached invocation is NOT CLAIMED: both read workflow tasks, and a detached launch creates none.
 *
 * Input hygiene only: every credential-shaped value here is obviously fake. Display paths: the wiring's byte bound and refusal
 * line route through sanitizeWorkbenchText's label layout (the SITES row "wb-79k.3 detached-wiring.ts observe" in
 * test/workbench-sanitizer-corpus.test.ts). Scratch: hermeticDir only. Timed waits: pollFor (the detached-* family rule).
 */
import { existsSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { Socket } from "node:net";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { getAgentDir } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import type { NativeControlRequest } from "../src/workbench/control.js";
import { inspectWorkflowSource } from "../src/workbench/designer.js";
import { executeDetachedControl } from "../src/workbench/detached-control.js";
import { applyDetachedReading, projectDetachedReading } from "../src/workbench/detached-observer.js";
import { DETACHED_WIRING_MAX_PID, type DetachedObserveHost, DetachedObserveWiring } from "../src/workbench/detached-wiring.js";
import type { DetachedReceipt, DetachedSnapshot, LocalOperator } from "../src/workbench/hosts/local-detached.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { DetachedTimingLapse, HOST_HOOK_TIMEOUT_MS, markTimingLapse, pollFor, reportAfterCleanup } from "./helpers/detached-timing.js";

const SCOPE: ObservationScope = { workspace: "/tmp/detached-ws", principal: "local-os:uid:1000" };
const OPERATOR: LocalOperator = { issuer: "local-os-dac", uid: 1000, id: "local-os:uid:1000" };
const HOST = "a1".repeat(24);
const T_HOST = "2026-11-11T09:00:03.000Z";
const T_LATER = "2026-11-11T09:00:04.000Z";
const T_CLOCK = "2026-11-11T09:00:05.000Z";
const LF = String.fromCodePoint(0x0a);
/** Obviously fake: no real credential has this shape or this text. */
const FAKE_SECRET = "obviouslyFake79k3DetachedLineSplitValue";
const SPLIT_CREDENTIAL = `Authorization: Bearer${LF}${FAKE_SECRET}`;
const INVOCATION: NativeRef = { provider: "local-detached", type: "invocation", id: "inv-det-1" };

function receipt(overrides: Partial<DetachedReceipt> = {}): DetachedReceipt {
  return {
    contract: "workbench.local-detached/v1", invocationId: "inv-det-1", hostInstanceId: HOST, pid: 4242, sessionId: 4242, processStartTicks: "123456",
    owner: { ...OPERATOR }, invocationDirectory: "/tmp/detached-ws/.detached/inv-det-1", socketPath: "/tmp/detached-ws/.detached/inv-det-1/host.sock",
    launchedAt: "2026-11-11T09:00:00.000Z", deploymentDigest: "dep-digest", inputDigest: "in-digest", scriptDigest: "script-digest", snapshotDigest: "snap-digest",
    permissions: ["inspect", "execute"], security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash", nativeRuntimeIdentity: "unsupported",
    evidenceClass: "local-computation", ...overrides,
  };
}
function snapshot(overrides: Partial<DetachedSnapshot> = {}): DetachedSnapshot {
  return {
    contract: "workbench.local-detached/v1", invocationId: "inv-det-1", observation: "observed-running", observedAt: T_HOST,
    source: "live-detached-host", nativeRuntimeIdentity: "unsupported", progress: [], droppedProgress: 0, controlAudit: [], cancellationRequested: false, ...overrides,
  };
}
/** A host-lost reading as the client reports one: no embedded receipt, an unknown observation and the producer's guidance. */
function lost(overrides: Partial<DetachedSnapshot> = {}): DetachedSnapshot {
  return snapshot({ observation: "unknown", source: "local-client-transport", terminal: "unknown", observedAt: T_LATER, diagnostic: "Detached host disconnected before reply.",
    reconcileHint: "Host connection lost: never automatically retry this invocation.", ...overrides });
}
function hostOf(projection: ObservationProjection, now: () => string = () => T_CLOCK, operator: () => LocalOperator = () => OPERATOR): DetachedObserveHost {
  return { projection, scope: SCOPE, operator, now };
}
const projectionOf = (): ObservationProjection => new ObservationProjection({ maxEvents: 64, maxNodes: 64, maxEdges: 64, maxQuery: 16 });
const detachedNodes = (projection: ObservationProjection, scope: ObservationScope = SCOPE) =>
  projection.query({ scope, limit: 16 }).nodes.filter(node => node.nativeRef.provider === "local-detached");
const nodeOf = (projection: ObservationProjection, type: string, scope: ObservationScope = SCOPE) => {
  const found = detachedNodes(projection, scope).find(node => node.nativeRef.type === type);
  if (found === undefined) throw new Error(`no ${type} node is projected`);
  return found;
};
const ownershipOf = (projection: ObservationProjection, scope: ObservationScope = SCOPE) => {
  const invocation = detachedNodes(projection, scope).find(node => node.nativeRef.type === "invocation");
  return invocation === undefined ? [] : projection.relations({ scope, from: invocation.key }).filter(relation => relation.kind === "ownership");
};
/** A wiring that holds the given launch receipt, as a launch seam leaves it. */
function launchedWiring(launch: DetachedReceipt = receipt()): DetachedObserveWiring {
  const wiring = new DetachedObserveWiring();
  wiring.launched(launch);
  return wiring;
}

describe("wb-79k.3 the detached observe-wiring applies the frozen adapter reading under host-owned context (DW01-DW09)", () => {
  it("DW01 a live reading reaches the projection through refresh and relate only, as the adapter's output for the host's scope, operator and clock", () => {
    const projection = projectionOf();
    const spies = {
      ingest: vi.spyOn(projection, "ingest"),
      refresh: vi.spyOn(projection, "refresh"),
      relate: vi.spyOn(projection, "relate"),
      markStale: vi.spyOn(projection, "markStale"),
      disconnect: vi.spyOn(projection, "disconnect"),
      reconnect: vi.spyOn(projection, "reconnect"),
    };
    // The reading carries a result body: the adapter projects none of it, and the context is the host's, not the snapshot's.
    const reading = snapshot({ observation: "observed-terminal", terminal: "completed", result: { note: "RESULT-BODY" } });
    const outcome = launchedWiring().observe(hostOf(projection), "inv-det-1", reading);
    expect(outcome).toEqual({ kind: "projected", snapshots: ["applied", "applied"], related: 1, stale: 0 });
    expect(Object.fromEntries(Object.entries(spies).map(([name, spy]) => [name, spy.mock.calls.length]))).toEqual({
      ingest: 0, refresh: 2, relate: 1, markStale: 0, disconnect: 0, reconnect: 0,
    });
    const expected = projectDetachedReading({ receipt: receipt(), snapshot: reading, scope: SCOPE, operator: OPERATOR, observedAt: T_CLOCK });
    expect(spies.refresh.mock.calls.map(([applied]) => applied)).toEqual(expected.snapshots);
    expect(spies.relate.mock.calls.map(([statement]) => statement)).toEqual(expected.relations);
    expect(detachedNodes(projection).map(node => ({ ref: node.nativeRef.type, scope: node.scope, observed: node.observedAt, confirmed: node.lastConfirmedAt }))).toEqual([
      { ref: "invocation", scope: SCOPE, observed: T_CLOCK, confirmed: T_HOST },
      { ref: "host-process", scope: SCOPE, observed: T_CLOCK, confirmed: T_HOST },
    ]);
    expect(JSON.stringify(detachedNodes(projection))).not.toContain("RESULT-BODY");
  });

  it("DW02 the ownership edge lands only with its receipt-backed confirmation and provenance, and host loss keeps it while freshness reads stale", () => {
    const projection = projectionOf();
    const wiring = launchedWiring();
    expect(wiring.observe(hostOf(projection), "inv-det-1", snapshot()).kind).toBe("projected");
    const confirmation = `local-detached:${HOST}:4242:${OPERATOR.id}`;
    const edge = { kind: "ownership", provenance: { source: "local-detached", observedAt: T_CLOCK, nativeConfirmationRef: confirmation } };
    expect(ownershipOf(projection).map(({ kind, provenance }) => ({ kind, provenance }))).toEqual([edge]);
    const lostAt = "2026-11-11T09:10:00.000Z";
    expect(wiring.observe(hostOf(projection, () => lostAt), "inv-det-1", lost())).toEqual({ kind: "projected", snapshots: ["applied", "applied"], related: 0, stale: 2 });
    expect(ownershipOf(projection).map(({ kind, provenance }) => ({ kind, provenance }))).toEqual([edge]);
    expect(detachedNodes(projection).map(node => [node.nativeRef.type, node.freshness, node.completeness])).toEqual([
      ["invocation", "stale", "unknown"],
      ["host-process", "stale", "unknown"],
    ]);

    const foreign = projectionOf();
    const owner = { issuer: "local-os-dac" as const, uid: 1001, id: "local-os:uid:1001" };
    expect(launchedWiring(receipt({ owner })).observe(hostOf(foreign), "inv-det-1", snapshot()).kind).toBe("projected");
    expect(ownershipOf(foreign)).toEqual([]);
    expect(nodeOf(foreign, "invocation").completeness).toBe("partial");
  });

  it("DW03 live-detached-host reads current; local-client-transport and an unknown observation read stale and unknown, and no terminal verdict is replayed", () => {
    const projection = projectionOf();
    const wiring = launchedWiring();
    wiring.observe(hostOf(projection), "inv-det-1", snapshot({ observation: "observed-terminal", terminal: "completed", observedAt: T_HOST }));
    expect(detachedNodes(projection).map(node => [node.nativeRef.type, node.freshness, node.completeness])).toEqual([
      ["invocation", "current", "complete"],
      ["host-process", "current", "complete"],
    ]);
    expect(nodeOf(projection, "invocation").presentation).toMatchObject({ statusText: "completed", statusTone: "success" });
    wiring.observe(hostOf(projection, () => "2026-11-11T09:20:00.000Z"), "inv-det-1", lost());
    const invocation = nodeOf(projection, "invocation");
    expect([invocation.freshness, invocation.completeness, invocation.presentation.statusTone]).toEqual(["stale", "unknown", "unknown"]);
    expect(invocation.presentation.statusText.startsWith("unknown")).toBe(true);
    expect(invocation.presentation.statusText).not.toMatch(/completed|failed|cancelled/);

    const unknownLive = projectionOf();
    launchedWiring().observe(hostOf(unknownLive), "inv-det-1", snapshot({ observation: "unknown", source: "live-detached-host" }));
    expect(detachedNodes(unknownLive).map(node => [node.nativeRef.type, node.freshness, node.completeness])).toEqual([
      ["invocation", "stale", "unknown"],
      ["host-process", "stale", "unknown"],
    ]);
    expect(nodeOf(unknownLive, "invocation").presentation.statusTone).toBe("unknown");
  });

  it("DW04 a second reading at the held instant is not applied, so the terminal status stands; a later instant applies", () => {
    const projection = projectionOf();
    const wiring = launchedWiring();
    wiring.observe(hostOf(projection), "inv-det-1", snapshot({ observation: "observed-terminal", terminal: "completed", observedAt: T_HOST }));
    const refresh = vi.spyOn(projection, "refresh");
    expect(wiring.observe(hostOf(projection), "inv-det-1", snapshot({ observation: "observed-running", observedAt: T_HOST }))).toEqual({ kind: "held", reason: "equal-instant" });
    expect(refresh).not.toHaveBeenCalled();
    expect(nodeOf(projection, "invocation").presentation.statusText).toBe("completed");
    // The same instant spelled without milliseconds is the same instant.
    expect(wiring.observe(hostOf(projection), "inv-det-1", snapshot({ observation: "observed-running", observedAt: "2026-11-11T09:00:03Z" })).kind).toBe("held");
    expect(wiring.observe(hostOf(projection), "inv-det-1", snapshot({ observation: "observed-running", observedAt: T_LATER })).kind).toBe("projected");
    expect(nodeOf(projection, "invocation").presentation.statusText).toBe("running");

    // Control: the bare apply at an equal instant regresses the terminal status, which is what the guard keeps out.
    const bare = projectionOf();
    applyDetachedReading(bare, projectDetachedReading({ receipt: receipt(), snapshot: snapshot({ observation: "observed-terminal", terminal: "completed" }), scope: SCOPE, operator: OPERATOR, observedAt: T_CLOCK }));
    applyDetachedReading(bare, projectDetachedReading({ receipt: receipt(), snapshot: snapshot({ observation: "observed-running" }), scope: SCOPE, operator: OPERATOR, observedAt: T_CLOCK }));
    expect(nodeOf(bare, "invocation").presentation.statusText).toBe("running");
  });

  it("DW05 the truncation marker survives the byte clamp on multi-byte producer text", () => {
    const projection = projectionOf();
    const reading = lost({ diagnostic: "é".repeat(300), reconcileHint: "€".repeat(1000) });
    expect(launchedWiring().observe(hostOf(projection), "inv-det-1", reading).kind).toBe("projected");
    const status = nodeOf(projection, "invocation").presentation.statusText;
    expect(status.split("[truncated]")).toHaveLength(3);
    expect(Buffer.byteLength(status)).toBeLessThanOrEqual(1024);

    // Control: the bare adapter cuts the same texts at its byte budget and both markers are lost.
    const bare = projectDetachedReading({ receipt: receipt(), snapshot: reading, scope: SCOPE, operator: OPERATOR, observedAt: T_CLOCK });
    const bareStatus = bare.snapshots.find(({ source }) => source.type === "invocation")?.node.statusText ?? "";
    expect(bareStatus.startsWith("unknown")).toBe(true);
    expect(bareStatus).not.toContain("[truncated]");
  });

  it("DW06 a line-split credential in the producer's text never reaches a projected string", () => {
    const projection = projectionOf();
    expect(launchedWiring().observe(hostOf(projection), "inv-det-1", lost({ diagnostic: SPLIT_CREDENTIAL, reconcileHint: SPLIT_CREDENTIAL })).kind).toBe("projected");
    const texts = detachedNodes(projection).flatMap(node => [node.presentation.title, node.presentation.statusText]);
    expect(texts.join(LF)).toContain("[REDACTED]");
    for (const text of texts) expect(text.includes(FAKE_SECRET), "a projected string carries the split credential's value").toBe(false);
  });

  it("DW07 pid parity with the control adapter: a ten-digit pid projects an edge it reads, an eleven-digit pid projects nothing", async () => {
    const control = async (projection: ObservationProjection) => {
      const connects: string[] = [];
      const request: NativeControlRequest = {
        scope: SCOPE, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["control:local-detached.cancel"],
        target: { ...INVOCATION }, action: "cancel", params: { confirmed: true }, invocationId: "dw07-control", requestedAt: T_CLOCK,
      };
      const execution = await executeDetachedControl({
        request, deps: { projection }, now: () => T_CLOCK,
        connect: id => {
          connects.push(id);
          return { cancel: async () => ({ accepted: true, terminalConfirmed: false }), shutdown: async () => ({ accepted: true, unresolvedEffects: false }) };
        },
      });
      return { status: execution.status, connects };
    };
    expect(DETACHED_WIRING_MAX_PID).toBe(9_999_999_999);
    const ten = projectionOf();
    expect(launchedWiring(receipt({ pid: 9_999_999_999, sessionId: 9_999_999_999 })).observe(hostOf(ten), "inv-det-1", snapshot()).kind).toBe("projected");
    expect(ownershipOf(ten).map(({ provenance }) => provenance.nativeConfirmationRef)).toEqual([`local-detached:${HOST}:9999999999:${OPERATOR.id}`]);
    expect(await control(ten)).toEqual({ status: "settled", connects: ["inv-det-1"] });

    const eleven = projectionOf();
    const wide = receipt({ pid: 10_000_000_000, sessionId: 10_000_000_000 });
    const outcome = launchedWiring(wide).observe(hostOf(eleven), "inv-det-1", snapshot());
    expect(outcome).toMatchObject({ kind: "refused", category: "validation" });
    expect(eleven.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
    expect(await control(eleven)).toEqual({ status: "denied", connects: [] });

    // Control: the bare adapter states the eleven-digit edge, which the control adapter cannot read (refused before any call).
    const bare = projectionOf();
    applyDetachedReading(bare, projectDetachedReading({ receipt: wide, snapshot: snapshot(), scope: SCOPE, operator: OPERATOR, observedAt: T_CLOCK }));
    expect(ownershipOf(bare)).toHaveLength(1);
    expect(await control(bare)).toEqual({ status: "refused", connects: [] });
  });

  it("DW08 the receipt basis is the host's: no held receipt, another invocation or a conflicting embedded receipt projects nothing; an embedded receipt is retained", () => {
    for (const [wiring, id, reading] of [
      [new DetachedObserveWiring(), "inv-det-1", lost()],
      [new DetachedObserveWiring(), "inv-det-2", snapshot({ receipt: receipt() })],
      [launchedWiring(), "inv-det-1", snapshot({ receipt: receipt({ hostInstanceId: "b2".repeat(24) }) })],
    ] as const) {
      const projection = projectionOf();
      const outcome = wiring.observe(hostOf(projection), id, reading);
      expect(outcome).toMatchObject({ kind: "refused", category: "validation" });
      expect(projection.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
    }
    const projection = projectionOf();
    const attached = new DetachedObserveWiring();
    expect(attached.observe(hostOf(projection), "inv-det-1", snapshot({ receipt: receipt() })).kind).toBe("projected");
    expect(attached.observe(hostOf(projection, () => "2026-11-11T09:30:00.000Z"), "inv-det-1", lost())).toEqual({ kind: "projected", snapshots: ["applied", "applied"], related: 0, stale: 2 });
    expect(nodeOf(projection, "invocation").freshness).toBe("stale");
    expect(ownershipOf(projection)).toHaveLength(1);
    const throwing = projectionOf();
    const broken = launchedWiring().observe(hostOf(throwing, () => T_CLOCK, () => { throw new Error("operator unavailable"); }), "inv-det-1", snapshot());
    expect(broken).toEqual({ kind: "refused", category: "validation", diagnostic: "operator unavailable" });
    expect(throwing.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
  });

  it("DW09 the wiring is handed values only: it imports no socket, process or clock module and no detached client value", () => {
    const file = fileURLToPath(new URL("../src/workbench/detached-wiring.ts", import.meta.url));
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const imports = source.statements.filter(ts.isImportDeclaration).map(statement => ({
      from: (statement.moduleSpecifier as ts.StringLiteral).text,
      typeOnly: statement.importClause?.isTypeOnly === true,
    }));
    expect(imports).toEqual([
      { from: "./capability-registry.js", typeOnly: false },
      { from: "./detached-observer.js", typeOnly: false },
      { from: "./hosts/local-detached.js", typeOnly: true },
      { from: "./observation.js", typeOnly: true },
      { from: "./redaction.js", typeOnly: false },
    ]);
    expect(Object.getOwnPropertyNames(DetachedObserveWiring.prototype).sort()).toEqual(["constructor", "launched", "observe"]);
  });
});

/* ------------------------------------------------------------------------------------------------------------------------ *
 * DW10-DW11: the real extension and a real detached host, through the registered tools only
 * ------------------------------------------------------------------------------------------------------------------------ */

const GRANTS = ["workbench:detach", "workbench:observe", "control:local-detached.cancel"];
const SCRIPT = `export const meta={name:"detached-observe-wiring",description:"local computation"}; return ${JSON.stringify(SPLIT_CREDENTIAL)};`;

let sandbox: ReturnType<typeof hermeticDir> | undefined;
const detachedRoot = (): string => join(getAgentDir(), "workbench-detached");
/** The pid of each host this row launched, from the receipt its host wrote, while that pid still runs that host. */
function hostPids(): number[] {
  const root = detachedRoot();
  if (!existsSync(root)) return [];
  return readdirSync(root).flatMap(id => {
    const receiptPath = join(root, id, "receipt.json");
    if (!existsSync(receiptPath)) return [];
    const { pid } = JSON.parse(readFileSync(receiptPath, "utf8")) as DetachedReceipt;
    let command = "";
    try { command = readFileSync(`/proc/${pid}/cmdline`, "utf8"); } catch {}
    return command.includes(join(root, id, "invocation.json")) ? [pid] : [];
  });
}
function alive(pid: number): boolean {
  try { process.kill(pid, 0); return true; } catch { return false; }
}
async function gone(pid: number): Promise<boolean> {
  await pollFor(`the exit of host pid ${pid}`, () => alive(pid), running => !running);
  return !alive(pid);
}
afterEach(async () => {
  vi.restoreAllMocks();
  // The Pi launcher grants no shutdown verb, so every host a row started is stopped here and has exited before the sandbox goes.
  const stopping = sandbox ? hostPids() : [];
  for (const pid of stopping) { try { process.kill(pid, "SIGTERM"); } catch {} }
  await reportAfterCleanup(stopping.map(pid => gone(pid)), () => {
    sandbox?.restore();
    sandbox = undefined;
  });
}, HOST_HOOK_TIMEOUT_MS);

interface ToolReply { readonly ok?: boolean; readonly invoked?: boolean; readonly status?: string; readonly error?: { readonly code?: string; readonly category?: string } }
async function boot(extra: readonly string[] = []) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...GRANTS, ...extra] } } });
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  await booted.lifecycle.get("session_start")?.({}, context);
  const scriptPath = join(sandbox.dir, "observed.js");
  writeFileSync(scriptPath, SCRIPT);
  const call = async (name: string, params: Record<string, unknown>): Promise<string> => textOf(await booted.tools.get(name).execute("dw", params, undefined, undefined, context));
  return { booted, context, scriptPath, call };
}
type Booted = Awaited<ReturnType<typeof boot>>;
/** `text`, unless it carries one of the product's two fixed-bound lapse sentences: that fails re-labelled with the strict marker (wb-maza). */
function unlapsed(site: string, text: string): string {
  const marked = markTimingLapse(site, new Error(text));
  if (marked instanceof DetachedTimingLapse) throw marked;
  return text;
}
/** A reply that must be JSON; a refusal text where JSON was expected fails naming that text, never as JSON.parse's. */
const json = <T>(site: string, text: string): T => {
  const reply = unlapsed(site, text);
  try { return JSON.parse(reply) as T; } catch { throw new Error(`${site}: expected a JSON reply, received: ${reply}`); }
};
async function launch(host: Booted, invocationId: string): Promise<DetachedReceipt> {
  return json(`launch of ${invocationId}`, await host.call("workflow_detached", { action: "launch", invocationId, scriptPath: host.scriptPath, trustedScript: true }));
}
async function terminalReading(host: Booted, invocationId: string): Promise<{ readonly text: string; readonly snapshot: DetachedSnapshot }> {
  const read = async () => {
    const text = await host.call("workflow_detached", { action: "inspect", invocationId });
    return { text, snapshot: json<DetachedSnapshot>(`inspect of ${invocationId}`, text) };
  };
  return pollFor(`a terminal reading of ${invocationId} through workflow_detached`, read, reading => Boolean(reading.snapshot.terminal));
}
const cancel = async (host: Booted, invocationId: string, confirmed: boolean): Promise<ToolReply> =>
  json("workflow_control reply", await host.call("workflow_control", { target: { provider: "local-detached", type: "invocation", id: invocationId }, action: "cancel", ...(confirmed ? { confirmed: true } : {}) }));
/** The extension's own projection and every snapshot it refreshes, through a call-through spy on the prototype. */
function captureProjection(): { readonly refreshed: NativeSnapshot[]; readonly instance: () => ObservationProjection } {
  const refreshed: NativeSnapshot[] = [];
  let captured: ObservationProjection | undefined;
  const refresh = ObservationProjection.prototype.refresh;
  vi.spyOn(ObservationProjection.prototype, "refresh").mockImplementation(function (this: ObservationProjection, snapshot: NativeSnapshot) {
    refreshed.push(snapshot);
    captured = this;
    return refresh.call(this, snapshot);
  });
  return {
    refreshed,
    instance: () => {
      if (captured === undefined) throw new Error("the extension refreshed no snapshot");
      return captured;
    },
  };
}

describe("wb-79k.3 the booted workflow_detached inspect feeds the session's live projection (DW10-DW13, the real extension and host)", () => {
  it("DW10 after an inspect the booted projection holds the host's nodes and its native-confirmed ownership edge; the reply stays the redacted snapshot", async () => {
    const host = await boot();
    const capture = captureProjection();
    const id = "dw10-observed";
    const launched = await launch(host, id);
    expect(launched.permissions).toEqual(["inspect", "execute"]);
    expect(await cancel(host, id, false)).toMatchObject({ ok: false, invoked: false, status: "refused", error: { code: "cross-scope" } });

    const { text, snapshot: reading } = await terminalReading(host, id);
    expect(reading).toMatchObject({ terminal: "completed", source: "live-detached-host", nativeRuntimeIdentity: "unsupported", receipt: { hostInstanceId: launched.hostInstanceId, pid: launched.pid } });
    expect(text.includes(FAKE_SECRET), "the inspect reply carries the split credential's value").toBe(false);
    expect(text).toContain("[REDACTED]");
    const projected = capture.refreshed.filter(snapshot => snapshot.source.provider === "local-detached");
    expect(projected.map(snapshot => snapshot.source.type).slice(-2)).toEqual(["invocation", "host-process"]);
    const scope = projected[0]?.scope;
    if (scope === undefined) throw new Error("no local-detached snapshot was refreshed");
    expect(scope).toEqual({ workspace: realpathSync(host.context.cwd), principal: expect.stringMatching(/^local-operator:/) });
    const projection = capture.instance();
    expect(nodeOf(projection, "invocation", scope)).toMatchObject({ freshness: "current", completeness: "complete", presentation: { statusText: "completed" } });
    expect(ownershipOf(projection, scope).map(({ provenance }) => [provenance.source, provenance.nativeConfirmationRef])).toEqual([
      ["local-detached", `local-detached:${launched.hostInstanceId}:${launched.pid}:${launched.owner.id}`],
    ]);
    for (const snapshot of projected) expect(JSON.stringify(snapshot).includes(FAKE_SECRET)).toBe(false);

    expect(await cancel(host, id, false)).toMatchObject({ ok: false, invoked: false, status: "refused", error: { code: "operator-confirmation" } });
    // The strict booted reading: the decision admits the owner's confirmed cancel and the host refuses the verb it was not granted.
    expect(await cancel(host, id, true)).toMatchObject({ ok: false, invoked: true, status: "refused", error: { code: "detached-refused", category: "authorization" } });
  }, 90_000);

  it("DW11 closing the session that observed the host opens no socket and sends no control verb", async () => {
    const host = await boot();
    const capture = captureProjection();
    const id = "dw11-observed";
    await launch(host, id);
    const connects = vi.spyOn(Socket.prototype, "connect");
    await terminalReading(host, id);
    expect(connects.mock.calls.length, "the inspect's own socket is seen by the spy").toBeGreaterThanOrEqual(1);
    expect(capture.refreshed.some(snapshot => snapshot.source.provider === "local-detached")).toBe(true);
    connects.mockClear();
    await host.booted.lifecycle.get("session_shutdown")?.({}, host.context);
    expect(connects).not.toHaveBeenCalled();
    connects.mockRestore();
    const after = await boot2(host);
    const { snapshot: reading } = await terminalReading(after, id);
    expect(reading).toMatchObject({ source: "live-detached-host", terminal: "completed", cancellationRequested: false, controlAudit: [] });
  }, 90_000);

  it("DW12 a host the workflow_detached launch seam started and that is lost before any inspect reads stale and unknown at its first inspect", async () => {
    const host = await boot();
    const capture = captureProjection();
    const id = "dw12-lost";
    const launched = await launch(host, id);
    await expectLostFirstReading(host, capture, id, launched);
  }, 90_000);

  it("DW13 a host the workflow_execute detached launcher started and that is lost before any inspect reads stale and unknown at its first inspect", async () => {
    const host = await boot(["workbench:execute", "claude:invoke"]);
    const capture = captureProjection();
    const definitionRef = inspectWorkflowSource({ scriptPath: host.scriptPath }, host.context.cwd).definition;
    const reply = json<{ readonly ok?: boolean; readonly nativeRefs?: readonly NativeRef[] }>("workflow_execute reply",
      await host.call("workflow_execute", { definitionRef, input: { n: 1 }, hostMode: "detached" }));
    const id = reply.nativeRefs?.find(ref => ref.provider === "local-detached" && ref.type === "invocation")?.id;
    if (id === undefined) throw new Error(`no detached invocation reference in ${JSON.stringify(reply)}`);
    const launched = json<DetachedReceipt>(`receipt of ${id}`, readFileSync(join(detachedRoot(), id, "receipt.json"), "utf8"));
    await expectLostFirstReading(host, capture, id, launched);
  }, 90_000);
});

/** Stops the launched host before any inspect, then reads it once through the booted tool: the first reading is a lost one. */
async function expectLostFirstReading(host: Booted, capture: ReturnType<typeof captureProjection>, id: string, launched: DetachedReceipt): Promise<void> {
  process.kill(launched.pid, "SIGTERM");
  expect(await gone(launched.pid)).toBe(true);
  expect(capture.refreshed.filter(snapshot => snapshot.source.provider === "local-detached")).toEqual([]);
  const reading = json<DetachedSnapshot>(`inspect of ${id}`, await host.call("workflow_detached", { action: "inspect", invocationId: id }));
  expect(reading).toMatchObject({ source: "local-client-transport", observation: "unknown", terminal: "unknown" });
  const projected = capture.refreshed.filter(snapshot => snapshot.source.provider === "local-detached");
  expect(projected.map(snapshot => snapshot.source.type)).toEqual(["invocation", "host-process"]);
  const scope = projected[0]?.scope;
  if (scope === undefined) throw new Error("no local-detached snapshot was refreshed");
  const projection = capture.instance();
  expect(detachedNodes(projection, scope).map(node => [node.nativeRef.type, node.freshness, node.completeness, node.presentation.statusTone])).toEqual([
    ["invocation", "stale", "unknown", "unknown"],
    ["host-process", "stale", "unknown", "unknown"],
  ]);
  expect(ownershipOf(projection, scope)).toEqual([]);
  expect(await cancel(host, id, false)).toMatchObject({ ok: false, invoked: false, status: "refused", error: { code: "no-confirmed-ownership" } });
}

/** A second session over the same sandbox: a fresh extension instance reads the host the first session observed. */
async function boot2(first: Booted): Promise<Booted> {
  const booted = makePi();
  subagentsExtension(booted.pi);
  await booted.lifecycle.get("session_start")?.({}, first.context);
  const call = async (name: string, params: Record<string, unknown>): Promise<string> => textOf(await booted.tools.get(name).execute("dw", params, undefined, undefined, first.context));
  return { booted, context: first.context, scriptPath: first.scriptPath, call };
}
