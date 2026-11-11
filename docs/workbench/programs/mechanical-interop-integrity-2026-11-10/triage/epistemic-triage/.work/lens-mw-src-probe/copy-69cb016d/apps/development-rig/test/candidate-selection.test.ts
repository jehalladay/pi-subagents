import test from "node:test";
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync,existsSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {selectAndVerifyCandidate,chooseWithClaude} from "../dist/candidate-selection.js";
import type {Reviewer,SelectionOptions} from "../dist/candidate-selection.js";
import type {GateObservation} from "../dist/live-gate.js";
import type {CandidatePlan} from "@mechanical/workflows-development";
type Gate=NonNullable<SelectionOptions["gate"]>;
type AgentRecord={worktree:string;prompt:string};
function git(root:string,...argv:string[]):string{const p=spawnSync("git",["-C",root,...argv],{encoding:"utf8"});assert.equal(p.status,0,p.stderr);return p.stdout.trim()}
async function repo<T>(fn:(root:string,base:string)=>Promise<T>):Promise<T>{const root=mkdtempSync(join(tmpdir(),"mw-select-"));try{git(root,"init","-q");git(root,"config","user.name","Test");git(root,"config","user.email","test@example.invalid");writeFileSync(join(root,"forge.toml"),'[package]\nname="select"\ntype="code"\nversion="0.1.0"\n');writeFileSync(join(root,"main.ts"),"export const n=1;\n");git(root,"add",".");git(root,"commit","-qm","base");return await fn(root,git(root,"rev-parse","HEAD"))}finally{rmSync(root,{recursive:true,force:true})}}
function committingAgent(record:AgentRecord[]){return async(worktree:string,prompt:string)=>{record.push({worktree,prompt});writeFileSync(join(worktree,"main.ts"),"export const n="+(record.length+1)+";\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","candidate "+record.length);return{sessionId:"agent-"+record.length,summary:"",turns:1,costUsd:0}}}
const approve:Reviewer=async(worktree,revision)=>({basis:{workspaceId:worktree,revision},verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-"+revision.slice(0,6)}});
const passGate:Gate=async worktree=>({kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-"+git(worktree,"rev-parse","--short","HEAD"),basis:{commit:git(worktree,"rev-parse","HEAD"),tree:git(worktree,"rev-parse","HEAD^{tree}"),clean:true as const,},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}} satisfies GateObservation);
test("two isolated worktree candidates are planned, one is chosen, reviewed and gated at its own basis",()=>repo(async(root,base)=>{
 const agents:AgentRecord[]=[];const chosen:string[][]=[];const gated:{worktree:string;head:string}[]=[];
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,agent:committingAgent(agents),
  chooser:async(_root,plan)=>{chosen.push(plan.candidates.map(c=>c.basis.revision));const second=plan.candidates[1];if(!second)throw Error("expected two candidates");return{revision:second.basis.revision,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"choose-1"}}},
  reviewer:approve,gate:(async worktree=>{gated.push({worktree,head:git(worktree,"rev-parse","HEAD")});return passGate(worktree)}) as Gate});
 assert.equal(agents.length,2);assert.notEqual(agents[0]?.worktree,agents[1]?.worktree);assert.notEqual(agents[0]?.worktree,root);
 for(const a of agents)assert.match(a.prompt,/Commit directly on the current branch/);
 assert.equal(out.plan.candidates.length,2);assert.equal(chosen.length,1);assert.equal(chosen[0]?.length,2);
 const outcome=out.outcome;assert.equal(outcome.kind,"reviewed_candidate");if(outcome.kind!=="reviewed_candidate")throw Error("narrowed");
 assert.equal(outcome.candidate.basis.revision,out.plan.candidates[1]?.revision);
 assert.equal(outcome.candidate.parentBasis.revision,base);assert.equal(outcome.verification.verdict,"passed");
 assert.equal(gated.length,1);assert.equal(gated[0]?.head,outcome.candidate.basis.revision);assert.notEqual(gated[0]?.worktree,root);
 const choice=out.choice;assert.ok(choice&&choice.revision!==null);assert.equal(choice.revision!==null?choice.evidence.id:"","choose-1");
 assert.equal(git(root,"rev-parse","HEAD"),base);assert.equal(git(root,"status","--porcelain"),"");
 for(const c of out.plan.candidates){assert.equal(git(root,"rev-parse",c.branch),c.revision);assert.equal(existsSync(c.worktree),false)}
}));
test("a candidate agent that commits nothing is excluded with a reason and never reaches the chooser",()=>repo(async(root,base)=>{
 let n=0;const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,
  agent:async(worktree:string)=>{n++;if(n===1)return{sessionId:"idle",summary:"",turns:1,costUsd:0};writeFileSync(join(worktree,"main.ts"),"export const n=9;\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","c");return{sessionId:"a2",summary:"",turns:1,costUsd:0}},
  chooser:async(_root,plan)=>{const first=plan.candidates[0];if(!first)throw Error("expected a candidate");return{revision:first.basis.revision,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"choose"}}},reviewer:approve,gate:passGate});
 assert.equal(out.plan.candidates.length,1);assert.equal(out.excluded.length,1);assert.equal(out.excluded[0]?.reason,"CANDIDATE_NOT_COMMITTED");
 const fallback=out.outcome;assert.equal(fallback.kind,"reviewed_candidate");if(fallback.kind!=="reviewed_candidate")throw Error("narrowed");assert.equal(fallback.candidate.parentBasis.revision,base);
}));
test("a committed candidate whose agent reports a blank session id is excluded before the chooser",()=>repo(async(root,base)=>{
 let n=0;const plans:number[]=[];let reviews=0;let gates=0;
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,
  agent:async(worktree:string)=>{n++;writeFileSync(join(worktree,"main.ts"),"export const n="+(n+1)+";\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","c"+n);return{sessionId:n===1?"   ":"agent-2",summary:"",turns:1,costUsd:0}},
  chooser:async(_root,plan)=>{plans.push(plan.candidates.length);const first=plan.candidates[0];if(!first)throw Error("expected a candidate");return{revision:first.basis.revision,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"choose"}}},
  reviewer:(async(worktree,revision)=>{reviews++;return approve(worktree,revision,"Bump n",{})}) as Reviewer,
  gate:(async worktree=>{gates++;return passGate(worktree)}) as Gate});
 assert.equal(out.plan.candidates.length,1);
 assert.equal(out.excluded.length,1);assert.equal(out.excluded[0]?.reason,"CANDIDATE_SESSION_UNIDENTIFIED");
 assert.deepEqual(plans,[1],"the chooser sees only the identified candidate");
 assert.equal(out.outcome.kind,"reviewed_candidate");assert.equal(reviews,1);assert.equal(gates,1);
 // All-blank arm: nothing reaches chooser, reviewer or Forge.
 let effects=0;
 const none=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,
  agent:async(worktree:string)=>{writeFileSync(join(worktree,"main.ts"),"export const n=99;\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","blank");return{sessionId:"",summary:"",turns:1,costUsd:0}},
  chooser:async()=>{effects++;throw Error("chooser must not run")},
  reviewer:(async()=>{effects++;throw Error("reviewer must not run")}) as unknown as Reviewer,
  gate:(async()=>{effects++;throw Error("gate must not run")}) as unknown as Gate});
 assert.equal(none.plan.candidates.length,0);assert.equal(none.excluded[0]?.reason,"CANDIDATE_SESSION_UNIDENTIFIED");
 assert.equal(none.outcome.kind,"needs_candidates");assert.equal(effects,0);
 assert.equal(git(root,"rev-parse","HEAD"),base);
}));
test("a candidate agent that reports a non-string session id is excluded with the typed reason, not a raw TypeError",()=>repo(async(root,base)=>{
 for(const bad of [42,true,{}]){
  let effects=0;
  const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,
   agent:(async(worktree:string)=>{writeFileSync(join(worktree,"main.ts"),"export const n=77;\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","nonstring");return{sessionId:bad,summary:"",turns:1,costUsd:0}}) as unknown as NonNullable<SelectionOptions["agent"]>,
   chooser:async()=>{effects++;throw Error("chooser must not run")},
   reviewer:(async()=>{effects++;throw Error("reviewer must not run")}) as unknown as Reviewer,
   gate:(async()=>{effects++;throw Error("gate must not run")}) as unknown as Gate});
  assert.equal(out.plan.candidates.length,0,JSON.stringify(bad));
  assert.equal(out.excluded[0]?.reason,"CANDIDATE_SESSION_UNIDENTIFIED",JSON.stringify(bad));
  assert.equal(out.outcome.kind,"needs_candidates",JSON.stringify(bad));assert.equal(effects,0,JSON.stringify(bad));
  assert.equal(git(root,"rev-parse","HEAD"),base);
 }
}));
test("a dirty candidate worktree is excluded rather than committed by the host",()=>repo(async(root)=>{
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,
  agent:async(worktree:string)=>{writeFileSync(join(worktree,"main.ts"),"dirty\n");return{sessionId:"d",summary:"",turns:1,costUsd:0}},
  chooser:async()=>{throw Error("must not run")},reviewer:approve,gate:passGate});
 assert.equal(out.outcome.kind,"needs_candidates");assert.equal(out.excluded[0]?.reason,"CANDIDATE_WORKTREE_DIRTY");
 assert.equal(git(root,"status","--porcelain"),"");
}));
test("a chooser naming a revision outside the plan is indeterminate without review or gate",()=>repo(async(root)=>{
 let effects=0;const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),
  chooser:async()=>({revision:"f".repeat(40),evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"x"}}),
  reviewer:async()=>{effects++;throw Error("no")},gate:async()=>{effects++;throw Error("no")}});
 const rogue=out.outcome;assert.equal(rogue.kind,"indeterminate");if(rogue.kind!=="indeterminate")throw Error("narrowed");assert.equal(rogue.reason,"CANDIDATE_NOT_IN_PLAN");assert.equal(effects,0);
}));
test("a chooser without a decision is indeterminate and keeps its reason",()=>repo(async(root)=>{
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),chooser:async()=>({revision:null,reason:"SELECTION_MODEL_UNDECIDED"}),reviewer:approve,gate:passGate});
 const undecided=out.outcome;assert.equal(undecided.kind,"indeterminate");if(undecided.kind!=="indeterminate")throw Error("narrowed");assert.equal(undecided.reason,"SELECTION_MODEL_UNDECIDED");
}));
test("a dirty base refuses before any agent or worktree",()=>repo(async root=>{
 writeFileSync(join(root,"main.ts"),"dirty\n");let calls=0;
 await assert.rejects(()=>selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:async()=>{calls++;throw Error("no")},chooser:async()=>{throw Error("no")},reviewer:approve,gate:passGate}),/SELECTION_BASIS_NOT_CLEAN/);
 assert.equal(calls,0);assert.equal(git(root,"worktree","list").split("\n").length,1);
}));
test("Claude chooser constrains the structured choice to planned revisions",()=>repo(async(root,base)=>{
 const a="a".repeat(40),b="b".repeat(40);type ChoiceFormat={type:string;schema:{properties:{chosenRevision:{enum:readonly string[]}}}};let format:ChoiceFormat|null=null;let prompt="";
 const plan:CandidatePlan={basis:{workspaceId:root,revision:base},task:"Bump n",candidates:[{parentBasis:{workspaceId:root,revision:base},basis:{workspaceId:root,revision:a}},{parentBasis:{workspaceId:root,revision:base},basis:{workspaceId:root,revision:b}}]};
 const choice=await chooseWithClaude(root,plan,"Bump n",{query:async function*(args){format=args.options.outputFormat as ChoiceFormat;prompt=args.prompt;assert.deepEqual(args.options.allowedTools,["Read","Glob","Grep","Bash(git status *)","Bash(git show *)","Bash(git diff *)"]);yield{type:"result",subtype:"success",session_id:"sel-1",result:"",structured_output:{chosenRevision:b,rationale:"smaller diff"}}}});
 const captured=format as ChoiceFormat|null;assert.ok(captured!==null);assert.deepEqual(captured.schema.properties.chosenRevision.enum,[a,b]);assert.match(prompt,new RegExp(a));assert.match(prompt,new RegExp(b));
 assert.deepEqual(choice,{revision:b,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"sel-1"}});
 const outside=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",session_id:"sel-2",result:"",structured_output:{chosenRevision:"c".repeat(40),rationale:"x"}}}});
 assert.equal(outside.revision,null);assert.equal(outside.revision===null?outside.reason:"","SELECTION_NOT_IN_PLAN");
}));
test("a chooser result whose evidence is not a nonblank claude-agent-sdk selection-session never enters review or Forge",()=>repo(async(root,base)=>{
 const wrongs=[
  {system:"forge",kind:"operation",id:"op-not-selection"},
  {system:"claude-agent-sdk",kind:"session",id:"sel-1"},
  {system:"claude-agent-sdk",kind:"selection-session",id:"  "},
  // The typeof leg: a truthy non-string id must refuse typed, not throw a raw TypeError from .trim().
  {system:"claude-agent-sdk",kind:"selection-session",id:42 as unknown as string},
  {system:"claude-agent-sdk",kind:"selection-session",id:true as unknown as string},
 ] as const;
 for(const evidence of wrongs){
  let reviews=0;let gates=0;
  const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),
   chooser:async(_root,plan)=>{const first=plan.candidates[0];if(!first)throw Error("expected a candidate");return{revision:first.basis.revision,evidence}},
   reviewer:(async(worktree,revision)=>{reviews++;return approve(worktree,revision,"Bump n",{})}) as Reviewer,
   gate:(async worktree=>{gates++;return passGate(worktree)}) as Gate});
  assert.equal(out.outcome.kind,"indeterminate",JSON.stringify(evidence));
  assert.equal(out.outcome.kind==="indeterminate"?out.outcome.reason:"","SELECTION_EVIDENCE_UNESTABLISHED",JSON.stringify(evidence));
  assert.equal(reviews,0,JSON.stringify(evidence));assert.equal(gates,0,JSON.stringify(evidence));
  const choice=out.choice;assert.ok(choice&&choice.revision!==null,"the injected choice stays recorded for audit");
 }
 // Positive control: the typed selection-session evidence proceeds through review and one gate.
 let reviews=0;let gates=0;
 const ok=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),
  chooser:firstChooser,
  reviewer:(async(worktree,revision)=>{reviews++;return approve(worktree,revision,"Bump n",{})}) as Reviewer,
  gate:(async worktree=>{gates++;return passGate(worktree)}) as Gate});
 assert.equal(ok.outcome.kind,"reviewed_candidate");assert.equal(reviews,1);assert.equal(gates,1);
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");
}));
test("Claude chooser refuses an empty candidate plan before it queries the model",()=>repo(async(root,base)=>{
 const a="a".repeat(40);let calls=0;
 const query=async function*(){calls++;yield{type:"result",subtype:"success",session_id:"sel-empty",result:"",structured_output:{chosenRevision:a,rationale:"x"}}};
 const empty:CandidatePlan={basis:{workspaceId:root,revision:base},task:"Bump n",candidates:[]};
 const refused=await chooseWithClaude(root,empty,"Bump n",{query});
 assert.deepEqual(refused,{revision:null,reason:"SELECTION_NO_CANDIDATES"});assert.equal(calls,0);
 const one:CandidatePlan={basis:{workspaceId:root,revision:base},task:"Bump n",candidates:[{parentBasis:{workspaceId:root,revision:base},basis:{workspaceId:root,revision:a}}]};
 const chosen=await chooseWithClaude(root,one,"Bump n",{query});
 assert.equal(calls,1);assert.deepEqual(chosen,{revision:a,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"sel-empty"}});
}));
test("Claude chooser refuses a terminal result whose session id is empty and never returns evidence with a blank id",()=>repo(async(root,base)=>{
 const a="a".repeat(40);
 const plan:CandidatePlan={basis:{workspaceId:root,revision:base},task:"Bump n",candidates:[{parentBasis:{workspaceId:root,revision:base},basis:{workspaceId:root,revision:a}}]};
 const refused=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",session_id:"",result:"",structured_output:{chosenRevision:a,rationale:"x"}}}});
 assert.deepEqual(refused,{revision:null,reason:"SELECTION_SESSION_UNIDENTIFIED"});
 // Positive control: the same terminal result with a nonblank session id is accepted.
 const accepted=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",session_id:"sel-ok",result:"",structured_output:{chosenRevision:a,rationale:"x"}}}});
 assert.deepEqual(accepted,{revision:a,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"sel-ok"}});
}));
function countingGate(verdicts:("passed"|"failed")[]):{gate:Gate;calls:{worktree:string;head:string}[]}{
 const calls:{worktree:string;head:string}[]=[];
 const gate:Gate=async worktree=>{const head=git(worktree,"rev-parse","HEAD");calls.push({worktree,head});const kind=verdicts[calls.length-1]??"passed";
  return{kind,reason:kind==="passed"?"FORGE_GATE_PASS":"FORGE_GATE_FAIL",operationId:"op-"+head.slice(0,8)+"-"+calls.length,basis:{commit:head,tree:git(worktree,"rev-parse","HEAD^{tree}"),clean:true as const},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}}};
 return{gate,calls};
}
const firstChooser=async(_root:string,plan:CandidatePlan)=>{const first=plan.candidates[0];if(!first)throw Error("expected a candidate");return{revision:first.basis.revision,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"choose-i"}}};
test("integration re-verifies the chosen commit in a fresh worktree with a second native operation and names the fast-forward basis",()=>repo(async(root,base)=>{
 const g=countingGate(["passed","passed"]);
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate:g.gate});
 assert.equal(out.outcome.kind,"reviewed_candidate");const chosen=out.plan.candidates[0]?.revision??"";
 assert.equal(g.calls.length,2);assert.ok(g.calls.every(c=>c.head===chosen));assert.notEqual(g.calls[0]?.worktree,g.calls[1]?.worktree);assert.ok(g.calls.every(c=>c.worktree!==root));
 const integration=out.integration;assert.ok(integration);
 assert.equal(integration.baseUnchanged,true);assert.equal(integration.fastForward,true);assert.equal(integration.verified,true);
 assert.equal(integration.basis.revision,base);assert.equal(integration.candidate.revision,chosen);
 assert.equal(integration.reverification?.verdict,"passed");assert.notEqual(integration.reverification?.evidence?.id,out.outcome.kind==="reviewed_candidate"?out.outcome.verification.evidence?.id:"");
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");assert.equal(git(root,"status","--porcelain"),"");assert.equal(git(root,"worktree","list").split("\n").length,1);
}));
test("a failed re-verification leaves the integration unverified with its reason while the first review and gate stand",()=>repo(async root=>{
 const g=countingGate(["passed","failed"]);
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate:g.gate});
 assert.equal(out.outcome.kind,"reviewed_candidate");assert.equal(g.calls.length,2);
 assert.equal(out.integration?.verified,false);assert.equal(out.integration?.reason,"INTEGRATION_REVERIFICATION_NOT_PASSED");assert.equal(out.integration?.reverification?.verdict,"failed");
}));
test("a base that moved during selection is not integrated and no second gate runs",()=>repo(async(root,base)=>{
 const g=countingGate(["passed","passed"]);
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),
  chooser:async(r,plan)=>{git(root,"commit","-q","--allow-empty","-m","someone else moved main");return firstChooser(r,plan)},reviewer:approve,gate:g.gate});
 assert.equal(out.outcome.kind,"reviewed_candidate");assert.equal(g.calls.length,1);
 assert.equal(out.integration?.baseUnchanged,false);assert.equal(out.integration?.verified,false);assert.equal(out.integration?.reason,"INTEGRATION_BASE_MOVED");assert.equal(out.integration?.reverification,null);
 assert.notEqual(git(root,"rev-parse","HEAD"),base);
}));
test("without the integrate option the report carries no integration and gates once",()=>repo(async root=>{
 const g=countingGate(["passed"]);
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate:g.gate});
 assert.equal(out.integration,null);assert.equal(g.calls.length,1);
}));
test("a re-verification that reports the same native operation id as the first gate is not an independent integration",()=>repo(async(root,base)=>{
 const calls:string[]=[];
 const sameOperationGate:Gate=async worktree=>{calls.push(worktree);return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:"op-identical-native-operation",basis:{commit:git(worktree,"rev-parse","HEAD"),tree:git(worktree,"rev-parse","HEAD^{tree}"),clean:true as const},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}} satisfies GateObservation};
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate:sameOperationGate});
 assert.equal(out.outcome.kind,"reviewed_candidate");assert.equal(calls.length,2);
 assert.equal(out.outcome.kind==="reviewed_candidate"?out.outcome.verification.evidence?.id:"","op-identical-native-operation");
 const integration=out.integration;assert.ok(integration);
 assert.equal(integration.baseUnchanged,true);assert.equal(integration.fastForward,true);
 assert.equal(integration.reverification?.verdict,"passed");assert.equal(integration.reverification?.evidence?.id,"op-identical-native-operation");
 assert.equal(integration.verified,false);assert.equal(integration.reason,"INTEGRATION_SAME_OPERATION");
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");
}));
test("a candidate agent that makes two commits is excluded for its parent and never reaches the chooser, reviewer or gate",()=>repo(async(root,base)=>{
 let effects=0;
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,
  agent:async(worktree:string)=>{for(const n of [11,12]){writeFileSync(join(worktree,"main.ts"),"export const n="+n+";\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","stacked "+n)}return{sessionId:"stacked",summary:"",turns:1,costUsd:0}},
  chooser:async()=>{effects++;throw Error("chooser must not run")},
  reviewer:(async()=>{effects++;throw Error("reviewer must not run")}) as unknown as Reviewer,
  gate:(async()=>{effects++;throw Error("gate must not run")}) as unknown as Gate});
 assert.equal(out.plan.candidates.length,0);assert.equal(out.excluded.length,1);assert.equal(out.excluded[0]?.reason,"CANDIDATE_PARENT_MISMATCH");
 assert.equal(out.outcome.kind,"needs_candidates");assert.equal(effects,0);assert.equal(git(root,"rev-parse","HEAD"),base);
 // Mixed arm: the stacked candidate is dropped while a single-commit sibling is still planned and parented on the base.
 let n=0;const plans:number[]=[];
 const mixed=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,
  agent:async(worktree:string)=>{n++;const commits=n===1?2:1;for(let k=0;k<commits;k++){writeFileSync(join(worktree,"main.ts"),"export const n="+(n*10+k)+";\n");git(worktree,"add","main.ts");git(worktree,"commit","-qm","c"+n+"-"+k)}return{sessionId:"a"+n,summary:"",turns:1,costUsd:0}},
  chooser:async(_root,plan)=>{plans.push(plan.candidates.length);return firstChooser(_root,plan)},reviewer:approve,gate:passGate});
 assert.deepEqual(plans,[1],"the chooser sees only the base-parented candidate");
 assert.equal(mixed.excluded.map(e=>e.reason).join(","),"CANDIDATE_PARENT_MISMATCH");
 assert.equal(mixed.outcome.kind,"reviewed_candidate");assert.equal(mixed.outcome.kind==="reviewed_candidate"?mixed.outcome.candidate.parentBasis.revision:"",base);
}));
test("a candidate agent that edits forge.toml is excluded for redefining the gate and never reaches the chooser, reviewer or gate",()=>repo(async(root,base)=>{
 let effects=0;
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,
  agent:async(worktree:string)=>{writeFileSync(join(worktree,"forge.toml"),'[package]\nname="select"\ntype="code"\nversion="0.1.0"\n[build]\ngate=[]\n');git(worktree,"add","forge.toml");git(worktree,"commit","-qm","weaken the gate");return{sessionId:"gate-edit",summary:"",turns:1,costUsd:0}},
  chooser:async()=>{effects++;throw Error("chooser must not run")},
  reviewer:(async()=>{effects++;throw Error("reviewer must not run")}) as unknown as Reviewer,
  gate:(async()=>{effects++;throw Error("gate must not run")}) as unknown as Gate});
 assert.equal(out.plan.candidates.length,0);assert.equal(out.excluded.length,1);assert.equal(out.excluded[0]?.reason,"CANDIDATE_GATE_DEFINITION_CHANGED");
 assert.equal(out.outcome.kind,"needs_candidates");assert.equal(effects,0);assert.equal(git(root,"rev-parse","HEAD"),base);
 // Mixed arm: a gate-preserving sibling is still planned.
 let n=0;const plans:number[]=[];
 const mixed=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,
  agent:async(worktree:string)=>{n++;if(n===1){writeFileSync(join(worktree,"forge.toml"),'[package]\nname="select"\ntype="code"\nversion="0.1.0"\n# edited\n');git(worktree,"add","forge.toml")}else{writeFileSync(join(worktree,"main.ts"),"export const n=5;\n");git(worktree,"add","main.ts")}git(worktree,"commit","-qm","c"+n);return{sessionId:"g"+n,summary:"",turns:1,costUsd:0}},
  chooser:async(_root,plan)=>{plans.push(plan.candidates.length);return firstChooser(_root,plan)},reviewer:approve,gate:passGate});
 assert.deepEqual(plans,[1]);assert.equal(mixed.excluded.map(e=>e.reason).join(","),"CANDIDATE_GATE_DEFINITION_CHANGED");assert.equal(mixed.outcome.kind,"reviewed_candidate");
}));
function chooserPlan(root:string,base:string,a:string):CandidatePlan{return{basis:{workspaceId:root,revision:base},task:"Bump n",candidates:[{parentBasis:{workspaceId:root,revision:base},basis:{workspaceId:root,revision:a}}]}}
test("Claude chooser refuses a query stream that ends without a terminal result event",()=>repo(async(root,base)=>{
 const a="a".repeat(40);const plan=chooserPlan(root,base,a);
 const none=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"assistant",message:"thinking"};yield{type:"system",subtype:"init"}}});
 assert.deepEqual(none,{revision:null,reason:"SELECTION_TERMINAL_MISSING"});
 const empty=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){}});
 assert.deepEqual(empty,{revision:null,reason:"SELECTION_TERMINAL_MISSING"});
}));
test("Claude chooser refuses a non-success or errored terminal result even when it carries a valid structured report",()=>repo(async(root,base)=>{
 const a="a".repeat(40);const plan=chooserPlan(root,base,a);const report={chosenRevision:a,rationale:"smallest change"};
 const cases:[string,Record<string,unknown>,string][]=[
  ["error subtype",{type:"result",subtype:"error_max_turns",session_id:"s",structured_output:report},"SELECTION_TERMINAL_ERROR:error_max_turns"],
  ["success flagged is_error",{type:"result",subtype:"success",is_error:true,session_id:"s",structured_output:report},"SELECTION_TERMINAL_ERROR:success"],
  ["missing subtype",{type:"result",session_id:"s",structured_output:report},"SELECTION_TERMINAL_ERROR:unknown"],
 ];
 for(const [label,terminal,reason] of cases){
  const out=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield terminal}});
  assert.deepEqual(out,{revision:null,reason},label);
 }
 // Positive control: the same report on a success terminal with is_error false is accepted.
 const ok=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",is_error:false,session_id:"sel-ok",structured_output:report}}});
 assert.deepEqual(ok,{revision:a,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"sel-ok"}});
}));
test("Claude chooser refuses a structured report that is not an object or carries a blank or non-string rationale",()=>repo(async(root,base)=>{
 const a="a".repeat(40);const plan=chooserPlan(root,base,a);
 const reports:[string,unknown][]=[
  ["missing report",undefined],["null report",null],["string report","chosen"],["array report",[a]],
  ["missing rationale",{chosenRevision:a}],["empty rationale",{chosenRevision:a,rationale:""}],["blank rationale",{chosenRevision:a,rationale:"   "}],["non-string rationale",{chosenRevision:a,rationale:42}],
 ];
 for(const [label,structured_output] of reports){
  const out=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",session_id:"s",structured_output}}});
  assert.deepEqual(out,{revision:null,reason:"SELECTION_REPORT_INVALID"},label);
 }
 // The plan check runs before the rationale check: an off-plan revision reports its own reason.
 const off=await chooseWithClaude(root,plan,"Bump n",{query:async function*(){yield{type:"result",subtype:"success",session_id:"s",structured_output:{chosenRevision:"c".repeat(40),rationale:"   "}}}});
 assert.deepEqual(off,{revision:null,reason:"SELECTION_NOT_IN_PLAN"});
}));
test("a passing re-verification without a native operation id is not an independent integration",()=>repo(async(root,base)=>{
 const calls:string[]=[];
 const gate:Gate=async worktree=>{calls.push(worktree);const first=calls.length===1;return{kind:"passed",reason:"FORGE_GATE_PASS",operationId:first?"op-first-native":null,basis:{commit:git(worktree,"rev-parse","HEAD"),tree:git(worktree,"rev-parse","HEAD^{tree}"),clean:true as const},native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}} satisfies GateObservation};
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate});
 assert.equal(out.outcome.kind,"reviewed_candidate");assert.equal(calls.length,2);
 const integration=out.integration;assert.ok(integration);
 assert.equal(integration.baseUnchanged,true);assert.equal(integration.fastForward,true);
 assert.equal(integration.reverification?.verdict,"passed");assert.equal(integration.reverification?.evidence,undefined);
 assert.equal(integration.verified,false);assert.equal(integration.reason,"INTEGRATION_REVERIFICATION_UNREFERENCED");
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");
}));
test("a candidate agent that throws is excluded as CANDIDATE_AGENT_FAILED with its message, Error or not, while the other candidate proceeds",()=>repo(async(root,base)=>{
 for(const [label,thrown,expected] of [["an Error","error","CANDIDATE_AGENT_FAILED: agent crashed"],["a non-Error value","string","CANDIDATE_AGENT_FAILED: boom"]] as const){
  const record:AgentRecord[]=[];let first=true;
  const agent=async(worktree:string,prompt:string)=>{if(first){first=false;if(thrown==="error")throw new Error("agent crashed");throw "boom";}return committingAgent(record)(worktree,prompt)};
  const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:2,agent,chooser:firstChooser,reviewer:approve,gate:passGate});
  assert.equal(out.excluded.length,1,label);assert.equal(out.excluded[0]?.reason,expected,label);
  assert.equal(out.plan.candidates.length,1,label);assert.equal(out.outcome.kind,"reviewed_candidate",label);
  assert.equal(git(root,"rev-parse","HEAD"),base,label);
 }
}));
test("a chooser query that changes the root workspace, by a commit or by leaving it dirty, is SELECTION_WORKSPACE_CHANGED even when it answered",()=>repo(async(root,base)=>{
 const a="a".repeat(40);
 const answer={type:"result",subtype:"success",session_id:"sel-drift",result:"",structured_output:{chosenRevision:a,rationale:"x"}};
 const drifts:ReadonlyArray<readonly [string,()=>void]>=[
  ["a commit in the root",()=>{writeFileSync(join(root,"main.ts"),"export const n=9;\n");git(root,"add","main.ts");git(root,"commit","-qm","drift")}],
  ["an uncommitted edit in the root",()=>{writeFileSync(join(root,"main.ts"),"export const n=10;\n")}],
 ];
 for(const [label,drift] of drifts){
  git(root,"reset","-q","--hard",base);
  await assert.rejects(()=>chooseWithClaude(root,chooserPlan(root,base,a),"Bump n",{query:async function*(){drift();yield answer}}),(e:unknown)=>e instanceof Error&&e.message.startsWith("SELECTION_WORKSPACE_CHANGED"),label);
 }
 git(root,"reset","-q","--hard",base);
}));
test("a claude-agent-sdk module without a callable query is CLAUDE_SELECTION_SDK_UNAVAILABLE, and the chooser asks the importer for exactly that package",()=>repo(async(root,base)=>{
 const a="a".repeat(40);const plan=chooserPlan(root,base,a);
 for(const [label,sdk] of [["empty module",{}],["non-function query",{query:"query"}],["null module",null]] as const){
  await assert.rejects(()=>chooseWithClaude(root,plan,"Bump n",{importer:async()=>sdk}),(e:unknown)=>e instanceof Error&&e.message.startsWith("CLAUDE_SELECTION_SDK_UNAVAILABLE"),label);
 }
 let specifier="";
 const choice=await chooseWithClaude(root,plan,"Bump n",{importer:async s=>{specifier=s;return{query:async function*(){yield{type:"result",subtype:"success",session_id:"sel-imp",result:"",structured_output:{chosenRevision:a,rationale:"x"}}}}}});
 assert.equal(specifier,"@anthropic-ai/claude-agent-sdk");
 assert.deepEqual(choice,{revision:a,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:"sel-imp"}});
}));
test("integration reports INTEGRATION_NOT_FAST_FORWARD when the chosen commit no longer descends from the planned base, and still names the second gate result",()=>repo(async(root,base)=>{
 // Replace refs are the mechanism under test, so an ambient GIT_NO_REPLACE_OBJECTS must not disable them for this arm.
 const ambient=process.env["GIT_NO_REPLACE_OBJECTS"];delete process.env["GIT_NO_REPLACE_OBJECTS"];
 try{
 const g=countingGate(["passed","passed"]);
 // A replace ref rewrites the chosen commit's parentage after review: the base is unchanged but the chosen commit no longer descends from it.
 const approveThenReparent:Reviewer=async(worktree,revision,task,options)=>{
  const tree=git(root,"rev-parse",revision+"^{tree}");
  const orphan=git(root,"commit-tree",tree,"-m","unrelated root");
  git(root,"replace","--force",revision,orphan);
  return approve(worktree,revision,task,options);
 };
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:approveThenReparent,gate:g.gate});
 assert.equal(out.outcome.kind,"reviewed_candidate");
 const integration=out.integration;assert.ok(integration);
 assert.equal(integration.baseUnchanged,true);assert.equal(integration.fastForward,false);assert.equal(integration.verified,false);
 assert.equal(integration.reason,"INTEGRATION_NOT_FAST_FORWARD");
 assert.equal(integration.reverification?.verdict,"passed","the second gate still ran; the fast-forward leg outranks a passing re-verification");
 assert.equal(g.calls.length,2);
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");
 }finally{if(ambient!==undefined)process.env["GIT_NO_REPLACE_OBJECTS"]=ambient}
}));
test("a reviewer that approves a revision other than the chosen candidate is REVIEW_EVIDENCE_UNESTABLISHED carrying its evidence, never reaches the gate and never integrates",()=>repo(async(root,base)=>{
 const foreignEvidence={system:"claude-agent-sdk",kind:"review-session",id:"review-foreign"};
 // The reviewer answers for the planned base, never for the revision it was asked to review.
 const foreign:Reviewer=async worktree=>({basis:{workspaceId:worktree,revision:base},verdict:"approved",evidence:foreignEvidence});
 const g=countingGate(["passed","passed"]);
 const out=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,integrate:true,agent:committingAgent([]),chooser:firstChooser,reviewer:foreign,gate:g.gate});
 const outcome=out.outcome;
 assert.equal(outcome.kind,"indeterminate","a review of the wrong commit is indeterminate");
 if(outcome.kind!=="indeterminate")throw Error("narrowed");
 assert.equal(outcome.reason,"REVIEW_EVIDENCE_UNESTABLISHED","the observable refusal is the review basis check, not a reviewed candidate");
 assert.deepEqual(outcome.evidence,foreignEvidence,"the refusal carries the producer reference of the foreign review");
 assert.equal(g.calls.length,0,"a review of the wrong commit never reaches Forge");
 assert.equal(out.integration,null,"integrate:true does not integrate a candidate whose review is foreign");
 assert.equal(git(root,"rev-parse","HEAD"),base,"the host never moves the base ref");
 // Positive control: the file's approve reviewer on a fresh plan reviews the candidate and reaches exactly one gate, so the refusal above belongs to the foreign basis.
 const g2=countingGate(["passed"]);
 const ok=await selectAndVerifyCandidate(root,"Bump n",{candidates:1,agent:committingAgent([]),chooser:firstChooser,reviewer:approve,gate:g2.gate});
 assert.equal(ok.outcome.kind,"reviewed_candidate","the positive control reaches a reviewed candidate");
 assert.equal(g2.calls.length,1,"the positive control gates exactly once");
}));
