import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { materializeWorkspace, workspaceIdentity } from "../dist/workspace-materialize.js";
import type { WorkspaceSource } from "../dist/workspace-materialize.js";

function git(root:string,...args:string[]):string{const r=spawnSync("git",["-C",root,...args],{encoding:"utf8"});assert.equal(r.status,0,r.stderr);return r.stdout.trim()}
interface Fixture{readonly bundle:string;readonly first:string;readonly second:string;readonly scratch:string}
async function withFixture<T>(fn:(f:Fixture)=>Promise<T>):Promise<T>{
 const scratch=mkdtempSync(join(tmpdir(),"mw-materialize-"));
 try{
  const repo=join(scratch,"origin");spawnSync("git",["init","-q",repo]);git(repo,"config","user.name","t");git(repo,"config","user.email","t@example.invalid");
  writeFileSync(join(repo,"forge.toml"),'[package]\nname="m"\ntype="code"\nversion="0.1.0"\n');writeFileSync(join(repo,"a.txt"),"one\n");git(repo,"add",".");git(repo,"commit","-qm","first");const first=git(repo,"rev-parse","HEAD");
  writeFileSync(join(repo,"a.txt"),"two\n");git(repo,"commit","-qam","second");const second=git(repo,"rev-parse","HEAD");
  const bundle=join(scratch,"source.bundle");git(repo,"bundle","create",bundle,"--all");
  return await fn({bundle,first,second,scratch});
 }finally{rmSync(scratch,{recursive:true,force:true})}
}
test("a bundle source is identified by its content digest, never by the caller's path or cwd",()=>withFixture(async f=>{
 const source:WorkspaceSource={kind:"git-bundle",location:f.bundle,revision:f.first};
 const id=workspaceIdentity(source);
 assert.match(id,/^git-bundle:sha256:[0-9a-f]{64}$/);assert.ok(!id.includes(f.scratch));
 const copy=join(f.scratch,"elsewhere.bundle");writeFileSync(copy,readFileSync(f.bundle));
 assert.equal(workspaceIdentity({...source,location:copy}),id,"same bytes, same identity regardless of path");
 const before=process.cwd();process.chdir(f.scratch);
 try{assert.equal(workspaceIdentity(source),id)}finally{process.chdir(before)}
}));
test("materialization checks out exactly the requested revision under the host-provided directory",()=>withFixture(async f=>{
 const into=join(f.scratch,"host-slot");
 const out=await materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:f.first},{into});
 assert.ok(out.root.startsWith(into));assert.equal(git(out.root,"rev-parse","HEAD"),f.first);assert.equal(out.revision,f.first);
 assert.equal(readFileSync(join(out.root,"a.txt"),"utf8"),"one\n");assert.equal(git(out.root,"status","--porcelain"),"");
 assert.equal(out.workspaceId,workspaceIdentity({kind:"git-bundle",location:f.bundle,revision:f.first}));
 const again=await materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:f.second},{into:join(f.scratch,"slot-2")});
 assert.equal(again.workspaceId,out.workspaceId,"identity is the source, not the revision or the slot");assert.equal(git(again.root,"rev-parse","HEAD"),f.second);
}));
test("a revision the source does not contain refuses with a typed reason and leaves no checkout behind",()=>withFixture(async f=>{
 const into=join(f.scratch,"slot-missing");
 await assert.rejects(()=>materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:"f".repeat(40)},{into}),/WORKSPACE_REVISION_UNAVAILABLE/);
 assert.equal(existsSync(join(into,"checkout")),false);
}));
test("caller-local paths, relative slots and non-pinned revisions are refused before any git call",()=>withFixture(async f=>{
 await assert.rejects(()=>materializeWorkspace({kind:"git-repository",location:"/home/someone/repo",revision:f.first},{into:join(f.scratch,"s1")}),/WORKSPACE_SOURCE_LOCAL_PATH_REFUSED/);
 await assert.rejects(()=>materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:"main"},{into:join(f.scratch,"s2")}),/WORKSPACE_REVISION_NOT_PINNED/);
 await assert.rejects(()=>materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:f.first},{into:"relative/slot"}),/WORKSPACE_SLOT_NOT_ABSOLUTE/);
 assert.throws(()=>workspaceIdentity({kind:"git-repository",location:"/abs/path",revision:f.first}),/WORKSPACE_SOURCE_LOCAL_PATH_REFUSED/);
 assert.equal(workspaceIdentity({kind:"git-repository",location:"https://example.invalid/org/repo.git",revision:f.first}),"git-repository:https://example.invalid/org/repo.git");
}));
test("MW-053 guards: unanchored and file URLs and abbreviated revisions are refused before the host slot is touched, and a refused materialization keeps host-owned files and the slot checkout root",()=>withFixture(async f=>{
 for(const location of ["/srv/mirror/https://example.invalid/org/repo.git","file:///home/someone/repo"]){
  assert.throws(()=>workspaceIdentity({kind:"git-repository",location,revision:f.first}),/WORKSPACE_SOURCE_LOCAL_PATH_REFUSED/,"location "+location);
 }
 const abbreviated=join(f.scratch,"slot-abbreviated");
 await assert.rejects(()=>materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:f.first.slice(0,12)},{into:abbreviated}),/WORKSPACE_REVISION_NOT_PINNED/,"abbreviated revision");
 assert.equal(existsSync(abbreviated),false,"a refused revision creates nothing under the host slot");
 const host=mkdtempSync(join(f.scratch,"slot-host-owned-"));writeFileSync(join(host,"host-owned.txt"),"keep\n");
 await assert.rejects(()=>materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:"f".repeat(40)},{into:host}),/WORKSPACE_REVISION_UNAVAILABLE/,"unavailable revision into a host-owned slot");
 assert.equal(readFileSync(join(host,"host-owned.txt"),"utf8"),"keep\n","a refusal never deletes host-owned files");
 assert.equal(existsSync(join(host,"checkout")),false);
 const out=await materializeWorkspace({kind:"git-bundle",location:f.bundle,revision:f.first},{into:host});
 assert.equal(out.root,join(host,"checkout"));assert.equal(readFileSync(join(host,"host-owned.txt"),"utf8"),"keep\n");
}));
