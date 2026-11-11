import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  attachEffectRefs, fileEffectIntentStore, openEffectIntent, parseEffectIntent, readEffectIntent, settleEffectIntent,
  type EffectIntentRecord, type EffectIntentStore,
} from "../dist/effect-intent.js";
import { developLive } from "../dist/live-development.js";
import type { ConnectForge } from "../dist/live-gate.js";

/**
 * MechanicalWorkflows-loexn.7 (M03), EAT-R013: the host persists exactly one effect-intent record before the writer's
 * first side effect, attaches the native agent session, candidate commit/tree and Forge operation id as each is
 * received, and settles it against the committed tree and the gate definition hash; anything else reads uncertain.
 */
const sha = (text: string): string => createHash("sha256").update(text).digest("hex");
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-intent-")));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function commitChange(root: string): string {
  writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
  return git(root, "rev-parse", "HEAD");
}
const connect = (root: string, outcome: "pass" | "fail" | "lost" = "pass"): ConnectForge => () => ({
  async initialize() { return "compatible"; },
  async request() {
    if (outcome === "lost") throw new Error("transport lost after dispatch");
    const head = git(root, "rev-parse", "HEAD");
    const passed = outcome === "pass";
    return { operation_id: "op-" + head.slice(0, 8), terminal_fact: passed ? "completed" : "failed", status: passed ? "success" : "error",
      forge_result: { status: passed ? "success" : "error", envelope: { disposition: passed ? "SUCCEEDED" : "FAILED", gated_commit: head },
        data: { gate_verdict: passed ? "PASS" : "FAIL", gate_passed: passed } } };
  },
  async close() {},
});
/** A store that remembers every write, in order. */
function spyStore(failOn?: number): EffectIntentStore & { writes: EffectIntentRecord[] } {
  const writes: EffectIntentRecord[] = [];
  return { writes, write(record) { if (failOn !== undefined && writes.length + 1 === failOn) throw new Error("disk full"); writes.push(record); } };
}
const agentOf = (root: string, onDispatch?: () => void) => async () => {
  onDispatch?.();
  const commit = commitChange(root);
  void commit;
  return { sessionId: "agent-session-7", summary: "", turns: 1, costUsd: 0 };
};

const GIT = { commit: "a".repeat(40), tree: "b".repeat(40) };
const open = (): EffectIntentRecord => openEffectIntent({ intentId: "intent-1", workspace: "/w", taskSha256: sha("t"), base: GIT, gateDefinitionSha256: sha("forge.toml") });

