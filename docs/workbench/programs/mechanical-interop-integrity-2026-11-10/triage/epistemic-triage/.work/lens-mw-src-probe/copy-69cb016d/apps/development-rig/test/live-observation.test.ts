import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  makeObservation, labelObservation, replayObservation, observeForgeGate, observeBeads, observeFurnace, observeHx,
  runAuthorizedGateFlow, liveEvent, liveFlowPreconditions, liveFlowUnknownRecord,
} from "../dist/live-observation.js";
import { verifyExistingCandidate } from "../dist/live-gate.js";

const COMMIT = "a".repeat(40);
const TREE = "b".repeat(40);
const basis = { workspaceId: "ws", revision: "rev-1" };
const budget = { compute: 10, workers: 2, queue: 2, latencyMs: 1000 };
const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 10 };
function intent(over: Record<string, unknown> = {}) {
  return {
    intentId: "gate-1", policyId: "p", target: { kind: "forge-gate", uri: "/scratch/candidate" }, expectedRevision: "rev-1",
    effect: "gate.run", claim, evidenceRefs: [], writeScopes: ["gate:candidate"], readScopes: [], ...over,
  };
}
const gateBasis = { commit: COMMIT, tree: TREE, clean: true as const };
function gateObs(over: Record<string, unknown> = {}) {
  return { kind: "passed", reason: "FORGE_GATE_PASS", basis: gateBasis, operationId: "op-77", native: { operation_id: "op-77", ids: { command_id: "cmd_1" } }, ...over };
}
// Shapes copied from records a real `forge build` wrote (forge 0.2.1 rev 0deb972720ce): .forge/logs/operations/<op>.json and one .forge/logs/commands.jsonl row.
const opLog = (over: Record<string, unknown> = {}) => ({
  schema: "forge/operation-log/1", operation_id: "op-77", command: "build", task: "build", complete: true, capture_mode: "captured",
  created_at: "2026-10-16T15:36:52.411325+00:00", closed_at: "2026-10-16T15:37:13.591527+00:00", path: ".forge/logs/operations/op-77.log", ...over,
});
const cmdRow = (over: Record<string, unknown> = {}) => ({
  timestamp: "2026-10-16T15:37:13.635462+00:00", command: "build", status: "success", command_id: "cmd_1", trace_id: "trace_1",
  disposition: "SUCCEEDED", gate_verdict: "PASS", gated_commit: COMMIT, gated_tree: TREE, ...over,
});
const expectation = { operationId: "op-77", commandId: "cmd_1" };
const native = (over: { operation?: Record<string, unknown>; command?: Record<string, unknown> } = {}) =>
  async () => ({ operation: opLog(over.operation), command: cmdRow(over.command) });
const seen = (over: Parameters<typeof native>[0] = {}) => (root: string, expect: typeof expectation) => observeForgeGate(root, expect, native(over));
const bdShow = (over: Record<string, unknown> = {}) => JSON.stringify([{ id: "MW-1", status: "in_progress", assignee: "camshaft-oe", updated_at: "2026-10-16T00:00:00Z", dependencies: [{ id: "MW-0" }, "MW-9"], ...over }]);

