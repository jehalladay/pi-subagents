import test from "node:test";
import assert from "node:assert/strict";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderTaskContext } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";

// MechanicalWorkflows-wco80 (RFCA-MWX02-R001): receipt-safe render continuation over rf's --idempotency-key.
const root="/tmp/mw-rf";const task="Fix parser";const base="a".repeat(40);const model="claude-opus-5";
const good={schema:"reactive-fiber.cli/v1",ok:true,command:"context render",workspace:{root,id:"rfw-1"},result:{render_id:"rfr-1",workspace_id:"rfw_1",actor:"agent:camshaft-oe",output:{text:"Task: Fix parser\nSource revision: "+base+"\n",digest:"sha256:"+"b".repeat(64)},budget:{capability_snapshot:{model_id:model,verified:true},formula_terms:{available_context_tokens:512}},provenance:{graph_revision_id:"graph-1"}}};
const version={schema:"reactive-fiber.cli/v1",ok:true,command:"version",result:{version:"0.1.883",sdk_versions:{fiber_optics:"0.1.0"}}};
const replayed={...good,result:{...good.result,replay_of_operation_id:"rfo-first"}};
const ok=(doc:unknown)=>({stdout:JSON.stringify(doc),stderr:"",exitCode:0});
const lost=(reason="timeout")=>({stdout:"",stderr:"spawn lost",exitCode:1,transport:reason});
const keyOf=(argv:readonly string[])=>argv[argv.indexOf("--idempotency-key")+1];
/** An executor that records every argv and answers from a script, one entry per call. */
function scripted(...replies:ReadonlyArray<ReturnType<typeof ok>|ReturnType<typeof lost>>):{readonly exec:RfExecutor;readonly calls:string[][]}{
 const calls:string[][]=[];
 return {calls,exec:async argv=>{if(argv.includes("--version"))return ok(version);calls.push([...argv]);const r=replies[Math.min(calls.length-1,replies.length-1)];if(!r)throw new Error("no scripted reply");return r}};
}

