import {expect,it} from "vitest";
import {ObservationProjection} from "../src/workbench/observation.js";

it("invalidates only a failed native target in its reader scope",()=>{
 const p=new ObservationProjection();const scope={workspace:"one",principal:"reader"};const ref={provider:"furnace",type:"run",id:"run"};
 for(const active of [scope,{workspace:"other",principal:"reader"}]) p.refresh({source:ref,scope:active,capturedAt:"2026-10-15T00:00:00Z",observedAt:"2026-10-15T00:00:00Z",node:{title:"Run",type:"workflow",statusText:"active",statusTone:"active"}});
 p.markStale({scope,ref});
 expect(p.query({scope,ref,limit:1}).nodes[0]).toMatchObject({freshness:"stale",sourceConnectionState:"disconnected",completeness:"unknown"});
 expect(p.query({scope:{workspace:"other",principal:"reader"},ref,limit:1}).nodes[0].freshness).toBe("current");
});

it("carries forge-operation evidence refs onto ObservedNode and keeps the 32-reference cap",()=>{
 const p=new ObservationProjection();const scope={workspace:"one",principal:"reader"};const ref={provider:"forge",type:"operation",id:"forge-op-9"};
 const presentation={title:"Gate",type:"sdk-operation" as const,statusText:"partial",statusTone:"unknown" as const};
 expect(p.ingest({projectionEventId:"evidence-1",source:ref,scope,sourceSequence:1,observedAt:"2026-10-15T00:00:00Z",kind:"native.node",node:{presentation},trace:{invocationId:"wf_evidence"},evidenceRefs:["forge-operation:forge-op-9"]})).toBe("applied");
 expect(p.query({scope,ref,limit:1}).nodes[0].evidenceRefs).toEqual(["forge-operation:forge-op-9"]);
 expect(()=>p.ingest({projectionEventId:"evidence-2",source:ref,scope,sourceSequence:2,observedAt:"2026-10-15T00:00:01Z",kind:"native.node",node:{presentation},evidenceRefs:Array.from({length:33},(_,i)=>`forge-operation:${i}`)})).toThrow(/evidence payload limit/);
});