test("a fixture or replay observation can never be labelled live; the closed enum refuses live-verified", () => {
  const fixture = makeObservation({ mode: "fixture", system: "forge", outcome: "observed", value: "x", receipt: null });
  const replayed = replayObservation({ system: "forge", value: "x", receipt: { system: "forge", ids: { operationId: "op-1" }, raw: {} } });
  assert.equal(replayed.mode, "replay");
  assert.throws(() => labelObservation(fixture, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelObservation(replayed, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelObservation(replayed, "live-verified"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelObservation(replayed, "fixture").mode, "fixture");
  const unknown = makeObservation({ mode: "unknown", system: "forge", outcome: "unknown", reason: "R_X", receipt: null });
  assert.throws(() => labelObservation(unknown, "fixture"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
});

test("labelObservation reads its closed mode enum by own key: Object.prototype names are not labels and cannot launder a source into live", () => {
  const replayed = replayObservation({ system: "forge", value: "x", receipt: { system: "forge", ids: { operationId: "op-1" }, raw: {} } });
  const fixture = makeObservation({ mode: "fixture", system: "forge", outcome: "observed", value: "x", receipt: { system: "forge", ids: { operationId: "op-2" }, raw: {} } });
  for (const key of ["constructor", "toString", "__proto__", "hasOwnProperty", "valueOf"]) {
    assert.throws(() => labelObservation(replayed, key), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `replay relabelled to ${key}`);
    assert.throws(() => labelObservation(fixture, key), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `fixture relabelled to ${key}`);
  }
  // A source whose mode is a prototype key (built past the type with a cast) ranks nowhere, so it cannot be relabelled to live.
  for (const key of ["constructor", "toString", "__proto__"]) {
    const poisoned = makeObservation({ mode: key as never, system: "forge", outcome: "observed", value: "x", receipt: { system: "forge", ids: { operationId: "op-3" }, raw: {} } });
    assert.throws(() => labelObservation(poisoned, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `${key}-labelled source relabelled to live`);
  }
});

test("labelObservation refuses unknown as a target and keeping the same label is allowed", () => {
  const fixture = makeObservation({ mode: "fixture", system: "forge", outcome: "observed", value: "x", receipt: null });
  assert.throws(() => labelObservation(fixture, "unknown"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  const replayed = replayObservation({ system: "forge", value: "x", receipt: { system: "forge", ids: { operationId: "op-1" }, raw: {} } });
  assert.equal(labelObservation(replayed, "replay").mode, "replay");
  const live = makeObservation({ mode: "live", system: "forge", outcome: "observed", value: "x", receipt: { system: "forge", ids: { operationId: "op-4" }, raw: {} } });
  assert.equal(labelObservation(live, "live").mode, "live");
});

test("a live label without a retained native id is rejected at construction", () => {
  const base = { mode: "live" as const, system: "forge" as const, outcome: "observed" as const, value: 1 };
  assert.throws(() => makeObservation({ ...base, receipt: null }), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  assert.throws(() => makeObservation({ ...base, receipt: { system: "forge", ids: {}, raw: {} } }), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  assert.throws(() => makeObservation({ ...base, receipt: { system: "forge", ids: { operationId: "  " }, raw: {} } }), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  assert.throws(() => makeObservation({ mode: "live", system: "forge", outcome: "unknown", reason: "R", receipt: { system: "forge", ids: { operationId: "op-1" }, raw: {} } }), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  const ok = makeObservation({ ...base, receipt: { system: "forge", ids: { operationId: "op-1" }, raw: { a: 1 } } });
  assert.equal(ok.mode, "live");
  assert.match(ok.receipt!.rawDigest, /^sha256:[0-9a-f]{64}$/);
  assert.throws(() => labelObservation(ok, "live-verified"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
});

test("a gate-run intent against a stale basis produces no effect and INTENT_BASIS_STALE", async () => {
  let verified = 0;
  const out = await runAuthorizedGateFlow({
    intent: intent({ expectedRevision: "rev-0" }), basis, budget, protectedScopes: [], root: "/scratch/candidate",
    verify: async () => { verified++; return gateObs() as never; }, observe: async () => { throw new Error("must not observe"); },
  });
  assert.equal(out.effect, "none");
  assert.equal(out.code, "INTENT_BASIS_STALE");
  assert.equal(verified, 0);
  assert.equal(out.command, null);
  assert.equal(out.observation.outcome, "unknown");
  assert.equal(out.observation.mode, "unknown");
  assert.deepEqual(out.events, []);
});

test("a protected scope and an unsupported effect produce no effect", async () => {
  let verified = 0;
  const deps = { verify: async () => { verified++; return gateObs() as never; }, observe: async () => ({}) as never };
  const guarded = await runAuthorizedGateFlow({ intent: intent(), basis, budget, protectedScopes: ["gate:candidate"], root: "/r", ...deps });
  assert.equal(guarded.code, "INTENT_SCOPE_PROTECTED");
  const wrong = await runAuthorizedGateFlow({ intent: intent({ effect: "git.push" }), basis, budget, protectedScopes: [], root: "/r", ...deps });
  assert.equal(wrong.effect, "none");
  assert.equal(wrong.code, "GATE_FLOW_EFFECT_UNSUPPORTED");
  assert.equal(verified, 0);
});

test("an admitted gate-run records the command receipt and the independently observed outcome as live", async () => {
  const out = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/r",
    verify: async () => gateObs() as never,
    observe: seen(),
  });
  assert.equal(out.effect, "executed");
  assert.equal(out.code, null);
  assert.equal(out.command!.ids["operationId"], "op-77");
  assert.equal(out.observation.mode, "live");
  assert.equal(out.observation.outcome, "observed");
  assert.equal(out.observation.receipt!.ids["operationId"], "op-77");
  assert.equal(out.observation.receipt!.ids["commandId"], "cmd_1");
  assert.equal(out.command!.ids["commandId"], "cmd_1");
  assert.equal(out.observation.receipt!.ids["traceId"], "trace_1");
  assert.equal(out.observation.receipt!.ids["sha"], COMMIT);
  assert.equal((out.observation as { value: { kind: string } }).value.kind, "passed");
  assert.equal(out.events.length, 1);
  assert.equal(out.events[0]!.mode, "live");
  assert.equal(out.events[0]!.receiptDigest, out.observation.receipt!.rawDigest);
  assert.equal(out.events[0]!.subject, "op-77");
  assert.equal(liveEvent(2, out.observation).step, 2);
});

test("a measured red stays a live failure, never a pass", async () => {
  const out = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/r",
    verify: async () => gateObs({ kind: "failed", reason: "FORGE_GATE_FAIL" }) as never,
    observe: seen({ command: { gate_verdict: "FAIL", status: "error" } }),
  });
  assert.equal((out.observation as { value: { kind: string } }).value.kind, "failed");
  const contradicted = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/r",
    verify: async () => gateObs() as never,
    observe: seen({ command: { gate_verdict: "FAIL" } }),
  });
  assert.equal(contradicted.observation.outcome, "unknown");
  assert.equal((contradicted.observation as { reason: string }).reason, "FORGE_OBSERVED_OUTCOME_CONTRADICTED");
  const greened = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/r",
    verify: async () => gateObs({ kind: "failed", reason: "FORGE_GATE_FAIL" }) as never,
    observe: seen({ command: { gate_verdict: "PASS" } }),
  });
  assert.equal((greened.observation as { reason: string }).reason, "FORGE_OBSERVED_OUTCOME_CONTRADICTED");
});

test("a command without an operation or command id, or an observed record that disagrees with the command receipt, stays unknown", async () => {
  const run = (verified: unknown, observed: (root: string, expect: typeof expectation) => Promise<unknown>) => runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/r", verify: async () => verified as never, observe: observed as never,
  });
  const reason = (out: { observation: unknown }) => (out.observation as { reason: string }).reason;
  const noCommand = await run(gateObs({ operationId: null }), seen());
  assert.equal(reason(noCommand), "FORGE_COMMAND_RECEIPT_ABSENT");
  assert.equal(noCommand.command, null);
  assert.equal(noCommand.effect, "executed");
  const noCommandId = await run(gateObs({ native: { operation_id: "op-77" } }), async () => { throw new Error("must not observe without a command id"); });
  assert.equal(reason(noCommandId), "FORGE_COMMAND_ID_ABSENT");
  assert.equal(noCommandId.command!.ids["operationId"], "op-77");
  assert.deepEqual(noCommandId.events, []);
  const other = await run(gateObs(), seen({ operation: { operation_id: "op-OTHER" } }));
  assert.equal(reason(other), "FORGE_OBSERVED_OPERATION_MISMATCH");
  assert.equal(other.observation.mode, "unknown");
  assert.deepEqual(other.events, []);
  const otherCommit = await run(gateObs(), seen({ command: { gated_commit: "c".repeat(40) } }));
  assert.equal(reason(otherCommit), "FORGE_OBSERVED_COMMIT_MISMATCH");
  const otherTree = await run(gateObs(), seen({ command: { gated_tree: "d".repeat(40) } }));
  assert.equal(reason(otherTree), "FORGE_OBSERVED_TREE_MISMATCH");
  const unreadable = await run(gateObs(), async () => observeForgeGate("/r", expectation, async () => { throw new Error("no file"); }));
  assert.equal(reason(unreadable), "FORGE_RECORD_UNREADABLE");
});

test("the Forge reader keeps an unfinished operation log, another command row, an unlinked operation or an incomplete row as unknown", async () => {
  const reason = (o: unknown) => (o as { reason: string }).reason;
  const unfinished = await observeForgeGate("/r", expectation, native({ operation: { complete: false } }));
  assert.equal(unfinished.outcome, "unknown");
  assert.equal(reason(unfinished), "FORGE_OPERATION_LOG_INCOMPLETE");
  assert.equal(reason(await observeForgeGate("/r", expectation, native({ operation: { closed_at: undefined } }))), "FORGE_OPERATION_LOG_INCOMPLETE");
  assert.equal(reason(await observeForgeGate("/r", expectation, native({ operation: { operation_id: undefined } }))), "FORGE_OPERATION_LOG_INCOMPLETE");
  const anotherRow = await observeForgeGate("/r", expectation, native({ command: { command_id: "cmd_2" } }));
  assert.equal(reason(anotherRow), "FORGE_COMMAND_ROW_MISMATCH");
  assert.equal(anotherRow.mode, "unknown");
  const unlinked = await observeForgeGate("/r", expectation, native({ command: { timestamp: "2026-10-16T16:37:13.635462+00:00" } }));
  assert.equal(reason(unlinked), "FORGE_OPERATION_COMMAND_UNLINKED");
  assert.equal(reason(await observeForgeGate("/r", expectation, native({ command: { timestamp: "not a time" } }))), "FORGE_OPERATION_COMMAND_UNLINKED");
  const incomplete = await observeForgeGate("/r", expectation, native({ command: { gate_verdict: undefined } }));
  assert.equal(reason(incomplete), "FORGE_RECORD_INCOMPLETE");
  assert.equal(incomplete.receipt!.ids["commandId"], undefined);
  const noTree = await observeForgeGate("/r", expectation, native({ command: { gated_tree: undefined } }));
  assert.equal(noTree.outcome, "observed");
  assert.equal((noTree as { value: { tree: string | null } }).value.tree, null);
});

test("the default Forge reader reads the operation log and the commands.jsonl row Forge wrote, never the pytest run manifest", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-lobs-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    // `forge` writes .forge/last-run.json for pytest fix-verify only (status RESOLVED|UNKNOWN, no operation id); it must never satisfy the observation.
    writeFileSync(join(root, ".forge", "last-run.json"), JSON.stringify({ command: "test", command_id: "cmd_1", gated_commit: COMMIT, status: "UNKNOWN", run_id: "run_1" }));
    const only = await observeForgeGate(root, expectation);
    assert.equal(only.outcome, "unknown");
    assert.equal((only as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
    writeFileSync(join(root, ".forge", "logs", "operations", "op-77.json"), JSON.stringify(opLog()));
    const noRow = await observeForgeGate(root, expectation);
    assert.equal((noRow as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
    writeFileSync(join(root, ".forge", "logs", "commands.jsonl"), [
      "not json", JSON.stringify(cmdRow({ command_id: "cmd_0", gated_commit: "e".repeat(40) })), JSON.stringify(cmdRow()), "",
    ].join("\n"));
    const read = await observeForgeGate(root, expectation);
    assert.equal(read.outcome, "observed");
    assert.equal(read.mode, "live");
    assert.deepEqual(read.receipt!.ids, { buildOperationId: "op-77", commandId: "cmd_1", operationId: "op-77", sha: COMMIT, traceId: "trace_1", tree: TREE });
    assert.deepEqual((read as { value: unknown }).value, { operationId: "op-77", buildOperationId: "op-77", commandId: "cmd_1", traceId: "trace_1", commit: COMMIT, tree: TREE, verdict: "PASS", terminalStatus: "success", closedAt: "2026-10-16T15:37:13.591527+00:00" });
    const missing = await observeForgeGate(join(root, "nowhere"), expectation);
    assert.equal((missing as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
    const escape = await observeForgeGate(root, { operationId: "../../last-run", commandId: "cmd_1" });
    assert.equal((escape as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("a Beads claim is observed only from the bd show receipt, never inferred from a successful invocation", async () => {
  const calls: string[][] = [];
  const claimed = await observeBeads("/d", "MW-1", async argv => { calls.push([...argv]); return { stdout: bdShow(), stderr: "", exitCode: 0 }; });
  assert.equal(claimed.outcome, "observed");
  const value = (claimed as { value: { state: string; assignee: string; dependencies: readonly string[] } }).value;
  assert.equal(value.state, "claimed");
  assert.equal(value.assignee, "camshaft-oe");
  assert.deepEqual(value.dependencies, ["MW-0", "MW-9"]);
  assert.equal(claimed.mode, "live");
  assert.equal(claimed.receipt!.ids["issueId"], "MW-1");
  assert.equal(claimed.receipt!.ids["updatedAt"], "2026-10-16T00:00:00Z");
  assert.ok(calls.every(argv => argv.includes("show") && argv.includes("--readonly") && !argv.includes("update")));
  // an update that "succeeds" elsewhere changes nothing here: the show receipt says open and unassigned.
  const open = await observeBeads("/d", "MW-1", async argv => ({ stdout: bdShow({ status: "open", assignee: null }), stderr: argv.includes("update") ? "claimed" : "", exitCode: 0 }));
  assert.equal((open as { value: { state: string } }).value.state, "unclaimed");
  const noOwner = await observeBeads("/d", "MW-1", async () => ({ stdout: bdShow({ assignee: "" }), stderr: "", exitCode: 0 }));
  assert.equal((noOwner as { value: { state: string } }).value.state, "unclaimed");
});

test("an unavailable, unreadable or mismatched bd answer is an unknown observation", async () => {
  const bad = await observeBeads("/d", "MW-1", async () => ({ stdout: "", stderr: "boom", exitCode: 1 }));
  assert.equal((bad as { reason: string }).reason, "BEADS_SHOW_UNAVAILABLE");
  assert.equal(bad.mode, "unknown");
  const thrown = await observeBeads("/d", "MW-1", async () => { throw new Error("spawn"); });
  assert.equal((thrown as { reason: string }).reason, "BEADS_SHOW_UNAVAILABLE");
  const junk = await observeBeads("/d", "MW-1", async () => ({ stdout: "not json", stderr: "", exitCode: 0 }));
  assert.equal((junk as { reason: string }).reason, "BEADS_SHOW_UNREADABLE");
  const other = await observeBeads("/d", "MW-1", async () => ({ stdout: bdShow({ id: "MW-2" }), stderr: "", exitCode: 0 }));
  assert.equal((other as { reason: string }).reason, "BEADS_SHOW_ISSUE_MISMATCH");
});

test("a bd show answer that parses but is not one row with a string status is unknown BEADS_SHOW_UNREADABLE carrying the raw stdout and never an unclaimed observation (MechanicalWorkflows-thap)", async () => {
  const row = JSON.parse(bdShow())[0];
  const answers: ReadonlyArray<readonly [string, string]> = [
    ["two rows", JSON.stringify([row, row])],
    ["an empty array", "[]"],
    ["a row without a status key", bdShow({ status: undefined })],
    ["a row with a non-string status", bdShow({ status: 7 })],
    ["a bare non-array object", JSON.stringify({ id: "MW-1" })],
  ];
  for (const [label, stdout] of answers) {
    const seen = await observeBeads("/d", "MW-1", async () => ({ stdout, stderr: "", exitCode: 0 }));
    assert.equal(seen.mode, "unknown", `${label}: mode`);
    assert.equal(seen.outcome, "unknown", `${label}: outcome`);
    assert.equal((seen as { reason: string }).reason, "BEADS_SHOW_UNREADABLE", `${label}: reason`);
    assert.equal(seen.receipt?.system, "beads", `${label}: receipt system`);
    assert.equal(seen.receipt?.raw, stdout, `${label}: the refusal keeps the exact native stdout`);
    const state = (seen as unknown as { value?: { state?: string } }).value?.state;
    assert.notEqual(state, "unclaimed", `${label}: a malformed answer never reads as unclaimed`);
    assert.notEqual(state, "claimed", `${label}: a malformed answer never reads as claimed`);
  }
});

test("an episode event is built only from a live observation: a fixture or replay observation with a native-looking receipt is refused", () => {
  const receipt = { system: "forge" as const, ids: { operationId: "op-1" }, raw: { a: 1 } };
  const replayed = replayObservation({ system: "forge", value: "x", receipt });
  assert.equal(replayed.mode, "replay");
  assert.throws(() => liveEvent(1, replayed), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  const fixture = makeObservation({ mode: "fixture", system: "forge", outcome: "observed", value: "x", receipt });
  assert.equal(fixture.mode, "fixture");
  assert.throws(() => liveEvent(1, fixture), /LIVE_LABEL_WITHOUT_NATIVE_ID/);
  const live = makeObservation({ mode: "live", system: "forge", outcome: "observed", value: "x", receipt });
  assert.equal(liveEvent(1, live).mode, "live");
});

test("a Beads claim needs both in_progress and an assignee: an open row that names an assignee stays unclaimed", async () => {
  const openAssigned = await observeBeads("/d", "MW-1", async () => ({ stdout: bdShow({ status: "open", assignee: "camshaft-oe" }), stderr: "", exitCode: 0 }));
  assert.equal(openAssigned.outcome, "observed");
  const value = (openAssigned as { value: { state: string; status: string; assignee: string | null } }).value;
  assert.equal(value.state, "unclaimed");
  assert.equal(value.status, "open");
  assert.equal(value.assignee, "camshaft-oe");
});

test("the operation log and command row link only within five seconds: 5000 ms links, 5001 ms stays unknown", async () => {
  const reason = (o: unknown) => (o as { reason: string }).reason;
  const operation = { closed_at: "2026-10-16T15:37:13.000+00:00" };
  const stamped = (timestamp: string) => observeForgeGate("/r", expectation, native({ operation, command: { timestamp } }));
  assert.equal((await stamped("2026-10-16T15:37:17.999+00:00")).outcome, "observed");
  assert.equal((await stamped("2026-10-16T15:37:18.000+00:00")).outcome, "observed");
  assert.equal((await stamped("2026-10-16T15:37:08.000+00:00")).outcome, "observed");
  assert.equal(reason(await stamped("2026-10-16T15:37:18.001+00:00")), "FORGE_OPERATION_COMMAND_UNLINKED");
  assert.equal(reason(await stamped("2026-10-16T15:37:07.999+00:00")), "FORGE_OPERATION_COMMAND_UNLINKED");
});

test("the default Forge reader uses the row named by the command id even when other rows follow it", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-lobs-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    writeFileSync(join(root, ".forge", "logs", "operations", "op-77.json"), JSON.stringify(opLog()));
    writeFileSync(join(root, ".forge", "logs", "commands.jsonl"), [
      JSON.stringify(cmdRow()), JSON.stringify(cmdRow({ command_id: "cmd_9", gated_commit: "e".repeat(40) })), "",
    ].join("\n"));
    const read = await observeForgeGate(root, expectation);
    assert.equal(read.outcome, "observed");
    assert.equal(read.receipt!.ids["commandId"], "cmd_1");
    assert.equal(read.receipt!.ids["sha"], COMMIT);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("incomplete Furnace evidence is preserved as unknown and a complete run record carries its run id", async () => {
  const complete = await observeFurnace(async () => ({ data: { run_id: "run-9", state: "running", attempts: [{ id: "a1" }] } }));
  assert.equal(complete.outcome, "observed");
  assert.equal(complete.mode, "live");
  assert.equal(complete.receipt!.ids["runId"], "run-9");
  const noRun = await observeFurnace(async () => ({ state: "running" }));
  assert.equal((noRun as { reason: string }).reason, "FURNACE_EVIDENCE_INCOMPLETE");
  assert.equal(noRun.mode, "unknown");
  const noState = await observeFurnace(async () => ({ run_id: "run-9" }));
  assert.equal((noState as { reason: string }).reason, "FURNACE_EVIDENCE_INCOMPLETE");
  const failed = await observeFurnace(async () => { throw new Error("no furnace"); });
  assert.equal((failed as { reason: string }).reason, "FURNACE_READ_FAILED");
});

test("unknown or partial HX coverage is preserved as unknown, complete coverage keeps its query digest", async () => {
  const request = { workspaceId: "ws", baseRevision: "rev-1" } as never;
  const frames = (n: number) => Array.from({ length: n }, (_, i) => i).flatMap(i => [
    { kind: "answer", seq: 2 * i + 1, body: { ref: { $int: String(2 * i + 2) } } }, { kind: "node", seq: 2 * i + 2, body: { locator: `f${i}.ts` } },
  ]);
  const complete = await observeHx(request, async () => ({ exitCode: 0, terminalReached: true, coverageSummary: { completeness: "complete", licensesAbsence: true, answerCount: 1 }, frames: frames(1), queryDigest: "qd-1", revision: "rev-1", scopeKind: "task" }));
  assert.equal(complete.outcome, "observed");
  assert.equal(complete.receipt!.ids["queryDigest"], "qd-1");
  const partial = await observeHx(request, async () => ({ exitCode: 0, terminalReached: true, coverageSummary: { completeness: "incomplete" }, frames: [], results: [] }));
  assert.equal((partial as { reason: string }).reason, "HX_COVERAGE_PARTIAL");
  const unknown = await observeHx(request, async () => { throw new Error("hx down"); });
  assert.equal((unknown as { reason: string }).reason, "HX_COVERAGE_UNKNOWN");
  assert.equal(unknown.mode, "unknown");
});

test("the live flow preconditions skip with an UNKNOWN record, never a pass", () => {
  const off = liveFlowPreconditions({}, true);
  assert.equal(off.run, false);
  assert.deepEqual((off as { record: unknown }).record, liveFlowUnknownRecord("LIVE_FLOW_NOT_ENABLED"));
  assert.equal(liveFlowUnknownRecord("LIVE_FLOW_NOT_ENABLED").status, "UNKNOWN");
  assert.equal(liveFlowUnknownRecord("LIVE_FLOW_NOT_ENABLED").pass, false);
  assert.equal((liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1" }, true) as { record: { reason: string } }).record.reason, "LIVE_FLOW_ROOT_UNSET");
  assert.equal((liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: "/r" }, false) as { record: { reason: string } }).record.reason, "LIVE_FLOW_FORGE_ABSENT");
  const go = liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "1", MW_LIVE_FORGE_ROOT: "/r" }, true);
  assert.equal(go.run, true);
  assert.equal((go as { root: string }).root, "/r");
  assert.equal((liveFlowPreconditions({ MW_LIVE_FORGE_FLOW: "0", MW_LIVE_FORGE_ROOT: "/r" }, true) as { record: { reason: string } }).record.reason, "LIVE_FLOW_NOT_ENABLED");
});

test("opt-in live: an admitted gate-run through the existing Forge client retains native command and operation ids", async t => {
  const forge = spawnSync("forge", ["--version"], { encoding: "utf8" });
  const gate = liveFlowPreconditions(process.env, forge.status === 0);
  if (!gate.run) {
    const dir = process.env["MW_LIVE_RECORD_DIR"];
    if (dir) writeFileSync(join(dir, "live-flow-unknown.json"), JSON.stringify(gate.record) + "\n");
    t.diagnostic(JSON.stringify(gate.record));
    t.skip(`UNKNOWN: ${gate.record.reason}`);
    return;
  }
  const out = await runAuthorizedGateFlow({
    intent: intent({ target: { kind: "forge-gate", uri: gate.root } }), basis, budget, protectedScopes: [], root: gate.root,
    verify: root => verifyExistingCandidate(root), observe: (root, expect) => observeForgeGate(root, expect),
  });
  t.diagnostic(JSON.stringify({ command: out.command, observation: out.observation }));
  assert.equal(out.effect, "executed");
  assert.ok(out.command !== null && out.command.ids["operationId"], "retained native operation id");
  // An unknown observation never satisfies the live assertion: the independently observed half must have been read from Forge's own records.
  assert.equal(out.observation.outcome, "observed", `the observed leg stayed unknown: ${out.observation.outcome === "unknown" ? out.observation.reason : ""}`);
  assert.equal(out.observation.receipt!.ids["operationId"], out.command!.ids["operationId"]);
  assert.equal(out.observation.receipt!.ids["commandId"], out.command!.ids["commandId"]);
  assert.equal(out.events.length, 1);
});

// Shapes copied from the records a real SERVED gate.run wrote at forge 0.2.1 rev f897f3619fa9 (2026-10-20 02:23Z, MechanicalWorkflows-s14.3 live run 1):
// the App Server's receipt named operation op-59032adbc5a24e68b83a7f6f501c2be5 and command cmd_e248a7cd9a9b, while the gated root holds
// .forge/logs/operations/op-d82be91c6cdb4910bf56bc51ae71300e.json and .forge/state/operations/op-d82be91c6cdb4910bf56bc51ae71300e.json —
// a different (inner build) operation id, linked to the receipt only by command_id and trace_id — and no commands.jsonl row at all.
const SERVED = { operationId: "op-59032adbc5a24e68b83a7f6f501c2be5", commandId: "cmd_e248a7cd9a9b" };
const servedOpLog = (over: Record<string, unknown> = {}) => ({
  bytes_written: 9, capture_mode: "captured", closed_at: "2026-10-20T02:23:25.315914+00:00", command: "build", command_id: "cmd_e248a7cd9a9b", complete: true,
  created_at: "2026-10-20T02:23:23.166776+00:00", evicted_at: null, incomplete_reason: null, merged_or_split_streams: "merged", operation_id: "op-d82be91c6cdb4910bf56bc51ae71300e",
  path: ".forge/logs/operations/op-d82be91c6cdb4910bf56bc51ae71300e.log", retention: { max_bytes: 268435456, max_days: 30 }, schema: "forge/operation-log/1", task: "build",
  trace_id: "44eadb6940e64b0caa5e8158e8b06bf9", ...over,
});
const servedRecord = (over: Record<string, unknown> = {}) => ({
  admission: null, cancel_requested: false, command_id: "cmd_e248a7cd9a9b", created_at: "2026-10-20T02:23:22.737466+00:00", disconnected: false, forge_revision: "f897f3619fa9",
  history: ["CREATED", "RUNNING", "TERMINAL"], kind: "gate-operation", method: "gate", operation_id: "op-d82be91c6cdb4910bf56bc51ae71300e", parent_operation_id: null,
  request_id: null, result_ref: null, revision: 2, schema: "forge/operation-record/1", server_pid: 2177802, started_at: "2026-10-20T02:23:22.737558+00:00", state: "TERMINAL",
  terminal: { answered: true, disposition: "completed", observation_kind: "result", outcome_class: "success", refusal_code: null, signal_name: null, status: "success" },
  terminal_at: "2026-10-20T02:23:25.433806+00:00", trace_id: "44eadb6940e64b0caa5e8158e8b06bf9", ...over,
});
const served = (over: { operation?: Record<string, unknown>; record?: Record<string, unknown> } = {}) =>
  async () => ({ operation: servedOpLog(over.operation), command: null, record: servedRecord(over.record) });

test("a served gate's records are read by command id: both operation ids are kept, no on-disk verdict or commit is claimed", async () => {
  const obs = await observeForgeGate("/r", SERVED, served());
  assert.equal(obs.outcome, "observed", `served records readable: ${obs.outcome === "unknown" ? obs.reason : ""}`);
  assert.equal(obs.mode, "live");
  const value = (obs as unknown as { value: Record<string, unknown> }).value;
  assert.equal(value["operationId"], SERVED.operationId, "the operation the receipt named");
  assert.equal(value["buildOperationId"], "op-d82be91c6cdb4910bf56bc51ae71300e", "Forge's own inner build operation id");
  assert.equal(value["commandId"], SERVED.commandId);
  assert.equal(value["traceId"], "44eadb6940e64b0caa5e8158e8b06bf9");
  assert.equal(value["verdict"], null, "a served gate writes no on-disk verdict; none is invented");
  assert.equal(value["commit"], null, "no served record carries the gated commit; none is invented");
  assert.equal(value["terminalStatus"], "success");
  assert.equal(obs.receipt!.ids["operationId"], SERVED.operationId);
  assert.equal(obs.receipt!.ids["buildOperationId"], "op-d82be91c6cdb4910bf56bc51ae71300e");
  assert.equal(obs.receipt!.ids["commandId"], SERVED.commandId);
});

test("served records that do not belong to the named command, are not terminal, or are unlinked in time stay unknown", async () => {
  const reasonOf = (o: Awaited<ReturnType<typeof observeForgeGate>>) => (o as { reason?: string }).reason;
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ record: { command_id: "cmd_other" } }))), "FORGE_COMMAND_ROW_MISMATCH");
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ operation: { command_id: "cmd_other" } }))), "FORGE_COMMAND_ROW_MISMATCH");
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ record: { state: "RUNNING", terminal: null } }))), "FORGE_OPERATION_RECORD_INCOMPLETE");
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ record: { terminal_at: "2026-10-20T02:24:25.433806+00:00" } }))), "FORGE_OPERATION_COMMAND_UNLINKED");
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ record: { trace_id: "other-trace" } }))), "FORGE_OPERATION_COMMAND_UNLINKED");
  assert.equal(reasonOf(await observeForgeGate("/r", SERVED, served({ operation: { complete: false } }))), "FORGE_OPERATION_LOG_INCOMPLETE");
});

