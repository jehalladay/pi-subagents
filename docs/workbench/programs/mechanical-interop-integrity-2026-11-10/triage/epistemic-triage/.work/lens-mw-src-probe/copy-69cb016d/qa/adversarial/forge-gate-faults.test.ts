import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const here=dirname(fileURLToPath(import.meta.url));
const report=JSON.parse(readFileSync(join(here,"evidence/2026-10-15-forge-gate-faults.json"),"utf8"));
const op=/^op-[0-9a-f]{32}$/;
test("fault evidence names its Forge build, root and revision",()=>{
 assert.equal(report.schema,"mechanical-workflows/forge-gate-faults/v1");
 assert.match(report.forge,/^forge \d/);assert.match(report.revision,/^[0-9a-f]{40}$/);assert.equal(report.error,undefined);
});
test("double start produced two distinct native operations, each pinned to the same clean commit",()=>{
 const {first,second,distinctOperations,treeCleanAfter}=report.steps.doubleStart;
 for(const o of [first,second]){assert.equal(o.commit,report.revision);assert.match(o.operationId,op);assert.ok(["passed","failed","indeterminate"].includes(o.kind));}
 assert.equal(distinctOperations,true);assert.notEqual(first.operationId,second.operationId);assert.equal(treeCleanAfter,true);
});
test("a killed controller printed no result and left the tree clean; the orphaned native gate settled",()=>{
 const k=report.steps.controllerKilled;
 assert.equal(k.exit.signal,"SIGKILL");assert.equal(k.controllerPrintedResult,false);assert.equal(k.stdout,"");
 assert.equal(k.treeCleanAfter,true);assert.ok(Number(k.forgeProcessesAfterSettle)<=Number(k.forgeProcessesBefore));
});
test("a tracked file changed during the gate is indeterminate with its operation id, never a PASS",()=>{
 const s=report.steps.staleWorkspace;
 assert.equal(s.treeWasDirtyAfterInjection,true);assert.equal(s.restoredClean,true);
 assert.notEqual(s.observation.kind,"passed");assert.equal(s.observation.kind,"indeterminate");
 assert.match(s.observation.reason,/WORKSPACE_NOT_CLEAN_AFTER_GATE|WORKSPACE_CHANGED_DURING_GATE/);assert.match(s.observation.operationId,op);
});
test("the recovery gate after the faults is a native PASS at the same commit",()=>{
 const r=report.steps.recovery.observation;
 assert.equal(r.kind,"passed");assert.equal(r.commit,report.revision);assert.match(r.operationId,op);assert.equal(report.steps.recovery.treeCleanAfter,true);
 const ids=new Set([report.steps.doubleStart.first.operationId,report.steps.doubleStart.second.operationId,report.steps.staleWorkspace.observation.operationId,r.operationId]);
 assert.equal(ids.size,4);
});

test("one-slot concurrent gates: the queued run waited the measured slot interval and neither verdict was affected",()=>{
 const read=(name:string)=>JSON.parse(readFileSync(join(here,"evidence",name),"utf8")) as {data:{gate_verdict:string;intervals:{queued:{ms:number;observed:boolean};elapsed_ms:number}};envelope:{gated_commit:string}};
 const queued=read("2026-10-15-slot-wait-queued.json");
 const immediate=read("2026-10-15-slot-wait-immediate.json");
 assert.equal(queued.envelope.gated_commit,immediate.envelope.gated_commit);
 for(const run of [queued,immediate]){assert.equal(run.data.gate_verdict,"PASS");assert.equal(run.data.intervals.queued.observed,true);}
 assert.equal(immediate.data.intervals.queued.ms,0,"the first admitted run measured no wait");
 assert.ok(queued.data.intervals.queued.ms>=immediate.data.intervals.elapsed_ms-1500,"the queued run waited for the running gate's slot");
 assert.ok(queued.data.intervals.queued.ms>1000);
});
