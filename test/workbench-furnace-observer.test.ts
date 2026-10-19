import {describe, expect, it, vi} from 'vitest';
import {FurnaceObserver, type FurnaceObserverClient} from '../src/workbench/furnace-observer.js';

const run = {run_id:'frn-run-r1',beads_run_id:'bd-r1',workspace:'/tmp/external-ws',state:'active',mode:'ephemeral_wisp',furnace_version:'0.1.0',created_at:'2026-10-15T00:00:00Z',updated_at:'2026-10-15T00:00:01Z',state_since:'2026-10-15T00:00:01Z',executor:'runner',max_parallel:1,active:[],failed:[],failed_total:0,attention:[],unreadable:[],corrupt_events:[],corrupt_events_total:0,conflicts:[],completed:0,total:1} as const;
const attempt = {attempt_id:'frn-atm-a1',run_id:run.run_id,work_id:'bd-work-a',title:'Bearer TOPSECRET',ordinal:1,executor:'runner',state:'running',created_at:'2026-10-15T00:00:01Z'} as const;
function client() {
  const status=vi.fn(async () => ({kind:'run_status',requestId:'req-1',exit:{code:0,signal:null},data:{...run}}));
  const list=vi.fn(async () => ({kind:'attempt_list',requestId:'req-2',exit:{code:0,signal:null},data:{run_id:run.run_id,beads_run_id:run.beads_run_id,complete:true,limit:5,returned:1,next_cursor:null,attempts:[attempt],unreadable:[]}}));
  const read=vi.fn(async () => ({kind:'logs_read',requestId:'req-3',exit:{code:0,signal:null},data:{run_id:run.run_id,attempt_id:attempt.attempt_id,stream:'stdout',complete:false,limit:512,returned:1,next_cursor:'opaque',lossy:false,lines:['Bearer TOPSECRET']}}));
  const stop=vi.fn(); const pause=vi.fn(); const resume=vi.fn(); const retry=vi.fn();
  return {client:{runs:{get:vi.fn(() => ({status,stop,pause,resume}))},attempts:{list},logs:{read},work:{retry}} as unknown as FurnaceObserverClient,status,list,read,stop,pause,resume,retry};
}
const opts={workspaceRoot:'/tmp/external-ws',runId:run.run_id,scope:{workspace:'/tmp/external-ws',principal:'tester'},limits:{maxPolls:2,intervalMs:1,maxElapsedMs:5000,attemptLimit:5,logBytes:512,callTimeoutMs:2000}};

