/**
 * wb-2xan [MII P10+] EAT-R456 clause (a), "receipts land in a new source-pinned directory": the receipt-custody validator of
 * the mechanical-interop-integrity-2026-11-10 program (MII). It is the validator of EAT-R456 acceptance criterion 1 and the
 * append-only custody check that criterion 4's negative mutant must turn red (both quoted in REQUIREMENT below, from
 * ATOMIC-REQUIREMENTS.md at master 53ac7f35, blob a8a9bf09; test/fixtures/mii-receipt-custody-requirement.json vendors that
 * block and test/workbench-mii-receipt-custody.test.ts holds this module to it).
 *
 * THE RECEIPT DIRECTORY. The program's QA receipts live under RECEIPT_ROOT, in one directory per source pin. A directory is
 * source-pinned when its name, the first path segment below RECEIPT_ROOT, matches KEY: pi-<Pi commit>-mw-<Mechanical commit>,
 * each commit written as 40 lower-case hexadecimal digits. Every path under RECEIPT_ROOT is read as a receipt.
 *
 * THE RULES over a cut (git diff --name-status --no-renames <base> <head>, so a rename reads as a deletion and an addition, and
 * a mode change reads as a modification), one finding per changed path:
 *  - receipt-dir-not-source-pinned: an added, modified or deleted path under RECEIPT_ROOT whose first segment below the root is
 *    not a KEY directory: a file directly under the root, a file at the root path itself, or a directory of any other name.
 *  - write-into-prior-receipt-dir: an added, modified or deleted path inside a KEY directory that holds a file at the base
 *    commit. A directory holding a receipt at base is closed; a new receipt goes to a new KEY directory.
 * A path outside RECEIPT_ROOT is not read (a sibling directory whose name only begins with the root's name is outside it).
 *
 * NOT CLAIMED: whether either commit of a KEY names a commit of its repository (the per-axis witness checks are EAT-R457's);
 * what a KEY directory holds (file names, content and schema: EAT-R458, BLOCKED on G-RATIFY); EAT-R456 criteria 2 and 3 and its
 * clauses (b), (c) and (d); release evidence written outside RECEIPT_ROOT; custody across cuts (each cut is judged against its
 * own base tree, so a directory that an earlier landed cut removed reads as new); an uncommitted working tree (the CLI reads
 * two commits); a KEY spelled with 64-digit (SHA-256 object format) commits.
 *
 * Pure node: no src/ or dist/ import. custodyFindings is a pure function of its input; only readCustodyFromGit and the CLI read
 * Git. CLI: node qa/workbench/mii-receipt-custody.mjs --base <rev> [--head <rev>] (head defaults to HEAD); it prints one JSON
 * object and exits 0 when the cut has no finding, 1 when it has findings, 2 on a usage error.
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** @typedef {"A" | "M" | "D"} ChangeStatus */
/** @typedef {{ readonly path: string, readonly status: ChangeStatus }} Change */
/** @typedef {{ readonly code: string, readonly path: string, readonly status: ChangeStatus }} Finding */
/** @typedef {{ readonly changes: ReadonlyArray<Change>, readonly baseFiles: ReadonlyArray<string> }} CustodyCut */

export const CONTRACT = "workbench.mii-receipt-custody/v1";
export const PROGRAM = "mechanical-interop-integrity-2026-11-10";
/** The program's QA receipt root (always ends with "/"). */
export const RECEIPT_ROOT = `qa/workbench/receipts/${PROGRAM}/`;
/** A source-pinned directory name: both source commits, full and lower-case. */
export const KEY = /^pi-[0-9a-f]{40}-mw-[0-9a-f]{40}$/;

export const FINDING = Object.freeze({
  notSourcePinned: "receipt-dir-not-source-pinned",
  priorDirectory: "write-into-prior-receipt-dir",
});

/** The requirement this module implements, quoted from the vendored EAT-R456 block (criterion 4 is its Negative mutant). */
export const REQUIREMENT = Object.freeze({
  id: "EAT-R456",
  clause: "(a) receipts land in a new source-pinned directory",
  criteria: Object.freeze({
    1: "A validator asserts every new receipt lives under a directory keyed by both source SHAs and rejects writes into prior receipt directories (append-only custody).",
    4: "A validator mutant accepts a write into a prior source-pinned receipt directory; the append-only custody check must turn red.",
  }),
});

export const EXIT = Object.freeze({ clean: 0, findings: 1, usage: 2 });

/**
 * The first path segment below RECEIPT_ROOT and whether more follows it, or undefined for a path outside the root. The root
 * path itself, written as a file, reads as an empty segment.
 * @param {string} path
 * @returns {{ readonly segment: string, readonly nested: boolean } | undefined}
 */
