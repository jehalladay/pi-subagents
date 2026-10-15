// docs/workbench/17-packaging-and-operations.md "Release checklist" item 1:
//   "Sources and upstream license preserved; fork origin recorded."
// docs/workbench/16-repository-refactor.md "Upstream maintainability":
//   "Preserve MIT copyright, license and original contributors."
//
// wb-cax.22 is the delta over wb-cax.21 (test/workbench-license-origin.test.ts) as landed. That census owns the
// copyright line, the MIT permission sentence, package.json "license" and the exact fork-origin sentence. This file
// owns only what it cannot see: LICENSE byte identity against the baseline (first differing offset named), the
// docs/17 upstream slug agreeing with package.json repository.url, the packed-artifact allowlist row for LICENSE,
// and an explicit "unknown:" failure whenever the baseline cannot be read.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { TOP_LEVEL_ALLOWLIST } from "../qa/workbench/package-boundary.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// 38034a0 is the upstream baseline COMMIT; its LICENSE blob is 2921fa5. The commit is read, the blob is pinned below.
const BASELINE = "38034a043e63a65ec5a81544c7a81d0e6b76ebe3";
const BASELINE_LICENSE_BLOB = "2921fa580ae13397f8300fe5595de93979a85b2d";
const FORK_SLUG = "jehalladay/pi-subagents";

