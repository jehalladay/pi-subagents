import test from "node:test";
import assert from "node:assert/strict";
import { developCli } from "../dist/live-develop-cli.js";
import type { LiveDevelopmentResult } from "../dist/live-development.js";

// developCli maps LiveDevelopmentResult.workflow.kind to the process exit after it writes the
// bare result line to stdout. The development call arrives through an injectable seam, so each leg
// runs on a canned result without a Claude session, a git repository, Beads or Forge. The --task
// path touches no filesystem before the seam, which keeps the fake free of a workspace.
type Develop = NonNullable<Parameters<typeof developCli>[1]>;
type DevelopArgs = Parameters<Develop>;

const candidate = { basis: { workspaceId: "w", revision: "b".repeat(40) }, evidence: { system: "git", kind: "commit", id: "b".repeat(40) } };
const verification = { kind: "passed" };
function result(workflow: unknown): LiveDevelopmentResult {
  return { mode: "live-claude-forge", discovery: "git-tracked-files", context: "plain-task-context", workflow, agent: null, forge: null } as unknown as LiveDevelopmentResult;
}

async function run(args: readonly string[], res: LiveDevelopmentResult): Promise<{ code: number; stdout: string; calls: DevelopArgs[] }> {
  const calls: DevelopArgs[] = [];
  const develop: Develop = async (...a: DevelopArgs) => { calls.push(a); return res; };
  const written: string[] = [];
  const original = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => { written.push(String(chunk)); return true; }) as typeof process.stdout.write;
  let code: number;
  try { code = await developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...args], develop); }
  finally { process.stdout.write = original; }
  return { code, stdout: written.join(""), calls };
}

test("verified_candidate exits 0", async () => {
  const r = await run([], result({ kind: "verified_candidate", candidate, verification }));
  assert.equal(r.code, 0);
});

test("verification_failed exits 1", async () => {
  const r = await run([], result({ kind: "verification_failed", candidate, verification: { kind: "failed" } }));
  assert.equal(r.code, 1);
});

test("needs_evidence exits 3", async () => {
  const r = await run([], result({ kind: "needs_evidence", scope: {}, reason: "SCOPE_INCOMPLETE" }));
  assert.equal(r.code, 3);
});

test("indeterminate exits 3", async () => {
  const r = await run([], result({ kind: "indeterminate", reason: "AGENT_FAULT" }));
  assert.equal(r.code, 3);
});

test("stdout is the bare result serialized with one trailing newline and no mode envelope", async () => {
  const res = result({ kind: "verified_candidate", candidate, verification });
  const r = await run([], res);
  assert.equal(r.stdout, JSON.stringify(res) + "\n");
  assert.equal(Object.hasOwn(JSON.parse(r.stdout) as object, "result"), false);
});

test("the result line is written for the failing and the evidence-needed legs as well", async () => {
  for (const workflow of [
    { kind: "verification_failed", candidate, verification: { kind: "failed" } },
    { kind: "needs_evidence", scope: {}, reason: "SCOPE_INCOMPLETE" },
    { kind: "indeterminate", reason: "AGENT_FAULT" },
  ]) {
    const res = result(workflow);
    const r = await run([], res);
    assert.equal(r.stdout, JSON.stringify(res) + "\n", workflow.kind);
  }
});

test("defaults hand the seam the workspace, the task, forge and plain context, and no reviewer or model", async () => {
  const r = await run([], result({ kind: "verified_candidate", candidate, verification }));
  assert.equal(r.calls.length, 1);
  const [root, task, options] = r.calls[0] as DevelopArgs;
  assert.equal(root, "/ws");
  assert.equal(task, "t");
  assert.equal(options?.forgeExecutable, "forge");
  assert.equal(options?.contextMode, "plain");
  assert.equal(options?.reviewer, undefined);
  assert.equal(Object.hasOwn(options ?? {}, "reviewer"), false);
  assert.equal(Object.hasOwn(options ?? {}, "model"), false);
});

test("--forge-bin overrides the forge executable", async () => {
  const r = await run(["--forge-bin", "/opt/forge"], result({ kind: "verified_candidate", candidate, verification }));
  assert.equal((r.calls[0] as DevelopArgs)[2]?.forgeExecutable, "/opt/forge");
});

test("--context-mode rf with --model hands contextMode rf and the model", async () => {
  const r = await run(["--context-mode", "rf", "--model", "M"], result({ kind: "verified_candidate", candidate, verification }));
  const options = (r.calls[0] as DevelopArgs)[2];
  assert.equal(options?.contextMode, "rf");
  assert.equal(options?.model, "M");
});

test("--model alone keeps plain context and still reaches the seam", async () => {
  const r = await run(["--model", "M"], result({ kind: "verified_candidate", candidate, verification }));
  const options = (r.calls[0] as DevelopArgs)[2];
  assert.equal(options?.contextMode, "plain");
  assert.equal(options?.model, "M");
});

