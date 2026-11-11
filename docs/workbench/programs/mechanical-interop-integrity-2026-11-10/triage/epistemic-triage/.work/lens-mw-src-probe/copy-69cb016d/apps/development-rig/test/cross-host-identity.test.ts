import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertReplayable, buildInvocationIdentity, differingAxes, HOST_AXES, INVOCATION_AXES, InvocationReplayRefusedError,
  verifyInvocationIdentity, type HostIdentityInput, type InvocationIdentityInput,
} from "../dist/invocation-identity.js";
import { developLive } from "../dist/live-development.js";
import { cleanGitBasis, type ConnectForge } from "../dist/live-gate.js";

/**
 * MechanicalWorkflows-loexn.7 (M03), EAT-R012: the invocation identity covers the cross-host axes beyond the app-local
 * ones (workspace realpath, task, principal/session, Pi invocation id, descriptor and tarball digests, context and
 * evidence profiles, selected gate parameters); a missing axis is explicit and disallows replay with a typed error that
 * names it; index-only, untracked, symlink and submodule source changes never reach a write.
 */
const sha = (text: string): string => createHash("sha256").update(text).digest("hex");
const SDK_NAME = "@anthropic-ai/claude-agent-sdk";
const host: HostIdentityInput = {
  workspaceRealpath: "/work/space", taskSha256: sha("task"), principal: "principal-1/session-1", piInvocationId: "pi-invocation-1",
  descriptorSha256: sha("descriptor"), tarballSha256: sha("tarball"), contextProfile: "rf-profile-1", evidenceProfile: "evidence-profile-1",
  gateParameters: { method: "gate.run", require_complete: true, forgeExecutable: "forge" },
};
const base: InvocationIdentityInput = {
  source: { commit: "a".repeat(40), tree: "b".repeat(40) },
  sdk: { name: SDK_NAME, version: "1.2.3" },
  promptSha256: sha("prompt"), settingsSha256: sha("settings"), gateManifestSha256: sha("forge.toml"),
  skills: [{ path: "AGENTS.md", sha256: sha("agents") }],
  host,
};
const CROSS_HOST = ["workspace", "task", "principal", "piInvocation", "descriptor", "tarball", "contextProfile", "evidenceProfile", "gateParameters"] as const;
const FIELD_OF: Record<typeof CROSS_HOST[number], keyof HostIdentityInput> = {
  workspace: "workspaceRealpath", task: "taskSha256", principal: "principal", piInvocation: "piInvocationId", descriptor: "descriptorSha256",
  tarball: "tarballSha256", contextProfile: "contextProfile", evidenceProfile: "evidenceProfile", gateParameters: "gateParameters",
};

test("R012 the axis list names every cross-host axis beside the six app-local ones", () => {
  assert.deepEqual([...HOST_AXES], [...CROSS_HOST]);
  assert.deepEqual([...INVOCATION_AXES], ["source", "sdk", "prompt", "settings", "gateManifest", "skills", ...CROSS_HOST]);
  const id = buildInvocationIdentity(base);
  assert.equal(id.complete, true);
  assert.deepEqual(id.missingAxes, []);
  assert.equal(new Set(INVOCATION_AXES.map(a => id.axes[a])).size, INVOCATION_AXES.length, "no two axes share a digest");
  assert.deepEqual(verifyInvocationIdentity(id), []);
});

for (const axis of CROSS_HOST) {
  test("R012 a one-byte mutation of the " + axis + " axis changes the identity digest and names that axis", () => {
    const field = FIELD_OF[axis];
    const original = host[field];
    const mutated = typeof original === "string" ? original + "x" : { ...(original as Record<string, unknown>), require_complete: false };
    const a = buildInvocationIdentity(base);
    const b = buildInvocationIdentity({ ...base, host: { ...host, [field]: mutated } });
    assert.notEqual(a.identitySha256, b.identitySha256);
    assert.deepEqual(differingAxes(a, b), [axis]);
    assert.deepEqual(verifyInvocationIdentity(b), []);
  });
  test("R012 a missing " + axis + " axis is explicit, incomplete and refuses replay naming the axis", () => {
    const id = buildInvocationIdentity({ ...base, host: { ...host, [FIELD_OF[axis]]: null } });
    assert.equal(id.complete, false);
    assert.deepEqual(id.missingAxes, [axis]);
    assert.notEqual(id.identitySha256, buildInvocationIdentity(base).identitySha256);
    assert.throws(() => assertReplayable(id), (error: unknown) => {
      assert.ok(error instanceof InvocationReplayRefusedError);
      assert.equal(error.code, "INVOCATION_REPLAY_AXIS_MISSING");
      assert.deepEqual(error.axes, [axis]);
      assert.match(error.message, new RegExp("INVOCATION_REPLAY_AXIS_MISSING.*" + axis));
      return true;
    });
  });
}

