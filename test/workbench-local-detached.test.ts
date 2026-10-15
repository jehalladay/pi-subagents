import { describe, expect, it } from "vitest";
import { DetachedFrameDecoder, decodeDetachedCommand, detachedFrame, localOperator } from "../src/workbench/hosts/local-detached.js";

describe("local detached transport policy", () => {
  it("binds local OS identity, not session payload", () => {
    expect(localOperator()).toEqual({ issuer: "local-os-dac", uid: process.getuid!(), id: `local-os:uid:${process.getuid!()}` });
    expect(() => decodeDetachedCommand({ command: "inspect", invocationId: "one", principal: "pi-session" })).toThrow(/field/);
  });
  it("decodes fragmented frames and refuses oversize, pollution and invalid commands", () => {
    const decoder = new DetachedFrameDecoder();
    const frame = detachedFrame({ command: "inspect", invocationId: "one" });
    expect(decoder.push(frame.subarray(0, 3))).toEqual([]);
    expect(decoder.push(frame.subarray(3))).toEqual([{ command: "inspect", invocationId: "one" }]);
    const huge = Buffer.alloc(4); huge.writeUInt32BE(1_048_577);
    expect(() => new DetachedFrameDecoder().push(huge)).toThrow(/frame/);
    expect(() => new DetachedFrameDecoder().push(detachedFrame(JSON.parse('{"__proto__":{}}')))).toThrow();
    const zero=Buffer.alloc(4);
    expect(() => new DetachedFrameDecoder().push(zero)).toThrow(/length/);
    const badUtf8=Buffer.from([0,0,0,1,0xff]);
    expect(() => new DetachedFrameDecoder().push(badUtf8)).toThrow(/UTF-8/);
    expect(() => decodeDetachedCommand({command:"retry",invocationId:"one"})).toThrow();
    expect(() => decodeDetachedCommand({command:"execute",invocationId:"../escape"})).toThrow();
    expect(() => decodeDetachedCommand({command:"cancel",invocationId:"one",reason:""})).toThrow();
  });
  it("bounds JSON recursion and concatenated command batches", () => {
    let value: unknown = null;
    for(let i=0;i<70;i++) value={child:value};
    expect(() => detachedFrame(value)).toThrow();
    const a=detachedFrame({command:"inspect",invocationId:"one"});
    expect(new DetachedFrameDecoder().push(Buffer.concat([a,a]))).toHaveLength(2);
  });
});
