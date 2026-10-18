/** Read-only attachment to a Furnace Run created by another controller.
 * SDK Run.events() follows one Attempt's output, NOT Run lifecycle events.
 * This reader polls bounded snapshots and deliberately never acquires Run ownership.
 */
import type {AttemptDto, AttemptListDto, AttemptOutcome, AttemptState, HealthyWait, LogsReadDto, ProgressUnavailable, Response, RunMode, RunState, RunStatusDto} from '@furnace/sdk';
import {CapabilityError} from './capability-registry.js';
import type {Interval, NativeRef, NativeSnapshot, ObservationProjection, ObservationScope, Presentation} from './observation.js';
import {redactWorkbenchText} from './redaction.js';

export interface FurnaceObserverClient {
  runs: {get(id:string): {status(call?:{timeoutMs?:number}):Promise<Response<RunStatusDto>>}};
  attempts: {list(id:string,request?:{limit?:number},call?:{timeoutMs?:number}):Promise<Response<AttemptListDto>>};
  logs: {read(id:string,request?:{attempt?:string;limit?:number;stream?:'stdout'|'stderr'},call?:{timeoutMs?:number}):Promise<Response<LogsReadDto>>};
}
export interface FurnaceObserverLimits {maxPolls:number;intervalMs:number;maxElapsedMs:number;attemptLimit:number;logBytes:number;callTimeoutMs:number}
export interface FurnaceObserverOptions {workspaceRoot:string;runId:string;scope:ObservationScope;limits:FurnaceObserverLimits;signal?:AbortSignal}
export interface FurnaceAttemptReference {
  id:string;runId:string;workId:string;ordinal:number;executor:string;state:AttemptState;outcome?:AttemptOutcome;
  createdAt:string;startedAt?:string;finishedAt?:string;exitCode?:number;terminationCause?:AttemptDto['termination_cause'];
}
export const FURNACE_EXTERNAL_OBSERVATION_CONTRACT = 'furnace.external-observation/v1';
export interface FurnaceLogReference {attemptId:string;stream:'stdout'|'stderr';complete:boolean;lossy:boolean;returned:number;nextCursor:string|null}
export interface FurnaceReading {
  contract:typeof FURNACE_EXTERNAL_OBSERVATION_CONTRACT;
  source:{provider:'furnace';runId:string;beadsRunId:string;workspaceRoot:string;ownership:'external';sdk:'@furnace/sdk@0.1.0';producerVersion:string;producerRevision?:string;producerDigest?:string;resolvedRuntimeConfigDigest?:string;requestIds:{status:string;attempts:string;logs:string[]}};
  capturedAt:string;observedAt:string;lastConfirmedAt:string;
  freshness:'current'|'stale';connection:'connected'|'disconnected';completeness:'complete'|'partial'|'unknown';
  /** Native state is a recorded label, not a liveness assertion. */
  run:{state:RunState;mode:RunMode;controllerLive:'yes'|'no'|'unknown';stateSince:string;updatedAt:string;healthyWait?:HealthyWait;progress:{completed?:number;total?:number;unavailable?:ProgressUnavailable};failedTotal:number;corruptEventsTotal:number;unreadableCount:number;conflictCount:number};
  attempts:{complete:boolean;returned:number;nextCursor:string|null;unreadableCount:number;items:FurnaceAttemptReference[]};
  logs:FurnaceLogReference[];
  stream:{runLifecycle:'unavailable';attemptOutput:'logs --follow (one attempt only)';cursor:'unavailable'};
  coherence:'sequential-non-atomic';
  error?:{category:'unavailable';message:string};
}
/** Exactly the statement ObservationProjection.relate accepts; this observer only states native-confirmed ownership. */
export type FurnaceObservedRelation = Parameters<ObservationProjection['relate']>[0];
export interface FurnaceProjectionTopology {snapshots:NativeSnapshot[];relations:FurnaceObservedRelation[]}
const terminal = new Set<RunState>(['completed','stopped','failed']);
/** Display tone of a native Attempt state; needs_reconciliation is unknown, never a guessed outcome. */
const attemptTone:Readonly<Record<AttemptState,Presentation['statusTone']>>={pending:'waiting',preparing:'active',starting:'active',running:'active',completing:'active',
  succeeded:'success',failed:'failure',timed_out:'failure',cancelled:'failure',abandoned:'failure',needs_reconciliation:'unknown'};
