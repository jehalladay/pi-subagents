/** The Pi native external observer cannot inherit another workspace's Run authority. */
import {afterEach,expect,it} from "vitest";
import subagentsExtension from "../src/index.js";
import {ctx,hermeticDir,makePi} from "./helpers/boot-extension.js";

let sandbox:ReturnType<typeof hermeticDir>|undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;});
it("registers read-only native attachment but denies absence of explicit provider grant",async()=>{
 sandbox=hermeticDir({settings:{workflowsEnabled:true,workbench:{workflowAgentBackend:"claude"}}});
 const pi=makePi();subagentsExtension(pi.pi);const context=ctx({cwd:sandbox.dir});await pi.lifecycle.get("session_start")?.({},context);
 const tool=pi.tools.get("furnace_observe");expect(tool).toBeDefined();
 const result=await tool.execute("observe",{runId:"frn-run-known"},undefined,undefined,context);
 expect(JSON.stringify(result)).toMatch(/grant|denied|permission/i);
 expect(JSON.stringify(result)).not.toContain("active");
});
