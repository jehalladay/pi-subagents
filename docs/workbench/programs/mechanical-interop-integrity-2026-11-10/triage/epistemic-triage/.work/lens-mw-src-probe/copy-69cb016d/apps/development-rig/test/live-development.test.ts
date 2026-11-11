import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import { resolveRenderHandoff } from "../dist/rf-context.js";
import type { ConnectForge } from "../dist/live-gate.js";
type Frame = Record<string, unknown>;

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-dev-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), 'export const value = 1;\n');
    git(root, "add", ".");
    git(root, "commit", "-qm", "base");
    return await fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function commitChange(root: string, content = 'export const value = 2;\n'): string {
  writeFileSync(join(root, "main.ts"), content);
  git(root, "add", "main.ts");
  git(root, "commit", "-qm", "implementation");
  return git(root, "rev-parse", "HEAD");
}
function frame(commit: string, status = "success", gate = "PASS"): Frame {
  return {
    operation_id: "op-" + commit.slice(0, 8),
    // Forge's projection: SUCCEEDED -> completed, FAILED -> failed (witnessed live 2026-10-15).
    terminal_fact: status === "success" ? "completed" : "failed",
    status,
    forge_result: {
      status,
      envelope: {
        disposition: status === "success" ? "SUCCEEDED" : "FAILED",
        gated_commit: commit,
      },
      data: { gate_verdict: gate, gate_passed: status === "success" },
    },
  };
}
function forgeConnection(root: string, seen: string[], override: ((head: string) => Frame) | null = null): ConnectForge {
  return () => ({
    async initialize() { seen.push("forge.init"); return "compatible"; },
    async request(method, request) {
      seen.push("forge.gate");
      assert.equal(method, "gate.run");
      assert.equal(request.require_complete, true);
      assert.equal(request.root, root);
      const head = git(root, "rev-parse", "HEAD");
      return override ? override(head) : frame(head);
    },
    async close() { seen.push("forge.close"); },
  });
}
const agentSuccess = { sessionId: "session-42", summary: "Changed parser", turns: 2, costUsd: 0.04 };
test("an injected agent reporting a blank session id never reaches the Forge gate", () => withRepo(async root => {
  // 42 and true exercise the typeof leg: a truthy non-string must be refused typed, not die in .trim().
  for (const sessionId of ["", "   ", "\t", 42 as unknown as string, true as unknown as string]) {
    const seen: string[] = [];
    await assert.rejects(() => developLive(root, "Change parser", {
      agent: async () => { commitChange(root, "export const value = " + JSON.stringify(sessionId) + ";\n"); return { sessionId, summary: "", turns: 1, costUsd: 0 }; },
      connectForge: forgeConnection(root, seen),
    }), /AGENT_SESSION_UNIDENTIFIED/, JSON.stringify(sessionId));
    assert.deepEqual(seen, [], "no Forge request for " + JSON.stringify(sessionId));
    git(root, "reset", "-q", "--hard", "HEAD~1");
  }
  // Positive control: a nonblank session proceeds to exactly one Forge gate request.
  const seen: string[] = [];
  const observed = await developLive(root, "Change parser", {
    agent: async () => { commitChange(root); return { sessionId: "agent-session-1", summary: "", turns: 1, costUsd: 0 }; },
    connectForge: forgeConnection(root, seen),
  });
  assert.equal(observed.workflow.kind, "verified_candidate");
  assert.deepEqual(seen, ["forge.init", "forge.gate", "forge.close"], "exactly one gate request");
}));
test("single-writer flow uses real Git basis, injected agent and native Forge gate", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const seen: string[] = [];
  const result = await developLive(root, "Improve parser", {
    agent: async (cwd, prompt) => {
      seen.push("agent");
      assert.equal(cwd, root);
      assert.match(prompt, /Plain task context \(NOT a ReactiveFiber render\)/);
      assert.match(prompt, /main.ts/);
      assert.match(prompt, /Improve parser/);
      commitChange(root);
      return agentSuccess;
    },
    connectForge: forgeConnection(root, seen),
  });
  assert.equal(result.mode, "live-claude-forge");
  assert.equal(result.discovery, "git-tracked-files");
  assert.equal(result.context, "plain-task-context");
  assert.equal(result.agent?.sessionId, "session-42");
  assert.equal(result.workflow.kind, "verified_candidate");
  assert.equal(result.forge?.kind, "passed");
  assert.deepEqual(seen, ["agent", "forge.init", "forge.gate", "forge.close"]);
  assert.notEqual(base, git(root, "rev-parse", "HEAD"));
  assert.equal(result.workflow.candidate.parentBasis.revision, base);
  assert.equal(result.workflow.verification.basis.revision, git(root, "rev-parse", "HEAD"));
}));
test("no agent commit cannot accidentally invoke Forge verification", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Change parser", {
    agent: async () => agentSuccess,
    connectForge: () => { gates++; throw Error("must not connect"); },
  }), /AGENT_COMMIT_NOT_ESTABLISHED/);
  assert.equal(gates, 0);
}));
test("dirty agent changes require reconciliation before any gate", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Change parser", {
    agent: async () => {
      writeFileSync(join(root, "main.ts"), "uncommitted\n");
      return agentSuccess;
    },
    connectForge: () => { gates++; throw Error("must not connect"); },
  }), /WORKSPACE_NOT_CLEAN/);
  assert.equal(gates, 0);
}));
test("native Forge failure remains a domain verification failure", () => withRepo(async root => {
  const observed = await developLive(root, "Change parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root, [], head => frame(head, "error", "FAIL")),
  });
  assert.equal(observed.workflow.kind, "verification_failed");
  assert.equal(observed.forge?.kind, "failed");
}));
test("gate for a different candidate can never be attributed to our implementation", () => withRepo(async root => {
  const observed = await developLive(root, "Change parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: () => ({
      async initialize() { return "compatible"; },
      async request(_method, _params) {
        // Another actor commits after the agent completed but before Forge preflight.
        // The gate truthfully reports the newer commit. The application must refuse
        // to claim that the original agent candidate was the subject of verification.
        commitChange(root, "export const value = 3;\n");
        return frame(git(root, "rev-parse", "HEAD"));
      },
      async close() {},
    }),
  });
  assert.equal(observed.workflow.kind, "indeterminate");
  assert.notEqual(observed.forge?.kind, "passed");
}));
test("invalid task is rejected before model execution or Forge startup", () => withRepo(async root => {
  let calls = 0;
  await assert.rejects(() => developLive(root, "", {
    agent: async () => { calls++; return agentSuccess; },
    connectForge: () => { calls++; throw Error("must not connect"); },
  }), /MISSING_TASK/);
  assert.equal(calls, 0);
}));

