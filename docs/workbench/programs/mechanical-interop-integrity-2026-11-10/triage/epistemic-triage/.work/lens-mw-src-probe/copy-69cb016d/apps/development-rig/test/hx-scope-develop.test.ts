// MW-R5 EAT-R083 (+R089 L1 leg): a partial, unknown or revision-pinned-view-failed HX observation reaches develop() as needs_evidence before any writer runs.
// Test-only over the shipped adapter: composes discoverTaskScope with develop(); enables neither hx-task-scope-v1 nor wires discoverTaskScope into developLive.
import test from "node:test";
import assert from "node:assert/strict";
import { develop } from "@mechanical/workflows-development";
import type { Candidate, CompiledContext, DevelopmentServices, VerificationResult } from "@mechanical/workflows-development";
import { discoverTaskScope } from "../dist/hx-scope.js";
import type { HxExecute } from "../dist/hx-scope.js";
type Native = Awaited<ReturnType<HxExecute>>;
const request = { task: "Fix parser", workspaceId: "/repo", baseRevision: "a".repeat(40) };
const CANDIDATE_REVISION = "c".repeat(40);
function complete(): Native {
  return {
    exitCode: 0, terminalReached: true,
    coverageSummary: { completeness: "complete", licensesAbsence: true, answerCount: 1 },
    frames: [
      { kind: "answer", body: { ordinal: { $int: "1" }, ref: { $int: "1" } } },
      { kind: "answer-coverage", body: { completeness: "complete", count: { $int: "1" } } },
      { kind: "node-claim", seq: 1, body: { locator: "src/parser.ts" } },
    ],
    queryDigest: "sha256:" + "b".repeat(64), revision: request.baseRevision, scopeKind: "task",
  };
}
interface Counts { compile: number; implement: number; verify: number }
// Writer-side services are counting spies; discover is the real adapter over an injected native observation.
function compose(execute: HxExecute): { services: DevelopmentServices; calls: Counts } {
  const calls: Counts = { compile: 0, implement: 0, verify: 0 };
  const services: DevelopmentServices = {
    discover: (req) => discoverTaskScope(req, execute),
    async compileContext(scope): Promise<CompiledContext> { calls.compile++; return { basis: scope.basis, text: "Task: " + request.task }; },
    async implement(): Promise<Candidate> {
      calls.implement++;
      return { basis: { workspaceId: request.workspaceId, revision: CANDIDATE_REVISION }, parentBasis: { workspaceId: request.workspaceId, revision: request.baseRevision } };
    },
    async verify(candidate): Promise<VerificationResult> {
      calls.verify++;
      return { basis: candidate.basis, verdict: "passed", evidence: { system: "forge", kind: "gate", id: "cmd_fixture" } };
    },
  };
  return { services, calls };
}
const rows: ReadonlyArray<readonly [string, () => HxExecute]> = [
  ["exit-0 incomplete coverage with licensed absence", () => async () => ({ ...complete(), coverageSummary: { completeness: "incomplete", licensesAbsence: true, answerCount: 1 } })],
  // hx exit 4 is the provider-failure class; a revision-pinned Git view that cannot bind surfaces as an unknown, non-terminal answer at the requested revision.
  ["view-binding-pending: exit 4, not terminal, unknown completeness, request revision echoed", () => async () => ({ ...complete(), exitCode: 4, terminalReached: false, coverageSummary: { completeness: "unknown", licensesAbsence: false }, revision: request.baseRevision })],
  ["exit-0 non-terminal answer", () => async () => ({ ...complete(), terminalReached: false })],
  ["answer revision differs from the request revision", () => async () => ({ ...complete(), revision: "f".repeat(40) })],
  ["absence unlicensed", () => async () => ({ ...complete(), coverageSummary: { completeness: "complete", licensesAbsence: false, answerCount: 1 } })],
  ["filesystem scope kind", () => async () => ({ ...complete(), scopeKind: "filesystem" })],
  ["empty query digest", () => async () => ({ ...complete(), queryDigest: "" })],
  ["absent query digest", () => async () => ({ ...complete(), queryDigest: null })],
  ["executor throws", () => async () => { throw new Error("SDK_PROTOCOL_LIMIT"); }],
];
for (const [name, build] of rows) {
  test("develop() grades needs_evidence with zero writer calls: " + name, async () => {
    const { services, calls } = compose(build());
    const out = await develop(services, request);
    assert.equal(out.kind, "needs_evidence");
    assert.equal(out.kind === "needs_evidence" ? out.reason : "", "SCOPE_INCOMPLETE");
    assert.notEqual(out.kind === "needs_evidence" ? out.scope.coverage : "complete", "complete");
    assert.deepEqual(calls, { compile: 0, implement: 0, verify: 0 });
  });
}
test("negative control: the all-conjuncts-true observation reaches implement exactly once and verifies", async () => {
  const { services, calls } = compose(async () => complete());
  const out = await develop(services, request);
  assert.equal(out.kind, "verified_candidate");
  assert.deepEqual(calls, { compile: 1, implement: 1, verify: 1 });
});
