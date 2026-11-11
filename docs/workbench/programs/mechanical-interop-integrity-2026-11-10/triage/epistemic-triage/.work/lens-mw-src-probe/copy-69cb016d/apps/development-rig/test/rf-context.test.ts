import test from "node:test";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { renderTaskContext } from "../dist/rf-context.js";
import type { RfExecutor } from "../dist/rf-context.js";

const root="/tmp/mw-rf";const task="Fix parser";const base="a".repeat(40);
const good={schema:"reactive-fiber.cli/v1",ok:true,command:"context render",workspace:{root,id:"rfw_1"},result:{render_id:"rfr-1",workspace_id:"rfw_1",actor:"agent:camshaft-oe",output:{text:"Task: Fix parser\nSource revision: "+base+"\n",digest:"sha256:"+"b".repeat(64)},budget:{capability_snapshot:{model_id:"claude-opus-5",verified:true},formula_terms:{available_context_tokens:512}},provenance:{graph_revision_id:"sha256:"+"c".repeat(64),sdk_versions:{rf:"1"}}},diagnostics:[]};
const versionOk={schema:"reactive-fiber.cli/v1",ok:true,command:"version",workspace:null,result:{version:"0.1.883",sdk_versions:{fiber_optics:"0.1.0",reactive_inference:"0.2.108"}},diagnostics:[]};
/** An rf double that answers rf --json --version with a version envelope and every other call with the render envelope. */
const answering=(render:unknown,version:unknown=versionOk,exitCode=0):RfExecutor=>async argv=>({stdout:JSON.stringify(argv.includes("--version")?version:render),stderr:"",exitCode});
const execute=answering(good);
test("real RF envelope projects rendered text with native id and model budget",async()=>{
 const out=await renderTaskContext(root,task,base,"claude-opus-5",execute);
 assert.equal(out.text,good.result.output.text);
 assert.equal(out.evidence?.system,"reactive-fiber");
 assert.equal(out.evidence?.id,"rfr-1");
 assert.equal(out.basis.revision,base);
 assert.equal(out.model,"claude-opus-5");
 assert.equal(out.availableTokens,512);
});
test("RF error or placeholder cannot become task context",async()=>{
 for(const result of [
  {stdout:JSON.stringify({...good,ok:false,diagnostics:[{code:"RF_STORAGE_UNAVAILABLE"}]}),stderr:"",exitCode:6},
  {stdout:JSON.stringify({...good,result:{...good.result,output:{text:"demo.banner has no content yet.\n"}}}),stderr:"",exitCode:0},
  {stdout:JSON.stringify({...good,result:{...good.result,render_id:null}}),stderr:"",exitCode:0},
 ]) await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>result),/RF_(RENDER|CONTEXT)_/);
});
test("RF model mismatch and missing budget/provenance refuse",async()=>{
 for(const patch of [
  {budget:{capability_snapshot:{model_id:"other"}}},
  {budget:{capability_snapshot:{model_id:"claude-opus-5"}}},
  {provenance:{}},
 ]) await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify({...good,result:{...good.result,...patch}}),stderr:"",exitCode:0})),/RF_CONTEXT_/);
});
test("RF receives task and source basis as explicit invocation parameters",async()=>{
 let args:readonly string[]=[];
 const capture:RfExecutor=async(a,c)=>{if(!a.includes("--version"))args=a;return execute(a,c)};
 await renderTaskContext(root,task,base,"claude-opus-5",capture);
 assert.ok(args.includes(root));assert.ok(args.includes("--model"));
 assert.ok(args.some(x=>x.includes(task) && x.includes(base)));
});

test("RF output must actually reflect the requested task and source basis",async()=>{
 for(const text of ["some unrelated sentence\n","Task: Fix parser\n"]) {
  await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify({...good,result:{...good.result,output:{...good.result.output,text}}}),stderr:"",exitCode:0})),/RF_CONTEXT_/);
 }
});