test("agent modification of Forge gate declaration cannot be silently credited", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Weaken tests", {
    agent: async () => {
      writeFileSync(join(root, "forge.toml"),
        '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n[build]\nbackend = "typescript"\n');
      git(root, "add", "forge.toml");
      git(root, "commit", "-qm", "changed gate policy");
      return agentSuccess;
    },
    connectForge: () => { gates++; throw Error("must not connect"); },
  }), /GATE_DEFINITION_CHANGED/);
  assert.equal(gates, 0);
}));

test("an empty commit never becomes a verified candidate", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Implement work", {
    agent: async () => {
      git(root, "commit", "--allow-empty", "-qm", "empty metadata only");
      return agentSuccess;
    },
    connectForge: () => { gates++; throw Error("gate must not run on empty commit"); },
  }), /AGENT_SOURCE_CHANGE_NOT_ESTABLISHED/);
  assert.equal(gates, 0);
}));

test("a changed HEAD whose source tree matches the original cannot be verified", () => withRepo(async root => {
  let gates = 0;
  await assert.rejects(() => developLive(root, "Implement work", {
    agent: async () => {
      commitChange(root, "export const value = 2;\n");
      commitChange(root, "export const value = 1;\n");
      return agentSuccess;
    },
    connectForge: () => { gates++; throw Error("gate must not run on restored source"); },
  }), /AGENT_SOURCE_CHANGE_NOT_ESTABLISHED/);
  assert.equal(gates, 0);
}));