export function receiptDirOf(path) {
  if (path === RECEIPT_ROOT.slice(0, -1)) return { segment: "", nested: false };
  if (!path.startsWith(RECEIPT_ROOT)) return undefined;
  const rest = path.slice(RECEIPT_ROOT.length);
  const slash = rest.indexOf("/");
  return slash < 0 ? { segment: rest, nested: false } : { segment: rest.slice(0, slash), nested: true };
}

/**
 * The custody findings of one cut, sorted by path.
 * @param {CustodyCut} cut
 * @returns {Finding[]}
 */
export function custodyFindings(cut) {
  /** @type {Set<string>} */
  const priorDirectories = new Set();
  for (const path of cut.baseFiles) {
    const dir = receiptDirOf(path);
    if (dir?.nested && KEY.test(dir.segment)) priorDirectories.add(dir.segment);
  }
  /** @type {Finding[]} */
  const findings = [];
  for (const change of cut.changes) {
    const dir = receiptDirOf(change.path);
    if (dir === undefined) continue;
    if (!dir.nested || !KEY.test(dir.segment)) findings.push({ code: FINDING.notSourcePinned, path: change.path, status: change.status });
    else if (priorDirectories.has(dir.segment)) findings.push({ code: FINDING.priorDirectory, path: change.path, status: change.status });
  }
  return findings.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

class UsageError extends Error {}

/**
 * @param {string} cwd
 * @param {readonly string[]} args
 * @param {string} what
 * @returns {string}
 */
function gitOut(cwd, args, what) {
  const result = spawnSync("git", [...args], { cwd, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (result.status !== 0) throw new UsageError(`${what}${result.stderr ? `: ${result.stderr.trim()}` : ""}`);
  return result.stdout;
}

/**
 * Reads the cut <base>..<head> of the repository holding `repo`, restricted to RECEIPT_ROOT.
 * @param {{ readonly repo: string, readonly base: string, readonly head?: string }} options
 * @returns {CustodyCut & { readonly base: string, readonly head: string }}
 */
export function readCustodyFromGit(options) {
  const top = gitOut(options.repo, ["rev-parse", "--show-toplevel"], "not inside a Git work tree").trim();
  /** @param {string} rev */
  const commit = (rev) => gitOut(top, ["rev-parse", "--verify", "--quiet", `${rev}^{commit}`], `unknown revision ${rev}`).trim();
  const base = commit(options.base);
  const head = commit(options.head ?? "HEAD");
  const diff = gitOut(top, ["diff", "--name-status", "--no-renames", "-z", base, head, "--", RECEIPT_ROOT.slice(0, -1)], "git diff").split("\0");
  /** @type {Change[]} */
  const changes = [];
  for (let at = 0; at + 1 < diff.length; at += 2) {
    const letter = diff[at].charAt(0);
    if (letter !== "") changes.push({ path: diff[at + 1], status: letter === "A" ? "A" : letter === "D" ? "D" : "M" });
  }
  const baseFiles = gitOut(top, ["ls-tree", "-r", "-z", "--name-only", base, "--", RECEIPT_ROOT.slice(0, -1)], "git ls-tree")
    .split("\0")
    .filter((path) => path !== "");
  return { base, head, changes, baseFiles };
}

const USAGE = "usage: node qa/workbench/mii-receipt-custody.mjs --base <rev> [--head <rev>]";

/**
 * @param {readonly string[]} argv
 * @returns {{ base: string, head?: string }}
 */
function parseArgs(argv) {
  /** @type {{ base?: string, head?: string }} */
  const options = {};
  for (let at = 0; at < argv.length; at += 2) {
    const flag = argv[at];
    const value = argv[at + 1];
    if ((flag !== "--base" && flag !== "--head") || value === undefined || value === "" || value.startsWith("--")) throw new UsageError(`bad argument ${flag ?? ""}`);
    const key = flag === "--base" ? "base" : "head";
    if (options[key] !== undefined) throw new UsageError(`${flag} given twice`);
    options[key] = value;
  }
  if (options.base === undefined) throw new UsageError("--base is required");
  return { base: options.base, head: options.head };
}

/**
 * @param {readonly string[]} argv
 * @param {string} [cwd]
 * @returns {number} the exit status
 */
export function runCli(argv, cwd = process.cwd()) {
  let cut;
  try {
    cut = readCustodyFromGit({ repo: cwd, ...parseArgs(argv) });
  } catch (error) {
    process.stderr.write(`mii-receipt-custody: ${error instanceof Error ? error.message : String(error)}\n${USAGE}\n`);
    return EXIT.usage;
  }
  const findings = custodyFindings(cut);
  process.stdout.write(`${JSON.stringify({ contract: CONTRACT, program: PROGRAM, root: RECEIPT_ROOT, base: cut.base, head: cut.head, findings }, null, 2)}\n`);
  return findings.length > 0 ? EXIT.findings : EXIT.clean;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = runCli(process.argv.slice(2));
}
