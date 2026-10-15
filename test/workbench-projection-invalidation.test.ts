import {expect,it} from "vitest";
import {ObservationProjection} from "../src/workbench/observation.js";

it("invalidates only a failed native target in its reader scope",()=>{
 const p=new ObservationProjection();const scope={workspace:"one",principal:"reader"};const ref={provider:"furnace",type:"run",id:"run"};
 for(const active of [scope,{workspace:"other",principal:"reader"}]) p.refresh({source:ref,scope:active,capturedAt:"2026-10-15T00:00:00Z",observedAt:"2026-10-15T00:00:00Z",node:{title:"Run",type:"workflow",statusText:"active",statusTone:"active"}});
 p.markStale({scope,ref});
 expect(p.query({scope,ref,limit:1}).nodes[0]).toMatchObject({freshness:"stale",sourceConnectionState:"disconnected",completeness:"unknown"});
 expect(p.query({scope:{workspace:"other",principal:"reader"},ref,limit:1}).nodes[0].freshness).toBe("current");
});