test("R012 a record that claims completeness while an axis input is blank still refuses replay (tampered flag)", () => {
  const id = buildInvocationIdentity({ ...base, host: { ...host, piInvocationId: "   " } });
  const forged = { ...id, complete: true, missingAxes: [] };
  assert.throws(() => assertReplayable(forged), (error: unknown) => error instanceof InvocationReplayRefusedError && error.axes.join() === "piInvocation");
});

test("R012 a complete identity is replayable and an identity without a host block is wholly incomplete", () => {
  assert.doesNotThrow(() => assertReplayable(buildInvocationIdentity(base)));
  const { host: _omitted, ...appLocal } = base;
  const legacy = buildInvocationIdentity(appLocal);
  assert.equal(legacy.complete, false);
  assert.deepEqual(legacy.missingAxes, [...CROSS_HOST]);
  assert.throws(() => assertReplayable(legacy), InvocationReplayRefusedError);
});

// ---- source changes during async preflight: a refusal before any write ----
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, "-c", "protocol.file.allow=always", ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
function newRepo(): string {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-m03-")));
  git(root, "init", "-q");
  git(root, "config", "user.name", "Test Developer");
  git(root, "config", "user.email", "test@example.invalid");
  writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
  writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
  writeFileSync(join(root, "AGENTS.md"), "agent rules\n");
  symlinkSync("main.ts", join(root, "link.ts"));
  git(root, "add", ".");
  git(root, "commit", "-qm", "base");
  return root;
}
const connect = (root: string): ConnectForge => () => ({
  async initialize() { return "compatible"; },
  async request() {
    const head = git(root, "rev-parse", "HEAD");
    return { operation_id: "op-" + head.slice(0, 8), terminal_fact: "completed", status: "success",
      forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: head }, data: { gate_verdict: "PASS", gate_passed: true } } };
  },
  async close() {},
});

