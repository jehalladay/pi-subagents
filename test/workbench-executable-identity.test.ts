/**
 * VC-7/W18-B (wb-0kg.2): pure native executable identity observation and the
 * reattach comparison. Every fixture is written under a mkdtemp directory with
 * an explicit mode; nothing here is ever executed, spawned or networked.
 */
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, truncateSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  compareExecutableIdentity,
  EXECUTABLE_IDENTITY_CONTRACT,
  type ExecutableIdentityInput,
  type ExecutableObservation,
  observeExecutableIdentity,
} from "../src/workbench/executable-identity.js";

const AT = "2026-10-15T00:00:00.000Z";
const LATER = "2026-10-15T01:00:00.000Z";
const MODULE = join(process.cwd(), "src", "workbench", "executable-identity.ts");
const ROOT_USER = typeof process.getuid === "function" && process.getuid() === 0;

const roots: string[] = [];
const restores: Array<() => void> = [];
afterEach(() => {
  for (const restore of restores.splice(0)) restore();
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

/** A canonical private sandbox (mkdtemp is created 0o700). */
function sandbox(): string {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "wb-exe-id-")));
  roots.push(root);
  return root;
}
function dir(parent: string, name: string, mode = 0o755): string {
  const path = join(parent, name);
  mkdirSync(path);
  chmodSync(path, mode);
  return path;
}
/** Fixture bytes only: these files carry an execute bit but are never run. */
function file(path: string, bytes: string | Buffer, mode = 0o755): string {
  writeFileSync(path, bytes);
  chmodSync(path, mode);
  return path;
}
const sha256 = (bytes: string | Buffer): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;

type Args = Omit<ExecutableIdentityInput, "path" | "observedAt"> & { path?: string; observedAt?: string };
/** Every observation in this suite passes through here, so each one pins the contract literal (B7). */
function observe(args: Args): ExecutableObservation {
  const observed = observeExecutableIdentity({ path: undefined, observedAt: AT, ...args });
  expect(observed.contractVersion).toBe("workbench.executable-identity/v1");
  return observed;
}

