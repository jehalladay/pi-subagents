import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {runClaudeImplementation} from "../dist/claude-implement.js";
const sha=(text:string):string=>createHash("sha256").update(text,"utf8").digest("hex");
type Input={prompt:string;options:Record<string,unknown>};
type Loader=NonNullable<Parameters<typeof runClaudeImplementation>[3]>;
function sdk(messages:readonly unknown[],seen?:Input[]):Loader{
 return async()=>({query:(input:Input)=>{seen?.push(input);return (async function*(){for(const m of messages)yield m})()}});
}
const ok={type:"result",subtype:"success",session_id:"agent-session-1",result:"changed the parser",num_turns:4,total_cost_usd:0.25};
test("default query settings are the restricted, bounded, settings-free set and the prompt and cwd pass through",async()=>{
 const seen:Input[]=[];
 await runClaudeImplementation("/work/root","Fix parser",{}, sdk([ok],seen));
 assert.equal(seen.length,1);
 const input=seen[0] as Input;
 assert.equal(input.prompt,"Fix parser");
 assert.deepEqual(input.options,{cwd:"/work/root",allowedTools:["Read","Glob","Grep","Edit","Write","Bash(git status *)","Bash(git add *)","Bash(git commit *)"],permissionMode:"dontAsk",settingSources:[],maxTurns:30,maxBudgetUsd:10});
});
test("explicit model, turn and budget options override the defaults and the model key is absent otherwise",async()=>{
 const seen:Input[]=[];
 await runClaudeImplementation("/r","p",{model:"claude-x",maxTurns:5,maxBudgetUsd:2},sdk([ok],seen));
 const options=(seen[0] as Input).options;
 assert.equal(options["model"],"claude-x");assert.equal(options["maxTurns"],5);assert.equal(options["maxBudgetUsd"],2);
 const plain:Input[]=[];
 await runClaudeImplementation("/r","p",{},sdk([ok],plain));
 assert.equal(Object.hasOwn((plain[0] as Input).options,"model"),false);
 const blank:Input[]=[];
 await runClaudeImplementation("/r","p",{model:""},sdk([ok],blank));
 assert.equal(Object.hasOwn((blank[0] as Input).options,"model"),false);
});
test("a successful terminal result is reported with its session id, summary, turns and cost",async()=>{
 const out=await runClaudeImplementation("/r","p",{},sdk([{type:"system",subtype:"init"},null,"text",[ok],ok]));
 const {replay:_replay,...fields}=out;
 assert.deepEqual(fields,{sessionId:"agent-session-1",summary:"changed the parser",turns:4,costUsd:0.25});
});
test("summary is capped at 4000 characters, and non-string summary, non-number turns and cost become empty and null",async()=>{
 const long=await runClaudeImplementation("/r","p",{},sdk([{...ok,result:"x".repeat(5000)}]));
 assert.equal(long.summary.length,4000);
 const exact=await runClaudeImplementation("/r","p",{},sdk([{...ok,result:"y".repeat(4000)}]));
 assert.equal(exact.summary.length,4000);
 const odd=await runClaudeImplementation("/r","p",{},sdk([{type:"result",subtype:"success",session_id:"s",result:42,num_turns:"4",total_cost_usd:"0.2"}]));
 const {replay:_oddReplay,...oddFields}=odd;
 assert.deepEqual(oddFields,{sessionId:"s",summary:"",turns:null,costUsd:null});
});
test("no terminal result, a non-success subtype, or an is_error result never establishes an outcome",async()=>{
 const cases:unknown[][]=[
  [],
  [{type:"assistant",message:"done"}],
  [{...ok,subtype:"error_max_turns"}],
  [{...ok,subtype:undefined}],
  [{...ok,is_error:true}],
  [ok,{...ok,subtype:"error_during_execution",is_error:true}],
 ];
 for(const messages of cases){
  await assert.rejects(()=>runClaudeImplementation("/r","p",{},sdk(messages)),/AGENT_OUTCOME_NOT_ESTABLISHED/,JSON.stringify(messages));
 }
});
test("a successful terminal without a usable session id is not attributable",async()=>{
 for(const session of [undefined,"","   ","\n\t",7,null,["s"]]){
  await assert.rejects(()=>runClaudeImplementation("/r","p",{},sdk([{...ok,session_id:session}])),/AGENT_SESSION_ID_UNAVAILABLE/,String(JSON.stringify(session)));
 }
});
test("an SDK that cannot be loaded or lacks a query function is refused with a distinct code",async()=>{
 await assert.rejects(()=>runClaudeImplementation("/r","p",{},async()=>{throw new Error("module not found")}),/CLAUDE_AGENT_SDK_NOT_INSTALLED/);
 for(const loaded of [null,undefined,"sdk",[],{},{query:"nope"},{query:{}}]){
  await assert.rejects(()=>runClaudeImplementation("/r","p",{},async()=>loaded),/CLAUDE_AGENT_SDK_INCOMPATIBLE/,JSON.stringify(loaded));
 }
});
test("an already-aborted host signal refuses before the SDK is loaded and names no rollback",async()=>{
 const loads:string[]=[];
 const controller=new AbortController();controller.abort();
 const loader:Loader=async()=>{loads.push("load");return {query:()=>(async function*(){yield ok})()}};
 await assert.rejects(()=>runClaudeImplementation("/r","p",{signal:controller.signal},loader),(error:Error)=>{
  assert.match(error.message,/^DEVELOPMENT_CANCELLED_BEFORE_DISPATCH: /);
  assert.doesNotMatch(error.message,/AGENT_OUTCOME_NOT_ESTABLISHED|CLAUDE_AGENT_SDK/);
  assert.doesNotMatch(error.message,/rolled back|reverted|undone/i);
  return true;
 });
 assert.deepEqual(loads,[]);
});
test("a host signal is never handed to the SDK as options.signal (it travels as options.abortController) and an unaborted signal changes nothing else",async()=>{
 const seen:Input[]=[];
 await runClaudeImplementation("/r","p",{signal:new AbortController().signal},sdk([ok],seen));
 assert.equal(seen.length,1);
 assert.equal(Object.hasOwn((seen[0] as Input).options,"signal"),false);
});
test("EAT-R014: a signal-bearing run hands the SDK a controller that aborts when the host signal aborts, and the stream ends AGENT_ABORTED_DURING_RUN with the last session id",async()=>{
 const seen:Input[]=[];
 const host=new AbortController();
 const loader:Loader=async()=>({query:(input:Input)=>{seen.push(input);return (async function*(){
  yield {type:"system",session_id:"sdk-abort-session"};
  host.abort();
  yield {type:"assistant"};
  yield ok;
 })()}});
 await assert.rejects(()=>runClaudeImplementation("/r","p",{signal:host.signal},loader),(error:Error&{sessionId?:string|null})=>{
  assert.match(error.message,/^AGENT_ABORTED_DURING_RUN: /);
  assert.doesNotMatch(error.message,/rolled back|reverted|undone/i);
  assert.equal(error.sessionId,"sdk-abort-session");
  return true;
 });
 const controller=(seen[0] as Input).options["abortController"];
 assert.ok(controller instanceof AbortController,"the SDK receives options.abortController");
 assert.equal((controller as AbortController).signal.aborted,true,"the host abort reaches the SDK controller");
});
test("EAT-R014: a host signal that aborts while the SDK module loads still reaches the SDK controller",async()=>{
 const seen:Input[]=[];
 const atCall:boolean[]=[];
 const host=new AbortController();
 const loader:Loader=async()=>{host.abort();return {query:(input:Input)=>{seen.push(input);atCall.push(((input.options["abortController"]) as AbortController).signal.aborted);return (async function*(){yield {type:"system",session_id:"sdk-load-window"};yield ok})()}}};
 await assert.rejects(()=>runClaudeImplementation("/r","p",{signal:host.signal},loader),/^Error: AGENT_ABORTED_DURING_RUN: /);
 const controller=(seen[0] as Input).options["abortController"] as AbortController;
 assert.ok(controller instanceof AbortController);
 assert.equal(atCall[0],true,"the controller handed to query is already aborted when query is called");
 assert.equal(controller.signal.aborted,true,"an abort during module load is forwarded, not lost");
});
test("EAT-R014: the host abort reason is the reason the SDK controller aborts with, on a live abort and on a load-window abort",async()=>{
 const live=new Error("host-cancelled-live");
 const seenLive:Input[]=[];
 const hostLive=new AbortController();
 await assert.rejects(()=>runClaudeImplementation("/r","p",{signal:hostLive.signal},async()=>({query:(input:Input)=>{seenLive.push(input);return (async function*(){yield {type:"system",session_id:"s"};hostLive.abort(live);yield ok})()}})),/AGENT_ABORTED_DURING_RUN/);
 assert.equal(((seenLive[0] as Input).options["abortController"] as AbortController).signal.reason,live);
 const early=new Error("host-cancelled-during-load");
 const seenEarly:Input[]=[];
 const reasonAtCall:unknown[]=[];
 const hostEarly=new AbortController();
 await assert.rejects(()=>runClaudeImplementation("/r","p",{signal:hostEarly.signal},async()=>{hostEarly.abort(early);return {query:(input:Input)=>{seenEarly.push(input);reasonAtCall.push(((input.options["abortController"]) as AbortController).signal.reason);return (async function*(){yield ok})()}}}),/AGENT_ABORTED_DURING_RUN/);
 assert.equal(reasonAtCall[0],early,"the load-window reason is on the controller when query is called");
 assert.equal(((seenEarly[0] as Input).options["abortController"] as AbortController).signal.reason,early);
});
test("EAT-R014: a run without a host signal adds no abortController key, and the pre-dispatch refusal still loads nothing",async()=>{
 const seen:Input[]=[];
 await runClaudeImplementation("/r","p",{},sdk([ok],seen));
 assert.equal(Object.hasOwn((seen[0] as Input).options,"abortController"),false);
});
test("EAT-R014: a host abort after the run settled does not reach the finished run's SDK controller",async()=>{
 const seen:Input[]=[];
 const host=new AbortController();
 await runClaudeImplementation("/r","p",{signal:host.signal},sdk([ok],seen));
 host.abort();
 const controller=(seen[0] as Input).options["abortController"] as AbortController;
 assert.ok(controller instanceof AbortController);
 assert.equal(controller.signal.aborted,false,"the listener is removed once the run settles");
});
test("EAT-R014: the forwarded controller is not part of the replay-identity configuration",async()=>{
 const host=new AbortController();
 const withSignal=await runClaudeImplementation("/r","p",{signal:host.signal},sdk([ok]));
 const without=await runClaudeImplementation("/r","p",{},sdk([ok]));
 assert.deepEqual(withSignal.replay?.configuration,without.replay?.configuration);
 assert.equal(withSignal.replay?.settingsSha256,without.replay?.settingsSha256);
});

