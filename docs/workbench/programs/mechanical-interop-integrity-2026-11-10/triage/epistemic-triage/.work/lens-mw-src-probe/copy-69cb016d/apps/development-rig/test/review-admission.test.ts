import test from "node:test";
import assert from "node:assert/strict";
import {verifyReviewedCandidate} from "../dist/review-admission.js";
import type {GateObservation} from "../dist/live-gate.js";
import type {ReviewResult,SubjectBasis} from "@mechanical/workflows-development";
const candidate:SubjectBasis={workspaceId:"/tmp/review",revision:"a".repeat(40)};
const approval:ReviewResult={basis:candidate,verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-1"}};
const gate:GateObservation={kind:"passed",reason:"FORGE_GATE_PASS",basis:{commit:candidate.revision,tree:"b".repeat(40),clean:true},operationId:"op-1",native:{},binding:{commit:"native",gateDefinition:"descriptor",environment:"descriptor"}};
test("a separate native read-only approval permits exactly one Forge gate",async()=>{
 let calls=0;const out=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(out.verdict,"passed");assert.equal(calls,1);assert.equal(out.evidence?.id,"op-1");
});
test("rejected, unknown or wrong-basis review never starts Forge",async()=>{
 const reviews:ReviewResult[]=[{...approval,verdict:"unknown"},{...approval,verdict:"rejected"},{...approval,basis:{...candidate,revision:"other"}}];
 for(const review of reviews) {
  let calls=0;const out=await verifyReviewedCandidate(candidate,review,async()=>{calls++;return gate});
  assert.equal(out.verdict,"unknown");assert.equal(calls,0);
 }
});
test("Forge PASS for another candidate cannot be attributed to reviewed candidate",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,basis:{...gate.basis,commit:"other"}}));
 assert.equal(out.verdict,"unknown");assert.equal(out.diagnostic,"FORGE_REVIEWED_CANDIDATE_MISMATCH");
});
test("a gate for another commit that also lacks a usable operation id reports the commit mismatch, not the missing id",async()=>{
 for(const operationId of [null,"   "]){
  const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,basis:{...gate.basis,commit:"other"},operationId}));
  assert.equal(out.verdict,"unknown",JSON.stringify(operationId));assert.equal(out.diagnostic,"FORGE_REVIEWED_CANDIDATE_MISMATCH",JSON.stringify(operationId));assert.equal(out.evidence,undefined,JSON.stringify(operationId));
 }
});
test("a passed gate whose operation id is not a string is refused as missing without throwing",async()=>{
 for(const operationId of [42,{},true]){
  let out;
  await assert.doesNotReject(async()=>{out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,operationId:operationId as unknown as string}))},JSON.stringify(operationId));
  assert.equal(out!.verdict,"unknown",JSON.stringify(operationId));assert.equal(out!.diagnostic,"FORGE_OPERATION_ID_MISSING",JSON.stringify(operationId));assert.equal(out!.evidence,undefined,JSON.stringify(operationId));
 }
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>gate);
 assert.equal(ok.verdict,"passed");assert.equal(ok.evidence?.id,"op-1");
});
test("an approved review whose session evidence id is whitespace-only never starts Forge",async()=>{
 for(const id of ["   ","\t"," \n "]){
  let calls=0;const out=await verifyReviewedCandidate(candidate,{...approval,evidence:{system:"claude-agent-sdk",kind:"review-session",id}},async()=>{calls++;return gate});
  assert.equal(out.verdict,"unknown",JSON.stringify(id));assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED",JSON.stringify(id));assert.equal(out.evidence,undefined,JSON.stringify(id));assert.equal(calls,0,JSON.stringify(id));
 }
 let calls=0;const ok=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(ok.verdict,"passed");assert.equal(calls,1);
});
test("an approved review whose session evidence id is empty never starts Forge",async()=>{
 let calls=0;const out=await verifyReviewedCandidate(candidate,{...approval,evidence:{system:"claude-agent-sdk",kind:"review-session",id:""}},async()=>{calls++;return gate});
 assert.equal(out.verdict,"unknown");assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED");assert.equal(out.evidence,undefined);assert.equal(calls,0);
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(ok.verdict,"passed");assert.equal(calls,1);
});
test("an approved review whose evidence kind is not review-session never starts Forge",async()=>{
 let calls=0;const out=await verifyReviewedCandidate(candidate,{...approval,evidence:{system:"claude-agent-sdk",kind:"operation",id:"review-1"}},async()=>{calls++;return gate});
 assert.equal(out.verdict,"unknown");assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED");assert.equal(out.evidence,undefined);assert.equal(calls,0);
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(ok.verdict,"passed");assert.equal(calls,1);
});
test("an approved review whose evidence system is not claude-agent-sdk never starts Forge",async()=>{
 let calls=0;const out=await verifyReviewedCandidate(candidate,{...approval,evidence:{system:"forge",kind:"review-session",id:"review-1"}},async()=>{calls++;return gate});
 assert.equal(out.verdict,"unknown");assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED");assert.equal(out.evidence,undefined);assert.equal(calls,0);
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(ok.verdict,"passed");assert.equal(calls,1);
});
test("an approved review for the right revision but another workspace never starts Forge",async()=>{
 let calls=0;const out=await verifyReviewedCandidate(candidate,{...approval,basis:{...approval.basis,workspaceId:"/tmp/other-review"}},async()=>{calls++;return gate});
 assert.equal(out.verdict,"unknown");assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED");assert.equal(out.evidence,undefined);assert.equal(calls,0);
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>{calls++;return gate});
 assert.equal(ok.verdict,"passed");assert.equal(calls,1);
});
test("a passed gate observation without a usable native operation id is never promoted to passed",async()=>{
 for(const operationId of [null,"","   ","\t"]){
  const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,operationId}));
  assert.notEqual(out.verdict,"passed",JSON.stringify(operationId));assert.equal(out.verdict,"unknown",JSON.stringify(operationId));assert.equal(out.diagnostic,"FORGE_OPERATION_ID_MISSING",JSON.stringify(operationId));assert.equal(out.evidence,undefined,JSON.stringify(operationId));
 }
 const ok=await verifyReviewedCandidate(candidate,approval,async()=>gate);
 assert.equal(ok.verdict,"passed");assert.equal(ok.evidence?.id,"op-1");
});
test("a failed gate observation keeps its failed verdict even without a native operation id",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,kind:"failed",reason:"FORGE_GATE_FAIL",operationId:null}));
 assert.equal(out.verdict,"failed");assert.equal(out.evidence,undefined);
});
test("an approved review whose session evidence id is not a string never starts Forge and does not throw",async()=>{
 for(const id of [42,null,{}]){
  let calls=0;let out;
  await assert.doesNotReject(async()=>{out=await verifyReviewedCandidate(candidate,{...approval,evidence:{system:"claude-agent-sdk",kind:"review-session",id:id as unknown as string}},async()=>{calls++;return gate})},JSON.stringify(id));
  assert.equal(out!.verdict,"unknown",JSON.stringify(id));assert.equal(out!.diagnostic,"REVIEW_NOT_ESTABLISHED",JSON.stringify(id));assert.equal(out!.evidence,undefined,JSON.stringify(id));assert.equal(calls,0,JSON.stringify(id));
 }
});
test("an indeterminate gate for the reviewed candidate answers unknown, never failed",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,kind:"indeterminate",reason:"FORGE_RESULT_UNREADABLE"}));
 assert.equal(out.verdict,"unknown","indeterminate gate verdict");assert.notEqual(out.verdict,"failed","indeterminate gate is not a failure");
});
test("a passed gate reports Forge operation evidence naming system forge and kind operation",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>gate);
 assert.deepEqual(out.evidence,{system:"forge",kind:"operation",id:"op-1"},"passed gate evidence");
});
test("a failed gate keeps its Forge operation id as evidence",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,kind:"failed",reason:"FORGE_GATE_FAIL",operationId:"op-2"}));
 assert.equal(out.verdict,"failed","failed gate verdict");assert.equal(out.evidence?.id,"op-2","failed gate evidence id");
});
test("the final diagnostic carries the gate reason rather than a constant",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,kind:"failed",reason:"FORGE_GATE_FAIL",operationId:"op-2"}));
 assert.equal(out.diagnostic,"FORGE_GATE_FAIL","failed gate diagnostic equals reason");
});
test("a refusal for another workspace reports the candidate as its basis",async()=>{
 const out=await verifyReviewedCandidate(candidate,{...approval,basis:{...approval.basis,workspaceId:"/tmp/other-review"}},async()=>gate);
 assert.equal(out.diagnostic,"REVIEW_NOT_ESTABLISHED","refusal diagnostic");assert.deepEqual(out.basis,candidate,"refusal basis is the candidate");
});
test("a refusal for another gated commit reports the candidate as its basis",async()=>{
 const out=await verifyReviewedCandidate(candidate,approval,async()=>({...gate,basis:{...gate.basis,commit:"other"}}));
 assert.equal(out.diagnostic,"FORGE_REVIEWED_CANDIDATE_MISMATCH","mismatch diagnostic");assert.deepEqual(out.basis,candidate,"mismatch basis is the candidate");
});
