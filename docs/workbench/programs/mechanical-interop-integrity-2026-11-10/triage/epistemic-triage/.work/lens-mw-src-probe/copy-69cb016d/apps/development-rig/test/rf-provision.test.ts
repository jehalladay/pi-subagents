import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync, rmSync, existsSync, realpathSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { provisionRfTaskContext } from "../dist/rf-provision.js";
import { assertNoLeakedChildren, pidAlive, withoutLeakedChildren } from "./support/leak-guard.ts";
import { findOnPath, resolveRfBinary, RF_UNAVAILABLE_SKIP } from "./support/rf-binary.ts";

/** The real rf the native tests drive: MECHANICAL_RF_BINARY, else a PATH lookup; undefined (a declared skip) under a hermetic env that provides neither. */
const realRf=resolveRfBinary(process.env);
const nativeRf={skip:realRf===undefined?RF_UNAVAILABLE_SKIP:false};
function git(root:string,...args:string[]):string{const r=spawnSync("git",["-C",root,...args],{encoding:"utf8"});assert.equal(r.status,0,r.stderr);return r.stdout.trim()}
async function repo<T>(fn:(root:string)=>Promise<T>,ignore=true,forgeToml=true):Promise<T>{const root=mkdtempSync(join(tmpdir(),"mw-rf-provision-"));try{
 git(root,"init","-q");git(root,"config","user.name","Test");git(root,"config","user.email","test@example.invalid");
 if(forgeToml)writeFileSync(join(root,"forge.toml"),'[package]\nname="rf-probe"\ntype="code"\nversion="0.1.0"\n[build]\nbackend="typescript"\n');
 if(ignore)writeFileSync(join(root,".gitignore"),"/.reactive-fiber/\n");
 git(root,"add",".");git(root,"commit","-qm","base");return await fn(root);
}finally{rmSync(root,{recursive:true,force:true})}}
test("RF provisioning refuses workspace without ignored RF state before effect",()=>repo(async root=>{
 await assert.rejects(()=>provisionRfTaskContext(root),/RF_STATE_NOT_IGNORED/);
 assert.equal(existsSync(join(root,".reactive-fiber")),false);
},false));
test("RF provisioning creates a task-provider component only in an ignored state directory",nativeRf,()=>repo(async root=>{
 const out=await withRealRf(()=>provisionRfTaskContext(root));
 assert.equal(out.kind,"provisioned");
 assert.equal(out.workspace,realpathSync(root));
 assert.equal(git(root,"status","--porcelain"),"");
 const definition=readFileSync(join(root,".reactive-fiber/components/declarative/mechanical.task.toml"),"utf8");
 assert.match(definition,/\$\{provider:task\}/);
 const native=spawnSync(realRf!,["context","render","--workspace",root,"--model","claude-opus-5","--task","Task: Test RF\nSource revision: "+git(root,"rev-parse","HEAD"),"--strict","--json","--no-input"],{encoding:"utf8"});
 assert.equal(native.status,0,native.stderr);const result=JSON.parse(native.stdout);assert.equal(result.ok,true);assert.match(result.result.output.text,/Source revision:/);
}));
test("RF provisioning refuses a second create rather than overwriting a viewer's definitions",nativeRf,()=>repo(async root=>{
 await withRealRf(()=>provisionRfTaskContext(root));
 await assert.rejects(()=>provisionRfTaskContext(root),/RF_ALREADY_PROVISIONED/);
}));
import { chmodSync } from "node:fs";
/** Runs fn with MECHANICAL_RF_BINARY naming the resolved real rf, so the provisioner never depends on a bare-name PATH lookup. */
async function withRealRf<T>(fn:()=>Promise<T>):Promise<T>{
 const saved=process.env["MECHANICAL_RF_BINARY"];process.env["MECHANICAL_RF_BINARY"]=realRf!;
 try{return await fn()}finally{if(saved===undefined)delete process.env["MECHANICAL_RF_BINARY"];else process.env["MECHANICAL_RF_BINARY"]=saved}
}
/** An rf shim first on PATH: the host only ever sees what the rf executable prints and exits with. */
async function withRfShim<T>(mode:string,fn:()=>Promise<T>):Promise<T>{
 const bin=mkdtempSync(join(tmpdir(),"mw-rf-shim-"));
 writeFileSync(join(bin,"rf"),['#!/usr/bin/env bash','ws=""; prev=""; for a in "$@"; do if [ "$prev" = "--workspace" ]; then ws="$a"; fi; prev="$a"; done',
  'case "$MW_RF_SHIM_MODE" in',
  ' exit2) echo "rf shim refused" >&2; exit 2;;',
  ' nonjson) echo "not json"; exit 0;;',
  ' nullans) echo "null"; exit 0;;',
  ' nodiag) echo \'{"ok":false}\'; exit 0;;',
  ' notok) echo \'{"ok":false,"diagnostics":[{"code":"RF_SHIM_REFUSED"}]}\'; exit 0;;',
  ' emptyobj) echo \'{}\'; exit 0;;',
  ' okall|stray|graphbad|daemon) if [ "$1" = "init" ]; then mkdir -p "$ws/.reactive-fiber"; fi;',
  '  if [ "$MW_RF_SHIM_MODE" = "daemon" ] && [ "$1" = "init" ]; then sleep 20 & echo $! >> "$MW_RF_PID_FILE"; fi;',
  '  if [ "$1" = "component" ] && [ "$2" = "create" ]; then mkdir -p "$ws/.reactive-fiber/components/declarative"; printf \'content = "mechanical.task has no content yet."\\n\' > "$ws/.reactive-fiber/components/declarative/mechanical.task.toml"; fi;',
  '  if [ "$MW_RF_SHIM_MODE" = "stray" ] && [ "$1" = "graph" ]; then printf x > "$ws/stray.txt"; fi;',
  '  if [ "$MW_RF_SHIM_MODE" = "graphbad" ] && [ "$1" = "graph" ]; then echo \'{"ok":false,"diagnostics":[{"code":"RF_SHIM_GRAPH_INVALID"}]}\'; exit 0; fi;',
  '  echo \'{"ok":true}\'; exit 0;;',
  ' template) if [ "$1" = "init" ]; then mkdir -p "$ws/.reactive-fiber"; fi;',
  '  if [ "$1" = "component" ]; then mkdir -p "$ws/.reactive-fiber/components/declarative"; printf \'content = "a different starter body"\\n\' > "$ws/.reactive-fiber/components/declarative/mechanical.task.toml"; fi;',
  '  echo \'{"ok":true}\'; exit 0;;',
  ' *) echo "unknown shim mode" >&2; exit 70;;','esac',''].join("\n"));
 chmodSync(join(bin,"rf"),0o755);
 const saved={path:process.env["PATH"],mode:process.env["MW_RF_SHIM_MODE"],binary:process.env["MECHANICAL_RF_BINARY"]};
 delete process.env["MECHANICAL_RF_BINARY"];
 process.env["PATH"]=bin+":"+(saved.path??"");process.env["MW_RF_SHIM_MODE"]=mode;
 try{return await fn()}finally{
  process.env["PATH"]=saved.path??"";if(saved.binary!==undefined)process.env["MECHANICAL_RF_BINARY"]=saved.binary;if(saved.mode===undefined)delete process.env["MW_RF_SHIM_MODE"];else process.env["MW_RF_SHIM_MODE"]=saved.mode;
  rmSync(bin,{recursive:true,force:true});
 }
}
test("an rf that exits nonzero, prints no JSON envelope, or answers ok false is RF_PROVISION_FAILED carrying what rf said, with no RF state left behind",()=>repo(async root=>{
 const modes:ReadonlyArray<readonly [string,RegExp]>=[["exit2",/^RF_PROVISION_FAILED: .*rf shim refused/s],["nonjson",/^RF_PROVISION_FAILED: invalid RF JSON envelope$/],["notok",/^RF_PROVISION_FAILED: \[\{"code":"RF_SHIM_REFUSED"\}\]$/]];
 for(const [mode,expected] of modes){
  await withRfShim(mode,()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&expected.test(e.message),mode));
  assert.equal(existsSync(join(root,".reactive-fiber")),false,mode);
 }
}));
test("a starter component body that differs from the native format is RF_PROVISION_TEMPLATE_CHANGED and the body is left as rf wrote it",()=>repo(async root=>{
 await withRfShim("template",()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&e.message.startsWith("RF_PROVISION_TEMPLATE_CHANGED")));
 assert.equal(readFileSync(join(root,".reactive-fiber/components/declarative/mechanical.task.toml"),"utf8"),'content = "a different starter body"\n');
}));
test("an rf answer that is JSON null or ok false without diagnostics is RF_PROVISION_FAILED carrying an empty diagnostics list",()=>repo(async root=>{
 for(const mode of ["nullans","nodiag","emptyobj"]){
  await withRfShim(mode,()=>assert.rejects(()=>provisionRfTaskContext(root),/^Error: RF_PROVISION_FAILED: \[\]$/,mode));
  assert.equal(existsSync(join(root,".reactive-fiber")),false,mode);
 }
}));
test("a workspace with an untracked file is WORKSPACE_NOT_CLEAN before any rf effect, leaving no RF state behind",()=>repo(async root=>{
 writeFileSync(join(root,"stray.txt"),"untracked\n");
 await withRfShim("exit2",()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&e.message.startsWith("WORKSPACE_NOT_CLEAN")));
 assert.equal(existsSync(join(root,".reactive-fiber")),false);
}));
test("a provisioning run that leaves an untracked file outside the ignored RF state is WORKSPACE_NOT_CLEAN after the last rf call",()=>repo(async root=>{
 await withRfShim("stray",()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&e.message.startsWith("WORKSPACE_NOT_CLEAN")));
 assert.equal(existsSync(join(root,"stray.txt")),true);
}));
test("a clean committed Git workspace without forge.toml is FORGE_PACKAGE_ROOT_REQUIRED before any rf call or RF state",()=>repo(async root=>{
 await withRfShim("exit2",()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&e.message.startsWith("FORGE_PACKAGE_ROOT_REQUIRED")));
 assert.equal(existsSync(join(root,".reactive-fiber")),false);
},true,false));
test("an rf graph validate answer of ok false is RF_PROVISION_FAILED carrying that graph diagnostic",()=>repo(async root=>{
 await withRfShim("graphbad",()=>assert.rejects(()=>provisionRfTaskContext(root),(e:unknown)=>e instanceof Error&&e.message==='RF_PROVISION_FAILED: [{"code":"RF_SHIM_GRAPH_INVALID"}]'));
}));
test("the provisioned answer names the resolved package root even when the caller passed a symlink to it",()=>repo(async root=>{
 const holder=mkdtempSync(join(tmpdir(),"mw-rf-link-"));const link=join(holder,"pkg-link");symlinkSync(root,link);
 try{
  const out=await withRfShim("okall",()=>provisionRfTaskContext(link));
  assert.equal(out.kind,"provisioned");assert.notEqual(link,realpathSync(root));assert.equal(out.workspace,realpathSync(root));
 }finally{rmSync(holder,{recursive:true,force:true})}
}));
after(()=>assertNoLeakedChildren("rf-provision suite"));
test("a provisioning run whose rf left a background process holding the pipes returns promptly, reaps that process and leaves no live child (MechanicalWorkflows-lt2z)",()=>repo(async root=>{
 const holder=mkdtempSync(join(tmpdir(),"mw-rf-pids-"));const pidFile=join(holder,"pids");process.env["MW_RF_PID_FILE"]=pidFile;
 const started=Date.now();
 try{
  const out=await withoutLeakedChildren("rf-provision daemon",()=>withRfShim("daemon",()=>provisionRfTaskContext(root)));
  assert.equal(out.kind,"provisioned");assert.ok(Date.now()-started<15_000,"did not wait for the background process's 20 s");
  const pids=readFileSync(pidFile,"utf8").trim().split("\n").map(Number);assert.equal(pids.length,1);
  const end=Date.now()+3000;while(pidAlive(pids[0]!)&&Date.now()<end)await new Promise(r=>setTimeout(r,25));
  assert.equal(pidAlive(pids[0]!),false,"background process reaped");
 }finally{delete process.env["MW_RF_PID_FILE"];rmSync(holder,{recursive:true,force:true})}
}));

