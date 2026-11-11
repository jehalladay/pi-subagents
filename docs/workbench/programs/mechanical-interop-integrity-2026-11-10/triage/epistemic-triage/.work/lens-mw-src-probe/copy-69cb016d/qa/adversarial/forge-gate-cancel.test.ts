import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const here=dirname(fileURLToPath(import.meta.url));
const report=JSON.parse(readFileSync(join(here,"evidence/2026-10-15-forge-gate-cancel.json"),"utf8"));
const op=/^op-[0-9a-f]{32}$/;
test("the cancel receipt accepted the request but established nothing",()=>{
 const c=report.steps.cancelRunningGate;
 assert.equal(report.error,undefined);assert.match(c.startedId,op);assert.equal(c.negotiation,"compatible");
 assert.deepEqual(c.receipt,{cancelIntent:"CANCEL_REQUESTED",cancelAcceptance:"ACCEPTED",cancellationEstablished:false});
 assert.equal(c.cancelError,null);assert.equal(c.invokeError,null);
});
test("the operation's own terminal established the cancellation and the host never read a verdict",()=>{
 const c=report.steps.cancelRunningGate;
 assert.equal(c.terminal.status,"error");assert.equal(c.terminal.gate_verdict,null);assert.equal(c.terminal.disposition,null);
 assert.match(c.terminal.rawText,/"establishment": ?"CANCELLED_CONFIRMED"/);assert.match(c.terminal.rawText,/"terminal_disposition": ?"cancelled-established"/);
 assert.ok(!c.terminal.keys.includes("forge_result"),"the cancelled answer carried no forge_result wrapper");
 assert.ok(!c.terminal.keys.includes("operation_id"),"the cancelled answer named its operation only under data");
 assert.notEqual(c.workflowReading.kind,"passed");assert.equal(c.workflowReading.kind,"indeterminate");assert.equal(c.treeCleanAfter,true);
});
test("the current classifier reads the recorded cancelled terminal as an established cancellation with its operation id",async()=>{
 const {classifyGateResponse}=await import(pathToFileURL(join(here,"../../apps/development-rig/dist/live-gate.js")).href);
 const c=report.steps.cancelRunningGate;
 const frame={status:"error",terminal_disposition:"cancelled-established",envelope:null,data:{operation_id:c.startedId,terminal_disposition:"cancelled-established",cancellation:{establishment:"CANCELLED_CONFIRMED",requested:true}}};
 const read=classifyGateResponse(frame,{commit:report.revision,tree:"0".repeat(40),clean:true},report.root);
 assert.equal(read.kind,"indeterminate");assert.equal(read.reason,"FORGE_OPERATION_CANCELLED");assert.equal(read.operationId,c.startedId);
});
test("closing the owned transport right after dispatch is a typed transport loss with no native record and a clean tree",()=>{
 const l=report.steps.lostAcknowledgement;
 assert.equal(l.requestResolved,false);assert.equal(l.error.name,"TransportClosed");assert.equal(l.error.code,"FORGE_TRANSPORT_CLOSED");
 assert.equal(l.operationLogsAfter,l.operationLogsBefore);assert.equal(l.treeCleanAfter,true);
});
test("the recovery gate is a native PASS at the same commit",()=>{
 const r=report.steps.recovery;assert.equal(r.kind,"passed");assert.equal(r.commit,report.revision);assert.match(r.operationId,op);assert.equal(r.treeCleanAfter,true);
});
test("the upstream fix recheck shows both answer shapes and the installed binary unchanged",()=>{
 interface Probe{answer:{topLevel:{operation_id:string|null;terminal_fact:string|null;forge_result_present:boolean;status:string|null};nested:{establishment:string|null;dataOperationId:string|null;delivery:{complete:boolean;dropped_count:number}|null};answerTopKeys:string[]}}
 const doc=JSON.parse(readFileSync(join(here,"evidence","2026-10-15-forge-cancel-fix-recheck.json"),"utf8")) as {fixCommit:string;probeA:Probe;probeB:Probe};
 const a=doc.probeA.answer,b=doc.probeB.answer;
 assert.match(doc.fixCommit,/^669cae5e75/);
 assert.match(a.topLevel.operation_id??"",/^op-[0-9a-f]{32}$/);assert.equal(a.topLevel.terminal_fact,"cancelled-established");assert.equal(a.topLevel.forge_result_present,true);
 assert.equal(b.topLevel.operation_id,null);assert.equal(b.topLevel.terminal_fact,null);assert.equal(b.topLevel.forge_result_present,false);
 for(const p of [a,b]){assert.equal(p.nested.establishment,"CANCELLED_CONFIRMED");assert.match(p.nested.dataOperationId??"",/^op-[0-9a-f]{32}$/);assert.equal(p.nested.delivery?.complete,true);assert.equal(p.topLevel.status,"error");}
 assert.ok(a.answerTopKeys.includes("forge_result")&&!b.answerTopKeys.includes("forge_result"));
});
