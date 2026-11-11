/** One bounded HyperUnix import-closure observation. Not general task scope. */
import type{DevelopmentRequest,ScopeResult}from"@mechanical/workflows-development";
import{cleanGitBasis}from"./live-gate.js";
interface NativeResult{readonly exitCode:number;readonly terminalReached:boolean;readonly coverageSummary:{readonly completeness:string;readonly licensesAbsence:boolean};readonly results:readonly unknown[];readonly queryDigest?:string;readonly diagnostics?:readonly {readonly code:string}[]}
export type DependencyRead=(root:string,seed:string)=>Promise<NativeResult>;
function object(value:unknown):Record<string,unknown>|null{return value!==null&&typeof value==="object"&&!Array.isArray(value)?value as Record<string,unknown>:null}
const nativeRead:DependencyRead=async(root,seed)=>{
 const specifier:string="@hyperunix/sdk";
 const sdk=await import(specifier);
 const hx=await sdk.HyperUnix.open({workspace:root});
 try {const answer=await hx.dependencies(seed,{depth:1});return{
  exitCode:answer.exitCode,terminalReached:answer.terminalReached,coverageSummary:answer.coverageSummary,
  results:answer.results,queryDigest:answer.queryDigest,diagnostics:answer.diagnostics,
 }} finally{await hx.close()}
};
/**
 * A complete answer is only about the selected seed's one-hop imports. The
 * caller must independently establish that seed selection covers its TASK;
 * this function never asserts global task scope merely from import coverage.
 */
export async function discoverDependencyScope(root:string,seed:string,request:DevelopmentRequest,read:DependencyRead=nativeRead):Promise<ScopeResult>{
 const basis={workspaceId:request.workspaceId,revision:request.baseRevision};
 if(!seed.trim()||request.workspaceId!==root)return{basis,coverage:"unknown",files:[]};
 const before=await cleanGitBasis(root);
 if(before.commit!==request.baseRevision)return{basis,coverage:"unknown",files:[]};
 let observed:NativeResult;
 try{observed=await read(root,seed)}catch{return{basis,coverage:"unknown",files:[]}}
 const after=await cleanGitBasis(root).catch(()=>null);
 if(after===null||after.commit!==before.commit||after.tree!==before.tree)return{basis,coverage:"unknown",files:[]};
 const files=[seed];
 for(const row of observed.results){const focus=object(row)?.["focus"];
  if(!Array.isArray(focus))continue;
  for(const item of focus){const encoded=object(object(item)?.["key"])?.["$bytes"];
   if(typeof encoded!=="string")continue;
   const file=Buffer.from(encoded,"base64").toString("utf8");if(file&&!files.includes(file))files.push(file);
  }
 }
 const coverage=observed.coverageSummary.completeness==="incomplete"||
   (observed.exitCode===0&&observed.coverageSummary.completeness==="complete")?"partial":"unknown";
 const nativeRef=typeof observed.queryDigest==="string"&&observed.queryDigest?{evidence:{system:"hyper-unix",kind:"dependency-query",id:observed.queryDigest}}:{};
 // No task-coverage certificate was produced. A complete import-closure
 // observation stays partial at the workflow task-scope boundary.
 return coverage==="unknown"?{basis,coverage:"unknown",files:[],...nativeRef}:{basis,coverage:"partial",files,...nativeRef};
}