test("MECHANICAL_RF_BINARY names the rf executable, so provisioning works with no rf on PATH (MechanicalWorkflows-glda4)",()=>repo(async root=>{
 const holder=mkdtempSync(join(tmpdir(),"mw-rf-named-"));const calls=join(holder,"calls");
 const named=join(holder,"my-rf");
 const gitDir=join(holder,"git-only");mkdirSync(gitDir);const realGit=findOnPath("git",process.env);assert.ok(realGit!==undefined,"git is on PATH");symlinkSync(realGit!,join(gitDir,"git"));
 // A node script, so the shim needs nothing but the absolute interpreter on its restricted PATH.
 writeFileSync(named,["#!"+process.execPath,'const fs=require("node:fs"),path=require("node:path");const a=process.argv.slice(2);',
  'fs.appendFileSync('+JSON.stringify(calls)+',a[0]+"\\n");const ws=a[a.indexOf("--workspace")+1];',
  'if(a[0]==="init")fs.mkdirSync(path.join(ws,".reactive-fiber"),{recursive:true});',
  'if(a[0]==="component"&&a[1]==="create"){const d=path.join(ws,".reactive-fiber/components/declarative");fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,"mechanical.task.toml"),\'content = "mechanical.task has no content yet."\\n\')}',
  'process.stdout.write(\'{"ok":true}\');',''].join("\n"));
 chmodSync(named,0o755);
 const saved={path:process.env["PATH"],binary:process.env["MECHANICAL_RF_BINARY"]};
 process.env["PATH"]=gitDir;process.env["MECHANICAL_RF_BINARY"]=named;
 try{
  const out=await provisionRfTaskContext(root);
  assert.equal(out.kind,"provisioned");assert.equal(findOnPath("rf",process.env),undefined);
  assert.match(readFileSync(calls,"utf8"),/^init$/m);
 }finally{
  process.env["PATH"]=saved.path??"";if(saved.binary===undefined)delete process.env["MECHANICAL_RF_BINARY"];else process.env["MECHANICAL_RF_BINARY"]=saved.binary;
  rmSync(holder,{recursive:true,force:true});
 }
}));
test("resolveRfBinary prefers MECHANICAL_RF_BINARY, falls back to a PATH lookup, and returns undefined when neither names an executable rf",()=>{
 const holder=mkdtempSync(join(tmpdir(),"mw-rf-resolve-"));
 try{
  const exe=join(holder,"rf");writeFileSync(exe,"#!/bin/sh\n");chmodSync(exe,0o755);
  const plain=join(holder,"plain");writeFileSync(plain,"x");chmodSync(plain,0o644);
  assert.equal(resolveRfBinary({PATH:"",MECHANICAL_RF_BINARY:exe}),exe);
  assert.equal(resolveRfBinary({PATH:"/nonexistent:"+holder}),exe);
  assert.equal(resolveRfBinary({PATH:holder,MECHANICAL_RF_BINARY:plain}),undefined);
  assert.equal(resolveRfBinary({PATH:"/nonexistent"}),undefined);
  assert.equal(resolveRfBinary({}),undefined);
  assert.equal(RF_UNAVAILABLE_SKIP,"RF_UNAVAILABLE_UNDER_HERMETIC");
 }finally{rmSync(holder,{recursive:true,force:true})}
});
