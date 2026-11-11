import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { runBoundedProcess } from "../dist/bounded-process.js";
import { assertNoExcessHandles, assertNoLeakedChildren, handleCounts, pidAlive, withoutLeakedChildren } from "./support/leak-guard.ts";

async function gone(pid:number,withinMs=3000):Promise<boolean>{
 const end=Date.now()+withinMs;
 while(Date.now()<end){if(!pidAlive(pid))return true;await new Promise(r=>setTimeout(r,25))}
 return !pidAlive(pid);
}
function scratch<T>(fn:(dir:string)=>Promise<T>):Promise<T>{const dir=mkdtempSync(join(tmpdir(),"mw-bounded-"));return fn(dir).finally(()=>rmSync(dir,{recursive:true,force:true}))}

test("the leak guard fails a test that left a fixture child unawaited, and passes once that child is reaped",async()=>{
 let fixture:ReturnType<typeof spawn>|undefined;
 await assert.rejects(()=>withoutLeakedChildren("fixture",async()=>{fixture=spawn("sleep",["30"],{stdio:"ignore"})}),/^Error: CHILD_PROCESS_LEAKED: fixture left 1 live child process handle\(s\)$/);
 assert.ok(fixture?.pid!==undefined);
 const exited=new Promise<void>(resolve=>fixture!.once("close",()=>resolve()));
 fixture.kill("SIGKILL");await exited;
 await assertNoLeakedChildren("after reap");
});

test("runBoundedProcess returns what the program printed without waiting for a grandchild that kept the pipes open, and kills that grandchild",()=>scratch(async dir=>{
 const pidFile=join(dir,"pid");const started=Date.now();
 const out=await withoutLeakedChildren("bounded",()=>runBoundedProcess("sh",["-c",'sleep 20 & echo $! > "$1"; echo hello',"sh",pidFile],{timeoutMs:15_000,maxBuffer:4096,drainGraceMs:200}));
 assert.equal(out.stdout,"hello\n");assert.ok(Date.now()-started<10_000,"returned before the grandchild's 20 s");
 assert.equal(await gone(Number(readFileSync(pidFile,"utf8").trim())),true,"grandchild reaped");
}));

test("runBoundedProcess past its time bound is PROCESS_TIMEOUT and kills the program and its grandchild",()=>scratch(async dir=>{
 const pidFile=join(dir,"pid");
 await assert.rejects(()=>runBoundedProcess("sh",["-c",'sleep 30 & echo $! > "$1"; echo $$ > "$1.leader"; sleep 30',"sh",pidFile],{timeoutMs:400,maxBuffer:4096}),/^Error: PROCESS_TIMEOUT: sh exceeded 400 ms$/);
 assert.equal(pidAlive(Number(readFileSync(pidFile+".leader","utf8").trim())),false,"leader already reaped when the promise settles");
 assert.equal(await gone(Number(readFileSync(pidFile,"utf8").trim())),true,"grandchild reaped");
 await assertNoLeakedChildren("after timeout");
}));

test("runBoundedProcess for a nonzero exit is PROCESS_EXIT_NONZERO carrying stderr",async()=>{
 await assert.rejects(()=>runBoundedProcess("sh",["-c","echo refused >&2; exit 3"],{timeoutMs:5000,maxBuffer:4096}),/^Error: PROCESS_EXIT_NONZERO: sh exited 3\nrefused\n$/);
});

test("runBoundedProcess for output past the byte bound is PROCESS_OUTPUT_LIMIT and leaves no child",async()=>{
 await withoutLeakedChildren("limit",()=>assert.rejects(()=>runBoundedProcess("sh",["-c","yes | head -c 200000"],{timeoutMs:5000,maxBuffer:1000}),/^Error: PROCESS_OUTPUT_LIMIT: sh printed more than 1000 bytes$/));
});

test("runBoundedProcess for a missing executable rejects with the spawn error and leaves no child",async()=>{
 await withoutLeakedChildren("enoent",()=>assert.rejects(()=>runBoundedProcess("mw-no-such-executable-lt2z",[],{timeoutMs:5000,maxBuffer:1024}),(e:unknown)=>(e as NodeJS.ErrnoException).code==="ENOENT"));
});

