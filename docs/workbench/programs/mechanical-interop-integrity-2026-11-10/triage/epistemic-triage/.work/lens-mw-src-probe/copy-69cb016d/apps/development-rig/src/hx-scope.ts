/**
 * Conservative task-scope adapter over HyperUnix native observations.
 * The installed `find` command returns incomplete coverage on live workspaces
 * and cannot bind a pinned Git view. It must not authorize a write; use a
 * separately verified task query before returning complete coverage.
 */
import type { DevelopmentRequest, ScopeResult } from "@mechanical/workflows-development";
interface HxAnswer {readonly kind:string;readonly seq?:number;readonly body?:unknown}
export interface HxObservation {
  readonly exitCode:number;
  readonly terminalReached:boolean;
  readonly coverageSummary:{readonly completeness:string;readonly licensesAbsence?:boolean;readonly answerCount?:number};
  readonly frames:readonly HxAnswer[];
  readonly results?:readonly unknown[];
  readonly queryDigest?:string|null;
  readonly revision?:string|null;
  readonly scopeKind?:"task"|"filesystem"|"git-tree";
}
export type HxExecute = (request:DevelopmentRequest)=>Promise<HxObservation>;
function object(v:unknown):Record<string,unknown>|null{return v!==null&&typeof v==="object"&&!Array.isArray(v)?v as Record<string,unknown>:null}
/**
 * The default uses the public SDK, but marks its live result incomplete
 * unless the producer supplies a pinned task query and complete coverage.
 */
async function runNative(request:DevelopmentRequest):Promise<HxObservation> {
  const specifier:string="@hyperunix/sdk";
  const sdk=await import(specifier);
  const hx=await sdk.HyperUnix.open({workspace:request.workspaceId});
  try {
    const answer=await hx.find({kind:"hx.fs/regular-file",root:"."});
    return {exitCode:answer.exitCode,terminalReached:answer.terminalReached,
      coverageSummary:answer.coverageSummary,frames:answer.frames,results:answer.results,
      queryDigest:answer.queryDigest,revision:null,scopeKind:"filesystem"};
  }finally{await hx.close()}
}
export async function discoverTaskScope(request:DevelopmentRequest, execute:HxExecute=runNative):Promise<ScopeResult> {
  const basis={workspaceId:request.workspaceId,revision:request.baseRevision};
  let observed:HxObservation;
  try {observed=await execute(request)} catch {
    // A native or SDK transport refusal proves no completeness, not absence.
    return {basis,coverage:"unknown",files:[]};
  }
  const complete=observed.exitCode===0&&observed.terminalReached&&
    observed.coverageSummary.completeness==="complete"&&observed.coverageSummary.licensesAbsence===true&&
    observed.scopeKind==="task"&&observed.revision===request.baseRevision&&
    typeof observed.queryDigest==="string"&&!!observed.queryDigest;
  if(!complete){
    const discovered:string[]=[];
    for(const item of observed.results??[]){
      const focus=object(item)?.["focus"];
      if(!Array.isArray(focus))continue;
      for(const part of focus){
        const key=object(part)?.["key"];
        const encoded=object(key)?.["$bytes"];
        if(typeof encoded==="string"){
          const file=Buffer.from(encoded,"base64").toString("utf8");
          if(file&&!discovered.includes(file))discovered.push(file);
        }
      }
    }
    return{basis,coverage:observed.coverageSummary.completeness==="incomplete"?"partial":"unknown",files:discovered};
  }
  const bySeq=new Map(observed.frames.map(f=>[f.seq,f]));
  const files:string[]=[];
  for(const frame of observed.frames.filter(f=>f.kind==="answer")) {
    const ref=object(frame.body)?.["ref"];
    const target=bySeq.get(Number(object(ref)?.["$int"]));
    const locator=object(target?.body)?.["locator"];
    if(typeof locator!=="string"||!locator.trim())return{basis,coverage:"partial",files:[]};
    files.push(locator);
  }
  if(files.length!==observed.coverageSummary.answerCount)return{basis,coverage:"partial",files:[]};
  const digest=observed.queryDigest;
  if(typeof digest!=="string")return{basis,coverage:"unknown",files:[]};
  return {basis,coverage:"complete",files,evidence:{system:"hyper-unix",kind:"task-query",id:digest}};
}
