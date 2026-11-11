/** Review recovery for an already committed candidate: never repeats implementation. */
import type {ReviewResult,SubjectBasis,VerificationResult} from "@mechanical/workflows-development";
import type {GateObservation} from "./live-gate.js";
export async function verifyReviewedCandidate(
 candidate:SubjectBasis,
 approval:ReviewResult,
 verify:()=>Promise<GateObservation>,
):Promise<VerificationResult>{
 const basis=candidate;
 if(approval.basis.workspaceId!==basis.workspaceId||approval.basis.revision!==basis.revision||
    approval.verdict!=="approved"||approval.evidence?.system!=="claude-agent-sdk"||
    approval.evidence.kind!=="review-session"||
    typeof approval.evidence.id!=="string"||approval.evidence.id.trim().length===0)
  return{basis,verdict:"unknown",diagnostic:"REVIEW_NOT_ESTABLISHED"};
 const gate=await verify();
 if(gate.basis.commit!==basis.revision)
  return{basis,verdict:"unknown",diagnostic:"FORGE_REVIEWED_CANDIDATE_MISMATCH"};
 if(gate.kind==="passed"&&(typeof gate.operationId!=="string"||gate.operationId.trim().length===0))
  return{basis,verdict:"unknown",diagnostic:"FORGE_OPERATION_ID_MISSING"};
 return {basis,
  verdict:gate.kind==="passed"?"passed":gate.kind==="failed"?"failed":"unknown",
  ...(gate.operationId?{evidence:{system:"forge",kind:"operation",id:gate.operationId}}:{}),
  diagnostic:gate.reason,
 };
}
