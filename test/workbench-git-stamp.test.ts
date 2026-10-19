/**
 * wb-vko: the qa git-discovery members share one stamp that is truthful about
 * which repository it describes.
 *
 * Spec (bead wb-vko):
 *  - wb-7uq gate fold U1, status-ledger revisionOf: rev-parse --show-toplevel
 *    equality against the ledger root, and a "-dirty" suffix when porcelain is
 *    non-empty.
 *  - wb-7uq gate fold U2, local-detached-faults revision(): same toplevel + dirty
 *    discipline.
 *  - wb-7uq gate F6, package-smoke: had no --show-toplevel check, so a package
 *    root nested in a foreign repo reported the foreign HEAD.
 *  - 04:10Z gate U2/U3 + owner R1: member-entry falsifiers at every member's real
 *    entry point; local-detached-shared-child joins; the live-operator-receipt
 *    revision-stamp block (bounded release) takes the same helper.
 *  - 16:26Z gate U2 (F1, fail-closed): "no consumer reports a clean HEAD after a
 *    failed status read" - revisionOf members return working-tree,
 *    live-operator-receipt returns 'unknown', package-smoke keeps
 *    {head, porcelain: null} (its receipt reports dirty: null); corrupt-index
 *    fixture at every member entry point.
 *  - 16:26Z gate U3 + owner O1 (cax.2 F7): headless-host-census git() and the
 *    install-minimal revision join as members; owner F4: every member table
 *    carries a non-emptiness pin (emptying one must redden).
 * Red-first with a foreign-repo TMPDIR fixture.
 *
 * wb-0yw (vko rows 386/405 F2/F3 and row 435 R1 routes): the closed tables also carry (a) release-checklist-receipt.mjs
 * repoIdentity (its own two-state git read, module-rooted through runCli's root) as a member-entry and module-rooted row,
 * (b) qa/workbench/furnace-hosted-retry-fault.mjs revision()/revisionClean(), which now takes the canonical block inline
 * (the 04:10Z recipe: node: imports only, no cross-file staging) instead of an un-toplevel-checked git call, and (c)
 * qa/workbench/live-adverse.mjs, the fourth landed inline copy of the block, which joins the INLINED drift table.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { gitStamp, revisionOf } from "../qa/workbench/git-stamp.mjs";
import { buildPackageReceipt } from "../qa/workbench/package-boundary.mjs";
import { nonRepoScratch } from "./helpers/non-repo-scratch";
import { installScratchLeakGuard, makeScratch, removeAllScratch } from "./helpers/scratch";

interface Stamp {
  head: string | null;
  porcelain: string | null;
}

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const qa = join(repo, "qa", "workbench");
installScratchLeakGuard();

/**
 * Fixture hygiene (the wb-a9s gate F1 class): a hook or wrapper that exports one of these points every fixture
 * git command - init, add, commit - and every spawned member at an OUTER repository or index. They are removed
 * for this file's worker and put back afterwards.
 */
const GIT_LOCATING = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR"];
const inheritedGitEnv = new Map(GIT_LOCATING.map((name) => [name, process.env[name]]));
for (const name of GIT_LOCATING) delete process.env[name];
afterAll(() => {
  for (const [name, value] of inheritedGitEnv) if (value !== undefined) process.env[name] = value;
});

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.invalid", "-c", "commit.gpgsign=false", ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

/** A real repository with one commit and a nested `pkg/` directory that is NOT its toplevel. */
function foreignRepo(): { top: string; nested: string; head: string } {
  const top = realpathSync(makeScratch("git-stamp-foreign-"));
  git(top, "init", "-q");
  mkdirSync(join(top, "pkg"));
  writeFileSync(join(top, "pkg", "a.txt"), "a\n");
  git(top, "add", "-A");
  git(top, "commit", "-q", "-m", "init");
  return { top, nested: join(top, "pkg"), head: git(top, "rev-parse", "HEAD") };
}

/** A scratch directory outside every fixture repository, removed after each test. */
function scratchDir(prefix: string): string {
  return realpathSync(makeScratch(prefix));
}

/**
 * Garbage over .git/index: `git status --porcelain` now fails while both rev-parse reads still succeed - the
 * failed-status-read case of the 16:26Z gate F1. The fixture proves that state before any member reads it.
 */
function corruptIndex(top: string): void {
  writeFileSync(join(top, ".git", "index"), "this is not a git index\n");
  expect(spawnSync("git", ["status", "--porcelain"], { cwd: top, stdio: "ignore" }).status).not.toBe(0);
  expect(spawnSync("git", ["rev-parse", "--show-toplevel"], { cwd: top, stdio: "ignore" }).status).toBe(0);
  expect(spawnSync("git", ["rev-parse", "HEAD"], { cwd: top, stdio: "ignore" }).status).toBe(0);
}

afterEach(() => {
  removeAllScratch();
});

