import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { invokeInstalledDevelopment } from "../dist/installed-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import type { DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";
type InstalledOptions=Omit<PinnedHostOptions,"load">;
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
/** Pack the committed library from its built source at test time; never depend on an untracked artifact. */
function packLibrary(){
 const library=fileURLToPath(new URL("../../../packages/development",import.meta.url));
 const destination=mkdtempSync(join(tmpdir(),"mw-pack-"));
 const packed=spawnSync("npm",["pack","--ignore-scripts","--json","--pack-destination",destination],{cwd:library,encoding:"utf8"});
 if(packed.status!==0)throw new Error("LIBRARY_PACK_FAILED: "+packed.stderr);
 const [first]=JSON.parse(packed.stdout) as {filename:string}[];
 if(!first)throw new Error("LIBRARY_PACK_FAILED: npm pack reported nothing");
 return join(destination,first.filename);
}
const packedLibrary=packLibrary();
/** Remove the pack destination (tarball directory) once every test in this file has finished. */
after(()=>rmSync(dirname(packedLibrary),{recursive:true,force:true}));

const name = "mechanical-workflows-development-0.1.0.tgz";
const digest = (bytes: Buffer | string) => "sha256:" + createHash("sha256").update(bytes).digest("hex");
const descriptor = JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url), "utf8")) as EntrypointDescriptor;
const request = {task:"Run from isolated artifact", workspaceId:"repo-A", baseRevision:"base-1"};
const basis: SubjectBasis = {workspaceId:request.workspaceId,revision:request.baseRevision};
const updated: SubjectBasis = {workspaceId:request.workspaceId,revision:"candidate-1"};
function services(seen: string[]=[]): DevelopmentServices {return {
 discover:async()=>{seen.push("discover");return {basis,coverage:"complete" as const,files:["src/a.ts"]}},
 compileContext:async()=>{seen.push("context");return {basis,text:"plain test"}},
 implement:async()=>{seen.push("implement");return {basis:updated,parentBasis:basis}},
 verify:async()=>{seen.push("verify");return {basis:updated,verdict:"passed" as const,evidence:{system:"forge",kind:"operation",id:"op-installed"}}},
}}
async function fixture<T>(fn:(root:string)=>Promise<T>):Promise<T>{
 const root=mkdtempSync(join(tmpdir(),"mw-installed-host-"));
 try {return await fn(root)} finally {rmSync(root,{recursive:true,force:true})}
}
function cfg(path:string,overrides:Partial<InstalledOptions>={}): InstalledOptions {return {artifactPath:path,artifactDigest:digest(readFileSync(path)),descriptor,entrypointId:descriptor.id,contractVersion:descriptor.schema,services:services(),...overrides}}
test("installed pinned host runs develop from a real local tarball, no source import",()=>fixture(async root=>{
 const tarball=join(root,name);writeFileSync(tarball,readFileSync(packedLibrary));
 const seen:string[]=[];const out=await invokeInstalledDevelopment(cfg(tarball,{services:services(seen)}),request);
 assert.equal(out.kind,"verified_candidate");assert.deepEqual(seen,["discover","context","implement","verify"]);
 assert.equal(existsSync(join(root,"node_modules")),false,"install must be isolated, not beside caller's artifact");
}));
test("wrong artifact digest refuses before install or callback",()=>fixture(async root=>{
 const tarball=join(root,name);writeFileSync(tarball,readFileSync(packedLibrary));
 const seen:string[]=[];
 await assert.rejects(()=>invokeInstalledDevelopment(cfg(tarball,{artifactDigest:"sha256:"+"f".repeat(64),services:services(seen)}),request),/ENTRYPOINT_ARTIFACT_MISMATCH/);
 assert.deepEqual(seen,[]);
}));
test("malformed input refuses before install and before service callbacks",()=>fixture(async root=>{
 const tarball=join(root,name);writeFileSync(tarball,readFileSync(packedLibrary));
 const seen:string[]=[];
 await assert.rejects(()=>invokeInstalledDevelopment(cfg(tarball,{services:services(seen)}),{...request,token:"never"}),/ENTRYPOINT_INPUT_INVALID/);
 assert.deepEqual(seen,[]);
}));

test("local installed artifact is still pinned after the npm installation",()=>fixture(async root=>{
 const tarball=join(root,name);writeFileSync(tarball,readFileSync(packedLibrary));
 const original=readFileSync(tarball), expected=digest(original);
 // Verification must bind the exact bytes installed, not a path later overwritten.
 const out=await invokeInstalledDevelopment(cfg(tarball,{artifactDigest:expected}),request);
 assert.equal(out.kind,"verified_candidate");
}));
import { symlinkSync, realpathSync } from "node:fs";
test("a symlinked TMPDIR never misfires ENTRYPOINT_INSTALL_OUTSIDE_ROOT: the install root and the installed package are compared as realpaths and the pinned host still runs develop",()=>fixture(async root=>{
 const real=mkdtempSync(join(tmpdir(),"mw-tmp-real-"));const link=join(root,"tmp-link");symlinkSync(real,link);
 assert.notEqual(realpathSync(link),link);
 const saved=process.env["TMPDIR"];process.env["TMPDIR"]=link;
 try{
  const seen:string[]=[];
  const out=await invokeInstalledDevelopment(cfg(packedLibrary,{services:services(seen)}),request);
  assert.equal(out.kind,"verified_candidate");assert.deepEqual(seen,["discover","context","implement","verify"]);
 }finally{
  if(saved===undefined)delete process.env["TMPDIR"];else process.env["TMPDIR"]=saved;
  rmSync(real,{recursive:true,force:true});
 }
}));
