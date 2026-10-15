import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const identityUrl = pathToFileURL(join(root, "src/workbench/identity.ts")).href;

/** Real node process loads the public module without a Vitest module transform. */
describe("Workbench identity shell/client contract", () => {
  it("pins an actual script, installed package manifest/lock and declared provider contract; rejects a stale client", () => {
    const directory = mkdtempSync(join(tmpdir(), "workbench-identity-shell-"));
    try {
      const script = join(directory, "workflow.js");
      writeFileSync(script, "export default () => 1;\n");
      const client = `
        import { captureInvocationIdentity, verifyInvocationIdentity } from ${JSON.stringify(identityUrl)};
        import { writeFileSync } from 'node:fs';
        const request = {
          definition: {kind:'script', id:'test-script', schemaVersion:'1'},
          scriptPath: ${JSON.stringify(script)}, packageRoot: ${JSON.stringify(root)},
          hostArtifacts: [${JSON.stringify(join(root, "src/workbench/identity.ts"))}],
          runtimeArtifacts: [${JSON.stringify(join(root, "node_modules/@forge/sdk/dist/index.js"))}],
          logicalInvocationId: 'one-shot',
          principal: {issuer:'test', subject:'operator'},
          workspace: {path:${JSON.stringify(directory)}, sourceBasis:'sha256:candidate-1'},
          hostAbi: {runtime:'node', version:process.versions.node, platform:process.platform, arch:process.arch, interfaceVersion:'workbench/v1'},
          effectiveConfig: {model:'pinned', features:{enabled:true}},
          providerDescriptors: [{id:'forge.gate.status',version:'1.0.0',contractSource:'@forge/sdk@0.1.0:gate.status',inputSchema:{type:'object'}}]
        };
        const pinned = captureInvocationIdentity(request);
        if (pinned.identity.definition.artifactDigest !== pinned.scriptDigest || !pinned.dependencyDigest || !pinned.identity.deploymentDigest) process.exit(3);
        verifyInvocationIdentity(pinned, request);
        writeFileSync(${JSON.stringify(script)}, 'export default () => 2;\\n');
        let rejected = false;
        try { verifyInvocationIdentity(pinned, request); } catch (e) { rejected = e.code === 'IDENTITY_CONFLICT'; }
        if (!rejected) process.exit(4);
        console.log(JSON.stringify({pinned:pinned.identity.logicalInvocationId, staleRejected:rejected}));
      `;
      const result = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", client], {
        cwd: directory, encoding: "utf8", timeout: 30000,
      });
      expect(result.status, result.stderr).toBe(0);
      expect(JSON.parse(result.stdout)).toEqual({ pinned: "one-shot", staleRejected: true });
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