describe("gitStamp / revisionOf toplevel and dirty discipline", () => {
  it("describes a clean repository at its own toplevel", () => {
    const { top, head } = foreignRepo();
    const stamp = gitStamp(top) as Stamp;
    expect(stamp.head).toBe(head);
    expect(stamp.porcelain).toBe("");
    expect(revisionOf(top)).toBe(head);
  });

  it("suffixes -dirty when porcelain is non-empty", () => {
    const { top, head } = foreignRepo();
    writeFileSync(join(top, "pkg", "a.txt"), "changed\n");
    expect((gitStamp(top) as Stamp).porcelain).toContain("a.txt");
    expect(revisionOf(top)).toBe(`${head}-dirty`);
  });

  it("refuses a foreign HEAD when the root is nested inside another repository", () => {
    const { nested } = foreignRepo();
    expect(gitStamp(nested)).toEqual({ head: null, porcelain: null });
    expect(revisionOf(nested)).toBe("working-tree");
  });

  it("answers working-tree outside any repository", () => {
    const scratch = nonRepoScratch("git-stamp-nonrepo-");
    try {
      expect(gitStamp(scratch.dir)).toEqual({ head: null, porcelain: null });
      expect(revisionOf(scratch.dir)).toBe("working-tree");
    } finally {
      scratch.dispose();
    }
  });

  it("answers working-tree for a directory that does not exist", () => {
    expect(revisionOf(join(scratchDir("git-stamp-missing-parent-"), "does-not-exist"))).toBe("working-tree");
  });

  it("never reports a clean HEAD when the status read fails: head kept, porcelain null, revision working-tree", () => {
    const { top, head } = foreignRepo();
    corruptIndex(top);
    expect(gitStamp(top)).toEqual({ head, porcelain: null });
    expect(revisionOf(top)).toBe("working-tree");
  });
});

function stampBlock(name: string): string {
  const text = readFileSync(join(qa, name), "utf8");
  const start = text.indexOf("// git-stamp:begin");
  const end = text.indexOf("// git-stamp:end");
  expect(start, `${name} carries the git-stamp block`).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return text.slice(start, end + "// git-stamp:end".length);
}

/** The members whose guards allow only node: imports, so they carry the canonical block inline. */
const INLINED = ["status-ledger.mjs", "local-detached-faults.mjs", "local-detached-shared-child.mjs", "live-adverse.mjs", "furnace-hosted-retry-fault.mjs"];

/** The members that import the canonical module (statically, or dynamically inside live-operator's bounded block). */
const IMPORTERS = ["package-smoke.mjs", "live-operator-receipt.mjs", "headless-host-census.mjs", "install-minimal.mjs", "live-furnace-vc4.mjs"];

async function importBlock(name: string): Promise<{ revisionOf: (root: string) => string }> {
  const file = join(scratchDir("git-stamp-inline-"), "inline.mjs");
  writeFileSync(file, `import {spawnSync} from 'node:child_process';\nimport {realpathSync} from 'node:fs';\n${stampBlock(name)}\nexport {revisionOf};\n`);
  return (await import(pathToFileURL(file).href)) as { revisionOf: (root: string) => string };
}

describe("the qa git-discovery members share the one canonical stamp (five inlined copies, five importers)", () => {
  it("package-smoke runs no HEAD-only rev-parse of its own", () => {
    expect(readFileSync(join(qa, "package-smoke.mjs"), "utf8")).not.toMatch(/rev-parse['"],\s*['"]HEAD['"]\]/);
  });

  it.each(INLINED)("%s inlines the canonical block byte-for-byte (node: imports only)", (name) => {
    expect(stampBlock(name)).toBe(stampBlock("git-stamp.mjs"));
  });

  it("package-smoke consumes the canonical module", () => {
    expect(readFileSync(join(qa, "package-smoke.mjs"), "utf8")).toMatch(/from '\.\/git-stamp\.mjs'/);
  });

  it("the inlined local-detached-faults block behaves as the module does, including the foreign-root refusal", async () => {
    const { top, nested, head } = foreignRepo();
    const file = join(scratchDir("git-stamp-inline-"), "inline.mjs");
    writeFileSync(
      file,
      `import {spawnSync} from 'node:child_process';\nimport {realpathSync} from 'node:fs';\n${stampBlock("local-detached-faults.mjs")}\nexport {revisionOf};\n`,
    );
    const inline = (await import(pathToFileURL(file).href)) as { revisionOf: (root: string) => string };
    expect(inline.revisionOf(top)).toBe(head);
    expect(inline.revisionOf(nested)).toBe("working-tree");
    writeFileSync(join(top, "pkg", "a.txt"), "changed\n");
    expect(inline.revisionOf(top)).toBe(`${head}-dirty`);
  });

  it.each(INLINED)("the block inlined in %s answers working-tree, never a clean HEAD, when the status read fails", async (name) => {
    const { top } = foreignRepo();
    const inline = await importBlock(name);
    corruptIndex(top);
    expect(inline.revisionOf(top)).toBe("working-tree");
  });

  it("status-ledger CLI receipt reports working-tree, not the foreign HEAD, from a nested root", () => {
    const { nested, head } = foreignRepo();
    const stage = join(nested, "qa", "workbench");
    mkdirSync(stage, { recursive: true });
    copyFileSync(join(qa, "status-ledger.mjs"), join(stage, "status-ledger.mjs"));
    mkdirSync(join(nested, "docs", "workbench"), { recursive: true });
    copyFileSync(join(repo, "docs", "workbench", "TRACEABILITY.md"), join(nested, "docs", "workbench", "TRACEABILITY.md"));
    const run = spawnSync(process.execPath, [join(stage, "status-ledger.mjs")], { cwd: nested, encoding: "utf8" });
    const receipt = JSON.parse(run.stdout) as { revision: string };
    expect(receipt.revision).toBe("working-tree");
    expect(run.stdout).not.toContain(head);
  });
});

