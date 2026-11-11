import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { invokePinnedDevelopment } from "../dist/entrypoint-host.js";
import type { EntrypointDescriptor, PinnedHostOptions } from "../dist/entrypoint-host.js";
import type { Candidate, DevelopmentServices, SubjectBasis } from "@mechanical/workflows-development";
type Bundle={root:string;artifact:string;digest:string};

const descriptor = JSON.parse(readFileSync(new URL("../../../contracts/entrypoints/development.v1.json", import.meta.url), "utf8")) as EntrypointDescriptor;
const request={task:"Check parser",workspaceId:"repo-A",baseRevision:"base-1"};
const basis: SubjectBasis={workspaceId:"repo-A",revision:"base-1"};
const candidate: Candidate={parentBasis:basis,basis:{workspaceId:"repo-A",revision:"candidate-1"}};
const services: DevelopmentServices={
 discover:async()=>({basis,coverage:"complete" as const,files:["src/a.ts"]}),
 compileContext:async()=>({basis,text:"task context"}),
 implement:async()=>candidate,
 verify:async()=>({basis:candidate.basis,verdict:"passed",evidence:{system:"forge",kind:"operation",id:"op-1"}}),
};
async function withBundle<T>(fn:(bundle:Bundle)=>Promise<T>):Promise<T>{
 const root=mkdtempSync(join(tmpdir(),"mw-entrypoint-"));
 const artifact=join(root,"artifact.tgz");
 writeFileSync(artifact,"immutable artifact bytes");
 const digest="sha256:"+createHash("sha256").update(readFileSync(artifact)).digest("hex");
 try {return await fn({root,artifact,digest})}finally{rmSync(root,{recursive:true,force:true})}
}
function config(x:Bundle): PinnedHostOptions {
  return {
    artifactPath: x.artifact, artifactDigest: x.digest, descriptor,
    entrypointId: descriptor.id, contractVersion: descriptor.schema, services,
    load: async () => ({ develop: async () => ({
      kind: "verified_candidate", candidate,
      verification: { basis: candidate.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-1" } },
    }) }),
  };
}
test("pinned local entrypoint validates and invokes exactly one permitted export",()=>withBundle(async x=>{
 let calls=0;const c:PinnedHostOptions={...config(x),load:async()=>({develop:async(s,r)=>{calls++;assert.equal(s,services);assert.deepEqual(r,request);return{kind:"verified_candidate",candidate,verification:{basis:candidate.basis,verdict:"passed",evidence:{system:"forge",kind:"operation",id:"op-1"}}}}})};
 const out=await invokePinnedDevelopment(c,request);assert.equal(out.kind,"verified_candidate");assert.equal(calls,1);
}));
test("wrong artifact digest or entrypoint refuses before loader and any effects",()=>withBundle(async x=>{
 const bads: Partial<PinnedHostOptions>[]=[{artifactDigest:"sha256:"+"f".repeat(64)},{entrypointId:"other"}];
 for(const bad of bads) {
  let called=0;const c:PinnedHostOptions={...config(x),...bad,load:async()=>{called++;throw Error("must not load")}};
  await assert.rejects(()=>invokePinnedDevelopment(c,request),/ENTRYPOINT_/);assert.equal(called,0);
 }
}));
test("extra input field or missing binding refuses before loader",()=>withBundle(async x=>{
 let called=0;const c={...config(x),load:async()=>{called++;throw Error("must not load")}};
 await assert.rejects(()=>invokePinnedDevelopment(c,{...request,secret:"do not serialize"}),/ENTRYPOINT_INPUT_INVALID/);
 await assert.rejects(()=>invokePinnedDevelopment({...c,services:{...services,verify:undefined} as unknown as DevelopmentServices},request),/ENTRYPOINT_BINDING_INVALID/);
 assert.equal(called,0);
}));
test("malformed output or declared PASS without producer ref never becomes success",()=>withBundle(async x=>{
 const malformed: unknown[]=[{kind:"verified_candidate",candidate,verification:{basis:candidate.basis,verdict:"passed"}},{kind:"verified_candidate"},{kind:"unknown"}];
 for(const bad of malformed) {
  await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>bad})},request),/ENTRYPOINT_OUTPUT_INVALID/);
 }
}));
test("loader exception is indeterminate and never retried",()=>withBundle(async x=>{
 let calls=0;
 await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>{calls++;throw Error("lost after dispatch")}},request),/lost after dispatch/);
 assert.equal(calls,1);
}));