test("RF cannot claim complete render when producer budget says model capability unverified",async()=>{
 const bad={...good,result:{...good.result,budget:{...good.result.budget,capability_snapshot:{model_id:"claude-opus-5",verified:false}}}};
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify(bad),stderr:"",exitCode:0})),/RF_CONTEXT_/);
});
test("a blank root, task, revision or model is RF_CONTEXT_INPUT_INVALID before RF is executed",async()=>{
 let executed=0;const spy:RfExecutor=async()=>{executed++;return{stdout:JSON.stringify(good),stderr:"",exitCode:0}};
 const cases:ReadonlyArray<readonly [string,readonly [string,string,string,string]]>=[
  ["root",["",task,base,"claude-opus-5"]],["task",[root," ",base,"claude-opus-5"]],["revision",[root,task,"","claude-opus-5"]],["model",[root,task,base,"\t"]],
 ];
 for(const [label,[r,t,b,m]] of cases){
  await assert.rejects(()=>renderTaskContext(r,t,b,m,spy),(e:unknown)=>e instanceof Error&&e.message.startsWith("RF_CONTEXT_INPUT_INVALID"),label);
 }
 assert.equal(executed,0);
});

const withResult=(patch:Record<string,unknown>):RfExecutor=>answering({...good,result:{...good.result,...patch}});
const refusedAs=(reason:string)=>(e:unknown)=>e instanceof Error&&e.message===reason;
const NO_RENDER="RF_RENDER_UNESTABLISHED: producer returned no successful render";
const NO_CONTEXT="RF_CONTEXT_UNESTABLISHED: missing task-grounded content, native evidence or model budget";
test("a nonzero producer exit alongside an ok envelope is RF_RENDER_UNESTABLISHED carrying stderr",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify(good),stderr:"rf exited 2",exitCode:2})),refusedAs("RF_RENDER_UNESTABLISHED: rf exited 2"));
});
test("an unsuccessful envelope at exit 0 is refused as no successful render",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify({...good,ok:false}),stderr:"",exitCode:0})),refusedAs(NO_RENDER));
});
test("a stdout that is not JSON is RF_RENDER_UNESTABLISHED: malformed JSON envelope",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:"not json",stderr:"",exitCode:0})),refusedAs("RF_RENDER_UNESTABLISHED: malformed JSON envelope"));
});
test("an envelope of another schema is refused as no successful render",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify({...good,schema:"reactive-fiber.cli/v0"}),stderr:"",exitCode:0})),refusedAs(NO_RENDER));
});
test("placeholder text that names the task and revision is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({output:{...good.result.output,text:good.result.output.text+"demo.banner has no content yet.\n"}})),refusedAs(NO_CONTEXT));
});
test("text that names the revision but not the task is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({output:{...good.result.output,text:"Source revision: "+base+"\n"}})),refusedAs(NO_CONTEXT));
});
test("a blank render id is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({render_id:" "})),refusedAs(NO_CONTEXT));
});
test("a digest that is not sha256 hex is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({output:{...good.result.output,digest:"sha256:xyz"}})),refusedAs(NO_CONTEXT));
});
test("a blank graph revision is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({provenance:{...good.result.provenance,graph_revision_id:" "}})),refusedAs(NO_CONTEXT));
});
test("a negative available token budget is RF_CONTEXT_UNESTABLISHED",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({budget:{...good.result.budget,formula_terms:{available_context_tokens:-1}}})),refusedAs(NO_CONTEXT));
});
test("the projection carries the producer graph revision and output digest",async()=>{
 const out=await renderTaskContext(root,task,base,"claude-opus-5",execute);
 assert.equal(out.graphRevision,good.result.provenance.graph_revision_id,"graphRevision must be the producer graph revision");
 assert.equal(out.outputDigest,good.result.output.digest,"outputDigest must be the producer output digest");
});
test("a verified capability snapshot that names another model is RF_CONTEXT_UNESTABLISHED for the requested model",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({budget:{...good.result.budget,capability_snapshot:{model_id:"claude-haiku-4",verified:true}}})),refusedAs(NO_CONTEXT));
});
test("a budget literal that overflows to Infinity is RF_CONTEXT_UNESTABLISHED",async()=>{
 const overflow=JSON.stringify(good).replace('"available_context_tokens":512','"available_context_tokens":1e999');
 assert.notEqual(overflow,JSON.stringify(good),"the fixture must carry the overflow literal");
 assert.equal(JSON.parse(overflow).result.budget.formula_terms.available_context_tokens,Infinity);
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:overflow,stderr:"",exitCode:0})),refusedAs(NO_CONTEXT));
});

