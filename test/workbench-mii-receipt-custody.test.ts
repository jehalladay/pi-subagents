/**
 * wb-2xan [MII P10+] EAT-R456 clause (a), "receipts land in a new source-pinned directory" (TDD-MATRIX.md section 7, gate line
 * (a)): acceptance criterion 1 and criterion 4, the row's Negative mutant, against qa/workbench/mii-receipt-custody.mjs.
 *   criterion 1: "A validator asserts every new receipt lives under a directory keyed by both source SHAs and rejects writes
 *   into prior receipt directories (append-only custody)."
 *   criterion 4: "A validator mutant accepts a write into a prior source-pinned receipt directory; the append-only custody
 *   check must turn red."
 * Both lines come from docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md lines
 * 1657-1680 at master 53ac7f35 (blob a8a9bf09); gate line (a) is TDD-MATRIX.md line 280 (blob 073567e8). Both are vendored byte
 * for byte in test/fixtures/mii-receipt-custody-requirement.json.
 *
 * PINNED READER SET. CLAIMS is the census: each row states one positive claim and names its pinned cases (CASES rows for K and
 * P, it-blocks for G and S), and the claim covers exactly those cases. Z01-Z03 hold the census to its shape: Z01 the frozen claim
 * shape, Z02 the pinned set equals the set of cases that ran, Z03 the rows' anchors equal the registry the module exports (the
 * source of truth outside this file). Criterion 4 is discharged through the P and G rows: a validator mutant that accepts a
 * write into a prior KEY directory turns each of them red (the mutant runs are in the delivery record).
 *
 * NOT CLAIMED by this census: whether either commit of a KEY names a commit of its repository (EAT-R457's per-axis witness
 * checks); what a KEY directory holds (EAT-R458, BLOCKED on G-RATIFY); EAT-R456 criteria 2 and 3 and its clauses (b), (c) and
 * (d); release evidence written outside the receipt root; custody across cuts; an uncommitted working tree; a KEY spelled with
 * 64-digit commits. RESIDUALS: none named.
 */
