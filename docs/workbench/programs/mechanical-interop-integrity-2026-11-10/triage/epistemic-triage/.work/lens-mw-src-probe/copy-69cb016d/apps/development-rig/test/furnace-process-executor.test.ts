import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { executeProcessContext, parseExecutionContext, readStdinText, STDIN_EAGAIN_RETRIES } from "../dist/furnace-process-executor.js";
import type { ProcessExecutorServices } from "../dist/furnace-process-executor.js";
import type { GateObservation } from "../dist/live-gate.js";
import type { LiveDevelopmentResult } from "../dist/live-development.js";
import { receiptOf } from "../dist/receipt.js";

const basis={commit:"a".repeat(40),tree:"b".repeat(40),clean:true as const};
const passed:GateObservation={kind:"passed",reason:"FORGE_GATE_PASS",basis,operationId:"op-"+"1".repeat(32),native:{},binding:{commit:"descriptor",gateDefinition:"descriptor",environment:"descriptor"}};
const failed:GateObservation={kind:"failed",reason:"FORGE_GATE_FAIL",basis,operationId:"op-"+"2".repeat(32),native:{},binding:{commit:"descriptor",gateDefinition:"descriptor",environment:"descriptor"}};
const indeterminate:GateObservation={kind:"indeterminate",reason:"FORGE_OPERATION_CANCELLED",basis,operationId:"op-"+"3".repeat(32),native:{},binding:{commit:"descriptor",gateDefinition:"descriptor",environment:"descriptor"}};
function context(title:string|null,description:string|null=null,attemptId="frn-atm-mw-gate-1"):string{
 return JSON.stringify({run:{furnace_run_id:"frn-run-mw-wisp-x",beads_run_id:"mw-wisp-x",formula:"mw-gate"},work:{beads_work_id:"mw-wisp-x.1",title,description,acceptance_criteria:null},attempt:{attempt_id:attemptId,ordinal:1},workspace:{root:"/tmp/mw-pkg"}});
}
function services(gate:GateObservation,develop?:LiveDevelopmentResult):ProcessExecutorServices&{calls:string[]}{
 const calls:string[]=[];
 return{calls,
  gate:async root=>{calls.push("gate:"+root);return gate},
  develop:async(root,task)=>{calls.push("develop:"+root+":"+task);if(!develop)throw new Error("unexpected develop");return develop}};
}
async function withDir<T>(fn:(dir:string)=>Promise<T>):Promise<T>{const dir=mkdtempSync(join(tmpdir(),"mw-furnace-exec-"));try{return await fn(dir)}finally{rmSync(dir,{recursive:true,force:true})}}

