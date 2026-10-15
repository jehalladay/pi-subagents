/** HyperUnix typed SDK query provider. Preserves native coverage, never infers absence. */
import { realpathSync } from "node:fs";
import { isAbsolute } from "node:path";
import { Bounds, type ClaimBody, HyperUnix, type QueryResult, resultToJson } from "@hyperunix/sdk";
import { CapabilityError, type CapabilityRegistry, type JsonValue } from "../capability-registry.js";

export interface HyperUnixReader {
  find(options: {kind:string;root?:string;bestEffort?:boolean;bounds?:Bounds;timeoutMs?:number}): Promise<QueryResult<ClaimBody>>;
  runtime(): Promise<{version:string;binarySha256:string}>;
  close(): Promise<void>;
}
const INPUT={type:"object",properties:{kind:{type:"string",minLength:1},root:{type:"string"}},required:["kind"],additionalProperties:false};

export function registerHyperUnixFind(registry:CapabilityRegistry,reader:HyperUnixReader,workspaceRoot:string):void {
  registry.register({descriptor:{id:"hyperunix.find",version:"1.0.0",description:"Read typed HX results with native coverage and query basis",inputSchema:INPUT,effectClass:"read",permissions:["hyperunix:read"],supportedModes:["invoke"],contractSource:"@hyperunix/sdk@0.1.0:HyperUnix.find"},
    async invoke(input,context){
      const {kind,root} = input as {kind:string;root?:string};
      if(context.signal.aborted) throw new CapabilityError("transport","HX read cancelled before invocation.");
      const native=await reader.find({kind,...(root?{root}:{}),bestEffort:true,bounds:Bounds.create({wall:"30s"}),timeoutMs:60_000});
      if(context.signal.aborted) throw new CapabilityError("transport","HX read cancelled.");
      const runtime=await reader.runtime();
      if(context.signal.aborted) throw new CapabilityError("transport","HX read cancelled.");
      const source=resultToJson(native);
      return JSON.parse(JSON.stringify({contract:"hyperunix.find/v1",source,workspaceRoot,runtime:{version:runtime.version,binarySha256:runtime.binarySha256}})) as JsonValue;
    }});
}

/** Native SDK, bound to the Pi workspace, with one owned read lifecycle. */
export async function nativeHyperUnixFind(workspaceRoot:string,kind:string,root="src",signal?:AbortSignal):Promise<JsonValue> {
  if(!isAbsolute(workspaceRoot)) throw new CapabilityError("validation","HX workspace must be an absolute path.");
  if(signal?.aborted) throw new CapabilityError("transport","HX read cancelled before SDK launch.");
  const workspace=HyperUnix.open(realpathSync(workspaceRoot));
  const client=workspace.client;
  const onAbort=()=>client.dispose();
  signal?.addEventListener("abort",onAbort,{once:true});
  try {
    if(signal?.aborted) throw new CapabilityError("transport","HX read cancelled during SDK launch.");
    const runtime=await client.runtime();
    if(signal?.aborted) throw new CapabilityError("transport","HX read cancelled during SDK launch.");
    const result=await workspace.find({kind,root,bestEffort:true,bounds:Bounds.create({wall:"30s"}),timeoutMs:60_000});
    if(signal?.aborted) throw new CapabilityError("transport","HX read cancelled.");
    return JSON.parse(JSON.stringify({contract:"hyperunix.find/v1",source:resultToJson(result),workspaceRoot:realpathSync(workspaceRoot),runtime:{version:runtime.version,binarySha256:runtime.binarySha256}})) as JsonValue;
  }finally{signal?.removeEventListener("abort",onAbort);await client.close()}
}

export function registerNativeHyperUnixFind(registry:CapabilityRegistry,workspaceRoot:string):void {
  registry.register({descriptor:{id:"hyperunix.find",version:"1.0.0",description:"Native bounded HX query with coverage",inputSchema:INPUT,effectClass:"read",permissions:["hyperunix:read"],supportedModes:["invoke"],contractSource:"@hyperunix/sdk@0.1.0:HyperUnix.find"},
    invoke:async (input,ctx)=>nativeHyperUnixFind(workspaceRoot,(input as {kind:string}).kind,(input as {root?:string}).root??"src",ctx.signal)});
}
