import test from "node:test";
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {repairLiveCandidate} from "../dist/repair-run.js";
function git(root:string,...argv:string[]):string{const p=spawnSync("git",["-C",root,...argv],{encoding:"utf8"});assert.equal(p.status,0,p.stderr);return p.stdout.trim()}
async function repo<T>(fn:(root:string,rejectedRevision:string)=>Promise<T>):Promise<T>{const root=mkdtempSync(join(tmpdir(),"mw-repair-live-"));try{git(root,"init","-q");git(root,"config","user.name","Test");git(root,"config","user.email","test@example.invalid");writeFileSync(join(root,"forge.toml"),'[package]\nname="repair"\ntype="code"\nversion="0.1.0"\n');writeFileSync(join(root,"main.ts"),"export const n=1;\n");git(root,"add",".");git(root,"commit","-qm","base");writeFileSync(join(root,"main.ts"),"export const n=2;\n");git(root,"add","main.ts");git(root,"commit","-qm","candidate");return await fn(root,git(root,"rev-parse","HEAD"))}finally{rmSync(root,{recursive:true,force:true})}}
test("rejected candidate produces one new committed repair and reviewer approval before gate",()=>repo(async(root,rejectedRevision)=>{
 const seen:string[]=[];const result=await repairLiveCandidate(root,"Fix parser",rejectedRevision,{basis:{workspaceId:root,revision:rejectedRevision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-1"}},
 {agent:async()=>{seen.push("agent");writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:"agent-1",summary:"done",turns:2,costUsd:0}},
 reviewer:async(_,revision)=>{seen.push("review");return{basis:{workspaceId:root,revision},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-2"}}},
 gate:async()=>{seen.push("forge");return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-2",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}}});
 assert.equal(result.kind,"repaired_candidate");assert.deepEqual(seen,["agent","review","forge"]);assert.notEqual(result.candidate.basis.revision,rejectedRevision);
}));
test("unknown original review never starts agent",()=>repo(async(root,revision)=>{
 let calls=0;const result=await repairLiveCandidate(root,"Fix parser",revision,{basis:{workspaceId:root,revision},verdict:"unknown"},{agent:async()=>{calls++;throw Error("must not run")},reviewer:async()=>{calls++;throw Error("must not run")},gate:async()=>{calls++;throw Error("must not run")}});
 assert.equal(result.kind,"indeterminate");assert.equal(calls,0);
}));
test("dirty attempted repair requires manual reconciliation, not an automatic retry",()=>repo(async(root,revision)=>{
 let calls=0;
 await assert.rejects(()=>repairLiveCandidate(root,"Fix parser",revision,{basis:{workspaceId:root,revision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"rev"}},{agent:async()=>{calls++;writeFileSync(join(root,"main.ts"),"dirty\n");throw Error("transport lost")},reviewer:async()=>{throw Error("must not run")},gate:async()=>{throw Error("must not run")}}),/transport lost/);
 assert.equal(calls,1);
}));

test("repair refuses gate-definition mutation before any reviewer",()=>repo(async(root,revision)=>{
 let reviews=0;
 await assert.rejects(()=>repairLiveCandidate(root,"Fix parser",revision,{basis:{workspaceId:root,revision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}},
 {agent:async()=>{writeFileSync(join(root,"forge.toml"),'[package]\nname="weakened"\ntype="code"\nversion="0.1.0"\n');git(root,"add","forge.toml");git(root,"commit","-qm","weaken gate");return{sessionId:"s",summary:"",turns:1,costUsd:0}},
 reviewer:async()=>{reviews++;throw Error("must not review")},gate:async()=>{throw Error("must not gate")}}),/REPAIR_GATE_DEFINITION_CHANGED/);
 assert.equal(reviews,0);
}));

test("repair prompt authorizes committing on the current branch and forbids branch creation",()=>repo(async(root,revision)=>{
 let prompt="";
 const result=await repairLiveCandidate(root,"Fix parser",revision,{basis:{workspaceId:root,revision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}},
 {agent:async(_,p)=>{prompt=p;writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:"a",summary:"",turns:1,costUsd:0}},
  reviewer:async(_,rev)=>({basis:{workspaceId:root,revision:rev},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r2"}}),
  gate:async()=>({kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}})});
 assert.equal(result.kind,"repaired_candidate");
 assert.match(prompt,/Commit directly on the current branch/);assert.match(prompt,/Do not create or switch branches/);assert.match(prompt,/separate Bash tool calls/);
}));

// bead 3h3, slot 07-implement run9 c8: an injected repair agent that returns a blank or non-string
// sessionId produces unattributable repair evidence, so it must stop before re-review and the Forge gate.
for(const [label,sessionId] of [["blank",""],["whitespace-only","   \t"],["undefined",undefined],["numeric",7]] as const){
 test("3h3 repair agent with "+label+" sessionId is refused before re-review and the Forge gate, and runs once",()=>repo(async(root,revision)=>{
  let agents=0,reviews=0,gates=0;
  await assert.rejects(()=>repairLiveCandidate(root,"Fix parser",revision,{basis:{workspaceId:root,revision},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-original"}},
  {agent:async()=>{agents++;writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:sessionId as unknown as string,summary:"",turns:1,costUsd:0}},
  reviewer:async(_,rev)=>{reviews++;return{basis:{workspaceId:root,revision:rev},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-new"}}},
  gate:async()=>{gates++;return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-repair",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}}}),/REPAIR_AGENT_SESSION_UNIDENTIFIED/);
  assert.equal(agents,1);assert.equal(reviews,0);assert.equal(gates,0);
 }));
}
test("repair re-review approval lacking a claude-agent-sdk review-session evidence never reaches the Forge gate",()=>repo(async(root,revision)=>{
 const rejected={basis:{workspaceId:root,revision},verdict:"rejected" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}};
 const genuine={system:"claude-agent-sdk",kind:"review-session",id:"r2"};
 const foreign:{system:string;kind:string;id:string}[]=[
  {system:"forge",kind:"operation",id:"op-not-review"},
  {system:"claude-agent-sdk",kind:"session",id:"agent-session"},
  {system:"forge",kind:"review-session",id:"r2"},
 ];
 for(const evidence of [...foreign,genuine]){
  git(root,"reset","-q","--hard",revision);
  let gates=0;
  const result=await repairLiveCandidate(root,"Fix parser",revision,rejected,
   {agent:async()=>{writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:"a",summary:"",turns:1,costUsd:0}},
    reviewer:async(_,rev)=>({basis:{workspaceId:root,revision:rev},verdict:"approved",evidence}),
    gate:async()=>{gates++;return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-x",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}}});
  if(evidence===genuine){assert.equal(result.kind,"repaired_candidate");assert.equal(gates,1);}
  else{assert.equal(result.kind,"indeterminate",JSON.stringify(evidence));assert.equal(gates,0,"gate must not run for "+JSON.stringify(evidence));}
 }
}));

// bead klw, slot 07-implement run10 c22: two arms the 323 test left unpinned (mutants R3/R5 in ledger/20261015T173221Z-07-implement-c6).
// (1) an approved re-review whose review-session id is blank, whitespace-only or non-string never reaches the Forge gate.
for(const [label,id] of [["blank",""],["whitespace-only","   \t"],["numeric",7]] as const){
 test("klw approved re-review with "+label+" review-session id never reaches the Forge gate",()=>repo(async(root,revision)=>{
  const rejected={basis:{workspaceId:root,revision},verdict:"rejected" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}};
  let gates=0;
  const result=await repairLiveCandidate(root,"Fix parser",revision,rejected,
   {agent:async()=>{writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:"a",summary:"",turns:1,costUsd:0}},
    reviewer:async(_,rev)=>({basis:{workspaceId:root,revision:rev},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:id as unknown as string}}),
    gate:async()=>{gates++;return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-x",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}}});
  assert.equal(result.kind,"indeterminate");assert.equal(gates,0,"gate must not run for review-session id "+JSON.stringify(id));
 }));
}
// (2) the host demotion applies to approvals only: a rejected re-review keeps its rejected outcome even when its evidence is foreign.
test("klw rejected re-review with foreign evidence stays review_rejected and never reaches the Forge gate",()=>repo(async(root,revision)=>{
 const rejected={basis:{workspaceId:root,revision},verdict:"rejected" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}};
 const foreign={system:"forge",kind:"operation",id:"op-not-review"};
 let gates=0;
 const result=await repairLiveCandidate(root,"Fix parser",revision,rejected,
  {agent:async()=>{writeFileSync(join(root,"main.ts"),"export const n=3;\n");git(root,"add","main.ts");git(root,"commit","-qm","repair");return{sessionId:"a",summary:"",turns:1,costUsd:0}},
   reviewer:async(_,rev)=>({basis:{workspaceId:root,revision:rev},verdict:"rejected",evidence:foreign}),
   gate:async()=>{gates++;return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-x",basis:{commit:git(root,"rev-parse","HEAD"),tree:git(root,"rev-parse","HEAD^{tree}"),clean:true},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}}});
 assert.equal(result.kind,"review_rejected");assert.equal(result.review.verdict,"rejected");assert.deepEqual(result.review.evidence,foreign);assert.equal(gates,0);
}));

test("a blank task is REPAIR_TASK_REQUIRED before the repository is read and before any agent, reviewer or gate",()=>repo(async(root,revision)=>{
 writeFileSync(join(root,"scratch.txt"),"dirty\n"); // an unclean tree would otherwise refuse as WORKSPACE_NOT_CLEAN, so the task guard must come first
 const rejected={basis:{workspaceId:root,revision},verdict:"rejected" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}};
 for(const task of [""," ","\n\t"]){
  let calls=0;
  await assert.rejects(()=>repairLiveCandidate(root,task,revision,rejected,{agent:async()=>{calls++;throw Error("must not run")},reviewer:async()=>{calls++;throw Error("must not run")},gate:async()=>{calls++;throw Error("must not run")}}),
   (e:unknown)=>e instanceof Error&&e.message==="REPAIR_TASK_REQUIRED",JSON.stringify(task));
  assert.equal(calls,0,JSON.stringify(task));
 }
 rmSync(join(root,"scratch.txt"));
}));
test("a repair agent that leaves the tree unchanged is REPAIR_SOURCE_CHANGE_NOT_ESTABLISHED before any reviewer or gate",()=>repo(async(root,revision)=>{
 const rejected={basis:{workspaceId:root,revision},verdict:"rejected" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}};
 const agents:ReadonlyArray<readonly [string,()=>void]>=[
  ["no commit at all",()=>{}],
  ["an empty commit",()=>{git(root,"commit","-q","--allow-empty","-m","no change")}],
  ["a change and its revert",()=>{writeFileSync(join(root,"main.ts"),"export const n=42;\n");git(root,"add","main.ts");git(root,"commit","-qm","change");git(root,"revert","--no-edit","HEAD")}],
 ];
 for(const [label,act] of agents){
  git(root,"reset","-q","--hard",revision);
  let calls=0;
  await assert.rejects(()=>repairLiveCandidate(root,"Fix parser",revision,rejected,{agent:async()=>{act();return{sessionId:"a",summary:"",turns:1,costUsd:0}},reviewer:async()=>{calls++;throw Error("must not review")},gate:async()=>{calls++;throw Error("must not gate")}}),/REPAIR_SOURCE_CHANGE_NOT_ESTABLISHED/,label);
  assert.equal(calls,0,label);
  assert.equal(git(root,"rev-parse","HEAD^{tree}"),git(root,"rev-parse",revision+"^{tree}"),label);
 }
}));

test("a rejected revision other than the committed HEAD is REPAIR_REJECTED_BASIS_MISMATCH before any agent, reviewer or gate",()=>repo(async(root,revision)=>{
 const parent=git(root,"rev-parse","HEAD~1");
 for(const wrong of [parent,"f".repeat(40)]){
  let calls=0;
  await assert.rejects(()=>repairLiveCandidate(root,"Fix parser",wrong,{basis:{workspaceId:root,revision:wrong},verdict:"rejected",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"r"}},
   {agent:async()=>{calls++;throw Error("must not run")},reviewer:async()=>{calls++;throw Error("must not run")},gate:async()=>{calls++;throw Error("must not run")}}),
   (e:unknown)=>e instanceof Error&&e.message.startsWith("REPAIR_REJECTED_BASIS_MISMATCH"),wrong);
  assert.equal(calls,0,wrong);
 }
 assert.equal(git(root,"rev-parse","HEAD"),revision);
}));
