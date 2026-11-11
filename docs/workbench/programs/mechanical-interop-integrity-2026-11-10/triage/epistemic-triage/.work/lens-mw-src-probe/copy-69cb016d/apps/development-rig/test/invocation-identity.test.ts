import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  buildInvocationIdentity, canonicalJson, differingAxes, hashSkillFiles, readSdkIdentity, settingsSha256, verifyInvocationIdentity,
  type InvocationIdentity, type InvocationIdentityInput,
} from "../dist/invocation-identity.js";
import { runClaudeImplementation } from "../dist/claude-implement.js";
import { developLive } from "../dist/live-development.js";
import type { ConnectForge } from "../dist/live-gate.js";

/**
 * EAT-R048 (+EAT-R111) and the degenerate EAT-R049 (+EAT-R112), MechanicalWorkflows-nfv9b.2: the invocation effect-identity
 * record names source basis, installed SDK identity, canonical settings digest and host-named skill digests beside the
 * prompt and gate-manifest digests, and one byte of change in any axis changes the identity and names the axis.
 */
const sha = (text: string | Buffer): string => createHash("sha256").update(text).digest("hex");
const SDK_NAME = "@anthropic-ai/claude-agent-sdk";
const manifest = (version: string): string => JSON.stringify({ name: SDK_NAME, version, main: "sdk.mjs" });
const ok = { type: "result", subtype: "success", session_id: "agent-session-1", result: "changed", num_turns: 1, total_cost_usd: 0.01 };
type Input = { prompt: string; options: Record<string, unknown> };
const loader = (seen?: Input[]) => async () => ({ query: (input: Input) => { seen?.push(input); return (async function* () { yield ok; })(); } });

const base: InvocationIdentityInput = {
  source: { commit: "a".repeat(40), tree: "b".repeat(40) },
  sdk: { name: SDK_NAME, version: "1.2.3" },
  promptSha256: sha("prompt"),
  settingsSha256: sha("settings"),
  gateManifestSha256: sha("forge.toml"),
  skills: [{ path: "AGENTS.md", sha256: sha("agents") }, { path: "skills/a/SKILL.md", sha256: sha("skill-a") }],
  // Cross-host axes (EAT-R012, MechanicalWorkflows-loexn.7) are exercised in cross-host-identity.test.ts; present here so completeness is about the app-local axes.
  host: {
    workspaceRealpath: "/work/space", taskSha256: sha("task"), principal: "principal-1", piInvocationId: "pi-1", descriptorSha256: sha("descriptor"),
    tarballSha256: sha("tarball"), contextProfile: "context-1", evidenceProfile: "evidence-1", gateParameters: { method: "gate.run", require_complete: true },
  },
};
const AXES = ["source", "sdk", "prompt", "settings", "gateManifest", "skills"] as const;
const ALL_AXES = [...AXES, "workspace", "task", "principal", "piInvocation", "descriptor", "tarball", "contextProfile", "evidenceProfile", "gateParameters"] as const;

test("R111(b) a complete record carries every axis, nonempty, and one identity digest over the canonical preimage", () => {
  const id = buildInvocationIdentity(base);
  assert.equal(id.schema, "mechanical.invocation-identity/v1");
  assert.deepEqual(id.source, base.source);
  assert.deepEqual(id.sdk, { name: SDK_NAME, version: "1.2.3" });
  assert.equal(id.promptSha256, base.promptSha256);
  assert.equal(id.settingsSha256, base.settingsSha256);
  assert.equal(id.gateManifestSha256, base.gateManifestSha256);
  assert.deepEqual(id.skills, base.skills);
  assert.deepEqual(Object.keys(id.axes).sort(), [...ALL_AXES].sort());
  for (const axis of ALL_AXES) assert.match(id.axes[axis], /^[0-9a-f]{64}$/, axis);
  assert.match(id.identitySha256, /^[0-9a-f]{64}$/);
  assert.equal(id.complete, true);
  assert.deepEqual(id.missingAxes, []);
  assert.equal(id.identitySha256, sha(canonicalJson({ schema: id.schema, axes: id.axes })));
  assert.equal(new Set([...ALL_AXES.map(a => id.axes[a]), id.identitySha256]).size, ALL_AXES.length + 1, "no two axes share a digest");
});

