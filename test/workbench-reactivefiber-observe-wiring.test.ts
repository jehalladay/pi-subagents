/**
 * wb-79k.2 (W13/VC-2 ReactiveFiber observe-wiring), through the REAL extension: each case boots src/index.ts in claude mode over a
 * hermetic project, puts a stand-in `rf` first on a test-scoped PATH (the real registered provider spawns it by name exactly as it
 * spawns the installed CLI, so the reading arrives through the real registered CLI path), runs one workflow script whose node()
 * call reaches reactivefiber.render.preview, and reads the session's live ObservationProjection back through the registered
 * workflow_observe tool and through call-through spies on ObservationProjection.prototype.refresh and relate. Nothing is replaced.
 *
 * Bead acceptance quoted per case:
 *  RFW1 (1) "with the wiring absent at trunk, a test proves the live ObservationProjection holds no reactivefiber snapshot after a
 *       reactivefiber.render.preview envelope is returned to a workflow operation; green only after the wiring applies
 *       reactivefiberTopology via refresh+relate" (docs/workbench/09 § Reader adapters: "RF: render context provenance and context
 *       artifact references.").
 *  RFW2 (2) "'Authorization: Bearer' on one line with the secret value on the next line, flowing through the full wired surface,
 *       comes out redacted": the split credential rides every free-text field of the envelope and the node label; the preview IS
 *       projected (the surface is exercised), and no surfaced string - the projected snapshot, the workflow_observe reply, any
 *       workflow_log line - carries the secret value.
 *  RFW3 (4, 5) "an RF_ failure stays a failure, never a success" and "absent a host-held envelope, zero adapter calls": on the real
 *       path an RF_ refusal is a thrown CapabilityError, so the host holds no envelope, the adapter is never called and no
 *       reactivefiber snapshot is projected.
 *  RFW4 (5) "Context is host-bound (scope, seam, capturedAt/observedAt, invocationId, operationRef never caller-supplied); the
 *       wiring never invokes rf; no new grant minted".
 * The credential-shaped values are obviously fake. Nothing here needs a real rf, a TTY or the network.
 */
import { chmodSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { CapabilityRegistry, type InvocationContext } from "../src/workbench/capability-registry.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection } from "../src/workbench/observation.js";
import type { ObserveReply } from "../src/workbench/observe-query.js";
import * as rfObserver from "../src/workbench/reactivefiber-observer.js";
import * as workflowTask from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { fullShapeRf, type Json, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

installScratchLeakGuard();

const TIMEOUT = 90_000;
const GRANTS = ["workbench:observe", "reactivefiber:render"];
const LF = String.fromCodePoint(0x0a);
/** The obviously fake secret value; the split credential puts it on the line after its scheme. */
const FAKE_SECRET = "obviously-fake-wb79k2-line-split-value";
const SPLIT_CREDENTIAL = `Authorization: Bearer${LF}${FAKE_SECRET}`;
const RF_NODE = 'try { await node("reactivefiber.render.preview",{model:"model",task:"task"},{label:"rf"}); return "rf:ok"; } catch (e) { return "rf:" + e.category; }';

const oldPath = process.env.PATH;
const scratches: string[] = [];
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
  vi.restoreAllMocks();
});

type JsonObject = { [key: string]: Json };

/** A stand-in `rf` first on PATH: appends one JSON argv line per spawn to the returned log, prints the envelope, exits with the code. */
function standInRf(envelope: Json, code: number): string {
  const folder = makeScratch("rf-observe-wiring-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!${process.execPath}\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(${code});\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}

function spawnLines(log: string): string[] {
  return readFileSync(log, "utf8").trim().split(LF);
}

async function boot() {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: GRANTS } } });
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd: sandbox.dir });
  await booted.lifecycle.get("session_start")?.({}, context);
  return { booted, context, projectRoot: realpathSync(sandbox.dir) };
}
type Booted = Awaited<ReturnType<typeof boot>>;

