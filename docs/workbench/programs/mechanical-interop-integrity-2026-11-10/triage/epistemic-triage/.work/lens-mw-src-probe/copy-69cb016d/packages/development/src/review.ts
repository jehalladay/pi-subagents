/** A bounded application review policy; no scheduler, registry or generic DAG. */
import type { Candidate, DevelopmentRequest, EvidenceRef, SubjectBasis, VerificationResult } from "./contracts.js";
export interface CandidatePlan { readonly basis: SubjectBasis; readonly task: string; readonly candidates: readonly Candidate[] }
/** `reason` is a diagnostic for an unknown verdict; it never substitutes for evidence. */
export interface ReviewResult { readonly basis: SubjectBasis; readonly verdict: "approved"|"rejected"|"unknown"; readonly evidence?: EvidenceRef; readonly reason?: string; readonly detail?: string }
export interface CandidateReviewServices {
 readonly plan:(request:DevelopmentRequest)=>Promise<CandidatePlan>;
 readonly choose:(plan:CandidatePlan,request:DevelopmentRequest)=>Promise<Candidate>;
 readonly review:(candidate:Candidate,request:DevelopmentRequest)=>Promise<ReviewResult>;
 readonly verify:(candidate:Candidate,request:DevelopmentRequest)=>Promise<VerificationResult>;
}
export type ReviewedOutcome =
 | {readonly kind:"reviewed_candidate";readonly candidate:Candidate;readonly review:ReviewResult;readonly verification:VerificationResult}
 | {readonly kind:"review_rejected";readonly candidate:Candidate;readonly review:ReviewResult}
 | {readonly kind:"verification_failed";readonly candidate:Candidate;readonly review:ReviewResult;readonly verification:VerificationResult}
 | {readonly kind:"needs_candidates";readonly reason:"NO_PLANNED_CANDIDATES"}
 | {readonly kind:"indeterminate";readonly reason:string;readonly evidence?:EvidenceRef};
function same(a:SubjectBasis,b:SubjectBasis):boolean{return a.workspaceId===b.workspaceId&&a.revision===b.revision}
function ref(e:EvidenceRef|undefined):boolean{return !!e&&[e.system,e.kind,e.id].every(x=>typeof x==="string"&&!!x.trim())}
export async function reviewCandidate(services:CandidateReviewServices,request:DevelopmentRequest):Promise<ReviewedOutcome>{
 for(const [name,value] of Object.entries(request))if(typeof value!=="string"||!value.trim())throw new TypeError("INVALID_REVIEW_REQUEST: "+name);
 const base={workspaceId:request.workspaceId,revision:request.baseRevision};
 const plan=await services.plan(request);
 if(!same(plan.basis,base)||plan.task!==request.task)return{kind:"indeterminate",reason:"PLAN_BASIS_MISMATCH"};
 if(plan.candidates.length===0)return{kind:"needs_candidates",reason:"NO_PLANNED_CANDIDATES"};
 const choice=await services.choose(plan,request);
 if(!plan.candidates.some(c=>same(c.basis,choice.basis)&&same(c.parentBasis,choice.parentBasis))||
    !same(choice.parentBasis,base)||choice.basis.workspaceId!==request.workspaceId||choice.basis.revision===base.revision)
   return{kind:"indeterminate",reason:"CANDIDATE_NOT_IN_PLAN"};
 const review=await services.review(choice,request);
 if(!same(review.basis,choice.basis)||!ref(review.evidence))return{kind:"indeterminate",reason:"REVIEW_EVIDENCE_UNESTABLISHED",...(review.evidence?{evidence:review.evidence}:{})};
 if(review.verdict==="rejected")return{kind:"review_rejected",candidate:choice,review};
 if(review.verdict!=="approved")return{kind:"indeterminate",reason:"REVIEW_UNKNOWN",...(review.evidence?{evidence:review.evidence}:{})};
 const verified=await services.verify(choice,request);
 if(!same(verified.basis,choice.basis))return{kind:"indeterminate",reason:"VERIFICATION_BASIS_MISMATCH",...(verified.evidence?{evidence:verified.evidence}:{})};
 if(verified.verdict==="failed")return{kind:"verification_failed",candidate:choice,review,verification:verified};
 if(verified.verdict!=="passed"||!ref(verified.evidence))return{kind:"indeterminate",reason:"VERIFICATION_UNESTABLISHED",...(verified.evidence?{evidence:verified.evidence}:{})};
 return{kind:"reviewed_candidate",candidate:choice,review,verification:verified};
}