test("the handle guard names a held Timeout as HANDLE_LEAKED and passes once the timer is cleared",async()=>{
 const baseline=handleCounts();
 const held=setTimeout(()=>{},30_000);
 await assert.rejects(()=>assertNoExcessHandles("held",baseline,50),/^Error: HANDLE_LEAKED: held left 1 Timeout$/);
 clearTimeout(held);
 await assertNoExcessHandles("cleared",baseline,50);
});

test("runBoundedProcess success leaves no Timeout, PipeWrap or ProcessWrap behind once it resolves (time-bound and drain timers cleared)",async()=>{
 const baseline=handleCounts();
 const out=await runBoundedProcess("sh",["-c","echo ok"],{timeoutMs:15_000,maxBuffer:4096,drainGraceMs:3000});
 assert.equal(out.stdout,"ok\n");
 await assertNoExcessHandles("success",baseline);
});

test("runBoundedProcess PROCESS_TIMEOUT leaves no armed timer behind once it rejects (no drain timer re-armed by the killed leader's exit)",async()=>{
 const baseline=handleCounts();
 await assert.rejects(()=>runBoundedProcess("sh",["-c","sleep 30"],{timeoutMs:300,maxBuffer:4096,drainGraceMs:3000}),/^Error: PROCESS_TIMEOUT: sh exceeded 300 ms$/);
 await assertNoExcessHandles("timeout",baseline);
});

test("runBoundedProcess PROCESS_OUTPUT_LIMIT leaves no armed timer behind once it rejects (no drain timer re-armed by the killed leader's exit)",async()=>{
 const baseline=handleCounts();
 await assert.rejects(()=>runBoundedProcess("sh",["-c","yes | head -c 200000"],{timeoutMs:15_000,maxBuffer:1000,drainGraceMs:3000}),/^Error: PROCESS_OUTPUT_LIMIT: sh printed more than 1000 bytes$/);
 await assertNoExcessHandles("output-limit",baseline);
});

test("runBoundedProcess resolves past a setsid descendant that kept the pipes open and leaves no PipeWrap handle for it",()=>scratch(async dir=>{
 const pidFile=join(dir,"pid");
 const baseline=handleCounts();
 let escaped:number|undefined;
 try{
  const out=await runBoundedProcess("sh",["-c",'setsid sleep 15 & echo $! > "$1"; echo hi',"sh",pidFile],{timeoutMs:15_000,maxBuffer:4096,drainGraceMs:200});
  escaped=Number(readFileSync(pidFile,"utf8").trim());
  assert.equal(out.stdout,"hi\n");
  await assertNoExcessHandles("setsid descendant",baseline);
 }finally{
  if(escaped===undefined&&existsSync(pidFile))escaped=Number(readFileSync(pidFile,"utf8").trim());
  if(escaped!==undefined&&Number.isInteger(escaped)&&escaped>0)try{process.kill(escaped,"SIGKILL")}catch{/* already gone */}
 }
}));

test("runBoundedProcess kills a still-running program group when the parent process exits",()=>scratch(async dir=>{
 const pidFile=join(dir,"pid");const script=join(dir,"parent.mjs");
 const target=fileURLToPath(new URL("../dist/bounded-process.js",import.meta.url));
 writeFileSync(script,[
  'import { existsSync } from "node:fs";',
  'import { runBoundedProcess } from '+JSON.stringify(target)+';',
  'const pidFile=process.argv[2];',
  'runBoundedProcess("sh",["-c","echo $$ > \\"$1\\"; exec sleep 30","sh",pidFile],{timeoutMs:60000,maxBuffer:4096}).catch(()=>{});',
  'const poll=setInterval(()=>{if(existsSync(pidFile)){clearInterval(poll);setTimeout(()=>process.exit(0),100)}},20);',
 ].join("\n"));
 let leader:number|undefined;
 try{
  await new Promise<void>((resolve,reject)=>{
   const parent=spawn(process.execPath,[script,pidFile],{stdio:"ignore"});
   parent.on("error",reject);parent.on("close",code=>code===0?resolve():reject(new Error("parent exited "+String(code))));
  });
  leader=Number(readFileSync(pidFile,"utf8").trim());
  assert.ok(Number.isInteger(leader)&&leader>0,"leader pid recorded");
  assert.equal(await gone(leader),true,"leader killed by the parent's exit hook");
 }finally{
  if(leader!==undefined&&pidAlive(leader))try{process.kill(-leader,"SIGKILL")}catch{/* already gone */}
 }
}));

