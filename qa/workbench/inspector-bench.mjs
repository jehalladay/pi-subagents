import {cpus} from "node:os";
/** Deterministic 100k-update, 1000-node compiled terminal inspector benchmark. */
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {writeFileSync} from 'node:fs';
import {ObservationProjection} from '../../dist/workbench/observation.js';
import {initialInspectorState,layoutInspector,reduceInspectorKey} from '../../dist/ui/workflow-inspector.js';
const scope={workspace:'bench',principal:'reader'};
const stamp='2026-10-15T00:00:00Z';
const projection=new ObservationProjection({maxEvents:128,maxNodes:1200,maxEdges:1200,maxQuery:40});
const memoryStart=process.memoryUsage().heapUsed;
const start=performance.now();
for(let i=0;i<1000;i++)projection.refresh({source:{provider:i%2?'forge':'furnace',type:'operation',id:String(i)},scope,capturedAt:stamp,observedAt:stamp,sequence:1,node:{title:`Op 漢 ${i}`,type:'sdk-operation',statusText:'RUNNING',statusTone:'active'},trace:{invocationId:'bench-run'},coverage:'partial'});
for(let i=0;i<100000;i++)projection.ingest({projectionEventId:`e-${i}`,source:{provider:i%2?'forge':'furnace',type:'operation',id:String(i%1000)},scope,sourceSequence:Math.floor(i/1000)+2,observedAt:stamp,kind:'native.status',node:{presentation:{title:`Op 漢 ${i%1000}`,type:'sdk-operation',statusText:'RUNNING',statusTone:'active'}}});
const ingestMs=performance.now()-start;
const model={projection,scope,invocationId:'bench-run',title:'W15 fixture',status:'running'};
let state=initialInspectorState();
const samples=[];let maxRenderedRows=0,maxTerminalBytes=0,maxChangedBytes=0;
let old=[];
for(let i=0;i<1000;i++){
  const begin=performance.now();
  if(i%19===0)state=reduceInspectorKey('\t',state,model).state;
  else state=reduceInspectorKey(i%2?'j':'k',state,model).state;
  const lines=layoutInspector(model,state,{width:i%11===0?120:80,rows:i%11===0?40:24,ascii:i%7===0});
  samples.push(performance.now()-begin);
  maxRenderedRows=Math.max(maxRenderedRows,lines.length);
  const bytes=Buffer.byteLength(lines.join('\n'));
  maxTerminalBytes=Math.max(maxTerminalBytes,bytes);
  const changed=lines.reduce((sum,line,j)=>sum+(line===old[j]?0:Buffer.byteLength(line)+1),0);
  maxChangedBytes=Math.max(maxChangedBytes,changed);
  old=lines;
}
samples.sort((a,b)=>a-b);
const receipt={benchmark:'inspector-100k/1000',utc:new Date().toISOString(),revision:process.env.W15_REVISION??'working-tree',node:process.version,arch:process.arch,platform:process.platform,cpus:cpus().length,ingestMs,p50NavigationMs:samples[Math.floor(samples.length*.5)],p95NavigationMs:samples[Math.floor(samples.length*.95)],maxNavigationMs:samples.at(-1),maxRenderedRows,maxTerminalBytes,maxChangedBytes,retained:projection.stats(),heapGrowthBytes:process.memoryUsage().heapUsed-memoryStart,samples:samples.length};
assert.equal(projection.stats().nodes,1000);
assert.ok(maxRenderedRows<=40);
if(process.env.W15_BENCH_RECEIPT)writeFileSync(process.env.W15_BENCH_RECEIPT,JSON.stringify(receipt));
console.log(JSON.stringify(receipt));
if(receipt.p95NavigationMs>20)process.exitCode=1;