/** A zone-qualified native instant; an unzoned or unparseable value names no comparable clock. */
const instant=(value:string|undefined):number=>value!==undefined&&/(?:Z|[+-]\d\d:\d\d)$/.test(value)?Date.parse(value):Number.NaN;
/** Source interval from native started_at/finished_at only. An end the producer's clock cannot place at or after the
 * start withholds the whole interval: an open interval would falsely claim the finished Attempt is still running. */
function attemptInterval(item:FurnaceAttemptReference):Interval|undefined{
  const start=instant(item.startedAt);
  if(item.startedAt===undefined||!Number.isFinite(start)) return undefined;
  if(item.finishedAt===undefined) return {startedAt:item.startedAt};
  const end=instant(item.finishedAt);
  return Number.isFinite(end)&&end>=start ? {startedAt:item.startedAt,endedAt:item.finishedAt} : undefined;
}
function validateLimits(limits:FurnaceObserverLimits):void {
  for(const [key,value] of Object.entries(limits)) if(!Number.isSafeInteger(value)||value<1|| (key==='callTimeoutMs'&&value>2_147_483_647)) throw new CapabilityError('validation',`Invalid Furnace observation budget: ${key}`);
}
function attemptRef(item:AttemptDto):FurnaceAttemptReference {
  return {id:item.attempt_id,runId:item.run_id,workId:item.work_id,ordinal:item.ordinal,executor:item.executor,state:item.state,
    ...(item.outcome!==undefined?{outcome:item.outcome}:{}),createdAt:item.created_at,
    ...(item.started_at!==undefined?{startedAt:item.started_at}:{}),...(item.finished_at!==undefined?{finishedAt:item.finished_at}:{}),
    ...(item.exit_code!==undefined?{exitCode:item.exit_code}:{}),...(item.termination_cause!==undefined?{terminationCause:item.termination_cause}:{})};
}
function errorPreview(error:unknown):string {
  // A native failure is untrusted. Never expose a stack, process argv, log or arbitrary error object.
  const code=error!==null&&typeof error==='object'&&'code' in error&&typeof error.code==='string' ? error.code : 'unknown';
  return redactWorkbenchText(`Furnace status unavailable (${code})`);
}

