/**
 * PIWB-MW1-R001 (bead 7zqla.3): installed-consumer conformance oracle.
 * Tier L1/L2 only (fixture services + the real npm-packed tarball host); this is not a native or live proof.
 * Every test drives invokeInstalledDevelopment as landed and asserts the callback sequence the host observed.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import type {
  Candidate, CompiledContext, DevelopmentServices, ScopeResult, SubjectBasis, VerificationResult,
} from "@mechanical/workflows-development";

type InstalledOptions = Omit<PinnedHostOptions, "load">;
type Step = "discover" | "context" | "implement" | "verify";

function packLibrary(): string {
  const library = fileURLToPath(new URL("../../../packages/development", import.meta.url));
  const destination = mkdtempSync(join(tmpdir(), "mw-pack-"));
  const packed = spawnSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", destination], { cwd: library, encoding: "utf8" });
  if (packed.status !== 0) throw new Error("LIBRARY_PACK_FAILED: " + packed.stderr);
  const [first] = JSON.parse(packed.stdout) as { filename: string }[];
  if (!first) throw new Error("LIBRARY_PACK_FAILED: npm pack reported nothing");
  return join(destination, first.filename);
}
const packedLibrary = packLibrary();
after(() => rmSync(dirname(packedLibrary), { recursive: true, force: true }));

const digest = (bytes: Buffer | string) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const descriptor = JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url), "utf8")) as EntrypointDescriptor;
const request = { task: "Conformance oracle run", workspaceId: "repo-A", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: request.workspaceId, revision: request.baseRevision };
const updated: SubjectBasis = { workspaceId: request.workspaceId, revision: "candidate-1" };
const foreign: SubjectBasis = { workspaceId: request.workspaceId, revision: "foreign-9" };
const evidence = { system: "forge", kind: "operation", id: "op-conformance" };

interface Script {
  scope?: Partial<ScopeResult>;
  context?: Partial<CompiledContext>;
  candidate?: Partial<Candidate>;
  verification?: Partial<VerificationResult>;
}
/** Fixture services that record each callback in order and never throw; `seen` is the host-observed sequence. */
function recorder(seen: Step[], script: Script = {}): DevelopmentServices {
  return {
    discover: async () => { seen.push("discover"); return { basis, coverage: "complete", files: ["src/a.ts"], ...script.scope }; },
    compileContext: async () => { seen.push("context"); return { basis, text: "plain test", ...script.context }; },
    implement: async () => { seen.push("implement"); return { basis: updated, parentBasis: basis, ...script.candidate }; },
    verify: async () => { seen.push("verify"); return { basis: updated, verdict: "passed", evidence, ...script.verification }; },
  };
}
async function run(script: Script): Promise<{ out: Awaited<ReturnType<typeof invokeInstalledDevelopment>>; seen: Step[] }> {
  const root = mkdtempSync(join(tmpdir(), "mw-conformance-"));
  try {
    const tarball = join(root, "mechanical-workflows-development-0.1.0.tgz");
    writeFileSync(tarball, readFileSync(packedLibrary));
    const seen: Step[] = [];
    const options: InstalledOptions = {
      artifactPath: tarball, artifactDigest: digest(readFileSync(tarball)), descriptor,
      entrypointId: descriptor.id, contractVersion: descriptor.schema, services: recorder(seen, script),
    };
    const out = await invokeInstalledDevelopment(options, request);
    return { out, seen };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("verified_candidate: a full eligible run sees discover, context, implement, verify exactly once each", async () => {
  const { out, seen } = await run({});
  assert.equal(out.kind, "verified_candidate");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
});

test("verification_failed arrives as a returned outcome, never a thrown transport failure, after all four callbacks", async () => {
  const { out, seen } = await run({ verification: { verdict: "failed" } });
  assert.equal(out.kind, "verification_failed");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
});

for (const coverage of ["partial", "unknown"] as const) {
  test(`needs_evidence: ${coverage} discovery coverage returns SCOPE_INCOMPLETE with implement and verify uninvoked, not a failed gate`, async () => {
    const { out, seen } = await run({ scope: { coverage } });
    assert.equal(out.kind, "needs_evidence");
    assert.equal(out.kind === "needs_evidence" ? out.reason : "", "SCOPE_INCOMPLETE");
    assert.notEqual(out.kind, "verification_failed");
    assert.deepEqual(seen, ["discover"]);
  });
}

test("indeterminate: DISCOVERY_BASIS_MISMATCH refuses before context, implement and verify run", async () => {
  const { out, seen } = await run({ scope: { basis: foreign } });
  assert.deepEqual(out.kind === "indeterminate" ? out.reason : out.kind, "DISCOVERY_BASIS_MISMATCH");
  assert.deepEqual(seen, ["discover"]);
});

test("indeterminate: CONTEXT_BASIS_MISMATCH refuses before implement and verify run", async () => {
  const { out, seen } = await run({ context: { basis: foreign } });
  assert.deepEqual(out.kind === "indeterminate" ? out.reason : out.kind, "CONTEXT_BASIS_MISMATCH");
  assert.deepEqual(seen, ["discover", "context"]);
});

test("indeterminate: CANDIDATE_BASIS_MISMATCH refuses before verify runs", async () => {
  const { out, seen } = await run({ candidate: { basis: basis } });
  assert.deepEqual(out.kind === "indeterminate" ? out.reason : out.kind, "CANDIDATE_BASIS_MISMATCH");
  assert.deepEqual(seen, ["discover", "context", "implement"]);
});

for (const [verdict, reason] of [["partial", "VERIFICATION_PARTIAL"], ["unknown", "VERIFICATION_UNKNOWN"]] as const) {
  test(`indeterminate: the ${verdict} verification verdict is preserved as ${reason}, never promoted to verified or failed`, async () => {
    const { out, seen } = await run({ verification: { verdict } });
    assert.deepEqual(out.kind === "indeterminate" ? out.reason : out.kind, reason);
    assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
  });
}
