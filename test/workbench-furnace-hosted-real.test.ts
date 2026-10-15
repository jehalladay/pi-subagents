/**
 * Live tier for the Furnace-hosted adapter (wb-zmd). NOT part of the default gate:
 * run it with `forge run furnace-hosted-live`.
 *
 * Every Run lives in a disposable /tmp workspace with its own bd store and its own
 * Furnace state directory, in the default wisp mode, with fixture formulas only.
 * Nothing here calls `furnace doctor`, starts a capability probe, uses
 * --persistent, or touches this repository's .beads or .furnace. The vendored
 * SDK's contract drift is repaired in a temp COPY (test/helpers) so the real
 * bridge can decode contexts; the adapter's own preflight refuses the shipped drift.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { FurnaceHostedExecutor, type HostedOutcome, type HostedWorkflow } from "../src/workbench/hosts/furnace-hosted.js";
import { loadRepairedFurnaceSdk } from "./helpers/furnace-sdk-repaired.js";

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const REPO = process.cwd();
const mainTreeState = (): string => `${execFileSync("git", ["-C", REPO, "status", "--porcelain=v1"], { encoding: "utf8" })}${execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], { encoding: "utf8" })}`;

function requireBinary(name: string): void {
  const probe = spawnSync(name, ["--version"], { encoding: "utf8" });
  if (probe.status !== 0) {
    process.stderr.write(`furnace-hosted live tier requires \`${name}\` on PATH (exit 2).\n`);
    process.exit(2);
  }
}

function disposableWorkspace(): string {
  const root = realpathSync(mkdtempSync("/tmp/pi-furnace-hosted."));
  execFileSync("git", ["init", "-q", root]);
  execFileSync("bd", ["init", "--quiet"], { cwd: root, env: { ...process.env, BD_NON_INTERACTIVE: "1" }, stdio: "pipe" });
  mkdirSync(join(root, ".beads/formulas"), { recursive: true });
  const steps = (ids: string[]): string => ids.map((id, index) => `[[steps]]\nid = "${id}"\ntitle = "fixture ${id}"\ndescription = "Fixture step ${id}."\n${index > 0 ? `needs = ["${ids[index - 1]}"]\n` : ""}`).join("\n");
  writeFileSync(join(root, ".beads/formulas/hosted-pair.formula.toml"), `formula = "hosted-pair"\ntype = "workflow"\nversion = 1\n\n${steps(["first", "second"])}`);
  writeFileSync(join(root, ".beads/formulas/hosted-single.formula.toml"), `formula = "hosted-single"\ntype = "workflow"\nversion = 1\n\n${steps(["only"])}`);
  return root;
}

let repaired: Awaited<ReturnType<typeof loadRepairedFurnaceSdk>>;
let workspace: string;
beforeAll(async () => {
  requireBinary("furnace");
  requireBinary("bd");
  repaired = await loadRepairedFurnaceSdk();
  workspace = disposableWorkspace();
  expect(workspace).toMatch(/^\/tmp\/pi-furnace-hosted\.[^/]+$/);
});

afterAll(() => {
  if (workspace && /^\/tmp\/pi-furnace-hosted\.[^/]+$/.test(workspace)) rmSync(workspace, { recursive: true, force: true });
});

describe("Furnace-hosted adapter over the real bridge (disposable /tmp workspace, wisp mode)", () => {
  it("serves one bridge host session per real Attempt and agrees with Furnace's own Attempt records", async () => {
    const before = mainTreeState();
    const ran: string[] = [];
    const workflow: HostedWorkflow = async ({ identity }) => {
      ran.push(identity.attemptId);
      return { status: "success", summary: `fixture ${identity.ordinal}` };
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state"), timeoutMs: 60_000 };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow, sdk: repaired.sdk, furnace, startTimeoutMs: 120_000 });
    const started = await executor.start({ formula: "hosted-pair" });
    const client = new repaired.sdk.Furnace(furnace);
    const status = await client.runs.get(started.runId).status({ timeoutMs: 30_000 });
    const attempts = await client.attempts.list(started.runId, {}, { timeoutMs: 30_000 });
    const receipt = executor.receipt();
    process.stdout.write(`\nHOSTED-RECEIPT-PAIR ${JSON.stringify({ run: receipt.run, runState: status.data.state, furnaceAttempts: attempts.data.attempts.map((a) => [a.attempt_id, a.ordinal, a.state, a.outcome]), receipt: receipt.attempts.map((a) => [a.attemptId, a.ordinal, a.sessionInstanceId, a.terminal]) })}\n`);
    expect(status.data.state).toBe("completed");
    expect(attempts.data.attempts).toHaveLength(2);
    expect(attempts.data.attempts.map((a) => a.state)).toEqual(["succeeded", "succeeded"]);
    // Furnace lists Attempts by Work then ordinal; the adapter receipts them in admission order. Compare as sets.
    const identities = (rows: Array<[string, number]>): Array<[string, number]> => rows.sort((a, b) => a[0].localeCompare(b[0]));
    expect(identities(receipt.attempts.map((a) => [a.attemptId, a.ordinal]))).toEqual(identities(attempts.data.attempts.map((a) => [a.attempt_id, a.ordinal])));
    expect(ran).toEqual(receipt.attempts.map((a) => a.attemptId));
    expect(new Set(receipt.attempts.map((a) => a.sessionInstanceId)).size).toBe(2);
    expect(receipt.attempts.every((a) => a.terminal === "success")).toBe(true);
    expect(receipt.identityViolations).toEqual([]);
    await executor.close();
    expect(mainTreeState()).toBe(before);
  });

  it("cancels cooperatively on an operator Attempt stop: the workflow halts and no effect follows the abort", async () => {
    const before = mainTreeState();
    const effects: number[] = [];
    let abortedAtEffects = -1;
    const workflow: HostedWorkflow = async ({ signal }) => {
      for (let step = 1; step <= 2000; step++) {
        if (signal.aborted) {
          abortedAtEffects = effects.length;
          return { status: "cancelled", summary: `stopped before step ${step}` } satisfies HostedOutcome;
        }
        effects.push(step);
        await sleep(25);
      }
      return { status: "success" };
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state-cancel"), timeoutMs: 60_000 };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted-cancel", workflow, sdk: repaired.sdk, furnace, startTimeoutMs: 120_000, cancelGraceMs: 10_000 });
    const starting = executor.start({ formula: "hosted-single" });
    const client = new repaired.sdk.Furnace(furnace);
    let attemptId: string | undefined;
    for (let i = 0; i < 400 && attemptId === undefined; i++) {
      attemptId = executor.receipt().attempts[0]?.attemptId;
      if (attemptId === undefined) await sleep(50);
    }
    expect(attemptId).toBeDefined();
    await sleep(300);
    const stop = await client.attempts.stop(attemptId as string, { timeoutMs: 30_000 });
    const started = await starting;
    const receipt = executor.receipt();
    const attempt = receipt.attempts[0];
    const frozen = effects.length;
    await sleep(500);
    const inspected = await client.attempts.inspect(attemptId as string, { timeoutMs: 30_000 });
    process.stdout.write(`\nHOSTED-RECEIPT-CANCEL ${JSON.stringify({ run: receipt.run, stopKind: stop.kind, attemptState: inspected.data.state, attemptOutcome: inspected.data.outcome, receipt: attempt, effectsAtAbort: abortedAtEffects, effectsAfter: effects.length })}\n`);
    expect(started.runId).toBe(receipt.run?.runId);
    expect(attempt).toMatchObject({ terminal: "cancelled", cancel: { requested: true }, unsettledAfterCancel: false });
    expect(attempt?.cancel.reason).toMatch(/operator_stop/);
    expect(abortedAtEffects).toBeGreaterThan(0);
    expect(effects.length).toBe(frozen);
    expect(frozen).toBe(abortedAtEffects);
    expect(inspected.data.state).toBe("cancelled");
    await executor.close();
    expect(mainTreeState()).toBe(before);
  });
});
