import test from "node:test";
import assert from "node:assert/strict";
import { claimBeadsWork } from "../dist/beads-claim.js";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root=mkdtempSync(join(tmpdir(),"mw-claim-"));const issue="MW-42";
process.on("exit",()=>rmSync(root,{recursive:true,force:true}));
import { spawnSync } from "node:child_process";
const g=spawnSync("git",["init","-q",root],{encoding:"utf8"});assert.equal(g.status,0,g.stderr);
const set=spawnSync("git",["-C",root,"config","user.name","agent"],{encoding:"utf8"});assert.equal(set.status,0,set.stderr);
test("explicit claim calls Beads once and confirms native in-progress issue",async()=>{
 const calls:{argv:readonly string[];cwd:string}[]=[];
 const out=await claimBeadsWork(root,issue,async(argv,cwd)=>{
  calls.push({argv,cwd});
  return argv.includes("update")?{stdout:JSON.stringify({id:issue,status:"in_progress",assignee:"agent"}),stderr:"",exitCode:0}
    :{stdout:JSON.stringify([{id:issue,status:"in_progress",assignee:"agent"}]),stderr:"",exitCode:0};
 });
 assert.equal(out.issueId,issue);assert.equal(out.status,"in_progress");
 assert.equal(calls.filter(x=>x.argv.includes("update")).length,1);
 assert.ok(calls.every(x=>x.cwd===root));
});
test("ambiguous claim response is not retried; authoritative show establishes state",async()=>{
 let claims=0,reads=0;
 const out=await claimBeadsWork(root,issue,async argv=>{
  if(argv.includes("update")){claims++;return{stdout:"",stderr:"transport lost",exitCode:1}}
  reads++;return{stdout:JSON.stringify([{id:issue,status:"in_progress",assignee:"agent"}]),stderr:"",exitCode:0};
 });
 assert.equal(out.status,"in_progress");assert.equal(claims,1);assert.equal(reads,1);
});
test("claim with unknown authoritative state refuses rather than starting agent",async()=>{
 let claims=0;
 await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>{
  if(argv.includes("update")){claims++;return{stdout:"",stderr:"timeout",exitCode:1}}
  return{stdout:"[]",stderr:"",exitCode:0};
 }),/BEADS_CLAIM_UNCERTAIN/);
 assert.equal(claims,1);
});

test("another actor's in-progress issue cannot certify our failed claim",async()=>{
 await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")
  ? {stdout:"",stderr:"already claimed",exitCode:1}
  : {stdout:JSON.stringify([{id:issue,status:"in_progress",assignee:"someone-else"}]),stderr:"",exitCode:0}),/BEADS_CLAIM_UNCERTAIN/);
});
test("a blank directory or issue id, or a workspace with no attributable actor, is BEADS_CLAIM_INVALID before any bd call",async()=>{
 let calls=0;const execute=async()=>{calls++;return{stdout:"",stderr:"",exitCode:0}};
 for(const [dir,id] of [["",issue],[root,""],[root,"  "]] as const){
  await assert.rejects(()=>claimBeadsWork(dir,id,execute),(e:unknown)=>e instanceof Error&&e.message==="BEADS_CLAIM_INVALID: directory and issue ID required",JSON.stringify([dir,id]));
 }
 const anonymous=mkdtempSync(join(tmpdir(),"mw-claim-noactor-"));
 const saved={actor:process.env["BEADS_ACTOR"],author:process.env["GIT_AUTHOR_NAME"]};
 try{
  for(const argv of [["init","-q",anonymous],["-C",anonymous,"config","user.name",""]]){const p=spawnSync("git",argv,{encoding:"utf8"});assert.equal(p.status,0,p.stderr);}
  process.env["BEADS_ACTOR"]="";process.env["GIT_AUTHOR_NAME"]="";
  await assert.rejects(()=>claimBeadsWork(anonymous,issue,execute),(e:unknown)=>e instanceof Error&&e.message==="BEADS_CLAIM_INVALID: no attributable Beads actor");
 }finally{
  if(saved.actor===undefined)delete process.env["BEADS_ACTOR"];else process.env["BEADS_ACTOR"]=saved.actor;
  if(saved.author===undefined)delete process.env["GIT_AUTHOR_NAME"];else process.env["GIT_AUTHOR_NAME"]=saved.author;
  rmSync(anonymous,{recursive:true,force:true});
 }
 assert.equal(calls,0);
});