test("R111(b) an absent SDK identity is recorded as an incomplete axis, never fabricated", () => {
  const id = buildInvocationIdentity({ ...base, sdk: null });
  assert.equal(id.sdk, null);
  assert.equal(id.complete, false);
  assert.deepEqual(id.missingAxes, ["sdk"]);
  assert.notEqual(id.identitySha256, buildInvocationIdentity(base).identitySha256);
});

test("R111(c) key order and whitespace variations of equivalent configuration yield equal settingsSha256", () => {
  const a = JSON.parse('{"allowedTools":["Read","Edit"],"permissionMode":"dontAsk","settingSources":[],"model":null,"maxTurns":30,"maxBudgetUsd":10}');
  const b = JSON.parse('  {\n "maxBudgetUsd" : 10,\n "maxTurns":30, "model":null,\t"settingSources":[ ],\n"permissionMode":"dontAsk","allowedTools":[ "Read" , "Edit" ] }  ');
  assert.equal(settingsSha256(a), settingsSha256(b));
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(canonicalJson({ b: [2, { d: 1, c: null }], a: "x" }), '{"a":"x","b":[2,{"c":null,"d":1}]}');
  assert.notEqual(settingsSha256({ ...a, maxTurns: 31 }), settingsSha256(a));
  assert.notEqual(settingsSha256({ ...a, allowedTools: ["Edit", "Read"] }), settingsSha256(a), "array order is meaning, not noise");
});

test("canonicalJson refuses values with no canonical byte form", () => {
  for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, () => 1, Symbol("s"), 10n]) {
    assert.throws(() => canonicalJson({ v: bad }), /INVOCATION_IDENTITY_NOT_CANONICAL/, String(typeof bad));
  }
});

test("R111(a) identical inputs hashed from two distinct checkout paths produce identical settings digests and no path leaks", async () => {
  const one = await runClaudeImplementation("/checkout/one/root", "Fix parser", {}, loader(), async () => manifest("1.2.3"));
  const two = await runClaudeImplementation("/very/other/checkout/two", "Fix parser", {}, loader(), async () => manifest("1.2.3"));
  assert.equal(one.replay?.settingsSha256, two.replay?.settingsSha256);
  assert.equal(one.replay?.settingsSha256, settingsSha256(one.replay!.configuration));
  assert.deepEqual(one.replay, two.replay);
  assert.doesNotMatch(JSON.stringify(one.replay), /checkout/);
});

test("the SDK axis is read from the installed manifest bytes at load time, never a literal", async () => {
  const a = await runClaudeImplementation("/r", "p", {}, loader(), async () => manifest("1.2.3"));
  const b = await runClaudeImplementation("/r", "p", {}, loader(), async () => manifest("9.9.9-rc.1"));
  assert.deepEqual(a.replay?.sdk, { name: SDK_NAME, version: "1.2.3" });
  assert.deepEqual(b.replay?.sdk, { name: SDK_NAME, version: "9.9.9-rc.1" });
  const absent = await runClaudeImplementation("/r", "p", {}, loader(), async () => null);
  assert.equal(absent.replay?.sdk, null);
  assert.match(absent.replay?.settingsSha256 ?? "", /^[0-9a-f]{64}$/);
});

test("a manifest that cannot name the SDK and a version is refused before the query dispatches", async () => {
  const bad = ["not json", "[]", "null", JSON.stringify({ name: "other-sdk", version: "1.0.0" }), JSON.stringify({ name: SDK_NAME }),
    JSON.stringify({ name: SDK_NAME, version: "" }), JSON.stringify({ name: SDK_NAME, version: "  " }), JSON.stringify({ name: SDK_NAME, version: 3 })];
  for (const text of bad) {
    const seen: Input[] = [];
    await assert.rejects(() => runClaudeImplementation("/r", "p", {}, loader(seen), async () => text), /CLAUDE_AGENT_SDK_MANIFEST_INVALID/, text);
    assert.equal(seen.length, 0, "no query for " + text);
  }
  assert.deepEqual(readSdkIdentity(manifest("0.0.1")), { name: SDK_NAME, version: "0.0.1" });
});