import { execFileSync, type SpawnSyncReturns, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as custody from "../qa/workbench/mii-receipt-custody.mjs";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const { CONTRACT, EXIT, FINDING, PROGRAM, RECEIPT_ROOT, REQUIREMENT, custodyFindings } = custody;
const SCRIPT = join(process.cwd(), "qa/workbench/mii-receipt-custody.mjs");
const FIXTURE = join(process.cwd(), "test/fixtures/mii-receipt-custody-requirement.json");

/** The census title: the pinned set this file reads (case ids appear here and in their own rows only). */
const CENSUS = "wb-2xan EAT-R456(a) receipt custody census: K01-K09 and P01-P06 (custodyFindings), G01-G05 (the CLI over a real repository), S01 (the vendored requirement) over qa/workbench/mii-receipt-custody.mjs";

type ClaimId = "R456a-KEYED" | "R456a-PRIOR" | "R456a-CLI" | "R456a-SPEC";
interface Claim {
  readonly id: ClaimId;
  readonly sentence: string;
  readonly pins: readonly string[];
  /** Names in the module's exported registry this claim's cases hold (Z03). */
  readonly anchors: readonly string[];
}

const CLAIMS: readonly Claim[] = [
  {
    id: "R456a-KEYED",
    sentence:
      "custodyFindings reads a changed path under qa/workbench/receipts/mechanical-interop-integrity-2026-11-10/ whose first segment below that root is not a pi-<40 lower-case hex>-mw-<40 lower-case hex> directory as receipt-dir-not-source-pinned, a path inside a new such directory as no finding, and a path outside that root as no finding",
    pins: ["K01", "K02", "K03", "K04", "K05", "K06", "K07", "K08", "K09"],
    anchors: ["RECEIPT_ROOT", "KEY", "receiptDirOf", "custodyFindings", "FINDING", "FINDING.notSourcePinned"],
  },
  {
    id: "R456a-PRIOR",
    sentence:
      "custodyFindings reads an added, modified or deleted path inside a pi-<40 lower-case hex>-mw-<40 lower-case hex> directory that holds a file at base, at any depth, as write-into-prior-receipt-dir, and a new such directory beside it as no finding",
    pins: ["P01", "P02", "P03", "P04", "P05", "P06"],
    anchors: ["custodyFindings", "FINDING", "FINDING.priorDirectory"],
  },
  {
    id: "R456a-CLI",
    sentence:
      "node qa/workbench/mii-receipt-custody.mjs --base <rev> [--head <rev>] reads the cut from Git and exits 1 with the findings for an addition, a modification, a mode change, a deletion or a rename out of a prior KEY directory, 0 with no finding for a new KEY directory, and 2 with a usage line and no stdout on a usage error",
    pins: ["G01", "G02", "G03", "G04", "G05"],
    anchors: ["runCli", "readCustodyFromGit", "CONTRACT", "EXIT", "EXIT.clean", "EXIT.findings", "EXIT.usage"],
  },
  {
    id: "R456a-SPEC",
    sentence:
      "the vendored EAT-R456 block and gate line hash to their pinned SHA-256, and their criterion 1, Negative mutant and clause (a) equal the REQUIREMENT quotes of the module",
    pins: ["S01"],
    anchors: ["PROGRAM", "REQUIREMENT", "REQUIREMENT.criteria.1", "REQUIREMENT.criteria.4"],
  },
];

type Status = "A" | "M" | "D";
interface Row {
  readonly id: string;
  readonly claim: ClaimId;
  readonly title: string;
  readonly base: readonly string[];
  readonly changes: readonly (readonly [Status, string])[];
  /** [finding code, status, path], in path order. */
  readonly expect: readonly (readonly [string, Status, string])[];
}

// Obviously fake commits: the census reads the shape of a KEY, never a repository behind it (NOT CLAIMED above).
const PI = "0123456789abcdef0123456789abcdef01234567";
const MW = "89abcdef0123456789abcdef0123456789abcdef";
const ROOT = "qa/workbench/receipts/mechanical-interop-integrity-2026-11-10/";
const DIR = `pi-${PI}-mw-${MW}`;
const DIR2 = `pi-${MW}-mw-${PI}`;
const NSP = "receipt-dir-not-source-pinned";
const PRIOR = "write-into-prior-receipt-dir";

const CASES: readonly Row[] = [
  { id: "K01", claim: "R456a-KEYED", title: "one receipt in a new KEY directory", base: [], changes: [["A", `${ROOT}${DIR}/receipt.json`]], expect: [] },
  { id: "K02", claim: "R456a-KEYED", title: "a nested receipt and a second new KEY directory", base: [], changes: [["A", `${ROOT}${DIR}/logs/gate/run.txt`], ["A", `${ROOT}${DIR2}/receipt.json`]], expect: [] },
  { id: "K03", claim: "R456a-KEYED", title: "a receipt directly under the root", base: [], changes: [["A", `${ROOT}receipt.json`]], expect: [[NSP, "A", `${ROOT}receipt.json`]] },
  { id: "K04", claim: "R456a-KEYED", title: "a file at the root path itself", base: [], changes: [["A", ROOT.slice(0, -1)]], expect: [[NSP, "A", ROOT.slice(0, -1)]] },
  { id: "K05", claim: "R456a-KEYED", title: "one commit only, and the two commits in the other order", base: [], changes: [["A", `${ROOT}pi-${PI}/r.json`], ["A", `${ROOT}mw-${MW}-pi-${PI}/r.json`]], expect: [[NSP, "A", `${ROOT}mw-${MW}-pi-${PI}/r.json`], [NSP, "A", `${ROOT}pi-${PI}/r.json`]] },
  { id: "K06", claim: "R456a-KEYED", title: "abbreviated commits and upper-case hex", base: [], changes: [["A", `${ROOT}pi-${PI.slice(0, 7)}-mw-${MW.slice(0, 7)}/r.json`], ["A", `${ROOT}pi-${PI.toUpperCase()}-mw-${MW}/r.json`]], expect: [[NSP, "A", `${ROOT}pi-${PI.slice(0, 7)}-mw-${MW.slice(0, 7)}/r.json`], [NSP, "A", `${ROOT}pi-${PI.toUpperCase()}-mw-${MW}/r.json`]] },
  { id: "K07", claim: "R456a-KEYED", title: "41 digits, a trailing letter and a non-hex digit", base: [], changes: [["A", `${ROOT}pi-${PI}0-mw-${MW}/r.json`], ["A", `${ROOT}${DIR}x/r.json`], ["A", `${ROOT}pi-${PI}-mw-${MW.slice(0, 39)}g/r.json`]], expect: [[NSP, "A", `${ROOT}${DIR}x/r.json`], [NSP, "A", `${ROOT}pi-${PI}-mw-${MW.slice(0, 39)}g/r.json`], [NSP, "A", `${ROOT}pi-${PI}0-mw-${MW}/r.json`]] },
  { id: "K08", claim: "R456a-KEYED", title: "a modified, a deleted and an added path of unkeyed entries present at base", base: [`${ROOT}stray.json`, `${ROOT}notes/a.md`], changes: [["M", `${ROOT}stray.json`], ["D", `${ROOT}notes/a.md`], ["A", `${ROOT}notes/b.md`]], expect: [[NSP, "D", `${ROOT}notes/a.md`], [NSP, "A", `${ROOT}notes/b.md`], [NSP, "M", `${ROOT}stray.json`]] },
  { id: "K09", claim: "R456a-KEYED", title: "paths outside the root, sibling names included", base: [], changes: [["A", "qa/workbench/receipts/wb-x-probe.json"], ["A", "docs/workbench/receipts/wb-x.md"], ["A", `qa/workbench/receipts/mechanical-interop-integrity-2026-11-10x/${DIR}/r.json`], ["A", `qa/workbench/receipts/mechanical-interop-integrity-2026-11-1/${DIR}/r.json`], ["A", `QA/workbench/receipts/mechanical-interop-integrity-2026-11-10/${DIR}/r.json`]], expect: [] },
  { id: "P01", claim: "R456a-PRIOR", title: "an addition beside a receipt present at base", base: [`${ROOT}${DIR}/receipt.json`], changes: [["A", `${ROOT}${DIR}/second.json`]], expect: [[PRIOR, "A", `${ROOT}${DIR}/second.json`]] },
  { id: "P02", claim: "R456a-PRIOR", title: "a modification of a receipt present at base", base: [`${ROOT}${DIR}/receipt.json`], changes: [["M", `${ROOT}${DIR}/receipt.json`]], expect: [[PRIOR, "M", `${ROOT}${DIR}/receipt.json`]] },
  { id: "P03", claim: "R456a-PRIOR", title: "a deletion of a receipt present at base", base: [`${ROOT}${DIR}/receipt.json`], changes: [["D", `${ROOT}${DIR}/receipt.json`]], expect: [[PRIOR, "D", `${ROOT}${DIR}/receipt.json`]] },
  { id: "P04", claim: "R456a-PRIOR", title: "a directory whose only base file is nested", base: [`${ROOT}${DIR}/deep/nested/x.json`], changes: [["A", `${ROOT}${DIR}/top.json`]], expect: [[PRIOR, "A", `${ROOT}${DIR}/top.json`]] },
  { id: "P05", claim: "R456a-PRIOR", title: "a late write into the prior directory beside a new one", base: [`${ROOT}${DIR}/receipt.json`], changes: [["A", `${ROOT}${DIR2}/receipt.json`], ["A", `${ROOT}${DIR}/late.json`]], expect: [[PRIOR, "A", `${ROOT}${DIR}/late.json`]] },
  { id: "P06", claim: "R456a-PRIOR", title: "a move of a base receipt into a new directory", base: [`${ROOT}${DIR}/receipt.json`], changes: [["D", `${ROOT}${DIR}/receipt.json`], ["A", `${ROOT}${DIR2}/receipt.json`]], expect: [[PRIOR, "D", `${ROOT}${DIR}/receipt.json`]] },
];

const RAN = new Set<string>();
const REPOS: string[] = [];
afterAll(() => {
  removeScratch(...REPOS);
});

/** One pinned it-block: its id is recorded so Z02 can hold the pinned set to the cases that ran. */
function pinned(id: string, title: string, body: () => void): void {
  it(`${id} ${title}`, () => {
    RAN.add(id);
    body();
  });
}

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

describe(`${CENSUS} | custodyFindings over the CASES rows`, () => {
  it.each(CASES)("$id ($claim) $title", (row) => {
    RAN.add(row.id);
    const findings = custodyFindings({ baseFiles: row.base, changes: row.changes.map(([status, path]) => ({ path, status })) });
    expect(findings).toEqual(row.expect.map(([code, status, path]) => ({ code, path, status })));
  });
});

/** Git variables that choose which repository, index, object store or config a git child acts on; a fixture never inherits them. */
const LOCATING = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_COMMON_DIR", "GIT_NAMESPACE", "GIT_CONFIG_PARAMETERS", "GIT_CONFIG_COUNT"];
function gitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@example.invalid", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@example.invalid", GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_SYSTEM: "/dev/null" };
  for (const key of Object.keys(env)) if (LOCATING.includes(key) || /^GIT_CONFIG_(KEY|VALUE)_\d+$/.test(key)) delete env[key];
  return env;
}

