import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync, chmodSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire, syncBuiltinESMExports } from "node:module";
import ts from "typescript";
import { GitBlobPublicationSource, GitChildUnavailableError } from "../dist/git-source-publication.js";
import type { GitRunner } from "../dist/git-source-publication.js";
import { publishReconciled, stagePublication } from "@mechanical/workflows-coordination";
import type { CertifiedArtifactProposal, Intent } from "@mechanical/workflows-coordination";

const run=(directory:string,args:string[]):string =>
  execFileSync("git",["-C",directory,...args],{encoding:"utf8"}).trim();
function repository():string {
  const directory=mkdtempSync(join(tmpdir(),"mw-cpp10-git-"));
  run(directory,["init","-b","main"]);
  run(directory,["config","user.name","CPP fixture"]);
  run(directory,["config","user.email","fixture@example.org"]);
  writeFileSync(join(directory,"a.txt"),"verified Git bytes\n");
  run(directory,["add","a.txt"]);run(directory,["commit","-m","base"]);
  return directory;
}
async function fixture(directory:string) {
  const source=new GitBlobPublicationSource({repository:directory,workspaceId:"git:local"});
  const basis=await source.readBasis(),oid=run(directory,["rev-parse","HEAD:a.txt"]);
  const bytes=execFileSync("git",["-C",directory,"cat-file","blob",oid]);
  const artifact:CertifiedArtifactProposal={
    id:"a",revision:basis.revision,digest:"sha256:"+createHash("sha256").update(bytes).digest("hex"),
    receiptRef:"gitblob:"+oid,consumerContract:"git-blob-content-v1",dependencies:[],dischargedEffectIds:[],
  };
  const intent:Intent={intentId:"worker1:publish",policyId:"worker1",target:{kind:"artifact",uri:"a"},
    expectedRevision:basis.revision,effect:"publish-artifact",
    claim:{compute:1,workers:1,queue:1,latencyMs:1},evidenceRefs:[artifact.receiptRef],
    writeScopes:["artifact:a"],readScopes:[],
  };
  const request={source,budget:{compute:1,workers:1,queue:1,latencyMs:100},
    protectedScopes:[] as string[],proposals:[{intents:[intent],memory:null,trace:[]}],
    artifacts:[artifact],requiredIds:["a"],consumerContract:"git-blob-content-v1",
  };
  return {source,basis,artifact,intent,request};
}
test("real Git atomic source-ref verification publishes only an expected-tree blob",async()=>{
  const dir=repository();try{
    const {source,basis,request}=await fixture(dir);
    const pub=await publishReconciled(request);
    assert.equal(pub.kind,"published");
    if(pub.kind!=="published")return;
    assert.equal(pub.revision,basis.revision);
    assert.equal(run(dir,["rev-parse","refs/cpp10/publication"]),pub.snapshotId);
    const snapshot=await source.readCurrent();
    assert.equal(snapshot?.sourceRevision,basis.revision);
    assert.equal(snapshot?.artifacts[0]?.id,"a");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("real update-ref CAS refuses validation made stale by a new Git source commit",async()=>{
  const dir=repository();try{
    const {source,request,artifact}=await fixture(dir),original=source.commitAtomically.bind(source);
    source.commitAtomically=async candidate=>{
      writeFileSync(join(dir,"later.txt"),"source revision changed\n");
      run(dir,["add","later.txt"]);run(dir,["commit","-m","advance-before-publication"]);
      return original(candidate);
    };
    const result=await publishReconciled(request);
    assert.equal(result.kind,"source-stale");
    if(result.kind==="source-stale")assert.notEqual(result.currentRevision,artifact.revision);
    assert.throws(()=>run(dir,["rev-parse","--verify","refs/cpp10/publication"]));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("native Git blob verification rejects invented digest, forged blob and external effects",async()=>{
  const dir=repository();try{
    const {source,artifact,intent,request}=await fixture(dir);
    assert.equal((await publishReconciled({...request,artifacts:[{...artifact,digest:"sha256:"+"0".repeat(64)}]})).kind,
      "source-rejected");
    const forged={...artifact,receiptRef:"gitblob:"+"0".repeat(40)};
    const forgedIntent={...intent,evidenceRefs:[forged.receiptRef]};
    assert.equal((await publishReconciled({...request,artifacts:[forged],
      proposals:[{intents:[forgedIntent],memory:null,trace:[]}]})).kind,"source-rejected");
    assert.equal((await publishReconciled({...request,artifacts:[{...artifact,dischargedEffectIds:["native-effect:e"]}]})).kind,
      "source-rejected");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("native publication OID is stable over a replacement worker's intent identity",async()=>{
  const dir=repository();try{
    const {source,request,intent}=await fixture(dir);
    const a=await publishReconciled(request);
    const b=await publishReconciled({...request,
      proposals:[{intents:[{...intent,policyId:"replacement",intentId:"replacement:publish"}],memory:null,trace:[]}]});
    assert.deepEqual(a,b);
    assert.ok((await source.readCurrent())?.idempotencyKey);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("Git current-reader refuses stale snapshot but old immutable blob remains",async()=>{
  const dir=repository();try{
    const {source,request}=await fixture(dir);
    assert.equal((await publishReconciled(request)).kind,"published");
    writeFileSync(join(dir,"revoked.txt"),"new revision");
    run(dir,["add","revoked.txt"]);run(dir,["commit","-m","advance-after-publication"]);
    assert.equal(await source.readCurrent(),null);
    assert.match(run(dir,["rev-parse","refs/cpp10/publication"]),/^[a-f0-9]{40,64}$/);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("Git current-reader refuses a source-ref advance injected between its two source reads",async()=>{
  const dir=repository();try{
    const {source,request}=await fixture(dir);
    const published=await publishReconciled(request);
    assert.equal(published.kind,"published");
    if(published.kind!=="published")return;
    const hooked=source as unknown as {run:(args:string[],input?:string)=>string};
    const original=hooked.run.bind(source);
    let sourceReads=0,injections=0;
    hooked.run=(args,input)=>{
      const isSourceRead=args[0]==="rev-parse"&&args[1]==="--verify"&&args[2]===source.sourceRef;
      if(isSourceRead){
        sourceReads+=1;
        if(sourceReads===2){
          injections+=1;
          writeFileSync(join(dir,"between-reads.txt"),"advance between the two source reads\n");
          run(dir,["add","between-reads.txt"]);run(dir,["commit","-m","advance-between-reads"]);
        }
      }
      return original(args,input);
    };
    const before=run(dir,["rev-parse","refs/cpp10/publication"]);
    assert.equal(await source.readCurrent(),null);
    assert.equal(sourceReads,2);
    assert.equal(injections,1);
    assert.notEqual(run(dir,["rev-parse",source.sourceRef]),published.revision);
    assert.equal(run(dir,["rev-parse","refs/cpp10/publication"]),before);
    assert.equal(before,published.snapshotId);
    assert.equal(run(dir,["cat-file","-t",published.snapshotId]),"blob");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("Git current-reader refuses a publication-ref move injected between its two publication-ref reads",async()=>{
  const dir=repository();try{
    const {source,request}=await fixture(dir);
    const published=await publishReconciled(request);
    assert.equal(published.kind,"published");
    if(published.kind!=="published")return;
    const firstOid=published.snapshotId;
    const rival=JSON.parse(run(dir,["cat-file","blob",firstOid])) as Record<string,unknown>;
    rival.idempotencyKey="rival-"+String(rival.idempotencyKey);
    const rivalOid=execFileSync("git",["-C",dir,"hash-object","-w","--stdin"],
      {input:JSON.stringify(rival),encoding:"utf8"}).trim();
    assert.notEqual(rivalOid,firstOid);
    const hooked=source as unknown as {run:(args:string[],input?:string)=>string};
    const original=hooked.run.bind(source);
    let publicationReads=0,injections=0;
    hooked.run=(args,input)=>{
      const isPublicationRead=args[0]==="rev-parse"&&args[1]==="--verify"&&args[2]===source.publicationRef;
      if(isPublicationRead){
        publicationReads+=1;
        if(publicationReads===2){
          injections+=1;
          run(dir,["update-ref",source.publicationRef,rivalOid,firstOid]);
        }
      }
      return original(args,input);
    };
    assert.equal(await source.readCurrent(),null);
    assert.equal(publicationReads,2);
    assert.equal(injections,1);
    assert.equal(run(dir,["rev-parse",source.sourceRef]),published.revision);
    assert.equal(run(dir,["rev-parse",source.publicationRef]),rivalOid);
    assert.equal(run(dir,["cat-file","-t",firstOid]),"blob");
    assert.equal(run(dir,["cat-file","-t",rivalOid]),"blob");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("independent Git repositories cannot be asserted to commit one common revision cut",async()=>{
  const dirs=[repository(),repository()];try{
    const a=await fixture(dirs[0]!),b=await fixture(dirs[1]!);
    assert.equal((await publishReconciled(a.request)).kind,"published");
    writeFileSync(join(dirs[1]!,"changed.txt"),"source B changed");
    run(dirs[1]!,["add","changed.txt"]);run(dirs[1]!,["commit","-m","B-changes"]);
    assert.equal((await publishReconciled(b.request)).kind,"source-stale");
    // Local source A succeeded. There is no independent global publication ref.
    assert.equal((await a.source.readCurrent())?.sourceRevision,a.basis.revision);
  }finally{for(const d of dirs)rmSync(d,{recursive:true,force:true});}
});

test("Git object exists but is absent from current source tree: no publication authority",async()=>{
  const dir=repository();try{
    const {artifact,intent,request}=await fixture(dir);
    const orphanBytes=Buffer.from("orphan object not in main tree\n");
    const oid=execFileSync("git",["-C",dir,"hash-object","-w","--stdin"],
      {input:orphanBytes,encoding:"utf8"}).trim();
    const untracked={...artifact,receiptRef:"gitblob:"+oid,
      digest:"sha256:"+createHash("sha256").update(orphanBytes).digest("hex")};
    const proposed={...intent,evidenceRefs:[untracked.receiptRef]};
    const result=await publishReconciled({...request,artifacts:[untracked],
      proposals:[{intents:[proposed],memory:null,trace:[]}]});
    assert.equal(result.kind,"source-rejected");
    if(result.kind==="source-rejected")assert.equal(result.reason,"INVALID_GIT_RECEIPT");
  }finally{rmSync(dir,{recursive:true,force:true});}
});

// 2n4d: a git child that times out or is killed is host unavailability, never a semantic verdict.
type Fault={readonly code?:string;readonly signal?:string;readonly status?:number|null};
type Exec=typeof execFileSync;
/** cl83: the tuned budgets (250 ms) belong to the injected fault, never to the real children that run beside it, so the real child gets a host-load-proof ceiling instead of the forwarded budget. */
const REAL_CHILD_CEILING_MS=60000;
const realChildTimeout=(budget:number):number=>Math.max(budget,REAL_CHILD_CEILING_MS);
const makeReal=(exec:Exec):GitRunner=>(args,o)=>o.text
  ?exec("git",args,{encoding:"utf8",input:o.input,stdio:["pipe","pipe","pipe"],timeout:realChildTimeout(o.timeout),maxBuffer:o.maxBuffer})
  :exec("git",args,{timeout:realChildTimeout(o.timeout),maxBuffer:o.maxBuffer});
/** 7ynl: the shared instance reaches execFileSync through this seam (default: the real one), so a pin can observe the exec the shared instance itself is built on. */
let realExec:Exec=execFileSync;
const real:GitRunner=makeReal(((...a:unknown[])=>(realExec as unknown as (...x:unknown[])=>unknown)(...a)) as unknown as Exec);
const TIMEOUT:Fault={code:"ETIMEDOUT",signal:"SIGTERM",status:null};
const KILLED:Fault={signal:"SIGKILL",status:null};
const GENUINE:Fault={status:128};
/** execFileSync output past maxBuffer: Node kills the child with SIGTERM and raises ENOBUFS; a property of the content size, never of the host. */
const ENOBUFS:Fault={code:"ENOBUFS",signal:"SIGTERM",status:null};
/** Faults every child whose first git subcommand (after -C <repo>) and optional extra token match; `afterRun` lets the child's effect land first. */
function faulty(dir:string,sub:string,fault:Fault,extra?:string,afterRun=false,timeoutMs?:number) {
  const seen:number[]=[];
  const runner:GitRunner=(args,o)=>{
    const matches=args[2]===sub&&(extra===undefined||args[3]===extra);
    if(!matches)return real(args,o);
    seen.push(o.timeout);
    if(afterRun)real(args,o);
    throw Object.assign(new Error("injected git child fault"),fault);
  };
  const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner,...(timeoutMs===undefined?{}:{timeoutMs})});
  return {source,seen};
}
const unavailable=(kind:"timeout"|"signal",sub:string)=>(e:unknown)=>{
  assert.ok(e instanceof GitChildUnavailableError,"expected GitChildUnavailableError, got "+String(e));
  assert.equal(e.code,"GIT_CHILD_UNAVAILABLE");assert.equal(e.kind,kind);assert.equal(e.subcommand,sub);
  assert.match(e.message,/^GIT_CHILD_UNAVAILABLE: git /);return true;
};
test("cl83: a real child run beside an injected fault never inherits the tuned budget, so host load cannot time out the wrong subcommand",()=>{
  const seen:Array<number|undefined>=[];
  const spy=((_cmd:string,_args:string[],opts:{timeout?:number})=>{seen.push(opts.timeout);return Buffer.from("");}) as unknown as Exec;
  for(const text of [true,false])makeReal(spy)(["-C","/x","rev-parse"],{text,timeout:250,maxBuffer:1024});
  makeReal(spy)(["-C","/x","rev-parse"],{text:true,timeout:10000,maxBuffer:1024});
  assert.deepEqual(seen,[REAL_CHILD_CEILING_MS,REAL_CHILD_CEILING_MS,REAL_CHILD_CEILING_MS]);
  assert.equal(realChildTimeout(250),REAL_CHILD_CEILING_MS);
  assert.equal(realChildTimeout(10000),REAL_CHILD_CEILING_MS);
  assert.equal(realChildTimeout(REAL_CHILD_CEILING_MS+1),REAL_CHILD_CEILING_MS+1);
});
test("7ynl: the shared real runner is built through makeReal, so both its branches carry the host-load-proof ceiling instead of the forwarded budget",()=>{
  assert.equal(realExec,execFileSync,"the seam defaults to the real execFileSync, so every row that runs real git children is unchanged");
  const seen:Array<{cmd:string;timeout:number|undefined;encoding:string|undefined}>=[];
  const prior=realExec;
  realExec=((cmd:string,_args:string[],opts:{timeout?:number;encoding?:string})=>{seen.push({cmd,timeout:opts.timeout,encoding:opts.encoding});return opts.encoding===undefined?Buffer.from(""):"";}) as unknown as Exec;
  try{for(const text of [true,false])real(["-C","/x","rev-parse"],{text,timeout:250,maxBuffer:1024});}
  finally{realExec=prior;}
  assert.deepEqual(seen,[
    {cmd:"git",timeout:REAL_CHILD_CEILING_MS,encoding:"utf8"},
    {cmd:"git",timeout:REAL_CHILD_CEILING_MS,encoding:undefined}]);
  assert.equal(realExec,execFileSync);
});
/** 2cpu: observe every child a faulty() publication hands the shared real runner, by wrapping the realExec seam around the genuine execFileSync. */
async function seamSeen(afterRun:boolean):Promise<Array<{sub:string;text:boolean;timeout:number|undefined}>> {
  const dir=repository();
  const seen:Array<{sub:string;text:boolean;timeout:number|undefined}>=[];
  const prior=realExec;
  try{
    const {request}=await fixture(dir);
    realExec=((cmd:string,args:string[],opts:{timeout?:number;encoding?:string})=>{seen.push({sub:String(args[2]),text:opts.encoding==="utf8",timeout:opts.timeout});return (prior as unknown as (...x:unknown[])=>unknown)(cmd,args,opts);}) as unknown as Exec;
    await assert.rejects(publishReconciled({...request,source:faulty(dir,"hash-object",TIMEOUT,undefined,afterRun,250).source}),unavailable("timeout","hash-object"));
  }finally{realExec=prior;rmSync(dir,{recursive:true,force:true});}
  return seen;
}
/** ejvr: a plain spy runner records the [subcommand,text] sequence of the same publication, so the seam sequence can be compared child for child, not only by existence. */
async function plainSeen(afterRun:boolean):Promise<Array<[string,boolean]>> {
  const dir=repository();
  const calls:Array<[string,boolean]>=[];
  try{
    const {request}=await fixture(dir);
    const runner:GitRunner=(args,o)=>{
      const sub=String(args[2]);
      if(sub==="hash-object"){if(afterRun)calls.push([sub,o.text]);throw Object.assign(new Error("injected git child fault"),TIMEOUT);}
      calls.push([sub,o.text]);
      return real(args,o);
    };
    await assert.rejects(publishReconciled({...request,source:new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner,timeoutMs:250})}),unavailable("timeout","hash-object"));
  }finally{rmSync(dir,{recursive:true,force:true});}
  return calls;
}
/** y7v5: a process-level census of every git process a faulty() publication spawns (git trace2 event stream, top-level sids only), recorded beside the seam sequence, so a git child spawned BESIDE the realExec seam is visible even when the seam sequence is unchanged. */
async function procCensus(afterRun:boolean):Promise<{seam:string[];procs:string[]}> {
  const dir=repository();
  const seam:string[]=[];
  const prior=realExec;
  const tdir=mkdtempSync(join(tmpdir(),"mw-y7v5-trace-"));
  const log=join(tdir,"trace2.jsonl");
  const priorEnv=process.env.GIT_TRACE2_EVENT;
  try{
    const {request}=await fixture(dir);
    realExec=((cmd:string,args:string[],opts:unknown)=>{seam.push(String(args[2]));return (prior as unknown as (...x:unknown[])=>unknown)(cmd,args,opts);}) as unknown as Exec;
    process.env.GIT_TRACE2_EVENT=log;
    try{
      await assert.rejects(publishReconciled({...request,source:faulty(dir,"hash-object",TIMEOUT,undefined,afterRun,250).source}),unavailable("timeout","hash-object"));
    }finally{if(priorEnv===undefined)delete process.env.GIT_TRACE2_EVENT;else process.env.GIT_TRACE2_EVENT=priorEnv;}
  }finally{realExec=prior;rmSync(dir,{recursive:true,force:true});}
  let text="";try{text=readFileSync(log,"utf8");}catch{text="";}
  rmSync(tdir,{recursive:true,force:true});
  const procs=text.split("\n").filter(l=>l.trim()).map(l=>JSON.parse(l) as {event:string;sid:string;name?:string}).filter(e=>e.event==="cmd_name"&&!e.sid.includes("/")).map(e=>String(e.name));
  return {seam,procs};
}
test("2cpu: faulty() routes every non-faulted child of a publication through the shared real runner, so the tuned 250 ms budget reaches no real git child",async()=>{
  const seen=await seamSeen(false);
  const want=await plainSeen(false);
  assert.deepEqual(want,[["rev-parse",true],["ls-tree",true],["cat-file",true],["cat-file",false]],"the plain spy runner records the four non-faulted children: "+JSON.stringify(want));
  assert.deepEqual(seen.map(s=>[s.sub,s.text]),want,"every non-faulted child reached the shared real runner, one for one: "+JSON.stringify(seen));
  assert.deepEqual([...new Set(seen.map(s=>s.timeout))],[REAL_CHILD_CEILING_MS],JSON.stringify(seen));
  assert.ok(!seen.some(s=>s.sub==="hash-object"),"the faulted subcommand never reaches the shared real runner without afterRun: "+JSON.stringify(seen));
});
test("2cpu: faulty() with afterRun lets the faulted child's effect land through the shared real runner at the ceiling, not the tuned budget",async()=>{
  const seen=await seamSeen(true);
  const faulted=seen.filter(s=>s.sub==="hash-object");
  assert.ok(faulted.length>0,"the faulted hash-object child reached the shared real runner before the injected fault: "+JSON.stringify(seen));
  const want=await plainSeen(true);
  assert.deepEqual(want,[["rev-parse",true],["ls-tree",true],["cat-file",true],["cat-file",false],["hash-object",true]],"the plain spy runner records the non-faulted children plus the faulted one: "+JSON.stringify(want));
  assert.deepEqual(seen.map(s=>[s.sub,s.text]),want,"every child, faulted one included, reached the shared real runner, one for one: "+JSON.stringify(seen));
  assert.deepEqual([...new Set(seen.map(s=>s.timeout))],[REAL_CHILD_CEILING_MS],JSON.stringify(seen));
});
test("CW1: every git process a faulty() publication spawns without afterRun is a child the realExec seam saw, one for one",async()=>{
  const {seam,procs}=await procCensus(false);
  assert.deepEqual(seam,["rev-parse","ls-tree","cat-file","cat-file"],"CW1 seam: "+JSON.stringify(seam));
  assert.deepEqual(procs,seam,"CW1 census: "+JSON.stringify({procs,seam}));
});
test("CW2: every git process a faulty() publication spawns with afterRun is a child the realExec seam saw, one for one",async()=>{
  const {seam,procs}=await procCensus(true);
  assert.deepEqual(seam,["rev-parse","ls-tree","cat-file","cat-file","hash-object"],"CW2 seam: "+JSON.stringify(seam));
  assert.deepEqual(procs,seam,"CW2 census: "+JSON.stringify({procs,seam}));
});
/** ab1o: a census of the git children a call spawns BESIDE the shared real runner. It wraps the six public node:child_process exports (live ESM bindings follow through syncBuiltinESMExports, the native-opt-in.test.ts mechanism), so a git child a mutant starts through the module's own import is visible whatever its environment, while every seam child reaches the init-time execFileSync captured in realExec and stays uncounted. */
const cpExports=createRequire(import.meta.url)("node:child_process") as Record<string,unknown>;
const CENSUS_EXPORTS=["execFileSync","spawnSync","execSync","spawn","execFile","exec"] as const;
const GIT_FILE=/(^|\/)git(\s|$)/;
async function besideCensus(body:()=>Promise<unknown>):Promise<{seam:string[];beside:string[]}> {
  const seam:string[]=[],beside:string[]=[];
  const prior=realExec,originals=new Map<string,unknown>();
  realExec=((cmd:string,args:string[],opts:unknown)=>{seam.push(String(args[2]));return (prior as unknown as (...x:unknown[])=>unknown)(cmd,args,opts);}) as unknown as Exec;
  try{
    for(const name of CENSUS_EXPORTS){
      const orig=cpExports[name] as (...x:unknown[])=>unknown;originals.set(name,orig);
      cpExports[name]=(...a:unknown[])=>{
        if(typeof a[0]==="string"&&GIT_FILE.test(a[0]))beside.push(name+":"+(Array.isArray(a[1])?(a[1] as unknown[]).join(" "):a[0]));
        return orig(...a);
      };
    }
    syncBuiltinESMExports();
    try{await body();}
    finally{for(const [name,orig] of originals)cpExports[name]=orig;syncBuiltinESMExports();}
  }finally{realExec=prior;}
  return {seam,beside};
}
test("ab1o BW1: a hash-object-faulted publication spawns no git child beside the shared real runner, whatever its environment",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=faulty(dir,"hash-object",TIMEOUT,undefined,false,250).source;
    const {seam,beside}=await besideCensus(()=>assert.rejects(publishReconciled({...request,source}),unavailable("timeout","hash-object")));
    assert.deepEqual(seam,["rev-parse","ls-tree","cat-file","cat-file"],"BW1 seam: "+JSON.stringify(seam));
    assert.deepEqual(beside,[],"BW1 beside: "+JSON.stringify(beside));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("ab1o BW2: a successful publication spawns no git child beside the shared real runner and reaches update-ref through it",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner:real});
    let kind="";
    const {seam,beside}=await besideCensus(async()=>{kind=(await publishReconciled({...request,source})).kind;});
    assert.equal(kind,"published");
    assert.ok(seam.includes("update-ref"),"BW2 seam: "+JSON.stringify(seam));
    assert.deepEqual(beside,[],"BW2 beside: "+JSON.stringify(beside));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("ab1o BW3: readCurrent after a published snapshot spawns no git child beside the shared real runner",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner:real});
    assert.equal((await publishReconciled({...request,source})).kind,"published");
    let snapshot:unknown=null;
    const {seam,beside}=await besideCensus(async()=>{snapshot=await source.readCurrent();});
    assert.notEqual(snapshot,null);
    assert.ok(seam.includes("cat-file"),"BW3 seam: "+JSON.stringify(seam));
    assert.deepEqual(beside,[],"BW3 beside: "+JSON.stringify(beside));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
/** k4yu: the same beside-the-seam question asked at the process level. A git shim first on PATH (under this census's own temporary directory) logs the subcommand of every git process, then execs the real git resolved before PATH changed, so a git child started by sh -c, env, a module-level alias or promisify captured at import time, or a deferred timer is visible although no live child_process export binding saw it. Armed only around the call under test; after a settle timer the logged subcommands must equal the realExec seam list one for one. */
const SHIM_SETTLE_MS=400;
async function shimCensus(body:()=>Promise<unknown>):Promise<{seam:string[];logged:string[]}> {
  const realGit=execFileSync("sh",["-c","command -v git"],{encoding:"utf8"}).trim();
  const shimDir=mkdtempSync(join(tmpdir(),"mw-k4yu-shim-"));
  const log=join(shimDir,"git.log");
  const seam:string[]=[];
  const prior=realExec,priorPath=process.env.PATH;
  try{
    writeFileSync(log,"");
    writeFileSync(join(shimDir,"git"),
      "#!/bin/sh\nif [ \"$1\" = \"-C\" ]; then printf '%s\\n' \"$3\" >> '"+log+"'; else printf '%s\\n' \"$1\" >> '"+log+"'; fi\nexec '"+realGit+"' \"$@\"\n");
    chmodSync(join(shimDir,"git"),0o755);
    realExec=((cmd:string,args:string[],opts:unknown)=>{seam.push(String(args[2]));return (prior as unknown as (...x:unknown[])=>unknown)(cmd,args,opts);}) as unknown as Exec;
    process.env.PATH=shimDir+":"+(priorPath??"");
    try{
      await body();
      await new Promise(resolve=>setTimeout(resolve,SHIM_SETTLE_MS));
    }finally{if(priorPath===undefined)delete process.env.PATH;else process.env.PATH=priorPath;realExec=prior;}
    const logged=readFileSync(log,"utf8").split("\n").filter(l=>l!=="");
    return {seam,logged};
  }finally{rmSync(shimDir,{recursive:true,force:true});}
}
test("k4yu SW1: every git process a hash-object-faulted publication spawns is a child the realExec seam saw, one for one, whatever starts it",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=faulty(dir,"hash-object",TIMEOUT,undefined,false,250).source;
    const {seam,logged}=await shimCensus(()=>assert.rejects(publishReconciled({...request,source}),unavailable("timeout","hash-object")));
    assert.ok(seam.length>0,"SW1 seam: "+JSON.stringify(seam));
    assert.deepEqual(logged,seam,"SW1 census: "+JSON.stringify({logged,seam}));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("k4yu SW2: every git process a successful publication spawns is a child the realExec seam saw, one for one, update-ref included",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner:real});
    let kind="";
    const {seam,logged}=await shimCensus(async()=>{kind=(await publishReconciled({...request,source})).kind;});
    assert.equal(kind,"published");
    assert.ok(seam.includes("update-ref"),"SW2 seam: "+JSON.stringify(seam));
    assert.deepEqual(logged,seam,"SW2 census: "+JSON.stringify({logged,seam}));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("k4yu SW3: every git process readCurrent spawns after a published snapshot is a child the realExec seam saw, one for one",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner:real});
    assert.equal((await publishReconciled({...request,source})).kind,"published");
    let snapshot:unknown=null;
    const {seam,logged}=await shimCensus(async()=>{snapshot=await source.readCurrent();});
    assert.notEqual(snapshot,null);
    assert.ok(seam.includes("cat-file"),"SW3 seam: "+JSON.stringify(seam));
    assert.deepEqual(logged,seam,"SW3 census: "+JSON.stringify({logged,seam}));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("k4yu BW4: an update-ref-timeout publication (the catch branch) spawns no git child beside the shared real runner, whatever its environment",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=faulty(dir,"update-ref",TIMEOUT,undefined,false,250).source;
    const {seam,beside}=await besideCensus(()=>assert.rejects(publishReconciled({...request,source}),unavailable("timeout","update-ref")));
    assert.ok(seam.includes("hash-object"),"BW4 seam: "+JSON.stringify(seam));
    assert.ok(!seam.includes("update-ref"),"the faulted update-ref never reaches the shared real runner: "+JSON.stringify(seam));
    assert.deepEqual(beside,[],"BW4 beside: "+JSON.stringify(beside));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("k4yu SW4: every git process an update-ref-timeout publication (the catch branch) spawns is a child the realExec seam saw, one for one",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const source=faulty(dir,"update-ref",TIMEOUT,undefined,false,250).source;
    const {seam,logged}=await shimCensus(()=>assert.rejects(publishReconciled({...request,source}),unavailable("timeout","update-ref")));
    assert.ok(seam.includes("hash-object"),"SW4 seam: "+JSON.stringify(seam));
    assert.deepEqual(logged,seam,"SW4 census: "+JSON.stringify({logged,seam}));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("timeoutMs is injectable, defaults to 10000 and must be a positive safe integer",async()=>{
  const dir=repository();try{
    const dflt=faulty(dir,"hash-object",TIMEOUT);
    const {request}=await fixture(dir);
    await assert.rejects(publishReconciled({...request,source:dflt.source}),unavailable("timeout","hash-object"));
    assert.deepEqual(dflt.seen,[10000]);
    const tuned=faulty(dir,"hash-object",TIMEOUT,undefined,false,250);
    await assert.rejects(publishReconciled({...request,source:tuned.source}),unavailable("timeout","hash-object"));
    assert.deepEqual(tuned.seen,[250]);
    for(const bad of [0,-1,1.5,Number.NaN,Number.POSITIVE_INFINITY])
      assert.throws(()=>new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",timeoutMs:bad}),/GIT_CPP: invalid timeoutMs/);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("a timed-out or signal-killed rev-parse is unavailable, not a missing source ref or a null publication ref",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    await assert.rejects(faulty(dir,"rev-parse",TIMEOUT).source.readBasis(),unavailable("timeout","rev-parse"));
    await assert.rejects(faulty(dir,"rev-parse",KILLED).source.readBasis(),unavailable("signal","rev-parse"));
    // genuine nonzero exit keeps the semantic mapping: missing source ref
    await assert.rejects(faulty(dir,"rev-parse",GENUINE).source.readBasis(),/GIT_CPP: missing source ref/);
    // publication-ref probe: a timeout must not read as an absent ref (which would proceed to a create-only transaction)
    const src=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner:(args,o)=>{
      if(args[2]==="rev-parse"&&String(args[4]).includes("cpp10"))throw Object.assign(new Error("injected"),TIMEOUT);
      return real(args,o);}});
    await assert.rejects(publishReconciled({...request,source:src}),unavailable("timeout","rev-parse"));
    assert.throws(()=>run(dir,["rev-parse","--verify","refs/cpp10/publication"]));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("a timed-out ls-tree, cat-file or hash-object child is unavailable, never a semantic source rejection",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    for(const [sub,extra,fault,kind] of [
      ["ls-tree",undefined,TIMEOUT,"timeout"],["cat-file","-t",TIMEOUT,"timeout"],["cat-file","blob",TIMEOUT,"timeout"],
      ["cat-file","blob",KILLED,"signal"],["hash-object",undefined,TIMEOUT,"timeout"],["hash-object",undefined,KILLED,"signal"],
    ] as const)
      await assert.rejects(publishReconciled({...request,source:faulty(dir,sub,fault,extra).source}),unavailable(kind,sub),
        sub+" "+String(extra)+" "+kind);
    assert.throws(()=>run(dir,["rev-parse","--verify","refs/cpp10/publication"]));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("genuine nonzero git exits keep their semantic rejection mapping",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const reason=async(sub:string,extra?:string)=>{
      const r=await publishReconciled({...request,source:faulty(dir,sub,GENUINE,extra).source});
      assert.equal(r.kind,"source-rejected");return r.kind==="source-rejected"?r.reason:"";
    };
    assert.equal(await reason("ls-tree"),"GIT_OBJECT_VALIDATION_FAILED");
    assert.equal(await reason("cat-file","-t"),"INVALID_GIT_RECEIPT");
    assert.equal(await reason("hash-object"),"GIT_OBJECT_WRITE_FAILED");
    assert.equal(await reason("update-ref"),"CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("a child killed for exceeding the output buffer (ENOBUFS plus SIGTERM) keeps its deterministic rejection, never unavailability",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const reason=async(sub:string,fault:Fault,extra?:string)=>{
      const r=await publishReconciled({...request,source:faulty(dir,sub,fault,extra).source});
      assert.equal(r.kind,"source-rejected",sub+" "+String(extra));return r.kind==="source-rejected"?r.reason:"";
    };
    for(const [sub,extra] of [["cat-file","blob"],["ls-tree",undefined]] as const)
      assert.equal(await reason(sub,ENOBUFS,extra),await reason(sub,GENUINE,extra),sub+" ENOBUFS maps like a genuine nonzero exit");
    assert.equal(await reason("ls-tree",ENOBUFS),"GIT_OBJECT_VALIDATION_FAILED");
    assert.throws(()=>run(dir,["rev-parse","--verify","refs/cpp10/publication"]));
    assert.equal((await publishReconciled(request)).kind,"published");
    assert.equal(await faulty(dir,"cat-file",ENOBUFS,"blob").source.readCurrent(),null);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("an update-ref child that times out is unavailable unless the ref provably landed or the source moved",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    // transaction never applied: unavailable, not CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR
    await assert.rejects(publishReconciled({...request,source:faulty(dir,"update-ref",TIMEOUT).source}),unavailable("timeout","update-ref"));
    assert.throws(()=>run(dir,["rev-parse","--verify","refs/cpp10/publication"]));
    // transaction applied before the child was killed: the post-check observes the ref and reports committed
    const landed=await publishReconciled({...request,source:faulty(dir,"update-ref",TIMEOUT,undefined,true).source});
    assert.equal(landed.kind,"published");
    if(landed.kind==="published")assert.equal(run(dir,["rev-parse","refs/cpp10/publication"]),landed.snapshotId);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("a timed-out update-ref after the source advanced still reports the stale source, not unavailable",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    const runner:GitRunner=(args,o)=>{
      if(args[2]==="update-ref"){
        writeFileSync(join(dir,"later.txt"),"source moved\n");
        run(dir,["add","later.txt"]);run(dir,["commit","-m","advance"]);
        throw Object.assign(new Error("injected"),TIMEOUT);
      }
      return real(args,o);
    };
    const result=await publishReconciled({...request,source:new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner})});
    assert.equal(result.kind,"source-stale");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("a timed-out current-reader child is unavailable, not a null snapshot",async()=>{
  const dir=repository();try{
    const {request}=await fixture(dir);
    assert.equal((await publishReconciled(request)).kind,"published");
    await assert.rejects(faulty(dir,"cat-file",TIMEOUT,"blob").source.readCurrent(),unavailable("timeout","cat-file"));
    await assert.rejects(faulty(dir,"rev-parse",KILLED).source.readCurrent(),unavailable("signal","rev-parse"));
    // genuine failure of the same child still reads as no current snapshot
    assert.equal(await faulty(dir,"cat-file",GENUINE,"blob").source.readCurrent(),null);
  }finally{rmSync(dir,{recursive:true,force:true});}
});
// 9fly (2n4d follow-up): the SHIPPED defaultRunner, the error's budget field and the raw blob bytes. Every test above injects its own runner or a few ASCII bytes.
function blobRepository(content:Buffer):string {
  const directory=mkdtempSync(join(tmpdir(),"mw-9fly-git-"));
  run(directory,["init","-b","main"]);
  run(directory,["config","user.name","CPP fixture"]);
  run(directory,["config","user.email","fixture@example.org"]);
  writeFileSync(join(directory,"a.bin"),content);
  run(directory,["add","a.bin"]);run(directory,["commit","-m","base"]);
  return directory;
}
async function blobRequest(directory:string,bytes:Buffer,source?:GitBlobPublicationSource) {
  const base=source??new GitBlobPublicationSource({repository:directory,workspaceId:"git:local"});
  const basis=await base.readBasis(),oid=run(directory,["rev-parse","HEAD:a.bin"]);
  const artifact:CertifiedArtifactProposal={
    id:"a",revision:basis.revision,digest:"sha256:"+createHash("sha256").update(bytes).digest("hex"),
    receiptRef:"gitblob:"+oid,consumerContract:"git-blob-content-v1",dependencies:[],dischargedEffectIds:[],
  };
  const intent:Intent={intentId:"worker1:publish",policyId:"worker1",target:{kind:"artifact",uri:"a"},
    expectedRevision:basis.revision,effect:"publish-artifact",
    claim:{compute:1,workers:1,queue:1,latencyMs:1},evidenceRefs:[artifact.receiptRef],
    writeScopes:["artifact:a"],readScopes:[],
  };
  return {source:base,budget:{compute:1,workers:1,queue:1,latencyMs:100},protectedScopes:[] as string[],
    proposals:[{intents:[intent],memory:null,trace:[]}],artifacts:[artifact],requiredIds:["a"],
    consumerContract:"git-blob-content-v1"};
}
test("G01: the default runner applies timeoutMs to the real git child, so a 1 ms budget times out every call it fails",async()=>{
  const dir=blobRepository(Buffer.from("verified Git bytes\n"));try{
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",timeoutMs:1});
    let timedOut=0;const other:string[]=[];
    for(let call=0;call<5;call++){
      try{await source.readBasis();}
      catch(error){if(error instanceof GitChildUnavailableError&&error.kind==="timeout")timedOut++;else other.push(String(error).slice(0,160));}
    }
    assert.deepEqual(other,[],"every failure of a 1 ms budget is a timeout unavailability");
    assert.ok(timedOut>=1,"a 1 ms budget never reached the real git child (0 of 5 readBasis calls timed out)");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("G02: a 2 MiB blob publishes through the default runner, so the 16 MiB maxBuffer reaches the raw git child",async()=>{
  const bytes=Buffer.alloc(2*1024*1024,0x61);
  const dir=blobRepository(bytes);try{
    const result=await publishReconciled(await blobRequest(dir,bytes));
    assert.equal(result.kind,"published",JSON.stringify(result).slice(0,300));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("G03: a timed-out child reports the budget it exceeded in timeoutMs and in the message",async()=>{
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=blobRepository(bytes);try{
    const request=await blobRequest(dir,bytes);
    const runner:GitRunner=(args,o)=>{
      if(args[2]==="hash-object")throw Object.assign(new Error("injected git child fault"),TIMEOUT);
      return real(args,o);
    };
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner,timeoutMs:250});
    await assert.rejects(publishReconciled({...request,source}),(error:unknown)=>{
      assert.ok(error instanceof GitChildUnavailableError,"expected GitChildUnavailableError, got "+String(error));
      assert.equal(error.timeoutMs,250);
      assert.equal(error.message,"GIT_CHILD_UNAVAILABLE: git hash-object exceeded 250 ms");
      return true;
    });
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("G04: a non-UTF-8 blob publishes, so the digest covers the raw cat-file bytes and never a text decoding",async()=>{
  const bytes=Buffer.from([0xff,0xfe,0x00,0x80,0xc3,0x28,0xa0,0xa1,0xe2,0x28,0xa1,0x0a]);
  assert.notDeepEqual(Buffer.from(bytes.toString("utf8"),"utf8"),bytes,"fixture must not survive a utf8 round trip");
  const dir=blobRepository(bytes);try{
    const result=await publishReconciled(await blobRequest(dir,bytes));
    assert.equal(result.kind,"published",JSON.stringify(result).slice(0,300));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
// kyhm (9fly follow-up): the 16 MiB child budget VALUE, the raw-branch timeout, the text-branch maxBuffer and the signal wording.
test("K01: every git child the source runs receives the 16 MiB maxBuffer, not merely enough for the fixture",async()=>{
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=blobRepository(bytes);try{
    const seen:{sub:string;maxBuffer:number}[]=[];
    const runner:GitRunner=(args,o)=>{seen.push({sub:String(args[2]),maxBuffer:o.maxBuffer});return real(args,o);};
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner});
    const result=await publishReconciled(await blobRequest(dir,bytes,source));
    assert.equal(result.kind,"published",JSON.stringify(result).slice(0,300));
    assert.ok(seen.length>=5,"expected the rev-parse, ls-tree, cat-file, hash-object and update-ref children, saw "+JSON.stringify(seen));
    assert.deepEqual(seen.filter(s=>s.maxBuffer!==16*1024*1024),[],"every child gets maxBuffer 16 MiB");
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("K02: the default runner applies timeoutMs to the RAW git child, so a cat-file blob that never answers is a timeout unavailability",async()=>{
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=blobRepository(bytes);
  const shim=mkdtempSync(join(tmpdir(),"mw-kyhm-shim-"));
  const savedPath=process.env.PATH;
  try{
    const realGit=execFileSync("sh",["-c","command -v git"],{encoding:"utf8"}).trim();
    assert.ok(realGit.startsWith("/")&&!realGit.includes("'"),"real git path: "+realGit);
    writeFileSync(join(shim,"git"),"#!/bin/sh\nif [ \"$3\" = cat-file ] && [ \"$4\" = blob ]; then exec sleep 15; fi\nexec '"+realGit+"' \"$@\"\n");
    chmodSync(join(shim,"git"),0o755);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",timeoutMs:2000});
    const request=await blobRequest(dir,bytes,source);
    process.env.PATH=shim+":"+String(savedPath);
    // kf4v: the shim sleeps 15 s, past the 10000 ms default, so only a 2000 ms budget wired into the raw child ends the call well before 10 s.
    const started=Date.now();
    await assert.rejects(publishReconciled(request),(error:unknown)=>{
      assert.ok(error instanceof GitChildUnavailableError,"expected GitChildUnavailableError, got "+String(error).slice(0,200));
      assert.equal(error.kind,"timeout");assert.equal(error.subcommand,"cat-file");
      return true;
    });
    const elapsedMs=Date.now()-started;
    assert.ok(elapsedMs<9000,"the raw child must time out at the configured 2000 ms budget, not the 10000 ms default (elapsed "+elapsedMs+" ms)");
  }finally{process.env.PATH=savedPath;rmSync(dir,{recursive:true,force:true});rmSync(shim,{recursive:true,force:true});}
});
// f62j (kf4v follow-up): K02 bounds the raw child budget from above only; W1 and W2 bind it from below as well. A 4 s delayed cat-file shim must time out under 2000 ms and publish under 9000 ms, so a constant raw budget below about 9 s cannot land green. Outcome-only rows: no wall-clock assertion.
async function delayedRawChild(timeoutMs:number):Promise<{kind:string}|GitChildUnavailableError> {
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=blobRepository(bytes);
  const shim=mkdtempSync(join(tmpdir(),"mw-f62j-shim-"));
  const savedPath=process.env.PATH;
  try{
    const realGit=execFileSync("sh",["-c","command -v git"],{encoding:"utf8"}).trim();
    assert.ok(realGit.startsWith("/")&&!realGit.includes("'"),"real git path: "+realGit);
    writeFileSync(join(shim,"git"),"#!/bin/sh\nif [ \"$3\" = cat-file ] && [ \"$4\" = blob ]; then sleep 4 </dev/null >/dev/null 2>&1; fi\nexec '"+realGit+"' \"$@\"\n");
    chmodSync(join(shim,"git"),0o755);
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",timeoutMs});
    const request=await blobRequest(dir,bytes,source);
    process.env.PATH=shim+":"+String(savedPath);
    try{return await publishReconciled(request);}
    catch(error){if(error instanceof GitChildUnavailableError)return error;throw error;}
  }finally{process.env.PATH=savedPath;rmSync(dir,{recursive:true,force:true});rmSync(shim,{recursive:true,force:true});}
}
test("W1: a raw cat-file child delayed 4 s times out under timeoutMs 2000, so the raw budget is bound from below",async()=>{
  const outcome=await delayedRawChild(2000);
  assert.ok(outcome instanceof GitChildUnavailableError,"expected a timeout unavailability, got "+JSON.stringify(outcome).slice(0,200));
  assert.equal(outcome.kind,"timeout");assert.equal(outcome.subcommand,"cat-file");assert.equal(outcome.timeoutMs,2000);
});
test("W2: the same 4 s delayed raw cat-file child publishes under timeoutMs 9000, so a constant raw budget below 4 s cannot land green",async()=>{
  const outcome=await delayedRawChild(9000);
  assert.ok(!(outcome instanceof GitChildUnavailableError),"a 9000 ms budget must outlast a 4 s child, got "+String(outcome).slice(0,200));
  assert.equal(outcome.kind,"published",JSON.stringify(outcome).slice(0,300));
});
test("K03: the default runner gives the TEXT git child the 16 MiB maxBuffer, so a source tree whose listing passes 1 MiB still publishes",async()=>{
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=mkdtempSync(join(tmpdir(),"mw-kyhm-tree-"));try{
    run(dir,["init","-b","main"]);
    const oid=execFileSync("git",["-C",dir,"hash-object","-w","--stdin"],{encoding:"utf8",input:bytes}).trim();
    const entries:string[]=["100644 blob "+oid+"\ta.bin"];
    for(let k=0;k<20000;k++)entries.push("100644 blob "+oid+"\tf-"+String(k).padStart(8,"0")+".bin");
    const tree=execFileSync("git",["-C",dir,"mktree"],{encoding:"utf8",input:entries.join("\n")+"\n"}).trim();
    const commit=run(dir,["-c","user.name=CPP fixture","-c","user.email=fixture@example.org","commit-tree",tree,"-m","base"]);
    run(dir,["update-ref","refs/heads/main",commit]);
    const listing=execFileSync("git",["-C",dir,"ls-tree","-r",commit],{maxBuffer:64*1024*1024});
    assert.ok(listing.length>1024*1024&&listing.length<2*1024*1024,"fixture listing must sit between the 1 MiB execFileSync default and 2 MiB: "+listing.length);
    const result=await publishReconciled(await blobRequest(dir,bytes));
    assert.equal(result.kind,"published",JSON.stringify(result).slice(0,300));
  }finally{rmSync(dir,{recursive:true,force:true});}
});
test("K04: a signal-killed child's message says it was killed by a signal and names no budget",async()=>{
  const bytes=Buffer.from("verified Git bytes\n");
  const dir=blobRepository(bytes);try{
    const runner:GitRunner=(args,o)=>{
      if(args[2]==="hash-object")throw Object.assign(new Error("injected git child fault"),KILLED);
      return real(args,o);
    };
    const source=new GitBlobPublicationSource({repository:dir,workspaceId:"git:local",runner,timeoutMs:250});
    await assert.rejects(publishReconciled(await blobRequest(dir,bytes,source)),(error:unknown)=>{
      assert.ok(error instanceof GitChildUnavailableError,"expected GitChildUnavailableError, got "+String(error).slice(0,200));
      assert.equal(error.kind,"signal");assert.equal(error.subcommand,"hash-object");
      assert.equal(error.message,"GIT_CHILD_UNAVAILABLE: git hash-object was killed by a signal");
      return true;
    });
  }finally{rmSync(dir,{recursive:true,force:true});}
});
/** pcas: the k4yu PATH-shim census and the ab1o export census bind a beside git child by name, so a child started through an absolute git path, an sh or env launcher, or an import-time alias of execFileSync slips past both. This row reads the built module text every row imports and pins its node:child_process reach by shape (counts, never dist line numbers): one specifier importing only execFileSync, exactly two execFileSync call sites whose first argument is the bare name "git", and no other export name, alias, promisify, dynamic load or launcher literal. Comments are stripped first because the GitPublicationConfig.runner JSDoc carries a third execFileSync("git", ...) token. */
test("pcas SP1: the built git-source-publication module reaches node:child_process through one execFileSync import and exactly two bare-name git call sites, whatever path, launcher or alias a beside child would use",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const code=text.replace(/\/\*[\s\S]*?\*\//g,"").replace(/^\s*\/\/.*$/gm,"");
  assert.ok(/\bexecFileSync\b/.test(code)&&code.includes("defaultRunner"),"SP1 sanity: the stripped module still carries the runner code: "+code.length);
  const specifiers=code.match(/["'`](?:node:)?child_process["'`]/g)??[];
  assert.equal(specifiers.length,1,"SP1 specifier: exactly one node:child_process specifier, got "+JSON.stringify(specifiers));
  const named=/import\s*\{([^}]*)\}\s*from\s*["'`](?:node:)?child_process["'`]/.exec(code);
  assert.ok(named!==null,"SP1 import form: the one specifier must be a named import list, not a namespace, default, require or dynamic load");
  assert.deepEqual(named[1]!.split(",").map(n=>n.trim()).filter(n=>n!==""),["execFileSync"],"SP1 import names: only execFileSync may be imported");
  assert.doesNotMatch(code,/\brequire\s*\(|\bimport\s*\(|\bcreateRequire\b|\bprocess\.binding\b/,"SP1 load: no require, dynamic import or createRequire route to child_process");
  assert.equal((code.match(/\bexecFileSync\b/g)??[]).length,3,"SP1 alias: execFileSync appears only as the import and the two call sites, so no second identifier is bound to it");
  assert.equal((code.match(/\bexecFileSync\s*\(/g)??[]).length,2,"SP1 sites: exactly two execFileSync call sites");
  const firstArguments=[...code.matchAll(/\bexecFileSync\s*\(\s*([^,)]*?)\s*[,)]/g)].map(m=>m[1]);
  assert.deepEqual(firstArguments,['"git"','"git"'],"SP1 launcher: both call sites name the bare command git, never an absolute path, sh or env");
  assert.doesNotMatch(code,/\b(?:exec|execFile|spawn|spawnSync|execSync|fork)\b/,"SP1 exports: no other child_process export name");
  assert.doesNotMatch(code,/\bpromisify\b|["'`](?:node:)?util["'`]/,"SP1 promisify: no promisified child");
  assert.doesNotMatch(code,/["'`](?:sh|bash|zsh|dash|env)["'`]/,"SP1 launcher literal: no sh or env launcher string");
});
/** exol: the pcas SP1 row reads comment-stripped text, so it never sees which options a call site passes (a shell, env or argv0 key keeps the first argument the bare name git) and a string-framed comment delimiter can hide an alias from its stripper. These two rows read the built module as a syntax tree: strings and comments cannot move a count, and each options object is a literal with an exact key set. */
function execFileSyncSites():{readonly roles:string[];readonly sites:{readonly first:string;readonly second:string;readonly argumentCount:number;readonly keys:string[]|string;readonly stdio:string}[]} {
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const roles:string[]=[],sites:{first:string;second:string;argumentCount:number;keys:string[]|string;stdio:string}[]=[];
  const visit=(node:ts.Node):void=>{
    if(ts.isIdentifier(node)&&node.text==="execFileSync"){
      const parent=node.parent;
      roles.push(ts.isCallExpression(parent)&&parent.expression===node?"call":ts.SyntaxKind[parent.kind]);
    }
    if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&node.expression.text==="execFileSync"){
      const first=node.arguments[0],options=node.arguments[2];
      let keys:string[]|string;
      if(options===undefined)keys="absent";
      else if(!ts.isObjectLiteralExpression(options))keys=ts.SyntaxKind[options.kind]!;
      else keys=options.properties.map(property=>property.name!==undefined&&(ts.isIdentifier(property.name)||ts.isStringLiteral(property.name))?property.name.text:ts.SyntaxKind[property.kind]!);
      const second=node.arguments[1];
      let stdio="absent";
      if(options!==undefined&&ts.isObjectLiteralExpression(options)){
        const entry=options.properties.find(property=>ts.isPropertyAssignment(property)&&property.name!==undefined&&(ts.isIdentifier(property.name)||ts.isStringLiteral(property.name))&&property.name.text==="stdio");
        if(entry!==undefined&&ts.isPropertyAssignment(entry))stdio=ts.isArrayLiteralExpression(entry.initializer)?entry.initializer.elements.map(element=>ts.isStringLiteral(element)?element.text:ts.SyntaxKind[element.kind]!).join(","):ts.SyntaxKind[entry.initializer.kind]!;
      }
      sites.push({first:first!==undefined&&ts.isStringLiteral(first)?first.text:first===undefined?"absent":ts.SyntaxKind[first.kind]!,second:second===undefined?"absent":ts.isIdentifier(second)?second.text:ts.SyntaxKind[second.kind]!,argumentCount:node.arguments.length,keys,stdio});
    }
    ts.forEachChild(node,visit);
  };
  visit(source);
  return {roles,sites};
}
test("exol P1: the two execFileSync call sites in the built git-source-publication module pass literal options objects with exactly the allow-listed keys, so no shell, env, argv0, cwd or spread can enter",()=>{
  const {sites}=execFileSyncSites();
  assert.equal(sites.length,2,"P1 sites: exactly two execFileSync call sites on the syntax tree, got "+JSON.stringify(sites));
  for(const site of sites){
    assert.equal(site.first,"git","P1 first argument: the bare string literal git, got "+JSON.stringify(site));
    assert.equal(site.argumentCount,3,"P1 arity: file, argument list and one options object, got "+JSON.stringify(site));
    assert.ok(Array.isArray(site.keys),"P1 options literal: the third argument must be an object literal, got "+JSON.stringify(site));
  }
  const [text,raw]=sites;
  assert.deepEqual([...(text!.keys as string[])].sort(),["encoding","input","maxBuffer","stdio","timeout"],"P1 text site: exactly encoding, input, stdio, timeout, maxBuffer");
  assert.deepEqual([...(raw!.keys as string[])].sort(),["maxBuffer","timeout"],"P1 raw site: exactly timeout, maxBuffer");
});
test("exol P2: the identifier execFileSync occurs in the built git-source-publication module only as the one import specifier and the callee of two calls, so a string-framed comment delimiter cannot hide an alias",()=>{
  const {roles}=execFileSyncSites();
  assert.deepEqual(roles,["ImportSpecifier","call","call"],"P2 identifiers: import specifier then two callee positions; any variable, property or argument use is an alias, got "+JSON.stringify(roles));
});
/** zi09: exol P1 reads only the first and third arguments and the option keys, so a prefixed argument list (["-c","core.fsmonitor=false",...args]) or an import-time write through process.env passes every landed row. These rows read the same syntax tree for the argument list, the stdio value and the two global roots the module may never name. */
test("zi09 R1: both execFileSync call sites pass the bare identifier args as the argument list, so no array literal, spread prefix or call can put a git option ahead of the caller's arguments",()=>{
  const {sites}=execFileSyncSites();
  assert.equal(sites.length,2,"R1 sites: exactly two execFileSync call sites, got "+JSON.stringify(sites));
  for(const site of sites)assert.equal(site.second,"args","R1 argument list: the second argument is the bare identifier args, got "+JSON.stringify(site));
});
test("zi09 R2: the built git-source-publication module names neither process nor globalThis anywhere on its syntax tree, so no import-time write to the inherited environment can redirect the git children",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const names:string[]=[];
  const visit=(node:ts.Node):void=>{
    if(ts.isIdentifier(node))names.push(node.text);
    ts.forEachChild(node,visit);
  };
  visit(source);
  assert.ok(names.includes("execFileSync")&&names.includes("defaultRunner"),"R2 sanity: the walk reached the runner code, saw "+names.length+" identifiers");
  assert.deepEqual(names.filter(name=>name==="process"||name==="globalThis"),[],"R2 globals: the module names neither process nor globalThis");
});
test("zi09 R3: the text call site's stdio initializer is the literal array pipe, pipe, pipe, so no child stream is inherited from the parent",()=>{
  const {sites}=execFileSyncSites();
  assert.equal(sites[0]!.stdio,"pipe,pipe,pipe","R3 stdio: the text site pipes all three streams, got "+JSON.stringify(sites[0]));
});
/** ii2z: the zi09 rows read the identifier text at the argument position, the names process and globalThis, and one stdio entry. A rebound parameter keeps the call-site text, a global reached through an element-access string or a second import from node:process names neither identifier, and none of the three changes a landed row. These rows read the parameter's own uses, the environment a fresh module instance leaves behind, and the full import set plus every global root by identifier or element string. */
test("ii2z R1: the default runner reads its first parameter only as the argument list of its two execFileSync calls, so no rebind, in-place edit or prefix of that list can precede the call sites",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  let runner:ts.VariableDeclaration|undefined;
  const find=(node:ts.Node):void=>{
    if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.name.text==="defaultRunner")runner=node;
    ts.forEachChild(node,find);
  };
  find(source);
  assert.ok(runner!==undefined&&runner.initializer!==undefined&&ts.isArrowFunction(runner.initializer),"R1 runner: defaultRunner is bound to an arrow function");
  const arrow=runner!.initializer as ts.ArrowFunction,parameter=arrow.parameters[0];
  assert.ok(parameter!==undefined&&ts.isIdentifier(parameter.name),"R1 parameter: the first parameter is a plain identifier");
  const name=(parameter!.name as ts.Identifier).text,uses:string[]=[];
  const visit=(node:ts.Node):void=>{
    if(ts.isIdentifier(node)&&node.text===name){
      const parent=node.parent;
      uses.push(ts.isCallExpression(parent)&&ts.isIdentifier(parent.expression)&&parent.expression.text==="execFileSync"&&parent.arguments[1]===node?"argument-list":ts.SyntaxKind[parent.kind]!);
    }
    ts.forEachChild(node,visit);
  };
  visit(arrow.body);
  assert.deepEqual(uses,["argument-list","argument-list"],"R1 uses of "+name+": exactly the two argument-list positions, got "+JSON.stringify(uses));
});
test("ii2z R2: importing a fresh instance of the built git-source-publication module changes no environment entry, so no import-time write, however spelled, reaches the environment the git children inherit",async()=>{
  const snapshot=():Record<string,string|undefined> => Object.fromEntries(Object.keys(process.env).sort().map(key=>[key,process.env[key]]));
  const before=snapshot();
  const url=new URL("../dist/git-source-publication.js",import.meta.url);
  url.search="?ii2z="+process.pid+"-"+Date.now();
  const fresh=await import(url.href) as {GitBlobPublicationSource?:unknown};
  assert.equal(typeof fresh.GitBlobPublicationSource,"function","R2 sanity: the fresh instance exports GitBlobPublicationSource");
  const after=snapshot();
  const changed=[...new Set([...Object.keys(before),...Object.keys(after)])].sort().filter(key=>before[key]!==after[key]);
  assert.deepEqual(changed,[],"R2 environment: entries changed by the import "+JSON.stringify(changed));
});
test("ii2z R3: the built git-source-publication module imports exactly execFileSync from node:child_process, createHash from node:crypto and publicationSemanticKey from the coordination package, and names no process, globalThis or global root by identifier or element-access string",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const roots=new Set(["process","globalThis","global"]),imports:string[]=[],found:string[]=[];
  const specifier=(node:ts.Expression):string => ts.isStringLiteral(node)?node.text:ts.SyntaxKind[node.kind]!;
  const visit=(node:ts.Node):void=>{
    if(ts.isImportDeclaration(node)){
      const clause=node.importClause,bindings=clause?.namedBindings,parts:string[]=[];
      if(clause?.name!==undefined)parts.push("default "+clause.name.text);
      if(bindings!==undefined&&ts.isNamespaceImport(bindings))parts.push("* as "+bindings.name.text);
      if(bindings!==undefined&&ts.isNamedImports(bindings))for(const element of bindings.elements)parts.push((element.propertyName!==undefined?element.propertyName.text+" as ":"")+element.name.text);
      imports.push(specifier(node.moduleSpecifier)+" {"+parts.join(", ")+"}");
    }
    if(ts.isExportDeclaration(node)&&node.moduleSpecifier!==undefined)imports.push("export-from "+specifier(node.moduleSpecifier));
    if(ts.isIdentifier(node)&&roots.has(node.text))found.push(node.text+"@"+ts.SyntaxKind[node.parent.kind]);
    if(ts.isElementAccessExpression(node)&&ts.isStringLiteralLike(node.argumentExpression)&&roots.has(node.argumentExpression.text))found.push("["+node.argumentExpression.text+"]");
    ts.forEachChild(node,visit);
  };
  visit(source);
  assert.deepEqual(imports,["node:child_process {execFileSync}","node:crypto {createHash}","@mechanical/workflows-coordination {publicationSemanticKey}"],"R3 imports: the full import set, got "+JSON.stringify(imports));
  assert.deepEqual(found,[],"R3 global roots: none by identifier or element string, got "+JSON.stringify(found));
});
/** cn1k: the ii2z rows read the syntax tree and the environment around one fresh import. A call-time environment write, an argument prefix added by a wrapper at the runner binding before defaultRunner runs, and a dynamic-code route (eval, Function, dynamic import) each keep every landed row green. These rows measure the default runner's behaviour: the environment around real calls, the exact argument lists reaching the module's live execFileSync binding (syncBuiltinESMExports, the ab1o mechanism), and the absence of dynamic-code identifiers on the built tree. */
test("cn1k YW1: default-runner readBasis and readCurrent calls change no environment entry, so no call-time write, however spelled, reaches the environment later git children inherit",()=>{
  const directory=repository();
  try {
    /** A fresh child process with a minimal environment: an earlier write by a mutated module in this process would otherwise leave the entry already set to the same value, so a later window could not see it. */
    const moduleUrl=new URL("../dist/git-source-publication.js",import.meta.url).href;
    const script=[
      "import { GitBlobPublicationSource } from "+JSON.stringify(moduleUrl)+";",
      "const snapshot = () => Object.fromEntries(Object.keys(process.env).sort().map(key => [key, process.env[key]]));",
      "const source = new GitBlobPublicationSource({ repository: "+JSON.stringify(directory)+", workspaceId: \"git:local\" });",
      "const before = snapshot();",
      "await source.readBasis();",
      "const current = await source.readCurrent();",
      "const after = snapshot();",
      "const changed = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort().filter(key => before[key] !== after[key]);",
      "process.stdout.write(JSON.stringify({ changed, current }));",
    ].join("\n");
    const environment:Record<string,string>={};
    for(const key of ["PATH","HOME"])if(process.env[key]!==undefined)environment[key]=process.env[key]!;
    const output=execFileSync(process.execPath,["--input-type=module","-e",script],{encoding:"utf8",env:environment,stdio:["pipe","pipe","pipe"]});
    const result=JSON.parse(output) as {changed:string[];current:unknown};
    assert.equal(result.current,null,"YW1 sanity: no publication ref yet");
    assert.deepEqual(result.changed,[],"YW1 environment: entries changed by default-runner calls "+JSON.stringify(result.changed));
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("cn1k YW2: the default runner hands the module's live execFileSync binding exactly the -C repository argument list child() built, on every text call of readBasis and readCurrent",async()=>{
  const directory=repository();
  try {
    const source=new GitBlobPublicationSource({repository:directory,workspaceId:"git:local"});
    const original=cpExports.execFileSync as (...a:unknown[])=>unknown,calls:string[][]=[];
    cpExports.execFileSync=(...a:unknown[])=>{ calls.push([String(a[0]),...(Array.isArray(a[1])?a[1].map(String):[String(a[1])])]); return original(...a); };
    syncBuiltinESMExports();
    let current:unknown="unset";
    try { await source.readBasis(); current=await source.readCurrent(); }
    finally { cpExports.execFileSync=original; syncBuiltinESMExports(); }
    assert.equal(current,null,"YW2 sanity: no publication ref yet");
    assert.deepEqual(calls,[
      ["git","-C",directory,"rev-parse","--verify","refs/heads/main"],
      ["git","-C",directory,"rev-parse","--verify","refs/heads/main"],
      ["git","-C",directory,"rev-parse","--verify","refs/cpp10/publication"],
    ],"YW2 argument lists: "+JSON.stringify(calls));
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("cn1k YW3: the built git-source-publication module's syntax tree carries no eval or Function identifier and no dynamic import call, so no string can reach the runner's argument list or a global root",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const found:string[]=[];
  const visit=(node:ts.Node):void=>{
    if(ts.isIdentifier(node)&&(node.text==="eval"||node.text==="Function"))found.push(node.text+"@"+ts.SyntaxKind[node.parent.kind]);
    if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword)found.push("import()@CallExpression");
    ts.forEachChild(node,visit);
  };
  visit(source);
  assert.deepEqual(found,[],"YW3 dynamic code: "+JSON.stringify(found));
});
/** mwt2: YW1 compares two snapshots, one before readBasis and one after readCurrent, so an entry written before a call and restored inside the call stays invisible to it, and no landed row reads the environment around an input-carrying call (hash-object -w --stdin, update-ref --stdin). WX1 and WX2 wrap the module's live execFileSync binding in a fresh child, so each record holds the environment as the git child inherits it at the call and again right after it. Calls get named by the subcommand after the -C repository pair, never by a fixed argv index, so a failure here belongs to the environment law and not to an argument-shape clause. */
const wxChild=(directory:string,body:string[]):{calls:{sub:string;atCall:string[];afterCall:string[]}[];afterAll:string[];[key:string]:unknown}=>{
  const moduleUrl=new URL("../dist/git-source-publication.js",import.meta.url).href;
  const script=[
    'import { createRequire, syncBuiltinESMExports } from "node:module";',
    "import { GitBlobPublicationSource } from "+JSON.stringify(moduleUrl)+";",
    "import { publishReconciled } from "+JSON.stringify(import.meta.resolve("@mechanical/workflows-coordination"))+";",
    "const snapshot = () => Object.fromEntries(Object.keys(process.env).sort().map(key => [key, process.env[key]]));",
    "const diff = (left, right) => [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().filter(key => left[key] !== right[key]);",
    "const baseline = snapshot();",
    'const childProcess = createRequire(import.meta.url)("node:child_process");',
    "const original = childProcess.execFileSync;",
    "const calls = [];",
    "childProcess.execFileSync = (...a) => {",
    "  const args = Array.isArray(a[1]) ? a[1].map(String) : [];",
    '  const at = args.indexOf("-C");',
    '  const record = { sub: at >= 0 ? (args[at + 2] ?? "") : "", atCall: diff(baseline, snapshot()), afterCall: [] };',
    "  calls.push(record);",
    "  try { return original(...a); } finally { record.afterCall = diff(baseline, snapshot()); }",
    "};",
    "syncBuiltinESMExports();",
    "const extra = {};",
    "const source = new GitBlobPublicationSource({ repository: "+JSON.stringify(directory)+', workspaceId: "git:local" });',
    ...body,
    "childProcess.execFileSync = original;",
    "syncBuiltinESMExports();",
    "process.stdout.write(JSON.stringify({ calls, afterAll: diff(baseline, snapshot()), ...extra }));",
  ].join("\n");
  const environment:Record<string,string>={};
  for(const key of ["PATH","HOME"])if(process.env[key]!==undefined)environment[key]=process.env[key]!;
  const output=execFileSync(process.execPath,["--input-type=module","-e",script],{encoding:"utf8",env:environment,stdio:["pipe","pipe","pipe"]});
  return JSON.parse(output) as {calls:{sub:string;atCall:string[];afterCall:string[]}[];afterAll:string[];[key:string]:unknown};
};
const wxViolations=(result:{calls:{sub:string;atCall:string[];afterCall:string[]}[];afterAll:string[]}):string[] =>
  [...result.calls.flatMap((call,index)=>[...call.atCall.map(key=>"call "+index+" git "+call.sub+" at the call: "+key),...call.afterCall.map(key=>"call "+index+" git "+call.sub+" after the call: "+key)]),...result.afterAll.map(key=>"after all calls: "+key)];
test("mwt2 WX1: at the moment of each readBasis and readCurrent git call, and right after it, the environment equals the one before the first call, so a write restored inside the call is seen",()=>{
  const directory=repository();
  try {
    const result=wxChild(directory,["await source.readBasis();","extra.current = await source.readCurrent();"]);
    assert.equal(result.current,null,"WX1 sanity: no publication ref yet");
    assert.deepEqual([...new Set(result.calls.map(call=>call.sub))],["rev-parse"],"WX1 sanity: the wrapper saw the rev-parse calls, got "+JSON.stringify(result.calls.map(call=>call.sub)));
    assert.ok(result.calls.length>=3,"WX1 sanity: at least three calls seen, got "+result.calls.length);
    assert.deepEqual(wxViolations(result),[],"WX1 environment at each call");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("mwt2 WX2: over a full default-runner publication (publishReconciled, then readCurrent) the environment equals the one before the first call at every call, the input-carrying hash-object and update-ref calls included",()=>{
  const directory=repository();
  try {
    const oid=run(directory,["rev-parse","HEAD:a.txt"]),bytes=execFileSync("git",["-C",directory,"cat-file","blob",oid]);
    const digest="sha256:"+createHash("sha256").update(bytes).digest("hex");
    const result=wxChild(directory,[
      "const basis = await source.readBasis();",
      "const artifact = { id: \"a\", revision: basis.revision, digest: "+JSON.stringify(digest)+", receiptRef: \"gitblob:\" + "+JSON.stringify(oid)+", consumerContract: \"git-blob-content-v1\", dependencies: [], dischargedEffectIds: [] };",
      "const intent = { intentId: \"worker1:publish\", policyId: \"worker1\", target: { kind: \"artifact\", uri: \"a\" }, expectedRevision: basis.revision, effect: \"publish-artifact\", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [artifact.receiptRef], writeScopes: [\"artifact:a\"], readScopes: [] };",
      "const publication = await publishReconciled({ source, budget: { compute: 1, workers: 1, queue: 1, latencyMs: 100 }, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }], artifacts: [artifact], requiredIds: [\"a\"], consumerContract: \"git-blob-content-v1\" });",
      "extra.kind = publication.kind;",
      "extra.current = (await source.readCurrent())?.sourceRevision ?? null;",
      "extra.revision = basis.revision;",
    ]);
    assert.equal(result.kind,"published","WX2 sanity: the publication committed");
    assert.equal(result.current,result.revision,"WX2 sanity: readCurrent returned the published snapshot");
    const subs=new Set(result.calls.map(call=>call.sub));
    for(const sub of ["rev-parse","ls-tree","cat-file","hash-object","update-ref"])assert.ok(subs.has(sub),"WX2 sanity: the wrapper saw git "+sub+", got "+JSON.stringify([...subs]));
    assert.deepEqual(wxViolations(result),[],"WX2 environment at every call over a publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("mwt2 WX3: the built git-source-publication module's syntax tree carries no member access named constructor, by property or by the string element, so the property-access and string-literal element spellings of the constructor route to process are closed; destructured, Reflect.get and computed-key spellings fall to the semantic rows jeud XK2 and XK3",()=>{
  const text=readFileSync(new URL("../dist/git-source-publication.js",import.meta.url),"utf8");
  const source=ts.createSourceFile("git-source-publication.js",text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const found:string[]=[];
  const visit=(node:ts.Node):void=>{
    if(ts.isPropertyAccessExpression(node)&&node.name.text==="constructor")found.push(".constructor@PropertyAccessExpression");
    if(ts.isElementAccessExpression(node)&&ts.isStringLiteralLike(node.argumentExpression)&&node.argumentExpression.text==="constructor")found.push("[constructor]@ElementAccessExpression");
    ts.forEachChild(node,visit);
  };
  visit(source);
  assert.deepEqual(found,[],"WX3 constructor member accesses: "+JSON.stringify(found));
});
/** jeud: WX1 and WX2 take their environment baseline after the child's static import of the module, so a write that runs once at import time (a module-scope GIT_CONFIG_PARAMETERS assignment through a destructured constructor binding or a computed element key) is already in the baseline, and WX2 publishes once, so the update-ref transaction only ever carries the all-zero old oid, which hides a write fired only when the publication ref already exists. XK2 snapshots process.env BEFORE the dynamic import of the module and publishes two artifacts on the same basis, so the second update-ref moves the ref from the first snapshot (old oid nonzero), then reads the current snapshot. XK3 runs the same two publications under --disallow-code-generation-from-strings, so no spelling of the constructor route can compile a string that returns process on these paths. Each child gets PATH and HOME only. */
type XkCall={sub:string;input:string|null;atCall:string[];afterCall:string[]};
type XkResult={calls:XkCall[];afterImport:string[];afterAll:string[];statuses:string[];current:string|null};
const xkChild=(directory:string,flags:string[]):XkResult=>{
  const moduleUrl=new URL("../dist/git-source-publication.js",import.meta.url).href;
  const oid=run(directory,["rev-parse","HEAD:a.txt"]),revision=run(directory,["rev-parse","refs/heads/main"]);
  const bytes=execFileSync("git",["-C",directory,"cat-file","blob",oid]);
  const digest="sha256:"+createHash("sha256").update(bytes).digest("hex");
  const script=[
    'import { createRequire, syncBuiltinESMExports } from "node:module";',
    "const snapshot = () => Object.fromEntries(Object.keys(process.env).sort().map(key => [key, process.env[key]]));",
    "const diff = (left, right) => [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().filter(key => left[key] !== right[key]);",
    "const baseline = snapshot();",
    "const childProcess = createRequire("+JSON.stringify(moduleUrl)+')("node:child_process");',
    "const original = childProcess.execFileSync;",
    "const calls = [];",
    "childProcess.execFileSync = (...a) => {",
    "  const args = Array.isArray(a[1]) ? a[1].map(String) : [];",
    '  const at = args.indexOf("-C");',
    '  const record = { sub: at >= 0 ? (args[at + 2] ?? "") : "", input: a[2] && typeof a[2].input === "string" ? a[2].input : null, atCall: diff(baseline, snapshot()), afterCall: [] };',
    "  calls.push(record);",
    "  try { return original(...a); } finally { record.afterCall = diff(baseline, snapshot()); }",
    "};",
    "syncBuiltinESMExports();",
    "const { GitBlobPublicationSource } = await import("+JSON.stringify(moduleUrl)+");",
    "const { publishReconciled } = await import("+JSON.stringify(import.meta.resolve("@mechanical/workflows-coordination"))+");",
    "const afterImport = diff(baseline, snapshot());",
    "const source = new GitBlobPublicationSource({ repository: "+JSON.stringify(directory)+', workspaceId: "git:local" });',
    "const request = (id) => {",
    "  const artifact = { id, revision: "+JSON.stringify(revision)+", digest: "+JSON.stringify(digest)+', receiptRef: "gitblob:" + '+JSON.stringify(oid)+', consumerContract: "git-blob-content-v1", dependencies: [], dischargedEffectIds: [] };',
    '  const intent = { intentId: "worker1:publish-" + id, policyId: "worker1", target: { kind: "artifact", uri: id }, expectedRevision: '+JSON.stringify(revision)+', effect: "publish-artifact", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [artifact.receiptRef], writeScopes: ["artifact:" + id], readScopes: [] };',
    '  return { source, budget: { compute: 1, workers: 1, queue: 1, latencyMs: 100 }, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }], artifacts: [artifact], requiredIds: [id], consumerContract: "git-blob-content-v1" };',
    "};",
    "const statuses = [];",
    "let current = null;",
    "try {",
    '  for (const id of ["a", "b"]) statuses.push((await publishReconciled(request(id))).kind);',
    "  const snapshotNow = await source.readCurrent();",
    '  current = snapshotNow === null ? null : snapshotNow.artifacts.map(item => item.id).join(",");',
    "} finally { childProcess.execFileSync = original; syncBuiltinESMExports(); }",
    "process.stdout.write(JSON.stringify({ calls, afterImport, afterAll: diff(baseline, snapshot()), statuses, current }));",
  ].join("\n");
  const environment:Record<string,string>={};
  for(const key of ["PATH","HOME"])if(process.env[key]!==undefined)environment[key]=process.env[key]!;
  return JSON.parse(execFileSync(process.execPath,[...flags,"--input-type=module","-e",script],{encoding:"utf8",env:environment,stdio:["pipe","pipe","pipe"]})) as XkResult;
};
const xkViolations=(result:XkResult):string[] =>
  [...result.afterImport.map(key=>"at import: "+key),
    ...result.calls.flatMap((call,index)=>[...call.atCall.map(key=>"call "+index+" git "+call.sub+" at the call: "+key),...call.afterCall.map(key=>"call "+index+" git "+call.sub+" after the call: "+key)]),
    ...result.afterAll.map(key=>"after all calls: "+key)];
const xkUpdates=(result:XkResult):{created:string;previous:string}[] =>
  result.calls.filter(call=>call.sub==="update-ref").map(call=>(call.input??"").split("\n").find(line=>line.startsWith("update "))??"").map(line=>{const parts=line.split(" ");return {created:parts[2]??"",previous:parts[3]??""};});
test("jeud XK2: over two default-runner publications, the second over an existing publication ref (update-ref old oid nonzero), the environment measured from before the module's first import stays unchanged at the import and at and after every call",()=>{
  const directory=repository();
  try {
    const result=xkChild(directory,[]);
    assert.deepEqual(result.statuses,["published","published"],"XK2 sanity: both publications commit, got "+JSON.stringify(result.statuses));
    assert.equal(result.current,"b","XK2 sanity: readCurrent returns the second snapshot");
    const updates=xkUpdates(result);
    assert.equal(updates.length,2,"XK2 sanity: two update-ref transactions, got "+JSON.stringify(updates));
    assert.match(updates[0]?.previous??"",/^0+$/,"XK2 sanity: the first update-ref creates the ref");
    const second=updates[1]?.previous??"";
    assert.ok(/^[0-9a-f]+$/.test(second)&&!/^0+$/.test(second)&&second===updates[0]?.created,"XK2 sanity: the second update-ref moves the ref from the first snapshot, got "+JSON.stringify(updates));
    assert.deepEqual(xkViolations(result),[],"XK2 environment over a republication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("jeud XK3: with code generation from strings disallowed, a fresh child imports the module and runs both publications and readCurrent, so no constructor-route spelling compiles a string on those paths",()=>{
  const directory=repository();
  try {
    const result=xkChild(directory,["--disallow-code-generation-from-strings"]);
    assert.deepEqual(result.statuses,["published","published"],"XK3 publications under --disallow-code-generation-from-strings, got "+JSON.stringify(result.statuses));
    assert.equal(result.current,"b","XK3 readCurrent under --disallow-code-generation-from-strings");
    assert.equal(xkUpdates(result).length,2,"XK3 sanity: two update-ref transactions");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
/** 3940 (jeud follow-up): XK2 and XK3 drive publications that commit, so the update-ref catch branch of commitAtomically (the source moved under the transaction, or update-ref failed with the source still current), the one remaining branch that runs git children, is measured nowhere. XE1 advances the source after readBasis so update-ref's verify line fails and the catch branch answers source-stale; XE2 runs that publication with code generation from strings disallowed; XE3 holds the ref lock so update-ref fails while the source is still current and the catch branch answers CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR. Each child snapshots process.env BEFORE the module's first import and gets PATH and HOME only. */
type XeCall={sub:string;atCall:string[];afterCall:string[]};
type XeOutcome={kind:string;reason:string|null;currentRevision:string|null};
type XeResult={calls:XeCall[];afterImport:string[];afterAll:string[];outcomes:XeOutcome[];ref:string|null;head:string;snapshotId:string|null;thrown:{code:string|null;kind:string|null;subcommand:string|null}|null;marks:number[]};
type XeFixture={directory:string;revision:string;oid:string;gitDir:string;refFormat:string;digest:string};
const xeFixture=(directory:string):XeFixture=>{
  const oid=run(directory,["rev-parse","HEAD:a.txt"]);
  const bytes=execFileSync("git",["-C",directory,"cat-file","blob",oid]);
  return {directory,revision:run(directory,["rev-parse","refs/heads/main"]),oid,gitDir:run(directory,["rev-parse","--absolute-git-dir"]),
    refFormat:run(directory,["rev-parse","--show-ref-format"]),digest:"sha256:"+createHash("sha256").update(bytes).digest("hex")};
};
const xeChild=(fx:XeFixture,mode:"stale"|"lock"|"committed"|"timeout"|"post-timeout"|"signal"|"repeat",flags:string[]):XeResult=>{
  const moduleUrl=new URL("../dist/git-source-publication.js",import.meta.url).href;
  const script=[
    'import { createRequire, syncBuiltinESMExports } from "node:module";',
    'import { writeFileSync, mkdirSync, rmSync } from "node:fs";',
    'import { join } from "node:path";',
    "const fx = "+JSON.stringify(fx)+", mode = "+JSON.stringify(mode)+";",
    "const snap = () => Object.fromEntries(Object.keys(process.env).sort().map(key => [key, process.env[key]]));",
    "const diff = (left, right) => [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().filter(key => left[key] !== right[key]);",
    "const pre = snap();",
    "const childProcess = createRequire("+JSON.stringify(moduleUrl)+')("node:child_process");',
    "const calls = [], original = childProcess.execFileSync;",
    'const fixture = (args) => original("git", ["-C", fx.directory, ...args], { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();',
    "childProcess.execFileSync = (...a) => {",
    "  const args = Array.isArray(a[1]) ? a[1].map(String) : [];",
    '  const at = args.indexOf("-C");',
    '  const record = { sub: at >= 0 ? (args[at + 2] ?? "") : "", atCall: diff(pre, snap()), afterCall: [] };',
    "  calls.push(record);",
    '  if (mode === "committed" && record.sub === "update-ref") { try { original(...a); } finally { record.afterCall = diff(pre, snap()); } throw Object.assign(new Error("injected failure after update-ref applied the ref"), { status: 128 }); }',
    '  if (mode === "post-timeout" && record.sub === "update-ref") { try { original(...a); } finally { record.afterCall = diff(pre, snap()); } throw Object.assign(new Error("injected update-ref timeout after the transaction applied the ref"), { code: "ETIMEDOUT", signal: "SIGTERM", status: null }); }',
    '  if (mode === "signal" && record.sub === "update-ref") { record.afterCall = diff(pre, snap()); throw Object.assign(new Error("injected update-ref kill by a signal"), { signal: "SIGKILL", status: null }); }',
    '  if (mode === "timeout" && record.sub === "update-ref") { record.afterCall = diff(pre, snap()); throw Object.assign(new Error("injected update-ref timeout"), { code: "ETIMEDOUT", signal: "SIGTERM", status: null }); }',
    "  try { return original(...a); } finally { record.afterCall = diff(pre, snap()); }",
    "};",
    "syncBuiltinESMExports();",
    "const { GitBlobPublicationSource } = await import("+JSON.stringify(moduleUrl)+");",
    "const { publishReconciled } = await import("+JSON.stringify(import.meta.resolve("@mechanical/workflows-coordination"))+");",
    "const afterImport = diff(pre, snap());",
    'const source = new GitBlobPublicationSource({ repository: fx.directory, workspaceId: "git:local" });',
    'const artifact = { id: "a", revision: fx.revision, digest: fx.digest, receiptRef: "gitblob:" + fx.oid, consumerContract: "git-blob-content-v1", dependencies: [], dischargedEffectIds: [] };',
    'const intent = { intentId: "worker1:publish-a", policyId: "worker1", target: { kind: "artifact", uri: "a" }, expectedRevision: fx.revision, effect: "publish-artifact", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [artifact.receiptRef], writeScopes: ["artifact:a"], readScopes: [] };',
    'const request = { source, budget: { compute: 1, workers: 1, queue: 1, latencyMs: 100 }, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }], artifacts: [artifact], requiredIds: ["a"], consumerContract: "git-blob-content-v1" };',
    "const commit = source.commitAtomically.bind(source);",
    'const lock = join(fx.gitDir, "refs", "cpp10", "publication.lock");',
    "source.commitAtomically = async (candidate) => {",
    '  if (mode === "stale") { writeFileSync(join(fx.directory, "later.txt"), "source advanced under the transaction\\n"); fixture(["add", "later.txt"]); fixture(["commit", "-m", "advance"]); }',
    '  else if (mode === "lock") { mkdirSync(join(fx.gitDir, "refs", "cpp10"), { recursive: true }); writeFileSync(lock, ""); }',
    '  try { return await commit(candidate); } finally { if (mode === "lock") rmSync(lock, { force: true }); }',
    "};",
    "const outcomes = [], marks = [];",
    "let snapshotId = null, thrown = null;",
    "try {",
    '  for (let round = 0; round < (mode === "repeat" ? 2 : 1); round++) {',
    "    marks.push(calls.length);",
    "    const result = await publishReconciled(request);",
    "    outcomes.push({ kind: result.kind, reason: result.reason ?? null, currentRevision: result.currentRevision ?? null });",
    "    snapshotId = result.snapshotId ?? null;",
    "  }",
    "} catch (error) { thrown = { code: error?.code ?? null, kind: error?.kind ?? null, subcommand: error?.subcommand ?? null }; }",
    "finally { childProcess.execFileSync = original; syncBuiltinESMExports(); }",
    'let ref = null; try { ref = fixture(["rev-parse", "--verify", "refs/cpp10/publication"]); } catch { ref = null; }',
    'process.stdout.write(JSON.stringify({ calls, afterImport, afterAll: diff(pre, snap()), outcomes, ref, head: fixture(["rev-parse", "refs/heads/main"]), snapshotId, thrown, marks }));',
  ].join("\n");
  const environment:Record<string,string>={};
  for(const key of ["PATH","HOME"])if(process.env[key]!==undefined)environment[key]=process.env[key]!;
  return JSON.parse(execFileSync(process.execPath,[...flags,"--input-type=module","-e",script],{encoding:"utf8",env:environment,stdio:["pipe","pipe","pipe"]})) as XeResult;
};
const xeViolations=(result:XeResult):string[] =>
  [...result.afterImport.map(key=>"at import: "+key),
    ...result.calls.flatMap((call,index)=>[...call.atCall.map(key=>"call "+index+" git "+call.sub+" at the call: "+key),...call.afterCall.map(key=>"call "+index+" git "+call.sub+" after the call: "+key)]),
    ...result.afterAll.map(key=>"after all calls: "+key)];
const xeSubs=(result:XeResult):string[] =>result.calls.map(call=>call.sub);
test("3940 XE1: over a source-stale default-runner publication (the source advances after readBasis, update-ref's verify line fails and the catch branch answers stale), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"stale",[]);
    assert.deepEqual(result.outcomes.map(item=>item.kind),["source-stale"],"XE1 sanity: the publication is source-stale, got "+JSON.stringify(result.outcomes));
    assert.equal(result.outcomes[0]?.currentRevision,result.head,"XE1 sanity: the stale answer names the advanced source revision");
    assert.notEqual(result.head,fx.revision,"XE1 sanity: the source advanced");
    const subs=xeSubs(result);
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"XE1 sanity: one update-ref attempt, got "+JSON.stringify(subs));
    assert.ok(subs.lastIndexOf("rev-parse")>subs.indexOf("update-ref"),"XE1 sanity: the catch branch re-read the source after update-ref, got "+JSON.stringify(subs));
    assert.equal(result.ref,null,"XE1 sanity: no publication ref was written");
    assert.deepEqual(xeViolations(result),[],"XE1 environment over a source-stale publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("3940 XE2: with code generation from strings disallowed, the same source-stale publication in a fresh child still answers source-stale, so no constructor-route spelling compiles a string on the update-ref catch branch",()=>{
  const directory=repository();
  try {
    const result=xeChild(xeFixture(directory),"stale",["--disallow-code-generation-from-strings"]);
    assert.deepEqual(result.outcomes.map(item=>item.kind),["source-stale"],"XE2 publication under --disallow-code-generation-from-strings, got "+JSON.stringify(result.outcomes));
    assert.equal(xeSubs(result).filter(sub=>sub==="update-ref").length,1,"XE2 sanity: one update-ref attempt");
    assert.equal(result.ref,null,"XE2 sanity: no publication ref was written");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("3940 XE3: over a publication whose update-ref fails on a held ref lock while the source is still current (the catch branch answers CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory);
    assert.equal(fx.refFormat,"files","XE3 sanity: the fixture uses the files ref backend, so a .lock file holds the ref");
    const result=xeChild(fx,"lock",[]);
    assert.deepEqual(result.outcomes,[{kind:"source-rejected",reason:"CONCURRENT_REF_UPDATE_OR_GIT_LOCK_ERROR",currentRevision:null}],"XE3 sanity: the held lock is a rejection, got "+JSON.stringify(result.outcomes));
    assert.equal(result.head,fx.revision,"XE3 sanity: the source did not move");
    assert.equal(xeSubs(result).filter(sub=>sub==="update-ref").length,1,"XE3 sanity: one update-ref attempt, got "+JSON.stringify(xeSubs(result)));
    assert.equal(result.ref,null,"XE3 sanity: no publication ref was written");
    assert.deepEqual(xeViolations(result),[],"XE3 environment over a lock-refused publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
/** gjs0 (3940 follow-up): YC1 and YC2 drive the two remaining exits of the update-ref catch branch through the XE child harness. YC1 lets the real update-ref apply the ref and then fails the child with a plain nonzero status while the source is current, so the catch branch answers committed. YC2 times the update-ref child out before it runs, so the source is current, the ref is absent and the catch branch rethrows GitChildUnavailableError. */
test("gjs0 YC1: over a publication whose update-ref applies the ref and then reports a failure while the source is still current (the catch branch re-reads the source and the ref and answers committed), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"committed",[]);
    assert.deepEqual(result.outcomes.map(item=>item.kind),["published"],"YC1 sanity: the committed-in-catch publication is published, got "+JSON.stringify(result.outcomes));
    assert.equal(result.thrown,null,"YC1 sanity: nothing threw, got "+JSON.stringify(result.thrown));
    assert.match(result.ref??"",/^[a-f0-9]{40}$/,"YC1 sanity: the publication ref holds an oid, got "+JSON.stringify(result.ref));
    assert.equal(result.snapshotId,result.ref,"YC1 sanity: the published snapshot id equals the ref the failed update-ref applied");
    assert.equal(result.head,fx.revision,"YC1 sanity: the source did not move");
    const subs=xeSubs(result);
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"YC1 sanity: one update-ref attempt, got "+JSON.stringify(subs));
    assert.ok(subs.lastIndexOf("rev-parse")>subs.indexOf("update-ref"),"YC1 sanity: the catch branch re-read the source and the ref after update-ref, got "+JSON.stringify(subs));
    assert.deepEqual(xeViolations(result),[],"YC1 environment over a committed-in-catch publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("gjs0 YC2: over a publication whose update-ref child times out while the source is still current and the ref absent (the catch branch rethrows GitChildUnavailableError), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"timeout",[]);
    assert.deepEqual(result.thrown,{code:"GIT_CHILD_UNAVAILABLE",kind:"timeout",subcommand:"update-ref"},"YC2 sanity: the publication rejects as unavailable, got "+JSON.stringify(result.thrown));
    assert.deepEqual(result.outcomes,[],"YC2 sanity: no outcome was produced");
    assert.equal(result.ref,null,"YC2 sanity: no publication ref was written");
    assert.equal(result.head,fx.revision,"YC2 sanity: the source did not move");
    const subs=xeSubs(result);
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"YC2 sanity: one update-ref attempt, got "+JSON.stringify(subs));
    assert.ok(subs.lastIndexOf("rev-parse")>subs.indexOf("update-ref"),"YC2 sanity: the catch branch re-read the source and the ref after update-ref, got "+JSON.stringify(subs));
    assert.deepEqual(xeViolations(result),[],"YC2 environment over an unavailable-rethrow publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
/** 3c70i (gjs0 follow-up): X1, X2 and X3 drive the three remaining entries of commitAtomically through the XE child harness. X1 lets the real update-ref apply the ref and then fails the child with a timeout while the source is current, so the catch branch re-reads the ref and answers committed through an unavailable error. X2 kills the update-ref child by a signal before it runs, so the source is current, the ref absent and the catch branch rethrows GitChildUnavailableError of kind signal. X3 publishes the same request twice, so the second publication answers committed from the idempotent early return without an update-ref. */
test("3c70i X1: over a publication whose update-ref applies the ref and whose child then times out while the source is still current (the catch branch re-reads the ref and answers committed through an unavailable error), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"post-timeout",[]);
    assert.deepEqual(result.outcomes.map(item=>item.kind),["published"],"X1 sanity: the catch branch answers committed, got "+JSON.stringify(result.outcomes));
    assert.equal(result.thrown,null,"X1 sanity: nothing threw, got "+JSON.stringify(result.thrown));
    assert.match(result.ref??"",/^[a-f0-9]{40}$/,"X1 sanity: update-ref wrote the publication ref, got "+JSON.stringify(result.ref));
    assert.equal(result.snapshotId,result.ref,"X1 sanity: the committed answer names the ref update-ref wrote");
    assert.equal(result.head,fx.revision,"X1 sanity: the source did not move");
    const subs=xeSubs(result);
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"X1 sanity: one update-ref attempt, got "+JSON.stringify(subs));
    assert.ok(subs.lastIndexOf("rev-parse")>subs.indexOf("update-ref"),"X1 sanity: the catch branch re-read the source and the ref after update-ref, got "+JSON.stringify(subs));
    assert.deepEqual(xeViolations(result),[],"X1 environment over a committed-after-timeout publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("3c70i X2: over a publication whose update-ref child is killed by a signal before it runs while the source is current and the ref absent (the catch branch rethrows GIT_CHILD_UNAVAILABLE of kind signal), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"signal",[]);
    assert.deepEqual(result.thrown,{code:"GIT_CHILD_UNAVAILABLE",kind:"signal",subcommand:"update-ref"},"X2 sanity: the catch branch rethrows the killed child, got "+JSON.stringify(result.thrown));
    assert.deepEqual(result.outcomes,[],"X2 sanity: no outcome was produced");
    assert.equal(result.ref,null,"X2 sanity: no publication ref was written");
    assert.equal(result.head,fx.revision,"X2 sanity: the source did not move");
    const subs=xeSubs(result);
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"X2 sanity: one update-ref attempt, got "+JSON.stringify(subs));
    assert.ok(subs.lastIndexOf("rev-parse")>subs.indexOf("update-ref"),"X2 sanity: the catch branch re-read the source and the ref after update-ref, got "+JSON.stringify(subs));
    assert.deepEqual(xeViolations(result),[],"X2 environment over a signal-killed update-ref child");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test("3c70i X3: over the same publication run twice (the second answers committed from the idempotent early return because the ref already holds the new snapshot, with no update-ref), the environment measured from before the module's first import stays unchanged at the import and at and after every git call",()=>{
  const directory=repository();
  try {
    const fx=xeFixture(directory),result=xeChild(fx,"repeat",[]);
    assert.deepEqual(result.outcomes.map(item=>item.kind),["published","published"],"X3 sanity: both publications answer published, got "+JSON.stringify(result.outcomes));
    assert.equal(result.thrown,null,"X3 sanity: nothing threw, got "+JSON.stringify(result.thrown));
    assert.match(result.ref??"",/^[a-f0-9]{40}$/,"X3 sanity: the publication ref holds an oid, got "+JSON.stringify(result.ref));
    assert.equal(result.snapshotId,result.ref,"X3 sanity: the second publication names the same snapshot as the ref");
    assert.equal(result.head,fx.revision,"X3 sanity: the source did not move");
    const subs=xeSubs(result),second=subs.slice(result.marks[1]);
    assert.equal(result.marks.length,2,"X3 sanity: two publication rounds, got "+JSON.stringify(result.marks));
    assert.equal(subs.filter(sub=>sub==="update-ref").length,1,"X3 sanity: one update-ref across both publications, got "+JSON.stringify(subs));
    assert.equal(second.filter(sub=>sub==="update-ref").length,0,"X3 sanity: the second publication ran no update-ref, got "+JSON.stringify(second));
    assert.ok(second.includes("hash-object"),"X3 sanity: the second publication reached commitAtomically's hash-object, got "+JSON.stringify(second));
    assert.deepEqual(xeViolations(result),[],"X3 environment over an idempotent re-publication");
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
