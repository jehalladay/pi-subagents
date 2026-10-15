import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { inspectWorkflowSource, type WorkflowSource } from "../src/workbench/designer.js";
import { type InvocationSnapshot, identityDigest } from "../src/workbench/identity.js";
import {
  PATCH_PROPOSAL_CONTRACT,
  PatchProposalError,
  proposeWorkflowPatch,
  recordPromotionDecision,
  type WorkflowPatchProposal,
} from "../src/workbench/patch-proposal.js";

const roots: string[] = [];
afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true });
});
function sha(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}
const HEADER = 'export const meta = { name: "sample", description: "description" };\n';
function baseSource(body: string): WorkflowSource {
  const cwd = mkdtempSync(join(tmpdir(), "patch-proposal-"));
  roots.push(cwd);
  const path = join(cwd, "script.js");
  writeFileSync(path, `${HEADER}${body}`);
  return inspectWorkflowSource({ scriptPath: path }, cwd);
}
function inMemory(body: string): WorkflowSource {
  const source = `${HEADER}${body}`;
  return { definition: { kind: "script", id: "mem.js", schemaVersion: "workflow-script/v1", artifactDigest: sha(source) }, sourceRef: "mem.js", source };
}
function snapshot(id: string, digest: string): InvocationSnapshot {
  const d = identityDigest("fixture", {});
  const definition = { kind: "script" as const, id: "mem.js", schemaVersion: "workflow-script/v1", artifactDigest: digest };
  return {
    identity: { logicalInvocationId: id, definition, deploymentDigest: d, subjectBasis: d },
    scriptDigest: digest,
    scriptSource: "pinned",
    dependencyDigest: d,
    hostImplementationDigest: d,
    hostArtifacts: [],
    runtimeArtifacts: [],
    runtimeArtifactDigest: d,
    configurationDigest: d,
    hostAbiDigest: d,
    providerContractDigest: d,
    dependencyArtifacts: [],
  };
}
function keysDeep(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) for (const item of value) keysDeep(item, out);
  else if (value && typeof value === "object") for (const [key, item] of Object.entries(value)) { out.add(key); keysDeep(item, out); }
  return out;
}
function deepFrozen(value: unknown): boolean {
  if (!value || typeof value !== "object") return true;
  if (!Object.isFrozen(value)) return false;
  return Object.values(value).every(deepFrozen);
}
const operator = { decision: "promoted" as const, principal: { id: "operator-1", role: "owner" }, at: "2026-10-15T10:00:00.000Z", reason: "reviewed diff" };

