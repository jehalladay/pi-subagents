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