test("runBoundedProcess counts the output bound in UTF-8 bytes, not UTF-16 code units",async()=>{
 await withoutLeakedChildren("utf8-bound",()=>assert.rejects(()=>runBoundedProcess(process.execPath,["-e",'process.stdout.write("\\u20ac".repeat(200))'],{timeoutMs:5000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: .* printed more than 300 bytes$/));
});

test("runBoundedProcess output bound is exclusive: a program printing exactly maxBuffer bytes resolves",async()=>{
 const out=await withoutLeakedChildren("exact-bound",()=>runBoundedProcess("sh",["-c","printf '%0300d' 0"],{timeoutMs:10_000,maxBuffer:300}));
 assert.equal(out.stdout.length,300);assert.equal(out.stdout,"0".repeat(300));
});

test("runBoundedProcess output bound is exclusive from above: maxBuffer plus one byte rejects",async()=>{
 await withoutLeakedChildren("over-bound-by-one",()=>assert.rejects(()=>runBoundedProcess("sh",["-c","printf '%0301d' 0"],{timeoutMs:10_000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: sh printed more than 300 bytes$/));
});

test("runBoundedProcess rejects 301 UTF-8 bytes against maxBuffer 300 although the UTF-16 length is only 101",async()=>{
 await withoutLeakedChildren("over-bound-utf8",()=>assert.rejects(()=>runBoundedProcess(process.execPath,["-e",'process.stdout.write("\\u20ac".repeat(100)+"a")'],{timeoutMs:10_000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: .* printed more than 300 bytes$/));
});

test("runBoundedProcess counts stderr toward the output bound: 301 bytes on stderr alone against maxBuffer 300 rejects",async()=>{
 await withoutLeakedChildren("over-bound-stderr",()=>assert.rejects(()=>runBoundedProcess("sh",["-c","printf '%0301d' 0 >&2"],{timeoutMs:10_000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: sh printed more than 300 bytes$/));
});

test("runBoundedProcess shares one output bound across both pipes: 200 bytes on stdout plus 200 on stderr against maxBuffer 300 rejects",async()=>{
 await withoutLeakedChildren("over-bound-both-pipes",()=>assert.rejects(()=>runBoundedProcess("sh",["-c","printf '%0200d' 0; printf '%0200d' 0 >&2"],{timeoutMs:10_000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: sh printed more than 300 bytes$/));
});

test("runBoundedProcess output bound is exclusive on stderr too: a program printing exactly maxBuffer bytes on stderr resolves",async()=>{
 const out=await withoutLeakedChildren("exact-bound-stderr",()=>runBoundedProcess("sh",["-c","printf '%0300d' 0 >&2"],{timeoutMs:10_000,maxBuffer:300}));
 assert.equal(out.stdout,"");assert.equal(out.stderr,"0".repeat(300));
});

test("runBoundedProcess counts stderr in UTF-8 bytes, not UTF-16 code units: 301 UTF-8 bytes on stderr against maxBuffer 300 rejects",async()=>{
 await withoutLeakedChildren("over-bound-utf8-stderr",()=>assert.rejects(()=>runBoundedProcess(process.execPath,["-e",'process.stderr.write("\\u20ac".repeat(100)+"a")'],{timeoutMs:10_000,maxBuffer:300}),/^Error: PROCESS_OUTPUT_LIMIT: .* printed more than 300 bytes$/));
});

test("runBoundedProcess resolves when the two pipes sum to exactly maxBuffer: 150 bytes on stdout plus 150 on stderr against maxBuffer 300",async()=>{
 const out=await withoutLeakedChildren("exact-bound-both-pipes",()=>runBoundedProcess("sh",["-c","printf '%0150d' 0; printf '%0150d' 0 >&2"],{timeoutMs:10_000,maxBuffer:300}));
 assert.equal(out.stdout,"0".repeat(150));assert.equal(out.stderr,"0".repeat(150));
});

test("runBoundedProcess settles on the close event as soon as the pipes close, well inside the drain grace",async()=>{
 const started=Date.now();
 const out=await runBoundedProcess("sh",["-c","echo ok"],{timeoutMs:15_000,maxBuffer:4096,drainGraceMs:8000});
 const settledMs=Date.now()-started;
 assert.equal(out.stdout,"ok\n");
 assert.ok(settledMs<4000,"settled in "+String(settledMs)+" ms, expected under 4000 ms against an 8000 ms drain grace");
});
