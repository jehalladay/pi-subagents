/**
 * wb-70xe (RF-NATIVE-TSX-COMPONENTS-R2): the Deno identity reading of the rf-preview-tsx tier's success row, and the Deno
 * install-shape matcher of the provisioning census (test/workbench-rf-tsx-deno-provisioning.test.ts).
 *
 * Authority: RFCLI ruling A4, as the owner filing on the bead quotes it (IMPLEMENTATION_AND_QA.md:149@82bd879eee52, not
 * re-read here): "Deno is pinned to the exact version recorded in integrations/tsx/runtime-lock.json and provisioned per host
 * into a versioned tool directory by the operator, never installed by a lane". At render time rf resolves its engine by name
 * on PATH and nothing else: runtime.tsx_engine.resolve_engine (read in the installed rf 0.1.875) is shutil.which over the
 * PATH the provider hands it, from the working directory Pi's own process holds (the provider spawns rf without a cwd), and
 * its docstring states that "A version manager's shim on PATH is answered as the shim"; the same module's docstring records
 * that a mise shim run for a pinned but uninstalled engine downloads one over the network (rfc-3fhh4.28).
 *
 * So this reading never executes the resolved file, and it reads no rf install layout: it reads the head of the file (for
 * the #! mark) and its sha256. RFCLI's own doctor check RFDOCTOR-TSX-RUNTIME hashes the binary it resolves the same way
 * (rf 0.1.875, application/doctor.py _sha256_of, in 1 MiB reads, whose docstring says "Never executes the file."), but
 * unlike this reading the doctor's preflight (runtime.tsx_engine.preflight_engine, rfc-2s2o2.27) also asks a manager shim
 * for its concrete binary and runs one bounded version probe on that binary; this reading runs neither. The pin is the one the
 * render itself reports: provenance.sdk_versions.tsx_runtime is rf's reading of its packaged runtime lock
 * (definitions.tsx_pins.engine_version_entries, rf 0.1.875: distribution_version is the lock's exact engine version,
 * contract_fingerprint is "sha256:" and the binary digest the lock pins for the host's target triple, or "unknown" when it
 * pins none). The test modules that use
 * it launch no engine: the worker-lifecycle census (wb-csbt.3, wb-jdpn) pins that no test module launches one.
 *
 * Two halves, so the shim check runs before rf ever starts (a shim it would execute is the network install path) and the
 * digest check runs once the render has reported the pin:
 *  - provisionedDeno(PATH): the engine rf will resolve; refuses rf_tsx_deno_unresolved when none resolves and
 *    rf_tsx_deno_shim when the resolved file carries one of three version-manager shim marks, each claimed over the members
 *    its tests pin (test/workbench-rf-tsx-deno-provisioning.test.ts and the tier's DENO_IDENTITY_SUITE cases): its
 *    realpath's file name is another name than deno (pinned: mise, deno-shim, Deno, DENO, mise-deno, xdeno and dino), a
 *    directory named shims is the file's parent or the directory two levels above it, on its resolved path or on its
 *    realpath (pinned: manager/shims/deno and manager/shims/bin/deno; a directory named Shims, shim, myshims or shims2 is
 *    not the mark), or the file is a #!/bin/sh script (pinned; a first byte # without a ! after it is not the mark);
 *  - pinnedDenoDigest(engine, fingerprint): refuses rf_tsx_deno_unpinned when the render reports no sha256 pin for the host
 *    and rf_tsx_deno_mismatch when the resolved file's sha256 differs from it (pinned: the pin f*64, and pins one hex off
 *    the measured digest only in its first, its 33rd or its last hex); returns the measured "sha256:<hex>".
 * A resolved file either half cannot read is refused rf_tsx_deno_unreadable. Every refusal is a DenoIdentityRefusal whose
 * message starts with its reason: a typed failure, never a skip.
 *
 * NOT CLAIMED (scope; the forms named here are deferred to wb-j4sm, the rule-19 structural exit child of this bead, ruling
 * R-B292): a #! script whose third byte is not / (one that opens with #! and a space, or with #! and a relative
 * interpreter), a shims directory more than two levels above the file, a manager name that differs from deno only by an
 * extension (such as deno.exe) or by surrounding whitespace, the shim reason's echo of a realpath name that is not
 * printable ASCII (no pinned manager name holds one), the order and the joining of two or more shim reasons (no pinned case
 * carries two), and any other shim mark form, manager name, shims position or digest position outside the pinned members.
 *
 * NAMED RESIDUAL R-COPIED-MANAGER: the pre-render half recognizes a shim by those three marks only, so a version manager's
 * binary copied or hard-linked under the engine's own name outside a shims directory passes it; the digest half then refuses
 * it (rf_tsx_deno_mismatch, its sha256 is not the pin), after rf has run it. The provisioning test pins that quiet row.
 *
 * The lane census reads DENO_INSTALL_SHAPES, six closed families of install command, per line; the docs/workbench/07 Deno
 * sentence names the same six families, label for label. Each shape is held to the forms its planted controls spell (the
 * census's frozen per-shape count); a form no control spells is not claimed. NAMED RESIDUALS, the install forms no shape
 * reads, each with pinned quiet rows in the census: R-MIRROR, an engine archive or installer script fetched from a host no
 * shape names; R-COMPOSED, an install command assembled from parts at run time, which no source line spells (the census's
 * own planted controls are built so); R-UNNAMED-MANAGER, an install through a version or package manager no shape names;
 * R-UNNAMED-VERB, an install through a named manager by a verb, subcommand or runner its shape does not spell;
 * R-DECLARED-TOOL, the engine declared in a version manager's tool file, which a bare install verb then installs;
 * R-IMAGE-FORM, the engine image used by a form the image shape does not spell (a flag before the image, a container key,
 * a docker command, a copy from the image); R-THIRD-PARTY-ACTION, a CI setup action from another owner; R-RELEASE-API, the
 * release metadata read through the forge's REST API; R-SPLIT-LINE, an install command continued over several lines, which
 * a per-line read never sees whole.
 */