describe("W17-A pure digest-pinned workflow patch proposal", () => {
  it("validates the candidate bytes exactly as the designer does and mirrors its status", () => {
    const base = inMemory('await agent("p");\nreturn 1;');
    const ok = proposeWorkflowPatch({ base, candidateSource: `${HEADER}await agent("p2");\nreturn 1;`, rationale: "tighten" });
    expect(ok.contractVersion).toBe(PATCH_PROPOSAL_CONTRACT);
    expect(PATCH_PROPOSAL_CONTRACT).toBe("workbench.patch-proposal/v1");
    expect(ok.status).toBe("valid");
    expect(ok.validation.executed).toBe(false);
    expect(ok.validation.definition.artifactDigest).toBe(sha(`${HEADER}await agent("p2");\nreturn 1;`));
    expect(ok.status).toBe(ok.validation.status);

    const broken = proposeWorkflowPatch({ base, candidateSource: `${HEADER}const = ;`, rationale: "oops" });
    expect(broken.status).toBe("invalid");
    expect(broken.validation.syntax).toBe("invalid");
    expect(broken.validation.diagnostics.length).toBeGreaterThan(0);
  });

  it("carries the designer's grant and schema diagnostics for the candidate", () => {
    const registry = new CapabilityRegistry();
    registry.register({
      descriptor: { id: "forge.gate.status", version: "1.0.0", description: "fixture", effectClass: "read", inputSchema: { type: "object", properties: { root: { type: "string" } }, required: ["root"], additionalProperties: false }, permissions: ["forge:inspect"], supportedModes: ["invoke"] },
      invoke: async () => { throw Error("NEVER INVOKE"); },
    });
    const base = inMemory("return 1;");
    const candidate = `${HEADER}await node("forge.gate.status", {root:"."});`;
    const denied = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", registry, grants: ["discover:forge.gate.status"] });
    expect(denied.validation.diagnostics.some(item => item.code === "NODE_UNAUTHORIZED")).toBe(true);
    expect(denied.status).toBe(denied.validation.status);
    expect(denied.status).not.toBe("valid");
    const allowed = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", registry, grants: ["discover:forge.gate.status", "forge:inspect"] });
    expect(allowed.status).toBe("valid");
    const dynamic = proposeWorkflowPatch({ base, candidateSource: `${HEADER}await node("forge.gate.status", args);`, rationale: "r", registry, grants: ["discover:forge.gate.status", "forge:inspect"] });
    expect(dynamic.status).toBe("uncertain");
  });

  it("inherits oversize and control-character refusals as invalid, not thrown", () => {
    const base = inMemory("return 1;");
    const huge = proposeWorkflowPatch({ base, candidateSource: `${HEADER}//${"x".repeat(600_000)}\nreturn 1;`, rationale: "r" });
    expect(huge.status).toBe("invalid");
    expect(huge.validation.diagnostics.some(item => item.code === "SOURCE_TOO_LARGE")).toBe(true);
    const control = proposeWorkflowPatch({ base, candidateSource: `${HEADER}return 1;\u0001`, rationale: "r" });
    expect(control.validation.diagnostics.some(item => item.code === "SOURCE_CONTROL_CHARACTERS")).toBe(true);
    expect(() => proposeWorkflowPatch({ base, candidateSource: `${HEADER}${"//x\n".repeat(700_000)}`, rationale: "r" })).toThrowError(PatchProposalError);
  });

  it("never writes source or touches a fixture script and never exposes a path-taking API", () => {
    const base = baseSource('await agent("p");\nreturn 1;');
    const path = join(roots[0], "script.js");
    const before = { bytes: readFileSync(path, "utf8"), mtime: statSync(path).mtimeMs };
    const proposal = proposeWorkflowPatch({ base, candidateSource: `${HEADER}await agent("q");\nreturn 2;`, rationale: "r" });
    recordPromotionDecision(proposal, operator);
    expect(readFileSync(path, "utf8")).toBe(before.bytes);
    expect(statSync(path).mtimeMs).toBe(before.mtime);
    const moduleSource = readFileSync(new URL("../src/workbench/patch-proposal.ts", import.meta.url), "utf8");
    expect(moduleSource).not.toMatch(/node:fs|node:child_process|from "fs"|from "child_process"/);
    expect(moduleSource).not.toMatch(/writeFile|appendFile|renameSync|execSync|spawn/);
    expect(proposal.promotion).toEqual({ state: "proposed", requires: "operator", applied: false });
    expect(recordPromotionDecision(proposal, operator).appliedByWorkbench).toBe(false);
    for (const decision of ["rejected", "deferred"] as const) expect(recordPromotionDecision(proposal, { ...operator, decision }).appliedByWorkbench).toBe(false);
  });

  it("keeps pinned invocations on the base digest unchanged and counts unrelated ones", () => {
    const base = inMemory("return 1;");
    const candidate = `${HEADER}return 2;`;
    const digest = base.definition.artifactDigest;
    const pinned = [snapshot("inv-1", digest), snapshot("inv-2", digest), snapshot("inv-other", sha("something else"))];
    const frozenCopy = structuredClone(pinned);
    const proposal = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", pinnedInvocations: pinned });
    expect(pinned).toEqual(frozenCopy);
    expect(proposal.affectedPinnedInvocations).toEqual([
      { logicalInvocationId: "inv-1", scriptDigest: digest, action: "unchanged", note: "remains pinned to the base digest; the candidate requires a new logical invocation" },
      { logicalInvocationId: "inv-2", scriptDigest: digest, action: "unchanged", note: "remains pinned to the base digest; the candidate requires a new logical invocation" },
    ]);
    expect(proposal.unrelatedInvocations).toBe(1);
    for (const entry of proposal.affectedPinnedInvocations) expect(entry.scriptDigest).not.toBe(sha(candidate));
    expect(JSON.stringify(proposal.affectedPinnedInvocations)).not.toContain(sha(candidate));
    expect(proposal.promotion.applied).toBe(false);
  });

  it("pins the experiment to source digests and refuses a base that does not match its bytes first", () => {
    const base = inMemory("return 1;");
    const candidate = `${HEADER}return 2;`;
    const proposal = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r" });
    expect(proposal.experiment).toEqual({
      independentVariable: "source",
      referenceDigest: base.definition.artifactDigest,
      candidateDigest: sha(candidate),
      mustHold: ["inputDigest", "modelDigest", "toolsDigest", "environmentDigest", "cacheDigest"],
    });
    expect(proposal.base.definition.artifactDigest).toBe(base.definition.artifactDigest);
    expect(proposal.candidate.definition.artifactDigest).toBe(sha(candidate));
    expect(proposal.candidate.definition.id).toBe(base.definition.id);
    expect(proposal.candidate.definition.schemaVersion).toBe(base.definition.schemaVersion);

    const tampered: WorkflowSource = { ...base, source: `${base.source}\n//tampered` };
    // A candidate that would be refused for size proves validation never ran before the digest check.
    for (const candidateSource of [candidate, `${HEADER}${"//x\n".repeat(700_000)}`]) {
      try {
        proposeWorkflowPatch({ base: tampered, candidateSource, rationale: "r" });
        expect.unreachable();
      } catch (error) {
        expect(error).toBeInstanceOf(PatchProposalError);
        expect((error as PatchProposalError).code).toBe("SOURCE_DIGEST_MISMATCH");
      }
    }
  });

  it("emits a deterministic bounded line diff with correct numbering and summary", () => {
    const base = inMemory("const a = 1;\nconst b = 2;\nconst c = 3;\nreturn a + b + c;");
    const candidate = `${HEADER}const a = 1;\nconst b = 20;\nconst c = 3;\nconst d = 4;\nreturn a + b + c + d;`;
    const proposal = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r" });
    expect(proposal.diff.truncated).toBe(false);
    expect(proposal.diff.summary).toEqual({ added: 3, removed: 2, unchanged: 3 });
    const removes = proposal.diff.hunks.filter(hunk => hunk.op === "remove").map(hunk => [hunk.baseLine, hunk.text]);
    const adds = proposal.diff.hunks.filter(hunk => hunk.op === "add").map(hunk => [hunk.candidateLine, hunk.text]);
    expect(removes).toEqual([[3, "const b = 2;"], [5, "return a + b + c;"]]);
    expect(adds).toEqual([[3, "const b = 20;"], [5, "const d = 4;"], [6, "return a + b + c + d;"]]);
    const context = proposal.diff.hunks.find(hunk => hunk.op === "context");
    expect(context?.baseLine).toBeTypeOf("number");
    expect(context?.candidateLine).toBeTypeOf("number");
    const again = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r" });
    expect(again).toEqual(proposal);
  });

  it("reports identical bytes as no-change with zero hunks", () => {
    const base = inMemory("return 1;");
    const proposal = proposeWorkflowPatch({ base, candidateSource: base.source, rationale: "r" });
    expect(proposal.status).toBe("no-change");
    expect(proposal.diff.hunks).toEqual([]);
    expect(proposal.diff.truncated).toBe(false);
    expect(proposal.diff.summary.added).toBe(0);
    expect(proposal.diff.summary.removed).toBe(0);
    expect(() => recordPromotionDecision(proposal, operator)).toThrowError(PatchProposalError);
    try { recordPromotionDecision(proposal, operator); } catch (error) { expect((error as PatchProposalError).code).toBe("PROMOTION_PRECONDITION"); }
  });

  it("strips terminal escapes and bidi marks and redacts credentials in diff text", () => {
    const base = inMemory("return 1;");
    const candidate = `${HEADER}// \u001b[31mred\u001b[0m ‮evil Authorization: Bearer abc123\n// split Bear\u001b[0mer\nreturn 1;`;
    const proposal = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "tok Authorization: Bearer topsecret999" });
    const text = proposal.diff.hunks.map(hunk => hunk.text).join("\n");
    expect(text).not.toContain("\u001b");
    expect(text).not.toContain("‮");
    expect(text).not.toContain("abc123");
    expect(text).toContain("[REDACTED]");
    expect(JSON.stringify(proposal)).not.toContain("topsecret999");
    expect(JSON.stringify(proposal)).not.toMatch(/\u001b|‮/);
    const credentialSplit = proposeWorkflowPatch({ base, candidateSource: `${HEADER}// Bearer\u001b[0m zzz-secret-token\nreturn 1;`, rationale: "r" });
    expect(JSON.stringify(credentialSplit.diff)).not.toContain("zzz-secret-token");
  });

  it("truncates a large diff to maxDiffLines and maxPreviewBytes while counting the full diff", () => {
    const base = inMemory(Array.from({ length: 600 }, (_, index) => `const base${index} = ${index};`).join("\n"));
    const candidate = `${HEADER}${Array.from({ length: 600 }, (_, index) => `const cand${index} = ${index};`).join("\n")}`;
    const proposal = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", limits: { maxDiffLines: 400 } });
    expect(proposal.diff.truncated).toBe(true);
    expect(proposal.diff.hunks.length).toBe(400);
    expect(proposal.diff.summary).toEqual({ added: 600, removed: 600, unchanged: 1 });
    expect(Buffer.byteLength(JSON.stringify(proposal.diff.hunks), "utf8")).toBeLessThanOrEqual(65_536);
    const small = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", limits: { maxPreviewBytes: 2048 } });
    expect(small.diff.truncated).toBe(true);
    expect(Buffer.byteLength(JSON.stringify(small.diff.hunks), "utf8")).toBeLessThanOrEqual(2048);
    expect(small.diff.summary).toEqual(proposal.diff.summary);
    expect(small.diff.hunks.length).toBeGreaterThan(0);
    expect(() => proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", limits: { maxDiffLines: 0 } })).toThrowError(PatchProposalError);
  });

  it("issues a frozen operator-only receipt and gates promotion on a valid proposal", () => {
    const base = inMemory("return 1;");
    const proposal = proposeWorkflowPatch({ base, candidateSource: `${HEADER}return 2;`, rationale: "r" });
    const receipt = recordPromotionDecision(proposal, operator);
    expect(receipt).toEqual({
      contractVersion: PATCH_PROPOSAL_CONTRACT,
      proposalDigest: proposal.proposalDigest,
      decision: "promoted",
      principal: { id: "operator-1", role: "owner" },
      at: "2026-10-15T10:00:00.000Z",
      reason: "reviewed diff",
      appliesTo: "versioned-source",
      appliedByWorkbench: false,
      pinnedInvocationsChanged: 0,
    });
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(deepFrozen(receipt)).toBe(true);
    for (const body of [`${HEADER}const = ;`, base.source]) {
      const blocked = proposeWorkflowPatch({ base, candidateSource: body, rationale: "r" });
      expect(() => recordPromotionDecision(blocked, operator)).toThrowError(PatchProposalError);
      expect(recordPromotionDecision(blocked, { ...operator, decision: "rejected" }).decision).toBe("rejected");
    }
    const uncertain = proposeWorkflowPatch({ base, candidateSource: `${HEADER}const x = args.y; await agent(x);`, rationale: "r" });
    if (uncertain.status === "uncertain") {
      try { recordPromotionDecision(uncertain, operator); expect.unreachable(); } catch (error) { expect((error as PatchProposalError).code).toBe("PROMOTION_PRECONDITION"); }
    }
    expect(() => recordPromotionDecision(proposal, { ...operator, principal: { id: "" } })).toThrowError(PatchProposalError);
    expect(() => recordPromotionDecision(proposal, { ...operator, reason: "" })).toThrowError(PatchProposalError);
    expect(() => recordPromotionDecision(proposal, { ...operator, at: "not a date" })).toThrowError(PatchProposalError);
    const forged: WorkflowPatchProposal = { ...proposal, status: "valid", rationale: "forged" };
    expect(() => recordPromotionDecision(forged, operator)).toThrowError(PatchProposalError);
  });

  it("digests the proposal and reports ungrounded hypotheses without any causal claim", () => {
    const base = inMemory("await agent('a'); await agent('a'); return 1;");
    const candidate = `${HEADER}await agent('a'); return 1;`;
    const ungrounded = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", hypothesis: { metric: "elapsed", direction: "lower", groundedIn: [] } });
    expect(ungrounded.hypothesis).toEqual({ metric: "elapsed", direction: "lower", groundedIn: [], grounding: "ungrounded" });
    const grounded = proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r", hypothesis: { metric: "elapsed", direction: "lower", groundedIn: ["forge:operation:1"] } });
    expect(grounded.hypothesis?.grounding).toBe("grounded");
    expect(grounded.causalClaim).toBe(false);
    expect(ungrounded.causalClaim).toBe(false);
    const { proposalDigest, ...rest } = grounded;
    expect(proposalDigest).toBe(identityDigest("patch-proposal", rest));
    const keys = keysDeep(grounded);
    for (const forbidden of ["gain", "improvement", "speedup"]) expect(keys.has(forbidden)).toBe(false);
    expect(proposeWorkflowPatch({ base, candidateSource: candidate, rationale: "r" }).hypothesis).toBeUndefined();
  });

  it("is deterministic, JSON-lossless, deep-frozen plain data", () => {
    const base = inMemory("await agent('a');\nreturn 1;");
    const input = { base, candidateSource: `${HEADER}await agent('b');\nreturn 1;`, rationale: "r", pinnedInvocations: [snapshot("inv", base.definition.artifactDigest)] };
    const one = proposeWorkflowPatch(input);
    const two = proposeWorkflowPatch(input);
    expect(two).toEqual(one);
    expect(two.proposalDigest).toBe(one.proposalDigest);
    expect(JSON.parse(JSON.stringify(one))).toEqual(one);
    expect(Object.isFrozen(one)).toBe(true);
    expect(Object.isFrozen(one.diff.hunks)).toBe(true);
    expect(deepFrozen(one)).toBe(true);
    expect(Object.isFrozen(base)).toBe(false);
    expect(() => proposeWorkflowPatch({ base, candidateSource: 42 as unknown as string, rationale: "r" })).toThrowError(PatchProposalError);
    expect(() => proposeWorkflowPatch({ base, candidateSource: input.candidateSource, rationale: "" })).toThrowError(PatchProposalError);
  });
});
