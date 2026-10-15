/** Invocation args are part of the immutable execution and comparison basis. */
import { expect, it } from "vitest";
import { identityDigest } from "../src/workbench/identity.js";

it("distinguishes absent input from null and pins nested input changes", () => {
  expect(identityDigest("workflow-input", { supplied: false })).not.toBe(identityDigest("workflow-input", { supplied: true, value: null }));
  expect(identityDigest("workflow-input", { supplied: true, value: { paths: ["a"] } })).not.toBe(identityDigest("workflow-input", { supplied: true, value: { paths: ["b"] } }));
});
