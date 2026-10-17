/**
 * wb-u62 respin-3: the census helper's vitest model, mirrored against the installed runtime. Report mode resolves a
 * registration chain only through members vitest's runtime objects define (REGISTRATION_MEMBERS) and reads expect's
 * always-failing members as assertions (FAILING_MEMBERS); pinning both against the runtime turns the model into a
 * measured mirror, so a vitest change goes red here before a census reads a member the model does not know. This file
 * reads vitest's API objects reflectively - itself an escape the registration scan reads closed - so it holds no pin.
 */

import { describe, expect, it, suite, test } from "vitest";
import { FAILING_MEMBERS, REGISTRATION_MEMBERS } from "./helpers/census.js";

const INTRINSIC = new Set(["fn", "length", "name", "prototype"]);
const members = (value: object): string[] =>
  Object.getOwnPropertyNames(value)
    .filter(name => !INTRINSIC.has(name))
    .sort();

describe("census helper: the vitest model is vitest's own API (u62 respin-3, the design invariant's closed definition)", () => {
  it("it / test and describe / suite define exactly the members report mode reads (the internal fn and the function intrinsics stay unresolved)", () => {
    expect(test).toBe(it);
    expect(suite).toBe(describe);
    expect(members(it)).toEqual(REGISTRATION_MEMBERS.test);
    expect(members(it.skip)).toEqual(REGISTRATION_MEMBERS.test);
    expect(members(describe)).toEqual(REGISTRATION_MEMBERS.suite);
    expect(members(describe.skip)).toEqual(REGISTRATION_MEMBERS.suite);
  });

  it("expect's members the third leg reads as assertions fail the case when reached", () => {
    const failing = expect as unknown as Readonly<Record<string, ((message: string) => void) | undefined>>;
    expect(FAILING_MEMBERS).toEqual(["fail", "unreachable"]);
    for (const member of FAILING_MEMBERS) expect(() => failing[member]?.("reached"), member).toThrow();
  });
});
