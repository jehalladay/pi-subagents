import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { applyDetachedReading, type DetachedReadingInput, projectDetachedReading } from "../src/workbench/detached-observer.js";
import type { DetachedReceipt, DetachedSnapshot, LocalOperator } from "../src/workbench/hosts/local-detached.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const SCOPE: ObservationScope = { workspace: "/tmp/detached-ws", principal: "local-os:uid:1000" };
const OPERATOR: LocalOperator = { issuer: "local-os-dac", uid: 1000, id: "local-os:uid:1000" };
const HOST = "a1".repeat(24);
const OBSERVED_AT = "2026-10-15T09:00:05Z";
const INVOCATION: NativeRef = { provider: "local-detached", type: "invocation", id: "inv-det-1" };
const HOST_PROCESS: NativeRef = { provider: "local-detached", type: "host-process", id: `${HOST}:4242` };

function receipt(overrides: Partial<DetachedReceipt> = {}): DetachedReceipt {
  return {
    contract: "workbench.local-detached/v1", invocationId: "inv-det-1", hostInstanceId: HOST, pid: 4242, sessionId: 4242, processStartTicks: "123456",
    owner: { ...OPERATOR }, invocationDirectory: "/tmp/detached-ws/.detached/inv-det-1", socketPath: "/tmp/detached-ws/.detached/inv-det-1/host.sock",
    launchedAt: "2026-10-15T09:00:00.000Z", deploymentDigest: "dep-digest", inputDigest: "in-digest", scriptDigest: "script-digest", snapshotDigest: "snap-digest",
    permissions: ["inspect"], security: "same-machine-os-dac-only", lifetime: "survives-client-disconnect-not-host-crash", nativeRuntimeIdentity: "unsupported",
    evidenceClass: "local-computation", ...overrides,
  };
}
function snapshot(overrides: Partial<DetachedSnapshot> = {}): DetachedSnapshot {
  return {
    contract: "workbench.local-detached/v1", invocationId: "inv-det-1", observation: "observed-running", observedAt: "2026-10-15T09:00:03.000Z",
    source: "live-detached-host", nativeRuntimeIdentity: "unsupported", progress: [], droppedProgress: 0, controlAudit: [], cancellationRequested: false, ...overrides,
  };
}
function input(overrides: { receipt?: Partial<DetachedReceipt>; snapshot?: Partial<DetachedSnapshot>; operator?: LocalOperator; observedAt?: string } = {}): DetachedReadingInput {
  return { receipt: receipt(overrides.receipt), snapshot: snapshot(overrides.snapshot), scope: SCOPE, operator: overrides.operator ?? OPERATOR, observedAt: overrides.observedAt ?? OBSERVED_AT };
}
function invocationOf(reading: ReturnType<typeof projectDetachedReading>) {
  const found = reading.snapshots.find(({ source }) => source.type === "invocation");
  if (!found) throw new Error("no invocation snapshot");
  return found;
}

