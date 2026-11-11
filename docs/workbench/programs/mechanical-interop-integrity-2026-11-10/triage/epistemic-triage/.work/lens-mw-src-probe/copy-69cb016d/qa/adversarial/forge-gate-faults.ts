/**
 * Live fault injection around the native Forge gate on a CLEAN scratch package.
 * Usage: node qa/adversarial/forge-gate-faults.ts <clean-forge-package-root>
 * Records what happened; it never retries, never edits forge.toml and never
 * converts an interrupted or stale observation into a PASS.
 */
import { spawn, execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const liveGate = join(here, "../../apps/development-rig/dist/live-gate.js");
const { verifyExistingCandidate } = await import(pathToFileURL(liveGate).href);
const root = process.argv[2];
if (!root) { console.error("usage: forge-gate-faults.ts <clean-package-root>"); process.exit(2); }
const git = (...args: string[]) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
const porcelain = () => git("status", "--porcelain");
const forgeProcesses = () => { try { return execFileSync("pgrep", ["-fc", `forge.*${root}|app-server`], { encoding: "utf8" }).trim(); } catch { return "0"; } };
type Observation = { kind: string; reason: string; operationId: string | null; basis: { commit: string; clean: boolean } };
const summarize = (o: Observation) => ({ kind: o.kind, reason: o.reason, operationId: o.operationId, commit: o.basis.commit, clean: o.basis.clean });
const report: { schema: string; root: string; forge: string; revision: string; steps: Record<string, unknown>; error?: string } = { schema: "mechanical-workflows/forge-gate-faults/v1", root, forge: execFileSync("forge", ["--version"], { encoding: "utf8" }).trim().split("\n")[0] ?? "forge", revision: git("rev-parse", "HEAD"), steps: {} };
if (porcelain() !== "") { console.error("FAULT_TEST_REQUIRES_CLEAN_TREE"); process.exit(2); }
process.on("uncaughtException", error => { report.error = String(error); console.log(JSON.stringify(report)); process.exit(1); });
process.on("unhandledRejection", error => { report.error = String(error); console.log(JSON.stringify(report)); process.exit(1); });
// 1. Double start: two controllers dispatch the gate for the same clean root at once.
{
  const started = Date.now();
  const [a, b] = await Promise.all([verifyExistingCandidate(root, "forge"), verifyExistingCandidate(root, "forge")]);
  report.steps.doubleStart = { elapsedMs: Date.now() - started, first: summarize(a), second: summarize(b), distinctOperations: a.operationId !== null && b.operationId !== null && a.operationId !== b.operationId, treeCleanAfter: porcelain() === "" };
}
// 2. Controller death: the dispatching process is SIGKILLed mid-gate; no result may be printed.
{
  const child = spawn(process.execPath, ["--input-type=module", "-e",
    `const {verifyExistingCandidate}=await import(${JSON.stringify(pathToFileURL(liveGate).href)});const o=await verifyExistingCandidate(${JSON.stringify(root)},"forge");process.stdout.write(JSON.stringify({kind:o.kind,operationId:o.operationId}));`],
    { stdio: ["ignore", "pipe", "pipe"] });
  let stdout = ""; child.stdout.on("data", d => { stdout += d; });
  const beforeKill = forgeProcesses();
  await new Promise(r => setTimeout(r, 2500));
  child.kill("SIGKILL");
  const exit = await new Promise(r => child.on("exit", (code, signal) => r({ code, signal })));
  const immediatelyAfter = forgeProcesses();
  // Give an orphaned native gate up to 90 s to settle on its own; we observe, we do not kill it.
  const settleStart = Date.now(); let orphan = immediatelyAfter;
  while (Date.now() - settleStart < 90_000 && Number(orphan) > Number(beforeKill)) { await new Promise(r => setTimeout(r, 2000)); orphan = forgeProcesses(); }
  report.steps.controllerKilled = { exit, controllerPrintedResult: stdout !== "", stdout, forgeProcessesBefore: beforeKill, forgeProcessesAfterKill: immediatelyAfter, forgeProcessesAfterSettle: orphan, settleMs: Date.now() - settleStart, treeCleanAfter: porcelain() === "" };
}
// 3. Stale workspace: a tracked file changes while the gate runs.
{
  const tracked = git("ls-files").split("\n").filter((f: string) => f && f !== "forge.toml");
  if (tracked.length === 0) throw new Error("FAULT_TEST_NEEDS_A_TRACKED_FILE");
  const first = tracked[0];
  if (!first) throw new Error("FAULT_TEST_NEEDS_A_TRACKED_FILE");
  const victim = join(root, first);
  const original = readFileSync(victim);
  const pending = verifyExistingCandidate(root, "forge");
  await new Promise(r => setTimeout(r, 1500));
  appendFileSync(victim, "\nstale-workspace fault injected during gate\n");
  const observation = await pending;
  const dirtyDuring = porcelain() !== "";
  writeFileSync(victim, original);
  report.steps.staleWorkspace = { observation: summarize(observation), treeWasDirtyAfterInjection: dirtyDuring, restoredClean: porcelain() === "" };
}
// 4. Recovery: a fresh gate on the clean tree after the faults.
{
  const observation = await verifyExistingCandidate(root, "forge");
  report.steps.recovery = { observation: summarize(observation), treeCleanAfter: porcelain() === "" };
}
console.log(JSON.stringify(report));
