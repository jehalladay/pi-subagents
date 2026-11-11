import { verifyExistingCandidate } from "./live-gate.js";
import type { ConnectForge } from "./live-gate.js";

export async function verifyCli(args: readonly string[], connect?: ConnectForge): Promise<number> {
  let root: string | undefined;
  let forgeExecutable = "forge";
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (key !== "--workspace" && key !== "--forge-bin") {
      throw new Error("UNKNOWN_ARGUMENT: " + String(key));
    }
    const value = args[++i];
    if (!value || value.startsWith("--")) {
      throw new Error("INVALID_ARGUMENT: " + String(key) + " requires a value");
    }
    if (key === "--workspace") root = value;
    else forgeExecutable = value;
  }
  if (!root) throw new Error("MISSING_WORKSPACE: --workspace is required for live verification");
  const result = await verifyExistingCandidate(root, forgeExecutable, connect);
  process.stdout.write(JSON.stringify({
    mode: "live-forge", result,
  }) + "\n");
  return result.kind === "passed" ? 0 : result.kind === "failed" ? 1 : 3;
}
