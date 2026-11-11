/** Standalone Node worker smoke: no source imports, network or npm install. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const [artifactPath, expectedDigest] = process.argv.slice(2);
assert.ok(artifactPath && /^sha256:[a-f0-9]{64}$/.test(expectedDigest ?? ""), "artifact and SHA-256 required");
const artifact=readFileSync(artifactPath);
assert.equal("sha256:"+createHash("sha256").update(artifact).digest("hex"),expectedDigest,"artifact digest mismatch");
const tar=gunzipSync(artifact);
const root=mkdtempSync(join(tmpdir(),"mw-container-worker-"));
try {
  for(let offset=0;offset+512<=tar.length;){
    const block=tar.subarray(offset,offset+512);
    const name=block.subarray(0,100).toString("utf8").replace(/\0.*$/s,"");
    if(!name)break;
    const size=Number.parseInt(block.subarray(124,136).toString("utf8").replace(/\0.*$/s,"").trim()||"0",8);
    const type=String.fromCharCode(block[156] ?? 0);
    assert.ok(name.startsWith("package/") && !name.includes("..") && !name.includes("\\"),"archive path escaped package");
    const target=join(root,name);
    if(type==="5")mkdirSync(target,{recursive:true});
    else if(type==="0" || type==="\0"){
      mkdirSync(dirname(target),{recursive:true});
      writeFileSync(target,tar.subarray(offset+512,offset+512+size));
    }else throw Error("unsupported archive entry: "+name);
    offset+=512+Math.ceil(size/512)*512;
  }
  const manifest=JSON.parse(readFileSync(join(root,"package/package.json"),"utf8"));
  assert.equal(manifest.name,"@mechanical/workflows-development");
  assert.equal(manifest.dependencies,undefined,"worker package should contain no provider SDKs");
  const {develop}=await import(pathToFileURL(join(root,"package/dist/index.js")).href);
  const basis={workspaceId:"isolated-worker",revision:"base"};
  const result=await develop({
    discover:async()=>({basis,coverage:"partial",files:[]}),
    compileContext:async()=>{throw Error("partial scope reached context")},
    implement:async()=>{throw Error("partial scope reached agent")},
    verify:async()=>{throw Error("partial scope reached Forge")},
  },{task:"Check native boundary",workspaceId:basis.workspaceId,baseRevision:basis.revision});
  assert.equal(result.kind,"needs_evidence");
  console.log(JSON.stringify({mode:"offline-container-worker",artifactDigest:expectedDigest,library:"installed-from-archive",outcome:result.kind,providerSdkDependencies:0}));
}finally{rmSync(root,{recursive:true,force:true})}
