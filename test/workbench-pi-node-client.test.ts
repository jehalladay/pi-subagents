/** L2: real Pi tool -> worker node RPC -> native Forge SDK -> evidence result. */
import { writeFileSync } from 'node:fs';
import { afterEach, describe, expect, it } from 'vitest';
import subagentsExtension from '../src/index.js';
import { ctx, hermeticDir, makePi } from './helpers/boot-extension.js';

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(()=>{sandbox?.restore(); sandbox=undefined;});

describe('Pi native Forge workflow',()=>{
  it('keeps native status as a value via Pi tool and persists node progress',async()=>{
    sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:'claude',capabilityGrants:['forge:inspect']}}});
    const pi=makePi(); subagentsExtension(pi.pi);
    const context=ctx({cwd:sandbox.dir});
    await pi.lifecycle.get('session_start')?.({},context);
    const tool=pi.tools.get('SubagentWorkflow');expect(tool).toBeDefined();
    const workspace=sandbox!.dir;
    writeFileSync(`${workspace}/forge.toml`, '[package]\nname="workbench-probe"\ntype="code"\nversion="0.1.0"\nlanguage="typescript"\n[build]\nbackend="typescript"\n');
    const source=`export const meta = {name:"native-forge",description:"Read Forge"};\nreturn await node("forge.gate.status", {target:${JSON.stringify(workspace)}});`;
    const reply=await tool!.execute('wf-native-test',{script:source},undefined,undefined,context);
    const id=reply.details.taskId;
    expect(id).toMatch(/^wf_[a-z0-9-]{6,}$/);
    for(let i=0;i<400 && !pi.pi.sendMessage.mock.calls.some(([m]:[unknown])=>JSON.stringify(m).includes(`native-forge`));i++) await new Promise(r=>setTimeout(r,25));
    expect(pi.pi.sendMessage).toHaveBeenCalled();
    const entries=pi.pi.sendMessage.mock.calls.map(([m]:[unknown])=>JSON.stringify(m));
    expect(entries.some((e:string)=>e.includes('completed') || e.includes('failed'))).toBe(true);
    expect(entries.some((e:string)=>e.includes('forge.gate.status/v1'))).toBe(true);
    expect(entries.some((e:string)=>e.includes('authoritative_current') || e.includes('FORGE_'))).toBe(true);
  },60_000);
});
