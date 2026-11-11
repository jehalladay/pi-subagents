// MechanicalWorkflows-s14.14 (CA-R12, 08 T3): the native landing-queue journey.
// An isolated scratch repository with N candidate worktrees is driven by the EXISTING
// landing-queue policy (restackFirst) over LIVE observations of the scratch repo; every
// landing runs through the existing Forge gate flow and retains a command and operation id.
// Fixture results are never labelled live; without the opt-in flags the journey is skipped
// as UNKNOWN, never passed.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyExistingCandidate } from "../dist/live-gate.js";
import { restackFirst, digest } from "@mechanical/workflows-coordination";
import {
  runNativeLandingJourney, observeScratchQueue, journeyPreconditions, labelJourneyReport,
  type NativeLandingReport, type LandingGateRunner,
} from "../dist/landing-journey.js";
import { liveFlowUnknownRecord } from "../dist/live-observation.js";

function sh(root: string, ...args: string[]): string {
  const out = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(out.status, 0, `git ${args.join(" ")}: ${out.stderr}`);
  return out.stdout.trim();
}

const PACKAGE_FILES = (name: string): ReadonlyArray<readonly [string, string]> => [
  ["forge.toml", `[package]\nname = "${name}"\ntype = "code"\nversion = "0.1.0"\n\n[build]\nbackend = "typescript"\ngate = ["typing", "test"]\n\n[build.commands]\ntyping = { command = "node --version", inputs = ["main.ts", "tsconfig.json"] }\ntest = { command = "node --test main.test.ts", inputs = ["main.ts", "main.test.ts", "feature*.ts"] }\n`],
  ["tsconfig.json", `{"compilerOptions":{"strict":true,"module":"nodenext","target":"es2022","noEmit":true},"include":["main.ts","main.test.ts"]}\n`],
  ["main.ts", `export function greet(name: string): string {\n  return \u0060hello, \u0024{name}\u0060;\n}\n`],
  ["main.test.ts", `import test from "node:test";\nimport assert from "node:assert/strict";\nimport { readdirSync } from "node:fs";\nimport { greet } from "./main.ts";\n\ntest("greets", () => {\n  assert.equal(greet("forge"), "hello, forge");\n});\n\ntest("every landed feature file exports its name", async () => {\n  for (const file of readdirSync(".").filter(name => /^feature\\d+\\.ts$/.test(name))) {\n    const mod = await import(\u0060./\u0024{file}\u0060) as { name: string };\n    assert.equal(mod.name, file.replace(/\\.ts$/, ""));\n  }\n});\n`],
];

function scratchRepo(candidates: number, gateable = false): { readonly root: string; readonly dispose: () => void } {
  const root = mkdtempSync(join(tmpdir(), "mw-landing-journey-"));
  sh(root, "init", "-q", "-b", "main");
  sh(root, "config", "user.name", "journey");
  sh(root, "config", "user.email", "journey@test");
  writeFileSync(join(root, "README.md"), "scratch landing-queue journey\n");
  writeFileSync(join(root, ".gitignore"), ".forge/\nnode_modules/\n");
  if (gateable) for (const [name, body] of PACKAGE_FILES("mw-journey-witness")) writeFileSync(join(root, name), body);
  sh(root, "add", "-A"); sh(root, "commit", "-q", "-m", "root");
  for (let index = 1; index <= candidates; index += 1) {
    sh(root, "checkout", "-q", "-b", `cand/c${index}`, "main");
    writeFileSync(join(root, `c${index}.txt`), `candidate ${index}\n`);
    if (gateable) writeFileSync(join(root, `feature${index}.ts`), `export const name = "feature${index}";\n`);
    sh(root, "add", "-A"); sh(root, "commit", "-q", "-m", `c${index}`);
  }
  sh(root, "checkout", "-q", "main");
  return { root, dispose: () => rmSync(root, { recursive: true, force: true }) };
}

const passGate: LandingGateRunner = async (worktree, commit) => ({
  kind: "passed", operationId: `op-${commit.slice(0, 8)}`, commandId: `cmd-${commit.slice(0, 8)}`,
  receipt: { system: "forge", ids: { operationId: `op-${commit.slice(0, 8)}`, commandId: `cmd-${commit.slice(0, 8)}`, sha: commit }, raw: { worktree } },
});

