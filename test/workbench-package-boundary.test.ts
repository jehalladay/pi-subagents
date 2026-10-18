import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildPackageReceipt,
  bundledLockEntries,
  classifyPackedPaths,
  DENIED_BASENAMES,
  DENIED_PATTERNS,
  DENIED_PREFIXES,
  missingRequiredPackedPaths,
  REQUIRED_PACKED_PATHS,
  REQUIRED_PACKED_PREFIXES,
  TOP_LEVEL_ALLOWLIST,
  UNKNOWN_REVISION,
} from "../qa/workbench/package-boundary.mjs";

interface Violation {
  path: string;
  rule: string;
}

interface Classification {
  violations: Violation[];
  topLevel: string[];
}

const classify = classifyPackedPaths as (paths: string[], options: { bundledLockEntries: string[] }) => Classification;

const bundled = ["@forge/sdk", "@furnace/sdk", "@hyperunix/sdk"];

const mustFail: Array<[string, string]> = [
  [".codex/hooks.json", "denied-prefix"],
  [".agents/skills/beads/SKILL.md", "denied-prefix"],
  [".github/workflows/ci.yml", "denied-prefix"],
  ["machines/flywheel/ledger/metrics.jsonl", "denied-prefix"],
  ["node_modules/croner/index.js", "unbundled-node-modules"],
  ["test/x.test.ts", "denied-prefix"],
  ["AGENTS.md", "denied-basename"],
  ["vitest.native.config.ts", "denied-pattern"],
  [".beads/issues.jsonl", "denied-prefix"],
];

const mustPass = [
  "dist/index.js",
  "src/index.ts",
  "vendor/forge-sdk-0.1.0.tgz",
  "node_modules/@forge/sdk/package.json",
  "LICENSE",
  "qa/workbench/smoke.sh",
  "docs/workbench/README.md",
];

describe("packed artifact boundary classifier", () => {
  for (const [path, rule] of mustFail) {
    it(`reports ${path} as ${rule}`, () => {
      const result = classify([path], { bundledLockEntries: bundled });
      expect(result.violations).toEqual([{ path, rule }]);
    });
  }

  for (const path of mustPass) {
    it(`accepts ${path}`, () => {
      const result = classify([path], { bundledLockEntries: bundled });
      expect(result.violations).toEqual([]);
    });
  }

  it("reports every offender in one listing, not just the first", () => {
    const result = classify([...mustPass, ...mustFail.map(([path]) => path)], { bundledLockEntries: bundled });
    expect(result.violations.map((v) => v.path).sort()).toEqual(mustFail.map(([path]) => path).sort());
  });

  it("flags a top-level segment outside the allowlist", () => {
    const result = classify(["scratch/notes.txt", "stray.txt"], { bundledLockEntries: bundled });
    expect(result.violations).toEqual([
      { path: "scratch/notes.txt", rule: "top-level-not-allowlisted" },
      { path: "stray.txt", rule: "top-level-not-allowlisted" },
    ]);
  });

  it("does not trust a bundled name that is only a prefix of the packed package", () => {
    const result = classify(["node_modules/@forge/sdk-evil/index.js", "node_modules/@forge/sdk/node_modules/x/index.js"], {
      bundledLockEntries: bundled,
    });
    expect(result.violations.map((v) => v.path)).toEqual([
      "node_modules/@forge/sdk-evil/index.js",
      "node_modules/@forge/sdk/node_modules/x/index.js",
    ]);
  });

  it("accepts nested packages only when the lock lists the nested path as bundled", () => {
    const result = classify(["node_modules/@forge/sdk/node_modules/x/index.js"], {
      bundledLockEntries: [...bundled, "@forge/sdk/node_modules/x"],
    });
    expect(result.violations).toEqual([]);
  });

  it("returns sorted unique top-level segments", () => {
    const result = classify(["src/b.ts", "LICENSE", "dist/a.js", "src/a.ts", "node_modules/@forge/sdk/package.json"], {
      bundledLockEntries: bundled,
    });
    expect(result.topLevel).toEqual(["LICENSE", "dist", "node_modules", "src"]);
  });

  it("pins the declared contract lists", () => {
    expect([...TOP_LEVEL_ALLOWLIST].sort()).toEqual(
      ["CHANGELOG.md", "CONTRIBUTING.md", "LICENSE", "README.md", "SECURITY.md", "dist", "docs", "examples", "forge.toml", "node_modules", "package.json", "qa", "src", "vendor"].sort(),
    );
    for (const prefix of [".agents/", ".codex/", ".pi/", ".claude/", ".beads/", ".forge/", ".furnace/", ".hyperunix/", ".reactive-fiber/", ".github/", "machines/", "test/", "tests/"]) {
      expect(DENIED_PREFIXES).toContain(prefix);
    }
    expect([...DENIED_BASENAMES].sort()).toEqual(["AGENTS.md", "CLAUDE.md", "biome.json", "tsconfig.json", "tsconfig.test.json"]);
    expect(DENIED_PATTERNS.length).toBe(3);
  });
});