import { createHash } from "node:crypto";
import { accessSync, closeSync, constants, openSync, readSync, realpathSync, statSync } from "node:fs";
import { basename, delimiter, join, sep } from "node:path";

/** The engine command rf resolves (runtime.tsx_engine.ENGINE_COMMAND). */
export const DENO_ENGINE = "deno";

/** The typed reasons of the identity reading, one per refusal. */
export const DENO_REFUSAL = {
  unresolved: "rf_tsx_deno_unresolved",
  shim: "rf_tsx_deno_shim",
  unpinned: "rf_tsx_deno_unpinned",
  mismatch: "rf_tsx_deno_mismatch",
  unreadable: "rf_tsx_deno_unreadable",
} as const;
export type DenoRefusalReason = (typeof DENO_REFUSAL)[keyof typeof DENO_REFUSAL];

/**
 * The describe of the tier wiring cases in test/workbench-rf-tsx-tier.test.ts. The docs07 census's row R10 binds its
 * lock-pinned-engine half to exactly the cases the gate's own report collects under it.
 */
export const DENO_IDENTITY_SUITE = "rf-preview-tsx holds the PATH-resolved deno to the lock pin the render reports (wb-70xe)";
/**
 * The describe of the lane census cases in test/workbench-rf-tsx-deno-provisioning.test.ts. The docs07 census's row R10
 * binds its no-lane-install half to exactly the cases the gate's own report collects under it.
 */
export const DENO_LANE_SUITE = "no Pi lane carries a Deno install command (wb-70xe)";
/** The describes the wb-70xe cases are registered under, each with its file, in order; row R10 has one half per entry. */
export const DENO_CASE_SUITES: readonly { readonly suite: string; readonly file: string }[] = [
  { suite: DENO_IDENTITY_SUITE, file: "test/workbench-rf-tsx-tier.test.ts" },
  { suite: DENO_LANE_SUITE, file: "test/workbench-rf-tsx-deno-provisioning.test.ts" },
];

/** A typed refusal of the identity reading: the message is "<reason>: <detail>". */
export class DenoIdentityRefusal extends Error {
  readonly reason: DenoRefusalReason;
  constructor(reason: DenoRefusalReason, detail: string) {
    super(`${reason}: ${detail}`);
    this.name = "DenoIdentityRefusal";
    this.reason = reason;
  }
}

/** The engine as PATH resolves it, and the file that path names after every symlink. */
export interface ResolvedDeno {
  readonly resolved: string;
  readonly realpath: string;
}

const PRINTABLE_PATH = /^[\x20-\x7e]{1,4096}$/;
const TOKEN = /^[0-9A-Za-z:._+-]{1,80}$/;
/**
 * A path is echoed verbatim only when it is 1 to 4096 characters, each printable ASCII (U+0020 space through U+007E tilde);
 * anything else is named <unrecognized>: a C0 control (U+0000-U+001F), DEL (U+007F), any character past U+007E, an empty
 * string or a longer one. No resolvable path is longer than 4096 characters (Linux PATH_MAX counts its terminating NUL).
 */
export function echoPath(value: string): string {
  return PRINTABLE_PATH.test(value) ? value : "<unrecognized>";
}
function echoToken(value: unknown): string {
  return typeof value === "string" && TOKEN.test(value) ? value : "<unrecognized>";
}

