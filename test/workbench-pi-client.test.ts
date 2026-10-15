/** L2: Pi extension routes workflow agent() to the Claude SDK without spawning Pi agents. */
import { afterEach, describe, expect, it, vi } from 'vitest';
import subagentsExtension from '../src/index.js';
import { ctx, hermeticDir, makePi } from './helpers/boot-extension.js';

const streams: unknown[]=[];
vi.mock('@anthropic-ai/claude-agent-sdk', async importOriginal => {
  const original=await importOriginal<typeof import('@anthropic-ai/claude-agent-sdk')>();
  return {...original, query: vi.fn(({prompt}: {prompt:string}) => {
    streams.push(prompt);
    return (async function*(){
      yield {type:'system',subtype:'init',session_id:'pi-sdk-session',model:'claude-opus-5-5',permissionMode:'dontAsk',cwd:'/tmp',tools:[]};
      yield {type:'result',subtype:'success',session_id:'pi-sdk-session',is_error:false,result:'SDK says OK',modelUsage:{},usage:{input_tokens:0,output_tokens:0}};
    })();
  })};
});
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(()=>{sandbox?.restore(); sandbox=undefined; streams.length=0;});

describe('Pi Workbench client',()=>{
  it('L2: an explicitly selected Claude backend launches a script through the registered Pi tool',async()=>{
    sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude',model:'claude-opus-5-5'}}});
    const pi=makePi();
    subagentsExtension(pi.pi);
    const context=ctx({cwd:sandbox.dir});
    await pi.lifecycle.get('session_start')?.({},context);
    const tool=pi.tools.get('SubagentWorkflow');
    expect(tool).toBeDefined();
    const reply=await tool!.execute('wf-test',{script:'export const meta = {name:"pi-client",description:"e2e"};\nreturn await agent("Say OK");'},undefined,undefined,context);
    expect(JSON.stringify(reply)).toContain('started');
    for (let i=0; i<100 && streams.length===0; i++) {
      await new Promise(resolve=>setTimeout(resolve,10));
    }
    expect(streams).toContain('Say OK');
  });
});