/**
 * Member-entry falsifiers (wb-vko gate U2/U3, measured recipe): each member's REAL entry point is staged into a
 * root and spawned (a) from a root nested inside a fresh foreign repository: the receipt revision must be the
 * not-a-toplevel value and stdout must not carry the foreign HEAD; (b) from a fresh-repository toplevel: HEAD
 * when clean, HEAD-dirty with an untracked file; (c) from a root vendored and committed inside a foreign repository,
 * so the foreign tree is CLEAN: still the not-a-toplevel value and no foreign HEAD; (d) from a toplevel whose
 * `git status` fails (corrupt index): never a clean HEAD (16:26Z gate F1). No runner needs dist: the not-realised
 * paths still emit a receipt, the headless census measures a stand-in dist and install-minimal packs and installs
 * a stand-in package for real.
 */
interface Member {
  name: string;
  /** qa/workbench files staged beside the entry point. */
  files: string[];
  /** Repository files staged at the same root-relative path. */
  extra: string[];
  /** Root-relative stand-ins for what the entry point measures (never for the stamp under test). */
  fixtures?: Record<string, string>;
  /** Extra argv for the entry point, given a scratch directory outside the fixture repository. */
  argv?: (scratch: string) => string[];
  /** Revision the member records for a HEAD (full sha by default). */
  form?: (head: string) => string;
  /** Value recorded when the stamp cannot describe the root: not a repository toplevel, or a failed status read. */
  foreign?: string;
  /** The member also reports `worktreeClean`, which must be true only for a clean HEAD it can describe. */
  cleanFlag?: boolean;
  /** wb-4xz: the member records a bare HEAD plus a separate `dirty` bit (true / false / null = not read), never a suffix. */
  splitDirty?: boolean;
  /** wb-0yw: the value `dirty` takes when the stamp cannot be read to the end (default null; repoIdentity answers the string "unknown"). */
  unreadDirty?: unknown;
  /** wb-0yw: the receipt key that carries the clean bit when `cleanFlag` is set (default worktreeClean). */
  cleanKey?: string;
  /** wb-0yw: the value the clean bit takes when the stamp cannot be read to the end (default false; the retry-fault runner answers null). */
  unreadClean?: unknown;
  /** wb-0yw: the member records a bare HEAD whose dirtiness lives in its own clean bit, never a suffix. */
  bareRevision?: boolean;
}

interface MemberReceipt {
  revision: string;
  worktreeClean?: unknown;
  dirty?: unknown;
  [key: string]: unknown;
}

/** The clean bit a `cleanFlag` member records, under its own key. */
function cleanOf(member: Member, receipt: MemberReceipt): unknown {
  return receipt[member.cleanKey ?? "worktreeClean"];
}

/** The three modules the headless census child imports, as a stand-in dist with no other closure. */
const HEADLESS_DIST: Record<string, string> = {
  "dist/package.json": '{"type":"module"}\n',
  "dist/workbench/hosts/local-detached.js": 'import "node:path";\nexport function createDetachedWorkflowHost() {\n  return { callNode() {} };\n}\n',
  "dist/workflow/runtime.js": 'export function validateScript() {\n  return { meta: { name: "headless-census" } };\n}\n',
  "dist/workbench/capability-registry.js": "export class CapabilityRegistry {}\n",
};

/**
 * wb-4xz: stand-ins for what the VC-4 runner imports (the compiled observer modules and the SDK). With no fixture identity
 * in the environment the runner speaks to no furnace at all and prints its not-realised receipt, so the stamp under test is
 * the only real code path; nothing here runs a furnace verb or a Run.
 */
const VC4_STAND_INS: Record<string, string> = {
  "dist/package.json": '{"type":"module"}\n',
  "dist/workbench/furnace-observer.js": "export class FurnaceObserver {}\n",
  "dist/workbench/observation.js": "export class ObservationProjection {}\n",
  "dist/workbench/providers/furnace.js": "export function nativeFurnaceRunInspect() {}\n",
  "node_modules/@furnace/sdk/package.json": '{"name":"@furnace/sdk","version":"0.0.0","type":"module","main":"index.js"}\n',
  "node_modules/@furnace/sdk/index.js": "export class Furnace {}\n",
};

/**
 * The stand-in probe is truthful about enforcement (wb-vko second-lander re-cut after wb-nh3): it attempts a real write into the
 * read-only installed tree and reports what it observed, so the runner-side assertReadOnlyReceipt accepts it only for a refused
 * write (EACCES, EPERM, EROFS) or, for a privileged runner, a successful write recorded as privileged-uid. It never prints a
 * hard-coded readOnlyEnforced.
 */
