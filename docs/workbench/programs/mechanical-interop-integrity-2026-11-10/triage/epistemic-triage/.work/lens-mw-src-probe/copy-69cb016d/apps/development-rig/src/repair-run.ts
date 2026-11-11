/** Explicit single-writer repair of a rejected clean Git candidate. */
import {repairRejectedCandidate,type Candidate,type ReviewResult,type RepairOutcome} from "@mechanical/workflows-development";
import {packageRoot,cleanGitBasis,verifyExistingCandidate,type GateObservation} from "./live-gate.js";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {runClaudeImplementation,type AgentRun,type AgentOptions} from "./claude-implement.js";
import {runClaudeReview} from "./claude-review.js";
export interface RepairRunOptions extends AgentOptions {
 readonly agent?:AgentRun;
 readonly reviewer?:typeof runClaudeReview;
 readonly gate?:()=>Promise<GateObservation>;
 readonly forgeExecutable?:string;
}
function isReviewSession(e:ReviewResult["evidence"]):boolean{
 return !!e&&e.system==="claude-agent-sdk"&&e.kind==="review-session"&&typeof e.id==="string"&&e.id.trim().length>0;
}
export async function repairLiveCandidate(
 rootInput:string,task:string,rejectedRevision:string,rejectedReview:ReviewResult,options:RepairRunOptions={},
):Promise<RepairOutcome>{
 const root=packageRoot(rootInput);
 if(!task.trim())throw new Error("REPAIR_TASK_REQUIRED");
 const before=await cleanGitBasis(root);
 const originalGate=readFileSync(join(root,"forge.toml"));
 if(before.commit!==rejectedRevision)throw new Error("REPAIR_REJECTED_BASIS_MISMATCH: expected committed HEAD");
 const previous={workspaceId:root,revision:rejectedRevision};
 const rejected:Candidate={parentBasis:previous,basis:previous};
 const runner=options.agent??runClaudeImplementation;
 return repairRejectedCandidate({
  rejectedCandidate:rejected,rejectedReview,
  produceRepair:async()=>{
   const agent=await runner(root,[
    "Produce exactly one committed repair for a candidate already rejected by a separate review.",
    "Task: "+task,"Rejected candidate commit: "+rejectedRevision,
    "Use Write/Edit for files, then run git add and git commit as separate Bash tool calls (no &&, pipes or subshells).",
    "Commit directly on the current branch; this host already assigned an isolated workspace. Do not create or switch branches.",
    "Do not modify forge.toml or files outside the workspace. Do not publish.",
   ].join("\n"),options);
   if(typeof agent.sessionId!=="string"||!agent.sessionId.trim())throw new Error("REPAIR_AGENT_SESSION_UNIDENTIFIED: injected repair agent returned a blank or non-string sessionId");
   const after=await cleanGitBasis(root);
   if(!originalGate.equals(readFileSync(join(root,"forge.toml"))))throw new Error("REPAIR_GATE_DEFINITION_CHANGED: source gate changed during repair");
   if(after.commit===rejectedRevision||after.tree===before.tree)throw new Error("REPAIR_SOURCE_CHANGE_NOT_ESTABLISHED");
   return{parentBasis:previous,basis:{workspaceId:root,revision:after.commit},evidence:{system:"claude-agent-sdk",kind:"session",id:agent.sessionId}};
  },
  reReview:async candidate=>{
   const observed=await (options.reviewer??runClaudeReview)(root,candidate.basis.revision,task,options);
   // Host boundary: an approval counts only as a nonblank claude-agent-sdk review-session; anything else never reaches the Forge gate.
   if(observed.verdict==="approved"&&!isReviewSession(observed.evidence))return{...observed,verdict:"unknown"};
   return observed;
  },
  verify:async candidate=>{
   const gate=await (options.gate?options.gate():verifyExistingCandidate(root,options.forgeExecutable??"forge"));
   return{basis:{workspaceId:root,revision:candidate.basis.revision},
    verdict:gate.basis.commit!==candidate.basis.revision?"unknown":gate.kind==="passed"?"passed":gate.kind==="failed"?"failed":"unknown",
    ...(gate.operationId?{evidence:{system:"forge",kind:"operation",id:gate.operationId}}:{}),
    diagnostic:gate.reason};
  },
 });
}