test("(a) argv carries --idempotency-key with the supplied key; two calls with the same key send byte-identical argv",async()=>{
 const a=scripted(ok(good)),b=scripted(ok(good));
 await renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"key-1"});
 await renderTaskContext(root,task,base,model,b.exec,{idempotencyKey:"key-1"});
 assert.equal(keyOf(a.calls[0]!),"key-1");
 assert.deepEqual(a.calls[0],b.calls[0]);
 assert.ok(!a.calls[0]!.includes("--no-commit"),"a key must never ride with --no-commit (producer exit 2)");
});
test("(a) without a supplied key every call mints one nonblank key and the projection reports it",async()=>{
 const a=scripted(ok(good));
 const out=await renderTaskContext(root,task,base,model,a.exec);
 const key=keyOf(a.calls[0]!);
 assert.ok(typeof key==="string"&&key.trim()!=="");
 assert.equal(out.idempotencyKey,key);
 const b=scripted(ok(good));await renderTaskContext(root,task,base,model,b.exec);
 assert.notEqual(keyOf(b.calls[0]!),key);
});
test("a blank supplied idempotency key is RF_CONTEXT_INPUT_INVALID before rf runs",async()=>{
 const a=scripted(ok(good));
 await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"  "}),(e:unknown)=>e instanceof Error&&e.message.startsWith("RF_CONTEXT_INPUT_INVALID"));
 assert.equal(a.calls.length,0);
});
test("(b) a lost reply after a commit is re-issued under the SAME key and reports replayed with the originating operation",async()=>{
 let commits=0;const calls:string[][]=[];
 const exec:RfExecutor=async argv=>{if(argv.includes("--version"))return ok(version);calls.push([...argv]);if(calls.length===1){commits++;return lost("timeout")}return ok(replayed)};
 const out=await renderTaskContext(root,task,base,model,exec,{idempotencyKey:"key-b"});
 assert.equal(calls.length,2);assert.equal(keyOf(calls[0]!),"key-b");assert.deepEqual(calls[0],calls[1]);
 assert.equal(commits,1);
 assert.equal(out.acknowledgement,"replayed");assert.equal(out.replayOfOperationId,"rfo-first");assert.equal(out.idempotencyKey,"key-b");
 assert.equal(out.evidence?.id,"rfr-1");
});
test("(c) a re-issue answered by a fresh envelope without replay_of_operation_id reports committed",async()=>{
 const a=scripted(lost("maxBuffer"),ok(good));
 const out=await renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"key-c"});
 assert.equal(a.calls.length,2);assert.equal(out.acknowledgement,"committed");assert.equal(out.replayOfOperationId,undefined);
});
test("a first-attempt success reports committed; a host retry that rf replays reports replayed",async()=>{
 const first=await renderTaskContext(root,task,base,model,scripted(ok(good)).exec,{idempotencyKey:"k"});
 assert.equal(first.acknowledgement,"committed");
 const again=await renderTaskContext(root,task,base,model,scripted(ok(replayed)).exec,{idempotencyKey:"k"});
 assert.equal(again.acknowledgement,"replayed");assert.equal(again.replayOfOperationId,"rfo-first");
});
test("a replayed render still passes every task, revision, model and budget check",async()=>{
 const wrong={...replayed,result:{...replayed.result,budget:{capability_snapshot:{model_id:"other",verified:true},formula_terms:{available_context_tokens:512}}}};
 await assert.rejects(()=>renderTaskContext(root,task,base,model,scripted(ok(wrong)).exec,{idempotencyKey:"k"}),/RF_CONTEXT_UNESTABLISHED/);
 const stale={...replayed,result:{...replayed.result,output:{...replayed.result.output,text:"Task: Fix parser\nSource revision: "+"c".repeat(40)+"\n"}}};
 await assert.rejects(()=>renderTaskContext(root,task,base,model,scripted(ok(stale)).exec,{idempotencyKey:"k"}),/RF_CONTEXT_UNESTABLISHED/);
});
test("a transport failure that exhausts its re-issues throws RF_TRANSPORT_UNACKNOWLEDGED naming the key, never a fresh-key render",async()=>{
 const a=scripted(lost("timeout"));
 await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"key-x",maxReissues:2}),(e:unknown)=>{
  const f=e as {code?:string;idempotencyKey?:string;transport?:string;message:string};
  assert.equal(f.code,"RF_TRANSPORT_UNACKNOWLEDGED");assert.equal(f.idempotencyKey,"key-x");assert.equal(f.transport,"timeout");
  assert.ok(f.message.startsWith("RF_TRANSPORT_UNACKNOWLEDGED: "),f.message);assert.doesNotMatch(f.message,/^RF_RENDER_UNESTABLISHED/);
  return true;
 });
 assert.equal(a.calls.length,3,"one attempt plus two re-issues");
 assert.deepEqual(new Set(a.calls.map(keyOf)),new Set(["key-x"]),"(f) every call carried the one key");
});
test("maxReissues 0 surfaces the transport failure after exactly one call",async()=>{
 const a=scripted(lost("signal"));
 await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"k",maxReissues:0}),(e:unknown)=>(e as {code?:string}).code==="RF_TRANSPORT_UNACKNOWLEDGED");
 assert.equal(a.calls.length,1);
});
test("an invalid maxReissues is RF_CONTEXT_INPUT_INVALID before rf runs",async()=>{
 for(const n of [-1,1.5,Number.NaN]){
  const a=scripted(ok(good));
  await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{maxReissues:n}),(e:unknown)=>e instanceof Error&&e.message.startsWith("RF_CONTEXT_INPUT_INVALID"));
  assert.equal(a.calls.length,0);
 }
});
test("(d) a domain refusal is surfaced by its exact code with zero further executor calls",async()=>{
 const conflict={stdout:JSON.stringify({schema:"reactive-fiber.cli/v1",ok:false,diagnostics:[{code:"RF_IDEMPOTENCY_KEY_CONFLICT"}]}),stderr:"",exitCode:4};
 const a=scripted(conflict,ok(good));
 await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"k"}),(e:unknown)=>{
  const f=e as {code?:string;exitCode?:number;diagnosticCode?:string};
  return f.code==="RF_RENDER_UNESTABLISHED"&&f.exitCode===4&&f.diagnosticCode==="RF_IDEMPOTENCY_KEY_CONFLICT";
 });
 assert.equal(a.calls.length,1);
});
test("(e) an unavailable rf (executor throws RF_UNAVAILABLE) is not retried",async()=>{
 const { RfUnavailableError }=await import("../dist/rf-context.js");
 let n=0;
 await assert.rejects(()=>renderTaskContext(root,task,base,model,async()=>{n++;throw new RfUnavailableError("rf","ENOENT")},{idempotencyKey:"k"}),(e:unknown)=>(e as {code?:string}).code==="RF_UNAVAILABLE");
 assert.equal(n,1);
});
test("(f) a transport failure followed by a domain refusal on the re-issue stops there, still under the one key",async()=>{
 const refuse={stdout:JSON.stringify({schema:"reactive-fiber.cli/v1",ok:false,diagnostics:[{code:"RF_IDEMPOTENCY_KEY_CONFLICT"}]}),stderr:"",exitCode:4};
 const a=scripted(lost(),refuse,ok(good));
 await assert.rejects(()=>renderTaskContext(root,task,base,model,a.exec,{idempotencyKey:"k",maxReissues:5}),(e:unknown)=>(e as {diagnosticCode?:string}).diagnosticCode==="RF_IDEMPOTENCY_KEY_CONFLICT");
 assert.equal(a.calls.length,2);assert.deepEqual(new Set(a.calls.map(keyOf)),new Set(["k"]));
});