test("--review hands a reviewer function and its absence hands none", async () => {
  const withReview = await run(["--review"], result({ kind: "verified_candidate", candidate, verification }));
  assert.equal(typeof (withReview.calls[0] as DevelopArgs)[2]?.reviewer, "function");
  const without = await run([], result({ kind: "verified_candidate", candidate, verification }));
  assert.equal((without.calls[0] as DevelopArgs)[2]?.reviewer, undefined);
});
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { claimBeadsWork } from "../dist/beads-claim.js";
import { readBeadsRequest } from "../dist/beads-host.js";
import type { BdExecutor } from "../dist/beads-host.js";
type Beads = NonNullable<Parameters<typeof developCli>[2]>;
function git(root: string, ...argv: string[]): string { const p = spawnSync("git", ["-C", root, ...argv], { encoding: "utf8" }); assert.equal(p.status, 0, p.stderr); return p.stdout.trim(); }
async function workspace<T>(fn: (root: string, head: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mw-develop-cli-"));
  try {
    git(root, "init", "-q"); git(root, "config", "user.name", "Test"); git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname="cli"\ntype="code"\nversion="0.1.0"\n'); writeFileSync(join(root, "main.ts"), "export const n=1;\n");
    git(root, "add", "."); git(root, "commit", "-qm", "base");
    return await fn(root, git(root, "rev-parse", "HEAD"));
  } finally { rmSync(root, { recursive: true, force: true }); }
}
test("a Beads claim that moves the committed source is BEADS_CLAIM_SOURCE_CHANGED before the agent, a dirtying claim is refused as unclean, and a clean claim hands the intake task to the seam", () => workspace(async (root, head) => {
  const reads: unknown[][] = []; const claims: unknown[][] = [];
  const read: NonNullable<Beads["read"]> = async (...a) => { reads.push(a); return { task: "Fix from bead" } as never; };
  const develop: Develop = async (...a: DevelopArgs) => { developed.push(a); return result({ kind: "verified_candidate", candidate, verification }); };
  let developed: DevelopArgs[] = [];
  const args = ["--workspace", root, "--bead", "MW-7", "--claim-bead", "--allow-writes"];
  const committing: NonNullable<Beads["claim"]> = async (...a) => { claims.push(a); writeFileSync(join(root, "main.ts"), "export const n=2;\n"); git(root, "add", "main.ts"); git(root, "commit", "-qm", "claim side effect"); return { issueId: "MW-7", status: "in_progress" }; };
  await assert.rejects(() => developCli(args, develop, { read, claim: committing }), (e: unknown) => e instanceof Error && e.message.startsWith("BEADS_CLAIM_SOURCE_CHANGED"));
  assert.deepEqual(developed, []); assert.deepEqual(claims, [[root, "MW-7"]]); assert.deepEqual(reads, [[root, "MW-7", head]]);
  git(root, "reset", "-q", "--hard", head);
  const dirtying: NonNullable<Beads["claim"]> = async () => { writeFileSync(join(root, "main.ts"), "export const n=3;\n"); return { issueId: "MW-7", status: "in_progress" }; };
  await assert.rejects(() => developCli(args, develop, { read, claim: dirtying }), (e: unknown) => e instanceof Error && e.message.startsWith("WORKSPACE_NOT_CLEAN"));
  assert.deepEqual(developed, []);
  git(root, "checkout", "-q", "--", "main.ts");
  const clean: NonNullable<Beads["claim"]> = async () => ({ issueId: "MW-7", status: "in_progress" });
  const original = process.stdout.write; process.stdout.write = (() => true) as typeof process.stdout.write;
  try { assert.equal(await developCli(args, develop, { read, claim: clean }), 0); } finally { process.stdout.write = original; }
  assert.equal(developed.length, 1); assert.equal(developed[0]?.[0], root); assert.equal(developed[0]?.[1], "Fix from bead");
}));
test("a Beads claim that only adds an empty commit moves the basis commit but not the tree and is still BEADS_CLAIM_SOURCE_CHANGED before the agent", () => workspace(async (root, head) => {
  const beforeTree = git(root, "rev-parse", "HEAD^{tree}"); let developed = 0;
  const read: NonNullable<Beads["read"]> = async () => ({ task: "Fix from bead" }) as never;
  const emptyCommit: NonNullable<Beads["claim"]> = async () => { git(root, "commit", "--allow-empty", "-qm", "claim changed revision only"); return { issueId: "MW-7", status: "in_progress" }; };
  const develop: Develop = async () => { developed++; return result({ kind: "verified_candidate", candidate, verification }); };
  const args = ["--workspace", root, "--bead", "MW-7", "--claim-bead", "--allow-writes"];
  await assert.rejects(() => developCli(args, develop, { read, claim: emptyCommit }), (e: unknown) => e instanceof Error && e.message.startsWith("BEADS_CLAIM_SOURCE_CHANGED"));
  assert.notEqual(git(root, "rev-parse", "HEAD"), head); assert.equal(git(root, "rev-parse", "HEAD^{tree}"), beforeTree); assert.equal(developed, 0);
}));

// ---- MechanicalWorkflows-zqrl (CACWC-EAT-R004): the native claim reconciliation gates the agent seam end to end ----
test("a post-claim show that is deferred, closed or owned by another actor refuses BEADS_CLAIM_UNCERTAIN before the agent; in_progress for the claimant proceeds to the agent exactly once", () => workspace(async (root) => {
  let developed = 0;
  const read: NonNullable<Beads["read"]> = async () => ({ task: "Fix from bead" }) as never;
  const develop: Develop = async () => { developed++; return result({ kind: "verified_candidate", candidate, verification }); };
  const args = ["--workspace", root, "--bead", "MW-7", "--claim-bead", "--allow-writes"];
  // The fake bd remembers the --actor of the update call, because the readonly show carries none.
  const claimWith = (showStatus: string, showAssigneeIsActor: boolean): NonNullable<Beads["claim"]> => (dir, id) => {
    let actor = "";
    return claimBeadsWork(dir, id, async (argv) => {
      const updating = argv.includes("update");
      if (updating) actor = argv[argv.indexOf("--actor") + 1] ?? "";
      const row = { id: "MW-7", status: updating ? "in_progress" : showStatus, assignee: updating || showAssigneeIsActor ? actor : "someone-else" };
      return { stdout: JSON.stringify(updating ? row : [row]), stderr: "", exitCode: 0 };
    });
  };
  for (const [status, mine] of [["deferred", true], ["closed", true], ["in_progress", false]] as const) {
    await assert.rejects(() => developCli(args, develop, { read, claim: claimWith(status, mine) }), (e: unknown) => e instanceof Error && e.message.startsWith("BEADS_CLAIM_UNCERTAIN"), `${status}/${String(mine)}`);
    assert.equal(developed, 0);
  }
  const original = process.stdout.write; process.stdout.write = (() => true) as typeof process.stdout.write;
  try { assert.equal(await developCli(args, develop, { read, claim: claimWith("in_progress", true) }), 0); } finally { process.stdout.write = original; }
  assert.equal(developed, 1);
}));

test("a --bead --claim-bead run that ends in verification_failed exits 1 and issues no bd argv containing close, with the native read and claim wired through one recording executor", () => workspace(async (root, head) => {
  const argvs: string[][] = [];
  let claimed = false;
  let actor = "";
  const execute: BdExecutor = (argv) => {
    argvs.push([...argv]);
    if (argv.includes("--actor")) actor = argv[argv.indexOf("--actor") + 1] ?? "";
    const open = { id: "MW-7", title: "Fix from bead", description: "", status: "open" };
    const held = { id: "MW-7", title: "Fix from bead", description: "", status: "in_progress", assignee: actor };
    if (argv.includes("ready")) return { stdout: JSON.stringify([open]), stderr: "", exitCode: 0 };
    if (argv.includes("update")) { claimed = true; return { stdout: JSON.stringify(held), stderr: "", exitCode: 0 }; }
    return { stdout: JSON.stringify([claimed ? held : open]), stderr: "", exitCode: 0 };
  };
  const seams: Beads = { read: (d, id, rev) => readBeadsRequest(d, id, rev, execute), claim: (d, id) => claimBeadsWork(d, id, execute) };
  const developed: DevelopArgs[] = [];
  const develop: Develop = async (...a: DevelopArgs) => { developed.push(a); return result({ kind: "verification_failed", candidate, verification: { kind: "failed" } }); };
  await new Promise<void>((resolve) => setImmediate(resolve)); // let the previous test result flush before process.stdout.write is stubbed
  const original = process.stdout.write; process.stdout.write = (() => true) as typeof process.stdout.write;
  let code: number;
  try { code = await developCli(["--workspace", root, "--bead", "MW-7", "--claim-bead", "--allow-writes"], develop, seams); }
  finally { process.stdout.write = original; }
  assert.equal(code, 1);
  assert.equal(developed.length, 1);
  assert.equal(developed[0]?.[1], "Fix from bead");
  const verbs = argvs.map((argv) => ["ready", "update", "show"].find((verb) => argv.includes(verb)));
  assert.deepEqual(verbs, ["ready", "show", "update", "show"]);
  assert.equal(argvs.some((argv) => argv.includes("close")), false);
  assert.equal(git(root, "rev-parse", "HEAD"), head);
}));

// ---- MechanicalWorkflows-n1ejc.4 (RFCA-MWX05-R001): the runnable journey forwards the landed RF knobs ----
const RF_BASE = ["--context-mode", "rf", "--model", "M"];
const verified = () => result({ kind: "verified_candidate", candidate, verification });
const KNOBS: readonly (readonly [string, string])[] = [["--rf-actor", "agent:x"], ["--rf-session", "rfs_1"], ["--rf-history-limit", "9"], ["--render-idempotency-key", "k1"]];

test("the four RF knobs reach the development call as rfActor, rfSessionId, rfHistoryLimit and renderIdempotencyKey, and the exit mapping holds", async () => {
  const r = await run([...RF_BASE, "--rf-actor", "agent:x", "--rf-session", "rfs_1", "--rf-history-limit", "9", "--render-idempotency-key", "k1"], verified());
  assert.equal(r.code, 0);
  assert.equal(r.calls.length, 1);
  const options = (r.calls[0] as DevelopArgs)[2];
  assert.equal(options?.contextMode, "rf");
  assert.equal(options?.model, "M");
  assert.equal(options?.rfActor, "agent:x");
  assert.equal(options?.rfSessionId, "rfs_1");
  assert.equal(options?.rfHistoryLimit, 9);
  assert.equal(options?.renderIdempotencyKey, "k1");
  const failed = await run([...RF_BASE, "--rf-actor", "agent:x"], result({ kind: "verification_failed", candidate, verification: { kind: "failed" } }));
  assert.equal(failed.code, 1);
});

test("a run without the RF knobs leaves their option keys absent in rf mode as well", async () => {
  const r = await run(RF_BASE, verified());
  const options = (r.calls[0] as DevelopArgs)[2] ?? {};
  for (const key of ["rfActor", "rfSessionId", "rfHistoryLimit", "renderIdempotencyKey"]) assert.equal(Object.hasOwn(options, key), false, key);
});

test("each RF knob without a value, or followed by another flag, refuses INVALID_ARGUMENT before the development call", async () => {
  for (const [flag] of KNOBS) {
    for (const tail of [[], ["--allow-writes"]]) {
      const calls: DevelopArgs[] = [];
      const develop: Develop = async (...a: DevelopArgs) => { calls.push(a); return verified(); };
      await assert.rejects(() => developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...RF_BASE, flag, ...tail], develop), /INVALID_ARGUMENT/, flag + " " + tail.join(" "));
      assert.equal(calls.length, 0, flag);
    }
  }
});