describe("B1 deployment identity: an explicitly named regular executable is digest-observed", () => {
  it("hashes the exact bytes of a 0o755 fixture referenced by absolute path", () => {
    const root = sandbox();
    const bytes = Buffer.from("fixture executable bytes; never run\n");
    const tool = file(join(root, "tool"), bytes);
    expect(observe({ command: tool, cwd: root })).toStrictEqual({
      contractVersion: EXECUTABLE_IDENTITY_CONTRACT,
      requested: tool,
      resolution: "absolute",
      resolvedPath: tool,
      realPath: realpathSync(tool),
      symlinkHops: 0,
      digest: sha256(bytes),
      sizeBytes: bytes.length,
      mode: 0o755,
      candidates: 1,
      immutability: "digest-observed",
      reasons: [],
      observedAt: AT,
    });
  });

  it("observes process.execPath by absolute path the same way twice, apart from observedAt", () => {
    const root = sandbox();
    const first = observe({ command: process.execPath, cwd: root });
    const second = observe({ command: process.execPath, cwd: root, observedAt: LATER });
    expect(first).toMatchObject({ resolution: "absolute", immutability: "digest-observed", candidates: 1, reasons: [] });
    expect(first.digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(first.realPath).toBe(realpathSync.native(process.execPath));
    expect(second.observedAt).toBe(LATER);
    expect({ ...second, observedAt: first.observedAt }).toStrictEqual(first);
  });

  it("resolves a relative command with a separator against cwd and echoes the caller's observedAt verbatim", () => {
    const root = sandbox();
    const bin = dir(root, "bin");
    const bytes = "relative fixture\n";
    const tool = file(join(bin, "tool"), bytes, 0o750);
    const observed = observe({ command: "bin/tool", cwd: root, observedAt: "caller-supplied-instant" });
    expect(observed).toMatchObject({ requested: "bin/tool", resolution: "absolute", resolvedPath: tool, realPath: tool, digest: sha256(bytes), mode: 0o750, immutability: "digest-observed" });
    expect(observed.observedAt).toBe("caller-supplied-instant");
  });
});

describe("B2 a mutable PATH or SDK default executable is never advertised as an immutable deployment", () => {
  it("resolves the forge provider's bare spawn literal to the FIRST PATH entry, digest observed but mutable-path", () => {
    const provider = readFileSync(join(process.cwd(), "src", "workbench", "providers", "forge.ts"), "utf8");
    const literal = /ServerConnection\.spawn\("([^"]+)"\)/.exec(provider)?.[1];
    expect(literal).toBe("forge");
    const root = sandbox();
    const first = dir(root, "first");
    const second = dir(root, "second");
    const one = file(join(first, "forge"), "first forge on PATH\n");
    const two = file(join(second, "forge"), "second forge on PATH\n");

    const forward = observe({ command: literal, cwd: root, path: [first, second].join(delimiter) });
    expect(forward).toMatchObject({ requested: "forge", resolution: "path-search", resolvedPath: one, realPath: one, symlinkHops: 0, candidates: 2, immutability: "mutable-path" });
    expect(forward.digest).toBe(sha256("first forge on PATH\n"));
    expect(forward.reasons).toEqual(["path-resolved", "shadowed-candidates"]);

    const reversed = observe({ command: literal, cwd: root, path: [second, first].join(delimiter) });
    expect(reversed).toMatchObject({ resolvedPath: two, realPath: two, candidates: 2, immutability: "mutable-path" });
    expect(reversed.digest).toBe(sha256("second forge on PATH\n"));
    expect(reversed.realPath).not.toBe(forward.realPath);
    expect(reversed.digest).not.toBe(forward.digest);
  });

  it("labels a lone PATH candidate path-resolved only, still never digest-observed", () => {
    const root = sandbox();
    const only = dir(root, "only");
    file(join(only, "forge"), "lone forge\n");
    const observed = observe({ command: "forge", cwd: root, path: only });
    expect(observed).toMatchObject({ resolution: "path-search", candidates: 1, immutability: "mutable-path", digest: sha256("lone forge\n") });
    expect(observed.reasons).toEqual(["path-resolved"]);
  });

  it("labels the SDK default executable (no command) unsupported, with no digest and no search", () => {
    const root = sandbox();
    const onPath = dir(root, "bin");
    file(join(onPath, "claude"), "a same-named binary must not be guessed\n");
    for (const command of [undefined, ""]) {
      expect(observe({ command, cwd: root, path: onPath })).toStrictEqual({
        contractVersion: EXECUTABLE_IDENTITY_CONTRACT,
        requested: command,
        resolution: "unresolved",
        symlinkHops: 0,
        candidates: 0,
        immutability: "unsupported",
        reasons: ["sdk-default-executable"],
        observedAt: AT,
      });
    }
  });

  it("searches empty and relative PATH entries against cwd, never against an ambient directory", () => {
    const root = sandbox();
    const inCwd = file(join(root, "forge"), "forge in cwd\n");
    const bin = dir(root, "bin");
    const inBin = file(join(bin, "forge"), "forge in cwd-relative bin\n");
    expect(observe({ command: "forge", cwd: root, path: `${delimiter}${bin}` })).toMatchObject({ resolvedPath: inCwd, realPath: inCwd, candidates: 2 });
    expect(observe({ command: "forge", cwd: root, path: "" })).toMatchObject({ resolvedPath: inCwd, candidates: 1 });
    expect(observe({ command: "forge", cwd: root, path: "bin" })).toMatchObject({ resolvedPath: inBin, realPath: inBin, candidates: 1, digest: sha256("forge in cwd-relative bin\n") });
  });

  it("surfaces an earlier PATH entry it could not inspect, since a launcher might run or fail on that entry instead", () => {
    const root = sandbox();
    const looped = dir(root, "looped");
    symlinkSync(join(looped, "other"), join(looped, "forge"));
    symlinkSync(join(looped, "forge"), join(looped, "other"));
    const good = dir(root, "good");
    const tool = file(join(good, "forge"), "reachable forge\n");
    const observed = observe({ command: "forge", cwd: root, path: [looped, good].join(delimiter) });
    expect(observed).toMatchObject({ resolution: "path-search", realPath: tool, candidates: 1, immutability: "mutable-path" });
    expect(observed.reasons).toEqual(["symlink-depth", "path-resolved"]);
  });
});

