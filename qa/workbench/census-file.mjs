/**
 * wb-8py9: the entry point of forge.toml's [build.commands.census-file], the product-scoped declared command the
 * machine's claim-check runs once per leg (`FORGE_JSON=1 forge run census-file -- <files> --json`). The command carries
 * no {args} placeholder: Forge appends what follows `--` to it, and the landed retry census
 * (test/workbench-retry-census.test.ts) reads a "{" in a tier command as a shell operator it cannot read (tier-unread). In
 * exchange this entry point refuses a named file that does not exist (exit 2), the check Forge makes only for {args}.
 *
 * One run judges a cut in two halves, and is green only when both are:
 *   1. the receipt lint (qa/workbench/receipt-lint.mjs) over the delivery's receipt and census files and over the named
 *      files, re-measuring every quantitative claim they make against the tree;
 *   2. vitest over the named test files (test/<name>.test.ts), with --maxWorkers=8 (standing rule 26(b)) and
 *      --expect.requireAssertions (the default tier's own flag). With --readers it also runs the landed readers of the
 *      delivered files (receipt-lint.mjs READERS).
 * A census-tier file (test/<name>.census.ts) judges the gate's own report, so it is linted and not run here; any other
 * named file is linted when the lint reads its kind and is otherwise passed over, and both are reported.
 *
 * The claim-check appends `--json` after its files (it means Forge's JSON mode, which FORGE_JSON=1 already sets), and
 * Forge passes it on with them. vitest's run command has no --json option and refuses one as an unknown option, so this
 * entry point consumes it rather than passing it on: here it prints the lint report as one JSON line.
 *
 * CLI: node qa/workbench/census-file.mjs [--base <rev>] [--readers] [--json] [<file> ...]
 *   exit 0: the lint holds and vitest is green (or had no file to run); exit 1: a lint finding or a vitest failure;
 *   exit 2: usage (an unknown option, a named file that does not exist, or no vitest binary to run).
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { formatFinding, landedReaders, lintDelivery, missingFiles, parseArgs } from "./receipt-lint.mjs";

export const VITEST_FLAGS = ["run", "--maxWorkers=8", "--expect.requireAssertions"];

/**
 * The named files by what this entry point does with them.
 * @param {readonly string[]} files
 * @returns {{ vitest: string[], censusTier: string[], other: string[] }}
 */
export function partitionFiles(files) {
  /** @type {{ vitest: string[], censusTier: string[], other: string[] }} */
  const out = { vitest: [], censusTier: [], other: [] };
  for (const file of files) {
    const rel = file.startsWith("./") ? file.slice(2) : file;
    if (rel.startsWith("test/") && rel.endsWith(".test.ts")) out.vitest.push(rel);
    else if (rel.startsWith("test/") && rel.endsWith(".census.ts")) out.censusTier.push(rel);
    else out.other.push(rel);
  }
  return out;
}

/**
 * The vitest argv of one run: the default config, the rule-26(b) worker cap and the default tier's assertion flag.
 * @param {readonly string[]} files
 */
export function vitestArgv(files) {
  return [...VITEST_FLAGS, ...files];
}

/**
 * @param {readonly string[]} argv
 * @param {string} [root]
 * @returns {number}
 */
export function main(argv, root = process.cwd()) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (error) {
    process.stderr.write(`census-file: ${error instanceof Error ? error.message : String(error)}\nusage: node qa/workbench/census-file.mjs [--base <rev>] [--readers] [--json] [<file> ...]\n`);
    return 2;
  }
  const missing = missingFiles(root, args.files);
  if (missing.length > 0) {
    process.stderr.write(`census-file: no such file: ${missing.join(", ")}\n`);
    return 2;
  }
  let report;
  try {
    report = lintDelivery(root, { base: args.base, files: args.files });
  } catch (error) {
    process.stderr.write(`census-file: ${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  }
  const parts = partitionFiles(args.files);
  const readers = args.readers && report.base !== null ? landedReaders(root, report.base, report.files) : [];
  const run = [...new Set([...parts.vitest, ...readers])];
  if (args.json) process.stdout.write(`${JSON.stringify({ tool: "census-file", base: report.base, files: report.files, claims: report.claims.length, findings: report.findings, vitest: run, censusTier: parts.censusTier, other: parts.other })}\n`);
  process.stdout.write(`census-file: receipt lint: ${report.claims.length} claims judged in ${report.files.length} files at base ${report.base ?? "(none)"}; ${report.findings.length} do not hold\n`);
  for (const found of report.findings) process.stderr.write(`census-file: receipt lint: ${formatFinding(found)}\n`);
  for (const file of parts.censusTier) process.stdout.write(`census-file: not run: ${file} is a census-tier file (it judges the gate's own report)\n`);
  for (const file of parts.other) process.stdout.write(`census-file: not run: ${file} is no default-tier test file\n`);
  let vitestStatus = 0;
  if (run.length > 0) {
    const bin = join(root, "node_modules", ".bin", "vitest");
    if (!existsSync(bin)) {
      process.stderr.write(`census-file: ${bin} is missing; install the dependencies first\n`);
      return 2;
    }
    process.stdout.write(`census-file: vitest ${vitestArgv(run).join(" ")}\n`);
    const result = spawnSync(bin, vitestArgv(run), { cwd: root, stdio: "inherit" });
    vitestStatus = result.status ?? 1;
  } else process.stdout.write("census-file: vitest: no default-tier test file named\n");
  return report.findings.length === 0 && vitestStatus === 0 ? 0 : 1;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main(process.argv.slice(2));