test("an SDK that cannot load keeps the existing not-installed refusal and never reaches the manifest reader", async () => {
  let reads = 0;
  await assert.rejects(() => runClaudeImplementation("/r", "p", {}, async () => { throw new Error("nope"); }, async () => { reads++; return manifest("1.0.0"); }), /CLAUDE_AGENT_SDK_NOT_INSTALLED/);
  assert.equal(reads, 0);
});

function flipped(input: InvocationIdentityInput, axis: typeof AXES[number]): InvocationIdentityInput {
  switch (axis) {
    case "source": return { ...input, source: { ...input.source, tree: "b".repeat(39) + "c" } };
    case "sdk": return { ...input, sdk: { name: SDK_NAME, version: "1.2.4" } };
    case "prompt": return { ...input, promptSha256: sha("prompt.") };
    case "settings": return { ...input, settingsSha256: sha("settings.") };
    case "gateManifest": return { ...input, gateManifestSha256: sha("forge.toml.") };
    case "skills": return { ...input, skills: [input.skills[0]!, { path: "skills/a/SKILL.md", sha256: sha("skill-a.") }] };
  }
}

test("R049 a one-byte change on any one axis changes the identity digest and names exactly that axis", () => {
  const reference = buildInvocationIdentity(base);
  for (const axis of AXES) {
    const changed = buildInvocationIdentity(flipped(base, axis));
    assert.notEqual(changed.identitySha256, reference.identitySha256, axis);
    assert.deepEqual(differingAxes(reference, changed), [axis], axis);
    for (const other of AXES.filter(a => a !== axis)) assert.equal(changed.axes[other], reference.axes[other], axis + " leaves " + other);
  }
  assert.deepEqual(differingAxes(reference, buildInvocationIdentity(base)), []);
  const reordered = buildInvocationIdentity({ ...base, skills: [base.skills[1]!, base.skills[0]!] });
  assert.deepEqual(differingAxes(reference, reordered), ["skills"], "skill order is part of the enumeration");
});

test("R111(f) every recorded digest recomputes from the recorded inputs, and a tampered digest is named", () => {
  const id = buildInvocationIdentity(base);
  assert.deepEqual(verifyInvocationIdentity(JSON.parse(JSON.stringify(id))), []);
  for (const axis of AXES) {
    const tampered = JSON.parse(JSON.stringify(id)) as { axes: Record<string, string> };
    tampered.axes[axis] = "0".repeat(64);
    assert.deepEqual(verifyInvocationIdentity(tampered as unknown as InvocationIdentity), [axis], axis);
  }
  const wrongRoot = JSON.parse(JSON.stringify(id)) as { identitySha256: string };
  wrongRoot.identitySha256 = "1".repeat(64);
  assert.deepEqual(verifyInvocationIdentity(wrongRoot as InvocationIdentity), ["identity"]);
  const edited = JSON.parse(JSON.stringify(id)) as { promptSha256: string };
  edited.promptSha256 = sha("other");
  assert.deepEqual(verifyInvocationIdentity(edited as InvocationIdentity), ["prompt", "identity"], "an edited input disagrees with its recorded axis digest and the recorded identity");
});