test("context parsing refuses a missing attempt id, a non-object, and a non-string workspace root before any effect",()=>{
 assert.throws(()=>parseExecutionContext("[]"),/FURNACE_CONTEXT_INVALID/);
 assert.throws(()=>parseExecutionContext(context("[gate] x",null,"")),/FURNACE_CONTEXT_INVALID: attempt\.attempt_id/);
 assert.throws(()=>parseExecutionContext(JSON.stringify({run:{furnace_run_id:"frn-run-x",beads_run_id:null,formula:null},work:{beads_work_id:"w",title:null,description:null,acceptance_criteria:null},attempt:{attempt_id:"a",ordinal:1},workspace:{root:7}})),/FURNACE_CONTEXT_INVALID: workspace\.root/);
 const ctx=parseExecutionContext(context("[gate] verify"));
 assert.equal(ctx.attempt.attempt_id,"frn-atm-mw-gate-1");assert.equal(ctx.workspace.root,"/tmp/mw-pkg");
});
test("[gate] PASS exits 0 and the receipt carries the Forge operation id as the only success basis",()=>withDir(async dir=>{
 const s=services(passed);
 const out=await executeProcessContext(context("[gate] verify the package"),s,{receiptsDir:dir});
 assert.equal(out.exitCode,0);assert.deepEqual(s.calls,["gate:/tmp/mw-pkg"]);
 assert.equal(out.receipt.executorVerdict,"success");assert.equal(out.receipt.forge?.kind,"passed");assert.equal(out.receipt.forge?.operationId,passed.operationId);
 assert.equal(out.receipt.furnace.attemptId,"frn-atm-mw-gate-1");assert.equal(out.receipt.furnace.workId,"mw-wisp-x.1");
 const written=JSON.parse(readFileSync(join(dir,"frn-atm-mw-gate-1.json"),"utf8")) as typeof out.receipt;
 assert.deepEqual(written,out.receipt);
}));
test("[gate] FAIL and indeterminate never exit 0 and keep the Forge distinction in the receipt",()=>withDir(async dir=>{
 const f=await executeProcessContext(context("[gate] verify"),services(failed),{receiptsDir:dir});
 assert.equal(f.exitCode,1);assert.equal(f.receipt.executorVerdict,"work_failure");assert.equal(f.receipt.forge?.kind,"failed");assert.equal(f.receipt.forge?.operationId,failed.operationId);
 const i=await executeProcessContext(context("[gate] verify"),services(indeterminate),{receiptsDir:dir});
 assert.equal(i.exitCode,3);assert.equal(i.receipt.executorVerdict,"work_failure");assert.equal(i.receipt.forge?.kind,"indeterminate");assert.equal(i.receipt.forge?.operationId,indeterminate.operationId);
}));
test("an unknown or missing tag refuses with exit 66 and runs nothing",()=>withDir(async dir=>{
 for(const title of ["[deploy] ship it","verify",null]){
  const s=services(passed);
  const out=await executeProcessContext(context(title),s,{receiptsDir:dir});
  assert.equal(out.exitCode,66);assert.equal(out.receipt.executorVerdict,"refused");assert.deepEqual(s.calls,[]);assert.equal(out.receipt.forge,null);
 }
}));
test("[develop] needs a task in the Work description and maps the same develop outcome kinds as the local CLI",()=>withDir(async dir=>{
 const verified:LiveDevelopmentResult={mode:"live-claude-forge",discovery:"git-tracked-files",context:"plain-task-context",workflow:{kind:"verified_candidate",candidate:{parentBasis:{workspaceId:"/tmp/mw-pkg",revision:"a".repeat(40)},basis:{workspaceId:"/tmp/mw-pkg",revision:"c".repeat(40)}},verification:{basis:{workspaceId:"/tmp/mw-pkg",revision:"c".repeat(40)},verdict:"passed",evidence:{system:"forge",kind:"operation",id:passed.operationId??""}}},agent:null,forge:{...passed,basis:{...basis,commit:"c".repeat(40)}},gateManifestSha256:"f".repeat(64)};
 const empty=services(passed,verified);
 const refused=await executeProcessContext(context("[develop] implement",""),empty,{receiptsDir:dir});
 assert.equal(refused.exitCode,66);assert.deepEqual(empty.calls,[]);
 const s=services(passed,verified);
 const ok=await executeProcessContext(context("[develop] implement","Add a slugify helper"),s,{receiptsDir:dir});
 assert.equal(ok.exitCode,0);assert.deepEqual(s.calls,["develop:/tmp/mw-pkg:Add a slugify helper"]);
 assert.equal(ok.receipt.development?.stages.verification.state,"established");assert.equal(ok.receipt.forge,null);
 const failedDev:LiveDevelopmentResult={...verified,workflow:{kind:"verification_failed",candidate:verified.workflow.kind==="verified_candidate"?verified.workflow.candidate:undefined as never,verification:{basis:{workspaceId:"/tmp/mw-pkg",revision:"c".repeat(40)},verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-"+"5".repeat(32)}}} as LiveDevelopmentResult["workflow"]};
 const bad=await executeProcessContext(context("[develop] implement","Add a helper"),services(passed,failedDev),{receiptsDir:dir});
 assert.equal(bad.exitCode,1);assert.equal(bad.receipt.executorVerdict,"work_failure");
}));
test("[develop] needs_evidence and indeterminate outcomes exit 3 as work_failure with a development receipt and no Forge gate",()=>withDir(async dir=>{
 const workflows:{name:string;workflow:LiveDevelopmentResult["workflow"];outcome:string}[]=[
  {name:"needs_evidence",outcome:"needs_evidence",workflow:{kind:"needs_evidence",reason:"SCOPE_INCOMPLETE",scope:{basis:{workspaceId:"/tmp/mw-pkg",revision:"a".repeat(40)},coverage:"partial",files:[]}}},
  {name:"indeterminate",outcome:"indeterminate",workflow:{kind:"indeterminate",reason:"AGENT_STOPPED"}},
 ];
 for(const {name,workflow,outcome} of workflows){
  const result:LiveDevelopmentResult={mode:"live-claude-forge",discovery:"git-tracked-files",context:"plain-task-context",workflow,agent:null,forge:null,gateManifestSha256:"f".repeat(64)};
  const s=services(passed,result);
  const attemptId="frn-atm-mw-develop-"+name;
  const out=await executeProcessContext(context("[develop] implement","Add a slugify helper",attemptId),s,{receiptsDir:dir});
  assert.equal(out.exitCode,3,name);assert.equal(out.receipt.executorVerdict,"work_failure",name);
  assert.deepEqual(s.calls,["develop:/tmp/mw-pkg:Add a slugify helper"],name);
  assert.equal(out.receipt.forge,null,name);assert.equal(out.receipt.error,undefined,name);
  assert.equal(out.receipt.development?.outcome,outcome,name);assert.deepEqual(out.receipt.development,receiptOf(result),name);
  const written=JSON.parse(readFileSync(join(dir,attemptId+".json"),"utf8")) as typeof out.receipt;
  assert.deepEqual(written,out.receipt,name);
 }
}));
test("a thrown service never becomes success: exit 70 with the error recorded",()=>withDir(async dir=>{
 const out=await executeProcessContext(context("[gate] verify"),{gate:async()=>{throw new Error("FORGE_SDK_NOT_INSTALLED: boom")},develop:async()=>{throw new Error("no")}},{receiptsDir:dir});
 assert.equal(out.exitCode,70);assert.equal(out.receipt.executorVerdict,"work_failure");assert.match(out.receipt.error??"",/FORGE_SDK_NOT_INSTALLED/);assert.equal(out.receipt.forge,null);
 assert.ok(existsSync(join(dir,"frn-atm-mw-gate-1.json")));
}));
test("the executable refuses argv, a terminal stdin and malformed JSON with exit 64 before loading any SDK",()=>{
 const entry=join(import.meta.dirname,"../dist/furnace-process-executor.js");
 const argv=spawnSync(process.execPath,[entry,"--executor-program"],{input:context("[gate] x"),encoding:"utf8"});
 assert.equal(argv.status,64,argv.stderr);
 const malformed=spawnSync(process.execPath,[entry],{input:"{not json",encoding:"utf8"});
 assert.equal(malformed.status,64,malformed.stderr);assert.match(malformed.stderr,/FURNACE_CONTEXT_INVALID/);
 const empty=spawnSync(process.execPath,[entry],{input:"",encoding:"utf8"});
 assert.equal(empty.status,64,empty.stderr);assert.match(empty.stderr,/^FURNACE_CONTEXT_INVALID: empty stdin$/m);
 for(const blank of [" ","\n","  \t\r\n ","\v","\f","\u00a0","\ufeff","\u2028","\u3000"," \v\f\u00a0\ufeff\u2028\u3000 "]){
  const ws=spawnSync(process.execPath,[entry],{input:blank,encoding:"utf8"});
  assert.equal(ws.status,64,JSON.stringify(blank)+": "+ws.stderr);assert.match(ws.stderr,/^FURNACE_CONTEXT_INVALID: empty stdin$/m,"whitespace-only stdin is the empty-stdin refusal: "+JSON.stringify(blank));
  assert.equal(ws.stdout,"",JSON.stringify(blank)+" writes nothing to stdout");
 }
});

function scratchContext(root:string,title:string|null,attemptId:string):string{
 return JSON.stringify({run:{furnace_run_id:"frn-run-mw-wisp-x",beads_run_id:"mw-wisp-x",formula:"mw-gate"},work:{beads_work_id:"mw-wisp-x.1",title,description:null,acceptance_criteria:null},attempt:{attempt_id:attemptId,ordinal:1},workspace:{root}});
}
function spawnMain(input:string,env:NodeJS.ProcessEnv){
 const entry=join(import.meta.dirname,"../dist/furnace-process-executor.js");
 return spawnSync(process.execPath,[entry],{input,encoding:"utf8",env});
}
test("main() honors MW_FURNACE_RECEIPTS, writes the refused receipt there, and names the offending title in the refusal",()=>{
 const root=mkdtempSync(join(tmpdir(),"mw-furnace-exec-main-env-"));
 try{
  const receipts=join(root,"custom-receipts");const attemptId="frn-atm-main-env-1";
  const out=spawnMain(scratchContext(root,"verify only",attemptId),{...process.env,MW_FURNACE_RECEIPTS:receipts});
  assert.equal(out.status,66,out.stderr);
  const file=join(receipts,attemptId+".json");assert.ok(existsSync(file),"receipt lands in the env-named directory");
  const receipt=JSON.parse(readFileSync(file,"utf8")) as {executorVerdict:string;forge:unknown;development:unknown;error:string};
  assert.equal(receipt.executorVerdict,"refused");assert.equal(receipt.forge,null);assert.equal(receipt.development,null);
  assert.match(receipt.error,/^FURNACE_WORK_TAG_REFUSED/);assert.ok(receipt.error.includes(JSON.stringify("verify only")),receipt.error);
  assert.equal(existsSync(join(root,".furnace")),false,"the default directory is not created when the override is set");
 }finally{rmSync(root,{recursive:true,force:true})}
});
test("main() prints exactly the receipt it wrote as one JSON line on stdout",()=>{
 const root=mkdtempSync(join(tmpdir(),"mw-furnace-exec-main-out-"));
 try{
  const receipts=join(root,"custom-receipts");const attemptId="frn-atm-main-out-1";
  const out=spawnMain(scratchContext(root,"verify only",attemptId),{...process.env,MW_FURNACE_RECEIPTS:receipts});
  assert.equal(out.status,66,out.stderr);
  assert.ok(out.stdout.endsWith("\n"));assert.equal(out.stdout.trim().split("\n").length,1);
  assert.deepEqual(JSON.parse(out.stdout),JSON.parse(readFileSync(join(receipts,attemptId+".json"),"utf8")));
 }finally{rmSync(root,{recursive:true,force:true})}
});
test("main() without MW_FURNACE_RECEIPTS writes the receipt under <workspace root>/.furnace/mw-receipts",()=>{
 const root=mkdtempSync(join(tmpdir(),"mw-furnace-exec-main-default-"));
 try{
  const attemptId="frn-atm-main-default-1";
  const env={...process.env};delete env["MW_FURNACE_RECEIPTS"];
  const out=spawnMain(scratchContext(root,"verify only",attemptId),env);
  assert.equal(out.status,66,out.stderr);
  assert.ok(existsSync(join(root,".furnace","mw-receipts",attemptId+".json")),"default receipt location");
 }finally{rmSync(root,{recursive:true,force:true})}
});
test("executeProcessContext without options writes the receipt under <workspace root>/.furnace/mw-receipts",async()=>{
 const root=mkdtempSync(join(tmpdir(),"mw-furnace-exec-default-"));
 try{
  const attemptId="frn-atm-export-default-1";const s=services(passed);
  const out=await executeProcessContext(scratchContext(root,"verify only",attemptId),s);
  assert.equal(out.exitCode,66);assert.deepEqual(s.calls,[]);
  const file=join(root,".furnace","mw-receipts",attemptId+".json");assert.ok(existsSync(file),"default receipt location");
  assert.deepEqual(JSON.parse(readFileSync(file,"utf8")),out.receipt);
 }finally{rmSync(root,{recursive:true,force:true})}
});
test("[develop] with an empty or null Work description refuses as FURNACE_WORK_TASK_MISSING with exit 66 and no effect",()=>withDir(async dir=>{
 for(const description of ["","   ",null]){
  const s=services(passed);
  const out=await executeProcessContext(context("[develop] implement",description),s,{receiptsDir:dir});
  assert.equal(out.exitCode,66,String(description));assert.equal(out.receipt.executorVerdict,"refused",String(description));
  assert.ok(out.receipt.error?.startsWith("FURNACE_WORK_TASK_MISSING: "),String(description)+" -> "+out.receipt.error);
  assert.deepEqual(s.calls,[],String(description));
 }
}));
test("the executable names FURNACE_EXECUTOR_ARGV_REFUSED with the offending argv on stderr and writes nothing to stdout",()=>{
 const entry=join(import.meta.dirname,"../dist/furnace-process-executor.js");
 const p=spawnSync(process.execPath,[entry,"--executor-program","extra"],{input:context("[gate] x"),encoding:"utf8"});
 assert.equal(p.status,64,p.stderr);assert.equal(p.stdout,"");
 assert.ok(p.stderr.startsWith("FURNACE_EXECUTOR_ARGV_REFUSED: --executor-program extra"),p.stderr);
});

function stdinFake(steps:ReadonlyArray<Buffer|string>){
 let i=0;const sleeps:number[]=[];
 return{sleeps,
  readSync:(_fd:number,buf:Buffer)=>{
   const step=steps[i++];
   if(step===undefined)return 0;
   if(typeof step==="string"){throw Object.assign(new Error(step+": simulated"),{code:step})}
   step.copy(buf);return step.length;
  },
  sleep:(ms:number)=>{sleeps.push(ms)}};
}
test("readStdinText retries a transient EAGAIN and keeps the bytes read before and after it",()=>{
 const f=stdinFake([Buffer.from('{"a":'),"EAGAIN","EAGAIN",Buffer.from("1}")]);
 assert.equal(readStdinText(f),'{"a":1}');
 assert.equal(f.sleeps.length,2,"one bounded wait per EAGAIN");
});
test("readStdinText keeps multibyte characters whole across read boundaries",()=>{
 const bytes=Buffer.from("{\"t\":\"é\"}");const cut=bytes.indexOf(0xc3)+1;
 const f=stdinFake([bytes.subarray(0,cut),bytes.subarray(cut)]);
 assert.equal(readStdinText(f),"{\"t\":\"é\"}");
});
test("readStdinText treats EOF as the end of input and the zero-byte read as an empty string",()=>{
 assert.equal(readStdinText(stdinFake(["EOF"])),"");
 assert.equal(readStdinText(stdinFake([])),"");
});
test("readStdinText gives up on a stuck EAGAIN with a named error instead of an empty context",()=>{
 const steps=Array.from({length:STDIN_EAGAIN_RETRIES+1},()=>"EAGAIN");
 assert.throws(()=>readStdinText(stdinFake(steps)),/FURNACE_CONTEXT_INVALID: stdin read stayed EAGAIN/);
});
test("readStdinText waits about 10 s in total before giving up on a stuck EAGAIN",()=>{
 const f=stdinFake(Array.from({length:5000},()=>"EAGAIN"));
 assert.throws(()=>readStdinText(f),/FURNACE_CONTEXT_INVALID: stdin read stayed EAGAIN/,"the fake ends in the named refusal, never an empty read");
 const total=f.sleeps.reduce((sum,ms)=>sum+ms,0);
 assert.ok(f.sleeps.length>0&&f.sleeps.every(ms=>ms>0),"every wait is a positive step");
 assert.ok(total>=10000,"the documented bound of about 10 s must hold from below: "+total+" ms");
 assert.ok(total<=11000,"the documented bound of about 10 s must hold from above: "+total+" ms");
});
test("readStdinText never maps a read error to the empty-stdin refusal",()=>{
 assert.throws(()=>readStdinText(stdinFake(["EIO"])),(error:Error)=>/FURNACE_CONTEXT_INVALID: stdin read failed \(EIO\)/.test(error.message)&&!/empty stdin/.test(error.message));
});
test("main() reads a context that arrives on the pipe after the child started reading, never the empty-stdin refusal",async()=>{
 const root=mkdtempSync(join(tmpdir(),"mw-furnace-exec-main-late-"));
 try{
  const receipts=join(root,"custom-receipts");const attemptId="frn-atm-main-late-1";
  const entry=join(import.meta.dirname,"../dist/furnace-process-executor.js");
  const child=spawn(process.execPath,[entry],{env:{...process.env,MW_FURNACE_RECEIPTS:receipts},stdio:["pipe","pipe","pipe"]});
  let stdout="",stderr="";child.stdout.setEncoding("utf8").on("data",d=>{stdout+=d});child.stderr.setEncoding("utf8").on("data",d=>{stderr+=d});
  const body=scratchContext(root,"verify only",attemptId);const half=Math.floor(body.length/2);
  child.stdin.on("error",()=>{});const killer=setTimeout(()=>child.kill("SIGKILL"),20000);
  const closed=new Promise<number|null>(r=>child.on("close",r));
  child.stdin.write(body.slice(0,half));
  await new Promise(r=>setTimeout(r,300));
  child.stdin.end(body.slice(half));
  const status=await closed;clearTimeout(killer);
  assert.equal(status,66,stderr);assert.doesNotMatch(stderr,/empty stdin/);
  assert.deepEqual(JSON.parse(stdout),JSON.parse(readFileSync(join(receipts,attemptId+".json"),"utf8")));
 }finally{rmSync(root,{recursive:true,force:true})}
});
