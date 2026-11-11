/** Native Beads claim, once, followed by authoritative read reconciliation. */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { realpathSync } from "node:fs";
import type { BdExecutor } from "./beads-host.js";
const exec=promisify(execFile);
const native: BdExecutor=async(argv,cwd)=>{
 try{const {stdout,stderr}=await exec("bd",[...argv],{cwd,encoding:"utf8",timeout:30_000,maxBuffer:8*1024*1024});return{stdout,stderr,exitCode:0}}
 catch(error){return{stdout:"",stderr:error instanceof Error?error.message:String(error),exitCode:1}}
};
function issueRow(stdout:string,issueId:string):Record<string,unknown>|null{
 let parsed:unknown;try{parsed=JSON.parse(stdout)}catch{return null}
 const rows=Array.isArray(parsed)?parsed:[parsed];
 if(rows.length!==1||rows[0]===null||typeof rows[0]!=="object"||Array.isArray(rows[0]))return null;
 const row=rows[0] as Record<string,unknown>;
 return row["id"]===issueId?row:null;
}
/**
 * A claim is a Beads effect, not a workflow completion. A lost acknowledgement
 * never triggers a second update; show() reconciles the state, which may still
 * be ambiguous when another actor owns it.
 */
export async function claimBeadsWork(directory:string,issueId:string,execute:BdExecutor=native):Promise<{readonly issueId:string;readonly status:"in_progress"}> {
 if(!directory||!issueId.trim())throw new Error("BEADS_CLAIM_INVALID: directory and issue ID required");
 const cwd=realpathSync(directory);
 const actor=process.env["BEADS_ACTOR"]?.trim() || process.env["GIT_AUTHOR_NAME"]?.trim() ||
   (await exec("git",["-C",cwd,"config","user.name"],{encoding:"utf8",timeout:10_000})).stdout.trim();
 if(!actor)throw new Error("BEADS_CLAIM_INVALID: no attributable Beads actor");
 const attempt=await execute(["--actor",actor,"--directory",cwd,"update",issueId,"--claim","--json"],cwd);
 const accepted=attempt.exitCode===0?issueRow(attempt.stdout,issueId):null;
 const checked=await execute(["--readonly","--directory",cwd,"show",issueId,"--json"],cwd);
 const row=checked.exitCode===0?issueRow(checked.stdout,issueId):null;
 if(!row||row["status"]!=="in_progress"||typeof row["assignee"]!=="string"||!row["assignee"].trim()||
    (accepted!==null && (accepted["status"]!=="in_progress" || accepted["assignee"]!==row["assignee"])) ||
    row["assignee"]!==actor) {
  throw new Error("BEADS_CLAIM_UNCERTAIN: "+(attempt.exitCode===0?"post-claim state did not confirm ownership":"claim result ambiguous; authoritative show did not confirm ownership"));
 }
 return{issueId,status:"in_progress"};
}