interface Repo {
  readonly dir: string;
  git(...args: string[]): string;
  write(path: string, text: string): void;
  commit(message: string): string;
  cli(...args: string[]): SpawnSyncReturns<string>;
}

function makeRepo(): Repo {
  const dir = makeScratch("mii-custody-");
  REPOS.push(dir);
  const git = (...args: string[]): string => execFileSync("git", args, { cwd: dir, env: gitEnv(), encoding: "utf8" }).trim();
  git("init", "-q");
  return {
    dir,
    git,
    write: (path, text) => {
      mkdirSync(dirname(join(dir, path)), { recursive: true });
      writeFileSync(join(dir, path), text);
    },
    commit: (message) => {
      git("add", "-A");
      git("commit", "-q", "--allow-empty", "-m", message);
      return git("rev-parse", "HEAD");
    },
    cli: (...args) => spawnSync(process.execPath, [SCRIPT, ...args], { cwd: dir, env: gitEnv(), encoding: "utf8" }),
  };
}

interface Report {
  readonly contract: string;
  readonly program: string;
  readonly root: string;
  readonly base: string;
  readonly head: string;
  readonly findings: readonly { readonly code: string; readonly path: string; readonly status: Status }[];
}

function report(run: SpawnSyncReturns<string>): Report {
  return JSON.parse(run.stdout);
}

