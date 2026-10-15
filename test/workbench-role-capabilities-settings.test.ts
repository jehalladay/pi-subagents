import {afterEach,expect,it} from "vitest";
import {loadSettings} from "../src/settings.js";
import {hermeticDir} from "./helpers/boot-extension.js";

let sandbox:ReturnType<typeof hermeticDir>|undefined;
afterEach(()=>{sandbox?.restore();sandbox=undefined;});
it("pins finite Claude role provider allowlists without granting provider permission",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["forge.gate.status"]}}}}});
 expect(loadSettings(sandbox.dir).workbench?.roles?.reviewer).toMatchObject({capabilities:["forge.gate.status"]});
 expect(loadSettings(sandbox.dir).workbench?.capabilityGrants).toBeUndefined();
});
it("rejects wildcard role capabilities",()=>{
 sandbox=hermeticDir({settings:{workbench:{workflowAgentBackend:"claude",roles:{reviewer:{prompt:"Review",capabilities:["*"]}}}}});
 expect(()=>loadSettings(sandbox!.dir)).toThrow(/roles|capabilities/);
});
