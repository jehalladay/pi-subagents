import type {Options, SDKMessage} from "@anthropic-ai/claude-agent-sdk";
import {expect,it} from "vitest";
import {CapabilityRegistry} from "../src/workbench/capability-registry.js";
import {createClaudeWorkflowHost} from "../src/workbench/claude-host.js";

it("adds only curated role MCP tools to actual SDK options without provider auto-grants",async()=>{
 const registry=new CapabilityRegistry();registry.register({descriptor:{id:"review.read",version:"1.0.0",description:"read",inputSchema:{type:"object"},effectClass:"read",permissions:["review:read"],supportedModes:["invoke"]},invoke:async()=>({native:"fixture"})});
 let captured:Options|undefined;
 const host=createClaudeWorkflowHost({cwd:process.cwd(),roles:{reviewer:{prompt:"Review",tools:[],capabilities:["review.read"]}},capabilities:registry,grants:["discover:review.read","invoke:review.read","review:read"],principal:{id:"operator"},query:({options})=>{captured=options;return(async function*(){yield {type:"system",subtype:"init",session_id:"s",model:"claude-opus-5-5",tools:[]} as unknown as SDKMessage;yield {type:"result",subtype:"success",session_id:"s",result:"done",is_error:false,modelUsage:{}} as SDKMessage;})();}});
 await host.spawnAgent({agentId:"one",index:0,label:"review",prompt:"review",agentType:"reviewer"});
 expect(captured?.mcpServers?.workbench).toMatchObject({type:"sdk"});
 expect(captured?.allowedTools).toEqual(expect.arrayContaining(["mcp__workbench__capability_discover","mcp__workbench__capability_contract","mcp__workbench__capability_invoke"]));
});
