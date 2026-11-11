/** Reproducible local RF component provisioning, separate from agent execution. */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { realpath } from "node:fs/promises";
import { join } from "node:path";
import { cleanGitBasis, packageRoot } from "./live-gate.js";
import { runBoundedProcess } from "./bounded-process.js";
import { rfExecutable } from "./rf-binary.js";
const exec = promisify(execFile);
interface RfAnswer { readonly ok:boolean; readonly diagnostics?:readonly {readonly code?:string}[] }
async function runRf(root:string,args:string[]):Promise<RfAnswer> {
 let stdout:string;
 try {({stdout}=await runBoundedProcess(rfExecutable(),[...args,"--workspace",root,"--json","--no-input"],{cwd:root,timeoutMs:90_000,maxBuffer:8*1024*1024}))}
 catch(error){throw new Error("RF_PROVISION_FAILED: "+(error instanceof Error?error.message:String(error)))}
 let answer:unknown;try{answer=JSON.parse(stdout)}catch{throw new Error("RF_PROVISION_FAILED: invalid RF JSON envelope")}
 if(answer===null||typeof answer!=="object"||!(answer as RfAnswer).ok)throw new Error("RF_PROVISION_FAILED: "+JSON.stringify((answer as RfAnswer)?.diagnostics??[]));
 return answer as RfAnswer;
}
/**
 * Caller invokes this only on a trusted, single-writer Git package. RF state
 * must be ignored by Git; a package with committed RF definitions is refused
 * rather than overwritten. No run or model session is started here.
 */
export async function provisionRfTaskContext(rootInput:string):Promise<{readonly kind:"provisioned";readonly workspace:string}> {
 const root=await realpath(packageRoot(rootInput));
 await cleanGitBasis(root);
 const result=await exec("git",["-C",root,"check-ignore","--quiet",".reactive-fiber/"],{encoding:"utf8"}).then(()=>true,()=>false);
 if(!result)throw new Error("RF_STATE_NOT_IGNORED: ignore .reactive-fiber/ before provisioning");
 const existing=join(root,".reactive-fiber");
 if(existsSync(existing))throw new Error("RF_ALREADY_PROVISIONED: refusing to overwrite existing RF workspace");
 await runRf(root,["init","--backend","jsonl"]);
 await runRf(root,["component","create","mechanical.task","--kind","declarative"]);
 const body=join(existing,"components","declarative","mechanical.task.toml");
 const source=readFileSync(body,"utf8");
 if(!source.includes('content = "mechanical.task has no content yet."'))throw new Error("RF_PROVISION_TEMPLATE_CHANGED: native starter format did not match");
 writeFileSync(body,source.replace('content = "mechanical.task has no content yet."','content = "${provider:task}"'));
 await runRf(root,["component","add",".reactive-fiber/components/manifests/mechanical.task.toml"]);
 await runRf(root,["component","activate","mechanical.task"]);
 await runRf(root,["graph","validate"]);
 await cleanGitBasis(root);
 return {kind:"provisioned",workspace:root};
}
