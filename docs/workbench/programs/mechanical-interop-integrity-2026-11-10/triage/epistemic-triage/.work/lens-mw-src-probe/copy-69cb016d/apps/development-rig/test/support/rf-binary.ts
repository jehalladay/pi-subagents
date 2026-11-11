/** Test-only rf binary resolution: MECHANICAL_RF_BINARY first, else an executable `rf` on PATH, else undefined (MechanicalWorkflows-glda4). */
import { accessSync, constants, statSync } from "node:fs";
import { delimiter, join } from "node:path";
/** The declared skip reason of a native-rf test when the (hermetic) environment provides no rf. */
export const RF_UNAVAILABLE_SKIP="RF_UNAVAILABLE_UNDER_HERMETIC";
function executableFile(path:string):boolean{try{if(!statSync(path).isFile())return false;accessSync(path,constants.X_OK);return true}catch{return false}}
export function resolveRfBinary(env:NodeJS.ProcessEnv):string|undefined{
 const named=env["MECHANICAL_RF_BINARY"];
 if(named!==undefined&&named!=="")return executableFile(named)?named:undefined;
 return findOnPath("rf",env);
}
/** The first executable file called name in a PATH directory of env, else undefined. */
export function findOnPath(name:string,env:NodeJS.ProcessEnv):string|undefined{
 for(const dir of (env["PATH"]??"").split(delimiter)){if(dir==="")continue;const candidate=join(dir,name);if(executableFile(candidate))return candidate}
 return undefined;
}