describe('Furnace native external observer',()=>{
  it('reads native Run, Attempt and bounded log reference without promoting output or owning the Run',async()=>{
    const c=client(); const observer=new FurnaceObserver(c.client,opts);
    const reading=await observer.snapshot();
    expect(reading).toMatchObject({source:{provider:'furnace',runId:run.run_id,beadsRunId:run.beads_run_id,ownership:'external'},run:{state:'active',mode:'ephemeral_wisp',progress:{completed:0,total:1}},attempts:{complete:true,items:[{id:attempt.attempt_id,workId:attempt.work_id,state:'running'}]},logs:[{attemptId:attempt.attempt_id,stream:'stdout',complete:false,lossy:false}]});
    expect(reading.freshness).toBe('current');
    expect(JSON.stringify(reading)).not.toContain('TOPSECRET');
    expect(c.status).toHaveBeenCalledWith({timeoutMs:2000});
    expect(c.list).toHaveBeenCalledWith(run.run_id,{limit:5},{timeoutMs:2000});
    expect(c.read).toHaveBeenCalledWith(run.run_id,{attempt:attempt.attempt_id,limit:512,stream:'stdout'},{timeoutMs:2000});
    observer.close(); expect([c.stop,c.pause,c.resume,c.retry].every(fn=>fn.mock.calls.length===0)).toBe(true);
  });
  it('refuses wrong workspace, run identity and mismatched attempt provenance before exposing a reading',async()=>{
    for (const data of [{...run,workspace:'/tmp/other'}, {...run,run_id:'frn-run-other'}]) {
      const c=client(); c.status.mockResolvedValueOnce({kind:'run_status',requestId:'r',exit:{code:0,signal:null},data} as Awaited<ReturnType<typeof c.status>>);
      await expect(new FurnaceObserver(c.client,opts).snapshot()).rejects.toMatchObject({category:'authorization'});
      expect(c.list).not.toHaveBeenCalled();
    }
    const c=client(); c.list.mockResolvedValueOnce({kind:'attempt_list',requestId:'r',exit:{code:0,signal:null},data:{run_id:run.run_id,beads_run_id:run.beads_run_id,complete:true,limit:5,returned:1,next_cursor:null,attempts:[{...attempt,run_id:'other'}],unreadable:[]}} as unknown as Awaited<ReturnType<typeof c.list>>);
    await expect(new FurnaceObserver(c.client,opts).snapshot()).rejects.toMatchObject({category:'unavailable'});
    expect(c.read).not.toHaveBeenCalled();
  });
  it('reconnects only by fresh snapshot, marking a failed read stale instead of asserting last-known RUNNING',async()=>{
    const c=client(); const observer=new FurnaceObserver(c.client,opts);
    const stream=observer.observe();
    const first=await stream.next(); expect(first.value?.freshness).toBe('current');
    c.status.mockRejectedValueOnce(new Error('socket lost Bearer TOPSECRET'));
    const second=await stream.next();
    expect(second.value).toMatchObject({freshness:'stale',connection:'disconnected',run:{state:'active'},error:{category:'unavailable'}});
    expect(JSON.stringify(second.value)).not.toContain('TOPSECRET');
    const exhausted=await stream.next(); expect(exhausted.value).toMatchObject({freshness:'stale',connection:'disconnected'});
    const finished=await stream.next(); expect(finished.done).toBe(true);
    expect(observer.last?.freshness).toBe('stale');
    expect((await observer.snapshot()).freshness).toBe('current');
    observer.close();
  });
  it('a bounded poll ending on a still-active Run emits last-known stale state instead of ending silently',async()=>{
    const c=client();const observer=new FurnaceObserver(c.client,{...opts,limits:{...opts.limits,maxPolls:1}});
    const iterator=observer.observe();
    expect((await iterator.next()).value?.freshness).toBe('current');
    expect((await iterator.next()).value).toMatchObject({freshness:'stale',run:{state:'active'}});
    expect((await iterator.next()).done).toBe(true);
  });
  it('closing cancels an idle polling wait without native control, and abort signal refuses an initial read',async()=>{
    const c=client(); const observer=new FurnaceObserver(c.client,{...opts,limits:{...opts.limits,intervalMs:10000,maxPolls:10,maxElapsedMs:30000}});
    const iter=observer.observe(); expect((await iter.next()).done).toBe(false);
    const pending=iter.next(); observer.close();
    expect((await pending).done).toBe(true);
    expect(c.status).toHaveBeenCalledTimes(1);
    expect(c.stop).not.toHaveBeenCalled(); expect(c.pause).not.toHaveBeenCalled();
    const cancelled=new AbortController(); cancelled.abort();
    await expect(new FurnaceObserver(c.client,{...opts,signal:cancelled.signal}).snapshot()).rejects.toMatchObject({category:'transport'});
  });
  it('refuses malformed native shape before attempting further reads, and never promotes stale data to a confirmed projection',async()=>{
    const c=client();
    c.status.mockResolvedValueOnce({kind:'run_status',requestId:'r',exit:{code:0,signal:null},data:{...run,active:null}} as never);
    await expect(new FurnaceObserver(c.client,opts).snapshot()).rejects.toMatchObject({category:'unavailable'});
    expect(c.list).not.toHaveBeenCalled();
    const d=client();d.list.mockResolvedValueOnce({kind:'attempt_list',requestId:'r',exit:{code:0,signal:null},data:{run_id:run.run_id,beads_run_id:run.beads_run_id,complete:true,limit:5,returned:1,next_cursor:null,attempts:null,unreadable:[]}} as never);
    await expect(new FurnaceObserver(d.client,opts).snapshot()).rejects.toMatchObject({category:'unavailable'});
    const reader=new FurnaceObserver(client().client,opts);
    const fresh=await reader.snapshot();reader.close();
    expect(()=>reader.projectionSnapshot(reader.last!)).toThrow(/stale/i);
    expect(reader.projectionSnapshot(fresh)).toMatchObject({source:{provider:'furnace',id:run.run_id},node:{statusText:'active'}});
  });
  it('rejects response-kind drift before attaching a foreign page',async()=>{
    const c=client();c.status.mockResolvedValueOnce({kind:'attempt_list',requestId:'r',exit:{code:0,signal:null},data:{...run}} as never);
    await expect(new FurnaceObserver(c.client,opts).snapshot()).rejects.toMatchObject({category:'unavailable'});
    expect(c.list).not.toHaveBeenCalled();
  });
  it('marks last confirmed Run stale after every rejected native read, preserving the refusal category',async()=>{
    const cases=[
      {category:'unavailable',install:(c:ReturnType<typeof client>)=>c.status.mockResolvedValueOnce({kind:'attempt_list',requestId:'r',exit:{code:0,signal:null},data:{...run}} as never)},
      {category:'unavailable',install:(c:ReturnType<typeof client>)=>c.status.mockResolvedValueOnce({kind:'run_status',requestId:'r',exit:{code:0,signal:null},data:{...run,active:null}} as never)},
      {category:'authorization',install:(c:ReturnType<typeof client>)=>c.status.mockResolvedValueOnce({kind:'run_status',requestId:'r',exit:{code:0,signal:null},data:{...run,workspace:'/tmp/foreign',state:'completed'}} as never)},
      {category:'unavailable',install:(c:ReturnType<typeof client>)=>c.list.mockResolvedValueOnce({kind:'attempt_list',requestId:'r',exit:{code:0,signal:null},data:{run_id:run.run_id,beads_run_id:run.beads_run_id,complete:true,limit:5,returned:1,next_cursor:null,attempts:null,unreadable:[]}} as never)},
      {category:'unavailable',install:(c:ReturnType<typeof client>)=>c.read.mockResolvedValueOnce({kind:'logs_read',requestId:'r',exit:{code:0,signal:null},data:{run_id:'foreign',attempt_id:attempt.attempt_id,stream:'stdout',complete:true,limit:512,returned:0,next_cursor:null,lossy:false,lines:[]}} as never)},
    ];
    for(const {category,install} of cases){
      const c=client();const observer=new FurnaceObserver(c.client,opts);
      expect((await observer.snapshot()).freshness).toBe('current');
      install(c);
      await expect(observer.snapshot()).rejects.toMatchObject({category});
      expect(observer.last).toMatchObject({freshness:'stale',connection:'disconnected',completeness:'unknown',run:{state:'active'},source:{workspaceRoot:opts.workspaceRoot,runId:run.run_id}});
      expect(observer.last?.run.state).not.toBe('completed');
      expect(()=>observer.projectionSnapshot(observer.last!)).toThrow(/stale/i);
    }
  });
  it('reports missing Run and unknown errors without returning untrusted source messages',async()=>{
    const c=client();c.status.mockRejectedValueOnce(Object.assign(new Error('Bearer TOPSECRET'),{code:'run_not_found'}));
    await expect(new FurnaceObserver(c.client,opts).snapshot()).rejects.toMatchObject({category:'unavailable',message:'Furnace status unavailable (run_not_found)'});
    expect(c.list).not.toHaveBeenCalled();
  });
  it('rejects invalid polling budgets, and never describes an Attempt output stream as a Run lifecycle stream',async()=>{
    const c=client();
    expect(()=>new FurnaceObserver(c.client,{...opts,limits:{...opts.limits,maxPolls:0}})).toThrow();
    const result=await new FurnaceObserver(c.client,opts).snapshot();
    expect(result.stream).toMatchObject({runLifecycle:'unavailable',attemptOutput:'logs --follow (one attempt only)',cursor:'unavailable'});
    expect(result.attempts.nextCursor).toBeNull();
    expect(result.logs[0].nextCursor).toBe('opaque');
  });
});