test("schema paths are declared exactly and extra descriptor capabilities are refused",()=>withBundle(async x=>{
 let loads=0; const c={...config(x),load:async()=>{loads++;throw Error("must not load")}};
 const descriptors: EntrypointDescriptor[]=[{...descriptor,inputSchema:"../../secrets"},{...descriptor,bindings:[...descriptor.bindings,"shell"]},{...descriptor,implementation:{...descriptor.implementation,export:"other"}}];
 for (const d of descriptors) {
  await assert.rejects(()=>invokePinnedDevelopment({...c,descriptor:d},request),/ENTRYPOINT_/);
 }
 assert.equal(loads,0);
}));
test("output basis mismatch refuses even with claimed producer evidence",()=>withBundle(async x=>{
 const raw: unknown={kind:"verified_candidate",candidate,verification:{basis:{...candidate.basis,revision:"wrong"},verdict:"passed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),/ENTRYPOINT_OUTPUT_INVALID/);
}));
test("every descriptor or contract field that deviates is ENTRYPOINT_CONTRACT_INVALID before the loader",()=>withBundle(async x=>{
 const deviations:ReadonlyArray<readonly [string,Partial<PinnedHostOptions>]>=[
  ["schema",{descriptor:{...descriptor,schema:"mechanical-workflows/entrypoint/v2"}}],
  ["id",{descriptor:{...descriptor,id:"mechanical.development.develop.v2"}}],
  ["implementation.package",{descriptor:{...descriptor,implementation:{...descriptor.implementation,package:"@mechanical/other"}}}],
  ["implementation.export",{descriptor:{...descriptor,implementation:{...descriptor.implementation,export:"run"}}}],
  ["status",{descriptor:{...descriptor,status:"published" as EntrypointDescriptor["status"]}}],
  ["inputSchema",{descriptor:{...descriptor,inputSchema:"development-request.v2.schema.json"}}],
  ["outputSchema",{descriptor:{...descriptor,outputSchema:"development-outcome.v2.schema.json"}}],
  ["contractVersion",{contractVersion:"mechanical-workflows/entrypoint/v2"}],
  ["entrypointId",{entrypointId:"mechanical.development.develop.v2"}],
 ];
 for(const [label,bad] of deviations){
  let loads=0;const c:PinnedHostOptions={...config(x),...bad,load:async()=>{loads++;throw Error("must not load")}};
  await assert.rejects(()=>invokePinnedDevelopment(c,request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_CONTRACT_INVALID"),label);
  assert.equal(loads,0,label);
 }
}));
test("a loader that yields no develop function is ENTRYPOINT_EXPORT_INVALID and nothing is invoked",()=>withBundle(async x=>{
 const loaded:ReadonlyArray<readonly [string,unknown]>=[["empty object",{}],["non-function develop",{develop:"develop"}],["null",null],["array",[]]];
 for(const [label,value] of loaded){
  const c:PinnedHostOptions={...config(x),load:async()=>value as never};
  await assert.rejects(()=>invokePinnedDevelopment(c,request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_EXPORT_INVALID"),label);
 }
}));
test("an artifact path that is not a regular file is ENTRYPOINT_ARTIFACT_INVALID before the loader even with a well-formed digest",()=>withBundle(async x=>{
 let loads=0;const c:PinnedHostOptions={...config(x),artifactPath:x.root,load:async()=>{loads++;throw Error("must not load")}};
 await assert.rejects(()=>invokePinnedDevelopment(c,request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_ARTIFACT_INVALID"));
 assert.equal(loads,0);
}));
test("an output whose candidate parent is the base revision of another workspace refuses even with claimed producer evidence",()=>withBundle(async x=>{
 const raw: unknown={kind:"verified_candidate",candidate:{...candidate,parentBasis:{...basis,workspaceId:"repo-B"}},verification:{basis:candidate.basis,verdict:"passed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),/ENTRYPOINT_OUTPUT_INVALID/,"entrypoint: parent at the base revision of another workspace");
}));
test("validOutcome refuses a parent at another revision, a candidate at the base revision or in another workspace, a needs_evidence scope in another workspace, with another reason or with complete coverage, a whitespace-only indeterminate reason and a verification_failed whose verdict passed",()=>withBundle(async x=>{
 const ev={system:"forge",kind:"operation",id:"op-1"};
 const elsewhere: SubjectBasis={workspaceId:"repo-B",revision:"candidate-1"};
 const bad: ReadonlyArray<readonly [string,unknown]>=[
  ["parent at another revision of the request workspace",{kind:"verified_candidate",candidate:{...candidate,parentBasis:{...basis,revision:"base-0"}},verification:{basis:candidate.basis,verdict:"passed",evidence:ev}}],
  ["candidate at the base revision",{kind:"verified_candidate",candidate:{...candidate,basis},verification:{basis,verdict:"passed",evidence:ev}}],
  ["candidate in another workspace",{kind:"verified_candidate",candidate:{...candidate,basis:elsewhere},verification:{basis:elsewhere,verdict:"passed",evidence:ev}}],
  ["needs_evidence scope in another workspace at the base revision",{kind:"needs_evidence",reason:"SCOPE_INCOMPLETE",scope:{basis:{...basis,workspaceId:"repo-B"},coverage:"partial"}}],
  ["needs_evidence with another reason",{kind:"needs_evidence",reason:"SCOPE_UNKNOWN",scope:{basis,coverage:"partial"}}],
  ["needs_evidence whose scope coverage is complete",{kind:"needs_evidence",reason:"SCOPE_INCOMPLETE",scope:{basis,coverage:"complete"}}],
  ["indeterminate with a whitespace-only reason",{kind:"indeterminate",reason:" \t"}],
  ["verification_failed whose verdict passed",{kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"passed",evidence:ev}}],
 ];
 for(const [label,raw] of bad){
  await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_OUTPUT_INVALID"),label);
 }
}));
test("validOutcome refuses a verification basis in another workspace at the candidate revision and a needs_evidence scope at another revision of the request workspace",()=>withBundle(async x=>{
 const ev={system:"forge",kind:"operation",id:"op-1"};
 const bad: ReadonlyArray<readonly [string,unknown]>=[
  ["verification basis in another workspace at the candidate revision",{kind:"verified_candidate",candidate,verification:{basis:{...candidate.basis,workspaceId:"repo-B"},verdict:"passed",evidence:ev}}],
  ["needs_evidence scope at another revision of the request workspace",{kind:"needs_evidence",reason:"SCOPE_INCOMPLETE",scope:{basis:{...basis,revision:"base-0"},coverage:"partial"}}],
 ];
 for(const [label,raw] of bad){
  await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_OUTPUT_INVALID"),label);
 }
}));
test("validOutcome refuses a verified_candidate whose verification verdict is failed even with a forge evidence ref at the candidate basis",()=>withBundle(async x=>{
 const raw: unknown={kind:"verified_candidate",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_OUTPUT_INVALID"),"verified_candidate with verdict failed");
}));
test("validOutcome refuses a verified_candidate whose verification verdict is unknown or partial even with a forge evidence ref at the candidate basis",()=>withBundle(async x=>{
 for(const verdict of ["unknown","partial"]){
  const raw: unknown={kind:"verified_candidate",candidate,verification:{basis:candidate.basis,verdict,evidence:{system:"forge",kind:"operation",id:"op-1"}}};
  await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_OUTPUT_INVALID"),"verified_candidate with verdict "+verdict);
 }
}));
test("validOutcome refuses a verified_candidate whose verification verdict is out of vocabulary or absent even with a forge evidence ref at the candidate basis",()=>withBundle(async x=>{
 for(const verdict of ["PASSED","pass",undefined]){
  const raw: unknown={kind:"verified_candidate",candidate,verification:{basis:candidate.basis,...(verdict===undefined?{}:{verdict}),evidence:{system:"forge",kind:"operation",id:"op-1"}}};
  await assert.rejects(()=>invokePinnedDevelopment({...config(x),load:async()=>({develop:async()=>raw})},request),(e:unknown)=>e instanceof Error&&e.message.startsWith("ENTRYPOINT_OUTPUT_INVALID"),"verified_candidate with verdict "+String(verdict));
 }
}));