test("--rf-history-limit outside the decimal integers 1..500 refuses INVALID_RF_HISTORY_LIMIT before the development call, and the bounds 1 and 500 pass", async () => {
  for (const bad of ["0", "501", "9x", "-1", "1.5", "0x10", " 9", "09e1"]) {
    let calls = 0;
    const develop: Develop = async () => { calls += 1; return verified(); };
    await assert.rejects(() => developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...RF_BASE, "--rf-history-limit", bad], develop), /INVALID_RF_HISTORY_LIMIT/, bad);
    assert.equal(calls, 0, bad);
  }
  for (const [text, n] of [["1", 1], ["500", 500]] as const) {
    const r = await run([...RF_BASE, "--rf-history-limit", text], verified());
    assert.equal((r.calls[0] as DevelopArgs)[2]?.rfHistoryLimit, n);
  }
});

test("any RF knob with plain context, explicit or default, refuses RF_OPTION_REQUIRES_RF_MODE before the development call; flag order does not matter", async () => {
  for (const [flag, value] of KNOBS) {
    for (const mode of [[], ["--context-mode", "plain"]]) {
      for (const order of ["knob-first", "mode-first"]) {
        let calls = 0;
        const develop: Develop = async () => { calls += 1; return verified(); };
        const knob = [flag, value];
        const argv = order === "knob-first" ? [...knob, ...mode] : [...mode, ...knob];
        await assert.rejects(() => developCli(["--workspace", "/ws", "--task", "t", "--allow-writes", ...argv], develop), /RF_OPTION_REQUIRES_RF_MODE/, flag + " " + mode.join(" ") + " " + order);
        assert.equal(calls, 0, flag);
      }
    }
  }
  // The same knobs pass when --context-mode rf follows them (order independence in the permitted direction).
  const r = await run(["--rf-actor", "agent:x", ...RF_BASE], verified());
  assert.equal((r.calls[0] as DevelopArgs)[2]?.rfActor, "agent:x");
});

test("an RF knob under plain mode refuses before Beads is read, so no bd call precedes the refusal", async () => {
  let reads = 0;
  const read = (async () => { reads += 1; return { task: "x" }; }) as never;
  await assert.rejects(() => developCli(["--workspace", "/ws", "--bead", "MW-7", "--allow-writes", "--rf-actor", "a"], async () => verified(), { read }), /RF_OPTION_REQUIRES_RF_MODE/);
  assert.equal(reads, 0);
});