// ---- MechanicalWorkflows-5qmm: claimBeadsWork reconciliation conjuncts, argv flags, actor precedence, native executor ----
import { chmodSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
type Reply={stdout:string;stderr:string;exitCode:number};
const ok=(value:unknown):Reply=>({stdout:JSON.stringify(value),stderr:"",exitCode:0});
const row=(status:string,assignee:string,id:string=issue)=>({id,status,assignee});
const UNCERTAIN_AFTER_ACCEPT="BEADS_CLAIM_UNCERTAIN: post-claim state did not confirm ownership";
const UNCERTAIN_AFTER_FAILURE="BEADS_CLAIM_UNCERTAIN: claim result ambiguous; authoritative show did not confirm ownership";
async function withActorEnv<T>(env:{actor:string;author:string},body:()=>Promise<T>):Promise<T>{
 const saved={actor:process.env["BEADS_ACTOR"],author:process.env["GIT_AUTHOR_NAME"],path:process.env["PATH"]};
 process.env["BEADS_ACTOR"]=env.actor;process.env["GIT_AUTHOR_NAME"]=env.author;
 try{return await body()}finally{
  if(saved.actor===undefined)delete process.env["BEADS_ACTOR"];else process.env["BEADS_ACTOR"]=saved.actor;
  if(saved.author===undefined)delete process.env["GIT_AUTHOR_NAME"];else process.env["GIT_AUTHOR_NAME"]=saved.author;
  if(saved.path===undefined)delete process.env["PATH"];else process.env["PATH"]=saved.path;
 }
}
const gitConfigActor={actor:"",author:""};
const refuses=(message:string)=>(e:unknown)=>e instanceof Error&&e.message===message;

test("an accepted update followed by a show that is not in_progress for the actor refuses with the post-claim message",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):ok([row("open","agent")])),refuses(UNCERTAIN_AFTER_ACCEPT));
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):ok([row("in_progress","   ")])),refuses(UNCERTAIN_AFTER_ACCEPT));
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):ok([{id:issue,status:"in_progress"}])),refuses(UNCERTAIN_AFTER_ACCEPT));
 });
});
test("an accepted update whose own row is open or owned by another actor refuses even when show confirms our ownership",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  for(const accepted of [row("open","agent"),row("in_progress","someone-else")]){
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(accepted):ok([row("in_progress","agent")])),refuses(UNCERTAIN_AFTER_ACCEPT),JSON.stringify(accepted));
  }
 });
});
test("when show confirms an actor other than ours, the accepted update agreeing with show still refuses",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","someone-else")):ok([row("in_progress","someone-else")])),refuses(UNCERTAIN_AFTER_ACCEPT));
 });
});
test("a failed update with a non-confirming show refuses with the ambiguous-claim message",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:"",stderr:"lost",exitCode:1}:ok([row("open","agent")])),refuses(UNCERTAIN_AFTER_FAILURE));
 });
});
test("a show that answers two rows, a foreign id, an empty row, a non-object row, or malformed JSON never certifies the claim",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const confirming=row("in_progress","agent");
  const shows:readonly Reply[]=[
   ok([confirming,confirming]),ok([row("in_progress","agent","MW-other")]),ok([null]),ok([[confirming]]),ok(null),ok(["MW-42"]),
   {stdout:"not json",stderr:"",exitCode:0},{stdout:"",stderr:"",exitCode:0},
  ];
  for(const show of shows){
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(confirming):show),refuses(UNCERTAIN_AFTER_ACCEPT),show.stdout);
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:"",stderr:"lost",exitCode:1}:show),refuses(UNCERTAIN_AFTER_FAILURE),show.stdout);
  }
 });
});
test("a show that exits nonzero never certifies the claim even when its stdout confirms ownership",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const confirming=ok([row("in_progress","agent")]);
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):{...confirming,exitCode:1}),refuses(UNCERTAIN_AFTER_ACCEPT));
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:"",stderr:"lost",exitCode:1}:{...confirming,exitCode:1}),refuses(UNCERTAIN_AFTER_FAILURE));
 });
});
test("a nonzero update exit with contradicting stdout is ignored: the confirming show alone resolves the claim as in_progress",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const out=await claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:JSON.stringify(row("open","someone-else")),stderr:"",exitCode:1}:ok([row("in_progress","agent")]));
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
 });
});
test("the update argv carries --actor and --claim and the show argv carries --readonly, both against the real workspace directory",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const calls:{argv:readonly string[];cwd:string}[]=[];
  await claimBeadsWork(root,issue,async(argv,cwd)=>{calls.push({argv,cwd});return argv.includes("update")?ok(row("in_progress","agent")):ok([row("in_progress","agent")])});
  const real=realpathSync(root);
  assert.deepEqual(calls.map(c=>c.argv),[
   ["--actor","agent","--directory",real,"update",issue,"--claim","--json"],
   ["--readonly","--directory",real,"show",issue,"--json"],
  ]);
  assert.ok(calls.every(c=>c.cwd===real));
 });
});
test("BEADS_ACTOR outranks GIT_AUTHOR_NAME, which outranks the git user.name, and the winner is both the --actor value and the required assignee",async()=>{
 const claimAs=async(env:{actor:string;author:string},assignee:string)=>withActorEnv(env,async()=>{
  const calls:(readonly string[])[]=[];
  await claimBeadsWork(root,issue,async argv=>{calls.push(argv);return argv.includes("update")?ok(row("in_progress",assignee)):ok([row("in_progress",assignee)])});
  return calls;
 });
 assert.equal((await claimAs({actor:"env-actor",author:"author-name"},"env-actor"))[0]?.[1],"env-actor");
 assert.equal((await claimAs({actor:"",author:"author-name"},"author-name"))[0]?.[1],"author-name");
 assert.equal((await claimAs({actor:"",author:""},"agent"))[0]?.[1],"agent");
 await withActorEnv({actor:"env-actor",author:"author-name"},async()=>{
  await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","author-name")):ok([row("in_progress","author-name")])),refuses(UNCERTAIN_AFTER_ACCEPT));
 });
});
test("a whitespace-only BEADS_ACTOR falls through to GIT_AUTHOR_NAME, which is the --actor value and the required assignee",async()=>{
 const calls:(readonly string[])[]=[];
 await withActorEnv({actor:"  ",author:"author-name"},async()=>{
  const out=await claimBeadsWork(root,issue,async argv=>{calls.push(argv);return argv.includes("update")?ok(row("in_progress","author-name")):ok([row("in_progress","author-name")])});
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
 });
 assert.equal(calls[0]?.[1],"author-name");
});
test("a whitespace-only GIT_AUTHOR_NAME with an empty BEADS_ACTOR falls through to the git user.name",async()=>{
 const calls:(readonly string[])[]=[];
 await withActorEnv({actor:"",author:"\t "},async()=>{
  await claimBeadsWork(root,issue,async argv=>{calls.push(argv);return argv.includes("update")?ok(row("in_progress","agent")):ok([row("in_progress","agent")])});
 });
 assert.equal(calls[0]?.[1],"agent");
});
test("a padded nonblank BEADS_ACTOR claims with the trimmed value as both the --actor argument and the required assignee",async()=>{
 const calls:(readonly string[])[]=[];
 await withActorEnv({actor:"  env-actor  ",author:"author-name"},async()=>{
  const out=await claimBeadsWork(root,issue,async argv=>{calls.push(argv);return argv.includes("update")?ok(row("in_progress","env-actor")):ok([row("in_progress","env-actor")])});
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
 });
 assert.equal(calls[0]?.[1],"env-actor");
});
test("a padded nonblank GIT_AUTHOR_NAME with an empty BEADS_ACTOR claims with the trimmed value as both the --actor argument and the required assignee",async()=>{
 const calls:(readonly string[])[]=[];
 await withActorEnv({actor:"",author:"  author-name  "},async()=>{
  const out=await claimBeadsWork(root,issue,async argv=>{calls.push(argv);return argv.includes("update")?ok(row("in_progress","author-name")):ok([row("in_progress","author-name")])});
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
 });
 assert.equal(calls[0]?.[1],"author-name");
});
test("whitespace-only BEADS_ACTOR and GIT_AUTHOR_NAME with a blank git user.name refuse BEADS_CLAIM_INVALID before any bd call",async()=>{
 const anonymous=mkdtempSync(join(tmpdir(),"mw-claim-blankactor-"));
 let calls=0;
 try{
  for(const argv of [["init","-q",anonymous],["-C",anonymous,"config","user.name",""]]){const p=spawnSync("git",argv,{encoding:"utf8"});assert.equal(p.status,0,p.stderr);}
  await withActorEnv({actor:"  ",author:"  "},async()=>{
   await assert.rejects(()=>claimBeadsWork(anonymous,issue,async()=>{calls++;return{stdout:"",stderr:"",exitCode:0}}),refuses("BEADS_CLAIM_INVALID: no attributable Beads actor"));
  });
 }finally{rmSync(anonymous,{recursive:true,force:true})}
 assert.equal(calls,0);
});
test("the native executor maps a nonzero bd on PATH to the ambiguous-claim refusal and runs bd once per call with the real argv",async()=>{
 const shims=mkdtempSync(join(tmpdir(),"mw-claim-shim-"));
 try{
  const trace=join(shims,"trace.log");
  mkdirSync(shims,{recursive:true});
  const bd=join(shims,"bd");
  writeFileSync(bd,`#!/bin/sh\nprintf '%s\\n' "$*" >> '${trace}'\necho "bd shim failure" >&2\nexit 7\n`);
  chmodSync(bd,0o755);
  await withActorEnv(gitConfigActor,async()=>{
   process.env["PATH"]=`${shims}:${process.env["PATH"]??""}`;
   await assert.rejects(()=>claimBeadsWork(root,issue),refuses(UNCERTAIN_AFTER_FAILURE));
  });
  const real=realpathSync(root);
  assert.deepEqual(readFileSync(trace,"utf8").trim().split("\n"),[
   `--actor agent --directory ${real} update ${issue} --claim --json`,
   `--readonly --directory ${real} show ${issue} --json`,
  ]);
 }finally{rmSync(shims,{recursive:true,force:true})}
});
test("the native executor resolves a claim when bd on PATH answers confirming rows for update and show",async()=>{
 const shims=mkdtempSync(join(tmpdir(),"mw-claim-shim-ok-"));
 try{
  const bd=join(shims,"bd");
  writeFileSync(bd,`#!/bin/sh\necho '[{"id":"${issue}","status":"in_progress","assignee":"agent"}]'\n`);
  chmodSync(bd,0o755);
  const out=await withActorEnv(gitConfigActor,async()=>{
   process.env["PATH"]=`${shims}:${process.env["PATH"]??""}`;
   return claimBeadsWork(root,issue);
  });
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
 }finally{rmSync(shims,{recursive:true,force:true})}
});

