/** wb-a9s (W22-H follow-up): pre-push commit-message invisible-point scan.
 * Spec (bead wb-a9s): "a pre-push check scanning git log --format=%B <base>..HEAD; any new commit whose MESSAGE
 * carries a guard-set code point refuses the push naming commit sha, line and U+XXXX - the message-side mirror
 * of the tree-side source-hygiene guard." Guard set: U+061C, U+200B-U+200F, U+202A-U+202E, U+2060,
 * U+2066-U+2069, U+FEFF. Motivation of record: wb-era F1, a rejected commit message carried raw invisible points
 * (incl. U+202E) against a 0-of-497 baseline.
 * Every code point below is built with String.fromCodePoint so this file itself carries no raw guard point.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { GUARD_CODE_POINTS, isGuardCodePoint, scanCommitMessage, scanCommitMessages } from "../qa/workbench/commit-message-scan.mjs";

const SCRIPT = join(process.cwd(), "qa/workbench/commit-message-scan.mjs");
const cp = (n: number): string => String.fromCodePoint(n);
const hex = (n: number): string => `U+${n.toString(16).toUpperCase().padStart(4, "0")}`;

const EXPECTED: number[] = [0x061c, ...range(0x200b, 0x200f), ...range(0x202a, 0x202e), 0x2060, ...range(0x2066, 0x2069), 0xfeff];
function range(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let n = lo; n <= hi; n += 1) out.push(n);
  return out;
}

describe("wb-a9s guard set", () => {
  it("is exactly the bead's set: 1 + 5 + 5 + 1 + 4 + 1 = 17 points", () => {
    expect([...GUARD_CODE_POINTS]).toEqual(EXPECTED);
    expect(EXPECTED).toHaveLength(17);
  });

  for (const n of EXPECTED) {
    it(`flags ${hex(n)} wherever it sits in a message`, () => {
      const found = scanCommitMessage("abc123", `subject\n\nbody${cp(n)}tail\n`);
      expect(found).toEqual([{ sha: "abc123", line: 3, column: 5, codePoint: hex(n) }]);
    });
  }

  it("does not flag the neighbours just outside each range or ordinary text", () => {
    const outside = [0x061b, 0x061d, 0x200a, 0x2010, 0x2028, 0x2029, 0x202f, 0x2061, 0x2065, 0x206a, 0xfefe, 0xff00, 0x00a0, 0x00ad, 0x1f600];
    for (const n of outside) {
      expect(isGuardCodePoint(n), hex(n)).toBe(false);
      expect(scanCommitMessage("s", `x${cp(n)}y\n`), hex(n)).toEqual([]);
    }
    expect(scanCommitMessage("s", "feat: plain ascii message\n\nbody line\n")).toEqual([]);
  });
});

describe("wb-a9s scanner positions and multiplicity", () => {
  it("reports line (1-based) and column (1-based, in code points) and every occurrence", () => {
    const msg = `subject\nsecond ${cp(0x202e)}${cp(0x200b)}\n\nlast${cp(0xfeff)}\n`;
    expect(scanCommitMessage("deadbeef", msg)).toEqual([
      { sha: "deadbeef", line: 2, column: 8, codePoint: "U+202E" },
      { sha: "deadbeef", line: 2, column: 9, codePoint: "U+200B" },
      { sha: "deadbeef", line: 4, column: 5, codePoint: "U+FEFF" },
    ]);
  });

  it("counts an astral character as one column so a later point is not mis-positioned", () => {
    expect(scanCommitMessage("s", `${cp(0x1f600)}${cp(0x2066)}\n`)).toEqual([{ sha: "s", line: 1, column: 2, codePoint: "U+2066" }]);
  });

  it("counts CRLF as one line break", () => {
    expect(scanCommitMessage("s", `a\r\nb${cp(0x2069)}\r\n`)).toEqual([{ sha: "s", line: 2, column: 2, codePoint: "U+2069" }]);
  });

  it("scans several commits and names each offending sha", () => {
    const rows = scanCommitMessages([
      { sha: "aaa", message: "clean\n" },
      { sha: "bbb", message: `bad${cp(0x061c)}\n` },
      { sha: "ccc", message: `${cp(0x2060)}bad\n` },
    ]);
    expect(rows.map((r) => [r.sha, r.line, r.column, r.codePoint])).toEqual([
      ["bbb", 1, 4, "U+061C"],
      ["ccc", 1, 1, "U+2060"],
    ]);
  });
});

describe("wb-a9s CLI against a real repository (base..HEAD only)", () => {
  const dir = mkdtempSync(join(tmpdir(), "a9s-"));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const env = { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@example.invalid", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@example.invalid", GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
  const git = (...args: string[]): string => execFileSync("git", args, { cwd: dir, env, encoding: "utf8" }).trim();
  const commit = (message: string): string => {
    git("commit", "--allow-empty", "-q", "-m", message);
    return git("rev-parse", "HEAD");
  };
  const run = (...args: string[]) => spawnSync(process.execPath, [SCRIPT, ...args], { cwd: dir, env, encoding: "utf8" });

  git("init", "-q");
  // A guard-set message BELOW the base is history, not a new commit: it must not refuse the push.
  const old = commit(`old${cp(0x202e)}history`);
  const base = commit("base commit");
  const clean = commit("feat: clean new commit");

  it("exits 0 and prints nothing offending when every new message is clean (history below base ignored)", () => {
    const r = run("--base", base);
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("0 offenders");
    expect(r.stdout).not.toContain(old);
    expect(clean).toHaveLength(40);
  });

  it("exits 3 naming sha, line and U+XXXX, and never echoes the raw point", () => {
    const bad = commit(`fix: tricky\n\nbody ${cp(0x202e)}reversed`);
    const r = run("--base", base);
    expect(r.status).toBe(3);
    expect(r.stdout).toContain(bad);
    expect(r.stdout).toContain("line 3");
    expect(r.stdout).toContain("U+202E");
    expect(r.stdout).not.toContain(cp(0x202e));
    expect(r.stderr).not.toContain(cp(0x202e));
  });

  it("exits 2 on a base it cannot resolve instead of passing silently", () => {
    const r = run("--base", "no-such-rev");
    expect(r.status).toBe(2);
    expect(r.stdout).not.toContain("0 offenders");
  });

  it("exits 2 on a missing --base value", () => {
    expect(run("--base").status).toBe(2);
  });
});
