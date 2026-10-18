/**
 * wb-u62 respin-3: the census helper's vitest model, mirrored against the installed runtime. Report mode resolves a
 * registration chain only through members vitest's runtime objects define (REGISTRATION_MEMBERS) and reads expect's
 * always-failing members as assertions (FAILING_MEMBERS); pinning both against the runtime turns the model into a
 * measured mirror, so a vitest change goes red here before a census reads a member the model does not know. This file
 * reads vitest's API objects reflectively - itself an escape the registration scan reads closed - so it holds no pin.
 *
 * wb-u62 respin-4 (the owner's resolvable-construct roster, 2026-10-17): every allowlist a roster row reads is pinned
 * here the same way - the matchers and chain members of an expect(x) assertion (MATCHERS / CHAIN_MEMBERS, by property
 * descriptor, never by reading a getter, since chai's property assertions run when read), the assert API's methods
 * (ASSERT_METHODS), the test context's members (CONTEXT_MEMBERS), the CLOSED set of vitest's public routes to its
 * registration API (REGISTRATION_ROUTES), and what a registration call returns (only describe / suite return a value:
 * the suite collector).
 */

import nodeAssert from "node:assert";
import * as runner from "@vitest/runner";
import * as vitestNamespace from "vitest";
import { afterAll, assert, beforeEach, describe, expect, it, onTestFinished, suite, test } from "vitest";
import * as vitestSuite from "vitest/suite";
import * as census from "./helpers/census.js";
import { FAILING_MEMBERS, REGISTRATION_MEMBERS } from "./helpers/census.js";

const INTRINSIC = new Set(["fn", "length", "name", "prototype"]);
const members = (value: object): string[] =>
  Object.getOwnPropertyNames(value)
    .filter(name => !INTRINSIC.has(name))
    .sort();

/** Every own property along an object's prototype chain (Object.prototype and Function.prototype excluded), classified by descriptor. */
function descriptors(value: object): { readonly functions: string[]; readonly getters: string[] } {
  const functions = new Set<string>();
  const getters = new Set<string>();
  for (let current: object | null = value; current !== null && current !== Object.prototype && current !== Function.prototype; current = Object.getPrototypeOf(current)) {
    for (const name of Object.getOwnPropertyNames(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, name);
      if (descriptor?.get !== undefined) getters.add(name);
      else if (typeof descriptor?.value === "function") functions.add(name);
    }
  }
  return { functions: [...functions].sort(), getters: [...getters].sort() };
}

const sorted = (values: readonly string[] | undefined): string[] => [...(values ?? [])].sort();

/** What vitest's registration calls return, measured where they run: at collection. */
const describeReturns: unknown = describe("census model: the suite collector describe returns", () => {
  it("holds one case", () => {
    expect(1).toBe(1);
  });
});
const itReturns: unknown = it("census model: what it returns", () => {
  expect(1).toBe(1);
});
const hookReturns: unknown = beforeEach(() => undefined);
const afterAllReturns: unknown = afterAll(() => undefined);

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

describe("census helper: the roster's allowlists are vitest's own runtime (u62 respin-4, the resolvable-construct roster)", () => {
  it("an expect(x) assertion's callable members are exactly MATCHERS and NON_MATCHERS; its chainable methods and chain members are exactly CHAIN_MEMBERS", () => {
    const assertion = expect(1);
    const found = descriptors(assertion);
    const chainable = Object.keys((assertion as unknown as { readonly __methods: object }).__methods).sort();
    expect(sorted(census.NON_MATCHERS)).toEqual(["assert", "constructor", "withContext", "withTest"]);
    expect(sorted([...(census.MATCHERS ?? []).filter(name => !chainable.includes(name)), ...(census.NON_MATCHERS ?? [])])).toEqual(found.functions);
    expect((census.MATCHERS ?? []).filter(name => chainable.includes(name)).sort()).toEqual(chainable);
    expect(sorted([...(census.CHAIN_MEMBERS ?? []), "_obj"])).toEqual(found.getters);
  });

  it("the assert API's methods are exactly ASSERT_METHODS: chai's assert and node:assert, without node:assert's classes", () => {
    const chai = descriptors(assert).functions;
    const node = descriptors(nodeAssert).functions.filter(name => !["Assert", "AssertionError", "CallTracker"].includes(name));
    expect(sorted(census.ASSERT_METHODS)).toEqual([...new Set([...chai, ...node])].sort());
    expect(nodeAssert.strict.strictEqual).toBe(nodeAssert.strictEqual);
  });

  it("the test context carries exactly CONTEXT_MEMBERS (besides the intrinsics of the function it is)", ctx => {
    expect(members(ctx)).toEqual(sorted(census.CONTEXT_MEMBERS));
    expect(typeof ctx).toBe("function");
  });

  // a dynamic import("vitest") resolves to the module namespace object the static namespace import binds (one module
  // record per specifier), so the namespace row below stands for it without an inline import in this file
  it("vitest's public routes to its registration API are exactly REGISTRATION_ROUTES, and each yields the same objects", () => {
    const meta = (import.meta as unknown as { readonly vitest?: Readonly<Record<string, unknown>> }).vitest;
    expect(sorted(census.REGISTRATION_ROUTES)).toEqual(["@vitest/runner", "dynamic import", "global", "import.meta.vitest", "named import", "namespace import"]);
    expect(meta?.it).toBe(it);
    expect(meta?.describe).toBe(describe);
    expect(meta?.beforeEach).toBe(beforeEach);
    expect(meta?.onTestFinished).toBe(onTestFinished);
    expect(vitestNamespace.it).toBe(it);
    expect(vitestNamespace.describe).toBe(describe);
    expect(runner.it).toBe(it);
    expect(runner.describe).toBe(describe);
    expect(runner.beforeEach).toBe(beforeEach);
    expect(runner.onTestFinished).toBe(onTestFinished);
    const suiteExports = Object.keys(vitestSuite);
    for (const name of ["it", "test", "describe", "suite", "beforeEach", "afterEach", "beforeAll", "afterAll", "aroundEach", "aroundAll", "onTestFailed", "onTestFinished"]) expect(suiteExports).not.toContain(name);
  });

  it("only describe / suite return a value - the suite collector, which reaches the suite's hooks, options, task and cases", () => {
    expect(itReturns).toBeUndefined();
    expect(hookReturns).toBeUndefined();
    expect(afterAllReturns).toBeUndefined();
    expect(typeof describeReturns).toBe("object");
    expect(Object.keys(describeReturns as object)).toEqual(expect.arrayContaining(["on", "options", "task", "test", "tasks"]));
  });
});
