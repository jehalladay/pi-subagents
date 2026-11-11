import test from "node:test";
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {mkdtempSync,writeFileSync,rmSync,readFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {runClaudeReview} from "../dist/claude-review.js";
import type {ReviewOptions} from "../dist/claude-review.js";
type Query=NonNullable<ReviewOptions["query"]>;
type ReviewFormat={type:string;schema:{required:readonly string[]}};
function git(root:string,...args:string[]):string{const p=spawnSync("git",["-C",root,...args],{encoding:"utf8"});assert.equal(p.status,0,p.stderr);return p.stdout.trim()}
async function repo<T>(fn:(root:string,rev:string)=>Promise<T>):Promise<T>{const root=mkdtempSync(join(tmpdir(),"mw-review-"));try{git(root,"init","-q");git(root,"config","user.name","Review Test");git(root,"config","user.email","review@example.invalid");writeFileSync(join(root,"forge.toml"),'[package]\nname="review-test"\ntype="code"\nversion="0.1.0"\n');writeFileSync(join(root,"main.ts"),"export const n = 1;\n");git(root,"add",".");git(root,"commit","-qm","base");writeFileSync(join(root,"main.ts"),"export const n = 2;\n");git(root,"add","main.ts");git(root,"commit","-qm","candidate");return await fn(root,git(root,"rev-parse","HEAD"))}finally{rmSync(root,{recursive:true,force:true})}}
function query(rev:string,verdict="approved"):Query{return async function*(args){assert.deepEqual(args.options.allowedTools,["Read","Glob","Grep","Bash(git status *)","Bash(git show *)"]);yield{type:"result",subtype:"success",session_id:"review-session",result:JSON.stringify({candidateRevision:rev,verdict,rationale:"checked the diff"})}}}
test("read-only reviewer binds approval to exact clean candidate",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev)});
 assert.equal(out.verdict,"approved");assert.equal(out.basis.revision,rev);
 assert.deepEqual(out.evidence,{system:"claude-agent-sdk",kind:"review-session",id:"review-session"});
}));
test("stale candidate refuses before model starts",()=>repo(async(root)=>{
 let calls=0;await assert.rejects(()=>runClaudeReview(root,"f".repeat(40),"Fix parser",{query:async function*(){calls++}}),/REVIEW_CANDIDATE_BASIS_MISMATCH/);assert.equal(calls,0);
}));
test("model approval for another commit is indeterminate",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query("f".repeat(40))});assert.equal(out.verdict,"unknown");
}));
test("model edits during review are refused even if it reports approval",()=>repo(async(root,rev)=>{
 const mutate=async function*(){writeFileSync(join(root,"main.ts"),"dirty\n");yield{type:"result",subtype:"success",session_id:"review-session",result:JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"})}};
 await assert.rejects(()=>runClaudeReview(root,rev,"Fix parser",{query:mutate}),/REVIEW_WORKSPACE_CHANGED/);
}));
test("a reviewer that adds an empty commit keeping the tree identical is refused even though it approves the original revision",()=>repo(async(root,rev)=>{
 const treeBefore=git(root,"rev-parse","HEAD^{tree}");
 const commit=async function*(){git(root,"commit","-q","--allow-empty","-m","reviewer added commit");yield{type:"result",subtype:"success",session_id:"review-session",result:JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"})}};
 await assert.rejects(()=>runClaudeReview(root,rev,"Fix parser",{query:commit}),/REVIEW_WORKSPACE_CHANGED/);
 assert.notEqual(git(root,"rev-parse","HEAD"),rev);assert.equal(git(root,"rev-parse","HEAD^{tree}"),treeBefore);
}));
test("missing terminal or malformed JSON cannot approve",()=>repo(async(root,rev)=>{
 for(const q of [async function*(){},async function*(){yield{type:"result",subtype:"success",session_id:"review-session",result:"not JSON"}}]){
  const out=await runClaudeReview(root,rev,"Fix parser",{query:q});assert.equal(out.verdict,"unknown");
 }
}));

test("reviewer requests structured JSON output and binds it to the exact candidate",()=>repo(async(root,rev)=>{
 let format:ReviewFormat|null=null;
 const q:Query=async function*(args){format=args.options.outputFormat as ReviewFormat;yield{type:"result",subtype:"success",session_id:"s-struct",result:"Reviewed the diff in prose.",structured_output:{candidateRevision:rev,verdict:"approved",rationale:"tests cover the change"}}};
 const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
 const captured=format as ReviewFormat|null;assert.ok(captured!==null);assert.equal(captured.type,"json_schema");assert.deepEqual([...captured.schema.required].sort(),["candidateRevision","rationale","verdict"]);
 assert.equal(out.verdict,"approved");assert.equal(out.evidence?.id,"s-struct");assert.equal(out.reason,undefined);
}));
test("fenced JSON text is accepted only when no structured output is attached",()=>repo(async(root,rev)=>{
 const fenced="```json\n"+JSON.stringify({candidateRevision:rev,verdict:"rejected",rationale:"test asserts the wrong value"})+"\n```";
 const out=await runClaudeReview(root,rev,"Fix parser",{query:async function*(){yield{type:"result",subtype:"success",session_id:"s-fence",result:fenced}}});
 assert.equal(out.verdict,"rejected");assert.equal(out.evidence?.id,"s-fence");
}));
test("unknown review verdicts carry a distinct diagnostic reason and no evidence",()=>repo(async(root,rev)=>{
 const cases:[Query,string][]=[
  [async function*(){},"REVIEW_TERMINAL_MISSING"],
  [async function*(){yield{type:"result",subtype:"error_max_turns",is_error:true,session_id:"s",result:""}},"REVIEW_TERMINAL_ERROR:error_max_turns"],
  [async function*(){yield{type:"result",subtype:"success",session_id:"s",result:"not JSON"}},"REVIEW_RESULT_NOT_JSON"],
  [async function*(){yield{type:"result",subtype:"success",session_id:"s",result:JSON.stringify({candidateRevision:"f".repeat(40),verdict:"approved",rationale:"x"})}},"REVIEW_REPORT_BASIS_MISMATCH"],
  [async function*(){yield{type:"result",subtype:"success",session_id:"s",result:"",structured_output:{candidateRevision:rev,verdict:"unknown",rationale:"could not decide"}}},"REVIEW_MODEL_UNDECIDED"],
  [async function*(){yield{type:"result",subtype:"success",session_id:"s",result:"",structured_output:{candidateRevision:rev,verdict:"approved",rationale:"  "}}},"REVIEW_REPORT_INVALID"],
 ];
 for(const [q,reason] of cases){const out=await runClaudeReview(root,rev,"Fix parser",{query:q});assert.equal(out.verdict,"unknown",reason);assert.equal(out.reason,reason);assert.equal(out.evidence,undefined);}
}));
test("an undecided model report keeps its rationale as non-authoritative detail and the prompt bounds unknown",()=>repo(async(root,rev)=>{
 let prompt="";
 const q:Query=async function*(args){prompt=args.prompt;yield{type:"result",subtype:"success",session_id:"s",result:"",structured_output:{candidateRevision:rev,verdict:"unknown",rationale:"I could not execute the tests. ".repeat(20)}}};
 const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
 assert.equal(out.verdict,"unknown");assert.equal(out.reason,"REVIEW_MODEL_UNDECIDED");
 assert.ok(out.detail?.startsWith("I could not execute the tests."));assert.ok((out.detail?.length??301)<=300);assert.equal(out.evidence,undefined);
 assert.match(prompt,/rejected when the candidate contradicts the task or its tests/);assert.match(prompt,/unknown only if you could not read the candidate/);
 assert.match(prompt,/cannot run tests or Forge/);
}));
test("an empty review session id refuses an otherwise valid approved report and attaches no evidence",()=>repo(async(root,rev)=>{
 const q:Query=async function*(){yield{type:"result",subtype:"success",session_id:"",result:"",structured_output:{candidateRevision:rev,verdict:"approved",rationale:"checked the diff"}}};
 const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
 assert.equal(out.verdict,"unknown");assert.equal(out.reason,"REVIEW_SESSION_UNIDENTIFIED");assert.equal(out.evidence,undefined);
 const ok=await runClaudeReview(root,rev,"Fix parser",{query:query(rev)});
 assert.equal(ok.verdict,"approved");assert.equal(ok.evidence?.id,"review-session");
}));
test("a successful subtype that also reports is_error true refuses an otherwise valid approved report and attaches no evidence",()=>repo(async(root,rev)=>{
 const q:Query=async function*(){yield{type:"result",subtype:"success",is_error:true,session_id:"review-session",result:"",structured_output:{candidateRevision:rev,verdict:"approved",rationale:"checked the diff"}}};
 const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
 assert.equal(out.verdict,"unknown");assert.equal(out.reason,"REVIEW_TERMINAL_ERROR:success");assert.equal(out.evidence,undefined);
 const ok=await runClaudeReview(root,rev,"Fix parser",{query:query(rev)});
 assert.equal(ok.verdict,"approved");assert.equal(ok.evidence?.id,"review-session");
}));

test("a blank task or a blank revision refuses before any git read or model call",()=>repo(async(root,rev)=>{
 let calls=0;const q:Query=async function*(){calls++};
 for(const [task,revision] of [["",rev],["   ",rev],["Fix parser",""],["Fix parser","  "]] as const){
  await assert.rejects(()=>runClaudeReview(root,revision,task,{query:q}),/REVIEW_REQUEST_INVALID/,JSON.stringify([task,revision]));
 }
 assert.equal(calls,0);
}));
test("a report that is not an object, or carries an unrecognised verdict, is invalid and attaches no evidence",()=>repo(async(root,rev)=>{
 const cases:[unknown,string][]=[
  [["approved"],"array structured output"],
  [null,"null structured output"],
  [{candidateRevision:rev,verdict:"maybe",rationale:"x"},"unrecognised verdict"],
  [{candidateRevision:rev,rationale:"x"},"missing verdict"],
  [{candidateRevision:rev,verdict:"approved"},"missing rationale"],
 ];
 for(const [structured,label] of cases){
  const q:Query=async function*(){yield{type:"result",subtype:"success",session_id:"s",result:"",structured_output:structured}};
  const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
  assert.equal(out.verdict,"unknown",label);assert.equal(out.reason,"REVIEW_REPORT_INVALID",label);assert.equal(out.evidence,undefined,label);
 }
}));
test("two fenced blocks, or a fenced block that is not JSON, are not a report",()=>repo(async(root,rev)=>{
 const block=(v:string)=>"```json\n"+v+"\n```";
 const good=JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"});
 for(const result of [block(good)+"\n\nand again\n\n"+block(good),block("not json at all")]){
  const q:Query=async function*(){yield{type:"result",subtype:"success",session_id:"s",result}};
  const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
  assert.equal(out.verdict,"unknown");assert.equal(out.reason,"REVIEW_RESULT_NOT_JSON");assert.equal(out.evidence,undefined);
 }
}));
test("a missing or non-string session id refuses an otherwise valid approved report",()=>repo(async(root,rev)=>{
 for(const sessionId of [undefined,7,null]){
  const q:Query=async function*(){yield{type:"result",subtype:"success",...(sessionId===undefined?{}:{session_id:sessionId}),result:"",structured_output:{candidateRevision:rev,verdict:"approved",rationale:"checked"}}};
  const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
  assert.equal(out.verdict,"unknown",String(sessionId));assert.equal(out.reason,"REVIEW_SESSION_UNIDENTIFIED",String(sessionId));assert.equal(out.evidence,undefined);
 }
}));
test("the last result event wins, so a later error terminal overrides an earlier success",()=>repo(async(root,rev)=>{
 const q:Query=async function*(){
  yield{type:"result",subtype:"success",session_id:"early",result:JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"})};
  yield{type:"assistant",message:"noise after the first result"};
  yield{type:"result",subtype:"error_during_execution",is_error:true,session_id:"late",result:""};
 };
 const out=await runClaudeReview(root,rev,"Fix parser",{query:q});
 assert.equal(out.verdict,"unknown");assert.equal(out.reason,"REVIEW_TERMINAL_ERROR:error_during_execution");assert.equal(out.evidence,undefined);
}));
test("review session settings are read-only, bounded and carry the model only when one is chosen",()=>repo(async(root,rev)=>{
 type Settings=Parameters<Query>[0]["options"];
 const seen:Settings[]=[];
 const q:Query=async function*(args){seen.push(args.options);yield{type:"result",subtype:"success",session_id:"s",result:JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"})}};
 await runClaudeReview(root,rev,"Fix parser",{query:q});
 await runClaudeReview(root,rev,"Fix parser",{query:q,model:"claude-test-model",maxTurns:3,maxBudgetUsd:0.5});
 const [dflt,custom]=seen;
 assert.ok(dflt&&custom);
 assert.equal(dflt.cwd,root);assert.equal(dflt.permissionMode,"dontAsk");assert.deepEqual(dflt.settingSources,[]);
 assert.equal(dflt.maxTurns,20);assert.equal(dflt.maxBudgetUsd,5);assert.equal("model" in dflt,false);
 for(const tool of dflt.allowedTools)assert.doesNotMatch(tool,/^(Edit|Write|NotebookEdit)\b|Bash\((?!git (status|show) )/);
 assert.equal(custom.maxTurns,3);assert.equal(custom.maxBudgetUsd,0.5);assert.equal(custom.model,"claude-test-model");
 assert.deepEqual(custom.allowedTools,dflt.allowedTools);
}));
test("the default prompt names the exact revision and the review-only JSON contract",()=>repo(async(root,rev)=>{
 let prompt="";
 const q:Query=async function*(args){prompt=args.prompt;yield{type:"result",subtype:"success",session_id:"s",result:JSON.stringify({candidateRevision:rev,verdict:"approved",rationale:"fine"})}};
 await runClaudeReview(root,rev,"Fix the parser bug",{query:q});
 assert.match(prompt,/Task: Fix the parser bug/);assert.ok(prompt.includes("Candidate commit: "+rev));assert.ok(prompt.includes("git show "+rev));
 assert.ok(prompt.includes("candidateRevision must be exactly "+rev));assert.match(prompt,/without modifying files/);assert.match(prompt,/observation, not Forge gate evidence/);
}));
test("an SDK that cannot load, or that lacks query, is named CLAUDE_REVIEW_SDK_UNAVAILABLE before any review work",()=>repo(async(root,rev)=>{
 const loaders:[()=>Promise<unknown>,string][]=[
  [async()=>{throw new Error("Cannot find package")},"load failure"],
  [async()=>({}),"empty module"],
  [async()=>({query:"not a function"}),"non-function query"],
  [async()=>null,"null module"],
 ];
 for(const [loadSdk,label] of loaders)await assert.rejects(()=>runClaudeReview(root,rev,"Fix parser",{loadSdk}),/CLAUDE_REVIEW_SDK_UNAVAILABLE/,label);
 const sdkQuery:Query=async function*(){yield{type:"result",subtype:"success",session_id:"sdk-session",result:JSON.stringify({candidateRevision:rev,verdict:"rejected",rationale:"loaded through the seam"})}};
 const withQuery=await runClaudeReview(root,rev,"Fix parser",{loadSdk:async()=>({query:sdkQuery})});
 assert.equal(withQuery.verdict,"rejected");assert.equal(withQuery.evidence?.id,"sdk-session");
}));
test("an injected query bypasses the SDK loader entirely",()=>repo(async(root,rev)=>{
 let loads=0;
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev),loadSdk:async()=>{loads++;throw new Error("must not load")}});
 assert.equal(out.verdict,"approved");assert.equal(loads,0);
}));

// EAT-R032 b1 (MechanicalWorkflows-loexn.19): the review-session receipt records the resolved SDK identity.
const manifest=(version:string,name="@anthropic-ai/claude-agent-sdk"):(()=>Promise<string|null>)=>async()=>JSON.stringify({name,version});
test("an approved review receipt records the sdk name and the semver read from the manifest",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev),readSdkManifest:manifest("1.2.3")}) as {sdk?:unknown};
 assert.deepEqual(out.sdk,{name:"@anthropic-ai/claude-agent-sdk",version:"1.2.3"});
 const flipped=await runClaudeReview(root,rev,"Fix parser",{query:query(rev),readSdkManifest:manifest("1.2.4")}) as {sdk?:unknown};
 assert.deepEqual(flipped.sdk,{name:"@anthropic-ai/claude-agent-sdk",version:"1.2.4"});
}));
test("a rejected review receipt records the same sdk identity",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev,"rejected"),readSdkManifest:manifest("0.9.1")}) as {sdk?:unknown;verdict:string};
 assert.equal(out.verdict,"rejected");assert.deepEqual(out.sdk,{name:"@anthropic-ai/claude-agent-sdk",version:"0.9.1"});
}));
test("an unreadable sdk manifest records a null sdk rather than a guessed version",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev),readSdkManifest:async()=>null}) as {sdk?:unknown};
 assert.equal(out.sdk,null);
}));
test("a non-semver or foreign manifest refuses before query() runs",()=>repo(async(root,rev)=>{
 for(const bad of [manifest("latest"),manifest("^1.2.3"),manifest("1.2"),manifest("1.2.3","some-other-package"),async()=>"not json"]){
  let calls=0;
  await assert.rejects(()=>runClaudeReview(root,rev,"Fix parser",{query:async function*(){calls++},readSdkManifest:bad}),/CLAUDE_AGENT_SDK_MANIFEST_INVALID/);
  assert.equal(calls,0);
 }
}));
test("an unknown review verdict carries no evidence and no sdk claim",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:async function*(){},readSdkManifest:manifest("1.2.3")}) as {sdk?:unknown};
 assert.equal(out.sdk,undefined);
}));