describe("B3 explicit resolution follows symlinks hop by hop and refuses rather than throws", () => {
  it("follows link2 -> link1 -> binary to the binary's realpath with two hops and the direct digest", () => {
    const root = sandbox();
    const binary = file(join(root, "binary"), "linked binary bytes\n");
    symlinkSync("binary", join(root, "link1"));
    symlinkSync(join(root, "link1"), join(root, "link2"));
    const direct = observe({ command: binary, cwd: root });
    const linked = observe({ command: join(root, "link2"), cwd: root });
    expect(linked).toMatchObject({ resolution: "absolute", resolvedPath: join(root, "link2"), realPath: realpathSync(binary), symlinkHops: 2, immutability: "digest-observed", reasons: [] });
    expect(linked.digest).toBe(direct.digest);
    expect(observe({ command: join(root, "link2"), cwd: root, maxSymlinkHops: 2 }).digest).toBe(direct.digest);
  });

  it("refuses a chain longer than maxSymlinkHops, and a link loop, as unsupported symlink-depth without a digest", () => {
    const root = sandbox();
    file(join(root, "binary"), "deep binary\n");
    symlinkSync("binary", join(root, "link1"));
    symlinkSync("link1", join(root, "link2"));
    const tooDeep = observe({ command: join(root, "link2"), cwd: root, maxSymlinkHops: 1 });
    expect(tooDeep).toMatchObject({ resolution: "unresolved", symlinkHops: 1, candidates: 0, immutability: "unsupported", reasons: ["symlink-depth"] });
    expect(tooDeep).not.toHaveProperty("digest");
    expect(tooDeep).not.toHaveProperty("realPath");

    symlinkSync("loop-b", join(root, "loop-a"));
    symlinkSync("loop-a", join(root, "loop-b"));
    expect(observe({ command: join(root, "loop-a"), cwd: root })).toMatchObject({ resolution: "unresolved", symlinkHops: 16, immutability: "unsupported", reasons: ["symlink-depth"] });
    // A loop in a directory component is the kernel's ELOOP, met before any final-component hop is counted.
    expect(observe({ command: join(root, "loop-a", "forge"), cwd: root })).toMatchObject({ resolution: "unresolved", symlinkHops: 0, immutability: "unsupported", reasons: ["symlink-depth"] });
    expect(observe({ command: "forge", cwd: root, path: join(root, "loop-a") })).toMatchObject({ resolution: "unresolved", reasons: ["symlink-depth"] });
  });

  it("defaults maxSymlinkHops to 16: a 16-link chain resolves and a 17-link chain does not", () => {
    const root = sandbox();
    const binary = file(join(root, "binary"), "sixteen hops away\n");
    let previous = "binary";
    for (let index = 1; index <= 17; index += 1) {
      symlinkSync(previous, join(root, `hop${index}`));
      previous = `hop${index}`;
    }
    expect(observe({ command: join(root, "hop16"), cwd: root })).toMatchObject({ symlinkHops: 16, realPath: binary, immutability: "digest-observed" });
    expect(observe({ command: join(root, "hop17"), cwd: root })).toMatchObject({ symlinkHops: 16, immutability: "unsupported", reasons: ["symlink-depth"] });
  });

  it("resolves '..' after a symlinked directory the way the kernel does, never lexically", () => {
    const root = sandbox();
    const real = dir(root, "real");
    dir(real, "deep");
    const bin = dir(real, "bin");
    const kernel = file(join(bin, "tool"), "kernel-resolved tool\n");
    file(join(dir(root, "bin"), "tool"), "lexical decoy\n");
    symlinkSync(join(real, "deep"), join(root, "deeplink"));
    const observed = observe({ command: "deeplink/../bin/tool", cwd: root });
    expect(observed).toMatchObject({ resolution: "absolute", realPath: kernel, immutability: "digest-observed" });
    expect(observed.digest).toBe(sha256("kernel-resolved tool\n"));
    // The same holds for PATH entries, absolute or cwd-relative.
    for (const entry of [join(root, "deeplink") + "/../bin", "deeplink/../bin"]) {
      expect(observe({ command: "tool", cwd: root, path: entry })).toMatchObject({ resolution: "path-search", realPath: kernel, digest: sha256("kernel-resolved tool\n") });
    }
  });

  it("resolves a relative link target from the link's real directory, never from the alias it was reached through", () => {
    const root = sandbox();
    const real = dir(root, "real");
    const deep = dir(real, "deep");
    const kernel = file(join(dir(real, "bin"), "tool"), "target beside the real link\n");
    file(join(dir(root, "bin"), "tool"), "lexical decoy\n");
    symlinkSync("../bin/tool", join(deep, "tool"));
    symlinkSync(deep, join(root, "alias"));
    const observed = observe({ command: join(root, "alias", "tool"), cwd: root });
    expect(observed).toMatchObject({ realPath: kernel, symlinkHops: 1, digest: sha256("target beside the real link\n") });
  });

  it("follows a symlinked PATH candidate and reports both the PATH location and the real file", () => {
    const root = sandbox();
    const opt = dir(root, "opt");
    const target = file(join(opt, "forge-1.2.3"), "versioned forge\n");
    const bin = dir(root, "bin");
    symlinkSync(target, join(bin, "forge"));
    expect(observe({ command: "forge", cwd: root, path: bin })).toMatchObject({ resolution: "path-search", resolvedPath: join(bin, "forge"), realPath: target, symlinkHops: 1, immutability: "mutable-path" });
  });

  it("reports a 0o644 lone PATH candidate as not-executable, never as resolved", () => {
    const root = sandbox();
    const bin = dir(root, "bin");
    file(join(bin, "forge"), "readable but not executable\n", 0o644);
    expect(observe({ command: "forge", cwd: root, path: bin })).toStrictEqual({
      contractVersion: EXECUTABLE_IDENTITY_CONTRACT,
      requested: "forge",
      resolution: "unresolved",
      symlinkHops: 0,
      candidates: 0,
      immutability: "unsupported",
      reasons: ["not-executable"],
      observedAt: AT,
    });
    const explicit = observe({ command: join(bin, "forge"), cwd: root });
    expect(explicit).toMatchObject({ resolution: "unresolved", resolvedPath: join(bin, "forge"), candidates: 0, immutability: "unsupported", reasons: ["not-executable"] });
    expect(explicit).not.toHaveProperty("digest");
  });

  it("reports a directory or device named like the command as not-a-file", () => {
    const root = sandbox();
    const bin = dir(root, "bin");
    dir(bin, "forge");
    expect(observe({ command: "forge", cwd: root, path: bin })).toMatchObject({ resolution: "unresolved", immutability: "unsupported", reasons: ["not-a-file"] });
    expect(observe({ command: join(bin, "forge"), cwd: root })).toMatchObject({ resolution: "unresolved", reasons: ["not-a-file"] });
    expect(observe({ command: "/dev/null", cwd: root })).toMatchObject({ resolution: "unresolved", reasons: ["not-a-file"] });
  });

  it("reports missing, dangling and impossible commands as not-found and throws for none of them", () => {
    const root = sandbox();
    const bin = dir(root, "bin");
    const plain = file(join(root, "plain"), "a regular file used as a directory\n");
    symlinkSync(join(root, "nowhere"), join(bin, "dangling"));
    expect(observe({ command: "forge", cwd: root, path: bin })).toMatchObject({ resolution: "unresolved", candidates: 0, reasons: ["not-found"] });
    expect(observe({ command: join(root, "absent"), cwd: root })).toMatchObject({ resolution: "unresolved", resolvedPath: join(root, "absent"), reasons: ["not-found"] });
    expect(observe({ command: join(bin, "dangling"), cwd: root })).toMatchObject({ resolution: "unresolved", symlinkHops: 1, reasons: ["not-found"] });
    expect(observe({ command: join(plain, "forge"), cwd: root })).toMatchObject({ resolution: "unresolved", reasons: ["not-found"] });
    for (const command of ["for\u0000ge", `${root}/for\u0000ge`]) {
      expect(() => observe({ command, cwd: root, path: bin })).not.toThrow();
      expect(observe({ command, cwd: root, path: bin })).toMatchObject({ resolution: "unresolved", immutability: "unsupported" });
    }
  });

  it.skipIf(ROOT_USER)("reports an executable it may not read as absolute but unsupported/unreadable, without a digest", () => {
    const root = sandbox();
    const tool = file(join(root, "tool"), "execute-only bytes\n", 0o311);
    const observed = observe({ command: tool, cwd: root });
    expect(observed).toMatchObject({ resolution: "absolute", realPath: tool, sizeBytes: 19, mode: 0o311, candidates: 1, immutability: "unsupported", reasons: ["unreadable"] });
    expect(observed).not.toHaveProperty("digest");
  });

  it.skipIf(ROOT_USER)("reports a PATH entry it may not search, or a selection it may not read, as unreadable rather than not-found", () => {
    const root = sandbox();
    const locked = dir(root, "locked");
    file(join(locked, "forge"), "hidden forge\n");
    chmodSync(locked, 0o600);
    restores.push(() => chmodSync(locked, 0o700));
    expect(observe({ command: "forge", cwd: root, path: locked })).toMatchObject({ resolution: "unresolved", reasons: ["unreadable"] });
    expect(observe({ command: join(locked, "forge"), cwd: root })).toMatchObject({ resolution: "unresolved", reasons: ["unreadable"] });
    const executeOnly = dir(root, "execute-only");
    file(join(executeOnly, "forge"), "selected but unreadable\n", 0o311);
    const selected = observe({ command: "forge", cwd: root, path: [locked, executeOnly].join(delimiter) });
    expect(selected).toMatchObject({ resolution: "path-search", resolvedPath: join(executeOnly, "forge"), candidates: 1, immutability: "mutable-path" });
    expect(selected).not.toHaveProperty("digest");
    expect(selected.reasons).toEqual(["unreadable", "path-resolved"]);
  });

  it("refuses programmer errors in bounds or a relative cwd instead of guessing", () => {
    const root = sandbox();
    expect(() => observeExecutableIdentity({ command: "forge", cwd: "relative/dir", path: root, observedAt: AT })).toThrow(RangeError);
    for (const bad of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => observeExecutableIdentity({ command: "forge", cwd: root, path: root, observedAt: AT, maxBytes: bad })).toThrow(RangeError);
      expect(() => observeExecutableIdentity({ command: "forge", cwd: root, path: root, observedAt: AT, maxSearchEntries: bad })).toThrow(RangeError);
      expect(() => observeExecutableIdentity({ command: "forge", cwd: root, path: root, observedAt: AT, maxSymlinkHops: bad })).toThrow(RangeError);
    }
  });
});