describe("bundledLockEntries", () => {
  it("derives names from inBundle lock entries, not a hardcoded list", () => {
    const lock = {
      packages: {
        "": { name: "root" },
        "node_modules/@forge/sdk": { inBundle: true },
        "node_modules/croner": { version: "1.0.0" },
        "node_modules/left-pad": { inBundle: true },
        "node_modules/@forge/sdk/node_modules/x": { inBundle: true },
        "node_modules/off": { inBundle: false },
      },
    };
    expect(bundledLockEntries(lock)).toEqual(["@forge/sdk", "@forge/sdk/node_modules/x", "left-pad"]);
  });

  it("matches exactly the three vendored SDKs in the real package-lock", () => {
    const lock = JSON.parse(readFileSync(join(__dirname, "..", "package-lock.json"), "utf8"));
    expect(bundledLockEntries(lock)).toEqual(["@forge/sdk", "@furnace/sdk", "@hyperunix/sdk"]);
  });
});

describe("buildPackageReceipt", () => {
  const measured = {
    fileCount: 3,
    shasum: "abc",
    integrity: "sha512-xyz",
    node: "v22.18.0",
    npm: "10.9.0",
    platform: "linux",
    arch: "x64",
    utc: "2026-10-15T07:00:00.000Z",
    command: "npm pack --ignore-scripts --json --pack-destination <scratch>",
    topLevel: ["src", "LICENSE"],
    bundled: ["@hyperunix/sdk", "@forge/sdk"],
  };

  it("records a known revision and a clean tree", () => {
    const receipt = buildPackageReceipt({ ...measured, git: { head: "ad3cf6e908f0", porcelain: "" } });
    expect(receipt).toEqual({
      contract: "workbench.package-smoke/v2",
      fileCount: 3,
      sha: "abc",
      shasum: "abc",
      integrity: "sha512-xyz",
      privateStateIncluded: false,
      revision: "ad3cf6e908f0",
      dirty: false,
      node: "v22.18.0",
      npm: "10.9.0",
      platform: "linux",
      arch: "x64",
      utc: "2026-10-15T07:00:00.000Z",
      command: measured.command,
      topLevel: ["LICENSE", "src"],
      bundled: ["@forge/sdk", "@hyperunix/sdk"],
      denied: [],
    });
  });

  it("marks a dirty tree from porcelain output", () => {
    const receipt = buildPackageReceipt({ ...measured, git: { head: "ad3cf6e908f0", porcelain: " M src/index.ts\n" } });
    expect(receipt.dirty).toBe(true);
  });

  it("never invents a revision when the tree is not a git checkout", () => {
    const receipt = buildPackageReceipt({ ...measured, git: { head: null, porcelain: null } });
    expect(receipt.revision).toBe("unknown:not-a-git-checkout");
    expect(receipt.revision).toBe(UNKNOWN_REVISION);
    expect(receipt.dirty).toBeNull();
  });

  it("does not mutate its input arrays", () => {
    const input = { ...measured, git: { head: null, porcelain: null } };
    buildPackageReceipt(input);
    expect(input.topLevel).toEqual(["src", "LICENSE"]);
  });
});