interface CliFixture {
  readonly repo: Repo;
  readonly first: string;
  readonly second: string;
  readonly rewrite: string;
  readonly mode: string;
  readonly moved: string;
  readonly removed: string;
}

/** first: one KEY directory; second: a new KEY directory beside it; rewrite, mode, moved and removed each change second's directories. HEAD ends at rewrite. */
function buildCliFixture(): CliFixture {
  const repo = makeRepo();
  repo.write("README.md", "fixture\n");
  repo.write(`${ROOT}${DIR}/receipt.json`, "{}\n");
  const first = repo.commit("first receipt");
  repo.write(`${ROOT}${DIR2}/receipt.json`, "{}\n");
  const second = repo.commit("second receipt in a new KEY directory");
  repo.write(`${ROOT}${DIR}/receipt.json`, '{"rewritten":true}\n');
  repo.write(`${ROOT}${DIR}/second.json`, "{}\n");
  const rewrite = repo.commit("rewrite and add inside the first directory");
  repo.git("checkout", "-q", second);
  chmodSync(join(repo.dir, `${ROOT}${DIR}/receipt.json`), 0o755);
  const mode = repo.commit("mode change inside the first directory");
  repo.git("checkout", "-q", second);
  const third = `pi-${"fedcba9876543210".repeat(2)}fedcba98-mw-${"0f".repeat(20)}`;
  mkdirSync(join(repo.dir, `${ROOT}${third}`), { recursive: true });
  repo.git("mv", `${ROOT}${DIR2}/receipt.json`, `${ROOT}${third}/receipt.json`);
  const moved = repo.commit("rename out of the second directory");
  repo.git("checkout", "-q", second);
  rmSync(join(repo.dir, `${ROOT}${DIR}`), { recursive: true });
  const removed = repo.commit("delete the first directory");
  repo.git("checkout", "-q", rewrite);
  return { repo, first, second, rewrite, mode, moved, removed };
}

