/**
 * wb-cax.2 (W22-D): the minimal-permissions install harness helpers and wiring.
 *
 * Offline guard: no network, no npm. Pins docs/workbench/17 "Release checklist" item 10
 * ("Clean external install and minimal-permissions run succeeds.") at the helper level:
 * the scrubbed environment is a fixed allowlist never copied from process.env
 * (docs/workbench/12 "Security acceptance tests": "secret env not displayed"), the tree
 * census is deterministic and byte-sensitive, the harness sources touch process.env only
 * through allowlisted names, and forge.toml carries the command outside the default gate.
 */
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { isPrivilegedUid, resolveNodeBinary, scrubbedEnvironment, treeCensus } from "../qa/workbench/install-minimal-lib.mjs";

const repoRoot = join(import.meta.dirname, "..");
const readRepo = (path: string): string => readFileSync(join(repoRoot, path), "utf8");
const scratch: string[] = [];

function tempTree(): string {
  const dir = mkdtempSync(join(tmpdir(), "install-minimal-test-"));
  scratch.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("scrubbedEnvironment", () => {
  it("returns exactly the four allowlisted keys with fixed names", () => {
    const env = scrubbedEnvironment({ execPath: "/opt/node/bin/node", home: "/h", tmp: "/t" });
    expect(Object.keys(env).sort()).toEqual(["HOME", "LANG", "PATH", "TMPDIR"]);
    expect(env).toEqual({ PATH: "/opt/node/bin", HOME: "/h", TMPDIR: "/t", LANG: "C.UTF-8" });
  });

  it("contributes nothing from a seeded process environment", () => {
    const seeded = { ANTHROPIC_API_KEY: "sk-sentinel", AWS_SECRET_ACCESS_KEY: "aws-sentinel", CLAUDE_CODE_OAUTH_TOKEN: "oauth-sentinel" };
    const saved: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(seeded)) {
      saved[key] = process.env[key];
      process.env[key] = value;
    }
    try {
      const env = scrubbedEnvironment({ execPath: "/opt/node/bin/node", home: "/h", tmp: "/t" });
      const text = JSON.stringify(env);
      for (const value of Object.values(seeded)) expect(text).not.toContain(value);
      expect(Object.keys(env).some(key => /^(ANTHROPIC|AWS|CLAUDE|OPENAI|GITHUB|NPM_|NODE_OPTIONS|NODE_PATH)/.test(key))).toBe(false);
    } finally {
      for (const [key, value] of Object.entries(saved)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  });
});

describe("treeCensus", () => {
  it("is deterministic across calls and independent of creation order", () => {
    const a = tempTree();
    mkdirSync(join(a, "d"));
    writeFileSync(join(a, "d", "x.txt"), "one");
    writeFileSync(join(a, "y.txt"), "two");
    const b = tempTree();
    writeFileSync(join(b, "y.txt"), "two");
    mkdirSync(join(b, "d"));
    writeFileSync(join(b, "d", "x.txt"), "one");
    expect(treeCensus(a)).toBe(treeCensus(b));
    expect(treeCensus(a)).toBe(treeCensus(a));
    expect(treeCensus(a)).toMatch(/^[0-9a-f]{64}$/);
  });

  it("changes on a single-byte content change and on an added file", () => {
    const root = tempTree();
    writeFileSync(join(root, "f.txt"), "abc");
    const base = treeCensus(root);
    writeFileSync(join(root, "f.txt"), "abd");
    const edited = treeCensus(root);
    expect(edited).not.toBe(base);
    writeFileSync(join(root, "f.txt"), "abc");
    expect(treeCensus(root)).toBe(base);
    writeFileSync(join(root, "g.txt"), "");
    expect(treeCensus(root)).not.toBe(base);
  });

  it("records a symlink by its target without following it", () => {
    const root = tempTree();
    const outside = tempTree();
    writeFileSync(join(outside, "secret.txt"), "v1");
    symlinkSync(join(outside, "secret.txt"), join(root, "link"));
    const before = treeCensus(root);
    writeFileSync(join(outside, "secret.txt"), "v2");
    expect(treeCensus(root)).toBe(before);
    rmSync(join(root, "link"));
    symlinkSync(join(outside, "other.txt"), join(root, "link"));
    expect(treeCensus(root)).not.toBe(before);
  });

  it("fails explicitly on a missing root instead of returning an empty census", () => {
    const root = tempTree();
    expect(() => treeCensus(join(root, "absent"))).toThrow();
  });

  it("is insensitive to permission bits so the read-only chmod cannot fake a diff", () => {
    const root = tempTree();
    writeFileSync(join(root, "f.txt"), "abc");
    const before = treeCensus(root);
    chmodSync(join(root, "f.txt"), 0o444);
    expect(treeCensus(root)).toBe(before);
  });
});

describe("resolveNodeBinary", () => {
  it("returns the execPath unchanged when it is not a shell shim", () => {
    const dir = tempTree();
    writeFileSync(join(dir, "node"), Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0, 0]));
    writeFileSync(join(dir, "node_real"), "x");
    expect(resolveNodeBinary(join(dir, "node"))).toBe(join(dir, "node"));
  });

  it("returns the sibling node_real when execPath is a shebang shim that injects environment keys", () => {
    const dir = tempTree();
    writeFileSync(join(dir, "node"), "#!/bin/bash\nexec node_real\n");
    writeFileSync(join(dir, "node_real"), "x");
    expect(resolveNodeBinary(join(dir, "node"))).toBe(join(dir, "node_real"));
  });

  it("keeps the shim path when no node_real sibling exists", () => {
    const dir = tempTree();
    writeFileSync(join(dir, "node"), "#!/bin/sh\n");
    expect(resolveNodeBinary(join(dir, "node"))).toBe(join(dir, "node"));
  });
});

