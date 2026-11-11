import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
const [, , tarball, descriptorPath] = process.argv;
const digest = b => "sha256:" + createHash("sha256").update(b).digest("hex");
let result;
try {
  const host = await import("@mechanical/development-rig/host");
  const descriptorBytes = readFileSync(descriptorPath), libraryBytes = readFileSync(tarball);
  const basis = { workspaceId: "repo-A", revision: "base-1" }, updated = { workspaceId: "repo-A", revision: "candidate-1" };
  const outcome = await host.invokeDevelopmentHost({ artifactPath: tarball, artifactDigest: digest(libraryBytes), descriptorBytes, descriptorDigest: digest(descriptorBytes),
    services: { discover: async () => ({ basis, coverage: "complete", files: ["a.ts"] }), compileContext: async () => ({ basis, text: "plain" }), implement: async () => ({ basis: updated, parentBasis: basis }), verify: async () => ({ basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-probe" } }) } },
    { task: "probe", workspaceId: "repo-A", baseRevision: "base-1" });
  result = { admitted: true, outcome: outcome.kind };
} catch (e) { result = { admitted: false, name: e?.name, code: e?.code ?? null, message: String(e?.message).slice(0, 200) }; }
console.log(JSON.stringify({ probe: "host-under-out-of-range-node", node: process.version, enginesDeclared: JSON.parse(readFileSync("node_modules/@mechanical/development-rig/package.json", "utf8")).engines, result }));
