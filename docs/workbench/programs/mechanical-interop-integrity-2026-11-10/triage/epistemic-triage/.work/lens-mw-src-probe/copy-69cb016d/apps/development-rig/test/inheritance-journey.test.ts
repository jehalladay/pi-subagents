// MechanicalWorkflows-s14.15 (CA-R13, 08 T4): the native multi-attempt inheritance journey.
// In an isolated scratch repository a producer attempt does partial work and crashes, leaving a durable
// artifact (a ref whose tip carries its own provenance note); a successor in the treatment arm consumes it
// after re-deriving the provenance digest, a successor in the control arm is denied it, both finish the
// task and are validated by the EXISTING Forge gate seam with native ids retained; the treatment-minus-
// control step difference is recorded as a derived number, never a live observation. Without the opt-in
// flags the live test is skipped as UNKNOWN, never passed.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { artifactProvenance, digest } from "@mechanical/workflows-coordination";
import { verifyExistingCandidate } from "../dist/live-gate.js";
import {
  runNativeInheritanceJourney, inheritancePreconditions, labelInheritanceReport,
  type InheritanceGateRunner,
} from "../dist/inheritance-journey.js";
import { liveFlowUnknownRecord } from "../dist/live-observation.js";

function sh(root: string, ...args: string[]): string {
  const out = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(out.status, 0, `git ${args.join(" ")}: ${out.stderr}`);
  return out.stdout.trim();
}

/** A gateable scratch package: the test step discovers every unit<i>.ts and asserts it exports its index. */
function scratchRepo(): { readonly root: string; readonly dispose: () => void } {
  const root = mkdtempSync(join(tmpdir(), "mw-inheritance-"));
  sh(root, "init", "-q", "-b", "main"); sh(root, "config", "user.name", "journey"); sh(root, "config", "user.email", "journey@test");
  writeFileSync(join(root, ".gitignore"), ".forge/\nnode_modules/\n");
  writeFileSync(join(root, "forge.toml"), `[package]\nname = "mw-inheritance-witness"\ntype = "code"\nversion = "0.1.0"\n\n[build]\nbackend = "typescript"\ngate = ["typing", "test"]\n\n[build.commands]\ntyping = { command = "node --version", inputs = ["main.ts", "tsconfig.json"] }\ntest = { command = "node --test main.test.ts", inputs = ["main.ts", "main.test.ts", "unit*.ts"] }\n`);
  writeFileSync(join(root, "tsconfig.json"), `{"compilerOptions":{"strict":true,"module":"nodenext","target":"es2022","noEmit":true},"include":["main.ts","main.test.ts"]}\n`);
  writeFileSync(join(root, "main.ts"), `export const task = "inheritance";\n`);
  writeFileSync(join(root, "main.test.ts"), `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { readdirSync } from "node:fs";\n\ntest("every unit file exports its own index", async () => {\n  for (const file of readdirSync(".").filter(name => /^unit\\d+\\.ts$/.test(name))) {\n    const mod = await import(\`./\${file}\`) as { index: number };\n    assert.equal(mod.index, Number(file.slice(4, -3)));\n  }\n});\n`);
  sh(root, "add", "-A"); sh(root, "commit", "-q", "-m", "root");
  return { root, dispose: () => rmSync(root, { recursive: true, force: true }) };
}

const passGate: InheritanceGateRunner = async (worktree, commit) => ({
  kind: "passed", operationId: `op-${commit.slice(0, 8)}`, commandId: `cmd-${commit.slice(0, 8)}`,
  receipt: { system: "forge", ids: { operationId: `op-${commit.slice(0, 8)}`, commandId: `cmd-${commit.slice(0, 8)}`, sha: commit }, raw: { worktree } },
});

test("preconditions skip as UNKNOWN, never a pass, without the opt-in", () => {
  const off = inheritancePreconditions({}, true);
  assert.equal(off.run, false);
  assert.deepEqual((off as { record: unknown }).record, liveFlowUnknownRecord("INHERITANCE_JOURNEY_NOT_ENABLED"));
  assert.equal((inheritancePreconditions({ MW_LIVE_INHERITANCE_JOURNEY: "1" }, false) as { record: { reason: string } }).record.reason, "LIVE_FLOW_FORGE_ABSENT");
  assert.equal(inheritancePreconditions({ MW_LIVE_INHERITANCE_JOURNEY: "1" }, true).run, true);
});