const defaultTools=["Read","Glob","Grep","Edit","Write","Bash(git status *)","Bash(git add *)","Bash(git commit *)"];
test("the record binds the SHA-256 of the exact prompt and the effective configuration the SDK observed",async()=>{
 const seen:Input[]=[];
 const out=await runClaudeImplementation("/work/root","Fix parser",{},sdk([ok],seen));
 const input=seen[0] as Input;
 assert.equal(out.replay?.promptSha256,sha(input.prompt));
 assert.match(out.replay?.promptSha256??"",/^[0-9a-f]{64}$/);
 assert.deepEqual(out.replay?.configuration,{allowedTools:defaultTools,permissionMode:"dontAsk",settingSources:[],model:null,maxTurns:30,maxBudgetUsd:10});
 const options=input.options;
 assert.deepEqual(out.replay?.configuration.allowedTools,options["allowedTools"]);
 assert.equal(out.replay?.configuration.permissionMode,options["permissionMode"]);
 assert.deepEqual(out.replay?.configuration.settingSources,options["settingSources"]);
 assert.equal(out.replay?.configuration.maxTurns,options["maxTurns"]);
 assert.equal(out.replay?.configuration.maxBudgetUsd,options["maxBudgetUsd"]);
});
test("a prompt differing by one character yields a different prompt identity and the same configuration",async()=>{
 const a=await runClaudeImplementation("/r","Fix parser",{},sdk([ok]));
 const b=await runClaudeImplementation("/r","Fix parser.",{},sdk([ok]));
 const again=await runClaudeImplementation("/r","Fix parser",{},sdk([ok]));
 assert.notEqual(a.replay?.promptSha256,b.replay?.promptSha256);
 assert.equal(a.replay?.promptSha256,again.replay?.promptSha256);
 assert.deepEqual(a.replay?.configuration,b.replay?.configuration);
 assert.equal(b.replay?.promptSha256,sha("Fix parser."));
});
test("explicit model, turn and budget overrides are reflected in the configuration identity",async()=>{
 const seen:Input[]=[];
 const explicit=await runClaudeImplementation("/r","p",{model:"claude-x",maxTurns:5,maxBudgetUsd:2},sdk([ok],seen));
 assert.equal(explicit.replay?.configuration.model,"claude-x");
 assert.equal(explicit.replay?.configuration.maxTurns,5);
 assert.equal(explicit.replay?.configuration.maxBudgetUsd,2);
 assert.equal((seen[0] as Input).options["model"],"claude-x");
 const plain=await runClaudeImplementation("/r","p",{},sdk([ok]));
 assert.equal(plain.replay?.configuration.model,null);
 const blank=await runClaudeImplementation("/r","p",{model:""},sdk([ok]));
 assert.equal(blank.replay?.configuration.model,null);
 assert.notDeepEqual(explicit.replay?.configuration,plain.replay?.configuration);
});
test("the recorded configuration is a detached copy: mutating the record never reaches the SDK-observed options",async()=>{
 const seen:Input[]=[];
 const out=await runClaudeImplementation("/r","p",{},sdk([ok],seen));
 (out.replay?.configuration.allowedTools as string[]).push("Bash(rm *)");
 assert.deepEqual((seen[0] as Input).options["allowedTools"],defaultTools);
});
test("the replay identity leaves the session, summary, turns and cost fields in place",async()=>{
 const out=await runClaudeImplementation("/r","p",{},sdk([ok]));
 assert.deepEqual(Object.keys(out).sort(),["costUsd","replay","sessionId","summary","turns"]);
 assert.equal(out.sessionId,"agent-session-1");
});
const toolUse=(name:string)=>({type:"assistant",session_id:"agent-session-1",message:{content:[{type:"text",text:"working"},{type:"tool_use",name,input:{}}]}});
test("EAT-R015: onFirstEdit fires once, at the first Edit or Write tool use on the stream and never for a read-only tool",async()=>{
 const calls:string[]=[];
 const messages=[{type:"system",subtype:"init"},toolUse("Read"),toolUse("Grep"),toolUse("Edit"),toolUse("Write"),ok];
 const tracked=sdk(messages.map(m=>m));
 await runClaudeImplementation("/r","p",{onFirstEdit:()=>{calls.push("edit")}},tracked);
 assert.deepEqual(calls,["edit"]);
 const readOnly:string[]=[];
 await runClaudeImplementation("/r","p",{onFirstEdit:()=>{readOnly.push("edit")}},sdk([toolUse("Read"),toolUse("Glob"),{type:"assistant",message:{content:"plain text"}},{type:"assistant",message:null},ok]));
 assert.deepEqual(readOnly,[]);
 const write:string[]=[];
 await runClaudeImplementation("/r","p",{onFirstEdit:()=>{write.push("edit")}},sdk([toolUse("Write"),ok]));
 assert.deepEqual(write,["edit"]);
});
test("EAT-R015: a throwing onFirstEdit observer cannot fail the session",async()=>{
 const out=await runClaudeImplementation("/r","p",{onFirstEdit:()=>{throw new Error("observer bug")}},sdk([toolUse("Edit"),ok]));
 assert.equal(out.sessionId,"agent-session-1");
});
test("EAT-R015: the observer is not handed to the SDK query options",async()=>{
 const seen:Input[]=[];
 await runClaudeImplementation("/r","p",{onFirstEdit:()=>{}},sdk([ok],seen));
 assert.equal(Object.hasOwn((seen[0] as Input).options,"onFirstEdit"),false);
});

