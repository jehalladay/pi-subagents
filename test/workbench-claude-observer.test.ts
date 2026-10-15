/** W02 L4: bounded native projection evidence, not an alternate transcript. */
import type { SDKMessage } from '@anthropic-ai/claude-agent-sdk';
import { describe, expect, it } from 'vitest';
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from '../src/workbench/claude-host.js';
import { createClaudeObserver } from '../src/workbench/claude-transcript.js';
import type { ClaudeNativeObservation } from '../src/workflow/progress.js';

const call: ClaudeCallIdentity = {agentId:'one',index:0,label:'first'};
function message(value: unknown): SDKMessage { return value as SDKMessage; }
describe('Claude bounded observer',()=>{
  it('caps samples and tool evidence while terminal is always emitted and snapshots are immutable',()=>{
    const snapshots:ClaudeNativeObservation[]=[];
    const observer=createClaudeObserver((_,snapshot)=>snapshots.push(snapshot));
    for(let n=0;n<200;n++) observer.onMessage(message({type:'assistant',uuid:`m-${n}`,session_id:'native',message:{content:[{type:'tool_use',id:`tool-${n}`,name:'Read',input:{secret:'SECRET'}}]}}),call);
    observer.onSettled({ok:true,sessionId:'native'},call);
    expect(snapshots).toHaveLength(65);
    expect(snapshots[0].tools).toEqual([{toolUseId:'tool-0',name:'Read',state:'started'}]);
    expect(snapshots.at(-1)).toMatchObject({observedMessages:200,terminal:'succeeded',toolsTruncated:true});
    expect(snapshots.at(-1)?.tools).toHaveLength(16);
    expect(snapshots.at(-1)?.tools.at(-1)?.toolUseId).toBe('tool-199');
    expect(JSON.stringify(snapshots)).not.toContain('SECRET');
  });
  it('parallel calls retain independent native session identity and permission evidence',()=>{
    const snapshots=new Map<string,ClaudeNativeObservation>();
    const observer=createClaudeObserver((identity,snapshot)=>snapshots.set(identity.agentId,snapshot));
    const other={agentId:'two',index:1,label:'second'};
    observer.onMessage(message({type:'system',subtype:'init',session_id:'s-one',uuid:'first'}),call);
    observer.onMessage(message({type:'system',subtype:'permission_denied',session_id:'s-two',uuid:'denied',tool_use_id:'t-two',tool_name:'Write',message:'SECRET_REASON'}),other);
    expect(snapshots.get('one')?.sessionId).toBe('s-one');
    expect(snapshots.get('two')?.tools).toEqual([{toolUseId:'t-two',name:'Write',state:'refused'}]);
    expect(JSON.stringify([...snapshots.values()])).not.toContain('SECRET');
  });
  it.each(['exhausted','thrown'])('partial stream %s is unknown observation lost, not successful terminal',async mode=>{
    let snapshot:ClaudeNativeObservation|undefined;
    const observer=createClaudeObserver((_,value)=>{snapshot=value;});
    const host=createClaudeWorkflowHost({cwd:'/tmp',...observer,query:()=> (async function*(){
      yield message({type:'system',subtype:'init',session_id:'lost',uuid:'init',model:'claude-opus-5-5'});
      if(mode==='thrown') throw new Error('stream disconnected');
    })()});
    const result=await host.spawnAgent({...call,prompt:'one',agentType:'general-purpose'});
    expect(result.ok).toBe(false);
    expect(snapshot).toMatchObject({sessionId:'lost',terminal:'observation_lost',freshness:'unknown'});
  });
});
