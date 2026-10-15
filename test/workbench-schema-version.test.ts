/** VC-6 residual (wb-oon): embedded and detached receipts of one script carry one definition.schemaVersion literal. */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { type CompareRun, compareWorkflowRuns, inspectWorkflowSource } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest, WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const SCRIPT = 'export const meta={name:"schema",description:"one literal"}; return 7;';
let sandbox: ReturnType<typeof hermeticDir> | undefined;
const hosts: number[] = [];
afterEach(() => {
  for (const pid of hosts.splice(0)) { try { process.kill(pid, "SIGTERM"); } catch {} }
  sandbox?.restore(); sandbox = undefined;
});

/** A comparison receipt around a real snapshot; the metric is a fixture, the identity is not. */
function receiptFor(snapshot: InvocationSnapshot, id: string): CompareRun {
  const d = identityDigest("fixture", { id });
  const ref = { provider: "forge", type: "operation", id };
  return { snapshot, inputDigest: d, modelDigest: d, toolsDigest: d, environmentDigest: d, cacheDigest: d, nativeRefs: [ref],
    metrics: [{ name: "elapsed", unit: "ms", value: 1, source: ref, evidenceRefs: [`fixture:${id}`], subjectBasis: snapshot.identity.subjectBasis, coverage: "complete", freshness: "current" }] };
}
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : []; });
}
async function settle<T>(read: () => Promise<T>, ready: (value: T) => boolean): Promise<T> {
  let value = await read();
  for (let i = 0; i < 300 && !ready(value); i++) { await new Promise(resolve => setTimeout(resolve, 10)); value = await read(); }
  return value;
}

describe("definition.schemaVersion is one shared literal", () => {
  it("is declared once, in the identity module, and nowhere else in src", () => {
    const root = join(process.cwd(), "src");
    const carriers = sourceFiles(root).filter(path => /"workflow(?:-script)?\/v1"/.test(readFileSync(path, "utf8"))).map(path => relative(root, path));
    expect(carriers).toEqual(["workbench/identity.ts"]);
    expect(WORKFLOW_SCRIPT_SCHEMA_VERSION).toBe("workflow-script/v1");
  });

  it("the embedded Pi receipt and the detached receipt of the same script compare as the same definition", async () => {
    sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:detach", "workbench:observe"] } } });
    const scriptPath = join(sandbox.dir, "schema.js"); writeFileSync(scriptPath, SCRIPT);
    const source = inspectWorkflowSource({ scriptPath }, sandbox.dir);
    expect(source.definition.schemaVersion).toBe(WORKFLOW_SCRIPT_SCHEMA_VERSION);
    const pi = makePi(); subagentsExtension(pi.pi); const context = ctx({ cwd: sandbox.dir }); await pi.lifecycle.get("session_start")?.({}, context);

    // Embedded: the receipt Pi itself captures for a run it owns, read through the observe tool.
    const launched = await pi.tools.get("SubagentWorkflow").execute("schema-embedded", { scriptPath }, undefined, undefined, context);
    const taskId = launched.details.taskId as string;
    const observe = async () => JSON.parse((await pi.tools.get("workflow_observe").execute("observe", { taskId }, undefined, undefined, context)).content[0].text) as { identity: { definition: { schemaVersion: string; id: string } } | null };
    const observed = await settle(observe, value => value.identity !== null);
    expect(observed.identity?.definition.schemaVersion).toBe(WORKFLOW_SCRIPT_SCHEMA_VERSION);

    // Detached: the host's private boot pin is the snapshot the receipt digests, so it is the detached receipt of record.
    const reply = await pi.tools.get("workflow_detached").execute("launch", { action: "launch", invocationId: "schema-detached", scriptPath, trustedScript: true, backend: "deterministic" }, undefined, undefined, context);
    const receipt = JSON.parse(reply.content[0].text) as { contract: string; pid: number; snapshotDigest: string };
    expect(receipt.contract).toBe("workbench.local-detached/v1"); hosts.push(receipt.pid);
    const boot = JSON.parse(readFileSync(join(process.env.PI_CODING_AGENT_DIR as string, "workbench-detached", "schema-detached", "invocation.json"), "utf8")) as { pin: InvocationSnapshot };
    const detached = boot.pin;
    expect(identityDigest("invocation-snapshot", detached)).toBe(receipt.snapshotDigest);
    expect(detached.identity.definition.schemaVersion).toBe(WORKFLOW_SCRIPT_SCHEMA_VERSION);
    expect(detached.identity.definition.id).toBe(source.definition.id);
    expect(detached.identity.definition.artifactDigest).toBe(source.definition.artifactDigest);

    const embedded: InvocationSnapshot = { ...detached, identity: { ...detached.identity, logicalInvocationId: "schema-embedded-receipt", definition: source.definition } };
    const result = compareWorkflowRuns([receiptFor(embedded, "embedded")], [receiptFor(detached, "detached")]);
    expect(result.diagnostics.some(item => item.code === "SCHEMA_MISMATCH")).toBe(false);
    expect(result.cohort.basis.find(item => item.field === "schemaVersion")?.status).toBe("matched");
    expect(result.cohort.confounds.some(item => item.field === "schemaVersion")).toBe(false);

    // Unification never relaxes strictness: a receipt of another schema is still refused, not coerced.
    const foreign: InvocationSnapshot = { ...detached, identity: { ...detached.identity, definition: { ...detached.identity.definition, schemaVersion: "workflow/v1" } } };
    const refused = compareWorkflowRuns([receiptFor(embedded, "embedded")], [receiptFor(foreign, "foreign")]);
    expect(refused.diagnostics.some(item => item.code === "SCHEMA_MISMATCH")).toBe(true);
    expect(refused.cohort.confounds.some(item => item.field === "schemaVersion" && item.kind === "refused")).toBe(true);
  }, 30_000);
});
