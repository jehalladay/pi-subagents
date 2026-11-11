import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {sdkAbortControlSupport,readSdkDeclarations,readInstalledSdkAbortSupport} from "../dist/sdk-abort-support.js";
import {runClaudeImplementation} from "../dist/claude-implement.js";

const identity={name:"@anthropic-ai/claude-agent-sdk",version:"0.3.300"};
const declared="export interface Options {\n  abortController?: AbortController;\n  cwd?: string;\n}\n";
const ok={type:"result",subtype:"success",session_id:"s-1",result:"done",num_turns:1,total_cost_usd:0.1};

test("EAT-R014: an SDK whose declarations carry options.abortController is supported and the verdict names the resolved version",()=>{
 const verdict=sdkAbortControlSupport(identity,declared);
 assert.deepEqual(verdict,{supported:true,version:"0.3.300",reason:null});
});
test("EAT-R014: a resolved version whose declarations lack the abort control is unsupported, names that version, and says why",()=>{
 const verdict=sdkAbortControlSupport({...identity,version:"0.0.1"},"export interface Options {\n  cwd?: string;\n}\n");
 assert.equal(verdict.supported,false);
 assert.equal(verdict.version,"0.0.1");
 assert.match(verdict.reason??"",/^SDK_ABORT_CONTROL_UNAVAILABLE: /);
 assert.match(verdict.reason??"",/0\.0\.1/);
});
test("EAT-R014: a mention of abortController in a comment or a different member is not a declaration",()=>{
 for(const text of ["// abortController is not supported here\nexport interface Options { cwd?: string }","export interface Options { myabortController?: boolean; abortControllerless: number }"]){
  assert.equal(sdkAbortControlSupport(identity,text).supported,false,text);
 }
});
test("EAT-R014: an absent manifest or unreadable declarations is unverified, never supported",()=>{
 const noManifest=sdkAbortControlSupport(null,declared);
 assert.equal(noManifest.supported,false);
 assert.equal(noManifest.version,null);
 assert.match(noManifest.reason??"",/^SDK_ABORT_CONTROL_UNVERIFIED: /);
 const noTypes=sdkAbortControlSupport(identity,null);
 assert.equal(noTypes.supported,false);
 assert.equal(noTypes.version,"0.3.300");
 assert.match(noTypes.reason??"",/^SDK_ABORT_CONTROL_UNVERIFIED: /);
 assert.match(noTypes.reason??"",/0\.3\.300/);
});
test("EAT-R014: readSdkDeclarations joins the bounded .d.ts files under a package directory and returns null when there are none",()=>{
 const dir=mkdtempSync(join(tmpdir(),"sdk-decl-"));
 try{
  assert.equal(readSdkDeclarations(dir),null);
  mkdirSync(join(dir,"entrypoints"));
  writeFileSync(join(dir,"sdk.d.ts"),"export * from './entrypoints/types.js';\n");
  writeFileSync(join(dir,"entrypoints","types.d.ts"),declared);
  writeFileSync(join(dir,"readme.txt"),"abortController?: not a declaration file");
  const text=readSdkDeclarations(dir);
  assert.ok(text!==null&&/abortController\?:/.test(text),"a declaration in a nested .d.ts is found");
  assert.equal(readSdkDeclarations(join(dir,"missing")),null);
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test("EAT-R014: a signal-bearing completed run records the resolved SDK version in its receipt",async()=>{
 const host=new AbortController();
 const manifest=JSON.stringify({name:"@anthropic-ai/claude-agent-sdk",version:"9.8.7"});
 const out=await runClaudeImplementation("/r","p",{signal:host.signal},async()=>({query:()=>(async function*(){yield ok})()}),async()=>manifest);
 assert.deepEqual(out.replay?.sdk,{name:"@anthropic-ai/claude-agent-sdk",version:"9.8.7"});
});
// Live case: needs the real SDK installed with the abort control declared AND credentials. Skipped, never passed, otherwise.
const live=await readInstalledSdkAbortSupport();
const liveSkip=live.supported
 ? "live SDK abort NOT RUN: abortController is declared by SDK "+live.version+" but no credential-bearing live session is wired into this suite"
 : live.reason??"SDK abort support unverified";
test("EAT-R014 live: the real SDK session stops on a host abort",{skip:liveSkip},async()=>{
 assert.fail("unreachable until a credential-bearing live session is wired");
});
test("EAT-R014 S2-D1: a colon-bearing comment, a non-Options declaration or a nested member is not the Options abortController",()=>{
 const cases=[
  "// abortController: not supported here\nexport interface Options { cwd?: string }",
  "/* abortController?: AbortController */\nexport interface Options { cwd?: string }",
  "export interface Options { /* abortController?: X */ cwd?: string }",
  "export interface Other { abortController?: AbortController }\nexport interface Options { cwd?: string }",
  "export interface Options { nested: { abortController?: AbortController } }",
 ];
 for(const text of cases) assert.equal(sdkAbortControlSupport(identity,text).supported,false,text);
 for(const text of [
  "export interface Options {\n  abortController?: AbortController;\n}",
  "export type Options = {\n  cwd?: string;\n  abortController: AbortController;\n};",
  "export interface Other { x: 1 }\nexport interface Options extends Base { cwd?: string; abortController?: AbortController }",
 ]) assert.equal(sdkAbortControlSupport(identity,text).supported,true,text);
});
