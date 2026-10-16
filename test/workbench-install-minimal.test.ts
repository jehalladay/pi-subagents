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
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import * as installMinimalLib from "../qa/workbench/install-minimal-lib.mjs";
import { isPrivilegedUid, probeInstalledWrite, resolveNodeBinary, scrubbedEnvironment, treeCensus } from "../qa/workbench/install-minimal-lib.mjs";

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
    // Names-only projection: compare keys, then each value against its fixed fake as a boolean, so a
    // value-sourcing regression never prints the offending (possibly ambient, secret-bearing) value.
    const fakes = { PATH: "/opt/node/bin", HOME: "/h", TMPDIR: "/t", LANG: "C.UTF-8" };
    expect(Object.keys(env).sort()).toEqual(Object.keys(fakes).sort());
    for (const [name, fake] of Object.entries(fakes)) expect(Reflect.get(env, name) === fake, `value of ${name} differs from its fixed fake`).toBe(true);
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
      // Names-only projection: count seeded values found in the serialized env; never not.toContain over the raw text.
      const text = JSON.stringify(env);
      const leakedSeededValues = Object.values(seeded).filter(value => text.includes(value)).length;
      expect(leakedSeededValues, "seeded process.env values reached the scrubbed environment").toBe(0);
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

  it("changes when an empty directory is added (directory entries are part of the census)", () => {
    const root = tempTree();
    writeFileSync(join(root, "f.txt"), "abc");
    const base = treeCensus(root);
    mkdirSync(join(root, "empty"));
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

type FsError = Error & { code?: string };
const fsError = (code: string): FsError => Object.assign(new Error(code), { code });

describe("probeInstalledWrite (uid-injected write capability probe, U1 privileged branch)", () => {
  it("as a privileged uid records readOnlyEnforced false with reason privileged-uid and leaves no residue", () => {
    const root = tempTree();
    writeFileSync(join(root, "pkg.txt"), "installed");
    const before = treeCensus(root);
    const outcome = probeInstalledWrite({ root, uid: 0, write: writeFileSync, remove: rmSync });
    expect(outcome).toEqual({ readOnlyEnforced: false, readOnlyReason: "privileged-uid" });
    expect(treeCensus(root)).toBe(before);
  });

  it("as an unprivileged uid whose write is refused with EACCES, EPERM or EROFS records readOnlyEnforced true and removes nothing", () => {
    const root = tempTree();
    for (const code of ["EACCES", "EPERM", "EROFS"]) {
      let removed = 0;
      const outcome = probeInstalledWrite({
        root,
        uid: 1000,
        write: () => {
          throw fsError(code);
        },
        remove: () => {
          removed += 1;
        },
      });
      expect(outcome).toEqual({ readOnlyEnforced: true });
      expect(removed).toBe(0);
    }
  });

  it("as an unprivileged uid whose write succeeds fails loudly and still leaves no residue", () => {
    const root = tempTree();
    const before = treeCensus(root);
    expect(() => probeInstalledWrite({ root, uid: 1000, write: writeFileSync, remove: rmSync })).toThrow(/unexpectedly succeeded/);
    expect(treeCensus(root)).toBe(before);
    expect(existsSync(join(root, ".minimal-write-probe"))).toBe(false);
  });

  it("rethrows an unrelated write error instead of reporting enforcement", () => {
    const root = tempTree();
    expect(() =>
      probeInstalledWrite({
        root,
        uid: 1000,
        write: () => {
          throw fsError("ENOENT");
        },
        remove: rmSync,
      }),
    ).toThrow("ENOENT");
  });

  it("treats an undefined uid as unprivileged", () => {
    const root = tempTree();
    expect(() => probeInstalledWrite({ root, uid: undefined, write: writeFileSync, remove: rmSync })).toThrow(/unexpectedly succeeded/);
  });
});

describe("assertReadOnlyReceipt (runner cross-check on the probe receipt: wb-nh3 F2/O1, kills MW3/MW5/MW5b/MW6 in the default gate)", () => {
  it("accepts a receipt that records enforced read-only, as an unprivileged or a privileged runner", () => {
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: true }, 1000)).not.toThrow();
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: true }, 0)).not.toThrow();
  });

  it("accepts the privileged-uid record only when the runner's own uid is privileged", () => {
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: "privileged-uid" }, 0)).not.toThrow();
  });

  it("MW3: a privileged-uid record from an unprivileged runner (probe uid pinned to 0) is refused", () => {
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: "privileged-uid" }, 1000)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: "privileged-uid" }, undefined)).toThrow(/read-only/);
  });

  it("MW5 and MW5b: an unenforced receipt whose reason was dropped or replaced is refused even for a privileged runner", () => {
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false }, 0)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: undefined }, 0)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: "other" }, 0)).toThrow(/read-only/);
  });

  it("MW6: a receipt that dropped readOnlyEnforced, or carries a non-true value, is refused for any runner uid", () => {
    expect(() => installMinimalLib.assertReadOnlyReceipt({}, 1000)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({}, 0)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: "true" }, 1000)).toThrow(/read-only/);
    expect(() => installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: 1 }, 1000)).toThrow(/read-only/);
  });

  it("its refusal names the receipt fields as booleans and types, never a raw receipt value", () => {
    let message = "";
    try {
      installMinimalLib.assertReadOnlyReceipt({ readOnlyEnforced: false, readOnlyReason: "sentinel-reason-value" }, 1000);
    } catch (error) {
      message = error instanceof Error ? error.message : "";
    }
    expect(/read-only/.test(message), "the refusal must be the read-only cross-check refusal").toBe(true);
    expect(message.includes("sentinel-reason-value"), "the refusal echoed a raw receipt value").toBe(false);
  });
});