// The default executor classifies the real failure modes of execFile as transport: a lost reply may follow a commit.
const shimDir=mkdtempSync(join(tmpdir(),"mw-rf-cont-"));
test.after(()=>rmSync(shimDir,{recursive:true,force:true}));
/** A node-script rf shim: appends its argv to a log, then runs body; the shebang is the absolute interpreter. */
function shim(name:string,body:string):{readonly path:string;readonly log:string}{
 const path=join(shimDir,name),log=join(shimDir,name+".log");
 writeFileSync(path,["#!"+process.execPath,'if(process.argv.includes("--version")){process.stdout.write('+JSON.stringify(JSON.stringify(version))+');process.exit(0)}const fs=require("node:fs");fs.appendFileSync('+JSON.stringify(log)+',JSON.stringify(process.argv.slice(2))+"\\n");',body,""].join("\n"));
 chmodSync(path,0o755);return {path,log};
}
async function withBinary<T>(path:string,fn:()=>Promise<T>):Promise<T>{
 const saved=process.env["MECHANICAL_RF_BINARY"];process.env["MECHANICAL_RF_BINARY"]=path;
 try{return await fn()}finally{if(saved===undefined)delete process.env["MECHANICAL_RF_BINARY"];else process.env["MECHANICAL_RF_BINARY"]=saved}
}
const calls=(log:string)=>readFileSync(log,"utf8").trim().split("\n").map(l=>JSON.parse(l) as string[]);
test("a child killed by a signal is a transport failure re-issued under the same key until it answers",async()=>{
 // First call dies by SIGKILL after "committing"; second call prints the replayed envelope.
 const marker=join(shimDir,"seen-1");
 const s=shim("kill-then-replay",'if(!fs.existsSync('+JSON.stringify(marker)+')){fs.writeFileSync('+JSON.stringify(marker)+',"x");process.kill(process.pid,"SIGKILL")}else{process.stdout.write('+JSON.stringify(JSON.stringify(replayed))+')}');
 const out=await withBinary(s.path,()=>renderTaskContext(shimDir,task,base,model,undefined,{idempotencyKey:"key-real"}));
 assert.equal(out.acknowledgement,"replayed");assert.equal(out.replayOfOperationId,"rfo-first");
 const seen=calls(s.log);assert.equal(seen.length,2);assert.deepEqual(seen[0],seen[1]);assert.equal(keyOf(seen[0]!),"key-real");
});
test("a reply larger than maxBuffer is a transport failure, not a domain refusal",async()=>{
 const s=shim("flood","process.stdout.write(Buffer.alloc(9*1024*1024,97))");
 await withBinary(s.path,()=>assert.rejects(()=>renderTaskContext(shimDir,task,base,model,undefined,{idempotencyKey:"key-flood",maxReissues:0}),(e:unknown)=>{
  const f=e as {code?:string;idempotencyKey?:string;transport?:string};
  return f.code==="RF_TRANSPORT_UNACKNOWLEDGED"&&f.idempotencyKey==="key-flood"&&typeof f.transport==="string"&&f.transport!=="";
 }));
 assert.equal(calls(s.log).length,1);
});
test("a nonzero exit with a refusal envelope stays a domain refusal and is never re-issued",async()=>{
 const s=shim("refuse",'process.stdout.write('+JSON.stringify(JSON.stringify({schema:"reactive-fiber.cli/v1",ok:false,diagnostics:[{code:"RF_IDEMPOTENCY_KEY_CONFLICT"}]}))+');process.exitCode=4');
 await withBinary(s.path,()=>assert.rejects(()=>renderTaskContext(shimDir,task,base,model,undefined,{idempotencyKey:"k"}),(e:unknown)=>(e as {diagnosticCode?:string;exitCode?:number}).diagnosticCode==="RF_IDEMPOTENCY_KEY_CONFLICT"));
 assert.equal(calls(s.log).length,1);
});