/** Launches one script through the registered SubagentWorkflow tool and returns its task id and the completion notification text. */
async function run(host: Booted, body: string): Promise<{ taskId: string; notification: string }> {
  const script = `export const meta={name:"rf-observe-wiring",description:"local"}; ${body}`;
  const launched = await host.booted.tools.get("SubagentWorkflow").execute("w", { script }, undefined, undefined, host.context);
  const taskId: unknown = launched.details?.taskId;
  if (typeof taskId !== "string") throw new Error("SubagentWorkflow returned no task id");
  for (let i = 0; i < 3000; i++) {
    const sent = host.booted.pi.sendMessage.mock.calls.find(([item]: [unknown]) => JSON.stringify(item).includes(taskId));
    if (sent) return { taskId, notification: String((sent[0] as { content?: unknown }).content) };
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error("workflow did not settle in the test window");
}

async function observeText(host: Booted, taskId: string): Promise<string> {
  const tool = host.booted.tools.get("workflow_observe");
  const params = { taskId, selectors: { relations: true, events: { limit: 40 } } };
  return textOf(await tool.execute("o", params, undefined, undefined, host.context as ExtensionContext));
}

/** Records every workflow_log line any run's progress receives, through a call-through spy on the one progress writer. */
function recordLogLines(): string[] {
  const lines: string[] = [];
  const update = workflowTask.updateWorkflowProgressBatch;
  vi.spyOn(workflowTask, "updateWorkflowProgressBatch").mockImplementation((task, entries) => {
    for (const entry of entries) if (entry.type === "workflow_log") lines.push(entry.message);
    return update(task, entries);
  });
  return lines;
}

const isPreview = (ref: Pick<NativeRef, "provider" | "type">): boolean => ref.provider === "reactivefiber" && ref.type === "context-preview";

/** A full-shape envelope of the project root with the split credential in every free-text field the producer controls. */
function credentialEnvelope(root: string): JsonObject {
  const envelope = fullShapeRf(root) as JsonObject;
  const result = envelope.result as JsonObject;
  (result.output as JsonObject).text = SPLIT_CREDENTIAL;
  (result.budget as JsonObject).requested_model_id = SPLIT_CREDENTIAL;
  const provenance = result.provenance as JsonObject;
  provenance.cli_version = SPLIT_CREDENTIAL;
  (provenance.sdk_versions as JsonObject).tsx_runtime = { distribution_version: SPLIT_CREDENTIAL, contract_fingerprint: "unknown" };
  result.observations = [{ status: SPLIT_CREDENTIAL, freshness: "captured_at_render", replayed: false }];
  (result.blocks as JsonObject[])[0].candidate_key = SPLIT_CREDENTIAL;
  (result.necessity as JsonObject[])[0].reason = SPLIT_CREDENTIAL;
  envelope.diagnostics = [{ code: "WB_FAKE_NOTE", severity: "warning", message: SPLIT_CREDENTIAL, hint: SPLIT_CREDENTIAL, source: SPLIT_CREDENTIAL, metadata: { note: SPLIT_CREDENTIAL } }];
  return envelope;
}

describe("wb-79k.2 the ReactiveFiber preview a workflow node() call is answered with reaches the session's live ObservationProjection through the host seam (RFW1-RFW4, the real extension)", () => {
  it("RFW1: the preview snapshot is in the live projection after the node() call, grouped under the invoking node call", async () => {
    const host = await boot();
    standInRf(fullShapeRf(host.projectRoot), 0);
    const adapter = vi.spyOn(rfObserver, "reactivefiberTopology");
    const { taskId, notification } = await run(host, RF_NODE);
    expect(notification).toContain("<result>rf:ok</result>");
    expect(adapter).toHaveBeenCalledTimes(1);
    const reply = JSON.parse(await observeText(host, taskId)) as ObserveReply;
    const previews = reply.nodes.filter(node => isPreview(node.nativeRef));
    expect(previews.map(node => node.nativeRef)).toEqual([{ provider: "reactivefiber", type: "context-preview", id: RF_FIXTURE_OPERATION_ID, scope: host.projectRoot }]);
    const [preview] = previews;
    expect(preview.kind).toBe("reactivefiber.render.preview.snapshot");
    expect(preview.completeness).toBe("complete");
    expect(preview.freshness).toBe("current");
    expect(preview.presentation.statusTone).toBe("success");
    expect(preview.presentation.statusText.startsWith("noncommitted preview (rf-cli) · ")).toBe(true);
    expect(preview.evidenceRefs).toContain(`rf-workspace:${RF_FIXTURE_WORKSPACE_ID}`);
    const call = reply.nodes.find(node => node.nativeRef.provider === "pi-workflow" && node.nativeRef.type === "node-call");
    expect(call?.nativeRef.id.startsWith(`${taskId}:`)).toBe(true);
    const counts = reply.relations?.perNode.find(entry => entry.key === call?.key);
    expect(counts?.outgoing.grouping).toBe(1);
  }, TIMEOUT);

  it("RFW2: the line-split credential in every free-text envelope field and the node label never reaches a surfaced string, while the preview is projected", async () => {
    const host = await boot();
    standInRf(credentialEnvelope(host.projectRoot), 0);
    const logs = recordLogLines();
    const refreshed: NativeSnapshot[] = [];
    const refresh = ObservationProjection.prototype.refresh;
    vi.spyOn(ObservationProjection.prototype, "refresh").mockImplementation(function (this: ObservationProjection, snapshot: NativeSnapshot) {
      refreshed.push(snapshot);
      return refresh.call(this, snapshot);
    });
    const label = JSON.stringify(SPLIT_CREDENTIAL);
    const { taskId } = await run(host, `try { await node("reactivefiber.render.preview",{model:"model",task:"task"},{label:${label}}); return "rf:ok"; } catch (e) { return "rf:" + e.category; }`);
    const observed = await observeText(host, taskId);
    const reply = JSON.parse(observed) as ObserveReply;
    const previews = refreshed.filter(snapshot => isPreview(snapshot.source));
    expect(previews).toHaveLength(1);
    expect(reply.nodes.filter(node => isPreview(node.nativeRef))).toHaveLength(1);
    const surfaced = [JSON.stringify(previews), observed, ...logs];
    for (const text of surfaced) expect(text.includes(FAKE_SECRET), "a surfaced string carries the split credential's value").toBe(false);
    for (const node of reply.nodes) {
      expect(UNSAFE_DISPLAY.test(node.presentation.title)).toBe(false);
      expect(UNSAFE_DISPLAY.test(node.presentation.statusText)).toBe(false);
    }
  }, TIMEOUT);

  it("RFW3: an RF_ refusal on the real path is a failed node, no adapter call and no reactivefiber snapshot", async () => {
    const host = await boot();
    const refusal: Json = {
      schema: "reactive-fiber.cli/v1", ok: false, command: "context.render", operation_id: RF_FIXTURE_OPERATION_ID, workspace: null,
      transaction_id: null, result: null, diagnostics: [{ code: "RF_RENDER_REFUSED", severity: "error", message: "refused", hint: null, source: "host", metadata: {} }],
    };
    standInRf(refusal, 3);
    const adapter = vi.spyOn(rfObserver, "reactivefiberTopology");
    const { taskId, notification } = await run(host, RF_NODE);
    expect(notification).toContain("<result>rf:unavailable</result>");
    expect(adapter).not.toHaveBeenCalled();
    const reply = JSON.parse(await observeText(host, taskId)) as ObserveReply;
    expect(reply.nodes.filter(node => isPreview(node.nativeRef))).toEqual([]);
    expect(reply.nodes.some(node => node.presentation.statusTone === "success")).toBe(false);
  }, TIMEOUT);

  it("RFW4: the reading's scope, clock, invocation and invoking operation are the host's, rf is spawned once by the provider alone and the registry is invoked once with the configured grants", async () => {
    const host = await boot();
    const log = standInRf(fullShapeRf(host.projectRoot), 0);
    const refreshed: NativeSnapshot[] = [];
    const related: Array<Parameters<ObservationProjection["relate"]>[0]> = [];
    const refresh = ObservationProjection.prototype.refresh;
    const relate = ObservationProjection.prototype.relate;
    vi.spyOn(ObservationProjection.prototype, "refresh").mockImplementation(function (this: ObservationProjection, snapshot: NativeSnapshot) {
      refreshed.push(snapshot);
      return refresh.call(this, snapshot);
    });
    vi.spyOn(ObservationProjection.prototype, "relate").mockImplementation(function (this: ObservationProjection, input: Parameters<ObservationProjection["relate"]>[0]) {
      related.push(input);
      relate.call(this, input);
    });
    const contexts: InvocationContext[] = [];
    const invoke = CapabilityRegistry.prototype.invoke;
    vi.spyOn(CapabilityRegistry.prototype, "invoke").mockImplementation(function (this: CapabilityRegistry, id: string, input: unknown, context: InvocationContext) {
      contexts.push(context);
      return invoke.call(this, id, input, context);
    });
    const before = new Date().toISOString();
    // A label shaped like another operation's reference names nothing: the invoking operation is the host's key for the call.
    const { taskId } = await run(host, 'try { await node("reactivefiber.render.preview",{model:"model",task:"task"},{label:"pi-workflow:node-call:wf_forged:9"}); return "rf:ok"; } catch (e) { return "rf:" + e.category; }');
    const after = new Date().toISOString();
    const previews = refreshed.filter(snapshot => isPreview(snapshot.source));
    expect(previews).toHaveLength(1);
    const [snapshot] = previews;
    expect(snapshot.scope.workspace).toBe(host.projectRoot);
    expect(snapshot.scope.principal.startsWith("local-operator:")).toBe(true);
    expect(snapshot.trace).toEqual({ invocationId: taskId });
    expect(snapshot.capturedAt).toBe(snapshot.observedAt);
    expect(snapshot.capturedAt >= before && snapshot.capturedAt <= after).toBe(true);
    const edges = related.filter(edge => isPreview(edge.to));
    expect(edges).toHaveLength(1);
    const [edge] = edges;
    expect(edge.scope).toEqual(snapshot.scope);
    expect(edge.kind).toBe("grouping");
    expect(edge.to).toEqual(snapshot.source);
    expect(edge.from.provider).toBe("pi-workflow");
    expect(edge.from.type).toBe("node-call");
    expect(edge.from.id).toMatch(new RegExp(`^${taskId}:[0-9]+$`));
    const reply = JSON.parse(await observeText(host, taskId)) as ObserveReply;
    expect(reply.nodes.some(node => node.nativeRef.provider === "pi-workflow" && node.nativeRef.id === edge.from.id)).toBe(true);
    expect(spawnLines(log)).toHaveLength(1);
    expect(contexts).toHaveLength(1);
    expect([...contexts[0].grants]).toEqual(GRANTS);
  }, TIMEOUT);
});
