/** L2: the registered Pi tools bind local scope and verify bytes before SDK dispatch. */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import subagentsExtension from '../src/index.js';
import * as cards from '../src/ui/workflow-card.js';
import { ctx, hermeticDir, makePi } from './helpers/boot-extension.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

installScratchLeakGuard();

const sdk = vi.hoisted(() => ({query:vi.fn()}));
vi.mock('@anthropic-ai/claude-agent-sdk', async original => ({ ...await original(), query:sdk.query }));
let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox=undefined; sdk.query.mockReset(); vi.restoreAllMocks(); });
const source = 'export const meta={name:"identity",description:"Pi path"};\nreturn await agent("one");';
async function waitFor(test: () => boolean) {
  for(let i=0;i<300;i++) { if(test()) return; await new Promise(resolve=>setTimeout(resolve,10)); }
  throw new Error('Timed out waiting for Pi workflow');
}
async function boot(settings: Record<string,unknown>, directory?: string, nonRepo = false) {
  sandbox=hermeticDir({nonRepo,settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude',...settings}}});
  const pi=makePi(); subagentsExtension(pi.pi);
  const context=ctx({cwd:directory??sandbox.dir});
  await pi.lifecycle.get('session_start')?.({},context);
  return {pi,context,workflow:pi.tools.get('SubagentWorkflow')!,observe:pi.tools.get('workflow_observe'),catalog:pi.tools.get('workbench_catalog')};
}
function text(value: unknown): string { return JSON.stringify(value); }
function streamed(id: string) { return (async function*(){
  yield {type:'system',subtype:'init',session_id:id,uuid:`init-${id}`,model:'claude-opus-5-5',tools:[]};
  yield {type:'assistant',session_id:id,uuid:`assistant-${id}`,message:{model:'claude-opus-5-5',content:[{type:'tool_use',id:'secret-tool',name:'Read',input:{path:'SECRET_INPUT'}}]}};
  yield {type:'result',subtype:'success',session_id:id,uuid:`result-${id}`,result:'SECRET_RESULT',is_error:false,modelUsage:{}};
})(); }

/**
 * wb-7v7: a SETTLE-DETECTING wait for a run launched from a switched cwd. `waitFor`'s fixed 300 x 10 ms budget raced
 * full-suite contention twice on that run, whose agent goes through the backend re-resolved for the new cwd; this waits
 * on the state transition the assertions need instead of a clock - the run's terminal status, read through the
 * registered tool's own render seam, AND its completion notice. A run that never settles still fails, at a generous
 * ceiling, naming only the states it was observed in: never an id, a path or a payload.
 */
type RunState = { status: string; agent: string; notice: 'delivered'|'pending'; claude: 'dispatched'|'not-dispatched' };
type Launch = { content: unknown[]; details: { taskId: string } };
type Theme = { fg: (color: string, value: string) => string; bold: (value: string) => string };
type RenderedTool = { renderResult: (result: Launch, options: { expanded: boolean; isPartial: boolean }, theme: Theme, context: { isError: boolean }) => unknown };
const SETTLE_CEILING_MS = 20_000;
const TERMINAL = new Set(['completed','failed','killed']);
function stateName(value: unknown, otherwise: string): string { return typeof value === 'string' && /^[a-z_]+$/.test(value) ? value : otherwise; }
function observeRun(sendMessage: { mock: { calls: unknown[][] } }, workflow: RenderedTool, launch: Launch): () => RunState {
  const render = vi.spyOn(cards, 'renderWorkflowCard');
  const theme: Theme = { fg: (_color, value) => value, bold: value => value };
  return () => {
    const before = render.mock.calls.length;
    workflow.renderResult(launch, { expanded: false, isPartial: false }, theme, { isError: false });
    const card = render.mock.calls.length > before ? render.mock.calls.at(-1)?.[0] : undefined;
    const agent = card?.progress.filter(entry => entry.type === 'workflow_agent').at(-1);
    return {
      status: card ? stateName(card.task.status, 'unnamed') : 'absent',
      agent: agent && 'state' in agent ? stateName(agent.state, 'unnamed') : 'none',
      notice: sendMessage.mock.calls.some(([value]) => text(value).includes(launch.details.taskId)) ? 'delivered' : 'pending',
      claude: sdk.query.mock.calls.length > 0 ? 'dispatched' : 'not-dispatched',
    };
  };
}
async function waitForSettle(observe: () => RunState, ceilingMs = SETTLE_CEILING_MS): Promise<RunState> {
  const deadline = Date.now() + ceilingMs;
  const trail: string[] = [];
  do {
    const state = observe();
    const name = `${state.status}/${state.agent}/${state.notice}/${state.claude}`;
    if (trail.at(-1) !== name) trail.push(name);
    if (TERMINAL.has(state.status) && state.notice === 'delivered') return state;
    await new Promise(resolve => setTimeout(resolve, 10));
  } while (Date.now() < deadline);
  throw new Error(`Pi workflow did not settle within ${ceilingMs} ms; observed states: ${trail.join(' -> ')}`);
}

describe('registered Workbench entrypoint identity and projection',()=>{
  it('denies absent observation grants and keeps discovery independent of invoke grants',async()=>{
    const {pi,context,workflow,observe,catalog}=await boot({capabilityGrants:['forge:inspect']});
    expect(observe).toBeDefined(); expect(catalog).toBeDefined();
    const listed=await catalog.execute('catalog',{},undefined,undefined,context);
    expect(text(listed)).not.toContain('forge.gate.status');
    const denied=await observe.execute('observe',{taskId:'wf_unknown',limit:5},undefined,undefined,context);
    expect(text(denied)).toMatch(/denied|grant|permission/i);
    sdk.query.mockImplementation(()=>streamed('session-one'));
    const launch=await workflow.execute('run',{script:source},undefined,undefined,context);
    await waitFor(()=>sdk.query.mock.calls.length>0);
    const noGrant=await observe.execute('observe',{taskId:launch.details.taskId,limit:10},undefined,undefined,context);
    expect(text(noGrant)).toMatch(/denied|grant|permission/i);
    expect(text(noGrant)).not.toContain('SECRET_');
    expect(pi.tools.has('SubagentWorkflow')).toBe(true);
  });

  it('binds a bounded observation query to the invoking Pi session and actual Claude session IDs, without payloads',async()=>{
    const {pi,context,workflow,observe,catalog}=await boot({capabilityGrants:['workbench:observe','discover:forge.gate.status']},undefined,true);
    const descriptors=await catalog.execute('catalog',{},undefined,undefined,context);
    expect(text(descriptors)).toContain('forge.gate.status');
    expect(text(descriptors)).not.toContain('SECRET_');
    sdk.query.mockImplementation(()=>streamed('native-s1'));
    const launch=await workflow.execute('run',{script:source},undefined,undefined,context);
    const taskId=launch.details.taskId;
    await waitFor(()=>pi.pi.sendMessage.mock.calls.some(([value]:[unknown])=>text(value).includes(taskId)));
    const result=await observe.execute('observe',{taskId,limit:1},undefined,undefined,context);
    expect(text(result)).toContain('native-s1');
    expect(text(result)).toContain('deploymentDigest');
    expect(JSON.parse(result.content[0].text).workspaceSourceState).toBe('unknown');
    expect(text(result)).not.toMatch(/SECRET_INPUT|SECRET_RESULT/);
    const otherSession=ctx({cwd:context.cwd,sessionManager:{getSessionId:()=> 'another-session'}});
    const forbidden=await observe.execute('observe',{taskId,limit:10},undefined,undefined,otherSession);
    expect(text(forbidden)).toMatch(/denied|scope|unavailable|unknown/i);
    expect(text(forbidden)).not.toContain('native-s1');
    const huge=await observe.execute('observe',{taskId,limit:10000},undefined,undefined,context);
    expect(text(huge)).toMatch(/limit|bounded|validation/i);
  });

  it('denies node dispatch after source mutation and never calls the native provider',async()=>{
    const {pi,context,workflow,observe}=await boot({capabilityGrants:['workbench:observe','forge:inspect']});
    const file=join(context.cwd,'tracked.ts');
    execFileSync('git',['init','-q',context.cwd]);
    writeFileSync(file,'export const value=1;\n');
    execFileSync('git',['-C',context.cwd,'add','tracked.ts']);
    execFileSync('git',['-C',context.cwd,'-c','user.name=Test Operator','-c','user.email=operator@example.invalid','commit','-qm','test baseline']);
    sdk.query.mockImplementation(()=>(async function*(){
      writeFileSync(file,'export const value=2;\n');
      yield* streamed('native-first');
    })());
    const script='export const meta={name:"node-drift",description:"refuse node"};\nawait agent("first"); return await node("forge.gate.status",{target:'+JSON.stringify(context.cwd)+'});';
    const launch=await workflow.execute('node-run',{script},undefined,undefined,context);
    await waitFor(()=>pi.pi.sendMessage.mock.calls.some(([value]:[unknown])=>text(value).includes(launch.details.taskId)));
    const result=await observe.execute('observe',{taskId:launch.details.taskId,limit:20},undefined,undefined,context);
    expect(text(result)).toContain('failed');
    expect(text(result)).toMatch(/IDENTITY_CONFLICT|basis changed/);
    expect(text(result)).not.toContain('forge.gate.status/v1');
    expect(sdk.query).toHaveBeenCalledTimes(1);
  });

  it('does not reuse a different workspace backend or registry just because Pi changed cwd',async()=>{
    const {pi,workflow,context}=await boot({capabilityGrants:['workbench:observe']});
    const second=makeScratch('pi-workspace-switch-');
    try {
      sdk.query.mockImplementation(()=>streamed('should-not-exist'));
      // The same extension process sees two contexts; only one workspace has
      // explicit Workbench configuration. Never substitute process.cwd.
      const other=ctx({cwd:second});
      const launch=await workflow.execute('other',{script:source},undefined,undefined,other);
      // Settled on the backend re-resolved from the switched cwd: terminal, notified, and never the boot workspace's Claude path.
      const settled=await waitForSettle(observeRun(pi.pi.sendMessage,workflow,launch));
      expect(settled).toMatchObject({status:'completed',notice:'delivered',claude:'not-dispatched'});
      expect(sdk.query).not.toHaveBeenCalled();
      expect(context.cwd).not.toBe(second);
    } finally { removeScratch(second); }
  },SETTLE_CEILING_MS+10_000);

  it('reports a switched-cwd run that has not settled by state names at its ceiling, never by values (wb-7v7)',async()=>{
    const {pi,workflow}=await boot({capabilityGrants:['workbench:observe']});
    const second=makeScratch('pi-workspace-unsettled-');
    try {
      sdk.query.mockImplementation(()=>streamed('should-not-exist'));
      const launch=await workflow.execute('other',{script:source},undefined,undefined,ctx({cwd:second}));
      const observe=observeRun(pi.pi.sendMessage,workflow,launch);
      // A zero ceiling cannot be met by a run that has only just started: the wait must refuse, never pass or hang.
      const report=await waitForSettle(observe,0).then(()=>'settled',(error:unknown)=>error instanceof Error ? error.message : 'not an Error');
      expect(report).toBe('Pi workflow did not settle within 0 ms; observed states: running/none/pending/not-dispatched');
      // The same run then settles under the real ceiling, and the run id the observer keys on is visible in the notice
      // channel it reads - so that value's absence from the report is the names-only format, not a blind instrument.
      expect(await waitForSettle(observe)).toMatchObject({status:'completed',notice:'delivered',claude:'not-dispatched'});
      expect(text(pi.pi.sendMessage.mock.calls)).toContain(launch.details.taskId);
      expect(report).not.toContain(launch.details.taskId);
      expect(report).not.toContain(second);
    } finally { removeScratch(second); }
  },SETTLE_CEILING_MS+10_000);

  it('does not expose model Workbench tools on an ordinary Pi-only session',async()=>{
    sandbox=hermeticDir({settings:{workflowsEnabled:true}});
    const pi=makePi(); subagentsExtension(pi.pi);
    await pi.lifecycle.get('session_start')?.({},ctx({cwd:sandbox.dir}));
    expect(pi.tools.has('SubagentWorkflow')).toBe(true);
    expect(pi.tools.has('workflow_observe')).toBe(false);
    expect(pi.tools.has('workbench_catalog')).toBe(false);
  });

  it('measures a Git-root file from a subdirectory cwd and rejects its mutation',async()=>{
    const {pi,context,workflow,observe}=await boot({capabilityGrants:['workbench:observe']});
    const root=context.cwd;
    const child=join(root,'nested'); mkdirSync(join(child,'.pi'),{recursive:true});
    writeFileSync(join(child,'.pi','subagents.json'),readFileSync(join(root,'.pi','subagents.json')));
    const file=join(root,'candidate.ts');
    execFileSync('git',['init','-q',root]);
    writeFileSync(file,'export const candidate=1;\n');
    execFileSync('git',['-C',root,'add','candidate.ts']);
    execFileSync('git',['-C',root,'-c','user.name=Test Operator','-c','user.email=operator@example.invalid','commit','-qm','test baseline']);
    sdk.query.mockImplementation(({prompt}:{prompt:string})=>(async function*(){
      if(prompt==='one') writeFileSync(file,'export const candidate=2;\n');
      yield* streamed(`nested-${prompt}`);
    })());
    const nested=ctx({cwd:child});
    const script='export const meta={name:"nested-source",description:"subdir"};\nawait agent("one"); return await agent("two");';
    const launch=await workflow.execute('subdir',{script},undefined,undefined,nested);
    await waitFor(()=>pi.pi.sendMessage.mock.calls.some(([value]:[unknown])=>text(value).includes(launch.details.taskId)));
    expect(sdk.query.mock.calls.map(([arg]:[any])=>arg.prompt)).toEqual(['one']);
    const result=await observe.execute('observe',{taskId:launch.details.taskId,limit:10},undefined,undefined,nested);
    expect(JSON.parse(result.content[0].text).workspaceSourceState).toBe('measured');
    expect(text(result)).toContain('IDENTITY_CONFLICT');
  });

  it('pins a measured dirty/untracked Git candidate and rejects source changes between child dispatches',async()=>{
    const {pi,context,workflow,observe}=await boot({capabilityGrants:['workbench:observe']});
    const file=join(context.cwd,'candidate.ts');
    execFileSync('git',['init','-q',context.cwd]);
    writeFileSync(file,'export const candidate=1;\n');
    execFileSync('git',['-C',context.cwd,'add','candidate.ts']);
    execFileSync('git',['-C',context.cwd,'-c','user.name=Test Operator','-c','user.email=operator@example.invalid','commit','-qm','test baseline']);
    sdk.query.mockImplementation(({prompt}:{prompt:string})=>(async function*(){
      if(prompt==='one') writeFileSync(file,'export const candidate=2;\n');
      yield* streamed(`native-${prompt}`);
    })());
    const script='export const meta={name:"candidate",description:"mutate"};\nawait agent("one");\nreturn await agent("two");';
    const launch=await workflow.execute('run',{script},undefined,undefined,context);
    await waitFor(()=>pi.pi.sendMessage.mock.calls.some(([value]:[unknown])=>text(value).includes(launch.details.taskId)));
    expect(sdk.query.mock.calls.map(([arg]:[any])=>arg.prompt)).toEqual(['one']);
    const observation=await observe.execute('observe',{taskId:launch.details.taskId,limit:25},undefined,undefined,context);
    expect(text(observation)).toMatch(/IDENTITY_CONFLICT|basis changed|identity/i);
    const render=vi.spyOn(cards,'renderWorkflowCard');
    workflow.renderResult(launch,{expanded:false,isPartial:false},{fg:(_:string,s:string)=>s,bold:(s:string)=>s},{isError:false});
    expect(render.mock.calls.at(-1)?.[0].task.status).toBe("failed");
  });
});