/** Reads the baseline LICENSE; any git failure is an explicit "unknown:" failure naming the cause and git's stderr. */
function readBaselineLicense(root: string, sha: string, env?: NodeJS.ProcessEnv): Buffer {
  try {
    return execFileSync("git", ["show", `${sha}:LICENSE`], { cwd: root, maxBuffer: 1 << 20, env, stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    const stderr = typeof error === "object" && error !== null && "stderr" in error ? String(error.stderr).trim() : "";
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`unknown: cannot read baseline LICENSE of commit ${sha} via git: ${reason}${stderr.length > 0 && !reason.includes(stderr) ? ` (${stderr})` : ""}`);
  }
}

function checkLicenseBytes(current: Buffer, baseline: Buffer): string[] {
  const length = Math.min(current.length, baseline.length);
  let offset = 0;
  while (offset < length && current[offset] === baseline[offset]) offset += 1;
  if (offset < length || current.length !== baseline.length) {
    return [`LICENSE differs from baseline commit ${BASELINE} at first differing offset ${offset}`];
  }
  return [];
}

function upstreamSlug(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const match = /github\.com\/([^/]+\/[^/]+?)(?:\.git)?$/.exec(url);
  return match?.[1];
}

function repositoryUrl(pkg: unknown): unknown {
  if (typeof pkg !== "object" || pkg === null || !("repository" in pkg)) return undefined;
  const repository = pkg.repository;
  if (typeof repository !== "object" || repository === null || !("url" in repository)) return undefined;
  return repository.url;
}

function developmentWorkspaceSection(doc: string): string | undefined {
  const match = /^## Development workspace\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(doc);
  return match?.[1];
}

function checkSlugAgreement(doc: string, url: unknown): string[] {
  const section = developmentWorkspaceSection(doc);
  if (section === undefined) return ['docs/workbench/17 has no "Development workspace" section'];
  const slug = upstreamSlug(url);
  if (slug === undefined) return [`package.json repository.url is not a github owner/repo URL: ${JSON.stringify(url)}`];
  const sentences = section.split(/(?<=\.)\s+/);
  const hit = sentences.find((sentence) => sentence.includes(FORK_SLUG) && sentence.includes("based on"));
  if (hit === undefined) return [`docs/17 "Development workspace" has no sentence naming the fork ${FORK_SLUG}`];
  return hit.includes(slug) ? [] : [`docs/17 fork-origin sentence does not name upstream slug ${slug} (package.json repository.url)`];
}

function checkAllowlist(allowlist: readonly string[]): string[] {
  return allowlist.includes("LICENSE") ? [] : ["packed-artifact TOP_LEVEL_ALLOWLIST no longer lists LICENSE"];
}

const readRoot = (path: string): string => readFileSync(join(ROOT, path), "utf8");

describe("release provenance (docs/17 release checklist item 1, delta over wb-cax.21)", () => {
  it("LICENSE is byte-identical to the baseline commit's LICENSE", () => {
    const current = readFileSync(join(ROOT, "LICENSE"));
    expect(checkLicenseBytes(current, readBaselineLicense(ROOT, BASELINE))).toEqual([]);
  });

  it("the baseline commit's LICENSE is the pinned blob", () => {
    const blob = execFileSync("git", ["rev-parse", `${BASELINE}:LICENSE`], { cwd: ROOT, encoding: "utf8" }).trim();
    expect(blob).toBe(BASELINE_LICENSE_BLOB);
  });

  it("docs/17 Development workspace names the upstream slug that package.json repository.url names", () => {
    const pkg: unknown = JSON.parse(readRoot("package.json"));
    expect(checkSlugAgreement(readRoot("docs/workbench/17-packaging-and-operations.md"), repositoryUrl(pkg))).toEqual([]);
  });

  it("the packed-artifact allowlist keeps LICENSE", () => {
    expect(checkAllowlist(TOP_LEVEL_ALLOWLIST)).toEqual([]);
  });
});

describe("release provenance falsifiers (mutation proofs)", () => {
  const license = readFileSync(join(ROOT, "LICENSE"));
  const doc17 = readRoot("docs/workbench/17-packaging-and-operations.md");
  const url = repositoryUrl(JSON.parse(readRoot("package.json")));

  it("a flipped LICENSE byte fails naming the first differing offset", () => {
    const mutated = Buffer.from(license);
    mutated[5] = (mutated[5] ?? 0) ^ 0x01;
    expect(checkLicenseBytes(mutated, license).join("\n")).toContain("first differing offset 5");
  });

  it("an edited disclaimer or conditions clause fails at its offset", () => {
    const text = license.toString("utf8");
    for (const needle of ["THE SOFTWARE IS PROVIDED", "The above copyright notice"]) {
      const offset = text.indexOf(needle);
      expect(offset).toBeGreaterThan(0);
      const mutated = Buffer.from(text.replace(needle, needle.toLowerCase()));
      expect(checkLicenseBytes(mutated, license).join("\n")).toContain(`first differing offset ${offset}`);
    }
  });

  it("a changed trailing newline fails", () => {
    const trimmed = Buffer.from(license.toString("utf8").replace(/\n+$/, ""));
    expect(checkLicenseBytes(trimmed, license)).not.toEqual([]);
  });

  it("changing the docs/17 upstream slug fails naming the slug that disagrees", () => {
    const mutated = doc17.replace("based on tintinweb/pi-subagents", "based on someone/pi-subagents");
    expect(checkSlugAgreement(mutated, url).join("\n")).toContain("tintinweb/pi-subagents");
  });

  it("a package.json repository that disagrees with docs/17 fails", () => {
    expect(checkSlugAgreement(doc17, "https://github.com/other/pi-subagents.git").join("\n")).toContain("other/pi-subagents");
  });

  it("a missing Development workspace section is the agreement checker's own explicit failure", () => {
    expect(checkSlugAgreement("# doc\n", url).join("\n")).toContain("Development workspace");
  });

  it("removing LICENSE from the allowlist fails", () => {
    expect(checkAllowlist(TOP_LEVEL_ALLOWLIST.filter((entry) => entry !== "LICENSE"))).not.toEqual([]);
  });
});

describe("release provenance unknown-on-unreadable (never a pass, never a skip)", () => {
  it("a bad object id fails naming the cause and git's own stderr", () => {
    expect(() => readBaselineLicense(ROOT, "0000000000000000000000000000000000000000")).toThrow(/^unknown: cannot read baseline LICENSE of commit/);
    expect(() => readBaselineLicense(ROOT, "0000000000000000000000000000000000000000")).toThrow(/fatal:/);
  });

  it("an unreadable working directory fails with unknown:", () => {
    expect(() => readBaselineLicense("/nonexistent-dir-for-provenance-test", BASELINE)).toThrow(/^unknown:/);
  });

  it("git absent from PATH fails with unknown: naming ENOENT", () => {
    expect(() => readBaselineLicense(ROOT, BASELINE, { PATH: "" })).toThrow(/^unknown:.*ENOENT/);
  });
});
