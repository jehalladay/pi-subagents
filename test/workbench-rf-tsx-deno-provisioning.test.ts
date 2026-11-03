/**
 * wb-70xe (RF-NATIVE-TSX-COMPONENTS-R2): the operator provisions Deno per RFCLI ruling A4 and no Pi lane installs it.
 *
 * Acceptance shape (the owner filing's notes on the bead): (a) the rf-preview-tsx tier's success row records the realpath of
 * the PATH-resolved deno and holds it to the installed rf's runtime-lock.json engine pin, refusing typed (never a silent
 * skip) a shim-resolved or mismatched binary; (b) one docs/workbench sentence, bound by the docs07 census (row R10); (c)
 * falsifiers: a Pi lane installing deno, or a receipt whose resolved deno differs from the lock pin, is red.
 *
 * This file holds two parts. The first pins the identity reading's refusals and passes (test/helpers/rf-tsx-deno.ts) on
 * scratch files, none of them ever executed: each planted engine is a text file whose body, if any shell ever ran it,
 * would write a marker (a text file without a #! line, except the #!/bin/sh script case's), and every case that plants
 * one asserts the marker is absent. Every refusal case reads its typed code as a literal, both as the refusal's reason
 * and as the head of its message. Beside the tier's members it pins: the echo rule over its whole class range and its
 * length bound (verbatim: a printable path holding a space and a tilde, U+0020, U+007E and 4096 characters;
 * <unrecognized>: 4097 characters, an empty string, NUL, TAB, LF, ESC, US, DEL, U+0080, a Latin-1 letter and a character
 * past U+FFFF), the filesystem's path classes among them through real scratch paths in a refusal message; manager
 * binaries named mise, deno-shim, Deno, DENO, mise-deno, xdeno and dino refused as other names than deno; a shims
 * directory as the file's parent and two levels above it, at each of the two positions on the resolved path alone, on the
 * realpath alone and on both, while a directory named Shims, shim, myshims or shims2 is not the mark; resolveOnPath
 * passing over, in PATH order, a directory, a symlink to a directory, a non-executable file and a broken symlink before
 * the first executable file; a #!/bin/sh script refused as the script mark, while a first byte # without a ! after it is
 * not the mark; and the pin f*64 and pins one hex off the measured digest at its first, 33rd and last position. The
 * empty-PATH branch of resolveOnPath and its relative read of an empty PATH entry are NOT CLAIMED by a falsifier: the
 * repository root holds no deno, so its working-directory lookup, a skipped entry and shutil.which's None read alike
 * there. The tier wiring of the same reading (refused before rf runs, refused after the render reports
 * the pin, the engine line's fields) is pinned by the wb-70xe cases of test/workbench-rf-tsx-tier.test.ts. NOT CLAIMED by
 * the identity cases (the first three forms named here were the deferred scope of wb-j4sm, the rule-19 structural exit
 * child of this bead (ruling R-B292), whose own census of this reading, test/workbench-rf-tsx-deno-identity-census.test.ts,
 * landed with it and states its own claims): a #! script whose third byte is not / (one that opens with #! and a space,
 * or with #! and a relative interpreter), a shims directory more than two levels above the file, a manager name that
 * differs from deno only by an extension (such as deno.exe) or by surrounding whitespace, the shim reason's echo of a
 * realpath name that is not printable ASCII (no pinned manager name holds one), the order and the joining of two or more
 * shim reasons (no pinned case carries two), and any other manager name, shims position, script form or digest position
 * outside the pinned members.
 *
 * The second part is the lane census for (c)'s first clause. Its walk lists every regular file at the repository root
 * (AGENTS.md, forge.toml, package.json and the root vitest configs among them) and in the .github, .agents, .pi, .codex,
 * examples, src, test and qa trees; its hit read takes in each listed file whole; and that hit read reports no hit of the
 * six closed shapes in DENO_INSTALL_SHAPES over the walked set. This file and the helper are walked and judged, never
 * exempt, so every planted control below is composed at run time and no line of this file spells a shape. Three anchors
 * sit outside this census's own literals: the repository's git index (the walked trees and UNWALKED_ROOTS, each named
 * with why, must partition its tracked top-level directories, and the walk must list every tracked root file and every
 * tracked file under the walked trees); the filesystem (the hit read's record for each walked file must equal the file's
 * size on disk and its line count, read apart from the census, so a read that skips a file or stops early reds on the
 * real tree); and the docs/workbench/07 Deno sentence, which names the six command families the shapes must equal label
 * for label. A scratch tree pins the hit read's reach at the lines it plants: each is reported, by file, line and shape,
 * from the root files, every walked tree, a file of every kind (extension) the real walk reads, a first line, a last line
 * with no newline, a line past the first 64 KiB of the largest planted file and the end of a line longer than 64 KiB. Each
 * shape is held to its planted controls (PLANTS, EXTRA_PLANTS, TOKEN_PLANTS and SUBFORM_PLANTS, counted per shape in
 * FROZEN_SHAPE_PLANTS): one per alternative, and one per flexible part of a shape's source that a real-form line
 * traverses, so a one-edit narrowing of a planted form reds its control. Outside the walk, the seat's scan of every
 * tracked file at trunk 134479ca (1123 files) reads 7 matcher hits, none in a lane: this bead's exported row in
 * .beads/issues.jsonl (all six shapes: its notes quote the gate's witness lines) and
 * docs/workbench/receipts/wb-693.7.md:11 (I3, prose naming the mise install of the engine); a record, not a claim of this
 * census.
 *
 * NOT CLAIMED by this census: any reach of the hit read past the cases pinned under DENO_LANE_SUITE (the describe's
 * words, no Pi lane carries a Deno install command, name the census's subject, not a reach past those cases); untracked
 * top-level directories (node_modules, .forge, a .git directory), the trees UNWALKED_ROOTS names and any symlink at the
 * repository root (a worktree may link its node_modules; root links are never followed); a Deno package declared as an
 * npm dependency (package.json and package-lock.json are read for the six command shapes only); Pi lane session
 * transcripts (the census reads the tracked lane definitions and trees); a form of a shape that no planted control spells
 * (the census claims the planted forms, not every spelling a shape's source admits); a one-edit widening of a shape that
 * reads no quiet row, no near-miss row and no walked line (a widened shape reads more lines, never fewer); a filter of
 * the reported hits, or of the lines offered to the shapes, by a property no scratch plant varies (the forms named here
 * were the deferred scope of wb-j4sm, ruling R-B292, whose landed census states its own claims: a hit in a file larger
 * than the largest planted file, the gate's file over 128
 * KiB among them; a hit past line 2049, the planted line farthest down, the gate's line past 4096 among them; a hit in a
 * dot-named file; and a line led by #); a second hit on a line that already holds one, which no planted line carries;
 * inside one shape, a coordinated removal of one alternative (a manager, a verb, a host) from the matcher, its planted
 * controls and the frozen count together, since the docs anchor names the families, not their tokens; and, inside one
 * residual family, a coordinated removal of one quiet row and the family's frozen row count together, since the helper's
 * header names the families, not their rows. NAMED RESIDUALS, the install forms no shape reads, each a named family with
 * its pinned quiet rows in RESIDUAL_QUIET (a matcher that starts reading one reds it) and each named in the helper's
 * header: R-MIRROR, an engine archive or installer script from a host no shape names; R-COMPOSED, an install command
 * assembled at run time, which no source line spells; R-UNNAMED-MANAGER, an install through a version or package manager
 * no shape names; R-UNNAMED-VERB, a named manager's verb, subcommand or runner its shape does not spell; R-DECLARED-TOOL,
 * the engine declared in a version manager's tool file; R-IMAGE-FORM, the engine image used by a form the image shape
 * does not spell; R-THIRD-PARTY-ACTION, a CI setup action from another owner; R-RELEASE-API, the release metadata read
 * through the forge's REST API; R-SPLIT-LINE, an install command continued over several lines.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { delimiter, extname, join, sep } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  DENO_ENGINE,
  DENO_INSTALL_SHAPES,
  DENO_LANE_SUITE,
  DenoIdentityRefusal,
  denoInstallHits,
  denoInstallScan,
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

/** The character at `code`, built at run time so no source line holds it raw. */
function cp(code: number): string {
  return String.fromCodePoint(code);
}