test("the default reader finds a served gate's records on disk by command id when no commands.jsonl row exists", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-served-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    mkdirSync(join(root, ".forge", "state", "operations"), { recursive: true });
    writeFileSync(join(root, ".forge", "logs", "operations", "op-d82be91c6cdb4910bf56bc51ae71300e.json"), JSON.stringify(servedOpLog()));
    writeFileSync(join(root, ".forge", "logs", "operations", "op-other.json"), JSON.stringify(servedOpLog({ operation_id: "op-other", command_id: "cmd_other" })));
    writeFileSync(join(root, ".forge", "state", "operations", "op-d82be91c6cdb4910bf56bc51ae71300e.json"), JSON.stringify(servedRecord()));
    const found = await observeForgeGate(root, SERVED);
    assert.equal(found.outcome, "observed", `found by command id: ${found.outcome === "unknown" ? found.reason : ""}`);
    assert.equal((found as { value: { buildOperationId: string } }).value.buildOperationId, "op-d82be91c6cdb4910bf56bc51ae71300e");
    const absent = await observeForgeGate(root, { ...SERVED, commandId: "cmd_never" });
    assert.equal(absent.outcome, "unknown");
    assert.equal((absent as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("the authorized flow accepts a served observation: the commit comes from the receipt's clean basis and no verdict contradiction is invented", async () => {
  const servedGate = gateObs({ kind: "indeterminate", reason: "FORGE_GATE_INCOMPLETE", operationId: SERVED.operationId, native: { operation_id: SERVED.operationId, ids: { command_id: SERVED.commandId } } });
  const out = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/scratch/candidate",
    verify: async () => servedGate as never, observe: (root, expect) => observeForgeGate(root, expect, served()),
  });
  assert.equal(out.effect, "executed");
  assert.equal(out.code, null);
  assert.equal(out.observation.outcome, "observed", `served flow observed: ${out.observation.outcome === "unknown" ? out.observation.reason : ""}`);
  assert.equal(out.observation.receipt!.ids["operationId"], SERVED.operationId);
  assert.equal(out.observation.receipt!.ids["commandId"], SERVED.commandId);
  assert.equal(out.observation.receipt!.ids["buildOperationId"], "op-d82be91c6cdb4910bf56bc51ae71300e");
  assert.equal((out.observation as { value: { commit: string } }).value.commit, COMMIT, "the commit is the verified clean basis the receipt carried");
  assert.equal(out.events.length, 1);
  assert.equal(out.events[0]!.subject, SERVED.operationId);
});

// MechanicalWorkflows-l4j2: six served-record laws that the s14.3 tests left unpinned (each was a surviving single-line mutant).
const reasonOfServed = (o: Awaited<ReturnType<typeof observeForgeGate>>) => (o as { reason?: string }).reason;
const servedTerminal = (over: Record<string, unknown> = {}) => ({ ...servedRecord().terminal, ...over });

test("a served record in state RUNNING is incomplete even when it carries a full terminal block", async () => {
  assert.equal(reasonOfServed(await observeForgeGate("/r", SERVED, served({ record: { state: "RUNNING" } }))), "FORGE_OPERATION_RECORD_INCOMPLETE");
});

test("a served record naming another operation id than the operation log stays unlinked", async () => {
  assert.equal(reasonOfServed(await observeForgeGate("/r", SERVED, served({ record: { operation_id: "op-other" } }))), "FORGE_OPERATION_COMMAND_UNLINKED");
});

test("a served record whose terminal status is null is incomplete", async () => {
  assert.equal(reasonOfServed(await observeForgeGate("/r", SERVED, served({ record: { terminal: servedTerminal({ status: null }) } }))), "FORGE_OPERATION_RECORD_INCOMPLETE");
});

test("the authorized flow observes a served passed gate and a served failed gate, keeping each kind; a served record writes no verdict to contradict either", async () => {
  for (const [kind, reason] of [["passed", "FORGE_GATE_PASS"], ["failed", "FORGE_GATE_FAIL"]] as const) {
    const gate = gateObs({ kind, reason, operationId: SERVED.operationId, native: { operation_id: SERVED.operationId, ids: { command_id: SERVED.commandId } } });
    const out = await runAuthorizedGateFlow({
      intent: intent(), basis, budget, protectedScopes: [], root: "/scratch/candidate",
      verify: async () => gate as never, observe: (root, expect) => observeForgeGate(root, expect, served()),
    });
    assert.equal(out.effect, "executed", kind);
    assert.equal(out.code, null, kind);
    assert.equal(out.observation.outcome, "observed", `${kind} served flow observed: ${out.observation.outcome === "unknown" ? out.observation.reason : ""}`);
    assert.equal((out.observation as { value: { kind: string; verdict: string | null } }).value.kind, kind);
    assert.equal((out.observation as { value: { verdict: string | null } }).value.verdict, null, `${kind}: no verdict is invented`);
  }
});

test("the served flow's observation receipt binds the verified basis commit as its sha", async () => {
  const gate = gateObs({ kind: "indeterminate", reason: "FORGE_GATE_INCOMPLETE", operationId: SERVED.operationId, native: { operation_id: SERVED.operationId, ids: { command_id: SERVED.commandId } } });
  const out = await runAuthorizedGateFlow({
    intent: intent(), basis, budget, protectedScopes: [], root: "/scratch/candidate",
    verify: async () => gate as never, observe: (root, expect) => observeForgeGate(root, expect, served()),
  });
  assert.equal(out.observation.outcome, "observed");
  assert.equal(out.observation.receipt!.ids["sha"], COMMIT, "the receipt names the gated commit, never an empty sha");
});

test("with two on-disk operation logs for one command id the later closed log is read, whichever file name sorts first", async () => {
  const early = { operation_id: "op-early", closed_at: "2026-10-20T02:20:25.315914+00:00" };
  const late = { operation_id: "op-late", closed_at: "2026-10-20T02:23:25.315914+00:00" };
  const record = (id: string, terminalAt: string, status: string) => servedRecord({ operation_id: id, terminal_at: terminalAt, terminal: servedTerminal({ status }) });
  for (const firstName of ["early", "late"] as const) {
    const root = mkdtempSync(join(tmpdir(), "mw-served-latest-"));
    try {
      mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
      mkdirSync(join(root, ".forge", "state", "operations"), { recursive: true });
      // The file name that sorts first carries the early log in the first pass and the late log in the second.
      const pair = firstName === "early" ? [[`a-${early.operation_id}`, early], [`z-${late.operation_id}`, late]] : [[`a-${late.operation_id}`, late], [`z-${early.operation_id}`, early]];
      for (const [name, meta] of pair as [string, typeof early][]) {
        const id = meta.operation_id;
        writeFileSync(join(root, ".forge", "logs", "operations", `${name}.json`), JSON.stringify(servedOpLog({ operation_id: id, closed_at: meta.closed_at })));
        writeFileSync(join(root, ".forge", "state", "operations", `${id}.json`), JSON.stringify(record(id, meta.closed_at, id === "op-late" ? "success" : "failure")));
      }
      const found = await observeForgeGate(root, SERVED);
      assert.equal(found.outcome, "observed", `latest log found: ${found.outcome === "unknown" ? found.reason : ""}`);
      const value = (found as unknown as { value: { buildOperationId: string; terminalStatus: string } }).value;
      assert.equal(value.buildOperationId, "op-late", `order ${firstName}: the later closed log wins`);
      assert.equal(value.terminalStatus, "success");
    } finally { rmSync(root, { recursive: true, force: true }); }
  }
});

// MechanicalWorkflows-qygn: the default reader's three file-reading laws the suite left open at the landed s14.3 tree.
test("the default Forge reader keeps the LAST commands.jsonl row for a command id: Forge appends a running row, then a terminal row (MechanicalWorkflows-qygn)", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-lobs-last-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    writeFileSync(join(root, ".forge", "logs", "operations", "op-77.json"), JSON.stringify(opLog()));
    writeFileSync(join(root, ".forge", "logs", "commands.jsonl"), [
      JSON.stringify(cmdRow({ status: "running", gate_verdict: "RUNNING", gated_commit: "c".repeat(40), gated_tree: "d".repeat(40) })),
      JSON.stringify(cmdRow()), "",
    ].join("\n"));
    const read = await observeForgeGate(root, expectation);
    assert.equal(read.outcome, "observed");
    const value = (read as unknown as { value: { verdict: string; terminalStatus: string; commit: string; tree: string } }).value;
    assert.equal(value.verdict, "PASS", "the terminal row's verdict, not the running row's");
    assert.equal(value.terminalStatus, "success");
    assert.equal(value.commit, COMMIT);
    assert.equal(value.tree, TREE);
    assert.equal(read.receipt!.ids["sha"], COMMIT);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("the command-id fallback scan skips operation-log file names that are not safe operation ids: op.77.json is never read (MechanicalWorkflows-qygn)", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-lobs-unsafe-name-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    writeFileSync(join(root, ".forge", "logs", "operations", "op.77.json"), JSON.stringify(opLog({ command_id: "cmd_1" })));
    writeFileSync(join(root, ".forge", "logs", "commands.jsonl"), JSON.stringify(cmdRow()) + "\n");
    const unsafe = await observeForgeGate(root, { operationId: "op-none", commandId: "cmd_1" });
    assert.equal(unsafe.outcome, "unknown");
    assert.equal((unsafe as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
    // control: the same log under a safe name is found by command id, so the refusal above comes from the name alone.
    writeFileSync(join(root, ".forge", "logs", "operations", "op_77.json"), JSON.stringify(opLog({ command_id: "cmd_1" })));
    const safe = await observeForgeGate(root, { operationId: "op-none", commandId: "cmd_1" });
    assert.equal(safe.outcome, "observed", `safe-name control: ${safe.outcome === "unknown" ? safe.reason : ""}`);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("an operation log naming a build operation id with a path escape never reads a state record outside .forge/state/operations (MechanicalWorkflows-qygn)", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-lobs-escape-"));
  try {
    mkdirSync(join(root, ".forge", "logs", "operations"), { recursive: true });
    mkdirSync(join(root, ".forge", "state", "operations"), { recursive: true });
    writeFileSync(join(root, ".forge", "logs", "operations", "op-77.json"), JSON.stringify(servedOpLog({ operation_id: "../evil", command_id: "cmd_1" })));
    // The record a path-escape would read: .forge/state/operations/../evil.json is .forge/state/evil.json.
    writeFileSync(join(root, ".forge", "state", "evil.json"), JSON.stringify(servedRecord({ operation_id: "../evil", command_id: "cmd_1" })));
    const escaped = await observeForgeGate(root, { operationId: "op-77", commandId: "cmd_1" });
    assert.equal(escaped.outcome, "unknown", "an escaped state record never yields an observation");
    assert.equal((escaped as { reason: string }).reason, "FORGE_RECORD_UNREADABLE");
  } finally { rmSync(root, { recursive: true, force: true }); }
});
