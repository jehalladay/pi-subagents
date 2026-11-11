import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
/** Test hygiene: a suite that makes a temp directory must remove it, or each gate run leaks directories and inodes under /tmp (pack-hygiene.test.ts pins the same law for packLibrary). */
const here=fileURLToPath(new URL(".",import.meta.url));
const sites=[
 ["graph-policy-replay","graph-policy-replay.test.ts",["mw-replay-","mw-replay-opposed-","mw-replay-tie-"]],
 ["graph-policy-advice","graph-policy-advice.test.ts",["mw-gp-config-"]],
 ["select-bead-cli","select-bead-cli.test.ts",["mw-store-","mw-gp-cfg-","mw-gp-rec-"]],
] as const;
for(const [label,file,prefixes] of sites){
 test(`${label} tests leave no ${prefixes.join(", ")} directory under a private TMPDIR`,()=>{
  const scratch=mkdtempSync(join(tmpdir(),"mw-tmpdir-hygiene-"));
  try{
   const env:NodeJS.ProcessEnv={...process.env,TMPDIR:scratch};
   // A nested runner would otherwise inherit the parent's child-process protocol and stay silent.
   delete env.NODE_TEST_CONTEXT;
   const run=spawnSync(process.execPath,["--test","--test-reporter=spec",join(here,file)],{encoding:"utf8",env});
   assert.equal(run.status,0,run.stderr+run.stdout);
   // A vacuous green (no test ran) would prove nothing about residue.
   const ran=/ℹ pass (\d+)/.exec(run.stdout);
   assert.ok(ran&&Number(ran[1])>0,`${label} ran no passing test:\n${run.stdout}`);
   const residue=readdirSync(scratch);
   const leaked=residue.filter(entry=>prefixes.some(prefix=>entry.startsWith(prefix)));
   assert.deepEqual(leaked,[],`${label} leaked temp directories`);
   // The listed prefixes name today's known leaks only; an mkdtemp under any other name must fail too, so the whole private TMPDIR has to end empty.
   assert.deepEqual(residue,[],`${label} left entries under the private TMPDIR that no listed prefix names`);
  }finally{rmSync(scratch,{recursive:true,force:true})}
 });
}
