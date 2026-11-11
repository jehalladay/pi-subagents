import test from "node:test";
import assert from "node:assert/strict";
import { developWithNativeEvidence } from "../dist/live-evidence.js";
import type { NativeDevelopmentServices } from "../dist/live-evidence.js";
import type { DevelopmentRequest, ScopeResult, VerificationResult, Candidate } from "@mechanical/workflows-development";
const request:DevelopmentRequest={task:"Fix parser",workspaceId:"/repo",baseRevision:"a".repeat(40)};
const basis={workspaceId:request.workspaceId,revision:request.baseRevision};
const context={basis,text:"Task: Fix parser\nSource revision: "+request.baseRevision,evidence:{system:"reactive-fiber",kind:"render",id:"rfr-1"},model:"claude-opus-5",availableTokens:100,graphRevision:"g",outputDigest:"sha256:"+"a".repeat(64),rfWorkspaceId:"rfw_1",actor:"agent:camshaft-oe",cli:{version:"0.1.883",sdkVersions:{}}};
const scope:ScopeResult={basis,coverage:"complete",files:["src/parser.ts"],evidence:{system:"hyper-unix",kind:"task-query",id:"sha256:"+"b".repeat(64)}};
const candidate:Candidate={parentBasis:basis,basis:{workspaceId:request.workspaceId,revision:"b".repeat(40)},evidence:{system:"agent",kind:"session",id:"s"}};
const verification:VerificationResult={basis:candidate.basis,verdict:"passed",evidence:{system:"forge",kind:"operation",id:"op"}};
test("native evidence path threads HX, RF, agent and Forge in order",async()=>{
 const calls:string[]=[];
 const result=await developWithNativeEvidence(request,{
  discover:async()=>{calls.push("hx");return scope},
  render:async()=>{calls.push("rf");return context},
  implement:async()=>{calls.push("agent");return candidate},
  verify:async()=>{calls.push("forge");return verification},
 });
 assert.equal(result.kind,"verified_candidate");assert.deepEqual(calls,["hx","rf","agent","forge"]);
});
test("partial HX stops before RF or model",async()=>{
 const calls:string[]=[];
 const r=await developWithNativeEvidence(request,{discover:async()=>({...scope,coverage:"partial" as const}),render:async()=>{calls.push("rf");return context},implement:async()=>{calls.push("agent");return candidate},verify:async()=>{calls.push("forge");return verification}});
 assert.equal(r.kind,"needs_evidence");assert.deepEqual(calls,[]);
});
test("RF render without attributable native reference stops before agent",async()=>{
 let called=false;
 const services:NativeDevelopmentServices={discover:async()=>scope,render:async()=>({...context,evidence:undefined}) as never,implement:async()=>{called=true;return candidate},verify:async()=>verification};
 const r=await developWithNativeEvidence(request,services);
 assert.equal(r.kind,"indeterminate");assert.equal(called,false);
});
import { nativeEvidenceServices } from "../dist/live-evidence.js";
test("an unattributable render compiles to the RF_RENDER_UNESTABLISHED basis sentinel, which develop refuses as CONTEXT_BASIS_MISMATCH before the agent",async()=>{
 const renders:ReadonlyArray<readonly [string,unknown]>=[
  ["no evidence",{...context,evidence:undefined}],
  ["foreign evidence system",{...context,evidence:{system:"forge",kind:"render",id:"x"}}],
  ["foreign evidence kind",{...context,evidence:{system:"reactive-fiber",kind:"plan",id:"x"}}],
  ["blank evidence id",{...context,evidence:{system:"reactive-fiber",kind:"render",id:""}}],
  ["blank text",{...context,text:"  "}],
  ["no output digest",{...context,outputDigest:""}],
  ["no graph revision",{...context,graphRevision:""}],
 ];
 for(const [label,rf] of renders){
  let implemented=0;
  const native:NativeDevelopmentServices={discover:async()=>scope,render:async()=>rf as never,implement:async()=>{implemented++;return candidate},verify:async()=>verification};
  const compiled=await nativeEvidenceServices(native).compileContext(scope,request);
  assert.equal(compiled.basis.revision,"RF_RENDER_UNESTABLISHED",label);
  assert.equal(compiled.basis.workspaceId,request.workspaceId,label);
  const out=await developWithNativeEvidence(request,native);
  assert.equal(out.kind,"indeterminate",label);
  if(out.kind==="indeterminate")assert.equal(out.reason,"CONTEXT_BASIS_MISMATCH",label);
  assert.equal(implemented,0,label);
 }
});
test("implement refuses every context object other than the one compileContext selected as RF_CONTEXT_IDENTITY_CHANGED",async()=>{
 let implemented=0;
 const services=nativeEvidenceServices({discover:async()=>scope,render:async()=>context,implement:async()=>{implemented++;return candidate},verify:async()=>verification});
 const identityChanged=(e:unknown)=>e instanceof Error&&e.message==="RF_CONTEXT_IDENTITY_CHANGED";
 await assert.rejects(()=>services.implement(context,scope,request),identityChanged); // nothing selected yet
 const selected=await services.compileContext(scope,request);
 await assert.rejects(()=>services.implement({...selected},scope,request),identityChanged); // an equal copy is not the selected object
 assert.equal(implemented,0);
 assert.equal(await services.implement(selected,scope,request),candidate);
 assert.equal(implemented,1);
});