function scratch(): string { return mkdtempSync(join(tmpdir(), "mechanical-invid-")); }
test("host-named skill files hash their bytes in the supplied order; the default enumeration is empty", () => {
  const root = scratch();
  try {
    mkdirSync(join(root, "skills", "a"), { recursive: true });
    writeFileSync(join(root, "AGENTS.md"), "agents\n");
    writeFileSync(join(root, "skills", "a", "SKILL.md"), "skill a\n");
    assert.deepEqual(hashSkillFiles(root, []), []);
    assert.deepEqual(hashSkillFiles(root, ["skills/a/SKILL.md", "AGENTS.md"]), [
      { path: "skills/a/SKILL.md", sha256: sha("skill a\n") }, { path: "AGENTS.md", sha256: sha("agents\n") }]);
    writeFileSync(join(root, "AGENTS.md"), "agents!\n");
    assert.equal(hashSkillFiles(root, ["AGENTS.md"])[0]!.sha256, sha("agents!\n"));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("skill paths must be relative, inside the root, unique and readable regular files", () => {
  const root = scratch();
  try {
    writeFileSync(join(root, "AGENTS.md"), "agents\n");
    mkdirSync(join(root, "dir"));
    writeFileSync(join(root, "..", "mechanical-invid-outside-" + process.pid), "x");
    symlinkSync(join(root, "..", "mechanical-invid-outside-" + process.pid), join(root, "link.md"));
    for (const bad of ["/etc/hostname", "../x", "a/../../x", "", "  ", "C:\\x", "AGENTS.md\0"]) {
      assert.throws(() => hashSkillFiles(root, [bad]), /INVOCATION_IDENTITY_SKILL_PATH_INVALID/, JSON.stringify(bad));
    }
    assert.throws(() => hashSkillFiles(root, ["AGENTS.md", "AGENTS.md"]), /INVOCATION_IDENTITY_SKILL_DUPLICATE/);
    assert.throws(() => hashSkillFiles(root, ["AGENTS.md", "./AGENTS.md"]), /INVOCATION_IDENTITY_SKILL_DUPLICATE/);
    for (const bad of ["missing.md", "dir", "link.md"]) {
      assert.throws(() => hashSkillFiles(root, [bad]), /INVOCATION_IDENTITY_SKILL_UNREADABLE/, bad);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(join(tmpdir(), "mechanical-invid-outside-" + process.pid), { force: true });
  }
});

// ---- developLive seam ----
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = scratch();
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    writeFileSync(join(root, "AGENTS.md"), "agent rules\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function commitChange(root: string, file = "main.ts", content = "export const value = 2;\n"): string {
  writeFileSync(join(root, file), content);
  git(root, "add", file);
  git(root, "commit", "-qm", "implementation");
  return git(root, "rev-parse", "HEAD");
}
function connect(root: string): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request() {
      const head = git(root, "rev-parse", "HEAD");
      return { operation_id: "op-" + head.slice(0, 8), terminal_fact: "completed", status: "success",
        forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: head }, data: { gate_verdict: "PASS", gate_passed: true } } };
    },
    async close() {},
  });
}
const replayOf = (prompt: string) => ({
  promptSha256: sha(prompt), settingsSha256: sha("settings"), sdk: { name: SDK_NAME, version: "1.2.3" },
  configuration: { allowedTools: ["Read"], permissionMode: "dontAsk", settingSources: [], model: null, maxTurns: 30, maxBudgetUsd: 10 },
});

test("developLive records the invocation identity from the observed clean basis, the agent replay, the gate manifest and the named skills", () => withRepo(async root => {
  const baseCommit = git(root, "rev-parse", "HEAD");
  const baseTree = git(root, "rev-parse", "HEAD^{tree}");
  const result = await developLive(root, "Change parser", {
    skillFiles: ["AGENTS.md"],
    hostIdentity: { principal: "p/s", piInvocationId: "pi-1", descriptorSha256: sha("d"), tarballSha256: sha("t"), contextProfile: "c", evidenceProfile: "e" },
    agent: async (_root, prompt) => {
      // The agent edits a named skill file after dispatch: the recorded digest stays the preflight bytes.
      commitChange(root, "AGENTS.md", "agent rewrote its rules\n");
      return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: replayOf(prompt) };
    },
    connectForge: connect(root),
  });
  const id = result.invocation;
  assert.ok(id, "invocation identity present when the agent reports a replay identity");
  assert.deepEqual(id.source, { commit: baseCommit, tree: baseTree });
  assert.deepEqual(id.sdk, { name: SDK_NAME, version: "1.2.3" });
  assert.equal(id.gateManifestSha256, result.gateManifestSha256);
  assert.equal(id.promptSha256, result.agent?.replay?.promptSha256);
  assert.equal(id.settingsSha256, sha("settings"));
  assert.deepEqual(id.skills, [{ path: "AGENTS.md", sha256: sha("agent rules\n") }]);
  assert.equal(id.complete, true);
  assert.deepEqual(verifyInvocationIdentity(id), []);
}));