const SOURCE_CHANGES: Array<[string, (root: string) => void]> = [
  ["index-only (staged, committed nothing)", root => { writeFileSync(join(root, "main.ts"), "export const value = 2;\n"); git(root, "add", "main.ts"); }],
  ["untracked file", root => { writeFileSync(join(root, "stray.ts"), "export {};\n"); }],
  ["symlink retargeted", root => { unlinkSync(join(root, "link.ts")); symlinkSync("AGENTS.md", join(root, "link.ts")); }],
  ["submodule pointer added", root => {
    const sub = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-m03-sub-")));
    try {
      git(sub, "init", "-q"); git(sub, "config", "user.name", "T"); git(sub, "config", "user.email", "t@example.invalid");
      writeFileSync(join(sub, "s.txt"), "s\n"); git(sub, "add", "."); git(sub, "commit", "-qm", "s");
      git(root, "submodule", "add", "-q", sub, "vendor/sub");
    } finally { rmSync(sub, { recursive: true, force: true }); }
  }],
  ["submodule worktree modified", root => {
    const sub = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-m03-sub-")));
    try {
      git(sub, "init", "-q"); git(sub, "config", "user.name", "T"); git(sub, "config", "user.email", "t@example.invalid");
      writeFileSync(join(sub, "s.txt"), "s\n"); git(sub, "add", "."); git(sub, "commit", "-qm", "s");
      git(root, "submodule", "add", "-q", sub, "vendor/sub");
      git(root, "commit", "-qm", "add submodule");
      writeFileSync(join(root, "vendor", "sub", "s.txt"), "changed\n");
    } finally { rmSync(sub, { recursive: true, force: true }); }
  }],
];
for (const [label, change] of SOURCE_CHANGES) {
  test("R012 " + label + " during preflight refuses before any agent write", async () => {
    const root = newRepo();
    try {
      change(root);
      let dispatched = 0;
      await assert.rejects(() => cleanGitBasis(root), /WORKSPACE_NOT_CLEAN/);
      await assert.rejects(() => developLive(root, "Change parser", {
        agent: async () => { dispatched++; return { sessionId: "s", summary: "", turns: 1, costUsd: 0 }; },
        connectForge: connect(root),
      }), /WORKSPACE_NOT_CLEAN/);
      assert.equal(dispatched, 0, "the writer never ran");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
}

// ---- developLive: the host-observable axes are observed, the host-supplied ones are carried, missing ones refuse replay ----
const replayOf = (prompt: string) => ({
  promptSha256: sha(prompt), settingsSha256: sha("settings"), sdk: { name: SDK_NAME, version: "1.2.3" },
  configuration: { allowedTools: ["Read"], permissionMode: "dontAsk", settingSources: [], model: null, maxTurns: 30, maxBudgetUsd: 10 },
});
function commitChange(root: string): void {
  writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
}
const hostSupplied = {
  principal: host.principal, piInvocationId: host.piInvocationId, descriptorSha256: host.descriptorSha256, tarballSha256: host.tarballSha256,
  contextProfile: host.contextProfile, evidenceProfile: host.evidenceProfile,
};

test("R012 developLive observes workspace realpath, task digest and gate parameters and carries the host-supplied axes into one complete identity", async () => {
  const root = newRepo();
  try {
    const result = await developLive(root, "Change parser", {
      hostIdentity: hostSupplied,
      agent: async (_r, prompt) => { commitChange(root); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: replayOf(prompt) }; },
      connectForge: connect(root),
    });
    const id = result.invocation;
    assert.ok(id);
    assert.equal(id.host.workspaceRealpath, realpathSync(root));
    assert.equal(id.host.taskSha256, sha("Change parser"));
    assert.deepEqual(id.host.gateParameters, { method: "gate.run", require_complete: true, forgeExecutable: "forge" });
    assert.equal(id.host.piInvocationId, "pi-invocation-1");
    assert.equal(id.complete, true);
    assert.deepEqual(id.missingAxes, []);
    assert.deepEqual(verifyInvocationIdentity(id), []);
    assert.doesNotThrow(() => assertReplayable(id));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("R012 developLive without host-supplied axes records them missing and the result refuses replay naming them", async () => {
  const root = newRepo();
  try {
    const result = await developLive(root, "Change parser", {
      agent: async (_r, prompt) => { commitChange(root); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: replayOf(prompt) }; },
      connectForge: connect(root),
    });
    assert.deepEqual(result.invocation?.missingAxes, ["principal", "piInvocation", "descriptor", "tarball", "contextProfile", "evidenceProfile"]);
    assert.throws(() => assertReplayable(result.invocation!), InvocationReplayRefusedError);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("R012 a replay request with a missing host axis refuses before the agent dispatches, naming the axis", async () => {
  const root = newRepo();
  try {
    let dispatched = 0;
    await assert.rejects(() => developLive(root, "Change parser", {
      requireReplay: true,
      hostIdentity: { ...hostSupplied, piInvocationId: null },
      agent: async () => { dispatched++; return { sessionId: "s", summary: "", turns: 1, costUsd: 0 }; },
      connectForge: connect(root),
    }), (error: unknown) => error instanceof InvocationReplayRefusedError && error.axes.join() === "piInvocation");
    assert.equal(dispatched, 0);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("R012 a replay request with every host axis present proceeds", async () => {
  const root = newRepo();
  try {
    const result = await developLive(root, "Change parser", {
      requireReplay: true, hostIdentity: hostSupplied,
      agent: async (_r, prompt) => { commitChange(root); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: replayOf(prompt) }; },
      connectForge: connect(root),
    });
    assert.equal(result.invocation?.complete, true);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
