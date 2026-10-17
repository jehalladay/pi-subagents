import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const SECTION_HEAD = "## Tool feedback delivery receipts";
const BRANCH = "feedback/pi-workbench-20261015-delivery";
const SIDE_BRANCH_ENTRY = "c52116840a";
const LANDED_SHA = "237d782bd3a2b20b6451f1d885f9a1393ae806eb";

function receiptsSection(): string {
  const doc = readFileSync(new URL("../docs/workbench/TRACEABILITY.md", import.meta.url), "utf8");
  const start = doc.indexOf(SECTION_HEAD);
  expect(start).toBeGreaterThanOrEqual(0);
  const rest = doc.slice(start + SECTION_HEAD.length);
  const end = rest.indexOf("\n## ");
  return end === -1 ? rest : rest.slice(0, end);
}

describe("TRACEABILITY feedback receipts: HyperUnix intake visibility (wb-kqx.4, HXFS-PI-R2)", () => {
  it("states that the side-branch entry is not on origin/main, with the measured command result", () => {
    const section = receiptsSection();
    const lines = section.split("\n").filter((line) => line.includes(SIDE_BRANCH_ENTRY));
    expect(lines.length).toBeGreaterThanOrEqual(1);
    const qualified = lines.some(
      (line) =>
        line.includes(BRANCH) &&
        (line.includes("not on `origin/main`") || line.includes("not on origin/main")) &&
        line.includes("rc=1"),
    );
    expect(qualified).toBe(true);
  });

  it("records the intake-visible main landing with landed=0", () => {
    const section = receiptsSection();
    const landedLines = section.split("\n").filter((line) => line.includes(LANDED_SHA));
    expect(landedLines.length).toBeGreaterThanOrEqual(1);
    expect(landedLines.some((line) => line.includes("landed=0"))).toBe(true);
  });

  it("never presents the side-branch entry itself as an origin/main landing (HyperUnix rows only)", () => {
    const section = receiptsSection();
    const hyperUnixBulletLines = section
      .split("\n")
      .filter((line) => line.startsWith("- HyperUnix") && line.includes(SIDE_BRANCH_ENTRY));
    for (const line of hyperUnixBulletLines) {
      const claimsMainLanding = line.includes(`${SIDE_BRANCH_ENTRY}\` landed`) || line.includes(`is-ancestor ${SIDE_BRANCH_ENTRY} origin/main\` printed \`landed=0\``);
      expect(claimsMainLanding).toBe(false);
    }
  });
});