test("developLive defaults the skill enumeration to empty and omits the record when the agent reports no replay identity", () => withRepo(async root => {
  const withReplay = await developLive(root, "Change parser", {
    agent: async (_root, prompt) => { commitChange(root); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: replayOf(prompt) }; },
    connectForge: connect(root),
  });
  assert.deepEqual(withReplay.invocation?.skills, []);
  await withRepo(async other => {
    const without = await developLive(other, "Change parser", {
      agent: async () => { commitChange(other); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0 }; },
      connectForge: connect(other),
    });
    assert.equal(Object.hasOwn(without, "invocation"), false, "the host never fabricates an identity the runner did not report");
  });
}));

test("an unreadable named skill file refuses before the agent dispatches", () => withRepo(async root => {
  let dispatched = 0;
  await assert.rejects(() => developLive(root, "Change parser", {
    skillFiles: ["no-such-skill.md"],
    agent: async () => { dispatched++; return { sessionId: "s", summary: "", turns: 1, costUsd: 0 }; },
    connectForge: connect(root),
  }), /INVOCATION_IDENTITY_SKILL_UNREADABLE/);
  assert.equal(dispatched, 0);
}));

// ---- R049 structure guard (degenerate form): no reuse or cache decision keyed on a proper subset of the axes ----
const SUBSET_KEYS = "promptSha256|settingsSha256|gateManifestSha256|sdk|skills|source|tree|commit";
const CACHE_WORD = String.raw`(?:cache|memo|memoi[sz]e|reuse|answers?|seen|replayed)`;
/** Lines that look a reuse/cache store up or down by an expression naming a proper subset of the axes without the whole identity digest. */
function partialKeyReuseSites(text: string): string[] {
  const site = new RegExp(String.raw`\b\w*${CACHE_WORD}\w*\s*(?:\.\s*(?:get|set|has|delete)\s*\(|\[)\s*[^)\]\n]*\b(?:${SUBSET_KEYS})\b`, "i");
  return text.split("\n").filter(line => site.test(line) && !/identitySha256/.test(line));
}
test("R049 guard: no module under src keys a cache or reuse decision on a partial identity", () => {
  const srcDir = new URL("../src/", import.meta.url).pathname;
  const hits: string[] = [];
  for (const name of readdirSync(srcDir).filter(f => f.endsWith(".ts"))) {
    for (const line of partialKeyReuseSites(readFileSync(join(srcDir, name), "utf8"))) hits.push(name + ": " + line.trim());
  }
  assert.deepEqual(hits, []);
});
test("R049 guard mutation witness: a partial-key cache fixture is caught and a whole-identity key is not", () => {
  for (const mutant of [
    "answerCache.set(replay.promptSha256, answer);",
    "const hit = answers.get(identity.gateManifestSha256);",
    "reuse.has(identity.source.tree)",
    "memo[replay.settingsSha256] = result;",
    "if (seenSessions.get(sdk.version)) return;",
  ]) assert.equal(partialKeyReuseSites(mutant).length, 1, mutant);
  for (const clean of [
    "answerCache.set(identity.identitySha256, answer);",
    "const t = tree.get(name);",
    "hashes.set(path, sha256);",
  ]) assert.equal(partialKeyReuseSites(clean).length, 0, clean);
});

test("a runner replay that predates the settings and SDK axes still yields a record: settings recomputed, SDK absent and incomplete", () => withRepo(async root => {
  const legacy = { promptSha256: sha("p"), configuration: replayOf("p").configuration };
  const result = await developLive(root, "Change parser", {
    agent: async () => { commitChange(root); return { sessionId: "s-1", summary: "", turns: 1, costUsd: 0, replay: legacy }; },
    connectForge: connect(root),
  });
  assert.equal(result.invocation?.settingsSha256, settingsSha256(legacy.configuration));
  assert.equal(result.invocation?.sdk, null);
  assert.equal(result.invocation?.complete, false);
  assert.deepEqual(result.invocation?.missingAxes?.slice(0, 1), ["sdk"], "the SDK axis is the app-local gap; the host axes follow when the host states none");
}));