// ---- MechanicalWorkflows-zqrl (CACWC-EAT-R004): a post-claim row that is deferred, closed or blocked never certifies the claim ----
test("a post-claim show whose status is deferred, closed, blocked or hooked refuses for the owning actor, with and without an accepted update",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  for(const status of ["deferred","closed","blocked","hooked"]){
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):ok([row(status,"agent")])),refuses(UNCERTAIN_AFTER_ACCEPT),status);
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:"",stderr:"lost",exitCode:1}:ok([row(status,"agent")])),refuses(UNCERTAIN_AFTER_FAILURE),status);
  }
 });
});
test("an accepted update row that is itself deferred or closed refuses even when show reports in_progress for the actor",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  for(const status of ["deferred","closed"]){
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row(status,"agent")):ok([row("in_progress","agent")])),refuses(UNCERTAIN_AFTER_ACCEPT),status);
  }
 });
});
test("negative control: in_progress for the same actor on both rows resolves once, with exactly one update and one readonly show",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const verbs:string[]=[];
  const out=await claimBeadsWork(root,issue,async argv=>{verbs.push(argv.includes("update")?"update":"show");return argv.includes("update")?ok(row("in_progress","agent")):ok([row("in_progress","agent")])});
  assert.deepEqual(out,{issueId:issue,status:"in_progress"});
  assert.deepEqual(verbs,["update","show"]);
 });
});