test("producer crashes after partial work, the artifact carries its provenance, the treatment successor consumes it and the control successor is denied it; both arms gate with native ids; the delta is derived", async () => {
  const repo = scratchRepo();
  try {
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 5, crashAfter: 2, gate: passGate });
    assert.equal(report.schema, "mw.native-inheritance-journey.v1");
    assert.equal(report.mode, "live");
    assert.equal(report.artifact.id, "artifact-a1");
    assert.equal(report.artifact.producer, "a1");
    assert.equal(report.artifact.progress, 2);
    assert.equal(report.artifact.digest, artifactProvenance({ id: "artifact-a1", producer: "a1", progress: 2 }), "the artifact's digest is the fixture law's provenance digest");
    assert.match(report.artifact.commit, /^[0-9a-f]{40}$/);
    assert.equal(sh(repo.root, "rev-parse", "refs/artifacts/a1"), report.artifact.commit, "the artifact is a durable ref in the scratch repository");
    assert.equal(report.producer.outcome, "crashed");
    assert.equal(report.producer.progress, 2);
    const { treatment, control } = report.arms;
    assert.equal(treatment.outcome, "completed"); assert.equal(control.outcome, "completed");
    assert.deepEqual(treatment.consumed, [{ artifactId: "artifact-a1", digest: report.artifact.digest }], "the digest is retained across attempts");
    assert.deepEqual(control.consumed, [], "the control arm never sees the artifact");
    assert.equal(treatment.startCommit, report.artifact.commit);
    assert.equal(control.startCommit, sh(repo.root, "rev-parse", "main"));
    assert.equal(treatment.steps, 3); assert.equal(control.steps, 5);
    for (const arm of [treatment, control]) {
      assert.equal(arm.gate.kind, "passed");
      assert.ok(arm.gate.ids["operationId"] && arm.gate.ids["commandId"], `${arm.attempt}: native ids retained`);
      assert.equal(arm.observation.mode, "live"); assert.equal(arm.observation.outcome, "observed");
      sh(repo.root, "merge-base", "--is-ancestor", arm.startCommit, arm.finalCommit);
    }
    assert.deepEqual(report.delta, { mode: "derived", steps: -2 }, "treatment minus control, a computation and never a live label");
    assert.equal(sh(repo.root, "worktree", "list", "--porcelain").split("\n").filter(line => line.startsWith("worktree ")).length, 1, "bounded worktrees all released");
    assert.match(report.reportDigest, /^sha256:[0-9a-f]{64}$/);
    const { reportDigest, ...rest } = report; assert.equal(reportDigest, digest(rest));
  } finally { repo.dispose(); }
});

test("a tampered artifact note is refused with ARTIFACT_INHERITED_DIGEST_MISMATCH: the treatment successor consumes nothing and the control arm still completes", async () => {
  const repo = scratchRepo();
  try {
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 1, gate: passGate, corruptArtifact: true });
    assert.equal(report.arms.treatment.outcome, "refused");
    assert.match(report.arms.treatment.detail ?? "", /^ARTIFACT_INHERITED_DIGEST_MISMATCH/);
    assert.deepEqual(report.arms.treatment.consumed, []);
    assert.equal(report.arms.control.outcome, "completed");
    assert.equal(report.delta, null, "no counterfactual without both arms");
  } finally { repo.dispose(); }
});

test("a gate answer without native ids never labels an arm live: the arm is refused, not completed", async () => {
  const repo = scratchRepo();
  try {
    const noIds: InheritanceGateRunner = async worktree => ({ kind: "passed", operationId: "", commandId: "", receipt: { system: "forge", ids: {}, raw: { worktree } } });
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 3, crashAfter: 1, gate: noIds });
    for (const arm of [report.arms.treatment, report.arms.control]) {
      assert.equal(arm.outcome, "refused");
      assert.match(arm.detail ?? "", /^INHERITANCE_WITHOUT_NATIVE_ID_REFUSED/);
      assert.equal(arm.observation.outcome, "unknown");
    }
    assert.equal(report.delta, null);
  } finally { repo.dispose(); }
});

test("a failed gate marks the arm gate-failed with its ids, and invalid work or crash points are refused before any effect", async () => {
  const repo = scratchRepo();
  try {
    const failControl: InheritanceGateRunner = async (worktree, commit) => sh(worktree, "rev-parse", "--abbrev-ref", "HEAD") === "attempt/a3"
      ? { kind: "failed", operationId: "op-f", commandId: "cmd-f", receipt: { system: "forge", ids: { operationId: "op-f", commandId: "cmd-f" }, raw: { worktree } } }
      : passGate(worktree, commit);
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 2, gate: failControl });
    assert.equal(report.arms.treatment.outcome, "completed");
    assert.equal(report.arms.control.outcome, "gate-failed");
    assert.deepEqual(report.arms.control.gate.ids, { operationId: "op-f", commandId: "cmd-f" }, "a failed gate still retains its native ids");
    assert.equal(report.delta, null, "no counterfactual when the control arm did not complete");
    await assert.rejects(runNativeInheritanceJourney({ root: repo.root, work: 1, crashAfter: 1, gate: passGate }), /INHERITANCE_JOURNEY_INVALID/);
    await assert.rejects(runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 4, gate: passGate }), /INHERITANCE_JOURNEY_INVALID/);
    await assert.rejects(runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 0, gate: passGate }), /INHERITANCE_JOURNEY_INVALID/);
  } finally { repo.dispose(); }
});