// MechanicalWorkflows-mwlr9 D2: the sdk-null receipt carries the implementation class's incompleteness marker.
test("an unreadable sdk manifest marks the review receipt complete:false with missingAxes [sdk]",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev),readSdkManifest:async()=>null}) as {sdk?:unknown;complete?:unknown;missingAxes?:unknown};
 assert.equal(out.sdk,null);assert.equal(out.complete,false);assert.deepEqual(out.missingAxes,["sdk"]);
 const rejected=await runClaudeReview(root,rev,"Fix parser",{query:query(rev,"rejected"),readSdkManifest:async()=>null}) as {complete?:unknown;missingAxes?:unknown};
 assert.equal(rejected.complete,false);assert.deepEqual(rejected.missingAxes,["sdk"]);
}));
test("a resolved sdk manifest marks the review receipt complete:true with no missing axes",()=>repo(async(root,rev)=>{
 for(const verdict of ["approved","rejected"] as const){
  const out=await runClaudeReview(root,rev,"Fix parser",{query:query(rev,verdict),readSdkManifest:manifest("1.2.3")}) as {complete?:unknown;missingAxes?:unknown};
  assert.equal(out.complete,true);assert.deepEqual(out.missingAxes,[]);
 }
}));
test("an unknown review verdict carries no completeness marker either",()=>repo(async(root,rev)=>{
 const out=await runClaudeReview(root,rev,"Fix parser",{query:async function*(){},readSdkManifest:async()=>null}) as {complete?:unknown;missingAxes?:unknown};
 assert.equal(out.complete,undefined);assert.equal(out.missingAxes,undefined);
}));

