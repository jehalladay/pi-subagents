import type {SDKMessage} from "@anthropic-ai/claude-agent-sdk";
import {expect,it} from "vitest";
import {createClaudeWorkflowHost} from "../src/workbench/claude-host.js";

it("shows the native assistant model rather than the gateway's requested init alias",async()=>{
 const seen:string[]=[];
 const host=createClaudeWorkflowHost({cwd:process.cwd(),model:"claude-opus-5-5",query:()=> (async function*(){yield {type:"system",subtype:"init",session_id:"s",model:"claude-opus-5-5"} as SDKMessage;yield {type:"assistant",session_id:"s",message:{model:"openai.gpt-6.1-sol",content:[]}} as unknown as SDKMessage;yield {type:"result",subtype:"success",session_id:"s",result:"done",is_error:false,modelUsage:{}} as SDKMessage;})()});
 await host.spawnAgent({agentId:"a",index:0,label:"a",agentType:"general-purpose",prompt:"probe",onResolved:value=>{if(value.modelId)seen.push(value.modelId);}});
 expect(seen.at(-1)).toBe("openai.gpt-6.1-sol");
});
