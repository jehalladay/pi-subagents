/** Designer tools are registered Pi clients, read-only and independently authorized. */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => { sandbox?.restore(); sandbox=undefined; });
it("inspects and validates source through the real Pi tool without execution or modification", async () => {
  sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude",capabilityGrants:["workbench:design"]}}});
  const path=join(sandbox.dir,".pi/workflows");mkdirSync(path,{recursive:true});
  const source='export const meta={name:"inspect",description:"design"}; throw Error("MUST_NOT_EXECUTE"); return 1;';
  writeFileSync(join(path,"inspect.js"),source);
  const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
  const tool=pi.tools.get("workflow_validate");expect(tool).toBeDefined();
  const result=await tool.execute("validate",{name:"inspect"},undefined,undefined,context);
  expect(JSON.parse(result.content[0].text)).toMatchObject({syntax:"valid",executed:false});
  expect(readFileSync(join(path,"inspect.js"),"utf8")).toBe(source);
  const denied=await tool.execute("validate",{name:"inspect"},undefined,undefined,ctx({cwd:"/tmp"}));
  expect(JSON.stringify(denied)).toMatch(/denied|permission|grant/i);
});
it("never compares guessed task IDs or reads a foreign receipt", async () => {
  sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude",capabilityGrants:["workbench:design","workbench:observe"]}}});
  const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
  const tool=pi.tools.get("workflow_compare");expect(tool).toBeDefined();
  const result=await tool.execute("compare",{referenceTask:"wf_missing",candidateTask:"wf_guessed"},undefined,undefined,context);
  expect(JSON.stringify(result)).toMatch(/unavailable|scope/);
});
async function waitFor(predicate: () => boolean) {
  for (let i = 0; i < 300; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error("designer compare workflows did not finish in the test window");
}
it("names an unmeasured workspace source state as a cohort confound through the real tool, never a matched basis", async () => {
  sandbox=hermeticDir({nonRepo:true,settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude",capabilityGrants:["workbench:design","workbench:observe"]}}});
  const scriptPath=join(sandbox.dir,"compare.js");
  writeFileSync(scriptPath,'export const meta={name:"compare",description:"local"}; return 1;');
  const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
  const ids:string[]=[];
  for (let i=0;i<2;i++){const launched=await pi.tools.get("SubagentWorkflow").execute(`compare-${i}`,{scriptPath},undefined,undefined,context);ids.push(launched.details.taskId as string);}
  const reply=await pi.tools.get("workflow_compare").execute("compare",{referenceTask:ids[0],candidateTask:ids[1]},undefined,undefined,context);
  const result=JSON.parse(reply.content[0].text);
  // The hermetic sandbox is not a Git checkout: both receipts carry the same unmeasured subject basis, which must not read as matched.
  expect(result.status).not.toBe("comparable");
  expect(result.cohort.matched).toBe(false);
  expect(result.cohort.confounds.some((item:{field:string;kind:string})=>item.field==="workspaceSourceState"&&item.kind==="absent")).toBe(true);
  expect(result.claim).toBe("none"); expect(result.metrics).toEqual([]); expect(result.causalClaim).toBe(false);
  await waitFor(()=>ids.every(id=>pi.pi.sendMessage.mock.calls.some(([item]:[unknown])=>JSON.stringify(item).includes(id))));
});