describe(`${CENSUS} | the CLI over a real repository`, () => {
  let fx: CliFixture;
  beforeAll(() => {
    fx = buildCliFixture();
  });

  pinned("G01", "a receipt in a new KEY directory exits 0 with no finding", () => {
    const run = fx.repo.cli("--base", fx.first, "--head", fx.second);
    expect(run.status).toBe(EXIT.clean);
    expect(report(run)).toEqual({ contract: CONTRACT, program: PROGRAM, root: RECEIPT_ROOT, base: fx.first, head: fx.second, findings: [] });
  });

  pinned("G02", "a modification and an addition inside a prior directory exit 1, head defaulting to HEAD", () => {
    const run = fx.repo.cli("--base", fx.second);
    expect(run.status).toBe(EXIT.findings);
    expect(report(run)).toEqual({
      contract: CONTRACT,
      program: PROGRAM,
      root: RECEIPT_ROOT,
      base: fx.second,
      head: fx.rewrite,
      findings: [
        { code: PRIOR, path: `${ROOT}${DIR}/receipt.json`, status: "M" },
        { code: PRIOR, path: `${ROOT}${DIR}/second.json`, status: "A" },
      ],
    });
  });

  pinned("G03", "a mode change, a rename out and a deletion of a prior directory each exit 1", () => {
    const modeRun = fx.repo.cli("--base", fx.second, "--head", fx.mode);
    expect(modeRun.status).toBe(EXIT.findings);
    expect(report(modeRun).findings).toEqual([{ code: PRIOR, path: `${ROOT}${DIR}/receipt.json`, status: "M" }]);
    const moveRun = fx.repo.cli("--base", fx.second, "--head", fx.moved);
    expect(moveRun.status).toBe(EXIT.findings);
    expect(report(moveRun).findings).toEqual([{ code: PRIOR, path: `${ROOT}${DIR2}/receipt.json`, status: "D" }]);
    const removeRun = fx.repo.cli("--base", fx.second, "--head", fx.removed);
    expect(removeRun.status).toBe(EXIT.findings);
    expect(report(removeRun).findings).toEqual([{ code: PRIOR, path: `${ROOT}${DIR}/receipt.json`, status: "D" }]);
  });

  pinned("G04", "an unchanged cut exits 0 and reads both commits back", () => {
    const run = fx.repo.cli("--base", fx.rewrite, "--head", fx.rewrite);
    expect(run.status).toBe(EXIT.clean);
    expect(report(run)).toMatchObject({ base: fx.rewrite, head: fx.rewrite, findings: [] });
  });

  pinned("G05", "every usage error exits 2 with the usage line and no stdout", () => {
    const outside = nonRepoScratch("mii-custody-norepo-");
    try {
      const runs = [
        fx.repo.cli(),
        fx.repo.cli("--base"),
        fx.repo.cli("--head", fx.second),
        fx.repo.cli("--bogus", fx.second),
        fx.repo.cli("--base", fx.first, "--base", fx.second),
        fx.repo.cli("--base", "--head", fx.second),
        fx.repo.cli("--base", "0".repeat(40)),
        spawnSync(process.execPath, [SCRIPT, "--base", "HEAD"], { cwd: outside.dir, env: gitEnv(), encoding: "utf8" }),
      ];
      expect(runs.map((run) => run.status)).toEqual(runs.map(() => EXIT.usage));
      expect(runs.map((run) => run.stdout)).toEqual(runs.map(() => ""));
      for (const run of runs) expect(run.stderr).toContain("usage: node qa/workbench/mii-receipt-custody.mjs --base <rev> [--head <rev>]");
    } finally {
      outside.dispose();
    }
  });
});

interface Piece {
  readonly id: string;
  readonly path: string;
  readonly blob: string;
  readonly lines: readonly [number, number];
  readonly sha256: string;
  readonly text: string;
}
interface Vendored {
  readonly program: string;
  readonly source: { readonly commit: string; readonly read: string };
  readonly pieces: readonly Piece[];
}

