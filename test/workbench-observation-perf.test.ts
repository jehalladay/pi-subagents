/** Bounded observation complexity guard: 100k update history is not queried per frame. */
import { writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { describe, expect, it } from "vitest";
import { ObservationProjection } from "../src/workbench/observation.js";

const scope={workspace:"bench",principal:"reader"};
const startedAt="2026-10-15T00:00:00Z";

describe("observation projection benchmark",()=>{
  it("retains only a hot window, indexes 1000 nodes across 100k events, and selects one without folding history",()=>{
    const projection=new ObservationProjection({maxEvents:100,maxNodes:1000,maxQuery:32});
    const samples:number[]=[];
    const memoryStart=process.memoryUsage().heapUsed;
    const start=performance.now();
    for(let i=0;i<100_000;i++){
      const begin=performance.now();
      projection.ingest({projectionEventId:`e-${i}`,source:{provider:"forge",type:"operation",id:String(i%1000)},scope,sourceSequence:Math.floor(i/1000)+1,observedAt:startedAt,kind:"native.status",node:{presentation:{title:`Op ${i%1000}`,type:"sdk-operation",statusText:"RUNNING",statusTone:"active"}},trace:{invocationId:`inv-${i%1000}`}});
      if(i%1000===0)samples.push(performance.now()-begin);
    }
    const ingestMs=performance.now()-start;
    const heapGrowthBytes=process.memoryUsage().heapUsed-memoryStart;
    const querySamples:number[]=[];
    let maxExamined=0,maxBytes=0;
    for(let j=0;j<1000;j++){
      const begin=performance.now();
      const result=projection.query({scope,invocationId:`inv-${j}`,limit:1});
      querySamples.push(performance.now()-begin);
      maxExamined=Math.max(maxExamined,result.examined);
      maxBytes=Math.max(maxBytes,Buffer.byteLength(JSON.stringify(result)));
      expect(result.nodes).toHaveLength(1);
    }
    querySamples.sort((a,b)=>a-b);samples.sort((a,b)=>a-b);
    expect(maxExamined).toBeLessThan(4);
    expect(maxBytes).toBeLessThan(2_000);
    expect(projection.stats()).toEqual({nodes:1000,events:100,edges:0});
    const receipt={benchmark:"observation-100k/1000",ingestMs,p50SampleIngestMs:samples[Math.floor(samples.length*.5)],p95SampleIngestMs:samples[Math.floor(samples.length*.95)],p50QueryMs:querySamples[500],p95QueryMs:querySamples[950],maxExamined,maxBytes,heapGrowthBytes,host:process.platform,arch:process.arch,node:process.version};
    if(process.env.WORKBENCH_OBSERVATION_BENCH_OUTPUT) writeFileSync(process.env.WORKBENCH_OBSERVATION_BENCH_OUTPUT,JSON.stringify(receipt));
    console.log(JSON.stringify(receipt));
  },60_000);
});
