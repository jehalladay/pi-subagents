/** One explicit repair handoff for a rejected candidate, never an automatic retry. */
import type {Candidate,EvidenceRef,VerificationResult} from "./contracts.js";
import type {ReviewResult} from "./review.js";
export interface RepairServices {
 readonly rejectedCandidate:Candidate;
 readonly rejectedReview:ReviewResult;
 readonly produceRepair:(candidate:Candidate,review:ReviewResult)=>Promise<Candidate>;
 readonly reReview:(repaired:Candidate)=>Promise<ReviewResult>;
 readonly verify:(repaired:Candidate)=>Promise<VerificationResult>;
}
export type RepairOutcome =
 | {readonly kind:"repaired_candidate";readonly candidate:Candidate;readonly review:ReviewResult;readonly verification:VerificationResult}
 | {readonly kind:"review_rejected";readonly candidate:Candidate;readonly review:ReviewResult}
 | {readonly kind:"verification_failed";readonly candidate:Candidate;readonly review:ReviewResult;readonly verification:VerificationResult}
 | {readonly kind:"indeterminate";readonly reason:string;readonly evidence?:EvidenceRef};
function same(a:Candidate["basis"],b:Candidate["basis"]):boolean{return a.workspaceId===b.workspaceId&&a.revision===b.revision}
function hasRef(e:EvidenceRef|undefined):boolean{return !!e&&[e.system,e.kind,e.id].every(v=>typeof v==="string"&&!!v.trim())}
export async function repairRejectedCandidate(services:RepairServices):Promise<RepairOutcome>{
 const original=services.rejectedCandidate, review=services.rejectedReview;
 if(!same(review.basis,original.basis)||review.verdict!=="rejected"||!hasRef(review.evidence))
  return{kind:"indeterminate",reason:"REJECTED_REVIEW_UNESTABLISHED"};
 // A single caller-authorized new effect. No loop or retry exists here.
 const candidate=await services.produceRepair(original,review);
 if(!same(candidate.parentBasis,original.basis)||candidate.basis.workspaceId!==original.basis.workspaceId||
    !candidate.basis.revision.trim()||candidate.basis.revision===original.basis.revision)
  return{kind:"indeterminate",reason:"REPAIR_BASIS_MISMATCH",...(candidate.evidence?{evidence:candidate.evidence}:{})};
 const rereview=await services.reReview(candidate);
 if(!same(rereview.basis,candidate.basis)||!hasRef(rereview.evidence))
  return{kind:"indeterminate",reason:"REPAIR_REVIEW_UNESTABLISHED",...(rereview.evidence?{evidence:rereview.evidence}:{})};
 if(rereview.verdict==="rejected")return{kind:"review_rejected",candidate,review:rereview};
 if(rereview.verdict!=="approved")return{kind:"indeterminate",reason:"REPAIR_REVIEW_UNKNOWN",...(rereview.evidence?{evidence:rereview.evidence}:{})};
 const verification=await services.verify(candidate);
 if(!same(verification.basis,candidate.basis))return{kind:"indeterminate",reason:"REPAIR_GATE_BASIS_MISMATCH",...(verification.evidence?{evidence:verification.evidence}:{})};
 if(verification.verdict==="failed")return{kind:"verification_failed",candidate,review:rereview,verification};
 if(verification.verdict!=="passed"||!hasRef(verification.evidence))return{kind:"indeterminate",reason:"REPAIR_GATE_UNESTABLISHED",...(verification.evidence?{evidence:verification.evidence}:{})};
 return{kind:"repaired_candidate",candidate,review:rereview,verification};
}