test("a report can be relabelled replay once, naming its live source, and never back to live or to fixture", async () => {
  const repo = scratchRepo();
  try {
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 3, crashAfter: 1, gate: passGate });
    const replay = labelInheritanceReport(report, "replay");
    assert.equal(replay.mode, "replay");
    assert.equal(replay.sourceDigest, report.reportDigest);
    assert.notEqual(replay.reportDigest, report.reportDigest);
    assert.throws(() => labelInheritanceReport(replay, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
    assert.throws(() => labelInheritanceReport(report, "fixture"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  } finally { repo.dispose(); }
});

// MechanicalWorkflows-pmv6: pin nine guard laws of gateArm, the argument validation, the opt-in flag and the replay relabel that survived the s14.15 suite.
const idAnswer = (operationId: string, commandId: string, kind: "passed" | "failed" | "indeterminate" = "passed"): InheritanceGateRunner =>
  async worktree => ({ kind, operationId, commandId, receipt: { system: "forge", ids: {}, raw: { worktree } } });

/** A journey creates attempt branches, so each run takes its own scratch repository. */
async function freshJourney(gate: InheritanceGateRunner, work = 3, crashAfter = 1) {
  const repo = scratchRepo();
  try { return await runNativeInheritanceJourney({ root: repo.root, work, crashAfter, gate }); } finally { repo.dispose(); }
}

test("a passed answer missing either native id, or carrying only whitespace for one, refuses both arms and never labels them live", async () => {
  for (const [operationId, commandId] of [["op-x", ""], ["", "cmd-x"], ["   ", "cmd-x"], ["op-x", "   "]] as const) {
    const report = await freshJourney(idAnswer(operationId, commandId));
    for (const arm of [report.arms.treatment, report.arms.control]) {
      assert.equal(arm.outcome, "refused", `${arm.attempt}: ids ${JSON.stringify([operationId, commandId])}`);
      assert.match(arm.detail ?? "", /^INHERITANCE_WITHOUT_NATIVE_ID_REFUSED/);
      assert.equal(arm.observation.outcome, "unknown");
    }
    assert.equal(report.delta, null);
  }
});

test("a refused arm retains no empty-string id: gate.ids holds only non-empty native ids", async () => {
  const none = await freshJourney(idAnswer("", ""));
  for (const arm of [none.arms.treatment, none.arms.control]) assert.deepEqual(arm.gate.ids, {}, `${arm.attempt}: no empty-string ids kept`);
  const half = await freshJourney(idAnswer("op-x", ""));
  for (const arm of [half.arms.treatment, half.arms.control]) assert.deepEqual(arm.gate.ids, { operationId: "op-x" }, `${arm.attempt}: only the present id is kept`);
});

test("an indeterminate gate answer that carries both native ids never completes an arm: it is gate-failed with its ids and the delta is null", async () => {
  const report = await freshJourney(idAnswer("op-i", "cmd-i", "indeterminate"), 4, 2);
  for (const arm of [report.arms.treatment, report.arms.control]) {
    assert.equal(arm.outcome, "gate-failed", `${arm.attempt}: indeterminate is not a pass`);
    assert.equal(arm.gate.kind, "indeterminate");
    assert.deepEqual(arm.gate.ids, { operationId: "op-i", commandId: "cmd-i" });
    assert.match(arm.detail ?? "", /^the gate answered indeterminate/);
  }
  assert.equal(report.delta, null);
});

test("the live opt-in is the exact flag value 1: 0, true, the empty string, a leading or trailing space and a leading zero do not enable a live run", () => {
  for (const value of ["0", "true", "", "yes", " 1", "1 ", "01"]) {
    const gate = inheritancePreconditions({ MW_LIVE_INHERITANCE_JOURNEY: value }, true);
    assert.equal(gate.run, false, `flag ${JSON.stringify(value)}`);
    assert.deepEqual((gate as { record: unknown }).record, liveFlowUnknownRecord("INHERITANCE_JOURNEY_NOT_ENABLED"));
  }
  assert.equal(inheritancePreconditions({ MW_LIVE_INHERITANCE_JOURNEY: "1" }, true).run, true);
});

test("the opt-in flag is checked before forge presence: an absent, 0 or malformed flag with no forge is NOT_ENABLED, never LIVE_FLOW_FORGE_ABSENT", () => {
  for (const value of [undefined, "0", "", "true", "yes", " 1", "1 ", "01"]) {
    const gate = inheritancePreconditions({ MW_LIVE_INHERITANCE_JOURNEY: value }, false);
    assert.equal(gate.run, false, `flag ${JSON.stringify(value)}`);
    assert.deepEqual((gate as { record: unknown }).record, liveFlowUnknownRecord("INHERITANCE_JOURNEY_NOT_ENABLED"));
  }
});

test("fractional work or crashAfter is refused before any effect: no ref, branch, artifact or worktree is added to the scratch repository", async () => {
  const repo = scratchRepo();
  try {
    const before = sh(repo.root, "for-each-ref", "--format=%(refname)");
    assert.equal(before, "refs/heads/main");
    await assert.rejects(runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 1.5, gate: passGate }), /INHERITANCE_JOURNEY_INVALID/);
    await assert.rejects(runNativeInheritanceJourney({ root: repo.root, work: 4.5, crashAfter: 2, gate: passGate }), /INHERITANCE_JOURNEY_INVALID/);
    assert.equal(sh(repo.root, "for-each-ref", "--format=%(refname)"), before, "no attempt branch or artifact ref created");
    assert.equal(sh(repo.root, "worktree", "list", "--porcelain").split("\n").filter(line => line.startsWith("worktree ")).length, 1, "no worktree created");
  } finally { repo.dispose(); }
});

