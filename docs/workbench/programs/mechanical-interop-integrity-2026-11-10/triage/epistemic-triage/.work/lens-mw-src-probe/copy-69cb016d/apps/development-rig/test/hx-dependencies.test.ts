import test from "node:test";
import assert from "node:assert/strict";
import{spawnSync}from"node:child_process";
import{mkdtempSync,writeFileSync,rmSync}from"node:fs";
import{tmpdir}from"node:os";
import{join}from"node:path";
import{discoverDependencyScope}from"../dist/hx-dependencies.js";
import type {DependencyRead} from "../dist/hx-dependencies.js";
type Native=Awaited<ReturnType<DependencyRead>>;
function git(root:string,...args:string[]):string{const r=spawnSync("git",["-C",root,...args],{encoding:"utf8"});assert.equal(r.status,0,r.stderr);return r.stdout.trim()}
async function repo<T>(fn:(root:string,rev:string)=>Promise<T>):Promise<T>{const root=mkdtempSync(join(tmpdir(),"mw-hx-deps-"));try{git(root,"init","-q");git(root,"config","user.name","Test");git(root,"config","user.email","test@example.invalid");writeFileSync(join(root,"source.ts"),"export const v=1;\n");git(root,"add",".");git(root,"commit","-qm","base");return await fn(root,git(root,"rev-parse","HEAD"))}finally{rmSync(root,{recursive:true,force:true})}}
function native(file:string,complete=false):Native{return{exitCode:complete?0:3,terminalReached:true,coverageSummary:{completeness:complete?"complete":"incomplete",licensesAbsence:complete},results:[{focus:[{key:{$bytes:Buffer.from(file).toString("base64")}}]}],queryDigest:"sha256:"+"f".repeat(64),diagnostics:complete?[]:[{code:"HX-COVERAGE-INCOMPLETE"}]}}
test("native partial import result retains seed and positive dependency without authorizing scope",()=>repo(async(root,rev)=>{
 let queries=0;const out=await discoverDependencyScope(root,"source.ts",{task:"Fix source",workspaceId:root,baseRevision:rev},async()=>{queries++;return native("dep.ts")});
 assert.equal(queries,1);assert.equal(out.coverage,"partial");assert.deepEqual(out.files,["source.ts","dep.ts"]);
 assert.equal(out.basis.revision,rev);assert.equal(out.evidence?.system,"hyper-unix");
 assert.equal(out.evidence?.kind,"dependency-query","the partial arm must label its evidence dependency-query");
}));
test("no native results under partial coverage never become a complete empty set",()=>repo(async(root,rev)=>{
 const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>({...native("dep.ts"),results:[]}));
 assert.equal(out.coverage,"partial");assert.deepEqual(out.files,["source.ts"]);
}));
test("source change during HX read invalidates candidate basis",()=>repo(async(root,rev)=>{
 const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>{writeFileSync(join(root,"source.ts"),"dirty\n");return native("dep.ts",true)});
 assert.equal(out.coverage,"unknown");assert.deepEqual(out.files,[]);
}));
test("complete native import closure alone does not prove complete task scope",()=>repo(async(root,rev)=>{
 const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>native("dep.ts",true));
 assert.notEqual(out.coverage,"complete");assert.deepEqual(out.files,["source.ts","dep.ts"]);
}));
test("blank seed, foreign workspace, stale revision, failed read, nonzero complete answer and moved HEAD each stay unknown with no files",()=>repo(async(root,rev)=>{
 let reads=0;const counting:DependencyRead=async()=>{reads++;return native("dep.ts",true)};
 const request={task:"Fix",workspaceId:root,baseRevision:rev};
 const blank=await discoverDependencyScope(root," ",request,counting);
 assert.equal(blank.coverage,"unknown","blank seed must answer unknown");assert.deepEqual(blank.files,[],"blank seed must answer no files");
 const foreign=await discoverDependencyScope(root,"source.ts",{...request,workspaceId:root+"-other"},counting);
 assert.equal(foreign.coverage,"unknown","foreign workspace must answer unknown");assert.deepEqual(foreign.files,[],"foreign workspace must answer no files");
 const stale=await discoverDependencyScope(root,"source.ts",{...request,baseRevision:"0".repeat(40)},counting);
 assert.equal(stale.coverage,"unknown","stale revision must answer unknown");assert.deepEqual(stale.files,[],"stale revision must answer no files");
 assert.equal(reads,0,"blank seed, foreign workspace and stale revision must not call the read");
 const failed=await discoverDependencyScope(root,"source.ts",request,async()=>{throw new Error("hx read failed")});
 assert.equal(failed.coverage,"unknown","failed read must answer unknown");assert.deepEqual(failed.files,[],"failed read must never answer partial files");
 const nonzero=await discoverDependencyScope(root,"source.ts",request,async()=>({...native("dep.ts",true),exitCode:3}));
 assert.equal(nonzero.coverage,"unknown","complete coverage with a nonzero exit code must answer unknown");
 assert.deepEqual(nonzero.files,[],"a nonzero exit must answer no files");
 const moved=await discoverDependencyScope(root,"source.ts",request,async()=>{git(root,"commit","-q","--allow-empty","-m","moved");return native("dep.ts",true)});
 assert.equal(moved.coverage,"unknown","a HEAD that moved during the read must answer unknown");assert.deepEqual(moved.files,[],"a moved HEAD must answer no files");
}));
test("a nonzero-exit unknown answer still carries the native query digest as hyper-unix dependency-query evidence",()=>repo(async(root,rev)=>{
 const request={task:"Fix",workspaceId:root,baseRevision:rev};
 const nonzero=await discoverDependencyScope(root,"source.ts",request,async()=>({...native("dep.ts",true),exitCode:3}));
 assert.equal(nonzero.coverage,"unknown","a nonzero exit must answer unknown");assert.deepEqual(nonzero.files,[],"a nonzero exit must answer no files");
 assert.equal(nonzero.evidence?.id,"sha256:"+"f".repeat(64),"the unknown arm must keep the native query digest as its evidence id");
 assert.equal(nonzero.evidence?.system,"hyper-unix","the unknown arm must keep hyper-unix as its evidence system");
 assert.equal(nonzero.evidence?.kind,"dependency-query","the unknown arm must label its evidence dependency-query");
}));
test("focus rows list a repeated file once and skip an empty path key, keeping seed-first order",()=>repo(async(root,rev)=>{
 const key=(file:string)=>({key:{$bytes:Buffer.from(file).toString("base64")}});
 const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>({...native("dep.ts"),results:[{focus:[key("source.ts"),key("dep.ts"),key("dep.ts"),key("")]}]}));
 assert.equal(out.coverage,"partial","an incomplete answer must stay partial");
 assert.deepEqual(out.files,["source.ts","dep.ts"],"a repeated focus file must list once and an empty path key must be skipped");
}));
test("an empty native query digest answers partial with seed-first files and carries no evidence",()=>repo(async(root,rev)=>{
 const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>({...native("dep.ts"),queryDigest:""}));
 assert.equal(out.coverage,"partial","an empty digest must not change the coverage answer");
 assert.deepEqual(out.files,["source.ts","dep.ts"],"an empty digest must keep the seed-first file list");
 assert.equal(out.evidence,undefined,"an empty digest must never mint hyper-unix evidence");
}));
test("a truthy non-string native query digest answers partial with seed-first files and carries no evidence",()=>repo(async(root,rev)=>{
 for(const digest of[42,true,{sha:"sha256:"+"f".repeat(64)},["sha256:"+"f".repeat(64)]]){
  const out=await discoverDependencyScope(root,"source.ts",{task:"Fix",workspaceId:root,baseRevision:rev},async()=>({...native("dep.ts"),queryDigest:digest as unknown as string}));
  const shape=JSON.stringify(digest);
  assert.equal(out.coverage,"partial",`a non-string digest ${shape} must not change the coverage answer`);
  assert.deepEqual(out.files,["source.ts","dep.ts"],`a non-string digest ${shape} must keep the seed-first file list`);
  assert.equal(out.evidence,undefined,`a non-string digest ${shape} must never mint hyper-unix evidence`);
 }
}));
