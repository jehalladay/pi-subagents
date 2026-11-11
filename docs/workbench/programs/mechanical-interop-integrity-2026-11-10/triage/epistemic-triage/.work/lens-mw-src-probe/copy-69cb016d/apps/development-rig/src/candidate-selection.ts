/**
 * Isolated-worktree candidate planning, one structured read-only selection, then
 * review and native Forge verification at the chosen candidate's own basis.
 * Each candidate agent writes in its own Git worktree on a host-created branch;
 * the main checkout is never written. This is plain Git isolation, not Forge
 * Workspace Families, and the chooser's verdict is a model observation.
 */
import {execFile} from "node:child_process";
import {promisify} from "node:util";
import {mkdtemp,rm,readFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {randomBytes} from "node:crypto";
import type {VerificationResult,Candidate,CandidatePlan,DevelopmentRequest,EvidenceRef,ReviewResult,ReviewedOutcome,SubjectBasis} from "@mechanical/workflows-development";
import {reviewCandidate} from "@mechanical/workflows-development";
import {cleanGitBasis,packageRoot,verifyExistingCandidate,type GateObservation} from "./live-gate.js";
import {runClaudeImplementation,type AgentRun,type AgentOptions} from "./claude-implement.js";
import {runClaudeReview,type ReviewOptions} from "./claude-review.js";

const exec=promisify(execFile);
async function git(root:string,...args:string[]):Promise<string>{const out=await exec("git",["-C",root,...args],{encoding:"utf8",maxBuffer:4*1024*1024});return out.stdout.trim()}

export type Choice={readonly revision:string;readonly evidence:EvidenceRef}|{readonly revision:null;readonly reason:string};
interface OutputFormat{readonly type:"json_schema";readonly schema:Record<string,unknown>}
interface QueryInput{readonly prompt:string;readonly options:{readonly cwd:string;readonly allowedTools:readonly string[];readonly permissionMode:"dontAsk";readonly settingSources:readonly string[];readonly maxTurns:number;readonly maxBudgetUsd:number;readonly outputFormat:OutputFormat;readonly model?:string}}
type Query=(input:QueryInput)=>AsyncIterable<unknown>;
export interface ChooserOptions{readonly model?:string;readonly maxTurns?:number;readonly maxBudgetUsd?:number;readonly query?:Query;readonly importer?:(specifier:string)=>Promise<unknown>}
export type Chooser=(root:string,plan:CandidatePlan,task:string,options:ChooserOptions)=>Promise<Choice>;
export type Reviewer=(root:string,revision:string,task:string,options:ReviewOptions)=>Promise<ReviewResult>;
export interface SelectionOptions extends ChooserOptions{
 readonly candidates?:number;
 readonly agent?:AgentRun;
 readonly chooser?:Chooser;
 readonly reviewer?:Reviewer;
 readonly gate?:(worktree:string)=>Promise<GateObservation>;
 readonly forgeExecutable?:string;
 /** After a reviewed candidate: check the base still equals the planned basis, confirm fast-forward, and re-gate the chosen commit in a fresh worktree. The host never moves the base ref. */
 readonly integrate?:boolean;
}
export interface IntegrationReport{
 readonly basis:SubjectBasis;
 readonly candidate:SubjectBasis;
 readonly baseUnchanged:boolean;
 readonly fastForward:boolean;
 readonly reverification:VerificationResult|null;
 readonly verified:boolean;
 readonly reason?:string;
}
export interface PlannedCandidate{readonly revision:string;readonly branch:string;readonly worktree:string;readonly evidence:EvidenceRef}
export interface ExcludedCandidate{readonly branch:string;readonly worktree:string;readonly reason:string}
export interface SelectionReport{
 readonly basis:SubjectBasis;
 readonly plan:{readonly candidates:readonly PlannedCandidate[]};
 readonly excluded:readonly ExcludedCandidate[];
 readonly choice:Choice|null;
 readonly outcome:ReviewedOutcome;
 readonly integration:IntegrationReport|null;
}
function object(v:unknown):Record<string,unknown>|null{return v!==null&&typeof v==="object"&&!Array.isArray(v)?v as Record<string,unknown>:null}
async function getQuery(override:Query|undefined,importer:(specifier:string)=>Promise<unknown>=specifier=>import(specifier)):Promise<Query>{
 if(override)return override;
 const specifier:string="@anthropic-ai/claude-agent-sdk";
 const sdk:unknown=await importer(specifier);
 const query=object(sdk)?.["query"];
 if(typeof query!=="function")throw new Error("CLAUDE_SELECTION_SDK_UNAVAILABLE: query missing");
 return query as Query;
}
/** Read-only structured choice among planned commits; the choice is constrained to the plan by schema and re-checked. */
export const chooseWithClaude:Chooser=async(root,plan,task,options)=>{
 const revisions=plan.candidates.map(c=>c.basis.revision);
 if(revisions.length===0)return{revision:null,reason:"SELECTION_NO_CANDIDATES"};
 const before=await cleanGitBasis(root);
 const query=await getQuery(options.query,options.importer);
 const format:OutputFormat={type:"json_schema",schema:{type:"object",additionalProperties:false,
  properties:{chosenRevision:{type:"string",enum:revisions},rationale:{type:"string"}},required:["chosenRevision","rationale"]}};
 const prompt=[
  "Choose the best committed candidate for this task without modifying files.",
  "Task: "+task,
  "Base commit: "+plan.basis.revision,
  "Candidates (inspect each with git show <sha> and git diff "+plan.basis.revision+" <sha>):",
  ...revisions.map((r,i)=>"  "+(i+1)+". "+r),
  "Prefer the candidate that implements the task correctly with the smallest, clearest change and adequate tests.",
  "Finish with the structured JSON report {chosenRevision,rationale}; chosenRevision must be one of the listed commits exactly.",
  "Your choice is an observation, not Forge gate evidence.",
 ].join("\n");
 let terminal:Record<string,unknown>|null=null;
 try{for await(const event of query({prompt,options:{cwd:root,allowedTools:["Read","Glob","Grep","Bash(git status *)","Bash(git show *)","Bash(git diff *)"],permissionMode:"dontAsk",settingSources:[],maxTurns:options.maxTurns??20,maxBudgetUsd:options.maxBudgetUsd??5,outputFormat:format,...(options.model?{model:options.model}:{})}})){
  const value=object(event);if(value?.["type"]==="result")terminal=value;
 }}finally{
  const after=await cleanGitBasis(root).catch(()=>null);
  if(after===null||after.commit!==before.commit||after.tree!==before.tree)throw new Error("SELECTION_WORKSPACE_CHANGED: reconcile source before trusting the choice");
 }
 if(terminal===null)return{revision:null,reason:"SELECTION_TERMINAL_MISSING"};
 if(terminal["subtype"]!=="success"||terminal["is_error"]===true)return{revision:null,reason:"SELECTION_TERMINAL_ERROR:"+String(terminal["subtype"]??"unknown")};
 const session=terminal["session_id"];
 if(typeof session!=="string"||!session)return{revision:null,reason:"SELECTION_SESSION_UNIDENTIFIED"};
 const report=object(terminal["structured_output"]);
 if(report===null)return{revision:null,reason:"SELECTION_REPORT_INVALID"};
 const chosen=report["chosenRevision"];
 if(typeof chosen!=="string"||!revisions.includes(chosen))return{revision:null,reason:"SELECTION_NOT_IN_PLAN"};
 if(typeof report["rationale"]!=="string"||!report["rationale"].trim())return{revision:null,reason:"SELECTION_REPORT_INVALID"};
 return{revision:chosen,evidence:{system:"claude-agent-sdk",kind:"selection-session",id:session}};
};
class SelectionUndecided extends Error{constructor(readonly reason:string){super(reason)}}
/**
 * Plan N isolated candidates, choose one, review it and gate it at its own commit.
 * Worktrees are host-owned scratch and are removed afterwards; the candidate
 * branches stay so every planned commit remains referenced for audit.
 */
export async function selectAndVerifyCandidate(rootInput:string,task:string,options:SelectionOptions={}):Promise<SelectionReport>{
 const root=packageRoot(rootInput);
 if(!task.trim())throw new Error("SELECTION_REQUEST_INVALID: task required");
 const count=options.candidates??2;
 if(!Number.isInteger(count)||count<1||count>8)throw new Error("SELECTION_REQUEST_INVALID: candidates must be 1..8");
 let base;
 try{base=await cleanGitBasis(root)}catch(error){throw new Error("SELECTION_BASIS_NOT_CLEAN: "+(error instanceof Error?error.message:String(error)))}
 const basis:SubjectBasis={workspaceId:root,revision:base.commit};
 const request:DevelopmentRequest={task,workspaceId:root,baseRevision:base.commit};
 const agent=options.agent??runClaudeImplementation;
 const agentOptions:AgentOptions={...(options.model?{model:options.model}:{}),...(options.maxTurns?{maxTurns:options.maxTurns}:{}),...(options.maxBudgetUsd?{maxBudgetUsd:options.maxBudgetUsd}:{})};
 const originalGate=await readFile(join(root,"forge.toml"));
 const planned:PlannedCandidate[]=[];const excluded:ExcludedCandidate[]=[];const worktrees:string[]=[];
 const prompt=[
  "Implement this task in the current Git worktree and commit the result.",
  "Task: "+task,"Base commit: "+base.commit,
  "Use Write/Edit for files, then run git add and git commit as separate Bash tool calls (no &&, pipes or subshells).",
  "Commit directly on the current branch; this host already assigned an isolated worktree and branch. Do not create or switch branches.",
  "Do not modify forge.toml or files outside this worktree. Do not publish. Do not claim verification; the host runs Forge afterwards.",
 ].join("\n");
 try{
  for(let i=1;i<=count;i++){
   const branch="mw/candidate/"+base.commit.slice(0,7)+"-"+i+"-"+randomBytes(3).toString("hex");
   const worktree=await mkdtemp(join(tmpdir(),"mw-candidate-"));
   worktrees.push(worktree);
   await git(root,"worktree","add","-q","-b",branch,worktree,base.commit);
   let session:string;
   try{session=(await agent(worktree,prompt,agentOptions)).sessionId}
   catch(error){excluded.push({branch,worktree,reason:"CANDIDATE_AGENT_FAILED: "+(error instanceof Error?error.message:String(error))});continue}
   // A planned candidate's evidence names its agent session; a blank id would plan work attributed to nobody.
   if(typeof session!=="string"||session.trim().length===0){excluded.push({branch,worktree,reason:"CANDIDATE_SESSION_UNIDENTIFIED"});continue}
   if((await git(worktree,"status","--porcelain=v1","--untracked-files=all")).length>0){excluded.push({branch,worktree,reason:"CANDIDATE_WORKTREE_DIRTY"});continue}
   const head=await git(worktree,"rev-parse","--verify","HEAD");
   if(head===base.commit){excluded.push({branch,worktree,reason:"CANDIDATE_NOT_COMMITTED"});continue}
   if((await git(worktree,"rev-parse","--verify",head+"^")).trim()!==base.commit){excluded.push({branch,worktree,reason:"CANDIDATE_PARENT_MISMATCH"});continue}
   if(!originalGate.equals(await readFile(join(worktree,"forge.toml")))){excluded.push({branch,worktree,reason:"CANDIDATE_GATE_DEFINITION_CHANGED"});continue}
   planned.push({revision:head,branch,worktree,evidence:{system:"claude-agent-sdk",kind:"session",id:session}});
  }
  const plan:CandidatePlan={basis,task,candidates:planned.map(c=>({parentBasis:basis,basis:{workspaceId:root,revision:c.revision},evidence:c.evidence}))};
  const worktreeOf=(revision:string):string=>{const c=planned.find(p=>p.revision===revision);if(!c)throw new Error("SELECTION_CANDIDATE_UNKNOWN");return c.worktree};
  let choice:Choice|null=null;
  const chooser=options.chooser??chooseWithClaude;
  const reviewer=options.reviewer??runClaudeReview;
  const chooserOptions:ChooserOptions={...(options.model?{model:options.model}:{}),...(options.maxTurns?{maxTurns:options.maxTurns}:{}),...(options.maxBudgetUsd?{maxBudgetUsd:options.maxBudgetUsd}:{}),...(options.query?{query:options.query}:{})};
  let outcome:ReviewedOutcome;
  try{
   outcome=await reviewCandidate({
    plan:async()=>plan,
    choose:async()=>{
     choice=await chooser(root,plan,task,chooserOptions);
     if(choice.revision===null)throw new SelectionUndecided(choice.reason);
     // The selection is a model observation and must say which selection session made it.
     // An injected chooser carrying any other producer reference never enters review or Forge.
     const sel=choice.evidence;
     if(sel.system!=="claude-agent-sdk"||sel.kind!=="selection-session"||typeof sel.id!=="string"||sel.id.trim().length===0){
      throw new SelectionUndecided("SELECTION_EVIDENCE_UNESTABLISHED");
     }
     const chosen=choice.revision;
     return plan.candidates.find(c=>c.basis.revision===chosen)??{parentBasis:basis,basis:{workspaceId:root,revision:chosen}};
    },
    review:async candidate=>{
     const review=await reviewer(worktreeOf(candidate.basis.revision),candidate.basis.revision,task,chooserOptions);
     if(review.basis.revision!==candidate.basis.revision)return{...review,verdict:"unknown",reason:"REVIEW_REPORT_BASIS_MISMATCH"};
     return{...review,basis:{workspaceId:root,revision:review.basis.revision}};
    },
    verify:async candidate=>{
     const worktree=worktreeOf(candidate.basis.revision);
     const gate=await (options.gate?options.gate(worktree):verifyExistingCandidate(worktree,options.forgeExecutable??"forge"));
     return{basis:{workspaceId:root,revision:candidate.basis.revision},
      verdict:gate.basis.commit!==candidate.basis.revision?"unknown":gate.kind==="passed"?"passed":gate.kind==="failed"?"failed":"unknown",
      ...(gate.operationId?{evidence:{system:"forge",kind:"operation",id:gate.operationId}}:{}),
      diagnostic:gate.reason};
    },
   },request);
  }catch(error){
   if(error instanceof SelectionUndecided)outcome={kind:"indeterminate",reason:error.reason};
   else throw error;
  }
  let integration:IntegrationReport|null=null;
  if(options.integrate&&outcome.kind==="reviewed_candidate"){
   const chosen=outcome.candidate.basis.revision;
   const candidate:SubjectBasis={workspaceId:root,revision:chosen};
   const headNow=await git(root,"rev-parse","HEAD");
   const baseUnchanged=headNow===base.commit;
   const fastForward=await git(root,"merge-base","--is-ancestor",base.commit,chosen).then(()=>true,()=>false);
   if(!baseUnchanged){
    integration={basis,candidate,baseUnchanged,fastForward,reverification:null,verified:false,reason:"INTEGRATION_BASE_MOVED"};
   }else{
    // A second, independent gate on the chosen commit in a worktree the agent never touched.
    const fresh=await mkdtemp(join(tmpdir(),"mw-integrate-"));worktrees.push(fresh);
    await git(root,"worktree","add","-q","--detach",fresh,chosen);
    const gate=await (options.gate?options.gate(fresh):verifyExistingCandidate(fresh,options.forgeExecutable??"forge"));
    const reverification:VerificationResult={basis:candidate,
     verdict:gate.basis.commit!==chosen?"unknown":gate.kind==="passed"?"passed":gate.kind==="failed"?"failed":"unknown",
     ...(gate.operationId?{evidence:{system:"forge",kind:"operation",id:gate.operationId}}:{}),diagnostic:gate.reason};
    const firstEvidence=outcome.verification.evidence?.id;
    const reason=!fastForward?"INTEGRATION_NOT_FAST_FORWARD":reverification.verdict!=="passed"?"INTEGRATION_REVERIFICATION_NOT_PASSED":!reverification.evidence?"INTEGRATION_REVERIFICATION_UNREFERENCED":reverification.evidence.id===firstEvidence?"INTEGRATION_SAME_OPERATION":undefined;
    integration={basis,candidate,baseUnchanged,fastForward,reverification,verified:reason===undefined,...(reason?{reason}:{})};
   }
  }
  return{basis,plan:{candidates:planned},excluded,choice,outcome,integration};
 }finally{
  for(const worktree of worktrees){
   await git(root,"worktree","remove","--force",worktree).catch(()=>undefined);
   await rm(worktree,{recursive:true,force:true}).catch(()=>undefined);
  }
  await git(root,"worktree","prune").catch(()=>undefined);
 }
}