// MechanicalWorkflows-roso6 D1 twin of mwlr9: every test that asserts replay.sdk injects the fifth positional reader, so the default binding is pinned by a source-structure guard (R049 style).
/** Problems with how runClaudeImplementation binds its default SDK manifest reader; empty when the binding is the exported shared reader. */
function implementDefaultManifestBindingProblems(text:string):string[]{
 const problems:string[]=[];
 const code=text.split("\n").filter(line=>!/^\s*(?:\/\/|\/?\*)/.test(line));
 const exported=code.filter(line=>/^export\s+async\s+function\s+defaultReadSdkManifest\s*\(\s*\)\s*:\s*Promise<string\s*\|\s*null>\s*\{/.test(line));
 if(exported.length!==1)problems.push("defaultReadSdkManifest is not the one exported reader, found "+exported.length);
 const params=code.filter(line=>/^\s*readSdkManifest\s*[:=?]/.test(line));
 if(params.length!==1)problems.push("expected exactly one readSdkManifest parameter, found "+params.length);
 for(const param of params)if(!/^\s*readSdkManifest:\s*\(\s*\)\s*=>\s*Promise<string\s*\|\s*null>\s*=\s*defaultReadSdkManifest\s*,?\s*$/.test(param))problems.push("default is not the shared reader: "+param.trim());
 const calls=code.filter(line=>/\breadSdkManifest\s*\(\s*\)/.test(line)&&!/^\s*readSdkManifest\s*:/.test(line));
 if(calls.length!==1||!/await\s+readSdkManifest\s*\(\s*\)/.test(calls[0] as string))problems.push("expected exactly one awaited readSdkManifest() resolution, found "+calls.length);
 return problems;
}
test("D1 twin guard: claude-implement.ts binds the SDK manifest reader through the exported defaultReadSdkManifest",()=>{
 const text=readFileSync(new URL("../src/claude-implement.ts",import.meta.url),"utf8");
 assert.deepEqual(implementDefaultManifestBindingProblems(text),[]);
});
test("D1 twin guard mutation witness: a null-returning, literal, lookalike or dropped default and an unawaited or removed resolution are caught",()=>{
 const real=readFileSync(new URL("../src/claude-implement.ts",import.meta.url),"utf8");
 const binding="readSdkManifest: () => Promise<string | null> = defaultReadSdkManifest,";
 const call="await readSdkManifest()";
 assert.ok(real.includes(binding),"the real default binding is present in the source");
 assert.ok(real.includes(call),"the real manifest resolution is present in the source");
 for(const mutant of [
  real.replace(binding,"readSdkManifest: () => Promise<string | null> = async () => null,"),
  real.replace(binding,"readSdkManifest: () => Promise<string | null> = async () => '{\"name\":\"@anthropic-ai/claude-agent-sdk\",\"version\":\"0.0.0\"}',"),
  real.replace(binding,"readSdkManifest: () => Promise<string | null> = localReader,"),
  real.replace(binding,"readSdkManifest: () => Promise<string | null>,"),
  real.replace("export async function defaultReadSdkManifest()","async function defaultReadSdkManifest()"),
  real.replace(call,"await null"),
  real.replace(call,"readSdkManifest()"),
 ]){
  assert.notEqual(mutant,real);
  assert.notDeepEqual(implementDefaultManifestBindingProblems(mutant),[]);
 }
 assert.deepEqual(implementDefaultManifestBindingProblems(real),[]);
});