test("journey preconditions skip as UNKNOWN, never a pass, without the opt-in", () => {
  const off = journeyPreconditions({}, true);
  assert.equal(off.run, false);
  assert.deepEqual((off as { record: unknown }).record, liveFlowUnknownRecord("LANDING_JOURNEY_NOT_ENABLED"));
  assert.equal((journeyPreconditions({ MW_LIVE_LANDING_JOURNEY: "1" }, false) as { record: { reason: string } }).record.reason, "LIVE_FLOW_FORGE_ABSENT");
  const go = journeyPreconditions({ MW_LIVE_LANDING_JOURNEY: "1" }, true);
  assert.equal(go.run, true);
  // The opt-in is the EXACT string "1": a trimmed, prefix-tolerant or truthy-word compare would admit these.
  for (const value of [undefined, "", "0", "true", "yes", " 1", "1 ", "01"]) {
    const refused = journeyPreconditions({ MW_LIVE_LANDING_JOURNEY: value }, true);
    assert.equal(refused.run, false, `MW_LIVE_LANDING_JOURNEY=${JSON.stringify(value)} must not opt in`);
    assert.deepEqual((refused as { record: unknown }).record, liveFlowUnknownRecord("LANDING_JOURNEY_NOT_ENABLED"), `MW_LIVE_LANDING_JOURNEY=${JSON.stringify(value)}`);
  }
});

test("observeScratchQueue reads the real repository: head, ready candidates and their merge bases, lanes", async () => {
  const repo = scratchRepo(2);
  try {
    const head = sh(repo.root, "rev-parse", "main");
    const seen = await observeScratchQueue(repo.root, ["cand/c1", "cand/c2"], 1);
    assert.equal(seen.head, head);
    assert.equal(seen.lanes, 1);
    assert.equal(seen.basis.revision, head);
    assert.deepEqual(seen.ready.map(candidate => candidate.id), ["cand/c1", "cand/c2"]);
    for (const candidate of seen.ready) assert.equal(candidate.base, head, `${candidate.id} based on the root commit`);
  } finally { repo.dispose(); }
});

test("the native journey lands every candidate through the gate seam with retained ids, every landed commit an ancestor of scratch main", async () => {
  const repo = scratchRepo(3);
  try {
    const report = await runNativeLandingJourney({
      root: repo.root, branches: ["cand/c1", "cand/c2", "cand/c3"], lanes: 1, stepsCap: 12,
      policy: restackFirst, gate: passGate,
    });
    assert.equal(report.schema, "mw.native-landing-journey.v1");
    assert.equal(report.mode, "live");
    assert.equal(report.landed.length, 3, JSON.stringify(report.steps.at(-1)));
    const main = sh(repo.root, "rev-parse", "main");
    for (const landing of report.landed) {
      assert.match(landing.commit, /^[0-9a-f]{40}$/);
      sh(repo.root, "merge-base", "--is-ancestor", landing.commit, main);
      assert.ok(landing.receipt.ids["operationId"], `${landing.candidate}: operation id retained`);
      assert.ok(landing.receipt.ids["commandId"], `${landing.candidate}: command id retained`);
      assert.equal(landing.observation.mode, "live");
      assert.equal(landing.observation.outcome, "observed");
    }
    assert.equal(report.final.head, main, "the report's final head is the real scratch main");
    assert.ok(report.steps.length <= 12);
    assert.equal(report.policy.id, "restack-first");
  } finally { repo.dispose(); }
});

test("a failed gate never lands: the candidate stays un-merged, the event says gate-failed, and nothing is labelled live without a receipt", async () => {
  const repo = scratchRepo(2);
  try {
    const failFirst: LandingGateRunner = async (worktree, commit) =>
      commit.length > 0 && (await observeOnce()) ? { kind: "failed", operationId: `op-f`, commandId: `cmd-f`, receipt: { system: "forge", ids: { operationId: "op-f", commandId: "cmd-f" }, raw: { worktree } } } : passGate(worktree, commit);
    let first = true;
    const observeOnce = async (): Promise<boolean> => { const now = first; first = false; return now; };
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1", "cand/c2"], lanes: 1, stepsCap: 8, policy: restackFirst, gate: failFirst });
    const failures = report.steps.flatMap(step => step.events).filter(event => event.kind === "gate-failed");
    assert.ok(failures.length >= 1, "the failed gate is recorded");
    const failedCandidates = new Set(failures.map(event => event.candidate));
    for (const landing of report.landed) assert.notEqual(landing.commit, "", "landed only with a commit");
    const main = sh(repo.root, "rev-parse", "main");
    for (const landing of report.landed) sh(repo.root, "merge-base", "--is-ancestor", landing.commit, main);
    assert.ok(report.landed.length < 2 || failedCandidates.size > 0);
  } finally { repo.dispose(); }
});

