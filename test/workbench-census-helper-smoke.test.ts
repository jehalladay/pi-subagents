/**
 * wb-u62: the FIND-1 smoke anchor. test/workbench-census-helper.test.ts judges the case below with the shared census
 * helper through this repository's REAL default gate (forge.toml test -> npm run test -> vitest run). The file holds
 * nothing else, so judging it never re-enters the helper's own suite.
 */
import { describe, expect, it } from "vitest";

describe("census helper smoke anchor", () => {
  it("FIND-1 smoke anchor: the helper judges this case on the real default gate", () => {
    expect(["exists", "runs-where", "asserts"]).toHaveLength(3);
  });
});
