/**
 * Run one external program with a hard wall-clock bound and no survivors.
 * The child leads its own process group; the group is killed on timeout, on
 * output overflow, after the leader exits and its pipes stay open longer than
 * the drain grace, and again on every settle, so a grandchild that inherited
 * the pipes cannot hold the caller's event loop open (MechanicalWorkflows-lt2z).
 */
import { spawn } from "node:child_process";
export interface BoundedProcessOptions { readonly cwd?:string; readonly timeoutMs:number; readonly maxBuffer:number; readonly drainGraceMs?:number }
export interface BoundedProcessResult { readonly stdout:string; readonly stderr:string }
const live=new Set<number>();
function killGroup(pgid:number):void{try{process.kill(-pgid,"SIGKILL")}catch{/* group already gone */}}
process.once("exit",()=>{for(const pgid of live)killGroup(pgid)});
export function runBoundedProcess(file:string,args:readonly string[],options:BoundedProcessOptions):Promise<BoundedProcessResult> {
 return new Promise((resolve,reject)=>{
  const child=spawn(file,[...args],{cwd:options.cwd,detached:true,stdio:["ignore","pipe","pipe"]});
  const pgid=child.pid;
  if(pgid!==undefined)live.add(pgid);
  let stdout="",stderr="",size=0,settled=false,exitCode:number|null=null,exitSignal:NodeJS.Signals|null=null,exited=false;
  let drain:NodeJS.Timeout|undefined;
  const timer=setTimeout(()=>finish(new Error("PROCESS_TIMEOUT: "+file+" exceeded "+String(options.timeoutMs)+" ms")),options.timeoutMs);
  function finish(error?:Error):void{
   if(settled)return;settled=true;clearTimeout(timer);clearTimeout(drain);
   if(pgid!==undefined){killGroup(pgid);live.delete(pgid)}
   child.stdout?.destroy();child.stderr?.destroy();
   // Settle only once the leader is reaped, so no ProcessWrap handle outlives the promise.
   const done=():void=>{if(error)reject(error);else resolve({stdout,stderr})};
   if(exited||child.pid===undefined)done();else child.once("exit",done);
  }
  function settleExit():void{
   if(exitCode===0&&exitSignal===null)finish();
   else finish(new Error("PROCESS_EXIT_NONZERO: "+file+" exited "+String(exitSignal??exitCode)+"\n"+stderr));
  }
  const take=(sink:"out"|"err")=>(chunk:string)=>{
   size+=Buffer.byteLength(chunk);
   if(size>options.maxBuffer){finish(new Error("PROCESS_OUTPUT_LIMIT: "+file+" printed more than "+String(options.maxBuffer)+" bytes"));return}
   if(sink==="out")stdout+=chunk;else stderr+=chunk;
  };
  child.stdout?.setEncoding("utf8");child.stderr?.setEncoding("utf8");
  child.stdout?.on("data",take("out"));child.stderr?.on("data",take("err"));
  child.on("error",finish);
  child.on("exit",(code,signal)=>{exited=true;if(settled)return;exitCode=code;exitSignal=signal;drain=setTimeout(settleExit,options.drainGraceMs??1000)});
  child.on("close",settleExit);
 });
}