test("the journey refuses to label a fixture result live: a gate answer without native ids is refused, not landed", async () => {
  const repo = scratchRepo(1);
  try {
    const noIds: LandingGateRunner = async worktree => ({ kind: "passed", operationId: "", commandId: "", receipt: { system: "forge", ids: {}, raw: { worktree } } });
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 4, policy: restackFirst, gate: noIds });
    assert.equal(report.landed.length, 0, "nothing landed without a native id");
    assert.ok(report.steps.flatMap(step => step.events).some(event => event.kind === "refused" && event.detail.startsWith("LANDING_WITHOUT_NATIVE_ID_REFUSED")), "the refusal names the missing native id");
    const main = sh(repo.root, "rev-parse", "main");
    assert.equal(report.final.head, main);
  } finally { repo.dispose(); }
});

test("opt-in live: the journey lands real candidates through the real Forge gate with retained native ids", async t => {
  const forge = spawnSync("forge", ["--version"], { encoding: "utf8" });
  const gate = journeyPreconditions(process.env, forge.status === 0);
  if (!gate.run) {
    t.diagnostic(JSON.stringify(gate.record));
    t.skip(`UNKNOWN: ${gate.record.reason}`);
    return;
  }
  const repo = scratchRepo(2, true);
  try {
    const liveGate: LandingGateRunner = async (worktree, commit) => {
      const seen = await verifyExistingCandidate(worktree);
      const native = seen.native as { ids?: { command_id?: string } } | null;
      const commandId = typeof native === "object" && native !== null && typeof native.ids?.command_id === "string" ? native.ids.command_id : "";
      return {
        kind: seen.kind === "passed" ? "passed" : seen.kind === "failed" ? "failed" : "indeterminate",
        operationId: seen.operationId ?? "", commandId,
        receipt: { system: "forge", ids: { operationId: seen.operationId ?? "", commandId, sha: commit }, raw: seen.native },
      };
    };
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1", "cand/c2"], lanes: 1, stepsCap: 8, policy: restackFirst, gate: liveGate });
    t.diagnostic(JSON.stringify({ landed: report.landed.map(l => ({ candidate: l.candidate, commit: l.commit, ids: l.receipt.ids })), final: report.final }));
    const dir = process.env["MW_LIVE_RECORD_DIR"];
    if (dir) writeFileSync(join(dir, "landing-journey-live.json"), JSON.stringify(report, null, 2) + "\n");
    assert.equal(report.landed.length, 2, JSON.stringify(report.steps.flatMap(s => s.events)));
    const main = sh(repo.root, "rev-parse", "main");
    for (const landing of report.landed) {
      sh(repo.root, "merge-base", "--is-ancestor", landing.commit, main);
      assert.match(landing.receipt.ids["operationId"] ?? "", /^op-/);
      assert.match(landing.receipt.ids["commandId"] ?? "", /^cmd_/);
      assert.equal(landing.observation.mode, "live");
    }
  } finally { repo.dispose(); }
});

test("a journey report carries its digest and can be relabelled replay but never back to live; a fixture label is refused", async () => {
  const repo = scratchRepo(1);
  try {
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 4, policy: restackFirst, gate: passGate });
    assert.match(report.reportDigest, /^sha256:[0-9a-f]{64}$/);
    const { reportDigest, ...rest } = report;
    assert.equal(reportDigest, digest(rest), "the digest covers every field but itself");
    const replay = labelJourneyReport(report, "replay");
    assert.equal(replay.mode, "replay");
    assert.equal(replay.sourceDigest, report.reportDigest, "the replay names the live report it came from");
    assert.notEqual(replay.reportDigest, report.reportDigest);
    assert.throws(() => labelJourneyReport(replay, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
    assert.throws(() => labelJourneyReport(report, "fixture"), /EPISODE_MODE_UPGRADE_FORBIDDEN|LABEL_UNSUPPORTED/);
  } finally { repo.dispose(); }
});

