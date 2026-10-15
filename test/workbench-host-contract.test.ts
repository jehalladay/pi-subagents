/** L2/L3/L4: the real SDK boundary and Pi wiring contract before implementation. */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadSettings } from '../src/settings.js';
import { createClaudeWorkflowHost } from '../src/workbench/claude-host.js';
import { runWorkflow, type WorkflowSpawnRequest } from '../src/workflow/runtime.js';

const HEAD = 'export const meta = {name:"workbench-contract", description:"test host"};\n';
const req = (overrides: Partial<WorkflowSpawnRequest> = {}): WorkflowSpawnRequest => ({
  agentId:'wf-agent-0', index:0, prompt:'Say OK', label:'review', agentType:'general-purpose', ...overrides,
});
const roots: string[] = [];
afterEach(() => { for (const p of roots.splice(0)) rmSync(p, {recursive:true,force:true}); });

// External SDK stream is injected at the host boundary. Integration tests with the real
// SDK live separately and must not be presented as this fixture's proof.
const successMessages = (sessionId = 'sdk-session-1') => [
  {type:'system', subtype:'init', session_id:sessionId, model:'claude-opus-5-5', permissionMode:'dontAsk', tools:[], cwd:'/tmp'},
  {type:'assistant', session_id:sessionId, uuid:'m1', parent_tool_use_id:null,
   message:{id:'msg1', model:'claude-opus-5-5', role:'assistant', content:[{type:'text',text:'OK'}], usage:{input_tokens:4,output_tokens:3}}},
  {type:'result', subtype:'success', session_id:sessionId, uuid:'r1', is_error:false, result:'OK',
   structured_output:undefined, modelUsage:{'claude-opus-5-5':{inputTokens:4,outputTokens:3,cacheReadInputTokens:0,cacheCreationInputTokens:0,costUSD:0.01}},
   usage:{input_tokens:4,output_tokens:3}, total_cost_usd:0.01},
] as const;

function fakeQuery(messages: readonly unknown[], calls: Array<{prompt:string;options:Record<string,unknown>}>) {
  return ({prompt,options}:{prompt:string;options:Record<string,unknown>}) => {
    calls.push({prompt,options});
    return (async function*(){for(const m of messages) yield m;})();
  };
}

