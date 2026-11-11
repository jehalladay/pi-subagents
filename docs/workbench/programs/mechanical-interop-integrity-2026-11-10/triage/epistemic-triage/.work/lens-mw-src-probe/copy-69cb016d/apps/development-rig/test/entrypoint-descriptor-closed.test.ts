import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { invokePinnedDevelopment } from "../dist/entrypoint-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";

/** PIWB-MW0-R002: the descriptor field set is closed and every schema-ref denial class has its own named negative. */
const committed = JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url), "utf8")) as EntrypointDescriptor;
const request = { task: "Closed descriptor", workspaceId: "repo-A", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: request.workspaceId, revision: request.baseRevision };
const updated: SubjectBasis = { workspaceId: request.workspaceId, revision: "candidate-1" };
const digest = (bytes: Buffer) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
function services(seen: string[] = []): DevelopmentServices {
  return {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete" as const, files: ["src/a.ts"] }; },
    compileContext: async () => { seen.push("context"); return { basis, text: "plain test" }; },
    implement: async () => { seen.push("implement"); return { basis: updated, parentBasis: basis }; },
    verify: async () => { seen.push("verify"); return { basis: updated, verdict: "passed" as const, evidence: { system: "forge", kind: "operation", id: "op-closed" } }; },
  };
}
function packLibrary(): string {
  const library = fileURLToPath(new URL("../../../packages/development", import.meta.url));
  const destination = mkdtempSync(join(tmpdir(), "mw-desclosed-pack-"));
  const packed = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: library, encoding: "utf8" });
  if (packed.status !== 0) throw new Error("LIBRARY_PACK_FAILED: " + packed.stderr);
  const [first] = JSON.parse(packed.stdout) as { filename: string }[];
  if (!first) throw new Error("LIBRARY_PACK_FAILED: npm pack reported nothing");
  return join(destination, first.filename);
}
const packedLibrary = packLibrary();
after(() => rmSync(dirname(packedLibrary), { recursive: true, force: true }));
const options = (descriptor: unknown, seen: string[] = []): Omit<PinnedHostOptions, "load"> => ({
  artifactPath: packedLibrary, artifactDigest: digest(readFileSync(packedLibrary)), descriptor: descriptor as EntrypointDescriptor,
  entrypointId: committed.id, contractVersion: committed.schema, services: services(seen),
});
const refs: [string, string][] = [
  ["parent traversal", "../x.json"], ["absolute path", "/abs/x.json"], ["https scheme", "https://example/x.json"],
  ["file scheme", "file:///x.json"], ["data scheme", "data:,x"], ["backslash", "a\\b.json"], ["NUL character", "x\u0000.json"],
  ["control character", "x\n.schema.json"], ["canonical-form name with no file under contracts/schemas", "absent-thing.v1.schema.json"],
];
const rows: [string, Record<string, unknown>][] = [["extra top-level key", { extra: "x" }], ["note holding a non-string", { note: { nested: true } }]];
for (const field of ["inputSchema", "outputSchema"] as const) {
  for (const [label, ref] of refs) rows.push([field + " " + label, { [field]: ref }]);
}

test("committed descriptor stays the only positive row: unmodified descriptor resolves in both hosts", async () => {
  let loads = 0;
  const pinned = await invokePinnedDevelopment({
    ...options(committed), load: async () => { loads++; return { develop: async () => ({ kind: "verified_candidate", candidate: { parentBasis: basis, basis: updated }, verification: { basis: updated, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-closed" } } }) }; },
  }, request);
  assert.equal(pinned.kind, "verified_candidate");
  assert.equal(loads, 1);
  const seen: string[] = [];
  assert.equal((await invokeInstalledDevelopment(options(committed, seen), request)).kind, "verified_candidate");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
});
test("each deviation row refuses ENTRYPOINT_CONTRACT_INVALID before load or any install step, in both hosts", async () => {
  for (const [label, patch] of rows) {
    const mutated = { ...committed, ...patch };
    let loads = 0;
    await assert.rejects(() => invokePinnedDevelopment({ ...options(mutated), load: async () => { loads++; return { develop: async () => ({}) }; } }, request), /^Error: ENTRYPOINT_CONTRACT_INVALID/, label);
    assert.equal(loads, 0, label + ": load() spy count 0");
    const seen: string[] = [];
    await assert.rejects(() => invokeInstalledDevelopment(options(mutated, seen), request), /^Error: ENTRYPOINT_CONTRACT_INVALID/, label);
    assert.deepEqual(seen, [], label + ": no callback or install ran");
  }
});
test("the committed note annotation stays a single permitted optional string; absence also resolves", async () => {
  const { note: _dropped, ...withoutNote } = committed as EntrypointDescriptor & { note?: string };
  const seen: string[] = [];
  assert.equal((await invokeInstalledDevelopment(options(withoutNote, seen), request)).kind, "verified_candidate");
});
