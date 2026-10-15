import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { validateWorkflowSource } from "../src/workbench/designer.js";
import { extractMeta, hasMetaDeclaration } from "../src/workflow/meta.js";
import { runWorkflow, validateScript } from "../src/workflow/runtime.js";

const header = 'export const meta = {name:"real",description:"actual metadata"};';
describe("runtime/designer AST metadata agreement", () => {
  it("ignores executable comment decoy and rewrites actual export without touching comment", async () => {
    const prefix = '/*\nexport const meta = {name:(()=>{while(true){}})(),description:"decoy"};\n*/\n';
    const source = `${prefix}${header}\nreturn 42;`;
    expect(extractMeta(source).meta.name).toBe("real"); expect(extractMeta(source).body.startsWith(prefix)).toBe(true);
    const definition = {kind:"script" as const,id:"fixture.js",schemaVersion:"workflow-script/v1",artifactDigest:`sha256:${createHash("sha256").update(source).digest("hex")}`};
    const validation = validateWorkflowSource({definition,sourceRef:"fixture.js",source}); expect(validation.status).toBe("valid"); expect(validation.meta).toEqual(validateScript(source).meta);
    const result = await runWorkflow({script:source,host:{spawnAgent:async () => {throw Error("no agent expected");},abortAgent:() => {}}}); expect(result.value).toBe(42);
  });
  it("listing ignores comment and template declarations that are not code", () => {
    expect(hasMetaDeclaration('/*\nexport const meta = {name:"fake",description:"fake"};\n*/')).toBe(false);
    expect(hasMetaDeclaration('const text = `\nexport const meta = {name:"fake",description:"fake"};\n`;')).toBe(false);
  });
  it("refuses executable literal constructions without evaluating them", () => {
    for (const expression of ['{name:(()=>"ran")(),description:"d"}','{get name(){return "ran";},description:"d"}','{...{name:"x"},description:"d"}','{["name"]:"x",description:"d"}','{name:"x",description:"d",hidden:()=>1}']) expect(() => extractMeta(`export const meta = ${expression};`)).toThrow(/PURE LITERAL/);
  });
  it("refuses duplicate declarations, unclosed metadata and oversized sources", () => {
    expect(() => extractMeta(`${header}\n${header}`)).toThrow(/Exactly one/);
    expect(() => extractMeta('export const meta = {name:"x"')).toThrow(/never closed/);
    expect(() => extractMeta(`${header}\n${" ".repeat(524_288)}`)).toThrow(/limit/);
  });
  it("preserves literal numeric/boolean/null extras and safe escape decoding", () => {
    expect(extractMeta('export const meta = {name:"\\u0072eal",description:`plain`, extra:{n:-1,a:[true,null,0x10]}};').meta).toEqual({name:"real",description:"plain"});
  });
});