// CACWC-EAT-R002 (MechanicalWorkflows-gebd): a status outside bd 1.1.0-rc.1's roster is never certified as a claim.
test("CACWC-EAT-R002: a post-claim row carrying status VERIFIED is BEADS_CLAIM_UNCERTAIN, never a certified claim",async()=>{
 let claims=0;
 await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>{
  if(argv.includes("update")){claims++;return{stdout:JSON.stringify({id:issue,status:"in_progress",assignee:"agent"}),stderr:"",exitCode:0}}
  return{stdout:JSON.stringify([{id:issue,status:"VERIFIED",assignee:"agent"}]),stderr:"",exitCode:0};
 }),(e:unknown)=>e instanceof Error&&e.message.startsWith("BEADS_CLAIM_UNCERTAIN"));
 assert.equal(claims,1);
});
test("CACWC-EAT-R002 control: the same executor answering in_progress is the one certified claim",async()=>{
 const out=await claimBeadsWork(root,issue,async argv=>argv.includes("update")
  ?{stdout:JSON.stringify({id:issue,status:"in_progress",assignee:"agent"}),stderr:"",exitCode:0}
  :{stdout:JSON.stringify([{id:issue,status:"in_progress",assignee:"agent"}]),stderr:"",exitCode:0});
 assert.deepEqual(out,{issueId:issue,status:"in_progress"});
});

