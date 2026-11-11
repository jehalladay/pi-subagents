/** Opt-in read-only Claude Agent SDK review of one clean committed candidate. */
import {cleanGitBasis,packageRoot} from "./live-gate.js";
import {defaultReadSdkManifest} from "./claude-implement.js";
import {readSdkIdentity} from "./invocation-identity.js";
import type {SdkIdentity} from "./invocation-identity.js";
import type {ReviewResult} from "@mechanical/workflows-development";
interface OutputFormat {readonly type:"json_schema";readonly schema:Record<string,unknown>}
interface QueryInput {readonly prompt:string;readonly options:{readonly cwd:string;readonly allowedTools:readonly string[];readonly permissionMode:"dontAsk";readonly settingSources:readonly string[];readonly maxTurns:number;readonly maxBudgetUsd:number;readonly outputFormat:OutputFormat;readonly model?:string}}
type Query=(input:QueryInput)=>AsyncIterable<unknown>;
export interface ReviewOptions {readonly model?:string;readonly maxTurns?:number;readonly maxBudgetUsd?:number;readonly query?:Query;readonly loadSdk?:()=>Promise<unknown>;readonly readSdkManifest?:()=>Promise<string|null>}
/** A review receipt that names the SDK package and semver it ran under (EAT-R032 b1); null when no manifest could be located. `complete` and `missingAxes` mirror the implementation class's identity marker: complete:false with missingAxes ["sdk"] exactly when sdk is null. */
export type ClaudeReviewResult=ReviewResult&{readonly sdk?:SdkIdentity|null;readonly complete?:boolean;readonly missingAxes?:readonly "sdk"[]}
/** The shape the provider must fill; the host still re-validates every field. */
const REVIEW_SCHEMA:OutputFormat={type:"json_schema",schema:{type:"object",additionalProperties:false,
 properties:{candidateRevision:{type:"string",description:"The exact reviewed Git commit SHA"},verdict:{type:"string",enum:["approved","rejected","unknown"]},rationale:{type:"string"}},
 required:["candidateRevision","verdict","rationale"]}};
function object(v:unknown):Record<string,unknown>|null{return v!==null&&typeof v==="object"&&!Array.isArray(v)?v as Record<string,unknown>:null}
function defaultLoadSdk():Promise<unknown>{const specifier:string="@anthropic-ai/claude-agent-sdk";return import(specifier)}
async function getQuery(override:Query|undefined,loadSdk:()=>Promise<unknown>=defaultLoadSdk):Promise<Query>{
 if(override)return override;
 let sdk:unknown;
 try{sdk=await loadSdk()}catch{throw new Error("CLAUDE_REVIEW_SDK_UNAVAILABLE: install @anthropic-ai/claude-agent-sdk into development-rig")}
 const query=object(sdk)?.["query"];
 if(typeof query!=="function")throw new Error("CLAUDE_REVIEW_SDK_UNAVAILABLE: query missing");
 return query as Query;
}
/** Plain JSON, or exactly one fenced ```json block; anything else is not a report. */
function parseReport(text:string):unknown{
 const trimmed=text.trim();
 try{return JSON.parse(trimmed)}catch{/* fall through to a single fenced block */}
 const fences=[...trimmed.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)];
 if(fences.length!==1)return undefined;
 try{return JSON.parse(fences[0]?.[1]??"")}catch{return undefined}
}
export async function runClaudeReview(rootInput:string,candidateRevision:string,task:string,options:ReviewOptions={}):Promise<ClaudeReviewResult>{
 const root=packageRoot(rootInput);
 if(!task.trim()||!candidateRevision.trim())throw new Error("REVIEW_REQUEST_INVALID: task and revision required");
 const before=await cleanGitBasis(root);
 if(before.commit!==candidateRevision)throw new Error("REVIEW_CANDIDATE_BASIS_MISMATCH: expected committed HEAD");
 const query=await getQuery(options.query,options.loadSdk);
 // The SDK axis comes from the installed manifest bytes, read and validated before any dispatch.
 const manifestText=await (options.readSdkManifest??defaultReadSdkManifest)();
 const sdk=manifestText===null?null:readSdkIdentity(manifestText);
 const settings={cwd:root,allowedTools:["Read","Glob","Grep","Bash(git status *)","Bash(git show *)"],permissionMode:"dontAsk" as const,settingSources:[],maxTurns:options.maxTurns??20,maxBudgetUsd:options.maxBudgetUsd??5,outputFormat:REVIEW_SCHEMA,...(options.model?{model:options.model}:{})};
 const prompt=[
  "Review this exact committed Git candidate without modifying files.",
  "Task: "+task,
  "Candidate commit: "+candidateRevision,
  "Use read-only tools; inspect the candidate diff (git show "+candidateRevision+") and relevant tests.",
  "Finish with the structured JSON report {candidateRevision,verdict,rationale}: candidateRevision must be exactly "+candidateRevision+".",
  "Verdict rules: approved when the committed change implements the task and its tests assert the task's expected behavior; rejected when the candidate contradicts the task or its tests, or the tests assert the wrong behavior; unknown only if you could not read the candidate diff.",
  "You cannot run tests or Forge here; judge the code and tests by reading them, and do not answer unknown merely because you could not execute them.",
  "A successful model response is an observation, not Forge gate evidence.",
 ].join("\n");
 let terminal:Record<string,unknown>|null=null;
 try{for await(const event of query({prompt,options:settings})){
  const value=object(event);if(value?.["type"]==="result")terminal=value;
 }}finally{
  const after=await cleanGitBasis(root).catch(()=>null);
  if(after===null||after.commit!==before.commit||after.tree!==before.tree)throw new Error("REVIEW_WORKSPACE_CHANGED: reconcile source before trusting review");
 }
 const basis={workspaceId:root,revision:candidateRevision};
 const unknown=(reason:string,detail?:string):ClaudeReviewResult=>({basis,verdict:"unknown",reason,...(detail?{detail:detail.slice(0,300)}:{})});
 if(terminal===null)return unknown("REVIEW_TERMINAL_MISSING");
 if(terminal["subtype"]!=="success"||terminal["is_error"]===true)return unknown("REVIEW_TERMINAL_ERROR:"+String(terminal["subtype"]??"unknown"));
 if(typeof terminal["session_id"]!=="string"||!terminal["session_id"])return unknown("REVIEW_SESSION_UNIDENTIFIED");
 const report=terminal["structured_output"]!==undefined?terminal["structured_output"]
  :typeof terminal["result"]==="string"?parseReport(terminal["result"]):undefined;
 if(report===undefined)return unknown("REVIEW_RESULT_NOT_JSON");
 const data=object(report);
 if(data===null)return unknown("REVIEW_REPORT_INVALID");
 if(data["candidateRevision"]!==candidateRevision)return unknown("REVIEW_REPORT_BASIS_MISMATCH");
 if(typeof data["rationale"]!=="string"||!data["rationale"].trim())return unknown("REVIEW_REPORT_INVALID");
 if(data["verdict"]==="unknown")return unknown("REVIEW_MODEL_UNDECIDED",data["rationale"]);
 if(data["verdict"]!=="approved"&&data["verdict"]!=="rejected")return unknown("REVIEW_REPORT_INVALID");
 return{basis,verdict:data["verdict"],sdk,complete:sdk!==null,missingAxes:sdk===null?["sdk"]:[],evidence:{system:"claude-agent-sdk",kind:"review-session",id:terminal["session_id"]}};
}
