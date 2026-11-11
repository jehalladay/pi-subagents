// End-to-end probe: developLive (standalone producer) with an injected writer and an injected Forge connection that
// answers a "legacy" PASS frame: no data.gate_passed, no gate_definition, no execution_environment, no tree statement.
// argv: <copy-root> <scratch-dir>
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const [, , copyRoot, scratch] = process.argv;
const { developLive } = await import(pathToFileURL(join(copyRoot, "apps/development-rig/dist/live-development.js")).href);
const { fileEffectIntentStore, readEffectIntent } = await import(pathToFileURL(join(copyRoot, "apps/development-rig/dist/effect-intent.js")).href);
const env = { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null", GIT_AUTHOR_NAME: "p", GIT_AUTHOR_EMAIL: "p@example.invalid", GIT_COMMITTER_NAME: "p", GIT_COMMITTER_EMAIL: "p@example.invalid" };
function makeRepo(name) {
  const root = join(scratch, name); mkdirSync(root, { recursive: true });
  const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8", env }).trim();
  git("init", "-q");
  writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
  writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
  git("add", "."); git("commit", "-qm", "base");
  return { root, git };
}
async function run(label, frameOf, withIntent) {
  const { root, git } = makeRepo(label);
  const realRoot = execFileSync("realpath", [root], { encoding: "utf8" }).trim();
  const seen = [];
  const intentPath = join(scratch, label + ".intent.json");
  let result;
  try {
    const r = await developLive(root, "Change value", {
      agent: async () => { writeFileSync(join(realRoot, "main.ts"), "export const value = 2;\n"); git("add", "main.ts"); git("commit", "-qm", "implementation"); return { sessionId: "session-probe", summary: "changed", turns: 1, costUsd: 0 }; },
      connectForge: () => ({ async initialize() { return "compatible"; }, async request(method, params) { seen.push({ method, require_complete: params.require_complete }); return frameOf(git("rev-parse", "HEAD")); }, async close() {} }),
      ...(withIntent ? { effectIntent: fileEffectIntentStore(intentPath), hostIdentity: { workspaceRealpath: realRoot, taskSha256: "t".repeat(64), principal: "probe", sessionId: "s", piInvocationId: "inv", descriptorSha256: "d", tarballSha256: "a", contextProfile: "plain-v1", evidenceProfile: "git-census-v1", gateParameters: { require_complete: true } } } : {}),
    });
    result = { workflowKind: r.workflow.kind, verificationVerdict: r.workflow.verification?.verdict ?? null, evidence: r.workflow.verification?.evidence ?? null, forgeKind: r.forge?.kind, forgeReason: r.forge?.reason, forgeBinding: r.forge?.binding, mode: r.mode, discovery: r.discovery, context: r.context,
      effectIntent: r.effectIntent ? { disposition: r.effectIntent.disposition, settlement: r.effectIntent.settlement } : null };
  } catch (error) { result = { threw: error?.name, message: String(error?.message).slice(0, 300) }; }
  console.log(JSON.stringify({ probe: "legacy-pass-e2e", label, forgeRequests: seen, result }));
}
const legacy = commit => ({ operation_id: "op-legacy-" + commit.slice(0, 8), terminal_fact: "completed", status: "success",
  forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: commit }, data: { gate_verdict: "PASS" } } });
await run("legacy-frame-no-gate_passed-no-definition-no-environment-no-tree", legacy, false);
await run("legacy-frame-with-effect-intent-store", legacy, true);
