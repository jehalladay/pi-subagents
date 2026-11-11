/**
 * Live cancellation and lost-dispatch faults against the native Forge gate on a CLEAN scratch package,
 * driven through the public @forge/sdk so the operation id can be observed and cancelled mid-flight.
 * Usage: node qa/adversarial/forge-gate-cancel.ts <clean-forge-package-root>
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const rig = join(here, "../../apps/development-rig");
const { verifyExistingCandidate, classifyGateResponse, cleanGitBasis } = await import(pathToFileURL(join(rig, "dist/live-gate.js")).href);
// The public SDK is an optional, out-of-band install (docs/12): a non-literal fallback specifier keeps a fresh
// clone's typing gate green, and a missing SDK fails this live script at run time rather than at tsc time.
const sdkSpecifier: string = "@forge/sdk";
const sdk = await import(pathToFileURL(join(rig, "node_modules/@forge/sdk/dist/index.js")).href).catch(() => import(sdkSpecifier));
const root = process.argv[2];
if (!root) { console.error("usage: forge-gate-cancel.ts <clean-package-root>"); process.exit(2); }
const git = (...a: string[]) => execFileSync("git", ["-C", root, ...a], { encoding: "utf8" }).trim();
const porcelain = () => git("status", "--porcelain");
const operationLogs = () => { try { return readdirSync(join(root, ".forge/logs/operations")).filter(f => f.startsWith("op-")).length; } catch { return 0; } };
const report: { schema: string; root: string; forge: string; revision: string; steps: Record<string, unknown>; error?: string } = { schema: "mechanical-workflows/forge-gate-cancel/v1", root, forge: execFileSync("forge", ["--version"], { encoding: "utf8" }).trim().split("\n")[0] ?? "forge", revision: git("rev-parse", "HEAD"), steps: {} };
if (porcelain() !== "") { console.error("FAULT_TEST_REQUIRES_CLEAN_TREE"); process.exit(2); }
process.on("uncaughtException", e => { report.error = String(e); console.log(JSON.stringify(report)); process.exit(1); });
process.on("unhandledRejection", e => { report.error = String(e); console.log(JSON.stringify(report)); process.exit(1); });
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const basis = await cleanGitBasis(root);
// 1. Cancel a running gate after its operation.started frame; read the receipt and the operation's own terminal.
{
  const conn = sdk.ServerConnection.spawn("forge");
  let startedId: string | null = null; const notifications: string[] = [];
  conn.onNotification((n: { method: string; params: { operation_id?: string } | null }) => { notifications.push(n.method); if (n.method === "operation.started" && startedId === null) startedId = n.params?.operation_id ?? null; });
  const negotiation = await conn.initialize();
  // gate.run is not in OperationClient's declared registry on this SDK; use the raw request path the host uses.
  const t0 = Date.now();
  const pending = conn.request("gate.run", { root, require_complete: true });
  while (startedId === null && Date.now() - t0 < 15_000) await sleep(50);
  const startedAfterMs = Date.now() - t0;
  await sleep(1000);
  let receipt: { cancelIntent: string; cancelAcceptance: string; cancellationEstablished: boolean } | null = null; let cancelError: string | null = null;
  if (startedId !== null) { try { receipt = sdk.decodeCancelResponse(startedId, await conn.request("operation.cancel", { operation_id: startedId })); } catch (e) { cancelError = String(e); } }
  interface CancelTerminal { readonly status?: unknown; readonly terminal_fact?: unknown; readonly operation_id?: unknown; readonly forge_result?: { readonly envelope?: { readonly disposition?: unknown } | null; readonly data?: { readonly gate_verdict?: unknown } | null } | null }
  let terminal: CancelTerminal | null = null; let invokeError: string | null = null;
  try { terminal = await pending as CancelTerminal; } catch (e) { invokeError = String(e); }
  await conn.close();
  const classified = terminal !== null ? classifyGateResponse(terminal, basis, root) : null;
  report.steps.cancelRunningGate = {
    negotiation, startedId, startedAfterMs, notificationMethods: [...new Set(notifications)],
    receipt: receipt && { cancelIntent: receipt.cancelIntent, cancelAcceptance: receipt.cancelAcceptance, cancellationEstablished: receipt.cancellationEstablished },
    cancelError, invokeError,
    terminal: terminal && { status: terminal.status, terminal_fact: terminal.terminal_fact ?? null, operation_id: terminal.operation_id ?? null, disposition: terminal.forge_result?.envelope?.disposition ?? null, gate_verdict: terminal.forge_result?.data?.gate_verdict ?? null, keys: Object.keys(terminal), rawText: JSON.stringify(terminal).slice(0, 6000) },
    workflowReading: classified && { kind: classified.kind, reason: classified.reason, operationId: classified.operationId },
    treeCleanAfter: porcelain() === "",
  };
}
// 2. Lost dispatch acknowledgement: close the transport right after writing the request, before any started frame.
{
  const logsBefore = operationLogs();
  const conn = sdk.ServerConnection.spawn("forge");
  let sawStarted = false; conn.onNotification((n: { method: string }) => { if (n.method === "operation.started") sawStarted = true; });
  await conn.initialize();
  const pending = conn.request("gate.run", { root, require_complete: true });
  await sleep(50);
  await conn.close();
  let outcome: unknown = null; let error: { name: unknown; code: unknown; message: string } | null = null;
  try { outcome = await pending; } catch (e) { const err = e as { name?: unknown; code?: unknown; message?: unknown } | null; error = { name: err?.name ?? null, code: err?.code ?? null, message: String(err?.message ?? e).slice(0, 200) }; }
  await sleep(20_000); // let any native operation that was already admitted finish before counting
  report.steps.lostAcknowledgement = { sawStartedBeforeClose: sawStarted, requestResolved: outcome !== null, error, operationLogsBefore: logsBefore, operationLogsAfter: operationLogs(), treeCleanAfter: porcelain() === "" };
}
// 3. Recovery gate through the ordinary host path.
{
  const observation = await verifyExistingCandidate(root, "forge");
  report.steps.recovery = { kind: observation.kind, reason: observation.reason, operationId: observation.operationId, commit: observation.basis.commit, treeCleanAfter: porcelain() === "" };
}
console.log(JSON.stringify(report));