describe("B4 reattach comparison never upgrades unknown to same", () => {
  it("is same for two digest-observed observations of identical bytes even when observedAt differs", () => {
    const root = sandbox();
    const tool = file(join(root, "tool"), "stable bytes\n");
    const recorded = observe({ command: tool, cwd: root });
    const current = observe({ command: tool, cwd: root, observedAt: LATER });
    expect(compareExecutableIdentity(recorded, current)).toStrictEqual({ verdict: "same", differences: [] });
  });

  it("is changed, naming digest, after one byte of the fixture is rewritten", () => {
    const root = sandbox();
    const bytes = Buffer.from("reattach fixture v1\n");
    const tool = file(join(root, "tool"), bytes);
    const recorded = observe({ command: tool, cwd: root });
    const rewritten = Buffer.from(bytes);
    rewritten[0] = rewritten[0] ^ 1;
    writeFileSync(tool, rewritten);
    const current = observe({ command: tool, cwd: root, observedAt: LATER });
    expect(current.digest).toBe(sha256(rewritten));
    expect(compareExecutableIdentity(recorded, current)).toStrictEqual({ verdict: "changed", differences: ["digest"] });
  });

  it("is unknown whenever either side lacks a digest or is mutable-path or unsupported", () => {
    const root = sandbox();
    const bin = dir(root, "bin");
    const tool = file(join(bin, "forge"), "one binary, many observations\n");
    const absolute = observe({ command: tool, cwd: root });
    const viaPath = observe({ command: "forge", cwd: root, path: bin });
    const viaPathAgain = observe({ command: "forge", cwd: root, path: bin, observedAt: LATER });
    const tooLarge = observe({ command: tool, cwd: root, maxBytes: 4 });
    const sdkDefault = observe({ command: undefined, cwd: root });

    expect(viaPath.digest).toBe(absolute.digest);
    expect(compareExecutableIdentity(viaPath, viaPathAgain)).toStrictEqual({ verdict: "unknown", differences: [] });
    expect(compareExecutableIdentity(absolute, viaPath)).toStrictEqual({ verdict: "unknown", differences: ["immutability", "resolution"] });
    expect(compareExecutableIdentity(viaPath, absolute)).toStrictEqual({ verdict: "unknown", differences: ["immutability", "resolution"] });
    expect(compareExecutableIdentity(absolute, tooLarge)).toStrictEqual({ verdict: "unknown", differences: ["digest", "immutability"] });
    expect(compareExecutableIdentity(sdkDefault, sdkDefault)).toStrictEqual({ verdict: "unknown", differences: [] });

    rmSync(tool);
    const vanished = observe({ command: tool, cwd: root, observedAt: LATER });
    expect(compareExecutableIdentity(absolute, vanished)).toStrictEqual({ verdict: "unknown", differences: ["digest", "realPath", "sizeBytes", "mode", "immutability", "resolution"] });
  });

  it("names every differing field and reports changed when both digests are present and differ", () => {
    const root = sandbox();
    const recordedTool = file(join(root, "recorded"), "aaa\n");
    const bin = dir(root, "bin");
    file(join(bin, "forge"), "bbbbbb\n", 0o750);
    const recorded = observe({ command: recordedTool, cwd: root });
    const current = observe({ command: "forge", cwd: root, path: bin });
    expect(compareExecutableIdentity(recorded, current)).toStrictEqual({ verdict: "changed", differences: ["digest", "realPath", "sizeBytes", "mode", "immutability", "resolution"] });
  });

  it("refuses a recorded observation of another contract version as unknown", () => {
    const root = sandbox();
    const tool = file(join(root, "tool"), "contract bound\n");
    const current = observe({ command: tool, cwd: root });
    const foreign: ExecutableObservation = JSON.parse(JSON.stringify(current).replace(EXECUTABLE_IDENTITY_CONTRACT, "workbench.executable-identity/v2"));
    expect(compareExecutableIdentity(foreign, current)).toStrictEqual({ verdict: "unknown", differences: ["contractVersion"] });
    expect(compareExecutableIdentity(current, foreign)).toStrictEqual({ verdict: "unknown", differences: ["contractVersion"] });
  });
});

