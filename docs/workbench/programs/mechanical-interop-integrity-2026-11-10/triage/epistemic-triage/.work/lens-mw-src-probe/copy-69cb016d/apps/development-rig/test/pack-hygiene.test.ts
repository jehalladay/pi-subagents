import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
/** Test hygiene: a suite that packs the library must remove its pack destination, or each gate run leaks a /tmp/mw-pack-* directory and a tarball. */
const here=fileURLToPath(new URL(".",import.meta.url));
const sites=[
 ["development-rig installed-host",join(here,"installed-host.test.ts")],
 ["qa container-worker",join(here,"../../../qa/integration/container-worker.test.ts")],
] as const;
for(const [label,file] of sites){
 test(`${label} packLibrary leaves no mw-pack-* directory under a private TMPDIR`,()=>{
  const scratch=mkdtempSync(join(tmpdir(),"mw-pack-hygiene-"));
  try{
   const env:NodeJS.ProcessEnv={...process.env,TMPDIR:scratch};
   // A nested runner would otherwise inherit the parent's child-process protocol and stay silent.
   delete env.NODE_TEST_CONTEXT;
   // The pattern matches no test name: module-level packLibrary still runs, the suites themselves are skipped.
   const run=spawnSync(process.execPath,["--test-name-pattern=^no such test name$",file],{encoding:"utf8",env});
   assert.equal(run.status,0,run.stderr+run.stdout);
   const leaked=readdirSync(scratch).filter(entry=>entry.startsWith("mw-pack-"));
   assert.deepEqual(leaked,[],`${label} leaked pack destinations`);
  }finally{rmSync(scratch,{recursive:true,force:true})}
 });
}