// MechanicalWorkflows-iavw1 (RFCA-MWX01-R001): the default executor resolves rf like rf-provision and keeps the producer's structured failure.
const shimDir=mkdtempSync(join(tmpdir(),"mw-rf-ctx-"));
test.after(()=>rmSync(shimDir,{recursive:true,force:true}));
/** A node-script rf shim that records its argv and prints/exits as told; its shebang is the absolute interpreter, so it needs no PATH. */
function shim(name:string,stdout:string,exit:number):{readonly path:string;readonly argv:string}{
 const path=join(shimDir,name),argv=join(shimDir,name+".argv");
 writeFileSync(path,["#!"+process.execPath,'if(process.argv.includes("--version")){process.stdout.write('+JSON.stringify(JSON.stringify(versionOk))+');process.exit(0)}',
  'require("node:fs").writeFileSync('+JSON.stringify(argv)+',JSON.stringify(process.argv.slice(2)));',
  'process.stdout.write('+JSON.stringify(stdout)+');process.exitCode='+String(exit)+';',""].join("\n"));
 chmodSync(path,0o755);return {path,argv};
}
async function withEnv<T>(env:Record<string,string|undefined>,fn:()=>Promise<T>):Promise<T>{
 const saved:Record<string,string|undefined>={};
 for(const [k,v] of Object.entries(env)){saved[k]=process.env[k];if(v===undefined)delete process.env[k];else process.env[k]=v}
 try{return await fn()}finally{for(const [k,v] of Object.entries(saved)){if(v===undefined)delete process.env[k];else process.env[k]=v}}
}
test("the default executor spawns MECHANICAL_RF_BINARY and never a bare rf (PATH holds no rf)",async()=>{
 const s=shim("named-rf",JSON.stringify(good),0);
 const out=await withEnv({MECHANICAL_RF_BINARY:s.path,PATH:shimDir+"-empty"},()=>renderTaskContext(shimDir,task,base,"claude-opus-5"));
 assert.equal(out.evidence?.id,"rfr-1");
 const argv=JSON.parse(readFileSync(s.argv,"utf8")) as string[];
 assert.equal(argv[0],"context");assert.equal(argv[1],"render");assert.ok(argv.includes("--strict"));
});
test("with MECHANICAL_RF_BINARY unset and no rf on PATH the failure is RF_UNAVAILABLE, not a render refusal, and simulates nothing",async()=>{
 for(const unset of [undefined,""]) await withEnv({MECHANICAL_RF_BINARY:unset,PATH:shimDir+"-empty"},async()=>{
  await assert.rejects(()=>renderTaskContext(shimDir,task,base,"claude-opus-5"),(e:unknown)=>{
   assert.ok(e instanceof Error);assert.equal((e as {code?:string}).code,"RF_UNAVAILABLE");
   assert.ok(e.message.startsWith("RF_UNAVAILABLE: "),e.message);assert.doesNotMatch(e.message,/RF_RENDER_UNESTABLISHED|RF_CONTEXT_UNESTABLISHED/);
   return true;
  });
 });
});
test("a named MECHANICAL_RF_BINARY that does not exist is also RF_UNAVAILABLE",async()=>{
 await withEnv({MECHANICAL_RF_BINARY:join(shimDir,"absent-rf")},()=>assert.rejects(()=>renderTaskContext(shimDir,task,base,"claude-opus-5"),(e:unknown)=>(e as {code?:string}).code==="RF_UNAVAILABLE"));
});
test("a producer refusal envelope keeps its diagnostics code and real exit code on the failure",async()=>{
 const refusal={schema:"reactive-fiber.cli/v1",ok:false,command:"context render",diagnostics:[{code:"RF_WORKSPACE_INVALID"}]};
 const s=shim("refusing-rf",JSON.stringify(refusal),3);
 await withEnv({MECHANICAL_RF_BINARY:s.path},()=>assert.rejects(()=>renderTaskContext(shimDir,task,base,"claude-opus-5"),(e:unknown)=>{
  const f=e as {code?:string;exitCode?:number;diagnosticCode?:string;message:string};
  assert.equal(f.code,"RF_RENDER_UNESTABLISHED");assert.equal(f.exitCode,3);assert.equal(f.diagnosticCode,"RF_WORKSPACE_INVALID");
  assert.equal(f.message,"RF_RENDER_UNESTABLISHED: RF_WORKSPACE_INVALID (exit 3)");
  return true;
 }));
});
test("a nonzero exit with non-JSON stdout still refuses as RF_RENDER_UNESTABLISHED with the real exit code",async()=>{
 const s=shim("garbled-rf","not json",2);
 await withEnv({MECHANICAL_RF_BINARY:s.path},()=>assert.rejects(()=>renderTaskContext(shimDir,task,base,"claude-opus-5"),(e:unknown)=>{
  const f=e as {code?:string;exitCode?:number;diagnosticCode?:string;message:string};
  assert.equal(f.code,"RF_RENDER_UNESTABLISHED");assert.equal(f.exitCode,2);assert.equal(f.diagnosticCode,undefined);
  assert.equal(f.message,"RF_RENDER_UNESTABLISHED: rf exited 2");
  return true;
 }));
});
test("an injected executor's nonzero refusal envelope also surfaces its diagnostics code and exit code",async()=>{
 const refusal={schema:"reactive-fiber.cli/v1",ok:false,diagnostics:[{code:"RF_STORAGE_UNAVAILABLE"}]};
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>({stdout:JSON.stringify(refusal),stderr:"",exitCode:6})),(e:unknown)=>{
  const f=e as {exitCode?:number;diagnosticCode?:string};return f.exitCode===6&&f.diagnosticCode==="RF_STORAGE_UNAVAILABLE";
 });
});
test("a missing working directory is a render refusal, not RF_UNAVAILABLE, even though spawn reports ENOENT",async()=>{
 const s=shim("cwd-rf",JSON.stringify(good),0);
 await withEnv({MECHANICAL_RF_BINARY:s.path},()=>assert.rejects(()=>renderTaskContext(join(shimDir,"no-such-workspace"),task,base,"claude-opus-5"),(e:unknown)=>{
  const f=e as {code?:string;message:string};return f.code==="RF_RENDER_UNESTABLISHED"&&f.message.startsWith("RF_RENDER_UNESTABLISHED: ");
 }));
});