const INSTALL_MINIMAL_PROBE = [
  'import { rmSync, writeFileSync } from "node:fs";',
  "const target = new URL(\"./node_modules/.stand-in-write-probe\", import.meta.url);",
  "const refused = new Set([\"EACCES\", \"EPERM\", \"EROFS\"]);",
  "let readOnlyEnforced = false;",
  "let readOnlyReason;",
  "try {",
  "  writeFileSync(target, \"x\");",
  "  rmSync(target, { force: true });",
  "  if (typeof process.getuid === \"function\" && process.getuid() === 0) readOnlyReason = \"privileged-uid\";",
  "} catch (error) {",
  "  if (error && refused.has(error.code)) readOnlyEnforced = true;",
  "  else throw error;",
  "}",
  'console.log(JSON.stringify({ contract: "workbench.install-minimal/v1", readOnlyEnforced, ...(readOnlyReason ? { readOnlyReason } : {}), workflowValue: 42 }));',
  "",
].join("\n");

/** A stand-in package npm packs and installs for real, and the probe that reports the one value the harness asserts. */
const INSTALL_MINIMAL_FIXTURES: Record<string, string> = {
  "package.json": `${JSON.stringify({ name: "git-stamp-install-fixture", version: "0.0.0", type: "module", files: ["package.json"] })}\n`,
  "qa/workbench/installed-minimal.mjs": INSTALL_MINIMAL_PROBE,
};

const MEMBERS: Member[] = [
  { name: "local-detached-faults.mjs", files: ["local-detached-faults.mjs", "local-detached-faults-receipt.mjs"], extra: [] },
  {
    name: "local-detached-shared-child.mjs",
    files: ["local-detached-shared-child.mjs", "local-detached-shared-child-receipt.mjs", "local-detached-faults-receipt.mjs"],
    extra: [],
  },
  { name: "status-ledger.mjs", files: ["status-ledger.mjs"], extra: ["docs/workbench/TRACEABILITY.md"] },
  // wb-vko owner ruling R1 (04:13Z): the operator-receipt site records the 7-character short sha and keeps its "unknown" fallback.
  // Its receipt directory is given explicitly so no run leaves an a2g3-receipt-* directory under TMPDIR.
  {
    name: "live-operator-receipt.mjs",
    files: ["live-operator-receipt.mjs", "git-stamp.mjs"],
    extra: [],
    argv: (scratch) => [scratch],
    form: (head) => head.slice(0, 7),
    foreign: "unknown",
  },
  // 16:26Z gate U3 (cax.19 F3 routed by name): headless-host-census git() describes the runner's root.
  {
    name: "headless-host-census.mjs",
    files: ["headless-host-census.mjs", "headless-census-child.mjs", "headless-census-receipt.mjs", "git-stamp.mjs"],
    extra: [],
    fixtures: HEADLESS_DIST,
    cleanFlag: true,
  },
  // Owner ruling O1 (16:30Z, cax.2 F7 folded by name): install-minimal revision = WB_REVISION ?? the stamp.
  {
    name: "install-minimal.mjs",
    files: ["install-minimal.mjs", "install-minimal-lib.mjs", "git-stamp.mjs"],
    extra: [],
    fixtures: INSTALL_MINIMAL_FIXTURES,
  },
  // wb-4xz (vko gate follow-on, 752.3 F1): the VC-4 runner's gitFacts takes the canonical stamp; a stamp it cannot read to
  // the end is 'unknown' with a null dirty bit INSIDE gitFacts, and the receipt it prints is otherwise byte-identical.
  {
    name: "live-furnace-vc4.mjs",
    files: ["live-furnace-vc4.mjs", "live-furnace-vc4-receipt.mjs", "git-stamp.mjs"],
    extra: [],
    fixtures: VC4_STAND_INS,
    foreign: "unknown",
    splitDirty: true,
  },
  // wb-0yw (vko rows 386/405 F2): repoIdentity is release-checklist-receipt's own two-state read (revision + dirty, "unknown"
  // for both when the root is not a toplevel or a git read fails). The stand-ins give runCli what it reads and nothing else:
  // with no pinned suite present every item is "pinned suite missing; item not run", so no vitest process ever starts.
  {
    name: "release-checklist-receipt.mjs",
    files: ["release-checklist-receipt.mjs"],
    extra: [],
    fixtures: { "node_modules/vitest/package.json": '{"name":"vitest","version":"0.0.0"}\n' },
    foreign: "unknown",
    splitDirty: true,
    unreadDirty: "unknown",
  },
  // wb-0yw (vko row 405 F3): the retry-fault runner records the bare HEAD plus revisionClean (true / false / null = not read).
  // With no dist/ it prints its not-realised receipt, so the stamp is the only real code path under test.
  {
    name: "furnace-hosted-retry-fault.mjs",
    files: ["furnace-hosted-retry-fault.mjs", "furnace-hosted-retry-fault-receipt.mjs", "local-detached-faults-receipt.mjs"],
    extra: [],
    bareRevision: true,
    cleanFlag: true,
    cleanKey: "revisionClean",
    unreadClean: null,
  },
];

function stage(root: string, member: Member): string {
  const dir = join(root, "qa", "workbench");
  mkdirSync(dir, { recursive: true });
  for (const file of member.files) copyFileSync(join(qa, file), join(dir, file));
  for (const extra of member.extra) {
    mkdirSync(dirname(join(root, extra)), { recursive: true });
    copyFileSync(join(repo, extra), join(root, extra));
  }
  for (const [path, text] of Object.entries(member.fixtures ?? {})) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return join(dir, member.name);
}

