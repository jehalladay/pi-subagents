import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Candidate, CompiledContext, DevelopmentRequest, DevelopmentServices, ScopeResult, VerificationResult } from "@mechanical/workflows-development";
import {
  HOST_SERVICE_NAMES, HostServicesError, createDevelopmentServices, describeProducerReceipt, developThroughHost, projectForgeVerification,
} from "../dist/host-services.js";
import type { GateObservation } from "../dist/live-gate.js";

/** EAT-R008..R011: the bundle is consumed from the producer build (../dist). */
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const REQUEST: DevelopmentRequest = { task: "Add a test", workspaceId: "/work/repo", baseRevision: "1".repeat(40) };
const BASE = { workspaceId: REQUEST.workspaceId, revision: REQUEST.baseRevision };
const CAND = { workspaceId: REQUEST.workspaceId, revision: "2".repeat(40) };
const ref = { system: "forge", kind: "operation", id: "op-1" };

interface Spies { readonly calls: string[]; readonly services: DevelopmentServices }
function spies(overrides: Partial<{ scope: ScopeResult; candidate: Candidate; verification: VerificationResult }> = {}): Spies {
  const calls: string[] = [];
  const scope: ScopeResult = overrides.scope ?? { basis: BASE, coverage: "complete", files: ["a.ts"] };
  const candidate: Candidate = overrides.candidate ?? { basis: CAND, parentBasis: BASE, evidence: { system: "claude-agent-sdk", kind: "session", id: "s-1" } };
  const verification: VerificationResult = overrides.verification ?? { basis: candidate.basis, verdict: "passed", evidence: ref };
  return {
    calls,
    services: {
      discover: async () => { calls.push("discover"); return scope; },
      compileContext: async () => { calls.push("compileContext"); return { basis: BASE, text: "ctx" } satisfies CompiledContext; },
      implement: async () => { calls.push("implement"); return candidate; },
      verify: async () => { calls.push("verify"); return verification; },
    },
  };
}

// EAT-R008
test("the four services run in order exactly once on the happy path and the outcome is verified_candidate", async () => {
  const s = spies();
  const outcome = await developThroughHost(s.services, REQUEST);
  assert.deepEqual(s.calls, ["discover", "compileContext", "implement", "verify"]);
  assert.equal(outcome.kind, "verified_candidate");
});

test("the bundle has exactly the four members and refuses an unbound or an extra member", () => {
  const s = spies();
  const bundle = createDevelopmentServices(s.services, REQUEST);
  assert.deepEqual(Object.keys(bundle).sort(), [...HOST_SERVICE_NAMES].sort());
  assert.equal(Object.isFrozen(bundle), true);
  const missing = { ...s.services } as Record<string, unknown>;
  delete missing["verify"];
  assert.throws(() => createDevelopmentServices(missing as unknown as DevelopmentServices, REQUEST), (e: unknown) => e instanceof HostServicesError && e.code === "HOST_SERVICE_UNBOUND");
  const extra = { ...s.services, publish: async () => 0 } as unknown as DevelopmentServices;
  assert.throws(() => createDevelopmentServices(extra, REQUEST), (e: unknown) => e instanceof HostServicesError && e.code === "HOST_SERVICE_EXTRA_MEMBER");
});

test("a descriptor naming a different callback id cannot change which closure runs (sentinel)", async () => {
  const s = spies();
  let descriptorReads = 0;
  const hostile = { get callbacks() { descriptorReads += 1; return { verify: "discover", discover: "verify" }; } };
  const bundle = (createDevelopmentServices as (...args: unknown[]) => DevelopmentServices)(s.services, REQUEST, hostile);
  // mutate the original container after construction: the captured closures are fixed
  (s.services as unknown as Record<string, unknown>)["discover"] = async () => { s.calls.push("EVIL"); return { basis: BASE, coverage: "complete", files: [] }; };
  (s.services as unknown as Record<string, unknown>)["verify"] = async () => { s.calls.push("EVIL"); return { basis: CAND, verdict: "passed", evidence: ref }; };
  await bundle.discover(REQUEST);
  await bundle.verify({ basis: CAND, parentBasis: BASE }, REQUEST);
  assert.deepEqual(s.calls, ["discover", "verify"]);
  assert.equal(descriptorReads, 0);
});