describe("B5 observation only: no launcher, no ambient environment, bounded reads, frozen results", () => {
  it("its source imports only node:fs, node:path, node:crypto and the shared redaction module, and touches no launcher, environment or clock", () => {
    const source = readFileSync(MODULE, "utf8");
    for (const forbidden of ["node:child_process", "child_process", "process.env", "process.cwd", "Date.now", "new Date", "readFileSync", "import(", "require("]) {
      expect(source, forbidden).not.toContain(forbidden);
    }
    const specifiers = [...source.matchAll(/^import\s[^;]*?from\s+"([^"]+)";/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(["./redaction.js", "node:crypto", "node:fs", "node:path"]);
  });

  it("omits the digest of a 64-byte fixture observed with maxBytes 16, and hashes one at exactly the bound", () => {
    const root = sandbox();
    const big = file(join(root, "big"), Buffer.alloc(64, 7));
    const observed = observe({ command: big, cwd: root, maxBytes: 16 });
    expect(observed).toMatchObject({ resolution: "absolute", realPath: big, sizeBytes: 64, candidates: 1, immutability: "unsupported", reasons: ["too-large"] });
    expect(observed).not.toHaveProperty("digest");
    const exact = file(join(root, "exact"), Buffer.alloc(16, 7));
    expect(observe({ command: exact, cwd: root, maxBytes: 16 })).toMatchObject({ digest: sha256(Buffer.alloc(16, 7)), immutability: "digest-observed" });
  });

  it("defaults maxBytes to 512 MiB: a sparse executable of exactly 512 MiB is hashed and one byte more is too-large", () => {
    const root = sandbox();
    const limit = 512 * 1024 * 1024;
    const atLimit = file(join(root, "at-limit"), "");
    truncateSync(atLimit, limit);
    // sha256 of 512 MiB of zero bytes, cross-checked with `head -c 536870912 /dev/zero | sha256sum`.
    expect(observe({ command: atLimit, cwd: root })).toMatchObject({ sizeBytes: limit, immutability: "digest-observed", digest: "sha256:9acca8e8c22201155389f65abbf6bc9723edc7384ead80503839f49dcc56d767" });
    const huge = file(join(root, "huge"), "");
    truncateSync(huge, limit + 1);
    const observed = observe({ command: huge, cwd: root });
    expect(observed).toMatchObject({ resolution: "absolute", sizeBytes: limit + 1, immutability: "unsupported", reasons: ["too-large"] });
    expect(observed).not.toHaveProperty("digest");
  });

  it("freezes the observation, its reasons and the comparison, and round-trips each through JSON unchanged", () => {
    const root = sandbox();
    const big = file(join(root, "big"), Buffer.alloc(64, 7));
    const observed = observe({ command: big, cwd: root, maxBytes: 16 });
    const comparison = compareExecutableIdentity(observed, observed);
    expect(comparison).toStrictEqual({ verdict: "unknown", differences: [] });
    for (const value of [observed, observed.reasons, comparison, comparison.differences]) expect(Object.isFrozen(value)).toBe(true);
    for (const value of [observed, comparison]) {
      const text = JSON.stringify(value);
      expect(JSON.parse(text)).toStrictEqual(value);
      expect(JSON.stringify(JSON.parse(text))).toBe(text);
    }
    const parsed: ExecutableObservation = JSON.parse(JSON.stringify(observed));
    expect(compareExecutableIdentity(parsed, observed)).toStrictEqual(comparison);
  });
});