// ---- MechanicalWorkflows-nrfu (CACWC-EAT-R004 follow-up of zqrl): closed-world status pins for both post-claim conjuncts ----
// A denylist of open, deferred, closed, blocked and hooked would pass every test above; these rows carry a status outside that list.
test("nrfu S1: a post-claim show row whose status is unlisted or absent refuses for the owning actor, with and without an accepted update",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const absent={id:issue,assignee:"agent"};
  for(const shown of [row("pinned","agent"),row("","agent"),absent]){
   const label=JSON.stringify(shown);
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(row("in_progress","agent")):ok([shown])),refuses(UNCERTAIN_AFTER_ACCEPT),label);
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?{stdout:"",stderr:"lost",exitCode:1}:ok([shown])),refuses(UNCERTAIN_AFTER_FAILURE),label);
  }
 });
});
test("nrfu S2: an accepted update row whose status is unlisted or absent refuses even when show reports in_progress for the actor",async()=>{
 await withActorEnv(gitConfigActor,async()=>{
  const absent={id:issue,assignee:"agent"};
  for(const accepted of [row("pinned","agent"),row("","agent"),absent]){
   await assert.rejects(()=>claimBeadsWork(root,issue,async argv=>argv.includes("update")?ok(accepted):ok([row("in_progress","agent")])),refuses(UNCERTAIN_AFTER_ACCEPT),JSON.stringify(accepted));
  }
 });
});
