/** Optional native-evidence composition, still an ordinary library function. */
import {develop,type DevelopmentRequest,type DevelopmentOutcome,type DevelopmentServices,type ScopeResult,type Candidate,type VerificationResult} from "@mechanical/workflows-development";
import type {RfContext} from "./rf-context.js";
export interface NativeDevelopmentServices {
 readonly discover:(request:DevelopmentRequest)=>Promise<ScopeResult>;
 readonly render:(scope:ScopeResult,request:DevelopmentRequest)=>Promise<RfContext>;
 readonly implement:(context:RfContext,scope:ScopeResult,request:DevelopmentRequest)=>Promise<Candidate>;
 readonly verify:(candidate:Candidate,request:DevelopmentRequest)=>Promise<VerificationResult>;
}
/**
 * A caller must provide real product callbacks. No fallback to a Git census,
 * static prompt, or simulated gate occurs on this explicit native path.
 */
export async function developWithNativeEvidence(request:DevelopmentRequest,services:NativeDevelopmentServices):Promise<DevelopmentOutcome>{
 return develop(nativeEvidenceServices(services),request);
}
/**
 * The wrapped services, exported so the render sentinel and the context identity guard can be
 * exercised directly; developWithNativeEvidence is the only production caller.
 */
export function nativeEvidenceServices(services:NativeDevelopmentServices):DevelopmentServices{
 let selectedContext:RfContext|undefined;
 return {
  discover:services.discover,
  compileContext:async(scope,input)=>{
   const rf=await services.render(scope,input);
   if(rf.evidence?.system!=="reactive-fiber"||rf.evidence.kind!=="render"||!rf.evidence.id||
      !rf.text.trim()||!rf.outputDigest||!rf.graphRevision){
    // The ordinary composition's basis guard refuses this before implementation.
    return {...rf,basis:{workspaceId:input.workspaceId,revision:"RF_RENDER_UNESTABLISHED"}};
   }
   selectedContext=rf;
   return rf;
  },
  implement:async(context,scope,input)=>{
   if(selectedContext===undefined||context!==selectedContext)throw new Error("RF_CONTEXT_IDENTITY_CHANGED");
   return services.implement(selectedContext,scope,input);
  },
  verify:services.verify,
 };
}