function receiptRevision(
  entry: string,
  cwd: string,
  argv: string[] = [],
  overrides: NodeJS.ProcessEnv = {},
): { revision: string; stdout: string; receipt: MemberReceipt } {
  const env: NodeJS.ProcessEnv = { ...process.env, DETACHED_SHARED_CHILD_RECEIPT: "", DETACHED_FAULTS_RECEIPT: "", W22_LEDGER_RECEIPT: "", W22_CHECKLIST_RECEIPT: "", FURNACE_HOSTED_RETRY_FAULT_RECEIPT: "" };
  // install-minimal: an explicit WB_REVISION replaces the stamp under test, and its receipt file stays unwritten.
  delete env.WB_REVISION;
  delete env.WB_INSTALL_MINIMAL_RECEIPT;
  // wb-4xz: no fixture identity and no receipt path, so the VC-4 runner prints its not-realised receipt and speaks to no furnace.
  delete env.PI_FURNACE_FIXTURE_ROOT;
  delete env.PI_FURNACE_FIXTURE_RUN_ID;
  delete env.VC4_RECEIPT;
  const run = spawnSync(process.execPath, [entry, ...argv], { cwd, encoding: "utf8", env: { ...env, ...overrides } });
  const text = run.stdout.trim();
  expect(text, `${entry} printed no receipt (exit ${run.status}): ${run.stderr}`).not.toBe("");
  const receipt = JSON.parse(text) as MemberReceipt;
  return { revision: receipt.revision, stdout: run.stdout, receipt };
}

function runMember(member: Member, entry: string, cwd: string): { revision: string; stdout: string; receipt: MemberReceipt } {
  return receiptRevision(entry, cwd, member.argv?.(scratchDir("git-stamp-out-")) ?? []);
}

describe("member tables are live (owner F4: emptying a table must redden)", () => {
  it("the inlined-copy table names its five copies", () => {
    expect(INLINED).toEqual(["status-ledger.mjs", "local-detached-faults.mjs", "local-detached-shared-child.mjs", "live-adverse.mjs", "furnace-hosted-retry-fault.mjs"]);
  });

  it("the importer table names its five importers", () => {
    expect(IMPORTERS).toEqual(["package-smoke.mjs", "live-operator-receipt.mjs", "headless-host-census.mjs", "install-minimal.mjs", "live-furnace-vc4.mjs"]);
  });

  it("the member-entry table names all nine members", () => {
    expect(MEMBERS.map((member) => member.name)).toEqual([
      "local-detached-faults.mjs",
      "local-detached-shared-child.mjs",
      "status-ledger.mjs",
      "live-operator-receipt.mjs",
      "headless-host-census.mjs",
      "install-minimal.mjs",
      "live-furnace-vc4.mjs",
      "release-checklist-receipt.mjs",
      "furnace-hosted-retry-fault.mjs",
    ]);
  });
});

describe.each(MEMBERS)("member entry point $name stamps only its own repository", (member) => {
  it("reports working-tree, never the foreign HEAD, from a root nested in a foreign repository", { timeout: 60_000 }, () => {
    const { nested, head } = foreignRepo();
    const entry = stage(nested, member);
    const { revision, stdout, receipt } = runMember(member, entry, nested);
    expect(revision).toBe(member.foreign ?? "working-tree");
    expect(stdout).not.toContain(head);
    expect(stdout).not.toContain(head.slice(0, 7));
    if (member.cleanFlag) expect(cleanOf(member, receipt)).toBe(member.unreadClean === undefined ? false : member.unreadClean);
    if (member.splitDirty) expect(receipt.dirty).toBe(member.unreadDirty ?? null);
  });

  it("reports HEAD at a clean toplevel and HEAD-dirty once an untracked file exists", { timeout: 60_000 }, () => {
    const { top } = foreignRepo();
    const entry = stage(top, member);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    const head = git(top, "rev-parse", "HEAD");
    const expected = (member.form ?? ((full: string) => full))(head);
    const clean = runMember(member, entry, top);
    expect(clean.revision).toBe(expected);
    if (member.cleanFlag) expect(cleanOf(member, clean.receipt)).toBe(true);
    if (member.splitDirty) expect(clean.receipt.dirty).toBe(false);
    writeFileSync(join(top, "untracked.txt"), "x\n");
    const dirty = runMember(member, entry, top);
    expect(dirty.revision).toBe(member.splitDirty || member.bareRevision ? expected : `${expected}-dirty`);
    if (member.splitDirty) expect(dirty.receipt.dirty).toBe(true);
    if (member.cleanFlag) expect(cleanOf(member, dirty.receipt)).toBe(false);
  });

  it("stamps nothing of a CLEAN foreign tree: the member vendored and committed inside a foreign repository", { timeout: 60_000 }, () => {
    const { top, nested } = foreignRepo();
    const entry = stage(nested, member);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "vendor member");
    const head = git(top, "rev-parse", "HEAD");
    const { revision, stdout, receipt } = runMember(member, entry, nested);
    expect(revision).toBe(member.foreign ?? "working-tree");
    expect(stdout).not.toContain(head);
    expect(stdout).not.toContain(head.slice(0, 7));
    if (member.cleanFlag) expect(cleanOf(member, receipt)).toBe(member.unreadClean === undefined ? false : member.unreadClean);
    if (member.splitDirty) expect(receipt.dirty).toBe(member.unreadDirty ?? null);
  });

  it("never reports a clean HEAD when git status fails at its own toplevel (corrupt index)", { timeout: 60_000 }, () => {
    const { top } = foreignRepo();
    const entry = stage(top, member);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    const head = git(top, "rev-parse", "HEAD");
    corruptIndex(top);
    const { revision, stdout, receipt } = runMember(member, entry, top);
    expect(revision).toBe(member.foreign ?? "working-tree");
    expect(stdout).not.toContain(head);
    expect(stdout).not.toContain(head.slice(0, 7));
    if (member.cleanFlag) expect(cleanOf(member, receipt)).toBe(member.unreadClean === undefined ? false : member.unreadClean);
    if (member.splitDirty) expect(receipt.dirty).toBe(member.unreadDirty ?? null);
  });
});