// MechanicalWorkflows-g00df (RFCA-MWX01-R002): the handoff carries workspace id, explicit actor and CLI provenance, text projection only.
test("--actor reaches rf exactly once with the supplied actor and the context exposes the envelope actor",async()=>{
 let argvSeen:readonly string[]=[];
 const capture:RfExecutor=async(argv,cwd)=>{if(!argv.includes("--version"))argvSeen=argv;return execute(argv,cwd)};
 const out=await renderTaskContext(root,task,base,"claude-opus-5",capture,{actor:"agent:camshaft-oe"});
 assert.equal(argvSeen.filter(x=>x==="--actor").length,1);
 assert.equal(argvSeen[argvSeen.indexOf("--actor")+1],"agent:camshaft-oe");
 assert.equal(out.actor,good.result.actor);
});
test("an envelope actor that differs from the requested actor is refused",async()=>{
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult({actor:"user:someone"}),{actor:"agent:camshaft-oe"}),
  (e:unknown)=>e instanceof Error&&e.message==="RF_CONTEXT_UNESTABLISHED: render actor \"user:someone\" differs from requested actor \"agent:camshaft-oe\"");
});
test("a blank requested actor is RF_CONTEXT_INPUT_INVALID before rf runs",async()=>{
 let executed=0;
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async()=>{executed++;return{stdout:"",stderr:"",exitCode:0}},{actor:" "}),
  (e:unknown)=>e instanceof Error&&e.message.startsWith("RF_CONTEXT_INPUT_INVALID"));
 assert.equal(executed,0);
});
test("without a supplied actor RF_ACTOR is passed through and recorded, and with neither no --actor is invented",async()=>{
 const run=async(env:string|undefined)=>{let argvSeen:readonly string[]=[];
  const capture:RfExecutor=async(argv,cwd)=>{if(!argv.includes("--version"))argvSeen=argv;return execute(argv,cwd)};
  await withEnv({RF_ACTOR:env},()=>renderTaskContext(root,task,base,"claude-opus-5",capture));return argvSeen};
 const withActor=await run("agent:camshaft-oe");assert.equal(withActor[withActor.indexOf("--actor")+1],"agent:camshaft-oe");
 assert.ok(!(await run(undefined)).includes("--actor"));
});
test("the context exposes the RF workspace id from result.workspace_id",async()=>{
 assert.equal((await renderTaskContext(root,task,base,"claude-opus-5",execute)).rfWorkspaceId,"rfw_1");
});
test("a blank, absent or non-rfw_ workspace id and a blank actor are refused",async()=>{
 for(const patch of [{workspace_id:""},{workspace_id:"ws-1"},{workspace_id:7},{workspace_id:undefined},{actor:" "},{actor:undefined}])
  await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",withResult(patch)),
   (e:unknown)=>e instanceof Error&&e.message==="RF_CONTEXT_UNESTABLISHED: missing RF workspace id or actor identity",JSON.stringify(patch));
});
test("the context carries cli version and sdk versions from the version envelope of the same executor",async()=>{
 const calls:string[][]=[];
 const out=await renderTaskContext(root,task,base,"claude-opus-5",async(argv,cwd)=>{calls.push([...argv]);return execute(argv,cwd)});
 assert.deepEqual(out.cli,{version:"0.1.883",sdkVersions:{fiber_optics:"0.1.0",reactive_inference:"0.2.108"}});
 assert.equal(calls.filter(a=>a.includes("--version")).length,1);
 assert.ok(calls.find(a=>a.includes("--version"))?.includes("--json"));
});
test("a malformed, unsuccessful or wrong-command version envelope refuses",async()=>{
 const NO_CLI="RF_CONTEXT_UNESTABLISHED: rf CLI version provenance unavailable";
 const bad:unknown[]=[
  {...versionOk,ok:false},{...versionOk,schema:"reactive-fiber.cli/v0"},{...versionOk,command:"status"},
  {...versionOk,result:{...versionOk.result,version:" "}},{...versionOk,result:{version:"1"}},
  {...versionOk,result:{...versionOk.result,sdk_versions:{a:1}}},{...versionOk,result:null},
 ];
 for(const v of bad) await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",answering(good,v)),refusedAs(NO_CLI),JSON.stringify(v));
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async argv=>argv.includes("--version")?{stdout:"not json",stderr:"",exitCode:0}:{stdout:JSON.stringify(good),stderr:"",exitCode:0}),refusedAs(NO_CLI));
 await assert.rejects(()=>renderTaskContext(root,task,base,"claude-opus-5",async argv=>argv.includes("--version")?{stdout:JSON.stringify(versionOk),stderr:"",exitCode:2}:{stdout:JSON.stringify(good),stderr:"",exitCode:0}),refusedAs(NO_CLI));
});
test("the handoff holds the text projection and identities, never the raw render envelope",async()=>{
 const fat={...good,result:{...good.result,blocks:[{x:"y".repeat(50_000)}],components:[{x:"z".repeat(50_000)}],sources:[{x:"w".repeat(50_000)}]}};
 const out=await renderTaskContext(root,task,base,"claude-opus-5",answering(fat));
 const wire=JSON.stringify(out);
 assert.doesNotMatch(wire,/"blocks"|"components"|"sources"/);
 assert.ok(wire.length<2*out.text.length+4096,String(wire.length));
});