/**
 * shutil.which(name) over `path`: the first entry, in order, where `name` is an existing non-directory file (symlinks
 * followed) the current user may execute. An empty entry inside `path` joins to a relative path, read from the working
 * directory, as it is for rf (NOT CLAIMED by a falsifier: the repository root, the tests' working directory, holds no deno,
 * so that read and a skipped entry read alike there). An empty `path` resolves nothing, as shutil.which answers None for
 * PATH "" (rf's Python 3.15, measured); an unset one resolves nothing too, since shutil.which would read the interpreter's
 * CS_PATH there, which this reading does not guess - so the engine is refused unresolved, never passed.
 */
export function resolveOnPath(name: string, path: string | undefined): string | undefined {
  if (path === undefined || path === "") return undefined;
  for (const entry of path.split(delimiter)) {
    const candidate = join(entry, name);
    try {
      if (statSync(candidate).isDirectory()) continue;
      accessSync(candidate, constants.X_OK);
      return candidate;
    } catch {}
  }
  return undefined;
}

const SHIMS_DIRECTORY = "shims";
const SCRIPT_MAGIC = "#!";

function startsWithScriptMagic(file: string): boolean {
  const head = Buffer.alloc(SCRIPT_MAGIC.length);
  const descriptor = openSync(file, "r");
  try {
    const read = readSync(descriptor, head, 0, head.length, 0);
    return head.subarray(0, read).toString("latin1") === SCRIPT_MAGIC;
  } finally {
    closeSync(descriptor);
  }
}

/**
 * Why the resolved engine is a version-manager shim; empty when it is not one. How two or more reasons are ordered and joined
 * is NOT CLAIMED: no pinned case carries two.
 */
export function shimReasons(engine: ResolvedDeno): string[] {
  const reasons: string[] = [];
  const name = basename(engine.realpath);
  if (name !== DENO_ENGINE) reasons.push(`its realpath names ${echoPath(name)}, not ${DENO_ENGINE}`);
  if ([...engine.resolved.split(sep), ...engine.realpath.split(sep)].includes(SHIMS_DIRECTORY)) reasons.push(`it sits in a ${SHIMS_DIRECTORY} directory`);
  if (startsWithScriptMagic(engine.realpath)) reasons.push("it is a #! script, not the engine binary");
  return reasons;
}

/** `read` of the resolved file, its filesystem failure refused typed: an engine that cannot be read cannot be held to the pin. */
function readEngine<T>(resolved: string, read: () => T): T {
  try {
    return read();
  } catch (error) {
    const code = error instanceof Error && "code" in error && typeof error.code === "string" ? error.code : "read failed";
    throw new DenoIdentityRefusal(DENO_REFUSAL.unreadable, `the PATH-resolved deno ${echoPath(resolved)} cannot be read (${echoToken(code)}), so it cannot be held to the lock pin`);
  }
}

/** The pre-render half: the engine rf will resolve on `path`, refusing an unresolved engine or a version-manager shim. */
export function provisionedDeno(path: string | undefined): ResolvedDeno {
  const resolved = resolveOnPath(DENO_ENGINE, path);
  if (resolved === undefined) {
    throw new DenoIdentityRefusal(DENO_REFUSAL.unresolved, "no executable deno on PATH; the operator provisions the pinned Deno (RFCLI ruling A4) and puts its bin directory first on PATH");
  }
  const { engine, reasons } = readEngine(resolved, () => {
    const read: ResolvedDeno = { resolved, realpath: realpathSync(resolved) };
    return { engine: read, reasons: shimReasons(read) };
  });
  if (reasons.length > 0) {
    throw new DenoIdentityRefusal(
      DENO_REFUSAL.shim,
      `the PATH-resolved deno ${echoPath(engine.resolved)} (realpath ${echoPath(engine.realpath)}) is a version-manager shim (${reasons.join("; ")}); executing it can install Deno over the network (rfc-3fhh4.28), so rf is never launched with it`,
    );
  }
  return engine;
}

const CHUNK = 1 << 20;
/** The sha256 hex of `file`, read in chunks; the file is never executed. */
export function sha256Of(file: string): string {
  const hash = createHash("sha256");
  const buffer = Buffer.alloc(CHUNK);
  const descriptor = openSync(file, "r");
  try {
    for (let read = readSync(descriptor, buffer, 0, CHUNK, null); read > 0; read = readSync(descriptor, buffer, 0, CHUNK, null)) hash.update(buffer.subarray(0, read));
  } finally {
    closeSync(descriptor);
  }
  return hash.digest("hex");
}

const PINNED = /^sha256:([0-9a-f]{64})$/;