test("invalid lanes or steps are refused before any effect, and intents naming unknown candidates or unsupported effects are refused in the record", async () => {
  const repo = scratchRepo(2);
  try {
    await assert.rejects(runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 0, stepsCap: 4, policy: restackFirst, gate: passGate }), /LANDING_JOURNEY_INVALID/);
    await assert.rejects(runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 0, policy: restackFirst, gate: passGate }), /LANDING_JOURNEY_INVALID/);
    const odd = {
      id: "odd-policy", revision: "test-1",
      propose(observation: { readonly basis: { readonly revision: string } }, memory: number) {
        const base = { policyId: "odd-policy", expectedRevision: observation.basis.revision, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [] };
        return {
          intents: [
            { ...base, intentId: "odd:ghost", target: { kind: "candidate", uri: "cand:ghost" }, effect: "land", writeScopes: ["cand:ghost"] },
            { ...base, intentId: "odd:merge", target: { kind: "candidate", uri: "cand:cand/c1" }, effect: "merge", writeScopes: ["cand:cand/c1"] },
          ],
          memory: memory + 1, trace: [],
        };
      },
    };
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1", "cand/c2"], lanes: 2, stepsCap: 1, policy: odd as never, gate: passGate });
    const refusals = report.steps.flatMap(step => step.events).filter(event => event.kind === "refused").map(event => event.detail);
    assert.ok(refusals.some(detail => detail.startsWith("LANDING_JOURNEY_UNKNOWN_CANDIDATE")), JSON.stringify(refusals));
    assert.ok(refusals.some(detail => detail.startsWith("LANDING_JOURNEY_EFFECT_UNSUPPORTED")), JSON.stringify(refusals));
    assert.equal(report.landed.length, 0);
    assert.equal(report.final.head, sh(repo.root, "rev-parse", "main"));
  } finally { repo.dispose(); }
});

test("a candidate that does not rebase cleanly is refused with RESTACK_CONFLICT, the rebase is aborted, and the journey finishes with main untouched by it", async () => {
  const root = mkdtempSync(join(tmpdir(), "mw-landing-conflict-"));
  try {
    sh(root, "init", "-q", "-b", "main"); sh(root, "config", "user.name", "journey"); sh(root, "config", "user.email", "journey@test");
    writeFileSync(join(root, "shared.txt"), "base\n"); sh(root, "add", "-A"); sh(root, "commit", "-q", "-m", "root");
    for (const index of [1, 2]) {
      sh(root, "checkout", "-q", "-b", `cand/c${index}`, "main");
      writeFileSync(join(root, "shared.txt"), `candidate ${index}\n`); sh(root, "add", "-A"); sh(root, "commit", "-q", "-m", `c${index}`);
    }
    sh(root, "checkout", "-q", "main");
    const report = await runNativeLandingJourney({ root, branches: ["cand/c1", "cand/c2"], lanes: 1, stepsCap: 10, policy: restackFirst, gate: passGate });
    assert.equal(report.landed.length, 1, "the first candidate lands; the conflicting second one cannot");
    const events = report.steps.flatMap(step => step.events);
    const conflict = events.find(event => event.kind === "refused" && event.detail.startsWith("RESTACK_CONFLICT"));
    assert.ok(conflict, JSON.stringify(events));
    assert.equal(conflict!.candidate, "cand/c2");
    assert.deepEqual(report.final.refused, ["cand/c2"]);
    assert.deepEqual(report.final.remaining, []);
    assert.ok(report.steps.length < 10, "the journey ends once nothing can land, not at the cap");
    assert.equal(sh(root, "rev-parse", "main"), report.landed[0]!.commit, "main is the landed commit, untouched by the conflicting candidate");
    assert.equal(sh(root, "rev-parse", "cand/c2"), sh(root, "rev-parse", "cand/c2"), "the conflicting branch still resolves (rebase aborted, no mid-rebase state)");
    assert.equal(sh(root, "worktree", "list", "--porcelain").split("\n").filter(line => line.startsWith("worktree ")).length, 1, "no bounded worktree leaks");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

// MechanicalWorkflows-24db (decomposed from s14.14): five guard laws of the native journey that no test pinned.
// Each law is the same-run witness of one mutant (m1 OR-to-AND on the empty-id check, m4 dropped trim, m2 dropped
// ancestry guard, m3 dropped compare-and-swap old value, m5 dropped rejection mapping).

/** A policy that proposes one intent for one candidate on every step; `expectedRevision` defaults to the live basis. */
function oneIntentPolicy(effect: string, candidate: string, expectedRevision?: string) {
  return {
    id: "pin-policy", revision: "pin-1",
    propose(observation: { readonly basis: { readonly revision: string } }, memory: number) {
      return {
        intents: [{
          policyId: "pin-policy", intentId: `pin:${effect}:${candidate}`, expectedRevision: expectedRevision ?? observation.basis.revision,
          claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], readScopes: [],
          writeScopes: [`cand:${candidate}`], target: { kind: "candidate", uri: `cand:${candidate}` }, effect,
        }],
        memory: memory + 1, trace: [],
      };
    },
  } as never;
}

/** Run the journey and return either its report or the error it threw: a guard may refuse by report or by throw, never by moving main. */
async function runCapturing(input: Parameters<typeof runNativeLandingJourney>[0]): Promise<{ readonly report: NativeLandingReport | null; readonly error: unknown }> {
  try { return { report: await runNativeLandingJourney(input), error: null }; } catch (error) { return { report: null, error }; }
}

test("a passed gate answer missing EITHER native id, on either side, or carrying only whitespace ids, is refused and never lands", async () => {
  const cases: ReadonlyArray<readonly [string, string, string]> = [
    ["operation id only", "op-1", ""],
    ["command id only", "", "cmd-1"],
    ["whitespace operation id", "   ", "cmd-1"],
    ["whitespace command id", "op-1", "\t "],
    ["single-space ids both sides", " ", " "],
  ];
  for (const [label, operationId, commandId] of cases) {
    const repo = scratchRepo(1);
    try {
      const before = sh(repo.root, "rev-parse", "main");
      const gate: LandingGateRunner = async worktree => ({ kind: "passed", operationId, commandId, receipt: { system: "forge", ids: { operationId, commandId }, raw: { worktree } } });
      const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 1, policy: restackFirst, gate });
      const events = report.steps.flatMap(step => step.events);
      assert.equal(report.landed.length, 0, `${label}: nothing lands`);
      assert.ok(events.some(event => event.kind === "refused" && event.candidate === "cand/c1" && event.detail.startsWith("LANDING_WITHOUT_NATIVE_ID_REFUSED")), `${label}: ${JSON.stringify(events)}`);
      assert.equal(sh(repo.root, "rev-parse", "main"), before, `${label}: main did not move`);
      assert.deepEqual(report.final.remaining, ["cand/c1"], `${label}: the candidate keeps waiting`);
    } finally { repo.dispose(); }
  }
});

