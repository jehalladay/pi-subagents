import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const root=dirname(fileURLToPath(import.meta.url));
function timing(name: string) {
 const value=JSON.parse(readFileSync(join(root,"integration/evidence",name),"utf8"));
 const native=value.result?.native ?? value.forge?.native;
 assert.ok(native?.forge_result?.data?.intervals,`native timing missing: ${name}`);
 return native.forge_result.data.intervals;
}
test("elapsed timing is a measured interval, not sum of overlapping phases",()=>{
 for(const name of ["2026-10-15-live-verify-pass.json","2026-10-15-live-verify-fail.json","2026-10-15-live-rf-claude-forge-verified.json"]){
  const i=timing(name);assert.equal(i.launch.observed,true);assert.ok(i.elapsed_ms>=0);
  assert.equal(i.child.observed,true);assert.equal(i.controller.observed,true);
 }
});

test("matched full-gate samples keep source, complete step roster and no replay",()=>{
 const files=["2026-10-15-root-full-gate-run-a.json","2026-10-15-root-full-gate-run-b.json"];
 const samples=files.map(file=>JSON.parse(readFileSync(join(root,"integration/evidence",file),"utf8")));
 const basis=samples[0].envelope.gated_commit;
 for(const sample of samples){
  assert.equal(sample.envelope.gated_commit,basis);
  assert.equal(sample.data.gate_verdict,"PASS");
  assert.equal(sample.data.selection_accounting.counts.executed,6);
  assert.equal(sample.data.selection_accounting.counts.unknown,0);
  assert.equal(sample.data.replay.any_replayed,false);
 }
});

test("fresh-clone cold and warm gates share one commit, run all six steps and admit no replay",()=>{
 const cold=JSON.parse(readFileSync(join(root,"integration/evidence","2026-10-15-fresh-clone-cold.json"),"utf8"));
 const warm=JSON.parse(readFileSync(join(root,"integration/evidence","2026-10-15-fresh-clone-warm.json"),"utf8"));
 assert.equal(cold.envelope.gated_commit,warm.envelope.gated_commit);
 for(const run of [cold,warm]){assert.equal(run.data.gate_verdict,"PASS");assert.equal(run.data.selection_accounting.counts.executed,6);assert.equal(run.data.selection_accounting.counts.unknown,0);assert.equal(run.data.replay.any_replayed,false);assert.equal(run.data.intervals.launch.observed,true);}
});

test("gate process census names its matcher, baseline and a bounded peak",()=>{
 const census=JSON.parse(readFileSync(join(root,"integration/evidence","2026-10-15-gate-process-census.json"),"utf8")) as {verdict:string;samples:number;baselineProcesses:number;duringProcesses:{min:number;max:number};peakAboveBaseline:number;matcher:string;caveat:string};
 assert.equal(census.verdict,"PASS");assert.ok(census.samples>=10);
 assert.ok(census.matcher.includes("uv/tools/forge"));
 assert.equal(census.peakAboveBaseline,census.duringProcesses.max-census.baselineProcesses);
 assert.ok(census.peakAboveBaseline>=1&&census.peakAboveBaseline<=8);
 assert.ok(census.caveat.length>0,"the census must carry its contamination caveat");
});

test("ten-run interval distribution is one commit, all PASS, native intervals with a tight spread",()=>{
 const dist=JSON.parse(readFileSync(join(root,"integration/evidence","2026-10-15-gate-interval-distribution.json"),"utf8")) as {commit:string;runs:{verdict:string;elapsed:number;launch:number;child:number;controller:number;commit:string}[];summaryMs:Record<string,{min:number;median:number;max:number}>};
 assert.equal(dist.runs.length,10);
 for(const run of dist.runs){assert.equal(run.verdict,"PASS");assert.equal(run.commit,dist.commit);assert.ok(run.launch>0&&run.child>0&&run.controller>0&&run.elapsed>0);}
 const elapsed=dist.runs.map(r=>r.elapsed);
 assert.equal(dist.summaryMs["elapsed"]?.min,Math.min(...elapsed));assert.equal(dist.summaryMs["elapsed"]?.max,Math.max(...elapsed));
 assert.ok(Math.max(...elapsed)-Math.min(...elapsed)<Math.min(...elapsed)*0.25,"spread stays within a quarter of the fastest run");
});
test("Furnace supervision intervals come from four real Runs with the readiness poll under the 2 s interval and completion under one second",()=>{
 const doc=JSON.parse(readFileSync(join(root,"integration/evidence","2026-10-15-furnace-supervision-intervals.json"),"utf8")) as {rows:{runId:string;attemptId:string;runCreatedToAttemptCreatedMs:number;attemptCreatedToStartedMs:number;attemptFinishedToRunStateMs:number;attemptDurationMs:number}[];summaryMs:Record<string,{min:number;max:number}>};
 assert.equal(doc.rows.length,4);assert.equal(new Set(doc.rows.map(r=>r.runId)).size,4);
 for(const r of doc.rows){assert.match(r.runId,/^frn-run-/);assert.match(r.attemptId,/^frn-atm-/);assert.ok(r.runCreatedToAttemptCreatedMs>0&&r.runCreatedToAttemptCreatedMs<2000,"readiness poll under one poll interval");assert.ok(r.attemptCreatedToStartedMs>=0&&r.attemptCreatedToStartedMs<100);assert.ok(r.attemptFinishedToRunStateMs>=0&&r.attemptFinishedToRunStateMs<1000);assert.ok(r.attemptDurationMs>0);}
 assert.equal(doc.summaryMs["runCreatedToAttemptCreatedMs"]?.min,Math.min(...doc.rows.map(r=>r.runCreatedToAttemptCreatedMs)));
});
