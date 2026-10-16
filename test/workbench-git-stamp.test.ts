/**
 * wb-vko: the qa git-discovery members share one stamp that is truthful about
 * which repository it describes.
 *
 * Spec (bead wb-vko, from the wb-7uq gate folds U1/U2/F6):
 *  - U1 status-ledger revisionOf: rev-parse --show-toplevel equality against the
 *    ledger root, and a "-dirty" suffix when porcelain is non-empty.
 *  - U2 local-detached-faults revision(): same toplevel + dirty discipline.
 *  - F6 package-smoke: no --show-toplevel check today, so a package root nested
 *    in a foreign repo reports the foreign HEAD.
 * Red-first with a foreign-repo TMPDIR fixture.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { gitStamp, revisionOf } from "../qa/workbench/git-stamp.mjs";
import { nonRepoScratch } from "./helpers/non-repo-scratch";

interface Stamp {
  head: string | null;
  porcelain: string | null;
}

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const qa = join(repo, "qa", "workbench");
const dirs: string[] = [];

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@example.invalid", "-c", "commit.gpgsign=false", ...args], {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

/** A real repository with one commit and a nested `pkg/` directory that is NOT its toplevel. */
function foreignRepo(): { top: string; nested: string; head: string } {
  const top = realpathSync(mkdtempSync(join(tmpdir(), "git-stamp-foreign-")));
  dirs.push(top);
  git(top, "init", "-q");
  mkdirSync(join(top, "pkg"));
  writeFileSync(join(top, "pkg", "a.txt"), "a\n");
  git(top, "add", "-A");
  git(top, "commit", "-q", "-m", "init");
  return { top, nested: join(top, "pkg"), head: git(top, "rev-parse", "HEAD") };
}

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
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
    expect(revisionOf(join(tmpdir(), "git-stamp-missing-dir-does-not-exist"))).toBe("working-tree");
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

describe("the three qa git-discovery members share the stamp", () => {
  it("package-smoke runs no HEAD-only rev-parse of its own", () => {
    expect(readFileSync(join(qa, "package-smoke.mjs"), "utf8")).not.toMatch(/rev-parse['"],\s*['"]HEAD['"]\]/);
  });

  it.each(["status-ledger.mjs", "local-detached-faults.mjs", "local-detached-shared-child.mjs"])("%s inlines the canonical block byte-for-byte (node: imports only)", (name) => {
    expect(stampBlock(name)).toBe(stampBlock("git-stamp.mjs"));
  });

  it("package-smoke consumes the canonical module", () => {
    expect(readFileSync(join(qa, "package-smoke.mjs"), "utf8")).toMatch(/from '\.\/git-stamp\.mjs'/);
  });

  it("the inlined local-detached-faults block behaves as the module does, including the foreign-root refusal", async () => {
    const { top, nested, head } = foreignRepo();
    const dir = mkdtempSync(join(tmpdir(), "git-stamp-inline-"));
    dirs.push(dir);
    const file = join(dir, "inline.mjs");
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
 * when clean, HEAD-dirty with an untracked file. Neither runner needs dist: the not-realised path still emits
 * a receipt.
 */
interface Member {
  name: string;
  files: string[];
  extra: string[];
  /** Revision the member records for a HEAD (full sha by default). */
  form?: (head: string) => string;
  /** Value recorded when the root is not a repository toplevel. */
  foreign?: string;
}

const MEMBERS: Member[] = [
  { name: "local-detached-faults.mjs", files: ["local-detached-faults.mjs", "local-detached-faults-receipt.mjs"], extra: [] },
  {
    name: "local-detached-shared-child.mjs",
    files: ["local-detached-shared-child.mjs", "local-detached-shared-child-receipt.mjs", "local-detached-faults-receipt.mjs"],
    extra: [],
  },
  { name: "status-ledger.mjs", files: ["status-ledger.mjs"], extra: ["docs/workbench/TRACEABILITY.md"] },
  // wb-vko owner ruling R1 (04:13Z): the fifth site records the 7-character short sha and keeps its "unknown" fallback.
  {
    name: "live-operator-receipt.mjs",
    files: ["live-operator-receipt.mjs", "git-stamp.mjs"],
    extra: [],
    form: (head) => head.slice(0, 7),
    foreign: "unknown",
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
  return join(dir, member.name);
}

function receiptRevision(entry: string, cwd: string): { revision: string; stdout: string } {
  const run = spawnSync(process.execPath, [entry], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, DETACHED_SHARED_CHILD_RECEIPT: "", DETACHED_FAULTS_RECEIPT: "", W22_LEDGER_RECEIPT: "" },
  });
  const receipt = JSON.parse(run.stdout.trim()) as { revision: string };
  return { revision: receipt.revision, stdout: run.stdout };
}

describe.each(MEMBERS)("member entry point $name stamps only its own repository", (member) => {
  it("reports working-tree, never the foreign HEAD, from a root nested in a foreign repository", () => {
    const { nested, head } = foreignRepo();
    const entry = stage(nested, member);
    const { revision, stdout } = receiptRevision(entry, nested);
    expect(revision).toBe(member.foreign ?? "working-tree");
    expect(stdout).not.toContain(head);
    expect(stdout).not.toContain(head.slice(0, 7));
  });

  it("reports HEAD at a clean toplevel and HEAD-dirty once an untracked file exists", () => {
    const { top } = foreignRepo();
    const entry = stage(top, member);
    git(top, "add", "-A");
    git(top, "commit", "-q", "-m", "stage member");
    const head = git(top, "rev-parse", "HEAD");
    const expected = (member.form ?? ((full: string) => full))(head);
    expect(receiptRevision(entry, top).revision).toBe(expected);
    writeFileSync(join(top, "untracked.txt"), "x\n");
    expect(receiptRevision(entry, top).revision).toBe(`${expected}-dirty`);
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
});
