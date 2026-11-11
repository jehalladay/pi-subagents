import test from "node:test";
import assert from "node:assert/strict";
import { receiptOf } from "../dist/receipt.js";
import type { LiveDevelopmentResult } from "../dist/live-development.js";

const base = { workspaceId: "/demo", revision: "b".repeat(40) } as const;
const candidate = { parentBasis: base, basis: { workspaceId: "/demo", revision: "c".repeat(40) }, evidence: { system: "claude-agent-sdk", kind: "session", id: "s-1" } } as const;
const pass: LiveDevelopmentResult = { mode: "live-claude-forge", discovery: "git-tracked-files", context: "plain-task-context",
  workflow: { kind: "verified_candidate", candidate, verification: { basis: candidate.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-1" } } },
  agent: { sessionId: "s-1", summary: "not authority", turns: 1, costUsd: 0.1 },
  forge: { kind: "passed", reason: "FORGE_GATE_PASS", operationId: "op-1", basis: { commit: candidate.basis.revision, tree: "d".repeat(40), clean: true }, native: { status: "success" }, binding: { commit: "native", gateDefinition: "descriptor", environment: "descriptor" } },
  gateManifestSha256: "f".repeat(64) };
test("receipt projects established candidate, observed agent and native Forge references", () => {
  const out = receiptOf(pass);
  assert.equal(out.stages.agent.state, "observed");
  assert.equal(out.stages.agent.ref?.id, "s-1");
  assert.equal(out.stages.candidate.state, "established");
  assert.equal(out.stages.verification.state, "established");
  assert.equal(out.stages.verification.ref?.id, "op-1");
  assert.equal(out.stages.furnace.state, "not_run");
  assert.equal(out.basis.candidate?.revision, candidate.basis.revision);
  assert.equal(JSON.stringify(out).includes("not authority"), false);
});
test("a Forge PASS mismatched to the candidate is only observed, not an established verification", () => {
  const out = receiptOf({ ...pass, forge: { ...pass.forge!, basis: { ...pass.forge!.basis, commit: "e".repeat(40) } } });
  assert.equal(out.stages.verification.state, "observed");
  assert.equal(out.stages.verification.ref?.id, "op-1");
  assert.equal(out.outcome, "indeterminate");
});
test("missing producer operation id never upgrades an asserted PASS to established", () => {
  const out = receiptOf({ ...pass, forge: { ...pass.forge!, operationId: null } });
  assert.equal(out.stages.verification.state, "unknown");
  assert.equal(out.outcome, "indeterminate");
});
test("scope incomplete keeps candidate and verification not run", () => {
  const result: LiveDevelopmentResult = { ...pass, workflow: { kind: "needs_evidence", scope: { basis: base, coverage: "partial", files: [] }, reason: "SCOPE_INCOMPLETE" }, agent: null, forge: null };
  const out = receiptOf(result);
  assert.equal(out.stages.discovery.state, "unknown");
  assert.equal(out.stages.agent.state, "not_run");
  assert.equal(out.stages.candidate.state, "not_run");
  assert.equal(out.stages.verification.state, "not_run");
  assert.equal(out.outcome, "needs_evidence");
});

test("candidate Git identity must not masquerade as an agent session ref", () => {
  const out = receiptOf(pass);
  assert.equal(out.stages.candidate.state, "established");
  assert.equal(out.stages.candidate.ref?.system, "git");
  assert.equal(out.stages.candidate.ref?.kind, "commit");
  assert.equal(out.stages.candidate.ref?.id, candidate.basis.revision);
});

test("RF context receipt keeps native render provenance instead of labeling plain context",()=>{
 const rf: LiveDevelopmentResult = {...pass,context:"reactive-fiber",contextEvidence:{system:"reactive-fiber",kind:"render",id:"rfr-1"}};
 const out=receiptOf(rf);
 assert.equal(out.stages.context.state,"established");
 assert.equal(out.stages.context.ref?.id,"rfr-1");
 assert.equal(out.stages.discovery.reason,"GIT_TRACKED_FILE_CENSUS_NOT_HX_TASK_SCOPE");
});

test("RF context receipt refuses evidence from a non-RF producer while a genuine RF render still establishes",()=>{
 const wrong: LiveDevelopmentResult = {...pass,context:"reactive-fiber",contextEvidence:{system:"forge",kind:"render",id:"rfr-1"}};
 const refused=receiptOf(wrong);
 assert.equal(refused.stages.context.state,"unknown");
 assert.equal(refused.stages.context.reason,"RF_RENDER_EVIDENCE_MISSING");
 assert.equal(refused.stages.context.ref,undefined);
 const genuine=receiptOf({...pass,context:"reactive-fiber",contextEvidence:{system:"reactive-fiber",kind:"render",id:"rfr-1"}});
 assert.equal(genuine.stages.context.state,"established");
 assert.equal(genuine.stages.context.ref?.system,"reactive-fiber");
});

test("review receipt keeps native provider approval distinct from Forge operation",()=>{
 const approval={basis:candidate.basis,verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-77"}} as const;
 const out=receiptOf({...pass,review:approval});
 assert.equal(out.stages.review.state,"observed");
 assert.equal(out.stages.review.ref?.id,"review-77");
 assert.equal(out.stages.verification.ref?.id,"op-1");
});
test("review unknown before Forge remains unestablished",()=>{
 const result: LiveDevelopmentResult={...pass,review:{basis:candidate.basis,verdict:"unknown"},forge:null,workflow:{kind:"indeterminate",reason:"REVIEW_NOT_ESTABLISHED"}};
 const out=receiptOf(result);
 assert.equal(out.stages.review.state,"unknown");
 assert.equal(out.stages.verification.state,"not_run");
 assert.equal(out.outcome,"indeterminate");
});

test("review unknown reason from the provider adapter is preserved in the receipt",()=>{
 const result: LiveDevelopmentResult={...pass,review:{basis:candidate.basis,verdict:"unknown",reason:"REVIEW_TERMINAL_ERROR:error_max_turns"},forge:null,workflow:{kind:"indeterminate",reason:"REVIEW_NOT_ESTABLISHED"}};
 const out=receiptOf(result);
 assert.equal(out.stages.review.state,"unknown");assert.equal(out.stages.review.reason,"REVIEW_TERMINAL_ERROR:error_max_turns");assert.equal(out.outcome,"indeterminate");
});

test("a failed native gate contradicting a verified workflow never establishes a verified candidate while a consistent failure still establishes",()=>{
 const failedGate={...pass.forge!,kind:"failed" as const,reason:"FORGE_GATE_FAIL"};
 const contradicted=receiptOf({...pass,forge:failedGate});
 assert.equal(contradicted.outcome,"indeterminate");
 assert.equal(contradicted.stages.verification.state,"observed");
 assert.equal(contradicted.stages.verification.ref?.id,"op-1");
 const failedWorkflow: LiveDevelopmentResult["workflow"]={kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 const consistent=receiptOf({...pass,workflow:failedWorkflow,forge:failedGate});
 assert.equal(consistent.outcome,"verification_failed");
 assert.equal(consistent.stages.verification.state,"established");
});

test("an RF render bound to the task basis reports exactly RF_RENDER_BOUND_TO_TASK_BASIS and keeps the native render ref, while a needs_evidence workflow reports no context reason",()=>{
 const rf: LiveDevelopmentResult={...pass,context:"reactive-fiber",contextEvidence:{system:"reactive-fiber",kind:"render",id:"rfr-9"}};
 const out=receiptOf(rf);
 assert.equal(out.stages.context.state,"established");
 assert.equal(out.stages.context.reason,"RF_RENDER_BOUND_TO_TASK_BASIS");
 assert.deepEqual(out.stages.context.ref,{system:"reactive-fiber",kind:"render",id:"rfr-9"});
 const noEvidence=receiptOf({...rf,workflow:{kind:"needs_evidence",scope:{basis:base,coverage:"partial",files:[]},reason:"SCOPE_INCOMPLETE"},agent:null,forge:null});
 assert.equal(noEvidence.stages.context.state,"not_run");
 assert.equal(noEvidence.stages.context.reason,undefined);
 assert.equal(noEvidence.stages.context.ref,undefined);
});

test("plain task context reports exactly PLAIN_CONTEXT_NOT_RF_RENDER and never carries an RF render ref even when contextEvidence is present",()=>{
 const plain=receiptOf(pass);
 assert.equal(plain.stages.context.state,"observed");
 assert.equal(plain.stages.context.reason,"PLAIN_CONTEXT_NOT_RF_RENDER");
 assert.equal(plain.stages.context.ref,undefined);
 const stray=receiptOf({...pass,context:"plain-task-context",contextEvidence:{system:"reactive-fiber",kind:"render",id:"rfr-stray"}});
 assert.equal(stray.stages.context.state,"observed");
 assert.equal(stray.stages.context.reason,"PLAIN_CONTEXT_NOT_RF_RENDER");
 assert.equal(stray.stages.context.ref,undefined);
 assert.equal(JSON.stringify(stray).includes("rfr-stray"),false);
});

test("a provider approval or rejection with claude-agent-sdk evidence is observed with exactly REVIEW_IS_NOT_FORGE_VERIFICATION and never moves the Forge verification stage",()=>{
 const evidence={system:"claude-agent-sdk",kind:"review-session",id:"review-5"} as const;
 for (const verdict of ["approved","rejected"] as const) {
  const out=receiptOf({...pass,review:{basis:candidate.basis,verdict,evidence}});
  assert.equal(out.stages.review.state,"observed",verdict);
  assert.equal(out.stages.review.reason,"REVIEW_IS_NOT_FORGE_VERIFICATION",verdict);
  assert.deepEqual(out.stages.review.ref,evidence,verdict);
  assert.equal(out.stages.verification.state,"established",verdict);
  assert.equal(out.stages.verification.ref?.system,"forge",verdict);
  assert.equal(out.outcome,"verified_candidate",verdict);
 }
});

test("a decided review without agent-SDK evidence is unknown with exactly REVIEW_EVIDENCE_MISSING and carries no ref: absent, empty id and wrong producer all refuse",()=>{
 const cases: Array<[string,NonNullable<LiveDevelopmentResult["review"]>]>=[
  ["no evidence",{basis:candidate.basis,verdict:"approved"}],
  ["empty id",{basis:candidate.basis,verdict:"approved",evidence:{system:"claude-agent-sdk",kind:"review-session",id:""}}],
  ["forge masquerading as review",{basis:candidate.basis,verdict:"rejected",evidence:{system:"forge",kind:"operation",id:"op-1"}}],
 ];
 for (const [label,review] of cases) {
  const out=receiptOf({...pass,review});
  assert.equal(out.stages.review.state,"unknown",label);
  assert.equal(out.stages.review.reason,"REVIEW_EVIDENCE_MISSING",label);
  assert.equal(out.stages.review.ref,undefined,label);
 }
});

test("the candidate stage reports exactly GIT_COMMITTED_BASIS with the git commit ref for verified and failed candidates, and stays reasonless not_run otherwise",()=>{
 const failedWorkflow: LiveDevelopmentResult["workflow"]={kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 for (const result of [pass,{...pass,workflow:failedWorkflow,forge:{...pass.forge!,kind:"failed" as const,reason:"FORGE_GATE_FAIL"}}]) {
  const out=receiptOf(result);
  assert.equal(out.stages.candidate.state,"established");
  assert.equal(out.stages.candidate.reason,"GIT_COMMITTED_BASIS");
  assert.deepEqual(out.stages.candidate.ref,{system:"git",kind:"commit",id:candidate.basis.revision});
 }
 for (const workflow of [
  {kind:"needs_evidence",scope:{basis:base,coverage:"partial",files:[]},reason:"SCOPE_INCOMPLETE"},
  {kind:"indeterminate",reason:"REVIEW_NOT_ESTABLISHED"},
 ] as Array<LiveDevelopmentResult["workflow"]>) {
  const out=receiptOf({...pass,workflow,agent:null,forge:null});
  assert.equal(out.stages.candidate.state,"not_run",workflow.kind);
  assert.equal(out.stages.candidate.reason,undefined,workflow.kind);
  assert.equal(out.stages.candidate.ref,undefined,workflow.kind);
 }
});

test("the furnace stage is always not_run with exactly LOCAL_HOST_NOT_FURNACE and no ref, whatever the workflow outcome",()=>{
 const failedWorkflow: LiveDevelopmentResult["workflow"]={kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 const results: Array<[string,LiveDevelopmentResult]>=[
  ["verified",pass],
  ["failed",{...pass,workflow:failedWorkflow,forge:{...pass.forge!,kind:"failed",reason:"FORGE_GATE_FAIL"}}],
  ["needs_evidence",{...pass,workflow:{kind:"needs_evidence",scope:{basis:base,coverage:"partial",files:[]},reason:"SCOPE_INCOMPLETE"},agent:null,forge:null}],
  ["indeterminate",{...pass,workflow:{kind:"indeterminate",reason:"REVIEW_NOT_ESTABLISHED"},forge:null}],
 ];
 for (const [label,result] of results) {
  const out=receiptOf(result);
  assert.equal(out.stages.furnace.state,"not_run",label);
  assert.equal(out.stages.furnace.reason,"LOCAL_HOST_NOT_FURNACE",label);
  assert.equal(out.stages.furnace.ref,undefined,label);
 }
});

const failedWorkflowPcx3: LiveDevelopmentResult["workflow"]={kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
const failedGatePcx3={...pass.forge!,kind:"failed" as const,reason:"FORGE_GATE_FAIL"};
const needsEvidencePcx3=(evidence?: {system:string;kind:string;id:string}): LiveDevelopmentResult["workflow"]=>({kind:"needs_evidence",scope:{basis:base,coverage:"partial",files:[],...(evidence?{evidence}:{})},reason:"SCOPE_INCOMPLETE"});

test("basis.base projects the candidate parent basis for verified and failed candidates and the scope basis for needs_evidence, never the candidate's own basis",()=>{
 const verified=receiptOf(pass);
 assert.deepEqual(verified.basis.base,candidate.parentBasis);
 assert.notDeepEqual(verified.basis.base,candidate.basis);
 assert.deepEqual(verified.basis.candidate,candidate.basis);
 const failed=receiptOf({...pass,workflow:failedWorkflowPcx3,forge:failedGatePcx3});
 assert.deepEqual(failed.basis.base,candidate.parentBasis);
 assert.notDeepEqual(failed.basis.base,candidate.basis);
 const needs=receiptOf({...pass,workflow:needsEvidencePcx3(),agent:null,forge:null});
 assert.deepEqual(needs.basis.base,base);
 assert.equal(needs.basis.candidate,null);
});

test("a failed gate without a producer operation id under verification_failed is indeterminate with an unknown verification, no ref and the gate reason",()=>{
 const out=receiptOf({...pass,workflow:failedWorkflowPcx3,forge:{...failedGatePcx3,operationId:null}});
 assert.equal(out.outcome,"indeterminate");
 assert.equal(out.stages.verification.state,"unknown");
 assert.equal(out.stages.verification.ref,undefined);
 assert.equal(out.stages.verification.reason,"FORGE_GATE_FAIL");
});

test("a failed gate on a commit other than the candidate revision under verification_failed is indeterminate and only observed with the native operation ref",()=>{
 const out=receiptOf({...pass,workflow:failedWorkflowPcx3,forge:{...failedGatePcx3,basis:{...failedGatePcx3.basis,commit:"e".repeat(40)}}});
 assert.equal(out.outcome,"indeterminate");
 assert.equal(out.stages.verification.state,"observed");
 assert.deepEqual(out.stages.verification.ref,{system:"forge",kind:"operation",id:"op-1"});
});

test("a passed gate contradicting a verification_failed workflow is indeterminate and only observed, while the matching failed gate still establishes verification_failed",()=>{
 const contradicted=receiptOf({...pass,workflow:failedWorkflowPcx3});
 assert.equal(contradicted.outcome,"indeterminate");
 assert.equal(contradicted.stages.verification.state,"observed");
 assert.deepEqual(contradicted.stages.verification.ref,{system:"forge",kind:"operation",id:"op-1"});
 const consistent=receiptOf({...pass,workflow:failedWorkflowPcx3,forge:failedGatePcx3});
 assert.equal(consistent.outcome,"verification_failed");
 assert.equal(consistent.stages.verification.state,"established");
});

test("the verification stage carries the gate reason exactly for a pass, a failure, an observed mismatch and a missing operation id",()=>{
 assert.equal(receiptOf(pass).stages.verification.reason,"FORGE_GATE_PASS");
 assert.equal(receiptOf({...pass,workflow:failedWorkflowPcx3,forge:failedGatePcx3}).stages.verification.reason,"FORGE_GATE_FAIL");
 assert.equal(receiptOf({...pass,forge:{...failedGatePcx3,basis:{...failedGatePcx3.basis,commit:"e".repeat(40)}}}).stages.verification.reason,"FORGE_GATE_FAIL");
 assert.equal(receiptOf({...pass,forge:{...pass.forge!,operationId:null}}).stages.verification.reason,"FORGE_GATE_PASS");
});

test("a needs_evidence scope with evidence puts that ref on the discovery stage with exactly SCOPE_INCOMPLETE while one without evidence carries no ref",()=>{
 const evidence={system:"hx",kind:"census",id:"hx-9"};
 const withRef=receiptOf({...pass,workflow:needsEvidencePcx3(evidence),agent:null,forge:null});
 assert.equal(withRef.stages.discovery.state,"unknown");
 assert.equal(withRef.stages.discovery.reason,"SCOPE_INCOMPLETE");
 assert.deepEqual(withRef.stages.discovery.ref,evidence);
 const bare=receiptOf({...pass,workflow:needsEvidencePcx3(),agent:null,forge:null});
 assert.equal(bare.stages.discovery.state,"unknown");
 assert.equal(bare.stages.discovery.reason,"SCOPE_INCOMPLETE");
 assert.equal(bare.stages.discovery.ref,undefined);
});

test("an unknown review verdict without an adapter reason reports exactly REVIEW_NOT_ESTABLISHED and carries no ref",()=>{
 const out=receiptOf({...pass,review:{basis:candidate.basis,verdict:"unknown"},forge:null,workflow:{kind:"indeterminate",reason:"REVIEW_NOT_ESTABLISHED"}});
 assert.equal(out.stages.review.state,"unknown");
 assert.equal(out.stages.review.reason,"REVIEW_NOT_ESTABLISHED");
 assert.equal(out.stages.review.ref,undefined);
});

test("an approving review and a fix-asserting agent summary never lift a failed or unestablished Forge verification to verified_candidate, and the agent stage stays observed",()=>{
 const review={basis:candidate.basis,verdict:"approved" as const,evidence:{system:"claude-agent-sdk",kind:"review-session",id:"review-r3"}};
 const agent={sessionId:"s-1",summary:"fixed: every test passes",turns:1,costUsd:0.1};
 const failedGate={...pass.forge!,kind:"failed" as const,reason:"FORGE_GATE_FAIL"};
 const failedWorkflow: LiveDevelopmentResult["workflow"]={kind:"verification_failed",candidate,verification:{basis:candidate.basis,verdict:"failed",evidence:{system:"forge",kind:"operation",id:"op-1"}}};
 const established=receiptOf({...pass,review,agent,workflow:failedWorkflow,forge:failedGate});
 assert.equal(established.outcome,"verification_failed");
 assert.equal(established.stages.review.state,"observed");
 assert.equal(established.stages.review.reason,"REVIEW_IS_NOT_FORGE_VERIFICATION");
 assert.equal(established.stages.agent.state,"observed");
 assert.notEqual(established.stages.agent.state,"established");
 assert.deepEqual(established.stages.verification.ref,{system:"forge",kind:"operation",id:"op-1"});
 assert.equal(JSON.stringify(established).includes("fixed: every test passes"),false);
 // Unestablished legs: a verified workflow with no gate observation, or with a failed gate, stays indeterminate.
 for (const [label,forge] of [["no gate",null],["failed gate",failedGate]] as const) {
  const out=receiptOf({...pass,review,agent,forge});
  assert.equal(out.outcome,"indeterminate",label);
  assert.notEqual(out.stages.verification.state,"established",label);
  assert.equal(out.stages.review.reason,"REVIEW_IS_NOT_FORGE_VERIFICATION",label);
  assert.equal(out.stages.agent.state,"observed",label);
 }
});
