/**
 * W22 gate strength (wb-464): the complete gate must refuse a stray `.only`.
 *
 * vitest's `allowOnly` defaults to `!process.env.CI`, and CI is unset under forge, so one
 * focused test anywhere would silently narrow the whole run while the gate stayed green
 * (measured by the wb-752.10 gate seat). The repo config has to pin it off explicitly, and
 * this test reads the SAME config module the gate loads, so the pin cannot drift unnoticed.
 */
import { describe, expect, it } from "vitest";
import config from "../vitest.config.js";

interface TestOptionsShape {
  allowOnly?: boolean;
  include?: readonly string[];
}

interface ConfigShape {
  test?: TestOptionsShape;
}

describe("complete gate refuses focused tests", () => {
  it("pins test.allowOnly to false in the shared vitest config", () => {
    const loaded = config as unknown as ConfigShape;
    expect(loaded.test).toBeDefined();
    expect(loaded.test?.allowOnly).toBe(false);
  });

  it("keeps the default include glob so the pin covers every suite the gate runs", () => {
    const loaded = config as unknown as ConfigShape;
    expect(loaded.test?.include).toEqual(["test/**/*.test.ts"]);
  });
});