describe("isPrivilegedUid", () => {
  it("treats uid 0 as privileged and others as not", () => {
    expect(isPrivilegedUid(0)).toBe(true);
    expect(isPrivilegedUid(1000)).toBe(false);
    expect(isPrivilegedUid(undefined)).toBe(false);
  });
});

describe("harness sources and wiring", () => {
  const allowedEnvNames = new Set(["WB_REVISION", "WB_INSTALL_MINIMAL_RECEIPT"]);
  for (const path of ["qa/workbench/install-minimal.mjs", "qa/workbench/installed-minimal.mjs", "qa/workbench/install-minimal-lib.mjs"]) {
    it(`${path} references process.env only through allowlisted names`, () => {
      const source = readRepo(path);
      const dotted = [...source.matchAll(/process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g)].map(match => match[1] ?? "");
      const bracketed = [...source.matchAll(/process\.env\[\s*["']([A-Za-z_][A-Za-z0-9_]*)["']\s*\]/g)].map(match => match[1] ?? "");
      for (const name of [...dotted, ...bracketed]) expect(allowedEnvNames.has(name), `${path} reads process.env.${name}`).toBe(true);
      // No whole-object copies (spread, Object.assign, bare passing) of the ambient environment.
      expect(source).not.toMatch(/\.\.\.\s*process\.env/);
      expect(source).not.toMatch(/Object\.assign\([^)]*process\.env/);
      expect(source).not.toMatch(/env:\s*process\.env\b/);
    });
  }

  it("the runner spawns the probe with the scrubbed environment only", () => {
    const source = readRepo("qa/workbench/install-minimal.mjs");
    expect(source).toContain("scrubbedEnvironment(");
    expect(source).toContain("workbench.install-minimal/v1");
  });

  it("the probe asserts typed authorization and unavailable refusals, never a null success", () => {
    const source = readRepo("qa/workbench/installed-minimal.mjs");
    expect(source).toContain("'authorization'");
    expect(source).toContain("'unavailable'");
    expect(source).toContain("workbench.install-minimal/v1");
  });

  it("forge.toml has the install-minimal command with timeout 300 outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.install-minimal\]\ncommand = "node qa\/workbench\/install-minimal\.mjs"\ntimeout = 300\n/);
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]');
  });
});
