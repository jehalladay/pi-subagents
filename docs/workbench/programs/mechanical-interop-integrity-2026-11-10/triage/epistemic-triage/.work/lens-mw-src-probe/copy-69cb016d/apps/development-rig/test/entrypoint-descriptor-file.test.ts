import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { invokePinnedDevelopment } from "../dist/entrypoint-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";

/** PIWB-MW0-R001: the committed descriptor of record is consumed from disk, never from a handwritten copy. */
const descriptorUrl = new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url);
const committed = JSON.parse(readFileSync(descriptorUrl, "utf8")) as EntrypointDescriptor;
const request = { task: "File-driven descriptor", workspaceId: "repo-A", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: request.workspaceId, revision: request.baseRevision };
const updated: SubjectBasis = { workspaceId: request.workspaceId, revision: "candidate-1" };
const digest = (bytes: Buffer) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
function services(seen: string[] = []): DevelopmentServices {
  return {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete" as const, files: ["src/a.ts"] }; },
    compileContext: async () => { seen.push("context"); return { basis, text: "plain test" }; },
    implement: async () => { seen.push("implement"); return { basis: updated, parentBasis: basis }; },
    verify: async () => { seen.push("verify"); return { basis: updated, verdict: "passed" as const, evidence: { system: "forge", kind: "operation", id: "op-file-driven" } }; },
  };
}
/** Pack the committed library at test time; the tarball is the real npm artifact, not a stub. */
function packLibrary(): string {
  const library = fileURLToPath(new URL("../../../packages/development", import.meta.url));
  const destination = mkdtempSync(join(tmpdir(), "mw-descfile-pack-"));
  const packed = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: library, encoding: "utf8" });
  if (packed.status !== 0) throw new Error("LIBRARY_PACK_FAILED: " + packed.stderr);
  const [first] = JSON.parse(packed.stdout) as { filename: string }[];
  if (!first) throw new Error("LIBRARY_PACK_FAILED: npm pack reported nothing");
  return join(destination, first.filename);
}
const packedLibrary = packLibrary();
after(() => rmSync(dirname(packedLibrary), { recursive: true, force: true }));
const options = (descriptor: EntrypointDescriptor, seen: string[] = []): Omit<PinnedHostOptions, "load"> => ({
  artifactPath: packedLibrary, artifactDigest: digest(readFileSync(packedLibrary)), descriptor,
  entrypointId: committed.id, contractVersion: committed.schema, services: services(seen),
});

test("committed descriptor names schema files that exist beside it with one canonical grammar", () => {
  for (const ref of [committed.inputSchema, committed.outputSchema]) {
    assert.match(ref, /^[a-z0-9.-]+\.schema\.json$/, "schema ref must be a bare filename, no directory segment");
    assert.doesNotThrow(() => readFileSync(new URL("../../../contracts/schemas/" + ref, import.meta.url)));
  }
});
test("invokeInstalledDevelopment accepts the committed descriptor over the real npm-packed tarball", async () => {
  const seen: string[] = [];
  const out = await invokeInstalledDevelopment(options(committed, seen), request);
  assert.equal(out.kind, "verified_candidate");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
});
test("invokePinnedDevelopment accepts the committed descriptor and loads exactly once", async () => {
  let loads = 0;
  const out = await invokePinnedDevelopment({
    ...options(committed), load: async () => { loads++; return { develop: async () => ({ kind: "verified_candidate", candidate: { parentBasis: basis, basis: updated }, verification: { basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-file-driven" } } }) }; },
  }, request);
  assert.equal(out.kind, "verified_candidate");
  assert.equal(loads, 1);
});
test("mutated schema filename or path in the committed descriptor refuses before install or callback", async () => {
  const mutations: [string, Partial<EntrypointDescriptor>][] = [
    ["different filename", { inputSchema: "development-request.v2.schema.json" }],
    ["different directory segment", { inputSchema: "other/" + committed.inputSchema }],
    ["parent traversal", { inputSchema: "../schemas/" + committed.inputSchema }],
    ["output different filename", { outputSchema: "development-outcome.v2.schema.json" }],
    ["output parent traversal", { outputSchema: "../schemas/" + committed.outputSchema }],
  ];
  for (const [label, patch] of mutations) {
    const seen: string[] = [];
    await assert.rejects(() => invokeInstalledDevelopment(options({ ...committed, ...patch }, seen), request), /^Error: ENTRYPOINT_CONTRACT_INVALID/, label);
    assert.deepEqual(seen, [], label + ": no callback ran");
    let loads = 0;
    await assert.rejects(() => invokePinnedDevelopment({ ...options({ ...committed, ...patch }), load: async () => { loads++; return { develop: async () => ({}) }; } }, request), /^Error: ENTRYPOINT_CONTRACT_INVALID/, label);
    assert.equal(loads, 0, label + ": load() never called");
  }
});