const PIECES: Readonly<Record<string, { readonly blob: string; readonly lines: readonly [number, number]; readonly sha256: string }>> = {
  "EAT-R456": { blob: "a8a9bf091e2658a9eb698a023bd9bdb7076fa0e5", lines: [1657, 1680], sha256: "fb08f608be06a03437ebbb22ad84764d4bd8557fea58d56aeb37c379088cc47b" },
  "EAT-R456-clauses": { blob: "073567e8c568ecc3fe2d894153915aada567add3", lines: [280, 280], sha256: "772cca8993f8d9e2d5bdb83c5f29f3826a1b967fe700768530455a3878ff043d" },
};

describe(`${CENSUS} | the requirement anchor`, () => {
  pinned("S01", "the vendored block and gate line are the module's REQUIREMENT", () => {
    const vendored: Vendored = JSON.parse(readFileSync(FIXTURE, "utf8"));
    expect(vendored.program).toBe(PROGRAM);
    expect(vendored.source.commit).toBe("53ac7f356096c71447416f64149ae463f0deb7ef");
    expect(vendored.pieces.map((piece) => piece.id)).toEqual(Object.keys(PIECES));
    for (const piece of vendored.pieces) {
      expect({ blob: piece.blob, lines: piece.lines, sha256: piece.sha256 }).toEqual(PIECES[piece.id]);
      expect(sha256(piece.text)).toBe(piece.sha256);
    }
    const [block, gate] = vendored.pieces.map((piece) => piece.text.split("\n"));
    expect(block[0]).toMatch(new RegExp(`^## ${REQUIREMENT.id} — `));
    const criteria = new Map<number, string>();
    for (const line of block) {
      const match = /^ {2}(\d)\. (.+)$/.exec(line);
      if (match) criteria.set(Number(match[1]), match[2]);
    }
    expect(criteria.get(1)).toBe(REQUIREMENT.criteria[1]);
    expect(criteria.get(4)).toBe(REQUIREMENT.criteria[4]);
    expect(block.filter((line) => line.startsWith("- Negative mutant: ")).map((line) => line.slice("- Negative mutant: ".length))).toEqual([REQUIREMENT.criteria[4]]);
    expect(gate).toHaveLength(1);
    const clauses = gate[0].replace(new RegExp(`^\\| ${REQUIREMENT.id} \\| `), "").replace(/ \|$/, "").split("; ");
    expect(clauses[0]).toBe(REQUIREMENT.clause);
  });
});

describe(`${CENSUS} | census shape`, () => {
  it("Z01 the frozen claim shape (id, pin count, sentence digest)", () => {
    expect(CLAIMS.map((claim) => `${claim.id}:${claim.pins.length}:${sha256(claim.sentence).slice(0, 12)}`)).toEqual([
      "R456a-KEYED:9:b2bf4d2903c4",
      "R456a-PRIOR:6:5a8904a7b04e",
      "R456a-CLI:5:e38a27151272",
      "R456a-SPEC:1:6f9f91abf1a3",
    ]);
  });

  it("Z03 the claim anchors are the module's exported registry, and every finding code is expected by a row", () => {
    const registry = [
      ...Object.keys(custody),
      ...Object.keys(FINDING).map((key) => `FINDING.${key}`),
      ...Object.keys(EXIT).map((key) => `EXIT.${key}`),
      ...Object.keys(REQUIREMENT.criteria).map((key) => `REQUIREMENT.criteria.${key}`),
    ];
    expect([...new Set(CLAIMS.flatMap((claim) => claim.anchors))].sort()).toEqual([...new Set(registry)].sort());
    expect([...new Set(CASES.flatMap((row) => row.expect.map(([code]) => code)))].sort()).toEqual(Object.values(FINDING).sort());
  });

  it("Z02 the pinned set is the set of cases that ran, and each row names the claim that pins it", () => {
    expect([...RAN].sort()).toEqual(CLAIMS.flatMap((claim) => claim.pins).sort());
    expect(CASES.map((row) => `${row.id}:${CLAIMS.find((claim) => claim.pins.includes(row.id))?.id}`)).toEqual(CASES.map((row) => `${row.id}:${row.claim}`));
  });
});
