// docs/workbench/17-packaging-and-operations.md "Release checklist" item 1:
//   "Sources and upstream license preserved; fork origin recorded."
// docs/workbench/16-repository-refactor.md "Upstream maintainability":
//   "Preserve MIT copyright, license and original contributors."
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { TOP_LEVEL_ALLOWLIST } from "../qa/workbench/package-boundary.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = "38034a043e63a65ec5a81544c7a81d0e6b76ebe3";
const COPYRIGHT_LINE = "Copyright (c) 2026 tintinweb";
const UPSTREAM_URL = "https://github.com/tintinweb/pi-subagents.git";
const FORK_SLUG = "jehalladay/pi-subagents";

interface PackageFields {
  license?: unknown;
  author?: unknown;
  repository?: { url?: unknown } | undefined;
}

/** Reads the baseline LICENSE blob; any git failure is an explicit failure naming the cause. */
function readBaselineLicense(root: string, sha: string): Buffer {
  try {
    return execFileSync("git", ["show", `${sha}:LICENSE`], { cwd: root, maxBuffer: 1 << 20 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`unknown: cannot read baseline LICENSE blob ${sha} via git: ${reason}`);
  }
}

function checkLicense(current: Buffer, baseline: Buffer): string[] {
  const problems: string[] = [];
  const length = Math.min(current.length, baseline.length);
  let offset = 0;
  while (offset < length && current[offset] === baseline[offset]) offset += 1;
  if (offset < length || current.length !== baseline.length) {
    problems.push(`LICENSE differs from baseline ${BASELINE} at first differing offset ${offset}`);
  }
  if (!current.toString("utf8").split(/\r?\n/).includes(COPYRIGHT_LINE)) {
    problems.push(`LICENSE lacks the line "${COPYRIGHT_LINE}"`);
  }
  return problems;
}

function checkPackageFields(pkg: PackageFields): string[] {
  const problems: string[] = [];
  if (pkg.license !== "MIT") problems.push(`package.json license must be "MIT", got ${JSON.stringify(pkg.license)}`);
  if (pkg.author !== "tintinweb") problems.push(`package.json author must be "tintinweb", got ${JSON.stringify(pkg.author)}`);
  if (pkg.repository?.url !== UPSTREAM_URL) {
    problems.push(`package.json repository.url must be "${UPSTREAM_URL}", got ${JSON.stringify(pkg.repository?.url)}`);
  }
  return problems;
}

function upstreamSlug(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const match = /github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/.exec(url);
  return match?.[1];
}

function developmentWorkspaceSection(doc: string): string | undefined {
  const match = /^## Development workspace\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(doc);
  return match?.[1];
}

function checkForkOrigin(doc: string, repositoryUrl: unknown): string[] {
  const section = developmentWorkspaceSection(doc);
  if (section === undefined) return ["docs/workbench/17 has no \"Development workspace\" section"];
  const slug = upstreamSlug(repositoryUrl);
  if (slug === undefined) return [`package.json repository.url is not a github owner/repo URL: ${JSON.stringify(repositoryUrl)}`];
  const sentences = section.split(/(?<=\.)\s+/);
  const hit = sentences.find((sentence) => sentence.includes(FORK_SLUG) && sentence.includes("based on"));
  if (hit === undefined) return [`docs/17 "Development workspace" has no sentence naming the fork ${FORK_SLUG}`];
  const problems: string[] = [];
  if (!hit.includes(slug)) problems.push(`docs/17 fork-origin sentence does not name upstream slug ${slug} (package.json repository.url)`);
  if (!hit.includes("tintinweb/pi-subagents")) problems.push("docs/17 fork-origin sentence does not name tintinweb/pi-subagents");
  return problems;
}

function checkAllowlist(allowlist: readonly string[]): string[] {
  return allowlist.includes("LICENSE") ? [] : ["packed-artifact TOP_LEVEL_ALLOWLIST no longer lists LICENSE"];
}

const license = readFileSync(join(ROOT, "LICENSE"));
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as PackageFields;
const doc17 = readFileSync(join(ROOT, "docs/workbench/17-packaging-and-operations.md"), "utf8");

describe("release provenance (docs/17 release checklist item 1)", () => {
  it("LICENSE is byte-identical to the baseline blob and keeps the tintinweb copyright line", () => {
    expect(checkLicense(license, readBaselineLicense(ROOT, BASELINE))).toEqual([]);
  });

  it("package.json names the upstream license, author and repository", () => {
    expect(checkPackageFields(pkg)).toEqual([]);
  });

  it("docs/17 Development workspace records the fork origin and agrees with package.json", () => {
    expect(checkForkOrigin(doc17, pkg.repository?.url)).toEqual([]);
  });

  it("the packed-artifact allowlist keeps LICENSE", () => {
    expect(checkAllowlist(TOP_LEVEL_ALLOWLIST)).toEqual([]);
  });
});

describe("release provenance falsifiers (mutation proofs)", () => {
  const baseline = readBaselineLicense(ROOT, BASELINE);

  it("a flipped LICENSE byte fails naming the first differing offset", () => {
    const mutated = Buffer.from(license);
    mutated[5] = (mutated[5] ?? 0) ^ 0x01;
    expect(checkLicense(mutated, baseline).join("\n")).toContain("first differing offset 5");
  });

  it("a LICENSE without the copyright line fails", () => {
    const mutated = Buffer.from(license.toString("utf8").replace(COPYRIGHT_LINE, "Copyright (c) 2026 someone"));
    expect(checkLicense(mutated, baseline).join("\n")).toContain(COPYRIGHT_LINE);
  });

  it("dropping package.json author, license or repository fails naming the field", () => {
    expect(checkPackageFields({ ...pkg, author: undefined }).join("\n")).toContain("author");
    expect(checkPackageFields({ ...pkg, license: undefined }).join("\n")).toContain("license");
    expect(checkPackageFields({ ...pkg, repository: undefined }).join("\n")).toContain("repository.url");
  });

  it("changing the docs/17 upstream slug fails naming the slug that disagrees", () => {
    const mutated = doc17.replace("based on tintinweb/pi-subagents", "based on someone/pi-subagents");
    expect(checkForkOrigin(mutated, pkg.repository?.url).join("\n")).toContain("tintinweb/pi-subagents");
  });

  it("a package.json repository that disagrees with docs/17 fails", () => {
    const problems = checkForkOrigin(doc17, "https://github.com/other/pi-subagents.git");
    expect(problems.join("\n")).toContain("other/pi-subagents");
  });

  it("a missing Development workspace section fails explicitly", () => {
    expect(checkForkOrigin("# doc\n", pkg.repository?.url).join("\n")).toContain("Development workspace");
  });

  it("removing LICENSE from the allowlist fails", () => {
    expect(checkAllowlist(TOP_LEVEL_ALLOWLIST.filter((entry) => entry !== "LICENSE"))).not.toEqual([]);
  });

  it("an unavailable baseline object is an explicit failure naming the cause, never a pass", () => {
    expect(() => readBaselineLicense(ROOT, "0000000000000000000000000000000000000000")).toThrow(/^unknown: cannot read baseline LICENSE blob/);
    expect(() => readBaselineLicense("/nonexistent-dir-for-provenance-test", BASELINE)).toThrow(/^unknown:/);
  });
});
