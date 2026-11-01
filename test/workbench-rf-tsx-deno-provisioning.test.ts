/**
 * wb-70xe (RF-NATIVE-TSX-COMPONENTS-R2): the operator provisions Deno per RFCLI ruling A4 and no Pi lane installs it.
 *
 * Acceptance shape (the owner filing's notes on the bead): (a) the rf-preview-tsx tier's success row records the realpath of
 * the PATH-resolved deno and holds it to the installed rf's runtime-lock.json engine pin, refusing typed (never a silent
 * skip) a shim-resolved or mismatched binary; (b) one docs/workbench sentence, bound by the docs07 census (row R10); (c)
 * falsifiers: a Pi lane installing deno, or a receipt whose resolved deno differs from the lock pin, is red.
 *
 * This file holds two parts. The first pins the identity reading's refusals and passes (test/helpers/rf-tsx-deno.ts) on
 * scratch files, none of them ever executed: each planted engine is a text file without a #! line whose body, if any shell
 * ever ran it, would write a marker, and every case that plants one asserts the marker is absent. Every refusal case reads
 * its typed code as a literal, both as the refusal's reason and as the head of its message. The empty-PATH branch of
 * resolveOnPath is NOT CLAIMED by a falsifier: the repository root holds no deno, so its working-directory lookup and
 * shutil.which's None read alike there. The tier wiring of the same reading (refused before rf runs, refused after the
 * render reports the pin, the engine line's fields) is pinned by the wb-70xe cases of test/workbench-rf-tsx-tier.test.ts.
 *
 * The second part is the lane census for (c)'s first clause. It walks every regular file at the repository root (AGENTS.md,
 * forge.toml, package.json and the root vitest configs among them) and the .github, .agents, .pi, .codex, examples, src,
 * test and qa trees, and reads no line carrying a Deno install command of the six closed shapes in DENO_INSTALL_SHAPES: 0
 * hits over the walked set. This file and the helper are walked and judged, never exempt, so every planted control below is
 * composed at run time and no line of this file spells a shape. Two anchors sit outside this census's own literals: the
 * repository's git index, whose tracked top-level directories the walked trees and UNWALKED_ROOTS (each named with why)
 * must partition and whose tracked root files the walk must read; and the docs/workbench/07 Deno sentence, which names the
 * six command families the shapes must equal label for label. Outside the walk, the seat's scans of the tracked tree at
 * trunks 538377bf and 5a84c7a0 each read 3 matcher hits, none in a lane: docs/workbench/receipts/wb-693.7.md:11 (I3, prose
 * naming the mise install of the engine) and this bead's exported notes in .beads/issues.jsonl (I3, I5); a record, not a
 * claim of this census.
 *
 * NOT CLAIMED by this census: untracked top-level directories (node_modules, .forge, a .git directory), the trees
 * UNWALKED_ROOTS names and any symlink at the repository root (a worktree may link its node_modules; root links are never
 * followed); a Deno package declared as an npm dependency (package.json and package-lock.json are read for the six command
 * shapes only); Pi lane session transcripts (the census reads the tracked lane definitions and trees); and, inside one
 * shape, a coordinated removal of one alternative (a manager, a verb, a host) from the matcher, its planted controls and
 * the frozen count together, since the docs anchor names the families, not their tokens. NAMED RESIDUALS, each a named
 * family and its pinned quiet row in RESIDUAL_QUIET (a matcher that starts catching one reds it): R-MIRROR, an engine
 * archive from a host no shape names; R-COMPOSED, an install command assembled at run time, which no source line spells;
 * R-UNNAMED-MANAGER, an install through a version or package manager no shape names.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  DENO_ENGINE,
  DENO_INSTALL_SHAPES,
  DENO_LANE_SUITE,
  DenoIdentityRefusal,
  denoInstallHits,
  echoPath,
  pinnedDenoDigest,
  provisionedDeno,
  resolveOnPath,
  sha256Of,
} from "./helpers/rf-tsx-deno.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = process.cwd();
const SELF = "test/workbench-rf-tsx-deno-provisioning.test.ts";
const HELPER = "test/helpers/rf-tsx-deno.ts";
const TIER = "test/workbench-native-rf-tsx-preview.test.ts";

const allocated: string[] = [];
afterEach(() => removeScratch(...allocated.splice(0)));
function scratch(prefix: string): string {
  const dir = makeScratch(prefix);
  allocated.push(dir);
  return dir;
}

/** A planted engine: an executable text file with no #! line; if a shell ever ran it, it would write `marker`. */
function plantEngine(dir: string, marker: string, name: string = DENO_ENGINE): string {
  mkdirSync(dir, { recursive: true });
  const file = join(dir, name);
  writeFileSync(file, `echo executed > '${marker}'\n`);
  chmodSync(file, 0o700);
  return file;
}

