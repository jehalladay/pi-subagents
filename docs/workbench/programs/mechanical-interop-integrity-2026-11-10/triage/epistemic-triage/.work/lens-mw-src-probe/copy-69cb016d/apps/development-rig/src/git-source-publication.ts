/** Opt-in native Git *blob-content* publication. No Forge/build/effect authority. */
import {execFileSync} from "node:child_process";
import {createHash} from "node:crypto";
import {publicationSemanticKey} from "@mechanical/workflows-coordination";
import type {Basis,PublicationCandidate,NativePublicationDecision,SourcePublicationPort} from "@mechanical/workflows-coordination";

const OID=/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/;
const REF=/^refs\/(?:heads|cpp10)\/[a-zA-Z0-9][a-zA-Z0-9/_-]*$/;
const CONTRACT="git-blob-content-v1";
/** One git child invocation. `text` selects utf8 output (trimmed by the caller) versus raw bytes. */
export type GitRunner=(args:string[],options:{readonly input?:string|undefined;readonly text:boolean;readonly timeout:number;readonly maxBuffer:number})=>string|Buffer;
export interface GitPublicationConfig {readonly repository:string;readonly workspaceId:string;readonly sourceRef?:string;readonly publicationRef?:string;
 /** Per-child budget in ms (default 10000). */
 readonly timeoutMs?:number;
 /** Child runner seam; defaults to execFileSync("git", ...). */
 readonly runner?:GitRunner}
const DEFAULT_TIMEOUT_MS=10000;
const defaultRunner:GitRunner=(args,o)=>o.text
 ?execFileSync("git",args,{encoding:"utf8",input:o.input,stdio:["pipe","pipe","pipe"],timeout:o.timeout,maxBuffer:o.maxBuffer})
 :execFileSync("git",args,{timeout:o.timeout,maxBuffer:o.maxBuffer});
/** A git child that timed out or was killed by a signal says nothing about the ref, the blob or the
 * transaction: the host (load, OOM, supervisor) failed, not the publication. It raises instead of
 * mapping to a semantic rejection, a null ref or a missing object. */