describe('Workbench Claude execution host', () => {
  it('L3: unchanged script uses Claude SDK query, not Pi AgentManager; session and usage are reported', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const manager = {spawnAndWait:vi.fn(), abort:vi.fn(), resume:vi.fn()};
    const host = createClaudeWorkflowHost({cwd:'/tmp', query:fakeQuery(successMessages(),calls)});
    const result = await runWorkflow({script:HEAD+'return await agent("Say OK", {model:"claude-opus-5-5"});',host});
    expect(result).toMatchObject({status:'completed', value:'OK', agentCount:1});
    expect(calls).toHaveLength(1);
    expect(calls[0].options).toMatchObject({model:'claude-opus-5-5',cwd:'/tmp',permissionMode:'dontAsk'});
    expect(manager.spawnAndWait).not.toHaveBeenCalled();
    expect(manager.resume).not.toHaveBeenCalled();
    expect(result.progress.some(e => e.type==='workflow_agent' && e.sessionId==='sdk-session-1')).toBe(true);
    expect(result.progress.some(e => e.type==='workflow_agent' && e.tokens===7)).toBe(true);
  });

  it('L3: parallel schema agents return object values from native SDK structured_output', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const schema = {type:'object',properties:{answer:{type:'string'}},required:['answer'],additionalProperties:false};
    const stream = [...successMessages().slice(0,2), {...successMessages()[2], structured_output:{answer:'OK'}, result:'{"answer":"OK"'}];
    const host = createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(stream,calls)});
    const script=HEAD+`const results = await parallel([() => agent("one",{schema:${JSON.stringify(schema)}}),() => agent("two",{schema:${JSON.stringify(schema)}})]); return results;`;
    const result=await runWorkflow({script,host});
    expect(result).toMatchObject({status:'completed',value:[{answer:'OK'},{answer:'OK'}]});
    expect(calls).toHaveLength(2);
    expect(calls[0].options).toMatchObject({outputFormat:{type:'json_schema',schema}});
  });

  it('L4: Claude backend does not replay settled agent answers when host model policy changes', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const journal: import('../src/workflow/journal.js').WorkflowJournalEntry[]=[];
    const script=HEAD+'return await agent("same prompt");';
    const oldHost=createClaudeWorkflowHost({cwd:'/tmp',model:'claude-opus-5-5',query:fakeQuery(successMessages(),calls)});
    await runWorkflow({script,host:oldHost,journal:{entries:[],append:entry=>journal.push(entry)}});
    const newHost=createClaudeWorkflowHost({cwd:'/tmp',model:'claude-haiku-5-5',query:fakeQuery(successMessages(),calls)});
    const rerun=await runWorkflow({script,host:newHost,journal:{entries:journal}});
    expect(rerun.status).toBe('completed');
    expect(rerun.replayedCount).toBe(0);
    expect(calls).toHaveLength(2);
    expect(calls[1].options.model).toBe('claude-haiku-5-5');
  });

  it('L4: inherited prototype names never satisfy a role allowlist', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls),roles:{reviewer:{prompt:'Review only.'}}});
    for (const type of ['constructor','__proto__','toString','hasOwnProperty']) {
      const result=await host.spawnAgent(req({agentType:type}));
      expect(result.ok).toBe(false);
    }
    expect(calls).toHaveLength(0);
  });

  it('L4: forwards provider-native model identifiers to SDK instead of a restrictive local regex', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const native='us.anthropic.claude-sonnet-4-5-20250929-v1:0';
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls)});
    const result=await host.spawnAgent(req({model:native}));
    expect(result.ok).toBe(true);
    expect(calls[0].options.model).toBe(native);
  });

  it('L4: unconfigured Pi agent type is not silently run as a general Claude role', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host = createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls)});
    const result = await host.spawnAgent(req({agentType:'Explore'}));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/role.*unavailable/i);
    expect(calls).toHaveLength(0);
  });

  it('L4: explicit Claude role supplies prompt/tools/model with request model taking precedence', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host = createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls),
      roles:{reviewer:{prompt:'Review only.',tools:['Read'],model:'claude-sonnet-5-5'}}});
    const result = await host.spawnAgent(req({agentType:'reviewer',model:'claude-opus-5-5'}));
    expect(result.ok).toBe(true);
    expect(calls[0].options).toMatchObject({model:'claude-opus-5-5',tools:['Read'],systemPrompt:'Review only.'});
  });

  it('L4: SDK resume returning a different session ID refuses fresh-context continuation', async () => {
    let calls=0;
    const host=createClaudeWorkflowHost({cwd:'/tmp',getSession:async()=>({sessionId:'sdk-session-1'} as Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>),
      query:()=> (async function*(){yield* successMessages(++calls===1?'sdk-session-1':'sdk-session-other');})()});
    expect((await host.spawnAgent(req())).ok).toBe(true);
    const resumed=await host.resumeAgent('wf-agent-0','followup');
    expect(resumed.ok).toBe(false);
    expect(resumed.error).toMatch(/session.*mismatch|different session/i);
  });

  it('L4: error result after partial assistant never becomes success', async () => {
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery([
      ...successMessages().slice(0,2),
      {...successMessages()[2],subtype:'error_during_execution',errors:['SDK failed'],is_error:true,result:undefined},
    ],[])});
    const result=await host.spawnAgent(req());
    expect(result.ok).toBe(false);
    expect(result.error).toContain('SDK failed');
    expect(result.text).toBeUndefined();
  });

  it('L4: SDK abort throwing after a started query is classified cancelled/skipped', async () => {
    let signal!: AbortSignal;
    let started!: () => void;
    const startedPromise=new Promise<void>(resolve=>{started=resolve;});
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:({options})=>{
      signal=options.abortController!.signal;
      return (async function*(){
        yield successMessages()[0] as never;
        await new Promise<void>((_,reject)=>{signal.addEventListener('abort',()=>reject(new Error('SDK AbortError')), {once:true});started();});
      })();
    }});
    const active=host.spawnAgent(req());
    await startedPromise;
    host.abortAgent('wf-agent-0');
    const result=await active;
    expect(result).toMatchObject({ok:false,skipped:true});
  });

  it('L4: missing result after stream exhaustion fails instead of accepting partial text', async () => {
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages().slice(0,2),[])});
    const result=await host.spawnAgent(req());
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/result/i);
  });

  it('L4: cumulative SDK usage on resume counts only the new turn', async () => {
    const stream=(outputTokens:number,inputTokens:number)=>[
      successMessages()[0],
      {...successMessages()[2],result:'OK',modelUsage:{'claude-opus-5-5':{inputTokens,outputTokens,cacheReadInputTokens:0,cacheCreationInputTokens:0,costUSD:0.1}}},
    ];
    let nth=0;
    const host=createClaudeWorkflowHost({cwd:'/tmp',getSession:async()=>({sessionId:'sdk-session-1'} as Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>),
      query:()=> (async function*(){yield* ++nth===1?stream(10,2):stream(15,4);})()});
    const result=await runWorkflow({script:HEAD+'await agent("first",{label:"l"}); await agent("next",{resume:"l"}); return budget.spent();',host});
    expect(result.status).toBe('completed');
    expect(result.value).toBe(15);
  });

  it('L4: resumed role preserves the same system prompt and tools', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host=createClaudeWorkflowHost({cwd:'/tmp', query:fakeQuery(successMessages(),calls),
      getSession:async()=>({sessionId:'sdk-session-1'} as Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>),
      roles:{reviewer:{prompt:'Review only. Never edit.',tools:['Read'],effort:'low'}}});
    const first=await host.spawnAgent(req({agentType:'reviewer'}));
    const next=await host.resumeAgent('wf-agent-0','followup');
    expect(first.ok).toBe(true); expect(next.ok).toBe(true);
    expect(calls[1].options).toMatchObject({resume:'sdk-session-1',systemPrompt:'Review only. Never edit.',tools:['Read'],effort:'low'});
  });

  it('L4: abort during persisted-session lookup prevents resumed query', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    let finishLookup!: (value: Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>) => void;
    const pending=new Promise<Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>>(resolve=>{finishLookup=resolve;});
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls),getSession:async()=>pending});
    expect((await host.spawnAgent(req())).ok).toBe(true);
    const resumed=host.resumeAgent('wf-agent-0','followup');
    host.abortAgent('wf-agent-0');
    finishLookup({sessionId:'sdk-session-1'} as Awaited<ReturnType<typeof import('@anthropic-ai/claude-agent-sdk').getSessionInfo>>);
    const result=await resumed;
    expect(result.ok).toBe(false);
    expect(calls).toHaveLength(1);
  });

  it('L4: missing persisted SDK session blocks resumed query rather than creating a fresh context', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls),getSession:async()=>undefined});
    const initial=await host.spawnAgent(req());
    expect(initial.ok).toBe(true);
    const resumed=await host.resumeAgent('wf-agent-0','followup');
    expect(resumed).toMatchObject({ok:false});
    expect(resumed.error).toMatch(/unavailable|refusing fresh-context/i);
    expect(calls).toHaveLength(1);
  });

  it('L4: unknown resume session refuses without invoking a new query', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls)});
    const result=await host.resumeAgent('missing','followup');
    expect(result.ok).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('L4: explicit worktree isolation refuses before any SDK query if unavailable', async () => {
    const calls: Array<{prompt:string;options:Record<string,unknown>}> = [];
    const host=createClaudeWorkflowHost({cwd:'/tmp',query:fakeQuery(successMessages(),calls)});
    const result=await host.spawnAgent(req({isolation:'worktree'}));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/worktree|isolation/i);
    expect(calls).toHaveLength(0);
  });

  it('L4: Workbench backend is explicit and invalid config is rejected, not silently Pi', () => {
    const dir=mkdtempSync(join(tmpdir(),'wb-setting-')); roots.push(dir);
    mkdirSync(join(dir,'.pi'));
    writeFileSync(join(dir,'.pi','subagents.json'), JSON.stringify({workbench:{workflowAgentBackend:'claude'}}));
    expect(loadSettings(dir).workbench?.workflowAgentBackend).toBe('claude');
    writeFileSync(join(dir,'.pi','subagents.json'), JSON.stringify({workbench:{workflowAgentBackend:'not-a-backend'}}));
    expect(() => loadSettings(dir)).toThrow(/workflowAgentBackend/);
  });
});
