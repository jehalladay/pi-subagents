import test,{after}from"node:test";
import assert from "node:assert/strict";
import{spawnSync}from"node:child_process";
import{readFileSync,rmSync}from"node:fs";
import{join,dirname}from"node:path";
import{fileURLToPath}from"node:url";
import{createHash}from"node:crypto";
const root=join(dirname(fileURLToPath(import.meta.url)),"../..");
const entry=join(root,"qa/integration/container-worker-smoke.ts");
import{mkdtempSync}from"node:fs";import{tmpdir}from"node:os";
/** Pack the committed library at test time; the gate must pass from a fresh clone without untracked artifacts. */
function packLibrary(){const destination=mkdtempSync(join(tmpdir(),"mw-pack-"));const packed=spawnSync("npm",["pack","--ignore-scripts","--json","--pack-destination",destination],{cwd:join(root,"packages/development"),encoding:"utf8"});if(packed.status!==0)throw new Error("LIBRARY_PACK_FAILED: "+packed.stderr);return join(destination,JSON.parse(packed.stdout)[0].filename)}
const artifact=packLibrary();
/** Remove the pack destination (tarball directory) once every test in this file has finished. */
after(()=>rmSync(dirname(artifact),{recursive:true,force:true}));
function digest(){return"sha256:"+createHash("sha256").update(readFileSync(artifact)).digest("hex")}
test("container worker rejects altered digest before importing archive",()=>{
 const p=spawnSync(process.execPath,[entry,artifact,"sha256:"+"f".repeat(64)],{encoding:"utf8"});
 assert.notEqual(p.status,0);assert.match(p.stderr,/artifact digest mismatch/);assert.equal(p.stdout,"");
});
test("container worker loads source-free Forge artifact and refuses partial scope",()=>{
 const p=spawnSync(process.execPath,[entry,artifact,digest()],{encoding:"utf8"});
 assert.equal(p.status,0,p.stderr);const r=JSON.parse(p.stdout);
 assert.equal(r.outcome,"needs_evidence");assert.equal(r.providerSdkDependencies,0);
});