export class GitChildUnavailableError extends Error {
 readonly code="GIT_CHILD_UNAVAILABLE" as const;readonly kind:"timeout"|"signal";readonly subcommand:string;readonly timeoutMs:number;
 constructor(kind:"timeout"|"signal",subcommand:string,timeoutMs:number,cause:unknown){
  super("GIT_CHILD_UNAVAILABLE: git "+subcommand+(kind==="timeout"?" exceeded "+timeoutMs+" ms":" was killed by a signal"),{cause});
  this.name="GitChildUnavailableError";this.kind=kind;this.subcommand=subcommand;this.timeoutMs=timeoutMs;
 }
}
function classifyUnavailable(error:unknown,subcommand:string,timeoutMs:number):GitChildUnavailableError|null {
 if(error instanceof GitChildUnavailableError)return error;
 if(typeof error!=="object"||error===null)return null;
 const e=error as {code?:unknown;signal?:unknown};
 if(e.code==="ETIMEDOUT")return new GitChildUnavailableError("timeout",subcommand,timeoutMs,error);
 // maxBuffer overflow kills the child with SIGTERM and raises ENOBUFS: a property of the content size, never of the host, so it stays a deterministic rejection.
 if(e.code==="ENOBUFS")return null;
 if(typeof e.signal==="string"&&e.signal!=="")return new GitChildUnavailableError("signal",subcommand,timeoutMs,error);
 return null;
}
export interface GitPublicationSnapshot {
 readonly schema:"mw.cpp10.git-blob-snapshot.v1";readonly workspaceId:string;
 readonly sourceRevision:string;readonly consumerContract:typeof CONTRACT;readonly idempotencyKey:string;
 readonly requiredIds:readonly string[];readonly artifacts:readonly {id:string;digest:string;receiptRef:string;dependencies:readonly string[]}[];
}
export class GitBlobPublicationSource implements SourcePublicationPort {
 readonly repository:string;readonly workspaceId:string;readonly sourceRef:string;readonly publicationRef:string;
 private readonly timeoutMs:number;private readonly runner:GitRunner;
 constructor(config:GitPublicationConfig){
  if(!config.repository||!config.workspaceId?.trim())throw new Error("GIT_CPP: workspace/repository required");
  this.repository=config.repository;this.workspaceId=config.workspaceId;
  this.sourceRef=config.sourceRef??"refs/heads/main";this.publicationRef=config.publicationRef??"refs/cpp10/publication";
  if(!REF.test(this.sourceRef)||!REF.test(this.publicationRef)||this.sourceRef===this.publicationRef)
   throw new Error("GIT_CPP: invalid or identical refs");
  this.timeoutMs=config.timeoutMs??DEFAULT_TIMEOUT_MS;
  if(!Number.isSafeInteger(this.timeoutMs)||this.timeoutMs<=0)throw new Error("GIT_CPP: invalid timeoutMs");
  this.runner=config.runner??defaultRunner;
 }
 private child(args:string[],input:string|undefined,text:boolean):string|Buffer {
  try{return this.runner(["-C",this.repository,...args],{input,text,timeout:this.timeoutMs,maxBuffer:16*1024*1024});}
  catch(error){throw classifyUnavailable(error,args[0]??"",this.timeoutMs)??error;}
 }
 private run(args:string[],input?:string):string {return (this.child(args,input,true) as string).trim();}
 private maybeRef(ref:string):string|null {try{const v=this.run(["rev-parse","--verify",ref]);return OID.test(v)?v:null;}
  catch(error){if(error instanceof GitChildUnavailableError)throw error;return null;}}
 private currentRevision():string {const rev=this.maybeRef(this.sourceRef);if(!rev)throw new Error("GIT_CPP: missing source ref");return rev;}
 async readBasis():Promise<Basis>{return {workspaceId:this.workspaceId,revision:this.currentRevision()};}
 /** Recheck facts even when a caller bypasses staging. Blob membership in the
  * expected *tree* is required; mere object existence does not suffice.
  */
 private nativeCheck(candidate:PublicationCandidate):string|null {
  if(candidate.schema!=="mw.cpp10.publication-candidate.v1"||candidate.basis.workspaceId!==this.workspaceId||
     !OID.test(candidate.basis.revision)||candidate.consumerContract!==CONTRACT)return "UNSUPPORTED_GIT_CONTRACT";
  if(candidate.idempotencyKey!==publicationSemanticKey(candidate.basis,candidate.consumerContract,candidate.artifacts,candidate.requiredIds))
    return "IDEMPOTENCY_FINGERPRINT_INVALID";
  if(candidate.artifacts.length===0||candidate.requiredIds.length===0)return "EMPTY_PUBLICATION";
  const byId=new Map(candidate.artifacts.map(a=>[a.id,a]));
  if(byId.size!==candidate.artifacts.length||new Set(candidate.requiredIds).size!==candidate.requiredIds.length||
     candidate.requiredIds.some(id=>!id.trim()||!byId.has(id))||
     candidate.artifacts.some(a=>!a.id.trim()||new Set(a.dependencies).size!==a.dependencies.length))return "BAD_COVERAGE";
  const visited=new Set<string>(),visiting=new Set<string>();
  const visit=(id:string):boolean=>{if(visiting.has(id))return false;if(visited.has(id))return true;
    visiting.add(id);for(const dep of byId.get(id)!.dependencies)if(!byId.has(dep)||!visit(dep))return false;
    visiting.delete(id);visited.add(id);return true;};
  if(candidate.artifacts.some(a=>!visit(a.id)))return "BAD_DEPENDENCIES";
  const listing=this.run(["ls-tree","-r",candidate.basis.revision]);
  const treeBlobs=new Set([...listing.matchAll(/\bblob ([a-f0-9]{40}|[a-f0-9]{64})\t/g)].map(m=>m[1]));
  for(const a of candidate.artifacts){
    const oid=a.receiptRef.startsWith("gitblob:")?a.receiptRef.slice(8):"";
    if(!OID.test(oid)||!treeBlobs.has(oid)||a.revision!==candidate.basis.revision||
       a.consumerContract!==CONTRACT||a.dischargedEffectIds.length!==0||
       !a.digest.startsWith("sha256:"))return "INVALID_GIT_RECEIPT";
    try{if(this.run(["cat-file","-t",oid])!=="blob")return "INVALID_GIT_RECEIPT";
      const bytes=this.child(["cat-file","blob",oid],undefined,false);
      if("sha256:"+createHash("sha256").update(bytes).digest("hex")!==a.digest)return "INVALID_BLOB_DIGEST";
    }catch(error){if(error instanceof GitChildUnavailableError)throw error;return "INVALID_GIT_RECEIPT";}
  }
  return null;
 }
 /** Git update-ref transaction is the single-repository native linearization point. */
 async commitAtomically(candidate:PublicationCandidate):Promise<NativePublicationDecision>{
  let reason:string;
  try{reason=this.nativeCheck(candidate)??"";}
  catch(error){if(error instanceof GitChildUnavailableError)throw error;return {status:"rejected",reason:"GIT_OBJECT_VALIDATION_FAILED"};}
  if(reason)return {status:"rejected",reason};
  const manifest:GitPublicationSnapshot={schema:"mw.cpp10.git-blob-snapshot.v1",workspaceId:this.workspaceId,
   sourceRevision:candidate.basis.revision,consumerContract:CONTRACT,idempotencyKey:candidate.idempotencyKey,
   requiredIds:[...candidate.requiredIds].sort(),artifacts:candidate.artifacts.map(a=>({id:a.id,digest:a.digest,
    receiptRef:a.receiptRef,dependencies:[...a.dependencies].sort()})).sort((a,b)=>a.id.localeCompare(b.id))};
  let newOid:string;
  try{newOid=this.run(["hash-object","-w","--stdin"],JSON.stringify(manifest));}
  catch(error){if(error instanceof GitChildUnavailableError)throw error;return {status:"rejected",reason:"GIT_OBJECT_WRITE_FAILED"};}
  if(!OID.test(newOid))return {status:"rejected",reason:"GIT_OBJECT_ID_INVALID"};
  let oldOid=this.maybeRef(this.publicationRef);
  if(oldOid===newOid&&this.currentRevision()===candidate.basis.revision)
    return {status:"committed",snapshotId:newOid,revision:candidate.basis.revision};
  if(oldOid===null)oldOid="0".repeat(candidate.basis.revision.length);
  const txn=["start","verify "+this.sourceRef+" "+candidate.basis.revision,
    "update "+this.publicationRef+" "+newOid+" "+oldOid,"prepare","commit",""].join("\n");
  try{this.run(["update-ref","--stdin"],txn);
    return {status:"committed",snapshotId:newOid,revision:candidate.basis.revision};
  }catch(error){
    if(this.currentRevision()!==candidate.basis.revision)
      return {status:"stale",currentRevision:this.currentRevision()};
    if(this.maybeRef(this.publicationRef)===newOid)
      return {status:"committed",snapshotId:newOid,revision:candidate.basis.revision};
    if(error instanceof GitChildUnavailableError)throw error;
    return {status:"rejected",reason:"CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR"};
  }
 }
 /** Source-version-fenced current reader; historical Git object remains immutable. */
 async readCurrent():Promise<GitPublicationSnapshot|null>{
  const before=this.currentRevision(),refBefore=this.maybeRef(this.publicationRef);
  if(!refBefore)return null;
  try{const obj=JSON.parse(this.run(["cat-file","blob",refBefore])) as GitPublicationSnapshot;
    if(obj.schema!=="mw.cpp10.git-blob-snapshot.v1"||obj.workspaceId!==this.workspaceId||
       obj.sourceRevision!==before||obj.consumerContract!==CONTRACT)return null;
    const after=this.currentRevision(),refAfter=this.maybeRef(this.publicationRef);
    return after===before&&refAfter===refBefore?obj:null;
  }catch(error){if(error instanceof GitChildUnavailableError)throw error;return null;}
 }
}
