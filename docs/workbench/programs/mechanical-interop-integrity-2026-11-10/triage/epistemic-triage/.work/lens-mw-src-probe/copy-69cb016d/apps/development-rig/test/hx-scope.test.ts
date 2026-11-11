import test from "node:test";
import assert from "node:assert/strict";
import { discoverTaskScope } from "../dist/hx-scope.js";
import type { HxExecute } from "../dist/hx-scope.js";
type Native=Awaited<ReturnType<HxExecute>>;
const request={task:"Fix parser",workspaceId:"/repo",baseRevision:"a".repeat(40)};
function result(completeness="complete",exitCode=0):Native{return {exitCode,terminalReached:true,coverageSummary:{completeness,licensesAbsence:completeness==="complete",answerCount:1},frames:[{kind:"answer",body:{ordinal:{$int:"1"},ref:{$int:"1"}}},{kind:"answer-coverage",body:{completeness,count:{$int:"1"}}},{kind:"node-claim",seq:1,body:{locator:"src/parser.ts"}}],queryDigest:"sha256:"+"b".repeat(64),revision:request.baseRevision,scopeKind:"task"};}
test("complete typed HX answer preserves coverage and request basis",async()=>{
 const out=await discoverTaskScope(request,async()=>result());
 assert.equal(out.coverage,"complete");assert.equal(out.basis.revision,request.baseRevision);
 assert.equal(out.evidence?.system,"hyper-unix");
 assert.deepEqual(out.files,["src/parser.ts"]);
});
test("partial or unknown HX query cannot be mapped to complete empty files",async()=>{
 for(const r of [result("incomplete",3),result("unknown",0),{...result(),terminalReached:false}]) {
  const out=await discoverTaskScope(request,async()=>r);
  assert.notEqual(out.coverage,"complete");assert.deepEqual(out.files,[]);
 }
});
test("HX basis mismatch or absent native query identity refuses scope",async()=>{
 const bads:Native[]=[{...result(),revision:"f".repeat(40)},{...result(),queryDigest:null}];
 for(const r of bads) {
  const out=await discoverTaskScope(request,async()=>r);
  assert.notEqual(out.coverage,"complete");
 }
});

test("complete Git-tree or filesystem census is not a complete task-relevant scope",async()=>{
 for(const scopeKind of ["filesystem","git-tree",undefined] as const) {
  const r:Native={...result(),...(scopeKind?{scopeKind}:{scopeKind:undefined as never})};
  const out=await discoverTaskScope(request,async()=>r);
  assert.notEqual(out.coverage,"complete");assert.deepEqual(out.files,[]);
 }
});

test("incomplete native dependency query preserves known positive files without authorizing implementation",async()=>{
 const r:Native={...result("incomplete",3),results:[{focus:[{key:{$bytes:Buffer.from("src/parser.ts").toString("base64")}}]}]};
 const out=await discoverTaskScope(request,async()=>r);
 assert.equal(out.coverage,"partial");
 assert.deepEqual(out.files,["src/parser.ts"]);
});

test("HX SDK output-limit refusal never becomes a complete empty task scope",async()=>{
 const out=await discoverTaskScope(request,async()=>{throw Error("SDK_PROTOCOL_LIMIT")});
 assert.equal(out.coverage,"unknown");assert.deepEqual(out.files,[]);
});
test("discoverTaskScope answers complete only when every conjunct holds and each refused complete-looking answer keeps its exact coverage",async()=>{
 const base=result();
 const basis={workspaceId:request.workspaceId,revision:request.baseRevision};
 const cases:ReadonlyArray<readonly [string,Native,"unknown"|"partial"]>=[
  ["exit-nonzero",{...base,exitCode:3},"unknown"],
  ["absence-unlicensed",{...base,coverageSummary:{completeness:"complete",licensesAbsence:false,answerCount:1}},"unknown"],
  ["incomplete-with-licensed-absence",{...base,coverageSummary:{completeness:"incomplete",licensesAbsence:true,answerCount:1}},"partial"],
  ["empty-digest",{...base,queryDigest:""},"unknown"],
  ["answer-count-mismatch",{...base,coverageSummary:{completeness:"complete",licensesAbsence:true,answerCount:2}},"partial"],
  ["blank-locator",{...base,frames:[{kind:"answer",body:{ordinal:{$int:"1"},ref:{$int:"1"}}},{kind:"answer-coverage",body:{completeness:"complete",count:{$int:"1"}}},{kind:"node-claim",seq:1,body:{locator:"  "}}]},"partial"],
  ["unknown-completeness",{...base,coverageSummary:{completeness:"unknown",licensesAbsence:false,answerCount:1}},"unknown"],
 ];
 for(const [name,native,coverage] of cases){
  const out=await discoverTaskScope(request,async()=>native);
  assert.deepEqual(out,{basis,coverage,files:[]},"case "+name);
 }
});
