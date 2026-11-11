// MechanicalWorkflows-4vw (WP-G): the local live composition root wires real HX scope and RF
// render provenance alongside agent and Forge, failing closed on partial coverage, missing
// evidence, ungrounded provenance and placeholder context. Injected executors exercise the
// WIRING through the real discoverTaskScope mapping; they are fixtures of the composition
// rules, not live HX/RF witnesses.
import test from "node:test";
import assert from "node:assert/strict";
import { composeLiveRoot, CompositionRefusal } from "../dist/live-composition.js";
import type { HxObservation } from "../dist/hx-scope.js";
import type { RfContext } from "../dist/rf-context.js";

const request = { workspaceId: "/repo", task: "wire the composition root", baseRevision: "rev-9" } as never;

const hxComplete = (): HxObservation => ({
  exitCode: 0,
  terminalReached: true,
  coverageSummary: { completeness: "complete", licensesAbsence: true, answerCount: 2 },
  scopeKind: "task",
  revision: "rev-9",
  queryDigest: "qd-1",
  frames: [
    { seq: 1, kind: "source", body: { locator: "a.ts" } },
    { seq: 2, kind: "answer", body: { ref: { "$int": 1 } } },
    { seq: 3, kind: "source", body: { locator: "b.ts" } },
    { seq: 4, kind: "answer", body: { ref: { "$int": 3 } } },
  ],
} as never);

const rfGood = (root: string, task: string, revision: string): RfContext => ({
  basis: { workspaceId: root, revision },
  text: `RF render for task: ${task}\nrevision ${revision}\nfiles: a.ts b.ts`,
  evidence: { system: "reactive-fiber", kind: "render", id: "rf-op-1" },
} as never);

test("the composed root maps a complete evidenced HX scope through the real discovery and grounds RF context", async () => {
  const root = composeLiveRoot({
    model: "m",
    hxExecute: async () => hxComplete(),
    renderContext: (async (r: string, t: string, rev: string) => rfGood(r, t, rev)) as never,
  });
  const scope = await root.discover(request);
  assert.equal(scope.coverage, "complete");
  assert.deepEqual([...scope.files], ["a.ts", "b.ts"]);
  assert.equal(scope.evidence?.system, "hyper-unix");
  assert.equal(scope.evidence?.id, "qd-1");
  const context = await root.compileContext(scope, request, "/repo", "rev-9");
  assert.ok(context.text.includes("wire the composition root") && context.text.includes("rev-9"));
});

test("negative: incomplete HX coverage fails closed through the real mapping, never degrades to a census", async () => {
  const partial = composeLiveRoot({ model: "m", hxExecute: async () => ({ ...hxComplete(), coverageSummary: { completeness: "incomplete", licensesAbsence: true, answerCount: 2 } } as never) });
  await assert.rejects(() => partial.discover(request), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_SCOPE_COVERAGE_NOT_COMPLETE");
  const transportRefusal = composeLiveRoot({ model: "m", hxExecute: async () => { throw new Error("HX_DOWN"); } });
  await assert.rejects(() => transportRefusal.discover(request), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_SCOPE_COVERAGE_NOT_COMPLETE");
});

test("negative: the evidence and empty-scope guards are provable through the injection seam", async () => {
  const noEvidence = composeLiveRoot({
    model: "m",
    discoverScope: (async () => ({ basis: { workspaceId: "/repo", revision: "rev-9" }, coverage: "complete", files: ["a.ts"], evidence: { system: "hyper-unix", kind: "task-query", id: "  " } })) as never,
  });
  await assert.rejects(() => noEvidence.discover(request), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_SCOPE_EVIDENCE_MISSING");
  const empty = composeLiveRoot({
    model: "m",
    discoverScope: (async () => ({ basis: { workspaceId: "/repo", revision: "rev-9" }, coverage: "complete", files: [], evidence: { system: "hyper-unix", kind: "task-query", id: "qd" } })) as never,
  });
  await assert.rejects(() => empty.discover(request), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_SCOPE_EMPTY");
});

test("negative: RF context requires an explicit model", async () => {
  const root = composeLiveRoot({ hxExecute: async () => hxComplete() });
  await assert.rejects(() => root.compileContext({ basis: { workspaceId: "/repo", revision: "rev-9" }, coverage: "complete", files: ["a.ts"] } as never, request, "/repo", "rev-9"), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_RF_MODEL_MISSING");
});

test("negative: without an injected renderer the root refuses: RF values never flow through it", async () => {
  const root = composeLiveRoot({ model: "m", hxExecute: async () => hxComplete() });
  await assert.rejects(() => root.compileContext({} as never, request, "/repo", "rev-9"), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_RF_RENDERER_MISSING");
});

test("negative: ungrounded RF provenance (wrong basis, foreign system, or text missing the task or revision) refuses", async () => {
  const cases: Array<(r: string, t: string, rev: string) => RfContext> = [
    (r, t, rev) => ({ ...rfGood(r, t, rev), basis: { workspaceId: "/other", revision: rev } } as never),
    (r, t, rev) => ({ ...rfGood(r, t, rev), evidence: { system: "mechanical-workflows", kind: "render", id: "x" } } as never),
    (r, t, rev) => ({ ...rfGood(r, t, rev), text: `render without the task words, revision ${rev}` } as never),
    (r, t, rev) => ({ ...rfGood(r, t, rev), text: `RF render for task: ${t} without the revision` } as never),
  ];
  for (const make of cases) {
    const root = composeLiveRoot({ model: "m", renderContext: (async (r: string, t: string, rev: string) => make(r, t, rev)) as never });
    await assert.rejects(() => root.compileContext({} as never, request, "/repo", "rev-9"), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_RF_PROVENANCE_UNGROUNDED");
  }
});

test("negative: a placeholder marker in the rendered context refuses", async () => {
  const root = composeLiveRoot({ model: "m", renderContext: (async (r: string, t: string, rev: string) => ({ ...rfGood(r, t, rev), text: `RF render for task: ${t}\nrevision ${rev}\nTODO fill in` } as never)) as never });
  await assert.rejects(() => root.compileContext({} as never, request, "/repo", "rev-9"), (e: unknown) => e instanceof CompositionRefusal && e.code === "COMPOSE_RF_PLACEHOLDER");
});