test("a land over a candidate cut before main advanced never moves main to a non-descendant: the advance commit stays reachable", async () => {
  const repo = scratchRepo(1);
  try {
    sh(repo.root, "commit", "-q", "--allow-empty", "-m", "main-advance");
    const advance = sh(repo.root, "rev-parse", "main");
    const candidate = sh(repo.root, "rev-parse", "cand/c1");
    assert.notEqual(sh(repo.root, "merge-base", "main", "cand/c1"), advance, "the candidate was cut before the advance commit");
    const outcome = await runCapturing({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 1, policy: oneIntentPolicy("land", "cand/c1"), gate: passGate });
    assert.equal(outcome.report?.landed.length ?? 0, 0, "nothing lands");
    assert.equal(sh(repo.root, "rev-parse", "main"), advance, `main is still the advance commit, not ${candidate}`);
    sh(repo.root, "merge-base", "--is-ancestor", advance, "main");
    assert.equal(sh(repo.root, "worktree", "list", "--porcelain").split("\n").filter(line => line.startsWith("worktree ")).length, 1, "no bounded worktree leaks");
  } finally { repo.dispose(); }
});

test("a commit made to main while the gate runs is never overwritten: the landing uses a compare-and-swap on the observed head", async () => {
  const repo = scratchRepo(1);
  try {
    let concurrent = "";
    const racingGate: LandingGateRunner = async (worktree, commit) => {
      sh(repo.root, "commit", "-q", "--allow-empty", "-m", "concurrent-main-commit");
      concurrent = sh(repo.root, "rev-parse", "main");
      return passGate(worktree, commit);
    };
    const outcome = await runCapturing({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 1, policy: restackFirst, gate: racingGate });
    assert.match(concurrent, /^[0-9a-f]{40}$/, "the gate seam ran and committed");
    assert.equal(outcome.report?.landed.length ?? 0, 0, "the stale-basis landing does not land");
    assert.equal(sh(repo.root, "rev-parse", "main"), concurrent, "the concurrent main commit is still main");
  } finally { repo.dispose(); }
});

test("an intent with a stale expected revision is recorded as exactly one refused event carrying the INTENT_BASIS_STALE code", async () => {
  const repo = scratchRepo(1);
  try {
    const before = sh(repo.root, "rev-parse", "main");
    const report = await runNativeLandingJourney({ root: repo.root, branches: ["cand/c1"], lanes: 1, stepsCap: 1, policy: oneIntentPolicy("land", "cand/c1", "stale-revision"), gate: passGate });
    const refused = report.steps.flatMap(step => step.events).filter(event => event.kind === "refused");
    assert.equal(refused.length, 1, JSON.stringify(refused));
    assert.ok(refused[0]!.detail.startsWith("INTENT_BASIS_STALE"), refused[0]!.detail);
    assert.equal(refused[0]!.candidate, "cand/c1");
    assert.equal(report.landed.length, 0);
    assert.equal(sh(repo.root, "rev-parse", "main"), before);
  } finally { repo.dispose(); }
});