/** The refusal `run` throws, or a failure naming that it returned. */
function refusalOf(run: () => unknown): DenoIdentityRefusal {
  try {
    run();
  } catch (error) {
    if (error instanceof DenoIdentityRefusal) return error;
    throw error;
  }
  throw new Error("expected a DenoIdentityRefusal, the reading returned");
}

/** `refusal` carries `code` (each caller spells it as a literal, never through the helper's constant) as its reason and as its message's head. */
function expectCode(refusal: DenoIdentityRefusal, code: string): void {
  expect([refusal.reason, refusal.message.slice(0, code.length + 2)]).toEqual([code, `${code}: `]);
}

describe("wb-70xe identity reading: the PATH-resolved deno, never executed (test/helpers/rf-tsx-deno.ts)", () => {
  it("resolveOnPath reads PATH in order as shutil.which does: a directory, a non-executable file and a broken symlink are passed over, the first executable file wins", () => {
    const dir = scratch("deno-which-");
    const marker = join(dir, "executed");
    mkdirSync(join(dir, "a", DENO_ENGINE), { recursive: true });
    mkdirSync(join(dir, "b"));
    writeFileSync(join(dir, "b", DENO_ENGINE), "plain\n");
    chmodSync(join(dir, "b", DENO_ENGINE), 0o600);
    mkdirSync(join(dir, "c"));
    symlinkSync(join(dir, "missing"), join(dir, "c", DENO_ENGINE));
    const first = plantEngine(join(dir, "d"), marker);
    plantEngine(join(dir, "e"), marker);
    const path = ["a", "b", "c", "d", "e"].map(entry => join(dir, entry)).join(delimiter);
    expect(resolveOnPath(DENO_ENGINE, path)).toBe(first);
    expect(resolveOnPath(DENO_ENGINE, ["a", "b", "c"].map(entry => join(dir, entry)).join(delimiter))).toBeUndefined();
    expect([resolveOnPath(DENO_ENGINE, undefined), resolveOnPath(DENO_ENGINE, "")]).toEqual([undefined, undefined]);
    expect(resolveOnPath(DENO_ENGINE, `${delimiter}${join(dir, "d")}`)).toBe(first);
    expect(existsSync(marker)).toBe(false);
  });

  it("provisionedDeno returns the resolved path and its realpath through a symlink chain, and the digest half returns the measured sha256 when it equals the reported pin", () => {
    const dir = scratch("deno-pinned-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "tools", "deno", "2.9.7", "bin"), marker);
    mkdirSync(join(dir, "current"));
    symlinkSync(join(dir, "tools", "deno", "2.9.7"), join(dir, "current", "deno-dir"));
    mkdirSync(join(dir, "bin"));
    symlinkSync(join(dir, "current", "deno-dir", "bin", DENO_ENGINE), join(dir, "bin", DENO_ENGINE));
    const resolved = provisionedDeno(`${join(dir, "bin")}${delimiter}${process.env.PATH ?? ""}`);
    expect(resolved).toEqual({ resolved: join(dir, "bin", DENO_ENGINE), realpath: realpathSync(engine) });
    const digest = sha256Of(engine);
    expect(digest).toMatch(/^[0-9a-f]{64}$/);
    expect(pinnedDenoDigest(resolved, `sha256:${digest}`)).toBe(`sha256:${digest}`);
    expect(existsSync(marker)).toBe(false);
  });

  it("an unresolved engine is refused typed rf_tsx_deno_unresolved, never a skip", () => {
    const dir = scratch("deno-absent-");
    const refusal = refusalOf(() => provisionedDeno(join(dir, "empty")));
    expectCode(refusal, "rf_tsx_deno_unresolved");
    expect(refusal.message).toMatch(/^rf_tsx_deno_unresolved: no executable deno on PATH/);
  });

  it("a deno that is a symlink to a version manager's binary is refused typed rf_tsx_deno_shim, naming the realpath's name", () => {
    const dir = scratch("deno-manager-");
    const marker = join(dir, "executed");
    const manager = plantEngine(join(dir, "manager", "bin"), marker, "mise");
    mkdirSync(join(dir, "path"));
    symlinkSync(manager, join(dir, "path", DENO_ENGINE));
    const refusal = refusalOf(() => provisionedDeno(join(dir, "path")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`realpath ${realpathSync(manager)}`);
    expect(refusal.message).toContain("its realpath names mise, not deno");
    expect(refusal.message).toContain("so rf is never launched with it");
    expect(existsSync(marker)).toBe(false);
  });

  it("a deno inside a shims directory is refused typed rf_tsx_deno_shim, even when its name and bytes look like the engine", () => {
    const dir = scratch("deno-shims-");
    const marker = join(dir, "executed");
    plantEngine(join(dir, "shims"), marker);
    const refusal = refusalOf(() => provisionedDeno(join(dir, "shims")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain("it sits in a shims directory");
    expect(refusal.message).not.toContain("its realpath names");
    expect(existsSync(marker)).toBe(false);
  });

  it("a PATH entry inside a shims directory is refused typed rf_tsx_deno_shim on the resolved path alone, though its symlink's target is an engine-named binary outside one", () => {
    const dir = scratch("deno-shims-resolved-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "tools", "bin"), marker);
    mkdirSync(join(dir, "shims"));
    symlinkSync(engine, join(dir, "shims", DENO_ENGINE));
    const refusal = refusalOf(() => provisionedDeno(join(dir, "shims")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`(realpath ${realpathSync(engine)}) is a version-manager shim (it sits in a shims directory)`);
    expect(existsSync(marker)).toBe(false);
  });

  it("a symlink outside any shims directory whose realpath sits in one is refused typed rf_tsx_deno_shim on the realpath alone", () => {
    const dir = scratch("deno-shims-realpath-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "manager", "shims"), marker);
    mkdirSync(join(dir, "bin"));
    symlinkSync(engine, join(dir, "bin", DENO_ENGINE));
    const refusal = refusalOf(() => provisionedDeno(join(dir, "bin")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`the PATH-resolved deno ${join(dir, "bin", DENO_ENGINE)} (realpath ${realpathSync(engine)}) is a version-manager shim (it sits in a shims directory)`);
    expect(existsSync(marker)).toBe(false);
  });

  it("a deno that is a #! script is refused typed rf_tsx_deno_shim, never executed", () => {
    const dir = scratch("deno-script-");
    const marker = join(dir, "executed");
    mkdirSync(join(dir, "bin"));
    writeFileSync(join(dir, "bin", DENO_ENGINE), `#!/bin/sh\necho executed > '${marker}'\n`);
    chmodSync(join(dir, "bin", DENO_ENGINE), 0o700);
    const refusal = refusalOf(() => provisionedDeno(join(dir, "bin")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain("it is a #! script, not the engine binary");
    expect(existsSync(marker)).toBe(false);
  });

  it("sha256Of digests a file past its first 1 MiB read exactly as its whole bytes digest", () => {
    const dir = scratch("deno-chunks-");
    const file = join(dir, "engine-bytes");
    writeFileSync(file, Buffer.alloc((1 << 20) + 17, "0123456789abcdef"));
    const whole = createHash("sha256").update(readFileSync(file)).digest("hex");
    expect(sha256Of(file)).toBe(whole);
    expect(whole).not.toBe(createHash("sha256").update(readFileSync(file).subarray(0, 1 << 20)).digest("hex"));
  });

  it("a resolved engine whose sha256 differs from the reported pin is refused typed rf_tsx_deno_mismatch, naming both digests", () => {
    const dir = scratch("deno-mismatch-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "bin"), marker);
    const resolved = provisionedDeno(join(dir, "bin"));
    const pinned = "f".repeat(64);
    const refusal = refusalOf(() => pinnedDenoDigest(resolved, `sha256:${pinned}`));
    expectCode(refusal, "rf_tsx_deno_mismatch");
    expect(refusal.message).toContain(`has sha256 ${sha256Of(engine)}, not the sha256 ${pinned} the installed rf's runtime lock pins for this host`);
    expect(existsSync(marker)).toBe(false);
  });

  it.each([["unknown"], [`sha256:${"f".repeat(63)}`], [`sha256:${"f".repeat(65)}`], [` sha256:${"f".repeat(64)}`], [`sha256:${"F".repeat(64)}`], [`sha512:${"f".repeat(64)}`], [42], [undefined]])(
    "a reported pin of %s (no sha256 pin for the host) is refused typed rf_tsx_deno_unpinned before any digest is compared",
    fingerprint => {
      const dir = scratch("deno-unpinned-");
      const marker = join(dir, "executed");
      plantEngine(join(dir, "bin"), marker);
      const refusal = refusalOf(() => pinnedDenoDigest(provisionedDeno(join(dir, "bin")), fingerprint));
      expectCode(refusal, "rf_tsx_deno_unpinned");
      expect(refusal.message).toMatch(/^rf_tsx_deno_unpinned: the render reports no pinned binary sha256 for this host/);
      expect(existsSync(marker)).toBe(false);
    },
  );

  it("an engine removed between the halves is refused typed rf_tsx_deno_unreadable by the digest half, never an untyped error", () => {
    const dir = scratch("deno-unreadable-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "bin"), marker);
    const resolved = provisionedDeno(join(dir, "bin"));
    rmSync(engine);
    const refusal = refusalOf(() => pinnedDenoDigest(resolved, `sha256:${"f".repeat(64)}`));
    expectCode(refusal, "rf_tsx_deno_unreadable");
    expect(refusal.message).toBe(`rf_tsx_deno_unreadable: the PATH-resolved deno ${join(dir, "bin", DENO_ENGINE)} cannot be read (ENOENT), so it cannot be held to the lock pin`);
  });

  it("an executable engine the user may not read is refused typed rf_tsx_deno_unreadable before rf runs (a privileged runner reads it, and the reading returns)", () => {
    const dir = scratch("deno-unreadable-mode-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "bin"), marker);
    chmodSync(engine, 0o100);
    try {
      if (process.getuid?.() === 0) {
        expect(provisionedDeno(join(dir, "bin")).realpath).toBe(realpathSync(engine));
      } else {
        const refusal = refusalOf(() => provisionedDeno(join(dir, "bin")));
        expectCode(refusal, "rf_tsx_deno_unreadable");
        expect(refusal.message).toContain("cannot be read (EACCES)");
      }
    } finally {
      chmodSync(engine, 0o700);
    }
    expect(existsSync(marker)).toBe(false);
  });

  it("R-COPIED-MANAGER (named residual, its quiet row): a manager binary copied under the engine's own name outside a shims directory passes the pre-render half, and the digest half refuses it rf_tsx_deno_mismatch", () => {
    const dir = scratch("deno-copied-manager-");
    const marker = join(dir, "executed");
    const manager = plantEngine(join(dir, "manager", "bin"), marker, "mise");
    mkdirSync(join(dir, "bin"));
    copyFileSync(manager, join(dir, "bin", DENO_ENGINE));
    chmodSync(join(dir, "bin", DENO_ENGINE), 0o700);
    const engine = provisionedDeno(join(dir, "bin"));
    expect(engine).toEqual({ resolved: join(dir, "bin", DENO_ENGINE), realpath: realpathSync(join(dir, "bin", DENO_ENGINE)) });
    const refusal = refusalOf(() => pinnedDenoDigest(engine, `sha256:${"0".repeat(64)}`));
    expectCode(refusal, "rf_tsx_deno_mismatch");
    expect(existsSync(marker)).toBe(false);
  });

  it("a path that is not printable ASCII is echoed as <unrecognized>, never verbatim", () => {
    expect(echoPath("/opt/tools/engine/2.9.7/bin/engine")).toBe("/opt/tools/engine/2.9.7/bin/engine");
    const dir = scratch("deno-echo-");
    const marker = join(dir, "executed");
    const odd = join(dir, `odd${String.fromCodePoint(0xe9)}`, "shims");
    plantEngine(odd, marker);
    const refusal = refusalOf(() => provisionedDeno(odd));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain("the PATH-resolved deno <unrecognized> (realpath <unrecognized>)");
    expect(refusal.message).not.toContain(String.fromCodePoint(0xe9));
    expect(existsSync(marker)).toBe(false);
  });
});

/** The trees a lane runs or takes instructions from, each with a floor below its count at the cut's base (2, 2, 1, 2, 7, 117, 778, 67 files). */
const LANE_ROOTS: readonly { readonly root: string; readonly floor: number }[] = [
  { root: ".github", floor: 1 },
  { root: ".agents", floor: 1 },
  { root: ".pi", floor: 1 },
  { root: ".codex", floor: 1 },
  { root: "examples", floor: 5 },
  { root: "src", floor: 100 },
  { root: "test", floor: 500 },
  { root: "qa", floor: 55 },
];
/**
 * The tracked top-level directories the walk leaves out, each with why. With LANE_ROOTS they partition the repository's
 * tracked top-level directories, read from git (an anchor outside this census), so a tree dropped from the walk and from
 * every literal of this file still reds until it is named here with a reason.
 */
const UNWALKED_ROOTS: readonly { readonly root: string; readonly why: string }[] = [
  { root: ".beads", why: "the bd issue export: bead records, never a lane step (this bead's exported notes name install shapes)" },
  { root: "docs", why: "documentation, never a lane step: the docs07 census binds its Deno sentence, and receipts quote measured runs" },
  { root: "media", why: "a demo video and a screenshot" },
  { root: "new-feedback", why: "findings filed for upstream tools: prose, never a lane step" },
  { root: "vendor", why: "the vendored SDK tarballs package.json installs as file: dependencies, their README and their lock" },
];

interface LaneWalk {
  readonly files: readonly string[];
  readonly counts: Readonly<Record<string, number>>;
  readonly symlinks: readonly string[];
  readonly hits: readonly string[];
}

const byName = (a: { readonly name: string }, b: { readonly name: string }): number => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

/** Every regular file under `root/dir`, as repository-relative paths in sorted order; symlinks are listed apart, never followed. */
function walk(root: string, dir: string, symlinks: string[]): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true }).sort(byName)) {
    const path = join(dir, entry.name);
    if (entry.isSymbolicLink()) symlinks.push(path);
    else if (entry.isDirectory()) files.push(...walk(root, path, symlinks));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

/**
 * The lane census over `root`: every regular file at the root in sorted order (a root symlink is neither followed nor
 * listed), then each LANE_ROOTS tree; the per-tree counts, the symlinks inside the trees and every install hit as
 * "<file>:<line>:<shape>".
 */
function laneCensus(root: string): LaneWalk {
  const symlinks: string[] = [];
  const files = readdirSync(root, { withFileTypes: true })
    .sort(byName)
    .filter(entry => entry.isFile())
    .map(entry => entry.name);
  const counts: Record<string, number> = { root: files.length };
  for (const { root: tree } of LANE_ROOTS) {
    const found = existsSync(join(root, tree)) ? walk(root, tree, symlinks) : [];
    counts[tree] = found.length;
    files.push(...found);
  }
  const hits = files.flatMap(file => denoInstallHits(readFileSync(join(root, file), "utf8")).map(hit => `${file}:${hit}`));
  return { files, counts, symlinks, hits };
}

let rootWalk: LaneWalk | undefined;
/** The lane census over the repository, walked once for every case that reads it. */
function rootCensus(): LaneWalk {
  rootWalk ??= laneCensus(ROOT);
  return rootWalk;
}

/** One planted control per shape, composed at run time so this file's own lines never spell one. */
const PLANTS: readonly { readonly shape: string; readonly line: string }[] = [
  { shape: "I1", line: ["curl -fsSL https://deno", "land/install.sh | sh"].join(".") },
  { shape: "I2", line: ["curl -fsSLO https://dl", "deno", "land/release/v2.9.7/deno-x86_64-unknown-linux-gnu.zip"].join(".") },
  { shape: "I3", line: ["mise", "use", "-g", "deno@2.9.7"].join(" ") },
  { shape: "I4", line: ["npm", "install", "-g", "deno"].join(" ") },
  { shape: "I5", line: [DENO_ENGINE, "upgrade", "2.9.7"].join(" ") },
  { shape: "I6", line: ["      - uses: denoland/setup", "deno@v2"].join("-") },
];
/** One more planted control per alternative a shape adds beyond its first, each read as that shape only. */
const EXTRA_PLANTS: readonly { readonly shape: string; readonly line: string }[] = [
  { shape: "I2", line: ["gh", "release", "download", "v2.9.7", "--repo", ["denoland", DENO_ENGINE].join("/")].join(" ") },
  { shape: "I4", line: ["npx", "-y", DENO_ENGINE, "--version"].join(" ") },
  { shape: "I4", line: ["brew", "install", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["apk", "add", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["pip", "install", `${DENO_ENGINE}==2.9.7`].join(" ") },
  { shape: "I4", line: ["nix", "profile", "install", `nixpkgs#${DENO_ENGINE}`].join(" ") },
  { shape: "I6", line: ["FROM", `denoland/${DENO_ENGINE}:2.9.7`].join(" ") },
];
/** The tokens each shape names beyond its first planted control, so dropping one alternative reds its control. */
const MANAGERS: readonly string[] = ["mise", "rtx", "asdf", "proto", "vfox"];
const MANAGER_VERBS: readonly string[] = ["install", "use", "exec", "x", "i", "plugin add", "global", "local"];
const JS_MANAGERS: readonly string[] = ["npm", "pnpm", "yarn", "bun"];
const JS_VERBS: readonly string[] = ["i", "install", "add"];
const OS_MANAGERS: readonly string[] = ["brew", "cargo", "snap", "choco", "scoop", "winget", "apt-get", "apt", "dnf", "yum", "pacman", "nix-env", "apk", "pkg", "port"];
const OS_VERBS: readonly (readonly [string, string])[] = [["port", "install"], ["apk", "add"], ["pacman", "-S"], ["nix-env", "-iA"]];
const PY_MANAGERS: readonly string[] = ["pip", "pip3", "pipx", "uv tool", "uv pip"];
const NIX_VERBS: readonly string[] = ["profile install", "shell", "run"];
const TOKEN_PLANTS: readonly { readonly shape: string; readonly line: string }[] = [
  { shape: "I1", line: ["curl -fsSL https://deno", "land/x/install/install.sh | sh"].join(".") },
  { shape: "I2", line: ["curl -fsSLO https://github", "com/denoland/deno/releases/download/v2.9.7/deno-x86_64-unknown-linux-gnu.zip"].join(".") },
  ...MANAGERS.map(manager => ({ shape: "I3", line: [manager, "install", `${DENO_ENGINE}@2.9.7`].join(" ") })),
  ...MANAGER_VERBS.map(verb => ({ shape: "I3", line: ["mise", verb, DENO_ENGINE].join(" ") })),
  ...JS_MANAGERS.map(manager => ({ shape: "I4", line: [manager, "add", DENO_ENGINE].join(" ") })),
  ...JS_VERBS.map(verb => ({ shape: "I4", line: ["npm", verb, "-g", DENO_ENGINE].join(" ") })),
  ...OS_MANAGERS.map(manager => ({ shape: "I4", line: [manager, "install", DENO_ENGINE].join(" ") })),
  ...OS_VERBS.map(([manager, verb]) => ({ shape: "I4", line: [manager, verb, `nixpkgs.${DENO_ENGINE}`].join(" ") })),
  ...PY_MANAGERS.map(manager => ({ shape: "I4", line: [manager, "install", DENO_ENGINE].join(" ") })),
  ...NIX_VERBS.map(verb => ({ shape: "I4", line: ["nix", verb, `nixpkgs#${DENO_ENGINE}`].join(" ") })),
  { shape: "I5", line: [DENO_ENGINE.toUpperCase(), "Upgrade"].join(" ") },
  { shape: "I6", line: ["image:", `denoland/${DENO_ENGINE}:2.9.7`].join(" ") },
  { shape: "I6", line: ["FROM", `docker.io/denoland/${DENO_ENGINE}:2.9.7`].join(" ") },
];
/** The frozen count of planted controls per shape (rule 16): PLANTS, EXTRA_PLANTS and TOKEN_PLANTS together, in shape order. */
const FROZEN_SHAPE_PLANTS: readonly string[] = ["I1:2", "I2:3", "I3:14", "I4:40", "I5:2", "I6:4"];
/**
 * The named residuals' quiet rows: R-MIRROR (an archive from a host no shape names), R-COMPOSED (a planted control's own
 * source line) and R-UNNAMED-MANAGER (a package manager no shape names, and a version manager that installs the engine
 * without naming it).
 */
const RESIDUAL_QUIET: readonly { readonly id: string; readonly line: string }[] = [
  { id: "R-MIRROR", line: ["curl -fsSLO https://mirror", "example", `invalid/engines/${DENO_ENGINE}-2.9.7.zip`].join(".") },
  { id: "R-COMPOSED", line: '  { shape: "I3", line: ["mise", "use", "-g", "deno@2.9.7"].join(" ") },' },
  { id: "R-UNNAMED-MANAGER", line: ["zypper", "install", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-MANAGER", line: ["dvm", "install", "2.9.7"].join(" ") },
];
/** Lines that name the engine or a manager without installing anything: each reads quiet (the docs/07 paragraph is read by the anchor case). */
const QUIET: readonly string[] = [["mise", "exec", "--", "pnpm", "exec", "vitest", "run"].join(" "), [DENO_ENGINE, "--version"].join(" "), ["npm", "install", "--no-audit"].join(" ")];

const DOCS_FILE = "docs/workbench/07-native-integrations.md";
/** The docs/07 Deno sentence's list of the command families the lane census reads. */
const DOCS_FAMILIES = /no Pi lane installs it \(the lane census reads the root files and the lane trees for six command families: ([^()]+)\):/g;
/** The labels of an "A, B, ..., E and F" list, in order. */
function familiesOf(list: string): string[] {
  const parts = list.split(", ");
  const last = parts.pop() ?? "";
  return [...parts, ...last.split(" and ")];
}

describe(DENO_LANE_SUITE, () => {
  it("the walk reads every regular file at the repository root and the .github, .agents, .pi, .codex, examples, src, test and qa trees above their floors, this file, the helper and the tier among them", () => {
    const census = rootCensus();
    for (const { root, floor } of LANE_ROOTS) expect(census.counts[root] ?? 0, root).toBeGreaterThanOrEqual(floor);
    expect(LANE_ROOTS.map(entry => entry.root)).toEqual([".github", ".agents", ".pi", ".codex", "examples", "src", "test", "qa"]);
    const anchors = [".github/workflows/ci.yml", ".agents/skills/beads/SKILL.md", ".pi/agents/auditor.md", ".codex/config.toml", "examples/agent-tool-description.md", "src/workbench/providers/reactivefiber.ts", SELF, "qa/workbench/receipts-index.mjs"];
    expect(LANE_ROOTS.map(entry => anchors.filter(anchor => anchor.startsWith(`${entry.root}/`)).length)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
    for (const file of ["AGENTS.md", "forge.toml", "package.json", "vitest.config.ts", "vitest.rf-tsx.config.ts", ...anchors, HELPER, TIER]) expect(census.files, file).toContain(file);
    expect(census.symlinks).toEqual([]);
  });

  it("the walked trees and UNWALKED_ROOTS, each named with why, partition the repository's tracked top-level directories, and the walk reads every tracked root file (the git index, an anchor outside this census)", () => {
    const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 })
      .split("\0")
      .filter(path => path !== "");
    const trees = [...new Set(tracked.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort();
    const walked = LANE_ROOTS.map(entry => entry.root);
    expect(UNWALKED_ROOTS.filter(entry => walked.includes(entry.root) || entry.why === "")).toEqual([]);
    expect([...walked, ...UNWALKED_ROOTS.map(entry => entry.root)].sort()).toEqual(trees);
    const census = rootCensus();
    expect(tracked.filter(path => !path.includes("/") && !census.files.includes(path))).toEqual([]);
  });

  it("no walked file carries a Deno install command: 0 hits of the six shapes, this file and the helper judged with the rest", () => {
    expect(DENO_INSTALL_SHAPES.map(shape => shape.id)).toEqual(["I1", "I2", "I3", "I4", "I5", "I6"]);
    expect(rootCensus().hits).toEqual([]);
  });

  it("each shape reads its planted control and only that shape, and the quiet lines read nothing", () => {
    expect(PLANTS.map(plant => plant.shape)).toEqual(DENO_INSTALL_SHAPES.map(shape => shape.id));
    for (const plant of PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    for (const plant of EXTRA_PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    expect(TOKEN_PLANTS).toHaveLength(2 + MANAGERS.length + MANAGER_VERBS.length + JS_MANAGERS.length + JS_VERBS.length + OS_MANAGERS.length + OS_VERBS.length + PY_MANAGERS.length + NIX_VERBS.length + 3);
    for (const plant of TOKEN_PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    for (const line of QUIET) expect(denoInstallHits(line), line).toEqual([]);
    expect(RESIDUAL_QUIET.map(residual => residual.id)).toEqual(["R-MIRROR", "R-COMPOSED", "R-UNNAMED-MANAGER", "R-UNNAMED-MANAGER"]);
    for (const residual of RESIDUAL_QUIET) expect(denoInstallHits(residual.line), residual.id).toEqual([]);
    expect(PLANTS.find(plant => plant.shape === "I3")?.line).toBe(["mise", "use", "-g", "deno@2.9.7"].join(" "));
    expect(denoInstallHits(["quiet", PLANTS[2]?.line ?? "", "quiet", PLANTS[4]?.line ?? ""].join("\n"))).toEqual(["2:I3", "4:I5"]);
  });

  it("a planted install line in a lane file reds the census, naming the file, the line and the shape", () => {
    const dir = scratch("deno-lane-");
    writeFileSync(join(dir, "AGENTS.md"), `# Agents\n\nRun ${PLANTS[4]?.line ?? ""} before the tier.\n`);
    writeFileSync(join(dir, "forge.toml"), `[build.commands.setup]\ncommand = "${PLANTS[0]?.line ?? ""}"\n`);
    writeFileSync(join(dir, "package.json"), `{\n  "scripts": {\n    "pretest": "${PLANTS[3]?.line ?? ""}"\n  }\n}\n`);
    writeFileSync(join(dir, "vitest.config.ts"), "export default {};\n");
    mkdirSync(join(dir, ".github", "workflows"), { recursive: true });
    writeFileSync(join(dir, ".github", "workflows", "ci.yml"), `steps:\n${PLANTS[5]?.line ?? ""}\n`);
    mkdirSync(join(dir, "examples"));
    writeFileSync(join(dir, "examples", "setup.md"), `${PLANTS[1]?.line ?? ""}\n`);
    mkdirSync(join(dir, "qa"));
    writeFileSync(join(dir, "qa", "provision.mjs"), `execSync("${PLANTS[2]?.line ?? ""}");\n`);
    symlinkSync(join(dir, "qa", "provision.mjs"), join(dir, "qa", "linked.mjs"));
    symlinkSync(join(dir, "AGENTS.md"), join(dir, "linked.md"));
    const census = laneCensus(dir);
    expect(census.hits).toEqual(["AGENTS.md:3:I5", "forge.toml:2:I1", "package.json:3:I4", ".github/workflows/ci.yml:2:I6", "examples/setup.md:1:I2", "qa/provision.mjs:1:I3"]);
    expect(census.symlinks).toEqual(["qa/linked.mjs"]);
    expect(census.files.slice(0, 4)).toEqual(["AGENTS.md", "forge.toml", "package.json", "vitest.config.ts"]);
    expect(census.files).not.toContain("linked.md");
  });

  it("the six shapes are the six command families the docs/workbench/07 Deno sentence names, label for label in order, each with its frozen count of planted controls, and that sentence's paragraph reads quiet (an anchor outside this census)", () => {
    const docs = readFileSync(join(ROOT, DOCS_FILE), "utf8");
    const lists = [...docs.matchAll(DOCS_FAMILIES)];
    expect(lists).toHaveLength(1);
    const [list] = lists;
    expect(DENO_INSTALL_SHAPES.map(shape => shape.label)).toEqual(familiesOf(list?.[1] ?? ""));
    const planted = [...PLANTS, ...EXTRA_PLANTS, ...TOKEN_PLANTS];
    expect(DENO_INSTALL_SHAPES.map(shape => `${shape.id}:${planted.filter(plant => plant.shape === shape.id).length}`)).toEqual(FROZEN_SHAPE_PLANTS);
    expect(planted.filter(plant => !DENO_INSTALL_SHAPES.some(shape => shape.id === plant.shape))).toEqual([]);
    const paragraph = docs.split("\n").filter(line => line.includes(list?.[0] ?? "\0"));
    expect(paragraph).toHaveLength(1);
    expect(denoInstallHits(paragraph[0] ?? "")).toEqual([]);
  });
});