test("agent instructions constrain Git to permitted standalone commands", () => withRepo(async root => {
  const seen: string[] = [];
  await developLive(root, "Make a small change", {
    agent: async (_root, prompt) => {
      assert.match(prompt, /Use the Write or Edit tool to change source files/);
      assert.match(prompt, /separate Bash tool calls/);
      assert.match(prompt, /Do not combine Git commands/);
      assert.match(prompt, /Do not use git switch/);
      commitChange(root);
      return agentSuccess;
    },
    connectForge: forgeConnection(root, seen),
  });
  assert.ok(seen.includes("forge.gate"));
}));

test("explicit RF context route uses native render and never static context",()=>withRepo(async root=>{
 const base=git(root,"rev-parse","HEAD"),seen:string[]=[];
 const out=await developLive(root,"Implement parser",{
  contextMode:"rf",model:"claude-opus-5",
  renderContext:async(cwd,task,revision,model)=>{
   seen.push("rf");assert.equal(cwd,root);assert.equal(revision,base);assert.equal(model,"claude-opus-5");
   return{basis:{workspaceId:root,revision:base},text:"Task: "+task+"\nSource revision: "+base,evidence:{system:"reactive-fiber",kind:"render",id:"rfr-123"},model,availableTokens:100,graphRevision:"graph-1",outputDigest:"sha256:"+"a".repeat(64),rfWorkspaceId:"rfw_1",actor:"agent:camshaft-oe",cli:{version:"0.1.883",sdkVersions:{}}};
  },
  agent:async(_,prompt)=>{seen.push("agent");assert.match(prompt,/Source revision:/);assert.doesNotMatch(prompt,/Plain task context/);commitChange(root);return agentSuccess},
  connectForge:forgeConnection(root,seen),
 });
 assert.equal(out.context,"reactive-fiber");assert.equal(out.contextEvidence?.id,"rfr-123");
 assert.equal(out.workflow.kind,"verified_candidate");assert.deepEqual(seen,["rf","agent","forge.init","forge.gate","forge.close"]);
}));
test("RF route passes the carried session to the render and hands onward only ids; the receiver resolves them through context show",()=>withRepo(async root=>{
 const base=git(root,"rev-parse","HEAD"),seen:string[]=[];let options:Record<string,unknown>={};
 const text="Task: Implement parser\nSource revision: "+base+"\n";
 const out=await developLive(root,"Implement parser",{
  contextMode:"rf",model:"claude-opus-5",rfSessionId:"rfs_carried",rfHistoryLimit:9,
  renderContext:async(_cwd,task,revision,model,_exec,opts)=>{
   options={...opts};
   return{basis:{workspaceId:root,revision:base},text,evidence:{system:"reactive-fiber",kind:"render",id:"rfr-9"},model,availableTokens:100,graphRevision:"graph-1",outputDigest:"sha256:"+"a".repeat(64),rfWorkspaceId:"rfw_1",actor:"agent:camshaft-oe",cli:{version:"0.1.883",sdkVersions:{}},source:"reused",sessionId:"rfs_carried"};
  },
  agent:async()=>{seen.push("agent");commitChange(root);return agentSuccess},
  connectForge:forgeConnection(root,seen),
 });
 assert.equal(options["sessionId"],"rfs_carried");assert.equal(options["historyLimit"],9);
 assert.deepEqual(out.contextHandoff,{renderId:"rfr-9",sessionId:"rfs_carried",evidence:{system:"reactive-fiber",kind:"render",id:"rfr-9"},source:"reused"});
 assert.ok(!JSON.stringify(out.contextHandoff).includes("Implement parser"),"the handoff carries no rendered text");
 const argvs:string[][]=[];
 const showed=await resolveRenderHandoff(root,out.contextHandoff!,"Implement parser",base,"claude-opus-5",async argv=>{
  argvs.push([...argv]);
  return{stdout:JSON.stringify({schema:"reactive-fiber.cli/v1",ok:true,result:{render_id:"rfr-9",session_id:"rfs_carried",workspace_id:"rfw_1",actor:"agent:camshaft-oe",output:{text,digest:"sha256:"+"a".repeat(64)},budget:{capability_snapshot:{model_id:"claude-opus-5",verified:true},formula_terms:{available_context_tokens:100}},record:{graph_revision_id:"sha256:"+"c".repeat(64),cli_version:"0.1.883",sdk_versions:{}}}}),stderr:"",exitCode:0};
 });
 assert.deepEqual(argvs.map(a=>a.slice(0,3)),[["context","show","rfr-9"]]);assert.equal(showed.evidence?.id,"rfr-9");assert.equal(showed.rfWorkspaceId,"rfw_1");assert.equal(showed.cli.version,"0.1.883");
}));
test("RF context refusal prevents agent writes and Forge gate",()=>withRepo(async root=>{
 let calls=0;
 await assert.rejects(()=>developLive(root,"Implement parser",{
  contextMode:"rf",model:"claude-opus-5",
  renderContext:async()=>{throw Error("RF_CONTEXT_UNESTABLISHED")},
  agent:async()=>{calls++;return agentSuccess},
  connectForge:()=>{calls++;throw Error("must not connect")},
 }),/RF_CONTEXT_UNESTABLISHED/);
 assert.equal(calls,0);
}));