test("relabelling an already replay-labelled report as replay returns it unchanged: sourceDigest keeps naming the live report", async () => {
  const repo = scratchRepo();
  try {
    const live = await runNativeInheritanceJourney({ root: repo.root, work: 3, crashAfter: 1, gate: passGate });
    const once = labelInheritanceReport(live, "replay");
    const twice = labelInheritanceReport(once, "replay");
    assert.equal(twice.sourceDigest, live.reportDigest, "the replay still names its live source, not itself");
    assert.equal(twice.reportDigest, once.reportDigest);
    assert.notEqual(twice.sourceDigest, once.reportDigest);
  } finally { repo.dispose(); }
});

test("opt-in live: both arms validate through the real Forge gate with retained native ids", async t => {
  const forge = spawnSync("forge", ["--version"], { encoding: "utf8" });
  const gate = inheritancePreconditions(process.env, forge.status === 0);
  if (!gate.run) { t.diagnostic(JSON.stringify(gate.record)); t.skip(`UNKNOWN: ${gate.record.reason}`); return; }
  const repo = scratchRepo();
  try {
    const liveGate: InheritanceGateRunner = async (worktree, commit) => {
      const seen = await verifyExistingCandidate(worktree);
      const native = seen.native as { ids?: { command_id?: string } } | null;
      const commandId = typeof native === "object" && native !== null && typeof native.ids?.command_id === "string" ? native.ids.command_id : "";
      return {
        kind: seen.kind === "passed" ? "passed" : seen.kind === "failed" ? "failed" : "indeterminate",
        operationId: seen.operationId ?? "", commandId,
        receipt: { system: "forge", ids: { operationId: seen.operationId ?? "", commandId, sha: commit }, raw: seen.native },
      };
    };
    const report = await runNativeInheritanceJourney({ root: repo.root, work: 4, crashAfter: 2, gate: liveGate });
    t.diagnostic(JSON.stringify({ artifact: report.artifact, arms: { treatment: { ...report.arms.treatment, observation: undefined }, control: { ...report.arms.control, observation: undefined } }, delta: report.delta }));
    const dir = process.env["MW_LIVE_RECORD_DIR"];
    if (dir) writeFileSync(join(dir, "inheritance-journey-live.json"), JSON.stringify(report, null, 2) + "\n");
    for (const arm of [report.arms.treatment, report.arms.control]) {
      assert.equal(arm.outcome, "completed", `${arm.attempt}: ${arm.detail ?? ""}`);
      assert.match(arm.gate.ids["operationId"] ?? "", /^op-/); assert.match(arm.gate.ids["commandId"] ?? "", /^cmd_/);
      assert.equal(arm.observation.mode, "live");
    }
    assert.deepEqual(report.delta, { mode: "derived", steps: -2 });
  } finally { repo.dispose(); }
});