describe("local detached reader adapter (wb-0kg.5)", () => {
  it("projects the shared node and edge convention verbatim", () => {
    const reading = projectDetachedReading(input());
    expect(reading.snapshots.map(({ source }) => source)).toStrictEqual([INVOCATION, HOST_PROCESS]);
    expect(reading.relations).toStrictEqual([{
      scope: SCOPE, from: INVOCATION, to: HOST_PROCESS, kind: "ownership",
      provenance: { source: "local-detached", observedAt: OBSERVED_AT, nativeConfirmationRef: `local-detached:${HOST}:4242:local-os:uid:1000` },
    }]);
    expect(reading.stale).toStrictEqual([]);
  });

  it("carries the host instant as capturedAt, the injected instant as observedAt, the snapshot digest as revision and a never-inlined payload reference", () => {
    const { snapshots } = projectDetachedReading(input({ snapshot: { result: { secret: "RESULT-BODY" }, progress: ["PROGRESS-BODY"] } }));
    for (const projected of snapshots) {
      expect(projected).toMatchObject({ scope: SCOPE, capturedAt: "2026-10-15T09:00:03.000Z", observedAt: OBSERVED_AT, sourceRevision: "snap-digest", coverage: "complete" });
      expect(projected.nativePayloadRef).toContain("/tmp/detached-ws/.detached/inv-det-1");
    }
    expect(JSON.stringify(snapshots)).not.toMatch(/RESULT-BODY|PROGRESS-BODY/);
    expect(invocationOf({ snapshots, relations: [], stale: [] }).trace).toStrictEqual({ invocationId: "inv-det-1" });
  });

  it.each([
    ["an owner that is not the current operator", { receipt: { owner: { issuer: "local-os-dac" as const, uid: 1001, id: "local-os:uid:1001" } } }],
    ["an owner with the operator's uid but a different id", { receipt: { owner: { issuer: "local-os-dac" as const, uid: 1000, id: "local-os:uid:9999" } } }],
    ["a host instance id that is not the host's 48 hex digits", { receipt: { hostInstanceId: "not-hex" } }],
    ["a pid of zero", { receipt: { pid: 0 } }],
    ["a non-finite pid", { receipt: { pid: Number.NaN } }],
    ["a fractional pid", { receipt: { pid: 4242.5 } }],
  ])("states no ownership for %s and marks the reading partial", (_name, overrides) => {
    const reading = projectDetachedReading(input(overrides));
    expect(reading.relations).toStrictEqual([]);
    expect(invocationOf(reading).coverage).toBe("partial");
  });

  it("still projects both nodes when only the owner differs", () => {
    const reading = projectDetachedReading(input({ receipt: { owner: { issuer: "local-os-dac", uid: 1001, id: "local-os:uid:1001" } } }));
    expect(reading.snapshots.map(({ source }) => source.type)).toStrictEqual(["invocation", "host-process"]);
    expect(reading.snapshots.every(({ coverage }) => coverage === "partial")).toBe(true);
  });

  it("refuses a snapshot that names a different invocation or a conflicting embedded receipt", () => {
    expect(() => projectDetachedReading(input({ snapshot: { invocationId: "inv-other" } }))).toThrowError(expect.objectContaining({ category: "validation" }));
    expect(() => projectDetachedReading(input({ snapshot: { receipt: receipt({ pid: 77 }) } }))).toThrowError(expect.objectContaining({ category: "validation" }));
    expect(() => projectDetachedReading(input({ receipt: { invocationId: "bad id/../" }, snapshot: { invocationId: "bad id/../" } }))).toThrowError(expect.objectContaining({ category: "validation" }));
    expect(() => projectDetachedReading(input({ observedAt: "yesterday" }))).toThrowError(expect.objectContaining({ category: "validation" }));
  });

  it("reports a host-lost reading as unknown and stale, never as a replayed terminal verdict", () => {
    const reading = projectDetachedReading(input({ snapshot: {
      source: "local-client-transport", observation: "unknown", terminal: "completed", result: { ok: true },
      diagnostic: "Host connection lost", reconcileHint: "Reconcile known native effects with their producer.",
    } }));
    const node = invocationOf(reading);
    expect(node).toMatchObject({ coverage: "unknown", node: { statusTone: "unknown" } });
    expect(node.node.statusText).toContain("Host connection lost");
    expect(node.node.statusText).toContain("Reconcile known native effects");
    expect(JSON.stringify(reading.snapshots.map(({ node: presentation }) => presentation))).not.toMatch(/completed|failed|cancelled/i);
    expect(reading.stale).toStrictEqual([INVOCATION, HOST_PROCESS]);
    // A lost transport cannot newly confirm ownership; the edge stays whatever an earlier live reading stated.
    expect(reading.relations).toStrictEqual([]);
  });

  it("keeps observation, terminal outcome and cancellation request distinct", () => {
    const tone = (overrides: Partial<DetachedSnapshot>) => invocationOf(projectDetachedReading(input({ snapshot: overrides }))).node;
    expect(tone({ observation: "observed-started" })).toMatchObject({ statusTone: "active", statusText: "started" });
    expect(tone({ observation: "observed-running" })).toMatchObject({ statusTone: "active", statusText: "running" });
    expect(tone({ observation: "observed-terminal", terminal: "completed" })).toMatchObject({ statusTone: "success", statusText: "completed" });
    expect(tone({ observation: "observed-terminal", terminal: "failed" })).toMatchObject({ statusTone: "failure", statusText: "failed" });
    expect(tone({ observation: "observed-terminal", terminal: "cancelled", cancellationRequested: true })).toMatchObject({ statusTone: "failure", statusText: "cancelled" });
    expect(tone({ observation: "observed-terminal", terminal: "unknown" })).toMatchObject({ statusTone: "unknown" });
    const pending = tone({ observation: "observed-running", cancellationRequested: true });
    expect(pending.statusText).toContain("cancellation requested, not confirmed");
    expect(pending.statusText).not.toContain("cancelled");
    expect(pending.statusTone).not.toBe("failure");
    expect(tone({ observation: "observed-running" }).statusText).not.toContain("cancellation");
  });

  it("routes every presentation string through the shared sanitizers", () => {
    const hostile = "\u001b[31mred\u001b[0m \u202ebidi\u202c zero\u200bwidth\u2060join Bearer TOPSECRET-TOKEN " + "x".repeat(20_000);
    const reading = projectDetachedReading(input({ snapshot: { source: "local-client-transport", observation: "unknown", diagnostic: hostile, reconcileHint: hostile } }));
    const text = JSON.stringify(reading.snapshots);
    expect(text).not.toMatch(/TOPSECRET-TOKEN/);
    // Zero-width characters are outside the shared strip set (owner-filed wb-952); ESC and bidi are inside it.
    expect(text).not.toMatch(/[\u001b\u202a-\u202e\u2066-\u2069]|\\u001b/);
    for (const projected of reading.snapshots) {
      expect(Buffer.byteLength(projected.node.statusText)).toBeLessThanOrEqual(1024);
      expect(projected.node.statusText.length).toBeGreaterThan(0);
    }
    const projection = new ObservationProjection();
    expect(() => applyDetachedReading(projection, reading)).not.toThrow();
  });

  it("applies into the projection: nodes current, one confirmed ownership edge, idempotent on repeat", () => {
    const projection = new ObservationProjection();
    const reading = projectDetachedReading(input());
    expect(applyDetachedReading(projection, reading)).toStrictEqual({ snapshots: ["applied", "applied"], related: 1, stale: 0 });
    const node = projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0];
    expect(node).toMatchObject({ freshness: "current", completeness: "complete", presentation: { statusTone: "active" }, invocationId: "inv-det-1" });
    const edges = projection.relations({ scope: SCOPE });
    expect(edges).toHaveLength(1);
    expect(edges[0]?.kind).toBe("ownership");
    const revision = projection.relationRevision();
    applyDetachedReading(projection, reading);
    expect(projection.relations({ scope: SCOPE })).toHaveLength(1);
    expect(projection.relationRevision()).toBe(revision);
    expect(projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0]?.presentation.statusText).toBe("running");
  });

  it("never regresses terminal to running on a lower host instant, and a later live reading restores a lost host", () => {
    const projection = new ObservationProjection();
    const terminal = input({ snapshot: { observation: "observed-terminal", terminal: "completed", observedAt: "2026-10-15T09:00:10.000Z" } });
    applyDetachedReading(projection, projectDetachedReading(terminal));
    const older = applyDetachedReading(projection, projectDetachedReading(input({ snapshot: { observedAt: "2026-10-15T09:00:04.000Z" } })));
    expect(older.snapshots).toStrictEqual(["out-of-order", "out-of-order"]);
    expect(projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0]?.presentation.statusText).toBe("completed");

    const lost = applyDetachedReading(projection, projectDetachedReading(input({ observedAt: "2026-10-15T09:01:00Z", snapshot: { source: "local-client-transport", observation: "unknown", observedAt: "2026-10-15T09:00:59.000Z", diagnostic: "Host connection lost" } })));
    expect(lost.stale).toBe(2);
    expect(projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0]?.freshness).toBe("stale");
    applyDetachedReading(projection, projectDetachedReading(input({ observedAt: "2026-10-15T09:02:00Z", snapshot: { observedAt: "2026-10-15T09:01:59.000Z", observation: "observed-terminal", terminal: "failed" } })));
    expect(projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0]).toMatchObject({ freshness: "current", presentation: { statusText: "failed" } });
  });

  it("does not stale a newer confirmation from a host-lost reading older than it", () => {
    const projection = new ObservationProjection();
    applyDetachedReading(projection, projectDetachedReading(input({ snapshot: { observedAt: "2026-10-15T09:00:30.000Z" } })));
    const older = applyDetachedReading(projection, projectDetachedReading(input({ snapshot: { source: "local-client-transport", observation: "unknown", observedAt: "2026-10-15T09:00:10.000Z", diagnostic: "Host connection lost" } })));
    expect(older).toStrictEqual({ snapshots: ["out-of-order", "out-of-order"], related: 0, stale: 0 });
    expect(projection.query({ scope: SCOPE, ref: INVOCATION, limit: 5 }).nodes[0]).toMatchObject({ freshness: "current", presentation: { statusText: "running" } });
  });

  it("is provider-free by construction: type-only host import, no socket, child process or launch/connect call", () => {
    const source = readFileSync(new URL("../src/workbench/detached-observer.ts", import.meta.url), "utf8");
    const statements = [...source.matchAll(/^(?:import|export)\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)];
    const modules = statements.map((match) => match[1]).sort();
    expect(modules).toStrictEqual(["./capability-registry.js", "./hosts/local-detached.js", "./observation.js", "./redaction.js"]);
    for (const statement of statements.filter((match) => match[1] === "./hosts/local-detached.js")) expect(statement[0]).toMatch(/^import type\s/);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(|node:net|node:child_process/);
    expect(source).not.toMatch(/connectDetachedWorkflow|launchDetachedWorkflow|Date\.now|new Date\(\)/);
  });
});
