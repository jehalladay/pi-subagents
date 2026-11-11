#!/usr/bin/env node
import { develop } from "@mechanical/workflows-development";
import { createFixtureServices } from "./fixture.js";
import { verifyCli } from "./live-verify-cli.js";
import { developCli } from "./live-develop-cli.js";
import { selectCli } from "./live-select-cli.js";
import { gpReconcileCli, selectBeadCli } from "./select-bead-cli.js";
import { gpReplayCli } from "./graph-policy-replay-cli.js";
import { refusalReason } from "./refusal.js";

function argsOf(argv: string[]): { fixture: boolean; task: string; workspaceId: string; baseRevision: string } {
  let fixture = false;
  let task = "";
  let workspaceId = "example";
  let baseRevision = "fixture-base";
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === "--fixture") { fixture = true; continue; }
    if (key === "--task" || key === "--workspace" || key === "--revision") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`INVALID_ARGUMENT: ${key} requires a value`);
      if (key === "--task") task = value;
      if (key === "--workspace") workspaceId = value;
      if (key === "--revision") baseRevision = value;
      continue;
    }
    throw new Error(`UNKNOWN_ARGUMENT: ${key}`);
  }
  if (!task.trim()) throw new Error("MISSING_TASK: --task is required");
  return { fixture, task, workspaceId, baseRevision };
}

async function main(): Promise<void> {
  try {
    if (process.argv[2] === "--live-develop") {
      process.exitCode = await developCli(process.argv.slice(3));
      return;
    }
    if (process.argv[2] === "--live-select") {
      process.exitCode = await selectCli(process.argv.slice(3));
      return;
    }
    if (process.argv[2] === "--select-bead") {
      process.exitCode = await selectBeadCli(process.argv.slice(3));
      return;
    }
    if (process.argv[2] === "--gp-replay") {
      process.exitCode = await gpReplayCli(process.argv.slice(3));
      return;
    }
    if (process.argv[2] === "--gp-reconcile") {
      process.exitCode = await gpReconcileCli(process.argv.slice(3));
      return;
    }
    if (process.argv[2] === "--live-verify") {
      process.exitCode = await verifyCli(process.argv.slice(3));
      return;
    }
    const a = argsOf(process.argv.slice(2));
    if (!a.fixture) {
      throw new Error("LIVE_DEVELOPMENT_NOT_IMPLEMENTED: use --fixture for a synthetic composition test, --live-verify for a real Forge gate on an existing clean candidate, --live-develop for the single-writer journey, or --live-select for isolated multi-candidate selection, --select-bead for host work selection with optional GraphPolicy advice");
    }
    const result = await develop(
      createFixtureServices(),
      { task: a.task, workspaceId: a.workspaceId, baseRevision: a.baseRevision },
    );
    process.stdout.write(JSON.stringify({
      mode: "fixture", evidenceAuthority: "none", result,
    }) + "\n");
  } catch (error) {
    process.stderr.write(JSON.stringify({
      status: "refused", reason: refusalReason(error),
    }) + "\n");
    process.exitCode = 2;
  }
}
void main();
