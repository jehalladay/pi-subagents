/**
 * wb-a3s through the REGISTERED tools: forge_gate_run starts an operation over a connection the booted extension keeps and
 * observes it into the session projection; workflow_control then admits the forge target the ordinary way (observed in
 * scope, owned by the server's own step statement) and cancels it over the retained connection. No live forge: @forge/sdk's
 * ServerConnection and OperationClient are replaced by a frame-pushing fake, so every verb is counted at the seam.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type * as ForgeSdk from "@forge/sdk";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import subagentsExtension, { observedPackageHead } from "../src/index.js";
import { ctx, hermeticDir, makePi, textOf } from "./helpers/boot-extension.js";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");

type Sink = (frame: { method: string; params: unknown }) => void;
const seam = vi.hoisted(() => ({
  spawns: 0,
  cancels: [] as string[],
  closes: 0,
  sinks: new Set<Sink>(),
  requests: [] as Array<{ method: string; params: unknown }>,
  settle: undefined as ((reply: unknown) => void) | undefined,
  nextOperationId: "op-a3s00000000000000000000000000001",
  reset(): void { this.spawns = 0; this.cancels = []; this.closes = 0; this.sinks.clear(); this.requests = []; this.settle = undefined; },
  frame(method: string, params: unknown): void { for (const sink of this.sinks) sink({ method, params }); },
}));
vi.mock("@forge/sdk", async importOriginal => {
  const original = await importOriginal<typeof ForgeSdk>();
  const connection = {
    initialize: async () => "compatible",
    capabilities: { mode: "persistent", stateOf: (name: string) => (["gate.run", "gate.status", "operation.cancel", "cancel"].includes(name) ? "supported" : "unknown") },
    onNotification(sink: Sink) { seam.sinks.add(sink); return () => { seam.sinks.delete(sink); }; },
    request(method: string, params: unknown) {
      seam.requests.push({ method, params });
      if (method === "gate.run") setTimeout(() => seam.frame("operation.started", { operation_id: seam.nextOperationId, request_id: "2" }), 0);
      return new Promise<unknown>(resolve => { seam.settle = resolve; });
    },
    close: async () => { seam.closes += 1; },
  };
  return {
    ...original,
    ServerConnection: { spawn: () => { seam.spawns += 1; return connection; } },
    OperationClient: { over: () => ({ cancel: async (id: string) => {
      seam.cancels.push(id);
      return { operationId: id, cancelIntent: "CANCEL_REQUESTED", cancelAcceptance: "ACCEPTED", cancellationEstablished: false,
        raw: { operation_id: id, cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false } };
    } }) },
  };
});

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox = undefined; seam.reset(); });

async function boot(grants: string[]) {
  sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: grants } } });
  const pi = makePi();
  subagentsExtension(pi.pi);
  const context = ctx({ cwd: sandbox.dir });
  await pi.lifecycle.get("session_start")?.({}, context);
  const call = async (tool: string, params: Record<string, unknown>): Promise<string> =>
    textOf(await pi.tools.get(tool).execute("a3s", params, undefined, undefined, context));
  return { pi, context, dir: sandbox.dir, call };
}
const cancelOf = (id: string) => ({ target: { provider: "forge", type: "operation", id }, action: "cancel", confirmed: true });

describe("forge_gate_run through the booted extension (wb-a3s)", () => {
  it("denies without the forge:run grant and opens no connection", async () => {
    const { call } = await boot(["control:forge.cancel"]);
    expect(await call("forge_gate_run", { target: "/anywhere" })).toBe("Permission denied: forge:run grant required.");
    expect(seam.spawns).toBe(0);
  });

  it("refuses a target outside the bound workspace (or a relative one) before any connection is opened", async () => {
    const { call, dir } = await boot(["forge:run"]);
    expect(await call("forge_gate_run", { target: "/a3s/not-within-the-workspace" })).toBe("Forge gate.run denied outside the authorized workspace scope.");
    expect(await call("forge_gate_run", { target: "relative/pkg" })).toBe("Forge gate.run denied outside the authorized workspace scope.");
    mkdirSync(join(dir, "pkg"), { recursive: true });
    expect(seam.spawns).toBe(0);
  });

  it("starts the operation, admits it for workflow_control only once the server states a step under it, cancels over the retained connection, and keeps a never-started id cross-scope", async () => {
    const { call, dir } = await boot(["forge:run", "control:forge.cancel"]);
    const pkg = join(dir, "pkg");
    mkdirSync(pkg, { recursive: true });
    const started = JSON.parse(await call("forge_gate_run", { target: pkg })) as { contract: string; operationId: string; target: string; completion: string };
    expect(started.contract).toBe("workbench.forge-gate-run/v1");
    expect(started.operationId).toBe(seam.nextOperationId);
    expect(started.completion).toBe("not-asserted");
    expect(seam.spawns).toBe(1);
    expect(seam.requests).toStrictEqual([{ method: "gate.run", params: { root: started.target } }]);
    // Observed but not yet owned: the registered tool denies no-confirmed-ownership, and nothing reached the seam.
    const early = JSON.parse(await call("workflow_control", cancelOf(started.operationId))) as { ok: boolean; error?: { code: string } };
    expect(early.ok).toBe(false);
    expect(early.error?.code).toBe("no-confirmed-ownership");
    expect(seam.cancels).toStrictEqual([]);
    seam.frame("gate.step_started", { operation_id: started.operationId, seq: 1, step: "long" });
    const reply = JSON.parse(await call("workflow_control", cancelOf(started.operationId))) as { ok: boolean; invoked: boolean; status: string; control: { acknowledged?: { nativeAckRef?: string } } };
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    expect(seam.cancels).toStrictEqual([started.operationId]);
    const foreign = JSON.parse(await call("workflow_control", cancelOf("op-never00000000000000000000000000"))) as { ok: boolean; error?: { code: string } };
    expect(foreign.ok).toBe(false);
    expect(foreign.error?.code).toBe("cross-scope");
    expect(seam.cancels).toHaveLength(1);
    // The operation's own reply settles it; the retained connection is released and closed, and a later cancel is refused typed.
    seam.settle?.({ operation_id: started.operationId, status: "partial", terminal_disposition: "cancelled-established", lifecycle_state: "TERMINAL" });
    await new Promise(resolve => setTimeout(resolve, 5));
    expect(seam.closes).toBe(1);
    const late = JSON.parse(await call("workflow_control", cancelOf(started.operationId))) as { ok: boolean; error?: { code: string } };
    expect(late.ok).toBe(false);
    expect(late.error?.code).toBe("no-retained-connection");
    expect(seam.cancels).toHaveLength(1);
  });

  it("session_shutdown disposes a still-running operation's connection without issuing a cancel", async () => {
    const { pi, call, dir } = await boot(["forge:run", "control:forge.cancel"]);
    const pkg = join(dir, "pkg");
    mkdirSync(pkg, { recursive: true });
    const started = JSON.parse(await call("forge_gate_run", { target: pkg })) as { operationId: string };
    seam.frame("gate.step_started", { operation_id: started.operationId, seq: 1, step: "long" });
    expect(seam.closes).toBe(0);
    await pi.lifecycle.get("session_shutdown")?.({}, ctx({ cwd: dir }));
    expect(seam.closes).toBe(1);
    expect(seam.cancels).toStrictEqual([]);
  });
});

/**
 * wb-4ap.17 (COLLECTIVE-ADAPTATION-R17): the registered consumer compares the reply's run-start pin with the host's own reading of
 * the package repository, taken when the reply settles. The host side is observedPackageHead (git rev-parse HEAD and HEAD^{tree}
 * at the gate.run root); the seam is handed to the observer by the registered tool, read here from src/index.ts's own syntax.
 */