describe(".npmignore boundary lines", () => {
  const lines = readFileSync(join(__dirname, "..", ".npmignore"), "utf8")
    .split("\n")
    .map((line) => line.trim());

  for (const required of [".agents/", ".codex/", ".pi", ".claude", "AGENTS.md", "CLAUDE.md", ".beads/", ".forge/", ".furnace/", ".hyperunix/", ".reactive-fiber/", "vitest.*.config.ts"]) {
    it(`excludes ${required}`, () => {
      expect(lines).toContain(required);
    });
  }

  it("keeps docs/ and qa/ shipping deliberately", () => {
    expect(lines).not.toContain("docs/");
    expect(lines).not.toContain("qa/");
  });
});

describe("positive presence pins over the packed file list (wb-x75)", () => {
  const missing = missingRequiredPackedPaths as (paths: string[]) => Array<{ path: string; rule: string }>;
  const complete = [...REQUIRED_PACKED_PATHS, ...REQUIRED_PACKED_PREFIXES.map((prefix: string) => `${prefix}x.txt`)];

  it("pins docs/, qa/, dist/, the vendor tarballs and the three bundled SDKs", () => {
    for (const prefix of ["docs/", "qa/", "dist/"]) expect(REQUIRED_PACKED_PREFIXES).toContain(prefix);
    for (const path of [
      "vendor/forge-sdk-0.1.0.tgz",
      "vendor/furnace-sdk-0.1.0.tgz",
      "vendor/hyperunix-sdk-0.1.0.tgz",
      "vendor/dependency-lock.json",
      "node_modules/@forge/sdk/package.json",
      "node_modules/@furnace/sdk/package.json",
      "node_modules/@hyperunix/sdk/package.json",
    ]) {
      expect(REQUIRED_PACKED_PATHS).toContain(path);
    }
  });

  it("reports nothing missing for a complete listing", () => {
    expect(missing(complete)).toEqual([]);
  });

  it("reports an exact required file that is absent", () => {
    const paths = complete.filter((path) => path !== "vendor/forge-sdk-0.1.0.tgz");
    expect(missing(paths)).toEqual([{ path: "vendor/forge-sdk-0.1.0.tgz", rule: "missing-required-path" }]);
  });

  it("reports a required directory with no packed file under it", () => {
    const paths = complete.filter((path) => !path.startsWith("docs/"));
    expect(missing(paths)).toEqual([{ path: "docs/", rule: "missing-required-prefix" }]);
  });

  it("reports every absent pin in one listing, not just the first", () => {
    expect(missing([]).length).toBe(REQUIRED_PACKED_PATHS.length + REQUIRED_PACKED_PREFIXES.length);
  });

  it("does not count a lookalike prefix as presence", () => {
    const paths = [...complete.filter((path) => !path.startsWith("qa/")), "qa-notes/x.txt"];
    expect(missing(paths)).toEqual([{ path: "qa/", rule: "missing-required-prefix" }]);
  });
});

describe("buildPackageReceipt git failure reporting (wb-x75)", () => {
  const measured = {
    fileCount: 1,
    shasum: "abc",
    integrity: "sha512-xyz",
    node: "v22.18.0",
    npm: "10.9.0",
    platform: "linux",
    arch: "x64",
    utc: "2026-10-15T07:00:00.000Z",
    command: "npm pack",
    topLevel: ["src"],
    bundled: [],
  };

  it("reports dirty as null, not false, when HEAD is known but git status failed", () => {
    const receipt = buildPackageReceipt({ ...measured, git: { head: "ad3cf6e908f0", porcelain: null } });
    expect(receipt.revision).toBe("ad3cf6e908f0");
    expect(receipt.dirty).toBeNull();
  });

  it("still reports a measured clean tree as false", () => {
    const receipt = buildPackageReceipt({ ...measured, git: { head: "ad3cf6e908f0", porcelain: "" } });
    expect(receipt.dirty).toBe(false);
  });
});