test("R013 an opened intent reads uncertain with no refs and settles only against the committed tree, the gate definition and a Forge operation", () => {
  const opened = open();
  assert.equal(opened.disposition, "uncertain");
  assert.equal(opened.settlement, null);
  const withRefs = attachEffectRefs(attachEffectRefs(opened, { agentSessionId: "s-1" }), { candidate: { commit: "c".repeat(40), tree: "d".repeat(40) } });
  const settled = settleEffectIntent(withRefs, { verdict: "passed", verifiedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" });
  assert.equal(settled.disposition, "settled");
  assert.deepEqual(settled.settlement, { verdict: "passed", committedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" });
  assert.deepEqual(parseEffectIntent(JSON.stringify(settled)), settled);
});

type Observed = Parameters<typeof settleEffectIntent>[1];
for (const [label, observed] of ([
  ["a gate that verified a different tree", { verdict: "passed" as const, verifiedTree: "e".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" }],
  ["a gate run under a different gate definition", { verdict: "passed" as const, verifiedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml changed"), forgeOperationId: "op-1" }],
  ["a gate with no native Forge operation id", { verdict: "passed" as const, verifiedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: null }],
  ["an unknown gate verdict", { verdict: "unknown" as const, verifiedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" }],
] as Array<[string, Observed]>)) {
  test("R013 " + label + " leaves the record uncertain, never settled by status alone", () => {
    const withRefs = attachEffectRefs(open(), { candidate: { commit: "c".repeat(40), tree: "d".repeat(40) } });
    const result = settleEffectIntent(withRefs, observed);
    assert.equal(result.disposition, "uncertain");
    assert.equal(result.settlement, null);
    assert.equal(result.candidate?.commit, "c".repeat(40), "the candidate ref is kept");
  });
}
test("R013 a settlement with no attached candidate stays uncertain", () => {
  assert.equal(settleEffectIntent(open(), { verdict: "passed", verifiedTree: "d".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" }).disposition, "uncertain");
});

test("R013 attaching a different ref over one already held refuses with EFFECT_INTENT_REF_CONFLICT", () => {
  const held = attachEffectRefs(open(), { agentSessionId: "s-1", forgeOperationId: "op-1", candidate: { commit: "c".repeat(40), tree: "d".repeat(40) } });
  assert.doesNotThrow(() => attachEffectRefs(held, { agentSessionId: "s-1" }));
  for (const refs of [{ agentSessionId: "s-2" }, { forgeOperationId: "op-2" }, { candidate: { commit: "f".repeat(40), tree: "d".repeat(40) } }]) {
    assert.throws(() => attachEffectRefs(held, refs), /EFFECT_INTENT_REF_CONFLICT/);
  }
});

test("R013 a persisted record that is malformed or claims settlement without the bound tree and gate hash refuses with EFFECT_INTENT_INVALID", () => {
  assert.throws(() => parseEffectIntent("not json"), /EFFECT_INTENT_INVALID/);
  assert.throws(() => parseEffectIntent(JSON.stringify({ ...open(), schema: "other" })), /EFFECT_INTENT_INVALID/);
  assert.throws(() => parseEffectIntent(JSON.stringify({ ...open(), disposition: "settled" })), /EFFECT_INTENT_INVALID.*bind the committed candidate tree/);
  const withRefs = attachEffectRefs(open(), { candidate: { commit: "c".repeat(40), tree: "d".repeat(40) } });
  const forged = { ...withRefs, disposition: "settled", settlement: { verdict: "passed", committedTree: "9".repeat(40), gateDefinitionSha256: sha("forge.toml"), forgeOperationId: "op-1" } };
  assert.throws(() => parseEffectIntent(JSON.stringify(forged)), /EFFECT_INTENT_INVALID/);
  assert.throws(() => parseEffectIntent(JSON.stringify({ ...open(), settlement: forged.settlement })), /EFFECT_INTENT_INVALID/);
});

test("R013 reading a record that does not exist refuses with EFFECT_INTENT_UNREADABLE", () => {
  assert.throws(() => readEffectIntent(join(tmpdir(), "mechanical-intent-absent-" + process.pid + ".json")), /EFFECT_INTENT_UNREADABLE/);
});

test("R013 developLive persists exactly one intent record before the writer dispatches (spy fails if the writer runs first)", () => withRepo(async root => {
  const store = spyStore();
  let writesAtDispatch = -1;
  const result = await developLive(root, "Change parser", {
    effectIntent: store, effectIntentId: "intent-ordered",
    agent: agentOf(root, () => { writesAtDispatch = store.writes.length; assert.ok(store.writes.length >= 1, "no intent record existed when the writer ran"); }),
    connectForge: connect(root),
  });
  assert.equal(writesAtDispatch, 1, "exactly the one opening record preceded the writer");
  assert.equal(store.writes[0]!.disposition, "uncertain");
  assert.equal(store.writes[0]!.agentSessionId, null);
  assert.equal(store.writes[0]!.candidate, null);
  assert.deepEqual(new Set(store.writes.map(w => w.intentId)), new Set(["intent-ordered"]), "one intent identity across every write");
  assert.deepEqual(result.effectIntent, store.writes.at(-1));
}));

test("R013 a failed intent write refuses with EFFECT_INTENT_NOT_RECORDED and the writer never dispatches", () => withRepo(async root => {
  let dispatched = 0;
  const before = git(root, "rev-parse", "HEAD");
  await assert.rejects(() => developLive(root, "Change parser", {
    effectIntent: spyStore(1), agent: agentOf(root, () => { dispatched++; }), connectForge: connect(root),
  }), /EFFECT_INTENT_NOT_RECORDED.*writer was not dispatched/);
  assert.equal(dispatched, 0);
  assert.equal(git(root, "rev-parse", "HEAD"), before);
}));

test("R013 a passing run settles the record bound to the exact committed tree, the gate definition hash and the Forge operation", () => withRepo(async root => {
  const store = spyStore();
  const result = await developLive(root, "Change parser", { effectIntent: store, agent: agentOf(root), connectForge: connect(root) });
  const head = git(root, "rev-parse", "HEAD");
  const record = result.effectIntent!;
  assert.equal(record.disposition, "settled");
  assert.equal(record.agentSessionId, "agent-session-7");
  assert.deepEqual(record.candidate, { commit: head, tree: git(root, "rev-parse", "HEAD^{tree}") });
  assert.equal(record.forgeOperationId, "op-" + head.slice(0, 8));
  assert.deepEqual(record.settlement, { verdict: "passed", committedTree: git(root, "rev-parse", "HEAD^{tree}"), gateDefinitionSha256: result.gateManifestSha256, forgeOperationId: "op-" + head.slice(0, 8) });
  assert.equal(record.gateDefinitionSha256, result.gateManifestSha256);
  assert.equal(record.base.commit, git(root, "rev-parse", "HEAD~1"));
  assert.ok(store.writes.length >= 4, "open, session, candidate, forge operation, settlement");
}));

test("R013 a failing gate on the committed candidate settles with verdict failed and the same bindings", () => withRepo(async root => {
  const result = await developLive(root, "Change parser", { effectIntent: spyStore(), agent: agentOf(root), connectForge: connect(root, "fail") });
  assert.equal(result.effectIntent?.disposition, "settled");
  assert.equal(result.effectIntent?.settlement?.verdict, "failed");
  assert.equal(result.effectIntent?.settlement?.committedTree, git(root, "rev-parse", "HEAD^{tree}"));
}));

test("R013 a lost gate acknowledgement leaves the record uncertain with the session and candidate commit attached", () => withRepo(async root => {
  const store = spyStore();
  await assert.rejects(() => developLive(root, "Change parser", { effectIntent: store, agent: agentOf(root), connectForge: connect(root, "lost") }));
  const last = store.writes.at(-1)!;
  assert.equal(last.disposition, "uncertain");
  assert.equal(last.settlement, null);
  assert.equal(last.agentSessionId, "agent-session-7");
  assert.equal(last.candidate?.commit, git(root, "rev-parse", "HEAD"));
}));

test("R013 a record update that fails after the writer dispatched surfaces EFFECT_INTENT_UPDATE_FAILED", () => withRepo(async root => {
  await assert.rejects(() => developLive(root, "Change parser", { effectIntent: spyStore(2), agent: agentOf(root), connectForge: connect(root) }), /EFFECT_INTENT_UPDATE_FAILED.*still reads uncertain/);
}));

test("R013 without an effectIntent store no record is made and the result carries none", () => withRepo(async root => {
  const result = await developLive(root, "Change parser", { agent: agentOf(root), connectForge: connect(root) });
  assert.equal(Object.hasOwn(result, "effectIntent"), false);
}));

test("R013 a run killed after the candidate commit is read by a fresh process as uncertain with the commit sha", () => {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-intent-kill-")));
  try {
    const file = join(dir, "intent.json");
    const module = new URL("../dist/effect-intent.js", import.meta.url).href;
    const commit = "c".repeat(40), tree = "d".repeat(40);
    const script = `import { fileEffectIntentStore, openEffectIntent, attachEffectRefs } from ${JSON.stringify(module)};
      const store = fileEffectIntentStore(${JSON.stringify(file)});
      let record = openEffectIntent({ intentId: "intent-killed", workspace: "/w", taskSha256: ${JSON.stringify(sha("t"))}, base: { commit: "a".repeat(40), tree: "b".repeat(40) }, gateDefinitionSha256: ${JSON.stringify(sha("forge.toml"))} });
      store.write(record);
      record = attachEffectRefs(record, { agentSessionId: "agent-session-killed", candidate: { commit: ${JSON.stringify(commit)}, tree: ${JSON.stringify(tree)} } });
      store.write(record);
      process.kill(process.pid, "SIGKILL");`;
    const child = spawnSync(process.execPath, ["--input-type=module", "-e", script], { encoding: "utf8" });
    assert.equal(child.signal, "SIGKILL", "the child died by kill, not by a clean exit: " + child.stderr);
    const record = readEffectIntent(file);
    assert.equal(record.disposition, "uncertain");
    assert.equal(record.candidate?.commit, commit);
    assert.equal(record.agentSessionId, "agent-session-killed");
    assert.equal(record.settlement, null);
    assert.equal(readFileSync(file, "utf8").endsWith("\n"), true);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("R013 the file store replaces one record atomically and leaves no temp file", () => {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "mechanical-intent-store-")));
  try {
    const file = join(dir, "nested", "intent.json");
    const store = fileEffectIntentStore(file);
    store.write(open());
    store.write(attachEffectRefs(open(), { agentSessionId: "s-1" }));
    assert.equal(readEffectIntent(file).agentSessionId, "s-1");
    assert.deepEqual(spawnSync("ls", ["-A", join(dir, "nested")], { encoding: "utf8" }).stdout.trim().split("\n"), ["intent.json"]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