describe("wb-70xe identity reading: the PATH-resolved deno, never executed (test/helpers/rf-tsx-deno.ts)", () => {
  it("resolveOnPath reads PATH in order: a directory, a non-executable file and a broken symlink are passed over, the first executable file wins", () => {
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

  it("resolveOnPath passes over a PATH entry whose deno is a symlink to a directory (the link is followed to the directory), and the next entry's executable file wins", () => {
    const dir = scratch("deno-which-dirlink-");
    const marker = join(dir, "executed");
    mkdirSync(join(dir, "target", DENO_ENGINE), { recursive: true });
    mkdirSync(join(dir, "a"));
    symlinkSync(join(dir, "target", DENO_ENGINE), join(dir, "a", DENO_ENGINE));
    const engine = plantEngine(join(dir, "b"), marker);
    const path = [join(dir, "a"), join(dir, "b")].join(delimiter);
    expect(resolveOnPath(DENO_ENGINE, path)).toBe(engine);
    expect(resolveOnPath(DENO_ENGINE, join(dir, "a"))).toBeUndefined();
    expect(provisionedDeno(path)).toEqual({ resolved: engine, realpath: realpathSync(engine) });
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

  it("a deno that is a symlink to a version manager's binary named mise is refused typed rf_tsx_deno_shim, naming the realpath's name", () => {
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

  it("a deno whose parent directory is shims is refused typed rf_tsx_deno_shim, even when its name and bytes look like the engine", () => {
    const dir = scratch("deno-shims-");
    const marker = join(dir, "executed");
    plantEngine(join(dir, "shims"), marker);
    const refusal = refusalOf(() => provisionedDeno(join(dir, "shims")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain("it sits in a shims directory");
    expect(refusal.message).not.toContain("its realpath names");
    expect(existsSync(marker)).toBe(false);
  });

  it("a PATH entry that is a shims directory is refused typed rf_tsx_deno_shim on the resolved path alone, though its symlink's target is an engine-named binary outside one", () => {
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

  it("a symlink outside any shims directory whose realpath's parent directory is shims is refused typed rf_tsx_deno_shim on the realpath alone", () => {
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

  it("a deno that is a #!/bin/sh script is refused typed rf_tsx_deno_shim, never executed", () => {
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

  it("a resolved engine whose sha256 differs from the reported pin f*64 is refused typed rf_tsx_deno_mismatch, naming both digests", () => {
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

  it.each<[string, string, boolean]>([
    ["a printable path holding a space and a tilde", "/opt/my tools~2.9.7/bin/deno", true],
    ["U+0020 space alone, the first printable character", cp(0x20), true],
    ["U+007E tilde alone, the last printable character", cp(0x7e), true],
    ["4096 printable characters, the length bound", "a".repeat(4096), true],
    ["4097 printable characters, past the length bound", "a".repeat(4097), false],
    ["an empty string", "", false],
    ["NUL (U+0000)", `/opt/a${cp(0x00)}b/deno`, false],
    ["TAB (U+0009)", `/opt/a${cp(0x09)}b/deno`, false],
    ["LF (U+000A)", `/opt/a${cp(0x0a)}b/deno`, false],
    ["ESC (U+001B)", `/opt/a${cp(0x1b)}b/deno`, false],
    ["US (U+001F), the last C0 control", `/opt/a${cp(0x1f)}b/deno`, false],
    ["DEL (U+007F)", `/opt/a${cp(0x7f)}b/deno`, false],
    ["U+0080, the first character past DEL", `/opt/a${cp(0x80)}b/deno`, false],
    ["a Latin-1 letter (U+00E9)", `/opt/a${cp(0xe9)}b/deno`, false],
    ["a character past U+FFFF (U+1F600)", `/opt/a${cp(0x1f600)}b/deno`, false],
  ])("echoPath on %s: verbatim only for 1 to 4096 characters of printable ASCII (U+0020-U+007E), otherwise <unrecognized>", (_label, value, verbatim) => {
    expect(echoPath(value)).toBe(verbatim ? value : "<unrecognized>");
  });

  it.each<[string, string]>([
    ["a Latin-1 letter (U+00E9)", cp(0xe9)],
    ["a TAB (U+0009)", cp(0x09)],
    ["an LF (U+000A)", cp(0x0a)],
    ["an ESC (U+001B)", cp(0x1b)],
    ["a US (U+001F)", cp(0x1f)],
    ["a DEL (U+007F)", cp(0x7f)],
  ])("a resolved path holding %s, not printable ASCII, is echoed as <unrecognized> in a refusal, never verbatim", (_label, char) => {
    const dir = scratch("deno-echo-");
    const marker = join(dir, "executed");
    const odd = join(dir, `odd${char}`, "shims");
    plantEngine(odd, marker);
    const refusal = refusalOf(() => provisionedDeno(odd));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain("the PATH-resolved deno <unrecognized> (realpath <unrecognized>)");
    expect(refusal.message).not.toContain(char);
    expect(existsSync(marker)).toBe(false);
  });

  it("a resolved path of printable ASCII, a space and a tilde among its characters, is echoed verbatim in a refusal", () => {
    const dir = scratch("deno-echo-printable-");
    const marker = join(dir, "executed");
    const printable = join(dir, "my tools~2.9.7", "shims");
    const engine = plantEngine(printable, marker);
    const refusal = refusalOf(() => provisionedDeno(printable));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`the PATH-resolved deno ${join(printable, DENO_ENGINE)} (realpath ${realpathSync(engine)})`);
    expect(existsSync(marker)).toBe(false);
  });

  it.each<[string, string]>([
    ["deno-shim (a suffix)", "deno-shim"],
    ["Deno (another case)", "Deno"],
    ["DENO (another case)", "DENO"],
    ["mise-deno (a prefix)", "mise-deno"],
    ["xdeno (a prefix with no separator)", "xdeno"],
    ["dino (the engine's length, another name)", "dino"],
  ])("a deno that is a symlink to a manager binary named %s is refused typed rf_tsx_deno_shim: that realpath name is another name than deno", (_label, name) => {
    const dir = scratch("deno-manager-name-");
    const marker = join(dir, "executed");
    const manager = plantEngine(join(dir, "manager", "bin"), marker, name);
    mkdirSync(join(dir, "path"));
    symlinkSync(manager, join(dir, "path", DENO_ENGINE));
    const refusal = refusalOf(() => provisionedDeno(join(dir, "path")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`its realpath names ${name}, not deno`);
    expect(existsSync(marker)).toBe(false);
  });

  it("a deno under a shims directory two levels up (manager/shims/bin/deno) is refused typed rf_tsx_deno_shim, on its resolved path and on a symlink's realpath", () => {
    const dir = scratch("deno-shims-nested-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "manager", "shims", "bin"), marker);
    const direct = refusalOf(() => provisionedDeno(join(dir, "manager", "shims", "bin")));
    expectCode(direct, "rf_tsx_deno_shim");
    expect(direct.message).toContain("is a version-manager shim (it sits in a shims directory)");
    mkdirSync(join(dir, "bin"));
    symlinkSync(engine, join(dir, "bin", DENO_ENGINE));
    const linked = refusalOf(() => provisionedDeno(join(dir, "bin")));
    expectCode(linked, "rf_tsx_deno_shim");
    expect(linked.message).toContain(`(realpath ${realpathSync(engine)}) is a version-manager shim (it sits in a shims directory)`);
    expect(existsSync(marker)).toBe(false);
  });

  it("a PATH entry two levels under a shims directory (manager/shims/bin) is refused typed rf_tsx_deno_shim on the resolved path alone, though its symlink's target is an engine-named binary outside one", () => {
    const dir = scratch("deno-shims-resolved-nested-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "tools", "bin"), marker);
    mkdirSync(join(dir, "manager", "shims", "bin"), { recursive: true });
    symlinkSync(engine, join(dir, "manager", "shims", "bin", DENO_ENGINE));
    expect(realpathSync(engine).split(sep)).not.toContain("shims");
    const refusal = refusalOf(() => provisionedDeno(join(dir, "manager", "shims", "bin")));
    expectCode(refusal, "rf_tsx_deno_shim");
    expect(refusal.message).toContain(`the PATH-resolved deno ${join(dir, "manager", "shims", "bin", DENO_ENGINE)} (realpath ${realpathSync(engine)}) is a version-manager shim (it sits in a shims directory)`);
    expect(existsSync(marker)).toBe(false);
  });

  it.each<[string]>([["Shims"], ["shim"], ["myshims"], ["shims2"]])("a deno under a directory named %s passes the pre-render half: a directory of that name is not the shims mark", dirName => {
    const dir = scratch("deno-shims-near-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, dirName), marker);
    expect(provisionedDeno(join(dir, dirName))).toEqual({ resolved: join(dir, dirName, DENO_ENGINE), realpath: realpathSync(engine) });
    expect(existsSync(marker)).toBe(false);
  });

  it("an engine whose first byte is # but whose second is not ! passes the pre-render half: a # alone is not the script mark", () => {
    const dir = scratch("deno-hash-");
    const marker = join(dir, "executed");
    mkdirSync(join(dir, "bin"));
    writeFileSync(join(dir, "bin", DENO_ENGINE), `#\necho executed > '${marker}'\n`);
    chmodSync(join(dir, "bin", DENO_ENGINE), 0o700);
    expect(provisionedDeno(join(dir, "bin")).resolved).toBe(join(dir, "bin", DENO_ENGINE));
    expect(existsSync(marker)).toBe(false);
  });

  it.each<[string, number]>([
    ["its first hex", 0],
    ["its 33rd hex", 32],
    ["its last hex", 63],
  ])("a pin that differs from the measured sha256 only in %s is refused typed rf_tsx_deno_mismatch", (_label, index) => {
    const dir = scratch("deno-mismatch-one-");
    const marker = join(dir, "executed");
    const engine = plantEngine(join(dir, "bin"), marker);
    const measured = sha256Of(engine);
    const pinned = `${measured.slice(0, index)}${measured.charAt(index) === "0" ? "1" : "0"}${measured.slice(index + 1)}`;
    expect(pinned).not.toBe(measured);
    const refusal = refusalOf(() => pinnedDenoDigest(provisionedDeno(join(dir, "bin")), `sha256:${pinned}`));
    expectCode(refusal, "rf_tsx_deno_mismatch");
    expect(refusal.message).toContain(`has sha256 ${measured}, not the sha256 ${pinned} the installed rf's runtime lock pins for this host`);
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
  /** One record per file the hit read took in, in walk order: "<file>:<bytes read>:<lines the shapes were offered>". */
  readonly read: readonly string[];
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
 * listed), then each LANE_ROOTS tree; the per-tree counts, the symlinks inside the trees, one read record per walked file
 * (the bytes the hit read took in and the lines it offered the shapes) and every install hit as "<file>:<line>:<shape>".
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
  const scans = files.map(file => {
    const bytes = readFileSync(join(root, file));
    const scan = denoInstallScan(bytes.toString("utf8"));
    return { record: `${file}:${bytes.length}:${scan.lines}`, hits: scan.hits.map(hit => `${file}:${hit}`) };
  });
  return { files, counts, symlinks, read: scans.map(scan => scan.record), hits: scans.flatMap(scan => scan.hits) };
}

/** A whole read of `file` under `root`, measured apart from laneCensus: its size on disk and the lines its text holds. */
function wholeRead(root: string, file: string): string {
  return `${file}:${statSync(join(root, file)).size}:${readFileSync(join(root, file), "utf8").split("\n").length}`;
}

let rootWalk: (LaneWalk & { readonly whole: readonly string[] }) | undefined;
/**
 * The lane census over the repository, walked once for every case that reads it, with `whole`: each walked file's whole
 * read (wholeRead), measured in the same step, so the read record is compared with the files as the walk found them.
 */
function rootCensus(): LaneWalk & { readonly whole: readonly string[] } {
  if (rootWalk === undefined) {
    const census = laneCensus(ROOT);
    rootWalk = { ...census, whole: census.files.map(file => wholeRead(ROOT, file)) };
  }
  return rootWalk;
}

/** A file's kind as the walk sees it: its extension, or "" for a name with none (a dotfile such as .gitignore among them). */
function kindOf(file: string): string {
  return extname(file);
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
const DENO_REPO = ["denoland", DENO_ENGINE].join("/");
const FAKE_COMMIT = "0123456789abcdef0123456789abcdef01234567";
/**
 * One planted control per sub-form a shape reads beyond the controls above: each flexible part of a shape's source (an
 * optional scheme, another path on a named host, a run of arguments or packages between the verb and the engine, a quoted,
 * flagged or versioned engine, a ref, digest or bare image, a run of whitespace between tokens) traversed by a real-form
 * line, so a one-edit narrowing of that part reds its control (U2 of refusal 2, and the seat battery's narrowings).
 */
const SUBFORM_PLANTS: readonly { readonly shape: string; readonly line: string }[] = [
  { shape: "I1", line: ["curl -fsSL deno", "land/install.sh | sh"].join(".") },
  { shape: "I1", line: ["irm https://deno", "land/install.ps1 | iex"].join(".") },
  { shape: "I2", line: ["wget -q dl", "deno", "land/release/v2.9.7/deno-x86_64-unknown-linux-gnu.zip"].join(".") },
  { shape: "I2", line: ["curl -fsSLO https://dl", "deno", `land/canary/${FAKE_COMMIT}/deno-x86_64-unknown-linux-gnu.zip`].join(".") },
  { shape: "I2", line: ["curl -fsSLO https://github", "com/denoland/deno/releases/latest/download/deno-x86_64-unknown-linux-gnu.zip"].join(".") },
  { shape: "I2", line: ["wget -q github", "com/denoland/deno/releases/download/v2.9.7/deno-x86_64-unknown-linux-gnu.zip"].join(".") },
  { shape: "I2", line: ["curl -sSL https://github", "com/denoland/deno/releases/tag/v2.9.7"].join(".") },
  { shape: "I2", line: ["gh", "release", "download", "-R", DENO_REPO, "v2.9.7"].join(" ") },
  { shape: "I2", line: ["gh", "release", "download", "v2.9.7", "--pattern", "deno-x86_64-unknown-linux-gnu.zip", `--repo=${DENO_REPO}`].join(" ") },
  { shape: "I2", line: ["gh", "release", "download", "v2.9.7", "--repo", DENO_REPO].join("  ") },
  { shape: "I3", line: ["mise", "install", "node@22", `${DENO_ENGINE}@2.9.7`].join(" ") },
  { shape: "I3", line: ["mise", "use", "--global", "--verbose", "node@22.11.0", "python@3.12.7", `${DENO_ENGINE}@2.9.7`].join(" ") },
  { shape: "I3", line: ["mise", "use", "-g", `"${DENO_ENGINE}@2.9.7"`].join(" ") },
  { shape: "I3", line: ["mise", "install", `"${DENO_ENGINE}"`].join(" ") },
  { shape: "I3", line: ["asdf", "plugin", "add", DENO_ENGINE].join("  ") },
  { shape: "I4", line: ["npm", "install", "--no-save", "typescript", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["pnpm", "add", "--save-dev", "--save-exact", "typescript@5.9.2", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["npm", "install", "-g", `"${DENO_ENGINE}@2.9.7"`].join(" ") },
  { shape: "I4", line: ["npm", "install", "-g", DENO_ENGINE].join("  ") },
  { shape: "I4", line: ["npx", "--yes", `--package=${DENO_ENGINE}@2.9.7`, DENO_ENGINE, "--version"].join(" ") },
  { shape: "I4", line: ["npx", `${DENO_ENGINE}@2.9.7`, "--version"].join(" ") },
  { shape: "I4", line: ["npx", "-y", DENO_ENGINE, "--version"].join("  ") },
  { shape: "I4", line: ["apt-get", "install", "-y", "--no-install-recommends", "ca-certificates", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["cargo", "install", DENO_ENGINE, "--locked"].join(" ") },
  { shape: "I4", line: ["brew", "install", DENO_ENGINE].join("  ") },
  { shape: "I4", line: ["pip", "install", "--upgrade", "pip", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["pip", "install", "--upgrade", "--user", "--no-cache-dir", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["pip", "install", `"${DENO_ENGINE}==2.9.7"`].join(" ") },
  { shape: "I4", line: ["uv", "tool", "install", DENO_ENGINE].join("  ") },
  { shape: "I4", line: ["nix", "shell", "nixpkgs#nodejs", `nixpkgs#${DENO_ENGINE}`].join(" ") },
  { shape: "I4", line: ["nix", "shell", "nixpkgs#nodejs_22", "nixpkgs#python312", `nixpkgs#${DENO_ENGINE}`].join(" ") },
  { shape: "I4", line: ["nix", "shell", "--file", "'<nixpkgs>'", DENO_ENGINE].join(" ") },
  { shape: "I4", line: ["nix", "profile", "install", `nixpkgs#${DENO_ENGINE}`].join("  ") },
  { shape: "I5", line: [DENO_ENGINE, "upgrade", "--version", "2.9.7"].join(" ") },
  { shape: "I5", line: `"preinstall": "${[DENO_ENGINE, "upgrade"].join(" ")}",` },
  { shape: "I5", line: ["set -e &&", DENO_ENGINE, "upgrade", "rc"].join(" ") },
  { shape: "I5", line: [DENO_ENGINE, "upgrade"].join("  ") },
  { shape: "I6", line: ["      - uses: denoland/setup", `deno@${FAKE_COMMIT}`].join("-") },
  { shape: "I6", line: ["      - uses: 'denoland/setup", "deno@v2'"].join("-") },
  { shape: "I6", line: ["image:", `${DENO_REPO}@sha256:${"0".repeat(64)}`].join(" ") },
  { shape: "I6", line: ["FROM", DENO_REPO].join(" ") },
  { shape: "I6", line: ["  - image:", `${DENO_REPO}:2.9.7`].join(" ") },
  { shape: "I6", line: ["FROM", `${DENO_REPO}:2.9.7`].join("  ") },
];
/** The frozen count of planted controls per shape (rule 16): PLANTS, EXTRA_PLANTS, TOKEN_PLANTS and SUBFORM_PLANTS together, in shape order. */
const FROZEN_SHAPE_PLANTS: readonly string[] = ["I1:4", "I2:11", "I3:19", "I4:58", "I5:6", "I6:10"];
/**
 * The named residuals' quiet rows, one or more per family the helper's header names: install forms no shape reads, each
 * pinned quiet here so a matcher that starts reading one reds its row. R-COMPOSED's row is a planted control's own source
 * line; R-SPLIT-LINE's row is one command over two lines, read as one text.
 */
const RESIDUAL_QUIET: readonly { readonly id: string; readonly line: string }[] = [
  { id: "R-MIRROR", line: ["curl -fsSLO https://mirror", "example", `invalid/engines/${DENO_ENGINE}-2.9.7.zip`].join(".") },
  { id: "R-MIRROR", line: ["curl -fsSL https://deno", "com/install.sh | sh"].join(".") },
  { id: "R-COMPOSED", line: '  { shape: "I3", line: ["mise", "use", "-g", "deno@2.9.7"].join(" ") },' },
  { id: "R-UNNAMED-MANAGER", line: ["zypper", "install", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-MANAGER", line: ["dvm", "install", "2.9.7"].join(" ") },
  { id: "R-UNNAMED-MANAGER", line: ["conda", "install", "-c", "conda-forge", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["yarn", "global", "add", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["brew", "upgrade", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["mise", "upgrade", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["asdf", "set", DENO_ENGINE, "2.9.7"].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["vfox", "add", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["cargo", "binstall", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["nix-shell", "-p", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["pnpm", "dlx", DENO_ENGINE].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["bunx", DENO_ENGINE, "--version"].join(" ") },
  { id: "R-UNNAMED-VERB", line: ["uvx", DENO_ENGINE, "--version"].join(" ") },
  { id: "R-DECLARED-TOOL", line: `${DENO_ENGINE} = "2.9.7"` },
  { id: "R-DECLARED-TOOL", line: [DENO_ENGINE, "2.9.7"].join(" ") },
  { id: "R-IMAGE-FORM", line: ["FROM", "--platform=linux/amd64", `${DENO_REPO}:2.9.7`].join(" ") },
  { id: "R-IMAGE-FORM", line: ["    container:", `${DENO_REPO}:2.9.7`].join(" ") },
  { id: "R-IMAGE-FORM", line: ["docker", "run", "--rm", `${DENO_REPO}:2.9.7`, "--version"].join(" ") },
  { id: "R-IMAGE-FORM", line: ["docker", "pull", `${DENO_REPO}:2.9.7`].join(" ") },
  { id: "R-IMAGE-FORM", line: ["COPY", `--from=${DENO_REPO}:bin-2.9.7`, `/${DENO_ENGINE}`, `/usr/local/bin/${DENO_ENGINE}`].join(" ") },
  { id: "R-IMAGE-FORM", line: ["      - uses:", `docker://${DENO_REPO}:2.9.7`].join(" ") },
  { id: "R-THIRD-PARTY-ACTION", line: ["      - uses: denolib/setup", "deno@v2"].join("-") },
  { id: "R-RELEASE-API", line: ["curl -sL https://api", "github", "com/repos/denoland/deno/releases/latest"].join(".") },
  { id: "R-SPLIT-LINE", line: [["gh", "release", "download", "v2.9.7", "\\"].join(" "), ["   --repo", DENO_REPO].join(" ")].join("\n") },
  { id: "R-SPLIT-LINE", line: [["npm", "install", "-g", "\\"].join(" "), ["   ", DENO_ENGINE].join("")].join("\n") },
];
/** The residual families, in RESIDUAL_QUIET's order: each named in the helper's header, each with at least one quiet row. */
const RESIDUAL_FAMILIES: readonly string[] = ["R-MIRROR", "R-COMPOSED", "R-UNNAMED-MANAGER", "R-UNNAMED-VERB", "R-DECLARED-TOOL", "R-IMAGE-FORM", "R-THIRD-PARTY-ACTION", "R-RELEASE-API", "R-SPLIT-LINE"];
/** The frozen count of quiet rows per residual family (rule 16; wb-70xe cut #4, U5 of refusal 3), in RESIDUAL_FAMILIES' order. */
const FROZEN_RESIDUAL_ROWS: readonly string[] = ["R-MIRROR:2", "R-COMPOSED:1", "R-UNNAMED-MANAGER:3", "R-UNNAMED-VERB:10", "R-DECLARED-TOOL:2", "R-IMAGE-FORM:6", "R-THIRD-PARTY-ACTION:1", "R-RELEASE-API:1", "R-SPLIT-LINE:2"];
/** Lines that name the engine or a manager without installing anything: each reads quiet (the docs/07 paragraph is read by the anchor case). */
const QUIET: readonly string[] = [["mise", "exec", "--", "pnpm", "exec", "vitest", "run"].join(" "), [DENO_ENGINE, "--version"].join(" "), ["npm", "install", "--no-audit"].join(" ")];
/** Lines one edit from a shape: a package whose name starts with the engine's letters, so a shape widened past its trailing word boundary reads it. */
const NEAR_MISS_QUIET: readonly string[] = [["npm", "install", "denodeify"].join(" "), ["pip", "install", "denoiser"].join(" ")];

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
  it("the walk lists every regular file at the repository root and the .github, .agents, .pi, .codex, examples, src, test and qa trees above their floors, this file, the helper and the tier among them", () => {
    const census = rootCensus();
    for (const { root, floor } of LANE_ROOTS) expect(census.counts[root] ?? 0, root).toBeGreaterThanOrEqual(floor);
    expect(LANE_ROOTS.map(entry => entry.root)).toEqual([".github", ".agents", ".pi", ".codex", "examples", "src", "test", "qa"]);
    const anchors = [".github/workflows/ci.yml", ".agents/skills/beads/SKILL.md", ".pi/agents/auditor.md", ".codex/config.toml", "examples/agent-tool-description.md", "src/workbench/providers/reactivefiber.ts", SELF, "qa/workbench/receipts-index.mjs"];
    expect(LANE_ROOTS.map(entry => anchors.filter(anchor => anchor.startsWith(`${entry.root}/`)).length)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
    for (const file of ["AGENTS.md", "forge.toml", "package.json", "vitest.config.ts", "vitest.rf-tsx.config.ts", ...anchors, HELPER, TIER]) expect(census.files, file).toContain(file);
    expect(census.symlinks).toEqual([]);
  });

  it("the walked trees and UNWALKED_ROOTS, each named with why, partition the repository's tracked top-level directories, and the walk lists every tracked root file and every tracked file under the walked trees (the git index, an anchor outside this census)", () => {
    const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 })
      .split("\0")
      .filter(path => path !== "");
    const trees = [...new Set(tracked.filter(path => path.includes("/")).map(path => path.slice(0, path.indexOf("/"))))].sort();
    const walked = LANE_ROOTS.map(entry => entry.root);
    expect(UNWALKED_ROOTS.filter(entry => walked.includes(entry.root) || entry.why === "")).toEqual([]);
    expect([...walked, ...UNWALKED_ROOTS.map(entry => entry.root)].sort()).toEqual(trees);
    const listed = new Set(rootCensus().files);
    expect(tracked.filter(path => !path.includes("/") && !listed.has(path))).toEqual([]);
    const underTrees = tracked.filter(path => walked.some(tree => path.startsWith(`${tree}/`)));
    expect(underTrees.length).toBeGreaterThanOrEqual(LANE_ROOTS.reduce((sum, entry) => sum + entry.floor, 0));
    expect(underTrees.filter(path => !listed.has(path))).toEqual([]);
  });

  it("the hit read takes in every walked file whole: one record per walked file in walk order, each with the file's size on disk in bytes and the count of lines the scan iterated, files past 64 KiB among them (the filesystem, an anchor outside this census)", () => {
    const census = rootCensus();
    expect(census.read).toHaveLength(census.files.length);
    expect(census.read).toEqual(census.whole);
    const large = census.files.filter(file => statSync(join(ROOT, file)).size > 1 << 16);
    expect(large.length, "walked files past 64 KiB").toBeGreaterThanOrEqual(100);
    expect(large).toContain("test/workbench-docs07-provider-rules.census.ts");
  });

  it("the hit read reports no hit of the six shapes over the walked set, this file and the helper judged with the rest", () => {
    expect(DENO_INSTALL_SHAPES.map(shape => shape.id)).toEqual(["I1", "I2", "I3", "I4", "I5", "I6"]);
    expect(rootCensus().hits).toEqual([]);
  });

  it("each shape reads each of its planted controls, its sub-forms included, as that shape only; the quiet lines, the near-miss lines and every residual family's quiet rows read nothing, and the residual families are exactly those the helper's header names, in its order (an anchor outside this census), each with its frozen count of quiet rows", () => {
    expect(PLANTS.map(plant => plant.shape)).toEqual(DENO_INSTALL_SHAPES.map(shape => shape.id));
    for (const plant of PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    for (const plant of EXTRA_PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    expect(TOKEN_PLANTS).toHaveLength(2 + MANAGERS.length + MANAGER_VERBS.length + JS_MANAGERS.length + JS_VERBS.length + OS_MANAGERS.length + OS_VERBS.length + PY_MANAGERS.length + NIX_VERBS.length + 3);
    for (const plant of TOKEN_PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    for (const plant of SUBFORM_PLANTS) expect(denoInstallHits(plant.line), plant.line).toEqual([`1:${plant.shape}`]);
    for (const line of [...QUIET, ...NEAR_MISS_QUIET]) expect(denoInstallHits(line), line).toEqual([]);
    expect([...new Set(RESIDUAL_QUIET.map(residual => residual.id))]).toEqual(RESIDUAL_FAMILIES);
    expect(RESIDUAL_FAMILIES.map(family => `${family}:${RESIDUAL_QUIET.filter(residual => residual.id === family).length}`)).toEqual(FROZEN_RESIDUAL_ROWS);
    for (const residual of RESIDUAL_QUIET) expect(denoInstallHits(residual.line), `${residual.id}: ${residual.line}`).toEqual([]);
    const header = readFileSync(join(ROOT, HELPER), "utf8").split("*/")[0] ?? "";
    const residualPage = header.slice(header.indexOf("NAMED RESIDUALS, the install forms"));
    expect([...residualPage.matchAll(/\bR-[A-Z]+(?:-[A-Z]+)*(?=,)/g)].map(match => match[0])).toEqual(RESIDUAL_FAMILIES);
    expect(PLANTS.find(plant => plant.shape === "I3")?.line).toBe(["mise", "use", "-g", "deno@2.9.7"].join(" "));
    expect(denoInstallHits(["quiet", PLANTS[2]?.line ?? "", "quiet", PLANTS[4]?.line ?? ""].join("\n"))).toEqual(["2:I3", "4:I5"]);
  });

  it("each install line this case plants reds the census, naming the file, the line and the shape: in the root files, in every walked tree, in a file of every kind the real walk reads, on a first line, on a last line with no newline, past the first 64 KiB of the largest planted file and at the end of a line longer than 64 KiB", () => {
    const dir = scratch("deno-lane-");
    const plant = (path: string, text: string): void => {
      mkdirSync(join(dir, path, ".."), { recursive: true });
      writeFileSync(join(dir, path), text);
    };
    const [i1 = "", i2 = "", i3 = "", i4 = "", i5 = "", i6 = ""] = PLANTS.map(entry => entry.line);
    plant("AGENTS.md", `# Agents\n\nRun ${i5} before the tier.\n`);
    plant("forge.toml", `[build.commands.setup]\ncommand = "${i1}"\n`);
    plant("package.json", `{\n  "scripts": {\n    "pretest": "${i4}"\n  }\n}\n`);
    plant("vitest.config.ts", "export default {};\n");
    plant(".github/workflows/ci.yml", `steps:\n${i6}\n`);
    plant(".agents/skills/provision/SKILL.md", `# Provision\n\n${i3}\n`);
    plant(".pi/agents/setup.md", `${i5}\n`);
    plant(".codex/config.toml", `[shell]\nsetup = "${i4}"\n`);
    const kinds = [...new Set(rootCensus().files.map(kindOf))].sort();
    expect(kinds).toEqual(expect.arrayContaining(["", ".json", ".md", ".mjs", ".toml", ".ts", ".yml"]));
    for (const kind of kinds) plant(`examples/kinds/plant${kind}`, `${i2}\n`);
    plant("examples/setup.md", `${i2}\n`);
    plant("src/workbench/long.json", `{"note": "${"x".repeat(1 << 16)} ${i4}"}\n`);
    plant("src/workbench/setup.ts", `export const setup = "${i1}";\n`);
    plant("test/helpers/big.ts", `${"// filler line of the planted large file\n".repeat(2048)}${i2}\n`);
    plant("test/setup.test.ts", `// ${i3}\n`);
    plant("qa/provision.mjs", `execSync("${i3}");\n`);
    plant("qa/tail.sh", `#!/bin/sh\nset -e\n${i1}`);
    symlinkSync(join(dir, "qa", "provision.mjs"), join(dir, "qa", "linked.mjs"));
    symlinkSync(join(dir, "AGENTS.md"), join(dir, "linked.md"));
    expect([statSync(join(dir, "test/helpers/big.ts")).size, statSync(join(dir, "src/workbench/long.json")).size].every(size => size > 1 << 16)).toBe(true);
    const census = laneCensus(dir);
    expect(census.hits).toEqual([
      "AGENTS.md:3:I5",
      "forge.toml:2:I1",
      "package.json:3:I4",
      ".github/workflows/ci.yml:2:I6",
      ".agents/skills/provision/SKILL.md:3:I3",
      ".pi/agents/setup.md:1:I5",
      ".codex/config.toml:2:I4",
      ...kinds.map(kind => `examples/kinds/plant${kind}:1:I2`),
      "examples/setup.md:1:I2",
      "src/workbench/long.json:1:I4",
      "src/workbench/setup.ts:1:I1",
      "test/helpers/big.ts:2049:I2",
      "test/setup.test.ts:1:I3",
      "qa/provision.mjs:1:I3",
      "qa/tail.sh:3:I1",
    ]);
    expect(census.read).toEqual(census.files.map(file => wholeRead(dir, file)));
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
    const planted = [...PLANTS, ...EXTRA_PLANTS, ...TOKEN_PLANTS, ...SUBFORM_PLANTS];
    expect(DENO_INSTALL_SHAPES.map(shape => `${shape.id}:${planted.filter(plant => plant.shape === shape.id).length}`)).toEqual(FROZEN_SHAPE_PLANTS);
    expect(planted.filter(plant => !DENO_INSTALL_SHAPES.some(shape => shape.id === plant.shape))).toEqual([]);
    const paragraph = docs.split("\n").filter(line => line.includes(list?.[0] ?? "\0"));
    expect(paragraph).toHaveLength(1);
    expect(denoInstallHits(paragraph[0] ?? "")).toEqual([]);
  });
});