test("opt-in reviewer approves exact candidate before native Forge gate",()=>withRepo(async root=>{
 const seen:string[]=[];const out=await developLive(root,"Fix parser",{
  agent:async()=>{seen.push("agent");commitChange(root);return agentSuccess},
  reviewer:async(_,revision)=>{seen.push("review");return{basis:{workspaceId:root,revision},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r-1"}}},
  connectForge:forgeConnection(root,seen),
 });
 assert.equal(out.workflow.kind,"verified_candidate");assert.equal(out.review?.verdict,"approved");
 assert.deepEqual(seen,["agent","review","forge.init","forge.gate","forge.close"]);
}));
test("reviewer rejection stops before any Forge gate",()=>withRepo(async root=>{
 let gates=0;const out=await developLive(root,"Fix parser",{
  agent:async()=>{commitChange(root);return agentSuccess},
  reviewer:async(_,revision)=>({basis:{workspaceId:root,revision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r-2"}}),
  connectForge:()=>{gates++;throw Error("must not gate rejected code")},
 });
 assert.equal(out.workflow.kind,"indeterminate");assert.equal(out.workflow.reason,"REVIEW_REJECTED");assert.equal(gates,0);
}));
test("reviewer approval for stale basis cannot run Forge",()=>withRepo(async root=>{
 let gates=0;const out=await developLive(root,"Fix parser",{
  agent:async()=>{commitChange(root);return agentSuccess},
  reviewer:async()=>({basis:{workspaceId:root,revision:"other"},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r-3"}}),
  connectForge:()=>{gates++;throw Error("must not gate wrong review")},
 });
 assert.equal(out.workflow.kind,"indeterminate");assert.equal(gates,0);
}));
test("review evidence that is not a nonblank claude-agent-sdk review-session of this workspace never reaches the Forge gate",()=>withRepo(async root=>{
 const bad:{label:string;evidence?:{system:string;kind:string;id:string};workspaceId?:string}[]=[
  {label:"wrong system",evidence:{system:"other-sdk",kind:"review-session",id:"r-sys"}},
  {label:"wrong kind",evidence:{system:"claude-agent-sdk",kind:"session",id:"r-kind"}},
  {label:"blank id",evidence:{system:"claude-agent-sdk",kind:"review-session",id:""}},
  {label:"missing evidence"},
  {label:"another workspace",workspaceId:"/elsewhere",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r-ws"}},
 ];
 for(const b of bad){
  let gates=0;
  const out=await developLive(root,"Fix parser",{
   agent:async()=>{commitChange(root);return agentSuccess},
   reviewer:async(_,revision)=>({basis:{workspaceId:b.workspaceId??root,revision},verdict:"approved" as const,...(b.evidence?{evidence:b.evidence}:{})}) as never,
   connectForge:()=>{gates++;throw Error("must not gate unproven review: "+b.label)},
  });
  assert.equal(out.workflow.kind,"indeterminate",b.label);assert.equal(out.workflow.reason,"REVIEW_NOT_ESTABLISHED",b.label);assert.equal(gates,0,b.label);
  git(root,"reset","-q","--hard","HEAD~1");
 }
}));

// ---- dfu: pin the three live-development.ts diagnostic legs (slot 07-implement, run12 c6) ----
// A PATH shim stands in for "another actor commits between the initial basis read and the
// discovery re-read". cleanGitBasis runs three concurrent git reads per call: the first wave (the
// initial read) passes through, and the first git call of the second wave (the discovery re-read)
// is preceded by exactly one drift commit made with the real git.
function withDriftShim<T>(root: string, mode: "content" | "empty" | "none", fn: () => Promise<T>): Promise<T> {
  const realGit = spawnSync("sh", ["-c", "command -v git"], { encoding: "utf8" }).stdout.trim();
  const dir = mkdtempSync(join(tmpdir(), "mechanical-drift-shim-"));
  const state = join(dir, "state");
  mkdirSync(state);
  writeFileSync(join(dir, "git"), [
    "#!/bin/sh",
    // Slots c1..c3 belong to the three concurrent git reads of the initial basis. Any later git
    // call is a second-wave read: the first one elected through `fired` makes the drift commit while
    // the others wait, so no basis read can observe the drift commit half-applied.
    'if ! mkdir "$DRIFT_STATE/c1" 2>/dev/null && ! mkdir "$DRIFT_STATE/c2" 2>/dev/null && ! mkdir "$DRIFT_STATE/c3" 2>/dev/null; then',
    '  if mkdir "$DRIFT_STATE/fired" 2>/dev/null; then',
    '    case "$DRIFT_MODE" in',
    '      content) printf "drift\\n" > "$2/drift.txt"; "$DRIFT_REAL_GIT" -C "$2" add drift.txt; "$DRIFT_REAL_GIT" -C "$2" commit -qm drift ;;',
    '      empty) "$DRIFT_REAL_GIT" -C "$2" commit -q --allow-empty -m drift ;;',
    "    esac",
    '    mkdir "$DRIFT_STATE/done"',
    "  fi",
    '  i=0; while [ ! -d "$DRIFT_STATE/done" ] && [ "$i" -lt 200 ]; do sleep 0.05; i=$((i+1)); done',
    "fi",
    'exec "$DRIFT_REAL_GIT" "$@"',
    "",
  ].join("\n"), { mode: 0o755 });
  const saved = { PATH: process.env.PATH, DRIFT_STATE: process.env.DRIFT_STATE, DRIFT_MODE: process.env.DRIFT_MODE, DRIFT_REAL_GIT: process.env.DRIFT_REAL_GIT };
  process.env.PATH = dir + ":" + saved.PATH;
  process.env.DRIFT_STATE = state;
  process.env.DRIFT_MODE = mode;
  process.env.DRIFT_REAL_GIT = realGit;
  const restore = (): void => {
    for (const [key, value] of Object.entries(saved)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
    rmSync(dir, { recursive: true, force: true });
  };
  return fn().finally(restore);
}

test("SOURCE_BASIS_CHANGED_BEFORE_DISCOVERY: a commit landing between the initial basis read and discovery refuses before any agent or gate", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const baseTree = git(root, "rev-parse", "HEAD^{tree}");
  // Positive control: the shim in pass-through mode leaves the identical flow green, so the
  // refusals below are caused by the drift commit and not by the shim itself.
  const control: string[] = [];
  const ok = await withDriftShim(root, "none", () => developLive(root, "Change parser", {
    agent: async () => { control.push("agent"); commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root, control),
  }));
  assert.equal(ok.workflow.kind, "verified_candidate");
  assert.deepEqual(control, ["agent", "forge.init", "forge.gate", "forge.close"]);
  git(root, "reset", "-q", "--hard", base);
  // Content drift: both commit and tree differ from the initial read.
  // Empty drift: the commit differs while the tree is byte-identical, so only the commit leg of the `||` can fire.
  for (const mode of ["content", "empty"] as const) {
    let calls = 0;
    await assert.rejects(() => withDriftShim(root, mode, () => developLive(root, "Change parser", {
      agent: async () => { calls++; return agentSuccess; },
      connectForge: () => { calls++; throw Error("must not connect"); },
    })), /SOURCE_BASIS_CHANGED_BEFORE_DISCOVERY/, mode);
    assert.equal(calls, 0, "no agent or Forge call for " + mode + " drift");
    assert.notEqual(git(root, "rev-parse", "HEAD"), base, mode + " drift commit really landed");
    if (mode === "empty") assert.equal(git(root, "rev-parse", "HEAD^{tree}"), baseTree, "empty drift leaves the tree unchanged");
    git(root, "reset", "-q", "--hard", base);
  }
}));

test("SOURCE_BASIS_CHANGED_BEFORE_WRITER: a commit landing after context compilation refuses before any agent, write or Forge request (EAT-R033)", () => withRepo(async root => {
  const base = git(root, "rev-parse", "HEAD");
  const baseTree = git(root, "rev-parse", "HEAD^{tree}");
  const rfContext = (drift: "none" | "content" | "empty") => async (_cwd: string, task: string, revision: string, model: string) => {
    // The barrier: discovery has passed and the context is rendered; Git moves before the writer dispatches.
    if (drift === "content") commitChange(root, "export const value = 7;\n");
    if (drift === "empty") git(root, "commit", "-q", "--allow-empty", "-m", "empty drift");
    return {
      basis: { workspaceId: root, revision }, text: "Task: " + task + "\nSource revision: " + revision,
      evidence: { system: "reactive-fiber", kind: "render", id: "rfr-barrier" }, model,
      availableTokens: 100, graphRevision: "graph-1", outputDigest: "sha256:" + "b".repeat(64),
      rfWorkspaceId: "rfw_1", actor: "agent:camshaft-oe", cli: { version: "0.1.883", sdkVersions: {} },
    };
  };
  // Positive control: the identical hook with no drift still reaches the writer and completes, so the
  // refusals below come from the drift and not from the injected renderer.
  const control: string[] = [];
  const ok = await developLive(root, "Change parser", {
    contextMode: "rf", model: "claude-test", renderContext: rfContext("none"),
    agent: async () => { control.push("agent"); commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root, control),
  });
  assert.equal(ok.workflow.kind, "verified_candidate");
  assert.deepEqual(control, ["agent", "forge.init", "forge.gate", "forge.close"]);
  git(root, "reset", "-q", "--hard", base);
  // Content drift moves commit and tree; empty drift moves only the commit, so each leg of the `||` is witnessed.
  for (const mode of ["content", "empty"] as const) {
    const seen: string[] = [];
    await assert.rejects(() => developLive(root, "Change parser", {
      contextMode: "rf", model: "claude-test", renderContext: rfContext(mode),
      agent: async () => { seen.push("agent"); return agentSuccess; },
      connectForge: () => { seen.push("forge.connect"); throw Error("must not connect"); },
    }), /SOURCE_BASIS_CHANGED_BEFORE_WRITER/, mode);
    assert.deepEqual(seen, [], "zero agent or Forge calls for " + mode + " drift");
    assert.notEqual(git(root, "rev-parse", "HEAD"), base, mode + " drift commit really landed");
    assert.equal(git(root, "status", "--porcelain=v1", "--untracked-files=all"), "", "host wrote nothing for " + mode + " drift");
    if (mode === "empty") assert.equal(git(root, "rev-parse", "HEAD^{tree}"), baseTree, "empty drift leaves the tree unchanged");
    git(root, "reset", "-q", "--hard", base);
  }
}));

test("VERIFICATION_SUBJECT_CHANGED: a gate of a commit made after review is never credited to the reviewed candidate", () => withRepo(async root => {
  let reviewed = "";
  let drifted = "";
  const seen: string[] = [];
  const out = await developLive(root, "Fix parser", {
    agent: async () => { seen.push("agent"); reviewed = commitChange(root); return agentSuccess; },
    // Another actor commits after the agent finished and the review approved the exact candidate,
    // but before Forge starts. Forge then truthfully gates the newer commit.
    reviewer: async (_root, revision) => {
      seen.push("review");
      drifted = commitChange(root, "export const value = 99;\n");
      return { basis: { workspaceId: root, revision }, verdict: "approved", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "r-subject" } };
    },
    connectForge: forgeConnection(root, seen),
  });
  assert.notEqual(reviewed, drifted);
  // The gate really passed, but for the drifted commit: this is the exact condition under test.
  assert.equal(out.forge?.kind, "passed");
  assert.equal(out.forge?.basis.commit, drifted);
  assert.notEqual(out.forge?.basis.commit, reviewed);
  assert.equal(out.workflow.kind, "indeterminate");
  assert.equal(out.workflow.reason, "VERIFICATION_UNKNOWN", "forge was observed, so the reviewer fallback rewrite must not fire");
  assert.deepEqual(out.workflow.evidence, { system: "forge", kind: "operation", id: "op-" + drifted.slice(0, 8) });
  assert.deepEqual(seen, ["agent", "review", "forge.init", "forge.gate", "forge.close"]);
}));

test("VERIFICATION_UNKNOWN fallback rewrite fires only when a reviewer is set, the verdict was withheld and Forge never ran", () => withRepo(async root => {
  const approve = (revision: string) => ({ basis: { workspaceId: root, revision }, verdict: "approved" as const, evidence: { system: "claude-agent-sdk", kind: "review-session", id: "r-fallback" } });
  // Approved review but an unestablished gate (Forge answered, so forge !== null): the generic
  // reason survives and carries Forge's operation evidence; it is not relabeled as a review problem.
  const unestablished = await developLive(root, "Fix parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    reviewer: async (_root, revision) => approve(revision),
    connectForge: forgeConnection(root, [], head => ({ ...frame(head), status: "partial" })),
  });
  assert.equal(unestablished.forge?.kind, "indeterminate");
  assert.equal(unestablished.review?.verdict, "approved");
  assert.equal(unestablished.workflow.kind, "indeterminate");
  assert.equal(unestablished.workflow.reason, "VERIFICATION_UNKNOWN");
  assert.equal(unestablished.workflow.evidence?.system, "forge");
  git(root, "reset", "-q", "--hard", "HEAD~1");
  // Same reviewer wiring, review withheld, Forge never connected: the rewrite fires and names the review.
  let gates = 0;
  const rejected = await developLive(root, "Fix parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    reviewer: async (_root, revision) => ({ ...approve(revision), verdict: "rejected" as const }),
    connectForge: () => { gates++; throw Error("must not gate"); },
  });
  assert.equal(rejected.forge, null);
  assert.equal(rejected.workflow.kind, "indeterminate");
  assert.equal(rejected.workflow.reason, "REVIEW_REJECTED");
  assert.equal("evidence" in rejected.workflow, false, "the rewrite drops evidence, none was attached");
  assert.equal(gates, 0);
}));
const CANCELLED = /^DEVELOPMENT_CANCELLED_BEFORE_DISPATCH: /;
test("an already-aborted host signal dispatches no agent and no Forge, and leaves the tree and HEAD untouched", () => withRepo(async root => {
  const seen: string[] = [];
  const controller = new AbortController(); controller.abort();
  const headBefore = git(root, "rev-parse", "HEAD");
  const statusBefore = git(root, "status", "--porcelain");
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async () => { seen.push("agent"); return agentSuccess; },
    connectForge: forgeConnection(root, seen),
  }), (error: Error) => {
    assert.match(error.message, CANCELLED);
    // distinct from the agent-outcome, session and RF refusal classes, and no rollback claim
    assert.doesNotMatch(error.message, /AGENT_|RF_|FORGE_|rolled back|reverted/);
    return true;
  });
  assert.deepEqual(seen, []);
  assert.equal(git(root, "rev-parse", "HEAD"), headBefore);
  assert.equal(git(root, "status", "--porcelain"), statusBefore);
}));
test("a signal aborted after discovery but before the agent runner still dispatches nothing", () => withRepo(async root => {
  const seen: string[] = [];
  const controller = new AbortController();
  await assert.rejects(() => developLive(root, "Change parser", {
    signal: controller.signal,
    contextMode: "rf", model: "claude-test",
    renderContext: async (workspace, task, revision, model) => {
      controller.abort();
      return {
        basis: { workspaceId: workspace, revision },
        text: task + "\n" + revision,
        evidence: { system: "reactive-fiber", kind: "render", id: "rfr_test" },
        model, availableTokens: 100, graphRevision: "graph-1", outputDigest: "sha256:" + "a".repeat(64),
        rfWorkspaceId: "rfw_1", actor: "agent:camshaft-oe", cli: { version: "0.1.883", sdkVersions: {} },
      };
    },
    agent: async () => { seen.push("agent"); return agentSuccess; },
    connectForge: forgeConnection(root, seen),
  // develop() re-wraps an implement-step throw as "Error: <message>", so the prefix follows that.
  }), /^(Error: )?DEVELOPMENT_CANCELLED_BEFORE_DISPATCH: /);
  assert.deepEqual(seen, []);
}));
test("a supplied but unaborted signal reaches the injected agent and the flow proceeds as before", () => withRepo(async root => {
  const seen: string[] = [];
  const controller = new AbortController();
  const result = await developLive(root, "Change parser", {
    signal: controller.signal,
    agent: async (workspace, _prompt, options) => {
      seen.push("agent");
      assert.equal(options.signal, controller.signal);
      commitChange(workspace);
      return agentSuccess;
    },
    connectForge: forgeConnection(root, seen),
  });
  assert.equal(result.workflow.kind, "verified_candidate");
  assert.deepEqual(seen, ["agent", "forge.init", "forge.gate", "forge.close"]);
}));

test("developLive exposes the SHA-256 of the forge.toml bytes it pinned at preflight", () => withRepo(async root => {
  const expected = createHash("sha256").update(readFileSync(join(root, "forge.toml"))).digest("hex");
  const seen: string[] = [];
  const result = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root, seen),
  });
  assert.equal(result.gateManifestSha256, expected);
  assert.match(result.gateManifestSha256, /^[0-9a-f]{64}$/);
}));
test("a one-byte forge.toml difference yields a different manifest digest", () => withRepo(async rootA => withRepo(async rootB => {
  writeFileSync(join(rootB, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.1"\n');
  git(rootB, "add", "forge.toml");
  git(rootB, "commit", "-qm", "manifest");
  const a = await developLive(rootA, "Improve parser", {
    agent: async () => { commitChange(rootA); return agentSuccess; },
    connectForge: forgeConnection(rootA, []),
  });
  const b = await developLive(rootB, "Improve parser", {
    agent: async () => { commitChange(rootB); return agentSuccess; },
    connectForge: forgeConnection(rootB, []),
  });
  assert.notEqual(a.gateManifestSha256, b.gateManifestSha256);
})));
test("developLive propagates the agent replay identity unchanged and fabricates none for an agent that omits it", () => withRepo(async root => {
  const replay = {
    promptSha256: "a".repeat(64),
    configuration: { allowedTools: ["Read"], permissionMode: "dontAsk", settingSources: [] as string[], model: null, maxTurns: 3, maxBudgetUsd: 1 },
  };
  const withReplay = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return { ...agentSuccess, replay }; },
    connectForge: forgeConnection(root, []),
  });
  assert.deepEqual(withReplay.agent?.replay, replay);
  git(root, "reset", "-q", "--hard", "HEAD~1");
  const without = await developLive(root, "Improve parser", {
    agent: async () => { commitChange(root); return agentSuccess; },
    connectForge: forgeConnection(root, []),
  });
  assert.equal(without.agent?.replay, undefined);
  assert.equal(Object.hasOwn(without.agent ?? {}, "replay"), false);
}));