describe("forge_gate_run compares the reply's pin with the host's head (wb-4ap.17)", () => {
  it("wb-4ap.17: observedPackageHead reads the repository's HEAD commit and tree at the root it is given, and nothing for an unborn branch or a directory in no repository", () => {
    const repo = makeScratch("forge-head-");
    try {
      const git = (...args: string[]): string =>
        execFileSync("git", ["-C", repo, "-c", "user.email=probe@example.invalid", "-c", "user.name=probe", "-c", "commit.gpgsign=false", ...args], {
          encoding: "utf8", stdio: ["ignore", "pipe", "pipe"],
        }).trim();
      git("init", "-q");
      expect(observedPackageHead(repo)).toBeUndefined();
      mkdirSync(join(repo, "pkg"), { recursive: true });
      writeFileSync(join(repo, "pkg", "README.md"), "probe\n");
      git("add", "-A");
      git("commit", "-q", "-m", "probe");
      const head = { commit: git("rev-parse", "HEAD"), tree: git("rev-parse", "HEAD^{tree}") };
      expect(head.commit).toMatch(/^[0-9a-f]{40,64}$/);
      expect(observedPackageHead(repo)).toStrictEqual(head);
      expect(observedPackageHead(join(repo, "pkg"))).toStrictEqual(head);
      // An uncommitted edit moves neither half: the reading is HEAD's, and a dirty run's own "" tree is what tells it apart.
      writeFileSync(join(repo, "pkg", "README.md"), "probe dirty\n");
      expect(observedPackageHead(repo)).toStrictEqual(head);
    } finally {
      removeScratch(repo);
    }
    const outside = nonRepoScratch("forge-head-none-");
    try {
      expect(observedPackageHead(outside.dir)).toBeUndefined();
    } finally {
      outside.dispose();
    }
  });

  it("wb-4ap.17: the registered tool hands its gate.run observer the host's head reading at the gate.run root, as a seam the observer reads when the reply settles", () => {
    const file = ts.createSourceFile("src/index.ts", readFileSync(join(REPO, "src", "index.ts"), "utf8"), ts.ScriptTarget.Latest, true);
    const calls: ts.CallExpression[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && node.expression.getText(file) === "observeForgeGateRun") calls.push(node);
      ts.forEachChild(node, visit);
    };
    visit(file);
    expect(calls).toHaveLength(1);
    const options = calls[0]?.arguments[1];
    if (options === undefined || !ts.isObjectLiteralExpression(options)) throw new Error("observeForgeGateRun takes its deps as an object literal");
    const named = (name: string): string[] =>
      options.properties.filter(property => property.name?.getText(file) === name).map(property => property.getText(file));
    expect(named("root")).toStrictEqual(["root"]);
    expect(named("observedHead")).toStrictEqual(["observedHead: () => observedPackageHead(root)"]);
  });
});