export class FurnaceObserver {
  private readonly shutdown=new AbortController();
  private reading:FurnaceReading|undefined;
  constructor(private readonly client:FurnaceObserverClient,private readonly options:FurnaceObserverOptions){
    validateLimits(options.limits);
    if(!options.runId||!options.workspaceRoot||options.scope.workspace!==options.workspaceRoot||!options.scope.principal) throw new CapabilityError('authorization','Furnace observer requires a host-bound workspace, principal and Run ID.');
  }
  get last():FurnaceReading|undefined {return this.reading ? structuredClone(this.reading) : undefined;}
  private assertOpen():void {if(this.shutdown.signal.aborted||this.options.signal?.aborted) throw new CapabilityError('transport','Furnace observation closed or aborted.');}
  private markStale(message?:string):FurnaceReading|undefined {
    if(!this.reading) return undefined;
    this.reading={...this.reading,freshness:'stale',connection:'disconnected',completeness:'unknown',...(message?{error:{category:'unavailable' as const,message}}:{})};
    return this.last;
  }
  /** Each native read is bounded. A close cannot kill an in-flight SDK read, but its late answer is discarded. */
  async snapshot():Promise<FurnaceReading>{
    this.assertOpen();
    const {runId,workspaceRoot,limits}=this.options;
    try {
      const status=await this.client.runs.get(runId).status({timeoutMs:limits.callTimeoutMs});this.assertOpen();
      if(status.kind!=='run_status') throw new CapabilityError('unavailable','Furnace status response kind differs from requested native read.');
      const run=status.data;
      if(run.run_id!==runId||run.workspace!==workspaceRoot) throw new CapabilityError('authorization','Furnace Run identity or workspace differs from observer scope.');
      if(!Array.isArray(run.active)||!Array.isArray(run.failed)||!Array.isArray(run.attention)||!Array.isArray(run.unreadable)||!Array.isArray(run.corrupt_events)||!Array.isArray(run.conflicts)||!Number.isSafeInteger(run.failed_total)||!Number.isSafeInteger(run.corrupt_events_total)||typeof run.beads_run_id!=='string'||!run.beads_run_id) throw new CapabilityError('unavailable','Furnace Run status shape cannot be safely read.');
      const attempts=await this.client.attempts.list(runId,{limit:limits.attemptLimit},{timeoutMs:limits.callTimeoutMs});this.assertOpen();
      if(attempts.kind!=='attempt_list') throw new CapabilityError('unavailable','Furnace Attempt response kind differs from requested native read.');
      const history=attempts.data;
      if(history.run_id!==runId||history.beads_run_id!==run.beads_run_id||!Array.isArray(history.attempts)||!Array.isArray(history.unreadable)||!Number.isSafeInteger(history.returned)||history.returned<0||history.returned>limits.attemptLimit||history.returned!==history.attempts.length||history.attempts.some(item=>!item||item.run_id!==runId||typeof item.attempt_id!=='string'||typeof item.work_id!=='string')) throw new CapabilityError('unavailable','Furnace Attempt page identity, shape or bound differs from Run.');
      const selected=history.attempts.at(-1);
      const logs:FurnaceLogReference[]=[];const logRequests:string[]=[];
      if(selected){
        const response=await this.client.logs.read(runId,{attempt:selected.attempt_id,limit:limits.logBytes,stream:'stdout'},{timeoutMs:limits.callTimeoutMs});this.assertOpen();
        if(response.kind!=='logs_read') throw new CapabilityError('unavailable','Furnace logs response kind differs from requested native read.');
        const log=response.data;
        if(log.run_id!==runId||log.attempt_id!==selected.attempt_id||log.stream!=='stdout'||!Array.isArray(log.lines)||!Number.isSafeInteger(log.returned)||log.returned<0||log.returned>limits.logBytes) throw new CapabilityError('unavailable','Furnace log reference identity, shape or byte bound differs from Attempt.');
        logs.push({attemptId:log.attempt_id,stream:log.stream,complete:log.complete,lossy:log.lossy,returned:log.returned,nextCursor:log.next_cursor});
        logRequests.push(response.requestId);
      }
      const now=new Date().toISOString();
      const incomplete=!history.complete||history.unreadable.length>0||run.unreadable.length>0||run.failed_total>run.failed.length||run.corrupt_events_total>run.corrupt_events.length||run.progress_unavailable!==undefined||logs.some(log=>!log.complete||log.lossy);
      const reading:FurnaceReading={contract:FURNACE_EXTERNAL_OBSERVATION_CONTRACT,source:{provider:'furnace',runId,beadsRunId:run.beads_run_id,workspaceRoot,ownership:'external',sdk:'@furnace/sdk@0.1.0',producerVersion:run.furnace_version,
        ...(run.binary_revision?{producerRevision:run.binary_revision}:{}),...(run.binary_digest?{producerDigest:run.binary_digest}:{}),...(run.resolved_runtime_config_digest?{resolvedRuntimeConfigDigest:run.resolved_runtime_config_digest}:{}),requestIds:{status:status.requestId,attempts:attempts.requestId,logs:logRequests}},
        capturedAt:now,observedAt:now,lastConfirmedAt:now,freshness:'current',connection:'connected',completeness:incomplete?'partial':'complete',
        run:{state:run.state,mode:run.mode,controllerLive:run.controller?.live===true?'yes':run.controller?.live===false?'no':'unknown',stateSince:run.state_since,updatedAt:run.updated_at,
          ...(run.healthy_wait?{healthyWait:run.healthy_wait}:{}),progress:{...(run.completed!==undefined?{completed:run.completed}:{}),...(run.total!==undefined?{total:run.total}:{}),...(run.progress_unavailable?{unavailable:run.progress_unavailable}:{})},failedTotal:run.failed_total,corruptEventsTotal:run.corrupt_events_total,unreadableCount:run.unreadable.length,conflictCount:run.conflicts.length},
        attempts:{complete:history.complete,returned:history.returned,nextCursor:history.next_cursor,unreadableCount:history.unreadable.length,items:history.attempts.map(attemptRef)},logs,
        stream:{runLifecycle:'unavailable',attemptOutput:'logs --follow (one attempt only)',cursor:'unavailable'},coherence:'sequential-non-atomic'};
      this.reading=reading;return structuredClone(reading);
    }catch(error){
      if(error instanceof CapabilityError){this.markStale();throw error;}
      this.markStale(errorPreview(error));
      if(this.shutdown.signal.aborted||this.options.signal?.aborted) throw new CapabilityError('transport','Furnace observation closed or aborted.');
      throw new CapabilityError('unavailable',errorPreview(error));
    }
  }
  private async wait(ms:number):Promise<boolean>{
    if(this.shutdown.signal.aborted||this.options.signal?.aborted)return false;
    return new Promise(resolve=>{
      const done=():void=>{clearTimeout(timer);this.shutdown.signal.removeEventListener('abort',abort);this.options.signal?.removeEventListener('abort',abort);resolve(false);};
      const timer=setTimeout(()=>{this.shutdown.signal.removeEventListener('abort',abort);this.options.signal?.removeEventListener('abort',abort);resolve(true);},ms);
      const abort=():void=>done();
      this.shutdown.signal.addEventListener('abort',abort,{once:true});this.options.signal?.addEventListener('abort',abort,{once:true});
    });
  }
  /** No fake lifecycle stream: a caller receives snapshots at an explicit bounded cadence. */
  async *observe():AsyncGenerator<FurnaceReading,void,undefined>{
    const started=Date.now();const {limits}=this.options;
    for(let poll=0;poll<limits.maxPolls&&Date.now()-started<limits.maxElapsedMs;poll++){
      if(this.shutdown.signal.aborted||this.options.signal?.aborted)break;
      try {const reading=await this.snapshot();yield reading;if(terminal.has(reading.run.state))return;}
      catch(error){if(error instanceof CapabilityError&&error.category==='transport')return;const stale=this.last;if(!stale)throw error;yield stale;}
      const remaining=limits.maxElapsedMs-(Date.now()-started);
      if(remaining<=0||poll+1>=limits.maxPolls||!await this.wait(Math.min(limits.intervalMs,remaining)))break;
    }
    if(!this.shutdown.signal.aborted&&!this.options.signal?.aborted){const stale=this.markStale();if(stale)yield stale;}
  }
  /** Projection input is metadata only; no raw output, guessed edges or ownership assertions. */
  projectionSnapshot(reading:FurnaceReading):NativeSnapshot{
    if(reading.freshness!=='current'||reading.connection!=='connected') throw new CapabilityError('unavailable','Stale Furnace observation cannot refresh a confirmed projection.');
    return {source:{provider:'furnace',type:'run',id:reading.source.runId,scope:reading.source.workspaceRoot},scope:this.options.scope,capturedAt:reading.capturedAt,observedAt:reading.observedAt,
      coverage:reading.completeness,sourceRevision:reading.source.producerRevision,
      node:{title:`Furnace Run ${reading.source.runId}`,type:'workflow',statusText:reading.run.state,statusTone:reading.run.state==='completed'?'success':reading.run.state==='failed'||reading.run.state==='needs_attention'?'failure':reading.run.state==='active'?'active':'waiting'},
      kind:'furnace.run.snapshot',evidenceRefs:reading.attempts.items.map(item=>item.id)};
  }
  /** The unchanged Run snapshot, one Attempt snapshot per returned page item and one Run->Attempt ownership edge each.
   * Ownership is native-confirmed: the Attempt page (its request ID is the confirmation reference) asserts every
   * attempt.run_id equals this Run. An unreturned tail yields nothing, no Work node is invented (workId is only a
   * correlation id) and no dependency, causation or hypothesis edge is ever stated. */
  projectionTopology(reading:FurnaceReading):FurnaceProjectionTopology{
    const run=this.projectionSnapshot(reading);
    const {runId,workspaceRoot,producerRevision,requestIds}=reading.source;
    if(!requestIds.attempts||reading.attempts.items.some(item=>item.runId!==runId)) throw new CapabilityError('unavailable','Furnace Attempt page cannot confirm Run ownership.');
    const snapshots:NativeSnapshot[]=[run];const relations:FurnaceObservedRelation[]=[];
    for(const item of reading.attempts.items){
      const source:NativeRef={provider:'furnace',type:'attempt',id:item.id,scope:workspaceRoot};
      const interval=attemptInterval(item);
      // One sequential, non-atomic reading: its completeness label covers every node it produced.
      snapshots.push({source,scope:{...this.options.scope},capturedAt:reading.capturedAt,observedAt:reading.observedAt,coverage:reading.completeness,
        ...(producerRevision!==undefined?{sourceRevision:producerRevision}:{}),
        node:{title:`Furnace Attempt ${item.id}`,type:'sdk-operation',statusText:item.outcome!==undefined?`${item.state} (${item.outcome})`:item.state,
          statusTone:Object.hasOwn(attemptTone,item.state)?attemptTone[item.state]:'unknown'},
        kind:'furnace.attempt.snapshot',trace:{invocationId:runId,correlationIds:{runId:item.runId,workId:item.workId}},...(interval?{interval}:{})});
      relations.push({scope:{...this.options.scope},from:{...run.source},to:{...source},kind:'ownership',
        provenance:{source:'furnace',observedAt:reading.observedAt,nativeConfirmationRef:requestIds.attempts}});
    }
    return {snapshots,relations};
  }
  /** Closing stops only the local wait; it never invokes a Furnace control verb. */
  close():void {this.shutdown.abort();this.markStale();}
}
