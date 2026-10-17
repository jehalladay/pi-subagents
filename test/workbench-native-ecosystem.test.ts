/** L2 native HX, Furnace and RF tools against the native binaries on this host. The HX case asserts the shared runtime-licence
 * invariant (wb-tz2.1) instead of any concrete verdict, and prints the receipt line that records which hx it read. */
import {describe,expect,it} from 'vitest';
import {hxLiveInvariant} from '../src/workbench/hyperunix-observer.js';
import {nativeFurnaceRunInspect} from '../src/workbench/providers/furnace.js';
import {nativeHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';
import {hxLiveReceipt} from './helpers/hx-live-receipt.js';

describe('native SDK ecosystem',()=>{
  it('HX typed query retains incomplete coverage and binary identity',async()=>{
    const result=await nativeHyperUnixFind(process.cwd(),'hx.fs/regular-file','src');
    expect(result).toMatchObject({contract:'hyperunix.find/v1',source:{representation:'hyperunix.result/1'},runtime:{binarySha256:expect.stringMatching(/^[0-9a-f]{64}$/)}});
    expect(hxLiveInvariant(result)).toMatchObject({holds:true,violations:[]});
    console.log(hxLiveReceipt(result));
  },60_000);
  it('Furnace inspect reports missing state without creating a Run',async()=>{
    await expect(nativeFurnaceRunInspect(process.cwd(),'frn-run-nonexistent')).rejects.toThrow(/state_error|not initialized/i);
  },60_000);
  it('RF render refuses when package has no initialized context workspace',async()=>{
    await expect(nativeReactiveFiberPreview('claude-opus-5','probe',process.cwd())).rejects.toThrow(/RF_(WORKSPACE|STORAGE)|workspace/i);
  },60_000);
});