describe("B6 supply-chain hygiene: credentials never surface and a truncated search is never a certain not-found", () => {
  it("redacts a token embedded in a PATH directory name from every reported path", () => {
    const root = sandbox();
    const tokenDir = dir(root, "Bearer abc123");
    const tool = file(join(tokenDir, "forge"), "forge behind a credential-bearing path\n");
    const searched = observe({ command: "forge", cwd: root, path: tokenDir });
    const explicit = observe({ command: tool, cwd: root });
    expect(searched).toMatchObject({ resolution: "path-search", digest: sha256("forge behind a credential-bearing path\n") });
    expect(explicit).toMatchObject({ resolution: "absolute", immutability: "digest-observed", digest: searched.digest });
    for (const observed of [searched, explicit]) {
      expect(observed.resolvedPath).toContain("[REDACTED]");
      expect(observed.realPath).toContain("[REDACTED]");
      expect(JSON.stringify(observed)).not.toContain("abc123");
    }
    expect(explicit.requested).toContain("[REDACTED]");
  });

  it("reports a path longer than the shared 2000-character display default whole, since realPath feeds reattach differences", () => {
    const root = sandbox();
    let deep = root;
    for (let level = 0; level < 11; level += 1) deep = dir(deep, "d".repeat(200));
    const tool = file(join(deep, "forge"), "a deeply nested forge\n");
    expect(tool.length).toBeGreaterThan(2000);
    const observed = observe({ command: tool, cwd: root });
    expect(observed).toMatchObject({ requested: tool, resolvedPath: tool, realPath: tool, immutability: "digest-observed" });
    expect(observe({ command: "forge", cwd: root, path: deep }).realPath).toBe(tool);
  });

  it("searches at most maxSearchEntries (default 64) of a 100-entry PATH and reports search-truncated, not not-found", () => {
    const root = sandbox();
    const pathWithMatchAt = (index: number): string => {
      const entries = Array.from({ length: 100 }, (_, entry) => join(root, `absent-${entry}`));
      const holder = dir(root, `holder-${index}`);
      file(join(holder, "forge"), `forge at entry ${index + 1}\n`);
      entries[index] = holder;
      return entries.join(delimiter);
    };
    const entry90 = pathWithMatchAt(89);
    expect(observe({ command: "forge", cwd: root, path: entry90 })).toStrictEqual({
      contractVersion: EXECUTABLE_IDENTITY_CONTRACT,
      requested: "forge",
      resolution: "unresolved",
      symlinkHops: 0,
      candidates: 0,
      immutability: "unsupported",
      reasons: ["search-truncated"],
      observedAt: AT,
    });
    expect(observe({ command: "forge", cwd: root, path: entry90, maxSearchEntries: 90 })).toMatchObject({ resolution: "path-search", candidates: 1, reasons: ["path-resolved", "search-truncated"] });
    expect(observe({ command: "forge", cwd: root, path: entry90, maxSearchEntries: 100 }).reasons).toEqual(["path-resolved"]);
    expect(observe({ command: "forge", cwd: root, path: pathWithMatchAt(63) })).toMatchObject({ resolution: "path-search", reasons: ["path-resolved", "search-truncated"] });
    expect(observe({ command: "forge", cwd: root, path: pathWithMatchAt(64) })).toMatchObject({ resolution: "unresolved", reasons: ["search-truncated"] });
  });

  it("treats an absent PATH as an incomplete search, because a launcher would fall back to a platform default path", () => {
    const root = sandbox();
    file(join(root, "forge"), "a cwd binary is not on an absent PATH\n");
    expect(observe({ command: "forge", cwd: root, path: undefined })).toMatchObject({ resolution: "unresolved", candidates: 0, immutability: "unsupported", reasons: ["search-truncated"] });
  });
});

describe("B7 contract version on every observation", () => {
  it("exports the exact contract literal", () => {
    expect(EXECUTABLE_IDENTITY_CONTRACT).toBe("workbench.executable-identity/v1");
  });
});
