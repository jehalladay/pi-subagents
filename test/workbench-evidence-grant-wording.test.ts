import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative: string): string => readFileSync(resolve(repo, relative), "utf8");

/**
 * wb-1vd: after the wb-g1g.1 live-authorization respin, authorization is the live exact-grant check each
 * load runs; a loader is built for every supplied reader, so a grant that appears after construction
 * authorizes the next load and a missing grant is indistinguishable from a revoked one.
 */
describe("evidence-loader grant wording (wb-1vd)", () => {
  const doc = read("docs/workbench/20-evidence-loader-contract.md");
  const source = read("src/workbench/evidence-loader.ts");

  it("docs/20 no longer says loaders are constructed only when the grant is held", () => {
    expect(doc).not.toMatch(/loaders are constructed only when/i);
  });

  it("docs/20 states the live exact-grant check as the only authorization decision", () => {
    const line = doc.split("\n").find((l) => l.startsWith("`EvidenceLoader`:"));
    expect(line).toBeDefined();
    expect(line).toMatch(/every `load`/);
    expect(line).toMatch(/live/i);
    expect(line).toMatch(/only authorization decision/i);
    expect(line).toMatch(/missing and revoked/i);
    expect(line).toMatch(/indistinguishable/i);
    expect(line).toMatch(/after construction/i);
  });

  it("the EvidenceLoader.requiredGrant comment no longer claims the grant gates loader existence", () => {
    const comment = source.split("\n").find((l) => l.includes("Exact-string grant"));
    expect(comment).toBeDefined();
    expect(comment).not.toMatch(/to exist/);
    expect(comment).toMatch(/every load/);
  });
});