/**
 * The post-render half: the resolved engine's sha256 must equal the binary digest the render reports for the host
 * (provenance.sdk_versions.tsx_runtime.contract_fingerprint, rf's reading of its packaged runtime-lock.json). Returns the
 * measured digest as "sha256:<hex>".
 */
export function pinnedDenoDigest(engine: ResolvedDeno, fingerprint: unknown): string {
  const pinned = typeof fingerprint === "string" ? PINNED.exec(fingerprint)?.[1] : undefined;
  if (pinned === undefined) {
    throw new DenoIdentityRefusal(
      DENO_REFUSAL.unpinned,
      `the render reports no pinned binary sha256 for this host (contract_fingerprint ${echoToken(fingerprint)}), so the PATH-resolved deno cannot be held to the lock pin`,
    );
  }
  const measured = readEngine(engine.resolved, () => sha256Of(engine.realpath));
  if (measured !== pinned) {
    throw new DenoIdentityRefusal(
      DENO_REFUSAL.mismatch,
      `the PATH-resolved deno ${echoPath(engine.resolved)} (realpath ${echoPath(engine.realpath)}) has sha256 ${measured}, not the sha256 ${pinned} the installed rf's runtime lock pins for this host`,
    );
  }
  return `sha256:${measured}`;
}

/** One closed family of Deno install commands the lane census reads (case-insensitive, per line). */
export interface DenoInstallShape {
  readonly id: string;
  readonly label: string;
  readonly source: string;
}
/**
 * The install shapes, in order. Each source is spelled so that this file's own text matches none of them (the census walks
 * this file and pins it quiet), and each has its planted positive controls in the census (its frozen per-shape count).
 */
export const DENO_INSTALL_SHAPES: readonly DenoInstallShape[] = [
  { id: "I1", label: "the Deno installer script", source: String.raw`deno\.land/(?:x/)?install` },
  {
    id: "I2",
    label: "a Deno release download",
    source: String.raw`dl\.deno\.land|github\.com/denoland/deno/releases|\bgh\s+release\s+download\b[^\n]*\bdenoland/deno\b`,
  },
  {
    id: "I3",
    label: "a version-manager install of the engine",
    source: String.raw`\b(?:mise|rtx|asdf|proto|vfox)\s+(?:install|use|exec|x|i|plugin\s+add|global|local)\b[^\n]*\bdeno\b`,
  },
  {
    id: "I4",
    label: "a package-manager install of the engine",
    source: [
      String.raw`\b(?:npm|pnpm|yarn|bun)\s+(?:i|install|add)\b[^\n]*\bdeno\b`,
      String.raw`\bnpx\s+(?:-\S+\s+)*deno\b`,
      String.raw`\b(?:brew|cargo|snap|choco|scoop|winget|apt-get|apt|dnf|yum|pacman|nix-env|apk|pkg|port)\s+(?:install|add|-S|-iA)\b[^\n]*\bdeno\b`,
      String.raw`\b(?:pip3?|pipx|uv\s+tool|uv\s+pip)\s+install\b[^\n]*\bdeno\b`,
      String.raw`\bnix\s+(?:profile\s+install|shell|run)\b[^\n]*\bdeno\b`,
    ].join("|"),
  },
  { id: "I5", label: "an engine self-upgrade", source: String.raw`\bdeno\s+upgrade\b` },
  { id: "I6", label: "the Deno CI setup action or container image", source: String.raw`denoland/setup[-]deno|\b(?:FROM|image:)\s+(?:docker\.io/)?denoland/deno\b` },
];

/** One read of a text by the shapes: how many lines it offered them, and the install hits among those lines. */
export interface DenoInstallScan {
  readonly lines: number;
  readonly hits: readonly string[];
}

/**
 * The lines of `text`, each tested against the shapes: `lines` counts the lines this read iterated (so a read that stops
 * early counts fewer than the text holds), and `hits` is "<line>:<shape id>" in line order. Which lines reach the shapes is
 * claimed at the census's planted lines only (a line led by # is NOT CLAIMED, deferred to wb-j4sm), and so is a second hit
 * on a line that already holds one, which no planted line carries.
 */
export function denoInstallScan(text: string): DenoInstallScan {
  const patterns = DENO_INSTALL_SHAPES.map(shape => ({ id: shape.id, pattern: new RegExp(shape.source, "i") }));
  const hits: string[] = [];
  let lines = 0;
  for (const line of text.split("\n")) {
    lines += 1;
    for (const shape of patterns) if (shape.pattern.test(line)) hits.push(`${lines}:${shape.id}`);
  }
  return { lines, hits };
}

/** The install hits denoInstallScan reports for `text`, as "<line>:<shape id>" in line order. */
export function denoInstallHits(text: string): string[] {
  return [...denoInstallScan(text).hits];
}