// MechanicalWorkflows-mwlr9 D1: every behavioural test injects readSdkManifest, so the default binding is pinned by a source-structure guard (R049 style).
/** The lines of a module that resolve the manifest reader, with the exact default binding the review path must keep. */
function defaultManifestBindingProblems(text:string):string[]{
 const problems:string[]=[];
 if(!/import\s*\{\s*defaultReadSdkManifest\s*\}\s*from\s*"\.\/claude-implement\.js"/.test(text))problems.push("defaultReadSdkManifest is not imported from ./claude-implement.js");
 const sites=text.split("\n").filter(line=>/\.readSdkManifest\b/.test(line)&&!/^\s*(?:\/\/|\*)/.test(line)&&!/\binterface\b|\bexport type\b/.test(line)&&/\(\s*\)/.test(line));
 if(sites.length!==1)problems.push("expected exactly one manifest resolution site, found "+sites.length);
 for(const site of sites)if(!/\(\s*options\.readSdkManifest\s*\?\?\s*defaultReadSdkManifest\s*\)\s*\(\s*\)/.test(site))problems.push("default is not the shared resolver: "+site.trim());
 return problems;
}
test("D1 guard: claude-review.ts resolves the manifest through the shared defaultReadSdkManifest",()=>{
 const text=readFileSync(new URL("../src/claude-review.ts",import.meta.url),"utf8");
 assert.deepEqual(defaultManifestBindingProblems(text),[]);
});
test("D1 guard mutation witness: a null-returning, renamed or dropped default binding is caught",()=>{
 const real=readFileSync(new URL("../src/claude-review.ts",import.meta.url),"utf8");
 const site="(options.readSdkManifest??defaultReadSdkManifest)()";
 assert.ok(real.includes(site),"the real binding is present in the source");
 for(const mutant of [
  real.replace(site,"(options.readSdkManifest??(async()=>null))()"),
  real.replace(site,"(options.readSdkManifest??(async()=>\"{}\"))()"),
  real.replace(site,"(options.readSdkManifest??localReader)()"),
  real.replace(site,"options.readSdkManifest!()"),
  real.replace(/import \{defaultReadSdkManifest\} from "\.\/claude-implement\.js";\n/,""),
 ]){
  assert.notEqual(mutant,real);
  assert.notDeepEqual(defaultManifestBindingProblems(mutant),[]);
 }
 assert.deepEqual(defaultManifestBindingProblems(real),[]);
});
