/** Furnace native Run reader. Observation does not own or control the Run. */
import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { Furnace } from "@furnace/sdk";
import { CapabilityError, type CapabilityRegistry, type JsonValue } from "../capability-registry.js";
import { redactWorkbenchText } from "../redaction.js";

export const FURNACE_RUN_INSPECT_CONTRACT = "furnace.run.inspect/v1";

export interface FurnaceReadClient {
  runs:{get(id:string):{inspect():Promise<{kind:string;data:unknown;requestId?:string;exit?:unknown}>}};
}
const INPUT={type:"object",properties:{runId:{type:"string",minLength:1,maxLength:128}},required:["runId"],additionalProperties:false};

function canonicalWorkspace(path:string):string {
  try { return realpathSync(path); } catch { return resolve(path); }
}
/** A Run record names its own workspace. One for another workspace, or one whose identity or workspace cannot be read, is never attributed to this root. */
function assertRunRecordScope(response:{kind:string;data:unknown},runId:string,workspaceRoot:string):void {
  const record=response.data;
  const recorded=record!==null&&typeof record==="object" ? record as {run_id?:unknown;workspace?:unknown} : undefined;
  if(!recorded||recorded.run_id!==runId||typeof recorded.workspace!=="string"||!recorded.workspace) throw new CapabilityError("unavailable","Furnace Run record identity or workspace cannot be safely read.");
  if(canonicalWorkspace(recorded.workspace)!==canonicalWorkspace(workspaceRoot)) throw new CapabilityError("authorization","Furnace Run belongs to a different workspace than the authorized root.");
}

export function registerFurnaceRunInspect(registry:CapabilityRegistry,client:FurnaceReadClient,workspaceRoot:string):void {
  registry.register({descriptor:{id:"furnace.run.inspect",version:"1.0.0",description:"Read native Furnace Run record without starting or controlling it",inputSchema:INPUT,effectClass:"read",permissions:["furnace:inspect"],supportedModes:["invoke"],contractSource:"@furnace/sdk@0.1.0:Furnace.runs.get().inspect"},
    async invoke(input,context){
      if(context.signal.aborted) throw new CapabilityError("transport","Furnace inspect cancelled before invocation.");
      const runId=(input as {runId:string}).runId;
      const response=await client.runs.get(runId).inspect();
      if(context.signal.aborted) throw new CapabilityError("transport","Furnace inspect cancelled.");
      assertRunRecordScope(response,runId,workspaceRoot);
      return JSON.parse(JSON.stringify({contract:FURNACE_RUN_INSPECT_CONTRACT,workspaceRoot,source:response})) as JsonValue;
    }});
}

/** Attach to an independently started Run, retaining its native identifiers. */
export async function nativeFurnaceRunInspect(workspaceRoot:string,runId:string,signal?:AbortSignal):Promise<JsonValue> {
  if(signal?.aborted) throw new CapabilityError("transport","Furnace inspect cancelled before SDK launch.");
  const client=new Furnace({binary:"furnace",cwd:workspaceRoot,timeoutMs:30_000});
  try {
    const version=await client.version();
    if(signal?.aborted) throw new CapabilityError("transport","Furnace inspect cancelled.");
    const response=await client.runs.get(runId).inspect();
    if(signal?.aborted) throw new CapabilityError("transport","Furnace inspect cancelled.");
    assertRunRecordScope(response,runId,workspaceRoot);
    return JSON.parse(JSON.stringify({contract:FURNACE_RUN_INSPECT_CONTRACT,workspaceRoot,version:version.data,source:{kind:response.kind,data:response.data,requestId:response.requestId,exit:response.exit}})) as JsonValue;
  }catch(error){
    if(error instanceof CapabilityError) throw error;
    if(signal?.aborted) throw new CapabilityError("transport","Furnace inspect cancelled.");
    const code=error && typeof error==="object" && "code" in error ? String(error.code) : "unknown";
    throw new CapabilityError("unavailable",`Furnace Run inspect failed (${code}): ${redactWorkbenchText(error instanceof Error?error.message:String(error))}`);
  }
}

export function registerNativeFurnaceRunInspect(registry:CapabilityRegistry,workspaceRoot:string):void {
  registry.register({descriptor:{id:"furnace.run.inspect",version:"1.0.0",description:"Attach read-only to external native Furnace Run",inputSchema:INPUT,effectClass:"read",permissions:["furnace:inspect"],supportedModes:["invoke"],contractSource:"@furnace/sdk@0.1.0:Furnace.runs.get().inspect"},
    invoke:async(input,ctx)=>nativeFurnaceRunInspect(workspaceRoot,(input as {runId:string}).runId,ctx.signal)});
}