test("a call for a different request refuses before any closure starts", async () => {
  const s = spies();
  const bundle = createDevelopmentServices(s.services, REQUEST);
  await assert.rejects(bundle.discover({ ...REQUEST, baseRevision: "3".repeat(40) }), (e: unknown) => e instanceof HostServicesError && e.code === "HOST_REQUEST_MISMATCH");
  await assert.rejects(bundle.compileContext({ basis: BASE, coverage: "complete", files: [] }, { ...REQUEST, task: "other" }), HostServicesError);
  assert.deepEqual(s.calls, []);
});

test("packages/development/src imports no provider SDK or Pi module (grep guard)", () => {
  const dir = join(repoRoot, "packages/development/src");
  const offenders: string[] = [];
  for (const name of readdirSync(dir).filter(n => n.endsWith(".ts"))) {
    const text = readFileSync(join(dir, name), "utf8");
    for (const m of text.matchAll(/(?:from\s+|import\s*\(\s*|require\s*\(\s*)["']([^"']+)["']/g)) {
      if (/@anthropic-ai|@forge\/|claude-agent-sdk|@earendil|pi-coding|@mariozechner|\bpi-/.test(m[1] ?? "")) offenders.push(name + ":" + m[1]);
    }
  }
  assert.deepEqual(offenders, []);
});

// EAT-R009
test("partial discovery returns needs_evidence before any writer or verifier runs", async () => {
  const s = spies({ scope: { basis: BASE, coverage: "partial", files: [] } });
  const outcome = await developThroughHost(s.services, REQUEST);
  assert.equal(outcome.kind, "needs_evidence");
  assert.deepEqual(s.calls, ["discover"]);
});

test("a candidate equal to the base is never verified_candidate and records no Forge verification", async () => {
  const s = spies({ candidate: { basis: BASE, parentBasis: BASE } });
  const outcome = await developThroughHost(s.services, REQUEST);
  assert.equal(outcome.kind, "indeterminate");
  assert.equal(outcome.kind === "indeterminate" && outcome.reason, "CANDIDATE_BASIS_MISMATCH");
  assert.equal(s.calls.includes("verify"), false);
});

test("a passed verification with a blank evidence id is indeterminate", async () => {
  const s = spies({ verification: { basis: CAND, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "  " } } });
  const outcome = await developThroughHost(s.services, REQUEST);
  assert.equal(outcome.kind, "indeterminate");
  assert.equal(outcome.kind === "indeterminate" && outcome.reason, "VERIFICATION_EVIDENCE_MISSING");
});

test("four-arm witness: each domain outcome is produced and returned unchanged", async () => {
  const verified = await developThroughHost(spies().services, REQUEST);
  const failed = await developThroughHost(spies({ verification: { basis: CAND, verdict: "failed", evidence: ref } }).services, REQUEST);
  const needs = await developThroughHost(spies({ scope: { basis: BASE, coverage: "unknown", files: [] } }).services, REQUEST);
  const indeterminate = await developThroughHost(spies({ verification: { basis: CAND, verdict: "unknown" } }).services, REQUEST);
  assert.deepEqual([verified.kind, failed.kind, needs.kind, indeterminate.kind].sort(), ["indeterminate", "needs_evidence", "verification_failed", "verified_candidate"]);
  const s = spies();
  const outcome = await developThroughHost(s.services, REQUEST);
  assert.equal(outcome.kind === "verified_candidate" && outcome.verification.evidence, (await s.services.verify(undefined as never, REQUEST)).evidence);
});

// EAT-R011
const SHA_A = "a".repeat(64);
const SHA_B = "b".repeat(64);
const observation = (patch: Partial<GateObservation> = {}): GateObservation => ({
  kind: "passed", reason: "FORGE_GATE_PASS", basis: { commit: CAND.revision, tree: "4".repeat(40), clean: true }, operationId: "op-9", native: {},
  binding: { commit: "native", gateDefinition: "native", environment: "established" }, ...patch,
});
const candidate: Candidate = { basis: CAND, parentBasis: BASE };
const same = { admittedManifestSha256: SHA_A, currentManifestSha256: SHA_A };

test("a native pass for exactly the candidate projects passed and retains the operation id", () => {
  const v = projectForgeVerification(observation(), candidate, same);
  assert.equal(v.verdict, "passed");
  assert.deepEqual(v.evidence, { system: "forge", kind: "operation", id: "op-9" });
});

test("an envelope for a different commit projects unknown and retains the envelope's ids", () => {
  const v = projectForgeVerification(observation({ basis: { commit: "9".repeat(40), tree: "4".repeat(40), clean: true } }), candidate, same);
  assert.equal(v.verdict, "unknown");
  assert.equal(v.diagnostic, "VERIFICATION_SUBJECT_CHANGED");
  assert.equal(v.evidence?.id, "op-9");
});

test("partial, unknown and transport-only observations never project passed (mutant: coerce partial to passed turns red)", () => {
  for (const reason of ["FORGE_GATE_NOT_ESTABLISHED", "FORGE_RESULT_STATUS_INCONSISTENT", "FORGE_DISPATCH_OUTCOME_UNKNOWN", "FORGE_RESPONSE_DELIVERY_INCOMPLETE"]) {
    const v = projectForgeVerification(observation({ kind: "indeterminate", reason }), candidate, same);
    assert.equal(v.verdict, "unknown", reason);
    assert.equal(v.diagnostic, reason);
  }
  // the mutant: a projection that coerces indeterminate into passed would differ from the real one on this input
  const mutant = (o: GateObservation) => (o.kind === "failed" ? "failed" : "passed");
  assert.notEqual(mutant(observation({ kind: "indeterminate" })), projectForgeVerification(observation({ kind: "indeterminate" }), candidate, same).verdict);
});

test("a pass without a native gate_definition is not PASS-shaped", () => {
  const v = projectForgeVerification(observation({ binding: { commit: "native", gateDefinition: "descriptor", environment: "descriptor" } }), candidate, same);
  assert.equal(v.verdict, "unknown");
  assert.equal(v.diagnostic, "FORGE_GATE_DEFINITION_MISSING");
});

test("a changed forge.toml hash between admission and gate refuses even a pass or a fail", () => {
  for (const kind of ["passed", "failed"] as const) {
    const v = projectForgeVerification(observation({ kind }), candidate, { admittedManifestSha256: SHA_A, currentManifestSha256: SHA_B });
    assert.equal(v.verdict, "unknown");
    assert.equal(v.diagnostic, "GATE_DEFINITION_CHANGED");
  }
});

test("a measured red for the right subject stays failed", () => {
  const v = projectForgeVerification(observation({ kind: "failed", reason: "FORGE_GATE_FAIL" }), candidate, same);
  assert.equal(v.verdict, "failed");
});

// EAT-R010 receipt facts (the real-SDK/real-Forge journey is NOT RUN here)
test("producer ids appear only when answered, otherwise uncertain, never fabricated", () => {
  const up = { sdkCredentials: true, forgeExecutable: true };
  assert.deepEqual(describeProducerReceipt({ claudeSessionId: "s-1", forgeOperationId: "op-1" }, up), { status: "recorded", claude_session_id: "s-1", forge_operation_id: "op-1", blockedBy: [] });
  const half = describeProducerReceipt({ claudeSessionId: "s-1", forgeOperationId: null }, up);
  assert.equal(half.forge_operation_id, "uncertain");
  assert.equal(describeProducerReceipt({ claudeSessionId: "  ", forgeOperationId: "" }, up).claude_session_id, "uncertain");
});

test("absent credentials or Forge executable record blocked with null ids and no PASS", () => {
  const r = describeProducerReceipt({ claudeSessionId: "s-1", forgeOperationId: "op-1" }, { sdkCredentials: false, forgeExecutable: true });
  assert.equal(r.status, "blocked");
  assert.deepEqual(r.blockedBy, ["claude-sdk-credentials"]);
  assert.equal(r.claude_session_id, null);
  assert.equal(r.forge_operation_id, null);
  assert.deepEqual(describeProducerReceipt({ claudeSessionId: null, forgeOperationId: null }, { sdkCredentials: false, forgeExecutable: false }).blockedBy, ["claude-sdk-credentials", "forge-executable"]);
});
