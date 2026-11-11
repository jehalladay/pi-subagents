// Executed probes of mw-01 red counterexamples against the built rig dist at the pin copy.
// argv: <copy-root> <development-tarball> <scratch-dir>
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const [, , copyRoot, tarball, scratch] = process.argv;
const dist = name => pathToFileURL(join(copyRoot, "apps/development-rig/dist", name)).href;
const out = record => console.log(JSON.stringify(record));

// ---- D1 / MW-I01: classifier accepts a PASS frame with no gate_passed, no gate_definition, no execution_environment, no tree
{
  const { classifyGateResponse } = await import(dist("live-gate.js"));
  const { projectForgeVerification } = await import(dist("host-services.js"));
  const commit = "a".repeat(40), tree = "b".repeat(40);
  const basis = { commit, tree, clean: true };
  const frame = (data, envelope = {}) => ({ operation_id: "op-probe", status: "success", terminal_fact: "completed", delivery: { complete: true },
    forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: commit, ...envelope }, data: { gate_verdict: "PASS", ...data } } });
  const rows = {
    "legacy-pass-no-gate_passed-no-definition-no-environment-no-tree": frame({}),
    "explicit-gate_passed-false": frame({ gate_passed: false }),
    "gate_passed-true-definition-present-env-unpinned-no-tree": frame({ gate_passed: true, gate_definition: "sha256:" + "c".repeat(64), execution_environment: { kind: "host", pinned: false } }),
    "wrong-tree-statement": frame({ source_tree: "d".repeat(40) }),
  };
  const candidate = { basis: { workspaceId: "/w", revision: commit }, parentBasis: { workspaceId: "/w", revision: "e".repeat(40) } };
  const same = { admittedManifestSha256: "m", currentManifestSha256: "m" };
  for (const [label, raw] of Object.entries(rows)) {
    const o = classifyGateResponse(raw, basis, "/nonexistent-root");
    const projected = projectForgeVerification(o, candidate, same);
    out({ probe: "D1-classifier", label, kind: o.kind, reason: o.reason, binding: o.binding, hostServicesProjection: { verdict: projected.verdict, diagnostic: projected.diagnostic } });
  }
}

// ---- D2 / MW-I03: clean HEAD at base => not-occurred + retryPermitted, even after an ignored-file effect or an edit+revert
{
  const { reconcileUncertainEffect } = await import(dist("effect-reconciliation.js"));
  const repo = join(scratch, "d2-repo"); mkdirSync(repo, { recursive: true });
  const git = (...args) => execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", env: { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null", GIT_AUTHOR_NAME: "p", GIT_AUTHOR_EMAIL: "p@example.invalid", GIT_COMMITTER_NAME: "p", GIT_COMMITTER_EMAIL: "p@example.invalid" } }).trim();
  git("init", "-q"); writeFileSync(join(repo, ".gitignore"), "ignored-output/\n"); writeFileSync(join(repo, "main.ts"), "export const a = 1;\n"); git("add", "-A"); git("commit", "-q", "-m", "base");
  const base = git("rev-parse", "HEAD");
  const gitText = async (root, ...args) => { try { return execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }); } catch { return null; } };
  const record = { effect: "writer", worktree: repo, gitRef: { baseCommit: base }, forgeOperationId: null };
  out({ probe: "D2-reconcile", label: "pristine", ...(await reconcileUncertainEffect(record, { git: gitText })) });
  mkdirSync(join(repo, "ignored-output")); writeFileSync(join(repo, "ignored-output", "effect.bin"), "writer side effect in an ignored path\n");
  out({ probe: "D2-reconcile", label: "ignored-file-effect-present", ignoredFileExists: existsSync(join(repo, "ignored-output", "effect.bin")), ...(await reconcileUncertainEffect(record, { git: gitText })) });
  writeFileSync(join(repo, "main.ts"), "export const a = 2;\n"); writeFileSync(join(repo, "main.ts"), "export const a = 1;\n");
  out({ probe: "D2-reconcile", label: "tracked-edit-then-revert", ...(await reconcileUncertainEffect(record, { git: gitText })) });
  writeFileSync(join(repo, "untracked.txt"), "x\n");
  out({ probe: "D2-reconcile", label: "untracked-file-effect-present", ...(await reconcileUncertainEffect(record, { git: gitText })) });
  // gate branch: lookup says found:false for a NULL operation id with an arbitrary record id
  const gateRecord = { effect: "gate", worktree: repo, gitRef: { baseCommit: base }, forgeOperationId: null };
  out({ probe: "D2-reconcile", label: "gate-null-operation-id-lookup-found-false", ...(await reconcileUncertainEffect(gateRecord, { git: gitText, forgeOperation: async (id) => ({ found: false, id: "lookup-record-1", askedId: id }) })) });
}

// ---- D4 / MW-I05: installed JS mutated after extraction with the tarball bytes unchanged
{
  const host = await import(dist("host.js"));
  const digest = bytes => "sha256:" + createHash("sha256").update(bytes).digest("hex");
  const descriptorBytes = readFileSync(join(copyRoot, "contracts/entrypoints/development.v1.json"));
  const libraryBytes = readFileSync(tarball);
  const basis = { workspaceId: "repo-A", revision: "base-1" }, updated = { workspaceId: "repo-A", revision: "candidate-1" };
  const tmp = process.env.TMPDIR;
  let appended = 0;
  const marker = "\nglobalThis.__mwInstalledJsMutationRan = (globalThis.__mwInstalledJsMutationRan ?? 0) + 1;\n";
  const timer = setInterval(() => {
    try {
      for (const entry of readdirSync(tmp)) {
        if (!entry.startsWith("mw-installed-host-")) continue;
        const target = join(tmp, entry, "node_modules", "@mechanical", "workflows-development", "dist", "index.js");
        if (!existsSync(target)) continue;
        if (!readFileSync(target, "utf8").includes("__mwInstalledJsMutationRan")) { appendFileSync(target, marker); appended++; }
      }
    } catch {}
  }, 1);
  let result;
  try {
    const outcome = await host.invokeDevelopmentHost({ artifactPath: tarball, artifactDigest: digest(libraryBytes), descriptorBytes, descriptorDigest: digest(descriptorBytes),
      services: { discover: async () => ({ basis, coverage: "complete", files: ["a.ts"] }), compileContext: async () => ({ basis, text: "plain" }), implement: async () => ({ basis: updated, parentBasis: basis }), verify: async () => ({ basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-probe" } }) },
    }, { task: "probe", workspaceId: "repo-A", baseRevision: "base-1" });
    result = { admitted: true, outcome: outcome.kind };
  } catch (error) { result = { admitted: false, name: error?.name, code: error?.code ?? null, message: String(error?.message).slice(0, 200) }; }
  clearInterval(timer);
  out({ probe: "D4-installed-js-mutation", appendsLanded: appended, tarballDigestUnchanged: digest(readFileSync(tarball)) === digest(libraryBytes), mutatedCodeExecutions: globalThis.__mwInstalledJsMutationRan ?? 0, result });
}