describe("harness sources and wiring", () => {
  it("the runner copies the lib beside the probe and the probe uses probeInstalledWrite with the shared uid predicate", () => {
    const runner = readRepo("qa/workbench/install-minimal.mjs");
    expect(runner).toContain("install-minimal-lib.mjs");
    expect(runner).toMatch(/copyFileSync\([^)]*install-minimal-lib\.mjs/);
    const probe = readRepo("qa/workbench/installed-minimal.mjs");
    expect(probe).toContain("./install-minimal-lib.mjs");
    expect(probe).toContain("probeInstalledWrite(");
    expect(probe).not.toMatch(/uid\s*===\s*0/);
  });

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

  it("the probe call site pins the real write, remove, root and own-uid wiring so a stubbed probe cannot pass the default gate (F3, kills MW2/MW4)", () => {
    const probe = readRepo("qa/workbench/installed-minimal.mjs");
    expect(probe).toContain("probeInstalledWrite({root:installedRoot,uid,write:writeFileSync,remove:rmSync})");
    expect(probe).toContain("rmSync");
    expect(probe).toMatch(/import \{rmSync,writeFileSync\} from 'node:fs'/);
    expect(probe).toMatch(/const installedRoot=resolve\(dirname\(fileURLToPath\(import\.meta\.resolve\('@tintinweb\/pi-subagents\/dist\/workbench\/identity\.js'\)\)\),'\.\.\/\.\.'\)/);
  });

  it("the probe reads its own uid from process.getuid and forwards readOnlyReason into the receipt so the runner cross-check has a real subject (F2, kills MW3/MW5)", () => {
    const probe = readRepo("qa/workbench/installed-minimal.mjs");
    expect(probe).toContain("const uid=typeof process.getuid==='function'?process.getuid():undefined;");
    expect(probe).toContain("const {readOnlyEnforced,readOnlyReason}=probeInstalledWrite(");
    expect(probe).toContain("...(readOnlyReason?{readOnlyReason}:{})");
    // Receipt-text pin: the bare "readOnlyEnforced," is also satisfied by the destructuring line, so pin the receipt object itself (kills MW6).
    expect(probe).toContain("envKeys:keys,readOnlyEnforced,");
  });

  it("the runner calls the cross-check on the parsed probe receipt with its own uid, so deleting the call cannot pass the default gate (O1 pin-flip floor)", () => {
    const runner = readRepo("qa/workbench/install-minimal.mjs");
    expect(runner).toMatch(/import \{[^}]*\bassertReadOnlyReceipt\b[^}]*\} from '\.\/install-minimal-lib\.mjs'/);
    expect(runner).toContain("const ownUid=typeof process.getuid==='function'?process.getuid():undefined;");
    const parsed = runner.indexOf("const probeReceipt=JSON.parse(");
    const crossCheck = runner.indexOf("assertReadOnlyReceipt(probeReceipt,ownUid);");
    expect(parsed >= 0, "runner no longer parses the probe receipt").toBe(true);
    expect(crossCheck > parsed, "cross-check must follow the receipt parse").toBe(true);
  });

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
