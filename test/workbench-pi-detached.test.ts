import {writeFileSync} from "node:fs";
import {join} from "node:path";
/** Optional detached read is separate from Pi-owned task execution. */
import {afterEach,expect,it} from "vitest";
import subagentsExtension from "../src/index.js";
import {ctx,hermeticDir,makePi} from "./helpers/boot-extension.js";

let sandbox:ReturnType<typeof hermeticDir>|undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;});
it("denies detached launch/attachment without explicit local-host permission",async()=>{
 sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude"}}});
 const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
 const tool=pi.tools.get("workflow_detached");expect(tool).toBeDefined();
 const result=await tool.execute("host",{action:"inspect",invocationId:"test-run"},undefined,undefined,context);
 expect(JSON.stringify(result)).toMatch(/denied|permission|grant/);
});
it("launches reviewed pure computation outside Pi ownership and reattaches by stable invocation",async()=>{
 sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude",capabilityGrants:["workbench:detach","workbench:observe"]}}});
 const path=join(sandbox.dir,"pure.js");writeFileSync(path,'export const meta={name:"detached",description:"local computation"}; return 42;');
 const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
 const tool=pi.tools.get("workflow_detached");
 const launched=await tool.execute("launch",{action:"launch",invocationId:"pi-pure-compute",scriptPath:path,trustedScript:true,backend:"deterministic"},undefined,undefined,context);
 const receipt=JSON.parse(launched.content[0].text);
 expect(receipt.contract).toBe("workbench.local-detached/v1");expect(receipt.security).toBe("same-machine-os-dac-only");
 try {
  await pi.lifecycle.get("session_shutdown")?.({},context);
  let observed=JSON.parse((await tool.execute("inspect",{action:"inspect",invocationId:"pi-pure-compute"},undefined,undefined,context)).content[0].text);
  for(let i=0;i<100 && !observed.terminal;i++){await new Promise(r=>setTimeout(r,20));observed=JSON.parse((await tool.execute("inspect",{action:"inspect",invocationId:"pi-pure-compute"},undefined,undefined,context)).content[0].text);}
  expect(observed.terminal).toBe("completed");expect(observed.result).toBe(42);expect(observed.nativeRuntimeIdentity).toBe("unsupported");
 } finally { try {process.kill(receipt.pid,"SIGTERM");}catch{} }
},30000);