/**
 * 04:10Z/16:26Z gate F2 (X5a-e) + owner R1 default (b): the eight MODULE-ROOTED members root their stamp at the module's
 * own repository (import.meta.url), never at the caller's cwd. install-minimal and package-smoke are cwd-rooted BY DESIGN
 * (root = process.cwd()), so they carry no row here.
 */
const MODULE_ROOTED = [
  "status-ledger.mjs",
  "local-detached-faults.mjs",
  "local-detached-shared-child.mjs",
  "live-operator-receipt.mjs",
  "headless-host-census.mjs",
  "live-furnace-vc4.mjs",
  "release-checklist-receipt.mjs",
  "furnace-hosted-retry-fault.mjs",
];

/** A second, different repository: its HEAD differs from any other fixture's even inside the same second. */
function otherRepo(): { top: string; head: string } {
  const { top } = foreignRepo();
  writeFileSync(join(top, "other-only.txt"), `${top}\n`);
  git(top, "add", "-A");
  git(top, "commit", "-q", "-m", "other repository");
  return { top, head: git(top, "rev-parse", "HEAD") };
}

describe("module-rooted members stamp the module's repository, never the caller's cwd (X5)", () => {
  it("the module-rooted table names the eight members and each is a member-entry row", () => {
    expect(MODULE_ROOTED).toHaveLength(8);
    for (const name of MODULE_ROOTED) expect(MEMBERS.map((member) => member.name)).toContain(name);
    expect(MEMBERS.map((member) => member.name).filter((name) => !MODULE_ROOTED.includes(name))).toEqual(["install-minimal.mjs"]);
  });

  describe.each(MEMBERS.filter((member) => MODULE_ROOTED.includes(member.name)))("$name", (member) => {
    it("stamps repository A's HEAD when spawned with cwd = a different repository B's toplevel", { timeout: 60_000 }, () => {
      const a = foreignRepo();
      const entry = stage(a.top, member);
      git(a.top, "add", "-A");
      git(a.top, "commit", "-q", "-m", "stage member");
      const headA = git(a.top, "rev-parse", "HEAD");
      const b = otherRepo();
      expect(b.head).not.toBe(headA);
      const { revision, stdout, receipt } = runMember(member, entry, b.top);
      expect(revision).toBe((member.form ?? ((full: string) => full))(headA));
      expect(stdout).not.toContain(b.head);
      expect(stdout).not.toContain(b.head.slice(0, 7));
      if (member.cleanFlag) expect(cleanOf(member, receipt)).toBe(true);
      if (member.splitDirty) expect(receipt.dirty).toBe(false);
    });
  });
});

describe("member-specific stamp boundaries on the lines this fold touched", () => {
  const headless = MEMBERS.find((member) => member.name === "headless-host-census.mjs");
  const installMinimal = MEMBERS.find((member) => member.name === "install-minimal.mjs");

  it("headless-host-census stamps the runner's repository, never a --dist-root measured elsewhere", { timeout: 60_000 }, () => {
    expect(headless).toBeDefined();
    if (!headless) return;
    const runner = foreignRepo();
    const entry = stage(runner.top, { ...headless, fixtures: {} });
    git(runner.top, "add", "-A");
    git(runner.top, "commit", "-q", "-m", "stage runner");
    const runnerHead = git(runner.top, "rev-parse", "HEAD");
    const measured = foreignRepo();
    for (const [path, text] of Object.entries(HEADLESS_DIST)) {
      mkdirSync(dirname(join(measured.top, path)), { recursive: true });
      writeFileSync(join(measured.top, path), text);
    }
    git(measured.top, "add", "-A");
    git(measured.top, "commit", "-q", "-m", "stand-in dist");
    const measuredHead = git(measured.top, "rev-parse", "HEAD");
    const { revision, stdout, receipt } = receiptRevision(entry, runner.top, ["--dist-root", measured.top]);
    expect(revision).toBe(runnerHead);
    expect(receipt.worktreeClean).toBe(true);
    expect(stdout).not.toContain(measuredHead.slice(0, 7));
    expect(stdout).toContain('"revisionDescribesDist": false');
  });

  it("install-minimal keeps an explicit WB_REVISION ahead of the stamp (the AC's override clause on the edited line)", { timeout: 60_000 }, () => {
    expect(installMinimal).toBeDefined();
    if (!installMinimal) return;
    const { top } = foreignRepo();
    const entry = stage(top, installMinimal);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    expect(receiptRevision(entry, top, [], { WB_REVISION: "explicit-caller-revision" }).revision).toBe("explicit-caller-revision");
  });
});

