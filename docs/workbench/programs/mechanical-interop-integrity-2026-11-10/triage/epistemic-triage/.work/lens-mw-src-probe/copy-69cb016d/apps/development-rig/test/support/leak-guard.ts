/** Test-only leak detection: a child process that outlives its test keeps node --test from exiting (MechanicalWorkflows-lt2z). */
function liveChildCount():number{return process.getActiveResourcesInfo().filter(name=>name==="ProcessWrap").length}
/**
 * Rejects with CHILD_PROCESS_LEAKED when live child-process handles stay above the
 * baseline. libuv closes an exited child's handle a few ticks after its close event,
 * so a handle only counts as leaked once it persists past a short settle window.
 */
export async function assertNoLeakedChildren(label:string,baseline=0,settleMs=1000):Promise<void>{
 const end=Date.now()+settleMs;
 while(liveChildCount()>baseline&&Date.now()<end)await new Promise<void>(resolve=>setTimeout(resolve,10));
 const live=liveChildCount();
 if(live>baseline)throw new Error("CHILD_PROCESS_LEAKED: "+label+" left "+String(live-baseline)+" live child process handle(s)");
}
/** Runs fn and asserts it left no more live child process handles than it found. */
export async function withoutLeakedChildren<T>(label:string,fn:()=>Promise<T>):Promise<T>{
 const baseline=liveChildCount();
 const out=await fn();
 await assertNoLeakedChildren(label,baseline);
 return out;
}
/** True while the pid is a live process (signal 0 probes without delivering). */
export function pidAlive(pid:number):boolean{try{process.kill(pid,0);return true}catch(error){return (error as NodeJS.ErrnoException).code==="EPERM"}}
/** Counts of the event-loop handle kinds a settled bounded process must not leave behind (MechanicalWorkflows-6hbd). */
export type HandleCounts={readonly Timeout:number;readonly PipeWrap:number;readonly ProcessWrap:number};
export function handleCounts():HandleCounts{
 const names=process.getActiveResourcesInfo();
 const count=(kind:string):number=>names.filter(name=>name===kind).length;
 return {Timeout:count("Timeout"),PipeWrap:count("PipeWrap"),ProcessWrap:count("ProcessWrap")};
}
/**
 * Rejects with HANDLE_LEAKED when a ref'd Timeout, PipeWrap or ProcessWrap handle stays above
 * the baseline taken before the call. libuv closes a destroyed pipe a few ticks after the
 * call, so a handle only counts once it persists past a short settle window; an armed
 * timer outlives any such window, so a timer that should have been cleared is caught.
 */
export async function assertNoExcessHandles(label:string,baseline:HandleCounts,settleMs=250):Promise<void>{
 const over=():string[]=>{const now=handleCounts();return (Object.keys(baseline) as (keyof HandleCounts)[]).filter(kind=>now[kind]>baseline[kind]).map(kind=>String(now[kind]-baseline[kind])+" "+kind)};
 const end=Date.now()+settleMs;
 while(over().length>0&&Date.now()<end)await new Promise<void>(resolve=>setImmediate(resolve));
 const left=over();
 if(left.length>0)throw new Error("HANDLE_LEAKED: "+label+" left "+left.join(", "));
}
