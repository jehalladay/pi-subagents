/** Active real-bd Run is started outside this test; this code only reads and closes its local observer. */
import {realpath} from 'node:fs/promises';
import {Furnace} from '@furnace/sdk';
import {describe,expect,it} from 'vitest';

import {FurnaceObserver} from '../src/workbench/furnace-observer.js';

const root=process.env.PI_FURNACE_ACTIVE_ROOT;
const runId=process.env.PI_FURNACE_ACTIVE_RUN_ID;
if(!root||!runId)throw new Error('Active Furnace test requires an independently started disposable real-bd Run identity.');
describe('external real-bd active Run',()=>{
  it('observes active attempt, closes local wait and leaves native controller working',async()=>{
    const workspace=await realpath(root);
    expect(workspace).toMatch(/^\/tmp\/pi-furnace-observe-active\.[^/]+$/);
    const client=new Furnace({binary:'furnace',cwd:workspace,timeoutMs:10_000});
    const observer=new FurnaceObserver(client,{workspaceRoot:workspace,runId,scope:{workspace,principal:'active-fixture-reader'},limits:{maxPolls:20,intervalMs:100,maxElapsedMs:30_000,attemptLimit:5,logBytes:512,callTimeoutMs:10_000}});
    const reading=await observer.snapshot();
    expect(reading).toMatchObject({source:{runId,ownership:'external'},run:{state:'active',controllerLive:'yes'},attempts:{items:[{state:'running'}]},freshness:'current'});
    observer.close();
    expect(observer.last).toMatchObject({freshness:'stale',run:{state:'active'}});
    const after=await client.runs.get(runId).status({timeoutMs:10_000});
    expect(after.data.controller?.live).toBe(true);
    expect(after.data.active.some(item=>item.state==='running')).toBe(true);
  },90_000);
});