describe("package-smoke stamps through the canonical module only", () => {
  const smoke = readFileSync(join(qa, "package-smoke.mjs"), "utf8");

  it("spawns git nowhere itself: no git literal in any spawn position", () => {
    expect(smoke).not.toMatch(/['"]git['"]/);
    expect(smoke).not.toMatch(/--show-toplevel|rev-parse|--porcelain/);
  });

  it("builds the receipt git field from the one gitStamp(root) result with root = process.cwd()", () => {
    expect(smoke).toMatch(/const root = process\.cwd\(\);/);
    expect([...smoke.matchAll(/\bstamp\s*=/g)]).toHaveLength(1);
    expect(smoke).toMatch(/const stamp = gitStamp\(root\);/);
    expect(smoke).toMatch(/\bgit: stamp,/);
  });

  it("a failed status read reaches its receipt as dirty: null with the HEAD kept, never as a clean dirty: false", () => {
    const { top, head } = foreignRepo();
    corruptIndex(top);
    const receipt = buildPackageReceipt({
      fileCount: 1,
      shasum: "0",
      integrity: "sha512-0",
      node: "v24.0.0",
      npm: "11.0.0",
      platform: "linux",
      arch: "x64",
      utc: "2026-10-16T00:00:00Z",
      command: ["npm", "pack"],
      topLevel: [],
      bundled: [],
      git: gitStamp(top),
    });
    expect(receipt.revision).toBe(head);
    expect(receipt.dirty).toBeNull();
  });
});

describe("the importing members stamp through the canonical module only (one implementation)", () => {
  it.each(IMPORTERS)("%s imports the stamp and spawns git nowhere itself", (name) => {
    const source = readFileSync(join(qa, name), "utf8");
    expect(source).toMatch(/(?:from |import\()["']\.\/git-stamp\.mjs["']/);
    expect(source).not.toMatch(/['"]git['"]/);
    expect(source).not.toMatch(/--show-toplevel|rev-parse|--porcelain/);
  });
});

/**
 * wb-4xz (vko gate follow-on, 752.3 F1; cure shape = vko gate verdict U2): the VC-4 runner's gitFacts composes the canonical
 * stamp and answers its fail-closed value INSIDE the same bounded function. Mutants (the vko G1 analogue: swallow the status
 * failure) are applied to the STAGED copies and the corrupt-index fixture is run at the runner's real entry point; each must
 * stop reporting a HEAD with a null dirty bit as 'unknown', i.e. the fixture row must kill it. The unmutated control passes
 * the same predicate, so each kill is attributable to its mutation.
 */
describe("live-furnace-vc4 gitFacts fails closed on a failed status read (mutants die)", () => {
  const vc4 = MEMBERS.find((member) => member.name === "live-furnace-vc4.mjs");

  function corruptRun(mutate?: (qaDir: string) => void): { revision: string; dirty: unknown; stdout: string; head: string } {
    expect(vc4).toBeDefined();
    if (!vc4) throw new Error("live-furnace-vc4.mjs member row missing");
    const { top } = foreignRepo();
    const entry = stage(top, vc4);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    const head = git(top, "rev-parse", "HEAD");
    corruptIndex(top);
    mutate?.(join(top, "qa", "workbench"));
    const { revision, stdout, receipt } = runMember(vc4, entry, top);
    return { revision, dirty: receipt.dirty, stdout, head };
  }

  const failClosed = (outcome: { revision: string; dirty: unknown }): boolean => outcome.revision === "unknown" && outcome.dirty === null;

  function replaceOnce(file: string, from: string, to: string): void {
    const text = readFileSync(file, "utf8");
    expect(text.split(from).length - 1, `${file} carries exactly one \`${from}\``).toBe(1);
    writeFileSync(file, text.replace(from, to));
  }

  it("control: the unmutated runner answers unknown with a null dirty bit and carries no HEAD", { timeout: 60_000 }, () => {
    const outcome = corruptRun();
    expect(failClosed(outcome)).toBe(true);
    expect(outcome.stdout).not.toContain(outcome.head);
  });

  it("mutant G1 (the canonical stamp swallows a failed status read as an empty listing) dies", { timeout: 60_000 }, () => {
    const outcome = corruptRun((dir) => replaceOnce(join(dir, "git-stamp.mjs"), "git(root, ['status', '--porcelain']) ?? null", "git(root, ['status', '--porcelain']) ?? ''"));
    expect(failClosed(outcome)).toBe(false);
  });

  it("mutant G1b (gitFacts accepts a stamp whose status read failed and reads the null listing as clean) dies", { timeout: 60_000 }, () => {
    const outcome = corruptRun((dir) => {
      const file = join(dir, "live-furnace-vc4.mjs");
      replaceOnce(file, "head === null || porcelain === null", "head === null");
      replaceOnce(file, "porcelain.trim().length > 0", "(porcelain ?? '').trim().length > 0");
    });
    expect(failClosed(outcome)).toBe(false);
  });

  it("mutant G2 (the dirty bit inverted) dies on the dirty-toplevel fixture", { timeout: 60_000 }, () => {
    expect(vc4).toBeDefined();
    if (!vc4) return;
    const { top } = foreignRepo();
    const entry = stage(top, vc4);
    // Mutated BEFORE the commit, so the staged tree is clean and the unmutated runner reports dirty false (the member row).
    replaceOnce(join(top, "qa", "workbench", "live-furnace-vc4.mjs"), "porcelain.trim().length > 0", "porcelain.trim().length === 0");
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    expect(runMember(vc4, entry, top).receipt.dirty).not.toBe(false);
  });

  it("gitFacts is the one place the runner reads git: it imports the canonical stamp and spawns git nowhere", () => {
    const runner = readFileSync(join(qa, "live-furnace-vc4.mjs"), "utf8");
    expect(runner).toMatch(/import \{ gitStamp \} from '\.\/git-stamp\.mjs';/);
    expect(runner.match(/gitStamp\(/g)).toHaveLength(1);
    expect(runner).not.toMatch(/spawnSync/);
  });
});

/**
 * wb-0yw mutants (vko row 405 F2/F3): each mutation is applied to the STAGED copy of the member's real entry point and the
 * scenario that member row already runs is repeated; the mutated copy must stop answering the not-a-toplevel value (the
 * member row would have gone red), while the unmutated control answers it. "nested" = the member's root sits inside a foreign
 * repository, "cwd" = spawned from a different repository's toplevel, "corrupt" = `git status` fails at its own toplevel.
 */
describe("wb-0yw: the retry-fault runner and repoIdentity fail closed (mutants die)", () => {
  type Scenario = "nested" | "cwd" | "corrupt";

  function replaceOnceIn(file: string, from: string, to: string, times = 1): void {
    const text = readFileSync(file, "utf8");
    expect(text.split(from).length - 1, `${file} carries exactly ${times} \`${from}\``).toBe(times);
    writeFileSync(file, text.split(from).join(to));
  }

  /** True when the member (after `mutate`) reports a revision it must NOT report in the scenario. */
  function misreports(name: string, scenario: Scenario, mutate?: (qaDir: string) => void): boolean {
    const member = MEMBERS.find((candidate) => candidate.name === name);
    expect(member, `${name} member row`).toBeDefined();
    if (!member) throw new Error(`${name} member row missing`);
    if (scenario === "nested") {
      const { nested, head } = foreignRepo();
      const entry = stage(nested, member);
      mutate?.(join(nested, "qa", "workbench"));
      return runMember(member, entry, nested).revision === head;
    }
    const { top } = foreignRepo();
    const entry = stage(top, member);
    mutate?.(join(top, "qa", "workbench"));
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    const head = git(top, "rev-parse", "HEAD");
    if (scenario === "corrupt") {
      corruptIndex(top);
      return runMember(member, entry, top).revision === head;
    }
    const other = otherRepo();
    // The caller's repository carries the same stand-ins, so a mutant that roots at the cwd runs to a receipt instead of crashing.
    for (const [path, text] of Object.entries(member.fixtures ?? {})) {
      mkdirSync(dirname(join(other.top, path)), { recursive: true });
      writeFileSync(join(other.top, path), text);
    }
    return runMember(member, entry, other.top).revision === other.head;
  }

  const RUNNER = "furnace-hosted-retry-fault.mjs";
  const CHECKLIST = "release-checklist-receipt.mjs";

  it.each([
    [RUNNER, "nested"],
    [RUNNER, "cwd"],
    [RUNNER, "corrupt"],
    [CHECKLIST, "nested"],
    [CHECKLIST, "cwd"],
    [CHECKLIST, "corrupt"],
  ] as const)("control: the unmutated %s misreports nothing in the %s scenario", { timeout: 60_000 }, (name, scenario) => {
    expect(misreports(name, scenario)).toBe(false);
  });

  it.each([
    [RUNNER, "nested", "the toplevel check dropped", (dir: string) => replaceOnceIn(join(dir, RUNNER), "!sameDir(top.trim(), root)", "false")],
    [RUNNER, "cwd", "the stamp rooted at the caller's cwd", (dir: string) => replaceOnceIn(join(dir, RUNNER), "gitStamp(ROOT)", "gitStamp(process.cwd())", 2)],
    [RUNNER, "corrupt", "a failed status read swallowed as an empty listing", (dir: string) => replaceOnceIn(join(dir, RUNNER), "git(root, ['status', '--porcelain']) ?? null", "git(root, ['status', '--porcelain']) ?? ''")],
    [
      CHECKLIST,
      "nested",
      "the toplevel check dropped",
      (dir: string) => replaceOnceIn(join(dir, CHECKLIST), "top === undefined || realpathSync(top) !== realpathSync(root)", "top === undefined"),
    ],
    [
      CHECKLIST,
      "cwd",
      "the root taken from the caller's cwd",
      (dir: string) => replaceOnceIn(join(dir, CHECKLIST), "join(dirname(fileURLToPath(import.meta.url)), '..', '..')", "process.cwd()"),
    ],
    [CHECKLIST, "corrupt", "a failed status read tolerated", (dir: string) => replaceOnceIn(join(dir, CHECKLIST), "revision === undefined || status === undefined", "revision === undefined")],
  ] as const)("mutant: %s in the %s scenario with %s dies", { timeout: 60_000 }, (name, scenario, _what, mutate) => {
    expect(misreports(name, scenario, mutate)).toBe(true);
  });
});
